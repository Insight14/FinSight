import { useEffect, useMemo, useRef, useState } from 'react'
import './Dashboard.css'
import Transactions from './transactions.jsx'
import Analysis from './analysis.jsx'
import UserPage from './UserPage.jsx'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡', desc: 'Home' },
  { id: 'analysis',  label: 'Analysis',  icon: '◈', desc: 'Budget & Analytics' },
  { id: 'transactions', label: 'Transactions', icon: '◎', desc: 'Transaction History' },
  { id: 'profile',   label: 'Profile',   icon: '◉', desc: 'Account Settings' },
]

const CARDS = [
  {
    id: 'analysis',
    title: 'Budget Analysis',
    subtitle: 'Spending breakdowns, charts & monthly overview',
    icon: '◈',
    stat: '$3,400',
    statLabel: 'This month',
    accent: '#7ab05a',
    bg: 'linear-gradient(135deg, #1a2e14 0%, #0f1a0b 100%)',
    border: 'rgba(122,176,90,0.25)',
  },
  {
    id: 'transactions',
    title: 'Transactions',
    subtitle: 'Full history with search, filter & period navigation',
    icon: '◎',
    stat: '27',
    statLabel: 'Records',
    accent: '#7ab0e0',
    bg: 'linear-gradient(135deg, #12233a 0%, #0b1520 100%)',
    border: 'rgba(122,176,224,0.25)',
  },
  {
    id: 'profile',
    title: 'Profile & Settings',
    subtitle: 'Notifications, security & account preferences',
    icon: '◉',
    stat: '3',
    statLabel: 'Sections',
    accent: '#c4a860',
    bg: 'linear-gradient(135deg, #2a2010 0%, #181208 100%)',
    border: 'rgba(196,168,96,0.25)',
  },
]

function SidebarNav({ active, onNavigate, onSettings }) {
  return (
    <aside className="fs-sidebar">
      <div className="fs-sidebar-logo">
        <div className="fs-sidebar-logo-icon">↗</div>
        <span className="fs-sidebar-logo-text">fin<span>Sight</span></span>
      </div>

      <nav className="fs-sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`fs-nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="fs-nav-icon">{item.icon}</span>
            <span className="fs-nav-label">{item.label}</span>
            {active === item.id && <span className="fs-nav-pip" />}
          </button>
        ))}
      </nav>

      <div className="fs-sidebar-footer">
        <div className="fs-guest-badge">
          <span className="fs-guest-dot" />
          Guest Mode
        </div>
        <button className="fs-exit-btn" onClick={onSettings}>
          ⚙ Settings
        </button>
      </div>
    </aside>
  )
}

function parseAmount(value) {
  const n = parseFloat(String(value || '').replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const CATEGORY_COLORS = {
  Shopping: '#8fa884',
  Food: '#829c79',
  Transport: '#6f8968',
  Transportation: '#6f8968',
  Bills: '#86a07b',
  Housing: '#8ca381',
  Entertainment: '#768f6f',
  'Social Life': '#97ad8a',
  Other: '#7f9774',
}

function useAnimatedArray(targetValues, duration = 550) {
  const [animated, setAnimated] = useState(targetValues)
  const previousRef = useRef(targetValues)

  useEffect(() => {
    const startValues = targetValues.map((_, index) => previousRef.current[index] ?? 0)
    let rafId = 0
    let startTime = 0

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      const next = targetValues.map((value, index) => {
        const start = startValues[index] ?? 0
        return start + (value - start) * eased
      })

      setAnimated(next)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        previousRef.current = targetValues
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [duration, targetValues])

  return animated
}

function DashboardHome({ onNavigate, transactions = [] }) {
  const [tooltip, setTooltip] = useState(null)

  const showTooltip = (event, title, value) => {
    setTooltip({
      x: event.clientX + 14,
      y: event.clientY + 14,
      title,
      value,
    })
  }

  const moveTooltip = (event) => {
    setTooltip(prev => (prev ? { ...prev, x: event.clientX + 14, y: event.clientY + 14 } : null))
  }

  const analytics = useMemo(() => {
    const txs = Array.isArray(transactions) ? transactions : []
    const income = txs
      .filter(tx => tx.type === 'Income' || parseAmount(tx.amount) > 0)
      .reduce((sum, tx) => sum + Math.abs(parseAmount(tx.amount)), 0)

    const expenses = txs
      .filter(tx => tx.type !== 'Income' && parseAmount(tx.amount) <= 0)
      .reduce((sum, tx) => sum + Math.abs(parseAmount(tx.amount)), 0)

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const weekIncome = [0, 0, 0, 0, 0]
    const weekExpense = [0, 0, 0, 0, 0]
    const categoryTotals = {}

    txs.forEach(tx => {
      const d = new Date(tx.date)
      const amount = parseAmount(tx.amount)
      const absAmount = Math.abs(amount)
      const isIncome = tx.type === 'Income' || amount > 0

      if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
        const weekIdx = Math.min(4, Math.floor((d.getDate() - 1) / 7))
        if (isIncome) weekIncome[weekIdx] += absAmount
        else weekExpense[weekIdx] += absAmount
      }

      if (!isIncome) {
        const label = tx.category || 'Other'
        categoryTotals[label] = (categoryTotals[label] || 0) + absAmount
      }
    })

    const weekLabels = ['W1', 'W2', 'W3', 'W4', 'W5']

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const categoryMax = Math.max(...topCategories.map(([, value]) => value), 1)

    return {
      income,
      expenses,
      net: income - expenses,
      count: txs.length,
      weekLabels,
      weekIncome,
      weekExpense,
      topCategories,
      categoryMax,
    }
  }, [transactions])

  const animatedIncome = useAnimatedArray(analytics.weekIncome)
  const animatedExpense = useAnimatedArray(analytics.weekExpense)
  const animatedCategoryValues = useAnimatedArray(analytics.topCategories.map(([, value]) => value))

  const trendMax = Math.max(...animatedIncome, ...animatedExpense, 1)

  const incomePoints = animatedIncome.map((value, i) => ({
    x: 40 + i * 60,
    y: 160 - (value / trendMax) * 120,
    value: analytics.weekIncome[i] || 0,
    label: analytics.weekLabels[i],
  }))

  const expensePoints = animatedExpense.map((value, i) => ({
    x: 40 + i * 60,
    y: 160 - (value / trendMax) * 120,
    value: analytics.weekExpense[i] || 0,
    label: analytics.weekLabels[i],
  }))

  const incomePolyline = incomePoints.map(p => `${p.x},${p.y}`).join(' ')
  const expensePolyline = expensePoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="fs-home">
      <header className="fs-home-header">
        <div>
          <p className="fs-home-eyebrow">Welcome back</p>
          <h1 className="fs-home-title">Guest <span>Overview</span></h1>
        </div>
        <div className="fs-home-meta">
          <span className="fs-home-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      <div className="fs-home-grid">
        {CARDS.map(card => (
          <button
            key={card.id}
            className="fs-page-card"
            style={{ '--card-bg': card.bg, '--card-border': card.border, '--card-accent': card.accent }}
            onClick={() => onNavigate(card.id)}
          >
            <div className="fs-card-top">
              <span className="fs-card-icon">{card.icon}</span>
              <div className="fs-card-stat-block">
                <span className="fs-card-stat" style={{ color: card.accent }}>{card.stat}</span>
                <span className="fs-card-stat-label">{card.statLabel}</span>
              </div>
            </div>
            <div className="fs-card-body">
              <h2 className="fs-card-title">{card.title}</h2>
              <p className="fs-card-sub">{card.subtitle}</p>
            </div>
            <div className="fs-card-arrow" style={{ color: card.accent }}>→</div>
          </button>
        ))}
      </div>

      <div className="fs-home-summary">
        <div className="fs-summary-item">
          <span className="fs-summary-label">Net Balance</span>
          <span className={`fs-summary-val ${analytics.net >= 0 ? 'positive' : 'negative'}`}>
            {analytics.net >= 0 ? '+' : '-'}${formatMoney(Math.abs(analytics.net))}
          </span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Total Income</span>
          <span className="fs-summary-val positive">+${formatMoney(analytics.income)}</span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Total Expenses</span>
          <span className="fs-summary-val negative">-${formatMoney(analytics.expenses)}</span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Transactions</span>
          <span className="fs-summary-val">{analytics.count}</span>
        </div>
      </div>

      <section className="fs-home-charts" aria-label="Homepage charts">
        <article className="fs-chart-card" onMouseLeave={() => setTooltip(null)}>
          <div className="fs-chart-head">
            <h3>Income vs Expenses Trend</h3>
          </div>
          <svg viewBox="0 0 320 190" className="fs-chart-svg" aria-hidden="true">
            <line x1="40" y1="20" x2="40" y2="160" className="fs-axis" />
            <line x1="40" y1="160" x2="290" y2="160" className="fs-axis" />

            {[40, 100, 160].map(y => <line key={y} x1="40" y1={y} x2="290" y2={y} className="fs-grid" />)}

            <polyline points={incomePolyline} className="fs-line-income" />
            <polyline points={expensePolyline} className="fs-line-expense" />

            {incomePoints.map(point => (
              <g key={`income-${point.label}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  className="fs-dot-income"
                  onMouseEnter={(event) => showTooltip(event, `${point.label} Income`, `$${formatMoney(point.value)}`)}
                  onMouseMove={moveTooltip}
                  onMouseLeave={() => setTooltip(null)}
                />
                <text x={point.x} y="178" className="fs-axis-label" textAnchor="middle">{point.label}</text>
              </g>
            ))}

            {expensePoints.map(point => (
              <circle
                key={`expense-${point.label}`}
                cx={point.x}
                cy={point.y}
                r="5"
                className="fs-dot-expense"
                onMouseEnter={(event) => showTooltip(event, `${point.label} Expenses`, `$${formatMoney(point.value)}`)}
                onMouseMove={moveTooltip}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </svg>

          <div className="fs-chart-legend">
            <span><i className="income" />Income</span>
            <span><i className="expense" />Expenses</span>
          </div>
        </article>

        <article className="fs-chart-card" onMouseLeave={() => setTooltip(null)}>
          <div className="fs-chart-head">
            <h3>Spending by Category</h3>
          </div>
          <div className="fs-bar-chart">
            {analytics.topCategories.length === 0 ? (
              <div className="fs-chart-empty">No expense data yet.</div>
            ) : (
              analytics.topCategories.map(([label, value], index) => {
                const animatedValue = animatedCategoryValues[index] || 0
                const barColor = CATEGORY_COLORS[label] || '#87a07b'
                const barHeight = `${Math.max(10, (animatedValue / analytics.categoryMax) * 100)}%`

                return (
                <div
                  key={label}
                  className="fs-bar-col"
                  onMouseEnter={(event) => showTooltip(event, label, `$${formatMoney(value)}`)}
                  onMouseMove={moveTooltip}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div className="fs-bar-track">
                    <div
                      className="fs-bar-fill"
                      style={{
                        height: barHeight,
                        background: `linear-gradient(180deg, ${barColor} 0%, color-mix(in srgb, ${barColor} 65%, #1a1912 35%) 100%)`,
                      }}
                    />
                  </div>
                  <span className="fs-bar-label">{label}</span>
                  <span className="fs-bar-value">${formatMoney(value)}</span>
                </div>
              )})
            )}
          </div>
        </article>
      </section>

      {tooltip && (
        <div className="fs-chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>{tooltip.title}</strong>
          <span>{tooltip.value}</span>
        </div>
      )}
    </div>
  )
}

export default function Dashboard({ onSettings, transactions, setTransactions }) {
  const [page, setPage] = useState('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'analysis':     return <Analysis onNavigate={setPage} transactions={transactions} />
      case 'transactions': return <Transactions onNavigate={setPage} transactions={transactions} setTransactions={setTransactions} />
      case 'profile':      return <UserPage onBack={() => setPage('dashboard')} />
      default:             return <DashboardHome onNavigate={setPage} transactions={transactions} />
    }
  }

  return (
    <div className="fs-shell">
      <SidebarNav active={page} onNavigate={setPage} onSettings={onSettings} />
      <main className="fs-main">
        {renderPage()}
      </main>
    </div>
  )
}
