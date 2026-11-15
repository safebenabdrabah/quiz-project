<?php
require __DIR__ . '/db.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// correct index not selected
$stmt = $pdo->query("SELECT id, type, text, options FROM questions ORDER BY id");

$questions = [];
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    $questions[] = [
        "id"      => (int) $row["id"],
        "type"    => $row["type"],
        "text"    => $row["text"],
        "options" => json_decode($row["options"], true),
    ];
}

echo json_encode($questions);