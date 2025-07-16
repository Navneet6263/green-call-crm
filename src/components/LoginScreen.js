import React, { useState } from 'react';
import { Phone, User, Lock, Building } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const users = [
    { username: 'admin', password: 'admin123', role: 'sales-admin', name: 'Admin User' },
    { username: 'manager', password: 'manager123', role: 'sales-manager', name: 'Sales Manager' },
    { username: 'marketing', password: 'marketing123', role: 'marketing-manager', name: 'Marketing Manager' },
    { username: 'sales1', password: 'sales123', role: 'sales-team', name: 'Sales Rep 1' },
    { username: 'sales2', password: 'sales123', role: 'sales-team', name: 'Sales Rep 2' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );
    
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const quickLogin = (user) => {
    onLogin(user);
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
      <div style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '90%'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <Phone size={40} style={{color: '#667eea', marginBottom: '1rem'}} />
          <h1>Green Call CRM</h1>
          <p>Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Enter username"
              style={{width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem'}}
              required
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter password"
              style={{width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem'}}
              required
            />
          </div>

          <button type="submit" style={{width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'}}>
            Sign In
          </button>
        </form>

        <div style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb'}}>
          <h3 style={{textAlign: 'center', marginBottom: '1rem'}}>Quick Login (Demo)</h3>
          {users.map(user => (
            <button
              key={user.username}
              onClick={() => quickLogin(user)}
              style={{display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem'}}
            >
              <Building size={16} />
              <div style={{textAlign: 'left'}}>
                <div style={{fontWeight: '600'}}>{user.name}</div>
                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>{user.role.replace('-', ' ')}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;