import React, { useState } from 'react';
import { Save, X, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { hasPermission, PERMISSIONS } from '../utils/permissions';

const ProfessionalAddLead = ({ onSave, onCancel, user, darkMode }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    location: '',
    leadSource: '',
    status: 'new',
    priority: 'medium',
    estimatedValue: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // All users can create leads in this version

    setLoading(true);
    
    try {
      await onSave({
        ...formData,
        estimatedValue: parseFloat(formData.estimatedValue) || 0,
        createdBy: user.name,
        assignedTo: user.name
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onCancel();
      }, 2000);
      
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Error saving lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const styles = {
    overlay: {
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
    },
    modal: {
      background: darkMode ? '#1f2937' : 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
    },
    header: {
      padding: '2rem 2rem 1rem',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    closeBtn: {
      padding: '0.5rem',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      color: darkMode ? '#9ca3af' : '#6b7280',
      cursor: 'pointer'
    },
    form: {
      padding: '2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    fullWidth: {
      gridColumn: 'span 2'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: darkMode ? '#d1d5db' : '#374151'
    },
    required: {
      color: '#ef4444'
    },
    input: {
      padding: '0.75rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: darkMode ? '#374151' : 'white',
      color: darkMode ? 'white' : '#1f2937',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    inputFocus: {
      borderColor: '#667eea'
    },
    select: {
      padding: '0.75rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: darkMode ? '#374151' : 'white',
      color: darkMode ? 'white' : '#1f2937',
      fontSize: '1rem',
      outline: 'none'
    },
    textarea: {
      padding: '0.75rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: darkMode ? '#374151' : 'white',
      color: darkMode ? 'white' : '#1f2937',
      fontSize: '1rem',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical'
    },
    error: {
      color: '#ef4444',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    footer: {
      padding: '1rem 2rem 2rem',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem'
    },
    btnSecondary: {
      padding: '0.75rem 1.5rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: 'transparent',
      color: darkMode ? '#d1d5db' : '#374151',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    btnPrimary: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    successMessage: {
      background: '#10b981',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    }
  };

  if (success) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.form}>
            <div style={styles.successMessage}>
              <CheckCircle size={20} />
              <span>Lead created successfully!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <Plus size={24} />
            Add New Lead
          </h2>
          <button style={styles.closeBtn} onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Company Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(errors.companyName ? styles.inputError : {})
                }}
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <div style={styles.error}>
                  <AlertCircle size={12} />
                  {errors.companyName}
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Contact Person <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(errors.contactPerson ? styles.inputError : {})
                }}
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Enter contact person name"
              />
              {errors.contactPerson && (
                <div style={styles.error}>
                  <AlertCircle size={12} />
                  {errors.contactPerson}
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email <span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {})
                }}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div style={styles.error}>
                  <AlertCircle size={12} />
                  {errors.email}
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Phone <span style={styles.required}>*</span>
              </label>
              <input
                type="tel"
                style={{
                  ...styles.input,
                  ...(errors.phone ? styles.inputError : {})
                }}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <div style={styles.error}>
                  <AlertCircle size={12} />
                  {errors.phone}
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Industry</label>
              <select
                style={styles.select}
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Education">Education</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                style={styles.input}
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter location"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Lead Source</label>
              <select
                style={styles.select}
                value={formData.leadSource}
                onChange={(e) => handleInputChange('leadSource', e.target.value)}
              >
                <option value="">Select Source</option>
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Referral">Referral</option>
                <option value="Trade Show">Trade Show</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>
              <select
                style={styles.select}
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Estimated Value (₹)</label>
              <input
                type="number"
                style={styles.input}
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                placeholder="Enter estimated value"
                min="0"
              />
            </div>

            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label}>Notes</label>
              <textarea
                style={styles.textarea}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Enter additional notes..."
              />
            </div>
          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.btnSecondary} onClick={onCancel}>
              <X size={16} />
              Cancel
            </button>
            <button type="submit" style={styles.btnPrimary} disabled={loading}>
              <Save size={16} />
              {loading ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalAddLead;