import { Request, Response } from "express";
import { IExpense } from "../type";
import fs from 'fs'

const data: IExpense[] = JSON.parse(fs.readFileSync('./src/data/expense.json', 'utf-8'))

export const getExpense = (req: Request, res: Response) => {
    const { category, start, end, type } = req.query
    const startDate = new Date(start as string)
    const endDate = new Date(end as string)

    const expense = data.filter((item) => {
        let isValid = true
        if (category) {
            isValid = isValid && item.category == category
        }
        if (type) {
            isValid = isValid && item.type == type
        }
        if (start && end) {
            isValid = isValid && new Date(item.date) >= startDate && new Date(item.date) <= endDate
        }
        return isValid
    })

    const nominal_expense = expense.filter((item) => item.type == 'expense').reduce((prev, curr) => prev + curr.nominal, 0)
    const nominal_income = expense.filter((item) => item.type == 'income').reduce((prev, curr) => prev + curr.nominal, 0)

    res.status(200).send({
        status: 'ok',
        nominal_expense,
        nominal_income,
        expense
    })
}

export const getExpenseId = (req: Request, res: Response) => {
    const expense = data.find((item) => item.id == +req.params.id)
    res.status(200).send({
        status: 'ok',
        expense
    })
}

export const createExpense = (req: Request, res: Response) => {
    const id = Math.max(...data.map((item) => item.id)) + 1
    const { title, nominal, type, category, date } = req.body
    const newData = { id, title, nominal, type, category, date }

    data.push(newData)
    fs.writeFileSync("./src/data/expense.json", JSON.stringify(data), 'utf-8')

    res.status(201).send({
        status: 'ok',
        msg: 'Expense created ✅'
    })
}

export const deleteExpense = (req: Request, res: Response) => {
    const idx = data.findIndex((item) => item.id == +req.params.id)
    data.splice(idx, 1)

    fs.writeFileSync("./src/data/expense.json", JSON.stringify(data), 'utf-8')

    res.status(201).send({
        status: 'ok',
        msg: `Expense with id ${req.params.id} deleted ✅`
    })
}

export const editExpense = (req: Request, res: Response) => {
    const idx = data.findIndex((item) => item.id == +req.params.id)

    data[idx] = { ...data[idx], ...req.body }
    fs.writeFileSync("./src/data/expense.json", JSON.stringify(data), 'utf-8')

    res.status(201).send({
        status: 'ok',
        msg: `Expense with id ${req.params.id} updated ✅`
    })
}