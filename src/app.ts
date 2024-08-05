import express from 'express';
import path from 'path';
import router from './router/main.router';
import cors from 'cors';
import cookie from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(router);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));


// app.get("/", (req, res) => {
//     res.redirect("/post");
// })

app.listen(8000, () => {
    console.log("front server on~");
});
