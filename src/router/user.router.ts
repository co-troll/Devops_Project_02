import { Router } from 'express'
import axios from 'axios';
const router = Router();

router.get("/signin", (req, res) => {
    res.render("user/signin");
})

router.post("/signin", async (req, res) => {
    try {

        const { body } = req
        const { data } = await axios.post("https://testcoffeetree.store/user/signin", body, { withCredentials: true });
        const date = new Date();
        date.setMinutes(date.getMinutes() + 60)
        //res.cookie("token", data.token, { httpOnly: true, expires: date, sameSite: "none", secure: true, domain: "https://testcoffeetree.store", path: "/" });
        res.cookie("token", data.token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        console.error("")
    }
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