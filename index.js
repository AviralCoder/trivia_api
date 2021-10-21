const express = require("express");
const LimitingMiddleware = require("limiting-middleware");
const {
    randomQuestion,
    sortByCategory,
    sortByDifficulty,
    randomQuestionFunc,
} = require("./utils");
const categories = require("./lib/categories");
const questions = require("./questions/index.json");
const difficulties = require("./lib/difficulties");
const { GITHUB_URL } = require("./lib/constants");

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

app.get("/questions/random", (req, res) => {
    res.json(randomQuestion(questions));
});

app.get("/questions/random/number/:num", (req, res) => {
    if (req.params.num > 20) {
        res.send("The maximum number of questions at a time is 20");
    } else {
        res.json(randomNumber(questions, req.params.num));
    }
});

app.get("/questions/list", (req, res) => {
    res.json(questions);
});

app.get("/contribute", (req, res) => {
    res.send(
        `<a href="${GITHUB_URL}" style="font-size: 4rem">${GITHUB_URL}</a>`
    );
});

app.get("/contribute/issues", (req, res) => {
    res.send(
        `<a href="${GITHUB_URL}/issues" style="font-size: 4rem">${GITHUB_URL}/issues</a>`
    );
});

app.get("/questions/list/index/:index", (req, res) => {
    if (req.params.index > questions.length) {
        res.send("<h1>Index more than the number of questions</h1>");
    } else {
        res.json(questions[req.params.index]);
    }
});

app.get("/questions/category/:category", (req, res) => {
    if (categories.includes(req.params.category)) {
        res.json(sortByCategory(questions, req.params.category));
    } else {
        res.send(`<h1>Category not found - ${req.params.category}</h1>`);
    }
});

app.get("/questions/category/:category/random", (req, res) => {
    if (categories.includes(req.params.category)) {
        res.json(
            randomQuestion(sortByCategory(questions, req.params.category))
        );
    } else {
        res.send(`<h1>Category not found - ${req.params.category}</h1>`);
    }
});

app.get("/questions/category/:category/random/number/:number", (req, res) => {
    if (categories.includes(req.params.category)) {
        res.json(
            randomQuestionFunc(
                sortByCategory(questions, req.params.category),
                req.params.number
            )
        );
    }
});

app.get("/questions/difficulty/:difficulty", (req, res) => {
    if (difficulties.includes(req.params.difficulty)) {
        res.json(sortByDifficulty(questions, req.params.difficulty));
    } else {
        res.send(`<h1>Category not found - ${req.params.difficulty}</h1>`);
    }
});

app.get("/questions/difficulty/:difficulty/random", (req, res) => {
    if (difficulties.includes(req.params.difficulty)) {
        res.json(
            randomQuestion(sortByDifficulty(questions, req.params.difficulty))
        );
    } else {
        res.send(`<h1>Difficulty not found - ${req.params.difficulty}</h1>`);
    }
});

app.get(
    "/questions/difficulty/:difficulty/category/:category/number/:number",
    (req, res) => {
        const { difficulty, category, number } = req.params;

        if (
            difficulties.includes(difficulty) === false ||
            categories.includes(category) === false ||
            number > 20
        ) {
            res.send(
                `<h1>Either ${difficulty} isn't a difficulty or ${category} isn't a category or ${number} is greater than 20 or all.</h1>`
            );
        } else {
            const sortedByDifficulty = sortByDifficulty(questions, difficulty);
            const sortedByCategory = sortByCategory(
                sortedByDifficulty,
                category
            );
            const questionsAfterSorting = randomQuestionFunc(
                sortedByCategory,
                number
            );

            res.json(questionsAfterSorting);
        }
    }
);

app.get(
    "/questions/difficulty/:difficulty/category/:category/random",
    (req, res) => {
        const { difficulty, category } = req.params;

        if (
            difficulties.includes(difficulty) === false ||
            categories.includes(category) === false
        ) {
            res.send(
                `<h1>Either ${difficulty} isn't a difficulty or ${category} isn't a category or all.</h1>`
            );
        } else {
            const sortedByDifficulty = sortByDifficulty(questions, difficulty);
            const sortedByCategory = sortByCategory(
                sortedByDifficulty,
                category
            );
            const questionsAfterSorting = randomQuestion(sortedByCategory);

            res.json(questionsAfterSorting);
        }
    }
);

app.get(
    "/questions/difficulty/:difficulty/random/number/:number",
    (req, res) => {
        if (difficulties.includes(req.params.difficulty)) {
            res.json(
                randomQuestionFunc(
                    sortByDifficulty(questions, req.params.difficulty),
                    req.params.number
                )
            );
        } else {
            res.send(
                `<h1>Difficulty not found - ${req.params.difficulty}</h1>`
            );
        }
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
