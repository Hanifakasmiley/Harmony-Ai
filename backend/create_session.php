<?php
/**
 * Harmony AI - Create Session
 * Creates backend session after successful login
 */

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'POST method required']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['user_id']) || !isset($data['designation'])) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID and designation required']);
    exit();
}

// Create session
$_SESSION['user_id'] = $data['user_id'];
$_SESSION['full_name'] = $data['full_name'] ?? '';
$_SESSION['email'] = $data['email'] ?? '';
$_SESSION['designation'] = $data['designation'];

echo json_encode([
    'success' => true,
    'message' => 'Session created',
    'session_id' => session_id()
]);
?>
