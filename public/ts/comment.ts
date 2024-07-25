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
const postBoxes = document.querySelectorAll(".postBox") as NodeListOf<HTMLDivElement>;

const commentStatus = (target: HTMLDivElement) => {
    target.setAttribute("status", "show");
    const post = target.parentElement as HTMLDivElement;
    const background = document.querySelector("#background") as HTMLDivElement;
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
}

window.onresize = () => {
    const comment = document.querySelector(".postBox.select > .post > .commentBox") as HTMLDivElement
    if(comment.getAttribute("status") == "show") {
        commentStatus(comment);
    }
}


postBoxes.forEach((postBox) => {
    const commentBtn = postBox.querySelector(".commentBtn") as HTMLDivElement;
    const comment = commentBtn.parentElement?.previousElementSibling as HTMLDivElement;
    // comment.removeAttribute("hidden");
    commentBtn.onclick = (e) => {
        const btn = e.target as HTMLDivElement;
        const comment = btn.parentElement?.previousElementSibling as HTMLDivElement;
        commentStatus(comment);
        
    }

    const commentExitBtn = postBox.querySelector(".commentExitBtn") as HTMLDivElement;
    commentExitBtn.onclick = (e) => {
        const btn = e.target as HTMLDivElement;
        console.log(btn);
        const post = btn.parentElement?.parentElement?.parentElement as HTMLDivElement
        const comment = btn.parentElement?.parentElement as HTMLDivElement;
        comment.setAttribute("status", "hidden");
        post.removeAttribute("style");
        comment.removeAttribute("style");
        const background = document.querySelector("#background") as HTMLDivElement;
        background.style.display = "none";
    }
})


}