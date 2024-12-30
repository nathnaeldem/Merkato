<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$servername = 'localhost';
$dbname = 'xtzkjphr_sofi';
$username = 'xtzkjphr_root';
$password = "55443322@So";   // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$request_method = $_SERVER['REQUEST_METHOD'];
$table = isset($_GET['table']) ? $_GET['table'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($request_method) {
    case 'GET':
        if ($table) {
            getAllRecords($table);
        } else {
            echo json_encode(["error" => "Table name is required"]);
        }
        break;
    case 'DELETE':
        if ($table && $id) {
            deleteRecord($table, $id);
        } else {
            echo json_encode(["error" => "Table name and ID are required"]);
        }
        break;
    case 'PUT':
        if ($table && $id) {
            $input = json_decode(file_get_contents('php://input'), true);
            updateRecord($table, $id, $input);
        } else {
            echo json_encode(["error" => "Table name and ID are required"]);
        }
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

function getAllRecords($table) {
    global $conn;
    $allowed_tables = ['blog_posts', 'categories', 'offers', 'products', 'users'];

    // Validate the table name
    if (!in_array($table, $allowed_tables)) {
        echo json_encode(["error" => "Invalid table name"]);
        return;
    }

    // Fetch columns for the selected table
    $columns = getColumns($table);

    // Modify the SQL query for tables that contain specific columns
    if ($table === 'offers') {
        $sql = "SELECT id, name, price, description, created_at FROM $table";
    } elseif ($table === 'products') {
        $sql = "SELECT id, name, price, category FROM $table";
    } elseif ($table === 'users') {
        $sql = "SELECT id, username, email, role FROM $table";
    } else {
        $sql = "SELECT * FROM $table";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        // Send both columns and data to the frontend
        echo json_encode(['columns' => $columns, 'data' => $data]);
    } else {
        echo json_encode(['columns' => $columns, 'data' => []]); // Return empty array if no data found
    }
}

function deleteRecord($table, $id) {
    global $conn;
    $sql = "DELETE FROM $table WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete record"]);
    }
}

function updateRecord($table, $id, $data) {
    global $conn;
    $set_values = "";
    foreach ($data as $key => $value) {
        $set_values .= "$key = '$value', ";
    }
    $set_values = rtrim($set_values, ", ");
    
    $sql = "UPDATE $table SET $set_values WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update record"]);
    }
}

// Helper function to fetch column names for a table
function getColumns($table) {
    global $conn;
    $sql = "SHOW COLUMNS FROM $table";
    $result = $conn->query($sql);
    $columns = [];
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field']; // 'Field' contains the column name
    }
    return $columns;
}

$conn->close();
?>
