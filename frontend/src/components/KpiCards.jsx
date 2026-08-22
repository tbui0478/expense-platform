import React from 'react';
import { DollarSign, CreditCard, AlertTriangle, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCards({ summary, formatAmount }) {
  if (!summary) return null;

  return (
    <div className="kpi-grid">
      {/* 1. Total Balance */}
      <div className="glass-panel kpi-card" style={{ '--card-accent': '#6366f1' }}>
        <div className="kpi-header">
          <span className="kpi-title">Total Balance</span>
          <div className="kpi-icon-wrapper" style={{ color: '#6366f1' }}>
            <DollarSign size={22} />
          </div>
        </div>
        <div className="kpi-value">{formatAmount(summary.totalBalance)}</div>
        <div className="kpi-subtext">
          <span className="trend-badge positive">
            <TrendingUp size={14} /> +4.2%
          </span>
          <span>vs last month across 3 accounts</span>
        </div>
      </div>

      {/* 2. This Month Spend */}
      <div className="glass-panel kpi-card" style={{ '--card-accent': '#3b82f6' }}>
        <div className="kpi-header">
          <span className="kpi-title">This Month Spend</span>
          <div className="kpi-icon-wrapper" style={{ color: '#3b82f6' }}>
            <CreditCard size={22} />
          </div>
        </div>
        <div className="kpi-value">{formatAmount(summary.thisMonthSpend)}</div>
        <div className="kpi-subtext">
          <span className="trend-badge positive">
            <TrendingDown size={14} /> -3.4%
          </span>
          <span>lower than July baseline</span>
        </div>
      </div>

      {/* 3. Over Budget */}
      <div className="glass-panel kpi-card" style={{ '--card-accent': summary.overBudgetCount > 0 ? '#f43f5e' : '#10b981' }}>
        <div className="kpi-header">
          <span className="kpi-title">Over Budget</span>
          <div className="kpi-icon-wrapper" style={{ color: summary.overBudgetCount > 0 ? '#f43f5e' : '#10b981' }}>
            <AlertTriangle size={22} />
          </div>
        </div>
        <div className="kpi-value" style={{ color: summary.overBudgetCount > 0 ? '#f43f5e' : 'inherit' }}>
          {summary.overBudgetCount > 0 ? formatAmount(summary.totalOverBudgetAmount) : '$0.00'}
        </div>
        <div className="kpi-subtext">
          {summary.overBudgetCount > 0 ? (
            <span className="trend-badge negative">
              {summary.overBudgetCount} {summary.overBudgetCount === 1 ? 'Category' : 'Categories'} Alert
            </span>
          ) : (
            <span className="trend-badge positive">All Categories On Track</span>
          )}
        </div>
      </div>

      {/* 4. Active Subscriptions */}
      <div className="glass-panel kpi-card" style={{ '--card-accent': '#8b5cf6' }}>
        <div className="kpi-header">
          <span className="kpi-title">Active Subscriptions</span>
          <div className="kpi-icon-wrapper" style={{ color: '#8b5cf6' }}>
            <RefreshCw size={22} />
          </div>
        </div>
        <div className="kpi-value">{summary.activeSubscriptionsCount} Services</div>
        <div className="kpi-subtext">
          <span>{formatAmount(summary.totalMonthlySubscriptionsCost)}/month recurring cost</span>
        </div>
      </div>
    </div>
  );
}
