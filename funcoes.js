import { Visita } from './Visita.js';

export const criaVisitas = (horariosIniciais, horariosFinais, enderecos) =>{
    let visitas = []
    for(let i=0; i<horariosIniciais.length; i++){
        let visita = new Visita(horariosIniciais[i], horariosFinais[i], enderecos[i])
        visitas.push(visita)
    }
    return visitas
}

export const mesclaVisitas = (visitas) => {
    for(let i=0; i<visitas.length; i++){
        for(let j=i+1; j<visitas.length; j++){
            if(visitas[i].checaSeTemIntercessaoEntreHorarios(visitas[j])){
                var novaVisita = visitas[i].mescla(visitas[j])
                visitas[i] = novaVisita
                visitas.splice(j,1)
                i=-1
                break
            }
        }
    }
}

export const separaEnderecos = (visitas) => {
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

export const concatenaEndereços = (horariosIniciais, horariosFinais, enderecos) =>{
    let visitas = criaVisitas(horariosIniciais, horariosFinais, enderecos)
    visitas.sort((a, b) => a.endereco.localeCompare(b.endereco))
    var stringResposta = ''

    let matriz = separaEnderecos(visitas)
    for(let i=0; i<matriz.length; i++){
        mesclaVisitas(matriz[i])
    }
    let cont = 0
    //console.log("\nLista das concatenações das visitas:\n")
    stringResposta += "\nLista dos endereços e seus horários de cobertura:\n"
    for(let i=0; i<matriz.length; i++){
        for(let j=0; j<matriz[i].length; j++){
            stringResposta += matriz[i][j].print()
            cont += matriz[i][j].horarioDeFim - matriz[i][j].horarioDeInicio
        }
    }

    return stringResposta;
}