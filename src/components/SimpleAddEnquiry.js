import React, { useState } from 'react';
import { UserPlus, Building, Mail, Phone, DollarSign, Save, Send, X } from 'lucide-react';
import { showToast } from './ToastNotification';

const SimpleAddEnquiry = ({ darkMode, onSave, onCancel, user }) => {
  const [formData, setFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    leadSource: 'website',
    estimatedValue: '',
    priority: 'medium',
    requirements: '',
    assignedTo: user?.name || 'Sales Team',
    status: 'new'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
    background: darkMode ? '#374151' : 'white',
    color: darkMode ? 'white' : '#1f2937',
    fontSize: '1rem',
    outline: 'none'
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

  return (
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
      padding: '1rem'
    }}>
      <div style={{
        background: darkMode ? '#1f2937' : 'white',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserPlus size={24} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Add New Lead
              </h2>
              <p style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Create a new lead opportunity
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
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Contact Person */}
            <div>
              <label style={labelStyle}>
                Contact Person Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Enter full name"
                style={errors.contactPerson ? errorInputStyle : inputStyle}
              />
              {errors.contactPerson && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label style={labelStyle}>
                Company Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                style={errors.companyName ? errorInputStyle : inputStyle}
              />
              {errors.companyName && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@company.com"
                style={errors.email ? errorInputStyle : inputStyle}
              />
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>
                Phone Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                style={errors.phone ? errorInputStyle : inputStyle}
              />
              {errors.phone && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Industry */}
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
                <option value="other">Other</option>
              </select>
            </div>

            {/* Lead Source */}
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
                <option value="other">Other</option>
              </select>
            </div>

            {/* Estimated Value */}
            <div>
              <label style={labelStyle}>Estimated Deal Value (₹)</label>
              <input
                type="number"
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                placeholder="Enter amount"
                style={inputStyle}
              />
            </div>

            {/* Priority */}
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

            {/* Requirements */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Requirements / Services Needed</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Describe the client's requirements..."
                rows="4"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '2rem',
          borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
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
              onClick={handleSaveAsDraft}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
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
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
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

export default SimpleAddEnquiry;