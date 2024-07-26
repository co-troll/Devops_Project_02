
let token = null;
let oauthType = null;
const changeImge = (el) => {
    console.log(el.files[0])
    const fileReader = new FileReader();
    fileReader.onload = (result) => {
        const img = document.getElementById("img");
        if (result.target)
            img.src = result.target.result;
    }
    fileReader.readAsDataURL(el.files[0]);
}
const submitHandler = async (event) => {
    const _input = document.querySelector("#userImg");
    const el = event.target;
    let data = null;
    //  const formData = new FormData();
    let contentType = null;
    let response = null;
    if (_input.files[0] != null) {
        console.log("test")
        const formData = new FormData();
        console.log(_input.files[0])
        formData.append("file", _input.files[0]);
        console.log(formData.get("file"))
        formData.append("loginId", el.loginId.value);
        formData.append("password", el.password.value);
        formData.append("nickname", el.nickname.value);
        formData.append("oauthType", el.oauthType.value);
        contentType = "multipart/form-data"
        response = await axios.post("http://localhost:3000/user/createUser", formData, {
            headers: {
                "Content-Type": "multipart/form-data;charset=utf-8",
            }
        });
    } else {
        console.log("test1")
        data = {}
        data.loginId = el.loginId.value;
        data.password = el.password.value;
        data.nickname = el.nickname.value;
        data.oauthType = el.oauthType.value;
        contentType = "application/json"
        const query = token ? `?token=${token}` : '';
        const url = 'http://localhost:3000/user/createUser' + query;
        console.log(url)
        response = await axios.post(url, data);
    }
    console.log(response);
    if (response.data) {
        alert("이미 가입된 계정입니다.")
    } else {
        location.href = "http://localhost:8000";
    }
}

window.onload = () => {
    document.querySelector("input[name='oauthType']").value = "email";
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        submitHandler(event);
    }
    token = new URLSearchParams(location.search).get("token");

    if (token) {
        oauthType = new URLSearchParams(location.search).get("oauthType");
        document.querySelector("input[name='oauthType']").value = oauthType;
        const emailForm = document.querySelector(".email-login-form");
        emailForm.style.display = "none"
    }
}

const logout = async () => {
    console.log("test ")
    const response = await axios.post("http://localhost:3000/user/logout");
    if (response.status === 200) {
        location.reload();
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