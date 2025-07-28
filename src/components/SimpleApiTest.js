import React, { useState } from 'react';

const SimpleApiTest = () => {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testHttps = async () => {
    setIsLoading(true);
    setResults(prev => ({ ...prev, https: { status: 'loading' } }));
    
    try {
      const response = await fetch('https://localhost:7191/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
      
      const data = await response.json();
      setResults(prev => ({ 
        ...prev, 
        https: { 
          status: 'success', 
          statusCode: response.status,
          data 
        } 
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        https: { 
          status: 'error', 
          error: error.message 
        } 
      }));
    }
  };

  const testHttp = async () => {
    setResults(prev => ({ ...prev, http: { status: 'loading' } }));
    
    try {
      const response = await fetch('http://localhost:7191/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
      
      const data = await response.json();
      setResults(prev => ({ 
        ...prev, 
        http: { 
          status: 'success', 
          statusCode: response.status,
          data 
        } 
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        http: { 
          status: 'error', 
          error: error.message 
        } 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const testBoth = async () => {
    setIsLoading(true);
    await testHttps();
    await testHttp();
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Simple API Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={testBoth}
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '1rem'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Both HTTP & HTTPS'}
        </button>
        
        <button 
          onClick={testHttps}
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '1rem'
          }}
        >
          Test HTTPS Only
        </button>
        
        <button 
          onClick={testHttp}
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test HTTP Only
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* HTTPS Results */}
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>HTTPS Test</h2>
          
          {!results.https && (
            <p>Not tested yet</p>
          )}
          
          {results.https?.status === 'loading' && (
            <p>Testing HTTPS connection...</p>
          )}
          
          {results.https?.status === 'error' && (
            <div>
              <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.5rem' }}>
                Error:
              </p>
              <pre style={{ 
                background: '#fee2e2', 
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto'
              }}>
                {results.https.error}
              </pre>
            </div>
          )}
          
          {results.https?.status === 'success' && (
            <div>
              <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.5rem' }}>
                Success! Status: {results.https.statusCode}
              </p>
              <pre style={{ 
                background: '#f3f4f6', 
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto'
              }}>
                {JSON.stringify(results.https.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* HTTP Results */}
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>HTTP Test</h2>
          
          {!results.http && (
            <p>Not tested yet</p>
          )}
          
          {results.http?.status === 'loading' && (
            <p>Testing HTTP connection...</p>
          )}
          
          {results.http?.status === 'error' && (
            <div>
              <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.5rem' }}>
                Error:
              </p>
              <pre style={{ 
                background: '#fee2e2', 
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto'
              }}>
                {results.http.error}
              </pre>
            </div>
          )}
          
          {results.http?.status === 'success' && (
            <div>
              <p style={{ color: '#22c55e', fontWeight: '600', marginBottom: '0.5rem' }}>
                Success! Status: {results.http.statusCode}
              </p>
              <pre style={{ 
                background: '#f3f4f6', 
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto'
              }}>
                {JSON.stringify(results.http.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Troubleshooting Tips</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Make sure your .NET backend is running</li>
          <li>Check if the port number (7191) is correct</li>
          <li>For HTTPS errors, try accepting the certificate in your browser first</li>
          <li>Verify CORS is properly configured in your .NET backend</li>
          <li>Try using HTTP instead of HTTPS for local development</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleApiTest;