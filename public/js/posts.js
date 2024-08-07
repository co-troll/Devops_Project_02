"use strict";
class Posts {
    constructor() {
    }
    async init() {
        const { data } = await axios.get(`${HOST}/post/postCount`);
        console.log(1);
        this.postIds = data;
    }
    async searchInit(text) {
        const { data } = await axios.get(`${HOST}/post/searchCount?searchTarget=${text}`);
        this.postIds = data;
    }
    async userInit() {
        const { data } = await axios.get(`/post/findPostByUserCount`, {
            withCredentials: true
        });
        this.postIds = data;
    }
    async renderPost(startId) {
        var _a, _b, _c;
        let count = this.postIds.length < 10 ? this.postIds.length : 10;
        if (startId == -1) {
            count--;
            const post = new Post();
            const postBox = document.createElement("div");
            postBox.classList.add("postBox");
            const id = this.postIds.pop();
            await post.setPost(id);
            postBox.innerHTML = await post.getPost();
            postBox.dataset.id = String(id);
            console.log(this.postIds);
            (_a = document.querySelector("#postContainer")) === null || _a === void 0 ? void 0 : _a.append(postBox);
            await this.renderComment(id);
        }
        else if (startId) {
            count--;
            const post = new Post();
            const postBox = document.createElement("div");
            postBox.classList.add("postBox");
            this.postIds = this.postIds.filter(num => num !== startId);
            await post.setPost(startId);
            postBox.innerHTML = await post.getPost();
            postBox.dataset.id = String(startId);
            console.log(this.postIds);
            (_b = document.querySelector("#postContainer")) === null || _b === void 0 ? void 0 : _b.append(postBox);
            await this.renderComment(startId);
        }
        for (let i = 0; i < count; i++) {
            const post = new Post();
            const randint = Math.floor(Math.random() * this.postIds.length + 1);
            const postBox = document.createElement("div");
            postBox.classList.add("postBox");
            const [id] = this.postIds.splice(randint - 1, 1);
            await post.setPost(id);
            postBox.innerHTML = await post.getPost();
            postBox.dataset.id = String(id);
            (_c = document.querySelector("#postContainer")) === null || _c === void 0 ? void 0 : _c.append(postBox);
            await this.renderComment(id);
        }
    }
    async renderComment(postId) {
        const comment = new Comments();
        await comment.setComment(postId);
        for (let i = 0; i < comment.comments.length; i++) {
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment");
            const { html, id, countReplys } = await comment.getComment(i);
            commentBox.innerHTML = html;
            commentBox.dataset.id = String(id);
            const replyBox = document.createElement("div");
            replyBox.classList.add("replyBox");
            const replyViewBtn = document.createElement("button");
            replyViewBtn.classList.add("replyViewBtn");
            replyViewBtn.hidden = true;
            replyViewBtn.onclick = (e) => {
                const arrow = replyViewBtn.querySelector(".replyViewArrow");
                if (replyViewBtn.hidden) {
                    arrow.style.transform = "rotate(180deg)";
                    replyViewBtn.hidden = false;
                    replyBox.style.height = "max-content";
                }
                else {
                    arrow.removeAttribute("style");
                    replyBox.removeAttribute("style");
                    replyViewBtn.hidden = true;
                }
            };
            const replyHtml = `
<div class="replyViewArrow">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
        width="24" focusable="false"
        style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
        aria-hidden="true">
        <path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z"></path>
    </svg>
</div>
<span>답글 <b>${countReplys}</b>개</span>

`;
            const postBoxes = document.querySelectorAll(".postBox");
            postBoxes.forEach((el) => {
                var _a, _b;
                if (el.dataset.id == String(postId)) {
                    (_a = el.querySelector(".commentBody")) === null || _a === void 0 ? void 0 : _a.append(commentBox);
                    if (countReplys) {
                        replyViewBtn.innerHTML = replyHtml;
                        replyBox.append(replyViewBtn);
                        (_b = el.querySelector(".commentBody")) === null || _b === void 0 ? void 0 : _b.append(replyBox);
                    }
                }
            });
            await this.renderReply(id);
        }
    }
    async renderReply(commentId) {
        const reply = new Replys();
        await reply.setReplys(commentId);
        for (let i = 0; i < reply.replys.length; i++) {
            const replyBox = document.createElement("div");
            replyBox.classList.add("reply");
            const { html, id } = await reply.getReply(i);
            replyBox.innerHTML = html;
            replyBox.dataset.id = String(id);
            const comment = document.querySelectorAll(".comment");
            comment.forEach((el) => {
                var _a;
                if (el.dataset.id == String(commentId)) {
                    (_a = el.nextElementSibling) === null || _a === void 0 ? void 0 : _a.append(replyBox);
                }
            });
        }
    }
}
const postContainer = document.querySelector("#postContainer");
const postUpBtn = document.querySelector("#upBtn");
const postDownBtn = document.querySelector("#downBtn");
const posts = new Posts();
const postRender = async (startId) => {
    try {
        await posts.renderPost(startId);
        // comment
        await commentRender();
        // reply
        await replyRender();
        // postMenu
        await postMenuRender();
        // createBtn
        if (TOKEN) {
            const createBtn = document.querySelector("#createBtn");
            createBtn.hidden = false;
        }
    }
    catch (error) {
        console.log(error);
    }
};
// window.onload = async () => {
//     await postRender(1);
//}
const postDown = async () => {
    var _a, _b, _c, _d;
    let selected = document.querySelector(".postBox.select");
    if ((_b = (_a = postContainer.lastElementChild) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.contains("select")) {
        await postRender();
    }
    if (!(selected === null || selected === void 0 ? void 0 : selected.nextElementSibling))
        return;
    postEvent = true;
    console.log('Down!');
    commentExit(selected === null || selected === void 0 ? void 0 : selected.querySelector(".post > .commentBox"));
    selected === null || selected === void 0 ? void 0 : selected.classList.remove("select");
    (_c = selected === null || selected === void 0 ? void 0 : selected.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.add("select");
    postUpBtn.removeAttribute("hidden");
    if (!((_d = document.querySelector(".postBox.select")) === null || _d === void 0 ? void 0 : _d.nextElementSibling))
        postDownBtn.setAttribute("hidden", "");
};
const postUp = async () => {
    var _a, _b;
    let selected = document.querySelector(".postBox.select");
    if (!(selected === null || selected === void 0 ? void 0 : selected.previousElementSibling))
        return;
    postEvent = true;
    console.log('Up!');
    commentExit(selected === null || selected === void 0 ? void 0 : selected.querySelector(".post > .commentBox"));
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
document.onmousedown = (e) => {
    if (e.button == 1)
        e.preventDefault();
};
document.onkeydown = async (e) => {
    var _a;
    let postPopup = document.querySelector("#postPopup");
    let selected = (_a = document.querySelector(".postBox.select")) === null || _a === void 0 ? void 0 : _a.querySelector(".commentBox");
    if (postEvent || postTimeout || !postPopup.hidden || !selected.hidden) {
    }
    else if (e.key == "ArrowDown") {
        e.preventDefault();
        await postDown();
    }
    else if (e.key == "ArrowUp") {
        e.preventDefault();
        await postUp();
    }
    else if (e.key == " ") {
        e.preventDefault();
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
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
searchInput.oninput = () => {
    if (searchInput.value)
        searchBtn.disabled = false;
    else
        searchBtn.disabled = true;
};
searchBtn.onclick = async () => {
    var _a, _b, _c;
    try {
        postContainer.innerHTML = "";
        const searchInput = document.querySelector("#searchInput");
        await posts.searchInit(searchInput.value);
        await postRender();
        (_a = postContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add("select");
        if (!((_b = document.querySelector(".postBox.select")) === null || _b === void 0 ? void 0 : _b.nextElementSibling))
            postDownBtn.setAttribute("hidden", "");
        if (!((_c = document.querySelector(".postBox.select")) === null || _c === void 0 ? void 0 : _c.previousElementSibling))
            postUpBtn.setAttribute("hidden", "");
    }
    catch (error) {
        console.log(error);
    }
};
