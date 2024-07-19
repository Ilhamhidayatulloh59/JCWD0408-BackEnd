import { Router } from 'express'
import { userRouter } from './routers/user.router'

const router = Router()

router.use("/users", userRouter)
// add another router here

export default router