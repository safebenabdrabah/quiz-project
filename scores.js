"use strict";

const BASE_POINTS = 100;
const PENALTY_PER_SECOND = 3;
const MIN_POINTS = 40;

function calculatePoints(isCorrect, timeLeft, totalTime = 20) {
  if (!isCorrect) return 0;
  const secondsUsed = Math.max(0, totalTime - timeLeft);
  return Math.max(BASE_POINTS - secondsUsed * PENALTY_PER_SECOND, MIN_POINTS);
}

const STORAGE_KEY = "quizBestScores";
const MAX_SAVED_SCORES = 5;

function getBestScores() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

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