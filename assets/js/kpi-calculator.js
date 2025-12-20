/**
 * Harmony AI - KPI Calculator
 * Calculates key performance indicators for the System Administrator Dashboard
 */

const KPICalculator = (function () {

    /**
     * Calculate total users count
     */
    function calculateTotalUsers(users) {
        return users.length;
    }

    /**
     * Calculate active patients (users with designation 'Patient/User')
     */
    function calculateActivePatients(users) {
        return users.filter(u => u.designation === 'Patient/User').length;
    }

    /**
     * Calculate total sessions count
     */
    function calculateTotalSessions(sessions) {
        return sessions.length;
    }

    /**
     * Calculate high-risk alerts (AI analysis records with risk_score > 70)
     */
    function calculateHighRiskAlerts(analysis) {
        return analysis.filter(a => a.risk_score > 70).length;
    }

    /**
     * Convert mood text to numeric value for calculations
     */
    function moodToNumeric(mood) {
        const moodMap = {
            'Very Sad': 1,
            'Sad': 2,
            'Neutral': 5,
            'Calm': 6,
            'Happy': 8,
            'Very Happy': 10,
            'Anxious': 3
        };
        return moodMap[mood] || 5; // Default to Neutral (5) if not found
    }

    /**
     * Calculate average mood score from daily logs
     * Returns value on 1-10 scale (converts text mood to numeric)
     */
    function calculateAverageMoodScore(logs) {
        if (logs.length === 0) return 0;
        const sum = logs.reduce((acc, log) => {
            const moodValue = typeof log.mood_level === 'string'
                ? moodToNumeric(log.mood_level)
                : (log.mood_level || 0);
            return acc + moodValue;
        }, 0);
        return (sum / logs.length).toFixed(1);
    }

    /**
     * Calculate counsellor utilization rate
     * Formula: (Total Sessions / (Counsellors Count * 10)) * 100
     * Assumes each counsellor can handle ~10 sessions
     */
    function calculateCounsellorUtilization(sessions, counsellors) {
        if (counsellors.length === 0) return 0;
        const maxCapacity = counsellors.length * 10;
        return ((sessions.length / maxCapacity) * 100).toFixed(1);
    }

    /**
     * Determine KPI color based on value and type
     */
    function getKPIColor(type, value) {
        switch (type) {
            case 'totalUsers':
            case 'activeSessions':
                return value > 0 ? '#2A9D8F' : '#ffa500'; // Green or Orange
            case 'highRiskAlerts':
                return value > 5 ? '#ff6b6b' : value > 2 ? '#ffa500' : '#2A9D8F'; // Red, Orange, Green
            case 'averageMood':
                return value > 6 ? '#2A9D8F' : value >= 4 ? '#ffa500' : '#ff6b6b'; // Green, Orange, Red
            case 'counsellorUtilization':
                return value >= 70 && value <= 90 ? '#2A9D8F' : value > 90 || value < 50 ? '#ffa500' : '#2A9D8F'; // Green, Orange
            default:
                return '#2A9D8F';
        }
    }

    /**
     * Determine trend indicator (↑, ↓, →)
     */
    function getTrendIndicator(currentValue, previousValue) {
        if (currentValue > previousValue) return '↑';
        if (currentValue < previousValue) return '↓';
        return '→';
    }

    /**
     * Calculate percentage change
     */
    function calculatePercentageChange(currentValue, previousValue) {
        if (previousValue === 0) return 0;
        return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
    }

    /**
     * Get all KPIs for dashboard
     */
    function getAllKPIs(users, sessions, logs, analysis, counsellors) {
        const totalUsers = calculateTotalUsers(users);
        const activePatients = calculateActivePatients(users);
        const totalSessions = calculateTotalSessions(sessions);
        const highRiskAlerts = calculateHighRiskAlerts(analysis);
        const averageMood = calculateAverageMoodScore(logs);
        const counsellorUtilization = calculateCounsellorUtilization(sessions, counsellors);

        // Mock previous values for trend calculation (in real app, fetch from database)
        const previousTotalUsers = totalUsers > 0 ? totalUsers - 1 : 0;
        const previousActivePatients = activePatients > 0 ? activePatients - 1 : 0;
        const previousTotalSessions = totalSessions > 0 ? totalSessions - 2 : 0;
        const previousHighRiskAlerts = highRiskAlerts > 0 ? highRiskAlerts - 1 : 0;
        const previousAverageMood = averageMood > 0 ? averageMood - 0.5 : 0;
        const previousCounsellorUtilization = counsellorUtilization > 0 ? counsellorUtilization - 5 : 0;

        return {
            totalUsers: {
                value: totalUsers,
                label: 'Total Users',
                icon: '👥',
                trend: getTrendIndicator(totalUsers, previousTotalUsers),
                percentageChange: calculatePercentageChange(totalUsers, previousTotalUsers),
                color: getKPIColor('totalUsers', totalUsers)
            },
            activePatients: {
                value: activePatients,
                label: 'Active Patients',
                icon: '🏥',
                trend: getTrendIndicator(activePatients, previousActivePatients),
                percentageChange: calculatePercentageChange(activePatients, previousActivePatients),
                color: getKPIColor('activeSessions', activePatients)
            },
            totalSessions: {
                value: totalSessions,
                label: 'Total Sessions',
                icon: '📅',
                trend: getTrendIndicator(totalSessions, previousTotalSessions),
                percentageChange: calculatePercentageChange(totalSessions, previousTotalSessions),
                color: getKPIColor('activeSessions', totalSessions)
            },
            highRiskAlerts: {
                value: highRiskAlerts,
                label: 'High-Risk Alerts',
                icon: '🚨',
                trend: getTrendIndicator(highRiskAlerts, previousHighRiskAlerts),
                percentageChange: calculatePercentageChange(highRiskAlerts, previousHighRiskAlerts),
                color: getKPIColor('highRiskAlerts', highRiskAlerts)
            },
            averageMood: {
                value: averageMood,
                label: 'Average Mood Score',
                icon: '😊',
                trend: getTrendIndicator(averageMood, previousAverageMood),
                percentageChange: calculatePercentageChange(averageMood, previousAverageMood),
                color: getKPIColor('averageMood', averageMood)
            },
            counsellorUtilization: {
                value: counsellorUtilization,
                label: 'Counsellor Utilization',
                icon: '👨‍⚕️',
                trend: getTrendIndicator(counsellorUtilization, previousCounsellorUtilization),
                percentageChange: calculatePercentageChange(counsellorUtilization, previousCounsellorUtilization),
                color: getKPIColor('counsellorUtilization', counsellorUtilization)
            }
        };
    }

    // Public API
    return {
        getAllKPIs: getAllKPIs,
        calculateTotalUsers: calculateTotalUsers,
        calculateActivePatients: calculateActivePatients,
        calculateTotalSessions: calculateTotalSessions,
        calculateHighRiskAlerts: calculateHighRiskAlerts,
        calculateAverageMoodScore: calculateAverageMoodScore,
        calculateCounsellorUtilization: calculateCounsellorUtilization,
        getKPIColor: getKPIColor,
        getTrendIndicator: getTrendIndicator,
        calculatePercentageChange: calculatePercentageChange
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = KPICalculator;
}
