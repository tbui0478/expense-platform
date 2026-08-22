import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KpiCards from './components/KpiCards';
import CategorySpendChart from './components/CategorySpendChart';
import BudgetProgress from './components/BudgetProgress';
import RecentTransactions from './components/RecentTransactions';
import SubscriptionsWatchdog from './components/SubscriptionsWatchdog';
import SavingsSimulator from './components/SavingsSimulator';
import AddTransactionModal from './components/AddTransactionModal';
import AuthModal from './components/AuthModal';
import { Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 155.0 },
};

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('expentrack_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSummary = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/summary`);
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
      }
      const data = await response.json();
      setSummary(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchSummary();
    }
  }, [currentUser]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('expentrack_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('expentrack_user');
  };

  const formatAmount = (val) => {
    if (val === undefined || val === null) return '$0.00';
    const num = typeof val === 'number' ? val : parseFloat(val);
    const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = num * rate;

    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddTransaction = async (newTx) => {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
      if (res.ok) {
        await fetchSummary();
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchSummary();
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const handleToggleSubscription = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/subscriptions/${id}/toggle`, {
        method: 'PATCH',
      });
      if (res.ok) {
        await fetchSummary();
      }
    } catch (err) {
      console.error('Error toggling subscription:', err);
    }
  };

  // Unauthenticated view
  if (!currentUser) {
    return <AuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <Navbar 
        currency={currency} 
        setCurrency={setCurrency}
        healthScore={summary?.financialHealthScore || 85}
        onOpenModal={() => setIsModalOpen(true)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
          <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Loading live dashboard analytics...</div>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--accent-rose)' }}>
          <h3>Unable to connect to backend server</h3>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>{error}</p>
          <button className="btn-primary" style={{ marginTop: '16px' }} onClick={fetchSummary}>
            Retry Connection
          </button>
        </div>
      ) : (
        <>
          {/* Top KPI Cards Grid */}
          <KpiCards summary={summary} formatAmount={formatAmount} />

          {/* Main Content Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Left: Spending by Category Chart */}
            <CategorySpendChart 
              categorySpending={summary.categorySpending} 
              formatAmount={formatAmount} 
            />

            {/* Right: Budget Progress Bars */}
            <BudgetProgress 
              budgetProgressList={summary.budgetProgressList} 
              formatAmount={formatAmount} 
            />

            {/* AI Financial Optimizer & Savings Simulator */}
            <SavingsSimulator 
              insights={summary.smartInsights} 
              formatAmount={formatAmount} 
            />

            {/* Subscriptions Watchdog Grid */}
            <SubscriptionsWatchdog 
              subscriptions={summary.activeSubscriptions} 
              formatAmount={formatAmount} 
              onToggleSubscription={handleToggleSubscription}
            />

            {/* Recent Transactions Feed */}
            <RecentTransactions 
              transactions={summary.recentTransactions} 
              formatAmount={formatAmount} 
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        </>
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

export default App;
