<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");



$servername = 'localhost';
$dbname = 'xtzkjphr_sofi';
$username = 'xtzkjphr_root';
$password = "55443322@So";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $table = $input['table'] ?? '';
    $name = $input['name'] ?? '';

    if ($table === 'categories' && !empty($name)) {
        $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");
        $stmt->bind_param("s", $name);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Category added successfully"]);
        } else {
            echo json_encode(["message" => "Failed to add category"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Invalid data provided"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}

$conn->close();
?>
