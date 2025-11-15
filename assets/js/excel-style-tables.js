// ===== CLEAN EXCEL-STYLE TABLE RENDERER =====
// Generates minimal, focused data tables for each role

const ExcelStyleTables = (function () {

    // Helper: Create clean HTML table
    function createTable(columns, rows) {
        let html = `<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-family: 'Arial', sans-serif; font-size: 0.9rem;">`;

        // Header
        html += `<thead><tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">`;
        columns.forEach(col => {
            html += `<th style="padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold;">${col}</th>`;
        });
        html += `</tr></thead>`;

        // Body
        html += `<tbody>`;
        rows.forEach((row, idx) => {
            const bgColor = idx % 2 === 0 ? '#ffffff' : '#f8f9fa';
            html += `<tr style="background: ${bgColor}; border-bottom: 1px solid #eee;">`;
            Object.values(row).forEach(val => {
                html += `<td style="padding: 10px 12px; border: 1px solid #ddd; text-align: left;">${val}</td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody>`;
        html += `</table>`;

        return html;
    }

    // Software Engineer Table
    async function getSoftwareEngineerTable() {
        try {
            const data = await window.RoleSpecificData.getSoftwareEngineerData();
            const rows = data.map(d => ({
                'Patient ID': d.patientId,
                'Date': d.date,
                'Mood': d.mood,
                'Stress': d.stressLevel,
                'Anxiety': d.anxietyLevel,
                'Sleep': d.sleepHours + ' hrs',
                'Timestamp': d.createdAt
            }));
            return createTable(['Patient ID', 'Date', 'Mood', 'Stress', 'Anxiety', 'Sleep', 'Timestamp'], rows);
        } catch (err) {
            console.error('Error generating Software Engineer table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // AI Engineer Table
    async function getAIEngineerTable() {
        try {
            const data = await window.RoleSpecificData.getAIEngineerData();
            const rows = data.map(d => ({
                'Patient ID': d.patientId,
                'Risk Score': d.riskScore + '%',
                'Emotion': d.emotionClassification,
                'Sentiment': d.sentimentAnalysis,
                'Rec. Counsellor': d.recommendedCounsellor,
                'Confidence': d.confidenceScore + '%',
                'Analysis Date': d.analysisDate
            }));
            return createTable(['Patient ID', 'Risk Score', 'Emotion', 'Sentiment', 'Rec. Counsellor', 'Confidence', 'Analysis Date'], rows);
        } catch (err) {
            console.error('Error generating AI Engineer table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // Data Scientist Table
    async function getDataScientistTable() {
        try {
            const data = await window.RoleSpecificData.getDataScientistData();
            const rows = data.map(d => ({
                'Patient ID': d.patientId,
                'Avg Stress': d.avgStress,
                'Avg Anxiety': d.avgAnxiety,
                'Trend': d.trendDirection,
                'Recommendation': d.recommendationType,
                'Efficacy': d.efficacyScore + '%',
                'Priority': d.priority
            }));
            return createTable(['Patient ID', 'Avg Stress', 'Avg Anxiety', 'Trend', 'Recommendation', 'Efficacy', 'Priority'], rows);
        } catch (err) {
            console.error('Error generating Data Scientist table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // Mental Health Admin Table
    async function getMentalHealthAdminTable() {
        try {
            const data = await window.RoleSpecificData.getMentalHealthAdminData();
            const rows = data.map(d => ({
                'ID': d.patientId,
                'Name': d.patientName,
                'Sessions': d.sessionCount,
                'Feedback': d.avgFeedbackRating,
                'Progress': d.progressScore + '%',
                'Risk': d.riskLevel,
                'Last Session': d.lastSessionDate
            }));
            return createTable(['ID', 'Name', 'Sessions', 'Feedback', 'Progress', 'Risk', 'Last Session'], rows);
        } catch (err) {
            console.error('Error generating Mental Health Admin table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // Emergency Team Table
    async function getEmergencyTeamTable() {
        try {
            const data = await window.RoleSpecificData.getEmergencyTeamData();
            const rows = data.map(d => ({
                'ID': d.patientId,
                'Name': d.patientName,
                'Severity': d.alertSeverity,
                'Current Mood': d.currentMoodState,
                'Anxiety': d.anxietyLevel,
                'Emergency Contact': d.emergencyContact,
                'Alert Time': d.alertTimestamp
            }));
            return createTable(['ID', 'Name', 'Severity', 'Current Mood', 'Anxiety', 'Emergency Contact', 'Alert Time'], rows);
        } catch (err) {
            console.error('Error generating Emergency Team table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // Security Analyst Table
    async function getSecurityAnalystTable() {
        try {
            const data = await window.RoleSpecificData.getSecurityAnalystData();
            const rows = data.map(d => ({
                'Patient ID': d.patientId,
                'Event': d.accessEvent,
                'Access Time': d.accessTime,
                'Level': d.accessLevel,
                'Data': d.dataAccessed,
                'Status': d.accessStatus,
                'IP': d.ipAddress
            }));
            return createTable(['Patient ID', 'Event', 'Access Time', 'Level', 'Data', 'Status', 'IP'], rows);
        } catch (err) {
            console.error('Error generating Security Analyst table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // Financial Team Table
    async function getFinancialTeamTable() {
        try {
            const data = await window.RoleSpecificData.getFinancialTeamData();
            const rows = data.map(d => ({
                'ID': d.patientId,
                'Name': d.patientName,
                'Sessions': d.totalSessions,
                'Cost/Session': d.costPerSession,
                'Total Revenue': d.totalRevenue,
                'Payment Status': d.paymentStatus,
                'Last Payment': d.lastPaymentDate
            }));
            return createTable(['ID', 'Name', 'Sessions', 'Cost/Session', 'Total Revenue', 'Payment Status', 'Last Payment'], rows);
        } catch (err) {
            console.error('Error generating Financial Team table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    // System Admin Table
    async function getSystemAdminTable() {
        try {
            const data = await window.RoleSpecificData.getSystemAdminData();
            const rows = data.map(d => ({
                'Patient ID': d.patientId,
                'Records': d.recordCount,
                'Data Size': d.dataSize,
                'First Entry': d.firstEntry,
                'Last Entry': d.lastEntry,
                'DB Status': d.databaseStatus,
                'Backup': d.backupStatus
            }));
            return createTable(['Patient ID', 'Records', 'Data Size', 'First Entry', 'Last Entry', 'DB Status', 'Backup'], rows);
        } catch (err) {
            console.error('Error generating System Admin table:', err);
            return '<p style="color: red;">Error loading data</p>';
        }
    }

    return {
        getSoftwareEngineerTable,
        getAIEngineerTable,
        getDataScientistTable,
        getMentalHealthAdminTable,
        getEmergencyTeamTable,
        getSecurityAnalystTable,
        getFinancialTeamTable,
        getSystemAdminTable
    };
})();

window.ExcelStyleTables = ExcelStyleTables;
