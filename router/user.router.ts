import { Router } from 'express'
const router = Router();

router.get("/signin", (req, res) => {
    res.render("user/signin");
})

router.get("/mypage", (req, res) => {
    res.render("user/mypage");
})

router.get("/signup", (req, res) => {
    const { token } = req.cookies
    res.render("user/signup");
})

router.get("/mypage", (req, res) => {
    const { token } = req.cookies;
    console.log("yrydyrye")
    console.log(token)
    res.render("mypage");
})
export default router;