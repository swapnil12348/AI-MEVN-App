<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Overview of your AI application metrics</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-content">
          <h3>{{ stats.totalChats }}</h3>
          <p>Total Conversations</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>{{ stats.activeUsers }}</h3>
          <p>Active Users</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ stats.avgResponseTime }}ms</h3>
          <p>Avg Response Time</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">✨</div>
        <div class="stat-content">
          <h3>{{ stats.successRate }}%</h3>
          <p>Success Rate</p>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <h2>Usage Analytics</h2>
        <div class="chart-placeholder">
          <div class="chart-bars">
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 45%"></div>
            <div class="bar" style="height: 90%"></div>
            <div class="bar" style="height: 65%"></div>
            <div class="bar" style="height: 75%"></div>
            <div class="bar" style="height: 85%"></div>
          </div>
          <div class="chart-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      <div class="activity-feed">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon">{{ activity.icon }}</div>
            <div class="activity-content">
              <div class="activity-text">{{ activity.text }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions-section">
      <h2>Quick Actions</h2>
      <div class="action-buttons">
        <button @click="refreshData" class="action-btn primary">
          <span>🔄</span>
          Refresh Data
        </button>
        <button @click="exportData" class="action-btn secondary">
          <span>📥</span>
          Export Data
        </button>
        <button @click="viewSettings" class="action-btn tertiary">
          <span>⚙️</span>
          Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalChats: 1247,
        activeUsers: 89,
        avgResponseTime: 234,
        successRate: 98.5
      },
      recentActivity: [
        {
          id: 1,
          icon: '💬',
          text: 'New conversation started',
          time: '2 minutes ago'
        },
        {
          id: 2,
          icon: '👤',
          text: 'User registered',
          time: '5 minutes ago'
        },
        {
          id: 3,
          icon: '🔧',
          text: 'System maintenance completed',
          time: '1 hour ago'
        },
        {
          id: 4,
          icon: '📊',
          text: 'Weekly report generated',
          time: '3 hours ago'
        },
        {
          id: 5,
          icon: '✅',
          text: 'AI model updated',
          time: '1 day ago'
        }
      ],
      isLoading: false
    }
  },
  methods: {
    async refreshData() {
      this.isLoading = true;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update stats with random values for demo
        this.stats.totalChats += Math.floor(Math.random() * 10);
        this.stats.activeUsers = Math.floor(Math.random() * 100) + 50;
        this.stats.avgResponseTime = Math.floor(Math.random() * 200) + 150;
        this.stats.successRate = (Math.random() * 5 + 95).toFixed(1);

        // Add new activity
        this.recentActivity.unshift({
          id: Date.now(),
          icon: '🔄',
          text: 'Dashboard data refreshed',
          time: 'Just now'
        });

        // Keep only last 5 activities
        this.recentActivity = this.recentActivity.slice(0, 5);

      } catch (error) {
        console.error('Error refreshing data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    exportData() {
      // Simulate data export
      const data = {
        stats: this.stats,
        timestamp: new Date().toISOString()
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'dashboard-data.json';
      link.click();

      URL.revokeObjectURL(url);
    },

    viewSettings() {
      // Navigate to settings or show settings modal
      this.$router.push('/settings').catch(() => {
        alert('Settings page not implemented yet');
      });
    }
  },

  async mounted() {
    // Simulate loading data on component mount
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isLoading = false;
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: #333;
  margin-bottom: 8px;
}

.dashboard-header p {
  color: #666;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2.5rem;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
}

.stat-content h3 {
  font-size: 1.8rem;
  margin: 0 0 4px 0;
  color: #333;
}

.stat-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.chart-container,
.activity-feed {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container h2,
.activity-feed h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 160px;
}

.bar {
  flex: 1;
  background: linear-gradient(to top, #007bff, #0056b3);
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  transition: all 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.8rem;
  color: #666;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
}

.activity-icon {
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 2px;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
}

.actions-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions-section h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #007bff;
  color: white;
}

.action-btn.primary:hover {
  background: #0056b3;
}

.action-btn.secondary {
  background: #6c757d;
  color: white;
}

.action-btn.secondary:hover {
  background: #545b62;
}

.action-btn.tertiary {
  background: #e9ecef;
  color: #333;
}

.action-btn.tertiary:hover {
  background: #dee2e6;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
