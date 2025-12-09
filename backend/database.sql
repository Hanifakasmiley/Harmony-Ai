-- =============================================
-- Harmony AI Database Schema
-- Run this in phpMyAdmin to create the tables
-- =============================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS harmony_db;
USE harmony_db;

-- ===== USERS TABLE =====
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== PATIENTS TABLE =====
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    email VARCHAR(100),
    phone VARCHAR(20),
    condition_type VARCHAR(100),
    severity ENUM('Mild', 'Moderate', 'High', 'Critical'),
    counselor VARCHAR(100),
    emergency_contact VARCHAR(200),
    risk_score INT DEFAULT 0,
    status VARCHAR(50),
    last_assessment DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== COUNSELORS TABLE =====
CREATE TABLE IF NOT EXISTS counselors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    experience INT,
    phone VARCHAR(20),
    email VARCHAR(100),
    availability VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== MOOD LOGS TABLE =====
CREATE TABLE IF NOT EXISTS mood_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    log_date DATE NOT NULL,
    mood VARCHAR(50),
    stress_level INT CHECK (stress_level BETWEEN 1 AND 10),
    anxiety_level INT CHECK (anxiety_level BETWEEN 1 AND 10),
    sleep_hours DECIMAL(3,1),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- ===== SESSIONS TABLE =====
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    counselor_id INT,
    session_date DATE NOT NULL,
    session_time TIME,
    duration INT DEFAULT 60,
    session_type VARCHAR(50),
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    notes TEXT,
    outcome VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (counselor_id) REFERENCES counselors(id) ON DELETE SET NULL
);

-- ===== AI ANALYSIS TABLE =====
CREATE TABLE IF NOT EXISTS ai_analysis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    analysis_date DATE NOT NULL,
    risk_score INT,
    sentiment_score DECIMAL(5,2),
    dominant_emotion VARCHAR(50),
    emotional_trend ENUM('Improving', 'Declining', 'Stable'),
    keyword_flags TEXT,
    ai_recommendation TEXT,
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- ===== RECOMMENDATIONS TABLE =====
CREATE TABLE IF NOT EXISTS recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    activity VARCHAR(200),
    category ENUM('Mindfulness', 'Exercise', 'Social', 'Sleep', 'Nutrition'),
    frequency VARCHAR(50),
    duration VARCHAR(50),
    status ENUM('Active', 'Completed', 'Paused') DEFAULT 'Active',
    adherence INT DEFAULT 0,
    created_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- ===== CRISIS ALERTS TABLE =====
CREATE TABLE IF NOT EXISTS crisis_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    severity ENUM('High', 'Critical') NOT NULL,
    trigger_keywords TEXT,
    status ENUM('Active', 'Resolved', 'Escalated') DEFAULT 'Active',
    assigned_counselor VARCHAR(100),
    action_taken TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- ===== EMERGENCY CONTACTS TABLE =====
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    service VARCHAR(100),
    number VARCHAR(100),
    available VARCHAR(50)
);

-- ===== PROGRESS TABLE =====
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    progress_date DATE,
    emotional_stability INT,
    functioning_level INT,
    coping_skills INT,
    social_engagement INT,
    improvement_percentage INT,
    notes TEXT,
    session_count INT,
    goal_progress INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- ===== FEEDBACK TABLE =====
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    patient_id INT,
    counselor_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    improvement_areas TEXT,
    strong_points TEXT,
    next_steps TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (counselor_id) REFERENCES counselors(id) ON DELETE SET NULL
);

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert sample counselors
INSERT INTO counselors (name, specialization, experience, phone, availability) VALUES
('Dr. Emily Smith', 'Anxiety Disorders', 12, '+1-555-2001', 'Mon-Fri'),
('Dr. James Johnson', 'Depression', 15, '+1-555-2002', 'Tue-Sat'),
('Dr. Lisa Williams', 'Stress Management', 10, '+1-555-2003', 'Mon-Thu'),
('Dr. Robert Brown', 'Sleep Disorders', 8, '+1-555-2004', 'Wed-Sat'),
('Dr. Sarah Davis', 'Cognitive Therapy', 14, '+1-555-2005', 'Mon-Fri');

-- Insert emergency contacts
INSERT INTO emergency_contacts (country, service, number, available) VALUES
('🇺🇸 USA', 'National Suicide Prevention Lifeline', '988', '24/7'),
('🇺🇸 USA', 'Crisis Text Line', 'Text HOME to 741741', '24/7'),
('🇬🇧 UK', 'Samaritans', '116 123', '24/7'),
('🇬🇧 UK', 'Mind Infoline', '0300 123 3393', 'Mon-Fri 9-6'),
('🇧🇩 Bangladesh', 'Kaan Pete Roi', '01779-554391', '6 PM - 10 PM'),
('🇧🇩 Bangladesh', 'NIMH Helpline', '16789', '24/7'),
('🌍 International', 'Befrienders Worldwide', 'befrienders.org', 'Visit Website');

-- Insert sample user (password: admin123)
INSERT INTO users (name, email, password, designation) VALUES
('Admin User', 'admin@harmonyai.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'system_admin');

-- Insert sample patients
INSERT INTO patients (name, age, gender, email, phone, condition_type, severity, counselor, emergency_contact, risk_score, status) VALUES
('Sarah Johnson', 28, 'Female', 'sarah.j@email.com', '+1-555-0101', 'Anxiety Disorder', 'High', 'Dr. Emily Smith', 'John Johnson +1-555-9001', 75, 'High Risk'),
('Michael Chen', 35, 'Male', 'michael.c@email.com', '+1-555-0102', 'Depression', 'Moderate', 'Dr. James Johnson', 'Linda Chen +1-555-9002', 52, 'Moderate'),
('Emma Rodriguez', 42, 'Female', 'emma.r@email.com', '+1-555-0103', 'Stress-Related', 'Moderate', 'Dr. Lisa Williams', 'Carlos Rodriguez +1-555-9003', 48, 'Moderate'),
('James Wilson', 31, 'Male', 'james.w@email.com', '+1-555-0104', 'Anxiety Disorder', 'Mild', 'Dr. Emily Smith', 'Mary Wilson +1-555-9004', 35, 'Low Risk'),
('Lisa Anderson', 26, 'Female', 'lisa.a@email.com', '+1-555-0105', 'Sleep Disorder', 'High', 'Dr. Robert Brown', 'Thomas Anderson +1-555-9005', 68, 'High Risk');

SELECT 'Database setup complete!' as message;
