import { useState } from 'react'
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

function DashboardHome({ onNavigate }) {
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
          <span className="fs-summary-val positive">+$1,991.96</span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Total Income</span>
          <span className="fs-summary-val positive">+$7,950.00</span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Total Expenses</span>
          <span className="fs-summary-val negative">-$5,958.04</span>
        </div>
        <div className="fs-summary-div" />
        <div className="fs-summary-item">
          <span className="fs-summary-label">Transactions</span>
          <span className="fs-summary-val">27</span>
        </div>
      </div>
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
      default:             return <DashboardHome onNavigate={setPage} />
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
