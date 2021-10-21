const express = require("express");
const LimitingMiddleware = require("limiting-middleware");
const {
    randomQuestion,
    sortByCategory,
    randomNumber,
    getQuestion,
} = require("./utils");
const categories = require("./lib/categories");
const questions = require("./questions/index.json");

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

app.get("/questions/number=:number/category=:category", (req, res) => {
    if (req.params.number > 20) {
        res.send("The maximum number of questions at a time is 20");
    } else {
        if (!categories.includes(req.params.category)) {
            res.send("Category not found.");
        } else {
            res.json(sortByCategory(req.params.category, req.params.number));
        }
    }
});

app.get("/questions/random", (req, res) => {
    res.json(randomQuestion());
});

app.get("/questions/:num", (req, res) => {
    if (req.params.num > 20) {
        res.send("The maximum number of questions at a time is 20");
    } else {
        res.json(randomNumber(questions, req.params.num));
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
