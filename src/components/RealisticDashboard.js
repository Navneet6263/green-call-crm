import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { apiService } from '../services/apiService';

const RealisticDashboard = ({ crmData, user, darkMode }) => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCustomers: 0,
    totalValue: 0,
    conversionRate: 0,
    newLeadsToday: 0,
    activeDeals: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    calculateStats();
    loadRecentActivity();
  }, [crmData]);

  const calculateStats = () => {
    const leads = crmData.leads || [];
    const customers = crmData.customers || [];
    
    const totalValue = leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0);
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    const conversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0;
    
    // Simulate today's new leads
    const today = new Date().toDateString();
    const newLeadsToday = leads.filter(lead => 
      new Date(lead.createdDate).toDateString() === today
    ).length;

    setStats({
      totalLeads: leads.length,
      totalCustomers: customers.length,
      totalValue,
      conversionRate: Math.round(conversionRate),
      newLeadsToday,
      activeDeals: leads.filter(lead => ['qualified', 'proposal', 'negotiation'].includes(lead.status)).length
    });
  };

  const loadRecentActivity = async () => {
    try {
      const enquiries = await apiService.getEnquiries();
      setRecentActivity(enquiries.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent activity:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: '#3b82f6',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Target,
      color: '#10b981',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Pipeline Value',
      value: `₹${(stats.totalValue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: '#f59e0b',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: '#8b5cf6',
      change: stats.conversionRate > 20 ? '+5%' : '-2%',
      trend: stats.conversionRate > 20 ? 'up' : 'down'
    }
  ];

  const styles = {
    container: {
      padding: '0'
    },
    welcome: {
      marginBottom: '2rem'
    },
    welcomeTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: darkMode ? 'white' : '#1f2937',
      marginBottom: '0.5rem'
    },
    welcomeSubtitle: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '1.125rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: darkMode ? '#1f2937' : 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      transition: 'transform 0.2s ease'
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    statIcon: {
      padding: '0.75rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statTitle: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '0.875rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: darkMode ? 'white' : '#1f2937',
      marginBottom: '0.5rem'
    },
    statChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    activitySection: {
      background: darkMode ? '#1f2937' : 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937',
      marginBottom: '1rem'
    },
    activityList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '8px',
      border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
    },
    activityContent: {
      flex: 1
    },
    activityTitle: {
      fontWeight: '500',
      color: darkMode ? 'white' : '#1f2937',
      marginBottom: '0.25rem'
    },
    activityDescription: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '0.875rem'
    },
    activityStatus: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'capitalize'
    }
  };

  const getStatusStyle = (status) => {
    const statusStyles = {
      pending: { background: '#fef3c7', color: '#d97706' },
      'in-progress': { background: '#dbeafe', color: '#2563eb' },
      completed: { background: '#d1fae5', color: '#059669' }
    };
    return statusStyles[status] || statusStyles.pending;
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1 style={styles.welcomeTitle}>
          Welcome back, {user.name}! 👋
        </h1>
        <p style={styles.welcomeSubtitle}>
          Here's what's happening with your CRM today
        </p>
      </div>

      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div style={styles.statHeader}>
                <div>
                  <div style={styles.statTitle}>{stat.title}</div>
                </div>
                <div style={{
                  ...styles.statIcon,
                  background: `${stat.color}20`
                }}>
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={{
                ...styles.statChange,
                color: stat.trend === 'up' ? '#10b981' : '#ef4444'
              }}>
                {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {stat.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.activitySection}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <div style={styles.activityList}>
          {recentActivity.map(activity => (
            <div key={activity.id} style={styles.activityItem}>
              <div style={styles.activityContent}>
                <div style={styles.activityTitle}>{activity.title}</div>
                <div style={styles.activityDescription}>
                  {activity.description.substring(0, 100)}...
                </div>
              </div>
              <div style={{
                ...styles.activityStatus,
                ...getStatusStyle(activity.status)
              }}>
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealisticDashboard;