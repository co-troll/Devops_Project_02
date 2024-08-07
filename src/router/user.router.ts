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
        console.log(data);
        //sessionStorage.setItem("token", data.token);


        const date = new Date();
        date.setMinutes(date.getMinutes() + 60)
        res.cookie("token", data.token, { httpOnly: true, expires: date, sameSite: "none", secure: true });


        res.redirect("/");
    } catch (error) {
        console.error(error)
    }
})

router.post("/getInfo", async (req, res) => {
    const { token } = req.cookies;
    console.log("프론트에서 찍는 토큰", token);
    const { data } = await axios.post("https://testcoffeetree.store/user/getUserInfo", {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true
    })
    console.log('"프론트에서 찍는 데이터', data);
    res.send(data);
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