import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  FileText, 
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Upload,
  Download,
  Star
} from 'lucide-react';

const CustomerManagement = ({ darkMode, crmData, userRole }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    // Convert leads to customers (converted leads)
    const convertedLeads = (crmData.leads || [])
      .filter(lead => lead.status === 'converted')
      .map(lead => ({
        id: lead._id || lead.id,
        name: lead.contactPerson,
        company: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        industry: lead.industry || 'General',
        location: lead.location || 'Not specified',
        status: 'active',
        totalValue: lead.estimatedValue || 0,
        joinDate: lead.createdDate || new Date().toISOString(),
        accountManager: lead.assignedTo || 'Sales Team',
        lastContact: new Date().toISOString(),
        documents: [],
        invoices: [],
        notes: lead.notes || 'Converted from lead',
        rating: 4
      }));

    // Add existing customers from API
    const existingCustomers = crmData.customers || [];
    
    const allCustomers = [...convertedLeads, ...existingCustomers];
    setCustomers(allCustomers);
    setFilteredCustomers(allCustomers);
  }, [crmData]);

  useEffect(() => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, customers]);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': { bg: darkMode ? '#065f46' : '#dcfce7', text: darkMode ? '#10b981' : '#166534', border: '#22c55e' },
      'inactive': { bg: darkMode ? '#7f1d1d' : '#fee2e2', text: darkMode ? '#ef4444' : '#dc2626', border: '#ef4444' },
      'prospect': { bg: darkMode ? '#78350f' : '#fef3c7', text: darkMode ? '#f59e0b' : '#d97706', border: '#f59e0b' }
    };
    return colors[status] || colors['active'];
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users style={{ color: '#22c55e' }} size={32} />
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Customer Management
              </h1>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
                Manage your converted customers and client relationships
              </p>
            </div>
          </div>
          {(userRole === 'super-admin' || userRole === 'admin') && (
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Plus size={20} />
              Add Customer
            </button>
          )}
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
          { label: 'Total Customers', value: customers.length, icon: Users, color: '#22c55e' },
          { label: 'Active Customers', value: customers.filter(c => c.status === 'active').length, icon: Users, color: '#10b981' },
          { label: 'Total Revenue', value: `₹${(customers.reduce((sum, c) => sum + (c.totalValue || 0), 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: '#f59e0b' },
          { label: 'Avg Rating', value: `${(customers.reduce((sum, c) => sum + (c.rating || 0), 0) / customers.length || 0).toFixed(1)}/5`, icon: Star, color: '#fbbf24' }
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

      {/* Search and Filter */}
      <div style={{ ...cardStyle, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
              placeholder="Search customers by name, company, or email..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredCustomers.map(customer => {
          const statusColor = getStatusColor(customer.status);
          return (
            <div key={customer.id} style={{ ...cardStyle, padding: '1.5rem' }}>
              {/* Customer Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.125rem'
                  }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {customer.name}
                    </h3>
                    <p style={{
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {customer.company}
                    </p>
                  </div>
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
                  {customer.status}
                </span>
              </div>

              {/* Customer Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {customer.email}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {customer.phone}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {customer.location}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#d1d5db' : '#374151',
                    fontWeight: '600'
                  }}>
                    ₹{customer.totalValue?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  Rating:
                </span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= (customer.rating || 0) ? '#fbbf24' : 'transparent'}
                      color={star <= (customer.rating || 0) ? '#fbbf24' : darkMode ? '#4b5563' : '#d1d5db'}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => handleViewCustomer(customer)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: darkMode ? '#374151' : '#f3f4f6',
                    color: darkMode ? '#d1d5db' : '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>
                {(userRole === 'super-admin' || userRole === 'admin' || userRole === 'sales-manager') && (
                  <button
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    <Edit size={16} />
                    Edit Customer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div style={{
          ...cardStyle,
          padding: '3rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Users size={48} style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '0.5rem'
          }}>
            No customers found
          </h3>
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Convert some leads to customers to see them here'
            }
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
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
                Customer Details - {selectedCustomer.name}
              </h3>
              <button
                onClick={() => setShowCustomerModal(false)}
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
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
              }}>
                {/* Customer Info */}
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
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Company</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedCustomer.company}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Email</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Phone</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Industry</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedCustomer.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Business Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Total Value</label>
                      <p style={{ fontWeight: '500', color: '#22c55e', margin: 0 }}>₹{selectedCustomer.totalValue?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Join Date</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>
                        {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Account Manager</label>
                      <p style={{ fontWeight: '500', color: darkMode ? 'white' : '#1f2937', margin: 0 }}>{selectedCustomer.accountManager}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>Status</label>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        ...getStatusColor(selectedCustomer.status)
                      }}>
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Notes
                </h4>
                <div style={{
                  background: darkMode ? '#374151' : '#f9fafb',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
                }}>
                  <p style={{
                    color: darkMode ? '#d1d5db' : '#374151',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {selectedCustomer.notes || 'No notes available'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                justifyContent: 'flex-end'
              }}>
                {(userRole === 'super-admin' || userRole === 'admin') && (
                  <button
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: darkMode ? '#374151' : '#f3f4f6',
                      color: darkMode ? '#d1d5db' : '#374151',
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
                    <Upload size={16} />
                    Upload Document
                  </button>
                )}
                {(userRole === 'super-admin' || userRole === 'admin' || userRole === 'sales-manager') && (
                  <button
                    style={{
                      padding: '0.75rem 1.5rem',
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
                    <Edit size={16} />
                    Edit Customer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;