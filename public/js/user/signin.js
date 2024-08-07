
window.onload = () => {
    setTimeout(() => {
        const header = document.querySelector(".header");
        const content = document.querySelector(".content");
        header.style.display = "flex";
        content.hidden = false;
    }, 500);
    const _img = document.querySelector("#logo");


    _img.onclick = () => {
        location.href = "/"
    }
}

const signin = async () => {
    const _form = document.querySelector("#form");
    const { loginId, password, oauthType } = _form;
    const response = await axios.post(`/user/signin`,

        {
            loginId: loginId.value,
            password: password.value,
            oauthType: oauthType.value
        },
        {
            withCredentials: true
        })
    if (response.status == 200) {
        console.log("good login")
        // location.href = location.origin

    } else if (response.status == 400) {
        alert("계정을 다시 확인해주세요");
    }
}

const openKakao = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open(`${HOST}/auth/kakao`, "_blank", option);
}

const openGoogle = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open(`${HOST}/auth/google`, "_blank", option);
}