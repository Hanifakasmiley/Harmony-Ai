<?php
require_once 'config.php';

try {
    $conn = getConnection();
    $hash = password_hash('password123', PASSWORD_DEFAULT);

    $stmt = $conn->prepare('UPDATE users SET password = ?, designation = ? WHERE email = ?');
    $stmt->execute([$hash, 'System Administrator', 'john.doe@example.com']);

    echo 'Updated John Doe password successfully!' . "\n";
    echo 'Email: john.doe@example.com' . "\n";
    echo 'Password: password123' . "\n";
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
}
?>