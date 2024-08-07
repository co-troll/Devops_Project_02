import axios from "./axiosInstance";
import { Router } from "express";

const router: Router = Router();

router.post('/createReply', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const { token } = req.cookies;

    await axios.post(`/reply/createReply`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const data = req.body;
    const { token } = req.cookies;

    await axios.put(`/reply/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.delete(`/reply/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

export default router;