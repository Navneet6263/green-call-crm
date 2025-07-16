import React, { useState } from 'react';
import { Bell, Settings, User, LogOut, Sun, Moon, Search } from 'lucide-react';

const EnhancedHeader = ({ user, onLogout, darkMode, toggleDarkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New lead assigned to you', time: '5 min ago', unread: true },
    { id: 2, text: 'Lead converted successfully', time: '1 hour ago', unread: true },
    { id: 3, text: 'Weekly report generated', time: '2 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const styles = {
    header: {
      background: darkMode ? '#1f2937' : 'white',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 100
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937'
    },
    searchContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      padding: '0.5rem 1rem 0.5rem 2.5rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: darkMode ? '#374151' : '#f9fafb',
      color: darkMode ? 'white' : '#1f2937',
      width: '300px',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    iconButton: {
      padding: '0.5rem',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      color: darkMode ? '#d1d5db' : '#6b7280',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.2s ease'
    },
    badge: {
      position: 'absolute',
      top: '0',
      right: '0',
      background: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: darkMode ? '#374151' : '#f3f4f6',
      cursor: 'pointer',
      position: 'relative'
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    userName: {
      fontWeight: '500',
      color: darkMode ? 'white' : '#1f2937'
    },
    userRole: {
      fontSize: '0.75rem',
      color: darkMode ? '#9ca3af' : '#6b7280',
      textTransform: 'capitalize'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '0.5rem',
      background: darkMode ? '#1f2937' : 'white',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      minWidth: '200px',
      zIndex: 1000
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      color: darkMode ? '#d1d5db' : '#374151',
      cursor: 'pointer',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#f3f4f6'}`,
      transition: 'background 0.2s ease'
    },
    notificationDropdown: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '0.5rem',
      background: darkMode ? '#1f2937' : 'white',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      width: '320px',
      zIndex: 1000
    },
    notificationItem: {
      padding: '1rem',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#f3f4f6'}`,
      cursor: 'pointer'
    },
    notificationText: {
      color: darkMode ? '#d1d5db' : '#374151',
      fontSize: '0.875rem',
      marginBottom: '0.25rem'
    },
    notificationTime: {
      color: darkMode ? '#9ca3af' : '#6b7280',
      fontSize: '0.75rem'
    }
  };

  return (
    <div style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>CRM Dashboard</h1>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: user.role === 'super-admin' ? 'rgba(239, 68, 68, 0.1)' : 
                     user.role === 'admin' ? 'rgba(245, 158, 11, 0.1)' : 
                     user.role === 'sales-manager' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          border: `1px solid ${user.role === 'super-admin' ? '#ef4444' : 
                               user.role === 'admin' ? '#f59e0b' : 
                               user.role === 'sales-manager' ? '#10b981' : '#6366f1'}20`,
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          <span style={{
            color: user.role === 'super-admin' ? '#ef4444' : 
                   user.role === 'admin' ? '#f59e0b' : 
                   user.role === 'sales-manager' ? '#10b981' : '#6366f1'
          }}>
            {user.role === 'super-admin' ? '🛡️' : 
             user.role === 'admin' ? '⚡' : 
             user.role === 'sales-manager' ? '👥' : '👤'}
          </span>
          <span style={{color: darkMode ? 'white' : '#1f2937'}}>
            {user.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search leads, customers..."
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.right}>
        {/* Dark Mode Toggle */}
        <button
          style={styles.iconButton}
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            style={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div style={styles.notificationDropdown}>
              <div style={{ padding: '1rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                <h3 style={{ color: darkMode ? 'white' : '#1f2937', fontSize: '1rem', fontWeight: '600' }}>
                  Notifications
                </h3>
              </div>
              {notifications.map(notification => (
                <div key={notification.id} style={styles.notificationItem}>
                  <div style={styles.notificationText}>{notification.text}</div>
                  <div style={styles.notificationTime}>{notification.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <button style={styles.iconButton}>
          <Settings size={20} />
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <div
            style={styles.userInfo}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div style={styles.avatar}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userRole}>{user.role.replace('-', ' ')}</div>
            </div>
          </div>

          {showUserMenu && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>
                <User size={16} />
                <span>Profile Settings</span>
              </div>
              <div style={styles.dropdownItem}>
                <Settings size={16} />
                <span>Account Settings</span>
              </div>
              <div
                style={{...styles.dropdownItem, color: '#ef4444'}}
                onClick={onLogout}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeader;