import { Request, Response, Router } from "express";
import prisma from "./prisma";
import axios from "axios";

const router = Router()

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).send({
            status: 'ok',
            users
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
})

router.get('/pokemons', async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
        res.status(200).json(data.results)
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
})

export default router