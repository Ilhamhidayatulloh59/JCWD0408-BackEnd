import { Request, Response, Router } from "express";
import { userRouter } from "./routers/user.router";
import { tweetRouter } from "./routers/tweet.router";
import { authRouter } from "./routers/auth.router";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to my Api')
})

// add another route here
router.use('/users', userRouter)
router.use('/tweets', tweetRouter)
router.use('/auth', authRouter)

export default router
