<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection settings
$host = "127.0.0.1";
$username = "xtzkjphr_root";
$password = "55443322@So"; // Replace with your actual password
$database = "xtzkjphr_sofi";

header('Content-Type: application/json');

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch offers
    $offersQuery = $pdo->query("SELECT id, name, price, description, TO_BASE64(image) AS image FROM offers LIMIT 3");
    $offers = $offersQuery->fetchAll(PDO::FETCH_ASSOC);

    // Fetch products
    $productsQuery = $pdo->query("SELECT id, name, price, category, TO_BASE64(image) AS image FROM products LIMIT 3");
    $products = $productsQuery->fetchAll(PDO::FETCH_ASSOC);

    // Combine results
    $response = [
        "offers" => $offers,
        "products" => $products
    ];

    // Send JSON response
    echo json_encode($response, JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    // Handle connection errors
    http_response_code(500);
    echo json_encode([
        "error" => "Database connection failed: " . $e->getMessage()
    ]);
}
?>
