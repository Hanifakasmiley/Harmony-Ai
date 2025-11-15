// ===== DATABASE CRUD OPERATIONS FOR ALL TABLES =====
// Enhanced DB wrapper with all 10 tables

const DailyDB = (function () {
    const DB_NAME = 'hermony_db';
    const DB_VERSION = 10;
    const STORES = {
        daily_logs: 'daily_logs',
        users: 'users',
        counsellors: 'counsellors',
        sessions: 'sessions',
        feedback: 'feedback',
        progress: 'progress',
        recommendations: 'recommendations',
        ai_analysis: 'ai_analysis',
        crisis_alerts: 'crisis_alerts',
        emergency_contacts: 'emergency_contacts'
    };
    let _db = null;

    function init() {
        return new Promise((resolve, reject) => {
            if (_db) return resolve(_db);
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;

                // Create all stores
                const stores = [
                    { name: STORES.daily_logs, keyPath: 'id', indexes: [{ name: 'patientId' }, { name: 'date' }] },
                    { name: STORES.users, keyPath: 'id', indexes: [{ name: 'userId', unique: true }, { name: 'email' }] },
                    { name: STORES.counsellors, keyPath: 'id', indexes: [{ name: 'name' }, { name: 'specialization' }] },
                    { name: STORES.sessions, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'counsellorId' }, { name: 'sessionDate' }] },
                    { name: STORES.feedback, keyPath: 'id', indexes: [{ name: 'sessionId' }, { name: 'userId' }, { name: 'date' }] },
                    { name: STORES.progress, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'date' }, { name: 'category' }] },
                    { name: STORES.recommendations, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'category' }, { name: 'priority' }] },
                    { name: STORES.ai_analysis, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'date' }, { name: 'riskScore' }] },
                    { name: STORES.crisis_alerts, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'date' }, { name: 'severity' }] },
                    { name: STORES.emergency_contacts, keyPath: 'id', indexes: [{ name: 'userId' }, { name: 'type' }] }
                ];

                stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        const objStore = db.createObjectStore(store.name, { keyPath: store.keyPath, autoIncrement: true });
                        store.indexes.forEach(idx => {
                            objStore.createIndex(idx.name, idx.name, { unique: idx.unique || false });
                        });
                    }
                });
            };
            req.onsuccess = (e) => {
                _db = e.target.result;
                resolve(_db);
            };
            req.onerror = (e) => reject(e.target.error);
        });
    }

    // Generic CRUD functions
    async function add(storeName, entry) {
        await init();
        return new Promise((resolve, reject) => {
            const tx = _db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.add(entry);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function getAll(storeName) {
        await init();
        return new Promise((resolve, reject) => {
            const tx = _db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function deleteRecord(storeName, id) {
        await init();
        return new Promise((resolve, reject) => {
            const tx = _db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.delete(Number(id));
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }

    // ===== DAILY LOGS =====
    async function addLog(entry) { return add(STORES.daily_logs, entry); }
    async function getAllLogs() { return getAll(STORES.daily_logs); }
    async function deleteLog(id) { return deleteRecord(STORES.daily_logs, id); }

    // ===== USERS =====
    async function addUser(entry) { return add(STORES.users, entry); }
    async function getAllUsers() { return getAll(STORES.users); }
    async function deleteUser(id) { return deleteRecord(STORES.users, id); }

    // ===== COUNSELLORS =====
    async function addCounsellor(entry) { return add(STORES.counsellors, entry); }
    async function getAllCounsellors() { return getAll(STORES.counsellors); }
    async function deleteCounsellor(id) { return deleteRecord(STORES.counsellors, id); }

    // ===== SESSIONS =====
    async function addSession(entry) { return add(STORES.sessions, entry); }
    async function getAllSessions() { return getAll(STORES.sessions); }
    async function deleteSession(id) { return deleteRecord(STORES.sessions, id); }

    // ===== FEEDBACK =====
    async function addFeedback(entry) { return add(STORES.feedback, entry); }
    async function getAllFeedback() { return getAll(STORES.feedback); }
    async function deleteFeedback(id) { return deleteRecord(STORES.feedback, id); }

    // ===== PROGRESS =====
    async function addProgress(entry) { return add(STORES.progress, entry); }
    async function getAllProgress() { return getAll(STORES.progress); }
    async function deleteProgress(id) { return deleteRecord(STORES.progress, id); }

    // ===== RECOMMENDATIONS =====
    async function addRecommendation(entry) { return add(STORES.recommendations, entry); }
    async function getAllRecommendations() { return getAll(STORES.recommendations); }
    async function deleteRecommendation(id) { return deleteRecord(STORES.recommendations, id); }

    // ===== AI ANALYSIS =====
    async function addAIAnalysis(entry) { return add(STORES.ai_analysis, entry); }
    async function getAllAIAnalysis() { return getAll(STORES.ai_analysis); }
    async function deleteAIAnalysis(id) { return deleteRecord(STORES.ai_analysis, id); }

    // ===== CRISIS ALERTS =====
    async function addCrisisAlert(entry) { return add(STORES.crisis_alerts, entry); }
    async function getAllCrisisAlerts() { return getAll(STORES.crisis_alerts); }
    async function deleteCrisisAlert(id) { return deleteRecord(STORES.crisis_alerts, id); }

    // ===== EMERGENCY CONTACTS =====
    async function addEmergencyContact(entry) { return add(STORES.emergency_contacts, entry); }
    async function getAllEmergencyContacts() { return getAll(STORES.emergency_contacts); }
    async function deleteEmergencyContact(id) { return deleteRecord(STORES.emergency_contacts, id); }

    return {
        init,
        // Daily Logs
        addLog, getAllLogs, deleteLog,
        // Users
        addUser, getAllUsers, deleteUser,
        // Counsellors
        addCounsellor, getAllCounsellors, deleteCounsellor,
        // Sessions
        addSession, getAllSessions, deleteSession,
        // Feedback
        addFeedback, getAllFeedback, deleteFeedback,
        // Progress
        addProgress, getAllProgress, deleteProgress,
        // Recommendations
        addRecommendation, getAllRecommendations, deleteRecommendation,
        // AI Analysis
        addAIAnalysis, getAllAIAnalysis, deleteAIAnalysis,
        // Crisis Alerts
        addCrisisAlert, getAllCrisisAlerts, deleteCrisisAlert,
        // Emergency Contacts
        addEmergencyContact, getAllEmergencyContacts, deleteEmergencyContact
    };
})();

window.DailyDB = DailyDB;
