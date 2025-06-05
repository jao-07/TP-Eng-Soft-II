export class Visita {
    constructor(inicio, fim, endereco) {
        if (inicio < 0 || fim < 0) {
            throw new Error("Horários não podem ser negativos");
        }
        if (typeof inicio !== 'number' || typeof fim !== 'number') {
            throw new Error("Horários devem ser números");
        }
        this.horarioDeInicio = inicio
        this.horarioDeFim = fim
        this.endereco = endereco
    }

    print(){
        console.log("Início: " + this.horarioDeInicio + "h Fim: " + this.horarioDeFim + "h Endereço: " + this.endereco)
    }

    checaSeTemIntercessaoEntreHorarios(outraVisita){ 
        return (
            this.horarioDeInicio <= outraVisita.horarioDeFim &&
            this.horarioDeFim >= outraVisita.horarioDeInicio
        )
    }

    mescla(outraVisita){
        let inicio = this.horarioDeInicio
        let fim = this.horarioDeFim
        if(outraVisita.horarioDeInicio < inicio)
            inicio = outraVisita.horarioDeInicio

        if(outraVisita.horarioDeFim > fim)
            fim = outraVisita.horarioDeFim

        let novaVisita = new Visita(inicio, fim, this.endereco)
        return novaVisita
    }
}