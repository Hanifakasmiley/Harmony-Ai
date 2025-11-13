document.addEventListener("DOMContentLoaded", () => {
    /* ===== Feature 1: Mood Chart ===== */
    const moodChart = document.getElementById("moodChart");
    if (moodChart) {
      new Chart(moodChart, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            label: "Average Mood Score",
            data: [7, 6, 8, 5, 9, 7, 8],
            borderColor: "#1abc9c",
            tension: 0.4,
            fill: true,
            backgroundColor: "rgba(26, 188, 156, 0.15)"
          }]
        },
        options: {
          scales: { y: { beginAtZero: true, max: 10 } },
          plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text') } } }
        }
      });
    }
  
    /* ===== Feature 2: AI Risk Score Chart ===== */
    const riskChart = document.getElementById("riskChart");
    if (riskChart) {
      new Chart(riskChart, {
        type: "bar",
        data: {
          labels: ["U001", "U002", "U003", "U004"],
          datasets: [{
            label: "AI Risk Score",
            data: [0.15, 0.42, 0.65, 0.81],
            backgroundColor: ["#16a085", "#f39c12", "#e67e22", "#e74c3c"]
          }]
        },
        options: {
          scales: { y: { beginAtZero: true, max: 1 } },
          plugins: { legend: { labels: { color: getComputedStyle(document.body).getPropertyValue('--text') } } }
        }
      });
    }
  });
  