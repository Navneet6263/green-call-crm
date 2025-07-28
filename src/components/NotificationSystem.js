import React, { useState, useEffect } from 'react';
import { Bell, X, Check, User, Phone, Mail, Calendar, AlertTriangle, Info } from 'lucide-react';

const NotificationSystem = ({ darkMode }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sample notifications - in a real app, these would come from your API or SignalR
  const sampleNotifications = [
    {
      id: 1,
      type: 'lead',
      title: 'New Lead Created',
      message: 'A new lead was created for Tech Solutions Pvt Ltd',
      time: '5 minutes ago',
      read: false,
      icon: User
    },
    {
      id: 2,
      type: 'call',
      title: 'Upcoming Call Reminder',
      message: 'You have a call scheduled with Rajesh Kumar in 30 minutes',
      time: '10 minutes ago',
      read: false,
      icon: Phone
    },
    {
      id: 3,
      type: 'email',
      title: 'Email Sent',
      message: 'Your proposal was successfully sent to Healthcare Solutions',
      time: '1 hour ago',
      read: true,
      icon: Mail
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Meeting Scheduled',
      message: 'Demo meeting with Digital Marketing Hub at 2:00 PM',
      time: '2 hours ago',
      read: true,
      icon: Calendar
    },
    {
      id: 5,
      type: 'alert',
      title: 'Follow-up Required',
      message: 'No activity with Amit Patel for 7 days',
      time: '3 hours ago',
      read: true,
      icon: AlertTriangle
    }
  ];

  useEffect(() => {
    // Load notifications
    setNotifications(sampleNotifications);
    
    // Calculate unread count
    const unread = sampleNotifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
    
    // In a real app, you would connect to SignalR here
    const connectToSignalR = () => {
      console.log('Connecting to SignalR for real-time notifications...');
      // Simulating new notifications arriving
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newNotification = {
            id: Date.now(),
            type: ['lead', 'call', 'email', 'meeting', 'alert'][Math.floor(Math.random() * 5)],
            title: 'New Notification',
            message: 'This is a real-time notification that just arrived',
            time: 'Just now',
            read: false,
            icon: Info
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show notification toast
          showToast(newNotification);
        }
      }, 30000); // Check every 30 seconds
      
      return () => clearInterval(interval);
    };
    
    const cleanup = connectToSignalR();
    return cleanup;
  }, []);

  const showToast = (notification) => {
    // Create a toast element
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '1rem';
    toast.style.background = darkMode ? '#1f2937' : 'white';
    toast.style.color = darkMode ? 'white' : '#1f2937';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    toast.style.border = `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`;
    toast.style.zIndex = '9999';
    toast.style.maxWidth = '300px';
    toast.style.animation = 'slideIn 0.3s ease-out';
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // Add content
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="background: ${getTypeColor(notification.type)}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div>
          <p style="font-weight: 600; margin: 0 0 0.25rem 0;">${notification.title}</p>
          <p style="font-size: 0.875rem; margin: 0; opacity: 0.8;">${notification.message}</p>
        </div>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 5000);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    // Recalculate unread count
    const unread = notifications.filter(notification => 
      notification.id !== id && !notification.read
    ).length;
    setUnreadCount(unread);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    // Recalculate unread count
    const unread = updatedNotifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lead': return '#3b82f6';
      case 'call': return '#10b981';
      case 'email': return '#8b5cf6';
      case 'meeting': return '#f59e0b';
      case 'alert': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          padding: '0.5rem',
          cursor: 'pointer',
          color: darkMode ? 'white' : '#1f2937'
        }}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span style={{
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
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: '0',
          width: '350px',
          background: darkMode ? '#1f2937' : 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          zIndex: 50,
          maxHeight: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Check size={14} />
                Mark all as read
              </button>
            )}
          </div>

          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0.5rem'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      background: notification.read ? 'transparent' : (darkMode ? '#374151' : '#f9fafb'),
                      borderLeft: `3px solid ${getTypeColor(notification.type)}`,
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: getTypeColor(notification.type),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <IconComponent size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.875rem',
                          fontWeight: notification.read ? '500' : '600',
                          color: darkMode ? 'white' : '#1f2937',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {notification.title}
                        </p>
                        <p style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#9ca3af' : '#6b7280',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {notification.message}
                        </p>
                        <p style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#6b7280' : '#9ca3af',
                          margin: 0
                        }}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '0.25rem',
                            cursor: 'pointer',
                            color: darkMode ? '#9ca3af' : '#6b7280',
                            borderRadius: '4px'
                          }}
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '0.25rem',
                          cursor: 'pointer',
                          color: darkMode ? '#9ca3af' : '#6b7280',
                          borderRadius: '4px'
                        }}
                        title="Delete notification"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{
            padding: '0.75rem',
            borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            textAlign: 'center'
          }}>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#3b82f6',
                fontSize: '0.875rem',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;