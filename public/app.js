"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const post_router_1 = __importDefault(require("./router/post.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/post", post_router_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join("views"));
app.get("/", (req, res) => {
    res.send("hi");
});
app.listen(8000, () => {
    console.log("front server on~");
});
