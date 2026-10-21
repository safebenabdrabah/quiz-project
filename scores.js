"use strict";

const BASE_POINTS = 100;
const PENALTY_PER_SECOND = 3;
const MIN_POINTS = 40;

function calculatePoints(isCorrect, timeLeft, totalTime = 20) {
  if (!isCorrect) return 0;
  const secondsUsed = Math.max(0, totalTime - timeLeft);
  return Math.max(BASE_POINTS - secondsUsed * PENALTY_PER_SECOND, MIN_POINTS);
}