<?php
/**
 * Harmony AI - Password Hash Generator
 * Use this to generate password hashes for your database
 * 
 * Usage: Open in browser: http://localhost/Harmony-Ai/backend/hash_password.php?password=yourpassword
 */

header('Content-Type: application/json');

if (isset($_GET['password'])) {
    $password = $_GET['password'];
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    echo json_encode([
        'password' => $password,
        'hash' => $hash,
        'sql_example' => "UPDATE users SET password = '$hash' WHERE email = 'your@email.com';"
    ], JSON_PRETTY_PRINT);
} else {
    echo json_encode([
        'error' => 'No password provided',
        'usage' => 'Add ?password=yourpassword to the URL',
        'example' => 'http://localhost/Harmony-Ai/backend/hash_password.php?password=test123'
    ], JSON_PRETTY_PRINT);
}
?>
