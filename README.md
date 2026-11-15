# JavaScript Quiz (HTML / CSS / JavaScript / PHP / MySQL)

An interactive quiz web application. Players answer 10 questions against a timer and earn points based on speed. The questions and the best scores are stored in a **MySQL database**, and every answer is **validated on the server with PHP**.

## Features

**JavaScript (front end)**
- Countdown timer for each question (20 seconds)
- Immediate feedback after each answer (correct / incorrect)
- Dynamic score with time penalty: faster correct answers earn more points
- Replay system with a full reset
- Different question types: multiple choice (4 options) and True/False (2 options)
- Visual progress bar
- Transition animations between questions

**PHP and database (back end)**
- Questions and answers stored in the database
- Answer checking and points calculation on the server
- Scores saved and ranked in the database (top 5)
- JS ↔ PHP communication with `fetch` (JSON)

## Scoring

| Case | Points |
|------|--------|
| Wrong answer or timeout | 0 |
| Correct answer | 100 minus 3 points per second used (minimum 40) |

The maximum score is 1000 points (10 questions × 100). The top 5 scores are returned by the server.

## Project structure

```
.
├── index.html        Page structure (welcome, question and results screens)
├── style.css         Styles, animations and responsive layout
├── questions.js      Loads the questions from the API and renders the answer buttons
├── timer.js          Countdown timer
├── scores.js         Saves and displays the best scores (fetch to the API)
├── results.js        Results screen and progress bar
├── script.js         Game logic: start, answer, next, timeout, replay
├── database.sql      Database schema and the 10 questions
├── api/
│   ├── db.php        PDO connection to MySQL
│   ├── questions.php GET: returns the questions (without the correct answers)
│   ├── answer.php    POST: checks an answer and computes the points
│   └── scores.php    GET: top 5 scores / POST: saves a score
└── README.md
```

Scripts are loaded in this order: `questions.js`, `timer.js`, `scores.js`, `results.js`, `script.js`.

## API

| Endpoint | Request | Response |
|----------|---------|----------|
| `GET api/questions.php` | none | `[{ "id": 1, "type": "qcm", "text": "...", "options": ["a", "b"] }]` |
| `POST api/answer.php` | `{ "question_id": 1, "selected": 2, "time_left": 15 }` | `{ "correct": true, "correct_index": 2, "points": 85 }` |
| `GET api/scores.php` | none | `[{ "name": "Sara", "points": 920, "correct": 10, "total": 10 }]` |
| `POST api/scores.php` | `{ "name": "Bay", "points": 850, "correct": 9, "total": 10 }` | `{ "ok": true }` |

The correct answer is never sent to the browser before the player answers.

## How to run

PHP needs a server, so **Live Server cannot be used** for this version. Use XAMPP (Apache + PHP + MySQL).

1. Install [XAMPP](https://www.apachefriends.org/) and start **Apache** and **MySQL** from the XAMPP Control Panel.
2. Clone the repository into the `htdocs` folder:
   ```bash
   cd C:\xampp\htdocs
   git clone <repository-url> quiz
   ```
3. Open `http://localhost/phpmyadmin`, go to the **Import** tab, choose `database.sql` and click **Go**. This creates the database `quiz_db` with the tables `questions` and `scores`.
4. Check the connection settings in `api/db.php` (XAMPP defaults: host `localhost`, user `root`, empty password).
5. Open `http://localhost/quiz/` in your browser.

## Technologies

- HTML5 (semantic elements)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (`fetch`, `async` / `await`, no external library)
- PHP 8 with PDO
- MySQL 

## Security

- PDO **prepared statements** for every query (protection against SQL injection)
- Answers are **validated on the server**, and the correct answers stay in the database
- Server-side validation of received data (types, ranges, name length)
- Player names are inserted in the page with `textContent` (no HTML injection)
- Database errors are not shown to the user

## Quality

- Responsive: mobile, tablet and desktop
- Keyboard navigation with visible focus
- `prefers-reduced-motion` respected (animations disabled)
- `aria-live` feedback and labeled form field
- W3C validation: HTML ✅ / CSS ✅
- Lighthouse scores: Performance 100 / Accessibility 100 / Best Practices 100 / SEO 90

## Team

| Student | Contribution |
|---------|--------------|
| **Safe Ben Abdrabah** | Countdown timer, immediate feedback, replay with reset, transition animations, questions API, server-side answer validation, loading questions and sending answers with `fetch` (`script.js`, `timer.js`, `questions.js`, `api/questions.php`, `api/answer.php`) |
| **Bayrem Ben Arous** | Question types, time-based scoring, results screen, progress bar, HTML/CSS cleanup, database schema, PDO connection, scores API and scores with `fetch` (`scores.js`, `results.js`, `database.sql`, `api/db.php`, `api/scores.php`) |

## Known limitations and future improvements

- The final score is sent by the browser, so it could be forged. A PHP session could store the points on the server while the player answers, and `scores.php` would read them from the session.
- Difficulty levels and question categories
- Sound effects