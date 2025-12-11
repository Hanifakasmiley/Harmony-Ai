-- Harmony AI - Database Update Script
-- Run this in phpMyAdmin to update your existing users table

-- Add designation column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS designation VARCHAR(100) DEFAULT 'Patient/User';

-- Update existing users with sample designations (optional)
-- You can modify these based on your existing data

-- Sample: Update user with ID 1 to be a System Administrator
-- UPDATE users SET designation = 'System Administrator' WHERE user_id = 1;

-- Sample: Update user with ID 2 to be a Data Scientist
-- UPDATE users SET designation = 'Data Scientist' WHERE user_id = 2;

-- If you need to add test users with hashed passwords, use this:
-- Note: The password below is 'password123' hashed with PHP's password_hash()
-- You should generate your own hashes using PHP

-- INSERT INTO users (full_name, email, password, phone, gender, date_of_birth, designation, preferences) VALUES
-- ('Admin User', 'admin@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0001', 'Male', '1990-01-01', 'System Administrator', NULL),
-- ('Data Analyst', 'analyst@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0002', 'Female', '1992-05-15', 'Data Scientist', NULL),
-- ('Test Patient', 'patient@harmony.ai', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0003', 'Male', '1995-08-20', 'Patient/User', NULL);

-- View all users
SELECT user_id, full_name, email, designation FROM users;
