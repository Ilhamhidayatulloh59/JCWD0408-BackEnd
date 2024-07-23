import fs from 'fs'
import { IExpense } from '../type'
import { NextFunction, Request, Response } from 'express'


export const checkId = (req: Request, res: Response, next: NextFunction) => {
    const data: IExpense[] = JSON.parse(fs.readFileSync('./src/data/expense.json', 'utf-8'))
    const expense = data.find((item) => item.id == +req.params.id)

    if (expense) {
        next()
    } else {
        return res.status(404).send({
            status: 'error',
            msg: 'Expense not found 🚫'
        })
    }
}

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
    const { title, nominal, type, category, date } = req.body

    if (title && nominal && type && category && date) {
        next()
    } else {
        return res.status(404).send({
            status: 'error',
            msg: 'Data tidak lengkap 🚫'
        })
    }
}

export const checkEdit = (req: Request, res: Response, next: NextFunction) => {
    const opt = ["title", "nominal", "type", "category", "date"]
    let isValid = true

    for (let key in req.body) {
        isValid = isValid && opt.includes(key)
    }

    if (isValid) {
        next() 
    } else {
        return res.status(400).send({
            status: 'error',
            msg: 'Invalid input 🚫'
        })
    }
}