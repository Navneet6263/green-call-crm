import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { TrendingUp, Users, DollarSign, Phone, ArrowUp, ArrowDown, Check, X, Calendar } from 'lucide-react';
import BookDemoModal from './BookDemoModal';

const SuperAdminDashboard = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const stats = [
    { title: 'Total Revenue', value: '$847,392', change: '+12.5%', trend: 'up', icon: DollarSign },
    { title: 'Active Customers', value: '2,847', change: '+8.2%', trend: 'up', icon: Users },
    { title: 'Calls Made', value: '1,234', change: '-3.1%', trend: 'down', icon: Phone },
    { title: 'Conversion Rate', value: '24.8%', change: '+5.7%', trend: 'up', icon: TrendingUp }
  ];

  // Demo requests that need approval
  const [demoRequests, setDemoRequests] = useState([]);

  useEffect(() => {
    fetchDemoRequests();
  }, []);

  const fetchDemoRequests = async () => {
    try {
      // Try to get from API first
      const requests = await apiService.getDemoRequests();
      setDemoRequests(requests);
    } catch (error) {
      console.error('Error fetching demo requests from API:', error);
      // Fallback to localStorage for demo purposes
      const localRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      setDemoRequests(localRequests);
    }
  };

  const handleApprove = async (id) => {
    try {
      await apiService.approveDemoRequest(id);
      fetchDemoRequests();
    } catch (error) {
      console.error('Error approving demo request via API:', error);
      // Fallback to localStorage
      const localRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      const updatedRequests = localRequests.map(request => 
        request.id === id ? { ...request, status: 'approved' } : request
      );
      localStorage.setItem('demoRequests', JSON.stringify(updatedRequests));
      setDemoRequests(updatedRequests);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiService.rejectDemoRequest(id);
      fetchDemoRequests();
    } catch (error) {
      console.error('Error rejecting demo request via API:', error);
      // Fallback to localStorage
      const localRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
      const updatedRequests = localRequests.map(request => 
        request.id === id ? { ...request, status: 'rejected' } : request
      );
      localStorage.setItem('demoRequests', JSON.stringify(updatedRequests));
      setDemoRequests(updatedRequests);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>Super Admin Dashboard</h1>
        <p style={{
          color: '#6b7280'
        }}>Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{
              background: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '0.25rem'
                  }}>{stat.value}</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: '0'
                  }}>{stat.title}</p>
                </div>
                <div style={{
                  background: stat.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.trend === 'up' ? '#10b981' : '#ef4444'
                }}>
                  <Icon size={20} />
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '1rem',
                color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                fontSize: '0.875rem'
              }}>
                {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span style={{ marginLeft: '0.25rem' }}>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '1.5rem'
        }}>Demo Requests Pending Approval</h2>
        
        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid #e5e7eb',
                textAlign: 'left'
              }}>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Company</th>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Contact</th>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Date & Time</th>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: '500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoRequests.map((request) => (
                <tr key={request.id} style={{
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <td style={{ padding: '1rem', color: '#111827' }}>{request.name}</td>
                  <td style={{ padding: '1rem', color: '#111827' }}>
                    {request.company}
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{request.employees} employees</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#111827' }}>
                    {request.email}
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{request.phone}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#111827' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: '0.5rem', color: '#6b7280' }} />
                      {new Date(request.date).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{request.time}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      background: request.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 
                                 request.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 
                                 'rgba(245, 158, 11, 0.1)',
                      color: request.status === 'approved' ? '#10b981' : 
                             request.status === 'rejected' ? '#ef4444' : 
                             '#f59e0b'
                    }}>
                      {request.status === 'approved' ? 'Approved' : 
                       request.status === 'rejected' ? 'Rejected' : 
                       'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {request.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => handleApprove(request.id)}
                          style={{
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleReject(request.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    {request.status !== 'pending' && (
                      <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        {request.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {demoRequests.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No pending demo requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;