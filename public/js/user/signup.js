
let token = null;
let oauthType = null;
const changeImge = (el) => {
    const fileReader = new FileReader();
    fileReader.onload = (result) => {
        const img = document.getElementById("img");
        if (result.target)
            img.src = result.target.result;
    }
    fileReader.readAsDataURL(el.files[0]);
}
const submitHandler = async (event) => {
    if (emptyCheck()) {
        alert("필수 값이 입력되지 않았습니다.")
        return;
    }

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
        response = await axios.post("http://3.38.210.194:3000/user/createUser", formData, {
            headers: {
                "Content-Type": "multipart/form-data;charset=utf-8",
            }
        });
    } else {
        data = {}
        data.loginId = el.loginId.value;
        data.password = el.password.value;
        data.nickname = el.nickname.value;
        data.oauthType = el.oauthType.value;
        contentType = "application/json"
        const query = token ? `?token=${token}` : '';
        const url = 'http://3.38.210.194:3000/user/createUser' + query;
        console.log(url)
        response = await axios.post(url, data);
    }
    console.log(response);
    if (!response.data) {
        alert("이미 가입된 계정입니다.");
    } else {
        location.href = "http://3.38.210.194:8000";
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
        const _form = document.querySelector(".email-form");
        _form.style.display = "none";
    }

    const _input = document.querySelectorAll("input");
    console.log(_input)
    _input.forEach(el => {
        el.onkeyup = (e) => {
            const teg = e.target;
            const parent = e.target.parentNode.parentNode
            if (teg.value == "") {
                const _p = document.createElement("p");
                _p.innerText = "입력된 값이 없습니다.";
                _p.style.color = 'red';
                _p.id = 'emptystr';
                teg.classList.add("is-empty");
                !parent.querySelector("#emptystr") ? parent.append(_p) : '';
            } else {
                teg.classList.contains("is-empty") ? teg.classList.remove("is-empty") : '';
                parent.querySelector("#emptystr") ? parent.querySelector("#emptystr").remove() : '';
            }
        }
    })

}

const logout = async () => {
    const response = await axios.post("http://3.38.210.194:3000/user/logout");
    if (response.status === 200) {
        location.reload();
    }
}

const emptyCheck = () => {
    const _input = document.querySelectorAll("input");
    let isEmpty = false;
    const oauthType = new URLSearchParams(location.search).get("oauthType");
    console.log()
    if (oauthType != undefined && document.querySelector("#nickname").value != '') {
        return false;
    }
    _input.forEach((el) => {
        try {
            const value = el.value;
            if (el.type != "file" && value == '') {
                isEmpty = true;
            }
        } catch (error) {
            console.error(el.target, error)
        }
    })
    return isEmpty;
}

const openKakao = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://3.38.210.194:3000/auth/kakao", "_blank", option);
}

const openGoogle = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://3.38.210.194:3000/auth/google", "_blank", option);
}