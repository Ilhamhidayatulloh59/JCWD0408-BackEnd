import { Request, Response, Router } from 'express'
import { expenseRouter } from './routers/expense.router'
import { expenseRouterV2 } from './routers/expense-v2.router'

const router = Router()

// api testing
router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 'ok',
        msg: 'Welcome to my api'
    })
})

router.use('/expenses', expenseRouter)
router.use('/v2/expenses', expenseRouterV2)

export default router