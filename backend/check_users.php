<?php
require_once 'config.php';

try {
    $conn = getConnection();
    $stmt = $conn->query('SELECT user_id, full_name, email FROM users');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Users in database:\n";
    foreach ($users as $user) {
        echo "- {$user['user_id']}: {$user['full_name']} ({$user['email']})\n";
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
}
?>