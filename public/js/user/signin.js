
window.onload = () => {
    setTimeout(() => {
        const header = document.querySelector(".header");
        const content = document.querySelector(".content");
        header.style.display = "flex";
        content.hidden = false;
    }, 800);
    const _img = document.querySelector("#logo");


    _img.onclick = () => {
        location.href = location.protocol + "//" + location.hostname + ":" + location.port
    }
}

const openKakao = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://3.38.210.194:3000/auth/kakao", "_blank", option);
}

const openGoogle = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("http://3.38.210.194:3000/auth/google", "_blank", option);
}