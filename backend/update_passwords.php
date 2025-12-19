<?php
require_once 'config.php';

try {
    $conn = getConnection();
    $hash = password_hash('password123', PASSWORD_DEFAULT);

    $stmt = $conn->prepare('UPDATE users SET password = ? WHERE email LIKE ?');
    $stmt->execute([$hash, '%@harmony.ai']);

    echo 'Passwords updated successfully! New hash: ' . $hash . "\n";
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
}
?>