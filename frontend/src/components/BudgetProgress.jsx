import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';

export default function BudgetProgress({ budgetProgressList, formatAmount }) {
  if (!budgetProgressList || budgetProgressList.length === 0) return null;

  return (
    <div className="glass-panel">
      <div className="section-header">
        <div className="section-title">
          <Target size={20} style={{ color: '#3b82f6' }} />
          <span>Budget Progress</span>
        </div>
        <span className="section-badge">Monthly Caps</span>
      </div>

      <div className="section-body">
        <div className="budget-list">
          {budgetProgressList.map((item) => {
            const pct = Math.min(item.percentageUsed, 100);
            return (
              <div key={item.budgetId} className="budget-item">
                <div className="budget-meta">
                  <div className="budget-cat">
                    <span style={{ color: item.color, fontWeight: 700 }}>●</span>
                    <span>{item.category}</span>
                  </div>
                  <span className={`budget-status-pill status-${item.status}`}>
                    {item.status === 'OVER_BUDGET' ? (
                      <>
                        <AlertTriangle size={12} style={{ marginRight: 4, display: 'inline' }} />
                        Over Budget (+{formatAmount(item.overAmount)})
                      </>
                    ) : item.status === 'WARNING' ? (
                      'Warning (≥80%)'
                    ) : (
                      'On Track'
                    )}
                  </span>
                </div>

                <div className="progress-track">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: item.status === 'OVER_BUDGET' ? '#f43f5e' : item.status === 'WARNING' ? '#f59e0b' : item.color
                    }}
                  ></div>
                </div>

                <div className="budget-numbers">
                  <span>Spent: <strong>{formatAmount(item.spentAmount)}</strong></span>
                  <span>Limit: <strong>{formatAmount(item.monthlyLimit)}</strong> ({item.percentageUsed}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
