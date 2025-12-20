<?php
/**
 * Harmony AI - REST API
 * Handles CRUD operations for all 10 database tables
 */

require_once 'config.php';

setCorsHeaders();

// ==================== INPUT VALIDATION ====================
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validateMoodLevel($level) {
    $validMoods = ['Very Sad', 'Sad', 'Neutral', 'Calm', 'Happy', 'Very Happy', 'Anxious'];
    return in_array($level, $validMoods);
}

function validateStressLevel($level) {
    $level = intval($level);
    return $level >= 1 && $level <= 10;
}

function validateAnxietyLevel($level) {
    $level = intval($level);
    return $level >= 1 && $level <= 10;
}

function validateSleepHours($hours) {
    $hours = floatval($hours);
    return $hours >= 0 && $hours <= 24;
}

function validateRiskScore($score) {
    $score = intval($score);
    return $score >= 0 && $score <= 100;
}

function validateRating($rating) {
    $rating = intval($rating);
    return $rating >= 1 && $rating <= 5;
}

function validateDesignation($designation) {
    $valid = ['Patient/User', 'System Administrator', 'Data Scientist', 'Mental Health Administrator', 'Software Engineer', 'Emergency Team', 'AI Engineer', 'Security Analyst', 'Financial Team'];
    return in_array($designation, $valid);
}

function sanitizeString($str) {
    return trim(htmlspecialchars($str, ENT_QUOTES, 'UTF-8'));
}

// ==================== API ROUTING ====================

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Parse the endpoint from URI
$path = parse_url($uri, PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));
$endpoint = end($segments);

// Get ID if provided in query string
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

// Route to appropriate handler
switch ($endpoint) {
    case 'users':
        handleUsers($conn, $method, $id);
        break;
    case 'login':
        handleLogin($conn);
        break;
    case 'dailylogs':
        handleDailyLogs($conn, $method, $id, $userId);
        break;
    case 'counsellors':
        handleCounsellors($conn, $method, $id);
        break;
    case 'sessions':
        handleSessions($conn, $method, $id, $userId);
        break;
    case 'feedback':
        handleFeedback($conn, $method, $id, $userId);
        break;
    case 'progress':
        handleProgress($conn, $method, $id, $userId);
        break;
    case 'recommendations':
        handleRecommendations($conn, $method, $id, $userId);
        break;
    case 'dashboard-stats':
        handleStatistics($conn);
        break;
    case 'ai_analysis':
        handleAIAnalysis($conn, $method, $id, $userId);
        break;
    case 'crisisalerts':
        handleCrisisAlerts($conn, $method, $id, $userId);
        break;
    case 'emergencycontacts':
        handleEmergencyContacts($conn, $method, $id, $userId);
        break;
    case 'statistics':
        handleStatistics($conn);
        break;
    default:
        sendResponse(['error' => 'Endpoint not found', 'available' => [
            'users', 'login', 'dailylogs', 'counsellors', 'sessions', 
            'feedback', 'progress', 'recommendations', 'ai_analysis', 
            'crisisalerts', 'emergencycontacts', 'statistics'
        ]], 404);
}

// ==================== USERS ====================
function handleUsers($conn, $method, $id) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT user_id, full_name, email, phone, gender, date_of_birth, designation, preferences FROM users WHERE user_id = ?");
                $stmt->execute([$id]);
                $user = $stmt->fetch();
                $user ? sendResponse($user) : sendResponse(['error' => 'User not found'], 404);
            } else {
                $stmt = $conn->query("SELECT user_id, full_name, email, phone, gender, date_of_birth, designation, preferences FROM users");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, phone, gender, date_of_birth, designation, preferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['full_name'], $data['email'], password_hash($data['password'], PASSWORD_DEFAULT),
                $data['phone'] ?? null, $data['gender'] ?? null, $data['date_of_birth'] ?? null,
                $data['designation'] ?? 'Patient/User', $data['preferences'] ?? null
            ]);
            sendResponse(['success' => true, 'user_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'User ID required'], 400);
            $data = getJsonInput();
            $fields = [];
            $values = [];
            foreach (['full_name', 'email', 'phone', 'gender', 'date_of_birth', 'designation', 'preferences'] as $field) {
                if (isset($data[$field])) {
                    $fields[] = "$field = ?";
                    $values[] = $data[$field];
                }
            }
            if (isset($data['password'])) {
                $fields[] = "password = ?";
                $values[] = password_hash($data['password'], PASSWORD_DEFAULT);
            }
            $values[] = $id;
            $stmt = $conn->prepare("UPDATE users SET " . implode(', ', $fields) . " WHERE user_id = ?");
            $stmt->execute($values);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'User ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== LOGIN ====================
function handleLogin($conn) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(['error' => 'POST method required'], 405);
    }
    $data = getJsonInput();
    if (!isset($data['email']) || !isset($data['password'])) {
        sendResponse(['error' => 'Email and password required'], 400);
    }
    $stmt = $conn->prepare("SELECT user_id, full_name, email, password, designation FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($data['password'], $user['password'])) {
        unset($user['password']);
        sendResponse(['success' => true, 'user' => $user]);
    } else {
        sendResponse(['error' => 'Invalid email or password'], 401);
    }
}


// ==================== DAILY LOGS ====================
function handleDailyLogs($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM dailylogs WHERE log_id = ?");
                $stmt->execute([$id]);
                $log = $stmt->fetch();
                $log ? sendResponse($log) : sendResponse(['error' => 'Log not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM dailylogs WHERE user_id = ? ORDER BY log_date DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM dailylogs ORDER BY log_date DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO dailylogs (user_id, mood_level, stress_level, anxiety_level, sleep_hours, notes, log_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['user_id'], $data['mood_level'], $data['stress_level'],
                $data['anxiety_level'] ?? null, $data['sleep_hours'], 
                $data['notes'] ?? null, $data['log_date'] ?? date('Y-m-d')
            ]);
            sendResponse(['success' => true, 'log_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Log ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE dailylogs SET mood_level = ?, stress_level = ?, anxiety_level = ?, sleep_hours = ?, notes = ? WHERE log_id = ?");
            $stmt->execute([$data['mood_level'], $data['stress_level'], $data['anxiety_level'] ?? null, $data['sleep_hours'], $data['notes'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Log ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM dailylogs WHERE log_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== COUNSELLORS ====================
function handleCounsellors($conn, $method, $id) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM counsellors WHERE counsellor_id = ?");
                $stmt->execute([$id]);
                $counsellor = $stmt->fetch();
                $counsellor ? sendResponse($counsellor) : sendResponse(['error' => 'Counsellor not found'], 404);
            } else {
                $stmt = $conn->query("SELECT * FROM counsellors");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO counsellors (name, email, phone, specialization, schedule) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$data['name'], $data['email'], $data['phone'] ?? null, $data['specialization'] ?? null, $data['schedule'] ?? null]);
            sendResponse(['success' => true, 'counsellor_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Counsellor ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE counsellors SET name = ?, email = ?, phone = ?, specialization = ?, schedule = ? WHERE counsellor_id = ?");
            $stmt->execute([$data['name'], $data['email'], $data['phone'] ?? null, $data['specialization'] ?? null, $data['schedule'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Counsellor ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM counsellors WHERE counsellor_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== SESSIONS ====================
function handleSessions($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT s.*, c.name as counsellor_name FROM sessions s LEFT JOIN counsellors c ON s.counsellor_id = c.counsellor_id WHERE s.session_id = ?");
                $stmt->execute([$id]);
                $session = $stmt->fetch();
                $session ? sendResponse($session) : sendResponse(['error' => 'Session not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT s.*, c.name as counsellor_name FROM sessions s LEFT JOIN counsellors c ON s.counsellor_id = c.counsellor_id WHERE s.user_id = ? ORDER BY s.session_time DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT s.*, c.name as counsellor_name FROM sessions s LEFT JOIN counsellors c ON s.counsellor_id = c.counsellor_id ORDER BY s.session_time DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO sessions (user_id, counsellor_id, session_time, session_notes, feedback) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['counsellor_id'], $data['session_time'], $data['session_notes'] ?? null, $data['feedback'] ?? null]);
            sendResponse(['success' => true, 'session_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Session ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE sessions SET counsellor_id = ?, session_time = ?, session_notes = ?, feedback = ? WHERE session_id = ?");
            $stmt->execute([$data['counsellor_id'], $data['session_time'], $data['session_notes'] ?? null, $data['feedback'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Session ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM sessions WHERE session_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== FEEDBACK ====================
function handleFeedback($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM feedback WHERE feedback_id = ?");
                $stmt->execute([$id]);
                $feedback = $stmt->fetch();
                $feedback ? sendResponse($feedback) : sendResponse(['error' => 'Feedback not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM feedback WHERE user_id = ? ORDER BY feedback_id DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM feedback ORDER BY feedback_id DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO feedback (session_id, user_id, rating, comments) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['session_id'], $data['user_id'], $data['rating'], $data['comments'] ?? null]);
            sendResponse(['success' => true, 'feedback_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Feedback ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE feedback SET rating = ?, comments = ? WHERE feedback_id = ?");
            $stmt->execute([$data['rating'], $data['comments'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Feedback ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM feedback WHERE feedback_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}


// ==================== PROGRESS ====================
function handleProgress($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM progress WHERE progress_id = ?");
                $stmt->execute([$id]);
                $progress = $stmt->fetch();
                $progress ? sendResponse($progress) : sendResponse(['error' => 'Progress not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM progress WHERE user_id = ? ORDER BY progress_id DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM progress ORDER BY progress_id DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO progress (user_id, emotional_stability_score, improvement_percentage, trend_notes) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['emotional_stability_score'], $data['improvement_percentage'] ?? null, $data['trend_notes'] ?? null]);
            sendResponse(['success' => true, 'progress_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Progress ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE progress SET emotional_stability_score = ?, improvement_percentage = ?, trend_notes = ? WHERE progress_id = ?");
            $stmt->execute([$data['emotional_stability_score'], $data['improvement_percentage'] ?? null, $data['trend_notes'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Progress ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM progress WHERE progress_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== RECOMMENDATIONS ====================
function handleRecommendations($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM recommendations WHERE rec_id = ?");
                $stmt->execute([$id]);
                $rec = $stmt->fetch();
                $rec ? sendResponse($rec) : sendResponse(['error' => 'Recommendation not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM recommendations WHERE user_id = ? ORDER BY rec_id DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM recommendations ORDER BY rec_id DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO recommendations (user_id, wellness_tip, activity) VALUES (?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['wellness_tip'], $data['activity'] ?? null]);
            sendResponse(['success' => true, 'rec_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Recommendation ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE recommendations SET wellness_tip = ?, activity = ? WHERE rec_id = ?");
            $stmt->execute([$data['wellness_tip'], $data['activity'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Recommendation ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM recommendations WHERE rec_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== AI ANALYSIS ====================
function handleAIAnalysis($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM ai_analysis WHERE analysis_id = ?");
                $stmt->execute([$id]);
                $analysis = $stmt->fetch();
                $analysis ? sendResponse($analysis) : sendResponse(['error' => 'Analysis not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM ai_analysis WHERE user_id = ? ORDER BY analysis_id DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM ai_analysis ORDER BY analysis_id DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO ai_analysis (user_id, risk_score, sentiment_value, emotion_label) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['risk_score'], $data['sentiment_value'] ?? null, $data['emotion_label'] ?? null]);
            sendResponse(['success' => true, 'analysis_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Analysis ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE ai_analysis SET risk_score = ?, sentiment_value = ?, emotion_label = ? WHERE analysis_id = ?");
            $stmt->execute([$data['risk_score'], $data['sentiment_value'] ?? null, $data['emotion_label'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Analysis ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM ai_analysis WHERE analysis_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== CRISIS ALERTS ====================
function handleCrisisAlerts($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT ca.*, c.name as counsellor_name FROM crisisalerts ca LEFT JOIN counsellors c ON ca.contacted_counsellor_id = c.counsellor_id WHERE ca.alert_id = ?");
                $stmt->execute([$id]);
                $alert = $stmt->fetch();
                $alert ? sendResponse($alert) : sendResponse(['error' => 'Alert not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT ca.*, c.name as counsellor_name FROM crisisalerts ca LEFT JOIN counsellors c ON ca.contacted_counsellor_id = c.counsellor_id WHERE ca.user_id = ? ORDER BY ca.alert_timestamp DESC");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT ca.*, c.name as counsellor_name FROM crisisalerts ca LEFT JOIN counsellors c ON ca.contacted_counsellor_id = c.counsellor_id ORDER BY ca.alert_timestamp DESC");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO crisisalerts (user_id, risk_level, alert_timestamp, contacted_counsellor_id) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['risk_level'], $data['alert_timestamp'] ?? date('Y-m-d H:i:s'), $data['contacted_counsellor_id'] ?? null]);
            sendResponse(['success' => true, 'alert_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Alert ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE crisisalerts SET risk_level = ?, contacted_counsellor_id = ? WHERE alert_id = ?");
            $stmt->execute([$data['risk_level'], $data['contacted_counsellor_id'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Alert ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM crisisalerts WHERE alert_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== EMERGENCY CONTACTS ====================
function handleEmergencyContacts($conn, $method, $id, $userId) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM emergencycontacts WHERE contact_id = ?");
                $stmt->execute([$id]);
                $contact = $stmt->fetch();
                $contact ? sendResponse($contact) : sendResponse(['error' => 'Contact not found'], 404);
            } elseif ($userId) {
                $stmt = $conn->prepare("SELECT * FROM emergencycontacts WHERE user_id = ?");
                $stmt->execute([$userId]);
                sendResponse($stmt->fetchAll());
            } else {
                $stmt = $conn->query("SELECT * FROM emergencycontacts");
                sendResponse($stmt->fetchAll());
            }
            break;
        case 'POST':
            $data = getJsonInput();
            $stmt = $conn->prepare("INSERT INTO emergencycontacts (user_id, contact_name, contact_phone, relation) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['user_id'], $data['contact_name'], $data['contact_phone'], $data['relation'] ?? null]);
            sendResponse(['success' => true, 'contact_id' => $conn->lastInsertId()], 201);
            break;
        case 'PUT':
            if (!$id) sendResponse(['error' => 'Contact ID required'], 400);
            $data = getJsonInput();
            $stmt = $conn->prepare("UPDATE emergencycontacts SET contact_name = ?, contact_phone = ?, relation = ? WHERE contact_id = ?");
            $stmt->execute([$data['contact_name'], $data['contact_phone'], $data['relation'] ?? null, $id]);
            sendResponse(['success' => true, 'updated' => $stmt->rowCount()]);
            break;
        case 'DELETE':
            if (!$id) sendResponse(['error' => 'Contact ID required'], 400);
            $stmt = $conn->prepare("DELETE FROM emergencycontacts WHERE contact_id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;
    }
}

// ==================== STATISTICS ====================
function handleStatistics($conn) {
    $stats = [];
    
    // Total users
    $stmt = $conn->query("SELECT COUNT(*) as total FROM users");
    $stats['totalUsers'] = $stmt->fetch()['total'];
    
    // Users by designation
    $stmt = $conn->query("SELECT designation, COUNT(*) as count FROM users GROUP BY designation");
    $stats['usersByDesignation'] = $stmt->fetchAll();
    
    // Total sessions
    $stmt = $conn->query("SELECT COUNT(*) as total FROM sessions");
    $stats['totalSessions'] = $stmt->fetch()['total'];
    
    // Average risk score from AI analysis
    $stmt = $conn->query("SELECT AVG(risk_score) as avg_risk FROM ai_analysis");
    $result = $stmt->fetch();
    $stats['avgRiskScore'] = round($result['avg_risk'] ?? 0, 1);
    
    // Crisis alerts count by risk level
    $stmt = $conn->query("SELECT risk_level, COUNT(*) as count FROM crisisalerts GROUP BY risk_level");
    $stats['crisisAlertsByLevel'] = $stmt->fetchAll();
    
    // High risk users (risk_score > 70)
    $stmt = $conn->query("SELECT COUNT(DISTINCT user_id) as count FROM ai_analysis WHERE risk_score > 70");
    $stats['highRiskUsers'] = $stmt->fetch()['count'];
    
    // Total counsellors
    $stmt = $conn->query("SELECT COUNT(*) as total FROM counsellors");
    $stats['totalCounsellors'] = $stmt->fetch()['total'];
    
    sendResponse($stats);
}
?>
