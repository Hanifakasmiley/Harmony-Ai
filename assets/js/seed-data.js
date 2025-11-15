// ===== SEED DATA FOR PATIENTS =====
// This script generates 20 random patient records with mental health data

const SEED_PATIENTS = [
    { patientId: 'P001', name: 'Sarah Johnson', age: 28, condition: 'Anxiety', email: 'sarah@example.com', phone: '+1-555-0101' },
    { patientId: 'P002', name: 'Michael Chen', age: 35, condition: 'Depression', email: 'michael@example.com', phone: '+1-555-0102' },
    { patientId: 'P003', name: 'Emma Rodriguez', age: 42, condition: 'Stress', email: 'emma@example.com', phone: '+1-555-0103' },
    { patientId: 'P004', name: 'James Wilson', age: 31, condition: 'Anxiety', email: 'james@example.com', phone: '+1-555-0104' },
    { patientId: 'P005', name: 'Lisa Anderson', age: 26, condition: 'Sleep Disorder', email: 'lisa@example.com', phone: '+1-555-0105' },
    { patientId: 'P006', name: 'David Martinez', age: 45, condition: 'Depression', email: 'david@example.com', phone: '+1-555-0106' },
    { patientId: 'P007', name: 'Jennifer Lee', age: 33, condition: 'Stress', email: 'jennifer@example.com', phone: '+1-555-0107' },
    { patientId: 'P008', name: 'Robert Taylor', age: 38, condition: 'Anxiety', email: 'robert@example.com', phone: '+1-555-0108' },
    { patientId: 'P009', name: 'Amanda White', age: 29, condition: 'Depression', email: 'amanda@example.com', phone: '+1-555-0109' },
    { patientId: 'P010', name: 'Christopher Brown', age: 40, condition: 'Sleep Disorder', email: 'chris@example.com', phone: '+1-555-0110' },
    { patientId: 'P011', name: 'Michelle Davis', age: 34, condition: 'Stress', email: 'michelle@example.com', phone: '+1-555-0111' },
    { patientId: 'P012', name: 'Kevin Johnson', age: 27, condition: 'Anxiety', email: 'kevin@example.com', phone: '+1-555-0112' },
    { patientId: 'P013', name: 'Rachel Green', age: 36, condition: 'Depression', email: 'rachel@example.com', phone: '+1-555-0113' },
    { patientId: 'P014', name: 'Daniel Thompson', age: 43, condition: 'Stress', email: 'daniel@example.com', phone: '+1-555-0114' },
    { patientId: 'P015', name: 'Nicole Harris', age: 30, condition: 'Sleep Disorder', email: 'nicole@example.com', phone: '+1-555-0115' },
    { patientId: 'P016', name: 'Brandon Clark', age: 39, condition: 'Anxiety', email: 'brandon@example.com', phone: '+1-555-0116' },
    { patientId: 'P017', name: 'Stephanie Lewis', age: 25, condition: 'Depression', email: 'stephanie@example.com', phone: '+1-555-0117' },
    { patientId: 'P018', name: 'Mark Walker', age: 44, condition: 'Stress', email: 'mark@example.com', phone: '+1-555-0118' },
    { patientId: 'P019', name: 'Karen Hall', age: 32, condition: 'Sleep Disorder', email: 'karen@example.com', phone: '+1-555-0119' },
    { patientId: 'P020', name: 'Steven Allen', age: 37, condition: 'Anxiety', email: 'steven@example.com', phone: '+1-555-0120' }
];

// Generate random mood data for each patient
function generatePatientMoodData() {
    const moodEntries = [];
    const moods = ['😊 Happy', '😐 Neutral', '😔 Sad', '😰 Anxious', '😤 Irritated', '😌 Calm'];
    const today = new Date();

    SEED_PATIENTS.forEach(patient => {
        // Generate 30 days of mood data
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            moodEntries.push({
                patientId: patient.patientId,
                date: date.toISOString().split('T')[0],
                mood: moods[Math.floor(Math.random() * moods.length)],
                stressLevel: Math.floor(Math.random() * 10) + 1, // 1-10
                sleepHours: Math.floor(Math.random() * 4) + 5, // 5-9 hours
                anxietyLevel: Math.floor(Math.random() * 10) + 1, // 1-10
                notes: generateRandomNote(),
                createdAt: new Date().toISOString()
            });
        }
    });

    return moodEntries;
}

// Generate random notes
function generateRandomNote() {
    const notes = [
        'Had a good day at work',
        'Feeling overwhelmed with tasks',
        'Good sleep, feeling refreshed',
        'Struggling with concentration',
        'Attended meditation session',
        'Took a walk in the park',
        'Had a productive meeting',
        'Feeling stressed about deadline',
        'Enjoyed time with friends',
        'Had therapy session today',
        'Exercised for 30 minutes',
        'Feeling better than yesterday',
        'Took medication as prescribed',
        'Practiced mindfulness',
        'Had difficulty sleeping'
    ];
    return notes[Math.floor(Math.random() * notes.length)];
}

// Initialize seed data in IndexedDB
async function initializeSeedData() {
    try {
        if (!window.DailyDB) {
            console.error('DailyDB not available');
            return;
        }

        await window.DailyDB.init();

        // Check if data already exists
        const existingLogs = await window.DailyDB.getAllLogs();
        if (existingLogs && existingLogs.length > 0) {
            console.log('Seed data already initialized');
            return;
        }

        // Generate and add mood data
        const moodData = generatePatientMoodData();
        console.log('Initializing seed data with', moodData.length, 'entries');

        for (const mood of moodData) {
            await window.DailyDB.addLog(mood);
        }

        console.log('Seed data initialization complete');
    } catch (error) {
        console.error('Error initializing seed data:', error);
    }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSeedData);
} else {
    initializeSeedData();
}
