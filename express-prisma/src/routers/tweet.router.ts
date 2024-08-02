import { Router } from "express";
import { createTweet, getTweet } from "../controllers/tweet.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const tweetRouter = Router()

tweetRouter.post('/', verifyToken, createTweet)
tweetRouter.get('/', getTweet)

export { tweetRouter }