
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
INSERT INTO questions (type, text, options, correct_index)
VALUES
(
    'qcm',
    'Which keyword declares a variable that cannot be reassigned?',
    '["let", "var", "const", "static"]',
    2
),
(
    'tf',
    'JavaScript and Java are the same language.',
    '["True", "False"]',
    1
),
(
    'qcm',
    'What does typeof null return?',
    '["null", "object", "undefined", "boolean"]',
    1
),
(
    'qcm',
    'Which method converts JSON text into a JavaScript object?',
    '["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"]',
    1
),
(
    'tf',
    'JavaScript is a dynamically typed language.',
    '["True", "False"]',
    0
);
