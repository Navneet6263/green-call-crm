import React, { useState } from 'react';
import { Eye, EyeOff, Phone, Lock, User, AlertCircle } from 'lucide-react';

const GreenCallLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const users = [
    { username: 'admin', password: 'admin123', name: 'Navneet Kumar', role: 'super-admin' },
    { username: 'adminuser', password: 'adminuser123', name: 'Admin User', role: 'admin' },
    { username: 'salesmanager', password: 'sales123', name: 'Sales Manager', role: 'sales-manager' },
    { username: 'salesrep', password: 'rep123', name: 'Sales Rep', role: 'sales-rep' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const user = users.find(
        u => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '3rem',
    width: '100%',
    maxWidth: '450px',
    border: '1px solid #e5e7eb'
  };

  const logoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const logoIconStyle = {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #22c55e, #4ade80)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
  };

  const inputGroupStyle = {
    position: 'relative',
    marginBottom: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    background: '#f9fafb'
  };

  const inputFocusStyle = {
    borderColor: '#22c55e',
    background: 'white',
    boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1)'
  };

  const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    background: loading ? '#9ca3af' : 'linear-gradient(135deg, #22c55e, #4ade80)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)',
    marginTop: '1rem'
  };

  const errorStyle = {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo Section */}
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>
            <Phone size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 0.5rem 0',
            textAlign: 'center'
          }}>
            Green Call CRM
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: 0,
            textAlign: 'center'
          }}>
            Professional Customer Relationship Management
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={errorStyle}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Username Field */}
          <div style={inputGroupStyle}>
            <User size={20} style={iconStyle} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                ...(document.activeElement?.name === 'username' ? inputFocusStyle : {})
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.background = '#f9fafb';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Password Field */}
          <div style={inputGroupStyle}>
            <Lock size={20} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                paddingRight: '3rem',
                ...(document.activeElement?.name === 'password' ? inputFocusStyle : {})
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.background = '#f9fafb';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '0.25rem'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px rgba(34, 197, 94, 0.4)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </div>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            margin: '0 0 1rem 0'
          }}>
            Authorized Personnel Only
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            <div>
              <strong>Super Admin:</strong> admin
            </div>
            <div>
              <strong>Admin:</strong> adminuser
            </div>
            <div>
              <strong>Sales Manager:</strong> salesmanager
            </div>
            <div>
              <strong>Sales Rep:</strong> salesrep
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GreenCallLogin;