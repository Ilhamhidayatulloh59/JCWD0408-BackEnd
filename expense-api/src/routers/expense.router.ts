import { Router } from 'express'
import { createExpense, deleteExpense, editExpense, getExpense, getExpenseId } from '../controllers/expense.controller'
import { checkBody, checkId } from '../middlewares/expense.middleware'

const expenseRouter = Router()

expenseRouter.get('/', getExpense)
expenseRouter.get('/:id', checkId, getExpenseId)
expenseRouter.post('/', checkBody, createExpense)
expenseRouter.delete('/:id', checkId, deleteExpense)
expenseRouter.patch('/:id', checkId, editExpense)

export { expenseRouter }