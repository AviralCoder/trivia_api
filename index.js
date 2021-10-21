const express = require("express");
const LimitingMiddleware = require("limiting-middleware");
const {
    randomQuestion,
    sortByCategory,
    randomNumber,
    getQuestion,
} = require("./utils");

const app = express();
const _ = new LimitingMiddleware();

app.use(_.limitByIp());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.send("AYO?");
});

app.get("/questions/:number/:category", (req, res) => {
    res.json(sortByCategory(req.params.category, req.params.number));
});

app.get("/questions/random", (req, res) => {
    res.json(randomQuestion());
});

app.get("/questions/:num", (req, res) => {
    if (req.params.num > 20) {
        res.send("The maximum number of questions at a time is 20");
    } else {
        res.json(randomNumber(req.params.num));
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
