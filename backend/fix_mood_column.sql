-- Fix mood_level column to store text values like "Happy", "Sad", etc.
-- Run this SQL in phpMyAdmin

-- Step 1: Change the column type from INT to VARCHAR
ALTER TABLE dailylogs MODIFY COLUMN mood_level VARCHAR(50);

-- Step 2: Update existing numeric values to text (optional - maps old numbers to moods)
UPDATE dailylogs SET mood_level = 'Happy' WHERE mood_level = '9' OR mood_level = '10';
UPDATE dailylogs SET mood_level = 'Calm' WHERE mood_level = '7' OR mood_level = '8';
UPDATE dailylogs SET mood_level = 'Neutral' WHERE mood_level = '5' OR mood_level = '6';
UPDATE dailylogs SET mood_level = 'Anxious' WHERE mood_level = '3' OR mood_level = '4';
UPDATE dailylogs SET mood_level = 'Sad' WHERE mood_level = '1' OR mood_level = '2';
UPDATE dailylogs SET mood_level = 'Neutral' WHERE mood_level = '0';
