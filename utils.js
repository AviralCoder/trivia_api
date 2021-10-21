const questions = require("./questions/index.json");

function randomQuestion(questions) {
    return questions[Math.floor(Math.random() * questions.length)];
}

function randomQuestionFunc(questions, n) {
    const limit = questions.length < n ? questions.length : n;
    const randomIndicesSet = new Set();

    while (randomIndicesSet.size < limit) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!randomIndicesSet.has(randomIndex)) {
            randomIndicesSet.add(randomIndex);
        }
    }

    return Array.from(randomIndicesSet).map((randomIndex) => {
        return questions[randomIndex];
    });
}

function sortByCategory(questions, category) {
    const filtered = questions.filter(
        (question) => question.category.toLowerCase() === category
    );

    return filtered;
}

function sortByDifficulty(questions, difficulty) {
    const filtered = questions.filter(
        (question) => question.difficulty.toLowerCase() === difficulty
    );

    return filtered;
}

module.exports = {
    randomQuestionFunc,
    randomQuestion,
    sortByCategory,
    sortByDifficulty,
};
