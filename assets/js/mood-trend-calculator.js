/**
 * Harmony AI - Mood Trend Calculator
 * Calculates mood trends for the last 7 days
 */

const MoodTrendCalculator = (function () {

    /**
     * Get last 7 days of dates
     */
    function getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
                date: date,
                dateString: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            });
        }
        return days;
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
     * Calculate daily average mood for last 7 days
     */
    function calculateDailyAverageMood(logs) {
        const last7Days = getLast7Days();
        const moodByDay = {};

        // Initialize all days with empty arrays
        last7Days.forEach(day => {
            moodByDay[day.dateString] = [];
        });

        // Group logs by date
        logs.forEach(log => {
            const logDate = log.log_date ? log.log_date.split(' ')[0] : null;
            if (logDate && moodByDay[logDate]) {
                const moodValue = typeof log.mood_level === 'string'
                    ? moodToNumeric(log.mood_level)
                    : (log.mood_level || 0);
                moodByDay[logDate].push(moodValue);
            }
        });

        // Calculate averages
        const result = last7Days.map(day => ({
            date: day.dateString,
            label: day.label,
            average: moodByDay[day.dateString].length > 0
                ? (moodByDay[day.dateString].reduce((a, b) => a + b, 0) / moodByDay[day.dateString].length).toFixed(1)
                : 0,
            count: moodByDay[day.dateString].length
        }));

        return result;
    }

    /**
     * Calculate trend direction (improving, declining, stable)
     */
    function calculateTrendDirection(moodData) {
        if (moodData.length < 2) return 'insufficient';

        const validData = moodData.filter(d => d.average > 0);
        if (validData.length < 2) return 'insufficient';

        const firstHalf = validData.slice(0, Math.floor(validData.length / 2));
        const secondHalf = validData.slice(Math.floor(validData.length / 2));

        const firstAvg = firstHalf.reduce((a, b) => a + parseFloat(b.average), 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + parseFloat(b.average), 0) / secondHalf.length;

        const difference = secondAvg - firstAvg;
        if (difference > 0.5) return 'improving';
        if (difference < -0.5) return 'declining';
        return 'stable';
    }

    /**
     * Get trend color based on direction
     */
    function getTrendColor(direction) {
        switch (direction) {
            case 'improving':
                return '#2A9D8F'; // Green
            case 'declining':
                return '#ff6b6b'; // Red
            case 'stable':
                return '#ffa500'; // Orange
            default:
                return '#999'; // Gray
        }
    }

    /**
     * Get trend emoji based on direction
     */
    function getTrendEmoji(direction) {
        switch (direction) {
            case 'improving':
                return '📈';
            case 'declining':
                return '📉';
            case 'stable':
                return '➡️';
            default:
                return '❓';
        }
    }

    /**
     * Generate Chart.js data for mood trend
     */
    function generateChartData(moodData) {
        const labels = moodData.map(d => d.label);
        const data = moodData.map(d => parseFloat(d.average) || 0);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Average Mood Score',
                    data: data,
                    borderColor: '#2A9D8F',
                    backgroundColor: 'rgba(42, 157, 143, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#2A9D8F',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                }
            ]
        };
    }

    /**
     * Get all mood trend data
     */
    function getMoodTrendData(logs) {
        const moodData = calculateDailyAverageMood(logs);
        const trendDirection = calculateTrendDirection(moodData);
        const chartData = generateChartData(moodData);

        return {
            moodData: moodData,
            trendDirection: trendDirection,
            trendColor: getTrendColor(trendDirection),
            trendEmoji: getTrendEmoji(trendDirection),
            chartData: chartData,
            hasData: moodData.some(d => d.count > 0)
        };
    }

    // Public API
    return {
        getLast7Days: getLast7Days,
        calculateDailyAverageMood: calculateDailyAverageMood,
        calculateTrendDirection: calculateTrendDirection,
        getTrendColor: getTrendColor,
        getTrendEmoji: getTrendEmoji,
        generateChartData: generateChartData,
        getMoodTrendData: getMoodTrendData
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MoodTrendCalculator;
}
