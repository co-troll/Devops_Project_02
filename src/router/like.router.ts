import axios from "./axiosInstance";
import { Router } from "express";

const router: Router = Router();

router.post('/post-likes/like/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/post-likes/like/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.post('/post-likes/dislike/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/post-likes/dislike/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.post('/reply-likes/like/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/reply-likes/like/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.post('/reply-likes/dislike/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/reply-likes/dislike/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.post('/comment-likes/like/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/comment-likes/like/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})

router.post('/reply-likes/dislike/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    await axios.post(`/reply-likes/dislike/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }   
    })
})


export default router;