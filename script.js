"use strict";

// Game state
let currentIndex = 0;     // index of the current question
let score = 0;            // total points
let correctCount = 0;     // number of correct answers
let answered = false;     // true once the player answered (prevents double answers)
let playerName = "Player";

const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

// Shows the current question and starts the timer
function showQuestion() {
  answered = false;
  renderAnswers(questions[currentIndex], handleAnswer);
  updateProgress(currentIndex, questions.length);
  feedbackEl.textContent = "";

  nextBtn.disabled = true;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "See Results" : "Next Question";

  startTimer(handleTimeout);
}

// Locks the buttons, highlights the correct answer,
// and the wrong one if the player picked it
function revealAnswers(selectedIndex) {
  const buttons = document.querySelectorAll(".answer-btn");
  const correctIndex = questions[currentIndex].answer;

  buttons.forEach((btn) => (btn.disabled = true));
  buttons[correctIndex].classList.add("correct");

  if (selectedIndex !== undefined && selectedIndex !== correctIndex) {
    buttons[selectedIndex].classList.add("incorrect");
  }
}

// Called when the player clicks an answer: adds points and gives feedback
function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  stopTimer();

  const isCorrect = selectedIndex === questions[currentIndex].answer;

  if (isCorrect) {
    const points = calculatePoints(isCorrect, timeLeft); // faster = more points
    score += points;
    correctCount++;
    feedbackEl.textContent = "Correct! +" + points + " points";
  } else {
    feedbackEl.textContent = "Not quite, the correct answer is highlighted.";
  }

  revealAnswers(selectedIndex);
  nextBtn.disabled = false;
}

// Called when time runs out: no points
function handleTimeout() {
  answered = true;
  feedbackEl.textContent = "Time's up! No points this time.";
  revealAnswers();
  nextBtn.disabled = false;
}

// "Next Question" button: go to the next question or show the results
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

// "Start Quiz" button: read the name and show the first question
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value;

  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  showQuestion();
});

// Resets everything and goes back to the welcome screen
function resetGame() {
  stopTimer();

  currentIndex = 0;
  score = 0;
  correctCount = 0;
  answered = false;
  playerName = "Player";

  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  document.getElementById("answers-container").textContent = "";
  document.getElementById("progress-fill").style.width = "0";
  document.getElementById("player-name").value = "";

  document.getElementById("results-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
}

// "Play Again" button
document.getElementById("replay-btn").addEventListener("click", resetGame);