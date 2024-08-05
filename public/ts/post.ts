interface IPost {
    id: number;
    title: string;
    content: string;
    imgPath: string;
    userId: number;
    user: {
        id: number,
        loginId: string,
        password: string,
        nickname: string,
        oauthType: string,
        imgPath: string
    };
    postLikes: number;
    postDisLikes: number;
    likedUserId: number[];
    dislikedUserId: number[];
}

class Post {
    postId!: number;
    postImg!: string;
    userId!: number;
    userImg!: string;
    userName!: string;
    title!: string;
    content!: string;
    like!: number;
    likedUserId!: number[];
    disLikedUserId!: number[];
    commentCount!: number;


    constructor() {}

    async setPost(id: number) {
        const { data }: {data: IPost} = await axios.get(`http://localhost:3000/post/${id}`);
        this.postId = data.id;
        this.postImg = data.imgPath || "";
        this.userId = data.userId;
        this.userImg = data.user.imgPath;
        this.userName = data.user.nickname;
        this.title = data.title;
        this.content = data.content;
        this.like = data.postLikes;
        this.likedUserId = data.likedUserId;
        this.disLikedUserId = data.dislikedUserId;
        this.commentCount = (await axios.get(`http://localhost:3000/comment/count/${id}`)).data;
    }
    
    // async setSearchPost(text: string) {
    //     const { data }: {data: IPost} = await axios.get(`http://localhost:3000/post/${id}`);
    //     this.postId = data.id;
    //     this.postImg = data.imgPath || "";
    //     this.userId = data.userId;
    //     this.userImg = data.user.imgPath;
    //     this.userName = data.user.nickname;
    //     this.title = data.title;
    //     this.content = data.content;
    //     this.like = data.postLikes;
    //     this.likedUserId = data.likedUserId;
    //     this.disLikedUserId = data.dislikedUserId;
    //     this.commentCount = (await axios.get(`http://localhost:3000/comment/count/${id}`)).data;
    // }

    async createPost(formData: FormData) {
        await axios.post(`http://localhost:3000/post/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data;charset=utf-8",
            },
            withCredentials: true
        })
        await postRender(-1);
    }

    async getPost() {
        let userCheck = "hidden", likeCheck = "", disLikeCheck = "";
        if (token) {
            userCheck = token.id == this.userId? "": "hidden";
            likeCheck = this.likedUserId.includes(token.id)? "selected": "";
            disLikeCheck = this.disLikedUserId.includes(token.id)? "selected": "";
        }
        const postHtml = `
<div class="post">
    <img src="${this.postImg}" alt="">
    <div class="postDetail">
        <div class="postUser">
            <img class="postUserImg" src="${this.userImg}" alt="">
            <div class="postUserName">${this.userName}</div>
        </div>
        <h1>${this.title}</h1>
        <p>${this.content}
        </p>
    </div>
    <div class="commentBox" hidden>
        <div class="commentHeader">
            <h2>댓글</h2>
            <span>${this.commentCount}</span>
            <div class="commentExitBtn">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path></svg>
                </div>
            </div>
        </div>
        <div class="commentBody">
            
        </div>
        <div class="commentFooter">
            <img class="commentUserFooterImg" src="${this.userImg}" alt="">
            <div>
                <textarea name="" spellcheck="false" class="commentFooterInput" placeholder="댓글 추가..." rows="1"></textarea>
                <div class="commentFooterInputBtns">
                    <button class="commentFooterInputBtn" disabled>
                        답글
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="postMenu">
        <div class="menuBtn likeBtn ${likeCheck}">
            <div class="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path d="M8 21V9.282c0-.834.26-1.647.745-2.325L13 1l.551.331c1.153.691 1.705 2.065 1.351 3.362L14 8h5.192c.827 0 1.609.376 2.125 1.022.711.888.795 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H8ZM4.5 9C3.672 9 3 9.672 3 10.5v9c0 .828.672 1.5 1.5 1.5H7V9H4.5Z"></path></svg>
            </div>
            <span class="menuname">${this.like}</span>
        </div>
        <div class="menuBtn dislikeBtn ${disLikeCheck}">
            <div class="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path d="M16 3v11.718c0 .834-.26 1.647-.745 2.325L11 23l-.551-.331c-1.153-.691-1.705-2.065-1.351-3.362L10 16H4.808c-.827 0-1.609-.376-2.125-1.022-.711-.888-.795-2.125-.209-3.101L3 11l-.165-.413c-.519-1.296-.324-2.769.514-3.885L3.5 6.5V6c0-1.657 1.343-3 3-3H16Zm3 12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2h-2v12h2Z"></path></svg>
            </div>
            <span class="menuname">싫어요</span>
        </div>
        <div class="menuBtn commentBtn">
            <div class="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path clip-rule="evenodd" d="M21 5c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12l3.146 3.146c.315.315.854.092.854-.353V5ZM7 9c0-.552.448-1 1-1h8c.552 0 1 .448 1 1s-.448 1-1 1H8c-.552 0-1-.448-1-1Zm1 3c-.552 0-1 .448-1 1s.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1H8Z" fill-rule="evenodd"></path></svg>
            </div>
            <span class="menuname">${this.commentCount}</span>
        </div>
        <div class="menuBtn modifyBtn" ${userCheck}>
            <div class="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"></path></svg>
            </div>
            <span class="menuname">수정</span>
        </div>
        <div class="menuBtn deleteBtn" ${userCheck}>
            <div class="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" aria-hidden="true"><path d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"></path></svg>
            </div>
            <span class="menuname">삭제</span>
        </div>
        <div class="menuBtn">
            <div class="menuUserImg">
                <img src=${this.userImg} alt="">
            </div>
        </div>
    </div>
</div>    
`
        return postHtml;
    }

    async modifyPost(id: number, formData: FormData) {
        await axios.put(`http://localhost:3000/post/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data;charset=utf-8",
            },
            withCredentials: true
        })
        await postRender(id);
    }

    async deletePost(id: number) {
        await axios.delete(`http://localhost:3000/post/${id}`, {
            headers: {
            },
            withCredentials: true
        });
        await postRender();
    }
}

const postMenuRender = async () => {
    const postLikeBtns = document.querySelectorAll(".likeBtn") as NodeListOf<HTMLDivElement>;
    const postDisLikeBtns = document.querySelectorAll(".dislikeBtn") as NodeListOf<HTMLDivElement>;
    const postCommentBtns = document.querySelectorAll(".commentBtn") as NodeListOf<HTMLDivElement>;
    const postModifyBtns = document.querySelectorAll(".modifyBtn") as NodeListOf<HTMLDivElement>;
    const postDeleteBtns = document.querySelectorAll(".deleteBtn") as NodeListOf<HTMLDivElement>;

    postLikeBtns.forEach((el) => {
        el.onclick = async (e) => {
            if (!token) 
                return
            const btn = e.target as HTMLDivElement;
            const postBox = btn.closest(".postBox") as HTMLDivElement;
            if (!btn.classList.contains("selected")) {
                btn.classList.add("selected");
                btn.nextElementSibling?.classList.remove("selected");
                let count = Number(btn.lastElementChild!.innerHTML) + 1;
                btn.lastElementChild!.innerHTML = String(count);
                
            }
            else {
                btn.classList.remove("selected");
                let count = Number(btn.lastElementChild!.innerHTML) != 0 ? Number(btn.lastElementChild!.innerHTML) - 1: 0;
                btn.lastElementChild!.innerHTML = String(count);
            }
            await axios.post(`http://localhost:3000/post-likes/like/${postBox.dataset.id}`, {}, {
                withCredentials: true
            });
        }
    })

    postDisLikeBtns.forEach((el) => {
        el.onclick = async (e) => {
            if (!token) 
                return
            const btn = e.target as HTMLDivElement;
            const postBox = btn.closest(".postBox") as HTMLDivElement;
            if (!btn.classList.contains("selected")) {
                btn.classList.add("selected");
                btn.previousElementSibling?.classList.remove("selected");
                let count = Number(btn.previousElementSibling!.lastElementChild!.innerHTML) != 0 ? Number(btn.previousElementSibling!.lastElementChild!.innerHTML) - 1: 0;
                btn.previousElementSibling!.lastElementChild!.innerHTML = String(count);
                
            }
            else {
                btn.classList.remove("selected");
            }
            await axios.post(`http://localhost:3000/post-likes/dislike/${postBox.dataset.id}`, {}, {
                withCredentials: true
            });
        }
    })

    postCommentBtns.forEach((el) => {
        el.onclick = (e) => {
            const btn = e.target as HTMLDivElement;
            const comment = btn.parentElement?.previousElementSibling as HTMLDivElement;
            commentEnter(comment);
        }
    })

    postModifyBtns.forEach((el) => {
        el.onclick = async () => {
            await postPopupEnter(POSTPOPUPTYPE.MODIFY);
        }
    })

    postDeleteBtns.forEach((el) => {
        el.onclick = async () => {
            await postPopupEnter(POSTPOPUPTYPE.DELETE);
        }
    })
}