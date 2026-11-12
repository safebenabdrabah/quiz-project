<?php
require __DIR__ . '/db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

// GET: top 5 scores
if ($method === 'GET') {
    $stmt = $pdo->query(
        "SELECT name, points, correct, total
         FROM scores
         ORDER BY points DESC, created_at ASC
         LIMIT 5"
    );
    echo json_encode($stmt->fetchAll());
    exit;
}

// POST: save a score
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON"]);
        exit;
    }

    $name    = trim($data['name'] ?? '');
    $points  = $data['points'] ?? null;
    $correct = $data['correct'] ?? null;
    $total   = $data['total'] ?? null;

    if (
        !is_int($points) || !is_int($correct) || !is_int($total) ||
        $total < 1 || $correct < 0 || $correct > $total ||
        $points < 0 || $points > $total * 100
    ) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
        exit;
    }

    $name = mb_substr($name, 0, 20);
    if ($name === '') {
        $name = 'Player';
    }

    $stmt = $pdo->prepare(
        "INSERT INTO scores (name, points, correct, total) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$name, $points, $correct, $total]);

    echo json_encode(["ok" => true]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);