// ===== SIMPLE DUMMY DATA FOR ALL TABLES =====
// Returns static data without database operations

const DummyData = (function () {

    // Static users data
    const users = [
        { userId: 'P001', name: 'Sarah Johnson', age: 28, email: 'sarah@example.com', phone: '+1-555-0101', condition: 'Anxiety' },
        { userId: 'P002', name: 'Michael Chen', age: 35, email: 'michael@example.com', phone: '+1-555-0102', condition: 'Depression' },
        { userId: 'P003', name: 'Emma Rodriguez', age: 42, email: 'emma@example.com', phone: '+1-555-0103', condition: 'Stress' },
        { userId: 'P004', name: 'James Wilson', age: 31, email: 'james@example.com', phone: '+1-555-0104', condition: 'Anxiety' },
        { userId: 'P005', name: 'Lisa Anderson', age: 26, email: 'lisa@example.com', phone: '+1-555-0105', condition: 'Sleep Disorder' },
        { userId: 'P006', name: 'David Martinez', age: 45, email: 'david@example.com', phone: '+1-555-0106', condition: 'Depression' },
        { userId: 'P007', name: 'Jennifer Lee', age: 33, email: 'jennifer@example.com', phone: '+1-555-0107', condition: 'Stress' },
        { userId: 'P008', name: 'Robert Taylor', age: 38, email: 'robert@example.com', phone: '+1-555-0108', condition: 'Anxiety' },
        { userId: 'P009', name: 'Amanda White', age: 29, email: 'amanda@example.com', phone: '+1-555-0109', condition: 'Depression' },
        { userId: 'P010', name: 'Christopher Brown', age: 40, email: 'chris@example.com', phone: '+1-555-0110', condition: 'Sleep Disorder' },
        { userId: 'P011', name: 'Michelle Davis', age: 34, email: 'michelle@example.com', phone: '+1-555-0111', condition: 'Stress' },
        { userId: 'P012', name: 'Kevin Johnson', age: 27, email: 'kevin@example.com', phone: '+1-555-0112', condition: 'Anxiety' },
        { userId: 'P013', name: 'Rachel Green', age: 36, email: 'rachel@example.com', phone: '+1-555-0113', condition: 'Depression' },
        { userId: 'P014', name: 'Daniel Thompson', age: 43, email: 'daniel@example.com', phone: '+1-555-0114', condition: 'Stress' },
        { userId: 'P015', name: 'Nicole Harris', age: 30, email: 'nicole@example.com', phone: '+1-555-0115', condition: 'Sleep Disorder' },
        { userId: 'P016', name: 'Brandon Clark', age: 39, email: 'brandon@example.com', phone: '+1-555-0116', condition: 'Anxiety' },
        { userId: 'P017', name: 'Stephanie Lewis', age: 25, email: 'stephanie@example.com', phone: '+1-555-0117', condition: 'Depression' },
        { userId: 'P018', name: 'Mark Walker', age: 44, email: 'mark@example.com', phone: '+1-555-0118', condition: 'Stress' },
        { userId: 'P019', name: 'Karen Hall', age: 32, email: 'karen@example.com', phone: '+1-555-0119', condition: 'Sleep Disorder' },
        { userId: 'P020', name: 'Steven Allen', age: 37, email: 'steven@example.com', phone: '+1-555-0120', condition: 'Anxiety' }
    ];

    // Static counsellors data
    const counsellors = [
        { name: 'Dr. Emily Smith', specialization: 'Anxiety Disorders', experience: 12, phone: '+1-555-2001' },
        { name: 'Dr. James Johnson', specialization: 'Depression', experience: 15, phone: '+1-555-2002' },
        { name: 'Dr. Lisa Williams', specialization: 'Stress Management', experience: 10, phone: '+1-555-2003' },
        { name: 'Dr. Robert Brown', specialization: 'Sleep Disorders', experience: 8, phone: '+1-555-2004' },
        { name: 'Dr. Sarah Davis', specialization: 'Cognitive Therapy', experience: 14, phone: '+1-555-2005' }
    ];

    // Generate mood logs
    const moods = ['Happy', 'Sad', 'Anxious', 'Calm', 'Energetic', 'Tired', 'Neutral', 'Angry'];
    let logs = [];
    for (let i = 0; i < 100; i++) {
        const patient = users[i % 20];
        logs.push({
            patientId: patient.userId,
            date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            mood: moods[Math.floor(Math.random() * moods.length)],
            stressLevel: Math.floor(Math.random() * 10),
            anxietyLevel: Math.floor(Math.random() * 10),
            sleepHours: Math.floor(Math.random() * 12) + 3,
            createdAt: new Date().toISOString()
        });
    }

    // Generate sessions
    let sessions = [];
    for (let i = 0; i < 80; i++) {
        const patient = users[i % 20];
        const counsellor = counsellors[i % 5];
        sessions.push({
            userId: patient.userId,
            counsellorId: counsellor.name,
            sessionDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            duration: Math.floor(Math.random() * 60) + 30,
            notes: 'Session completed successfully',
            status: 'Completed'
        });
    }

    // Generate feedback
    let feedback = [];
    for (let i = 0; i < 60; i++) {
        const session = sessions[i % sessions.length];
        feedback.push({
            sessionId: i,
            userId: session.userId,
            rating: Math.floor(Math.random() * 5) + 1,
            feedback: 'Session was helpful and supportive',
            date: new Date().toISOString().split('T')[0]
        });
    }

    // Generate progress
    const categories = ['Anxiety', 'Mood', 'Sleep', 'Energy', 'Social'];
    let progress = [];
    for (let i = 0; i < 100; i++) {
        const patient = users[i % 20];
        progress.push({
            userId: patient.userId,
            category: categories[i % 5],
            score: Math.floor(Math.random() * 100),
            date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }

    // Generate recommendations
    const recTitles = ['Practice breathing exercises', 'Maintain sleep schedule', 'Daily meditation', 'Exercise routine', 'Social activities'];
    let recommendations = [];
    for (let i = 0; i < 60; i++) {
        const patient = users[i % 20];
        recommendations.push({
            userId: patient.userId,
            title: recTitles[i % 5],
            category: categories[i % 5],
            priority: ['High', 'Medium', 'Low'][i % 3],
            description: 'Personalized recommendation for better mental health'
        });
    }

    // Generate AI analysis
    let aiAnalysis = [];
    for (let i = 0; i < 20; i++) {
        const patient = users[i];
        const counsellor = counsellors[i % 5];
        aiAnalysis.push({
            userId: patient.userId,
            riskScore: Math.floor(Math.random() * 100),
            emotionClassification: moods[Math.floor(Math.random() * moods.length)],
            sentimentAnalysis: (Math.random() - 0.5).toFixed(2),
            recommendedCounsellor: counsellor.name,
            confidenceScore: Math.floor(Math.random() * 100) + 50,
            date: new Date().toISOString().split('T')[0]
        });
    }

    // Generate crisis alerts
    let crisisAlerts = [];
    for (let i = 0; i < 5; i++) {
        const patient = users[Math.floor(Math.random() * 20)];
        crisisAlerts.push({
            userId: patient.userId,
            severity: ['Low', 'Medium', 'High', 'Critical'][i % 4],
            description: 'Patient showing signs of distress during session',
            status: 'Under Monitoring',
            date: new Date().toISOString().split('T')[0]
        });
    }

    // Generate emergency contacts
    let emergencyContacts = [];
    for (let i = 0; i < 20; i++) {
        const patient = users[i];
        emergencyContacts.push({
            userId: patient.userId,
            name: 'Emergency Contact - ' + patient.name,
            phone: '+1-555-' + String(9000 + i).padStart(4, '0'),
            type: 'Family',
            relationship: 'Guardian'
        });
    }

    // Public methods
    return {
        getUsers: () => users,
        getCounsellors: () => counsellors,
        getLogs: () => logs,
        getSessions: () => sessions,
        getFeedback: () => feedback,
        getProgress: () => progress,
        getRecommendations: () => recommendations,
        getAIAnalysis: () => aiAnalysis,
        getCrisisAlerts: () => crisisAlerts,
        getEmergencyContacts: () => emergencyContacts
    };
})();
