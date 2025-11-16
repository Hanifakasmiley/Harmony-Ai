const PatientData = (function () {

    // ===== 20 PATIENT PROFILES =====
    const patients = [
        {
            id: 'P001', name: 'Sarah Johnson', age: 28, gender: 'Female', email: 'sarah.j@email.com', phone: '+1-555-0101',
            condition: 'Anxiety Disorder', severity: 'High', counselor: 'Dr. Emily Smith', emergencyContact: 'John Johnson +1-555-9001',
            riskScore: 75, lastAssessment: '2025-11-14', status: 'High Risk'
        },
        {
            id: 'P002', name: 'Michael Chen', age: 35, gender: 'Male', email: 'michael.c@email.com', phone: '+1-555-0102',
            condition: 'Depression', severity: 'Moderate', counselor: 'Dr. James Johnson', emergencyContact: 'Linda Chen +1-555-9002',
            riskScore: 52, lastAssessment: '2025-11-15', status: 'Moderate'
        },
        {
            id: 'P003', name: 'Emma Rodriguez', age: 42, gender: 'Female', email: 'emma.r@email.com', phone: '+1-555-0103',
            condition: 'Stress-Related', severity: 'Moderate', counselor: 'Dr. Lisa Williams', emergencyContact: 'Carlos Rodriguez +1-555-9003',
            riskScore: 48, lastAssessment: '2025-11-13', status: 'Moderate'
        },
        {
            id: 'P004', name: 'James Wilson', age: 31, gender: 'Male', email: 'james.w@email.com', phone: '+1-555-0104',
            condition: 'Anxiety Disorder', severity: 'Mild', counselor: 'Dr. Emily Smith', emergencyContact: 'Mary Wilson +1-555-9004',
            riskScore: 35, lastAssessment: '2025-11-14', status: 'Low Risk'
        },
        {
            id: 'P005', name: 'Lisa Anderson', age: 26, gender: 'Female', email: 'lisa.a@email.com', phone: '+1-555-0105',
            condition: 'Sleep Disorder', severity: 'High', counselor: 'Dr. Robert Brown', emergencyContact: 'Thomas Anderson +1-555-9005',
            riskScore: 68, lastAssessment: '2025-11-14', status: 'High Risk'
        },
        {
            id: 'P006', name: 'David Martinez', age: 45, gender: 'Male', email: 'david.m@email.com', phone: '+1-555-0106',
            condition: 'Depression', severity: 'Mild', counselor: 'Dr. James Johnson', emergencyContact: 'Rosa Martinez +1-555-9006',
            riskScore: 42, lastAssessment: '2025-11-12', status: 'Moderate'
        },
        {
            id: 'P007', name: 'Jennifer Lee', age: 33, gender: 'Female', email: 'jennifer.l@email.com', phone: '+1-555-0107',
            condition: 'Stress-Related', severity: 'High', counselor: 'Dr. Lisa Williams', emergencyContact: 'Mark Lee +1-555-9007',
            riskScore: 72, lastAssessment: '2025-11-15', status: 'High Risk'
        },
        {
            id: 'P008', name: 'Robert Taylor', age: 38, gender: 'Male', email: 'robert.t@email.com', phone: '+1-555-0108',
            condition: 'Anxiety Disorder', severity: 'Moderate', counselor: 'Dr. Emily Smith', emergencyContact: 'Patricia Taylor +1-555-9008',
            riskScore: 55, lastAssessment: '2025-11-13', status: 'Moderate'
        },
        {
            id: 'P009', name: 'Amanda White', age: 29, gender: 'Female', email: 'amanda.w@email.com', phone: '+1-555-0109',
            condition: 'Depression', severity: 'High', counselor: 'Dr. James Johnson', emergencyContact: 'George White +1-555-9009',
            riskScore: 85, lastAssessment: '2025-11-15', status: 'Critical'
        },
        {
            id: 'P010', name: 'Christopher Brown', age: 40, gender: 'Male', email: 'chris.b@email.com', phone: '+1-555-0110',
            condition: 'Sleep Disorder', severity: 'Mild', counselor: 'Dr. Robert Brown', emergencyContact: 'Helen Brown +1-555-9010',
            riskScore: 38, lastAssessment: '2025-11-14', status: 'Low Risk'
        },
        {
            id: 'P011', name: 'Michelle Davis', age: 34, gender: 'Female', email: 'michelle.d@email.com', phone: '+1-555-0111',
            condition: 'Stress-Related', severity: 'Moderate', counselor: 'Dr. Lisa Williams', emergencyContact: 'William Davis +1-555-9011',
            riskScore: 51, lastAssessment: '2025-11-12', status: 'Moderate'
        },
        {
            id: 'P012', name: 'Kevin Johnson', age: 27, gender: 'Male', email: 'kevin.j@email.com', phone: '+1-555-0112',
            condition: 'Anxiety Disorder', severity: 'High', counselor: 'Dr. Emily Smith', emergencyContact: 'Anna Johnson +1-555-9012',
            riskScore: 78, lastAssessment: '2025-11-15', status: 'High Risk'
        },
        {
            id: 'P013', name: 'Rachel Green', age: 36, gender: 'Female', email: 'rachel.g@email.com', phone: '+1-555-0113',
            condition: 'Depression', severity: 'Moderate', counselor: 'Dr. James Johnson', emergencyContact: 'Richard Green +1-555-9013',
            riskScore: 58, lastAssessment: '2025-11-14', status: 'Moderate'
        },
        {
            id: 'P014', name: 'Daniel Thompson', age: 43, gender: 'Male', email: 'daniel.t@email.com', phone: '+1-555-0114',
            condition: 'Stress-Related', severity: 'Mild', counselor: 'Dr. Lisa Williams', emergencyContact: 'Susan Thompson +1-555-9014',
            riskScore: 40, lastAssessment: '2025-11-13', status: 'Low Risk'
        },
        {
            id: 'P015', name: 'Nicole Harris', age: 30, gender: 'Female', email: 'nicole.h@email.com', phone: '+1-555-0115',
            condition: 'Sleep Disorder', severity: 'High', counselor: 'Dr. Robert Brown', emergencyContact: 'Jeffrey Harris +1-555-9015',
            riskScore: 70, lastAssessment: '2025-11-15', status: 'High Risk'
        },
        {
            id: 'P016', name: 'Brandon Clark', age: 39, gender: 'Male', email: 'brandon.c@email.com', phone: '+1-555-0116',
            condition: 'Anxiety Disorder', severity: 'Mild', counselor: 'Dr. Emily Smith', emergencyContact: 'Diane Clark +1-555-9016',
            riskScore: 36, lastAssessment: '2025-11-14', status: 'Low Risk'
        },
        {
            id: 'P017', name: 'Stephanie Lewis', age: 25, gender: 'Female', email: 'stephanie.l@email.com', phone: '+1-555-0117',
            condition: 'Depression', severity: 'High', counselor: 'Dr. James Johnson', emergencyContact: 'Paul Lewis +1-555-9017',
            riskScore: 82, lastAssessment: '2025-11-15', status: 'Critical'
        },
        {
            id: 'P018', name: 'Mark Walker', age: 44, gender: 'Male', email: 'mark.w@email.com', phone: '+1-555-0118',
            condition: 'Stress-Related', severity: 'High', counselor: 'Dr. Lisa Williams', emergencyContact: 'Karen Walker +1-555-9018',
            riskScore: 74, lastAssessment: '2025-11-14', status: 'High Risk'
        },
        {
            id: 'P019', name: 'Karen Hall', age: 32, gender: 'Female', email: 'karen.h@email.com', phone: '+1-555-0119',
            condition: 'Sleep Disorder', severity: 'Moderate', counselor: 'Dr. Robert Brown', emergencyContact: 'Michael Hall +1-555-9019',
            riskScore: 54, lastAssessment: '2025-11-13', status: 'Moderate'
        },
        {
            id: 'P020', name: 'Steven Allen', age: 37, gender: 'Male', email: 'steven.a@email.com', phone: '+1-555-0120',
            condition: 'Anxiety Disorder', severity: 'Moderate', counselor: 'Dr. Emily Smith', emergencyContact: 'Victoria Allen +1-555-9020',
            riskScore: 56, lastAssessment: '2025-11-14', status: 'Moderate'
        }
    ];

    // ===== DAILY MOOD LOGS (30 days per patient) =====
    function generateMoodLogs() {
        const moodTypes = ['Happy', 'Sad', 'Anxious', 'Calm', 'Energetic', 'Tired', 'Neutral', 'Stressed'];
        const logs = [];
        const today = new Date();

        patients.forEach(patient => {
            for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                logs.push({
                    patientId: patient.id,
                    date: date.toISOString().split('T')[0],
                    mood: moodTypes[Math.floor(Math.random() * moodTypes.length)],
                    stressLevel: Math.floor(Math.random() * 10) + 1,
                    anxietyLevel: Math.floor(Math.random() * 10) + 1,
                    sleepHours: Math.floor(Math.random() * 5) + 4,
                    notes: `Daily log entry for ${patient.name}`,
                    createdAt: new Date().toISOString()
                });
            }
        });
        return logs;
    }

    // ===== COUNSELOR SESSIONS =====
    const counselors = [
        { id: 'C001', name: 'Dr. Emily Smith', specialization: 'Anxiety Disorders', experience: 12, phone: '+1-555-2001', availability: 'Mon-Fri' },
        { id: 'C002', name: 'Dr. James Johnson', specialization: 'Depression', experience: 15, phone: '+1-555-2002', availability: 'Tue-Sat' },
        { id: 'C003', name: 'Dr. Lisa Williams', specialization: 'Stress Management', experience: 10, phone: '+1-555-2003', availability: 'Mon-Thu' },
        { id: 'C004', name: 'Dr. Robert Brown', specialization: 'Sleep Disorders', experience: 8, phone: '+1-555-2004', availability: 'Wed-Sat' },
        { id: 'C005', name: 'Dr. Sarah Davis', specialization: 'Cognitive Therapy', experience: 14, phone: '+1-555-2005', availability: 'Mon-Fri' }
    ];

    function generateSessions() {
        const sessions = [];
        const today = new Date();
        const sessionTypes = ['Initial Consultation', 'Follow-up', 'Crisis Intervention', 'Group Therapy', 'Assessment'];

        patients.forEach((patient, index) => {
            const counselor = counselors[index % counselors.length];
            for (let i = 0; i < 5; i++) {
                const sessionDate = new Date(today);
                sessionDate.setDate(sessionDate.getDate() - (i * 7));
                sessions.push({
                    sessionId: `S${patient.id}${String(i).padStart(2, '0')}`,
                    patientId: patient.id,
                    counselorId: counselor.id,
                    counselorName: counselor.name,
                    date: sessionDate.toISOString().split('T')[0],
                    time: `${Math.floor(Math.random() * 12) + 8}:00`,
                    duration: 60,
                    type: sessionTypes[Math.floor(Math.random() * sessionTypes.length)],
                    status: i === 0 ? 'Scheduled' : 'Completed',
                    notes: `Session with ${counselor.name}`,
                    outcome: i === 0 ? null : Math.random() > 0.5 ? 'Positive Progress' : 'On Track'
                });
            }
        });
        return sessions;
    }

    // ===== AI ANALYSIS & RISK SCORES =====
    function generateAIAnalysis() {
        const analysis = [];
        const emotions = ['Anxiety', 'Depression', 'Stress', 'Burnout', 'Stability', 'Optimism'];

        patients.forEach((patient, index) => {
            const today = new Date();
            for (let i = 0; i < 12; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - (i * 7));
                analysis.push({
                    analysisId: `A${patient.id}${String(i).padStart(2, '0')}`,
                    patientId: patient.id,
                    date: date.toISOString().split('T')[0],
                    riskScore: Math.floor(Math.random() * 100),
                    sentimentScore: (Math.random() * 100 - 50).toFixed(2),
                    dominantEmotion: emotions[Math.floor(Math.random() * emotions.length)],
                    emotionalTrend: ['Improving', 'Declining', 'Stable'][Math.floor(Math.random() * 3)],
                    keywordFlags: ['anxiety', 'stress', 'sleep', 'coping'],
                    aiRecommendation: 'Continue current therapy plan',
                    confidenceScore: (Math.random() * 0.5 + 0.5).toFixed(2)
                });
            }
        });
        return analysis;
    }

    // ===== FEEDBACK & PROGRESS =====
    function generateFeedback() {
        const feedback = [];
        patients.forEach((patient, index) => {
            const counselor = counselors[index % counselors.length];
            for (let i = 0; i < 5; i++) {
                feedback.push({
                    feedbackId: `F${patient.id}${String(i).padStart(2, '0')}`,
                    sessionId: `S${patient.id}${String(i).padStart(2, '0')}`,
                    patientId: patient.id,
                    counselorId: counselor.id,
                    rating: Math.floor(Math.random() * 5) + 1,
                    comment: `Session was helpful and productive`,
                    improvementAreas: ['Sleep Quality', 'Stress Management', 'Social Engagement'],
                    strongPoints: ['Resilience', 'Openness', 'Commitment'],
                    nextSteps: 'Continue therapy sessions weekly'
                });
            }
        });
        return feedback;
    }

    function generateProgress() {
        const progress = [];
        patients.forEach(patient => {
            for (let i = 0; i < 12; i++) {
                const date = new Date();
                date.setDate(date.getDate() - (i * 7));
                progress.push({
                    progressId: `P${patient.id}${String(i).padStart(2, '0')}`,
                    patientId: patient.id,
                    date: date.toISOString().split('T')[0],
                    emotionalStability: Math.floor(Math.random() * 100),
                    functioningLevel: Math.floor(Math.random() * 100),
                    copingSkills: Math.floor(Math.random() * 100),
                    socialEngagement: Math.floor(Math.random() * 100),
                    improvementPercentage: Math.floor(Math.random() * 60) + 20,
                    notes: `Patient showing consistent improvement`,
                    sessionCount: i + 1,
                    goalProgress: 65 + (i * 3)
                });
            }
        });
        return progress;
    }

    // ===== RECOMMENDATIONS =====
    function generateRecommendations() {
        const recommendations = [];
        const activities = [
            'Meditation - 10 minutes daily',
            'Morning walk - 30 minutes',
            'Journaling - Evening reflection',
            'Progressive muscle relaxation',
            'Cognitive behavioral exercises',
            'Sleep hygiene improvement',
            'Social activity - Weekly gathering',
            'Breathing exercises - 5 minutes',
            'Yoga - 20 minutes',
            'Mindfulness practice'
        ];

        patients.forEach(patient => {
            for (let i = 0; i < 3; i++) {
                recommendations.push({
                    recId: `R${patient.id}${String(i).padStart(2, '0')}`,
                    patientId: patient.id,
                    activity: activities[Math.floor(Math.random() * activities.length)],
                    category: ['Mindfulness', 'Exercise', 'Social', 'Sleep', 'Nutrition'][Math.floor(Math.random() * 5)],
                    frequency: ['Daily', 'Weekly', '3x per week'][Math.floor(Math.random() * 3)],
                    duration: `${Math.floor(Math.random() * 45) + 5} minutes`,
                    createdDate: new Date().toISOString().split('T')[0],
                    status: Math.random() > 0.3 ? 'Active' : 'Completed',
                    adherence: Math.floor(Math.random() * 100)
                });
            }
        });
        return recommendations;
    }

    // ===== CRISIS ALERTS =====
    function generateCrisisAlerts() {
        const alerts = [];
        const criticalPatients = patients.filter(p => p.riskScore > 75);

        criticalPatients.forEach(patient => {
            alerts.push({
                alertId: `CRISIS${patient.id}`,
                patientId: patient.id,
                patientName: patient.name,
                severity: patient.riskScore > 80 ? 'Critical' : 'High',
                triggerKeywords: ['suicidal', 'hopeless', 'can\'t cope', 'desperate'],
                timestamp: new Date().toISOString(),
                status: 'Active',
                assignedCounselor: patient.counselor,
                emergencyContact: patient.emergencyContact,
                actionTaken: 'Immediate counselor notification sent',
                notes: 'Patient requires urgent intervention'
            });
        });
        return alerts;
    }

    // ===== EMERGENCY CONTACTS =====
    function generateEmergencyContacts() {
        const contacts = [
            { country: 'USA', service: 'National Suicide Prevention Lifeline', number: '988', available: '24/7' },
            { country: 'USA', service: 'Crisis Text Line', number: 'Text HOME to 741741', available: '24/7' },
            { country: 'UK', service: 'Samaritans', number: '116 123', available: '24/7' },
            { country: 'UK', service: 'Mind Infoline', number: '0300 123 3393', available: 'Mon-Fri 9-6' },
            { country: 'International', service: 'International Association for Suicide Prevention', number: 'https://www.iasp.info/resources/Crisis_Centres/', available: 'Online' }
        ];
        return contacts;
    }

    // Public API
    return {
        getPatients: () => JSON.parse(JSON.stringify(patients)),
        getCounselors: () => JSON.parse(JSON.stringify(counselors)),
        getMoodLogs: () => JSON.parse(JSON.stringify(generateMoodLogs())),
        getSessions: () => JSON.parse(JSON.stringify(generateSessions())),
        getAIAnalysis: () => JSON.parse(JSON.stringify(generateAIAnalysis())),
        getFeedback: () => JSON.parse(JSON.stringify(generateFeedback())),
        getProgress: () => JSON.parse(JSON.stringify(generateProgress())),
        getRecommendations: () => JSON.parse(JSON.stringify(generateRecommendations())),
        getCrisisAlerts: () => JSON.parse(JSON.stringify(generateCrisisAlerts())),
        getEmergencyContacts: () => JSON.parse(JSON.stringify(generateEmergencyContacts())),

        // Utility functions
        getPatientById: (id) => patients.find(p => p.id === id),
        getCriticalPatients: () => patients.filter(p => p.riskScore > 75),
        getHighRiskPatients: () => patients.filter(p => p.riskScore >= 60 && p.riskScore <= 75),
        getModeratePatients: () => patients.filter(p => p.riskScore >= 40 && p.riskScore < 60),
        getLowRiskPatients: () => patients.filter(p => p.riskScore < 40),

        // Statistics
        getStatistics: () => {
            const all = patients;
            return {
                totalPatients: all.length,
                criticalCount: all.filter(p => p.riskScore > 75).length,
                highRiskCount: all.filter(p => p.riskScore >= 60 && p.riskScore <= 75).length,
                moderateCount: all.filter(p => p.riskScore >= 40 && p.riskScore < 60).length,
                lowRiskCount: all.filter(p => p.riskScore < 40).length,
                avgRiskScore: (all.reduce((sum, p) => sum + p.riskScore, 0) / all.length).toFixed(1),
                criticalPercentage: ((all.filter(p => p.riskScore > 75).length / all.length) * 100).toFixed(1),
                highRiskPercentage: ((all.filter(p => p.riskScore >= 60 && p.riskScore <= 75).length / all.length) * 100).toFixed(1),
                moodAvgScore: 5.5,
                recommendationAdherence: 72,
                sessionCompletionRate: 85
            };
        }
    };
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PatientData;
}
