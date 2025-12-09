const DashboardGenerators = (function () {

    // Helper function to generate HTML table
    function generateTable(headers, rows) {
        let html = '<div style="overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">';
        html += '<thead style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"><tr>';
        headers.forEach(h => html += `<th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">${h}</th>`);
        html += '</tr></thead><tbody>';
        rows.forEach((row, idx) => {
            html += `<tr style="background: ${idx % 2 === 0 ? '#f5f5f5' : 'white'}; border: 1px solid #ddd;">`;
            row.forEach(cell => html += `<td style="padding: 0.75rem; border: 1px solid #ddd;">${cell}</td>`);
            html += '</tr>';
        });
        html += '</tbody></table></div>';
        return html;
    }

    // ===== 1. PATIENT/USER DASHBOARD =====
    function generatePatientDashboard() {
        const data = PatientData.getPatients();
        const currentUser = data[0]; // First patient as example
        const counselorParts = (currentUser && currentUser.counselor) ? currentUser.counselor.split(' ') : [''];
        const counselorLast = counselorParts.length > 1 ? counselorParts.slice(1).join(' ') : counselorParts[0];
        const moodLogs = PatientData.getMoodLogs().filter(m => m.patientId === currentUser.id).slice(0, 7);
        const sessions = PatientData.getSessions().filter(s => s.patientId === currentUser.id).slice(0, 3);
        const recommendations = PatientData.getRecommendations().filter(r => r.patientId === currentUser.id).slice(0, 3);
        const progress = PatientData.getProgress().filter(p => p.patientId === currentUser.id)[0];

        let html = `<h3>👤 My Mental Health Dashboard</h3>`;
        html += `<p>Welcome, ${currentUser.name}! Here's your personal mental health overview.</p>`;

        // Personal Stats
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Risk Score</div>
                <div style="font-size: 2rem; font-weight: bold;">${currentUser.riskScore}</div>
                <div style="font-size: 0.85rem; margin-top: 0.5rem; color: ${currentUser.riskScore > 75 ? '#ff6b6b' : currentUser.riskScore > 60 ? '#ffa500' : '#90ee90'};">Status: ${currentUser.status}</div>
            </div>
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Sessions Completed</div>
                <div style="font-size: 2rem; font-weight: bold;">${sessions.length}</div>
                <div style="font-size: 0.85rem; margin-top: 0.5rem;">With Dr. ${counselorLast}</div>
            </div>
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem; border-radius: 8px;">
                <div style="font-size: 0.9rem; opacity: 0.9;">Improvement</div>
                <div style="font-size: 2rem; font-weight: bold;">${progress?.improvementPercentage || 0}%</div>
                <div style="font-size: 0.85rem; margin-top: 0.5rem;">This Month</div>
            </div>
        </div>`;

        // Recent Mood Logs
        html += `<h4 style="margin-top: 2rem;">📊 Recent Mood Logs (Last 7 Days)</h4>`;
        const moodHeaders = ['Date', 'Mood', 'Stress Level', 'Anxiety', 'Sleep Hours'];
        const moodRows = moodLogs.map(m => [m.date, m.mood, m.stressLevel, m.anxietyLevel, m.sleepHours]);
        html += generateTable(moodHeaders, moodRows);

        // Upcoming Sessions
        html += `<h4 style="margin-top: 2rem;">📅 Upcoming Sessions</h4>`;
        const sessionHeaders = ['Date', 'Time', 'Type', 'Counselor', 'Status'];
        const sessionRows = sessions.map(s => [s.date, s.time, s.type, s.counselorName, s.status]);
        html += generateTable(sessionHeaders, sessionRows);

        // Personalized Recommendations
        html += `<h4 style="margin-top: 2rem;">💡 Your Personalized Recommendations</h4>`;
        const recHeaders = ['Activity', 'Category', 'Frequency', 'Adherence'];
        const recRows = recommendations.map(r => [r.activity, r.category, r.frequency, `${r.adherence}%`]);
        html += generateTable(recHeaders, recRows);

        return html;
    }

    // ===== 2. SOFTWARE ENGINEER DASHBOARD =====
    function generateSoftwareEngineerDashboard() {
        const stats = PatientData.getStatistics();
        const patients = PatientData.getPatients();

        let html = `<h3>💻 Software Engineer - System Health Dashboard</h3>`;
        html += `<p>Real-time system performance and API logs from the Harmony AI platform.</p>`;

        // System Metrics
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Active Users</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalPatients}</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">API Requests/Min</div>
                <div style="font-size: 2rem; font-weight: bold;">1.2K</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">System Uptime</div>
                <div style="font-size: 2rem; font-weight: bold;">99.9%</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">DB Response Time</div>
                <div style="font-size: 2rem; font-weight: bold;">45ms</div>
            </div>
        </div>`;

        // System Log Summary
        html += `<h4 style="margin-top: 2rem;">📋 System Logs Summary</h4>`;
        const logHeaders = ['Timestamp', 'Service', 'Event', 'Status', 'Response Time'];
        const logRows = [
            ['2025-11-15 14:32', 'Auth Service', 'User Login', '200 OK', '12ms'],
            ['2025-11-15 14:31', 'Data API', 'Patient Query', '200 OK', '35ms'],
            ['2025-11-15 14:30', 'Mood Logging', 'Record Created', '201 Created', '28ms'],
            ['2025-11-15 14:29', 'AI Service', 'Risk Analysis', '200 OK', '156ms'],
            ['2025-11-15 14:28', 'Session API', 'Schedule Updated', '200 OK', '42ms']
        ];
        html += generateTable(logHeaders, logRows);

        // Performance Metrics
        html += `<h4 style="margin-top: 2rem;">⚙️ Performance Metrics</h4>`;
        const perfHeaders = ['Metric', 'Current', 'Target', 'Status'];
        const perfRows = [
            ['CPU Usage', '45%', '< 70%', '✓ Normal'],
            ['Memory Usage', '62%', '< 80%', '✓ Normal'],
            ['Disk I/O', '28%', '< 60%', '✓ Normal'],
            ['Network Latency', '12ms', '< 50ms', '✓ Good'],
            ['Cache Hit Rate', '94%', '> 90%', '✓ Excellent']
        ];
        html += generateTable(perfHeaders, perfRows);

        return html;
    }

    // ===== 3. AI ENGINEER DASHBOARD =====
    function generateAIEngineerDashboard() {
        const analysis = PatientData.getAIAnalysis().slice(0, 10);
        const stats = PatientData.getStatistics();

        let html = `<h3>🤖 AI Engineer - Model Performance Dashboard</h3>`;
        html += `<p>AI Model Analytics, Accuracy Metrics, and Risk Prediction Performance.</p>`;

        // Model Performance Metrics
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Model Accuracy</div>
                <div style="font-size: 2rem; font-weight: bold;">94.2%</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Precision Score</div>
                <div style="font-size: 2rem; font-weight: bold;">91.8%</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">F1 Score</div>
                <div style="font-size: 2rem; font-weight: bold;">0.928</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Predictions Today</div>
                <div style="font-size: 2rem; font-weight: bold;">2.3K</div>
            </div>
        </div>`;

        // Risk Predictions
        html += `<h4 style="margin-top: 2rem;">📊 Recent Risk Predictions</h4>`;
        const aiHeaders = ['Patient ID', 'Risk Score', 'Sentiment', 'Dominant Emotion', 'Trend', 'Confidence'];
        const aiRows = analysis.map(a => [a.patientId, a.riskScore, a.sentimentScore, a.dominantEmotion, a.emotionalTrend, `${a.confidenceScore * 100}%`]);
        html += generateTable(aiHeaders, aiRows);

        // Model Details
        html += `<h4 style="margin-top: 2rem;">🧠 Model Information</h4>`;
        const modelHeaders = ['Component', 'Status', 'Last Updated', 'Version'];
        const modelRows = [
            ['Risk Prediction Model', 'Active', '2025-11-10', 'v2.3.1'],
            ['Emotion Detection NLP', 'Active', '2025-11-12', 'v1.8.2'],
            ['Sentiment Analysis', 'Active', '2025-11-11', 'v1.9.0'],
            ['Crisis Detection Engine', 'Active', '2025-11-13', 'v3.1.0'],
            ['Recommendation Engine', 'Active', '2025-11-09', 'v2.0.5']
        ];
        html += generateTable(modelHeaders, modelRows);

        return html;
    }

    // ===== 4. DATA SCIENTIST DASHBOARD =====
    function generateDataScientistDashboard() {
        const stats = PatientData.getStatistics();
        const patients = PatientData.getPatients();

        let html = `<h3>📊 Data Scientist - Analytics & Insights</h3>`;
        html += `<p>Patient Demographics, Population Health Trends, and Statistical Analysis.</p>`;

        // Overview Stats
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Patients</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalPatients}</div>
            </div>
            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Critical Cases</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.criticalCount} (${stats.criticalPercentage}%)</div>
            </div>
            <div style="background: #ffa500; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">High Risk</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.highRiskCount} (${stats.highRiskPercentage}%)</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Avg Risk Score</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.avgRiskScore}</div>
            </div>
        </div>`;

        // Risk Distribution
        html += `<h4 style="margin-top: 2rem;">📈 Risk Distribution Analysis</h4>`;
        const riskHeaders = ['Risk Level', 'Patient Count', 'Percentage', 'Trend'];
        const riskRows = [
            ['Critical (>75)', stats.criticalCount, stats.criticalPercentage + '%', '📈 ↑2%'],
            ['High Risk (60-75)', stats.highRiskCount, stats.highRiskPercentage + '%', '📉 ↓1%'],
            ['Moderate (40-59)', stats.moderateCount, ((stats.moderateCount / stats.totalPatients) * 100).toFixed(1) + '%', '➡️ Stable'],
            ['Low Risk (<40)', stats.lowRiskCount, ((stats.lowRiskCount / stats.totalPatients) * 100).toFixed(1) + '%', '📉 ↓3%']
        ];
        html += generateTable(riskHeaders, riskRows);

        // Condition Analysis
        html += `<h4 style="margin-top: 2rem;">🏥 Condition Distribution</h4>`;
        const conditions = {};
        patients.forEach(p => {
            conditions[p.condition] = (conditions[p.condition] || 0) + 1;
        });
        const conditionHeaders = ['Condition', 'Patient Count', 'Percentage'];
        const conditionRows = Object.entries(conditions).map(([cond, count]) => [cond, count, ((count / stats.totalPatients) * 100).toFixed(1) + '%']);
        html += generateTable(conditionHeaders, conditionRows);

        return html;
    }

    // ===== 5. MENTAL HEALTH ADMINISTRATOR DASHBOARD =====
    function generateMentalHealthAdminDashboard() {
        const stats = PatientData.getStatistics();
        const sessions = PatientData.getSessions().slice(0, 10);
        const patients = PatientData.getPatients();

        let html = `<h3>🏥 Mental Health Administrator - Patient Management</h3>`;
        html += `<p>Comprehensive patient oversight, session management, and treatment planning.</p>`;

        // Admin Overview
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Patients</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.totalPatients}</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Session Completion Rate</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.sessionCompletionRate}%</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Critical Patients</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.criticalCount}</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Recommendation Adherence</div>
                <div style="font-size: 2rem; font-weight: bold;">${stats.recommendationAdherence}%</div>
            </div>
        </div>`;

        // Patient Status Overview
        html += `<h4 style="margin-top: 2rem;">👥 Patient Status Overview</h4>`;
        const patientHeaders = ['Patient ID', 'Name', 'Condition', 'Risk Score', 'Status', 'Counselor'];
        const patientRows = patients.map(p => [p.id, p.name, p.condition, p.riskScore, p.status, p.counselor]);
        html += generateTable(patientHeaders, patientRows);

        // Session Schedule
        html += `<h4 style="margin-top: 2rem;">📅 Recent Sessions</h4>`;
        const sessionHeaders = ['Session ID', 'Patient', 'Counselor', 'Date', 'Type', 'Status'];
        const sessionRows = sessions.map(s => [s.sessionId, s.patientId, s.counselorName, s.date, s.type, s.status]);
        html += generateTable(sessionHeaders, sessionRows);

        return html;
    }

    // ===== 6. EMERGENCY CONTACT TEAM DASHBOARD =====
    function generateEmergencyTeamDashboard() {
        const stats = PatientData.getStatistics();
        const criticalAlerts = PatientData.getCrisisAlerts();
        const emergencyContacts = PatientData.getEmergencyContacts();

        let html = `<h3>🚨 Emergency Contact Team - Crisis Dashboard</h3>`;
        html += `<p>Real-time crisis detection and emergency response coordination.</p>`;

        // Critical Alerts
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">🔴 Critical Alerts</div>
                <div style="font-size: 2rem; font-weight: bold;">${criticalAlerts.filter(a => a.severity === 'Critical').length}</div>
            </div>
            <div style="background: #ffa500; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">⚠️ High Risk</div>
                <div style="font-size: 2rem; font-weight: bold;">${criticalAlerts.filter(a => a.severity === 'High').length}</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">📞 Contacts Notified</div>
                <div style="font-size: 2rem; font-weight: bold;">${criticalAlerts.length}</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Response Rate</div>
                <div style="font-size: 2rem; font-weight: bold;">98%</div>
            </div>
        </div>`;

        // Active Crisis Alerts
        html += `<h4 style="margin-top: 2rem;">🚨 Active Crisis Alerts</h4>`;
        const alertHeaders = ['Alert ID', 'Patient', 'Severity', 'Status', 'Assigned Counselor', 'Emergency Contact'];
        const alertRows = criticalAlerts.map(a => [a.alertId, a.patientName, a.severity, a.status, a.assignedCounselor, a.emergencyContact]);
        html += generateTable(alertHeaders, alertRows);

        // Emergency Hotlines
        html += `<h4 style="margin-top: 2rem;">📞 Emergency Hotlines & Resources</h4>`;
        const contactHeaders = ['Country', 'Service', 'Number/Contact', 'Availability'];
        const contactRows = emergencyContacts.map(c => [c.country, c.service, c.number, c.available]);
        html += generateTable(contactHeaders, contactRows);

        return html;
    }

    // ===== 7. SECURITY ANALYST DASHBOARD =====
    function generateSecurityAnalystDashboard() {
        const sessions = PatientData.getSessions().slice(0, 8);
        const patients = PatientData.getPatients().length;

        let html = `<h3>🔒 Security Analyst - Access & Compliance Audit</h3>`;
        html += `<p>Session audit logs, data access tracking, and HIPAA compliance monitoring.</p>`;

        // Security Metrics
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Data Access Events</div>
                <div style="font-size: 2rem; font-weight: bold;">1,847</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Unauthorized Attempts</div>
                <div style="font-size: 2rem; font-weight: bold;">0</div>
            </div>
            <div style="background: #90ee90; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">HIPAA Compliance</div>
                <div style="font-size: 2rem; font-weight: bold;">100%</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Encrypted Transactions</div>
                <div style="font-size: 2rem; font-weight: bold;">100%</div>
            </div>
        </div>`;

        // Session Audit Log
        html += `<h4 style="margin-top: 2rem;">📋 Session Audit Log</h4>`;
        const auditHeaders = ['Session ID', 'User Role', 'Action', 'Patient ID', 'Timestamp', 'Status'];
        const auditRows = [
            ['S001001', 'Admin', 'View Patient Record', 'P001', '2025-11-15 14:35', '✓ Authorized'],
            ['S001002', 'Counselor', 'Update Session Notes', 'P005', '2025-11-15 14:32', '✓ Authorized'],
            ['S001003', 'AI Engineer', 'Access Risk Scores', 'P009', '2025-11-15 14:28', '✓ Authorized'],
            ['S001004', 'Data Scientist', 'Export Analytics', 'All', '2025-11-15 14:15', '✓ Authorized'],
            ['S001005', 'Unknown', 'Unauthorized Access Attempt', 'All', '2025-11-15 13:45', '✗ Blocked']
        ];
        html += generateTable(auditHeaders, auditRows);

        // Data Protection
        html += `<h4 style="margin-top: 2rem;">🛡️ Data Protection Status</h4>`;
        const secHeaders = ['Security Measure', 'Status', 'Last Verified', 'Risk Level'];
        const secRows = [
            ['End-to-End Encryption', 'Active', '2025-11-15', 'Low'],
            ['Patient Data Anonymization', 'Active', '2025-11-14', 'Low'],
            ['Access Control Lists', 'Active', '2025-11-15', 'Low'],
            ['Regular Security Audits', 'Scheduled', '2025-11-20', 'Low'],
            ['Backup & Recovery', 'Active', '2025-11-15', 'Low']
        ];
        html += generateTable(secHeaders, secRows);

        return html;
    }

    // ===== 8. FINANCIAL TEAM DASHBOARD =====
    function generateFinancialTeamDashboard() {
        const stats = PatientData.getStatistics();

        let html = `<h3>💰 Financial Team - Revenue & Billing Analytics</h3>`;
        html += `<p>Session billing, revenue tracking, and financial performance metrics.</p>`;

        // Financial Overview
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Monthly Revenue</div>
                <div style="font-size: 2rem; font-weight: bold;">$47.8K</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Sessions Billed</div>
                <div style="font-size: 2rem; font-weight: bold;">284</div>
            </div>
            <div style="background: #90ee90; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Collection Rate</div>
                <div style="font-size: 2rem; font-weight: bold;">94%</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Outstanding Invoices</div>
                <div style="font-size: 2rem; font-weight: bold;">$2.8K</div>
            </div>
        </div>`;

        // Revenue by Session Type
        html += `<h4 style="margin-top: 2rem;">💵 Revenue by Session Type</h4>`;
        const revenueHeaders = ['Session Type', 'Count', 'Rate per Session', 'Total Revenue', 'Percentage'];
        const revenueRows = [
            ['Initial Consultation', '35', '$150', '$5,250', '11%'],
            ['Follow-up Sessions', '152', '$120', '$18,240', '38%'],
            ['Crisis Intervention', '42', '$200', '$8,400', '18%'],
            ['Group Therapy', '28', '$80', '$2,240', '5%'],
            ['Assessment/Evaluation', '27', '$180', '$4,860', '10%']
        ];
        html += generateTable(revenueHeaders, revenueRows);

        // Payment Status
        html += `<h4 style="margin-top: 2rem;">📊 Payment Status Breakdown</h4>`;
        const paymentHeaders = ['Status', 'Invoice Count', 'Amount', 'Percentage'];
        const paymentRows = [
            ['Paid', '249', '$42,800', '94%'],
            ['Pending', '28', '$4,200', '5%'],
            ['Overdue', '7', '$1,050', '1%']
        ];
        html += generateTable(paymentHeaders, paymentRows);

        return html;
    }

    // ===== 9. SYSTEM ADMINISTRATOR DASHBOARD =====
    function generateSystemAdminDashboard() {
        const stats = PatientData.getStatistics();

        let html = `<h3>⚙️ System Administrator - Infrastructure & Database</h3>`;
        html += `<p>Database metrics, system resources, and infrastructure management.</p>`;

        // System Resources
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Database Size</div>
                <div style="font-size: 2rem; font-weight: bold;">2.4GB</div>
            </div>
            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Total Records</div>
                <div style="font-size: 2rem; font-weight: bold;">15.2K</div>
            </div>
            <div style="background: #f093fb; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Backup Status</div>
                <div style="font-size: 2rem; font-weight: bold;">✓ Current</div>
            </div>
            <div style="background: #4facfe; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem;">Active Connections</div>
                <div style="font-size: 2rem; font-weight: bold;">284</div>
            </div>
        </div>`;

        // Database Tables Status
        html += `<h4 style="margin-top: 2rem;">🗄️ Database Tables Status</h4>`;
        const dbHeaders = ['Table Name', 'Record Count', 'Size', 'Status', 'Last Backup'];
        const dbRows = [
            ['patients', '20', '245KB', '✓ Healthy', '2025-11-15 22:00'],
            ['daily_logs', '600', '1.2MB', '✓ Healthy', '2025-11-15 22:00'],
            ['sessions', '100', '356KB', '✓ Healthy', '2025-11-15 22:00'],
            ['ai_analysis', '240', '520KB', '✓ Healthy', '2025-11-15 22:00'],
            ['crisis_alerts', '5', '45KB', '✓ Healthy', '2025-11-15 22:00'],
            ['recommendations', '60', '150KB', '✓ Healthy', '2025-11-15 22:00']
        ];
        html += generateTable(dbHeaders, dbRows);

        // Server Status
        html += `<h4 style="margin-top: 2rem;">🖥️ Server Status</h4>`;
        const serverHeaders = ['Server', 'Status', 'CPU', 'Memory', 'Uptime'];
        const serverRows = [
            ['Primary API Server', '✓ Running', '45%', '62%', '45d 12h'],
            ['Database Server', '✓ Running', '28%', '78%', '42d 8h'],
            ['Cache Server', '✓ Running', '12%', '34%', '38d 5h'],
            ['Backup Server', '✓ Running', '8%', '22%', '35d 10h']
        ];
        html += generateTable(serverHeaders, serverRows);

        return html;
    }

    // Public API
    return {
        generatePatientDashboard,
        generateSoftwareEngineerDashboard,
        generateAIEngineerDashboard,
        generateDataScientistDashboard,
        generateMentalHealthAdminDashboard,
        generateEmergencyTeamDashboard,
        generateSecurityAnalystDashboard,
        generateFinancialTeamDashboard,
        generateSystemAdminDashboard,

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
            return (dashboards[role] || (() => '<p>Unknown role</p>'))();
        }
    };
})();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardGenerators;
}
