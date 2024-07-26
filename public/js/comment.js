"use strict";
{
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
    const commentStatus = (target) => {
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
    window.onresize = () => {
        const comment = document.querySelector(".postBox.select > .post > .commentBox");
        if (comment.getAttribute("status") == "show") {
            commentStatus(comment);
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
            commentStatus(comment);
        };
        const commentExitBtn = postBox.querySelector(".commentExitBtn");
        commentExitBtn.onclick = (e) => {
            var _a, _b, _c;
            const btn = e.target;
            console.log(btn);
            const post = (_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            const comment = (_c = btn.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
            comment.setAttribute("status", "hidden");
            post.removeAttribute("style");
            comment.removeAttribute("style");
            const background = document.querySelector("#background");
            background.style.display = "none";
        };
    });
}
