import React, { useState } from 'react';
import { Users, Mail, Phone, Building, Calendar, Star, User, CheckCircle, Clock, Target } from 'lucide-react';

const AllLeads = ({ darkMode = false, crmData = {} }) => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 9876543210',
      company: 'Tech Solutions Pvt Ltd',
      status: 'qualified',
      priority: 'high',
      source: 'Website',
      value: '₹5,00,000',
      lastContact: '2024-01-15',
      assignedTo: null
    },
    {
      id: 2,
      name: 'Priya Sharma', 
      email: 'priya@digitalmarketing.com',
      phone: '+91 9876543211',
      company: 'Digital Marketing Hub',
      status: 'contacted',
      priority: 'medium',
      source: 'Social Media',
      value: '₹2,50,000',
      lastContact: '2024-01-14',
      assignedTo: null
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@healthcare.com', 
      phone: '+91 9876543212',
      company: 'Healthcare Solutions',
      status: 'proposal',
      priority: 'high',
      source: 'Referral',
      value: '₹7,50,000',
      lastContact: '2024-01-13',
      assignedTo: null
    }
  ]);

  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const assignOptions = ['Navneet Kumar', 'Sales Manager', 'Admin', 'Sales Rep'];

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeadSelect = (leadId) => {
    if (selectedLeadId === leadId) {
      setSelectedLeadId(null);
      setShowAssignDropdown(false);
    } else {
      setSelectedLeadId(leadId);
      setShowAssignDropdown(true);
    }
  };

  const assignLeadHandler = (e) => {
    const assignee = e.target.value;
    if (assignee && selectedLeadId) {
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === selectedLeadId 
            ? { ...lead, assignedTo: assignee }
            : lead
        )
      );
      setShowAssignDropdown(false);
      setSelectedLeadId(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'qualified': { bg: '#dcfce7', text: '#16a34a' },
      'contacted': { bg: '#dbeafe', text: '#2563eb' }, 
      'proposal': { bg: '#fef3c7', text: '#d97706' },
      'new': { bg: '#f3f4f6', text: '#6b7280' }
    };
    return colors[status] || { bg: '#f3f4f6', text: '#6b7280' };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': { bg: '#fee2e2', text: '#dc2626' },
      'medium': { bg: '#fef3c7', text: '#d97706' },
      'low': { bg: '#f0f9ff', text: '#0284c7' }
    };
    return colors[priority] || { bg: '#f3f4f6', text: '#6b7280' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1f2937' : '#f9fafb',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: darkMode ? '#374151' : 'white',
          borderRadius: '16px',
          boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          marginBottom: '32px',
          border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <Users size={32} color={darkMode ? '#60a5fa' : '#3b82f6'} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: darkMode ? 'white' : '#111827',
              margin: 0
            }}>
              All Leads
            </h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{
              fontSize: '18px',
              color: darkMode ? '#d1d5db' : '#6b7280',
              margin: 0
            }}>
              Select a lead to assign to team members
            </p>
            
            {/* Search Bar */}
            <div style={{ position: 'relative', width: '300px' }}>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  color: darkMode ? 'white' : '#374151',
                  fontSize: '14px'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                🔍
              </div>
            </div>
          </div>
          
          {/* Assign Dropdown */}
          {showAssignDropdown && selectedLeadId && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
              borderRadius: '12px',
              border: `2px solid ${darkMode ? '#60a5fa' : '#3b82f6'}`
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: darkMode ? '#d1d5db' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Assign Lead #{selectedLeadId} to:
              </p>
              <select 
                onChange={assignLeadHandler}
                style={{
                  width: '200px',
                  padding: '0.5rem',
                  border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  color: darkMode ? 'white' : '#374151'
                }}
              >
                <option value="">Select team member</option>
                {assignOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: darkMode ? '#374151' : 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>
              {filteredLeads.length}
            </div>
            <div style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>
              {searchTerm ? 'Found Leads' : 'Total Leads'}
            </div>
          </div>
          <div style={{
            backgroundColor: darkMode ? '#374151' : 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>
              {filteredLeads.filter(l => l.assignedTo).length}
            </div>
            <div style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>Assigned</div>
          </div>
          <div style={{
            backgroundColor: darkMode ? '#374151' : 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
              {filteredLeads.filter(l => !l.assignedTo).length}
            </div>
            <div style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>Unassigned</div>
          </div>
        </div>

        {/* Leads List */}
        <div style={{
          backgroundColor: darkMode ? '#374151' : 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {filteredLeads.length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>No leads found</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>
                {searchTerm ? `No results for "${searchTerm}"` : 'No leads available'}
              </p>
            </div>
          ) : filteredLeads.map((lead, index) => (
            <div 
              key={lead.id}
              onClick={() => handleLeadSelect(lead.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                borderBottom: index < filteredLeads.length - 1 ? `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedLeadId === lead.id 
                  ? (darkMode ? '#4b5563' : '#f0f9ff') 
                  : 'transparent',
                borderLeft: selectedLeadId === lead.id 
                  ? `4px solid ${darkMode ? '#60a5fa' : '#3b82f6'}` 
                  : '4px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (selectedLeadId !== lead.id) {
                  e.currentTarget.style.backgroundColor = darkMode ? '#4b556320' : '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLeadId !== lead.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                marginRight: '16px',
                flexShrink: 0
              }}>
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Lead Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#111827',
                    margin: 0
                  }}>
                    {lead.name}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: getStatusColor(lead.status).bg,
                    color: getStatusColor(lead.status).text
                  }}>
                    {lead.status.toUpperCase()}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: getPriorityColor(lead.priority).bg,
                    color: getPriorityColor(lead.priority).text
                  }}>
                    {lead.priority.toUpperCase()}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Building size={14} />
                    <span>{lead.company}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={14} />
                    <span>{lead.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={14} />
                    <span>{lead.phone}</span>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '13px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  <span>Source: {lead.source}</span>
                  <span>Value: {lead.value}</span>
                  <span>Last Contact: {lead.lastContact}</span>
                </div>
              </div>

              {/* Assignment Status & Selection */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginLeft: '16px'
              }}>
                {lead.assignedTo ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#22c55e',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <User size={16} />
                    <span>{lead.assignedTo}</span>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: '14px'
                  }}>
                    <Clock size={16} />
                    <span>Unassigned</span>
                  </div>
                )}
                
                {selectedLeadId === lead.id && (
                  <CheckCircle size={20} color="#3b82f6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLeads;