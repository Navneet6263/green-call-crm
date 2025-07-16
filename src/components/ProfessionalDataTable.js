import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Upload,
  RefreshCw,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  MoreVertical,
  CheckSquare,
  Square,
  Users,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react';
import { showToast } from './ToastNotification';

const ProfessionalDataTable = ({ darkMode, crmData, updateCrmData }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');

  const columns = [
    { id: 'contactPerson', label: 'Contact Person', icon: Users, sortable: true },
    { id: 'companyName', label: 'Company', icon: Building, sortable: true },
    { id: 'email', label: 'Email', icon: Mail, sortable: true },
    { id: 'phone', label: 'Phone', icon: Phone, sortable: true },
    { id: 'industry', label: 'Industry', icon: Building, sortable: true },
    { id: 'leadSource', label: 'Source', icon: Database, sortable: true },
    { id: 'estimatedValue', label: 'Value', icon: DollarSign, sortable: true },
    { id: 'status', label: 'Status', icon: Settings, sortable: true },
    { id: 'priority', label: 'Priority', icon: Filter, sortable: true },
    { id: 'assignedTo', label: 'Assigned To', icon: Users, sortable: true },
    { id: 'createdDate', label: 'Created', icon: Calendar, sortable: true }
  ];

  useEffect(() => {
    // Initialize with sample data
    const sampleData = [
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
        type: 'lead'
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
        type: 'lead'
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
        type: 'lead'
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
        type: 'lead'
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
        status: 'customer',
        priority: 'high',
        assignedTo: 'Navneet Kumar',
        createdDate: '2024-11-20T16:00:00Z',
        type: 'customer'
      }
    ];

    // Combine with CRM data
    const allData = [...sampleData, ...(crmData.leads || []).map(lead => ({...lead, type: 'lead'}))];
    setData(allData);
    setFilteredData(allData);
    
    // Initialize selected columns
    setSelectedColumns(columns.slice(0, 7).map(col => col.id));
  }, [crmData]);

  useEffect(() => {
    let filtered = [...data];

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => {
        if (activeTab === 'leads') return item.type === 'lead' || !item.type;
        if (activeTab === 'customers') return item.type === 'customer' || item.status === 'converted';
        return true;
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'estimatedValue') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      } else if (sortBy === 'createdDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue ? aValue.toString().toLowerCase() : '';
        bValue = bValue ? bValue.toString().toLowerCase() : '';
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchTerm, sortBy, sortOrder, activeTab]);

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortOrder('desc');
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageData = getCurrentPageData();
    const currentPageIds = currentPageData.map(item => item.id);
    
    if (selectedRows.length === currentPageIds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageIds);
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      showToast('error', '❌ No rows selected');
      return;
    }

    const updatedData = data.filter(item => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
    showToast('success', `🗑️ Deleted ${selectedRows.length} items`);
  };

  const handleExport = () => {
    const csvContent = [
      selectedColumns.join(','),
      ...filteredData.map(item =>
        selectedColumns.map(col => item[col] || '').join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crm-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('success', '📥 Data exported successfully!');
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusColor = (status) => {
    const colors = {
      'new': { bg: '#dbeafe', text: '#1d4ed8', border: '#3b82f6' },
      'contacted': { bg: '#fef3c7', text: '#d97706', border: '#f59e0b' },
      'qualified': { bg: '#e0e7ff', text: '#5b21b6', border: '#8b5cf6' },
      'proposal': { bg: '#fce7f3', text: '#be185d', border: '#ec4899' },
      'converted': { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
      'customer': { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
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
          <Database style={{ color: '#8b5cf6' }} size={32} />
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Data Table
            </h1>
            <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
              Advanced data management with filtering, sorting, and bulk operations
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ ...cardStyle, padding: '0', marginBottom: '2rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
          {[
            { id: 'all', label: 'All Data', count: data.length },
            { id: 'leads', label: 'Leads', count: data.filter(d => d.type === 'lead' || !d.type).length },
            { id: 'customers', label: 'Customers', count: data.filter(d => d.type === 'customer' || d.status === 'converted').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                background: activeTab === tab.id 
                  ? (darkMode ? '#374151' : '#f9fafb')
                  : 'transparent',
                color: activeTab === tab.id 
                  ? (darkMode ? 'white' : '#1f2937')
                  : (darkMode ? '#9ca3af' : '#6b7280'),
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderBottom: `3px solid ${activeTab === tab.id ? '#8b5cf6' : 'transparent'}`,
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
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
              placeholder="Search across all columns..."
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

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{
                fontSize: '0.875rem',
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                {selectedRows.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #ef4444',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setShowColumnSettings(!showColumnSettings)}
              style={{
                padding: '0.75rem',
                background: darkMode ? '#374151' : '#f3f4f6',
                color: darkMode ? '#d1d5db' : '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Column Settings"
            >
              <Settings size={16} />
            </button>
            
            <button
              onClick={handleExport}
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
            
            <button
              style={{
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Column Settings */}
        {showColumnSettings && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: darkMode ? '#374151' : '#f9fafb',
            borderRadius: '8px',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              marginBottom: '0.75rem'
            }}>
              Select Columns to Display:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.5rem'
            }}>
              {columns.map(column => (
                <label key={column.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: darkMode ? '#d1d5db' : '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedColumns([...selectedColumns, column.id]);
                      } else {
                        setSelectedColumns(selectedColumns.filter(id => id !== column.id));
                      }
                    }}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {column.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div style={{ ...cardStyle, overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{
          padding: '1rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          background: darkMode ? '#374151' : '#f9fafb'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `40px repeat(${selectedColumns.length}, 1fr) 100px`,
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Select All Checkbox */}
            <button
              onClick={handleSelectAll}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: darkMode ? '#d1d5db' : '#374151'
              }}
            >
              {selectedRows.length === getCurrentPageData().length && getCurrentPageData().length > 0 ? (
                <CheckSquare size={16} />
              ) : (
                <Square size={16} />
              )}
            </button>

            {/* Column Headers */}
            {selectedColumns.map(columnId => {
              const column = columns.find(col => col.id === columnId);
              if (!column) return null;
              
              return (
                <div key={columnId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}>
                    {column.label}
                  </span>
                  {column.sortable && (
                    <button
                      onClick={() => handleSort(columnId)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: sortBy === columnId ? '#8b5cf6' : (darkMode ? '#9ca3af' : '#6b7280')
                      }}
                    >
                      <ArrowUpDown size={14} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Actions Header */}
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151'
            }}>
              Actions
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {getCurrentPageData().map(item => (
            <div key={item.id} style={{
              padding: '1rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = darkMode ? '#374151' : '#f9fafb'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: `40px repeat(${selectedColumns.length}, 1fr) 100px`,
                gap: '1rem',
                alignItems: 'center'
              }}>
                {/* Row Checkbox */}
                <button
                  onClick={() => handleSelectRow(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: darkMode ? '#d1d5db' : '#374151'
                  }}
                >
                  {selectedRows.includes(item.id) ? (
                    <CheckSquare size={16} />
                  ) : (
                    <Square size={16} />
                  )}
                </button>

                {/* Data Columns */}
                {selectedColumns.map(columnId => {
                  let cellContent = item[columnId];
                  
                  // Format specific columns
                  if (columnId === 'estimatedValue') {
                    cellContent = cellContent ? `₹${cellContent.toLocaleString()}` : '-';
                  } else if (columnId === 'createdDate') {
                    cellContent = new Date(cellContent).toLocaleDateString();
                  } else if (columnId === 'status') {
                    const statusColor = getStatusColor(cellContent);
                    return (
                      <div key={columnId}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          background: statusColor.bg,
                          color: statusColor.text,
                          border: `1px solid ${statusColor.border}`
                        }}>
                          {cellContent}
                        </span>
                      </div>
                    );
                  } else if (columnId === 'priority') {
                    const priorityColor = getPriorityColor(cellContent);
                    return (
                      <div key={columnId}>
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
                          {cellContent}
                        </span>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={columnId} style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#d1d5db' : '#374151',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {cellContent || '-'}
                    </div>
                  );
                })}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    style={{
                      padding: '0.25rem',
                      background: darkMode ? '#374151' : '#f3f4f6',
                      color: darkMode ? '#d1d5db' : '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="View"
                  >
                    <Eye size={12} />
                  </button>
                  <button
                    style={{
                      padding: '0.25rem',
                      background: darkMode ? '#374151' : '#f3f4f6',
                      color: darkMode ? '#d1d5db' : '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Edit"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    style={{
                      padding: '0.25rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          padding: '1rem',
          borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              fontSize: '0.875rem',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </span>
            
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{
                padding: '0.5rem',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '6px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '0.875rem'
              }}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '6px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? '#d1d5db' : '#374151',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>
            
            <span style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: darkMode ? '#d1d5db' : '#374151'
            }}>
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '6px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? '#d1d5db' : '#374151',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div style={{
          ...cardStyle,
          padding: '3rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Database size={48} style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '0.5rem'
          }}>
            No data found
          </h3>
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            {searchTerm ? 'Try adjusting your search criteria' : 'No data available in the selected category'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDataTable;