import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign,
  Target,
  Calendar,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  ArrowRight,
  Activity,
  Zap,
  Server
} from 'lucide-react';

const ProfessionalDashboard = ({ darkMode, crmData, user, setActiveView }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [quickStats, setQuickStats] = useState({});

  useEffect(() => {
    // Calculate quick stats
    const leads = crmData.leads || [];
    const customers = crmData.customers || [];
    
    const stats = {
      totalLeads: leads.length,
      totalCustomers: customers.length,
      pipelineValue: leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0),
      conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0,
      newLeadsThisWeek: leads.filter(l => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(l.createdDate) > weekAgo;
      }).length,
      hotLeads: leads.filter(l => l.priority === 'high' && l.status !== 'converted').length
    };
    
    setQuickStats(stats);

    // Sample recent activities
    const activities = [
      {
        id: 1,
        type: 'lead_created',
        message: 'New lead created: Tech Solutions Pvt Ltd',
        time: '2 hours ago',
        icon: Users,
        color: '#22c55e'
      },
      {
        id: 2,
        type: 'deal_closed',
        message: 'Deal closed with Healthcare Solutions - ₹7.5L',
        time: '4 hours ago',
        icon: DollarSign,
        color: '#3b82f6'
      },
      {
        id: 3,
        type: 'meeting_scheduled',
        message: 'Demo scheduled with Digital Marketing Hub',
        time: '6 hours ago',
        icon: Calendar,
        color: '#8b5cf6'
      },
      {
        id: 4,
        type: 'follow_up',
        message: 'Follow-up call completed with Retail Chain',
        time: '1 day ago',
        icon: Phone,
        color: '#f59e0b'
      }
    ];
    
    setRecentActivities(activities);

    // Sample upcoming tasks
    const tasks = [
      {
        id: 1,
        title: 'Follow up with Tech Solutions',
        dueDate: 'Today, 3:00 PM',
        priority: 'high',
        type: 'call'
      },
      {
        id: 2,
        title: 'Send proposal to Healthcare Solutions',
        dueDate: 'Tomorrow, 10:00 AM',
        priority: 'medium',
        type: 'email'
      },
      {
        id: 3,
        title: 'Product demo preparation',
        dueDate: 'Dec 22, 2:00 PM',
        priority: 'low',
        type: 'meeting'
      }
    ];
    
    setUpcomingTasks(tasks);
  }, [crmData]);

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div style={containerStyle}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: darkMode ? 'white' : '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p style={{
              color: darkMode ? '#9ca3af' : '#6b7280',
              fontSize: '1.125rem',
              margin: 0
            }}>
              Here's what's happening with your sales pipeline today
            </p>
          </div>
          
          <button
            onClick={() => setActiveView('add-enquiry')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
            }}
          >
            <Plus size={20} />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          {
            title: 'Total Leads',
            value: quickStats.totalLeads,
            change: `+${quickStats.newLeadsThisWeek} this week`,
            icon: Users,
            color: '#3b82f6',
            bgGradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
          },
          {
            title: 'Pipeline Value',
            value: `₹${((quickStats.pipelineValue || 0) / 100000).toFixed(1)}L`,
            change: '+12% from last month',
            icon: DollarSign,
            color: '#22c55e',
            bgGradient: 'linear-gradient(135deg, #22c55e, #4ade80)'
          },
          {
            title: 'Conversion Rate',
            value: `${quickStats.conversionRate}%`,
            change: '+5% improvement',
            icon: TrendingUp,
            color: '#8b5cf6',
            bgGradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)'
          },
          {
            title: 'Hot Leads',
            value: quickStats.hotLeads,
            change: 'Require attention',
            icon: Target,
            color: '#ef4444',
            bgGradient: 'linear-gradient(135deg, #ef4444, #f87171)'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{ ...cardStyle, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '120px',
                height: '120px',
                background: stat.bgGradient,
                borderRadius: '50%',
                opacity: 0.1
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: stat.bgGradient,
                    borderRadius: '12px',
                    boxShadow: `0 4px 14px ${stat.color}40`
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#22c55e',
                    fontWeight: '500'
                  }}>
                    {stat.change}
                  </span>
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {stat.value}
                  </h3>
                  <p style={{
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0
                  }}>
                    {stat.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Recent Activities */}
        <div style={{ ...cardStyle, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Activity style={{ color: '#3b82f6' }} size={20} />
              Recent Activities
            </h3>
            
            <button
              onClick={() => setActiveView('lead-history')}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#3b82f6',
                border: `1px solid #3b82f6`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivities.map(activity => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: darkMode ? '#374151' : '#f9fafb',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = darkMode ? '#4b5563' : '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.background = darkMode ? '#374151' : '#f9fafb'}
                >
                  <div style={{
                    padding: '0.75rem',
                    background: activity.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color="white" />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {activity.message}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      margin: 0
                    }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div style={{ ...cardStyle, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock style={{ color: '#f59e0b' }} size={20} />
              Upcoming Tasks
            </h3>
            
            <button
              onClick={() => setActiveView('tasks')}
              style={{
                padding: '0.5rem',
                background: 'transparent',
                color: '#f59e0b',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingTasks.map(task => (
              <div key={task.id} style={{
                padding: '1rem',
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '8px',
                borderLeft: `4px solid ${getPriorityColor(task.priority)}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0
                  }}>
                    {task.title}
                  </h4>
                  
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: getPriorityColor(task.priority),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {task.priority}
                  </span>
                </div>
                
                <p style={{
                  fontSize: '0.75rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Calendar size={12} />
                  {task.dueDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ ...cardStyle, padding: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Zap style={{ color: '#22c55e' }} size={20} />
          Quick Actions
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            {
              title: 'Add New Lead',
              description: 'Create a new lead entry',
              icon: Plus,
              color: '#22c55e',
              action: () => setActiveView('add-enquiry')
            },
            {
              title: 'View All Leads',
              description: 'Browse your lead pipeline',
              icon: Target,
              color: '#3b82f6',
              action: () => setActiveView('leads')
            },
            {
              title: 'Analytics Dashboard',
              description: 'View detailed reports',
              icon: BarChart3,
              color: '#8b5cf6',
              action: () => setActiveView('analytics')
            },
            {
              title: 'API Testing',
              description: 'Test system integrations',
              icon: Server,
              color: '#f59e0b',
              action: () => setActiveView('api-test')
            }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                style={{
                  padding: '1.5rem',
                  background: darkMode ? '#374151' : '#f9fafb',
                  border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = action.color;
                  e.target.style.background = darkMode ? '#4b5563' : '#f3f4f6';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 25px ${action.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb';
                  e.target.style.background = darkMode ? '#374151' : '#f9fafb';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: action.color,
                    borderRadius: '8px'
                  }}>
                    <Icon size={20} color="white" />
                  </div>
                  
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {action.title}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      margin: 0
                    }}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Status */}
      <div style={{ ...cardStyle, padding: '1.5rem', marginTop: '2rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle style={{ color: '#22c55e' }} size={20} />
          System Status
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { label: 'Backend Server', status: 'Running', color: '#22c55e' },
            { label: 'Database', status: 'Connected', color: '#22c55e' },
            { label: 'API Health', status: 'Healthy', color: '#22c55e' },
            { label: 'Last Backup', status: '2 hours ago', color: '#3b82f6' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: darkMode ? '#374151' : '#f9fafb',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                {item.label}
              </span>
              
              <span style={{
                padding: '0.25rem 0.75rem',
                background: `${item.color}20`,
                color: item.color,
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;