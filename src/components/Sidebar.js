import React from 'react';
import { BarChart3, Users, UserPlus, TrendingUp, Settings, Phone, ChevronLeft, ChevronRight, Clock, Target, Star, Zap, Search, Database, FileText, DollarSign, CheckSquare, MessageCircle, MapPin, Calendar, Brain } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed, userRole }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
      { id: 'add-enquiry', icon: UserPlus, label: 'Add Enquiry' },
      { id: 'my-leads', icon: Users, label: 'My Leads' },
      { id: 'lead-history', icon: Clock, label: 'Lead History' },
      { id: 'lead-tracker', icon: Target, label: 'Lead Tracker' },
      { id: 'data-table', icon: Database, label: 'Data Table' },
      { id: 'posts', icon: FileText, label: 'Posts' },
      { id: 'customers', icon: Users, label: '👥 Customers' },
      { id: 'tasks', icon: CheckSquare, label: '✅ Tasks' },
      { id: 'communication', icon: MessageCircle, label: '📞 Communication' },
      { id: 'location', icon: MapPin, label: '📍 Location' },
      { id: 'documents', icon: FileText, label: '📁 Documents' },
      { id: 'calendar', icon: Calendar, label: '📅 Calendar' },
      { id: 'ai-assistant', icon: Brain, label: '🤖 AI Assistant' },
      { id: 'automation', icon: Zap, label: '⚡ Automation' }
    ];
    
    const superAdminItems = [
      { id: 'hr-attendance', icon: Clock, label: '📅 HR Attendance' },
      { id: 'salary-management', icon: DollarSign, label: '💰 Salary Management' }
    ];
    
    const adminItems = [
      { id: 'lead-scoring', icon: Star, label: 'Lead Scoring' },
      { id: 'auto-assignment', icon: Zap, label: 'Auto Assignment' },
      { id: 'duplicate-detection', icon: Search, label: 'Duplicate Detection' }
    ];
    
    const generalItems = [
      { id: 'leads', icon: UserPlus, label: 'All Leads' },
      { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
      { id: 'settings', icon: Settings, label: 'Settings' }
    ];
    
    if (userRole === 'super-admin') {
      return [...baseItems, ...superAdminItems, ...adminItems, ...generalItems];
    } else if (userRole === 'admin') {
      return [...baseItems, ...adminItems, ...generalItems];
    } else if (userRole === 'sales-manager') {
      return [...baseItems, ...generalItems];
    } else {
      // sales-rep gets limited access
      const limitedItems = baseItems.filter(item => 
        ['dashboard', 'my-leads', 'lead-tracker'].includes(item.id)
      );
      return [...limitedItems, { id: 'settings', icon: Settings, label: 'Settings' }];
    }
  };
  
  const menuItems = getMenuItems();

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Phone className="logo-icon" />
          {!collapsed && <span className="logo-text">Green Call</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">JD</div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-role">Admin</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;