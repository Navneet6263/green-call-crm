import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import signalRService from '../services/signalRService';
import { showToast } from './ToastNotification';

const ApiTestComponent = ({ darkMode }) => {
  const [testResults, setTestResults] = useState({});
  const [signalRStatus, setSignalRStatus] = useState('disconnected');
  const [signalREvents, setSignalREvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize SignalR connection
  useEffect(() => {
    // Start SignalR connection
    signalRService.start()
      .then(() => {
        setSignalRStatus('connected');
        showToast('success', '✅ SignalR connected');
      })
      .catch(err => {
        setSignalRStatus('error');
        console.error('SignalR connection error:', err);
      });
    
    // Set up event listeners
    const unsubscribeLead = signalRService.on('LeadUpdated', (lead) => {
      console.log('Lead updated in real-time:', lead);
      setSignalREvents(prev => [...prev, { type: 'LeadUpdated', data: lead, time: new Date() }]);
      showToast('info', '🔄 Lead updated in real-time');
    });
    
    const unsubscribeAttendance = signalRService.on('AttendanceMarked', (data) => {
      console.log('Attendance marked in real-time:', data);
      setSignalREvents(prev => [...prev, { type: 'AttendanceMarked', data, time: new Date() }]);
      showToast('info', '🔄 Attendance marked in real-time');
    });
    
    // Clean up on unmount
    return () => {
      unsubscribeLead();
      unsubscribeAttendance();
      signalRService.stop();
    };
  }, []);

  const testLogin = async () => {
    setIsLoading(true);
    setTestResults(prev => ({ ...prev, login: { status: 'loading' } }));
    
    try {
      const response = await apiService.login({
        username: "navneet", 
        password: "1234"
      });
      
      console.log("Login successful:", response);
      setTestResults(prev => ({ 
        ...prev, 
        login: { 
          status: 'success', 
          data: response 
        } 
      }));
      showToast('success', '✅ Login successful');
    } catch (error) {
      console.error("Login failed:", error);
      setTestResults(prev => ({ 
        ...prev, 
        login: { 
          status: 'error', 
          error: error.message 
        } 
      }));
      showToast('error', `❌ Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetLeads = async () => {
    setIsLoading(true);
    setTestResults(prev => ({ ...prev, getLeads: { status: 'loading' } }));
    
    try {
      const leads = await apiService.getAllLeads();
      console.log("Leads retrieved:", leads);
      setTestResults(prev => ({ 
        ...prev, 
        getLeads: { 
          status: 'success', 
          data: leads 
        } 
      }));
      showToast('success', `✅ Retrieved ${leads.length} leads`);
    } catch (error) {
      console.error("Get leads failed:", error);
      setTestResults(prev => ({ 
        ...prev, 
        getLeads: { 
          status: 'error', 
          error: error.message 
        } 
      }));
      showToast('error', `❌ Get leads failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testCreateLead = async () => {
    setIsLoading(true);
    setTestResults(prev => ({ ...prev, createLead: { status: 'loading' } }));
    
    try {
      const newLead = await apiService.createLead({
        contactPerson: "API Test Person",
        companyName: "API Test Company",
        email: "apitest@example.com",
        phone: "+91 9876543299",
        industry: "Technology",
        leadSource: "API Test",
        estimatedValue: 50000,
        status: "new",
        priority: "medium"
      });
      
      console.log("Lead created:", newLead);
      setTestResults(prev => ({ 
        ...prev, 
        createLead: { 
          status: 'success', 
          data: newLead 
        } 
      }));
      showToast('success', '✅ Lead created successfully');
    } catch (error) {
      console.error("Create lead failed:", error);
      setTestResults(prev => ({ 
        ...prev, 
        createLead: { 
          status: 'error', 
          error: error.message 
        } 
      }));
      showToast('error', `❌ Create lead failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetCustomers = async () => {
    setIsLoading(true);
    setTestResults(prev => ({ ...prev, getCustomers: { status: 'loading' } }));
    
    try {
      const customers = await apiService.getCustomers();
      console.log("Customers retrieved:", customers);
      setTestResults(prev => ({ 
        ...prev, 
        getCustomers: { 
          status: 'success', 
          data: customers 
        } 
      }));
      showToast('success', `✅ Retrieved ${customers.length} customers`);
    } catch (error) {
      console.error("Get customers failed:", error);
      setTestResults(prev => ({ 
        ...prev, 
        getCustomers: { 
          status: 'error', 
          error: error.message 
        } 
      }));
      showToast('error', `❌ Get customers failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testAllApis = async () => {
    setIsLoading(true);
    
    try {
      await testLogin();
      await testGetLeads();
      await testCreateLead();
      await testGetCustomers();
      
      showToast('success', '✅ All API tests completed successfully!');
    } catch (error) {
      console.error("API tests failed:", error);
      showToast('error', `❌ API tests failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    padding: '1.5rem',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    marginRight: '0.75rem',
    marginBottom: '0.75rem'
  };

  const getStatusBadge = (status) => {
    const colors = {
      loading: { bg: '#fef3c7', text: '#d97706' },
      success: { bg: '#dcfce7', text: '#16a34a' },
      error: { bg: '#fee2e2', text: '#dc2626' },
      connected: { bg: '#dcfce7', text: '#16a34a' },
      disconnected: { bg: '#f3f4f6', text: '#6b7280' }
    };
    
    const style = colors[status] || colors.loading;
    
    return (
      <span style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: style.bg,
        color: style.text
      }}>
        {status === 'loading' ? 'Loading...' : 
         status === 'success' ? 'Success' : 
         status === 'error' ? 'Error' : 
         status === 'connected' ? 'Connected' : 
         'Disconnected'}
      </span>
    );
  };

  return (
    <div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: darkMode ? 'white' : '#1f2937',
        marginBottom: '1.5rem'
      }}>
        API & SignalR Testing
      </h1>
      
      {/* SignalR Status */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            margin: 0
          }}>
            SignalR Status
          </h2>
          {getStatusBadge(signalRStatus)}
        </div>
        
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }}>
          {signalRStatus === 'connected' 
            ? 'Real-time connection established. You will receive updates automatically.' 
            : signalRStatus === 'error' 
              ? 'Failed to connect to SignalR hub. Real-time updates will not work.' 
              : 'Connecting to SignalR hub...'}
        </p>
        
        <div>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Real-time Events
          </h3>
          
          {signalREvents.length === 0 ? (
            <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontStyle: 'italic' }}>
              No events received yet. They will appear here when they occur.
            </p>
          ) : (
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto',
              background: darkMode ? '#111827' : '#f9fafb',
              padding: '0.75rem',
              borderRadius: '8px'
            }}>
              {signalREvents.map((event, index) => (
                <div key={index} style={{
                  padding: '0.5rem',
                  borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  fontSize: '0.875rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '600', color: darkMode ? '#d1d5db' : '#374151' }}>
                      {event.type}
                    </span>
                    <span style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '0.75rem' }}>
                      {new Date(event.time).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ 
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    marginTop: '0.25rem',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {JSON.stringify(event.data)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* API Tests */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1rem'
        }}>
          API Tests
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <button 
            onClick={testAllApis} 
            disabled={isLoading}
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              padding: '1rem 2rem',
              fontSize: '1rem'
            }}
          >
            Run All API Tests
          </button>
          
          <button onClick={testLogin} disabled={isLoading} style={buttonStyle}>
            Test Login
          </button>
          
          <button onClick={testGetLeads} disabled={isLoading} style={buttonStyle}>
            Test Get Leads
          </button>
          
          <button onClick={testCreateLead} disabled={isLoading} style={buttonStyle}>
            Test Create Lead
          </button>
          
          <button onClick={testGetCustomers} disabled={isLoading} style={buttonStyle}>
            Test Get Customers
          </button>
        </div>
        
        {/* Test Results */}
        {Object.keys(testResults).length > 0 && (
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              marginBottom: '0.75rem'
            }}>
              Test Results
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(testResults).map(([testName, result]) => (
                <div key={testName} style={{
                  background: darkMode ? '#374151' : '#f9fafb',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: 0,
                      textTransform: 'capitalize'
                    }}>
                      {testName.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    {getStatusBadge(result.status)}
                  </div>
                  
                  {result.status === 'success' && result.data && (
                    <div style={{
                      background: darkMode ? '#111827' : 'white',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      color: darkMode ? '#d1d5db' : '#374151',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {result.status === 'error' && result.error && (
                    <div style={{
                      background: '#fee2e220',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#dc2626'
                    }}>
                      {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Manual API Test Code */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1rem'
        }}>
          Manual API Test Code
        </h2>
        
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }}>
          Copy and paste this code into your browser console to test the API directly:
        </p>
        
        <div style={{
          background: darkMode ? '#111827' : '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          color: darkMode ? '#d1d5db' : '#374151',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0 }}>
{`// Test login
fetch("https://localhost:7191/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "navneet", password: "1234" })
})
.then(res => res.json())
.then(data => console.log("Login response:", data))
.catch(err => console.error("Login error:", err));

// Test get customers
fetch("https://localhost:7191/api/customers")
.then(res => res.json())
.then(data => console.log("Customers:", data))
.catch(err => console.error("Error fetching customers:", err));

// Test create lead
fetch("https://localhost:7191/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contactPerson: "Test Person",
    companyName: "Test Company",
    email: "test@example.com",
    phone: "+91 9876543210",
    industry: "Technology",
    leadSource: "API Test",
    estimatedValue: 100000,
    status: "new",
    priority: "medium"
  })
})
.then(res => res.json())
.then(data => console.log("Created lead:", data))
.catch(err => console.error("Error creating lead:", err));`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTestComponent;