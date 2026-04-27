import { useState, useMemo } from 'react'
import './transactions.css'

const DEFAULT_TRANSACTIONS = [
  // April 2026 - week of Apr 17
  { date: '2026-04-21', description: 'Grocery Store', category: 'Bills', type: 'Expense', amount: '-$98.32' },
  { date: '2026-04-20', description: 'Gas Station', category: 'Transport', type: 'Expense', amount: '-$55.00' },
  { date: '2026-04-19', description: 'Netflix', category: 'Bills', type: 'Expense', amount: '-$15.99' },
  { date: '2026-04-18', description: 'Salary', category: 'Income', type: 'Income', amount: '+$2,400.00' },
  { date: '2026-04-17', description: 'Coffee Shop', category: 'Other', type: 'Expense', amount: '-$8.50' },
  // April 2026 - week of Apr 10
  { date: '2026-04-14', description: 'Restaurant', category: 'Other', type: 'Expense', amount: '-$42.10' },
  { date: '2026-04-13', description: 'Pharmacy', category: 'Other', type: 'Expense', amount: '-$18.75' },
  { date: '2026-04-12', description: 'Electric Bill', category: 'Bills', type: 'Expense', amount: '-$130.00' },
  { date: '2026-04-11', description: 'Freelance Pay', category: 'Income', type: 'Income', amount: '+$350.00' },
  { date: '2026-04-10', description: 'Uber', category: 'Transport', type: 'Expense', amount: '-$24.50' },
  // March 2026
  { date: '2026-03-30', description: 'Pharmacy', category: 'Transport', type: 'Expense', amount: '-$210.45' },
  { date: '2026-03-30', description: 'Cafe', category: 'Other', type: 'Expense', amount: '-$15.78' },
  { date: '2026-03-28', description: 'Utilities', category: 'Bills', type: 'Expense', amount: '-$150.68' },
  { date: '2026-03-25', description: 'Salary', category: 'Income', type: 'Income', amount: '+$2,400.00' },
  { date: '2026-03-20', description: 'Pharmacy', category: 'Other', type: 'Expense', amount: '-$300.10' },
  { date: '2026-03-15', description: 'Utilities', category: 'Bills', type: 'Expense', amount: '-$210.45' },
  { date: '2026-03-10', description: 'Bookstore', category: 'Other', type: 'Expense', amount: '-$34.99' },
  { date: '2026-03-05', description: 'Bus Pass', category: 'Transport', type: 'Expense', amount: '-$60.00' },
  // February 2026
  { date: '2026-02-28', description: 'Rent', category: 'Bills', type: 'Expense', amount: '-$1,200.00' },
  { date: '2026-02-25', description: 'Salary', category: 'Income', type: 'Income', amount: '+$2,400.00' },
  { date: '2026-02-14', description: 'Restaurant', category: 'Other', type: 'Expense', amount: '-$88.00' },
  { date: '2026-02-10', description: 'Gas Station', category: 'Transport', type: 'Expense', amount: '-$52.00' },
  { date: '2026-02-03', description: 'Spotify', category: 'Bills', type: 'Expense', amount: '-$9.99' },
  // December 2025
  { date: '2025-12-31', description: 'New Year Party', category: 'Other', type: 'Expense', amount: '-$145.00' },
  { date: '2025-12-25', description: 'Gift Shopping', category: 'Other', type: 'Expense', amount: '-$320.00' },
  { date: '2025-12-01', description: 'Salary', category: 'Income', type: 'Income', amount: '+$2,400.00' },
]

const categoryClass = {
  Transport: 'transport',
  Bills: 'bills',
  Other: 'other',
  Income: 'income-cat',
}

function startOfWeek(date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  d.setHours(0, 0, 0, 0)
  return d
}

function formatPeriodLabel(mode, anchor) {
  if (mode === 'Week') {
    const start = startOfWeek(anchor)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    return `${fmt(start)} – ${fmt(end)}`
  }
  if (mode === 'Month') {
    return anchor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  return String(anchor.getFullYear())
}

function navigateAnchor(anchor, mode, dir) {
  const d = new Date(anchor)
  if (mode === 'Week')  d.setDate(d.getDate() + dir * 7)
  if (mode === 'Month') d.setMonth(d.getMonth() + dir)
  if (mode === 'Year')  d.setFullYear(d.getFullYear() + dir)
  return d
}

function filterByPeriod(txns, mode, anchor) {
  return txns.filter(t => {
    const d = new Date(t.date)
    if (mode === 'Week') {
      const ws = startOfWeek(anchor)
      const we = new Date(ws)
      we.setDate(we.getDate() + 7)
      return d >= ws && d < we
    }
    if (mode === 'Month') {
      return d.getFullYear() === anchor.getFullYear() && d.getMonth() === anchor.getMonth()
    }
    return d.getFullYear() === anchor.getFullYear()
  })
}

function parseAmount(str) {
  const n = parseFloat(str.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

function formatCurrency(value, type) {
  const amount = Math.abs(Number(value) || 0)
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${type === 'Income' ? '+' : '-'}$${formatted}`
}

function getInitialTransactions() {
  const saved = localStorage.getItem('finsight_transactions')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      localStorage.removeItem('finsight_transactions')
    }
  }

  return DEFAULT_TRANSACTIONS.map((transaction, index) => ({
    id: `default-${index}`,
    ...transaction,
  }))
}

export default function Transactions() {
  const [mode, setMode] = useState('Month')
  const [anchor, setAnchor] = useState(new Date('2026-04-01'))
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [transactions, setTransactions] = useState(getInitialTransactions)
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: 'Other',
    type: 'Expense',
    amount: '',
  })

  const periodLabel = formatPeriodLabel(mode, anchor)

  const handleNewTransactionChange = (field, value) => {
    const next = { ...newTransaction, [field]: value }

    if (field === 'type') {
      next.category = value === 'Income' ? 'Income' : 'Other'
    }

    setNewTransaction(next)
  }

  const handleAddTransaction = (event) => {
    event.preventDefault()

    const amountNumber = Number(newTransaction.amount)
    if (!newTransaction.date || !newTransaction.description.trim() || !amountNumber || amountNumber <= 0) {
      return
    }

    const transaction = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: newTransaction.date,
      description: newTransaction.description.trim(),
      category: newTransaction.type === 'Income' ? 'Income' : newTransaction.category,
      type: newTransaction.type,
      amount: formatCurrency(amountNumber, newTransaction.type),
    }

    setTransactions(prev => {
      const updated = [transaction, ...prev]
      localStorage.setItem('finsight_transactions', JSON.stringify(updated))
      return updated
    })

    setAnchor(new Date(`${transaction.date}T00:00:00`))
    setNewTransaction({
      date: transaction.date,
      description: '',
      category: 'Other',
      type: 'Expense',
      amount: '',
    })
  }

  const filtered = useMemo(() => {
    let txns = filterByPeriod(transactions, mode, anchor)
    if (categoryFilter !== 'All Categories') txns = txns.filter(t => t.category === categoryFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      txns = txns.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.amount.includes(q)
      )
    }
    return txns
  }, [transactions, mode, anchor, search, categoryFilter])

  const totalIncome   = filtered.filter(t => !t.amount.startsWith('-')).reduce((s, t) => s + parseAmount(t.amount), 0)
  const totalExpenses = filtered.filter(t =>  t.amount.startsWith('-')).reduce((s, t) => s + parseAmount(t.amount), 0)
  const net = totalIncome - totalExpenses

  return (
    <>
      <nav className="finsight-navbar">
        <a className="finsight-logo" href="#">
          <div className="finsight-logo-icon">↗</div>
          <span className="finsight-logo-text">fin<span>Sight</span></span>
        </a>
        <div className="finsight-nav-right">
          <button className="nav-icon-btn" aria-label="Notifications">🔔<span className="badge" /></button>
          <button className="nav-icon-btn" aria-label="Settings">⚙️</button>
          <div className="nav-profile">
            <div className="nav-profile-avatar">B</div>
            <div className="nav-profile-info">
              <span className="nav-profile-name">John Doe</span>
              <span className="nav-profile-role">Premium User</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="transactions-page">
        <section className="transactions-shell">

          <div className="transactions-title-row">
            <h1 className="transactions-title">Transaction <span>History</span></h1>
            <span className="transactions-subtitle">{filtered.length} records</span>
          </div>

          <div className="transactions-toolbar">
            <div className="pager">
              <button aria-label="Previous period" onClick={() => setAnchor(a => navigateAnchor(a, mode, -1))}>←</button>
              <span className="pager-label">{periodLabel}</span>
              <button aria-label="Next period" onClick={() => setAnchor(a => navigateAnchor(a, mode, 1))}>→</button>
            </div>

            <select
              className="select-control"
              aria-label="Select time period"
              value={mode}
              onChange={e => setMode(e.target.value)}
            >
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>

            <div className="search-control">
              <span className="search-icon">🔍</span>
              <input
                type="search"
                placeholder="Search transactions…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="search-divider" />
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option>All Categories</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Other</option>
                <option>Income</option>
              </select>
            </div>


          </div>

          <form className="add-transaction-card" onSubmit={handleAddTransaction}>
            <h2>Add Transaction</h2>
            <div className="add-transaction-grid">
              <label>
                Date
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={e => handleNewTransactionChange('date', e.target.value)}
                  required
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  placeholder="Example: Grocery Store"
                  value={newTransaction.description}
                  onChange={e => handleNewTransactionChange('description', e.target.value)}
                  required
                />
              </label>

              <label>
                Type
                <select
                  value={newTransaction.type}
                  onChange={e => handleNewTransactionChange('type', e.target.value)}
                >
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </label>

              <label>
                Category
                <select
                  value={newTransaction.category}
                  onChange={e => handleNewTransactionChange('category', e.target.value)}
                  disabled={newTransaction.type === 'Income'}
                >
                  <option>Transport</option>
                  <option>Bills</option>
                  <option>Other</option>
                  <option>Income</option>
                </select>
              </label>

              <label>
                Amount
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={e => handleNewTransactionChange('amount', e.target.value)}
                  required
                />
              </label>

              <button className="add-transaction-btn" type="submit">+ Add</button>
            </div>
          </form>

          <div className="transactions-table">
            <div className="transactions-row header">
              <div>Date</div>
              <div>Description</div>
              <div>Category</div>
              <div>Type</div>
              <div>Amount</div>
            </div>

            {filtered.length === 0 ? (
              <div className="transactions-empty">No transactions found for this period.</div>
            ) : (
              filtered.map((t, i) => (
                <div className="transactions-row item" key={t.id || i}>
                  <div className="value date-val" data-label="Date">{t.date}</div>
                  <div className="value desc-val" data-label="Description">{t.description}</div>
                  <div className="value" data-label="Category">
                    <span className={`category-badge ${categoryClass[t.category] || 'other'}`}>{t.category}</span>
                  </div>
                  <div className="value" data-label="Type">
                    <span className={`type-badge ${t.type === 'Income' ? 'income' : ''}`}>{t.type}</span>
                  </div>
                  <div className={`value amount ${t.amount.startsWith('-') ? 'negative' : 'positive'}`} data-label="Amount">
                    {t.amount}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="transactions-summary">
            <div className="summary-item">
              <span className="summary-label">Transactions</span>
              <span className="summary-value">{filtered.length}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Income</span>
              <span className="summary-value positive">+${totalIncome.toFixed(2)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Expenses</span>
              <span className="summary-value negative">-${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Net</span>
              <span className={`summary-value ${net >= 0 ? 'positive' : 'negative'}`}>
                {net >= 0 ? '+' : '-'}${Math.abs(net).toFixed(2)}
              </span>
            </div>
          </div>

        </section>
      </main>
    </>
  )
}