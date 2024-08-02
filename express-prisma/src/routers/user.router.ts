import { Router } from "express";
import { deleteUser, editUser, getUserId, getUsers } from "../controllers/user.controller";
import { checkAdmin, verifyToken } from "../middlewares/auth.middleware";

const userRouter = Router()

userRouter.get('/', verifyToken, checkAdmin, getUsers)
userRouter.get('/:id', getUserId)
userRouter.patch('/:id', editUser)
userRouter.delete('/:id', deleteUser)

export { userRouter }