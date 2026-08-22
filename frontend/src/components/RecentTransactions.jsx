import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Search, Trash2, Receipt } from 'lucide-react';

export default function RecentTransactions({ transactions, formatAmount, onDeleteTransaction }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  if (!transactions) return null;

  const filtered = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          (t.merchant && t.merchant.toLowerCase().includes(search.toLowerCase())) ||
                          (t.category && t.category.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === 'ALL' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
      <div className="section-header">
        <div className="section-title">
          <Receipt size={20} style={{ color: '#10b981' }} />
          <span>Recent Transactions</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search merchant, category..."
              className="form-input"
              style={{ paddingLeft: '32px', width: '220px', fontSize: '0.8rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select 
            className="currency-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="EXPENSE">Expenses</option>
            <option value="INCOME">Income</option>
          </select>
        </div>
      </div>

      <div className="section-body" style={{ padding: 0 }}>
        <div className="tx-table-container">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Merchant / Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>
                    No transactions found match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="merchant-cell">
                        <div className="merchant-icon">
                          {tx.type === 'INCOME' ? (
                            <ArrowDownLeft size={18} style={{ color: 'var(--accent-emerald)' }} />
                          ) : (
                            <ArrowUpRight size={18} style={{ color: 'var(--text-muted)' }} />
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{tx.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.merchant || 'General'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="cat-badge">{tx.category}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{tx.date}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{tx.paymentMethod || 'Card'}</td>
                    <td>
                      <span className={`tx-amount ${tx.type}`}>
                        {tx.type === 'INCOME' ? '+' : '-'}{formatAmount(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => onDeleteTransaction(tx.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-dim)',
                          cursor: 'pointer',
                          padding: '6px',
                          borderRadius: '6px',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-rose)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
