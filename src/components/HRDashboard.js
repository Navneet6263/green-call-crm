import React from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  Download,
  CheckCircle,
  Coffee,
  FileText
} from 'lucide-react';
import AttendanceCalendar from './AttendanceCalendar';
import { monthlyStats } from '../data/attendanceData';

const HRDashboard = ({ darkMode }) => {
  const hrButtons = [
    { id: 'attendance', icon: Calendar, label: 'Attendance', color: 'bg-blue-500', count: '95%' },
    { id: 'leave', icon: Coffee, label: 'Leave', color: 'bg-green-500', count: '5 Days' },
    { id: 'timesheet', icon: Clock, label: 'Timesheet', color: 'bg-purple-500', count: '40h' },
    { id: 'profile', icon: Users, label: 'Profile', color: 'bg-orange-500', count: 'Updated' }
  ];

  const todayStats = [
    { label: 'Check In', value: '09:15 AM', icon: CheckCircle, color: '#10b981' },
    { label: 'Break Time', value: '45 min', icon: Coffee, color: '#f59e0b' },
    { label: 'Working Hours', value: '8h 30m', icon: Clock, color: '#3b82f6' },
    { label: 'Status', value: 'Present', icon: CheckCircle, color: '#10b981' }
  ];

  const hrPolicies = [
    { id: 1, title: 'Employee Handbook', type: 'PDF', size: '2.5 MB' },
    { id: 2, title: 'Leave Policy', type: 'PDF', size: '1.2 MB' },
    { id: 3, title: 'Attendance Policy', type: 'PDF', size: '1.8 MB' },
    { id: 4, title: 'Remote Work Guidelines', type: 'PDF', size: '2.0 MB' }
  ];

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Welcome to HR Portal! 👋
        </h1>
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem' }}>
          Here's your attendance overview for today
        </p>
      </div>

      {/* Today's Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{ ...cardStyle, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: darkMode ? 'white' : '#1f2937'
                  }}>
                    {stat.value}
                  </p>
                </div>
                <Icon style={{ color: stat.color }} size={32} />
              </div>
            </div>
          );
        })}
      </div>

      {/* HR Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {hrButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.id}
              style={{
                ...cardStyle,
                padding: '1.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  background: button.color === 'bg-blue-500' ? '#3b82f6' :
                             button.color === 'bg-green-500' ? '#10b981' :
                             button.color === 'bg-purple-500' ? '#8b5cf6' : '#f59e0b',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}>
                  <Icon style={{ color: 'white' }} size={24} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {button.label}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    margin: 0
                  }}>
                    {button.count}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '2rem'
      }}>
        {/* Attendance Calendar */}
        <div>
          <AttendanceCalendar darkMode={darkMode} />
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Monthly Performance */}
          <div style={{ ...cardStyle, padding: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <TrendingUp style={{ color: '#3b82f6' }} size={24} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Monthly Stats
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {monthlyStats.map((month, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {month.month}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        background: '#10b981',
                        borderRadius: '50%'
                      }}></span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {month.present}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        background: '#ef4444',
                        borderRadius: '50%'
                      }}></span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {month.absent}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        background: '#f59e0b',
                        borderRadius: '50%'
                      }}></span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {month.leave}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HR Policies */}
          <div style={{ ...cardStyle, padding: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <FileText style={{ color: '#8b5cf6' }} size={24} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                HR Policies
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {hrPolicies.map((policy) => (
                <div key={policy.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = darkMode ? '#374151' : '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
                >
                  <div>
                    <p style={{
                      fontWeight: '500',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {policy.title}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      margin: 0
                    }}>
                      {policy.type} • {policy.size}
                    </p>
                  </div>
                  <Download size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;