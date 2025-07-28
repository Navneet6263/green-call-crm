import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  User, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  Phone,
  Mail,
  FileText
} from 'lucide-react';

const SmartNotifications = ({ darkMode, setActiveView, currentUser }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Demo notifications - in a real app, these would come from an API
  useEffect(() => {
    const demoNotifications = [
      {
        id: 1,
        type: 'lead_assigned',
        title: 'New Lead Assigned',
        message: 'A new lead "Acme Corp" has been assigned to you',
        time: '10 minutes ago',
        read: false,
        actionable: true,
        action: 'View Lead',
        actionView: 'my-leads',
        actionParams: { leadId: 'LEAD-1001' },
        priority: 'high'
      },
      {
        id: 2,
        type: 'meeting_reminder',
        title: 'Upcoming Meeting',
        message: 'Meeting with Rahul Sharma from Tech Solutions in 30 minutes',
        time: '30 minutes ago',
        read: false,
        actionable: true,
        action: 'Join Meeting',
        actionView: 'calendar',
        actionParams: { meetingId: 'MTG-2023' },
        priority: 'high'
      },
      {
        id: 3,
        type: 'task_due',
        title: 'Task Due Today',
        message: 'Follow up with Priya Patel regarding proposal',
        time: '2 hours ago',
        read: true,
        actionable: true,
        action: 'View Task',
        actionView: 'tasks',
        actionParams: { taskId: 'TASK-456' },
        priority: 'medium'
      },
      {
        id: 4,
        type: 'lead_update',
        title: 'Lead Status Updated',
        message: 'Vikram Singh moved from "Qualified" to "Proposal"',
        time: '1 day ago',
        read: true,
        actionable: true,
        action: 'View Lead',
        actionView: 'lead-tracker',
        actionParams: { leadId: 'LEAD-789' },
        priority: 'low'
      },
      {
        id: 5,
        type: 'system',
        title: 'System Update',
        message: 'Green Call CRM will be updated tonight at 2 AM IST',
        time: '2 days ago',
        read: true,
        actionable: false,
        priority: 'info'
      }
    ];
    
    setNotifications(demoNotifications);
    setUnreadCount(demoNotifications.filter(n => !n.read).length);
  }, []);
  
  const handleNotificationClick = (notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    
    // Handle action if actionable
    if (notification.actionable && notification.actionView) {
      setActiveView(notification.actionView);
      setShowNotifications(false);
    }
  };
  
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };
  
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'lead_assigned':
        return <User size={16} />;
      case 'meeting_reminder':
        return <Calendar size={16} />;
      case 'task_due':
        return <Clock size={16} />;
      case 'lead_update':
        return <FileText size={16} />;
      case 'message':
        return <MessageSquare size={16} />;
      case 'call':
        return <Phone size={16} />;
      case 'email':
        return <Mail size={16} />;
      case 'system':
        return <AlertTriangle size={16} />;
      default:
        return <Bell size={16} />;
    }
  };
  
  const getNotificationColor = (priority) => {
    switch(priority) {
      case 'high':
        return darkMode ? '#ef4444' : '#dc2626';
      case 'medium':
        return darkMode ? '#f59e0b' : '#d97706';
      case 'low':
        return darkMode ? '#3b82f6' : '#2563eb';
      case 'info':
        return darkMode ? '#6b7280' : '#4b5563';
      default:
        return darkMode ? '#6b7280' : '#4b5563';
    }
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: darkMode ? '#1f2937' : '#f3f4f6',
          border: 'none',
          cursor: 'pointer',
          color: darkMode ? '#d1d5db' : '#4b5563'
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#ef4444',
            color: 'white',
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
      
      {showNotifications && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: '0',
          width: '350px',
          background: darkMode ? '#1f2937' : 'white',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          overflow: 'hidden',
          animation: 'slideDown 0.2s ease-out'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#111827',
              margin: 0
            }}>
              Notifications
            </h3>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: darkMode ? '#3b82f6' : '#2563eb',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={14} />
                  Mark all as read
                </button>
              )}
              
              <button
                onClick={() => setShowNotifications(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: darkMode ? '#374151' : '#f3f4f6',
                  border: 'none',
                  color: darkMode ? '#d1d5db' : '#4b5563',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>
          
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '1rem',
                    borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    background: notification.read ? 'transparent' : (darkMode ? '#111827' : '#f9fafb'),
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = darkMode ? '#374151' : '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.read ? 
                      'transparent' : 
                      (darkMode ? '#111827' : '#f9fafb');
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `${getNotificationColor(notification.priority)}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: getNotificationColor(notification.priority),
                    flexShrink: 0
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.25rem'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: darkMode ? 'white' : '#111827',
                        margin: 0
                      }}>
                        {notification.title}
                      </h4>
                      <span style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {notification.time}
                      </span>
                    </div>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#d1d5db' : '#4b5563',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {notification.message}
                    </p>
                    
                    {notification.actionable && (
                      <button style={{
                        padding: '0.25rem 0.5rem',
                        background: darkMode ? '#3b82f6' : '#2563eb',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>
                        {notification.action}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div style={{
            padding: '0.75rem',
            textAlign: 'center',
            borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <button
              onClick={() => {
                setActiveView('settings');
                setShowNotifications(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: darkMode ? '#3b82f6' : '#2563eb',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Notification Settings
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SmartNotifications;