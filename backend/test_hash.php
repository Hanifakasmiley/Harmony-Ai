<?php
$password = 'password123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "Password: $password\n";
echo "Hash: $hash\n";
echo "Verify: " . (password_verify($password, $hash) ? 'true' : 'false') . "\n";

// Check the existing hash
$existing = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
echo "Existing hash verify: " . (password_verify($password, $existing) ? 'true' : 'false') . "\n";
?>