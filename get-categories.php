<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$servername = "localhost";
$username = "xtzkjphr_root";
$password = "55443322@So";
$dbname = "xtzkjphr_sofi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    exit;
}

$sql = "SELECT id, name FROM categories";
$result = $conn->query($sql);

if ($result) {
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    echo json_encode(["categories" => $categories]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to fetch categories."]);
}

$conn->close();
?>
