import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("/", express.static(path.join(__dirname, "../public")))
app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.get("/", (req, res) => {
    res.send("hi");
})

app.listen(8000, () => {
    console.log("front server on~");
});
