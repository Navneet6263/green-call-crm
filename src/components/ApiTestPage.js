import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from './ToastNotification';
import config from '../config';

const ApiTestPage = ({ darkMode }) => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('navneet');
  const [password, setPassword] = useState('1234');
  const [apiUrl, setApiUrl] = useState(config.api.baseUrl);

  const runTest = async (testName, testFunction) => {
    setTestResults(prev => ({
      ...prev,
      [testName]: { status: 'running', data: null, error: null }
    }));
    
    try {
      const result = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: { status: 'success', data: result, error: null }
      }));
      return true;
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: { status: 'error', data: null, error: error.toString() }
      }));
      return false;
    }
  };

  const testLogin = async () => {
    return axios.post(`${apiUrl}/auth/login`, {
      username,
      password
    });
  };

  const testGetLeads = async () => {
    return axios.get(`${apiUrl}/leads`);
  };

  const testCreateLead = async () => {
    return axios.post(`${apiUrl}/leads`, {
      contactPerson: 'Test Person',
      companyName: 'Test Company',
      email: 'test@example.com',
      phone: '+91 9876543210',
      industry: 'Technology',
      leadSource: 'API Test',
      estimatedValue: 100000,
      status: 'new',
      priority: 'medium'
    });
  };

  const runAllTests = async () => {
    setIsLoading(true);
    
    try {
      // Test login first
      const loginSuccess = await runTest('login', testLogin);
      
      if (loginSuccess) {
        // If login succeeds, run other tests
        await Promise.all([
          runTest('getLeads', testGetLeads),
          runTest('createLead', testCreateLead)
        ]);
        showToast('success', '✅ API tests completed');
      } else {
        showToast('error', '❌ Login test failed, skipping other tests');
      }
    } catch (error) {
      console.error('Error running tests:', error);
      showToast('error', '❌ Error running tests');
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    padding: '1.5rem',
    marginBottom: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
    background: darkMode ? '#374151' : 'white',
    color: darkMode ? 'white' : '#1f2937',
    fontSize: '1rem',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  };

  const getStatusBadge = (status) => {
    const styles = {
      running: { bg: '#fef3c7', text: '#d97706' },
      success: { bg: '#dcfce7', text: '#16a34a' },
      error: { bg: '#fee2e2', text: '#dc2626' }
    };
    
    const style = styles[status] || styles.running;
    
    return (
      <span style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: style.bg,
        color: style.text
      }}>
        {status === 'running' ? 'Running...' : 
         status === 'success' ? 'Success' : 'Error'}
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
        API End-to-End Test
      </h1>

      {/* Configuration */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1rem'
        }}>
          API Configuration
        </h2>
        
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: darkMode ? '#d1d5db' : '#374151',
            marginBottom: '0.5rem'
          }}>
            API URL
          </label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            style={inputStyle}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151',
              marginBottom: '0.5rem'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        
        <button
          onClick={runAllTests}
          disabled={isLoading}
          style={buttonStyle}
        >
          {isLoading ? 'Running Tests...' : 'Run API Tests'}
        </button>
      </div>

      {/* Test Results */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1rem'
        }}>
          Test Results
        </h2>
        
        {Object.keys(testResults).length === 0 ? (
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            No tests run yet. Click "Run API Tests" to start.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} style={{
                padding: '1rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '8px',
                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {testName} Test
                  </h3>
                  {getStatusBadge(result.status)}
                </div>
                
                {result.status === 'success' && (
                  <div style={{
                    background: darkMode ? '#1f2937' : 'white',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151',
                    fontFamily: 'monospace',
                    overflowX: 'auto'
                  }}>
                    <pre style={{ margin: 0 }}>
                      {JSON.stringify(result.data?.data || result.data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {result.status === 'error' && (
                  <div style={{
                    background: '#fee2e220',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#dc2626',
                    fontFamily: 'monospace'
                  }}>
                    {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CORS Troubleshooting */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1rem'
        }}>
          CORS Troubleshooting
        </h2>
        
        <div style={{
          background: darkMode ? '#374151' : '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: darkMode ? '#d1d5db' : '#374151',
          fontFamily: 'monospace',
          marginBottom: '1rem'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>Add this to your .NET backend:</p>
          <pre style={{ margin: 0, overflowX: 'auto' }}>
{`// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// In middleware pipeline
app.UseCors("ReactAppPolicy");`}
          </pre>
        </div>
        
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '0.875rem' }}>
          If you see CORS errors in the console, make sure your .NET backend has CORS enabled for your React app's URL.
        </p>
      </div>
    </div>
  );
};

export default ApiTestPage;