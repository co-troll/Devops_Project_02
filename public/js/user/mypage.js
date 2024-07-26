window.onload = async () => {
    const userInfo = await axios.post("http://localhost:3000/user/mypage", {}, {
        withCredentials: true
    });
    console.log(userInfo)
}