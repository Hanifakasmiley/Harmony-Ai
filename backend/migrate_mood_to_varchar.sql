-- Harmony AI - Migration: Change mood_level from INT to VARCHAR
-- This script converts mood_level from numeric (1-10) to text (Happy, Sad, Calm, Neutral, Anxious)

-- Step 1: Add new column with VARCHAR type
ALTER TABLE dailylogs ADD COLUMN mood_level_new VARCHAR(50);

-- Step 2: Convert existing numeric values to text
UPDATE dailylogs SET mood_level_new = CASE 
    WHEN mood_level <= 2 THEN 'Very Sad'
    WHEN mood_level <= 4 THEN 'Sad'
    WHEN mood_level <= 6 THEN 'Neutral'
    WHEN mood_level <= 8 THEN 'Happy'
    WHEN mood_level <= 10 THEN 'Very Happy'
    ELSE 'Neutral'
END WHERE mood_level IS NOT NULL;

-- Step 3: Drop old column
ALTER TABLE dailylogs DROP COLUMN mood_level;

-- Step 4: Rename new column to original name
ALTER TABLE dailylogs CHANGE COLUMN mood_level_new mood_level VARCHAR(50) DEFAULT 'Neutral';

-- Step 5: Add constraint to ensure valid values
ALTER TABLE dailylogs ADD CONSTRAINT check_mood_level CHECK (mood_level IN ('Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy', 'Calm', 'Anxious'));

-- Verify the change
SELECT * FROM dailylogs LIMIT 5;
