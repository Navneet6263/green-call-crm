import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Check, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  MoreVertical,
  Edit,
  Trash,
  AlertCircle,
  ChevronDown,
  Search
} from 'lucide-react';

const TaskKanban = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignee: ''
  });
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample users for assignee dropdown
  const users = [
    { id: 'user1', name: 'Navneet Kumar' },
    { id: 'user2', name: 'Priya Sharma' },
    { id: 'user3', name: 'Rahul Singh' },
    { id: 'user4', name: 'Anjali Patel' }
  ];

  // Sample tasks data - in a real app, this would come from your API
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Follow up with Tech Solutions',
        description: 'Call Rajesh Kumar to discuss the proposal',
        status: 'todo',
        priority: 'high',
        dueDate: '2023-08-25',
        assignee: 'Navneet Kumar',
        createdAt: '2023-08-20'
      },
      {
        id: 2,
        title: 'Prepare demo for Healthcare Solutions',
        description: 'Create a customized demo focusing on patient management features',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2023-08-26',
        assignee: 'Priya Sharma',
        createdAt: '2023-08-19'
      },
      {
        id: 3,
        title: 'Send proposal to Digital Marketing Hub',
        description: 'Finalize pricing and send the proposal',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2023-08-28',
        assignee: 'Navneet Kumar',
        createdAt: '2023-08-18'
      },
      {
        id: 4,
        title: 'Update CRM documentation',
        description: 'Add new features to the user guide',
        status: 'todo',
        priority: 'low',
        dueDate: '2023-09-05',
        assignee: 'Rahul Singh',
        createdAt: '2023-08-17'
      },
      {
        id: 5,
        title: 'Quarterly sales report',
        description: 'Prepare Q2 sales report for management',
        status: 'done',
        priority: 'medium',
        dueDate: '2023-08-15',
        assignee: 'Anjali Patel',
        createdAt: '2023-08-10'
      },
      {
        id: 6,
        title: 'Client onboarding - Retail Chain',
        description: 'Complete onboarding process for new client',
        status: 'done',
        priority: 'high',
        dueDate: '2023-08-18',
        assignee: 'Navneet Kumar',
        createdAt: '2023-08-12'
      }
    ];
    
    setTasks(sampleTasks);
  }, []);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      const updatedTasks = tasks.map(task => {
        if (task.id === draggedTask.id) {
          return { ...task, status };
        }
        return task;
      });
      setTasks(updatedTasks);
      setDraggedTask(null);
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      assignee: ''
    });
    setShowAddTask(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask || !editingTask.title.trim()) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === editingTask.id) {
        return editingTask;
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return '#3b82f6';
      case 'in-progress': return '#8b5cf6';
      case 'done': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // Apply status filter
      if (filter !== 'all' && task.status !== filter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.assignee.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  const filteredTasks = getFilteredTasks();
  
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  const containerStyle = {
    padding: '0',
    background: darkMode ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const cardStyle = {
    background: darkMode ? '#1f2937' : 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Calendar style={{ color: '#8b5cf6' }} size={32} />
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Task Management
              </h1>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
                Organize and track your sales tasks
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              background: filter === 'all' ? 
                (darkMode ? '#374151' : '#f3f4f6') : 
                'transparent',
              color: darkMode ? '#d1d5db' : '#374151',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: filter === 'all' ? '600' : '500'
            }}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('todo')}
            style={{
              padding: '0.5rem 1rem',
              background: filter === 'todo' ? 
                (darkMode ? '#374151' : '#f3f4f6') : 
                'transparent',
              color: darkMode ? '#d1d5db' : '#374151',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: filter === 'todo' ? '600' : '500'
            }}
          >
            To Do
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            style={{
              padding: '0.5rem 1rem',
              background: filter === 'in-progress' ? 
                (darkMode ? '#374151' : '#f3f4f6') : 
                'transparent',
              color: darkMode ? '#d1d5db' : '#374151',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: filter === 'in-progress' ? '600' : '500'
            }}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('done')}
            style={{
              padding: '0.5rem 1rem',
              background: filter === 'done' ? 
                (darkMode ? '#374151' : '#f3f4f6') : 
                'transparent',
              color: darkMode ? '#d1d5db' : '#374151',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: filter === 'done' ? '600' : '500'
            }}
          >
            Done
          </button>
        </div>

        <div style={{
          position: 'relative',
          width: '300px'
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.5rem',
              borderRadius: '6px',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              background: darkMode ? '#374151' : 'white',
              color: darkMode ? 'white' : '#1f2937',
              fontSize: '0.875rem'
            }}
          />
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* To Do Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('todo')}
          style={{
            ...cardStyle,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '600px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#3b82f6'
            }}></div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              To Do
            </h3>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: darkMode ? '#9ca3af' : '#6b7280',
              marginLeft: 'auto'
            }}>
              {todoTasks.length}
            </span>
          </div>

          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0.5rem'
          }}>
            {todoTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                style={{
                  ...cardStyle,
                  padding: '1rem',
                  marginBottom: '1rem',
                  cursor: 'grab',
                  borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0
                  }}>
                    {task.title}
                  </h4>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setEditingTask(task)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.25rem',
                        cursor: 'pointer',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: '0 0 0.75rem 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {task.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    <Clock size={12} />
                    {task.dueDate}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <User size={12} />
                    {task.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('in-progress')}
          style={{
            ...cardStyle,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '600px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#8b5cf6'
            }}></div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              In Progress
            </h3>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: darkMode ? '#9ca3af' : '#6b7280',
              marginLeft: 'auto'
            }}>
              {inProgressTasks.length}
            </span>
          </div>

          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0.5rem'
          }}>
            {inProgressTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                style={{
                  ...cardStyle,
                  padding: '1rem',
                  marginBottom: '1rem',
                  cursor: 'grab',
                  borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0
                  }}>
                    {task.title}
                  </h4>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setEditingTask(task)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.25rem',
                        cursor: 'pointer',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: '0 0 0.75rem 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {task.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    <Clock size={12} />
                    {task.dueDate}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <User size={12} />
                    {task.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('done')}
          style={{
            ...cardStyle,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '600px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#10b981'
            }}></div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937',
              margin: 0
            }}>
              Done
            </h3>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: darkMode ? '#9ca3af' : '#6b7280',
              marginLeft: 'auto'
            }}>
              {doneTasks.length}
            </span>
          </div>

          <div style={{
            overflowY: 'auto',
            flex: 1,
            padding: '0.5rem'
          }}>
            {doneTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                style={{
                  ...cardStyle,
                  padding: '1rem',
                  marginBottom: '1rem',
                  cursor: 'grab',
                  borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                  opacity: 0.8
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0,
                    textDecoration: 'line-through'
                  }}>
                    {task.title}
                  </h4>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setEditingTask(task)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0.25rem',
                        cursor: 'pointer',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: '0 0 0.75rem 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {task.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    <Check size={12} />
                    Completed
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <User size={12} />
                    {task.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
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
          zIndex: 50
        }}>
          <div style={{
            ...cardStyle,
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Add New Task
              </h3>
              <button
                onClick={() => setShowAddTask(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    background: darkMode ? '#1f2937' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    background: darkMode ? '#1f2937' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '0.875rem',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Status
                  </label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Assignee
                  </label>
                  <select
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select Assignee</option>
                    {users.map(user => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => setShowAddTask(false)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '6px',
                    color: darkMode ? '#d1d5db' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim()}
                  style={{
                    padding: '0.75rem 1rem',
                    background: newTask.title.trim() ? '#10b981' : (darkMode ? '#374151' : '#e5e7eb'),
                    border: 'none',
                    borderRadius: '6px',
                    color: newTask.title.trim() ? 'white' : (darkMode ? '#9ca3af' : '#6b7280'),
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: newTask.title.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Check size={16} />
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
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
          zIndex: 50
        }}>
          <div style={{
            ...cardStyle,
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Edit Task
              </h3>
              <button
                onClick={() => setEditingTask(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Enter task title"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    background: darkMode ? '#1f2937' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Description
                </label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Enter task description"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    background: darkMode ? '#1f2937' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    fontSize: '0.875rem',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Status
                  </label>
                  <select
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Priority
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: darkMode ? '#d1d5db' : '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Assignee
                  </label>
                  <select
                    value={editingTask.assignee}
                    onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      background: darkMode ? '#1f2937' : 'white',
                      color: darkMode ? 'white' : '#1f2937',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select Assignee</option>
                    {users.map(user => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => handleDeleteTask(editingTask.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: darkMode ? '#7f1d1d' : '#fee2e2',
                    border: 'none',
                    borderRadius: '6px',
                    color: darkMode ? '#ef4444' : '#dc2626',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Trash size={16} />
                  Delete
                </button>

                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => setEditingTask(null)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '6px',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTask}
                    disabled={!editingTask.title.trim()}
                    style={{
                      padding: '0.75rem 1rem',
                      background: editingTask.title.trim() ? '#10b981' : (darkMode ? '#374151' : '#e5e7eb'),
                      border: 'none',
                      borderRadius: '6px',
                      color: editingTask.title.trim() ? 'white' : (darkMode ? '#9ca3af' : '#6b7280'),
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: editingTask.title.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskKanban;