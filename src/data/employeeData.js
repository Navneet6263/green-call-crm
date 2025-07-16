// Employee and Salary Data
export const employees = [
  {
    id: 'EMP001',
    name: 'Navneet Kumar',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    department: 'IT',
    position: 'Software Developer',
    baseSalary: 50000,
    performanceRating: 4,
    adminRemarks: 'Excellent performance this month'
  },
    {
    id: 'EMP006',
    name: 'Navneen Kumar',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    department: 'IT',
    position: 'Software Developer',
    baseSalary: 50000,
    performanceRating: 4,
    adminRemarks: 'Excellent performance this month'
  },
  {
    id: 'EMP002',
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    department: 'Sales',
    position: 'Sales Manager',
    baseSalary: 45000,
    performanceRating: 5,
    adminRemarks: 'Outstanding sales performance'
  },
  {
    id: 'EMP003',
    name: 'Rahul Singh',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    department: 'Marketing',
    position: 'Marketing Executive',
    baseSalary: 35000,
    performanceRating: 3,
    adminRemarks: 'Good work, needs improvement in creativity'
  },
  {
    id: 'EMP004',
    name: 'Anjali Patel',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    department: 'HR',
    position: 'HR Executive',
    baseSalary: 40000,
    performanceRating: 4,
    adminRemarks: 'Very reliable and efficient'
  },
  {
    id: 'EMP005',
    name: 'Vikram Gupta',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    department: 'Finance',
    position: 'Accountant',
    baseSalary: 38000,
    performanceRating: 4,
    adminRemarks: 'Accurate and timely work'
  }
];

// Generate attendance data for current month
export const generateAttendanceData = (employeeId) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const attendance = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    
    let status;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      status = 'Weekend';
    } else {
      // Random attendance for demo
      const rand = Math.random();
      if (rand > 0.9) status = 'Absent';
      else if (rand > 0.85) status = 'Leave';
      else status = 'Present';
    }
    
    attendance.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      day: day,
      status: status,
      canEdit: dayOfWeek !== 0 && dayOfWeek !== 6 // Can't edit weekends
    });
  }
  
  return attendance;
};

export const salarySettings = {
  perDayDeduction: 1500, // Amount deducted per absent day
  workingDaysPerMonth: 22,
  allowedLeaves: 2 // Leaves that don't affect salary
};