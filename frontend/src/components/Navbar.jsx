import React from 'react';
import { Wallet, Plus, Sparkles, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar({ currency, setCurrency, healthScore, onOpenModal, user, onLogout }) {
  const userInitial = user && user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="glass-panel navbar">
      <div className="brand">
        <div className="brand-icon">
          <Wallet size={24} />
        </div>
        <div>
          <div className="brand-title">ExpenTrack</div>
          <div className="brand-subtitle">Easy AI Saver & Subscription Optimizer</div>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="health-badge" title="AI Financial Health Score based on budget compliance & savings">
          <Sparkles size={16} />
          <span>Health Score: {healthScore}/100</span>
        </div>

        <select 
          className="currency-select"
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
        </select>

        <button className="btn-primary" onClick={onOpenModal}>
          <Plus size={18} />
          <span>Add Expense</span>
        </button>

        {user && (
          <div className="user-profile-pill">
            <div className="user-avatar">{userInitial}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>{user.fullName}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.email}</span>
            </div>
            <button 
              onClick={onLogout}
              className="btn-secondary"
              style={{ padding: '6px 10px', fontSize: '0.78rem', marginLeft: '4px' }}
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
