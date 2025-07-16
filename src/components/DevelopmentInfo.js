import React from 'react';
import { Code, Database, Server, Zap } from 'lucide-react';

const DevelopmentInfo = ({ darkMode }) => {
  const styles = {
    container: {
      background: darkMode ? '#1f2937' : 'white',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '12px',
      padding: '2rem',
      margin: '2rem 0'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    card: {
      background: darkMode ? '#374151' : '#f9fafb',
      padding: '1.5rem',
      borderRadius: '8px',
      border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937'
    },
    cardContent: {
      color: darkMode ? '#d1d5db' : '#374151',
      lineHeight: '1.6'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    listItem: {
      padding: '0.5rem 0',
      borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    status: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    statusReady: {
      background: '#10b981',
      color: 'white'
    },
    statusDev: {
      background: '#f59e0b',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Code size={24} style={{color: '#667eea'}} />
        <h2 style={styles.title}>Development Environment</h2>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Server size={20} style={{color: '#10b981'}} />
            <h3 style={styles.cardTitle}>Frontend (React)</h3>
          </div>
          <div style={styles.cardContent}>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span>React 18</span>
                <span style={{...styles.status, ...styles.statusReady}}>Ready</span>
              </li>
              <li style={styles.listItem}>
                <span>Role-based Access</span>
                <span style={{...styles.status, ...styles.statusReady}}>Ready</span>
              </li>
              <li style={styles.listItem}>
                <span>Dark Mode</span>
                <span style={{...styles.status, ...styles.statusReady}}>Ready</span>
              </li>
              <li style={styles.listItem}>
                <span>Professional UI</span>
                <span style={{...styles.status, ...styles.statusReady}}>Ready</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Database size={20} style={{color: '#f59e0b'}} />
            <h3 style={styles.cardTitle}>Backend (.NET)</h3>
          </div>
          <div style={styles.cardContent}>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span>.NET 8 Web API</span>
                <span style={{...styles.status, ...styles.statusDev}}>Setup</span>
              </li>
              <li style={styles.listItem}>
                <span>Entity Framework</span>
                <span style={{...styles.status, ...styles.statusDev}}>Setup</span>
              </li>
              <li style={styles.listItem}>
                <span>SQL Server</span>
                <span style={{...styles.status, ...styles.statusDev}}>Setup</span>
              </li>
              <li style={styles.listItem}>
                <span>API Endpoints</span>
                <span style={{...styles.status, ...styles.statusDev}}>Setup</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Zap size={20} style={{color: '#667eea'}} />
            <h3 style={styles.cardTitle}>User Roles</h3>
          </div>
          <div style={styles.cardContent}>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span>Super Admin</span>
                <span style={{color: '#ef4444', fontWeight: '600'}}>Full Access</span>
              </li>
              <li style={styles.listItem}>
                <span>Admin</span>
                <span style={{color: '#f59e0b', fontWeight: '600'}}>Management</span>
              </li>
              <li style={styles.listItem}>
                <span>Sales Manager</span>
                <span style={{color: '#10b981', fontWeight: '600'}}>Team Lead</span>
              </li>
              <li style={styles.listItem}>
                <span>Sales Rep</span>
                <span style={{color: '#6366f1', fontWeight: '600'}}>Basic</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: darkMode ? '#374151' : '#f3f4f6',
        borderRadius: '8px',
        fontSize: '0.875rem',
        color: darkMode ? '#d1d5db' : '#374151'
      }}>
        <strong>Development Login Credentials:</strong><br />
        • Super Admin: navneet/nav123 or superadmin/super123<br />
        • Admin: admin/admin123<br />
        • Sales Manager: manager/manager123<br />
        • Sales Rep: sales/sales123
      </div>
    </div>
  );
};

export default DevelopmentInfo;