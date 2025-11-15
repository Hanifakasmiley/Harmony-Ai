// ===== ROLE-SPECIFIC DATA TABLES =====
// Generates comprehensive data tables for each role

const RoleDataTables = (function () {

    // Mental Health Administrator - All Patients Table
    async function getMentalHealthAdminTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: var(--primary-gradient); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Latest Mood</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Stress (7d)</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Anxiety (7d)</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Sleep Hours</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Update</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Risk Level</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Status</th>
          </tr>
        </thead>
        <tbody>
    `;

        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) => new Date(b.date) - new Date(a.date));
            const latest = entries[0];

            if (latest) {
                const avgStress = Math.round(entries.slice(0, 7).reduce((sum, e) => sum + e.stressLevel, 0) / 7);
                const avgAnxiety = Math.round(entries.slice(0, 7).reduce((sum, e) => sum + e.anxietyLevel, 0) / 7);
                const riskLevel = avgAnxiety > 7 ? 'High' : avgAnxiety > 4 ? 'Medium' : 'Low';
                const riskColor = riskLevel === 'High' ? '#e74c3c' : riskLevel === 'Medium' ? '#f39c12' : '#27ae60';

                html += `
          <tr style="border-bottom: 1px solid #ddd; transition: background 0.3s;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>${patientId}</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${latest.mood}</td>
            <td style="padding: 12px; border: 1px solid #ddd; text-align: center;"><strong>${avgStress}/10</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd; text-align: center;"><strong>${avgAnxiety}/10</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${latest.sleepHours} hrs</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${latest.date}</td>
            <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
              <span style="background: ${riskColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.85rem;">${riskLevel}</span>
            </td>
            <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
              <span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Active</span>
            </td>
          </tr>
        `;
            }
        });

        html += `</tbody></table>`;
        return html;
    }

    // Data Scientist - Detailed Analytics Table
    async function getDataScientistTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: var(--primary-gradient); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Total Records</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Mood Variance</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Stress</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Anxiety</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Avg Sleep</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Max Stress</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Min Stress</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Trend</th>
          </tr>
        </thead>
        <tbody>
    `;

        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId];
            const avgStress = (entries.reduce((sum, e) => sum + e.stressLevel, 0) / entries.length).toFixed(1);
            const avgAnxiety = (entries.reduce((sum, e) => sum + e.anxietyLevel, 0) / entries.length).toFixed(1);
            const avgSleep = (entries.reduce((sum, e) => sum + e.sleepHours, 0) / entries.length).toFixed(1);
            const maxStress = Math.max(...entries.map(e => e.stressLevel));
            const minStress = Math.min(...entries.map(e => e.stressLevel));
            const recentAvg = entries.slice(0, 7).reduce((sum, e) => sum + e.stressLevel, 0) / 7;
            const olderAvg = entries.slice(7, 14).reduce((sum, e) => sum + e.stressLevel, 0) / 7;
            const trend = recentAvg > olderAvg ? '📈 Increasing' : recentAvg < olderAvg ? '📉 Decreasing' : '➡️ Stable';

            html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; border: 1px solid #ddd;"><strong>${patientId}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${entries.length}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${((Math.max(...entries.map(e => e.stressLevel)) - Math.min(...entries.map(e => e.stressLevel))) / 2).toFixed(1)}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;"><strong>${avgStress}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;"><strong>${avgAnxiety}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${avgSleep} hrs</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${maxStress}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${minStress}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${trend}</td>
        </tr>
      `;
        });

        html += `</tbody></table>`;
        return html;
    }

    // Emergency Team - Crisis Cases Table
    async function getEmergencyTeamTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Current Mood</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Anxiety Level</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Stress Level</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Sleep Hours</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Update</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Priority</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Action Needed</th>
          </tr>
        </thead>
        <tbody>
    `;

        const crisisCases = [];
        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) => new Date(b.date) - new Date(a.date));
            const latest = entries[0];

            if (latest && latest.anxietyLevel > 6) {
                crisisCases.push({ patientId, latest });
            }
        });

        crisisCases.sort((a, b) => b.latest.anxietyLevel - a.latest.anxietyLevel);

        crisisCases.forEach(({ patientId, latest }) => {
            const priority = latest.anxietyLevel > 8 ? 'Critical' : latest.anxietyLevel > 7 ? 'High' : 'Medium';
            const priorityColor = priority === 'Critical' ? '#c0392b' : priority === 'High' ? '#e74c3c' : '#f39c12';
            const action = priority === 'Critical' ? 'Immediate intervention' : 'Contact within 24h';

            html += `
        <tr style="border-bottom: 1px solid #ddd; background: ${latest.anxietyLevel > 8 ? '#ffebee' : ''};">
          <td style="padding: 12px; border: 1px solid #ddd;"><strong>${patientId}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd;">${latest.mood}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;"><strong style="color: #e74c3c;">${latest.anxietyLevel}/10</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${latest.stressLevel}/10</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${latest.sleepHours} hrs</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${latest.date}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
            <span style="background: ${priorityColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.85rem;">${priority}</span>
          </td>
          <td style="padding: 12px; border: 1px solid #ddd;"><strong style="color: #e74c3c;">${action}</strong></td>
        </tr>
      `;
        });

        html += `</tbody></table>`;
        return html;
    }

    // Financial Team - Revenue Table
    async function getFinancialTeamTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        const costPerSession = 50;
        let totalRevenue = 0;

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: var(--primary-gradient); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Total Sessions</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Cost Per Session</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Total Revenue</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">First Session</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Session</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Payment Status</th>
          </tr>
        </thead>
        <tbody>
    `;

        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) => new Date(a.date) - new Date(b.date));
            const sessions = entries.length;
            const revenue = sessions * costPerSession;
            totalRevenue += revenue;
            const firstSession = entries[0].date;
            const lastSession = entries[entries.length - 1].date;

            html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; border: 1px solid #ddd;"><strong>${patientId}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${sessions}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">$${costPerSession}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #27ae60;">$${revenue.toLocaleString()}</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${firstSession}</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${lastSession}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
            <span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Paid</span>
          </td>
        </tr>
      `;
        });

        html += `
      </tbody>
      </table>
      <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-top: 1.5rem; text-align: right;">
        <strong style="font-size: 1.2rem;">Total Platform Revenue: $${totalRevenue.toLocaleString()}</strong>
      </div>
    `;
        return html;
    }

    // System Admin - Database Table
    async function getSystemAdminTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const patientMap = {};

        logs.forEach(log => {
            if (!patientMap[log.patientId]) {
                patientMap[log.patientId] = [];
            }
            patientMap[log.patientId].push(log);
        });

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: var(--primary-gradient); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Records Count</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Data Size</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">First Entry</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Entry</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Modified</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Status</th>
          </tr>
        </thead>
        <tbody>
    `;

        Object.keys(patientMap).forEach(patientId => {
            const entries = patientMap[patientId].sort((a, b) => new Date(a.date) - new Date(b.date));
            const dataSize = (JSON.stringify(entries).length / 1024).toFixed(2);
            const firstEntry = entries[0].date;
            const lastEntry = entries[entries.length - 1].date;

            html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; border: 1px solid #ddd;"><strong>${patientId}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${entries.length}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${dataSize} KB</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${firstEntry}</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${lastEntry}</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
            <span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Active</span>
          </td>
        </tr>
      `;
        });

        html += `
      </tbody>
      </table>
      <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
        <p><strong>Total Records:</strong> ${logs.length}</p>
        <p><strong>Database Size:</strong> ${(JSON.stringify(logs).length / 1024).toFixed(2)} KB</p>
        <p><strong>Active Patients:</strong> ${Object.keys(patientMap).length}</p>
      </div>
    `;
        return html;
    }

    // Software Engineer - System Logs Table
    async function getSoftwareEngineerTable() {
        if (!window.DailyDB) return '';

        const logs = await window.DailyDB.getAllLogs();
        const recentLogs = logs.slice(-50);

        let html = `
      <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead style="background: var(--primary-gradient); color: white;">
          <tr>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Patient ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Date</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Mood</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Stress</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Anxiety</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Sleep</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Created At</th>
          </tr>
        </thead>
        <tbody>
    `;

        recentLogs.reverse().forEach((log, index) => {
            html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
          <td style="padding: 12px; border: 1px solid #ddd;"><strong>${log.patientId}</strong></td>
          <td style="padding: 12px; border: 1px solid #ddd;">${log.date}</td>
          <td style="padding: 12px; border: 1px solid #ddd;">${log.mood}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${log.stressLevel}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${log.anxietyLevel}</td>
          <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${log.sleepHours} hrs</td>
          <td style="padding: 12px; border: 1px solid #ddd; font-size: 0.85rem;">${new Date(log.createdAt).toLocaleString()}</td>
        </tr>
      `;
        });

        html += `</tbody></table>`;
        return html;
    }

    return {
        getMentalHealthAdminTable,
        getDataScientistTable,
        getEmergencyTeamTable,
        getFinancialTeamTable,
        getSystemAdminTable,
        getSoftwareEngineerTable
    };
})();

// Expose globally
window.RoleDataTables = RoleDataTables;
