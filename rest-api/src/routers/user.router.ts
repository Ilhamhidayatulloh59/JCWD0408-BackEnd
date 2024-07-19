import { Router } from 'express'
import { createUser, deleteUser, getUserId, getUsers } from '../controllers/user.controller'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserId)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)

export { userRouter }