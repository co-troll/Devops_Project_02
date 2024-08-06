import axios from "axios";
import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    const { token } = req.cookies;
    console.log(req.cookies);
    const tokenExist = token ? true : false;

    res.render("post", { tokenExist });
})

export default router;