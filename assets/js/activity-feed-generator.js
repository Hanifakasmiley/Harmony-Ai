/**
 * Harmony AI - Activity Feed Generator
 * Generates recent activity feed for the System Administrator Dashboard
 */

const ActivityFeedGenerator = (function () {

    /**
     * Generate activity items from database records
     */
    function generateActivityItems(users, sessions, alerts, logs, analysis) {
        const activities = [];

        // New user registrations (last 5)
        users.slice(-5).forEach(user => {
            activities.push({
                type: 'registration',
                icon: '👤',
                color: '#4facfe',
                title: 'New User Registration',
                description: `New user registered: ${user.full_name}`,
                timestamp: new Date(user.created_at || Date.now()),
                link: null
            });
        });

        // New sessions (last 5)
        sessions.slice(-5).forEach(session => {
            activities.push({
                type: 'session',
                icon: '📅',
                color: '#2A9D8F',
                title: 'New Session Scheduled',
                description: `Session scheduled with counsellor ID ${session.counsellor_id}`,
                timestamp: new Date(session.session_time || Date.now()),
                link: null
            });
        });

        // Crisis alerts (last 5)
        alerts.slice(-5).forEach(alert => {
            activities.push({
                type: 'crisis',
                icon: '🚨',
                color: '#ff6b6b',
                title: 'Crisis Alert Triggered',
                description: `Crisis alert for user ID ${alert.user_id} - Risk Level: ${alert.risk_level}`,
                timestamp: new Date(alert.alert_timestamp || Date.now()),
                link: null
            });
        });

        // Significant mood changes (last 5)
        logs.slice(-5).forEach(log => {
            activities.push({
                type: 'mood',
                icon: '📊',
                color: '#ffa500',
                title: 'Mood Log Entry',
                description: `User ID ${log.user_id} logged mood: ${log.mood_level}/10`,
                timestamp: new Date(log.log_date || Date.now()),
                link: null
            });
        });

        // New AI analysis (last 5)
        analysis.slice(-5).forEach(item => {
            activities.push({
                type: 'analysis',
                icon: '🤖',
                color: '#764ba2',
                title: 'AI Analysis Generated',
                description: `AI analysis for user ID ${item.user_id} - Risk Score: ${item.risk_score}`,
                timestamp: new Date(item.created_at || Date.now()),
                link: null
            });
        });

        // Sort by timestamp (newest first) and limit to 10
        return activities
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10);
    }

    /**
     * Format timestamp as relative time (e.g., "5 minutes ago")
     */
    function formatRelativeTime(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    }

    /**
     * Generate HTML for activity feed
     */
    function generateActivityFeedHTML(activities) {
        let html = '<div style="max-height: 500px; overflow-y: auto;">';

        if (activities.length === 0) {
            html += '<p style="text-align: center; color: #999; padding: 2rem;">No recent activity</p>';
        } else {
            activities.forEach(activity => {
                html += `
                    <div style="
                        display: flex;
                        gap: 1rem;
                        padding: 1rem;
                        border-left: 4px solid ${activity.color};
                        background: rgba(0, 0, 0, 0.02);
                        margin-bottom: 0.75rem;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    " onmouseover="this.style.background='rgba(0, 0, 0, 0.05)'" onmouseout="this.style.background='rgba(0, 0, 0, 0.02)'">
                        <div style="font-size: 1.5rem; min-width: 2rem; text-align: center;">
                            ${activity.icon}
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--text-primary);">
                                ${activity.title}
                            </div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">
                                ${activity.description}
                            </div>
                            <div style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">
                                ${formatRelativeTime(activity.timestamp)}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div>';
        return html;
    }

    // Public API
    return {
        generateActivityItems: generateActivityItems,
        generateActivityFeedHTML: generateActivityFeedHTML,
        formatRelativeTime: formatRelativeTime
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActivityFeedGenerator;
}
