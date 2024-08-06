"use strict";
class Replys {
    constructor() {
        this.replys = [];
    }
    async setReplys(id) {
        const { data } = await axios.get(`${HOST}/reply/${id}`);
        if (Object.keys(data).includes('status')) {
            return;
        }
        else {
            const replyList = data;
            replyList.forEach(async (el) => {
                this.replys.push({
                    replyId: el.id,
                    userId: el.user.id,
                    userImg: el.user.imgPath,
                    userName: el.user.nickname,
                    content: el.content,
                    like: el.replyLikes,
                    likedUserId: el.likedUserId,
                    disLikedUserId: el.dislikedUserId,
                    contentMore: el.content.split("<br>").length - 1 > 4 ? `<span class="replyReadMoreBtn">자세히 보기</span>` : ""
                });
            });
        }
    }
    async createReply(commentId, content) {
        await axios.post(`${HOST}/reply/createReply`, { commentId, content }, {
            withCredentials: true
        });
    }
    async getReply(index) {
        let userCheck = "hidden", likeCheck = "", disLikeCheck = "", likePath = `<path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>`, disLikePath = `<path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>`;
        if (token) {
            userCheck = token.id == this.replys[index].userId ? "" : "hidden";
            likeCheck = this.replys[index].likedUserId.includes(token.id) ? "selected" : "";
            disLikeCheck = this.replys[index].disLikedUserId.includes(token.id) ? "selected" : "";
            likePath = this.replys[index].likedUserId.includes(token.id) ?
                `<path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path>` :
                `<path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>`;
            disLikePath = this.replys[index].disLikedUserId.includes(token.id) ?
                `<path d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z"></path>` :
                `<path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>`;
        }
        const replyHtml = `
<img class="replyUserImg" src="${this.replys[index].userImg}" alt="">
<div class="replyDetail">
    <h2 class="replyUserName">${this.replys[index].userName}</h2>
    <p>${this.replys[index].content}</p>
    ${this.replys[index].contentMore}
    <div class="replyBtnBox">
        <div class="replyLikeBtn ${likeCheck}">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24"
                    width="24" focusable="false"
                    style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
                    aria-hidden="true">
                    ${likePath}
                </svg>
            </div>
        </div>
        <span class="replyLike">${this.replys[index].like}</span>
        <div class="replyDisLikeBtn ${disLikeCheck}">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
                    width="24" focusable="false"
                    style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
                    aria-hidden="true">
                    ${disLikePath}
                </svg>
            </div>
        </div>
        <div class="replyReplyBtn">
            <span>답글</span>
        </div>
        <div class="replyModifyBtn" ${userCheck}>
            <span>수정</span>
        </div>
        <div class="replyDeleteBtn" ${userCheck}>
            <span>삭제</span>
        </div>
    </div>
</div>

`;
        return { html: replyHtml, id: this.replys[index].replyId };
    }
    async modifyReply(replyId, content) {
        await axios.put(`${HOST}/reply/${replyId}`, { content }, {
            withCredentials: true
        });
    }
    async deleteReply(replyId) {
        await axios.delete(`${HOST}/reply/${replyId}`, {
            withCredentials: true
        });
    }
}
const replyRender = async () => {
    const postList = document.querySelectorAll(".postBox");
    const replyReadMoreBtn = document.querySelectorAll(".replyReadMoreBtn");
    const replyLikeBtn = document.querySelectorAll(".replyLikeBtn");
    const replyDisLikeBtn = document.querySelectorAll(".replyDisLikeBtn");
    const replyReplyBtn = document.querySelectorAll(".replyReplyBtn");
    const replyModifyBtn = document.querySelectorAll(".replyModifyBtn");
    const replyDeleteBtn = document.querySelectorAll(".replyDeleteBtn");
    postList.forEach((postBox) => {
        const replyBtn = postBox.querySelector(".replyBtn");
        // reply.removeAttribute("hidden");
        // replyBtn.onclick = (e) => {
        //     const btn = e.target as HTMLDivElement;
        //     const reply = btn.parentElement?.previousElementSibling as HTMLDivElement;
        //     replyEnter(reply);
        // }
    });
    replyReadMoreBtn.forEach((el) => {
        el.onclick = () => {
            const content = el.previousElementSibling;
            content.style.maxHeight = "max-content";
            el.hidden = true;
        };
    });
    replyLikeBtn.forEach((el) => {
        if (!token)
            return;
        el.onclick = async (e) => {
            var _a, _b;
            const btn = e.target;
            const reply = btn.closest(".reply");
            if (!btn.classList.contains("selected")) {
                btn.classList.add("selected");
                btn.querySelector("svg").innerHTML = `<path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path>`;
                (_b = (_a = btn.nextElementSibling) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove("selected");
                btn.nextElementSibling.nextElementSibling.querySelector("svg").innerHTML = `<path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>`;
                let count = Number(btn.nextElementSibling.innerHTML) + 1;
                btn.nextElementSibling.innerHTML = String(count);
            }
            else {
                btn.classList.remove("selected");
                btn.querySelector("svg").innerHTML = `<path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>`;
                let count = Number(btn.nextElementSibling.innerHTML) != 0 ? Number(btn.nextElementSibling.innerHTML) - 1 : 0;
                btn.nextElementSibling.innerHTML = String(count);
            }
            await axios.post(`${HOST}/reply-likes/like/${reply.dataset.id}`, {}, {
                withCredentials: true
            });
        };
    });
    replyDisLikeBtn.forEach((el) => {
        if (!token)
            return;
        el.onclick = async (e) => {
            var _a, _b;
            const btn = e.target;
            const reply = btn.closest(".reply");
            if (!btn.classList.contains("selected")) {
                btn.classList.add("selected");
                btn.querySelector("svg").innerHTML = `<path d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z"></path>`;
                (_b = (_a = btn.previousElementSibling) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove("selected");
                btn.previousElementSibling.previousElementSibling.querySelector("svg").innerHTML = `<path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>`;
                let count = Number(btn.previousElementSibling.innerHTML) != 0 ? Number(btn.previousElementSibling.innerHTML) - 1 : 0;
                btn.previousElementSibling.innerHTML = String(count);
            }
            else {
                btn.classList.remove("selected");
                btn.querySelector("svg").innerHTML = `<path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>`;
            }
            await axios.post(`${HOST}/reply-likes/dislike/${reply.dataset.id}`, {}, {
                withCredentials: true
            });
        };
    });
    replyReplyBtn.forEach((el) => {
        if (!token)
            return;
        el.onclick = () => {
            const replyDetail = el.closest(".replyDetail");
            const commentBody = el.closest(".commentBody");
            if (commentBody.querySelector(".commentReplyBox"))
                return;
            if (commentBody.querySelector(".replyReplyBox"))
                return;
            const replyReply = document.createElement("div");
            const replyUserReplyImg = document.createElement("img");
            const replyReplyInput = document.createElement("textarea");
            const replyReplyInputBtn = document.createElement("button");
            replyReply.classList.add("replyReplyBox");
            replyUserReplyImg.classList.add("replyUserReplyImg");
            replyReplyInput.classList.add("replyReplyInput");
            replyReplyInputBtn.classList.add("replyReplyInputBtn");
            replyUserReplyImg.src = "";
            replyReplyInput.spellcheck = false;
            replyReplyInput.value = `@${replyDetail.querySelector(".replyUserName").innerHTML} `;
            replyReplyInput.rows = 1;
            replyReplyInput.oninput = () => {
                replyReplyInput.style.height = 'auto';
                replyReplyInput.style.height = replyReplyInput.scrollHeight + 'px';
                replyReplyCheckText();
            };
            replyReplyInputBtn.disabled = true;
            replyReplyInputBtn.innerHTML = "답글";
            replyReplyInputBtn.onclick = async (e) => {
                var _a, _b;
                let replys = new Replys();
                let comment = (_a = replyReplyInputBtn.closest(".replyBox")) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
                let commentId = comment.dataset.id;
                try {
                    await replys.createReply(Number(commentId), replyReplyInput.value.replace(/\n/g, "<br>"));
                    await replys.setReplys(Number(commentId));
                    const reply = document.createElement("div");
                    reply.classList.add("reply");
                    console.log(replys.replys);
                    const { html, id } = await replys.getReply(replys.replys.length - 1);
                    reply.innerHTML = html;
                    reply.dataset.id = String(id);
                    (_b = comment.nextElementSibling) === null || _b === void 0 ? void 0 : _b.append(reply);
                    replyReply.remove();
                    await replyRender();
                }
                catch (error) {
                    console.log(1);
                    replyReply.remove();
                }
            };
            replyReply.append(replyUserReplyImg, replyReplyInput, replyReplyInputBtn);
            replyDetail.append(replyReply);
        };
    });
    replyModifyBtn.forEach((el) => {
        el.onclick = () => {
            var _a;
            const replyDetail = el.closest(".replyDetail");
            const commentBody = el.closest(".commentBody");
            if (commentBody.querySelector(".commentReplyBox"))
                return;
            if (commentBody.querySelector(".replyReplyBox"))
                return;
            const replyReply = document.createElement("div");
            const replyUserReplyImg = document.createElement("img");
            const replyReplyInput = document.createElement("textarea");
            const replyReplyInputBtn = document.createElement("button");
            replyReply.classList.add("replyReplyBox");
            replyUserReplyImg.classList.add("replyUserReplyImg");
            replyReplyInput.classList.add("replyReplyInput");
            replyReplyInputBtn.classList.add("replyReplyInputBtn");
            replyUserReplyImg.src = "";
            replyReplyInput.spellcheck = false;
            replyReplyInput.value = (_a = replyDetail.querySelector("p")) === null || _a === void 0 ? void 0 : _a.innerHTML.replace(/<br>/g, "\n");
            replyReplyInput.rows = 1;
            replyReplyInput.oninput = () => {
                replyReplyInput.style.height = 'auto';
                replyReplyInput.style.height = replyReplyInput.scrollHeight + 'px';
                replyReplyCheckText();
            };
            replyReplyInputBtn.disabled = true;
            replyReplyInputBtn.innerHTML = "수정";
            replyReplyInputBtn.onclick = async (e) => {
                let replys = new Replys();
                const target = e.target;
                const reply = target.closest(".reply");
                try {
                    await replys.modifyReply(Number(reply.dataset.id), replyReplyInput.value.replace(/\n/g, "<br>"));
                    replyDetail.querySelector("p").innerHTML = replyReplyInput.value.replace(/<br>/g, "\n");
                    replyReply.remove();
                }
                catch (error) {
                    replyReply.remove();
                }
            };
            replyReply.append(replyUserReplyImg, replyReplyInput, replyReplyInputBtn);
            replyDetail.append(replyReply);
            replyReplyInput.style.height = 'auto';
            replyReplyInput.style.height = replyReplyInput.scrollHeight + 'px';
        };
    });
    replyDeleteBtn.forEach((el) => {
        el.onclick = async () => {
            let replys = new Replys();
            const reply = el.closest(".reply");
            await replys.deleteReply(Number(reply.dataset.id));
            reply.remove();
            await replyRender();
        };
    });
};
const replyReplyCheckText = () => {
    const selected = document.querySelector(".replyReplyBox");
    const replyInput = selected.querySelector(".replyReplyInput");
    const replyInputBtn = selected.querySelector(".replyReplyInputBtn");
    if (replyInput.value)
        replyInputBtn.disabled = false;
    else
        replyInputBtn.disabled = true;
};
