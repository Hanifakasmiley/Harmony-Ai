document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const sel = document.getElementById('designation');
    if (!form || !sel || !nameInput || !emailInput || !passwordInput) {
        return console.error('login elements missing');
    }

    // Map of role keys -> destination URLs (customize as needed)
    const roleMap = {
        // Patients should land on the daily logs page to record mood
        patient: './feature-daily-logs.html',
        // Technical staff land on the general dashboard
        software_engineer: './dashboard.html',
        // Data/ML roles go to AI analysis pages
        ai_engineer: './feature-ai-analysis.html',
        data_scientist: './feature-ai-analysis.html',
        // Mental health administrators manage sessions
        mental_health_admin: './feature-sessions.html',
        // Emergency team goes to crisis support
        emergency_team: './feature-crisis.html',
        // Security, financial, and system admins use the dashboard
        security_analyst: './dashboard.html',
        financial_team: './dashboard.html',
        system_admin: './dashboard.html'
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value && nameInput.value.trim();
        const email = emailInput.value && emailInput.value.trim();
        const password = passwordInput.value && passwordInput.value.trim();
        const selected = sel.value && sel.value.trim();

        if (!name) {
            alert('Please enter your full name.');
            nameInput.focus();
            return;
        }

        if (!email) {
            alert('Please enter your email address.');
            emailInput.focus();
            return;
        }

        // Simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        if (!password) {
            alert('Please enter your password.');
            passwordInput.focus();
            return;
        }

        if (!selected) {
            alert('Please select a designation.');
            sel.focus();
            return;
        }

        const designationText = sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].text;
        const selectedRole = selected;

        // Persist user credentials and role info in localStorage
        try {
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            // Do NOT store plaintext passwords in localStorage — security risk.
            // localStorage.setItem('userPassword', password);
            localStorage.setItem('userRole', selectedRole);
            localStorage.setItem('designation', designationText);
        } catch (err) {
            console.warn('Unable to access localStorage:', err);
        }

        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '⏳ Loading...';
        }

        // Determine destination
        const dest = roleMap[selectedRole] || './dashboard.html';
        console.log('Login user:', name, '| Email:', email, '| Role:', selectedRole, '-> redirect to', dest);

        // Simple delay for UX
        setTimeout(() => {
            window.location.href = dest;
        }, 250);
    });
});
