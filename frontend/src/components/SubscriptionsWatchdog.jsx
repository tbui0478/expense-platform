import React from 'react';
import { RefreshCw, Calendar, AlertCircle } from 'lucide-react';

export default function SubscriptionsWatchdog({ subscriptions, formatAmount, onToggleSubscription }) {
  if (!subscriptions) return null;

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
      <div className="section-header">
        <div className="section-title">
          <RefreshCw size={20} style={{ color: '#8b5cf6' }} />
          <span>Subscription Watchdog & Recurring Calendar</span>
        </div>
        <span className="section-badge">{subscriptions.filter(s => s.status === 'ACTIVE').length} Active Subscriptions</span>
      </div>

      <div className="section-body">
        <div className="subs-grid">
          {subscriptions.map((sub) => (
            <div key={sub.id} className={`sub-card ${sub.isUnusedAlert ? 'unused' : ''}`}>
              <div className="sub-header">
                <div className="sub-info">
                  <div>
                    <div className="sub-title">{sub.name}</div>
                    <div className="sub-cycle">{sub.category} • {sub.billingCycle}</div>
                  </div>
                </div>

                <button 
                  className={`sub-toggle-btn ${sub.status}`}
                  onClick={() => onToggleSubscription(sub.id)}
                >
                  {sub.status}
                </button>
              </div>

              {sub.isUnusedAlert && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                  <AlertCircle size={14} />
                  <span>Unused in 45 days! Consider canceling.</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} />
                  <span>Renews: {sub.nextBillingDate}</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  {formatAmount(sub.cost)}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
