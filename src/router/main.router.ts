import { Router } from 'express'
import userRouter from './user.router';
import postRouter from './post.router';
const router = Router();

router.use("/user", userRouter);
router.use("/", postRouter);

export default router;