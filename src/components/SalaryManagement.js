import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  Download, 
  Edit, 
  Save, 
  X,
  CheckCircle,
  XCircle,
  Coffee,
  Clock,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { employees, generateAttendanceData, salarySettings } from '../data/employeeData';
import SmartAttendanceModal from './SmartAttendanceModal';

const SalaryManagement = ({ darkMode }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showSmartModal, setShowSmartModal] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [editingSalary, setEditingSalary] = useState(null);
  const [tempSalary, setTempSalary] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    position: '',
    baseSalary: '',
    photo: ''
  });

  useEffect(() => {
    // Initialize employee data with attendance
    const initData = employees.map(emp => {
      const attendance = generateAttendanceData(emp.id);
      const summary = calculateAttendanceSummary(attendance);
      const finalSalary = calculateSalary(emp.baseSalary, summary);
      
      return {
        ...emp,
        attendance,
        summary,
        finalSalary
      };
    });
    
    setEmployeeList(initData);
    
    // Create attendance lookup
    const attendanceLookup = {};
    initData.forEach(emp => {
      attendanceLookup[emp.id] = emp.attendance;
    });
    setAttendanceData(attendanceLookup);
  }, []);

  const calculateAttendanceSummary = (attendance) => {
    const totalDays = attendance.filter(day => day.status !== 'Weekend').length;
    const presentDays = attendance.filter(day => day.status === 'Present').length;
    const absentDays = attendance.filter(day => day.status === 'Absent').length;
    const leaveDays = attendance.filter(day => day.status === 'Leave').length;
    
    return { totalDays, presentDays, absentDays, leaveDays };
  };

  const calculateSalary = (baseSalary, summary) => {
    const { absentDays, leaveDays } = summary;
    const deductibleAbsents = Math.max(0, absentDays);
    const deductibleLeaves = Math.max(0, leaveDays - salarySettings.allowedLeaves);
    const totalDeduction = (deductibleAbsents + deductibleLeaves) * salarySettings.perDayDeduction;
    
    return Math.max(0, baseSalary - totalDeduction);
  };

  const handleAttendanceChange = (employeeId, dayIndex, newStatus) => {
    const updatedEmployees = employeeList.map(emp => {
      if (emp.id === employeeId) {
        const updatedAttendance = [...emp.attendance];
        updatedAttendance[dayIndex] = { ...updatedAttendance[dayIndex], status: newStatus };
        
        const summary = calculateAttendanceSummary(updatedAttendance);
        const finalSalary = calculateSalary(emp.baseSalary, summary);
        
        return {
          ...emp,
          attendance: updatedAttendance,
          summary,
          finalSalary
        };
      }
      return emp;
    });
    
    setEmployeeList(updatedEmployees);
    
    // Update attendance lookup
    const updatedAttendance = updatedEmployees.find(emp => emp.id === employeeId).attendance;
    setAttendanceData(prev => ({
      ...prev,
      [employeeId]: updatedAttendance
    }));
  };

  const handleSalaryUpdate = (employeeId, newSalary) => {
    const updatedEmployees = employeeList.map(emp => {
      if (emp.id === employeeId) {
        const finalSalary = calculateSalary(newSalary, emp.summary);
        return { ...emp, baseSalary: newSalary, finalSalary };
      }
      return emp;
    });
    
    setEmployeeList(updatedEmployees);
    setEditingSalary(null);
    setTempSalary('');
  };

  const handlePerformanceRating = (employeeId, rating) => {
    const updatedEmployees = employeeList.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, performanceRating: rating };
      }
      return emp;
    });
    
    setEmployeeList(updatedEmployees);
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.department || !newEmployee.baseSalary) {
      alert('Please fill all required fields');
      return;
    }

    const employeeId = `EMP${String(employeeList.length + 1).padStart(3, '0')}`;
    const attendance = generateAttendanceData(employeeId);
    const summary = calculateAttendanceSummary(attendance);
    const finalSalary = calculateSalary(parseInt(newEmployee.baseSalary), summary);
    
    const employee = {
      id: employeeId,
      name: newEmployee.name,
      department: newEmployee.department,
      position: newEmployee.position || 'Employee',
      baseSalary: parseInt(newEmployee.baseSalary),
      photo: newEmployee.photo || `https://ui-avatars.com/api/?name=${newEmployee.name}&background=667eea&color=fff`,
      performanceRating: 3,
      adminRemarks: 'New employee - pending evaluation',
      attendance,
      summary,
      finalSalary
    };

    setEmployeeList([...employeeList, employee]);
    setAttendanceData(prev => ({
      ...prev,
      [employeeId]: attendance
    }));
    
    // Reset form
    setNewEmployee({
      name: '',
      department: '',
      position: '',
      baseSalary: '',
      photo: ''
    });
    setShowAddEmployeeModal(false);
    alert('Employee added successfully!');
  };

  const generateReport = (employee) => {
    const reportData = {
      employee: employee.name,
      id: employee.id,
      department: employee.department,
      baseSalary: employee.baseSalary,
      finalSalary: employee.finalSalary,
      attendance: employee.summary,
      performance: employee.performanceRating,
      remarks: employee.adminRemarks,
      month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    
    // Create downloadable report
    const reportContent = `
SALARY REPORT - ${reportData.month}
=====================================

Employee Details:
- Name: ${reportData.employee}
- ID: ${reportData.id}
- Department: ${reportData.department}

Salary Information:
- Base Salary: ₹${reportData.baseSalary.toLocaleString()}
- Final Salary: ₹${reportData.finalSalary.toLocaleString()}
- Deduction: ₹${(reportData.baseSalary - reportData.finalSalary).toLocaleString()}

Attendance Summary:
- Total Working Days: ${reportData.attendance.totalDays}
- Present Days: ${reportData.attendance.presentDays}
- Absent Days: ${reportData.attendance.absentDays}
- Leave Days: ${reportData.attendance.leaveDays}

Performance Rating: ${reportData.performance}/5 stars
Admin Remarks: ${reportData.remarks}

Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employee.name}_Salary_Report_${new Date().getMonth() + 1}_${new Date().getFullYear()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Present': { bg: darkMode ? '#065f46' : '#dcfce7', text: darkMode ? '#10b981' : '#166534', border: '#22c55e' },
      'Absent': { bg: darkMode ? '#7f1d1d' : '#fee2e2', text: darkMode ? '#ef4444' : '#dc2626', border: '#ef4444' },
      'Leave': { bg: darkMode ? '#78350f' : '#fef3c7', text: darkMode ? '#f59e0b' : '#d97706', border: '#f59e0b' },
      'Weekend': { bg: darkMode ? '#374151' : '#f3f4f6', text: darkMode ? '#9ca3af' : '#6b7280', border: '#9ca3af' }
    };
    return colors[status] || colors['Present'];
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DollarSign style={{ color: '#10b981' }} size={32} />
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Salary Management
              </h1>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
                Manage employee salaries, attendance, and performance ratings
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddEmployeeModal(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <Users size={20} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Employees', value: employeeList.length, icon: Users, color: '#3b82f6' },
          { label: 'Total Payroll', value: `₹${employeeList.reduce((sum, emp) => sum + emp.finalSalary, 0).toLocaleString()}`, icon: DollarSign, color: '#10b981' },
          { label: 'Avg Attendance', value: `${Math.round(employeeList.reduce((sum, emp) => sum + (emp.summary?.presentDays || 0), 0) / employeeList.length)}%`, icon: CheckCircle, color: '#22c55e' },
          { label: 'Avg Rating', value: `${(employeeList.reduce((sum, emp) => sum + emp.performanceRating, 0) / employeeList.length).toFixed(1)}/5`, icon: Star, color: '#f59e0b' }
        ].map((stat, index) => {
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
                <Icon style={{ color: stat.color }} size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {employeeList.map(employee => (
          <div key={employee.id} style={{ ...cardStyle, padding: '1.5rem' }}>
            {/* Employee Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <img
                src={employee.photo}
                alt={employee.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${employee.name}&background=667eea&color=fff`;
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: '0 0 0.25rem 0'
                }}>
                  {employee.name}
                </h3>
                <p style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  {employee.id} • {employee.department}
                </p>
              </div>
            </div>

            {/* Salary Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Base Salary
                </p>
                {editingSalary === employee.id ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={tempSalary}
                      onChange={(e) => setTempSalary(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                        borderRadius: '6px',
                        background: darkMode ? '#374151' : 'white',
                        color: darkMode ? 'white' : '#1f2937',
                        fontSize: '0.875rem'
                      }}
                    />
                    <button
                      onClick={() => handleSalaryUpdate(employee.id, parseInt(tempSalary))}
                      style={{
                        padding: '0.5rem',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Save size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingSalary(null);
                        setTempSalary('');
                      }}
                      style={{
                        padding: '0.5rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: 0
                    }}>
                      ₹{employee.baseSalary.toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setEditingSalary(employee.id);
                        setTempSalary(employee.baseSalary.toString());
                      }}
                      style={{
                        padding: '0.25rem',
                        background: 'transparent',
                        border: 'none',
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Final Salary
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#10b981',
                  margin: 0
                }}>
                  ₹{employee.finalSalary.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Attendance Summary */}
            <div style={{
              background: darkMode ? '#374151' : '#f9fafb',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem',
                textAlign: 'center'
              }}>
                <div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#10b981',
                    margin: 0
                  }}>
                    {employee.summary?.presentDays || 0}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    margin: 0
                  }}>
                    Present
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#ef4444',
                    margin: 0
                  }}>
                    {employee.summary?.absentDays || 0}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    margin: 0
                  }}>
                    Absent
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f59e0b',
                    margin: 0
                  }}>
                    {employee.summary?.leaveDays || 0}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    margin: 0
                  }}>
                    Leave
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: darkMode ? '#d1d5db' : '#374151',
                    margin: 0
                  }}>
                    {employee.summary?.totalDays || 0}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    margin: 0
                  }}>
                    Total
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Rating */}
            <div style={{ marginBottom: '1rem' }}>
              <p style={{
                fontSize: '0.875rem',
                color: darkMode ? '#9ca3af' : '#6b7280',
                marginBottom: '0.5rem'
              }}>
                Performance Rating
              </p>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handlePerformanceRating(employee.id, star)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    <Star
                      size={20}
                      fill={star <= employee.performanceRating ? '#f59e0b' : 'transparent'}
                      color={star <= employee.performanceRating ? '#f59e0b' : darkMode ? '#4b5563' : '#d1d5db'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => {
                  setSelectedEmployee(employee);
                  setShowAttendanceModal(true);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: darkMode ? '#374151' : '#f3f4f6',
                  color: darkMode ? '#d1d5db' : '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <Calendar size={16} />
                View Calendar
              </button>
              <button
                onClick={() => generateReport(employee)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <Download size={16} />
                Download Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Modal */}
      {showAttendanceModal && selectedEmployee && (
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
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                {selectedEmployee.name} - Attendance Calendar
              </h3>
              <button
                onClick={() => setShowAttendanceModal(false)}
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

            <div style={{ padding: '1.5rem' }}>
              {/* Calendar Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
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

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '0.5rem'
              }}>
                {selectedEmployee.attendance.map((day, index) => {
                  const statusColor = getStatusColor(day.status);
                  const isToday = day.date === new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Kolkata'
                  }).format(new Date());
                  
                  return (
                    <div
                      key={index}
                      style={{
                        height: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: `2px solid ${statusColor.border}`,
                        background: statusColor.bg,
                        color: statusColor.text,
                        cursor: (day.canEdit && isToday) ? 'pointer' : 'default',
                        position: 'relative',
                        opacity: isToday ? 1 : 0.7,
                        boxShadow: isToday ? '0 0 0 2px rgba(34, 197, 94, 0.3)' : 'none'
                      }}
                      onClick={() => {
                        if (day.canEdit && isToday && day.status !== 'Weekend') {
                          setSelectedDateInfo({
                            date: day.date,
                            day: day.day,
                            currentStatus: day.status,
                            employee: selectedEmployee
                          });
                          setShowSmartModal(true);
                        }
                      }}
                      title={isToday ? 'Click to update attendance (Today only)' : 'Attendance can only be updated for today'}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{day.day}</span>
                      <span style={{ fontSize: '0.625rem', fontWeight: '500' }}>
                        {day.status === 'Present' ? '✓' : 
                         day.status === 'Absent' ? '✗' : 
                         day.status === 'Leave' ? 'L' : 
                         day.status === 'Weekend' ? 'W' : '-'}
                      </span>
                      {isToday && (
                        <div style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          width: '8px',
                          height: '8px',
                          background: '#22c55e',
                          borderRadius: '50%',
                          border: '1px solid white'
                        }}></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { status: 'Present', label: 'Present', icon: '✓' },
                  { status: 'Absent', label: 'Absent', icon: '✗' },
                  { status: 'Leave', label: 'Leave', icon: 'L' },
                  { status: 'Weekend', label: 'Weekend', icon: 'W' }
                ].map(item => {
                  const color = getStatusColor(item.status);
                  return (
                    <div key={item.status} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      background: color.bg,
                      border: `1px solid ${color.border}`
                    }}>
                      <span style={{ color: color.text, fontWeight: '600' }}>{item.icon}</span>
                      <span style={{ 
                        color: color.text, 
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '1rem',
                padding: '1rem',
                background: darkMode ? '#374151' : '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #22c55e'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#22c55e',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0'
                }}>
                  🔒 Smart Attendance System
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  Only today's attendance can be modified. Click on today's date (highlighted with green dot) to update.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Attendance Modal */}
      {showSmartModal && selectedDateInfo && (
        <SmartAttendanceModal
          isOpen={showSmartModal}
          onClose={() => {
            setShowSmartModal(false);
            setSelectedDateInfo(null);
          }}
          selectedDate={selectedDateInfo.date}
          employee={selectedDateInfo.employee}
          currentStatus={selectedDateInfo.currentStatus}
          onSubmit={async (submissionData) => {
            // Update attendance with security validation
            const employeeIndex = employeeList.findIndex(emp => emp.id === submissionData.employeeId);
            if (employeeIndex !== -1) {
              const updatedEmployees = [...employeeList];
              const employee = updatedEmployees[employeeIndex];
              
              // Find and update the specific date
              const dayIndex = employee.attendance.findIndex(day => day.date === submissionData.date);
              if (dayIndex !== -1) {
                employee.attendance[dayIndex].status = submissionData.status;
                
                // Recalculate summary and salary
                const summary = calculateAttendanceSummary(employee.attendance);
                const finalSalary = calculateSalary(employee.baseSalary, summary);
                
                employee.summary = summary;
                employee.finalSalary = finalSalary;
                
                // Update state
                setEmployeeList(updatedEmployees);
                
                // Update attendance lookup
                setAttendanceData(prev => ({
                  ...prev,
                  [employee.id]: employee.attendance
                }));
                
                console.log('Attendance updated:', {
                  employee: employee.name,
                  date: submissionData.date,
                  status: submissionData.status,
                  reason: submissionData.reason,
                  newSalary: finalSalary
                });
              }
            }
          }}
          darkMode={darkMode}
        />
      )}

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
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
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Users size={24} style={{ color: '#10b981' }} />
                Add New Employee
              </h3>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  padding: '0.25rem'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      background: darkMode ? '#374151' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: darkMode ? '#d1d5db' : '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Department <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        background: darkMode ? '#374151' : 'white',
                        color: darkMode ? 'white' : '#1f2937',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: darkMode ? '#d1d5db' : '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Position
                    </label>
                    <input
                      type="text"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      placeholder="Job title"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
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
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Base Salary (₹) <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    value={newEmployee.baseSalary}
                    onChange={(e) => setNewEmployee({...newEmployee, baseSalary: e.target.value})}
                    placeholder="Enter monthly salary"
                    min="0"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      background: darkMode ? '#374151' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newEmployee.photo}
                    onChange={(e) => setNewEmployee({...newEmployee, photo: e.target.value})}
                    placeholder="https://example.com/photo.jpg"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      background: darkMode ? '#374151' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <p style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    marginTop: '0.25rem'
                  }}>
                    Leave empty to auto-generate avatar
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  onClick={() => setShowAddEmployeeModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: 'transparent',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle size={16} />
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;