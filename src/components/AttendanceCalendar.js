import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { attendanceData } from '../data/attendanceData';

const AttendanceCalendar = ({ darkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAttendanceStatus = (day) => {
    if (!day) return null;
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const attendance = attendanceData.find(item => item.date === dateStr);
    return attendance || { status: 'No Data', entryTime: null, exitTime: null };
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      borderRadius: '8px',
      border: '2px solid',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    };

    switch (status) {
      case 'Present': 
        return {
          ...baseStyle,
          background: darkMode ? '#065f46' : '#dcfce7',
          color: darkMode ? '#10b981' : '#166534',
          borderColor: darkMode ? '#10b981' : '#22c55e'
        };
      case 'Absent': 
        return {
          ...baseStyle,
          background: darkMode ? '#7f1d1d' : '#fee2e2',
          color: darkMode ? '#ef4444' : '#dc2626',
          borderColor: darkMode ? '#ef4444' : '#f87171'
        };
      case 'Leave': 
        return {
          ...baseStyle,
          background: darkMode ? '#78350f' : '#fef3c7',
          color: darkMode ? '#f59e0b' : '#d97706',
          borderColor: darkMode ? '#f59e0b' : '#fbbf24'
        };
      case 'Week Off': 
        return {
          ...baseStyle,
          background: darkMode ? '#1e3a8a' : '#dbeafe',
          color: darkMode ? '#3b82f6' : '#1d4ed8',
          borderColor: darkMode ? '#3b82f6' : '#60a5fa'
        };
      default: 
        return {
          ...baseStyle,
          background: darkMode ? '#374151' : '#f3f4f6',
          color: darkMode ? '#9ca3af' : '#6b7280',
          borderColor: darkMode ? '#4b5563' : '#d1d5db'
        };
    }
  };

  const handleDateClick = (day) => {
    if (!day) return;
    
    const attendance = getAttendanceStatus(day);
    setSelectedDate({ day, attendance });
    setShowModal(true);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);

  const containerStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Calendar Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar style={{ color: '#3b82f6' }} size={24} />
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: darkMode ? 'white' : '#1f2937',
            margin: 0
          }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => navigateMonth(-1)}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: darkMode ? '#9ca3af' : '#6b7280',
            padding: '0.5rem'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.5rem'
      }}>
        {days.map((day, index) => {
          const attendance = getAttendanceStatus(day);
          const statusStyle = attendance ? getStatusStyle(attendance.status) : {};
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              style={{
                height: '4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...statusStyle
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>{day}</span>
                  {attendance && (
                    <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                      {attendance.status === 'Present' ? '✓' : 
                       attendance.status === 'Absent' ? '✗' : 
                       attendance.status === 'Leave' ? 'L' : 
                       attendance.status === 'Week Off' ? 'W' : '-'}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedDate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: darkMode ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            maxWidth: '400px',
            width: '90%',
            margin: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                {monthNames[currentDate.getMonth()]} {selectedDate.day}, {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              ...getStatusStyle(selectedDate.attendance.status),
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Clock size={20} />
                <span style={{ fontWeight: '600' }}>Status: {selectedDate.attendance.status}</span>
              </div>
              
              {selectedDate.attendance.entryTime && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginTop: '0.75rem'
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0', opacity: 0.8 }}>Entry Time</p>
                    <p style={{ fontWeight: '600', margin: 0 }}>{selectedDate.attendance.entryTime}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0', opacity: 0.8 }}>Exit Time</p>
                    <p style={{ fontWeight: '600', margin: 0 }}>{selectedDate.attendance.exitTime}</p>
                  </div>
                </div>
              )}
              
              {selectedDate.attendance.status === 'Present' && selectedDate.attendance.entryTime && (
                <div style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <p style={{ fontSize: '0.875rem', margin: '0 0 0.25rem 0', opacity: 0.8 }}>Working Hours</p>
                  <p style={{ fontWeight: '600', margin: 0 }}>8h 30m</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;