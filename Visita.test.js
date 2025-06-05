import { Visita } from './Visita.js';

describe('Visita', () => {
    describe('checaSeTemIntercessaoEntreHorarios', () => {
        test('Quando o horário da visita é totalmente anterior ou posterior ao horário da outra visita', () => {
            const v1 = new Visita(1, 3, "Av. Fleming, 150");
            const v2 = new Visita(6, 8, "Av. Fleming, 150");

            expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(false);
            expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(false);
            });
        });

        test('Quando o horário da visita tem intercessão com o horário da outra visita', () => {
            const v1 = new Visita(1, 5, "Av. Fleming, 150");
            const v2 = new Visita(3, 8, "Av. Fleming, 150");

            expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true);
            expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true);
        });

        test('Quando o horário da visita termina quando a outra visita começa', () => {
            const v1 = new Visita(1, 4, "Av. Fleming, 150");
            const v2 = new Visita(4, 8, "Av. Fleming, 150");

            expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true);
            expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true);
        });

        test('Quando uma visita está contida completamente dentro da outra', () => {
            const v1 = new Visita(1, 10, "Av. Fleming, 150");
            const v2 = new Visita(3, 7, "Av. Fleming, 150");

            expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true);
            expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true);
        });

        test('Quando os horários das visitas são idênticos', () => {
            const v1 = new Visita(5, 10, "Av. Fleming, 150");
            const v2 = new Visita(5, 10, "Av. Fleming, 150");

            expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true);
            expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true);
        });
    });

    describe('mescla', () => {
        test('Mescla duas visitas com interseção', () => {
            const v1 = new Visita(2, 5, "Av. Fleming, 150");
            const v2 = new Visita(4, 8, "Av. Fleming, 150");

            const resultado = v1.mescla(v2);

            expect(resultado.horarioDeInicio).toBe(2);
            expect(resultado.horarioDeFim).toBe(8);
            expect(resultado.endereco).toBe("Av. Fleming, 150");
        });

        test('Mescla duas visitas onde uma contém a outra', () => {
            const v1 = new Visita(3, 9, "Av. Fleming, 150");
            const v2 = new Visita(4, 7, "Av. Fleming, 150");

            const resultado = v1.mescla(v2);

            expect(resultado.horarioDeInicio).toBe(3);
            expect(resultado.horarioDeFim).toBe(9);
            expect(resultado.endereco).toBe("Av. Fleming, 150");
        });

        test('Mescla duas visitas com mesmo horário', () => {
            const v1 = new Visita(5, 10, "Av. Fleming, 150");
            const v2 = new Visita(5, 10, "Av. Fleming, 150");

            const resultado = v1.mescla(v2);

            expect(resultado.horarioDeInicio).toBe(5);
            expect(resultado.horarioDeFim).toBe(10);
            expect(resultado.endereco).toBe("Av. Fleming, 150");
        });

        test('Mescla duas visitas onde a segunda começa antes e termina depois da primeira', () => {
            const v1 = new Visita(5, 10, "Av. Fleming, 150");
            const v2 = new Visita(3, 12, "Av. Fleming, 150");

            const resultado = v1.mescla(v2);

            expect(resultado.horarioDeInicio).toBe(3);
            expect(resultado.horarioDeFim).toBe(12);
            expect(resultado.endereco).toBe("Av. Fleming, 150");
        });

        test('Mescla visitas com horários decimais', () => {
            const v1 = new Visita(9.5, 11.0, "Av. Fleming, 150");
            const v2 = new Visita(10.0, 12.5, "Av. Fleming, 150");

            const resultado = v1.mescla(v2);

            expect(resultado.horarioDeInicio).toBe(9.5);
            expect(resultado.horarioDeFim).toBe(12.5);
            expect(resultado.endereco).toBe("Av. Fleming, 150");
        });
    });

    describe('print', () => {
        test('Deve imprimir corretamente os dados da visita', () => {
            const visita = new Visita(9, 12, "Av. Fleming, 150");

            // Mock console.log para capturar a saída
            const originalLog = console.log;
            let output = "";

            console.log = (mensagem) => {
                output = mensagem;
            };

            visita.print();

            expect(output).toBe("Início: 9h Fim: 12h Endereço: Av. Fleming, 150");

            // Restaurar console.log
            console.log = originalLog;
        });
    });

    describe('constructor', () => {
        test('Deve inicializar a visita com os horários e endereço fornecidos', () => {
            const visita = new Visita(10, 14, "Rua do Teste, 123");
            expect(visita.horarioDeInicio).toBe(10);
            expect(visita.horarioDeFim).toBe(14);
            expect(visita.endereco).toBe("Rua do Teste, 123");
        });

        test('Deve armazenar horários como números e endereço como string', () => {
            const visita = new Visita(8, 17.5, "Centro, 456");
            expect(typeof visita.horarioDeInicio).toBe('number');
            expect(typeof visita.horarioDeFim).toBe('number');
            expect(typeof visita.endereco).toBe('string');
        });

        describe('inputs inválidos', () => {
            test('Não deve aceitar horários negativos', () => {
                const visita = new Visita(-1, 5, "Rua Teste");
                expect(visita.horarioDeInicio).not.toBe(-1);
            });

            test('Deve lidar com horários não numéricos', () => {
                const visita = new Visita("8", "10", "Rua Teste");
                expect(visita.horarioDeInicio).not.toBe("8");
                expect(visita.horarioDeFim).not.toBe("10");
            });
        });
    });