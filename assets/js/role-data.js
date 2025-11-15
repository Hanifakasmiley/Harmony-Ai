// ===== ROLE-BASED DATA DISPLAY =====
// Different views based on user's designation/role

const RoleDataManager = (function () {

    // Get current user role from localStorage or URL
    function getCurrentRole() {
        return localStorage.getItem('userRole') || 'patient';
    }

    // Mental Health Administrator View - All patient cases and health overview
    async function getMentalHealthAdminData() {
        if (!window.DailyDB) return [];

        const logs = await window.DailyDB.getAllLogs();
        const adminData = [];

        // Group by patient and get latest data
        const patientMap = {};
        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        // Get summary for each patient
        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );
            const latest = entries[0];

            if (latest) {
                const avgStress = Math.round(
                    entries.slice(0, 7).reduce((sum, e) => sum + e.stressLevel, 0) / 7
                );
                const avgAnxiety = Math.round(
                    entries.slice(0, 7).reduce((sum, e) => sum + e.anxietyLevel, 0) / 7
                );

                adminData.push({
                    patientId: patientId,
                    name: `Patient ${patientId}`,
                    latestMood: latest.mood,
                    avgStress: avgStress,
                    avgAnxiety: avgAnxiety,
                    sleepHours: latest.sleepHours,
                    lastUpdate: latest.date,
                    riskLevel: avgAnxiety > 7 ? 'High' : avgAnxiety > 4 ? 'Medium' : 'Low'
                });
            }
        });

        return adminData;
    }

    // Emergency Contact Team View - Crisis alerts and high-risk patients
    async function getEmergencyTeamData() {
        if (!window.DailyDB) return [];

        const logs = await window.DailyDB.getAllLogs();
        const crisisData = [];

        const patientMap = {};
        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );
            const latest = entries[0];

            if (latest && latest.anxietyLevel > 7) {
                crisisData.push({
                    patientId: patientId,
                    name: `Patient ${patientId}`,
                    anxietyLevel: latest.anxietyLevel,
                    stressLevel: latest.stressLevel,
                    lastContact: latest.date,
                    mood: latest.mood,
                    priority: latest.anxietyLevel > 8 ? 'Critical' : 'High'
                });
            }
        });

        return crisisData.sort((a, b) => b.anxietyLevel - a.anxietyLevel);
    }

    // Data Scientist View - Analytics and statistics
    async function getDataScientistData() {
        if (!window.DailyDB) return {};

        const logs = await window.DailyDB.getAllLogs();

        const stats = {
            totalPatients: new Set(logs.map(l => l.patientId)).size,
            totalRecords: logs.length,
            avgStress: Math.round(logs.reduce((sum, l) => sum + l.stressLevel, 0) / logs.length),
            avgAnxiety: Math.round(logs.reduce((sum, l) => sum + l.anxietyLevel, 0) / logs.length),
            avgSleep: (logs.reduce((sum, l) => sum + l.sleepHours, 0) / logs.length).toFixed(1),
            highRiskPatients: new Set(),
            moodDistribution: {}
        };

        // Count high-risk patients
        const patientMap = {};
        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);

            // Count mood distribution
            const moodType = log.mood.split(' ')[1];
            stats.moodDistribution[moodType] = (stats.moodDistribution[moodType] || 0) + 1;
        });

        Object.keys(patientMap).forEach(patientId => {
            const avgAnxiety = patientMap[patientId].reduce((sum, l) => sum + l.anxietyLevel, 0) / patientMap[patientId].length;
            if (avgAnxiety > 7) {
                stats.highRiskPatients.add(patientId);
            }
        });

        stats.highRiskPatients = stats.highRiskPatients.size;
        return stats;
    }

    // Security Analyst View - System access and logs
    async function getSecurityAnalystData() {
        if (!window.DailyDB) return [];

        const logs = await window.DailyDB.getAllLogs();

        // Simulate access logs
        const accessLogs = logs.slice(-20).map((log, index) => ({
            id: index + 1,
            patientId: log.patientId,
            action: 'Data accessed',
            timestamp: log.createdAt,
            accessLevel: 'View',
            status: 'Success'
        }));

        return accessLogs.reverse();
    }

    // Financial Team View - Session and service metrics
    async function getFinancialTeamData() {
        if (!window.DailyDB) return {};

        const logs = await window.DailyDB.getAllLogs();
        const patientCount = new Set(logs.map(l => l.patientId)).size;
        const sessionCount = logs.length;
        const costPerSession = 50; // $50 per session

        return {
            totalPatients: patientCount,
            totalSessions: sessionCount,
            costPerSession: costPerSession,
            totalRevenue: sessionCount * costPerSession,
            avgSessionsPerPatient: Math.round(sessionCount / patientCount),
            monthlyRevenue: Math.round((sessionCount * costPerSession) / 30)
        };
    }

    // System Administrator View - Performance and system metrics
    async function getSystemAdminData() {
        if (!window.DailyDB) return {};

        const logs = await window.DailyDB.getAllLogs();

        return {
            totalRecords: logs.length,
            activePatients: new Set(logs.map(l => l.patientId)).size,
            databaseSize: Math.round(JSON.stringify(logs).length / 1024) + ' KB',
            lastSync: new Date().toLocaleString(),
            systemHealth: 'Healthy',
            uptime: '99.9%',
            responseTime: Math.random().toFixed(2) + ' ms'
        };
    }

    return {
        getCurrentRole,
        getMentalHealthAdminData,
        getEmergencyTeamData,
        getDataScientistData,
        getSecurityAnalystData,
        getFinancialTeamData,
        getSystemAdminData
    };
})();

// Expose globally
window.RoleDataManager = RoleDataManager;
