"use strict";

function getPerformanceMessage(percent) {
  if (percent === 100) return "Perfect score!";
  if (percent >= 80) return "Very good!";
  if (percent >= 50) return "Good, keep practicing.";
  return "Keep learning, you can do better.";
}

function showResults(playerName, totalPoints, correctCount, totalQuestions) {
  const maxPoints = totalQuestions * BASE_POINTS;
  const percent = Math.round((correctCount / totalQuestions) * 100);

  document.getElementById("final-score").textContent =
    totalPoints + " / " + maxPoints;
  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("incorrect-count").textContent =
    totalQuestions - correctCount;
  document.getElementById("performance-summary").textContent =
    percent + "% – " + getPerformanceMessage(percent);

  saveScore(playerName, totalPoints, correctCount, totalQuestions);
  renderBestScores();
}