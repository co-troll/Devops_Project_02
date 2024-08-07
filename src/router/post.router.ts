import axios from "./axiosInstance";
import { Router } from "express";

const router: Router = Router();

// router.post("/getInfo", async (req, res) => {
//     const { token } = req.cookies;
//     console.log("프론트에서 찍는 토큰", token);
//     const { data } = await axios.post("https://testcoffeetree.store/user/getUserInfo", {}, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         },
//         withCredentials: true
//     })
//     console.log('"프론트에서 찍는 데이터', data);
//     res.send(data);
// })

router.post("/create", async (req, res) => {
    const { token } = req.cookies;
    res.send(req);
    const data = req.body;

    await axios.post(`/post/create`, data, {
        headers: {
            "Content-Type": "multipart/form-data;charset=utf-8",
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.get("/findPostByUserCount", async (req, res) => {
    const { token } = req.cookies;

    const { data } = await axios.get(`/post/findPostByUserCount`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })

    res.send(data);
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const data = req.body;
    const { token } = req.cookies;

    await axios.put(`/post/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data;charset=utf-8",
            'Authorization': `Bearer ${token}`,
        }   
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.delete(`/post/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

export default router;