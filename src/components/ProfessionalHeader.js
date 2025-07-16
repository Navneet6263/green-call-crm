import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Plus
} from 'lucide-react';

const ProfessionalHeader = ({ user, onLogout, darkMode, toggleDarkMode, setActiveView }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'lead',
      title: 'New Lead Assigned',
      message: 'Tech Solutions Pvt Ltd has been assigned to you',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'task',
      title: 'Task Due Soon',
      message: 'Follow up with Healthcare Solutions',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting Reminder',
      message: 'Product demo at 3:00 PM today',
      time: '2 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'lead': return <User size={16} style={{ color: '#22c55e' }} />;
      case 'task': return <Calendar size={16} style={{ color: '#f59e0b' }} />;
      case 'meeting': return <MessageSquare size={16} style={{ color: '#3b82f6' }} />;
      default: return <Bell size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super-admin': return '#ef4444';
      case 'admin': return '#8b5cf6';
      case 'sales-manager': return '#3b82f6';
      case 'sales-rep': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'super-admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'sales-manager': return 'Sales Manager';
      case 'sales-rep': return 'Sales Rep';
      default: return 'User';
    }
  };

  const headerStyle = {
    height: '80px',
    background: darkMode ? '#1f2937' : 'white',
    borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  return (
    <header style={headerStyle}>
      {/* Left Section - Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }} />
          <input
            type="text"
            placeholder="Search leads, customers, or tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 3rem',
              border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              background: darkMode ? '#374151' : '#f9fafb',
              color: darkMode ? 'white' : '#1f2937',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#22c55e'}
            onBlur={(e) => e.target.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
          />
        </div>
      </div>

      {/* Center Section - Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveView('add-enquiry')}
          style={{
            padding: '0.75rem 1rem',
            background: 'linear-gradient(135deg, #22c55e, #4ade80)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
          }}
        >
          <Plus size={16} />
          Add Lead
        </button>

        {[
          { icon: Phone, color: '#22c55e', title: 'Quick Call' },
          { icon: Mail, color: '#3b82f6', title: 'Send Email' },
          { icon: Calendar, color: '#8b5cf6', title: 'Schedule Meeting' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              title={action.title}
              style={{
                padding: '0.75rem',
                background: darkMode ? '#374151' : '#f3f4f6',
                color: action.color,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = action.color;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = darkMode ? '#374151' : '#f3f4f6';
                e.target.style.color = action.color;
              }}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      {/* Right Section - User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{
            padding: '0.75rem',
            background: darkMode ? '#374151' : '#f3f4f6',
            color: darkMode ? '#fbbf24' : '#6b7280',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              padding: '0.75rem',
              background: darkMode ? '#374151' : '#f3f4f6',
              color: darkMode ? '#d1d5db' : '#6b7280',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                width: '18px',
                height: '18px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              width: '350px',
              background: darkMode ? '#1f2937' : 'white',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}>
              <div style={{
                padding: '1rem',
                borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  Notifications
                </h3>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map(notification => (
                  <div key={notification.id} style={{
                    padding: '1rem',
                    borderBottom: `1px solid ${darkMode ? '#374151' : '#f3f4f6'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: notification.unread 
                      ? (darkMode ? '#374151' : '#f9fafb')
                      : 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.background = darkMode ? '#4b5563' : '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.background = notification.unread 
                    ? (darkMode ? '#374151' : '#f9fafb')
                    : 'transparent'}
                  >
                    <div style={{
                      padding: '0.5rem',
                      background: darkMode ? '#4b5563' : '#f3f4f6',
                      borderRadius: '8px'
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: darkMode ? 'white' : '#1f2937',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {notification.title}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {notification.message}
                      </p>
                      <span style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#6b7280' : '#9ca3af'
                      }}>
                        {notification.time}
                      </span>
                    </div>

                    {notification.unread && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%'
                      }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1rem',
                textAlign: 'center',
                borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
              }}>
                <button style={{
                  color: '#22c55e',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem',
              background: darkMode ? '#374151' : '#f3f4f6',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                {user?.name || 'User'}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: getRoleColor(user?.role),
                fontWeight: '500'
              }}>
                {getRoleLabel(user?.role)}
              </div>
            </div>
            
            <ChevronDown size={16} style={{
              color: darkMode ? '#9ca3af' : '#6b7280',
              transform: showProfile ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              width: '250px',
              background: darkMode ? '#1f2937' : 'white',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}>
              <div style={{
                padding: '1rem',
                borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
              }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {user?.name || 'User'}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  {user?.email || 'user@greencall.com'}
                </div>
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  background: `${getRoleColor(user?.role)}20`,
                  color: getRoleColor(user?.role),
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {getRoleLabel(user?.role)}
                </div>
              </div>

              <div style={{ padding: '0.5rem' }}>
                {[
                  { icon: User, label: 'My Profile', action: () => setActiveView('settings') },
                  { icon: Settings, label: 'Settings', action: () => setActiveView('settings') }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setShowProfile(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        color: darkMode ? '#d1d5db' : '#374151',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = darkMode ? '#374151' : '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div style={{
                padding: '0.5rem',
                borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
              }}>
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfile(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    color: '#ef4444',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
};

export default ProfessionalHeader;