import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post('/', createUser)
authRouter.post('/login', loginUser)

export { authRouter }