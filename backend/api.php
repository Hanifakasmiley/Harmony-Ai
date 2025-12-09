<?php
/**
 * Harmony AI - REST API
 * Handles all database operations
 */

require_once 'config.php';
setCorsHeaders();

// Get the request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

// Route the request
switch ($request) {
    case 'patients':
        handlePatients($method);
        break;
    case 'mood-logs':
        handleMoodLogs($method);
        break;
    case 'sessions':
        handleSessions($method);
        break;
    case 'counselors':
        handleCounselors($method);
        break;
    case 'ai-analysis':
        handleAIAnalysis($method);
        break;
    case 'recommendations':
        handleRecommendations($method);
        break;
    case 'crisis-alerts':
        handleCrisisAlerts($method);
        break;
    case 'emergency-contacts':
        handleEmergencyContacts($method);
        break;
    case 'statistics':
        handleStatistics($method);
        break;
    case 'login':
        handleLogin($method);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

// ===== PATIENTS =====
function handlePatients($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM patients WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $conn->query("SELECT * FROM patients ORDER BY id");
                echo json_encode($stmt->fetchAll());
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO patients (name, age, gender, email, phone, condition_type, severity, counselor, emergency_contact, risk_score, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['name'], $data['age'], $data['gender'], $data['email'],
                $data['phone'], $data['condition'], $data['severity'], $data['counselor'],
                $data['emergencyContact'], $data['riskScore'], $data['status']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("UPDATE patients SET name=?, age=?, gender=?, email=?, phone=?, condition_type=?, severity=?, counselor=?, emergency_contact=?, risk_score=?, status=? WHERE id=?");
            $stmt->execute([
                $data['name'], $data['age'], $data['gender'], $data['email'],
                $data['phone'], $data['condition'], $data['severity'], $data['counselor'],
                $data['emergencyContact'], $data['riskScore'], $data['status'], $data['id']
            ]);
            echo json_encode(['success' => true]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'];
            $stmt = $conn->prepare("DELETE FROM patients WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
    }
}

// ===== MOOD LOGS =====
function handleMoodLogs($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $patientId = isset($_GET['patient_id']) ? $_GET['patient_id'] : null;
            if ($patientId) {
                $stmt = $conn->prepare("SELECT * FROM mood_logs WHERE patient_id = ? ORDER BY log_date DESC LIMIT 30");
                $stmt->execute([$patientId]);
            } else {
                $stmt = $conn->query("SELECT * FROM mood_logs ORDER BY log_date DESC LIMIT 100");
            }
            echo json_encode($stmt->fetchAll());
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO mood_logs (patient_id, log_date, mood, stress_level, anxiety_level, sleep_hours, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['patientId'], $data['date'], $data['mood'],
                $data['stressLevel'], $data['anxietyLevel'], $data['sleepHours'], $data['notes']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
    }
}

// ===== SESSIONS =====
function handleSessions($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $patientId = isset($_GET['patient_id']) ? $_GET['patient_id'] : null;
            if ($patientId) {
                $stmt = $conn->prepare("SELECT s.*, c.name as counselor_name FROM sessions s LEFT JOIN counselors c ON s.counselor_id = c.id WHERE s.patient_id = ? ORDER BY s.session_date DESC");
                $stmt->execute([$patientId]);
            } else {
                $stmt = $conn->query("SELECT s.*, c.name as counselor_name FROM sessions s LEFT JOIN counselors c ON s.counselor_id = c.id ORDER BY s.session_date DESC LIMIT 50");
            }
            echo json_encode($stmt->fetchAll());
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO sessions (patient_id, counselor_id, session_date, session_time, duration, session_type, status, notes, outcome) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['patientId'], $data['counselorId'], $data['date'], $data['time'],
                $data['duration'], $data['type'], $data['status'], $data['notes'], $data['outcome']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("UPDATE sessions SET status=?, outcome=?, notes=? WHERE id=?");
            $stmt->execute([$data['status'], $data['outcome'], $data['notes'], $data['id']]);
            echo json_encode(['success' => true]);
            break;
    }
}

// ===== COUNSELORS =====
function handleCounselors($method) {
    $conn = getConnection();
    
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM counselors ORDER BY name");
        echo json_encode($stmt->fetchAll());
    }
}

// ===== AI ANALYSIS =====
function handleAIAnalysis($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $patientId = isset($_GET['patient_id']) ? $_GET['patient_id'] : null;
            if ($patientId) {
                $stmt = $conn->prepare("SELECT * FROM ai_analysis WHERE patient_id = ? ORDER BY analysis_date DESC LIMIT 12");
                $stmt->execute([$patientId]);
            } else {
                $stmt = $conn->query("SELECT * FROM ai_analysis ORDER BY analysis_date DESC LIMIT 50");
            }
            echo json_encode($stmt->fetchAll());
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO ai_analysis (patient_id, analysis_date, risk_score, sentiment_score, dominant_emotion, emotional_trend, ai_recommendation, confidence_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['patientId'], $data['date'], $data['riskScore'], $data['sentimentScore'],
                $data['dominantEmotion'], $data['emotionalTrend'], $data['aiRecommendation'], $data['confidenceScore']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
    }
}

// ===== RECOMMENDATIONS =====
function handleRecommendations($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $patientId = isset($_GET['patient_id']) ? $_GET['patient_id'] : null;
            if ($patientId) {
                $stmt = $conn->prepare("SELECT * FROM recommendations WHERE patient_id = ? ORDER BY created_date DESC");
                $stmt->execute([$patientId]);
            } else {
                $stmt = $conn->query("SELECT * FROM recommendations ORDER BY created_date DESC LIMIT 50");
            }
            echo json_encode($stmt->fetchAll());
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO recommendations (patient_id, activity, category, frequency, duration, status, adherence) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['patientId'], $data['activity'], $data['category'],
                $data['frequency'], $data['duration'], $data['status'], $data['adherence']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
    }
}

// ===== CRISIS ALERTS =====
function handleCrisisAlerts($method) {
    $conn = getConnection();
    
    switch ($method) {
        case 'GET':
            $stmt = $conn->query("SELECT ca.*, p.name as patient_name FROM crisis_alerts ca LEFT JOIN patients p ON ca.patient_id = p.id WHERE ca.status = 'Active' ORDER BY ca.created_at DESC");
            echo json_encode($stmt->fetchAll());
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO crisis_alerts (patient_id, severity, trigger_keywords, status, action_taken, notes) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['patientId'], $data['severity'], $data['triggerKeywords'],
                $data['status'], $data['actionTaken'], $data['notes']
            ]);
            echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("UPDATE crisis_alerts SET status=?, action_taken=? WHERE id=?");
            $stmt->execute([$data['status'], $data['actionTaken'], $data['id']]);
            echo json_encode(['success' => true]);
            break;
    }
}

// ===== EMERGENCY CONTACTS =====
function handleEmergencyContacts($method) {
    $conn = getConnection();
    
    if ($method === 'GET') {
        $stmt = $conn->query("SELECT * FROM emergency_contacts ORDER BY country");
        echo json_encode($stmt->fetchAll());
    }
}

// ===== STATISTICS =====
function handleStatistics($method) {
    $conn = getConnection();
    
    if ($method === 'GET') {
        $stats = [];
        
        // Total patients
        $stmt = $conn->query("SELECT COUNT(*) as total FROM patients");
        $stats['totalPatients'] = $stmt->fetch()['total'];
        
        // Risk counts
        $stmt = $conn->query("SELECT COUNT(*) as count FROM patients WHERE risk_score > 75");
        $stats['criticalCount'] = $stmt->fetch()['count'];
        
        $stmt = $conn->query("SELECT COUNT(*) as count FROM patients WHERE risk_score >= 60 AND risk_score <= 75");
        $stats['highRiskCount'] = $stmt->fetch()['count'];
        
        $stmt = $conn->query("SELECT COUNT(*) as count FROM patients WHERE risk_score >= 40 AND risk_score < 60");
        $stats['moderateCount'] = $stmt->fetch()['count'];
        
        $stmt = $conn->query("SELECT COUNT(*) as count FROM patients WHERE risk_score < 40");
        $stats['lowRiskCount'] = $stmt->fetch()['count'];
        
        // Average risk score
        $stmt = $conn->query("SELECT AVG(risk_score) as avg FROM patients");
        $stats['avgRiskScore'] = round($stmt->fetch()['avg'], 1);
        
        // Session completion rate
        $stmt = $conn->query("SELECT COUNT(*) as completed FROM sessions WHERE status = 'Completed'");
        $completed = $stmt->fetch()['completed'];
        $stmt = $conn->query("SELECT COUNT(*) as total FROM sessions");
        $total = $stmt->fetch()['total'];
        $stats['sessionCompletionRate'] = $total > 0 ? round(($completed / $total) * 100) : 0;
        
        // Percentages
        if ($stats['totalPatients'] > 0) {
            $stats['criticalPercentage'] = round(($stats['criticalCount'] / $stats['totalPatients']) * 100, 1);
            $stats['highRiskPercentage'] = round(($stats['highRiskCount'] / $stats['totalPatients']) * 100, 1);
        }
        
        $stats['recommendationAdherence'] = 72; // This would need a more complex query
        $stats['moodAvgScore'] = 5.5;
        
        echo json_encode($stats);
    }
}

// ===== LOGIN =====
function handleLogin($method) {
    $conn = getConnection();
    
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($data['password'], $user['password'])) {
            unset($user['password']); // Don't send password back
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid email or password']);
        }
    }
}
?>
