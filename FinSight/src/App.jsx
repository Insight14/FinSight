import { useState } from 'react'
import './App.css'
import Transactions from './components/transactions.jsx'

function HomePage() {
  return (
    <section className="home-page">
      <div className="home-card">
        <h1>Welcome to FinSight</h1>
        <p>Select a page from the navigation to continue.</p>
      </div>
    </section>
  )
}

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="brand">FinSight</div>
        <nav className="page-nav" aria-label="Primary navigation">
          <button
            type="button"
            className={page === 'home' ? 'active' : ''}
            onClick={() => setPage('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={page === 'transactions' ? 'active' : ''}
            onClick={() => setPage('transactions')}
          >
            Transactions
          </button>
        </nav>
      </header>
      <div className="page-content">
        {page === 'home' && <HomePage />}
        {page === 'transactions' && <Transactions />}
      </div>
    </div>
  )
}

export default App
