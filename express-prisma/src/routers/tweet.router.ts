import { Router } from "express";
import { createTweet, getTweet } from "../controllers/tweet.controller";

const tweetRouter = Router()

tweetRouter.post('/:userId', createTweet)
tweetRouter.get('/', getTweet)

export { tweetRouter }