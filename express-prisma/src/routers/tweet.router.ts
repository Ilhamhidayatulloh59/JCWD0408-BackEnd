import { Router } from "express";
import { createTweet, getTweet, likeTweet } from "../controllers/tweet.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const tweetRouter = Router()

tweetRouter.post('/', verifyToken, createTweet)
tweetRouter.get('/', verifyToken, getTweet)
tweetRouter.patch('/like/:tweetId', verifyToken, likeTweet)

export { tweetRouter }