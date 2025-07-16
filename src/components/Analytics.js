import React from 'react';
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    { title: 'Conversion Rate', value: '24.8%', change: '+5.2%', trend: 'up' },
    { title: 'Avg Deal Size', value: '$18,450', change: '+12.1%', trend: 'up' },
    { title: 'Sales Cycle', value: '32 days', change: '-8.5%', trend: 'down' },
    { title: 'Win Rate', value: '68.3%', change: '+3.7%', trend: 'up' }
  ];

  return (
    <div className="analytics">
      <div className="page-header">
        <div className="header-left">
          <h1>Sales Analytics</h1>
          <p>Deep insights into your sales performance and trends</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="metric-cards">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <h3>{metric.title}</h3>
                <div className={`metric-change ${metric.trend}`}>
                  {metric.change}
                </div>
              </div>
              <div className="metric-value">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <div className="chart-card large">
            <h3>Revenue Trend (Last 12 Months)</h3>
            <div className="line-chart">
              <div className="chart-grid">
                {Array.from({length: 12}, (_, i) => (
                  <div key={i} className="grid-line"></div>
                ))}
              </div>
              <svg className="chart-svg" viewBox="0 0 400 200">
                <polyline
                  points="20,150 50,120 80,100 110,80 140,60 170,70 200,50 230,40 260,30 290,35 320,25 350,20"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="chart-card">
            <h3>Lead Sources</h3>
            <div className="donut-chart">
              <div className="donut-center">
                <div className="donut-value">2,847</div>
                <div className="donut-label">Total Leads</div>
              </div>
              <div className="donut-segments">
                <div className="segment website" style={{transform: 'rotate(0deg)'}}>
                  <div className="segment-fill" style={{transform: 'rotate(144deg)'}}></div>
                </div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color website"></div>
                <span>Website (40%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color referral"></div>
                <span>Referral (25%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color social"></div>
                <span>Social (20%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color other"></div>
                <span>Other (15%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="performance-table">
          <h3>Top Performers</h3>
          <div className="table-wrapper">
            <table className="performance-data">
              <thead>
                <tr>
                  <th>Sales Rep</th>
                  <th>Deals Closed</th>
                  <th>Revenue</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="rep-info">
                      <div className="rep-avatar">SJ</div>
                      <span>Sarah Johnson</span>
                    </div>
                  </td>
                  <td>24</td>
                  <td>$485,200</td>
                  <td><span className="conversion-rate high">32.1%</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="rep-info">
                      <div className="rep-avatar">MC</div>
                      <span>Mike Chen</span>
                    </div>
                  </td>
                  <td>19</td>
                  <td>$392,800</td>
                  <td><span className="conversion-rate medium">28.5%</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="rep-info">
                      <div className="rep-avatar">EW</div>
                      <span>Emma Wilson</span>
                    </div>
                  </td>
                  <td>16</td>
                  <td>$324,600</td>
                  <td><span className="conversion-rate medium">25.8%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;