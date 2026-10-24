"use strict";

let timerId = null;
let timeLeft = QUESTION_TIME;

function startTimer(onTimeout) {
  clearInterval(timerId);
  timeLeft = QUESTION_TIME;

  const timerEl = document.getElementById("timer");
  timerEl.textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerId);
      onTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}