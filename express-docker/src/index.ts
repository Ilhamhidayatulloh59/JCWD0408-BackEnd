import express, { Application, Request, Response } from 'express'
import { UserRouter } from './routers/user.router'

const PORT: number = 8000
const userRouter = new UserRouter()

const app: Application = express()
app.use(express.json())

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        msg: 'Welcome to my API'
    })
})

app.use('/api/users', userRouter.getRouter())

app.listen(PORT, () => {
    console.log(`[API] => http://localhost:${PORT}/api`);
})