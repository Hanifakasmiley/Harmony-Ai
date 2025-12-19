<?php
/**
 * Add anxiety_level values to existing dummy data
 * Run this once: http://localhost:3000/Harmony-Ai/backend/update_anxiety_data.php
 */

require_once 'config.php';

$conn = getConnection();

echo "<h2>Adding anxiety_level to existing data...</h2>";

// Update each row with appropriate anxiety level based on mood/stress
$updates = [
    ['id' => 1, 'anxiety' => 3],   // Calm mood, low anxiety
    ['id' => 2, 'anxiety' => 7],   // Anxious mood, high anxiety
    ['id' => 3, 'anxiety' => 2],   // Calm mood, low anxiety
    ['id' => 4, 'anxiety' => 5],   // Neutral mood, medium anxiety
    ['id' => 5, 'anxiety' => 8],   // Anxious mood, high anxiety
    ['id' => 6, 'anxiety' => 5],   // Tired mood, medium anxiety
    ['id' => 7, 'anxiety' => 1],   // Happy mood, very low anxiety
    ['id' => 8, 'anxiety' => 7],   // Sad mood, high anxiety
    ['id' => 9, 'anxiety' => 3],   // Calm mood, low anxiety
    ['id' => 10, 'anxiety' => 6],  // Neutral mood, medium-high anxiety
];

$totalUpdated = 0;

foreach ($updates as $update) {
    $stmt = $conn->prepare("UPDATE dailylogs SET anxiety_level = ? WHERE log_id = ? AND (anxiety_level IS NULL OR anxiety_level = '')");
    $stmt->execute([$update['anxiety'], $update['id']]);
    $count = $stmt->rowCount();
    $totalUpdated += $count;
    if ($count > 0) {
        echo "<p>✅ Log ID {$update['id']}: anxiety_level set to {$update['anxiety']}</p>";
    }
}

echo "<h3>✅ Total rows updated: {$totalUpdated}</h3>";

// Show current data
echo "<h2>Current dailylogs data:</h2>";
echo "<table border='1' cellpadding='8' style='border-collapse: collapse;'>";
echo "<tr style='background: #2A9D8F; color: white;'><th>ID</th><th>User</th><th>Mood</th><th>Stress</th><th>Anxiety</th><th>Sleep</th><th>Notes</th><th>Date</th></tr>";

$stmt = $conn->query("SELECT * FROM dailylogs ORDER BY log_id");
while ($row = $stmt->fetch()) {
    echo "<tr>";
    echo "<td>{$row['log_id']}</td>";
    echo "<td>{$row['user_id']}</td>";
    echo "<td><strong>{$row['mood_level']}</strong></td>";
    echo "<td>{$row['stress_level']}</td>";
    echo "<td><strong style='color: #E76F51;'>{$row['anxiety_level']}</strong></td>";
    echo "<td>{$row['sleep_hours']}</td>";
    echo "<td>{$row['notes']}</td>";
    echo "<td>{$row['log_date']}</td>";
    echo "</tr>";
}
echo "</table>";

echo "<p style='margin-top: 20px;'><a href='api.php/dailylogs' style='color: #2A9D8F;'>View API Response →</a></p>";
?>
