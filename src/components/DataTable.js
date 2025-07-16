import React, { useState, useEffect } from 'react';
import { Database, Download, Upload, Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';

const DataTable = ({ crmData, updateCrmData }) => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({});

  useEffect(() => {
    // Combine all CRM data into a unified table
    const combinedData = [
      ...(crmData.leads || []).map(lead => ({
        id: `lead_${lead.id}`,
        type: 'Lead',
        name: lead.contactPerson,
        company: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        status: lead.leadStatus,
        value: lead.estimatedValue || 0,
        assignedTo: lead.assignedTo,
        createdDate: lead.createdDate,
        lastActivity: lead.lastActivity,
        source: lead.leadSource,
        industry: lead.industry,
        location: lead.location,
        priority: lead.priority,
        score: lead.score || 0
      })),
      ...(crmData.customers || []).map(customer => ({
        id: `customer_${customer.id}`,
        type: 'Customer',
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        status: 'Active',
        value: customer.totalValue || 0,
        assignedTo: customer.accountManager,
        createdDate: customer.joinDate,
        lastActivity: customer.lastContact,
        source: customer.source,
        industry: customer.industry,
        location: customer.location,
        priority: 'high',
        score: 100
      }))
    ];
    setTableData(combinedData);
  }, [crmData]);

  const filteredData = tableData.filter(row => {
    const matchesSearch = Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterColumn === 'all' || row.type.toLowerCase() === filterColumn;
    return matchesSearch && matchesFilter;
  });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAddRow = () => {
    const newId = Date.now();
    const newData = {
      id: `manual_${newId}`,
      type: newRow.type || 'Lead',
      name: newRow.name || '',
      company: newRow.company || '',
      email: newRow.email || '',
      phone: newRow.phone || '',
      status: newRow.status || 'new',
      value: Number(newRow.value) || 0,
      assignedTo: newRow.assignedTo || '',
      createdDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      source: newRow.source || 'Manual Entry',
      industry: newRow.industry || '',
      location: newRow.location || '',
      priority: newRow.priority || 'medium',
      score: Number(newRow.score) || 0
    };

    // Add to appropriate CRM data array
    if (newData.type === 'Lead') {
      const leadData = {
        id: newId,
        contactPerson: newData.name,
        companyName: newData.company,
        email: newData.email,
        phone: newData.phone,
        leadStatus: newData.status,
        estimatedValue: newData.value,
        assignedTo: newData.assignedTo,
        createdDate: newData.createdDate,
        lastActivity: newData.lastActivity,
        leadSource: newData.source,
        industry: newData.industry,
        location: newData.location,
        priority: newData.priority,
        score: newData.score
      };
      updateCrmData({ leads: [...(crmData.leads || []), leadData] });
    }

    setNewRow({});
    setShowAddModal(false);
  };

  const handleDeleteRow = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const [type, originalId] = id.split('_');
      
      if (type === 'lead') {
        const updatedLeads = crmData.leads.filter(lead => lead.id !== Number(originalId));
        updateCrmData({ leads: updatedLeads });
      } else if (type === 'customer') {
        const updatedCustomers = crmData.customers.filter(customer => customer.id !== Number(originalId));
        updateCrmData({ customers: updatedCustomers });
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Type', 'Name', 'Company', 'Email', 'Phone', 'Status', 'Value', 'Assigned To', 'Created Date'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        row.type,
        row.name,
        row.company,
        row.email,
        row.phone,
        row.status,
        row.value,
        row.assignedTo,
        new Date(row.createdDate).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crm_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'qualified': return 'status-qualified';
      case 'converted': return 'status-converted';
      case 'active': return 'status-active';
      case 'lost': return 'status-lost';
      default: return 'status-default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="header-left">
          <Database className="header-icon" />
          <div>
            <h1>CRM Data Table</h1>
            <p>Centralized view of all leads and customers</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="btn-secondary" onClick={exportToCSV}>
            <Download size={16} />
            Export CSV
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            Add Record
          </button>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search across all data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="lead">Leads Only</option>
            <option value="customer">Customers Only</option>
          </select>
        </div>

        <div className="table-stats">
          <span className="stat">Total: {sortedData.length}</span>
          <span className="stat">Leads: {sortedData.filter(r => r.type === 'Lead').length}</span>
          <span className="stat">Customers: {sortedData.filter(r => r.type === 'Customer').length}</span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table-grid">
          <thead>
            <tr>
              <th onClick={() => handleSort('type')} className="sortable">
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('company')} className="sortable">
                Company {sortConfig.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('value')} className="sortable">
                Value {sortConfig.key === 'value' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Assigned To</th>
              <th onClick={() => handleSort('score')} className="sortable">
                Score {sortConfig.key === 'score' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(row => (
              <tr key={row.id} className="table-row">
                <td>
                  <span className={`type-badge ${row.type.toLowerCase()}`}>
                    {row.type}
                  </span>
                </td>
                <td className="name-cell">
                  <div className="name-container">
                    <span className="name">{row.name}</span>
                    <span className="industry">{row.industry}</span>
                  </div>
                </td>
                <td className="company-cell">{row.company}</td>
                <td className="email-cell">{row.email}</td>
                <td className="phone-cell">{row.phone}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="value-cell">
                  ₹{Number(row.value).toLocaleString()}
                </td>
                <td className="assigned-cell">{row.assignedTo}</td>
                <td className="score-cell">
                  <div className="score-display">
                    <span className="score-number">{row.score}</span>
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ width: `${row.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityColor(row.priority)}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button className="action-btn view" title="View Details">
                      <Eye size={14} />
                    </button>
                    <button className="action-btn edit" title="Edit Record">
                      <Edit size={14} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete Record"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedData.length === 0 && (
          <div className="no-data">
            <Database size={48} />
            <h3>No data found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3>Add New Record</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newRow.type || 'Lead'}
                    onChange={(e) => setNewRow({...newRow, type: e.target.value})}
                    className="form-select"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={newRow.name || ''}
                    onChange={(e) => setNewRow({...newRow, name: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={newRow.company || ''}
                    onChange={(e) => setNewRow({...newRow, company: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newRow.email || ''}
                    onChange={(e) => setNewRow({...newRow, email: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newRow.phone || ''}
                    onChange={(e) => setNewRow({...newRow, phone: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newRow.status || 'new'}
                    onChange={(e) => setNewRow({...newRow, status: e.target.value})}
                    className="form-select"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Value (₹)</label>
                  <input
                    type="number"
                    value={newRow.value || ''}
                    onChange={(e) => setNewRow({...newRow, value: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    value={newRow.industry || ''}
                    onChange={(e) => setNewRow({...newRow, industry: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleAddRow}
                >
                  <Plus size={16} />
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;