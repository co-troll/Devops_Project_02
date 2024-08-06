import axios from "axios";
import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    const { token } = req.cookies;
    console.log(req.cookies);
    const tokenExist = token ? true : false;

    res.render("post", { tokenExist });
})

router.post("/test", async (req, res) => {
    const { token } = req.cookies;
    const data = await axios.post(`https://testcoffeetree.store/user/getUserInfo`, {}, {
        withCredentials: true
    })
    console.log(data);
})

export default router;