import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Phone } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'calling', label: 'Calling', icon: Phone }
  ];

  return (
    <div className="settings">
      <div className="page-header">
        <div className="header-left">
          <h1>Settings</h1>
          <p>Customize your Green Call CRM experience</p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="John" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="Doe" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="john.doe@greencall.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="form-input" />
                </div>
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Email Notifications</h4>
                    <p>Receive email updates for important activities</p>
                  </div>
                  <div className="toggle-switch active">
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Push Notifications</h4>
                    <p>Get instant notifications in your browser</p>
                  </div>
                  <div className="toggle-switch">
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>SMS Alerts</h4>
                    <p>Receive text messages for urgent matters</p>
                  </div>
                  <div className="toggle-switch active">
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <div className="theme-selector">
                <h4>Theme</h4>
                <div className="theme-options">
                  <div className="theme-option active">
                    <div className="theme-preview light"></div>
                    <span>Light</span>
                  </div>
                  <div className="theme-option">
                    <div className="theme-preview dark"></div>
                    <span>Dark</span>
                  </div>
                  <div className="theme-option">
                    <div className="theme-preview auto"></div>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;