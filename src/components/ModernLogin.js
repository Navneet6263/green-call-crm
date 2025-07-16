import React, { useState } from 'react';
import { Phone, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const ModernLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const users = [
    { username: 'superadmin', password: 'super123', name: 'Super Admin', role: 'super-admin' },
    { username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' },
    { username: 'manager', password: 'manager123', name: 'Sales Manager', role: 'sales-manager' },
    { username: 'sales', password: 'sales123', name: 'Sales Rep', role: 'sales-rep' },
    { username: 'navneet', password: 'nav123', name: 'Navneet Kumar', role: 'super-admin' }
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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '3rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxWidth: '450px',
      width: '90%',
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    logoIcon: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    logoText: {
      fontSize: '1.8rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem'
    },
    form: {
      marginBottom: '2rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem'
    },
    inputGroup: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      color: '#9ca3af',
      zIndex: 2
    },
    passwordToggle: {
      position: 'absolute',
      right: '1rem',
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '4px'
    },
    loginBtn: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    quickLogin: {
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: '1px solid #e5e7eb'
    },
    quickTitle: {
      textAlign: 'center',
      color: '#374151',
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    quickBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: '100%',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      cursor: 'pointer',
      marginBottom: '0.75rem',
      transition: 'all 0.3s ease',
      textAlign: 'left'
    },
    quickAvatar: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    quickInfo: {
      flex: 1
    },
    quickName: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    quickRole: {
      color: '#6b7280',
      fontSize: '0.75rem',
      textTransform: 'capitalize'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Phone size={24} />
            </div>
            <div style={styles.logoText}>Green Call CRM</div>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputGroup}>
              <User size={20} style={styles.inputIcon} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Enter your username"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <Lock size={20} style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.loginBtn}>
            <ArrowRight size={16} />
            Sign In to Dashboard
          </button>
        </form>

        <div style={styles.quickLogin}>
          <h3 style={styles.quickTitle}>Quick Login - Development Mode</h3>
          {users.map(user => (
            <button
              key={user.username}
              style={styles.quickBtn}
              onClick={() => quickLogin(user)}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.quickAvatar}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={styles.quickInfo}>
                <div style={styles.quickName}>{user.name}</div>
                <div style={styles.quickRole}>{user.role}</div>
              </div>
              <ArrowRight size={16} style={{color: '#9ca3af'}} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;