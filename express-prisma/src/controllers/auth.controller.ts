import { Request, Response } from "express"
import prisma from "../prisma"
import { hashPass } from "../helpers/hashPassword"
import { compare } from "bcrypt"
import { createToken } from "../helpers/createToken"

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: req.body.username },
                    { email: req.body.email },
                ]
            }
        })
        if (user?.email == req.body.email) throw 'email has been used'
        if (user?.username == req.body.username) throw 'username has been used'

        const password = await hashPass(req.body.password)

        await prisma.user.create({ data: { ...req.body, password } })
        res.status(200).send({
            status: 'ok',
            msg: 'User created ✅'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: req.body.data },
                    { email: req.body.data }
                ]
            }
        })

        if (!user) throw "User not found"
        if (!user.isVerify) throw "User not verify"

        const isValidPass = await compare(req.body.password, user.password)
        if (!isValidPass) throw "Incorrect password!"

        const token = createToken({ id: user.id, role: user.role })

        res.status(200).send({
            status: 'ok',
            msg: 'Login success',
            token,
            user
        })

    } catch (err) {
        res.status(400).send({
            status: 'ok',
            msg: err
        })
    }
}