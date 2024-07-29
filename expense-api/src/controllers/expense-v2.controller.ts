import { Request, Response } from "express";
import db from "../config/db";
import { QueryError, ResultSetHeader } from "mysql2";
import { IExpense } from "../type";

export const getExpenseV2 = (req: Request, res: Response) => {
    db.query("SELECT * FROM expense", (err: QueryError, result: IExpense[]) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(200).send({
            status: 'ok',
            expense: result
        })
    })
}

export const getExpenseIdV2 = (req: Request, res: Response) => {
    const { id } = req.params
    db.query(`SELECT * FROM expense WHERE id = ${id}`, (err: QueryError, result: IExpense[]) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        } else if (result.length == 0) {
            return res.status(400).send({
                status: 'error',
                msg: 'expense not found'
            })
        }
        return res.status(200).send({
            status: 'ok',
            expense: result
        })
    })
}

export const createExpenseV2 = (req: Request, res: Response) => {
    const { title, nominal, type, category, date } = req.body
    db.query(`
        INSERT INTO expense (title, nominal, type, category, date) 
        values ("${title}", ${nominal}, "${type}", "${category}", "${date}")
    `, (err: QueryError, result: ResultSetHeader) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(201).send({
            status: 'ok',
            msg: 'expense created!'
        })
    })
}

export const updateExpenseV2 = (req: Request, res: Response) => {
    const query = []
    for (let key in req.body) {
        query.push(`${key} = "${req.body[key]}"`)
    }
    db.query(`UPDATE expense SET ${query.join(', ')} WHERE id = ${req.params.id}`,
    (err: QueryError, result: any) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        res.status(200).send({
            status: 'ok',
            msg: 'Expense updated'
        })
    })
}

export const deleteExpenseV2 = (req: Request, res: Response) => {
    const {id} = req.params
    db.query(`DELETE FROM expense WHERE id = ${id}`, (err: QueryError, result: any) => {
        if (err) {
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
        return res.status(200).send({
            status: 'ok',
            msg: 'Expense Deleted'
        })
    })
}