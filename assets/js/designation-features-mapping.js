// ===== DESIGNATION TO FEATURE MAPPING =====
// Maps each designation to their specific feature and database tables

const DesignationFeatureMapping = {
    // Software Engineer - Feature 1 - System Logs & Data Management
    software_engineer: {
        designation: 'Software Engineer',
        emoji: '💻',
        feature: 'Feature 1: Daily Mood & Stress Logging',
        featurePath: 'feature1.html',
        databaseTables: ['DailyLogs'],
        purpose: 'Monitor system logs, data structure, and raw patient records',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'date', label: 'Date', type: 'date' },
            { key: 'mood', label: 'Mood', type: 'string' },
            { key: 'stressLevel', label: 'Stress Level', type: 'number' },
            { key: 'anxietyLevel', label: 'Anxiety Level', type: 'number' },
            { key: 'sleepHours', label: 'Sleep Hours', type: 'number' },
            { key: 'createdAt', label: 'Created At', type: 'datetime' }
        ]
    },

    // AI Engineer - Feature 2 - AI Analysis & Counsellor Matching
    ai_engineer: {
        designation: 'AI Engineer',
        emoji: '🤖',
        feature: 'Feature 2: Counsellor & Session Management',
        featurePath: 'feature2.html',
        databaseTables: ['AI_Analysis', 'Counsellors', 'Sessions'],
        purpose: 'AI model performance, emotion classification, risk scoring, and counsellor recommendations',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'riskScore', label: 'AI Risk Score', type: 'number' },
            { key: 'emotionClassification', label: 'Emotion Classification', type: 'string' },
            { key: 'sentimentAnalysis', label: 'Sentiment', type: 'string' },
            { key: 'recommendedCounsellor', label: 'Recommended Counsellor', type: 'string' },
            { key: 'confidenceScore', label: 'Confidence %', type: 'number' },
            { key: 'analysisDate', label: 'Analysis Date', type: 'date' }
        ]
    },

    // Data Scientist - Feature 3 - Analytics & Insights
    data_scientist: {
        designation: 'Data Scientist',
        emoji: '📊',
        feature: 'Feature 3: Personalized Mental Health Recommendations',
        featurePath: 'feature3.html',
        databaseTables: ['Recommendations', 'Progress'],
        purpose: 'Data analytics, trend analysis, and personalized recommendations based on patient patterns',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'avgStress', label: 'Avg Stress (7d)', type: 'number' },
            { key: 'avgAnxiety', label: 'Avg Anxiety (7d)', type: 'number' },
            { key: 'trendDirection', label: 'Trend', type: 'string' },
            { key: 'recommendationType', label: 'Recommendation Type', type: 'string' },
            { key: 'efficacyScore', label: 'Efficacy Score', type: 'number' },
            { key: 'priority', label: 'Priority', type: 'string' }
        ]
    },

    // Mental Health Administrator - Feature 4 - Patient Management & Feedback
    mental_health_admin: {
        designation: 'Mental Health Administrator',
        emoji: '🏥',
        feature: 'Feature 4: Counsellor Feedback & Progress Tracking',
        featurePath: 'feature4.html',
        databaseTables: ['Users', 'Feedback', 'Progress', 'Sessions'],
        purpose: 'Oversee all patient cases, session management, feedback collection, and progress tracking',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'patientName', label: 'Patient Name', type: 'string' },
            { key: 'sessionCount', label: 'Sessions', type: 'number' },
            { key: 'avgFeedbackRating', label: 'Avg Feedback Rating', type: 'number' },
            { key: 'progressScore', label: 'Progress Score', type: 'number' },
            { key: 'riskLevel', label: 'Risk Level', type: 'string' },
            { key: 'lastSessionDate', label: 'Last Session', type: 'date' }
        ]
    },

    // Emergency Contact Team - Feature 5 - Crisis Management
    emergency_team: {
        designation: 'Emergency Contact Team',
        emoji: '🚨',
        feature: 'Feature 5: AI-Based Journal & Mood Analysis',
        featurePath: 'feature5.html',
        databaseTables: ['CrisisAlerts', 'EmergencyContacts', 'DailyLogs'],
        purpose: 'Crisis detection, emergency alerts, and immediate intervention coordination',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'patientName', label: 'Patient Name', type: 'string' },
            { key: 'alertSeverity', label: 'Alert Severity', type: 'string' },
            { key: 'currentMoodState', label: 'Current Mood', type: 'string' },
            { key: 'anxietyLevel', label: 'Anxiety Level', type: 'number' },
            { key: 'emergencyContact', label: 'Emergency Contact', type: 'string' },
            { key: 'alertTimestamp', label: 'Alert Time', type: 'datetime' }
        ]
    },

    // Security Analyst - Feature 6 - Access Control & Data Protection
    security_analyst: {
        designation: 'Security Analyst',
        emoji: '🔒',
        feature: 'Feature 6: Crisis Detection & Emergency Support',
        featurePath: 'feature6.html',
        databaseTables: ['Users', 'Sessions', 'CrisisAlerts'],
        purpose: 'System access logging, data security, audit trails, and unauthorized access detection',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'accessEvent', label: 'Access Event', type: 'string' },
            { key: 'accessTime', label: 'Access Time', type: 'datetime' },
            { key: 'accessLevel', label: 'Access Level', type: 'string' },
            { key: 'dataAccessed', label: 'Data Accessed', type: 'string' },
            { key: 'accessStatus', label: 'Status', type: 'string' },
            { key: 'ipAddress', label: 'IP Address', type: 'string' }
        ]
    },

    // Financial Team - Feature 1 - Revenue & Billing
    financial_team: {
        designation: 'Financial Team',
        emoji: '💰',
        feature: 'Feature 1: Daily Mood & Stress Logging',
        featurePath: 'feature1.html',
        databaseTables: ['Sessions', 'Users'],
        purpose: 'Revenue tracking, session billing, payment collection, and financial analytics',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'patientName', label: 'Patient Name', type: 'string' },
            { key: 'totalSessions', label: 'Total Sessions', type: 'number' },
            { key: 'costPerSession', label: 'Cost/Session', type: 'currency' },
            { key: 'totalRevenue', label: 'Total Revenue', type: 'currency' },
            { key: 'paymentStatus', label: 'Payment Status', type: 'string' },
            { key: 'lastPaymentDate', label: 'Last Payment', type: 'date' }
        ]
    },

    // System Administrator - Feature 2 - Database & Infrastructure
    system_admin: {
        designation: 'System Administrator',
        emoji: '⚙️',
        feature: 'Feature 2: Counsellor & Session Management',
        featurePath: 'feature2.html',
        databaseTables: ['DailyLogs', 'Users', 'Sessions', 'Feedback', 'Progress'],
        purpose: 'Database management, system performance, backup status, and infrastructure monitoring',
        dataColumns: [
            { key: 'patientId', label: 'Patient ID', type: 'string' },
            { key: 'recordCount', label: 'Records Count', type: 'number' },
            { key: 'dataSize', label: 'Data Size (KB)', type: 'number' },
            { key: 'firstEntry', label: 'First Entry', type: 'date' },
            { key: 'lastEntry', label: 'Last Entry', type: 'date' },
            { key: 'databaseStatus', label: 'Status', type: 'string' },
            { key: 'backupStatus', label: 'Backup Status', type: 'string' }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesignationFeatureMapping;
}
window.DesignationFeatureMapping = DesignationFeatureMapping;
