/**
 * Comprehensive Admin Dashboard
 * Displays Patients, AI Analysis, Sessions, and All Users
 */

let currentTable = 'patients';
let currentData = [];
let allData = {};
let currentSort = { column: null, direction: 'asc' };
let currentFilter = null;

// Table configurations
const tableConfigs = {
    patients: {
        title: '👥 Patients',
        columns: ['user_id', 'full_name', 'email', 'phone', 'gender', 'date_of_birth', 'preferences'],
        columnLabels: {
            user_id: 'User ID',
            full_name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            gender: 'Gender',
            date_of_birth: 'Date of Birth',
            preferences: 'Preferences'
        },
        searchFields: ['full_name', 'email'],
        sortable: true,
        hasFilter: false
    },
    ai_analysis: {
        title: '🤖 AI Analysis',
        columns: ['analysis_id', 'patient_name', 'user_id', 'risk_score', 'risk_level', 'sentiment_value', 'emotion_label', 'created_at'],
        columnLabels: {
            analysis_id: 'Analysis ID',
            patient_name: 'Patient Name',
            user_id: 'Patient ID',
            risk_score: 'Risk Score',
            risk_level: 'Risk Level',
            sentiment_value: 'Sentiment',
            emotion_label: 'Emotion',
            created_at: 'Timestamp'
        },
        searchFields: ['patient_name', 'emotion_label'],
        sortable: true,
        hasFilter: false
    },
    sessions: {
        title: '👨‍⚕️ Sessions',
        columns: ['session_id', 'patient_name', 'user_id', 'counsellor_name', 'counsellor_id', 'session_time', 'session_status'],
        columnLabels: {
            session_id: 'Session ID',
            patient_name: 'Patient Name',
            user_id: 'Patient ID',
            counsellor_name: 'Counsellor Name',
            counsellor_id: 'Counsellor ID',
            session_time: 'Session Date/Time',
            session_status: 'Status'
        },
        searchFields: ['patient_name', 'counsellor_name'],
        sortable: true,
        hasFilter: false
    },
    users: {
        title: '👤 All Users',
        columns: ['user_id', 'full_name', 'email', 'designation', 'phone', 'date_of_birth'],
        columnLabels: {
            user_id: 'User ID',
            full_name: 'Full Name',
            email: 'Email',
            designation: 'Designation',
            phone: 'Phone',
            date_of_birth: 'Date of Birth'
        },
        searchFields: ['full_name', 'email', 'designation'],
        sortable: true,
        hasFilter: true,
        filterField: 'designation'
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Comprehensive Dashboard Initializing...');

    // Check permissions
    const designation = localStorage.getItem('designation');
    console.log('User designation:', designation);

    if (designation !== 'System Administrator') {
        alert('Access Denied: Only System Administrators can access this dashboard.');
        window.location.href = './dashboard.html';
        return;
    }

    // Setup event listeners
    setupTabNavigation();
    setupSearch();
    setupTheme();
    setupMobileMenu();
    updateAuthButton();

    console.log('✅ Dashboard setup complete, loading initial data...');

    // Load initial data
    await loadTableData('patients');
});

// Setup tab navigation
function setupTabNavigation() {
    document.querySelectorAll('.table-tab').forEach(tab => {
        tab.addEventListener('click', async () => {
            document.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTable = tab.dataset.table;
            currentSort = { column: null, direction: 'asc' };
            currentFilter = null;
            document.getElementById('searchInput').value = '';
            await loadTableData(currentTable);
        });
    });
}

// Setup search
function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterAndRenderTable(searchTerm, currentFilter);
    });
}

// Setup theme
function setupTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Update auth button
function updateAuthButton() {
    const userId = localStorage.getItem('userId');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (userId) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    }
}

// Logout
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('designation');
    window.location.href = './login.html';
}

// Load table data
async function loadTableData(table) {
    const container = document.getElementById('dataTableContainer');
    const config = tableConfigs[table];

    // Update title
    document.getElementById('tableTitle').textContent = config.title;

    // Show/hide filter
    const filterContainer = document.getElementById('filterContainer');
    if (config.hasFilter) {
        filterContainer.style.display = 'block';
        await populateDesignationFilter();
    } else {
        filterContainer.style.display = 'none';
    }

    // Show loading state
    container.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Loading data...</p></div>';

    try {
        let data = [];

        console.log(`📊 Loading ${table} data...`);

        // Fetch data based on table type
        if (table === 'patients') {
            data = await fetchPatientsData();
        } else if (table === 'ai_analysis') {
            data = await fetchAIAnalysisData();
        } else if (table === 'sessions') {
            data = await fetchSessionsData();
        } else if (table === 'users') {
            data = await fetchAllUsersData();
        }

        console.log(`✅ ${table} data loaded:`, data);

        currentData = data;
        allData[table] = data;

        // Render table
        renderTable(data, table);
        updatePaginationInfo(data.length);

    } catch (error) {
        console.error('❌ Error loading data:', error);
        container.innerHTML = `<div class="error-state">❌ Error loading data: ${error.message}<br><button onclick="loadTableData('${table}')">Retry</button></div>`;
    }
}

// Fetch patients data
async function fetchPatientsData() {
    try {
        const apiUrl = 'http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=users';
        console.log('🔍 Fetching patients from:', apiUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`⚠️ API returned status ${response.status}`);
            throw new Error(`HTTP ${response.status}`);
        }

        const users = await response.json();
        console.log('✅ Patients data received from API:', users);

        if (!Array.isArray(users) || users.length === 0) {
            console.warn('⚠️ API returned empty or invalid data, using mock data');
            return PatientData.getUsers().filter(u => u.designation === 'Patient/User');
        }

        // Filter only patients
        return users.filter(u => u.designation === 'Patient/User');
    } catch (error) {
        console.warn('❌ API failed, using mock data:', error.message);
        const mockData = PatientData.getUsers().filter(u => u.designation === 'Patient/User');
        console.log('📦 Using mock data:', mockData);
        return mockData;
    }
}

// Fetch AI analysis data
async function fetchAIAnalysisData() {
    try {
        const apiUrl = 'http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=ai_analysis';
        console.log('🔍 Fetching AI analysis from:', apiUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const analyses = await response.json();
        const usersResponse = await fetch('http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=users');
        const users = await usersResponse.json();

        // Join with user names
        return analyses.map(a => ({
            ...a,
            patient_name: users.find(u => u.user_id === a.user_id)?.full_name || 'Unknown',
            risk_level: a.risk_score > 70 ? 'High' : a.risk_score > 40 ? 'Medium' : 'Low',
            created_at: a.created_at || new Date().toISOString()
        }));
    } catch (error) {
        console.warn('❌ API failed, using mock data:', error.message);
        const analyses = PatientData.getAIAnalysis();
        const users = PatientData.getUsers();
        return analyses.map(a => ({
            ...a,
            patient_name: users.find(u => u.user_id === a.user_id)?.full_name || 'Unknown',
            risk_level: a.risk_score > 70 ? 'High' : a.risk_score > 40 ? 'Medium' : 'Low',
            created_at: new Date().toISOString()
        }));
    }
}

// Fetch sessions data
async function fetchSessionsData() {
    try {
        const apiUrl = 'http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=sessions';
        console.log('🔍 Fetching sessions from:', apiUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const sessions = await response.json();
        const users = await fetch('http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=users').then(r => r.json());
        const counsellors = await fetch('http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=counsellors').then(r => r.json());

        // Join with names
        return sessions.map(s => ({
            ...s,
            patient_name: users.find(u => u.user_id === s.user_id)?.full_name || 'Unknown',
            counsellor_name: counsellors.find(c => c.counsellor_id === s.counsellor_id)?.name || 'Unknown',
            session_status: 'Scheduled'
        }));
    } catch (error) {
        console.warn('❌ API failed, using mock data:', error.message);
        const sessions = PatientData.getSessions();
        const users = PatientData.getUsers();
        const counsellors = PatientData.getCounsellors();
        return sessions.map(s => ({
            ...s,
            patient_name: users.find(u => u.user_id === s.user_id)?.full_name || 'Unknown',
            counsellor_name: counsellors.find(c => c.counsellor_id === s.counsellor_id)?.name || 'Unknown',
            session_status: 'Scheduled'
        }));
    }
}

// Fetch all users data
async function fetchAllUsersData() {
    try {
        const apiUrl = 'http://localhost:3000/Harmony-Ai/backend/api.php?endpoint=users';
        console.log('🔍 Fetching all users from:', apiUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const users = await response.json();
        console.log('✅ Users data received from API:', users);
        return users;
    } catch (error) {
        console.warn('❌ API failed, using mock data:', error.message);
        const mockData = PatientData.getUsers();
        console.log('📦 Using mock data:', mockData);
        return mockData;
    }
}

// Populate designation filter
async function populateDesignationFilter() {
    const filterSelect = document.getElementById('filterSelect');
    const data = allData['users'] || await fetchAllUsersData();
    const designations = [...new Set(data.map(u => u.designation))].sort();

    filterSelect.innerHTML = '<option value="">All Designations</option>';
    designations.forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = d;
        filterSelect.appendChild(option);
    });

    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value || null;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        filterAndRenderTable(searchTerm, currentFilter);
    });
}

// Filter and render table
function filterAndRenderTable(searchTerm, filter) {
    let filtered = currentData;

    // Apply search
    if (searchTerm) {
        const config = tableConfigs[currentTable];
        filtered = filtered.filter(row => {
            return config.searchFields.some(field => {
                const value = row[field];
                return value && value.toString().toLowerCase().includes(searchTerm);
            });
        });
    }

    // Apply filter
    if (filter && currentTable === 'users') {
        filtered = filtered.filter(row => row.designation === filter);
    }

    // Apply sort
    if (currentSort.column) {
        filtered = sortData(filtered, currentSort.column, currentSort.direction);
    }

    renderTable(filtered, currentTable);
    updatePaginationInfo(filtered.length);
}

// Sort data
function sortData(data, column, direction) {
    const sorted = [...data].sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        // Handle null/undefined
        if (aVal == null) aVal = '';
        if (bVal == null) bVal = '';

        // Convert to lowercase for string comparison
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    return sorted;
}

// Render table
function renderTable(data, table) {
    const container = document.getElementById('dataTableContainer');
    const config = tableConfigs[table];

    if (!data || data.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="icon">📭</div><p>No records found</p></div>';
        return;
    }

    let html = '<table class="data-table"><thead><tr>';

    // Header
    config.columns.forEach(col => {
        const label = config.columnLabels[col] || col;
        const sortClass = currentSort.column === col ? (currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc') : 'sortable';
        html += `<th class="${sortClass}" onclick="handleSort('${col}')">${label}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Rows
    data.forEach(row => {
        html += '<tr>';
        config.columns.forEach(col => {
            let value = row[col] ?? '-';

            // Format specific columns
            if (col === 'risk_score') {
                value = `${value}%`;
            } else if (col === 'risk_level') {
                const badgeClass = value === 'High' ? 'badge-high' : value === 'Medium' ? 'badge-medium' : 'badge-low';
                value = `<span class="badge ${badgeClass}">${value}</span>`;
            } else if (col === 'sentiment_value') {
                value = parseFloat(value).toFixed(2);
            } else if (col === 'session_status') {
                const badgeClass = value === 'Completed' ? 'badge-completed' : 'badge-scheduled';
                value = `<span class="badge ${badgeClass}">${value}</span>`;
            } else if (col === 'designation') {
                value = `<span class="badge badge-designation">${value}</span>`;
            } else if (col === 'preferences' || col === 'session_notes') {
                // Truncate long text
                if (value && value.length > 50) {
                    value = value.substring(0, 50) + '...';
                }
            }

            html += `<td>${value}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Handle sort
function handleSort(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filterAndRenderTable(searchTerm, currentFilter);
}

// Refresh data
async function refreshData() {
    await loadTableData(currentTable);
}

// Update pagination info
function updatePaginationInfo(count) {
    const paginationInfo = document.getElementById('paginationInfo');
    const recordCount = document.getElementById('recordCount');
    if (count > 0) {
        paginationInfo.style.display = 'flex';
        recordCount.textContent = `Showing ${count} record${count !== 1 ? 's' : ''}`;
    } else {
        paginationInfo.style.display = 'none';
    }
}
