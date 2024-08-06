import { Router } from 'express'
import axios from 'axios';
const router = Router();

router.get("/signin", (req, res) => {
    res.render("user/signin");
})

router.post("/signin", async (req, res) => {
    const { body } = req
    await axios.post("https://testcoffeetree.store/user/signin", body, { withCredentials: true });
    res.redirect("/");
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