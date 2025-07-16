import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Search, 
  Filter, 
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  ArrowUpDown
} from 'lucide-react';

const ProfessionalLeadHistory = ({ darkMode, crmData }) => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Initialize with sample lead history data
    const sampleLeads = [
      {
        id: 1,
        contactPerson: 'Rajesh Kumar',
        companyName: 'Tech Solutions Pvt Ltd',
        email: 'rajesh@techsolutions.com',
        phone: '+91 9876543210',
        industry: 'Technology',
        leadSource: 'Website',
        estimatedValue: 500000,
        status: 'converted',
        priority: 'high',
        assignedTo: 'Navneet Kumar',
        createdDate: '2024-12-15T10:30:00Z',
        lastUpdated: '2024-12-20T14:45:00Z',
        notes: 'Interested in CRM solution for 50+ employees',
        activities: [
          { date: '2024-12-15', action: 'Lead Created', user: 'System' },
          { date: '2024-12-16', action: 'First Contact Made', user: 'Navneet Kumar' },
          { date: '2024-12-18', action: 'Demo Scheduled', user: 'Navneet Kumar' },
          { date: '2024-12-20', action: 'Converted to Customer', user: 'Navneet Kumar' }
        ]
      },
      {
        id: 2,
        contactPerson: 'Priya Sharma',
        companyName: 'Digital Marketing Hub',
        email: 'priya@digitalmarketing.com',
        phone: '+91 9876543211',
        industry: 'Marketing',
        leadSource: 'Social Media',
        estimatedValue: 250000,
        status: 'proposal',
        priority: 'medium',
        assignedTo: 'Sales Manager',
        createdDate: '2024-12-10T09:15:00Z',
        lastUpdated: '2024-12-19T16:20:00Z',
        notes: 'Looking for social media management tools',
        activities: [
          { date: '2024-12-10', action: 'Lead Created', user: 'System' },
          { date: '2024-12-11', action: 'Initial Contact', user: 'Sales Manager' },
          { date: '2024-12-15', action: 'Requirements Gathered', user: 'Sales Manager' },
          { date: '2024-12-19', action: 'Proposal Sent', user: 'Sales Manager' }
        ]
      },
      {
        id: 3,
        contactPerson: 'Amit Patel',
        companyName: 'Healthcare Solutions',
        email: 'amit@healthcare.com',
        phone: '+91 9876543212',
        industry: 'Healthcare',
        leadSource: 'Referral',
        estimatedValue: 750000,
        status: 'qualified',
        priority: 'high',
        assignedTo: 'Senior Sales Rep',
        createdDate: '2024-12-05T11:45:00Z',
        lastUpdated: '2024-12-18T13:30:00Z',
        notes: 'Enterprise healthcare management system needed',
        activities: [
          { date: '2024-12-05', action: 'Lead Created', user: 'System' },
          { date: '2024-12-06', action: 'Qualification Call', user: 'Senior Sales Rep' },
          { date: '2024-12-12', action: 'Technical Discussion', user: 'Senior Sales Rep' },
          { date: '2024-12-18', action: 'Budget Confirmed', user: 'Senior Sales Rep' }
        ]
      },
      {
        id: 4,
        contactPerson: 'Sneha Gupta',
        companyName: 'Retail Chain Store',
        email: 'sneha@retailchain.com',
        phone: '+91 9876543213',
        industry: 'Retail',
        leadSource: 'Cold Call',
        estimatedValue: 150000,
        status: 'contacted',
        priority: 'low',
        assignedTo: 'Sales Rep',
        createdDate: '2024-12-01T14:20:00Z',
        lastUpdated: '2024-12-15T10:15:00Z',
        notes: 'Small retail chain, budget constraints',
        activities: [
          { date: '2024-12-01', action: 'Lead Created', user: 'System' },
          { date: '2024-12-03', action: 'Cold Call Made', user: 'Sales Rep' },
          { date: '2024-12-08', action: 'Follow-up Email', user: 'Sales Rep' },
          { date: '2024-12-15', action: 'Second Follow-up', user: 'Sales Rep' }
        ]
      },
      {
        id: 5,
        contactPerson: 'Vikram Singh',
        companyName: 'Manufacturing Corp',
        email: 'vikram@manufacturing.com',
        phone: '+91 9876543214',
        industry: 'Manufacturing',
        leadSource: 'Trade Show',
        estimatedValue: 1000000,
        status: 'lost',
        priority: 'high',
        assignedTo: 'Navneet Kumar',
        createdDate: '2024-11-20T16:00:00Z',
        lastUpdated: '2024-12-10T12:00:00Z',
        notes: 'Went with competitor due to pricing',
        activities: [
          { date: '2024-11-20', action: 'Lead Created', user: 'System' },
          { date: '2024-11-22', action: 'Trade Show Meeting', user: 'Navneet Kumar' },
          { date: '2024-11-28', action: 'Proposal Submitted', user: 'Navneet Kumar' },
          { date: '2024-12-10', action: 'Lost to Competitor', user: 'Navneet Kumar' }
        ]
      }
    ];

    // Combine with existing CRM data
    const allLeads = [...sampleLeads, ...(crmData.leads || [])];
    setLeads(allLeads);
    setFilteredLeads(allLeads);
  }, [crmData]);

  useEffect(() => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(lead => new Date(lead.createdDate) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(lead => new Date(lead.createdDate) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(lead => new Date(lead.createdDate) >= filterDate);
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.createdDate);
          bValue = new Date(b.createdDate);
          break;
        case 'name':
          aValue = a.contactPerson.toLowerCase();
          bValue = b.contactPerson.toLowerCase();
          break;
        case 'company':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        case 'value':
          aValue = a.estimatedValue || 0;
          bValue = b.estimatedValue || 0;
          break;
        default:
          aValue = a.createdDate;
          bValue = b.createdDate;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, dateFilter, sortBy, sortOrder]);

  const getStatusColor = (status) => {
    const colors = {
      'new': { bg: '#dbeafe', text: '#1d4ed8', border: '#3b82f6' },
      'contacted': { bg: '#fef3c7', text: '#d97706', border: '#f59e0b' },
      'qualified': { bg: '#e0e7ff', text: '#5b21b6', border: '#8b5cf6' },
      'proposal': { bg: '#fce7f3', text: '#be185d', border: '#ec4899' },
      'converted': { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
      'lost': { bg: '#fee2e2', text: '#dc2626', border: '#ef4444' }
    };
    return colors[status] || colors['new'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': { bg: '#f3f4f6', text: '#6b7280', border: '#9ca3af' },
      'medium': { bg: '#fef3c7', text: '#d97706', border: '#f59e0b' },
      'high': { bg: '#fee2e2', text: '#dc2626', border: '#ef4444' },
      'urgent': { bg: '#fecaca', text: '#991b1b', border: '#dc2626' }
    };
    return colors[priority] || colors['medium'];
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setShowDetails(true);
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
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Clock style={{ color: '#3b82f6' }} size={32} />
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Lead History
            </h1>
            <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
              Complete timeline and history of all your leads
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { 
            label: 'Total Leads', 
            value: leads.length,
            icon: User, 
            color: '#3b82f6',
            trend: '+12%'
          },
          { 
            label: 'Converted', 
            value: leads.filter(l => l.status === 'converted').length,
            icon: TrendingUp, 
            color: '#22c55e',
            trend: '+8%'
          },
          { 
            label: 'In Progress', 
            value: leads.filter(l => ['contacted', 'qualified', 'proposal'].includes(l.status)).length,
            icon: Clock, 
            color: '#f59e0b',
            trend: '+5%'
          },
          { 
            label: 'Lost Leads', 
            value: leads.filter(l => l.status === 'lost').length,
            icon: TrendingDown, 
            color: '#ef4444',
            trend: '-3%'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{ ...cardStyle, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Icon style={{ color: stat.color }} size={24} />
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: stat.trend.startsWith('+') ? '#22c55e' : '#ef4444'
                }}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  {stat.label}
                </p>
                <p style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ ...cardStyle, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              placeholder="Search leads by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={20} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '0.75rem',
                border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          {/* Date Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                padding: '0.75rem',
                border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            style={{
              padding: '0.75rem 1rem',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div style={{ ...cardStyle, overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          background: darkMode ? '#374151' : '#f9fafb'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr 1fr',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {[
              { label: 'Contact', field: 'name' },
              { label: 'Company', field: 'company' },
              { label: 'Status', field: 'status' },
              { label: 'Priority', field: 'priority' },
              { label: 'Value', field: 'value' },
              { label: 'Created', field: 'date' },
              { label: 'Actions', field: null }
            ].map((header, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: darkMode ? '#d1d5db' : '#374151'
                }}>
                  {header.label}
                </span>
                {header.field && (
                  <button
                    onClick={() => handleSort(header.field)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    <ArrowUpDown size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filteredLeads.map(lead => {
            const statusColor = getStatusColor(lead.status);
            const priorityColor = getPriorityColor(lead.priority);
            
            return (
              <div key={lead.id} style={{
                padding: '1.5rem',
                borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = darkMode ? '#374151' : '#f9fafb'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr 1fr',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  {/* Contact */}
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}>
                      {lead.contactPerson}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Mail size={14} />
                      {lead.email}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: darkMode ? 'white' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}>
                      {lead.companyName}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      {lead.industry}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
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

                  {/* Priority */}
                  <div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      background: priorityColor.bg,
                      color: priorityColor.text,
                      border: `1px solid ${priorityColor.border}`
                    }}>
                      {lead.priority}
                    </span>
                  </div>

                  {/* Value */}
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#22c55e'
                  }}>
                    ₹{(lead.estimatedValue || 0).toLocaleString()}
                  </div>

                  {/* Created Date */}
                  <div style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    {new Date(lead.createdDate).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleViewDetails(lead)}
                      style={{
                        padding: '0.5rem',
                        background: darkMode ? '#374151' : '#f3f4f6',
                        color: darkMode ? '#d1d5db' : '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      style={{
                        padding: '0.5rem',
                        background: darkMode ? '#374151' : '#f3f4f6',
                        color: darkMode ? '#d1d5db' : '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div style={{
          ...cardStyle,
          padding: '3rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Clock size={48} style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '0.5rem'
          }}>
            No leads found
          </h3>
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No lead history available yet'
            }
          </p>
        </div>
      )}

      {/* Lead Details Modal */}
      {showDetails && selectedLead && (
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
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: darkMode ? '#1f2937' : 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Lead Details - {selectedLead.contactPerson}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Lead Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Contact Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Name</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedLead.contactPerson}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Email</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedLead.email}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Phone</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedLead.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Lead Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Company</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedLead.companyName}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Industry</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedLead.industry}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Estimated Value</label>
                      <p style={{ fontWeight: '500', color: '#22c55e', margin: 0 }}>₹{selectedLead.estimatedValue?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Activity Timeline
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedLead.activities?.map((activity, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: darkMode ? '#374151' : '#f9fafb',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%'
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontWeight: '500',
                          color: darkMode ? 'white' : '#1f2937',
                          margin: 0
                        }}>
                          {activity.action}
                        </p>
                        <p style={{
                          fontSize: '0.875rem',
                          color: darkMode ? '#9ca3af' : '#6b7280',
                          margin: 0
                        }}>
                          {activity.date} • by {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalLeadHistory;