import { Router } from "express";
import { createTweet, getTweet, likeTweet } from "../controllers/tweet.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { validateTweet } from "../middlewares/validator.middleware";
import { uploader } from "../helpers/uploader";

const tweetRouter = Router()

tweetRouter.post('/', verifyToken, uploader("tweet", "/tweet").single("media"), validateTweet, createTweet)
tweetRouter.get('/', verifyToken, getTweet)
tweetRouter.patch('/like/:tweetId', verifyToken, likeTweet)

export { tweetRouter }