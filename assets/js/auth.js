/**
 * Harmony AI - Auth Button Handler
 * Shows Login button if not logged in, Logout button if logged in
 */

function updateAuthBtn() {
    const btn = document.getElementById('authBtn');
    if (!btn) return;

    const userId = localStorage.getItem('userId');

    if (userId) {
        // User is logged in - show Logout
        btn.innerHTML = '🔓 Logout';
        btn.className = 'nav-auth-btn logout';
        btn.href = '#';
        btn.onclick = function (e) {
            e.preventDefault();
            logout();
        };
    } else {
        // User not logged in - show Login
        btn.innerHTML = '🔐 Login';
        btn.className = 'nav-auth-btn login';
        btn.href = './login.html';
        btn.onclick = null;
    }
}

async function logout() {
    // Destroy backend session
    try {
        await fetch('http://localhost:3000/Harmony-Ai/backend/destroy_session.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.warn('Session destruction failed:', error);
    }

    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('designation');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    window.location.href = './login.html';
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateAuthBtn);
