// ===== ROLE-SPECIFIC DATA GENERATORS =====
// Clean, focused data tables for each designation with 20 patient records

const RoleSpecificData = (function () {

    // Software Engineer - System Logs (50 most recent records from all patients)
    async function getSoftwareEngineerData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        return logs.slice(-50).map((log, idx) => ({
            patientId: log.patientId,
            date: log.date,
            mood: log.mood,
            stressLevel: log.stressLevel,
            anxietyLevel: log.anxietyLevel,
            sleepHours: log.sleepHours,
            createdAt: new Date(log.createdAt).toLocaleString()
        })).reverse();
    }

    // AI Engineer - AI Analysis Data (Risk scores, emotion classification)
    async function getAIEngineerData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                const recentEntries = logs.filter(l => l.patientId === log.patientId).slice(-7);
                const avgAnxiety = recentEntries.reduce((sum, e) => sum + e.anxietyLevel, 0) / recentEntries.length;
                const riskScore = Math.round(avgAnxiety * 10);
                const emotionMap = { 'Anxious': 'Anxiety', 'Sad': 'Depression', 'Happy': 'Positive', 'Neutral': 'Stable', 'Irritated': 'Agitation', 'Calm': 'Peaceful' };

                patientMap[log.patientId] = {
                    patientId: log.patientId,
                    riskScore: riskScore,
                    emotionClassification: emotionMap[log.mood.split(' ')[1]] || 'Unknown',
                    sentimentAnalysis: avgAnxiety > 7 ? 'Negative' : avgAnxiety > 4 ? 'Neutral' : 'Positive',
                    recommendedCounsellor: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'][Math.floor(Math.random() * 5)],
                    confidenceScore: Math.round(80 + Math.random() * 20),
                    analysisDate: log.date
                };
            }
        });

        return Object.values(patientMap).slice(0, 20);
    }

    // Data Scientist - Analytics & Recommendations (Trend analysis, personalized tips)
    async function getDataScientistData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                const patientLogs = logs.filter(l => l.patientId === log.patientId).slice(-7);
                const avgStress = Math.round(patientLogs.reduce((sum, e) => sum + e.stressLevel, 0) / patientLogs.length);
                const avgAnxiety = Math.round(patientLogs.reduce((sum, e) => sum + e.anxietyLevel, 0) / patientLogs.length);
                const oldest = patientLogs[patientLogs.length - 1];
                const newest = patientLogs[0];
                const trend = newest.stressLevel > oldest.stressLevel ? '📈 Increasing' : newest.stressLevel < oldest.stressLevel ? '📉 Decreasing' : '➡️ Stable';

                patientMap[log.patientId] = {
                    patientId: log.patientId,
                    avgStress: avgStress,
                    avgAnxiety: avgAnxiety,
                    trendDirection: trend,
                    recommendationType: avgStress > 7 ? 'Meditation' : avgAnxiety > 7 ? 'Counselling' : 'Wellness',
                    efficacyScore: Math.round(65 + Math.random() * 35),
                    priority: avgAnxiety > 7 ? 'High' : avgStress > 7 ? 'Medium' : 'Low'
                };
            }
        });

        return Object.values(patientMap).slice(0, 20);
    }

    // Mental Health Administrator - Patient Case Management (Overview of all patients)
    async function getMentalHealthAdminData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const patients = [
            { id: 'P001', name: 'Sarah Johnson' },
            { id: 'P002', name: 'Michael Chen' },
            { id: 'P003', name: 'Emma Rodriguez' },
            { id: 'P004', name: 'James Wilson' },
            { id: 'P005', name: 'Lisa Anderson' },
            { id: 'P006', name: 'David Martinez' },
            { id: 'P007', name: 'Jennifer Lee' },
            { id: 'P008', name: 'Robert Taylor' },
            { id: 'P009', name: 'Amanda White' },
            { id: 'P010', name: 'Christopher Brown' },
            { id: 'P011', name: 'Michelle Davis' },
            { id: 'P012', name: 'Kevin Johnson' },
            { id: 'P013', name: 'Rachel Green' },
            { id: 'P014', name: 'Daniel Thompson' },
            { id: 'P015', name: 'Nicole Harris' },
            { id: 'P016', name: 'Brandon Clark' },
            { id: 'P017', name: 'Stephanie Lewis' },
            { id: 'P018', name: 'Mark Walker' },
            { id: 'P019', name: 'Karen Hall' },
            { id: 'P020', name: 'Steven Allen' }
        ];

        return patients.map(patient => {
            const patientLogs = logs.filter(l => l.patientId === patient.id);
            const avgAnxiety = patientLogs.length ? Math.round(patientLogs.reduce((sum, l) => sum + l.anxietyLevel, 0) / patientLogs.length) : 0;
            const lastLog = patientLogs[patientLogs.length - 1];

            return {
                patientId: patient.id,
                patientName: patient.name,
                sessionCount: patientLogs.length,
                avgFeedbackRating: Math.round(7 + Math.random() * 3),
                progressScore: Math.round(50 + Math.random() * 50),
                riskLevel: avgAnxiety > 7 ? 'High' : avgAnxiety > 4 ? 'Medium' : 'Low',
                lastSessionDate: lastLog ? lastLog.date : 'N/A'
            };
        });
    }

    // Emergency Contact Team - Crisis Cases (High-risk patients only)
    async function getEmergencyTeamData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const emergencyPatients = [];
        const patientMap = {};

        const patients = [
            { id: 'P001', name: 'Sarah Johnson' },
            { id: 'P004', name: 'James Wilson' },
            { id: 'P006', name: 'David Martinez' },
            { id: 'P008', name: 'Robert Taylor' },
            { id: 'P009', name: 'Amanda White' },
            { id: 'P010', name: 'Christopher Brown' },
            { id: 'P013', name: 'Rachel Green' },
            { id: 'P016', name: 'Brandon Clark' },
            { id: 'P017', name: 'Stephanie Lewis' },
            { id: 'P020', name: 'Steven Allen' }
        ];

        patients.forEach(patient => {
            const patientLogs = logs.filter(l => l.patientId === patient.id).slice(-5);
            if (patientLogs.length) {
                const latestLog = patientLogs[0];
                emergencyPatients.push({
                    patientId: patient.id,
                    patientName: patient.name,
                    alertSeverity: latestLog.anxietyLevel > 8 ? 'Critical' : 'High',
                    currentMoodState: latestLog.mood,
                    anxietyLevel: latestLog.anxietyLevel,
                    emergencyContact: `+1-555-0${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
                    alertTimestamp: new Date().toLocaleString()
                });
            }
        });

        return emergencyPatients;
    }

    // Security Analyst - Access Logs & Audit Trail (System access patterns)
    async function getSecurityAnalystData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const accessLogs = [];
        const actions = ['View Profile', 'Update Record', 'Access History', 'Export Data', 'Generate Report'];
        const statuses = ['Success', 'Success', 'Success', 'Success', 'Denied'];

        logs.slice(-20).forEach((log, idx) => {
            accessLogs.push({
                patientId: log.patientId,
                accessEvent: actions[Math.floor(Math.random() * actions.length)],
                accessTime: new Date(log.createdAt).toLocaleString(),
                accessLevel: ['Read', 'Read', 'Write'][Math.floor(Math.random() * 3)],
                dataAccessed: 'Patient Records',
                accessStatus: statuses[Math.floor(Math.random() * statuses.length)],
                ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
            });
        });

        return accessLogs;
    }

    // Financial Team - Revenue & Billing (Session billing and payments)
    async function getFinancialTeamData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const patients = [
            { id: 'P001', name: 'Sarah Johnson' },
            { id: 'P002', name: 'Michael Chen' },
            { id: 'P003', name: 'Emma Rodriguez' },
            { id: 'P004', name: 'James Wilson' },
            { id: 'P005', name: 'Lisa Anderson' },
            { id: 'P006', name: 'David Martinez' },
            { id: 'P007', name: 'Jennifer Lee' },
            { id: 'P008', name: 'Robert Taylor' },
            { id: 'P009', name: 'Amanda White' },
            { id: 'P010', name: 'Christopher Brown' },
            { id: 'P011', name: 'Michelle Davis' },
            { id: 'P012', name: 'Kevin Johnson' },
            { id: 'P013', name: 'Rachel Green' },
            { id: 'P014', name: 'Daniel Thompson' },
            { id: 'P015', name: 'Nicole Harris' },
            { id: 'P016', name: 'Brandon Clark' },
            { id: 'P017', name: 'Stephanie Lewis' },
            { id: 'P018', name: 'Mark Walker' },
            { id: 'P019', name: 'Karen Hall' },
            { id: 'P020', name: 'Steven Allen' }
        ];

        return patients.map(patient => {
            const patientLogs = logs.filter(l => l.patientId === patient.id);
            const sessions = patientLogs.length;
            const costPerSession = 50;
            const totalRevenue = sessions * costPerSession;

            return {
                patientId: patient.id,
                patientName: patient.name,
                totalSessions: sessions,
                costPerSession: '$' + costPerSession,
                totalRevenue: '$' + totalRevenue.toLocaleString(),
                paymentStatus: ['Paid', 'Paid', 'Pending'][Math.floor(Math.random() * 3)],
                lastPaymentDate: patientLogs.length ? patientLogs[0].date : 'N/A'
            };
        });
    }

    // System Administrator - Database Status & Infrastructure (Database metrics)
    async function getSystemAdminData() {
        if (!window.DailyDB) return [];
        const logs = await window.DailyDB.getAllLogs();
        const patients = [
            { id: 'P001', name: 'Sarah Johnson' },
            { id: 'P002', name: 'Michael Chen' },
            { id: 'P003', name: 'Emma Rodriguez' },
            { id: 'P004', name: 'James Wilson' },
            { id: 'P005', name: 'Lisa Anderson' },
            { id: 'P006', name: 'David Martinez' },
            { id: 'P007', name: 'Jennifer Lee' },
            { id: 'P008', name: 'Robert Taylor' },
            { id: 'P009', name: 'Amanda White' },
            { id: 'P010', name: 'Christopher Brown' },
            { id: 'P011', name: 'Michelle Davis' },
            { id: 'P012', name: 'Kevin Johnson' },
            { id: 'P013', name: 'Rachel Green' },
            { id: 'P014', name: 'Daniel Thompson' },
            { id: 'P015', name: 'Nicole Harris' },
            { id: 'P016', name: 'Brandon Clark' },
            { id: 'P017', name: 'Stephanie Lewis' },
            { id: 'P018', name: 'Mark Walker' },
            { id: 'P019', name: 'Karen Hall' },
            { id: 'P020', name: 'Steven Allen' }
        ];

        return patients.map(patient => {
            const patientLogs = logs.filter(l => l.patientId === patient.id);
            const recordCount = patientLogs.length;
            const dataSize = Math.round(JSON.stringify(patientLogs).length / 1024);

            return {
                patientId: patient.id,
                recordCount: recordCount,
                dataSize: dataSize + ' KB',
                firstEntry: patientLogs.length ? patientLogs[patientLogs.length - 1].date : 'N/A',
                lastEntry: patientLogs.length ? patientLogs[0].date : 'N/A',
                databaseStatus: 'Active',
                backupStatus: 'Completed'
            };
        });
    }

    return {
        getSoftwareEngineerData,
        getAIEngineerData,
        getDataScientistData,
        getMentalHealthAdminData,
        getEmergencyTeamData,
        getSecurityAnalystData,
        getFinancialTeamData,
        getSystemAdminData
    };
})();

window.RoleSpecificData = RoleSpecificData;
