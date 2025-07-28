import React, { useState } from 'react';
import { CreditCard, Calendar, Download, Eye, CheckCircle, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';

const BillingManagement = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPlan] = useState({
    name: 'Professional',
    price: 2499,
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active'
  });

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 2499,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 2499,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 2499,
      status: 'paid',
      downloadUrl: '#'
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      upiId: 'user@paytm',
      isDefault: false
    }
  ]);

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CreditCard style={{ color: '#22c55e' }} size={32} />
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Billing & Payments
            </h1>
            <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
              Manage your subscription and payment methods
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ ...cardStyle, padding: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'invoices', label: 'Invoices', icon: Download },
            { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : (darkMode ? '#d1d5db' : '#374151'),
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Current Plan */}
          <div style={{ ...cardStyle, padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Current Plan
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                padding: '1.5rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '12px',
                border: `2px solid #22c55e`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <CheckCircle size={20} style={{ color: '#22c55e' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#22c55e'
                  }}>
                    ACTIVE
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {currentPlan.name}
                </h3>
                <p style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  ₹{currentPlan.price.toLocaleString()}/{currentPlan.billingCycle}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <Calendar size={20} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    NEXT BILLING
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {new Date(currentPlan.nextBilling).toLocaleDateString()}
                </h3>
                <p style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  Auto-renewal enabled
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <DollarSign size={20} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    TOTAL SPENT
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  ₹{(currentPlan.price * 3).toLocaleString()}
                </h3>
                <p style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  Last 3 months
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Upgrade Plan
              </button>
              <button style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: darkMode ? '#d1d5db' : '#374151',
                border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Change Plan
              </button>
            </div>
          </div>

          {/* Usage Stats */}
          <div style={{ ...cardStyle, padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Usage This Month
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { label: 'Users', current: 25, limit: 50, unit: '' },
                { label: 'Storage', current: 15.2, limit: 50, unit: 'GB' },
                { label: 'API Calls', current: 8500, limit: 10000, unit: '' },
                { label: 'Leads', current: 450, limit: 1000, unit: '' }
              ].map((stat, index) => {
                const percentage = (stat.current / stat.limit) * 100;
                return (
                  <div key={index} style={{
                    padding: '1.5rem',
                    background: darkMode ? '#374151' : '#f9fafb',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      marginBottom: '0.5rem'
                    }}>
                      {stat.label.toUpperCase()}
                    </h4>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: darkMode ? 'white' : '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {stat.current.toLocaleString()}{stat.unit} / {stat.limit.toLocaleString()}{stat.unit}
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: darkMode ? '#4b5563' : '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: percentage > 80 ? '#ef4444' : percentage > 60 ? '#f59e0b' : '#22c55e',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div style={{ ...cardStyle, padding: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Invoice History
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Invoice ID
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Date
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Amount
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} style={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: darkMode ? 'white' : '#1f2937',
                      fontWeight: '500'
                    }}>
                      {invoice.id}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: darkMode ? '#d1d5db' : '#374151'
                    }}>
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600'
                    }}>
                      ₹{invoice.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: invoice.status === 'paid' ? '#dcfce7' : '#fee2e2',
                        color: invoice.status === 'paid' ? '#16a34a' : '#dc2626'
                      }}>
                        {invoice.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{
                          padding: '0.5rem',
                          background: 'transparent',
                          border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: darkMode ? '#d1d5db' : '#374151'
                        }}>
                          <Eye size={14} />
                        </button>
                        <button style={{
                          padding: '0.5rem',
                          background: 'transparent',
                          border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: darkMode ? '#d1d5db' : '#374151'
                        }}>
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div style={{ ...cardStyle, padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Payment Methods
            </h2>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Add Payment Method
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {paymentMethods.map(method => (
              <div key={method.id} style={{
                padding: '1.5rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '12px',
                border: method.isDefault ? `2px solid #22c55e` : `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '32px',
                    background: method.type === 'card' ? '#1a365d' : '#7c3aed',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {method.type === 'card' ? method.brand : 'UPI'}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937'
                    }}>
                      {method.type === 'card' 
                        ? `•••• •••• •••• ${method.last4}`
                        : method.upiId
                      }
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      {method.type === 'card' 
                        ? `Expires ${method.expiryMonth}/${method.expiryYear}`
                        : 'UPI Payment'
                      }
                    </div>
                  </div>
                  {method.isDefault && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: '#dcfce7',
                      color: '#16a34a'
                    }}>
                      DEFAULT
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!method.isDefault && (
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      color: '#22c55e',
                      border: `1px solid #22c55e`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      Set Default
                    </button>
                  )}
                  <button style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    color: '#ef4444',
                    border: `1px solid #ef4444`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManagement;