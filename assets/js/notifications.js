/**
 * Harmony AI - Toast Notification System
 * Shows success, error, and info messages
 */

const ToastNotification = {
    show: function (message, type = 'info', duration = 3000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;

        // Icon based on type
        const icons = {
            success: '✓',
            error: '✗',
            info: 'ℹ',
            warning: '⚠'
        };

        const icon = icons[type] || icons.info;

        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.5rem;">${icon}</span>
                <div style="flex: 1;">
                    <p style="margin: 0; color: var(--text-primary); font-weight: 600;">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; padding: 0; width: 24px; height: 24px;">×</button>
            </div>
        `;

        document.body.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    success: function (message, duration) {
        this.show(message, 'success', duration);
    },

    error: function (message, duration) {
        this.show(message, 'error', duration);
    },

    info: function (message, duration) {
        this.show(message, 'info', duration);
    },

    warning: function (message, duration) {
        this.show(message, 'warning', duration);
    }
};

// Button state utilities
const ButtonState = {
    setLoading: function (button, text = 'Loading...') {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `<span class="spinner"></span>${text}`;
        button.classList.add('loading');
    },

    setSuccess: function (button, text = 'Success!', resetAfter = 2000) {
        button.disabled = false;
        button.innerHTML = `✓ ${text}`;
        button.classList.remove('loading');
        button.classList.add('success');

        if (resetAfter) {
            setTimeout(() => this.reset(button), resetAfter);
        }
    },

    setError: function (button, text = 'Error', resetAfter = 2000) {
        button.disabled = false;
        button.innerHTML = `✗ ${text}`;
        button.classList.remove('loading');
        button.classList.add('error');

        if (resetAfter) {
            setTimeout(() => this.reset(button), resetAfter);
        }
    },

    reset: function (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML.replace(/^[✓✗⏳]\s*/, '');
        button.classList.remove('loading', 'success', 'error');
    }
};

// Form validation utilities
const FormValidation = {
    showSuccess: function (input, message) {
        this.clearValidation(input);
        input.classList.add('success');

        if (message) {
            const msg = document.createElement('div');
            msg.className = 'validation-message success';
            msg.textContent = message;
            input.parentElement.appendChild(msg);
        }
    },

    showError: function (input, message) {
        this.clearValidation(input);
        input.classList.add('error');

        if (message) {
            const msg = document.createElement('div');
            msg.className = 'validation-message error';
            msg.textContent = message;
            input.parentElement.appendChild(msg);
        }
    },

    clearValidation: function (input) {
        input.classList.remove('success', 'error');
        const existingMsg = input.parentElement.querySelector('.validation-message');
        if (existingMsg) {
            existingMsg.remove();
        }
    },

    validateEmail: function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validatePhone: function (phone) {
        const regex = /^[\d\s\-\+\(\)]+$/;
        return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    validateRequired: function (value) {
        return value && value.trim().length > 0;
    }
};

// Make globally available
window.ToastNotification = ToastNotification;
window.ButtonState = ButtonState;
window.FormValidation = FormValidation;
