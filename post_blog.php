<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $youtube_url = $data['youtube_url'] ?? '';

    if (!empty($title) && !empty($description) && !empty($youtube_url)) {
        $stmt = $pdo->prepare("INSERT INTO blog_posts (title, description, youtube_url) VALUES (:title, :description, :youtube_url)");
        if ($stmt->execute([':title' => $title, ':description' => $description, ':youtube_url' => $youtube_url])) {
            echo json_encode(['success' => true, 'message' => 'Post added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add post']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
