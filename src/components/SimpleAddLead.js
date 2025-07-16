import React, { useState } from 'react';

const SimpleAddLead = ({ onSave, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    location: '',
    estimatedValue: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      alert('Please fill required fields');
      return;
    }

    setLoading(true);
    
    try {
      await onSave({
        ...formData,
        estimatedValue: parseFloat(formData.estimatedValue) || 0,
        status: 'new',
        priority: 'medium',
        leadSource: 'Manual Entry',
        createdBy: 'Current User',
        assignedTo: 'Sales Team'
      });
      
      alert('Lead added successfully!');
      onCancel();
      
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Error saving lead. Please try again.');
    } finally {
      setLoading(false);
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
      maxWidth: '600px',
      padding: '2rem',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
    },
    header: {
      marginBottom: '2rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: darkMode ? 'white' : '#1f2937',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    form: {
      display: 'grid',
      gap: '1rem'
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
      minHeight: '80px',
      resize: 'vertical'
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '2rem'
    },
    btnCancel: {
      padding: '0.75rem 1.5rem',
      border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '8px',
      background: 'transparent',
      color: darkMode ? '#d1d5db' : '#374151',
      cursor: 'pointer'
    },
    btnSave: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>➕ Add New Lead</h2>
          <p style={styles.subtitle}>Enter lead information below</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Company Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              style={styles.input}
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              placeholder="Enter company name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Contact Person <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              style={styles.input}
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              placeholder="Enter contact person name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter email address"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              style={styles.input}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Industry</label>
            <input
              type="text"
              style={styles.input}
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              placeholder="Enter industry"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              style={styles.input}
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter location"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estimated Value (₹)</label>
            <input
              type="number"
              style={styles.input}
              value={formData.estimatedValue}
              onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
              placeholder="Enter estimated value"
              min="0"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Notes</label>
            <textarea
              style={styles.textarea}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter additional notes..."
            />
          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.btnCancel} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" style={styles.btnSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleAddLead;