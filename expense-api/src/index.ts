import express, { Application } from 'express'
import router from './router'
import "dotenv/config"
import db from './config/db'

const PORT: number = 8000
const app: Application = express()

app.use(express.json())

app.use('/api', router)

db.getConnection((err, connection) => {
    if (err) {
        return console.log(err);
    }
    console.log("Success Connection", connection.threadId)
})

app.listen(PORT, () => {
    console.log(`[server-api]: http://localhost:${PORT}/api`)
})