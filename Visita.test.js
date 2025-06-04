import { Visita } from './Visita.js';

describe('checaSeTemIntercessaoEntreHorarios', () => {
    test('Quando o horário da visita é totalmente anterior ou posterior ao horário da outra visita', () => {
        const v1 = new Visita(1, 3, "Av. Fleming, 150")
        const v2 = new Visita(6, 8, "Av. Fleming, 150")

        expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(false)
        expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(false)
    })

    test('Quando o horário da visita tem intercessão com o horário da outra visita', () => {
        const v1 =  new Visita(1, 5, "Av. Fleming, 150")
        const v2 = new Visita(3, 8, "Av. Fleming, 150")

        expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true)
        expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true)
    })

    test('Quando o horário da visita termina quando a outra visita começa', () => {
        const v1 =  new Visita(1, 4, "Av. Fleming, 150")
        const v2 = new Visita(4, 8, "Av. Fleming, 150")

        expect(v1.checaSeTemIntercessaoEntreHorarios(v2)).toBe(true)
        expect(v2.checaSeTemIntercessaoEntreHorarios(v1)).toBe(true)
    })

})

describe('mescla', () => {
        test('Mescla duas visitas com interseção', () => {
            const v1 = new Visita(2, 5, "Av. Fleming, 150")
            const v2 = new Visita(4, 8, "Av. Fleming, 150")

            const resultado = v1.mescla(v2)

            expect(resultado.horarioDeInicio).toBe(2)
            expect(resultado.horarioDeFim).toBe(8)
            expect(resultado.endereco).toBe("Av. Fleming, 150")
        })

        test('Mescla duas visitas onde uma contém a outra', () => {
            const v1 = new Visita(3, 9, "Av. Fleming, 150")
            const v2 = new Visita(4, 7, "Av. Fleming, 150")

            const resultado = v1.mescla(v2)

            expect(resultado.horarioDeInicio).toBe(3)
            expect(resultado.horarioDeFim).toBe(9)
        })

        test('Mescla duas visitas com mesmo horário', () => {
            const v1 = new Visita(5, 10, "Av. Fleming, 150")
            const v2 = new Visita(5, 10, "Av. Fleming, 150")

            const resultado = v1.mescla(v2)

            expect(resultado.horarioDeInicio).toBe(5)
            expect(resultado.horarioDeFim).toBe(10)
        })
    })

    describe('print', () => {
        test('Deve imprimir corretamente os dados da visita', () => {
            const visita = new Visita(9, 12, "Av. Fleming, 150");

            const originalLog = console.log;

            let output = "";

            console.log = (mensagem) => {
                output = mensagem;
            };

            visita.print();

            expect(output).toBe("Início: 9h Fim: 12h Endereço: Av. Fleming, 150");

            console.log = originalLog;
        });
    });

