<?php
require __DIR__ . '/db.php';

header("Content-Type: application/json");

const BASE_POINTS = 100;
const PENALTY_PER_SECOND = 3;
const MIN_POINTS = 40;
const QUESTION_TIME = 20;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

$questionId = $data['question_id'] ?? null;
$selected   = $data['selected'] ?? null;   // null : time ran out
$timeLeft   = $data['time_left'] ?? null;

if (!is_int($questionId) || !is_int($timeLeft) || ($selected !== null && !is_int($selected))) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data"]);
    exit;
}

$timeLeft = max(0, min(QUESTION_TIME, $timeLeft));

$stmt = $pdo->prepare("SELECT correct_index FROM questions WHERE id = ?");
$stmt->execute([$questionId]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    http_response_code(404);
    echo json_encode(["error" => "Question not found"]);
    exit;
}

$correctIndex = (int) $row['correct_index'];
$correct = ($selected !== null && $selected === $correctIndex);

$points = 0;
if ($correct) {
    $secondsUsed = QUESTION_TIME - $timeLeft;
    $points = max(BASE_POINTS - $secondsUsed * PENALTY_PER_SECOND, MIN_POINTS);
}

echo json_encode([
    "correct"       => $correct,
    "correct_index" => $correctIndex,
    "points"        => $points,
]);