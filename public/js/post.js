"use strict";
{
    class Posts {
    }
    const postList = document.querySelectorAll(".postBox");
    const postContainer = document.querySelector("#postContainer");
    const postUpBtn = document.querySelector("#upBtn");
    const postDownBtn = document.querySelector("#downBtn");
    const commentStatus = (target) => {
        const post = target.parentElement;
        target.setAttribute("status", "hidden");
        post.removeAttribute("style");
        target.removeAttribute("style");
        const background = document.querySelector("#background");
        background.style.display = "none";
    };
    const postDown = () => {
        var _a, _b;
        let selected = document.querySelector(".postBox.select");
        if (!selected.nextElementSibling)
            return;
        postEvent = true;
        console.log('Down!');
        commentStatus(selected.querySelector(".post > .commentBox"));
        selected.classList.remove("select");
        (_a = selected.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add("select");
        postUpBtn.removeAttribute("hidden");
        if (!((_b = document.querySelector(".postBox.select")) === null || _b === void 0 ? void 0 : _b.nextElementSibling))
            postDownBtn.setAttribute("hidden", "");
    };
    const postUp = () => {
        var _a, _b;
        let selected = document.querySelector(".postBox.select");
        if (!selected.previousElementSibling)
            return;
        postEvent = true;
        console.log('Up!');
        commentStatus(selected.querySelector(".post > .commentBox"));
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
    const wheelXClassList = [];
    postContainer.onwheel = (e) => {
        const target = e.target;
        e.stopPropagation();
        if (postEvent || postTimeout || target.id != "postContainer") {
        }
        else if (e.deltaY > 0) {
            postDown();
        }
        else if (e.deltaY < 0) {
            postUp();
        }
        _clearTimeOut();
    };
    document.onkeydown = (e) => {
        e.preventDefault();
        if (postEvent || postTimeout) { }
        else if (e.key == "ArrowDown") {
            postDown();
        }
        else if (e.key == "ArrowUp") {
            postUp();
        }
        _clearTimeOut();
    };
    postDownBtn.onclick = () => {
        if (postEvent || postTimeout)
            return;
        postDown();
        _clearTimeOut();
    };
    postUpBtn.onclick = () => {
        if (postEvent || postTimeout)
            return;
        postUp();
        _clearTimeOut();
    };
}
