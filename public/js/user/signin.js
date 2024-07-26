


const signin = async () => {
    const _form = document.querySelector("form");
    const { loginId, password } = _form;
    const _form2 = new FormData();
    _form2.append("loginId", loginId.value)
    _form2.append("password", password.value)
    _form2.append("oauthType", "email")
    const data = await axios.post("http://localhost:3000/user/signin", _form2, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            withCredentials: true
            // 이 속성이 있어야 브라우저의 쿠키를 포함시켜서 보낼수 있고 받을수 있는 해부는 속성
        }
    })

    if (data.status === 201) {
        // location.href = "/";
    }
}


const openKakao = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://localhost:3000/auth/kakao", "_blank", option);
}

const openGoogle = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://localhost:3000/auth/google", "_blank", option);
}