import { Request, Response } from "express";
import prisma from "../prisma";

export const createTweet = async (req: Request, res: Response) => {
    try {
        await prisma.tweet.create({
            data: {
                content: req.body.content,
                userId: +req.params.userId
            }
        })
        res.status(200).send({
            status: 'ok',
            msg: 'Tweet created ✅'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

export const getTweet = async (req: Request, res: Response) => {
    try {
        const tweets = await prisma.tweet.findMany({
            select: {
                id: true,
                content: true,
                media: true,
                createdAt: true,
                likes: true,
                user: {
                    select: {
                        username: true,
                        email: true,
                        avatar: true
                    }
                }
            },
            orderBy: [{ createdAt: 'desc' }]
        })
        res.status(200).send({
            status: 'ok',
            tweets
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}