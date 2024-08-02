"use strict";
class Comments {
    constructor() {
        this.comments = [];
    }
    async setComment(id) {
        const { data } = await axios.get(`http://localhost:3000/comment/${id}`);
        if (Object.keys(data).includes('status')) {
            return;
        }
        else {
            const commentList = data;
            commentList.forEach(async (el) => {
                this.comments.push({
                    commentId: el.id,
                    userImg: el.user.imgPath,
                    userName: el.user.nickname,
                    content: el.content,
                    like: el.commentLikes,
                    contentMore: el.content.split("<br>").length - 1 > 3 ? `<span class="commentReadMoreBtn">자세히 보기</span>` : ""
                });
            });
        }
    }
    async createComment(postId, content) {
        await axios.post(`http://localhost:3000/comment/createComment`, { postId, content }, {
            withCredentials: true
        });
    }
    async getComment(index) {
        const commentHtml = `
<img class="commentUserImg" src="${this.comments[index].userImg}" alt="">
<div class="commentDetail">
    <h2 class="commentUserName">${this.comments[index].userName}</h2>
    <p>${this.comments[index].content}
    </p>
    ${this.comments[index].contentMore}
    <div class="commentBtnBox">
        <div class="commentLikeBtn">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24"
                    width="24" focusable="false"
                    style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
                    aria-hidden="true">
                    <path
                        d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z">
                    </path>
                </svg>
            </div>
        </div>
        <span class="commentLike">${this.comments[index].like}</span>
        <div class="commentUnlikeBtn">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
                    width="24" focusable="false"
                    style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
                    aria-hidden="true">
                    <path
                        d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="commentReplyBtn">
            <span>답글</span>
        </div>
        <div class="commentModifyBtn">
            <span>수정</span>
        </div>
        <div class="commentDeleteBtn">
            <span>삭제</span>
        </div>
    </div>
</div>

`;
        return { html: commentHtml, id: this.comments[index].commentId };
    }
    async modifyComment(commentId, content) {
        await axios.put(`http://localhost:3000/comment/${commentId}`, { content }, {
            withCredentials: true
        });
    }
    async deleteComment(commentId) {
        await axios.delete(`http://localhost:3000/comment/${commentId}`, {
            withCredentials: true
        });
    }
}
// axios.get("/")
// .then(function (result: { status: any; data: any; }) {
//     const status = result.status;
//     const data = result.data;
//     console.log("통신결과 : ", result);
// })
// .catch(function (err: any) {
//     console.log(err);
// });
const commentEnter = (target) => {
    target.hidden = false;
    const post = target.parentElement;
    const background = document.querySelector("#background");
    if (window.outerWidth * 65 / 100 < window.innerWidth) {
        post.removeAttribute("style");
        target.removeAttribute("style");
        post.style.right = "35%";
        target.style.left = "100%";
        post.style.zIndex = "3";
        background.style.display = "none";
    }
    else {
        post.removeAttribute("style");
        target.removeAttribute("style");
        target.style.zIndex = "2";
        target.style.transition = "none";
        background.style.display = "block";
    }
};
const commentExit = (target) => {
    const post = target.parentElement;
    target.hidden = true;
    post.removeAttribute("style");
    target.removeAttribute("style");
    const background = document.querySelector("#background");
    background.style.display = "none";
};
window.onresize = () => {
    const comment = document.querySelector(".postBox.select > .post > .commentBox");
    if (!comment.hidden) {
        commentEnter(comment);
    }
};
const commentRender = async () => {
    const postList = document.querySelectorAll(".postBox");
    const commentReadMoreBtn = document.querySelectorAll(".commentReadMoreBtn");
    const commentReplyBtn = document.querySelectorAll(".commentReplyBtn");
    const commentModifyBtn = document.querySelectorAll(".commentModifyBtn");
    const commentDeleteBtn = document.querySelectorAll(".commentDeleteBtn");
    const commentInput = document.querySelectorAll(".commentFooterInput");
    const commentInputBtn = document.querySelectorAll(".commentFooterInputBtn");
    postList.forEach((postBox) => {
        const commentBtn = postBox.querySelector(".commentBtn");
        // comment.removeAttribute("hidden");
        // commentBtn.onclick = (e) => {
        //     const btn = e.target as HTMLDivElement;
        //     const comment = btn.parentElement?.previousElementSibling as HTMLDivElement;
        //     commentEnter(comment);
        // }
        const commentExitBtn = postBox.querySelector(".commentExitBtn");
        commentExitBtn.onclick = (e) => {
            var _a;
            const btn = e.target;
            const comment = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            commentExit(comment);
        };
    });
    commentReadMoreBtn.forEach((el) => {
        el.onclick = () => {
            const content = el.previousElementSibling;
            content.style.maxHeight = "max-content";
            el.hidden = true;
        };
    });
    commentReplyBtn.forEach((el) => {
        el.onclick = () => {
            const commentDetail = el.closest(".commentDetail");
            const commentReply = document.createElement("div");
            const commentUserReplyImg = document.createElement("img");
            const commentReplyInput = document.createElement("textarea");
            const commentReplyInputBtn = document.createElement("button");
            commentReply.classList.add("commentReplyBox");
            commentUserReplyImg.classList.add("commentUserReplyImg");
            commentReplyInput.classList.add("commentReplyInput");
            commentReplyInputBtn.classList.add("commentReplyInputBtn");
            commentUserReplyImg.src = "";
            commentReplyInput.spellcheck = false;
            commentReplyInput.placeholder = "답글 추가...";
            commentReplyInput.rows = 1;
            commentReplyInput.oninput = () => {
                commentReplyInput.style.height = 'auto';
                commentReplyInput.style.height = el.scrollHeight + 'px';
                commentReplyCheckText();
            };
            commentReplyInputBtn.disabled = true;
            commentReplyInputBtn.innerHTML = "답글";
            commentReply.append(commentUserReplyImg, commentReplyInput, commentReplyInputBtn);
            commentDetail.append(commentReply);
        };
    });
    commentModifyBtn.forEach((el) => {
        el.onclick = () => {
        };
    });
    commentDeleteBtn.forEach((el) => {
        el.onclick = async () => {
            let comments = new Comments();
            const comment = el.closest(".comment");
            await comments.deleteComment(Number(comment.dataset.id));
            comment.remove();
            await commentRender();
        };
    });
    commentInput.forEach((el) => {
        el.oninput = () => {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
            commentCheckText();
        };
    });
    commentInputBtn.forEach((el) => {
        el.onclick = async () => {
            var _a;
            let comments = new Comments();
            const commentInput = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
            const postBox = el.closest(".postBox");
            const postId = postBox.dataset.id;
            const commentValue = commentInput.value.replace(/\n/g, "<br>");
            await comments.createComment(Number(postId), commentValue);
            commentInput.value = "";
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment");
            await comments.setComment(Number(postId));
            const { html, id } = await comments.getComment(comments.comments.length - 1);
            console.log(html, id);
            commentBox.innerHTML = html;
            commentBox.dataset.id = String(id);
            const commentBody = postBox.querySelector(".commentBody");
            commentBody.append(commentBox);
            await commentRender();
        };
    });
};
const commentCheckText = () => {
    const selected = document.querySelector(".postBox.select");
    const commentInput = selected.querySelector(".commentFooterInput");
    const commentInputBtn = selected.querySelector(".commentFooterInputBtn");
    if (commentInput.value)
        commentInputBtn.disabled = false;
    else
        commentInputBtn.disabled = true;
};
const commentReplyCheckText = () => {
    const selected = document.querySelector(".commentReplyBox");
    const commentInput = selected.querySelector(".commentReplyInput");
    const commentInputBtn = selected.querySelector(".commentReplyInputBtn");
    if (commentInput.value)
        commentInputBtn.disabled = false;
    else
        commentInputBtn.disabled = true;
};
