/**
 * Harmony AI - Onboarding Tour & Notification System
 */

// ===== ONBOARDING TOUR =====
const OnboardingTour = {
    steps: [
        {
            target: '.nav-logo',
            title: '🧠 Welcome to Harmony AI!',
            description: 'Your AI-powered mental health companion. Let us show you around.',
            position: 'bottom'
        },
        {
            target: '.nav-menu',
            title: '📍 Navigation Menu',
            description: 'Access Daily Logs, AI Analysis, Sessions, Progress, and Crisis Support.',
            position: 'bottom'
        },
        {
            target: '.theme-toggle',
            title: '🌙 Dark/Light Mode',
            description: 'Toggle themes for comfortable viewing any time.',
            position: 'bottom'
        },
        {
            target: '.notification-bell',
            title: '🔔 Notifications',
            description: 'Stay updated with alerts and reminders.',
            position: 'bottom'
        },
        {
            target: '.user-avatar-container',
            title: '👤 Your Profile',
            description: 'Access settings and logout from here.',
            position: 'bottom'
        }
    ],
    currentStep: 0,
    isActive: false,

    init() {
        const hasCompleted = localStorage.getItem('harmonyAI_tourCompleted');
        const userId = localStorage.getItem('userId');
        if (userId && !hasCompleted) {
            setTimeout(() => this.showWelcomeModal(), 1000);
        }
    },

    showWelcomeModal() {
        const userName = this.getUserName();
        const html = `
            <div class="onboarding-overlay active" id="onboardingOverlay"></div>
            <div class="welcome-modal" id="welcomeModal">
                <div class="welcome-modal-icon">👋</div>
                <h2>Welcome${userName ? ', ' + userName : ''}!</h2>
                <p>Would you like a quick tour of Harmony AI?</p>
                <div class="welcome-modal-actions">
                    <button class="btn-start-tour" onclick="OnboardingTour.startTour()">🚀 Show Me Around</button>
                    <button class="btn-skip-tour" onclick="OnboardingTour.skipTour()">Maybe Later</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    getUserName() {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
            return user.name || user.full_name || '';
        } catch (e) { return ''; }
    },

    startTour() {
        document.getElementById('welcomeModal')?.remove();
        document.getElementById('onboardingOverlay')?.remove();
        this.isActive = true;
        this.currentStep = 0;
        this.showStep(0);
    },

    skipTour() {
        document.getElementById('welcomeModal')?.remove();
        document.getElementById('onboardingOverlay')?.remove();
        localStorage.setItem('harmonyAI_tourCompleted', 'true');
    },

    showStep(idx) {
        document.querySelector('.onboarding-tooltip')?.remove();
        document.querySelector('.onboarding-highlight')?.classList.remove('onboarding-highlight');

        if (idx >= this.steps.length) { this.completeTour(); return; }

        const step = this.steps[idx];
        const target = document.querySelector(step.target);
        if (!target) { this.showStep(idx + 1); return; }

        let overlay = document.getElementById('onboardingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'onboardingOverlay';
            overlay.className = 'onboarding-overlay active';
            document.body.appendChild(overlay);
        }

        target.classList.add('onboarding-highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            const tooltip = this.createTooltip(step, idx);
            this.positionTooltip(tooltip, target, step.position);
        }, 300);
    },

    createTooltip(step, idx) {
        const total = this.steps.length;
        const progress = ((idx + 1) / total) * 100;
        const html = `
            <div class="onboarding-tooltip arrow-top">
                <div class="onboarding-step-indicator">
                    ${this.steps.map((_, i) => `<div class="onboarding-step-dot ${i < idx ? 'completed' : ''} ${i === idx ? 'active' : ''}"></div>`).join('')}
                </div>
                <div class="onboarding-title">${step.title}</div>
                <div class="onboarding-description">${step.description}</div>
                <div class="onboarding-actions">
                    <button class="onboarding-skip" onclick="OnboardingTour.skipTour()">Skip</button>
                    <div class="onboarding-nav">
                        ${idx > 0 ? '<button class="onboarding-btn prev" onclick="OnboardingTour.prevStep()">← Back</button>' : ''}
                        <button class="onboarding-btn next" onclick="OnboardingTour.nextStep()">${idx === total - 1 ? 'Finish ✓' : 'Next →'}</button>
                    </div>
                </div>
                <div class="onboarding-progress"><div class="onboarding-progress-bar" style="width:${progress}%"></div></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        return document.querySelector('.onboarding-tooltip');
    },

    positionTooltip(tooltip, target, position) {
        const tr = target.getBoundingClientRect();
        const ttr = tooltip.getBoundingClientRect();
        let top = tr.bottom + 20;
        let left = tr.left + (tr.width / 2) - (ttr.width / 2);
        left = Math.max(20, Math.min(left, window.innerWidth - ttr.width - 20));
        top = Math.max(20, Math.min(top, window.innerHeight - ttr.height - 20));
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    },

    nextStep() { this.currentStep++; this.showStep(this.currentStep); },
    prevStep() { if (this.currentStep > 0) { this.currentStep--; this.showStep(this.currentStep); } },

    completeTour() {
        document.querySelector('.onboarding-tooltip')?.remove();
        document.querySelector('.onboarding-highlight')?.classList.remove('onboarding-highlight');
        document.getElementById('onboardingOverlay')?.remove();
        localStorage.setItem('harmonyAI_tourCompleted', 'true');
        this.isActive = false;
        NotificationSystem.show('🎉 Tour Complete!', 'You\'re ready to start!', 'success');
    },

    restart() {
        localStorage.removeItem('harmonyAI_tourCompleted');
        this.currentStep = 0;
        this.showWelcomeModal();
    }
};

// ===== NOTIFICATION SYSTEM =====
const NotificationSystem = {
    notifications: [],

    init() {
        this.loadNotifications();
        this.render();
    },

    loadNotifications() {
        const stored = localStorage.getItem('harmonyAI_notifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
        } else {
            this.notifications = [
                { id: 1, type: 'info', title: 'Welcome!', text: 'Start by logging your daily mood.', time: new Date().toISOString(), read: false },
                { id: 2, type: 'success', title: 'AI Ready', text: 'Your analysis dashboard is ready.', time: new Date(Date.now() - 3600000).toISOString(), read: false }
            ];
            this.save();
        }
    },

    save() { localStorage.setItem('harmonyAI_notifications', JSON.stringify(this.notifications)); },

    render() {
        const container = document.querySelector('.notification-bell');
        if (!container) return;

        const unread = this.notifications.filter(n => !n.read).length;
        const badge = container.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = unread > 9 ? '9+' : unread;
            badge.classList.toggle('hidden', unread === 0);
        }

        const dropdown = container.querySelector('.notification-list');
        if (dropdown) {
            dropdown.innerHTML = this.notifications.length === 0
                ? '<div class="notification-empty"><div class="notification-empty-icon">🔔</div><p>No notifications</p></div>'
                : this.notifications.map(n => this.renderItem(n)).join('');
        }
    },

    renderItem(n) {
        const icons = { info: '💡', success: '✅', warning: '⚠️', danger: '🚨' };
        return `
            <div class="notification-item ${n.read ? '' : 'unread'}" onclick="NotificationSystem.markAsRead(${n.id})">
                <div class="notification-icon ${n.type}">${icons[n.type]}</div>
                <div class="notification-content">
                    <div class="notification-title">${n.title}</div>
                    <div class="notification-text">${n.text}</div>
                    <div class="notification-time">${this.formatTime(n.time)}</div>
                </div>
            </div>
        `;
    },

    formatTime(iso) {
        const diff = Date.now() - new Date(iso);
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    },

    add(title, text, type = 'info') {
        this.notifications.unshift({ id: Date.now(), type, title, text, time: new Date().toISOString(), read: false });
        this.save();
        this.render();
    },

    markAsRead(id) {
        const n = this.notifications.find(x => x.id === id);
        if (n) { n.read = true; this.save(); this.render(); }
    },

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.save();
        this.render();
    },

    show(title, message, type = 'info', duration = 4000) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const icons = { info: '💡', success: '✅', warning: '⚠️', error: '❌' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <div class="toast-message"><strong>${title}</strong><br><span>${message}</span></div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, duration);
    }
};

// ===== USER AVATAR =====
const UserAvatar = {
    init() { this.render(); },

    render() {
        const container = document.querySelector('.user-avatar-container');
        if (!container) return;

        const userId = localStorage.getItem('userId');
        if (!userId) { container.style.display = 'none'; return; }

        let userName = 'User', userRole = 'Patient', initials = 'U';
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
            userName = user.name || user.full_name || 'User';
            userRole = localStorage.getItem('designation') || 'Patient';
            initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        } catch (e) { }

        container.innerHTML = `
            <div class="user-avatar">${initials}</div>
            <div class="user-info">
                <span class="user-name">${userName}</span>
                <span class="user-role">${userRole}</span>
            </div>
            <div class="user-dropdown">
                <div class="user-dropdown-header">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-name">${userName}</div>
                    <div class="user-role">${userRole}</div>
                </div>
                <ul class="user-dropdown-menu">
                    <li><a href="./dashboard.html"><span class="menu-icon">📊</span> Dashboard</a></li>
                    <li><a href="./feature-daily-logs.html"><span class="menu-icon">📝</span> My Logs</a></li>
                    <li><a href="./feature-progress.html"><span class="menu-icon">📈</span> My Progress</a></li>
                    <li><a href="#" onclick="OnboardingTour.restart(); return false;"><span class="menu-icon">🎯</span> Restart Tour</a></li>
                    <div class="user-dropdown-divider"></div>
                    <li class="logout-item"><a href="#" onclick="logout(); return false;"><span class="menu-icon">🚪</span> Logout</a></li>
                </ul>
            </div>
        `;
        container.style.display = 'flex';
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        UserAvatar.init();
        NotificationSystem.init();
        OnboardingTour.init();
    }
});
