
CREATE DATABASE IF NOT EXISTS quiz_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quiz_db;

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('qcm', 'tf') NOT NULL,
    text VARCHAR(255) NOT NULL,
    options JSON NOT NULL,
    correct_index TINYINT NOT NULL
);

-- Scores table
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    points INT NOT NULL,
    correct TINYINT NOT NULL,
    total TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample questions
INSERT INTO questions (type, text, options, correct_index) VALUES
('qcm', 'Which keyword declares a variable that cannot be reassigned?', '["var","let","const","static"]', 2),
('tf',  'JavaScript and Java are the same language.', '["True","False"]', 1),
('qcm', 'What does typeof null return?', '["null","object","undefined","number"]', 1),
('qcm', 'Which method adds an element at the end of an array?', '["push()","pop()","shift()","unshift()"]', 0),
('tf',  '=== compares both value and type.', '["True","False"]', 0),
('qcm', 'Which function parses a JSON string into an object?', '["JSON.stringify()","JSON.parse()","JSON.convert()","JSON.object()"]', 1),
('qcm', 'Which method selects an element by its id?', '["document.querySelectorAll()","document.getElementsByClassName()","document.getElementById()","document.getTag()"]', 2),
('tf',  'localStorage data is deleted when the browser tab is closed.', '["True","False"]', 1),
('qcm', 'What does [1, 2, 3].map(n => n * 2) return?', '["[1, 2, 3]","[2, 4, 6]","6","undefined"]', 1),
('qcm', 'Which function runs code repeatedly at a fixed interval?', '["setTimeout()","setInterval()","requestRepeat()","repeat()"]', 1);