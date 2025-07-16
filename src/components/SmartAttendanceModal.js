import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, AlertTriangle, CheckCircle, User } from 'lucide-react';

const SmartAttendanceModal = ({ 
  isOpen, 
  onClose, 
  selectedDate, 
  employee, 
  currentStatus, 
  onSubmit, 
  darkMode 
}) => {
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [reason, setReason] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Get current India time
      const now = new Date();
      const indiaTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      
      setCurrentDateTime(indiaTime);
      setAttendanceStatus(currentStatus || 'Present');
      setReason('');
      setError('');
    }
  }, [isOpen, currentStatus]);

  const validateDate = () => {
    // Get current date in India timezone
    const now = new Date();
    const indiaDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata'
    }).format(now); // Returns YYYY-MM-DD format
    
    // Compare with selected date
    if (selectedDate !== indiaDate) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate date against India timezone
      if (!validateDate()) {
        setError('❌ Invalid date. Attendance changes are allowed only on today\'s date.');
        setLoading(false);
        return;
      }

      // Additional security check - verify timestamp
      const now = new Date();
      const indiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const selectedDateTime = new Date(selectedDate);
      
      // Check if selected date is today in India timezone
      if (
        selectedDateTime.getDate() !== indiaTime.getDate() ||
        selectedDateTime.getMonth() !== indiaTime.getMonth() ||
        selectedDateTime.getFullYear() !== indiaTime.getFullYear()
      ) {
        setError('❌ Security validation failed. Date manipulation detected.');
        setLoading(false);
        return;
      }

      // Prepare submission data
      const submissionData = {
        employeeId: employee.id,
        date: selectedDate,
        status: attendanceStatus,
        reason: reason.trim(),
        timestamp: new Date().toISOString(),
        indiaTimestamp: new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date()),
        previousStatus: currentStatus
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Submit the data
      await onSubmit(submissionData);

      // Show success message
      showToast('✅ Attendance updated and salary recalculated.');
      
      // Close modal
      onClose();

    } catch (error) {
      console.error('Error updating attendance:', error);
      setError('❌ Failed to update attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message) => {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #22c55e;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  };

  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const contentStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  const headerStyle = {
    padding: '1.5rem',
    borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const bodyStyle = {
    padding: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
    background: darkMode ? '#374151' : 'white',
    color: darkMode ? 'white' : '#1f2937',
    fontSize: '1rem',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={modalStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar style={{ color: '#22c55e' }} size={24} />
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Smart Attendance Update
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: darkMode ? '#9ca3af' : '#6b7280',
                margin: 0
              }}>
                {employee?.name} - {selectedDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: darkMode ? '#9ca3af' : '#6b7280',
              padding: '0.25rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <form onSubmit={handleSubmit}>
            {/* Employee Info */}
            <div style={{
              background: darkMode ? '#374151' : '#f9fafb',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <User size={20} style={{ color: '#22c55e' }} />
              <div>
                <p style={{
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {employee?.name}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  {employee?.id} • {employee?.department}
                </p>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {/* Attendance Status Toggle */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: darkMode ? '#d1d5db' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Attendance Status
              </label>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                background: darkMode ? '#374151' : '#f3f4f6',
                padding: '0.25rem',
                borderRadius: '8px'
              }}>
                <button
                  type="button"
                  onClick={() => setAttendanceStatus('Present')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '6px',
                    background: attendanceStatus === 'Present' ? '#22c55e' : 'transparent',
                    color: attendanceStatus === 'Present' ? 'white' : (darkMode ? '#d1d5db' : '#374151'),
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ✓ Present
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceStatus('Absent')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '6px',
                    background: attendanceStatus === 'Absent' ? '#ef4444' : 'transparent',
                    color: attendanceStatus === 'Absent' ? 'white' : (darkMode ? '#d1d5db' : '#374151'),
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ✗ Absent
                </button>
              </div>
            </div>

            {/* Reason Textarea */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: darkMode ? '#d1d5db' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Reason for Status Change
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for status change"
                rows="3"
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '80px'
                }}
                required
              />
            </div>

            {/* Current Date/Time (Readonly) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: darkMode ? '#d1d5db' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Current Date & Time (India)
              </label>
              <div style={{ position: 'relative' }}>
                <Clock size={20} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={currentDateTime}
                  readOnly
                  style={{
                    ...inputStyle,
                    paddingLeft: '3rem',
                    background: darkMode ? '#4b5563' : '#f3f4f6',
                    cursor: 'not-allowed',
                    opacity: 0.8
                  }}
                />
              </div>
              <p style={{
                fontSize: '0.75rem',
                color: darkMode ? '#9ca3af' : '#6b7280',
                marginTop: '0.25rem'
              }}>
                🔒 This field is protected and cannot be modified
              </p>
            </div>

            {/* Submit Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  ...buttonStyle,
                  border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  background: 'transparent',
                  color: darkMode ? '#d1d5db' : '#374151'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !reason.trim()}
                style={{
                  ...buttonStyle,
                  border: 'none',
                  background: loading || !reason.trim() ? '#9ca3af' : 'linear-gradient(135deg, #22c55e, #4ade80)',
                  color: 'white',
                  opacity: loading || !reason.trim() ? 0.6 : 1
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Submit & Recalculate
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SmartAttendanceModal;