
import { criaVisitas, separaEnderecos, mesclaVisitas, concatenaEndereços } from './funcoes.js';
import { Visita } from './Visita.js';

describe('criaVisitas', () => {
  test('cria objetos Visita corretamente', () => {
    const visitas = criaVisitas([8, 10], [9, 12], ['Rua A', 'Rua B']);
    expect(visitas.length).toBe(2);
    expect(visitas[0]).toBeInstanceOf(Visita);
    expect(visitas[0].endereco).toBe('Rua A');
  });
});

describe('separaEnderecos', () => {
  test('agrupa visitas por endereço', () => {
    const visitas = [
      new Visita(8, 9, 'Rua A'),
      new Visita(9, 10, 'Rua A'),
      new Visita(10, 11, 'Rua B')
    ];
    visitas.sort((a, b) => a.endereco.localeCompare(b.endereco));
    const grupos = separaEnderecos(visitas);
    expect(grupos.length).toBe(2);
    expect(grupos[0].length).toBe(2);
    expect(grupos[1].length).toBe(1);
  });
});

describe('mesclaVisitas', () => {
  test('mescla visitas com intercessão de horário e mesmo endereço', () => {
    const visitas = [
      new Visita(8, 10, 'Rua A'),
      new Visita(9, 11, 'Rua A'),
      new Visita(12, 13, 'Rua A')
    ];
    mesclaVisitas(visitas);
    expect(visitas.length).toBe(2);
    expect(visitas[0].horarioDeInicio).toBe(8);
    expect(visitas[0].horarioDeFim).toBe(11);
  });
});

describe('concatenaEndereços', () => {
  test('Deve processar visitas corretamente', () => {
    const originalLog = console.log;
    let outputs = [];
    console.log = (msg) => outputs.push(msg);

    concatenaEndereços([8, 10, 12], [9, 11, 13], ['Rua A', 'Rua A', 'Rua B']);

    expect(outputs.length).toBeGreaterThan(0);
    expect(outputs.some(output => output.includes('Lista das concatenações'))).toBe(true);
    expect(outputs.some(output => output.includes('Total de horas'))).toBe(true);

    console.log = originalLog;
  });
});
