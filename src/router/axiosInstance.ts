import axios from "axios";

const instance = axios.create({
    baseURL: "https://testcoffeetree.store",
    withCredentials: true
})

export default instance