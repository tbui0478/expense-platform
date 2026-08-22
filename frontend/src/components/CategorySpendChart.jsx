import React from 'react';
import { PieChart } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategorySpendChart({ categorySpending, formatAmount }) {
  if (!categorySpending || categorySpending.length === 0) return null;

  const data = {
    labels: categorySpending.map(c => c.category),
    datasets: [
      {
        data: categorySpending.map(c => c.amount),
        backgroundColor: categorySpending.map(c => c.color),
        borderColor: 'rgba(7, 9, 14, 0.8)',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return ` ${label}: ${formatAmount(value)}`;
          }
        }
      }
    },
    cutout: '72%',
    responsive: true,
    maintainAspectRatio: false,
  };

  const total = categorySpending.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="glass-panel">
      <div className="section-header">
        <div className="section-title">
          <PieChart size={20} style={{ color: '#6366f1' }} />
          <span>Spending by Category</span>
        </div>
        <span className="section-badge">{categorySpending.length} Categories</span>
      </div>

      <div className="section-body">
        <div className="category-chart-container">
          <div className="chart-wrapper">
            <Doughnut data={data} options={options} />
            <div className="chart-center-text">
              <div className="chart-center-val">{formatAmount(total)}</div>
              <div className="chart-center-lbl">Total Spend</div>
            </div>
          </div>

          <div className="category-legend">
            {categorySpending.map((cat, idx) => (
              <div key={idx} className="legend-item">
                <div className="legend-info">
                  <div className="color-dot" style={{ backgroundColor: cat.color }}></div>
                  <span className="legend-name">{cat.category}</span>
                </div>
                <div className="legend-vals">
                  <div className="legend-amount">{formatAmount(cat.amount)}</div>
                  <div className="legend-pct">{cat.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
