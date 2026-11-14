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
function revealAnswers(selectedIndex, correctIndex) {
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => (btn.disabled = true));
  buttons[correctIndex].classList.add("correct");

  if (selectedIndex !== undefined && selectedIndex !== correctIndex) {
    buttons[selectedIndex].classList.add("incorrect");
  }
}
// Called when the player clicks an answer: adds points and gives feedback
async function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  stopTimer();

  const secondsLeft = timeLeft; 

  try {
    const result = await sendAnswer(questions[currentIndex].id, selectedIndex, secondsLeft);

    if (result.correct) {
      score += result.points;
      correctCount++;
      feedbackEl.textContent = "Correct! +" + result.points + " points";
    } else {
      feedbackEl.textContent = "Not quite, the correct answer is highlighted.";
    }

    revealAnswers(selectedIndex, result.correct_index);
  } catch (error) {
    feedbackEl.textContent = "Server error: this answer could not be checked.";
  }

  nextBtn.disabled = false;
}

// Called when time runs out: no points
async function handleTimeout() {
  answered = true;
  feedbackEl.textContent = "Time's up! No points this time.";

  try {
    const result = await sendAnswer(questions[currentIndex].id, null, 0);
    revealAnswers(undefined, result.correct_index);
  } catch (error) {
    feedbackEl.textContent = "Time's up! (server error)";
  }

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
document.getElementById("start-btn").addEventListener("click", async () => {
  playerName = document.getElementById("player-name").value;

  try {
    await loadQuestions();
  } catch (error) {
    alert("Could not load the questions. Is the server running?");
    return;
  }

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