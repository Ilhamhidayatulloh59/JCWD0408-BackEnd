import { Request, Response } from "express";
import { IUser } from "../types/users";
import fs from 'fs'

export const getUsers = (req: Request, res: Response) => {
    const users: IUser[] = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'))

    res.status(200).send({
        status: 'ok',
        users
    })
}

export const getUserId = (req: Request, res: Response) => {
    const users: IUser[] = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'))
    const data = users.find((item) => item.id == +req.params.id)

    if (!data) {
        return res.status(404).send({
            status: 'error',
            msg: 'user not found!'
        })
    }

    res.status(200).send({
        status: 'ok',
        user: data
    })
}

export const createUser = (req: Request, res: Response) => {
    const users: IUser[] = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'))
    const id = Math.max(...users.map((item) => item.id)) + 1
    const newUser = {
        id,
        name: req.body.name,
        age: req.body.age
    }
    users.push(newUser)

    fs.writeFileSync('./src/data/users.json', JSON.stringify(users), 'utf-8')

    res.status(201).send({
        status: 'ok',
        msg: 'user created!'
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const users: IUser[] = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'))

    const idx = users.findIndex((item) => item.id == +req.params.id)
    if (idx == -1) {
        return res.status(404).send({
            status: 'error',
            msg: 'user not found!'
        })
    }
    users.splice(idx, 1)
    fs.writeFileSync('./src/data/users.json', JSON.stringify(users), 'utf-8')
    res.status(201).send({
        status: 'ok',
        msg: `user with id ${req.params.id} deleted!`
    })
}