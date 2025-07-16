import React from 'react';
import { Shield, ShieldCheck, Users, User } from 'lucide-react';

const RoleIndicator = ({ role, darkMode }) => {
  const getRoleConfig = (role) => {
    switch(role) {
      case 'super-admin':
        return {
          icon: ShieldCheck,
          label: 'Super Admin',
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          description: 'Full system access'
        };
      case 'admin':
        return {
          icon: Shield,
          label: 'Admin',
          color: '#f59e0b',
          bgColor: 'rgba(245, 158, 11, 0.1)',
          description: 'Administrative access'
        };
      case 'sales-manager':
        return {
          icon: Users,
          label: 'Sales Manager',
          color: '#10b981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          description: 'Team management'
        };
      case 'sales-rep':
        return {
          icon: User,
          label: 'Sales Rep',
          color: '#6366f1',
          bgColor: 'rgba(99, 102, 241, 0.1)',
          description: 'Sales operations'
        };
      default:
        return {
          icon: User,
          label: 'User',
          color: '#6b7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          description: 'Basic access'
        };
    }
  };

  const config = getRoleConfig(role);
  const Icon = config.icon;

  const styles = {
    container: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: config.bgColor,
      border: `1px solid ${config.color}20`,
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    icon: {
      color: config.color
    },
    label: {
      color: darkMode ? 'white' : '#1f2937'
    },
    description: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '0.75rem',
      marginLeft: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <Icon size={16} style={styles.icon} />
      <span style={styles.label}>{config.label}</span>
      <span style={styles.description}>• {config.description}</span>
    </div>
  );
};

export default RoleIndicator;