import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';

const InteractiveCharts = ({ data, darkMode, type = 'bar' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const chartData = data || [
    { label: 'Jan', value: 45, color: '#22c55e' },
    { label: 'Feb', value: 52, color: '#3b82f6' },
    { label: 'Mar', value: 38, color: '#f59e0b' },
    { label: 'Apr', value: 61, color: '#ef4444' },
    { label: 'May', value: 55, color: '#8b5cf6' },
    { label: 'Jun', value: 67, color: '#06b6d4' }
  ];

  const maxValue = Math.max(...chartData.map(item => item.value));

  const BarChart = () => (
    <div style={{
      background: darkMode ? '#1f2937' : 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
    }}>
      {/* Chart Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BarChart3 style={{ color: '#22c55e' }} size={24} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            margin: 0
          }}>
            Sales Performance
          </h3>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: selectedPeriod === period 
                  ? 'linear-gradient(135deg, #22c55e, #4ade80)'
                  : (darkMode ? '#374151' : '#f3f4f6'),
                color: selectedPeriod === period 
                  ? 'white' 
                  : (darkMode ? '#d1d5db' : '#374151'),
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div style={{
        height: '300px',
        display: 'flex',
        alignItems: 'end',
        gap: '1rem',
        padding: '1rem 0'
      }}>
        {chartData.map((item, index) => {
          const height = (item.value / maxValue) * 250 * (animationProgress / 100);
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  background: darkMode ? '#374151' : 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  marginBottom: '0.5rem',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937'
                  }}>
                    {item.label}: {item.value}
                  </p>
                </div>
              )}
              
              {/* Bar */}
              <div
                style={{
                  width: '100%',
                  height: `${height}px`,
                  background: isHovered 
                    ? `linear-gradient(to top, ${item.color}, ${item.color}dd)`
                    : item.color,
                  borderRadius: '8px 8px 0 0',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered ? `0 8px 25px ${item.color}40` : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Shine effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: isHovered ? 'shine 1s ease' : 'none'
                }} />
              </div>
              
              {/* Label */}
              <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp style={{ color: '#22c55e' }} size={16} />
          <span style={{
            fontSize: '0.875rem',
            color: '#22c55e',
            fontWeight: '500'
          }}>
            +12% from last {selectedPeriod}
          </span>
        </div>
        
        <div style={{
          fontSize: '0.875rem',
          color: darkMode ? '#9ca3af' : '#6b7280'
        }}>
          Total: {chartData.reduce((sum, item) => sum + item.value, 0)}
        </div>
      </div>
    </div>
  );

  const DonutChart = () => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div style={{
        background: darkMode ? '#1f2937' : 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <PieChart style={{ color: '#22c55e' }} size={24} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            margin: 0
          }}>
            Lead Sources
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Donut Chart */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={darkMode ? '#374151' : '#e5e7eb'}
                strokeWidth="20"
              />
              
              {chartData.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 5.02} 502`;
                const strokeDashoffset = -cumulativePercentage * 5.02;
                cumulativePercentage += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      transition: 'all 0.5s ease',
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>
            
            {/* Center Text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                {total}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                Total Leads
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ flex: 1 }}>
            {chartData.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    background: isHovered ? (darkMode ? '#374151' : '#f9fafb') : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: item.color
                    }} />
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: darkMode ? 'white' : '#1f2937'
                    }}>
                      {item.label}
                    </span>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: darkMode ? 'white' : '#1f2937'
                    }}>
                      {item.value}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
      
      {type === 'bar' ? <BarChart /> : <DonutChart />}
    </>
  );
};

export default InteractiveCharts;