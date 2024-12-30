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
 
  $result = $conn->query("SELECT * FROM devices");
  $devices = [];
  while ($row = $result->fetch_assoc()) {
      $row['images'] = json_decode($row['images']); // Decode JSON images field
      $devices[] = $row;
  }
 
  echo json_encode($devices);
  $conn->close();
  ?>