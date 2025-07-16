import React from 'react';
import { TrendingUp, Users, DollarSign, Phone, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$847,392', change: '+12.5%', trend: 'up', icon: DollarSign },
    { title: 'Active Customers', value: '2,847', change: '+8.2%', trend: 'up', icon: Users },
    { title: 'Calls Made', value: '1,234', change: '-3.1%', trend: 'down', icon: Phone },
    { title: 'Conversion Rate', value: '24.8%', change: '+5.7%', trend: 'up', icon: TrendingUp }
  ];

  const recentActivities = [
    { type: 'call', customer: 'Sarah Johnson', action: 'Completed call', time: '2 min ago', status: 'success' },
    { type: 'lead', customer: 'Mike Chen', action: 'New lead created', time: '15 min ago', status: 'info' },
    { type: 'deal', customer: 'Emma Wilson', action: 'Deal closed - $15,000', time: '1 hour ago', status: 'success' },
    { type: 'call', customer: 'David Brown', action: 'Missed call', time: '2 hours ago', status: 'warning' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <div className={`stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="chart-card">
            <h3>Revenue Trend</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76, 88].map((height, i) => (
                  <div key={i} className="chart-bar" style={{height: `${height}%`}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <div className="activity-card">
            <h3>Recent Activities</h3>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-status ${activity.status}`}></div>
                  <div className="activity-content">
                    <div className="activity-customer">{activity.customer}</div>
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;