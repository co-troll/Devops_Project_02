async function main() {
    try {
        const { data } = await axios.post(location.protocol + "//" + location.hostname + ":3000" + "/user/getUserInfo", {}, {
            withCredentials: true
        });

        if (data) {
            const _img = document.querySelector("#userImg");

            const _nickname = document.querySelector("#nickname");
            _img.src = data.imgPath;
            _img.style.width = "20px";
            _img.style.height = "20px";
            _nickname.innerText = data.nickname

        }
    } catch (error) {
        console.error(error);
    }
}
main();

const tokenCheck = (token) => {
    if (token) {
        alert("이미 로그인되어 있습니다.");
        history.back();
    }
}

const login = () => {
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
    location.href = 'http://localhost:8000/user/mypage'
}

const logout = async () => {
    console.log("test")
    const response = await axios.post("http://localhost:3000/user/logout", {}, {
        withCredentials: true
    });
    console.log(response);
    if (response.status === 200) {
        location.reload();
    }
}