
let info = null;
window.onload = async () => {
    const { data } = await axios.post("http://localhost:3000/user/getUserInfo", {}, {
        withCredentials: true
    });
    info = data;
    console.log(data)
    const _nickname = document.querySelector("#nickname");
    const _pw = document.querySelector(".password-wrap");
    const _img = document.querySelector("#userImg");
    const btn1 = document.querySelector("#modifyBtn");
    const btn2 = document.querySelector("#withdrawalBtn");
    _nickname.value = data.nickname
    _img.src = data.imgPath;
    btn1.dataset.id = data.id;
    btn2.dataset.id = data.id;
    if (data.oauthType != 'email')
        _pw.style.display = "none";
}
const modify = async (el) => {
    console.log(info)
    const _form = document.querySelector("#form");
    const { file, password, nickname } = _form;

    let response = null;
    console.log("password", password.value != '')
    if (file.files[0]) {
        const formData = new FormData();
        formData.append("file", file.files[0]);
        formData.append("id", el.dataset.id);
        info.nickname != nickname.value ? formData.append("nickname", nickname.value) : '';
        password.value != '' ? formData.append("password", password.value) : '';
        formData.append("preImg", info.imgPath);
        response = await axios.put("http://localhost:3000/user/modify", formData);
    } else {
        const data = {}
        data.id = el.dataset.id
        info.nickname != nickname.value ? data.nickname = nickname.value : '';
        password.value != '' ? data.password = password.value : '';
        response = await axios.put("http://localhost:3000/user/modify", data);
    }
    if (response.status == 200) {
        alert("변경이 완료되었습니다.");
        //location.href = "http://localhost:8000/user/mypage";
        location.reload();
    }
}

const changeImg = (el) => {
    const fr = new FileReader();
    const _img = document.querySelector("#userImg");
    fr.onload = (result) => {
        const { target } = result;
        _img.src = target.result;
    }
    fr.readAsDataURL(el.files[0]);
}

const withdrawal = async (el) => {
    try {

        const result = await axios.delete("http://localhost:3000/user/delete", {
            withCredentials: true
        })
        if (result.status == 200) {
            location.href = location.origin
        }
    } catch (error) {
        console.error(error)
    }
}