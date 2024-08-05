
window.onload = () => {


    setTimeout(() => {
        const header = document.querySelector(".header");
        const content = document.querySelector(".content");
        header.removeAttribute("hidden");
        content.removeAttribute("hidden");
    }, 1000);
    const _img = document.querySelector("#logo");

    //console.log(location.protocol + "://" + location.hostname + ":" + location.port)
    _img.onclick = () => {
        location.href = location.protocol + "//" + location.hostname + ":" + location.port
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