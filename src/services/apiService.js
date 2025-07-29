// API Service for connecting to .NET backend
import config from '../config';

const API_BASE_URL = config.api.baseUrl; // Your .NET API URL from config

const apiService = {
  // Get API URL
  getApiUrl: () => API_BASE_URL,
  
  // Authentication
  login: async (credentials) => {
    // For production deployment, use mock login directly
    console.log('Using mock login for production deployment');
    return {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'Navneet Kumar',
        email: 'navneet@greencall.com',
        role: 'super-admin'
      }
    };
  },
  
  // Leads
  getAllLeads: async () => {
    console.log('Using mock lead data for production');
    return getMockLeads();
  },
  
  createLead: async (leadData) => {
    console.log('Mock: Creating lead', leadData);
    return { id: Date.now(), ...leadData, status: 'new' };
  },
  
  updateLead: async (leadId, leadData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PUT',
        headers: { 
          ...getAuthHeader(),
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(leadData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },
  
  deleteLead: async (leadId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },
  
  // Customers
  getCustomers: async () => {
    console.log('Using mock customer data for production');
    return getMockCustomers();
  },
  
  createCustomer: async (customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 
          ...getAuthHeader(),
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(customerData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },
  
  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: 'PUT',
        headers: { 
          ...getAuthHeader(),
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(customerData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },
  

  
  // Posts (for Posts component)
  getPosts: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
  
  // Enquiries (for RealisticDashboard)
  getEnquiries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        headers: getAuthHeader()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      // Return mock data
      return [
        { id: 1, title: 'New Lead Created', description: 'A new lead was created for Tech Solutions Pvt Ltd', status: 'completed' },
        { id: 2, title: 'Follow-up Call', description: 'Scheduled follow-up call with Rajesh Kumar from Tech Solutions', status: 'pending' },
        { id: 3, title: 'Proposal Sent', description: 'Proposal sent to Healthcare Solutions for medical equipment', status: 'in-progress' },
        { id: 4, title: 'Meeting Scheduled', description: 'Demo meeting scheduled with Digital Marketing Hub', status: 'pending' },
        { id: 5, title: 'Deal Closed', description: 'Successfully closed deal with Retail Chain for ₹5L', status: 'completed' }
      ];
    }
  },
  
  // Demo Requests
  createDemoRequest: async (requestData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/demorequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating demo request:', error);
      throw error;
    }
  },

  getDemoRequests: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/demorequests`, {
        headers: getAuthHeader()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching demo requests:', error);
      throw error;
    }
  },

  approveDemoRequest: async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/demorequests/${requestId}/approve`, {
        method: 'PUT',
        headers: getAuthHeader()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error approving demo request:', error);
      throw error;
    }
  },

  rejectDemoRequest: async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/demorequests/${requestId}/reject`, {
        method: 'PUT',
        headers: getAuthHeader()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error rejecting demo request:', error);
      throw error;
    }
  }
};

// Helper functions
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    // Handle unauthorized responses (expired token)
    if (response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.reload(); // Force reload to show login screen
      throw new Error('Session expired. Please login again.');
    }
    
    // Handle other errors
    try {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    } catch (e) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
  }
  return response.json();
};

// Mock data for development (will be replaced by API data)
const getMockLeads = () => {
  return [
    {
      id: 1,
      contactPerson: 'Rajesh Kumar',
      companyName: 'Tech Solutions Pvt Ltd',
      email: 'rajesh@techsolutions.com',
      phone: '+91 9876543210',
      industry: 'Technology',
      leadSource: 'Website',
      estimatedValue: 500000,
      status: 'qualified',
      priority: 'high',
      assignedTo: 'Navneet Kumar',
      createdDate: '2024-12-15T10:30:00Z'
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
      status: 'contacted',
      priority: 'medium',
      assignedTo: 'Sales Manager',
      createdDate: '2024-12-10T09:15:00Z'
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
      status: 'proposal',
      priority: 'high',
      assignedTo: 'Senior Sales Rep',
      createdDate: '2024-12-05T11:45:00Z'
    }
  ];
};

const getMockCustomers = () => {
  return [
    {
      id: 1,
      name: 'Tech Solutions Pvt Ltd',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 9876543210',
      industry: 'Technology',
      status: 'active',
      createdDate: '2024-11-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Healthcare Solutions',
      contactPerson: 'Amit Patel',
      email: 'amit@healthcare.com',
      phone: '+91 9876543212',
      industry: 'Healthcare',
      status: 'active',
      createdDate: '2024-10-05T11:45:00Z'
    }
  ];
};

export default apiService;