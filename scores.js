"use strict";

// Scoring rules
const BASE_POINTS = 100;       // points for an instant correct answer
const PENALTY_PER_SECOND = 3;  // points lost for each second used
const MIN_POINTS = 40;         // a correct answer is never worth less

// Points for one question: 0 if wrong, otherwise 100 minus the time penalty
function calculatePoints(isCorrect, timeLeft, totalTime = 20) {
  if (!isCorrect) return 0;
  const secondsUsed = Math.max(0, totalTime - timeLeft);
  return Math.max(BASE_POINTS - secondsUsed * PENALTY_PER_SECOND, MIN_POINTS);
}

// localStorage settings
const STORAGE_KEY = "quizBestScores";
const MAX_SAVED_SCORES = 5;

// Reads the saved scores. Returns an empty list if nothing is saved or data is broken.
function getBestScores() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

// Adds a new score, sorts from best to worst and keeps only the top 5
function saveScore(name, points, correct, total) {
  const cleanName = (name || "").trim().slice(0, 20) || "Player";
  const scores = getBestScores();

  scores.push({ name: cleanName, points, correct, total });
  scores.sort((a, b) => b.points - a.points);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, MAX_SAVED_SCORES)));
  } catch (error) {
    // storage full or blocked: the quiz still works
  }
}

// Displays the best scores in the results screen
function renderBestScores() {
  const list = document.getElementById("best-scores");
  list.textContent = "";

  const scores = getBestScores();
  if (scores.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No scores yet.";
    list.appendChild(empty);
    return;
  }

  scores.forEach((entry) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    const pts = document.createElement("span");
    name.textContent = entry.name;
    pts.textContent = entry.points + " pts";
    li.append(name, pts);
    list.appendChild(li);
  });
}