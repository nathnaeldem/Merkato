<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$conn = new mysqli("127.0.0.1", "xtzkjphr_root", "", "xtzkjphr_sofi");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$keyword = isset($_GET['keyword']) ? $conn->real_escape_string($_GET['keyword']) : '';

$results = [];
if (!empty($keyword)) {
    // Select offers and products matching the search keyword
    $query = "
        SELECT 'offer' AS type, id, name, price, description, image FROM offers WHERE name LIKE '%$keyword%'
        UNION
        SELECT 'product' AS type, id, name, price, category AS description, image FROM products WHERE name LIKE '%$keyword%'
    ";

    $result = $conn->query($query);
    while ($row = $result->fetch_assoc()) {
        // Convert image blob to base64
        $base64Image = base64_encode($row['image']);
        $row['image'] = 'data:image/jpeg;base64,' . $base64Image; // Assuming the image is in JPEG format

        // Add the row to results array
        $results[] = $row;
    }
}

echo json_encode($results);

$conn->close();
?>
