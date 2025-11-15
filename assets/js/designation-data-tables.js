// ===== CLEAN DESIGNATION-SPECIFIC DATA TABLES =====
// Excel-style tables with only relevant columns for each role

const DesignationDataTables = (function () {

    // Helper: Create styled table
    function createTable(title, columns, rows) {
        let html = `<div style="margin: 2rem 0;">`;
        html += `<h4 style="margin-bottom: 1rem; color: #333; font-weight: bold;">${title}</h4>`;
        html += `<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`;

        // Header
        html += `<thead><tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">`;
        columns.forEach(col => {
            html += `<th style="padding: 12px 10px; text-align: left; border: 1px solid #ddd; font-weight: bold; font-size: 0.85rem;">${col}</th>`;
        });
        html += `</tr></thead>`;

        // Body
        html += `<tbody>`;
        rows.forEach((row, idx) => {
            const bgColor = idx % 2 === 0 ? '#ffffff' : '#f8f9fa';
            html += `<tr style="background: ${bgColor}; border-bottom: 1px solid #eee; transition: background 0.2s;">`;
            Object.values(row).forEach(val => {
                html += `<td style="padding: 10px; border: 1px solid #eee; text-align: left; color: #333;">${val}</td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody></table></div>`;

        return html;
    }

    // Software Engineer - System Logs
    async function getSoftwareEngineerTable() {
        try {
            const logs = window.DummyData ? window.DummyData.getLogs() : [];
            const rows = logs.slice(-50).reverse().map(log => ({
                'Patient ID': log.patientId,
                'Date': log.date,
                'Mood': log.mood,
                'Stress': log.stressLevel,
                'Anxiety': log.anxietyLevel,
                'Sleep (hrs)': log.sleepHours,
                'Created': new Date(log.createdAt).toLocaleString()
            }));
            const columns = ['Patient ID', 'Date', 'Mood', 'Stress', 'Anxiety', 'Sleep (hrs)', 'Created'];
            return createTable('📊 System Logs - Last 50 Records', columns, rows);
        } catch (err) {
            console.error('Software Engineer Table Error:', err);
            return '<p style="color: red;">Error loading system logs</p>';
        }
    }

    // AI Engineer - AI Analysis & Counsellor Matching
    async function getAIEngineerTable() {
        try {
            const aiData = window.DummyData ? window.DummyData.getAIAnalysis() : [];
            const rows = aiData.slice(0, 20).map(ai => ({
                'Patient ID': ai.userId,
                'Risk Score': ai.riskScore + '%',
                'Emotion': ai.emotionClassification,
                'Sentiment': ai.sentimentAnalysis,
                'Recommended Counsellor': ai.recommendedCounsellor,
                'Confidence': ai.confidenceScore + '%',
                'Date': ai.date
            }));
            const columns = ['Patient ID', 'Risk Score', 'Emotion', 'Sentiment', 'Recommended Counsellor', 'Confidence', 'Date'];
            return createTable('🤖 AI Analysis - Risk Scores & Emotion Classification', columns, rows);
        } catch (err) {
            console.error('AI Engineer Table Error:', err);
            return '<p style="color: red;">Error loading AI analysis</p>';
        }
    }

    // Data Scientist - Analytics & Recommendations
    async function getDataScientistTable() {
        try {
            const recommendations = window.DummyData ? window.DummyData.getRecommendations() : [];
            const progress = window.DummyData ? window.DummyData.getProgress() : [];
            const userData = new Map();

            recommendations.forEach(rec => {
                if (!userData.has(rec.userId)) {
                    userData.set(rec.userId, { userId: rec.userId, recommendations: [], progress: [] });
                }
                userData.get(rec.userId).recommendations.push(rec);
            });

            progress.forEach(prog => {
                if (!userData.has(prog.userId)) {
                    userData.set(prog.userId, { userId: prog.userId, recommendations: [], progress: [] });
                }
                userData.get(prog.userId).progress.push(prog);
            });

            const rows = Array.from(userData.values()).slice(0, 20).map(data => ({
                'Patient ID': data.userId,
                'Recommendations': data.recommendations.length,
                'Avg Progress': data.progress.length ? Math.round(data.progress.reduce((sum, p) => sum + p.score, 0) / data.progress.length) + '%' : 'N/A',
                'Categories': [...new Set(data.progress.map(p => p.category))].join(', ') || 'N/A',
                'Top Rec': data.recommendations[0]?.title || 'N/A',
                'Priority': data.recommendations[0]?.priority || 'N/A',
                'Last Updated': data.recommendations[0]?.date || 'N/A'
            }));
            return createTable('📊 Analytics - Recommendations & Progress', ['Patient ID', 'Recommendations', 'Avg Progress', 'Categories', 'Top Rec', 'Priority', 'Last Updated'], rows);
        } catch (err) {
            console.error('Data Scientist Error:', err);
            return '<p style="color: red;">Error loading analytics</p>';
        }
    }

    // Mental Health Administrator - Patient Case Management
    async function getMentalHealthAdminTable() {
        try {
            const users = window.DummyData ? window.DummyData.getUsers() : [];
            const sessions = window.DummyData ? window.DummyData.getSessions() : [];
            const feedback = window.DummyData ? window.DummyData.getFeedback() : [];
            const progress = window.DummyData ? window.DummyData.getProgress() : [];

            const rows = users.slice(0, 20).map(user => {
                const userSessions = sessions.filter(s => s.userId === user.userId);
                const userFeedback = feedback.filter(f => f.userId === user.userId);
                const userProgress = progress.filter(p => p.userId === user.userId);
                const avgRating = userFeedback.length ? (userFeedback.reduce((sum, f) => sum + f.rating, 0) / userFeedback.length).toFixed(1) : 'N/A';

                return {
                    'Patient ID': user.userId,
                    'Name': user.name,
                    'Sessions': userSessions.length,
                    'Feedback Rating': avgRating,
                    'Progress Score': userProgress.length ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length) + '%' : 'N/A',
                    'Condition': user.condition,
                    'Last Session': userSessions.length ? userSessions[userSessions.length - 1].sessionDate : 'None'
                };
            });
            const columns = ['Patient ID', 'Name', 'Sessions', 'Feedback Rating', 'Progress Score', 'Condition', 'Last Session'];
            return createTable('🏥 Patient Case Management - 20 Patients Overview', columns, rows);
        } catch (err) {
            console.error('Mental Health Admin Table Error:', err);
            return '<p style="color: red;">Error loading patient cases</p>';
        }
    }

    // Emergency Contact Team - Crisis Cases
    async function getEmergencyTeamTable() {
        try {
            const crisisAlerts = window.DummyData ? window.DummyData.getCrisisAlerts() : [];
            const users = window.DummyData ? window.DummyData.getUsers() : [];
            const userMap = new Map(users.map(u => [u.userId, u]));

            const rows = crisisAlerts.slice(0, 20).map(alert => {
                const user = userMap.get(alert.userId) || {};
                return {
                    'Patient ID': alert.userId,
                    'Name': user.name || 'Unknown',
                    'Severity': alert.severity,
                    'Description': alert.description,
                    'Counsellor Contacted': alert.status,
                    'Status': alert.status,
                    'Date': alert.date
                };
            });
            return createTable('🚨 Crisis Alerts - High-Risk Patients', ['Patient ID', 'Name', 'Severity', 'Description', 'Counsellor Contacted', 'Status', 'Date'], rows);
        } catch (err) {
            console.error('Emergency Team Error:', err);
            return '<p style="color: red;">Error loading crisis alerts</p>';
        }
    }

    // Security Analyst - Access Logs
    async function getSecurityAnalystTable() {
        try {
            const sessions = window.DummyData ? window.DummyData.getSessions() : [];
            const rows = sessions.slice(-20).reverse().map(session => ({
                'Patient ID': session.userId,
                'Counsellor': session.counsellorId,
                'Session Date': session.sessionDate,
                'Duration': session.duration + ' mins',
                'Status': session.status,
                'Notes': (session.notes || 'N/A').substring(0, 30) + '...'
            }));
            return createTable('🔒 Access & Session Audit Log', ['Patient ID', 'Counsellor', 'Session Date', 'Duration', 'Status', 'Notes'], rows);
        } catch (err) {
            console.error('Security Analyst Error:', err);
            return '<p style="color: red;">Error loading audit logs</p>';
        }
    }

    // Financial Team - Revenue & Billing
    async function getFinancialTeamTable() {
        try {
            const users = window.DummyData ? window.DummyData.getUsers() : [];
            const sessions = window.DummyData ? window.DummyData.getSessions() : [];
            const costPerSession = 50;

            const rows = users.slice(0, 20).map(user => {
                const userSessions = sessions.filter(s => s.userId === user.userId);
                const totalRevenue = userSessions.length * costPerSession;
                const lastSessionDate = userSessions.length ? userSessions[userSessions.length - 1].sessionDate : 'None';

                return {
                    'Patient ID': user.userId,
                    'Name': user.name,
                    'Sessions': userSessions.length,
                    'Cost/Session': '$' + costPerSession,
                    'Total Revenue': '$' + totalRevenue.toLocaleString(),
                    'Payment Status': totalRevenue > 0 ? 'Paid' : 'Pending',
                    'Last Session': lastSessionDate
                };
            });
            return createTable('💰 Revenue & Billing - 20 Patients', ['Patient ID', 'Name', 'Sessions', 'Cost/Session', 'Total Revenue', 'Payment Status', 'Last Session'], rows);
        } catch (err) {
            console.error('Financial Team Error:', err);
            return '<p style="color: red;">Error loading billing data</p>';
        }
    }

    // System Administrator - Database Status
    async function getSystemAdminTable() {
        try {
            const users = window.DummyData ? window.DummyData.getUsers() : [];
            const logs = window.DummyData ? window.DummyData.getLogs() : [];

            const rows = users.slice(0, 20).map(user => {
                const userLogs = logs.filter(l => l.patientId === user.userId);
                const dataSize = userLogs.length ? Math.round(JSON.stringify(userLogs).length / 1024) : 0;
                const firstEntry = userLogs.length ? userLogs[0].date : 'N/A';
                const lastEntry = userLogs.length ? userLogs[userLogs.length - 1].date : 'N/A';

                return {
                    'Patient ID': user.userId,
                    'Records': userLogs.length,
                    'Data Size (KB)': dataSize,
                    'First Entry': firstEntry,
                    'Last Entry': lastEntry,
                    'Status': 'Active',
                    'Backup': 'Completed'
                };
            });
            return createTable('⚙️ Database Status - Patient Data Storage', ['Patient ID', 'Records', 'Data Size (KB)', 'First Entry', 'Last Entry', 'Status', 'Backup'], rows);
        } catch (err) {
            console.error('System Admin Error:', err);
            return '<p style="color: red;">Error loading database status</p>';
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

window.DesignationDataTables = DesignationDataTables;
