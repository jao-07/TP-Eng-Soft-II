import { Visita, init } from './db.js';

await init();

export async function adicionarVisita({ endereco, inicio, fim }) {
  return Visita.create({ endereco, inicio, fim })
}

export async function removerVisita({ endereco, inicio, fim }) {
  return Visita.destroy({ where: { endereco, inicio, fim } })
}

export async function obterVisitas() {
  return Visita.findAll({
    attributes: ['endereco', 'inicio', 'fim'],
    order: [['inicio', 'ASC']],
  })
}
