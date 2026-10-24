# JavaScript Quiz

An interactive quiz web page built with HTML5, CSS3 and vanilla JavaScript. Players answer 10 questions against a timer, earn points based on speed, and compete for the best scores saved in their browser.

## Features

**Mandatory**
- Countdown timer for each question (20 seconds)
- Dynamic score with time penalty: faster correct answers earn more points
- Immediate feedback after each answer (correct / incorrect)
- Best scores saved with `localStorage`

**Bonus**
- Replay system with a full reset
- Different question types: multiple choice (4 options) and True/False (2 options)
- Visual progress bar
- Transition animations between questions

## Scoring

| Case | Points |
|------|--------|
| Wrong answer or timeout | 0 |
| Correct answer | 100 minus 3 points per second used (minimum 40) |

The maximum score is 1000 points (10 questions × 100). The top 5 scores are kept in `localStorage`.

## Project structure

```
.
├── index.html     Page structure (welcome, question and results screens)
├── style.css      Styles, animations and responsive layout
├── questions.js   Questions data and answer buttons rendering
├── timer.js       Countdown timer
├── scores.js      Points calculation and best scores (localStorage)
├── results.js     Results screen and progress bar
├── script.js      Game logic: start, answer, next, timeout, replay
└── README.md
```

Scripts are loaded in this order: `questions.js`, `timer.js`, `scores.js`, `results.js`, `script.js`.

## How to run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Open the folder in VS Code.
3. Start it with the **Live Server** extension (right-click `index.html` → *Open with Live Server*).

No installation or build step is needed.

## Technologies

- HTML5 (semantic elements)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (no external library)

## Quality

- Responsive: mobile, tablet and desktop
- Keyboard navigation with visible focus
- `prefers-reduced-motion` respected (animations disabled)
- `aria-live` feedback and labeled form field
- Player names are inserted with `textContent` (no HTML injection)
- W3C validation: HTML ☐ / CSS ☐
- Lighthouse scores: Performance ☐ / Accessibility ☐ / Best Practices ☐ / SEO ☐

## Team

| Student | Contribution |
|---------|--------------|
| **Safe ben abdrabah** | Countdown timer, immediate feedback, replay with reset, transition animations (`script.js`, `timer.js`) |
| **Ben arous Bayrem** | Questions and question types, time-based scoring, `localStorage` best scores, results screen, progress bar (`questions.js`, `scores.js`, `results.js`), HTML/CSS cleanup |

## Future improvements

- Load questions from a JSON file with `fetch`
- Difficulty levels and question categories
- Sound effects