import './GlobalNav.css'

function navClass(isActive) {
  return `global-nav-link${isActive ? ' active' : ''}`
}

export default function GlobalNav({ activePage, onNavigate }) {
  return (
    <nav className="global-nav">
      <div className="global-brand">
        <div className="global-brand-icon">↗</div>
        <div>
          <p className="global-brand-title">FinSight</p>
          <p className="global-brand-subtitle">Financial Intelligence</p>
        </div>
      </div>

      <div className="global-nav-links" role="tablist" aria-label="Main navigation">
        <button className={navClass(activePage === 'dashboard')} onClick={() => onNavigate('dashboard')}>Dashboard</button>
        <button className={navClass(activePage === 'transactions')} onClick={() => onNavigate('transactions')}>Transactions</button>
        <button className={navClass(activePage === 'analysis')} onClick={() => onNavigate('analysis')}>Analysis</button>
        <button className={navClass(activePage === 'profile')} onClick={() => onNavigate('profile')}>Profile</button>
      </div>
    </nav>
  )
}
