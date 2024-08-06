import { Router } from "express";
import { createUser, loginUser, verifyUser } from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/validator.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const authRouter = Router()

authRouter.post('/', validateRegister, createUser)
authRouter.post('/login', loginUser)
authRouter.patch('/verify', verifyToken, verifyUser)

export { authRouter }