const questions = require("./questions/index.json");

function randomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function randomNumber(questions, n) {
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

function sortByCategory(category, number) {
    const filtered = questions.filter(
        (question) => question.category.toLowerCase() === category
    );
    const array = randomNumber(filtered, number);

    return array;
}

function getQuestion(number, category) {
    return sortByCategory(category, number);
}

module.exports = {
    questions,
    randomQuestion,
    randomNumber,
    sortByCategory,
    getQuestion,
};
