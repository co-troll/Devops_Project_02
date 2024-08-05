"use strict";
class PostPopup {
    constructor() {
        this.postAddImg = "/img/post/image_add.png";
    }
    async setPostPopup(id) {
        const { data } = await axios.get(`http://localhost:3000/post/${id}`);
        this.postId = data.id;
        this.postImg = data.imgPath ? `http://localhost:3000${data.imgPath}` : "/img/post/image_add.png";
        this.userImg = `http://localhost:3000${data.user.imgPath}`;
        this.userName = data.user.nickname;
        this.title = data.title;
        this.content = data.content.replace(/<br>/g, "\n");
    }
    async getPostPopup(type) {
        const postPopupHeader = document.querySelector("#postPopupHeader > h2");
        const postPopupImg = document.querySelector("#postPopupImg");
        const postPopupInputImg = document.querySelector("#postPopupInputImg");
        const postPopupTitle = document.querySelector("#postPopupTitle");
        const postPopupContent = document.querySelector("#postPopupContent");
        postPopupImg.onclick = () => postPopupInputImg.click();
        switch (type) {
            case 0 /* POSTPOPUPTYPE.CREATE */:
                postPopupDoneBtn.disabled = true;
                postPopupHeader.innerHTML = "추가";
                postPopupImg.src = this.postAddImg;
                postPopupTitle.value = "";
                postPopupTitle.placeholder = "제목";
                postPopupTitle.oninput = checkText;
                postPopupContent.value = "";
                postPopupContent.placeholder = "내용";
                postPopupContent.oninput = checkText;
                postPopupDoneBtn.innerHTML = "추가";
                break;
            case 1 /* POSTPOPUPTYPE.MODIFY */:
                postPopupDoneBtn.disabled = false;
                postPopupHeader.innerHTML = "수정";
                postPopupImg.src = this.postImg;
                postPopupTitle.value = this.title;
                postPopupTitle.placeholder = this.title;
                postPopupTitle.oninput = checkText;
                postPopupContent.value = this.content;
                postPopupContent.placeholder = this.content;
                postPopupContent.oninput = checkText;
                postPopupDoneBtn.innerHTML = "수정";
                break;
            case 2 /* POSTPOPUPTYPE.DELETE */:
                postPopupDoneBtn.disabled = true;
                postPopupHeader.innerHTML = "삭제";
                postPopupImg.src = this.postImg;
                postPopupTitle.value = "";
                postPopupTitle.placeholder = this.title;
                postPopupTitle.oninput = checkDeleteText;
                postPopupContent.value = "";
                postPopupContent.placeholder = "위 칸에 제목을 입력해주세요";
                postPopupContent.oninput = null;
                postPopupDoneBtn.innerHTML = "삭제";
                break;
        }
    }
}
const postCreateBtn = document.querySelector("#createBtn");
const postPopupExitBtn = document.querySelector("#postPopupExitBtn");
const postPopupDoneBtn = document.querySelector("#postPopupDoneBtn");
const postPopupEnter = async (type) => {
    let selected = document.querySelector(".postBox.select");
    let id = Number(selected.dataset.id);
    let postPopupDiv = document.querySelector("#postPopup");
    postPopupDiv.hidden = false;
    let postPopup = new PostPopup();
    if (type != 0 /* POSTPOPUPTYPE.CREATE */)
        await postPopup.setPostPopup(id);
    await postPopup.getPostPopup(type);
};
const postPopupExit = async () => {
    const postPopupInputImg = document.querySelector("#postPopupInputImg");
    const postPopupDiv = document.querySelector("#postPopup");
    postPopupInputImg.value = "";
    postPopupDiv.hidden = true;
};
postCreateBtn.onclick = async () => {
    await postPopupEnter(0 /* POSTPOPUPTYPE.CREATE */);
};
postPopupExitBtn.onclick = async () => {
    await postPopupExit();
};
const postPopupBack = document.querySelector("#postPopupBack");
postPopupBack.onclick = async () => {
    await postPopupExit();
};
postPopupDoneBtn.onclick = async () => {
    const type = postPopupDoneBtn.innerHTML;
    const postPopupInputImg = document.querySelector("#postPopupInputImg");
    const postPopupTitle = document.querySelector("#postPopupTitle");
    const postPopupContent = document.querySelector("#postPopupContent");
    const inputFiles = postPopupInputImg.files;
    let selected = document.querySelector(".postBox.select");
    let id = Number(selected.dataset.id);
    const formData = new FormData();
    if (inputFiles[0]) {
        formData.append("file", inputFiles[0]);
    }
    formData.append("title", postPopupTitle.value);
    formData.append("content", postPopupContent.value.replace(/\n/g, "<br>"));
    switch (type) {
        case "추가":
            await axios.post(`http://localhost:3000/post/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;charset=utf-8",
                },
                withCredentials: true
            });
            await postRender(-1);
            break;
        case "수정":
            await axios.put(`http://localhost:3000/post/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;charset=utf-8",
                },
                withCredentials: true
            });
            await postRender(id);
            break;
        case "삭제":
            await axios.delete(`http://localhost:3000/post/${id}`, {
                headers: {},
                withCredentials: true
            });
            await postRender();
            break;
    }
    await postPopupExit();
};
const checkText = () => {
    const postPopupTitle = document.querySelector("#postPopupTitle");
    const postPopupContent = document.querySelector("#postPopupContent");
    if (postPopupTitle.value && postPopupContent.value)
        postPopupDoneBtn.disabled = false;
    else
        postPopupDoneBtn.disabled = true;
};
const checkDeleteText = () => {
    const postPopupTitle = document.querySelector("#postPopupTitle");
    if (postPopupTitle.value == postPopupTitle.placeholder)
        postPopupDoneBtn.disabled = false;
    else
        postPopupDoneBtn.disabled = true;
};