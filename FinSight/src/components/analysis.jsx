import React from 'react'

const categories = [
  { label: 'Food', value: '$1,250', percent: '34%' },
  { label: 'Groceries', value: '$630', percent: '17%' },
  { label: 'Eating Out', value: '$220', percent: '6%' },
  { label: 'Housing', value: '$980', percent: '27%' },
  { label: 'Utilities', value: '$120', percent: '3%' },
  { label: 'Rent', value: '$860', percent: '13%' },
]

const resultItems = [
  { label: 'Total Savings', value: '$450' },
  { label: 'Food', value: '$1,250' },
  { label: 'Transportation', value: '$420' },
  { label: 'Housing', value: '$980' },
]

function Analysis() {
  return (
    <main className="analysis-page">
      <header className="analysis-header">
        <div>
          <p className="page-label">Analytics & Budget</p>
          <h1>Budget Tracker</h1>
          <p className="page-description">A clean overview of current spending, savings, and category breakdowns.</p>
        </div>
        <div className="header-meta">
          <span className="meta-pill">Premium User</span>
          <div className="meta-avatar">B</div>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="dashboard-card tracker-card">
          <div className="card-top">
            <div>
              <p className="card-label">Budget Tracker - Latest Month</p>
              <h2>Monthly overview</h2>
            </div>
            <span className="card-badge">Live</span>
          </div>
          <div className="tracker-content">
            <div className="tracker-summary">
              <div>
                <p>Total spend</p>
                <strong>$3,400</strong>
              </div>
              <div>
                <p>Available</p>
                <strong>$1,200</strong>
              </div>
            </div>
            <div className="tracker-chart">
              <span className="tracker-line tracker-line-1" />
              <span className="tracker-line tracker-line-2" />
              <span className="tracker-line tracker-line-3" />
              <span className="tracker-line tracker-line-4" />
            </div>
          </div>
        </article>

        <article className="dashboard-card chart-card">
          <div className="card-top">
            <div>
              <p className="card-label">Overall Spending</p>
              <h2>Current Month</h2>
            </div>
          </div>
          <div className="line-chart">
            <div className="line-chart-grid" />
            <svg viewBox="0 0 260 120" className="chart-svg" aria-hidden="true">
              <polyline points="0,90 40,78 80,60 120,74 160,48 200,58 240,28" />
            </svg>
          </div>
        </article>

        <article className="dashboard-card chart-card pie-card">
          <div className="card-top">
            <div>
              <p className="card-label">Category Distribution</p>
              <h2>Monthly split</h2>
            </div>
          </div>
          <div className="pie-visual">
            <div className="pie-ring" />
            <div className="pie-center">
              <span>67%</span>
              <small>Spent</small>
            </div>
          </div>
          <ul className="pie-legend">
            <li><span className="legend-swatch green" /> Food</li>
            <li><span className="legend-swatch yellow" /> Housing</li>
            <li><span className="legend-swatch blue" /> Transport</li>
          </ul>
        </article>
      </section>

      <section className="analysis-bottom">
        <article className="dashboard-card breakdown-card">
          <div className="card-top">
            <div>
              <p className="card-label">Spending Breakdown</p>
              <h2>Category details</h2>
            </div>
          </div>
          <ul className="category-list">
            {categories.map((item) => (
              <li key={item.label}>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: item.percent }} />
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="dashboard-card results-card">
          <div className="card-top">
            <div>
              <p className="card-label">Budget Results</p>
              <h2>Performance</h2>
            </div>
          </div>
          <div className="results-panel">
            <ul>
              {resultItems.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="radar-chart" aria-hidden="true">
            <div className="radar-grid" />
            <div className="radar-shape" />
          </div>
        </article>
      </section>
    </main>
  )
}

export default Analysis
