import { Router } from 'express'
import userRouter from './user.router';
import postRouter from './post.router';
import commentRouter from './comment.router';
import replyRouter from './reply.router';
import likeRouter from './like.router'
const router = Router();

router.get("/", (req, res) => {
    res.render("post");
})

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/reply", replyRouter);
router.use("/", likeRouter);




export default router;
