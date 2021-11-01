# Trivia API

An API that has questions that can easily be answered by and are expected to be answered by Indians.

## Made using

- JavaScript
- Node.js
- Express.js

## Features

- Flexible Endpoints
- Expected to be answered by Indians

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
