document.addEventListener("DOMContentLoaded", () => {
  /* ===== PAGE TRANSITIONS ===== */
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");
      if (!target || target.startsWith("#")) return;

      // Skip fade-out for sidebar links (let them navigate normally)
      if (link.closest(".sidebar")) {
        return; // Allow default navigation
      }

      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => (window.location.href = target), 400);
    });
  });

  /* ===== THEME TOGGLE ===== */
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "theme-toggle";
  toggleBtn.innerHTML = "🌙 Dark Mode";
  document.body.appendChild(toggleBtn);

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.innerHTML = "☀️ Light Mode";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.innerHTML = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

/* ====== SIMPLE INDEXEDDB WRAPPER FOR DAILY LOGS, COUNSELLORS, SESSIONS, USERS, FEEDBACK, PROGRESS, RECOMMENDATIONS, AI ANALYSIS, CRISIS ALERTS, AND EMERGENCY CONTACTS ====== */
const DB = (function () {
  const DB_NAME = 'hermony_db';
  const DB_VERSION = 8;
  const STORES = {
    daily_logs: 'daily_logs',
    counsellors: 'counsellors',
    sessions: 'sessions',
    users: 'users',
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

        // Create daily_logs store
        if (!db.objectStoreNames.contains(STORES.daily_logs)) {
          const logsStore = db.createObjectStore(STORES.daily_logs, { keyPath: 'id', autoIncrement: true });
          logsStore.createIndex('date', 'date', { unique: false });
          logsStore.createIndex('userId', 'userId', { unique: false });
        }

        // Create counsellors store
        if (!db.objectStoreNames.contains(STORES.counsellors)) {
          const counsellorsStore = db.createObjectStore(STORES.counsellors, { keyPath: 'id', autoIncrement: true });
          counsellorsStore.createIndex('name', 'name', { unique: false });
          counsellorsStore.createIndex('specialization', 'specialization', { unique: false });
        }

        // Create sessions store
        if (!db.objectStoreNames.contains(STORES.sessions)) {
          const sessionsStore = db.createObjectStore(STORES.sessions, { keyPath: 'id', autoIncrement: true });
          sessionsStore.createIndex('userId', 'userId', { unique: false });
          sessionsStore.createIndex('counsellorId', 'counsellorId', { unique: false });
          sessionsStore.createIndex('time', 'time', { unique: false });
        }

        // Create users store
        if (!db.objectStoreNames.contains(STORES.users)) {
          const usersStore = db.createObjectStore(STORES.users, { keyPath: 'id', autoIncrement: true });
          usersStore.createIndex('userId', 'userId', { unique: true });
          usersStore.createIndex('name', 'name', { unique: false });
          usersStore.createIndex('email', 'email', { unique: false });
        }

        // Create feedback store
        if (!db.objectStoreNames.contains(STORES.feedback)) {
          const feedbackStore = db.createObjectStore(STORES.feedback, { keyPath: 'id', autoIncrement: true });
          feedbackStore.createIndex('sessionId', 'sessionId', { unique: false });
          feedbackStore.createIndex('counsellorId', 'counsellorId', { unique: false });
          feedbackStore.createIndex('date', 'date', { unique: false });
        }

        // Create progress store
        if (!db.objectStoreNames.contains(STORES.progress)) {
          const progressStore = db.createObjectStore(STORES.progress, { keyPath: 'id', autoIncrement: true });
          progressStore.createIndex('userId', 'userId', { unique: false });
          progressStore.createIndex('date', 'date', { unique: false });
          progressStore.createIndex('category', 'category', { unique: false });
        }

        // Create recommendations store
        if (!db.objectStoreNames.contains(STORES.recommendations)) {
          const recommendationsStore = db.createObjectStore(STORES.recommendations, { keyPath: 'id', autoIncrement: true });
          recommendationsStore.createIndex('userId', 'userId', { unique: false });
          recommendationsStore.createIndex('category', 'category', { unique: false });
          recommendationsStore.createIndex('priority', 'priority', { unique: false });
        }

        // Create AI analysis store
        if (!db.objectStoreNames.contains(STORES.ai_analysis)) {
          const aiAnalysisStore = db.createObjectStore(STORES.ai_analysis, { keyPath: 'id', autoIncrement: true });
          aiAnalysisStore.createIndex('userId', 'userId', { unique: false });
          aiAnalysisStore.createIndex('date', 'date', { unique: false });
          aiAnalysisStore.createIndex('riskLevel', 'riskLevel', { unique: false });
        }

        // Create crisis alerts store
        if (!db.objectStoreNames.contains(STORES.crisis_alerts)) {
          const crisisAlertsStore = db.createObjectStore(STORES.crisis_alerts, { keyPath: 'id', autoIncrement: true });
          crisisAlertsStore.createIndex('userId', 'userId', { unique: false });
          crisisAlertsStore.createIndex('date', 'date', { unique: false });
          crisisAlertsStore.createIndex('severity', 'severity', { unique: false });
          crisisAlertsStore.createIndex('status', 'status', { unique: false });
        }

        // Create emergency contacts store
        if (!db.objectStoreNames.contains(STORES.emergency_contacts)) {
          const emergencyContactsStore = db.createObjectStore(STORES.emergency_contacts, { keyPath: 'id', autoIncrement: true });
          emergencyContactsStore.createIndex('userId', 'userId', { unique: false });
          emergencyContactsStore.createIndex('type', 'type', { unique: false });
        }
      };
      req.onsuccess = (e) => {
        _db = e.target.result;
        resolve(_db);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  function addLog(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.daily_logs, 'readwrite');
        const store = tx.objectStore(STORES.daily_logs);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllLogs() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.daily_logs, 'readonly');
        const store = tx.objectStore(STORES.daily_logs);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteLog(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.daily_logs, 'readwrite');
        const store = tx.objectStore(STORES.daily_logs);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === COUNSELLOR OPERATIONS ===
  function addCounsellor(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.counsellors, 'readwrite');
        const store = tx.objectStore(STORES.counsellors);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllCounsellors() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.counsellors, 'readonly');
        const store = tx.objectStore(STORES.counsellors);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteCounsellor(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.counsellors, 'readwrite');
        const store = tx.objectStore(STORES.counsellors);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === SESSION OPERATIONS ===
  function addSession(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.sessions, 'readwrite');
        const store = tx.objectStore(STORES.sessions);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllSessions() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.sessions, 'readonly');
        const store = tx.objectStore(STORES.sessions);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteSession(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.sessions, 'readwrite');
        const store = tx.objectStore(STORES.sessions);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === USER OPERATIONS ===
  function addUser(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.users, 'readwrite');
        const store = tx.objectStore(STORES.users);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.users, 'readonly');
        const store = tx.objectStore(STORES.users);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.users, 'readwrite');
        const store = tx.objectStore(STORES.users);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function updateUser(id, entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.users, 'readwrite');
        const store = tx.objectStore(STORES.users);
        entry.id = Number(id);
        const req = store.put(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === FEEDBACK OPERATIONS ===
  function addFeedback(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.feedback, 'readwrite');
        const store = tx.objectStore(STORES.feedback);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllFeedback() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.feedback, 'readonly');
        const store = tx.objectStore(STORES.feedback);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getFeedbackBySession(sessionId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.feedback, 'readonly');
        const store = tx.objectStore(STORES.feedback);
        const index = store.index('sessionId');
        const req = index.getAll(Number(sessionId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getFeedbackByCounsellor(counsellorId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.feedback, 'readonly');
        const store = tx.objectStore(STORES.feedback);
        const index = store.index('counsellorId');
        const req = index.getAll(Number(counsellorId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteFeedback(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.feedback, 'readwrite');
        const store = tx.objectStore(STORES.feedback);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === PROGRESS OPERATIONS ===
  function addProgress(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.progress, 'readwrite');
        const store = tx.objectStore(STORES.progress);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllProgress() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.progress, 'readonly');
        const store = tx.objectStore(STORES.progress);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getProgressByUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.progress, 'readonly');
        const store = tx.objectStore(STORES.progress);
        const index = store.index('userId');
        const req = index.getAll(Number(userId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteProgress(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.progress, 'readwrite');
        const store = tx.objectStore(STORES.progress);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === RECOMMENDATIONS OPERATIONS ===
  function addRecommendation(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.recommendations, 'readwrite');
        const store = tx.objectStore(STORES.recommendations);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllRecommendations() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.recommendations, 'readonly');
        const store = tx.objectStore(STORES.recommendations);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getRecommendationsByUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.recommendations, 'readonly');
        const store = tx.objectStore(STORES.recommendations);
        const index = store.index('userId');
        const req = index.getAll(Number(userId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getRecommendationsByCategory(category) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.recommendations, 'readonly');
        const store = tx.objectStore(STORES.recommendations);
        const index = store.index('category');
        const req = index.getAll(category);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteRecommendation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.recommendations, 'readwrite');
        const store = tx.objectStore(STORES.recommendations);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // === AI ANALYSIS OPERATIONS ===
  function addAIAnalysis(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.ai_analysis, 'readwrite');
        const store = tx.objectStore(STORES.ai_analysis);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllAIAnalysis() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.ai_analysis, 'readonly');
        const store = tx.objectStore(STORES.ai_analysis);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAIAnalysisByUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.ai_analysis, 'readonly');
        const store = tx.objectStore(STORES.ai_analysis);
        const index = store.index('userId');
        const req = index.getAll(Number(userId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteAIAnalysis(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.ai_analysis, 'readwrite');
        const store = tx.objectStore(STORES.ai_analysis);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // ===== CRISIS ALERTS FUNCTIONS =====
  function addCrisisAlert(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.crisis_alerts, 'readwrite');
        const store = tx.objectStore(STORES.crisis_alerts);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllCrisisAlerts() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.crisis_alerts, 'readonly');
        const store = tx.objectStore(STORES.crisis_alerts);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getCrisisAlertsByUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.crisis_alerts, 'readonly');
        const store = tx.objectStore(STORES.crisis_alerts);
        const index = store.index('userId');
        const req = index.getAll(Number(userId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function updateCrisisAlertStatus(id, status) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.crisis_alerts, 'readwrite');
        const store = tx.objectStore(STORES.crisis_alerts);
        const getReq = store.get(Number(id));
        getReq.onsuccess = () => {
          const data = getReq.result;
          data.status = status;
          data.statusUpdated = new Date().toISOString();
          const updateReq = store.put(data);
          updateReq.onsuccess = () => resolve(updateReq.result);
          updateReq.onerror = (e) => reject(e.target.error);
        };
        getReq.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteCrisisAlert(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.crisis_alerts, 'readwrite');
        const store = tx.objectStore(STORES.crisis_alerts);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  // ===== EMERGENCY CONTACTS FUNCTIONS =====
  function addEmergencyContact(entry) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.emergency_contacts, 'readwrite');
        const store = tx.objectStore(STORES.emergency_contacts);
        const req = store.add(entry);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getAllEmergencyContacts() {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.emergency_contacts, 'readonly');
        const store = tx.objectStore(STORES.emergency_contacts);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function getEmergencyContactsByUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.emergency_contacts, 'readonly');
        const store = tx.objectStore(STORES.emergency_contacts);
        const index = store.index('userId');
        const req = index.getAll(Number(userId));
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function updateEmergencyContact(id, updates) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.emergency_contacts, 'readwrite');
        const store = tx.objectStore(STORES.emergency_contacts);
        const getReq = store.get(Number(id));
        getReq.onsuccess = () => {
          const data = { ...getReq.result, ...updates };
          const updateReq = store.put(data);
          updateReq.onsuccess = () => resolve(updateReq.result);
          updateReq.onerror = (e) => reject(e.target.error);
        };
        getReq.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  function deleteEmergencyContact(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await init();
        const tx = _db.transaction(STORES.emergency_contacts, 'readwrite');
        const store = tx.objectStore(STORES.emergency_contacts);
        const req = store.delete(Number(id));
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e.target.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  return {
    init,
    addLog, getAllLogs, deleteLog,
    addCounsellor, getAllCounsellors, deleteCounsellor,
    addSession, getAllSessions, deleteSession,
    addUser, getAllUsers, deleteUser, updateUser,
    addFeedback, getAllFeedback, getFeedbackBySession, getFeedbackByCounsellor, deleteFeedback,
    addProgress, getAllProgress, getProgressByUser, deleteProgress,
    addRecommendation, getAllRecommendations, getRecommendationsByUser, getRecommendationsByCategory, deleteRecommendation,
    addAIAnalysis, getAllAIAnalysis, getAIAnalysisByUser, deleteAIAnalysis,
    addCrisisAlert, getAllCrisisAlerts, getCrisisAlertsByUser, updateCrisisAlertStatus, deleteCrisisAlert,
    addEmergencyContact, getAllEmergencyContacts, getEmergencyContactsByUser, updateEmergencyContact, deleteEmergencyContact
  };
})();

// Expose for other scripts
window.DailyDB = DB;
