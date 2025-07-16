import React, { useState } from 'react';
import { Plus, Building, User, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react';

const AddEnquiry = ({ crmData, updateCrmData, user }) => {
  const [enquiryData, setEnquiryData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    leadSource: '',
    leadStatus: 'new',
    assignedTo: '',
    priority: 'medium',
    notes: '',
    estimatedValue: ''
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Automotive', 'Energy', 'Telecommunications'
  ];

  const leadSources = [
    'Website', 'Social Media', 'Email Campaign', 'Cold Call', 'Referral',
    'Trade Show', 'Advertisement', 'Partner', 'Direct Mail', 'Other'
  ];

  const salesTeam = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Wilson', 'Tom Brown'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newLead = {
      id: Date.now(),
      ...enquiryData,
      createdBy: user.name,
      createdDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      score: 0,
      activities: []
    };

    const updatedLeads = [...(crmData.leads || []), newLead];
    updateCrmData({ leads: updatedLeads });

    // Reset form
    setEnquiryData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      industry: '',
      leadSource: '',
      leadStatus: 'new',
      assignedTo: '',
      priority: 'medium',
      notes: '',
      estimatedValue: ''
    });

    alert('Lead added successfully!');
  };

  return (
    <div className="add-enquiry">
      <div className="page-header">
        <h1>Add New Enquiry</h1>
        <p>Convert potential customers into leads</p>
      </div>

      <div className="enquiry-form-container">
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="form-section">
            <h3>Company Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name *</label>
                <div className="input-group">
                  <Building className="input-icon" />
                  <input
                    type="text"
                    value={enquiryData.companyName}
                    onChange={(e) => setEnquiryData({...enquiryData, companyName: e.target.value})}
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Industry</label>
                <select
                  value={enquiryData.industry}
                  onChange={(e) => setEnquiryData({...enquiryData, industry: e.target.value})}
                  className="form-select"
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <div className="input-group">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    value={enquiryData.location}
                    onChange={(e) => setEnquiryData({...enquiryData, location: e.target.value})}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Value</label>
                <input
                  type="number"
                  value={enquiryData.estimatedValue}
                  onChange={(e) => setEnquiryData({...enquiryData, estimatedValue: e.target.value})}
                  placeholder="₹ 0"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact Person *</label>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    value={enquiryData.contactPerson}
                    onChange={(e) => setEnquiryData({...enquiryData, contactPerson: e.target.value})}
                    placeholder="Enter contact person name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    value={enquiryData.email}
                    onChange={(e) => setEnquiryData({...enquiryData, email: e.target.value})}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <div className="input-group">
                  <Phone className="input-icon" />
                  <input
                    type="tel"
                    value={enquiryData.phone}
                    onChange={(e) => setEnquiryData({...enquiryData, phone: e.target.value})}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Lead Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Lead Source</label>
                <select
                  value={enquiryData.leadSource}
                  onChange={(e) => setEnquiryData({...enquiryData, leadSource: e.target.value})}
                  className="form-select"
                >
                  <option value="">Select Source</option>
                  {leadSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Lead Status</label>
                <select
                  value={enquiryData.leadStatus}
                  onChange={(e) => setEnquiryData({...enquiryData, leadStatus: e.target.value})}
                  className="form-select"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assign To</label>
                <select
                  value={enquiryData.assignedTo}
                  onChange={(e) => setEnquiryData({...enquiryData, assignedTo: e.target.value})}
                  className="form-select"
                >
                  <option value="">Select Sales Person</option>
                  {salesTeam.map(person => (
                    <option key={person} value={person}>{person}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={enquiryData.priority}
                  onChange={(e) => setEnquiryData({...enquiryData, priority: e.target.value})}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Notes</h3>
            <div className="form-group">
              <textarea
                value={enquiryData.notes}
                onChange={(e) => setEnquiryData({...enquiryData, notes: e.target.value})}
                placeholder="Enter any additional notes or requirements..."
                className="form-textarea"
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Save as Draft
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEnquiry;