{
class Posts {


}

const postList: NodeListOf<HTMLDivElement> = document.querySelectorAll(".postBox");

const postContainer = document.querySelector("#postContainer") as HTMLDivElement;
const postUpBtn = document.querySelector("#upBtn") as HTMLDivElement;
const postDownBtn = document.querySelector("#downBtn") as HTMLDivElement;

const commentStatus = (target: HTMLDivElement) => {
    const post = target.parentElement as HTMLDivElement;
    target.setAttribute("status", "hidden");
    post.removeAttribute("style");
    target.removeAttribute("style");
    const background = document.querySelector("#background") as HTMLDivElement;
    background.style.display = "none";
}

const postDown = () => {
    let selected = document.querySelector(".postBox.select") as HTMLDivElement;
    if (!selected.nextElementSibling) 
        return;

    postEvent = true;
    console.log('Down!');
    commentStatus(selected.querySelector(".post > .commentBox") as HTMLDivElement);
    selected.classList.remove("select");
    selected.nextElementSibling?.classList.add("select");
    postUpBtn.removeAttribute("hidden");
    if (!document.querySelector(".postBox.select")?.nextElementSibling) 
        postDownBtn.setAttribute("hidden", "")
}

const postUp = () => {
    let selected = document.querySelector(".postBox.select") as HTMLDivElement;
    if (!selected.previousElementSibling) 
        return;

    postEvent = true;
    console.log('Up!');
    commentStatus(selected.querySelector(".post > .commentBox") as HTMLDivElement);
    selected?.classList.remove("select");
    selected?.previousElementSibling?.classList.add("select");
    postDownBtn.removeAttribute("hidden");
    if (!document.querySelector(".postBox.select")?.previousElementSibling) 
        postUpBtn.setAttribute("hidden", "")
}

const _clearTimeOut = () => {
    clearTimeout(postTimeout);
    postTimeout = setTimeout(() => {
        postEvent = false;
        postTimeout = undefined;
        document.querySelector(".postBox.select")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
}

let postEvent = false;
let postTimeout: NodeJS.Timeout | undefined;
const wheelXClassList = []

postContainer.onwheel = (e) => {
    const target = e.target as HTMLDivElement;
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
}

document.onkeydown = (e) => {
    e.preventDefault();
    if (postEvent || postTimeout) {}

	else if (e.key == "ArrowDown") {
        postDown();
    }
	else if (e.key == "ArrowUp") {
        postUp();
    }
    
    _clearTimeOut();
}

postDownBtn.onclick = () => {
    if (postEvent || postTimeout)
        return;
    postDown();

    _clearTimeOut();
}

postUpBtn.onclick = () => {
    if (postEvent || postTimeout)
        return;
    postUp();

    _clearTimeOut();
}

}