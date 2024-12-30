<?php header("Content-Type: application/json");
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

// Get page number from query parameter, default to 1
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$itemsPerPage = 9;
$offset = ($page - 1) * $itemsPerPage;

// Get total count of products
$countSql = "SELECT COUNT(*) as total FROM products";
$countResult = $conn->query($countSql);
$totalProducts = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalProducts / $itemsPerPage);

// Get products for current page
$sql = "SELECT id, name, price, category, 
        TO_BASE64(image) as image, 
        TO_BASE64(image2) as image2, 
        TO_BASE64(image3) as image3 
        FROM products 
        LIMIT ? OFFSET ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $itemsPerPage, $offset);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode([
        "products" => $products,
        "currentPage" => $page,
        "totalPages" => $totalPages,
        "totalProducts" => $totalProducts
    ]);
} else {
    echo json_encode([
        "products" => [],
        "currentPage" => $page,
        "totalPages" => $totalPages,
        "totalProducts" => $totalProducts
    ]);
}

$stmt->close();
$conn->close();
