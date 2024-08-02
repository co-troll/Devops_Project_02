async function main() {
    try {

        const { data } = await axios.post(location.protocol + "//" + location.hostname + ":3000" + "/user/getUserInfo", {}, {
            withCredentials: true
        });

        if (data) {
            const _wrap = document.querySelector(".logoutLogo");
            const _img = document.querySelector("#userImg");

            const _nickname = document.querySelector("#nickname");
            _img.src = data.imgPath;
            _img.style.width = "20px";
            _img.style.height = "20px";
            _nickname.innerText = data.nickname

            createMenu();

            const _hamburger = document.querySelector(".hamburger");
            console.log(_hamburger);
            if (_hamburger) {
                _hamburger.onclick = (el) => {
                    const _menus = document.querySelector(".hamburger-menus");
                    console.log(_menus);

                    if (_menus.classList.contains("is-show")) {
                        _menus.classList.remove("is-show");
                        _menus.classList.add("is-close");
                    } else {
                        _menus.classList.add("is-show");
                        _menus.classList.remove("is-close");
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}
main();


const login = () => {
    console.log(location)
    location.href = location.origin + "/user/signin";
}

function createMenu() {
    const _h = document.querySelector(".hamburger");
    const _div = document.createElement("div");
    const _menu1 = document.createElement("p");
    const _menu2 = document.createElement("p");

    _div.classList.add("hamburger-menus", "is-close")

    _menu1.innerText = '로그아웃';
    _menu2.innerText = '마이페이지';

    _menu1.onclick = async () => {
        const response = await axios.post(location.protocol + "//" + location.hostname + ":3000/user/logout", {}, {
            withCredentials: true
        })
        console.log(response)
        if (response.status === 200) {
            location.reload();
        }
    }
    _menu2.onclick = async () => {
        location.href = location.origin + "/user/mypage"
    }
    _div.append(_menu1, _menu2)
    _h.append(_div);
}