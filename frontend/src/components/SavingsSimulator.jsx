import React, { useState } from 'react';
import { Sliders, Lightbulb, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

export default function SavingsSimulator({ insights, formatAmount }) {
  const [diningCutPct, setDiningCutPct] = useState(25);
  const [subsCutCount, setSubsCutCount] = useState(1);

  // Simulation calculation
  const diningMonthlyEst = 600;
  const diningSavingsMonthly = (diningMonthlyEst * (diningCutPct / 100));
  const subsSavingsMonthly = subsCutCount * 18;
  const totalMonthlySavings = diningSavingsMonthly + subsSavingsMonthly;
  const total1YearSavings = totalMonthlySavings * 12;
  const total5YearCompoundSavings = total1YearSavings * 5.6; // assuming ~7% investment returns

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
      <div className="section-header">
        <div className="section-title">
          <Sparkles size={20} style={{ color: '#ec4899' }} />
          <span>AI Financial Optimizer & "What-If" Savings Simulator</span>
        </div>
        <span className="section-badge">Unique AI Platform Feature</span>
      </div>

      <div className="section-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          {/* Left Column: Interactive Sliders */}
          <div className="simulator-container">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sliders size={18} style={{ color: 'var(--primary)' }} />
              <span>Simulate Spend Reductions</span>
            </h4>

            <div className="simulator-row">
              <div className="sim-label-row">
                <span>Reduce Food & Dining Spend</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{diningCutPct}% Cut</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={diningCutPct}
                onChange={(e) => setDiningCutPct(Number(e.target.value))}
                className="sim-slider"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Monthly savings: +{formatAmount(diningSavingsMonthly)}/mo
              </span>
            </div>

            <div className="simulator-row">
              <div className="sim-label-row">
                <span>Cancel Unused / Redundant Subscriptions</span>
                <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>{subsCutCount} Subscriptions</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                value={subsCutCount}
                onChange={(e) => setSubsCutCount(Number(e.target.value))}
                className="sim-slider"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Monthly savings: +{formatAmount(subsSavingsMonthly)}/mo
              </span>
            </div>

            <div className="sim-result-box">
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Projected Wealth Growth
              </div>
              <div className="sim-savings-val">{formatAmount(total1YearSavings)} / year</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <TrendingUp size={14} />
                <span>5-Year Compound Growth: <strong>{formatAmount(total5YearCompoundSavings)}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Smart Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lightbulb size={18} style={{ color: 'var(--accent-amber)' }} />
              <span>Smart AI Recommendations</span>
            </h4>

            {insights && insights.map((insight) => (
              <div 
                key={insight.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: insight.type === 'WARNING' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                  border: `1px solid ${insight.type === 'WARNING' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                {insight.type === 'WARNING' ? (
                  <ShieldAlert size={20} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: 2 }} />
                ) : (
                  <Sparkles size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                )}
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {insight.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {insight.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
