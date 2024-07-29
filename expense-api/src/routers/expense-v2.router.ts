import { Router } from "express";
import { createExpenseV2, deleteExpenseV2, getExpenseIdV2, getExpenseV2, updateExpenseV2 } from "../controllers/expense-v2.controller";
import { checkBody, checkEdit } from "../middlewares/expense.middleware";

const expenseRouterV2 = Router()

expenseRouterV2.get('/', getExpenseV2)
expenseRouterV2.get('/:id', getExpenseIdV2)
expenseRouterV2.post('/', checkBody, createExpenseV2)
expenseRouterV2.patch('/:id', checkEdit, updateExpenseV2)
expenseRouterV2.delete('/:id', deleteExpenseV2)

export { expenseRouterV2 }