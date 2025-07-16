import React, { useState } from 'react';
import { Target, Mail, Phone, Edit, Eye, CheckCircle, Calendar, TrendingUp, User, DollarSign, Clock, Activity } from 'lucide-react';
import { apiService } from '../services/apiService';

const LeadTracker = ({ crmData, updateCrmData, user, darkMode }) => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    notes: '',
    nextAction: ''
  });

  const leads = crmData.leads || [];
  const myLeads = user.role === 'sales-team' 
    ? leads.filter(lead => lead.assignedTo === user.name)
    : leads;

  const handleUpdateLead = (lead) => {
    setSelectedLead(lead);
    setUpdateData({
      status: lead.status || 'new',
      notes: lead.notes || '',
      nextAction: ''
    });
    setShowUpdateModal(true);
  };

  const saveUpdate = async () => {
    try {
      const updatedLead = {
        ...selectedLead,
        status: updateData.status,
        lastActivity: new Date().toISOString(),
        notes: updateData.notes
      };

      // Update via API
      await apiService.updateLead(selectedLead._id, updatedLead);
      
      // Refresh leads data
      const allLeads = await apiService.getAllLeads();
      updateCrmData({ leads: allLeads });
      
      setShowUpdateModal(false);
      setSelectedLead(null);
      alert('Lead updated successfully!');
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Error updating lead. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': { bg: darkMode ? '#1e3a8a' : '#dbeafe', text: darkMode ? '#60a5fa' : '#1d4ed8', border: '#3b82f6' },
      'contacted': { bg: darkMode ? '#7c2d12' : '#fed7aa', text: darkMode ? '#fb923c' : '#ea580c', border: '#f97316' },
      'qualified': { bg: darkMode ? '#065f46' : '#dcfce7', text: darkMode ? '#34d399' : '#059669', border: '#10b981' },
      'converted': { bg: darkMode ? '#14532d' : '#bbf7d0', text: darkMode ? '#4ade80' : '#16a34a', border: '#22c55e' },
      'lost': { bg: darkMode ? '#7f1d1d' : '#fee2e2', text: darkMode ? '#f87171' : '#dc2626', border: '#ef4444' },
      'proposal': { bg: darkMode ? '#581c87' : '#f3e8ff', text: darkMode ? '#c084fc' : '#9333ea', border: '#a855f7' },
      'negotiation': { bg: darkMode ? '#78350f' : '#fef3c7', text: darkMode ? '#fbbf24' : '#d97706', border: '#f59e0b' }
    };
    return colors[status] || colors['new'];
  };

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Target style={{ color: '#3b82f6' }} size={32} />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: darkMode ? 'white' : '#1f2937',
            margin: 0
          }}>
            Lead Tracker
          </h1>
        </div>
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem' }}>
          Track and update lead status and activities
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Leads', value: myLeads.length, icon: Target, color: '#3b82f6' },
          { label: 'Active', value: myLeads.filter(l => ['new', 'contacted', 'qualified'].includes(l.status)).length, icon: Activity, color: '#10b981' },
          { label: 'Converted', value: myLeads.filter(l => l.status === 'converted').length, icon: CheckCircle, color: '#22c55e' },
          { label: 'Pipeline Value', value: `₹${(myLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: '#f59e0b' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{ ...cardStyle, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: darkMode ? 'white' : '#1f2937'
                  }}>
                    {stat.value}
                  </p>
                </div>
                <Icon style={{ color: stat.color }} size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {myLeads.map(lead => {
          const statusColor = getStatusColor(lead.status);
          return (
            <div
              key={lead._id || lead.id}
              style={{
                ...cardStyle,
                padding: '1.5rem',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Lead Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {lead.companyName}
                  </h3>
                  <p style={{
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0
                  }}>
                    {lead.contactPerson}
                  </p>
                </div>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  background: statusColor.bg,
                  color: statusColor.text,
                  border: `1px solid ${statusColor.border}`
                }}>
                  {lead.status}
                </span>
              </div>

              {/* Lead Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {lead.email}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {lead.phone}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151',
                    fontWeight: '600'
                  }}>
                    ₹{lead.estimatedValue ? Number(lead.estimatedValue).toLocaleString() : '0'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {new Date(lead.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    Progress
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    {['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'converted'].indexOf(lead.status) + 1}/6
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: darkMode ? '#374151' : '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(((['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'converted'].indexOf(lead.status) + 1) / 6) * 100)}%`,
                    height: '100%',
                    background: statusColor.border,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: darkMode ? '#374151' : '#f3f4f6',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Send Email"
                >
                  <Mail size={16} />
                </button>
                <button
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: darkMode ? '#374151' : '#f3f4f6',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Make Call"
                >
                  <Phone size={16} />
                </button>
                <button
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: darkMode ? '#374151' : '#f3f4f6',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleUpdateLead(lead)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                  title="Update Status"
                >
                  <Edit size={14} />
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {myLeads.length === 0 && (
        <div style={{
          ...cardStyle,
          padding: '3rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Target size={48} style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '0.5rem'
          }}>
            No leads assigned
          </h3>
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            Contact your manager to get leads assigned
          </p>
        </div>
      )}

      {showUpdateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: darkMode ? '#1f2937' : 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Update Lead: {selectedLead?.companyName}
              </h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  padding: '0.25rem'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Lead Status
                </label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: darkMode ? '#374151' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Notes
                </label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({...updateData, notes: e.target.value})}
                  placeholder="Add notes about this update..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: darkMode ? '#374151' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Next Action
                </label>
                <input
                  type="text"
                  value={updateData.nextAction}
                  onChange={(e) => setUpdateData({...updateData, nextAction: e.target.value})}
                  placeholder="What's the next step?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: darkMode ? '#374151' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem'
              }}>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: 'transparent',
                    color: darkMode ? '#d1d5db' : '#374151',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveUpdate}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle size={16} />
                  Update Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTracker;