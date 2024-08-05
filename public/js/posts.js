"use strict";
class Posts {
    constructor() {
    }
    async init() {
        const { data } = await axios.get(`http://localhost:3000/post/postCount`);
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
    var _a;
    console.log(startId);
    postContainer.innerHTML = "";
    await posts.init();
    await posts.renderPost(startId);
    (_a = postContainer.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add("select");
    // comment
    await commentRender();
    // reply
    await replyRender();
    // postMenu
    await postMenuRender();
};
window.onload = async () => {
    await postRender(1);
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
    var _a;
    let postPopup = document.querySelector("#postPopup");
    let selected = (_a = document.querySelector(".postBox.select")) === null || _a === void 0 ? void 0 : _a.querySelector(".commentBox");
    if (postEvent || postTimeout || !postPopup.hidden || !selected.hidden) {
    }
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
// const instance = axios.create({
//     baseURL: "http://localhost:3000", // 서버 포트 ex) http://localhost:8080/
//   });
//   instance.interceptors.request.use(
//     (config) => {
//       const accessToken = Cookies.get("accessToken"); // Cookies를 이용해 accessToken을 가져옵니다.
//       try {
//         if (accessToken) {
//           config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         return config;
//       } catch (err) {
//         console.error("[_axios.interceptors.request] config : " + err.message);
//       }
//       return config;
//     },
//     (error) => {
//       // 요청 에러 직전 호출됩니다.
//       return Promise.reject(error);
//     }
//   );
