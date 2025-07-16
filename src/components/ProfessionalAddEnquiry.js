import React, { useState } from 'react';
import { 
  UserPlus, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign,
  Calendar,
  FileText,
  Save,
  Send,
  X,
  User,
  Briefcase,
  Globe,
  MessageSquare,
  Target
} from 'lucide-react';
import { showToast } from './ToastNotification';

const ProfessionalAddEnquiry = ({ darkMode, onSave, onCancel, user }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    contactPerson: '',
    email: '',
    phone: '',
    designation: '',
    
    // Company Information
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Lead Information
    leadSource: 'website',
    estimatedValue: '',
    priority: 'medium',
    expectedClosingDate: '',
    requirements: '',
    notes: '',
    
    // Additional
    assignedTo: user?.name || 'Sales Team',
    status: 'new'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSaveAsDraft = () => {
    const leadData = {
      ...formData,
      isDraft: true,
      createdDate: new Date().toISOString(),
      createdBy: user?.name || 'Unknown'
    };
    
    // Save to localStorage as draft
    const drafts = JSON.parse(localStorage.getItem('leadDrafts') || '[]');
    drafts.push({ ...leadData, id: Date.now() });
    localStorage.setItem('leadDrafts', JSON.stringify(drafts));
    
    showToast('success', '📝 Lead saved as draft successfully!');
    onCancel();
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showToast('error', '❌ Please fill all required fields correctly');
      return;
    }

    const leadData = {
      ...formData,
      isDraft: false,
      createdDate: new Date().toISOString(),
      createdBy: user?.name || 'Unknown'
    };

    onSave(leadData);
    showToast('success', '✅ Lead created successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'lead', label: 'Lead Details', icon: FileText },
    { id: 'additional', label: 'Additional', icon: MessageSquare }
  ];

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
    background: darkMode ? '#374151' : 'white',
    color: darkMode ? 'white' : '#1f2937',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: darkMode ? '#d1d5db' : '#374151',
    marginBottom: '0.5rem'
  };

  const containerStyle = {
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
    padding: '1rem'
  };

  const modalStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '20px',
    width: '95%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={containerStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          background: `linear-gradient(135deg, ${darkMode ? '#1f2937' : '#f8fafc'}, ${darkMode ? '#374151' : '#e2e8f0'})`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
              }}>
                <UserPlus size={28} color="white" />
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  Add New Lead
                </h2>
                <p style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  fontSize: '1rem',
                  margin: 0
                }}>
                  Create a new lead opportunity for your sales pipeline
                </p>
              </div>
            </div>
            
            <button
              onClick={onCancel}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: darkMode ? '#9ca3af' : '#6b7280',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = darkMode ? '#374151' : '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          padding: '0 2rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          background: darkMode ? '#1f2937' : 'white'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? '#22c55e' : (darkMode ? '#9ca3af' : '#6b7280'),
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: `3px solid ${isActive ? '#22c55e' : 'transparent'}`,
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

        {/* Form Content */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          background: darkMode ? '#111827' : '#f9fafb'
        }}>
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Contact Person Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="Enter full name"
                    style={{
                      ...(errors.contactPerson ? errorInputStyle : inputStyle),
                      paddingLeft: '3rem'
                    }}
                  />
                </div>
                {errors.contactPerson && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.contactPerson}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Designation / Job Title
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="e.g., CEO, Manager, Director"
                    style={{ ...inputStyle, paddingLeft: '3rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@company.com"
                    style={{
                      ...(errors.email ? errorInputStyle : inputStyle),
                      paddingLeft: '3rem'
                    }}
                  />
                </div>
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    style={{
                      ...(errors.phone ? errorInputStyle : inputStyle),
                      paddingLeft: '3rem'
                    }}
                  />
                </div>
                {errors.phone && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Company Information Tab */}
          {activeTab === 'company' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Company Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    style={{
                      ...(errors.companyName ? errorInputStyle : inputStyle),
                      paddingLeft: '3rem'
                    }}
                  />
                </div>
                {errors.companyName && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Website</label>
                <div style={{ position: 'relative' }}>
                  <Globe size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.company.com"
                    style={{ ...inputStyle, paddingLeft: '3rem' }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '1rem',
                    color: '#9ca3af'
                  }} />
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows="3"
                    style={{ ...inputStyle, paddingLeft: '3rem', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state"
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Lead Details Tab */}
          {activeTab === 'lead' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Lead Source</label>
                <select
                  value={formData.leadSource}
                  onChange={(e) => handleInputChange('leadSource', e.target.value)}
                  style={inputStyle}
                >
                  <option value="website">Website</option>
                  <option value="social-media">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="cold-call">Cold Call</option>
                  <option value="email-campaign">Email Campaign</option>
                  <option value="trade-show">Trade Show</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  style={inputStyle}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Estimated Deal Value (₹)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                    placeholder="Enter amount"
                    style={{ ...inputStyle, paddingLeft: '3rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Expected Closing Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="date"
                    value={formData.expectedClosingDate}
                    onChange={(e) => handleInputChange('expectedClosingDate', e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '3rem' }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Requirements / Services Needed</label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '1rem',
                    color: '#9ca3af'
                  }} />
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Describe the client's requirements, services needed, or project details..."
                    rows="4"
                    style={{ ...inputStyle, paddingLeft: '3rem', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information Tab */}
          {activeTab === 'additional' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Assign To</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  style={inputStyle}
                >
                  <option value="Sales Team">Sales Team</option>
                  <option value="Navneet Kumar">Navneet Kumar</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Senior Sales Rep">Senior Sales Rep</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  style={inputStyle}
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal Sent</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Additional Notes</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={20} style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '1rem',
                    color: '#9ca3af'
                  }} />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add any additional notes, comments, or important information about this lead..."
                    rows="5"
                    style={{ ...inputStyle, paddingLeft: '3rem', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '2rem',
          borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          background: darkMode ? '#1f2937' : 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={onCancel}
              style={{
                padding: '0.75rem 1.5rem',
                border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '12px',
                background: 'transparent',
                color: darkMode ? '#d1d5db' : '#374151',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <X size={16} />
              Cancel
            </button>
            
            <button
              onClick={handleSaveAsDraft}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6b7280, #9ca3af)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Save size={16} />
              Save as Draft
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            style={{
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
            }}
          >
            <Send size={16} />
            Create Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAddEnquiry;