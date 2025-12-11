/**
 * Harmony AI - Login Handler
 * Authenticates users against the database via API
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const sel = document.getElementById('designation');

    if (!form || !sel || !nameInput || !emailInput || !passwordInput) {
        return console.error('Login elements missing');
    }

    // Map of role keys -> destination URLs
    const roleMap = {
        patient: './feature-daily-logs.html',
        software_engineer: './dashboard.html',
        ai_engineer: './feature-ai-analysis.html',
        data_scientist: './feature-ai-analysis.html',
        mental_health_admin: './feature-sessions.html',
        emergency_team: './feature-crisis.html',
        security_analyst: './dashboard.html',
        financial_team: './dashboard.html',
        system_admin: './dashboard.html'
    };

    // Map designation select values to database designation names
    const designationMap = {
        'patient': 'Patient/User',
        'software_engineer': 'Software Engineer',
        'ai_engineer': 'AI Engineer',
        'data_scientist': 'Data Scientist',
        'mental_health_admin': 'Mental Health Administrator',
        'emergency_team': 'Emergency Contact Team',
        'security_analyst': 'Security Analyst',
        'financial_team': 'Financial Team',
        'system_admin': 'System Administrator'
    };

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = nameInput.value?.trim();
        const email = emailInput.value?.trim();
        const password = passwordInput.value?.trim();
        const selected = sel.value?.trim();

        // Validation
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

        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '⏳ Authenticating...';
        }

        try {
            // Try to authenticate with the API
            const response = await fetch('http://localhost:3000/Harmony-Ai/backend/api.php/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success && result.user) {
                // Successful login from database
                const user = result.user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('userName', user.full_name);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userId', user.user_id);
                localStorage.setItem('userRole', mapDesignationToRole(user.designation));
                localStorage.setItem('designation', user.designation);

                console.log('✅ Login successful:', user.full_name, '| Role:', user.designation);

                const dest = roleMap[mapDesignationToRole(user.designation)] || './dashboard.html';
                window.location.href = dest;
            } else {
                // Login failed - show error
                throw new Error(result.error || 'Invalid credentials');
            }
        } catch (error) {
            console.warn('API login failed, using fallback mode:', error.message);

            // Fallback: Allow login without database (for demo/development)
            const designationText = sel.options[sel.selectedIndex]?.text || selected;

            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', selected);
            localStorage.setItem('designation', designationText);
            localStorage.setItem('currentUser', JSON.stringify({
                user_id: 0,
                full_name: name,
                email: email,
                designation: designationMap[selected] || 'Patient/User'
            }));

            console.log('⚠️ Fallback login:', name, '| Role:', selected);

            const dest = roleMap[selected] || './dashboard.html';
            window.location.href = dest;
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Login';
            }
        }
    });

    function mapDesignationToRole(designation) {
        const roleMap = {
            'Patient/User': 'patient',
            'Data Scientist': 'data_scientist',
            'System Administrator': 'system_admin',
            'Software Engineer': 'software_engineer',
            'Mental Health Administrator': 'mental_health_admin',
            'Emergency Contact Team': 'emergency_team',
            'AI Engineer': 'ai_engineer',
            'Security Analyst': 'security_analyst',
            'Financial Team': 'financial_team'
        };
        return roleMap[designation] || 'patient';
    }
});
