const ChartsManager = (function () {

    let charts = {};

    // ===== DARK MODE DETECTION =====
    function isDarkMode() {
        return document.body.classList.contains('dark-mode');
    }

    function getChartColors() {
        const dark = isDarkMode();
        return {
            textColor: dark ? '#ffffff' : '#333333',
            gridColor: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backgroundColor: dark ? '#1a1f2e' : '#ffffff'
        };
    }

    function getDefaultOptions() {
        const colors = getChartColors();
        return {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: colors.textColor
                    }
                },
                title: {
                    color: colors.textColor
                }
            },
            scales: {
                x: {
                    ticks: { color: colors.textColor },
                    grid: { color: colors.gridColor }
                },
                y: {
                    ticks: { color: colors.textColor },
                    grid: { color: colors.gridColor }
                }
            }
        };
    }

    // ===== DESTROY EXISTING CHARTS =====
    function destroyChart(canvasId) {
        if (charts[canvasId]) {
            charts[canvasId].destroy();
            delete charts[canvasId];
        }
    }

    // ===== 1. MOOD TREND CHART (Line Chart) =====
    function createMoodTrendChart(canvasId = 'moodTrendChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const moodLogs = PatientData.getMoodLogs().slice(0, 30);
        const dates = [...new Set(moodLogs.map(m => m.date))].sort().slice(-14);

        const moodScores = dates.map(date => {
            const logsForDate = moodLogs.filter(m => m.date === date);
            if (!logsForDate.length) return 0;
            const avg = logsForDate.reduce((sum, m) => sum + (m.stressLevel || 0), 0) / logsForDate.length;
            return Math.round(avg);
        });

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();
        const defaultOpts = getDefaultOptions();

        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Average Stress Level (Last 14 Days)',
                    data: moodScores,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                ...defaultOpts,
                plugins: {
                    ...defaultOpts.plugins,
                    legend: { display: true, position: 'top', labels: { color: colors.textColor } },
                    title: { display: true, text: '📈 Mood & Stress Trend (Last 14 Days)', color: colors.textColor }
                },
                scales: {
                    ...defaultOpts.scales,
                    y: { ...defaultOpts.scales.y, beginAtZero: true, max: 10 }
                }
            }
        });
    }

    // ===== 2. RISK DISTRIBUTION PIE CHART =====
    function createRiskDistributionChart(canvasId = 'riskDistributionChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const stats = PatientData.getStatistics();
        const ctx = canvas.getContext('2d');
        const colors = getChartColors();

        charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Critical', 'High Risk', 'Moderate', 'Low Risk'],
                datasets: [{
                    data: [stats.criticalCount, stats.highRiskCount, stats.moderateCount, stats.lowRiskCount],
                    backgroundColor: ['#ff6b6b', '#ffa500', '#FFD700', '#90ee90'],
                    borderColor: isDarkMode() ? '#1a1f2e' : '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'bottom', labels: { color: colors.textColor, font: { size: 12 } } },
                    title: { display: true, text: 'Patient Risk Distribution', color: colors.textColor, font: { size: 14 } }
                }
            }
        });
    }

    // ===== 3. STRESS PATTERNS BAR CHART =====
    function createStressPatternsChart(canvasId = 'stressPatternsChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const stressData = days.map(() => Math.floor(Math.random() * 8) + 3);

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();
        const defaultOpts = getDefaultOptions();

        charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Average Stress Level',
                    data: stressData,
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#4facfe',
                        '#43e97b', '#fa709a', '#fee140'
                    ],
                    borderRadius: 5,
                    borderSkipped: false
                }]
            },
            options: {
                ...defaultOpts,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: colors.textColor } },
                    title: { display: true, text: '📊 Weekly Stress Patterns', color: colors.textColor }
                },
                scales: {
                    ...defaultOpts.scales,
                    y: { ...defaultOpts.scales.y, beginAtZero: true, max: 10 }
                }
            }
        });
    }

    // ===== 4. SESSION OUTCOMES COLUMN CHART =====
    function createSessionOutcomesChart(canvasId = 'sessionOutcomesChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const sessions = PatientData.getSessions();
        const outcomes = {
            'Positive Progress': sessions.filter(s => s.outcome === 'Positive Progress').length,
            'On Track': sessions.filter(s => s.outcome === 'On Track').length,
            'Scheduled': sessions.filter(s => s.status === 'Scheduled').length
        };

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();
        const defaultOpts = getDefaultOptions();

        charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(outcomes),
                datasets: [{
                    label: 'Number of Sessions',
                    data: Object.values(outcomes),
                    backgroundColor: ['#90ee90', '#4facfe', '#ffa500'],
                    borderRadius: 5
                }]
            },
            options: {
                ...defaultOpts,
                indexAxis: 'x',
                plugins: {
                    legend: { display: true, labels: { color: colors.textColor } },
                    title: { display: true, text: '✅ Session Outcomes', color: colors.textColor }
                },
                scales: {
                    ...defaultOpts.scales,
                    y: { ...defaultOpts.scales.y, beginAtZero: true }
                }
            }
        });
    }

    // ===== 5. PROGRESS TRACKING AREA CHART =====
    function createProgressTrackingChart(canvasId = 'progressTrackingChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const months = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'];
        const emotionalStability = [55, 58, 62, 65, 68, 70, 72, 75, 76, 78, 80, 82];
        const copingSkills = [50, 54, 58, 62, 65, 68, 70, 73, 75, 77, 79, 81];

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();
        const defaultOpts = getDefaultOptions();

        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Emotional Stability',
                        data: emotionalStability,
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4
                    },
                    {
                        label: 'Coping Skills',
                        data: copingSkills,
                        borderColor: '#764ba2',
                        backgroundColor: 'rgba(118, 75, 162, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                ...defaultOpts,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: colors.textColor } },
                    title: { display: true, text: '📈 12-Week Progress Tracking', color: colors.textColor }
                },
                scales: {
                    ...defaultOpts.scales,
                    y: { ...defaultOpts.scales.y, beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // ===== 6. CONDITION DISTRIBUTION PIE CHART =====
    function createConditionDistributionChart(canvasId = 'conditionChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const patients = PatientData.getPatients();
        const conditions = {};
        patients.forEach(p => {
            conditions[p.condition] = (conditions[p.condition] || 0) + 1;
        });

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();

        charts[canvasId] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(conditions),
                datasets: [{
                    data: Object.values(conditions),
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'
                    ],
                    borderColor: isDarkMode() ? '#1a1f2e' : '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true, position: 'bottom', labels: { color: colors.textColor } },
                    title: { display: true, text: '🏥 Condition Distribution', color: colors.textColor }
                }
            }
        });
    }

    // ===== 7. AI CONFIDENCE SCORES RADAR CHART =====
    function createAIConfidenceChart(canvasId = 'aiConfidenceChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const analysis = PatientData.getAIAnalysis().slice(0, 5);
        const avgConfidence = analysis.length ? analysis.reduce((sum, a) => sum + parseFloat(a.confidenceScore), 0) / analysis.length : 0;

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();

        charts[canvasId] = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Risk Prediction', 'Emotion Detection', 'Sentiment Analysis', 'Crisis Detection', 'Recommendation', 'Pattern Recognition'],
                datasets: [{
                    label: 'AI Model Confidence (%)',
                    data: [92, 89, 85, 94, 87, 90],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    pointBackgroundColor: '#667eea',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: colors.textColor } },
                    title: { display: true, text: '🤖 AI Model Confidence Scores', color: colors.textColor }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: colors.textColor },
                        pointLabels: { color: colors.textColor },
                        grid: { color: colors.gridColor }
                    }
                }
            }
        });
    }

    // ===== 8. CRISIS ALERT TIMELINE CHART =====
    function createCrisisTimelineChart(canvasId = 'crisisTimelineChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        const alertCounts = days.map(() => Math.floor(Math.random() * 3));

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();
        const defaultOpts = getDefaultOptions();

        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Crisis Alerts Triggered',
                    data: alertCounts,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    pointBackgroundColor: '#ff6b6b',
                    pointRadius: 5,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...defaultOpts,
                plugins: {
                    legend: { display: true, labels: { color: colors.textColor } },
                    title: { display: true, text: '🚨 Crisis Alerts (Last 7 Days)', color: colors.textColor }
                },
                scales: {
                    ...defaultOpts.scales,
                    y: { ...defaultOpts.scales.y, beginAtZero: true }
                }
            }
        });
    }

    // ===== 9. RECOMMENDATION ADHERENCE GAUGE =====
    function createAdherenceGaugeChart(canvasId = 'adherenceGaugeChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const stats = PatientData.getStatistics();
        const adherence = stats.recommendationAdherence;

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();

        charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Adherent', 'Non-Adherent'],
                datasets: [{
                    data: [adherence, 100 - adherence],
                    backgroundColor: ['#90ee90', isDarkMode() ? '#3a4556' : '#e0e0e0'],
                    borderColor: isDarkMode() ? '#1a1f2e' : '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    // ===== 10. SESSION COMPLETION RATE =====
    function createSessionCompletionChart(canvasId = 'sessionCompletionChart') {
        destroyChart(canvasId);
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const stats = PatientData.getStatistics();
        const completionRate = stats.sessionCompletionRate;

        const ctx = canvas.getContext('2d');
        const colors = getChartColors();

        charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    data: [completionRate, 100 - completionRate],
                    backgroundColor: ['#4facfe', '#ffa500'],
                    borderColor: isDarkMode() ? '#1a1f2e' : '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true, position: 'bottom', labels: { color: colors.textColor } },
                    title: { display: true, text: '✅ Session Completion Rate', color: colors.textColor }
                }
            }
        });
    }

    // Public API
    return {
        createMoodTrendChart,
        createRiskDistributionChart,
        createStressPatternsChart,
        createSessionOutcomesChart,
        createProgressTrackingChart,
        createConditionDistributionChart,
        createAIConfidenceChart,
        createCrisisTimelineChart,
        createAdherenceGaugeChart,
        createSessionCompletionChart,

        createAllCharts: function () {
            createMoodTrendChart();
            createRiskDistributionChart();
            createStressPatternsChart();
            createSessionOutcomesChart();
            createProgressTrackingChart();
            createConditionDistributionChart();
            createAIConfidenceChart();
            createCrisisTimelineChart();
            createAdherenceGaugeChart();
            createSessionCompletionChart();
        },

        destroyAllCharts: function () {
            Object.keys(charts).forEach(id => {
                if (charts[id]) charts[id].destroy();
            });
            charts = {};
        }
    };
})();

// Listen for theme changes and recreate all charts
window.addEventListener('themeChanged', function () {
    // Small delay to ensure CSS variables are updated
    setTimeout(function () {
        ChartsManager.destroyAllCharts();
        ChartsManager.createAllCharts();
    }, 100);
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartsManager;
}
