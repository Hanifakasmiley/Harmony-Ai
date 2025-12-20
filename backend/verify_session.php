<?php
/**
 * Harmony AI - Session Verification
 * Verifies if user is authenticated via backend session
 */

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if session exists
if (isset($_SESSION['user_id']) && isset($_SESSION['designation'])) {
    echo json_encode([
        'authenticated' => true,
        'user' => [
            'user_id' => $_SESSION['user_id'],
            'full_name' => $_SESSION['full_name'] ?? '',
            'email' => $_SESSION['email'] ?? '',
            'designation' => $_SESSION['designation']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'authenticated' => false,
        'message' => 'Not authenticated'
    ]);
}
?>
