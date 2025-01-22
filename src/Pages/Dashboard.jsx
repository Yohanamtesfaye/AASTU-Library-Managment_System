import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaClock, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
// Sample data
const weeklyData = [
  { day: "Mon", visits: 145 },
  { day: "Tue", visits: 132 },
  { day: "Wed", visits: 164 },
  { day: "Thu", visits: 189 },
  { day: "Fri", visits: 176 },
  { day: "Sat", visits: 78 },
  { day: "Sun", visits: 45 },
];

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  visits: Math.floor(Math.random() * 100) + 100,
}));

const yearlyData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  visits: Math.floor(Math.random() * 1000) + 2000,
}));

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  visits: Math.floor(Math.random() * 30) + 10,
}));

function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('weekly');

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="stat-card">
      <Icon className="stat-icon" />
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            {/* <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-wf9wXI9jvVPXeAYWeBRcY6OUkJy2oD.jpeg" alt="AASTU Logo" className="logo" /> */}
            <h1>{t('Library Dashboard')}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Stats Overview */}
        <div className="stats-grid">
          <StatCard icon={FaUsers} title={t('Current Visitors')} value="42" />
          <StatCard icon={FaClock} title={t('Avg. Visit Duration')} value="2.5h" />
          <StatCard icon={FaBook} title={t('Books Borrowed')} value="156" />
          <StatCard icon={FaCalendarAlt} title={t("Peak Day")} value={t('thursday')} />
        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'hourly' ? 'active' : ''}`}
              onClick={() => setActiveTab('hourly')}
            >
              {t('Hourly')}
            </button>
            <button 
              className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
            >
              {t('Weekly')}
            </button>
            <button 
              className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
            >
              {t('Monthly')}
            </button>
            <button 
              className={`tab ${activeTab === 'yearly' ? 'active' : ''}`}
              onClick={() => setActiveTab('yearly')}
            >
              {t('Yearly')}
            </button>
          </div>

          <div className="chart-container">
            {activeTab === 'hourly' && (
              <div className="chart-card">
                <h2>{t('Hourly Visits')}</h2>
                <p>Number of students per hour today</p>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#c5a02f" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'weekly' && (
              <div className="chart-card">
                <h2>{t('Weekly Traffic')}</h2>
                <p>Student visits by day of the week</p>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" fill="#c5a02f" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'monthly' && (
              <div className="chart-card">
                <h2>{t('Monthly Traffic')}</h2>
                <p>Daily visits this month</p>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#c5a02f" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'yearly' && (
              <div className="chart-card">
                <h2>{t('Yearly Traffic')}</h2>
                <p>Monthly visits throughout the year</p>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" fill="#c5a02f" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Additional Reports */}
        <div className="reports-grid">
          <div className="report-card">
            <h2>Peak Hours</h2>
            <p>Most active times in the library</p>
            <div className="peak-hours">
              <div className="peak-hour-item">
                <span>10:00 AM - 12:00 PM</span>
                <span className="value">167 visitors</span>
              </div>
              <div className="peak-hour-item">
                <span>2:00 PM - 4:00 PM</span>
                <span className="value">145 visitors</span>
              </div>
              <div className="peak-hour-item">
                <span>4:00 PM - 6:00 PM</span>
                <span className="value">132 visitors</span>
              </div>
            </div>
          </div>

          <div className="report-card">
            <h2>Resource Usage</h2>
            <p>Most borrowed resources</p>
            <div className="resource-usage">
              <div className="resource-item">
                <span>Textbooks</span>
                <span className="value">45%</span>
              </div>
              <div className="resource-item">
                <span>Reference Books</span>
                <span className="value">30%</span>
              </div>
              <div className="resource-item">
                <span>Journals</span>
                <span className="value">25%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo {
          width: 40px;
          height: 40px;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #234678;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
        }

        .stat-icon {
          width: 2rem;
          height: 2rem;
          color: #c5a02f;
          margin-right: 1rem;
        }

        .stat-title {
          color: #234678;
          font-size: 0.875rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 0.25rem;
        }

        .charts-section {
          background: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .tab {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #c5a02f;
          border-bottom-color: #c5a02f;
        }

        .chart-card {
          padding: 1rem;
        }

        .chart-card h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .chart-card p {
          color: #234678;
          margin-bottom: 1rem;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .report-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .report-card h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .report-card p {
          color: #234678;
          margin-bottom: 1rem;
        }

        .peak-hours, .resource-usage {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .peak-hour-item, .resource-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .value {
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .reports-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;