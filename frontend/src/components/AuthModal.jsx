import React, { useState } from 'react';
import { Wallet, LogIn, UserPlus, Lock, Mail, User as UserIcon, AlertCircle, Database, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login' ? { email, password } : { fullName, email, password };

    try {
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (activeTab === 'register') {
        setSuccessMsg('Account registered successfully! Logging you in...');
        setTimeout(() => {
          onLoginSuccess({
            userId: data.userId,
            fullName: data.fullName,
            email: data.email
          });
        }, 1000);
      } else {
        onLoginSuccess({
          userId: data.userId,
          fullName: data.fullName,
          email: data.email
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page-container">
      <div className="auth-card glass-panel">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-icon" style={{ margin: '0 auto 12px auto', width: '54px', height: '54px' }}>
            <Wallet size={28} />
          </div>
          <h2 className="brand-title" style={{ fontSize: '1.6rem' }}>ExpenTrack</h2>
          <p className="brand-subtitle" style={{ fontSize: '0.85rem', marginTop: '2px' }}>
            Easy AI Saver & Subscription Optimizer
          </p>
        </div>

        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(null); setSuccessMsg(null); }}
          >
            Log In
          </div>
          <div
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(null); setSuccessMsg(null); }}
          >
            Create Account
          </div>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--accent-emerald)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} disabled={loading}>
            {activeTab === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
            <span>{loading ? 'Processing...' : activeTab === 'login' ? 'Sign In to ExpenTrack' : 'Register Account'}</span>
          </button>
        </form>

        {/* <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Database size={13} style={{ color: 'var(--primary)' }} />
            <span>Where is user data stored & verified?</span>
          </div>
          User accounts are stored in the database table <code>USERS</code>. You can verify registered accounts via REST API at <code>http://localhost:8080/api/auth/users</code> or H2 Console.
        </div> */}
      </div>
    </div>
  );
}
