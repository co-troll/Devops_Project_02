"use strict";
class Comments {
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
const postBoxes = document.querySelectorAll(".postBox");
const commentEnter = (target) => {
    target.setAttribute("status", "show");
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
    target.setAttribute("status", "hidden");
    post.removeAttribute("style");
    target.removeAttribute("style");
    const background = document.querySelector("#background");
    background.style.display = "none";
};
window.onresize = () => {
    const comment = document.querySelector(".postBox.select > .post > .commentBox");
    if (comment.getAttribute("status") == "show") {
        commentEnter(comment);
    }
};
postBoxes.forEach((postBox) => {
    var _a;
    const commentBtn = postBox.querySelector(".commentBtn");
    const comment = (_a = commentBtn.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
    // comment.removeAttribute("hidden");
    commentBtn.onclick = (e) => {
        var _a;
        const btn = e.target;
        const comment = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
        commentEnter(comment);
    };
    const commentExitBtn = postBox.querySelector(".commentExitBtn");
    commentExitBtn.onclick = (e) => {
        var _a;
        const btn = e.target;
        const comment = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        commentExit(comment);
    };
});
