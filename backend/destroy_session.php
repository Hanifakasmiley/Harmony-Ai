<?php
/**
 * Harmony AI - Destroy Session
 * Destroys backend session on logout
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

// Destroy session
session_unset();
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Session destroyed'
]);
?>
