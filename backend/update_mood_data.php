<?php
/**
 * Update mood_level column from integers to text values
 * Run this once: http://localhost:3000/Harmony-Ai/backend/update_mood_data.php
 */

require_once 'config.php';

$conn = getConnection();

// Mapping: integer mood levels to text
$updates = [
    ['old' => '9', 'new' => 'Happy'],
    ['old' => '10', 'new' => 'Happy'],
    ['old' => '8', 'new' => 'Calm'],
    ['old' => '7', 'new' => 'Calm'],
    ['old' => '6', 'new' => 'Tired'],
    ['old' => '5', 'new' => 'Neutral'],
    ['old' => '4', 'new' => 'Anxious'],
    ['old' => '3', 'new' => 'Anxious'],
    ['old' => '2', 'new' => 'Sad'],
    ['old' => '1', 'new' => 'Sad'],
    ['old' => '0', 'new' => 'Neutral'],
];

echo "<h2>Updating mood_level data from integers to text...</h2>";

$totalUpdated = 0;

foreach ($updates as $update) {
    $stmt = $conn->prepare("UPDATE dailylogs SET mood_level = ? WHERE mood_level = ?");
    $stmt->execute([$update['new'], $update['old']]);
    $count = $stmt->rowCount();
    $totalUpdated += $count;
    echo "<p>Updated {$count} rows: '{$update['old']}' → '{$update['new']}'</p>";
}

echo "<h3>✅ Total rows updated: {$totalUpdated}</h3>";

// Show current data
echo "<h2>Current dailylogs data:</h2>";
echo "<table border='1' cellpadding='8'>";
echo "<tr><th>ID</th><th>User</th><th>Mood</th><th>Stress</th><th>Anxiety</th><th>Sleep</th><th>Date</th></tr>";

$stmt = $conn->query("SELECT log_id, user_id, mood_level, stress_level, anxiety_level, sleep_hours, log_date FROM dailylogs ORDER BY log_id");
while ($row = $stmt->fetch()) {
    echo "<tr>";
    echo "<td>{$row['log_id']}</td>";
    echo "<td>{$row['user_id']}</td>";
    echo "<td><strong>{$row['mood_level']}</strong></td>";
    echo "<td>{$row['stress_level']}</td>";
    echo "<td>{$row['anxiety_level']}</td>";
    echo "<td>{$row['sleep_hours']}</td>";
    echo "<td>{$row['log_date']}</td>";
    echo "</tr>";
}
echo "</table>";

echo "<p><a href='api.php/dailylogs'>View API Response</a></p>";
?>
