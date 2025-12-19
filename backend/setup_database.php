<?php
/**
 * Harmony AI - Database Setup Runner
 * Run this script once to set up all database tables
 */

require_once 'config.php';

try {
    $conn = getConnection();
    echo "Connected to database successfully!\n";

    // Read and execute the SQL file
    $sql = file_get_contents('database_setup.sql');

    // Split into individual statements
    $statements = array_filter(array_map('trim', explode(';', $sql)));

    foreach ($statements as $statement) {
        if (!empty($statement) && !preg_match('/^--/', $statement)) {
            try {
                $conn->exec($statement);
                echo "Executed: " . substr($statement, 0, 50) . "...\n";
            } catch (PDOException $e) {
                echo "Error executing statement: " . $e->getMessage() . "\n";
                echo "Statement: " . $statement . "\n";
            }
        }
    }

    echo "\nDatabase setup completed!\n";
    echo "You can now test the login with:\n";
    echo "Email: admin@harmony.ai\n";
    echo "Password: password123\n";

} catch (PDOException $e) {
    echo "Database setup failed: " . $e->getMessage() . "\n";
    echo "Make sure MySQL is running and the database 'harmony_db' exists.\n";
}
?>