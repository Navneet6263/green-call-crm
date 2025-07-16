import React, { useState } from 'react';
import { Plus, Filter, Download, Phone, Mail, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

const Customers = () => {
  const [customers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 123-4567', company: 'Tech Corp', status: 'Active', value: '$25,000', lastContact: '2024-01-15' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', phone: '+1 (555) 234-5678', company: 'Design Studio', status: 'Prospect', value: '$12,500', lastContact: '2024-01-14' },
    { id: 3, name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 (555) 345-6789', company: 'Marketing Inc', status: 'Active', value: '$45,000', lastContact: '2024-01-13' },
    { id: 4, name: 'David Brown', email: 'david.b@email.com', phone: '+1 (555) 456-7890', company: 'Consulting LLC', status: 'Inactive', value: '$8,750', lastContact: '2024-01-10' },
    { id: 5, name: 'Lisa Garcia', email: 'lisa.g@email.com', phone: '+1 (555) 567-8901', company: 'Retail Plus', status: 'Active', value: '$32,000', lastContact: '2024-01-12' }
  ]);

  const [showActions, setShowActions] = useState(null);

  return (
    <div className="customers">
      <div className="page-header">
        <div className="header-left">
          <h1>Customers</h1>
          <p>Manage your customer relationships and track interactions</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn-secondary">
            <Download size={20} />
            Export
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            Add Customer
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Company</th>
                <th>Status</th>
                <th>Value</th>
                <th>Last Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="table-row">
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">{customer.name.split(' ').map(n => n[0]).join('')}</div>
                      <div className="customer-info">
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-id">ID: {customer.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <div className="contact-item">
                        <Mail size={14} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="contact-item">
                        <Phone size={14} />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>{customer.company}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="value-cell">{customer.value}</td>
                  <td>{customer.lastContact}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn">
                        <Phone size={16} />
                      </button>
                      <button className="action-btn">
                        <Mail size={16} />
                      </button>
                      <div className="dropdown">
                        <button 
                          className="action-btn"
                          onClick={() => setShowActions(showActions === customer.id ? null : customer.id)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {showActions === customer.id && (
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <Edit size={14} />
                              Edit
                            </button>
                            <button className="dropdown-item danger">
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;