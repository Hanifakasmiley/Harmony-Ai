/**
 * Harmony AI - Patient Data (Fallback Mock Data)
 * This provides fallback data when the API is unavailable
 * Data structure matches the database schema
 */

const PatientData = (function () {

    // ===== USERS (matches users table) =====
    const users = [
        { user_id: 1, full_name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1-555-0101', gender: 'Female', date_of_birth: '1997-03-15', designation: 'Patient/User', preferences: null },
        { user_id: 2, full_name: 'Michael Chen', email: 'michael@email.com', phone: '+1-555-0102', gender: 'Male', date_of_birth: '1990-07-22', designation: 'Patient/User', preferences: null },
        { user_id: 3, full_name: 'Dr. Emily Smith', email: 'emily@harmony.ai', phone: '+1-555-2001', gender: 'Female', date_of_birth: '1985-01-10', designation: 'Mental Health Administrator', preferences: null },
        { user_id: 4, full_name: 'Admin User', email: 'admin@harmony.ai', phone: '+1-555-0001', gender: 'Male', date_of_birth: '1988-05-20', designation: 'System Administrator', preferences: null },
        { user_id: 5, full_name: 'Data Analyst', email: 'analyst@harmony.ai', phone: '+1-555-0002', gender: 'Female', date_of_birth: '1992-11-08', designation: 'Data Scientist', preferences: null }
    ];

    // ===== DAILY LOGS (matches dailylogs table) =====
    // mood_level: 1-10 scale (1=very low, 10=very high)
    // stress_level: 1-10 scale (1=very low, 10=very high)
    // anxiety_level: 1-10 scale (1=very low, 10=very high)
    const dailylogs = [
        { log_id: 1, user_id: 1, mood_level: 8, stress_level: 3, anxiety_level: 2, sleep_hours: 7.5, notes: 'Feeling good today', log_date: '2025-12-11' },
        { log_id: 2, user_id: 1, mood_level: 4, stress_level: 7, anxiety_level: 6, sleep_hours: 5, notes: 'Work stress', log_date: '2025-12-10' },
        { log_id: 3, user_id: 2, mood_level: 7, stress_level: 4, anxiety_level: 3, sleep_hours: 8, notes: 'Meditation helped', log_date: '2025-12-11' },
        { log_id: 4, user_id: 2, mood_level: 5, stress_level: 6, anxiety_level: 5, sleep_hours: 4, notes: 'Insomnia issues', log_date: '2025-12-10' },
        { log_id: 5, user_id: 1, mood_level: 6, stress_level: 5, anxiety_level: 4, sleep_hours: 6, notes: 'Average day', log_date: '2025-12-09' }
    ];

    // ===== COUNSELLORS (matches counsellors table) =====
    const counsellors = [
        { counsellor_id: 1, name: 'Dr. Emily Smith', email: 'emily@harmony.ai', phone: '+1-555-2001', specialization: 'Anxiety Disorders', schedule: 'Mon-Fri 9AM-5PM' },
        { counsellor_id: 2, name: 'Dr. James Johnson', email: 'james@harmony.ai', phone: '+1-555-2002', specialization: 'Depression', schedule: 'Tue-Sat 10AM-6PM' },
        { counsellor_id: 3, name: 'Dr. Lisa Williams', email: 'lisa@harmony.ai', phone: '+1-555-2003', specialization: 'Stress Management', schedule: 'Mon-Thu 8AM-4PM' },
        { counsellor_id: 4, name: 'Dr. Robert Brown', email: 'robert@harmony.ai', phone: '+1-555-2004', specialization: 'Sleep Disorders', schedule: 'Wed-Sun 11AM-7PM' }
    ];

    // ===== SESSIONS (matches sessions table) =====
    const sessions = [
        { session_id: 1, user_id: 1, counsellor_id: 1, session_time: '2025-12-15 10:00:00', session_notes: 'Initial consultation', feedback: null },
        { session_id: 2, user_id: 1, counsellor_id: 1, session_time: '2025-12-08 10:00:00', session_notes: 'Follow-up session', feedback: 'Good progress' },
        { session_id: 3, user_id: 2, counsellor_id: 2, session_time: '2025-12-14 14:00:00', session_notes: 'Weekly check-in', feedback: null },
        { session_id: 4, user_id: 2, counsellor_id: 2, session_time: '2025-12-07 14:00:00', session_notes: 'Therapy session', feedback: 'Improving' }
    ];

    // ===== FEEDBACK (matches feedback table) =====
    const feedback = [
        { feedback_id: 1, session_id: 2, user_id: 1, rating: 5, comments: 'Very helpful session' },
        { feedback_id: 2, session_id: 4, user_id: 2, rating: 4, comments: 'Good advice received' },
        { feedback_id: 3, session_id: 2, user_id: 1, rating: 5, comments: 'Feeling much better' }
    ];

    // ===== PROGRESS (matches progress table) =====
    const progress = [
        { progress_id: 1, user_id: 1, emotional_stability_score: 72, improvement_percentage: 15, trend_notes: 'Steady improvement over past month' },
        { progress_id: 2, user_id: 2, emotional_stability_score: 65, improvement_percentage: 10, trend_notes: 'Gradual progress with sleep issues' },
        { progress_id: 3, user_id: 1, emotional_stability_score: 68, improvement_percentage: 12, trend_notes: 'Previous week assessment' }
    ];

    // ===== RECOMMENDATIONS (matches recommendations table) =====
    const recommendations = [
        { rec_id: 1, user_id: 1, wellness_tip: 'Practice deep breathing for 5 minutes daily', activity: 'Breathing Exercise' },
        { rec_id: 2, user_id: 1, wellness_tip: 'Take a 30-minute walk in nature', activity: 'Outdoor Walk' },
        { rec_id: 3, user_id: 2, wellness_tip: 'Establish a consistent sleep schedule', activity: 'Sleep Hygiene' },
        { rec_id: 4, user_id: 2, wellness_tip: 'Try journaling before bed', activity: 'Journaling' },
        { rec_id: 5, user_id: 1, wellness_tip: 'Limit screen time 1 hour before sleep', activity: 'Digital Detox' }
    ];

    // ===== AI ANALYSIS (matches ai_analysis table) =====
    const ai_analysis = [
        { analysis_id: 1, user_id: 1, risk_score: 35, sentiment_value: 0.6, emotion_label: 'Anxiety' },
        { analysis_id: 2, user_id: 2, risk_score: 45, sentiment_value: 0.4, emotion_label: 'Stress' },
        { analysis_id: 3, user_id: 1, risk_score: 30, sentiment_value: 0.7, emotion_label: 'Stability' },
        { analysis_id: 4, user_id: 2, risk_score: 50, sentiment_value: 0.3, emotion_label: 'Depression' }
    ];

    // ===== CRISIS ALERTS (matches crisisalerts table) =====
    const crisisalerts = [
        { alert_id: 1, user_id: 2, risk_level: 'High', alert_timestamp: '2025-12-10 15:30:00', contacted_counsellor_id: 2 },
        { alert_id: 2, user_id: 1, risk_level: 'Medium', alert_timestamp: '2025-12-08 09:15:00', contacted_counsellor_id: 1 }
    ];

    // ===== EMERGENCY CONTACTS (matches emergencycontacts table) =====
    const emergencycontacts = [
        { contact_id: 1, user_id: 1, contact_name: 'John Johnson', contact_phone: '+1-555-9001', relation: 'Father' },
        { contact_id: 2, user_id: 2, contact_name: 'Linda Chen', contact_phone: '+1-555-9002', relation: 'Mother' }
    ];

    // ===== HOTLINES (static data for crisis page) =====
    const hotlines = [
        { country: '🇺🇸 USA', service: 'National Suicide Prevention Lifeline', number: '988', available: '24/7' },
        { country: '🇺🇸 USA', service: 'Crisis Text Line', number: 'Text HOME to 741741', available: '24/7' },
        { country: '🇬🇧 UK', service: 'Samaritans', number: '116 123', available: '24/7' },
        { country: '🇧🇩 Bangladesh', service: 'Kaan Pete Roi', number: '01779-554391', available: '6 PM - 10 PM' },
        { country: '🇧🇩 Bangladesh', service: 'NIMH Helpline', number: '16789', available: '24/7' },
        { country: '🌍 International', service: 'Befrienders Worldwide', number: 'befrienders.org', available: '24/7' }
    ];

    // Public API - matches database table names
    return {
        // Main data getters (return copies to prevent mutation)
        getUsers: () => JSON.parse(JSON.stringify(users)),
        getDailyLogs: () => JSON.parse(JSON.stringify(dailylogs)),
        getCounsellors: () => JSON.parse(JSON.stringify(counsellors)),
        getSessions: () => JSON.parse(JSON.stringify(sessions)),
        getFeedback: () => JSON.parse(JSON.stringify(feedback)),
        getProgress: () => JSON.parse(JSON.stringify(progress)),
        getRecommendations: () => JSON.parse(JSON.stringify(recommendations)),
        getAIAnalysis: () => JSON.parse(JSON.stringify(ai_analysis)),
        getCrisisAlerts: () => JSON.parse(JSON.stringify(crisisalerts)),
        getEmergencyContacts: () => JSON.parse(JSON.stringify(hotlines)), // Returns hotlines for crisis page

        // Utility functions
        getUserById: (id) => users.find(u => u.user_id === id),
        getCounsellorById: (id) => counsellors.find(c => c.counsellor_id === id),

        // Statistics for dashboard
        getStatistics: () => ({
            totalPatients: users.filter(u => u.designation === 'Patient/User').length,
            totalUsers: users.length,
            criticalCount: crisisalerts.filter(a => a.risk_level === 'Critical' || a.risk_level === 'High').length,
            highRiskCount: crisisalerts.filter(a => a.risk_level === 'High').length,
            moderateCount: crisisalerts.filter(a => a.risk_level === 'Medium').length,
            lowRiskCount: crisisalerts.filter(a => a.risk_level === 'Low').length,
            avgRiskScore: (ai_analysis.reduce((sum, a) => sum + a.risk_score, 0) / ai_analysis.length).toFixed(1),
            totalSessions: sessions.length,
            totalCounsellors: counsellors.length
        }),

        // Legacy compatibility (for old code that might use these)
        getPatients: () => JSON.parse(JSON.stringify(users.filter(u => u.designation === 'Patient/User'))),
        getMoodLogs: () => JSON.parse(JSON.stringify(dailylogs))
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PatientData;
}
