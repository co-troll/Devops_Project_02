import { Router } from 'express'
const router = Router();

router.get("/signin", (req, res) => {
    const { token } = req.cookies;
    const tokenEmpty = !token ? true : false;
    res.render("user/signin", { tokenEmpty });
})

router.get("/mypage", (req, res) => {
    const { token } = req.cookies;
    const tokenEmpty = !token ? true : false;
    res.render("user/mypage", { tokenEmpty });
})

router.get("/signup", (req, res) => {
    const { token } = req.cookies
    const tokenEmpty = !token ? true : false;
    res.render("user/signup", { tokenEmpty });
})


export default router;