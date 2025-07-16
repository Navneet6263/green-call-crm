import React, { useState } from 'react';
import { Search, Filter, Calendar, TrendingUp, User, Building, Phone, Mail } from 'lucide-react';

const MyLeads = ({ crmData, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Filter leads based on user role
  const getMyLeads = () => {
    let leads = crmData.leads || [];
    
    // If sales team member, show only assigned leads
    if (user.role === 'sales-team') {
      leads = leads.filter(lead => lead.assignedTo === user.name);
    }
    
    return leads;
  };

  const myLeads = getMyLeads();

  const filteredLeads = myLeads.filter(lead => {
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || lead.leadStatus === filterStatus;
    
    const matchesDate = dateRange === 'all' || checkDateRange(lead.createdDate, dateRange);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const checkDateRange = (date, range) => {
    const leadDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - leadDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch(range) {
      case 'today': return diffDays <= 1;
      case 'week': return diffDays <= 7;
      case 'month': return diffDays <= 30;
      case 'quarter': return diffDays <= 90;
      default: return true;
    }
  };

  const getLeadStats = () => {
    const total = myLeads.length;
    const new_leads = myLeads.filter(l => l.leadStatus === 'new').length;
    const qualified = myLeads.filter(l => l.leadStatus === 'qualified').length;
    const converted = myLeads.filter(l => l.leadStatus === 'converted').length;
    
    return { total, new_leads, qualified, converted };
  };

  const stats = getLeadStats();

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'qualified': return 'status-qualified';
      case 'proposal': return 'status-proposal';
      case 'negotiation': return 'status-negotiation';
      case 'converted': return 'status-converted';
      case 'lost': return 'status-lost';
      default: return 'status-default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div className="my-leads">
      <div className="page-header">
        <h1>My Leads</h1>
        <p>Analyze and manage your assigned leads</p>
      </div>

      <div className="leads-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Leads</div>
          <div className="stat-icon"><TrendingUp /></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.new_leads}</div>
          <div className="stat-label">New Leads</div>
          <div className="stat-icon"><User /></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.qualified}</div>
          <div className="stat-label">Qualified</div>
          <div className="stat-icon"><Building /></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.converted}</div>
          <div className="stat-label">Converted</div>
          <div className="stat-icon"><TrendingUp /></div>
        </div>
      </div>

      <div className="leads-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search leads by company, contact, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div className="date-filter">
          <Calendar className="filter-icon" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="leads-table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Created Date</th>
              <th>Est. Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="lead-row">
                <td>
                  <div className="company-cell">
                    <Building size={16} />
                    <span>{lead.companyName}</span>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <User size={16} />
                    <span>{lead.contactPerson}</span>
                  </div>
                </td>
                <td>
                  <div className="email-cell">
                    <Mail size={16} />
                    <span>{lead.email}</span>
                  </div>
                </td>
                <td>
                  <div className="phone-cell">
                    <Phone size={16} />
                    <span>{lead.phone}</span>
                  </div>
                </td>
                <td>{lead.industry}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(lead.leadStatus)}`}>
                    {lead.leadStatus}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityColor(lead.priority)}`}>
                    {lead.priority}
                  </span>
                </td>
                <td>{lead.assignedTo}</td>
                <td>{new Date(lead.createdDate).toLocaleDateString()}</td>
                <td>₹{lead.estimatedValue ? Number(lead.estimatedValue).toLocaleString() : '0'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="no-leads">
            <User size={48} />
            <h3>No leads found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <div className="leads-summary">
        <div className="summary-card">
          <h3>Lead Generation Insights</h3>
          <div className="insights-grid">
            <div className="insight-item">
              <span className="insight-label">Total Leads Generated:</span>
              <span className="insight-value">{filteredLeads.length}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Average Lead Value:</span>
              <span className="insight-value">
                ₹{filteredLeads.length > 0 ? 
                  Math.round(filteredLeads.reduce((sum, lead) => sum + (Number(lead.estimatedValue) || 0), 0) / filteredLeads.length).toLocaleString() 
                  : '0'}
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Top Industry:</span>
              <span className="insight-value">
                {filteredLeads.length > 0 ? 
                  Object.entries(filteredLeads.reduce((acc, lead) => {
                    acc[lead.industry] = (acc[lead.industry] || 0) + 1;
                    return acc;
                  }, {})).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeads;