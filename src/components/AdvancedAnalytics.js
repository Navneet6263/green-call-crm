import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Target, 
  Users, 
  DollarSign,
  Calendar,
  Award,
  Zap,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import InteractiveCharts from './InteractiveCharts';
import LoadingSkeleton from './LoadingSkeleton';

const AdvancedAnalytics = ({ crmData, darkMode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    generateAnalytics();
  }, [crmData, selectedPeriod]);

  const generateAnalytics = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const leads = crmData.leads || [];
    const customers = crmData.customers || [];
    
    // Sales Funnel Data
    const funnelData = [
      { stage: 'Leads', count: leads.length, percentage: 100, color: '#3b82f6' },
      { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, percentage: 0, color: '#f59e0b' },
      { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, percentage: 0, color: '#8b5cf6' },
      { stage: 'Proposal', count: leads.filter(l => l.status === 'proposal').length, percentage: 0, color: '#06b6d4' },
      { stage: 'Converted', count: leads.filter(l => l.status === 'converted').length, percentage: 0, color: '#22c55e' }
    ];
    
    // Calculate percentages
    funnelData.forEach((stage, index) => {
      if (index > 0) {
        stage.percentage = leads.length > 0 ? Math.round((stage.count / leads.length) * 100) : 0;
      }
    });

    // Lead Sources
    const sourceData = [
      { label: 'Website', value: Math.floor(leads.length * 0.4), color: '#22c55e' },
      { label: 'Social Media', value: Math.floor(leads.length * 0.25), color: '#3b82f6' },
      { label: 'Referral', value: Math.floor(leads.length * 0.2), color: '#f59e0b' },
      { label: 'Cold Call', value: Math.floor(leads.length * 0.15), color: '#ef4444' }
    ];

    // Monthly Performance
    const monthlyData = [
      { label: 'Jan', value: 45, target: 50, color: '#22c55e' },
      { label: 'Feb', value: 52, target: 55, color: '#3b82f6' },
      { label: 'Mar', value: 38, target: 45, color: '#f59e0b' },
      { label: 'Apr', value: 61, target: 60, color: '#ef4444' },
      { label: 'May', value: 55, target: 58, color: '#8b5cf6' },
      { label: 'Jun', value: 67, target: 65, color: '#06b6d4' }
    ];

    // Conversion Metrics
    const conversionRate = leads.length > 0 ? 
      Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0;
    
    const avgDealSize = leads.length > 0 ?
      Math.round(leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0) / leads.length) : 0;

    // Forecasting
    const forecast = {
      nextMonth: {
        expectedLeads: Math.round(leads.length * 1.15),
        expectedRevenue: Math.round(avgDealSize * leads.length * 1.2),
        confidence: 85
      },
      quarter: {
        expectedLeads: Math.round(leads.length * 3.5),
        expectedRevenue: Math.round(avgDealSize * leads.length * 3.8),
        confidence: 78
      }
    };

    // Top Performers
    const performers = [
      { name: 'Sarah Johnson', deals: 12, revenue: 450000, growth: '+15%' },
      { name: 'Mike Chen', deals: 10, revenue: 380000, growth: '+8%' },
      { name: 'Emily Davis', deals: 8, revenue: 320000, growth: '+22%' },
      { name: 'John Smith', deals: 7, revenue: 280000, growth: '+5%' }
    ];

    setAnalyticsData({
      funnel: funnelData,
      sources: sourceData,
      monthly: monthlyData,
      conversion: {
        rate: conversionRate,
        avgDealSize,
        totalPipeline: leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0)
      },
      forecast,
      performers
    });
    
    setIsLoading(false);
  };

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

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <LoadingSkeleton type="dashboard" darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BarChart3 style={{ color: '#8b5cf6' }} size={32} />
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Advanced Analytics
              </h1>
              <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '1.125rem', margin: 0 }}>
                Deep insights and performance forecasting
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '0.75rem',
                border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : '#1f2937'
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button
              onClick={generateAnalytics}
              style={{
                padding: '0.75rem 1rem',
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { 
            label: 'Conversion Rate', 
            value: `${analyticsData?.conversion.rate || 0}%`,
            change: '+2.5%',
            icon: Target, 
            color: '#22c55e',
            trend: 'up'
          },
          { 
            label: 'Avg Deal Size', 
            value: `₹${(analyticsData?.conversion.avgDealSize || 0).toLocaleString()}`,
            change: '+8.2%',
            icon: DollarSign, 
            color: '#3b82f6',
            trend: 'up'
          },
          { 
            label: 'Pipeline Value', 
            value: `₹${((analyticsData?.conversion.totalPipeline || 0) / 100000).toFixed(1)}L`,
            change: '+12.1%',
            icon: TrendingUp, 
            color: '#f59e0b',
            trend: 'up'
          },
          { 
            label: 'Active Leads', 
            value: crmData.leads?.length || 0,
            change: '+5.3%',
            icon: Users, 
            color: '#8b5cf6',
            trend: 'up'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} style={{ ...cardStyle, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Icon style={{ color: metric.color }} size={24} />
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: metric.trend === 'up' ? '#22c55e' : '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <TrendingUp size={14} />
                  {metric.change}
                </span>
              </div>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  {metric.label}
                </p>
                <p style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0
                }}>
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Sales Funnel */}
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
            <Target style={{ color: '#8b5cf6' }} size={20} />
            Sales Funnel Analysis
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analyticsData?.funnel.map((stage, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '100px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: darkMode ? 'white' : '#1f2937'
                }}>
                  {stage.stage}
                </div>
                
                <div style={{
                  flex: 1,
                  height: '40px',
                  background: darkMode ? '#374151' : '#f3f4f6',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${stage.percentage}%`,
                    background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'width 1s ease'
                  }}>
                    {stage.count > 0 && `${stage.count} (${stage.percentage}%)`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
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
            <PieChart style={{ color: '#22c55e' }} size={20} />
            Lead Sources
          </h3>
          
          <InteractiveCharts 
            data={analyticsData?.sources} 
            darkMode={darkMode} 
            type="donut" 
          />
        </div>
      </div>

      {/* Performance & Forecasting */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Monthly Performance */}
        <div style={{ ...cardStyle, padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Monthly Performance vs Target
          </h3>
          
          <InteractiveCharts 
            data={analyticsData?.monthly} 
            darkMode={darkMode} 
            type="bar" 
          />
        </div>

        {/* Forecasting */}
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
            <Zap style={{ color: '#f59e0b' }} size={20} />
            AI Forecasting
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: darkMode ? '#374151' : '#f9fafb',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                marginBottom: '1rem'
              }}>
                Next Month Prediction
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Expected Leads:</span>
                <span style={{ fontWeight: '600', color: darkMode ? 'white' : '#1f2937' }}>
                  {analyticsData?.forecast.nextMonth.expectedLeads}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Expected Revenue:</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>
                  ₹{(analyticsData?.forecast.nextMonth.expectedRevenue || 0).toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Confidence:</span>
                <span style={{ fontWeight: '600', color: '#3b82f6' }}>
                  {analyticsData?.forecast.nextMonth.confidence}%
                </span>
              </div>
            </div>

            <div style={{
              background: darkMode ? '#374151' : '#f9fafb',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                marginBottom: '1rem'
              }}>
                Quarterly Outlook
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Expected Leads:</span>
                <span style={{ fontWeight: '600', color: darkMode ? 'white' : '#1f2937' }}>
                  {analyticsData?.forecast.quarter.expectedLeads}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Expected Revenue:</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>
                  ₹{((analyticsData?.forecast.quarter.expectedRevenue || 0) / 100000).toFixed(1)}L
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Confidence:</span>
                <span style={{ fontWeight: '600', color: '#3b82f6' }}>
                  {analyticsData?.forecast.quarter.confidence}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Leaderboard */}
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
          <Award style={{ color: '#f59e0b' }} size={20} />
          Top Performers Leaderboard
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {analyticsData?.performers.map((performer, index) => (
            <div key={index} style={{
              background: darkMode ? '#374151' : '#f9fafb',
              padding: '1.5rem',
              borderRadius: '12px',
              position: 'relative'
            }}>
              {index === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  🏆 #1
                </div>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'][index]}, ${['#4ade80', '#60a5fa', '#a855f7', '#fbbf24'][index]})`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {performer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    margin: 0
                  }}>
                    {performer.name}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: performer.growth.startsWith('+') ? '#22c55e' : '#ef4444',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {performer.growth} growth
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Deals Closed:</span>
                <span style={{ fontWeight: '600', color: darkMode ? 'white' : '#1f2937' }}>
                  {performer.deals}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Revenue:</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>
                  ₹{(performer.revenue / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;