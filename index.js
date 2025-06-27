import express         from 'express'
import visitasRouter   from './visitasRouter.js'

const app = express()
app.use(express.json())
app.use('/visitas', visitasRouter)

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`API disponível em http://localhost:${PORT}`)
)
