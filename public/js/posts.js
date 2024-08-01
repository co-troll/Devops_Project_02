"use strict";
class Posts {
    constructor() {
    }
    async init() {
        const { data } = await axios.get(`http://localhost:3000/post/postCount`);
        this.postIds = data;
    }
    async renderPost() {
        var _a;
        const count = this.postIds.length < 10 ? this.postIds.length : 10;
        for (let i = 0; i < count; i++) {
            const post = new Post();
            const randint = Math.floor(Math.random() * this.postIds.length + 1);
            const postBox = document.createElement("div");
            postBox.classList.add("postBox");
            const [id] = this.postIds.splice(randint - 1, 1);
            postBox.innerHTML = await post.getPost(id);
            postBox.setAttribute("id", String(id));
            console.log(this.postIds);
            (_a = document.querySelector("#postContainer")) === null || _a === void 0 ? void 0 : _a.append(postBox);
        }
    }
}
const postList = document.querySelectorAll(".postBox");
const postContainer = document.querySelector("#postContainer");
const postUpBtn = document.querySelector("#upBtn");
const postDownBtn = document.querySelector("#downBtn");
const posts = new Posts();
window.onload = async () => {
    var _a;
    await posts.init();
    await posts.renderPost();
    (_a = postContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add("select");
};
const postDown = async () => {
    var _a, _b, _c, _d;
    let selected = document.querySelector(".postBox.select");
    if ((_b = (_a = postContainer.lastElementChild) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.contains("select")) {
        await posts.renderPost();
    }
    if (!selected.nextElementSibling)
        return;
    postEvent = true;
    console.log('Down!');
    commentExit(selected.querySelector(".post > .commentBox"));
    selected.classList.remove("select");
    (_c = selected.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.add("select");
    postUpBtn.removeAttribute("hidden");
    if (!((_d = document.querySelector(".postBox.select")) === null || _d === void 0 ? void 0 : _d.nextElementSibling))
        postDownBtn.setAttribute("hidden", "");
};
const postUp = async () => {
    var _a, _b;
    let selected = document.querySelector(".postBox.select");
    if (!selected.previousElementSibling)
        return;
    postEvent = true;
    console.log('Up!');
    commentExit(selected.querySelector(".post > .commentBox"));
    selected === null || selected === void 0 ? void 0 : selected.classList.remove("select");
    (_a = selected === null || selected === void 0 ? void 0 : selected.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add("select");
    postDownBtn.removeAttribute("hidden");
    if (!((_b = document.querySelector(".postBox.select")) === null || _b === void 0 ? void 0 : _b.previousElementSibling))
        postUpBtn.setAttribute("hidden", "");
};
const _clearTimeOut = () => {
    clearTimeout(postTimeout);
    postTimeout = setTimeout(() => {
        var _a;
        postEvent = false;
        postTimeout = undefined;
        (_a = document.querySelector(".postBox.select")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
};
let postEvent = false;
let postTimeout;
document.onwheel = async (e) => {
    const target = e.target;
    e.stopPropagation();
    if (postEvent || postTimeout || target.id != "postContainer") {
    }
    else if (e.deltaY > 0) {
        await postDown();
    }
    else if (e.deltaY < 0) {
        await postUp();
    }
    _clearTimeOut();
};
document.onkeydown = async (e) => {
    e.preventDefault();
    if (postEvent || postTimeout) { }
    else if (e.key == "ArrowDown") {
        await postDown();
    }
    else if (e.key == "ArrowUp") {
        await postUp();
    }
    _clearTimeOut();
};
postDownBtn.onclick = async () => {
    if (postEvent || postTimeout)
        return;
    await postDown();
    _clearTimeOut();
};
postUpBtn.onclick = async () => {
    if (postEvent || postTimeout)
        return;
    await postUp();
    _clearTimeOut();
};
