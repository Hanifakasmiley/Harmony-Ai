-- Add anxiety_level column to dailylogs table
-- Run this SQL in phpMyAdmin or MySQL command line

ALTER TABLE dailylogs ADD COLUMN anxiety_level INT DEFAULT NULL AFTER stress_level;

-- Update existing records with a default value if needed
UPDATE dailylogs SET anxiety_level = stress_level WHERE anxiety_level IS NULL;
