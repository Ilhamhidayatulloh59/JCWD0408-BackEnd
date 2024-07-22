import { Router } from 'express'
import { createUser, deleteUser, getUserId, getUsers, loginUser } from '../controllers/user.controller'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserId)
userRouter.post('/', createUser)
userRouter.post('/sign-in', loginUser)
userRouter.delete('/:id', deleteUser)

export { userRouter }