import React, { useState } from 'react';
import { Star, Settings, Save, Plus, Trash2 } from 'lucide-react';

const LeadScoring = ({ crmData, updateCrmData }) => {
  const [scoringRules, setScoringRules] = useState([
    {
      id: 1,
      name: 'Email Engagement',
      criteria: 'email_opens',
      points: 10,
      condition: 'greater_than',
      value: 3,
      active: true
    },
    {
      id: 2,
      name: 'Company Size',
      criteria: 'company_size',
      points: 25,
      condition: 'equals',
      value: 'large',
      active: true
    },
    {
      id: 3,
      name: 'Industry Tier',
      criteria: 'industry_tier',
      points: 15,
      condition: 'equals',
      value: 'tier1',
      active: true
    },
    {
      id: 4,
      name: 'Response Time',
      criteria: 'response_time',
      points: 20,
      condition: 'less_than',
      value: 24,
      active: true
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    criteria: '',
    points: 0,
    condition: 'equals',
    value: '',
    active: true
  });

  const criteriaOptions = [
    { value: 'email_opens', label: 'Email Opens' },
    { value: 'email_clicks', label: 'Email Clicks' },
    { value: 'website_visits', label: 'Website Visits' },
    { value: 'company_size', label: 'Company Size' },
    { value: 'industry_tier', label: 'Industry Tier' },
    { value: 'response_time', label: 'Response Time (hours)' },
    { value: 'estimated_value', label: 'Estimated Deal Value' },
    { value: 'lead_source', label: 'Lead Source' }
  ];

  const conditionOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'contains', label: 'Contains' }
  ];

  const addRule = () => {
    if (newRule.name && newRule.criteria && newRule.points) {
      setScoringRules([...scoringRules, { ...newRule, id: Date.now() }]);
      setNewRule({
        name: '',
        criteria: '',
        points: 0,
        condition: 'equals',
        value: '',
        active: true
      });
    }
  };

  const deleteRule = (id) => {
    setScoringRules(scoringRules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id) => {
    setScoringRules(scoringRules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const calculateLeadScore = (lead) => {
    let score = 0;
    
    scoringRules.forEach(rule => {
      if (!rule.active) return;
      
      let leadValue = getLeadValue(lead, rule.criteria);
      let ruleValue = rule.value;
      
      switch(rule.condition) {
        case 'equals':
          if (leadValue === ruleValue) score += rule.points;
          break;
        case 'greater_than':
          if (Number(leadValue) > Number(ruleValue)) score += rule.points;
          break;
        case 'less_than':
          if (Number(leadValue) < Number(ruleValue)) score += rule.points;
          break;
        case 'contains':
          if (String(leadValue).toLowerCase().includes(String(ruleValue).toLowerCase())) {
            score += rule.points;
          }
          break;
      }
    });
    
    return Math.min(score, 100); // Cap at 100
  };

  const getLeadValue = (lead, criteria) => {
    switch(criteria) {
      case 'email_opens': return Math.floor(Math.random() * 10);
      case 'email_clicks': return Math.floor(Math.random() * 5);
      case 'website_visits': return Math.floor(Math.random() * 15);
      case 'company_size': return lead.estimatedValue > 1000000 ? 'large' : 'medium';
      case 'industry_tier': return ['Technology', 'Finance', 'Healthcare'].includes(lead.industry) ? 'tier1' : 'tier2';
      case 'response_time': return Math.floor(Math.random() * 48);
      case 'estimated_value': return lead.estimatedValue || 0;
      case 'lead_source': return lead.leadSource || '';
      default: return '';
    }
  };

  const applyScoring = () => {
    const leads = crmData.leads || [];
    const updatedLeads = leads.map(lead => ({
      ...lead,
      score: calculateLeadScore(lead)
    }));
    
    updateCrmData({ leads: updatedLeads });
    alert('Lead scoring applied successfully!');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    if (score >= 40) return 'score-low';
    return 'score-very-low';
  };

  return (
    <div className="lead-scoring">
      <div className="page-header">
        <h1>Lead Scoring</h1>
        <p>Configure automated lead scoring rules</p>
      </div>

      <div className="scoring-rules">
        <div className="rules-header">
          <h3>Scoring Rules</h3>
          <button className="btn-primary" onClick={applyScoring}>
            <Save size={16} />
            Apply Scoring
          </button>
        </div>

        <div className="rules-list">
          {scoringRules.map(rule => (
            <div key={rule.id} className={`rule-card ${rule.active ? 'active' : 'inactive'}`}>
              <div className="rule-header">
                <h4>{rule.name}</h4>
                <div className="rule-actions">
                  <button 
                    className={`toggle-btn ${rule.active ? 'active' : ''}`}
                    onClick={() => toggleRule(rule.id)}
                  >
                    {rule.active ? 'Active' : 'Inactive'}
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="rule-details">
                <span className="rule-criteria">
                  {criteriaOptions.find(c => c.value === rule.criteria)?.label}
                </span>
                <span className="rule-condition">
                  {conditionOptions.find(c => c.value === rule.condition)?.label}
                </span>
                <span className="rule-value">{rule.value}</span>
                <span className="rule-points">+{rule.points} points</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="add-rule">
        <h3>Add New Rule</h3>
        <div className="rule-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Rule Name</label>
              <input
                type="text"
                value={newRule.name}
                onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                placeholder="Enter rule name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Criteria</label>
              <select
                value={newRule.criteria}
                onChange={(e) => setNewRule({...newRule, criteria: e.target.value})}
                className="form-select"
              >
                <option value="">Select Criteria</option>
                {criteriaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select
                value={newRule.condition}
                onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
                className="form-select"
              >
                {conditionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Value</label>
              <input
                type="text"
                value={newRule.value}
                onChange={(e) => setNewRule({...newRule, value: e.target.value})}
                placeholder="Enter value"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Points</label>
              <input
                type="number"
                value={newRule.points}
                onChange={(e) => setNewRule({...newRule, points: Number(e.target.value)})}
                placeholder="0"
                className="form-input"
              />
            </div>
          </div>

          <button className="btn-primary" onClick={addRule}>
            <Plus size={16} />
            Add Rule
          </button>
        </div>
      </div>

      <div className="scoring-preview">
        <h3>Lead Scores Preview</h3>
        <div className="leads-scores">
          {(crmData.leads || []).slice(0, 5).map(lead => (
            <div key={lead.id} className="lead-score-card">
              <div className="lead-info">
                <h4>{lead.companyName}</h4>
                <p>{lead.contactPerson}</p>
              </div>
              <div className={`score-display ${getScoreColor(calculateLeadScore(lead))}`}>
                <Star size={16} />
                <span>{calculateLeadScore(lead)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadScoring;