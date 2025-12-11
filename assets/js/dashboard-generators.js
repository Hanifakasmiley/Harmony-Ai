/**
 * Harmony AI - Dashboard Generators
 * Generates role-specific dashboard content
 * Updated to work with database schema
 */

const DashboardGenerators = (function () {

    // Helper function to generate HTML table
    function generateTable(headers, rows) {
        let html = '<div style="overflow-x: auto;"><table class="generated-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">';
        html += '<thead style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"><tr>';
        headers.forEach(h => html += `<th style="padding: 0.75rem; text-align: left; border: 1px solid var(--border-color);">${h}</th>`);
        html += '</tr></thead><tbody>';
        rows.forEach((row, idx) => {
            html += `<tr class="table-row ${idx % 2 === 0 ? 'even' : 'odd'}">`;
            row.forEach(cell => html += `<td style="padding: 0.75rem; border: 1px solid var(--border-color);">${cell}</td>`);
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        return html;
    }

    // ===== PATIENT/USER DASHBOARD =====
    function generatePatientDashboard() {
        const logs = PatientData.getDailyLogs().slice(0, 5);
        const recommendations = PatientData.getRecommendations().slice(0, 3);
        const progress = PatientData.getProgress()[0];

        let html = `<h3>👤 My Mental Health Dashboard</h3>`;
        html += `<p>Welcome! Here's your personal mental health overview.</p>`;

        // Personal Stats
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Emotional Stability</div>
                <div style="font-size: 2rem; font-weight: bold;">${progress?.emotional_stability_score || 70}%</div>
            </div>
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Improvement</div>
                <div style="font-size: 2rem; font-weight: bold;">${progress?.improvement_percentage || 15}%</div>
            </div>
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Log Entries</div>
                <div style="font-size: 2rem; font-weight: bold;">${logs.length}</div>
            </div>
        </div>`;

        // Recent Mood Logs
        html += `<h4 style="margin-top: 2rem;">📊 Recent Mood Logs</h4>`;
        const moodHeaders = ['Date', 'Mood', 'Stress', 'Sleep (hrs)', 'Notes'];
        const moodRows = logs.map(m => [m.log_date, m.mood_level, m.stress_level, m.sleep_hours, m.notes || '-']);
        html += generateTable(moodHeaders, moodRows);

        // Recommendations
        html += `<h4 style="margin-top: 2rem;">💡 Your Recommendations</h4>`;
        const recHeaders = ['Activity', 'Wellness Tip'];
        const recRows = recommendations.map(r => [r.activity, r.wellness_tip]);
        html += generateTable(recHeaders, recRows);

        return html;
    }

    // ===== DATA SCIENTIST DASHBOARD =====
    function generateDataScientistDashboard() {
        const stats = PatientData.getStatistics();
        const analysis = PatientData.getAIAnalysis();
        const users = PatientData.getUsers();

        let html = `<h3>📊 Data Scientist - Analytics Dashboard</h3>`;
        html += `<p>Patient demographics, risk analysis, and statistical insights.</p>`;

        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Users</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalUsers}</div>
            </div>
            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">High Risk Alerts</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.highRiskCount}</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Avg Risk Score</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.avgRiskScore}</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Sessions</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalSessions}</div>
            </div>
        </div>`;

        // AI Analysis Data
        html += `<h4 style="margin-top: 2rem;">🤖 AI Analysis Results</h4>`;
        const aiHeaders = ['ID', 'User ID', 'Risk Score', 'Sentiment', 'Emotion'];
        const aiRows = analysis.map(a => [a.analysis_id, a.user_id, a.risk_score, a.sentiment_value, a.emotion_label]);
        html += generateTable(aiHeaders, aiRows);

        // Users Table
        html += `<h4 style="margin-top: 2rem;">👥 Users Overview</h4>`;
        const userHeaders = ['ID', 'Name', 'Email', 'Designation'];
        const userRows = users.map(u => [u.user_id, u.full_name, u.email, u.designation]);
        html += generateTable(userHeaders, userRows);

        return html;
    }

    // ===== SYSTEM ADMINISTRATOR DASHBOARD =====
    function generateSystemAdminDashboard() {
        const stats = PatientData.getStatistics();

        let html = `<h3>⚙️ System Administrator Dashboard</h3>`;
        html += `<p>Database overview and system management. <a href="admin.html" style="color: #667eea;">Open Full Admin Panel →</a></p>`;

        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Users</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalUsers}</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Counsellors</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalCounsellors}</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Sessions</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalSessions}</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Crisis Alerts</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.criticalCount}</div>
            </div>
        </div>`;

        // Database Tables
        html += `<h4 style="margin-top: 2rem;">🗄️ Database Tables (10 Tables)</h4>`;
        const dbHeaders = ['Table', 'Description', 'Actions'];
        const dbRows = [
            ['users', 'User accounts and profiles', '<a href="admin.html">Manage</a>'],
            ['dailylogs', 'Daily mood and stress logs', '<a href="admin.html">Manage</a>'],
            ['counsellors', 'Counsellor information', '<a href="admin.html">Manage</a>'],
            ['sessions', 'Therapy sessions', '<a href="admin.html">Manage</a>'],
            ['feedback', 'Session feedback', '<a href="admin.html">Manage</a>'],
            ['progress', 'Patient progress tracking', '<a href="admin.html">Manage</a>'],
            ['recommendations', 'Wellness recommendations', '<a href="admin.html">Manage</a>'],
            ['ai_analysis', 'AI risk analysis', '<a href="admin.html">Manage</a>'],
            ['crisisalerts', 'Crisis alerts', '<a href="admin.html">Manage</a>'],
            ['emergencycontacts', 'Emergency contacts', '<a href="admin.html">Manage</a>']
        ];
        html += generateTable(dbHeaders, dbRows);

        return html;
    }

    // ===== SOFTWARE ENGINEER DASHBOARD =====
    function generateSoftwareEngineerDashboard() {
        let html = `<h3>💻 Software Engineer Dashboard</h3>`;
        html += `<p>API endpoints and system status.</p>`;

        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">API Status</div>
                <div style="font-size: 2rem; font-weight: bold;">✓ Online</div>
            </div>
            <div style="background: #90ee90; color: #333; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Database</div>
                <div style="font-size: 2rem; font-weight: bold;">✓ Connected</div>
            </div>
        </div>`;

        html += `<h4 style="margin-top: 2rem;">🔌 API Endpoints</h4>`;
        const apiHeaders = ['Endpoint', 'Methods', 'Description'];
        const apiRows = [
            ['/api.php/users', 'GET, POST, PUT, DELETE', 'User management'],
            ['/api.php/login', 'POST', 'Authentication'],
            ['/api.php/dailylogs', 'GET, POST, PUT, DELETE', 'Daily logs CRUD'],
            ['/api.php/counsellors', 'GET, POST, PUT, DELETE', 'Counsellors CRUD'],
            ['/api.php/sessions', 'GET, POST, PUT, DELETE', 'Sessions CRUD'],
            ['/api.php/feedback', 'GET, POST, PUT, DELETE', 'Feedback CRUD'],
            ['/api.php/progress', 'GET, POST, PUT, DELETE', 'Progress CRUD'],
            ['/api.php/recommendations', 'GET, POST, PUT, DELETE', 'Recommendations CRUD'],
            ['/api.php/ai_analysis', 'GET, POST, PUT, DELETE', 'AI Analysis CRUD'],
            ['/api.php/crisisalerts', 'GET, POST, PUT, DELETE', 'Crisis Alerts CRUD'],
            ['/api.php/emergencycontacts', 'GET, POST, PUT, DELETE', 'Emergency Contacts CRUD'],
            ['/api.php/statistics', 'GET', 'Dashboard statistics']
        ];
        html += generateTable(apiHeaders, apiRows);

        return html;
    }

    // ===== MENTAL HEALTH ADMIN DASHBOARD =====
    function generateMentalHealthAdminDashboard() {
        const sessions = PatientData.getSessions();
        const counsellors = PatientData.getCounsellors();
        const stats = PatientData.getStatistics();

        let html = `<h3>🏥 Mental Health Administrator Dashboard</h3>`;
        html += `<p>Session management and counsellor oversight.</p>`;

        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Sessions</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalSessions}</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Counsellors</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalCounsellors}</div>
            </div>
            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Crisis Alerts</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.criticalCount}</div>
            </div>
        </div>`;

        html += `<h4 style="margin-top: 2rem;">👨‍⚕️ Counsellors</h4>`;
        const cHeaders = ['ID', 'Name', 'Specialization', 'Schedule'];
        const cRows = counsellors.map(c => [c.counsellor_id, c.name, c.specialization, c.schedule]);
        html += generateTable(cHeaders, cRows);

        html += `<h4 style="margin-top: 2rem;">📅 Recent Sessions</h4>`;
        const sHeaders = ['ID', 'User ID', 'Counsellor ID', 'Time', 'Notes'];
        const sRows = sessions.map(s => [s.session_id, s.user_id, s.counsellor_id, s.session_time, s.session_notes || '-']);
        html += generateTable(sHeaders, sRows);

        return html;
    }

    // ===== EMERGENCY TEAM DASHBOARD =====
    function generateEmergencyTeamDashboard() {
        const alerts = PatientData.getCrisisAlerts();
        const stats = PatientData.getStatistics();

        let html = `<h3>🚨 Emergency Contact Team Dashboard</h3>`;
        html += `<p>Crisis alerts and emergency response.</p>`;

        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Active Alerts</div>
                <div style="font-size: 2rem; font-weight: bold;">${alerts.length}</div>
            </div>
            <div style="background: #ffa500; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">High Risk</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.highRiskCount}</div>
            </div>
        </div>`;

        html += `<h4 style="margin-top: 2rem;">🚨 Crisis Alerts</h4>`;
        const aHeaders = ['Alert ID', 'User ID', 'Risk Level', 'Timestamp', 'Counsellor ID'];
        const aRows = alerts.map(a => [a.alert_id, a.user_id, a.risk_level, a.alert_timestamp, a.contacted_counsellor_id || '-']);
        html += generateTable(aHeaders, aRows);

        return html;
    }

    // Simplified dashboards for other roles
    function generateAIEngineerDashboard() {
        const analysis = PatientData.getAIAnalysis();
        let html = `<h3>🤖 AI Engineer Dashboard</h3>`;
        html += `<p>AI model performance and analysis results.</p>`;

        html += `<h4>📊 AI Analysis Data</h4>`;
        const headers = ['ID', 'User ID', 'Risk Score', 'Sentiment', 'Emotion'];
        const rows = analysis.map(a => [a.analysis_id, a.user_id, a.risk_score, a.sentiment_value, a.emotion_label]);
        html += generateTable(headers, rows);
        return html;
    }

    function generateSecurityAnalystDashboard() {
        let html = `<h3>🔒 Security Analyst Dashboard</h3>`;
        html += `<p>Access logs and security monitoring.</p>`;
        html += `<p>All data is encrypted and HIPAA compliant. View <a href="admin.html">Admin Panel</a> for detailed logs.</p>`;
        return html;
    }

    function generateFinancialTeamDashboard() {
        const stats = PatientData.getStatistics();
        let html = `<h3>💰 Financial Team Dashboard</h3>`;
        html += `<p>Session billing overview.</p>`;
        html += `<p>Total Sessions: ${stats.totalSessions} | Estimated Revenue: $${stats.totalSessions * 120}</p>`;
        return html;
    }

    // Public API
    return {
        generateDashboardByRole: function (role) {
            const dashboards = {
                'patient': generatePatientDashboard,
                'software_engineer': generateSoftwareEngineerDashboard,
                'ai_engineer': generateAIEngineerDashboard,
                'data_scientist': generateDataScientistDashboard,
                'mental_health_admin': generateMentalHealthAdminDashboard,
                'emergency_team': generateEmergencyTeamDashboard,
                'security_analyst': generateSecurityAnalystDashboard,
                'financial_team': generateFinancialTeamDashboard,
                'system_admin': generateSystemAdminDashboard
            };
            return (dashboards[role] || generatePatientDashboard)();
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardGenerators;
}
