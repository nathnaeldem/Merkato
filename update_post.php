<?php
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$host = 'localhost';
$dbname = 'xtzkjphr_sofi';
$username = 'xtzkjphr_root';
$password = "55443322@So";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'] ?? null;
    $action = $data['action'] ?? '';

    if ($id && in_array($action, ['like', 'share'])) {
        $column = $action . 's'; // maps to "likes" or "shares"
        $stmt = $pdo->prepare("UPDATE blog_posts SET $column = $column + 1 WHERE id = :id");
        if ($stmt->execute([':id' => $id])) {
            echo json_encode(['success' => true, 'message' => ucfirst($action) . ' updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
