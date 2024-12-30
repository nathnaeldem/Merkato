<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
  header("Content-Type: application/json");
  $conn = new mysqli("localhost", "xtzkjphr_root", "55443322@So", "xtzkjphr_sofi");
  if ($conn->connect_error) {
      die(json_encode(["message" => "Database connection failed."]));
  }
 
  // Create table if not exists
  $conn->query("CREATE TABLE IF NOT EXISTS devices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      deviceType VARCHAR(50),
      offerPrice DECIMAL(10, 2),
      description TEXT,
      phoneNumber VARCHAR(15),
      images TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )");
 
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $deviceType = $_POST['deviceType'];
      $offerPrice = $_POST['offerPrice'];
      $description = $_POST['description'];
      $phoneNumber = $_POST['phoneNumber'];
 
      $imagePaths = [];
      foreach ($_FILES as $file) {
          $targetPath = "uploads/" . basename($file['name']);
          if (move_uploaded_file($file['tmp_name'], $targetPath)) {
              $imagePaths[] = $targetPath;
          }
      }
 
      $imagesJson = json_encode($imagePaths);
      $stmt = $conn->prepare("INSERT INTO devices (deviceType, offerPrice, description, phoneNumber, images) VALUES (?, ?, ?, ?, ?)");
      $stmt->bind_param("sdsss", $deviceType, $offerPrice, $description, $phoneNumber, $imagesJson);
 
      if ($stmt->execute()) {
          echo json_encode(["message" => "Device listed successfully."]);
      } else {
          echo json_encode(["message" => "Failed to list device."]);
      }
 
      $stmt->close();
  }
  $conn->close();
  ?>