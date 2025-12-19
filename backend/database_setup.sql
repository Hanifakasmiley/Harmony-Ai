-- Harmony AI - Database Setup Script
-- Run this in phpMyAdmin or MySQL command line to create all required tables

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS harmony_db;
USE harmony_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(20),
    date_of_birth DATE,
    designation VARCHAR(100) DEFAULT 'Patient/User',
    preferences TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily logs table
CREATE TABLE IF NOT EXISTS dailylogs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mood_level INT NOT NULL CHECK (mood_level BETWEEN 1 AND 10),
    stress_level INT NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
    anxiety_level INT CHECK (anxiety_level BETWEEN 1 AND 10),
    sleep_hours DECIMAL(3,1),
    notes TEXT,
    log_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Counsellors table
CREATE TABLE IF NOT EXISTS counsellors (
    counsellor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(100),
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    counsellor_id INT,
    session_date DATETIME NOT NULL,
    session_type VARCHAR(50) DEFAULT 'consultation',
    status VARCHAR(20) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (counsellor_id) REFERENCES counsellors(counsellor_id) ON DELETE SET NULL
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    feedback_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE SET NULL
);

-- Progress table
CREATE TABLE IF NOT EXISTS progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    progress_date DATE DEFAULT CURRENT_DATE,
    overall_score DECIMAL(5,2),
    mood_trend VARCHAR(20),
    stress_trend VARCHAR(20),
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recommendation_text TEXT NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- AI Analysis table
CREATE TABLE IF NOT EXISTS ai_analysis (
    analysis_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    log_id INT,
    sentiment_score DECIMAL(3,2),
    emotion_detected VARCHAR(50),
    risk_level VARCHAR(20),
    analysis_text TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (log_id) REFERENCES dailylogs(log_id) ON DELETE SET NULL
);

-- Insert sample data for testing
-- Sample users with hashed passwords (password is 'password123')
INSERT IGNORE INTO users (full_name, email, password, phone, gender, date_of_birth, designation) VALUES
('Admin User', 'admin@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0001', 'Male', '1990-01-01', 'System Administrator'),
('Data Analyst', 'analyst@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0002', 'Female', '1992-05-15', 'Data Scientist'),
('Test Patient', 'patient@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0003', 'Male', '1995-08-20', 'Patient/User'),
('Software Engineer', 'engineer@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0004', 'Female', '1988-03-10', 'Software Engineer'),
('Mental Health Admin', 'mhadmin@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0005', 'Male', '1985-07-22', 'Mental Health Administrator'),
('Emergency Team', 'emergency@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0006', 'Female', '1991-11-05', 'Emergency Contact Team');

-- Sample counsellor
INSERT IGNORE INTO counsellors (full_name, email, specialization, availability) VALUES
('Dr. Sarah Johnson', 'sarah.johnson@harmony.ai', 'Clinical Psychology', 'Mon-Fri 9AM-5PM');

-- Sample daily log
INSERT IGNORE INTO dailylogs (user_id, mood_level, stress_level, anxiety_level, sleep_hours, notes) VALUES
(3, 7, 4, 3, 8.5, 'Feeling good today, had a productive day at work.');

-- Sample recommendation
INSERT IGNORE INTO recommendations (user_id, recommendation_text, category, priority) VALUES
(3, 'Consider incorporating mindfulness exercises into your daily routine.', 'Wellness', 'medium');

SELECT 'Database setup completed successfully!' AS status;