import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as funcoes from './funcoes.js'

const rl = readline.createInterface({ input, output });

var enderecos = []
var horariosDeInicio = []
var horariosDeFim = []

while(true){
    const endereco = await rl.question('Digite o endereço da visita: ')
    enderecos.push(endereco)

    const horarioInicial = await rl.question('Digite o horario de início da visita: ')
    horariosDeInicio.push(horarioInicial)

    const horarioFinal = await rl.question('Digite o horario de fim da visita: ')
    horariosDeFim.push(horarioFinal)

    funcoes.concatenaEndereços(horariosDeInicio,horariosDeFim,enderecos)
}

rl.close()
  