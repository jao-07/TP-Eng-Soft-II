class Visita {
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

const criaVisitas = (horariosIniciais, horariosFinais, enderecos) =>{
    let visitas = []
    for(let i=0; i<horariosIniciais.length; i++){
        let visita = new Visita(horariosIniciais[i], horariosFinais[i], enderecos[i])
        visitas.push(visita)
    }
    return visitas
}

const mesclaVisitas = (arrayDeVisitas) => {
    for(let i=0; i<arrayDeVisitas.length; i++){
        for(let j=i+1; j<arrayDeVisitas.length; j++){
            if(arrayDeVisitas[i].check(arrayDeVisitas[j])){
                var novaVisita = arrayDeVisitas[i].mescla(arrayDeVisitas[j])
                arrayDeVisitas[i] = novaVisita
                arrayDeVisitas.splice(j,1)
                i=-1
                break
            }
        }
    }
}

const separaEnderecos = (visitas) => {
    let vetorAuxiliar = []
    let matriz = []
    let endereco = visitas[0].endereco
    let i=0
    while(i < visitas.length){
        if(endereco.localeCompare(visitas[i].endereco) == 0)
            vetorAuxiliar.push(visitas[i])
        else{
            matriz.push(vetorAuxiliar)
            vetorAuxiliar = []
            vetorAuxiliar.push(visitas[i])
            endereco = visitas[i].endereco
        }
        i++
    }
    matriz.push(vetorAuxiliar)
    return matriz
}

const concatenaEndereços = (horariosIniciais, horariosFinais, enderecos) =>{
    let visitas = criaVisitas(horariosIniciais, horariosFinais, enderecos)
    visitas.sort((a, b) => a.endereco.localeCompare(b.endereco))

    let matriz = separaEnderecos(visitas)
    console.log(matriz.length)
    for(let i=0; i<matriz.length; i++){
        mesclaVisitas(matriz[i])
    }
    let cont = 0
    for(let i=0; i<matriz.length; i++){
        for(let j=0; j<matriz[i].length; j++){
            matriz[i][j].print()
            cont += matriz[i][j].horarioDeFim - matriz[i][j].horarioDeInicio
        }
    }
    console.log("Total de horas: " + cont + "h")
}

const a = [1, 5, 2, 7, 10, 2]
const b = [3, 8, 5, 11, 15, 3]
const c = ["Carlos Luz 1172", "Carlos Luz 1172", "Carlos Luz 1172", "Dep Andre Almeida 149", "Dep Andre Almeida 149", "Afonso Pena 32"]

concatenaEndereços(a,b,c)
