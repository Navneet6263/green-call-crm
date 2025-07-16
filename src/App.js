import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import EnhancedHeader from './components/EnhancedHeader';
import RealisticDashboard from './components/RealisticDashboard';
import Customers from './components/Customers';
import Leads from './components/Leads';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import AddEnquiry from './components/AddEnquiry';
import MyLeads from './components/MyLeads';
import LeadHistory from './components/LeadHistory';
import LeadTracker from './components/LeadTracker';
import LeadScoring from './components/LeadScoring';
import AutoAssignment from './components/AutoAssignment';
import DuplicateDetection from './components/DuplicateDetection';
import DataTable from './components/DataTable';
import Posts from './components/Posts';
import SimpleAddLead from './components/SimpleAddLead';
import HRDashboard from './components/HRDashboard';
import SalaryManagement from './components/SalaryManagement';
import CustomerManagement from './components/CustomerManagement';
import AILeadScoring from './components/AILeadScoring';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import TaskManagement from './components/TaskManagement';
import CommunicationHub from './components/CommunicationHub';
import LocationTracker from './components/LocationTracker';
import DocumentManager from './components/DocumentManager';
import CalendarSync from './components/CalendarSync';
import AIAssistant from './components/AIAssistant';
import WorkflowAutomation from './components/WorkflowAutomation';
import SimpleAddEnquiry from './components/SimpleAddEnquiry';
import ProfessionalLeadHistory from './components/ProfessionalLeadHistory';
import ProfessionalDataTable from './components/ProfessionalDataTable';
import ProfessionalMyLeads from './components/ProfessionalMyLeads';
import ProfessionalAutoAssignment from './components/ProfessionalAutoAssignment';
import ProfessionalDuplicateDetection from './components/ProfessionalDuplicateDetection';
import ProfessionalSettings from './components/ProfessionalSettings';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ProfessionalHeader from './components/ProfessionalHeader';
import ProfessionalSidebar from './components/ProfessionalSidebar';
import ProfessionalLogin from './components/ProfessionalLogin';
import BulkAttendanceManager from './components/BulkAttendanceManager';
import GreenCallLogin from './components/GreenCallLogin';
import ToastNotification from './components/ToastNotification';
import { hasPermission, PERMISSIONS } from './utils/permissions';
import { apiService } from './services/apiService';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [crmData, setCrmData] = useState({
    leads: [],
    customers: [],
    activities: [],
    assignments: []
  });

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    document.body.style.background = darkMode ? '#111827' : '#f9fafb';
    document.body.style.color = darkMode ? '#f9fafb' : '#111827';
  }, [darkMode]);

  const handleLogin = (userData) => {
    // Use the role directly from login data
    setCurrentUser(userData);
    setIsLoggedIn(true);
    
    // Set active view based on role
    if (userData.role === 'super-admin') {
      setActiveView('dashboard');
    } else if (userData.role === 'admin') {
      setActiveView('dashboard');
    } else if (userData.role === 'sales-manager') {
      setActiveView('my-leads');
    } else if (userData.role === 'sales-rep') {
      setActiveView('my-leads');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveView('dashboard');
  };

  const updateCrmData = (newData) => {
    setCrmData(prev => ({ ...prev, ...newData }));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleAddLead = async (leadData) => {
    try {
      const newLead = await apiService.createLead(leadData);
      // Refresh all leads to include new one
      const allLeads = await apiService.getAllLeads();
      updateCrmData({ leads: allLeads });
      setShowAddLead(false);
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [leads, customers] = await Promise.all([
          apiService.getAllLeads(),
          apiService.getCustomers()
        ]);
        updateCrmData({ leads, customers });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const renderView = () => {
    switch(activeView) {
      case 'dashboard': return (
        <ProfessionalDashboard 
          crmData={crmData} 
          user={currentUser} 
          darkMode={darkMode}
          setActiveView={setActiveView}
        />
      );
      case 'leads': return <Leads crmData={crmData} updateCrmData={updateCrmData} />;
      case 'add-enquiry': return (
        <SimpleAddEnquiry 
          darkMode={darkMode} 
          user={currentUser}
          onSave={handleAddLead}
          onCancel={() => setActiveView('dashboard')}
        />
      );
      case 'my-leads': return <ProfessionalMyLeads crmData={crmData} user={currentUser} darkMode={darkMode} />;
      case 'lead-history': return <ProfessionalLeadHistory crmData={crmData} darkMode={darkMode} />;
      case 'lead-tracker': return <LeadTracker crmData={crmData} updateCrmData={updateCrmData} user={currentUser} darkMode={darkMode} />;
      case 'lead-scoring': 
        if (!['super-admin', 'admin'].includes(currentUser?.role)) {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin and Admin can access Lead Scoring</p>
            </div>
          );
        }
        return <AILeadScoring leads={crmData.leads} darkMode={darkMode} />;
      case 'auto-assignment': 
        if (!['super-admin', 'admin'].includes(currentUser?.role)) {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin and Admin can access Auto Assignment</p>
            </div>
          );
        }
        return <ProfessionalAutoAssignment crmData={crmData} updateCrmData={updateCrmData} darkMode={darkMode} />;
      case 'duplicate-detection': 
        if (!['super-admin', 'admin'].includes(currentUser?.role)) {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin and Admin can access Duplicate Detection</p>
            </div>
          );
        }
        return <ProfessionalDuplicateDetection crmData={crmData} updateCrmData={updateCrmData} darkMode={darkMode} />;
      case 'data-table': return <ProfessionalDataTable crmData={crmData} updateCrmData={updateCrmData} darkMode={darkMode} />;
      case 'posts': return <Posts />;
      case 'hr-attendance': 
        if (currentUser?.role !== 'super-admin') {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin can access HR Attendance</p>
            </div>
          );
        }
        return <HRDashboard darkMode={darkMode} />;
      case 'bulk-attendance': 
        if (currentUser?.role !== 'super-admin') {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin can access Bulk Attendance</p>
            </div>
          );
        }
        return <BulkAttendanceManager darkMode={darkMode} />;
      case 'salary-management': 
        if (currentUser?.role !== 'super-admin') {
          return (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '12px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>🚫 Access Denied</h2>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Only Super Admin can access Salary Management</p>
            </div>
          );
        }
        return <SalaryManagement darkMode={darkMode} />;
      case 'customers': return <CustomerManagement darkMode={darkMode} crmData={crmData} userRole={currentUser?.role} />;
      case 'analytics': return <AdvancedAnalytics crmData={crmData} darkMode={darkMode} />;
      case 'tasks': return <TaskManagement darkMode={darkMode} currentUser={currentUser} />;
      case 'communication': return <CommunicationHub darkMode={darkMode} lead={null} onClose={() => setActiveView('dashboard')} />;
      case 'location': return <LocationTracker darkMode={darkMode} currentUser={currentUser} />;
      case 'documents': return <DocumentManager darkMode={darkMode} currentUser={currentUser} />;
      case 'calendar': return <CalendarSync darkMode={darkMode} currentUser={currentUser} />;
      case 'ai-assistant': return <AIAssistant darkMode={darkMode} currentUser={currentUser} crmData={crmData} />;
      case 'automation': return <WorkflowAutomation darkMode={darkMode} currentUser={currentUser} crmData={crmData} />;
      case 'settings': return <ProfessionalSettings darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentUser={currentUser} />;
      default: return <Dashboard crmData={crmData} user={currentUser} />;
    }
  };

  if (!isLoggedIn) {
    return <ProfessionalLogin onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <ProfessionalSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole={currentUser?.role}
        darkMode={darkMode}
      />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`} style={{
        background: darkMode ? '#111827' : '#f9fafb',
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        <ProfessionalHeader 
          user={currentUser} 
          onLogout={handleLogout} 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setActiveView={setActiveView}
        />
        <div className="content" style={{padding: '2rem', minHeight: 'calc(100vh - 80px)'}}>
          {renderView()}
        </div>
      </div>
      
      {showAddLead && (
        <SimpleAddLead
          onSave={handleAddLead}
          onCancel={() => setShowAddLead(false)}
          darkMode={darkMode}
        />
      )}
      
      <ToastNotification />
    </div>
  );
};

export default App;