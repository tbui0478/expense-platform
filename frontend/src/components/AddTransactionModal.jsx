import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [category, setCategory] = useState('Food & Dining');
  const [merchant, setMerchant] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Apex Credit Card');
  const [isRecurring, setIsRecurring] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category: type === 'INCOME' ? 'Income' : category,
      merchant: merchant || title,
      paymentMethod,
      isRecurring,
      date: new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setAmount('');
    setMerchant('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="section-title">
            <PlusCircle size={20} style={{ color: 'var(--primary)' }} />
            <span>Add New Transaction</span>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Transaction Title / Merchant</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Target, Uber, Starbucks" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Amount ($)</label>
              <input 
                type="number" 
                step="0.01" 
                className="form-input" 
                placeholder="45.50" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Type</label>
              <select 
                className="form-select" 
                value={type} 
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EXPENSE">Expense (-)</option>
                <option value="INCOME">Income (+)</option>
              </select>
            </div>
          </div>

          {type === 'EXPENSE' && (
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Housing">Housing</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select 
              className="form-select" 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Apex Credit Card">Apex Credit Card</option>
              <option value="Main Checking">Main Checking</option>
              <option value="High Yield Savings">High Yield Savings</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <input 
              type="checkbox" 
              id="recurringCheck"
              checked={isRecurring} 
              onChange={(e) => setIsRecurring(e.target.checked)}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <label htmlFor="recurringCheck" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              Mark as Recurring Subscription / Bill
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
