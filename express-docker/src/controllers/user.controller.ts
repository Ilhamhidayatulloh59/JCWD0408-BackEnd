import axios from "axios";
import { Request, Response } from "express";
import { redis } from "../helpers/redis";


export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const redisData = await redis.get('users')
            if (redisData) {
                return res.status(200).send({
                    status: 'ok',
                    posts: JSON.parse(redisData)
                })
            }

            const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
            await redis.setex('users', 60, JSON.stringify(data))
            return res.status(200).send({
                status: 'ok',
                posts: data
            })
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}