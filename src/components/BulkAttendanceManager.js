import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckSquare, 
  Square, 
  Clock, 
  AlertTriangle,
  Save,
  RefreshCw,
  Calendar,
  Smartphone,
  CheckCircle,
  X
} from 'lucide-react';
import { showToast } from './ToastNotification';

const BulkAttendanceManager = ({ darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [teams, setTeams] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [reason, setReason] = useState('app_not_working');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Sample team data with employees
  useEffect(() => {
    const sampleTeams = [
      {
        id: 1,
        name: 'Sales Team A',
        leader: 'Navneet Kumar',
        employees: [
          { id: 101, name: 'Rajesh Kumar', designation: 'Sales Executive', phone: '+91 9876543210' },
          { id: 102, name: 'Priya Sharma', designation: 'Sales Associate', phone: '+91 9876543211' },
          { id: 103, name: 'Amit Patel', designation: 'Senior Sales Rep', phone: '+91 9876543212' },
          { id: 104, name: 'Sneha Gupta', designation: 'Sales Executive', phone: '+91 9876543213' }
        ]
      },
      {
        id: 2,
        name: 'Sales Team B',
        leader: 'Sales Manager',
        employees: [
          { id: 201, name: 'Vikram Singh', designation: 'Sales Executive', phone: '+91 9876543214' },
          { id: 202, name: 'Anita Desai', designation: 'Sales Associate', phone: '+91 9876543215' },
          { id: 203, name: 'Rohit Sharma', designation: 'Senior Sales Rep', phone: '+91 9876543216' },
          { id: 204, name: 'Kavya Nair', designation: 'Sales Executive', phone: '+91 9876543217' }
        ]
      },
      {
        id: 3,
        name: 'Marketing Team',
        leader: 'Marketing Head',
        employees: [
          { id: 301, name: 'Arjun Reddy', designation: 'Marketing Executive', phone: '+91 9876543218' },
          { id: 302, name: 'Pooja Mehta', designation: 'Digital Marketer', phone: '+91 9876543219' },
          { id: 303, name: 'Karan Johar', designation: 'Content Creator', phone: '+91 9876543220' }
        ]
      },
      {
        id: 4,
        name: 'Support Team',
        leader: 'Support Manager',
        employees: [
          { id: 401, name: 'Ravi Kumar', designation: 'Support Executive', phone: '+91 9876543221' },
          { id: 402, name: 'Meera Joshi', designation: 'Customer Support', phone: '+91 9876543222' },
          { id: 403, name: 'Suresh Babu', designation: 'Technical Support', phone: '+91 9876543223' }
        ]
      }
    ];
    setTeams(sampleTeams);
  }, []);

  const handleTeamSelectAll = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    const teamEmployeeIds = team.employees.map(emp => emp.id);
    
    // Check if all team members are already selected
    const allSelected = teamEmployeeIds.every(id => selectedEmployees.includes(id));
    
    if (allSelected) {
      // Deselect all team members
      setSelectedEmployees(prev => prev.filter(id => !teamEmployeeIds.includes(id)));
    } else {
      // Select all team members
      setSelectedEmployees(prev => [...new Set([...prev, ...teamEmployeeIds])]);
    }
  };

  const handleEmployeeToggle = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const isTeamFullySelected = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team.employees.every(emp => selectedEmployees.includes(emp.id));
  };

  const isTeamPartiallySelected = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team.employees.some(emp => selectedEmployees.includes(emp.id)) && !isTeamFullySelected(teamId);
  };

  const handleBulkAttendance = () => {
    if (selectedEmployees.length === 0) {
      showToast('error', '❌ Please select at least one employee');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmBulkAttendance = () => {
    // Get selected employee details
    const selectedEmployeeDetails = [];
    teams.forEach(team => {
      team.employees.forEach(emp => {
        if (selectedEmployees.includes(emp.id)) {
          selectedEmployeeDetails.push({
            ...emp,
            teamName: team.name,
            date: selectedDate,
            reason: reason,
            markedBy: 'Admin',
            timestamp: new Date().toISOString()
          });
        }
      });
    });

    // Save to localStorage (in real app, this would go to database)
    const existingAttendance = JSON.parse(localStorage.getItem('bulkAttendance') || '[]');
    const newAttendance = [...existingAttendance, ...selectedEmployeeDetails];
    localStorage.setItem('bulkAttendance', JSON.stringify(newAttendance));

    showToast('success', `✅ Attendance marked for ${selectedEmployees.length} employees`);
    setSelectedEmployees([]);
    setShowConfirmModal(false);
  };

  const getReasonText = (reasonCode) => {
    const reasons = {
      'app_not_working': 'Mobile App Not Working',
      'server_down': 'Server Down',
      'network_issue': 'Network Issues',
      'system_maintenance': 'System Maintenance',
      'emergency': 'Emergency Situation'
    };
    return reasons[reasonCode] || reasonCode;
  };

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #ef4444, #f87171)',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
          }}>
            <AlertTriangle size={24} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Bulk Attendance Manager
            </h1>
            <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
              Mark attendance for multiple employees when mobile app is not working
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ ...cardStyle, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          alignItems: 'end'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151',
              marginBottom: '0.5rem'
            }}>
              Select Date
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? 'white' : '#1f2937',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151',
              marginBottom: '0.5rem'
            }}>
              Reason for Bulk Attendance
            </label>
            <div style={{ position: 'relative' }}>
              <Smartphone size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? 'white' : '#1f2937',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="app_not_working">Mobile App Not Working</option>
                <option value="server_down">Server Down</option>
                <option value="network_issue">Network Issues</option>
                <option value="system_maintenance">System Maintenance</option>
                <option value="emergency">Emergency Situation</option>
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={handleBulkAttendance}
              disabled={selectedEmployees.length === 0}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: selectedEmployees.length > 0 
                  ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                  : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedEmployees.length > 0 ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Save size={20} />
              Mark Attendance ({selectedEmployees.length})
            </button>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {teams.map(team => (
          <div key={team.id} style={{ ...cardStyle, overflow: 'hidden' }}>
            {/* Team Header */}
            <div style={{
              padding: '1.5rem',
              background: darkMode ? '#374151' : '#f9fafb',
              borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: '0 0 0.25rem 0'
                }}>
                  {team.name}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  Team Leader: {team.leader} • {team.employees.length} members
                </p>
              </div>

              <button
                onClick={() => handleTeamSelectAll(team.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: isTeamFullySelected(team.id) 
                    ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                    : (isTeamPartiallySelected(team.id) ? '#f59e0b' : 'transparent'),
                  color: isTeamFullySelected(team.id) || isTeamPartiallySelected(team.id) ? 'white' : (darkMode ? '#d1d5db' : '#374151'),
                  border: `2px solid ${isTeamFullySelected(team.id) ? '#22c55e' : (isTeamPartiallySelected(team.id) ? '#f59e0b' : (darkMode ? '#4b5563' : '#e5e7eb'))}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isTeamFullySelected(team.id) ? (
                  <CheckSquare size={16} />
                ) : isTeamPartiallySelected(team.id) ? (
                  <CheckSquare size={16} style={{ opacity: 0.7 }} />
                ) : (
                  <Square size={16} />
                )}
                Select All
              </button>
            </div>

            {/* Employee List */}
            <div style={{ padding: '1rem' }}>
              {team.employees.map(employee => {
                const isSelected = selectedEmployees.includes(employee.id);
                return (
                  <div
                    key={employee.id}
                    onClick={() => handleEmployeeToggle(employee.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      background: isSelected 
                        ? (darkMode ? '#22c55e20' : '#dcfce7')
                        : (darkMode ? '#374151' : '#f9fafb'),
                      border: `2px solid ${isSelected ? '#22c55e' : 'transparent'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected ? (
                        <CheckSquare size={20} style={{ color: '#22c55e' }} />
                      ) : (
                        <Square size={20} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                      )}
                    </div>

                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: darkMode ? 'white' : '#1f2937',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {employee.name}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {employee.designation}
                      </p>
                      <p style={{
                        fontSize: '0.75rem',
                        color: darkMode ? '#6b7280' : '#9ca3af',
                        margin: 0
                      }}>
                        {employee.phone}
                      </p>
                    </div>

                    {isSelected && (
                      <CheckCircle size={20} style={{ color: '#22c55e' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
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
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: darkMode ? '#1f2937' : 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <AlertTriangle size={24} style={{ color: '#f59e0b' }} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Confirm Bulk Attendance
              </h3>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <p style={{
                color: darkMode ? '#d1d5db' : '#374151',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                You are about to mark attendance for <strong>{selectedEmployees.length} employees</strong> for date <strong>{selectedDate}</strong>.
              </p>
              
              <div style={{
                background: darkMode ? '#374151' : '#f9fafb',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: '0 0 0.5rem 0'
                }}>
                  Reason:
                </p>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {getReasonText(reason)}
                </p>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: darkMode ? '#9ca3af' : '#6b7280',
                marginBottom: '1.5rem'
              }}>
                This action cannot be undone. Are you sure you want to proceed?
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem'
              }}>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: 'transparent',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <X size={16} />
                  Cancel
                </button>
                
                <button
                  onClick={confirmBulkAttendance}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle size={16} />
                  Confirm & Mark Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkAttendanceManager;