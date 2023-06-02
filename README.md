# Trivia API



An API that has questions that can easily be answered by and are expected to be answered by **Indians**.
API - [https://trivia-api-kbg.herokuapp.com/ ](https://triviaapi-production.up.railway.app/)

## Made using

- JavaScript
- Node.js
- Express.js

## Features

- Flexible Endpoints
- Expected to be answered by Indians

## Docs

**Please note: Any endpoint starting with a colon : means a variable will be put there**

- `/question/random` - A random question
- `/questions/random/number/:num`- A number of random questions
- `/questions/list` - All the questions in the API
- `/contribute` - Shows the url that where to contribute
- `/contribute/issues` - Shows the url where you can file issues.
- `/questions/list/index/:index` - From the list of questions, get the question from this index.
- `/questions/category/:category` - Get all the questions in the list of a particular category.
- `/questions/category/:category/random` - Get a random question of a particular category
- `/questions/category/:category/random/number/:number` - Get a number of random questions of a particular category
- `/questions/difficulty/:difficulty` - Get all the questions in the list of a particular difficulty.
- `/questions/difficulty/:difficulty/random`- Get a random question of any difficulty
- `/questions/difficulty/:difficulty/random/number/:number`- Get a number of random questions of any difficulty.
- `/questions/difficulty/:difficulty/category/:category/number/:number`- Get a number of questions of a particular difficulty and category.
- `/questions/difficulty/:difficulty/category/:category/random` - Get a random question of any difficulty and category.
- `/questions/categories/` - An array of all the categories
- `/questions/categories/length` - Get the number of categories


## Contributing

**Before adding questions, please make sure about -**

- They should be balanced i.e., don't put too much of a difficulty or too much of a category. All categories and difficulties should have (atleast a little) same number. It can't be that you keep on adding questions about science and the balance goes away! In the [categories.js](./lib/categories.js) file, beside categories, you will be able to see the number of questions of that category more needed to make it balanced. If it is not written, the list is balanced!
- The JSON format should be followed. All properties are strings. - 
 ```json
 {
      "category": "<CATEGORY>",
      "difficulty": "<DIFFICULTY>",
      "question": "<QUESTION>",
      "correct_answer": "<CORRECT>",
      "incorrect_answers": "<ARRAY OF INCORRECT ANSWERES>"
 }
 ```
- If you add questions, make sure they are expected to be answered by Indians and that the question is correct. It will be easy for me if you mention the proof in the PR for the question.

## License

MIT
