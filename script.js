"use strict";

let currentIndex = 0;
let score = 0;
let correctCount = 0;
let answered = false;
let playerName = "Player";

const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

// showing  the current question
function showQuestion() {
  answered = false;

  renderAnswers(questions[currentIndex], handleAnswer);
  updateProgress(currentIndex, questions.length);

  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "See Results" : "Next Question";

  startTimer(handleTimeout);
}

//highlighting the correct answer and wrong one if the player picks it
function revealAnswers(selectedIndex) {
  const buttons = document.querySelectorAll(".answer-btn");
  const correctIndex = questions[currentIndex].answer;

  buttons.forEach((btn) => (btn.disabled = true));
  buttons[correctIndex].classList.add("correct");

  if (selectedIndex !== undefined && selectedIndex !== correctIndex) {
    buttons[selectedIndex].classList.add("incorrect");
  }
}

// handling the answer of the player and giving feedback
function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  stopTimer();

  const isCorrect = selectedIndex === questions[currentIndex].answer;

  if (isCorrect) {
   const points = calculatePoints(isCorrect,timeLeft); 
   score += points;
   correctCount++;
   feedbackEl.textContent = "Correct! +" + points + " points";
  } else {
    feedbackEl.textContent = "Not quite, the correct answer is highlighted.";
  }

  revealAnswers(selectedIndex);
  nextBtn.disabled = false;
}

// handling timeout (no points)
function handleTimeout() {
  if (answered) return;
  answered = true;

  feedbackEl.textContent = "Time's up! No points this time.";
  revealAnswers();
  nextBtn.disabled = false;
}

// next question button
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.remove("hidden");
    showResults(playerName, score, correctCount, questions.length);
  }
});

// start button
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value;

  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  showQuestion();
});