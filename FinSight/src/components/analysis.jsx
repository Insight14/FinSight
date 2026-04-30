import React, { useMemo, useState } from 'react'
import { mockTransactions } from './transactions'
import './analysis.css'

function Analysis() {
  const [activeTab, setActiveTab] = useState('latest')
  const [showSettings, setShowSettings] = useState(false)
  const [budgetInputs, setBudgetInputs] = useState({
    'Food': 1250,
    'Housing': 1200,
    'Transportation': 420,
    'Entertainment': 300,
    'Social Life': 200,
  })

  const mainCategories = [
    { label: 'Food', color: '#8b7355' },
    { label: 'Housing', color: '#7c6f4e' },
    { label: 'Transportation', color: '#6b6340' },
    { label: 'Entertainment', color: '#5d5a42' },
    { label: 'Social Life', color: '#5a9d6a' },
  ]

  // Calculate actual spending from transactions
  const categorySpending = useMemo(() => {
    const spending = {}
    mainCategories.forEach(cat => {
      spending[cat.label] = mockTransactions
        .filter(tx => tx.category === cat.label)
        .reduce((sum, tx) => sum + tx.amount, 0)
    })
    return spending
  }, [])

  const totalSpent = Object.values(categorySpending).reduce((sum, val) => sum + val, 0)
  const totalBudget = Object.values(budgetInputs).reduce((sum, val) => sum + val, 0)
  const available = Math.max(0, totalBudget - totalSpent)
  const usedPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0

  // Build pieData from 5 main categories
  const pieData = mainCategories
    .map(cat => ({
      label: cat.label,
      value: categorySpending[cat.label] || 0,
      color: cat.color
    }))
    .sort((a, b) => b.value - a.value)

  const pieTotal = pieData.reduce((sum, cat) => sum + cat.value, 0)
  const piePercents = pieData.map(cat => (pieTotal > 0 ? (cat.value / pieTotal * 100).toFixed(1) : 0))

  const resultItems = [
    { label: 'Total Savings', value: `$${available}` },
    { label: pieData[0]?.label, value: `$${pieData[0]?.value || 0}` },
    { label: pieData[1]?.label, value: `$${pieData[1]?.value || 0}` },
    { label: pieData[2]?.label, value: `$${pieData[2]?.value || 0}` },
  ]

  // Generate weekly spending data for chart
  const weeklyData = useMemo(() => {
    const weeks = [
      { label: 'Week 1', value: 400, y: 80 },
      { label: 'Week 2', value: 350, y: 70 },
      { label: 'Week 3', value: 600, y: 120 },
      { label: 'Week 4', value: 450, y: 90 },
      { label: 'Week 5', value: 260, y: 52 }
    ]
    const maxValue = Math.max(...weeks.map(w => w.value))
    return weeks.map(w => ({
      ...w,
      y: 120 - (w.value / maxValue) * 100,
      displayValue: `$${w.value}`
    }))
  }, [])

  return (
    <main className="analysis-page">
      {/* Top Navigation Bar */}
      <nav className="analysis-topbar">
        <div className="topbar-content">
          <div className="topbar-left">
            <h1 className="page-title">Analytics & Budget</h1>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" title="Notifications">🔔</button>
            <button className="icon-btn" title="Settings">⚙️</button>
            <div className="user-profile">
              <button 
                className="user-btn"
                onClick={() => setShowSettings(!showSettings)}
              >
                <span>Profile</span>
              </button>
              {showSettings && (
                <div className="settings-dropdown">
                  <a href="#profile">Profile</a>
                  <a href="#settings">Settings</a>
                  <a href="#logout">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single Metric
        </button>
        <button 
          className={`tab-btn ${activeTab === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveTab('latest')}
        >
          Latest Month
        </button>
      </div>

      {/* Main Dashboard */}
      <section className="dashboard-main">
        {/* Left: Budget Tracker */}
        <aside className="tracker-section">
          <div className="section-card">
            <h3 className="card-title">Budget Tracker</h3>
            <div className="budget-stats">
              <div className="stat-row">
                <span className="stat-label">Total Budget</span>
                <span className="stat-value">${totalBudget}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Total Spent</span>
                <span className="stat-value spent">${totalSpent}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Available</span>
                <span className={`stat-value ${available > 0 ? 'positive' : 'negative'}`}>
                  ${available}
                </span>
              </div>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Usage</span>
                  <span className="percent">{usedPercent}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${usedPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Charts */}
        <section className="charts-section">
          {/* Line Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h3 className="card-title">Overall Spending</h3>
              <p className="card-subtitle">Current Month</p>
            </div>
            <div className="line-chart">
              <svg viewBox="0 0 320 180" className="chart-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8b7355', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#8b7355', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                
                {/* Y-axis label */}
                <text x="5" y="15" fontSize="11" fill="#94a3b8" fontWeight="500">$600</text>
                <text x="5" y="75" fontSize="11" fill="#94a3b8" fontWeight="500">$300</text>
                <text x="5" y="135" fontSize="11" fill="#94a3b8" fontWeight="500">$0</text>
                
                {/* Grid lines */}
                <line x1="40" y1="15" x2="300" y2="15" stroke="rgba(139, 115, 85, 0.08)" strokeWidth="1" />
                <line x1="40" y1="75" x2="300" y2="75" stroke="rgba(139, 115, 85, 0.08)" strokeWidth="1" />
                <line x1="40" y1="135" x2="300" y2="135" stroke="rgba(139, 115, 85, 0.08)" strokeWidth="1" />
                
                {/* Axes */}
                <line x1="40" y1="5" x2="40" y2="145" stroke="#8b7355" strokeWidth="2" />
                <line x1="40" y1="145" x2="300" y2="145" stroke="#8b7355" strokeWidth="2" />
                
                {/* Filled area */}
                <polygon points="50,105 100,85 150,40 200,95 250,125 300,145 300,145 250,145 200,145 150,145 100,145 50,145" fill="url(#chartGrad)" />
                
                {/* Line */}
                <polyline points="50,105 100,85 150,40 200,95 250,125" fill="none" stroke="#8b7355" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Data points with labels */}
                <g>
                  <circle cx="50" cy="105" r="4" fill="#8b7355" stroke="#1a1814" strokeWidth="2" />
                  <text x="50" y="165" fontSize="11" fill="#94a3b8" fontWeight="500" textAnchor="middle">W1</text>
                  <text x="50" y="120" fontSize="10" fill="#94a3b8" textAnchor="middle">$400</text>
                </g>
                <g>
                  <circle cx="100" cy="85" r="4" fill="#8b7355" stroke="#1a1814" strokeWidth="2" />
                  <text x="100" y="165" fontSize="11" fill="#94a3b8" fontWeight="500" textAnchor="middle">W2</text>
                  <text x="100" y="75" fontSize="10" fill="#94a3b8" textAnchor="middle">$350</text>
                </g>
                <g>
                  <circle cx="150" cy="40" r="4" fill="#8b7355" stroke="#1a1814" strokeWidth="2" />
                  <text x="150" y="165" fontSize="11" fill="#94a3b8" fontWeight="500" textAnchor="middle">W3</text>
                  <text x="150" y="25" fontSize="10" fill="#94a3b8" textAnchor="middle">$600</text>
                </g>
                <g>
                  <circle cx="200" cy="95" r="4" fill="#8b7355" stroke="#1a1814" strokeWidth="2" />
                  <text x="200" y="165" fontSize="11" fill="#94a3b8" fontWeight="500" textAnchor="middle">W4</text>
                  <text x="200" y="85" fontSize="10" fill="#94a3b8" textAnchor="middle">$450</text>
                </g>
                <g>
                  <circle cx="250" cy="125" r="4" fill="#8b7355" stroke="#1a1814" strokeWidth="2" />
                  <text x="250" y="165" fontSize="11" fill="#94a3b8" fontWeight="500" textAnchor="middle">W5</text>
                  <text x="250" y="115" fontSize="10" fill="#94a3b8" textAnchor="middle">$260</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h3 className="card-title">Category Distribution</h3>
              <p className="card-subtitle">Monthly split</p>
            </div>
            <div className="pie-container">
              <div className="pie-visual">
                <div className="pie-ring" style={{ 
                  background: `conic-gradient(${pieData.map((cat, i) => `${cat.color} ${piePercents[i]}%`).join(', ')})` 
                }} />
                <div className="pie-center">100%</div>
              </div>
              <div className="pie-legend">
                {pieData.map((cat, i) => (
                  <div key={cat.label} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: cat.color }} />
                    <span className="legend-text">{cat.label}</span>
                    <span className="legend-value">{piePercents[i]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right: Results & Radar */}
        <aside className="results-section">
          <div className="section-card">
            <h3 className="card-title">Budget Results</h3>
            <div className="results-list">
              {resultItems.map((item) => (
                <div key={item.label} className="result-item">
                  <span className="result-label">{item.label}</span>
                  <span className="result-value">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="radar-container">
              <svg viewBox="0 0 140 140" className="radar-svg" aria-hidden="true">
                <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(139, 115, 85, 0.15)" strokeWidth="1" />
                <circle cx="70" cy="70" r="35" fill="none" stroke="rgba(139, 115, 85, 0.15)" strokeWidth="1" />
                <circle cx="70" cy="70" r="15" fill="none" stroke="rgba(139, 115, 85, 0.15)" strokeWidth="1" />
                <polygon points="70,20 105,65 85,125 55,125 35,65" fill="rgba(139, 115, 85, 0.15)" stroke="#8b7355" strokeWidth="1.5" />
                <text x="70" y="12" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">Food</text>
                <text x="110" y="68" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">Trans</text>
                <text x="70" y="133" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">Ent</text>
                <text x="30" y="68" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">Housing</text>
              </svg>
            </div>
          </div>
        </aside>
      </section>

      {/* Bottom: Budget Allocation */}
      <section className="budget-section">
        <div className="section-card full-width">
          <h3 className="card-title">Monthly Budget Allocation</h3>
          <div className="allocation-grid">
            {mainCategories.map(category => (
              <div key={category.label} className="allocation-item">
                <div className="allocation-header">
                  <label className="allocation-label">{category.label}</label>
                  <span className="allocation-amount">${budgetInputs[category.label]}</span>
                </div>
                <div className="slider-track">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={budgetInputs[category.label]}
                    onChange={(e) => handleBudgetChange(category.label, e.target.value)}
                    className="budget-slider"
                    style={{
                      background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${(budgetInputs[category.label] / 2000) * 100}%, rgba(139, 115, 85, 0.15) ${(budgetInputs[category.label] / 2000) * 100}%, rgba(139, 115, 85, 0.15) 100%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Analysis
