<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['message' => 'Only POST requests are allowed']);
    exit;
}

// Database configuration
$servername = "127.0.0.1"; // Replace with your DB host
$username = "xtzkjphr_root";        // Replace with your DB username
$password = "55443322@So";            // Replace with your DB password
$dbname = "xtzkjphr_sofi";          // Replace with your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Validate POST parameters
$name = $_POST['name'] ?? null;
$price = $_POST['price'] ?? null;
$description = $_POST['description'] ?? null;

if (!$name || !$price || !$description) {
    echo json_encode(['message' => 'Missing required fields']);
    exit;
}

// Handle image uploads
$imagePaths = [];
for ($i = 1; $i <= 3; $i++) {
    if (isset($_FILES["image$i"]) && $_FILES["image$i"]['tmp_name'] !== '') {
        if ($_FILES["image$i"]["error"] !== UPLOAD_ERR_OK) {
            echo json_encode(['message' => 'Error uploading image' . $i]);
            exit;
        }
        // Store images as binary data in the database
        $imagePaths[$i] = file_get_contents($_FILES["image$i"]['tmp_name']);
    } else {
        $imagePaths[$i] = null;
    }
}

// Insert data into the database
$sql = "INSERT INTO offers (name, price, description, image, image2, image3) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssss",
    $name,
    $price,
    $description,
    $imagePaths[1],
    $imagePaths[2],
    $imagePaths[3]
);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Offer uploaded successfully']);
} else {
    echo json_encode(['message' => 'Database error: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>
