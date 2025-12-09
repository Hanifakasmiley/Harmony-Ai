/**
 * Harmony AI - API Service
 * Connects frontend to PHP backend
 */

const API = (function () {
    // Change this to your backend URL
    // For XAMPP: http://localhost/harmony-ai/backend/api.php
    const BASE_URL = 'backend/api.php';

    // Helper function for API calls
    async function request(endpoint, method = 'GET', data = null) {
        const url = `${BASE_URL}?endpoint=${endpoint}`;

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== PATIENTS =====
    async function getPatients() {
        return await request('patients');
    }

    async function getPatientById(id) {
        return await request(`patients&id=${id}`);
    }

    async function createPatient(patientData) {
        return await request('patients', 'POST', patientData);
    }

    async function updatePatient(patientData) {
        return await request('patients', 'PUT', patientData);
    }

    async function deletePatient(id) {
        return await request(`patients&id=${id}`, 'DELETE');
    }

    // ===== MOOD LOGS =====
    async function getMoodLogs(patientId = null) {
        const endpoint = patientId ? `mood-logs&patient_id=${patientId}` : 'mood-logs';
        return await request(endpoint);
    }

    async function createMoodLog(logData) {
        return await request('mood-logs', 'POST', logData);
    }

    // ===== SESSIONS =====
    async function getSessions(patientId = null) {
        const endpoint = patientId ? `sessions&patient_id=${patientId}` : 'sessions';
        return await request(endpoint);
    }

    async function createSession(sessionData) {
        return await request('sessions', 'POST', sessionData);
    }

    async function updateSession(sessionData) {
        return await request('sessions', 'PUT', sessionData);
    }

    // ===== COUNSELORS =====
    async function getCounselors() {
        return await request('counselors');
    }

    // ===== AI ANALYSIS =====
    async function getAIAnalysis(patientId = null) {
        const endpoint = patientId ? `ai-analysis&patient_id=${patientId}` : 'ai-analysis';
        return await request(endpoint);
    }

    async function createAIAnalysis(analysisData) {
        return await request('ai-analysis', 'POST', analysisData);
    }

    // ===== RECOMMENDATIONS =====
    async function getRecommendations(patientId = null) {
        const endpoint = patientId ? `recommendations&patient_id=${patientId}` : 'recommendations';
        return await request(endpoint);
    }

    async function createRecommendation(recData) {
        return await request('recommendations', 'POST', recData);
    }

    // ===== CRISIS ALERTS =====
    async function getCrisisAlerts() {
        return await request('crisis-alerts');
    }

    async function createCrisisAlert(alertData) {
        return await request('crisis-alerts', 'POST', alertData);
    }

    async function updateCrisisAlert(alertData) {
        return await request('crisis-alerts', 'PUT', alertData);
    }

    // ===== EMERGENCY CONTACTS =====
    async function getEmergencyContacts() {
        return await request('emergency-contacts');
    }

    // ===== STATISTICS =====
    async function getStatistics() {
        return await request('statistics');
    }

    // ===== LOGIN =====
    async function login(email, password) {
        return await request('login', 'POST', { email, password });
    }

    // Public API
    return {
        // Patients
        getPatients,
        getPatientById,
        createPatient,
        updatePatient,
        deletePatient,

        // Mood Logs
        getMoodLogs,
        createMoodLog,

        // Sessions
        getSessions,
        createSession,
        updateSession,

        // Counselors
        getCounselors,

        // AI Analysis
        getAIAnalysis,
        createAIAnalysis,

        // Recommendations
        getRecommendations,
        createRecommendation,

        // Crisis
        getCrisisAlerts,
        createCrisisAlert,
        updateCrisisAlert,

        // Emergency Contacts
        getEmergencyContacts,

        // Statistics
        getStatistics,

        // Auth
        login
    };
})();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
