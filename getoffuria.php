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
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get page number from query parameter, default to 1
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$items_per_page = 6;
$offset = ($page - 1) * $items_per_page;

// Get total count of records
$count_sql = "SELECT COUNT(*) as total FROM offers";
$count_result = $conn->query($count_sql);
$total_records = $count_result->fetch_assoc()['total'];
$total_pages = ceil($total_records / $items_per_page);

// Fetch paginated offers
$sql = "SELECT id, name, price, description, 
        TO_BASE64(image) AS image, 
        TO_BASE64(image2) AS image2, 
        TO_BASE64(image3) AS image3 
        FROM offers 
        LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $items_per_page, $offset);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $offers = [];
    while ($row = $result->fetch_assoc()) {
        $offers[] = $row;
    }
    echo json_encode([
        'offers' => $offers,
        'currentPage' => $page,
        'totalPages' => $total_pages
    ]);
} else {
    echo json_encode([
        'offers' => [],
        'currentPage' => $page,
        'totalPages' => $total_pages
    ]);
}

$stmt->close();
$conn->close();
?>
