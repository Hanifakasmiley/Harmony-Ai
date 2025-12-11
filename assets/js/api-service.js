/**
 * Harmony AI - API Service
 * Frontend JavaScript to communicate with the PHP backend
 */

const ApiService = (function () {
    // API base URL - adjust if your XAMPP setup is different
    const API_BASE = 'http://localhost/Harmony-Ai/backend/api.php';

    // Helper function for API calls
    async function apiCall(endpoint, method = 'GET', data = null, params = {}) {
        const url = new URL(`${API_BASE}/${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'API request failed');
            }
            return result;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // ==================== AUTH ====================
    async function login(email, password) {
        return apiCall('login', 'POST', { email, password });
    }

    async function register(userData) {
        return apiCall('users', 'POST', userData);
    }

    // ==================== USERS ====================
    async function getUsers() {
        return apiCall('users');
    }

    async function getUserById(id) {
        return apiCall('users', 'GET', null, { id });
    }

    async function updateUser(id, data) {
        return apiCall('users', 'PUT', data, { id });
    }

    async function deleteUser(id) {
        return apiCall('users', 'DELETE', null, { id });
    }


    // ==================== DAILY LOGS ====================
    async function getDailyLogs(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('dailylogs', 'GET', null, params);
    }

    async function getDailyLogById(id) {
        return apiCall('dailylogs', 'GET', null, { id });
    }

    async function createDailyLog(data) {
        return apiCall('dailylogs', 'POST', data);
    }

    async function updateDailyLog(id, data) {
        return apiCall('dailylogs', 'PUT', data, { id });
    }

    async function deleteDailyLog(id) {
        return apiCall('dailylogs', 'DELETE', null, { id });
    }

    // ==================== COUNSELLORS ====================
    async function getCounsellors() {
        return apiCall('counsellors');
    }

    async function getCounsellorById(id) {
        return apiCall('counsellors', 'GET', null, { id });
    }

    async function createCounsellor(data) {
        return apiCall('counsellors', 'POST', data);
    }

    async function updateCounsellor(id, data) {
        return apiCall('counsellors', 'PUT', data, { id });
    }

    async function deleteCounsellor(id) {
        return apiCall('counsellors', 'DELETE', null, { id });
    }

    // ==================== SESSIONS ====================
    async function getSessions(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('sessions', 'GET', null, params);
    }

    async function getSessionById(id) {
        return apiCall('sessions', 'GET', null, { id });
    }

    async function createSession(data) {
        return apiCall('sessions', 'POST', data);
    }

    async function updateSession(id, data) {
        return apiCall('sessions', 'PUT', data, { id });
    }

    async function deleteSession(id) {
        return apiCall('sessions', 'DELETE', null, { id });
    }

    // ==================== FEEDBACK ====================
    async function getFeedback(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('feedback', 'GET', null, params);
    }

    async function getFeedbackById(id) {
        return apiCall('feedback', 'GET', null, { id });
    }

    async function createFeedback(data) {
        return apiCall('feedback', 'POST', data);
    }

    async function updateFeedback(id, data) {
        return apiCall('feedback', 'PUT', data, { id });
    }

    async function deleteFeedback(id) {
        return apiCall('feedback', 'DELETE', null, { id });
    }

    // ==================== PROGRESS ====================
    async function getProgress(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('progress', 'GET', null, params);
    }

    async function getProgressById(id) {
        return apiCall('progress', 'GET', null, { id });
    }

    async function createProgress(data) {
        return apiCall('progress', 'POST', data);
    }

    async function updateProgress(id, data) {
        return apiCall('progress', 'PUT', data, { id });
    }

    async function deleteProgress(id) {
        return apiCall('progress', 'DELETE', null, { id });
    }

    // ==================== RECOMMENDATIONS ====================
    async function getRecommendations(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('recommendations', 'GET', null, params);
    }

    async function getRecommendationById(id) {
        return apiCall('recommendations', 'GET', null, { id });
    }

    async function createRecommendation(data) {
        return apiCall('recommendations', 'POST', data);
    }

    async function updateRecommendation(id, data) {
        return apiCall('recommendations', 'PUT', data, { id });
    }

    async function deleteRecommendation(id) {
        return apiCall('recommendations', 'DELETE', null, { id });
    }

    // ==================== AI ANALYSIS ====================
    async function getAIAnalysis(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('ai_analysis', 'GET', null, params);
    }

    async function getAIAnalysisById(id) {
        return apiCall('ai_analysis', 'GET', null, { id });
    }

    async function createAIAnalysis(data) {
        return apiCall('ai_analysis', 'POST', data);
    }

    async function updateAIAnalysis(id, data) {
        return apiCall('ai_analysis', 'PUT', data, { id });
    }

    async function deleteAIAnalysis(id) {
        return apiCall('ai_analysis', 'DELETE', null, { id });
    }

    // ==================== CRISIS ALERTS ====================
    async function getCrisisAlerts(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('crisisalerts', 'GET', null, params);
    }

    async function getCrisisAlertById(id) {
        return apiCall('crisisalerts', 'GET', null, { id });
    }

    async function createCrisisAlert(data) {
        return apiCall('crisisalerts', 'POST', data);
    }

    async function updateCrisisAlert(id, data) {
        return apiCall('crisisalerts', 'PUT', data, { id });
    }

    async function deleteCrisisAlert(id) {
        return apiCall('crisisalerts', 'DELETE', null, { id });
    }

    // ==================== EMERGENCY CONTACTS ====================
    async function getEmergencyContacts(userId = null) {
        const params = userId ? { user_id: userId } : {};
        return apiCall('emergencycontacts', 'GET', null, params);
    }

    async function getEmergencyContactById(id) {
        return apiCall('emergencycontacts', 'GET', null, { id });
    }

    async function createEmergencyContact(data) {
        return apiCall('emergencycontacts', 'POST', data);
    }

    async function updateEmergencyContact(id, data) {
        return apiCall('emergencycontacts', 'PUT', data, { id });
    }

    async function deleteEmergencyContact(id) {
        return apiCall('emergencycontacts', 'DELETE', null, { id });
    }

    // ==================== STATISTICS ====================
    async function getStatistics() {
        return apiCall('statistics');
    }

    // ==================== HELPER: Current User ====================
    function getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    function getCurrentUserId() {
        const user = getCurrentUser();
        return user ? user.user_id : null;
    }

    function setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userRole', mapDesignationToRole(user.designation));
        localStorage.setItem('designation', user.designation);
    }

    function clearCurrentUser() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('designation');
    }

    function mapDesignationToRole(designation) {
        const roleMap = {
            'Patient/User': 'patient',
            'Data Scientist': 'data_scientist',
            'System Administrator': 'system_admin',
            'Software Engineer': 'software_engineer',
            'Mental Health Administrator': 'mental_health_admin',
            'Emergency Contact Team': 'emergency_team'
        };
        return roleMap[designation] || 'patient';
    }

    // Public API
    return {
        // Auth
        login, register,
        // Users
        getUsers, getUserById, updateUser, deleteUser,
        // Daily Logs
        getDailyLogs, getDailyLogById, createDailyLog, updateDailyLog, deleteDailyLog,
        // Counsellors
        getCounsellors, getCounsellorById, createCounsellor, updateCounsellor, deleteCounsellor,
        // Sessions
        getSessions, getSessionById, createSession, updateSession, deleteSession,
        // Feedback
        getFeedback, getFeedbackById, createFeedback, updateFeedback, deleteFeedback,
        // Progress
        getProgress, getProgressById, createProgress, updateProgress, deleteProgress,
        // Recommendations
        getRecommendations, getRecommendationById, createRecommendation, updateRecommendation, deleteRecommendation,
        // AI Analysis
        getAIAnalysis, getAIAnalysisById, createAIAnalysis, updateAIAnalysis, deleteAIAnalysis,
        // Crisis Alerts
        getCrisisAlerts, getCrisisAlertById, createCrisisAlert, updateCrisisAlert, deleteCrisisAlert,
        // Emergency Contacts
        getEmergencyContacts, getEmergencyContactById, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact,
        // Statistics
        getStatistics,
        // User helpers
        getCurrentUser, getCurrentUserId, setCurrentUser, clearCurrentUser, mapDesignationToRole
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}
