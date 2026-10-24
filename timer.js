"use strict";

let timerId = null;              // id of the running interval
let timeLeft = QUESTION_TIME;    // seconds left for the current question

// Starts the countdown. onTimeout is called when time reaches 0.
function startTimer(onTimeout) {
  clearInterval(timerId);        // stop any previous timer
  timeLeft = QUESTION_TIME;

  const timerEl = document.getElementById("timer");
  timerEl.textContent = timeLeft;

  // Runs every second
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerId);
      onTimeout();
    }
  }, 1000);
}

// Stops the countdown (used when the player answers)
function stopTimer() {
  clearInterval(timerId);
}