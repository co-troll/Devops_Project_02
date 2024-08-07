import { Router } from 'express'
import axios from 'axios';
const router = Router();

router.get("/signin", (req, res) => {
    try {

        const { token } = req.cookies;
        if (token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('이미 로그인되어 있습니다.'); location.reload();</script>")
        }
        res.render("user/signin");
    } catch (error) {
        console.error(error);
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { token } = req.cookies;
        console.log("token", token)
        if (token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('이미 로그인되어 있습니다.');location.reload();</script>")
        }

        const { body } = req
        const { data } = await axios.post("https://testcoffeetree.store/user/signin", body,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const date = new Date();
        date.setMinutes(date.getMinutes() + 60)
        res.cookie("token", data.token, { httpOnly: true, expires: date, sameSite: "none", secure: true });
        res.redirect("/");
    } catch (error) {
        console.error(error)
    }
})

router.post("/getInfo", async (req, res) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('권한이 없습니다.');location.reload();</script>")
        }

        const { data } = await axios.post("https://testcoffeetree.store/user/getUserInfo", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        res.send(data);
    } catch (error) {
        console.error(error)
    }
})

router.get("/mypage", async (req, res) => {
    try {

        const { token } = req.cookies;
        if (!token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('권한이 없습니다.');location.reload();</script>")
        }
        const { data } = await axios.post("https://testcoffeetree.store/user/getUserInfo", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        res.render("user/mypage", { data });
    } catch (error) {
        console.error(error)
    }
})

router.get("/signup", (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('이미 로그인되어 있습니다.');location.reload();</script>")
        }
        res.render("user/signup");
    } catch (error) {
        console.error(error);
    }
})
router.post("/logout", (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            res.header("content-type", "text/html")
            res.status(500).send("<script>alert('이미 로그인되어 있습니다.');location.reload();</script>")
        }
        res.clearCookie('token');
        res.render("user/signin");
    } catch (error) {
        console.error(error);
    }
})


export default router;