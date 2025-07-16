import React from 'react';
import { Search, Bell, MessageSquare, User, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search customers, leads, or deals..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-btn">
          <MessageSquare size={20} />
          <span className="notification-badge">3</span>
        </button>
        <button className="header-btn">
          <Bell size={20} />
          <span className="notification-badge">7</span>
        </button>
        <div className="user-menu">
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">{user?.role?.replace('-', ' ') || 'Role'}</span>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
          <button className="logout-btn" onClick={onLogout} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;