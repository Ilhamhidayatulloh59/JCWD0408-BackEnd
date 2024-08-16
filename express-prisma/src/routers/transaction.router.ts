import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { createTransaction, updateStatusTrans } from "../controllers/transaction.controller";

const transactionRouter = Router()

transactionRouter.post('/', verifyToken, createTransaction)
transactionRouter.post('/status', updateStatusTrans)

export { transactionRouter }