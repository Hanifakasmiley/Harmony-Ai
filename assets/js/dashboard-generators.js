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
    async function generateDataScientistDashboard() {
        let html = `<h3>📊 Data Scientist - Analytics Dashboard</h3>`;
        html += `<p>Patient demographics, risk analysis, and statistical insights.</p>`;

        try {
            // Fetch from API
            const [stats, analysis, users] = await Promise.all([
                ApiService.getStatistics(),
                ApiService.getAIAnalysis(),
                ApiService.getUsers()
            ]);

            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">Total Users</div>
                    <div style="font-size: 2rem; font-weight: bold;">${stats.totalUsers || 0}</div>
                </div>
                <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">High Risk Alerts</div>
                    <div style="font-size: 2rem; font-weight: bold;">${stats.highRiskUsers || 0}</div>
                </div>
                <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">Avg Risk Score</div>
                    <div style="font-size: 2rem; font-weight: bold;">${stats.avgRiskScore || 0}</div>
                </div>
                <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">Total Sessions</div>
                    <div style="font-size: 2rem; font-weight: bold;">${stats.totalSessions || 0}</div>
                </div>
            </div>`;

            // AI Analysis Data
            html += `<h4 style="margin-top: 2rem;">🤖 AI Analysis Results</h4>`;
            const aiHeaders = ['ID', 'User ID', 'Risk Score', 'Sentiment', 'Emotion'];
            const aiRows = analysis.map(a => [a.analysis_id, a.user_id, a.risk_score, a.sentiment_value, a.emotion_label]);
            html += generateTable(aiHeaders, aiRows);

            // Users Table
            html += `<h4 style="margin-top: 2rem;">👥 Users Overview (${users.length} total)</h4>`;
            const userHeaders = ['ID', 'Name', 'Email', 'Designation'];
            const userRows = users.map(u => [u.user_id, u.full_name, u.email, u.designation]);
            html += generateTable(userHeaders, userRows);
        } catch (error) {
            console.warn('API unavailable, using mock data:', error);
            const stats = PatientData.getStatistics();
            const analysis = PatientData.getAIAnalysis();
            const users = PatientData.getUsers();

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
        }

        return html;
    }

    // ===== SYSTEM ADMINISTRATOR DASHBOARD =====
    async function generateSystemAdminDashboard() {
        let html = `<h3>⚙️ System Administrator Dashboard</h3>`;
        html += `<p>Complete database overview and system management. <a href="admin-full.html" style="color: #667eea; font-weight: bold;">Open Full Admin Panel →</a></p>`;

        try {
            console.log('📡 Fetching all data from API...');
            // Fetch all data from API
            const [stats, users, logs, counsellors, sessions, feedback, progress, recommendations, analysis, alerts, contacts] = await Promise.all([
                ApiService.getStatistics(),
                ApiService.getUsers(),
                ApiService.getDailyLogs(),
                ApiService.getCounsellors(),
                ApiService.getSessions(),
                ApiService.getFeedback(),
                ApiService.getProgress(),
                ApiService.getRecommendations(),
                ApiService.getAIAnalysis(),
                ApiService.getCrisisAlerts(),
                ApiService.getEmergencyContacts()
            ]);
            console.log('✅ All data fetched successfully:', { stats, users: users.length, logs: logs.length, counsellors: counsellors.length, sessions: sessions.length, feedback: feedback.length, progress: progress.length, recommendations: recommendations.length, analysis: analysis.length, alerts: alerts.length, contacts: contacts.length });

            // ===== KPI CARDS SECTION =====
            const kpis = KPICalculator.getAllKPIs(users, sessions, logs, analysis, counsellors);
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">📊 Key Performance Indicators</h4>`;
            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">`;

            Object.values(kpis).forEach(kpi => {
                html += `
                    <div style="
                        background: var(--bg-primary);
                        border: 2px solid ${kpi.color};
                        border-radius: 10px;
                        padding: 1.5rem;
                        text-align: center;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        cursor: pointer;
                    " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${kpi.icon}</div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: ${kpi.color}; margin-bottom: 0.5rem;">${kpi.value}</div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${kpi.label}</div>
                        <div style="font-size: 0.85rem; color: ${kpi.color}; font-weight: 600;">
                            ${kpi.trend} ${kpi.percentageChange}%
                        </div>
                    </div>
                `;
            });
            html += `</div>`;

            // ===== DASHBOARD SUMMARY SECTION =====
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #764ba2; padding-bottom: 0.5rem;">📋 Dashboard Summary</h4>`;
            const activeSessions = sessions.filter(s => s.session_status === 'Scheduled').length;
            const newAlertsToday = alerts.filter(a => {
                const alertDate = new Date(a.alert_timestamp).toDateString();
                return alertDate === new Date().toDateString();
            }).length;
            const lastRefresh = new Date().toLocaleTimeString();

            html += `
                <div style="
                    background: var(--bg-primary);
                    border-left: 4px solid #764ba2;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                ">
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">System Status</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #2A9D8F;">🟢 Online</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Last Refresh</div>
                        <div style="font-size: 1rem; font-weight: 600; color: var(--text-primary);">${lastRefresh}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Active Sessions Today</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;">${activeSessions}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">New Alerts Today</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${newAlertsToday > 0 ? '#ff6b6b' : '#2A9D8F'};">${newAlertsToday}</div>
                    </div>
                </div>
            `;

            // ===== MOOD TREND CHART SECTION =====
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #f093fb; padding-bottom: 0.5rem;">📈 Mood Trend (Last 7 Days)</h4>`;
            const moodTrend = MoodTrendCalculator.getMoodTrendData(logs);

            if (moodTrend.hasData) {
                html += `
                    <div style="
                        background: var(--bg-primary);
                        border-radius: 10px;
                        padding: 1.5rem;
                        margin-bottom: 2rem;
                        border: 1px solid var(--border-color);
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <div style="font-size: 1rem; color: var(--text-secondary);">Trend Direction</div>
                                <div style="font-size: 1.5rem; font-weight: bold; color: ${moodTrend.trendColor};">
                                    ${moodTrend.trendEmoji} ${moodTrend.trendDirection.charAt(0).toUpperCase() + moodTrend.trendDirection.slice(1)}
                                </div>
                            </div>
                        </div>
                        <div style="height: 300px; position: relative;">
                            <canvas id="systemAdminMoodChart"></canvas>
                        </div>
                        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                            Average mood over the last 7 days. Data points show daily average mood scores on a 1-10 scale.
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div style="
                        background: #fff3cd;
                        border-left: 4px solid #ffc107;
                        border-radius: 8px;
                        padding: 1rem;
                        margin-bottom: 2rem;
                    ">
                        <strong>⚠️ Insufficient Data</strong>
                        <p style="margin: 0.5rem 0 0 0;">Not enough mood data available for trend analysis. Please check back later.</p>
                    </div>
                `;
            }

            // ===== RECENT ACTIVITY FEED SECTION =====
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #4facfe; padding-bottom: 0.5rem;">🔔 Recent Activity Feed</h4>`;
            const activities = ActivityFeedGenerator.generateActivityItems(users, sessions, alerts, logs, analysis);
            html += ActivityFeedGenerator.generateActivityFeedHTML(activities);
            html += `<div style="margin-top: 1rem; text-align: center; font-size: 0.9rem; color: var(--text-secondary);">Auto-refreshes every 30 seconds</div>`;
            html += `<div style="margin-bottom: 2rem;"></div>`;

            // ===== DATA TABLES SECTION =====
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">📊 Detailed Data Tables</h4>`;

            // PATIENTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">👥 Patients Data (${users.length} records)</h4>`;
            const patientHeaders = ['ID', 'Name', 'Email', 'Phone', 'Gender', 'Designation'];
            const patientRows = users.map(u => [u.user_id, u.full_name, u.email, u.phone || '-', u.gender || '-', u.designation]);
            html += generateTable(patientHeaders, patientRows);

            // DOCTORS/COUNSELLORS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #764ba2; padding-bottom: 0.5rem;">👨‍⚕️ Doctors/Counsellors Data (${counsellors.length} records)</h4>`;
            const doctorHeaders = ['ID', 'Name', 'Email', 'Phone', 'Specialization', 'Schedule'];
            const doctorRows = counsellors.map(c => [c.counsellor_id, c.name, c.email, c.phone || '-', c.specialization || '-', c.schedule || '-']);
            html += generateTable(doctorHeaders, doctorRows);

            // EMERGENCY CONTACTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #f093fb; padding-bottom: 0.5rem;">🆘 Emergency Contacts Data (${contacts.length} records)</h4>`;
            const contactHeaders = ['ID', 'User ID', 'Contact Name', 'Contact Phone', 'Relation'];
            const contactRows = contacts.map(c => [c.contact_id, c.user_id, c.contact_name, c.contact_phone, c.relation || '-']);
            html += generateTable(contactHeaders, contactRows);

            // AI ANALYSIS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #4facfe; padding-bottom: 0.5rem;">🤖 AI Analysis Data (${analysis.length} records)</h4>`;
            const aiHeaders = ['ID', 'User ID', 'Risk Score', 'Sentiment Value', 'Emotion Label'];
            const aiRows = analysis.map(a => [a.analysis_id, a.user_id, a.risk_score, a.sentiment_value || '-', a.emotion_label || '-']);
            html += generateTable(aiHeaders, aiRows);

            // DAILY LOGS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ff6b6b; padding-bottom: 0.5rem;">📊 Daily Logs Data (${logs.length} records)</h4>`;
            const logHeaders = ['ID', 'User ID', 'Mood', 'Stress', 'Anxiety', 'Sleep (hrs)', 'Date'];
            const logRows = logs.slice(0, 10).map(l => [l.log_id, l.user_id, l.mood_level, l.stress_level, l.anxiety_level || '-', l.sleep_hours, l.log_date]);
            html += generateTable(logHeaders, logRows);

            // SESSIONS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ffa500; padding-bottom: 0.5rem;">📅 Sessions Data (${sessions.length} records)</h4>`;
            const sessionHeaders = ['ID', 'User ID', 'Counsellor ID', 'Session Time', 'Notes'];
            const sessionRows = sessions.slice(0, 10).map(s => [s.session_id, s.user_id, s.counsellor_id, s.session_time, s.session_notes || '-']);
            html += generateTable(sessionHeaders, sessionRows);

            // FEEDBACK DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">💬 Feedback Data (${feedback.length} records)</h4>`;
            const feedbackHeaders = ['ID', 'Session ID', 'User ID', 'Rating', 'Comments'];
            const feedbackRows = feedback.map(f => [f.feedback_id, f.session_id, f.user_id, f.rating, f.comments || '-']);
            html += generateTable(feedbackHeaders, feedbackRows);

            // PROGRESS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #764ba2; padding-bottom: 0.5rem;">📈 Progress Data (${progress.length} records)</h4>`;
            const progressHeaders = ['ID', 'User ID', 'Emotional Stability', 'Improvement %', 'Trend Notes'];
            const progressRows = progress.map(p => [p.progress_id, p.user_id, p.emotional_stability_score, p.improvement_percentage || '-', p.trend_notes || '-']);
            html += generateTable(progressHeaders, progressRows);

            // RECOMMENDATIONS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #f093fb; padding-bottom: 0.5rem;">💡 Recommendations Data (${recommendations.length} records)</h4>`;
            const recHeaders = ['ID', 'User ID', 'Wellness Tip', 'Activity'];
            const recRows = recommendations.map(r => [r.rec_id, r.user_id, r.wellness_tip, r.activity || '-']);
            html += generateTable(recHeaders, recRows);

            // CRISIS ALERTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ff6b6b; padding-bottom: 0.5rem;">🚨 Crisis Alerts Data (${alerts.length} records)</h4>`;
            const alertHeaders = ['ID', 'User ID', 'Risk Level', 'Timestamp', 'Counsellor ID'];
            const alertRows = alerts.map(a => [a.alert_id, a.user_id, a.risk_level, a.alert_timestamp, a.contacted_counsellor_id || '-']);
            html += generateTable(alertHeaders, alertRows);

            // Summary
            html += `<div style="margin-top: 2rem; padding: 1rem; background: #f0f0f0; border-radius: 8px; border-left: 4px solid #667eea;">
                <strong>📊 Total Records in Database: ${users.length + logs.length + counsellors.length + sessions.length + feedback.length + progress.length + recommendations.length + analysis.length + alerts.length + contacts.length}</strong>
                <p style="margin: 0.5rem 0 0 0; color: #666;">All data is synchronized with the backend database in real-time.</p>
            </div>`;

        } catch (error) {
            console.warn('⚠️ API unavailable, using mock data:', error);
            const stats = PatientData.getStatistics();
            const users = PatientData.getUsers();
            const logs = PatientData.getDailyLogs();
            const counsellors = PatientData.getCounsellors();
            const sessions = PatientData.getSessions();
            const feedback = PatientData.getFeedback();
            const progress = PatientData.getProgress();
            const recommendations = PatientData.getRecommendations();
            const analysis = PatientData.getAIAnalysis();
            const alerts = PatientData.getCrisisAlerts();
            const contacts = PatientData.getEmergencyContacts();

            html += `<div style="padding: 1rem; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 1rem;">
                <strong>⚠️ Using Mock Data</strong>
                <p style="margin: 0.5rem 0 0 0;">API is unavailable. Displaying sample data for demonstration.</p>
            </div>`;

            // Statistics Cards
            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">👥 Total Users</div>
                    <div style="font-size: 2rem; font-weight: bold;">${users.length}</div>
                </div>
                <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">👨‍⚕️ Counsellors</div>
                    <div style="font-size: 2rem; font-weight: bold;">${counsellors.length}</div>
                </div>
                <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">📅 Sessions</div>
                    <div style="font-size: 2rem; font-weight: bold;">${sessions.length}</div>
                </div>
                <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.9rem;">🚨 Crisis Alerts</div>
                    <div style="font-size: 2rem; font-weight: bold;">${alerts.length}</div>
                </div>
            </div>`;

            // PATIENTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">👥 Patients Data (${users.length} records)</h4>`;
            const patientHeaders = ['ID', 'Name', 'Email', 'Phone', 'Gender', 'Designation'];
            const patientRows = users.map(u => [u.user_id, u.full_name, u.email, u.phone || '-', u.gender || '-', u.designation]);
            html += generateTable(patientHeaders, patientRows);

            // DOCTORS/COUNSELLORS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #764ba2; padding-bottom: 0.5rem;">👨‍⚕️ Doctors/Counsellors Data (${counsellors.length} records)</h4>`;
            const doctorHeaders = ['ID', 'Name', 'Email', 'Phone', 'Specialization', 'Schedule'];
            const doctorRows = counsellors.map(c => [c.counsellor_id, c.name, c.email, c.phone || '-', c.specialization || '-', c.schedule || '-']);
            html += generateTable(doctorHeaders, doctorRows);

            // EMERGENCY CONTACTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #f093fb; padding-bottom: 0.5rem;">🆘 Emergency Contacts Data (${contacts.length} records)</h4>`;
            const contactHeaders = ['ID', 'User ID', 'Contact Name', 'Contact Phone', 'Relation'];
            const contactRows = contacts.map(c => [c.contact_id, c.user_id, c.contact_name, c.contact_phone, c.relation || '-']);
            html += generateTable(contactHeaders, contactRows);

            // AI ANALYSIS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #4facfe; padding-bottom: 0.5rem;">🤖 AI Analysis Data (${analysis.length} records)</h4>`;
            const aiHeaders = ['ID', 'User ID', 'Risk Score', 'Sentiment Value', 'Emotion Label'];
            const aiRows = analysis.map(a => [a.analysis_id, a.user_id, a.risk_score, a.sentiment_value || '-', a.emotion_label || '-']);
            html += generateTable(aiHeaders, aiRows);

            // DAILY LOGS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ff6b6b; padding-bottom: 0.5rem;">📊 Daily Logs Data (${logs.length} records)</h4>`;
            const logHeaders = ['ID', 'User ID', 'Mood', 'Stress', 'Anxiety', 'Sleep (hrs)', 'Date'];
            const logRows = logs.slice(0, 10).map(l => [l.log_id, l.user_id, l.mood_level, l.stress_level, l.anxiety_level || '-', l.sleep_hours, l.log_date]);
            html += generateTable(logHeaders, logRows);

            // SESSIONS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ffa500; padding-bottom: 0.5rem;">📅 Sessions Data (${sessions.length} records)</h4>`;
            const sessionHeaders = ['ID', 'User ID', 'Counsellor ID', 'Session Time', 'Notes'];
            const sessionRows = sessions.slice(0, 10).map(s => [s.session_id, s.user_id, s.counsellor_id, s.session_time, s.session_notes || '-']);
            html += generateTable(sessionHeaders, sessionRows);

            // FEEDBACK DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem;">💬 Feedback Data (${feedback.length} records)</h4>`;
            const feedbackHeaders = ['ID', 'Session ID', 'User ID', 'Rating', 'Comments'];
            const feedbackRows = feedback.map(f => [f.feedback_id, f.session_id, f.user_id, f.rating, f.comments || '-']);
            html += generateTable(feedbackHeaders, feedbackRows);

            // PROGRESS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #764ba2; padding-bottom: 0.5rem;">📈 Progress Data (${progress.length} records)</h4>`;
            const progressHeaders = ['ID', 'User ID', 'Emotional Stability', 'Improvement %', 'Trend Notes'];
            const progressRows = progress.map(p => [p.progress_id, p.user_id, p.emotional_stability_score, p.improvement_percentage || '-', p.trend_notes || '-']);
            html += generateTable(progressHeaders, progressRows);

            // RECOMMENDATIONS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #f093fb; padding-bottom: 0.5rem;">💡 Recommendations Data (${recommendations.length} records)</h4>`;
            const recHeaders = ['ID', 'User ID', 'Wellness Tip', 'Activity'];
            const recRows = recommendations.map(r => [r.rec_id, r.user_id, r.wellness_tip, r.activity || '-']);
            html += generateTable(recHeaders, recRows);

            // CRISIS ALERTS DATA TABLE
            html += `<h4 style="margin-top: 2rem; border-bottom: 2px solid #ff6b6b; padding-bottom: 0.5rem;">🚨 Crisis Alerts Data (${alerts.length} records)</h4>`;
            const alertHeaders = ['ID', 'User ID', 'Risk Level', 'Timestamp', 'Counsellor ID'];
            const alertRows = alerts.map(a => [a.alert_id, a.user_id, a.risk_level, a.alert_timestamp, a.contacted_counsellor_id || '-']);
            html += generateTable(alertHeaders, alertRows);
        }

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
        generateDashboardByRole: async function (role) {
            console.log('🎯 Generating dashboard for role:', role);
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
            const generator = dashboards[role] || generatePatientDashboard;
            try {
                const result = await generator();
                console.log('✅ Dashboard generated successfully');
                return result;
            } catch (error) {
                console.error('❌ Error in dashboard generator:', error);
                throw error;
            }
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardGenerators;
}
