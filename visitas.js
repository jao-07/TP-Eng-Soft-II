export class Visita {
    constructor(inicio, fim, endereco) {
        this.horarioDeInicio = inicio
        this.horarioDeFim = fim
        this.endereco = endereco
    }

    print(){
        console.log("Início: " + this.horarioDeInicio + "h Fim: " + this.horarioDeFim + "h Endereço: " + this.endereco)
    }

    check(outraVisita){
        let cont = 0
        if(this.horarioDeInicio > outraVisita.horarioDeInicio)
            cont++
        else if(this.horarioDeInicio < outraVisita.horarioDeInicio)
            cont--

        if(this.horarioDeInicio > outraVisita.horarioDeFim)
            cont++
        else if(this.horarioDeInicio < outraVisita.horarioDeFim)
            cont--

        if(this.horarioDeFim > outraVisita.horarioDeInicio)
            cont++
        else if(this.horarioDeFim < outraVisita.horarioDeInicio)
            cont--

        if(this.horarioDeFim > outraVisita.horarioDeFim)
            cont++
        else if(this.horarioDeFim < outraVisita.horarioDeFim)
            cont--

        if(cont == 4 || cont == -4)
            return false
        else
            return true
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