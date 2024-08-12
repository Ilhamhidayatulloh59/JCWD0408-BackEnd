import express, { Application } from 'express'
import router from './router'
import cors from 'cors'
import path from 'path'

const PORT: number = 2000

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/api/public', express.static(path.join(__dirname, '../public')))

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[Server] => http://localhost:${PORT}/api`)
})

export default app;
