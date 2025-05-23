class Visita {
    constructor(inicio, fim, endereco) {
        this.inicio = inicio
        this.fim = fim
        this.endereco = endereco
    }

    print(){
        console.log("Início: " + this.inicio + "h Fim: " + this.fim + "h Endereço: " + this.endereco)
    }

    check(outraVisita){
        let cont = 0
        if(this.inicio > outraVisita.inicio)
            cont++
        else if(this.inicio < outraVisita.inicio)
            cont--

        if(this.inicio > outraVisita.fim)
            cont++
        else if(this.inicio < outraVisita.fim)
            cont--

        if(this.fim > outraVisita.inicio)
            cont++
        else if(this.fim < outraVisita.inicio)
            cont--

        if(this.fim > outraVisita.fim)
            cont++
        else if(this.fim < outraVisita.fim)
            cont--

        if(cont == 4 || cont == -4)
            return false
        else
            return true
    }

    mescla(outraVisita){
        let inicio = this.inicio
        let fim = this.fim
        if(outraVisita.inicio < inicio)
            inicio = outraVisita.inicio

        if(outraVisita.fim > fim)
            fim = outraVisita.fim

        let novaVisita = new Visita(inicio, fim, this.endereco)
        return novaVisita
    }
}

const criaVisitas = (A, B, C) =>{
    let visitas = new Array()
    for(let i=0; i<A.length; i++){
        let visita = new Visita(A[i], B[i], C[i])
        visitas.push(visita)
    }
    return visitas
}

const mesclaVisitas = (V) => {
    for(let i=0; i<V.length; i++){
        for(let j=i+1; j<V.length; j++){
            if(V[i].check(V[j])){
                var novaVisita = V[i].mescla(V[j])
                V[i] = novaVisita
                V.splice(j,1)
                i=-1
                break
            }
        }
    }
}

const separaEnderecos = (V) => {
    let vetorAux = new Array()
    let matriz = new Array()
    let endereco = V[0].endereco
    let i=0
    while(i < V.length){
        if(endereco.localeCompare(V[i].endereco) == 0)
            vetorAux.push(V[i])
        else{
            matriz.push(vetorAux)
            //vetorAux.splice(0, vetorAux.length)
            vetorAux = new Array()
            vetorAux.push(V[i])
            endereco = V[i].endereco
        }
        i++
    }
    matriz.push(vetorAux)
    return matriz
}

const concatenaEndereços = (A, B, C) =>{
    let visitas = criaVisitas(A, B, C)
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
            cont += matriz[i][j].fim - matriz[i][j].inicio
        }
    }
    console.log("Total de horas: " + cont + "h")
}

const a = [1, 5, 2, 7, 10, 2]
const b = [3, 8, 5, 11, 15, 3]
const c = ["Carlos Luz 1172", "Carlos Luz 1172", "Carlos Luz 1172", "Dep Andre Almeida 149", "Dep Andre Almeida 149", "Afonso Pena 32"]

concatenaEndereços(a,b,c)
