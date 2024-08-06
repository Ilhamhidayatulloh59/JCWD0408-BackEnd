import { Request, Response } from "express"
import prisma from "../prisma"
import { hashPass } from "../helpers/hashPassword"
import { compare } from "bcrypt"
import { createToken } from "../helpers/createToken"
import { transporter } from "../helpers/nodemailer"
import path from "path"
import fs from "fs"
import handlebars from "handlebars"
import { responseError } from "../helpers/responseError"

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

        const newUser = await prisma.user.create({ data: { ...req.body, password } })
        const token = createToken({ id: newUser.id, role: newUser.role })

        const templatePath = path.join(__dirname, "../templates", "verify.hbs")
        const templateSource = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(templateSource)
        const html = compiledTemplate({
            username: req.body.username,
            link: `http://localhost:3000/verify/${token}`
        })

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: req.body?.email,
            subject: 'Welcome to twitter',
            html
        })

        res.status(200).send({
            status: 'ok',
            msg: 'User created ✅'
        })
    } catch (err) {
        responseError(res, err)
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

        if (!isValidPass) {
            const userUpdate = await prisma.user.update({
                where: { id: user.id },
                data: { login_attempt: { increment: 1 } }
            })
            if (userUpdate.login_attempt == 3) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { isVerify: false, login_attempt: 0 }
                })
                throw 'Your account has been suspended!'
            }
            throw `Incorrect password!, ${3 - userUpdate.login_attempt} more times`
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { login_attempt: 0 }
        })
        const token = createToken({ id: user.id, role: user.role })

        res.status(200).send({
            status: 'ok',
            msg: 'Login success',
            token,
            user
        })

    } catch (err) {
        responseError(res, err)
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user?.id }
        })
        if (user?.isVerify) throw 'User has already been Verified!'
        await prisma.user.update({
            where: { id: req.user?.id },
            data: { isVerify: true }
        })
        res.status(200).send({
            status: 'ok',
            msg: 'User Verified! ✅'
        })
    } catch (err) {
        responseError(res, err)
    }
}