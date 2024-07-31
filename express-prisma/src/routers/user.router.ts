import { Router } from "express";
import { createUser, deleteUser, editUser, getUserId, getUsers, loginUser } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/:id', getUserId)
userRouter.patch('/:id', editUser)
userRouter.delete('/:id', deleteUser)

export { userRouter }