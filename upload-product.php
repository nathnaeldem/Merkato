<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $image = null;

    // Handle image upload as BLOB
    if (isset($_FILES['image']['tmp_name']) && $_FILES['image']['tmp_name'] !== '') {
        $image = file_get_contents($_FILES['image']['tmp_name']);
    }

    $stmt = $conn->prepare("INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $price, $category, $image);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product uploaded successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to upload product."]);
    }

    $stmt->close();
}

$conn->close();
?>
