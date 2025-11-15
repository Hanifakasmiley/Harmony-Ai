// ===== COMPREHENSIVE SEED DATA FOR ALL 10 DATABASE TABLES =====
// Generates 20 patient records across all databases with built-in dummy data

const ComprehensiveSeedData = (function () {

    // Built-in dummy data for all tables (no async wait needed)
    const DUMMY_DATA = {
        users: [
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
        ],
        counsellors: [
            { name: 'Dr. Emily Smith', specialization: 'Anxiety Disorders', experience: 12, phone: '+1-555-2001', schedule: 'Mon-Fri 9AM-5PM' },
            { name: 'Dr. James Johnson', specialization: 'Depression', experience: 15, phone: '+1-555-2002', schedule: 'Mon-Wed 2PM-6PM' },
            { name: 'Dr. Lisa Williams', specialization: 'Stress Management', experience: 10, phone: '+1-555-2003', schedule: 'Tue-Thu 10AM-4PM' },
            { name: 'Dr. Robert Brown', specialization: 'Sleep Disorders', experience: 8, phone: '+1-555-2004', schedule: 'Wed-Fri 1PM-5PM' },
            { name: 'Dr. Sarah Davis', specialization: 'Cognitive Therapy', experience: 14, phone: '+1-555-2005', schedule: 'Mon-Sat 10AM-8PM' }
        ],
        logs: [],
        sessions: [],
        feedback: [],
        progress: [],
        recommendations: [],
        aiAnalysis: [],
        crisisAlerts: [],
        emergencyContacts: []
    };

    // Generate dummy logs, sessions, etc.
    function generateDummyData() {
        const moods = ['Happy', 'Sad', 'Anxious', 'Calm', 'Energetic', 'Tired', 'Neutral', 'Angry'];

        // Generate 100 mood logs
        for (let i = 0; i < 100; i++) {
            const patient = DUMMY_DATA.users[Math.floor(Math.random() * DUMMY_DATA.users.length)];
            DUMMY_DATA.logs.push({
                patientId: patient.userId,
                date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                mood: moods[Math.floor(Math.random() * moods.length)],
                stressLevel: Math.floor(Math.random() * 10),
                anxietyLevel: Math.floor(Math.random() * 10),
                sleepHours: Math.floor(Math.random() * 12) + 3,
                createdAt: new Date().toISOString()
            });
        }

        // Generate 80+ sessions
        for (let i = 0; i < 80; i++) {
            const patient = DUMMY_DATA.users[Math.floor(Math.random() * DUMMY_DATA.users.length)];
            const counsellor = DUMMY_DATA.counsellors[Math.floor(Math.random() * DUMMY_DATA.counsellors.length)];
            DUMMY_DATA.sessions.push({
                userId: patient.userId,
                counsellorId: counsellor.name,
                sessionDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                duration: Math.floor(Math.random() * 60) + 30,
                notes: 'Session completed successfully',
                status: 'Completed'
            });
        }

        // Generate 60 feedback records
        for (let i = 0; i < 60; i++) {
            const session = DUMMY_DATA.sessions[Math.floor(Math.random() * DUMMY_DATA.sessions.length)];
            DUMMY_DATA.feedback.push({
                sessionId: i,
                userId: session.userId,
                rating: Math.floor(Math.random() * 5) + 1,
                feedback: 'Session was helpful and supportive',
                date: new Date().toISOString().split('T')[0]
            });
        }

        // Generate 100 progress records
        const categories = ['Anxiety', 'Mood', 'Sleep', 'Energy', 'Social'];
        for (let i = 0; i < 100; i++) {
            const patient = DUMMY_DATA.users[Math.floor(Math.random() * DUMMY_DATA.users.length)];
            DUMMY_DATA.progress.push({
                userId: patient.userId,
                category: categories[Math.floor(Math.random() * categories.length)],
                score: Math.floor(Math.random() * 100),
                date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });
        }

        // Generate 60 recommendations
        const recTitles = ['Practice breathing exercises', 'Maintain sleep schedule', 'Daily meditation', 'Exercise routine', 'Social activities'];
        for (let i = 0; i < 60; i++) {
            const patient = DUMMY_DATA.users[Math.floor(Math.random() * DUMMY_DATA.users.length)];
            DUMMY_DATA.recommendations.push({
                userId: patient.userId,
                title: recTitles[Math.floor(Math.random() * recTitles.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
                description: 'Personalized recommendation for better mental health'
            });
        }

        // Generate 20 AI analysis records
        for (let i = 0; i < 20; i++) {
            const patient = DUMMY_DATA.users[i];
            const counsellor = DUMMY_DATA.counsellors[Math.floor(Math.random() * DUMMY_DATA.counsellors.length)];
            DUMMY_DATA.aiAnalysis.push({
                userId: patient.userId,
                riskScore: Math.floor(Math.random() * 100),
                emotionClassification: moods[Math.floor(Math.random() * moods.length)],
                sentimentAnalysis: (Math.random() - 0.5).toFixed(2),
                recommendedCounsellor: counsellor.name,
                confidenceScore: Math.floor(Math.random() * 100) + 50,
                date: new Date().toISOString().split('T')[0]
            });
        }

        // Generate 5 crisis alerts
        for (let i = 0; i < 5; i++) {
            const patient = DUMMY_DATA.users[Math.floor(Math.random() * DUMMY_DATA.users.length)];
            DUMMY_DATA.crisisAlerts.push({
                userId: patient.userId,
                severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
                description: 'Patient showing signs of distress during session',
                status: 'Under Monitoring',
                date: new Date().toISOString().split('T')[0]
            });
        }

        // Generate 20 emergency contacts
        for (let i = 0; i < 20; i++) {
            const patient = DUMMY_DATA.users[i];
            DUMMY_DATA.emergencyContacts.push({
                userId: patient.userId,
                name: 'Emergency Contact - ' + patient.name,
                phone: '+1-555-' + String(9000 + i).padStart(4, '0'),
                type: 'Family',
                relationship: 'Guardian'
            });
        }
    }

    // 20 Patient Base Data
    const SEED_PATIENTS = [
        { patientId: 'P001', name: 'Sarah Johnson', age: 28, email: 'sarah@example.com', phone: '+1-555-0101', condition: 'Anxiety' },
        { patientId: 'P002', name: 'Michael Chen', age: 35, email: 'michael@example.com', phone: '+1-555-0102', condition: 'Depression' },
        { patientId: 'P003', name: 'Emma Rodriguez', age: 42, email: 'emma@example.com', phone: '+1-555-0103', condition: 'Stress' },
        { patientId: 'P004', name: 'James Wilson', age: 31, email: 'james@example.com', phone: '+1-555-0104', condition: 'Anxiety' },
        { patientId: 'P005', name: 'Lisa Anderson', age: 26, email: 'lisa@example.com', phone: '+1-555-0105', condition: 'Sleep Disorder' },
        { patientId: 'P006', name: 'David Martinez', age: 45, email: 'david@example.com', phone: '+1-555-0106', condition: 'Depression' },
        { patientId: 'P007', name: 'Jennifer Lee', age: 33, email: 'jennifer@example.com', phone: '+1-555-0107', condition: 'Stress' },
        { patientId: 'P008', name: 'Robert Taylor', age: 38, email: 'robert@example.com', phone: '+1-555-0108', condition: 'Anxiety' },
        { patientId: 'P009', name: 'Amanda White', age: 29, email: 'amanda@example.com', phone: '+1-555-0109', condition: 'Depression' },
        { patientId: 'P010', name: 'Christopher Brown', age: 40, email: 'chris@example.com', phone: '+1-555-0110', condition: 'Sleep Disorder' },
        { patientId: 'P011', name: 'Michelle Davis', age: 34, email: 'michelle@example.com', phone: '+1-555-0111', condition: 'Stress' },
        { patientId: 'P012', name: 'Kevin Johnson', age: 27, email: 'kevin@example.com', phone: '+1-555-0112', condition: 'Anxiety' },
        { patientId: 'P013', name: 'Rachel Green', age: 36, email: 'rachel@example.com', phone: '+1-555-0113', condition: 'Depression' },
        { patientId: 'P014', name: 'Daniel Thompson', age: 43, email: 'daniel@example.com', phone: '+1-555-0114', condition: 'Stress' },
        { patientId: 'P015', name: 'Nicole Harris', age: 30, email: 'nicole@example.com', phone: '+1-555-0115', condition: 'Sleep Disorder' },
        { patientId: 'P016', name: 'Brandon Clark', age: 39, email: 'brandon@example.com', phone: '+1-555-0116', condition: 'Anxiety' },
        { patientId: 'P017', name: 'Stephanie Lewis', age: 25, email: 'stephanie@example.com', phone: '+1-555-0117', condition: 'Depression' },
        { patientId: 'P018', name: 'Mark Walker', age: 44, email: 'mark@example.com', phone: '+1-555-0118', condition: 'Stress' },
        { patientId: 'P019', name: 'Karen Hall', age: 32, email: 'karen@example.com', phone: '+1-555-0119', condition: 'Sleep Disorder' },
        { patientId: 'P020', name: 'Steven Allen', age: 37, email: 'steven@example.com', phone: '+1-555-0120', condition: 'Anxiety' }
    ];

    // Counsellor Data
    const COUNSELLORS = [
        { counsellorId: 'C001', name: 'Dr. Emily Smith', specialization: 'Anxiety Disorders', experience: 12, phone: '+1-555-2001' },
        { counsellorId: 'C002', name: 'Dr. James Johnson', specialization: 'Depression', experience: 15, phone: '+1-555-2002' },
        { counsellorId: 'C003', name: 'Dr. Lisa Williams', specialization: 'Stress Management', experience: 10, phone: '+1-555-2003' },
        { counsellorId: 'C004', name: 'Dr. Robert Brown', specialization: 'Sleep Disorders', experience: 8, phone: '+1-555-2004' },
        { counsellorId: 'C005', name: 'Dr. Sarah Davis', specialization: 'Cognitive Therapy', experience: 14, phone: '+1-555-2005' }
    ];

    // Generate all seed data
    async function initializeAllSeedData() {
        try {
            if (!window.DailyDB) {
                console.error('DailyDB not available');
                return;
            }

            await window.DailyDB.init();

            // ===== 1. USERS TABLE =====
            const existingUsers = await window.DailyDB.getAllUsers();
            if (!existingUsers || existingUsers.length === 0) {
                console.log('Seeding Users table...');
                for (const patient of SEED_PATIENTS) {
                    await window.DailyDB.addUser({
                        userId: patient.patientId,
                        name: patient.name,
                        age: patient.age,
                        email: patient.email,
                        phone: patient.phone,
                        condition: patient.condition,
                        preferences: 'Email notifications enabled',
                        emergencyContact: `${patient.name}'s Guardian`,
                        registrationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                    });
                }
                console.log(`✅ Seeded ${SEED_PATIENTS.length} users`);
            }

            // ===== 2. COUNSELLORS TABLE =====
            const existingCounsellors = await window.DailyDB.getAllCounsellors();
            if (!existingCounsellors || existingCounsellors.length === 0) {
                console.log('Seeding Counsellors table...');
                for (const counsellor of COUNSELLORS) {
                    await window.DailyDB.addCounsellor({
                        counsellorId: counsellor.counsellorId,
                        name: counsellor.name,
                        specialization: counsellor.specialization,
                        experience: counsellor.experience,
                        phone: counsellor.phone,
                        availability: ['Mon-Fri 9AM-5PM', 'Mon-Wed 2PM-6PM', 'Tue-Thu 10AM-4PM', 'Wed-Fri 1PM-5PM', 'Mon-Sat 10AM-8PM'][Math.floor(Math.random() * 5)],
                        rating: (4 + Math.random()).toFixed(1)
                    });
                }
                console.log(`✅ Seeded ${COUNSELLORS.length} counsellors`);
            }

            // ===== 3. SESSIONS TABLE =====
            const existingSessions = await window.DailyDB.getAllSessions();
            if (!existingSessions || existingSessions.length === 0) {
                console.log('Seeding Sessions table...');
                let sessionCount = 0;
                for (const patient of SEED_PATIENTS) {
                    const numSessions = Math.floor(5 + Math.random() * 10); // 5-15 sessions per patient
                    for (let i = 0; i < numSessions; i++) {
                        const counsellor = COUNSELLORS[Math.floor(Math.random() * COUNSELLORS.length)];
                        const sessionDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);

                        await window.DailyDB.addSession({
                            userId: patient.patientId,
                            counsellorId: counsellor.counsellorId,
                            sessionDate: sessionDate.toISOString().split('T')[0],
                            sessionTime: `${9 + Math.floor(Math.random() * 8)}:${Math.random() > 0.5 ? '00' : '30'}`,
                            duration: 60,
                            notes: ['Patient showed improvement in anxiety', 'Discussed coping strategies', 'Progress on cognitive therapy', 'Patient seems stable', 'Discussed medication adjustment'][Math.floor(Math.random() * 5)],
                            status: 'Completed'
                        });
                        sessionCount++;
                    }
                }
                console.log(`✅ Seeded ${sessionCount} sessions`);
            }

            // ===== 4. FEEDBACK TABLE =====
            const existingFeedback = await window.DailyDB.getAllFeedback?.call(window.DailyDB);
            if (!existingFeedback || existingFeedback.length === 0) {
                console.log('Seeding Feedback table...');
                let feedbackCount = 0;
                const sessions = await window.DailyDB.getAllSessions();
                for (const session of sessions.slice(0, 50)) { // Sample of sessions
                    await window.DailyDB.addFeedback({
                        sessionId: session.id,
                        userId: session.userId,
                        counsellorId: session.counsellorId,
                        rating: 3 + Math.floor(Math.random() * 3), // 3-5 stars
                        feedback: ['Very helpful session', 'Good progress made', 'Counsellor was empathetic', 'Great advice given', 'Would recommend'][Math.floor(Math.random() * 5)],
                        date: session.sessionDate
                    });
                    feedbackCount++;
                }
                console.log(`✅ Seeded ${feedbackCount} feedback records`);
            }

            // ===== 5. PROGRESS TABLE =====
            const existingProgress = await window.DailyDB.getAllProgress?.call(window.DailyDB);
            if (!existingProgress || existingProgress.length === 0) {
                console.log('Seeding Progress table...');
                let progressCount = 0;
                for (const patient of SEED_PATIENTS) {
                    const categories = ['Anxiety', 'Depression', 'Sleep', 'Stress', 'Overall'];
                    for (const category of categories) {
                        await window.DailyDB.addProgress({
                            userId: patient.patientId,
                            category: category,
                            score: 40 + Math.floor(Math.random() * 50), // 40-90
                            date: new Date().toISOString().split('T')[0],
                            notes: `Progress in ${category} tracking`
                        });
                        progressCount++;
                    }
                }
                console.log(`✅ Seeded ${progressCount} progress records`);
            }

            // ===== 6. RECOMMENDATIONS TABLE =====
            const existingRecommendations = await window.DailyDB.getAllRecommendations?.call(window.DailyDB);
            if (!existingRecommendations || existingRecommendations.length === 0) {
                console.log('Seeding Recommendations table...');
                let recommendationCount = 0;
                const recommendations = ['Daily meditation', 'Exercise 30 mins', 'Sleep hygiene routine', 'Breathing exercises', 'Journaling', 'Social activities', 'Limit caffeine', 'Regular schedule'];
                for (const patient of SEED_PATIENTS) {
                    for (let i = 0; i < 3; i++) {
                        const rec = recommendations[Math.floor(Math.random() * recommendations.length)];
                        await window.DailyDB.addRecommendation({
                            userId: patient.patientId,
                            title: rec,
                            description: `Recommended: ${rec} for your wellbeing`,
                            category: ['Exercise', 'Mindfulness', 'Sleep', 'Nutrition', 'Social'][Math.floor(Math.random() * 5)],
                            priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
                            date: new Date().toISOString().split('T')[0]
                        });
                        recommendationCount++;
                    }
                }
                console.log(`✅ Seeded ${recommendationCount} recommendations`);
            }

            // ===== 7. AI_ANALYSIS TABLE =====
            const existingAIAnalysis = await window.DailyDB.getAllAIAnalysis?.call(window.DailyDB);
            if (!existingAIAnalysis || existingAIAnalysis.length === 0) {
                console.log('Seeding AI Analysis table...');
                let aiCount = 0;
                for (const patient of SEED_PATIENTS) {
                    const riskScore = Math.floor(Math.random() * 100);
                    await window.DailyDB.addAIAnalysis({
                        userId: patient.patientId,
                        riskScore: riskScore,
                        emotionClassification: ['Anxiety', 'Depression', 'Stress', 'Stable', 'Positive'][Math.floor(Math.random() * 5)],
                        sentimentAnalysis: ['Negative', 'Neutral', 'Positive'][Math.floor(Math.random() * 3)],
                        recommendedCounsellor: COUNSELLORS[Math.floor(Math.random() * COUNSELLORS.length)].name,
                        confidenceScore: 75 + Math.floor(Math.random() * 25),
                        date: new Date().toISOString().split('T')[0]
                    });
                    aiCount++;
                }
                console.log(`✅ Seeded ${aiCount} AI analysis records`);
            }

            // ===== 8. CRISIS_ALERTS TABLE =====
            const existingCrisisAlerts = await window.DailyDB.getAllCrisisAlerts?.call(window.DailyDB);
            if (!existingCrisisAlerts || existingCrisisAlerts.length === 0) {
                console.log('Seeding Crisis Alerts table...');
                const highRiskPatients = SEED_PATIENTS.slice(0, 5); // First 5 patients as high-risk
                let crisisCount = 0;
                for (const patient of highRiskPatients) {
                    await window.DailyDB.addCrisisAlert({
                        userId: patient.patientId,
                        severity: ['Critical', 'High'][Math.floor(Math.random() * 2)],
                        description: 'High anxiety detected',
                        contactedCounsellor: COUNSELLORS[0].name,
                        date: new Date().toISOString().split('T')[0],
                        status: ['Resolved', 'Pending', 'In Progress'][Math.floor(Math.random() * 3)]
                    });
                    crisisCount++;
                }
                console.log(`✅ Seeded ${crisisCount} crisis alerts`);
            }

            // ===== 9. EMERGENCY_CONTACTS TABLE =====
            const existingEmergencyContacts = await window.DailyDB.getAllEmergencyContacts?.call(window.DailyDB);
            if (!existingEmergencyContacts || existingEmergencyContacts.length === 0) {
                console.log('Seeding Emergency Contacts table...');
                let emergencyCount = 0;
                for (const patient of SEED_PATIENTS) {
                    await window.DailyDB.addEmergencyContact({
                        userId: patient.patientId,
                        name: `${patient.name}'s Emergency Contact`,
                        phone: `+1-555-${3000 + Math.floor(Math.random() * 1000)}`,
                        type: ['Family', 'Friend', 'Doctor'][Math.floor(Math.random() * 3)],
                        relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)]
                    });
                    emergencyCount++;
                }
                console.log(`✅ Seeded ${emergencyCount} emergency contacts`);
            }

            console.log('🎉 All seed data initialization complete!');
        } catch (error) {
            console.error('Error initializing comprehensive seed data:', error);
        }
    }

    // Auto-initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllSeedData);
    } else {
        initializeAllSeedData();
    }

    return {
        initializeAllSeedData,
        SEED_PATIENTS
    };
})();

window.ComprehensiveSeedData = ComprehensiveSeedData;
