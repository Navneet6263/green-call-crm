import React from 'react';

const SimpleLogin = ({ onLogin }) => {
  const users = [
    { username: 'admin', name: 'Admin User', role: 'admin' },
    { username: 'manager', name: 'Sales Manager', role: 'manager' },
    { username: 'sales', name: 'Sales Rep', role: 'sales' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '2rem', color: '#333' }}>Green Call CRM</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Choose a user to login:</p>
        
        {users.map(user => (
          <button
            key={user.username}
            onClick={() => onLogin(user)}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              margin: '0.5rem 0',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Login as {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimpleLogin;