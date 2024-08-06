
const tokenCheck = (token) => {
    if (token) {
        alert("이미 로그인되어 있습니다.");
        history.back();
    }
}

const login = async () => {
    await axios.post(`https://dropdot.shop/test`, {}, {
        withCredentials: true
    })
    location.href = location.origin + "/user/signin";
}


const menu = (el) => {
    const child = el.parentNode.querySelector(".user-menu");
    if (child.classList.contains("is-open")) {
        child.classList.remove("is-open");
        setTimeout(() => {
            child.style.border = 'none';
        }, 750)

    } else {
        child.classList.add("is-open");
        child.style.border = '1px solid';
        child.style.borderColor = "rgb(227, 227, 227)"
    }
}

const mypage = () => {
    location.href = `${location.origin}/user/mypage`
}

const searchMyPost = async () => {
    try {
        postContainer.innerHTML = "";
        await posts.userInit();
        await postRender();
        postContainer.firstElementChild?.classList.add("select");
        if (!document.querySelector(".postBox.select")?.nextElementSibling) 
            postDownBtn.setAttribute("hidden", "")
        if (!document.querySelector(".postBox.select")?.previousElementSibling) 
            postUpBtn.setAttribute("hidden", "")
    } catch (error) {
        console.log(error);   
    }
}

const logout = async () => {
    console.log("test")
    const response = await axios.post(`${HOST}/user/logout`, {}, {
        withCredentials: true
    });
    console.log(response);
    if (response.status === 200) {
        location.reload();
    }
}