import { Request, Response } from "express";
import prisma from "../prisma";

export const createTweet = async (req: Request, res: Response) => {
    try {
        await prisma.tweet.create({
            data: {
                content: req.body.content,
                userId: req.user?.id!
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
                },
                LikeTweet: {
                    select: {
                        userId: true,
                    },
                    where: {
                        userId: req.user?.id
                    }
                }
            },
            orderBy: [{ createdAt: 'desc' }]
        })

        const data = tweets.map((item) => {
            const isLike = item.LikeTweet.length > 0
            return { ...item, isLike }
        })

        res.status(200).send({
            status: 'ok',
            tweets: data
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

export const likeTweet = async (req: Request, res: Response) => {
    try {
        const { tweetId } = req.params
        await prisma.$transaction( async (tx) => {
            const like = await tx.likeTweet.findUnique({
                where: {
                    userId_tweetId: {
                        userId: req.user?.id!,
                        tweetId: +tweetId
                    }
                }
            })

            if (like) {
                await tx.likeTweet.delete({
                    where: {
                        userId_tweetId: {
                            userId: req.user?.id!,
                            tweetId: +tweetId
                        }
                    }
                })
                await tx.tweet.update({
                    where: { id: +tweetId },
                    data: { likes: { decrement: 1 } }
                })
            } else {
                await tx.likeTweet.create({
                    data: {
                        userId: req.user?.id!,
                        tweetId: +tweetId
                    }
                })
                await tx.tweet.update({
                    where: { id: +tweetId },
                    data: { likes: { increment: 1 } }
                })
            }
        })
        res.status(200).send({
            status: 'ok'
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}