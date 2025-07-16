import React, { useState } from 'react';
import { Plus, Filter, Search, Phone, Mail, Calendar } from 'lucide-react';

const Leads = () => {
  const [leads] = useState([
    { id: 1, name: 'Alex Thompson', email: 'alex.t@email.com', phone: '+1 (555) 111-2222', source: 'Website', stage: 'Qualified', score: 85, created: '2024-01-15', nextAction: 'Call scheduled' },
    { id: 2, name: 'Maria Rodriguez', email: 'maria.r@email.com', phone: '+1 (555) 222-3333', source: 'Referral', stage: 'Contacted', score: 72, created: '2024-01-14', nextAction: 'Send proposal' },
    { id: 3, name: 'James Wilson', email: 'james.w@email.com', phone: '+1 (555) 333-4444', source: 'LinkedIn', stage: 'New', score: 45, created: '2024-01-13', nextAction: 'Initial contact' },
    { id: 4, name: 'Sophie Davis', email: 'sophie.d@email.com', phone: '+1 (555) 444-5555', source: 'Cold Call', stage: 'Negotiation', score: 91, created: '2024-01-12', nextAction: 'Contract review' }
  ]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  return (
    <div className="leads">
      <div className="page-header">
        <div className="header-left">
          <h1>Leads Management</h1>
          <p>Track and nurture your sales opportunities</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            Add Lead
          </button>
        </div>
      </div>

      <div className="leads-pipeline">
        <div className="pipeline-stage">
          <div className="stage-header">
            <h3>New Leads</h3>
            <span className="stage-count">12</span>
          </div>
          <div className="stage-content">
            {leads.filter(lead => lead.stage === 'New').map(lead => (
              <div key={lead.id} className="lead-card">
                <div className="lead-header">
                  <div className="lead-avatar">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="lead-info">
                    <h4>{lead.name}</h4>
                    <p>{lead.email}</p>
                  </div>
                </div>
                <div className="lead-score">
                  <div className={`score-badge ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                </div>
                <div className="lead-actions">
                  <button className="action-btn"><Phone size={14} /></button>
                  <button className="action-btn"><Mail size={14} /></button>
                  <button className="action-btn"><Calendar size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-header">
            <h3>Contacted</h3>
            <span className="stage-count">8</span>
          </div>
          <div className="stage-content">
            {leads.filter(lead => lead.stage === 'Contacted').map(lead => (
              <div key={lead.id} className="lead-card">
                <div className="lead-header">
                  <div className="lead-avatar">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="lead-info">
                    <h4>{lead.name}</h4>
                    <p>{lead.email}</p>
                  </div>
                </div>
                <div className="lead-score">
                  <div className={`score-badge ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                </div>
                <div className="lead-actions">
                  <button className="action-btn"><Phone size={14} /></button>
                  <button className="action-btn"><Mail size={14} /></button>
                  <button className="action-btn"><Calendar size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-header">
            <h3>Qualified</h3>
            <span className="stage-count">15</span>
          </div>
          <div className="stage-content">
            {leads.filter(lead => lead.stage === 'Qualified').map(lead => (
              <div key={lead.id} className="lead-card">
                <div className="lead-header">
                  <div className="lead-avatar">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="lead-info">
                    <h4>{lead.name}</h4>
                    <p>{lead.email}</p>
                  </div>
                </div>
                <div className="lead-score">
                  <div className={`score-badge ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                </div>
                <div className="lead-actions">
                  <button className="action-btn"><Phone size={14} /></button>
                  <button className="action-btn"><Mail size={14} /></button>
                  <button className="action-btn"><Calendar size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pipeline-stage">
          <div className="stage-header">
            <h3>Negotiation</h3>
            <span className="stage-count">6</span>
          </div>
          <div className="stage-content">
            {leads.filter(lead => lead.stage === 'Negotiation').map(lead => (
              <div key={lead.id} className="lead-card">
                <div className="lead-header">
                  <div className="lead-avatar">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="lead-info">
                    <h4>{lead.name}</h4>
                    <p>{lead.email}</p>
                  </div>
                </div>
                <div className="lead-score">
                  <div className={`score-badge ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                </div>
                <div className="lead-actions">
                  <button className="action-btn"><Phone size={14} /></button>
                  <button className="action-btn"><Mail size={14} /></button>
                  <button className="action-btn"><Calendar size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;