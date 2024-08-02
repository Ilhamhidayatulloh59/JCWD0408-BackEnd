import express, { Application } from 'express'
import router from './router'
import cors from 'cors'

const PORT: number = 2000

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[Server] => http://localhost:${PORT}/api`)
})
