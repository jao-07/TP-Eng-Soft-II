import { Router } from 'express'
import { adicionarVisita,removerVisita,obterVisitas } from './visitasController.js'
import {concatenaEndereços} from './funcoes.js'

const router = Router()

router.post('/', async(req, res) => {
  try {
    const visita = await adicionarVisita(req.body)
    res.status(201).json(visita)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

router.get('/', async(_req, res) => {
  const visitas = await obterVisitas()
  res.json(visitas)
})

router.delete('/', async(req, res) => {
  const { endereco, inicio, fim } = req.body;
  const qtd = await removerVisita({ endereco, inicio, fim });
  res.sendStatus(qtd ? 204 : 404);
});

router.get('/concatenado', async(_req, res) => {
    const visitas = await obterVisitas()
    const enderecos = visitas.map(v => v.endereco)
    const inicios = visitas.map(v => v.inicio)
    const fins = visitas.map(v => v.fim)
    const concatenacao = concatenaEndereços(inicios, fins, enderecos)
    res.send(concatenacao)
})

export default router;
