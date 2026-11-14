"use strict";

// Seconds allowed for each question (used by timer.js)
const QUESTION_TIME = 20;

const QUESTIONS_API = "api/questions.php";
const ANSWER_API = "api/answer.php";

let questions = [];

//loading questions from server without  correct answers
async function loadQuestions() {
  const response = await fetch(QUESTIONS_API);
  if (!response.ok) throw new Error("Could not load questions");
  questions = await response.json();
}

//sending the answer to the server and receiving { correct, correct_index, points }
async function sendAnswer(questionId, selected, timeLeft) {
  const response = await fetch(ANSWER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question_id: questionId, selected, time_left: timeLeft })
  });
  if (!response.ok) throw new Error("Could not check the answer");
  return await response.json();
}


// Shows the question text and creates one button per option.
// onAnswer(index) is called when the player clicks a button.
function renderAnswers(question, onAnswer) {
  const container = document.getElementById("answers-container");
  const questionText = document.getElementById("question-text");

  questionText.textContent = question.text;
  container.textContent = ""; // remove the previous buttons

  question.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.textContent = option; // textContent is safe (no HTML injection)
    btn.addEventListener("click", () => onAnswer(index));
    container.appendChild(btn);
  });
}


// List of questions. (For JS work)
// type: "qcm" = 4 choices, "tf" = True/False
// answer: index (starting at 0) of the correct option
// const questions = [
//   {
//     type: "qcm",
//     text: "Which keyword declares a variable that cannot be reassigned?",
//     options: ["var", "let", "const", "static"],
//     answer: 2
//   },
//   {
//     type: "tf",
//     text: "JavaScript and Java are the same language.",
//     options: ["True", "False"],
//     answer: 1
//   },
//   {
//     type: "qcm",
//     text: "What does typeof null return?",
//     options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
//     answer: 1
//   },
//   {
//     type: "qcm",
//     text: "Which method adds an element at the end of an array?",
//     options: ["push()", "pop()", "shift()", "unshift()"],
//     answer: 0
//   },
//   {
//     type: "tf",
//     text: "=== compares both value and type.",
//     options: ["True", "False"],
//     answer: 0
//   },
//   {
//     type: "qcm",
//     text: "Which function parses a JSON string into an object?",
//     options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
//     answer: 1
//   },
//   {
//     type: "qcm",
//     text: "Which method selects an element by its id?",
//     options: [
//       "document.querySelectorAll()",
//       "document.getElementsByClassName()",
//       "document.getElementById()",
//       "document.getTag()"
//     ],
//     answer: 2
//   },
//   {
//     type: "tf",
//     text: "localStorage data is deleted when the browser tab is closed.",
//     options: ["True", "False"],
//     answer: 1
//   },
//   {
//     type: "qcm",
//     text: "What does [1, 2, 3].map(n => n * 2) return?",
//     options: ["[1, 2, 3]", "[2, 4, 6]", "6", "undefined"],
//     answer: 1
//   },
//   {
//     type: "qcm",
//     text: "Which function runs code repeatedly at a fixed interval?",
//     options: ["setTimeout()", "setInterval()", "requestRepeat()", "repeat()"],
//     answer: 1
//   }
// ];