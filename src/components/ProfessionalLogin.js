import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield, 
  Mail,
  Phone,
  Building,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Users
} from 'lucide-react';
import { showToast } from './ToastNotification';

const ProfessionalLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const users = [
    {
      username: 'admin',
      password: 'admin123',
      name: 'Navneet Kumar',
      role: 'super-admin',
      email: 'navneet@greencall.com',
      avatar: 'NK',
      department: 'Administration',
      lastLogin: '2 hours ago'
    },
    {
      username: 'adminuser',
      password: 'adminuser123',
      name: 'Admin User',
      role: 'admin',
      email: 'admin@greencall.com',
      avatar: 'AU',
      department: 'Management',
      lastLogin: '1 day ago'
    },
    {
      username: 'salesmanager',
      password: 'sales123',
      name: 'Sales Manager',
      role: 'sales-manager',
      email: 'manager@greencall.com',
      avatar: 'SM',
      department: 'Sales',
      lastLogin: '3 hours ago'
    },
    {
      username: 'salesrep',
      password: 'rep123',
      name: 'Sales Representative',
      role: 'sales-rep',
      email: 'rep@greencall.com',
      avatar: 'SR',
      department: 'Sales',
      lastLogin: '5 hours ago'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = users.find(u => 
        u.username === formData.username && u.password === formData.password
      );

      if (user) {
        showToast('success', `🎉 Welcome back, ${user.name}!`);
        onLogin(user);
      } else {
        showToast('error', '❌ Invalid username or password');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickLogin = (user) => {
    setFormData({
      username: user.username,
      password: user.password
    });
    setSelectedRole(user.role);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super-admin': return '#ef4444';
      case 'admin': return '#8b5cf6';
      case 'sales-manager': return '#3b82f6';
      case 'sales-rep': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super-admin': return Shield;
      case 'admin': return Building;
      case 'sales-manager': return BarChart3;
      case 'sales-rep': return Users;
      default: return User;
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundElements = (
    <>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite'
      }} />
    </>
  );

  return (
    <div style={containerStyle}>
      {backgroundElements}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '3rem',
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        zIndex: 1
      }}>
        {/* Left Side - Branding */}
        <div style={{ color: 'white' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white'
              }}>
                G
              </span>
            </div>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(135deg, #ffffff, #f0f9ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Green Call CRM
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              margin: '0 0 2rem 0',
              lineHeight: '1.6'
            }}>
              Streamline your sales process with our powerful CRM platform. 
              Manage leads, track performance, and grow your business.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            {[
              { icon: Zap, title: 'AI-Powered', desc: 'Smart lead scoring and automation' },
              { icon: BarChart3, title: 'Analytics', desc: 'Real-time performance insights' },
              { icon: Users, title: 'Team Management', desc: 'Collaborative workspace' },
              { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Icon size={24} style={{ color: '#22c55e' }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '600' }}>
                      {feature.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '2.5rem',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome Back
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: 0
            }}>
              Sign in to access your CRM dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter your username"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 3rem 0.75rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    background: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                background: isLoading 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #22c55e, #4ade80)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Quick Login Options */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                Quick Login
              </span>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem'
            }}>
              {users.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                const isSelected = selectedRole === user.role;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickLogin(user)}
                    style={{
                      padding: '0.75rem',
                      background: isSelected ? `${getRoleColor(user.role)}10` : '#f9fafb',
                      border: `2px solid ${isSelected ? getRoleColor(user.role) : '#e5e7eb'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.borderColor = '#d1d5db';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.target.style.background = '#f9fafb';
                        e.target.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <RoleIcon size={16} style={{ color: getRoleColor(user.role) }} />
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {user.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div style={{
                          fontSize: '0.625rem',
                          color: '#6b7280'
                        }}>
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f0f9ff',
            borderRadius: '8px',
            border: '1px solid #bae6fd'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#0369a1',
              margin: '0 0 0.5rem 0'
            }}>
              Demo Credentials
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#0369a1', lineHeight: '1.4' }}>
              <div>Super Admin: admin / admin123</div>
              <div>Admin: adminuser / adminuser123</div>
              <div>Sales Manager: salesmanager / sales123</div>
              <div>Sales Rep: salesrep / rep123</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalLogin;