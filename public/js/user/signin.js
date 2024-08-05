
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
    window.open("https://testcoffeetree.store/auth/kakao", "_blank", option);
}

const openGoogle = () => {
    let option = 'width=800,height=1000,scrollbars=yes,top=100,left=350,resizable=yes';
    window.open("https://testcoffeetree.store/auth/google", "_blank", option);
}