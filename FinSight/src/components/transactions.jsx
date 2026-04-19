import './transactions.css'

const transactions = [
  { date: '2026-03-30', description: 'Pharmacy', category: 'Transport', type: 'Expense', amount: '-$210.45' },
  { date: '2026-03-30', description: 'Cafe', category: 'Other', type: 'Expense', amount: '-$15.78' },
  { date: '2026-03-30', description: 'Utilities', category: 'Bills', type: 'Expense', amount: '-$150.68' },
  { date: '2026-03-30', description: 'Pharmacy', category: 'Other', type: 'Expense', amount: '-$300.10' },
  { date: '2026-03-30', description: 'Utilities', category: 'Bills', type: 'Expense', amount: '-$210.45' },
]

function Transactions() {
  return (
    <main className="transactions-page">
      <section className="transactions-shell">
        <div className="transactions-header">
          <button className="profile-button" aria-label="Open profile" />
          <div className="navbar-skeleton" />
          <div className="calendar-panel">Calendar</div>
        </div>

        <div className="transactions-toolbar">
          <div className="pager">
            <button aria-label="Previous page">←</button>
            <span>Date</span>
            <button aria-label="Next page">→</button>
          </div>

          <select className="select-control" aria-label="Select time period">
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>

          <div className="search-control">
            <input type="search" placeholder="Search" aria-label="Search transactions" />
            <select aria-label="Select category">
              <option>Category</option>
              <option>Transport</option>
              <option>Bills</option>
              <option>Other</option>
            </select>
          </div>

          <button className="filters-button" type="button">Filters</button>
        </div>

        <div className="transactions-table">
          <div className="transactions-row header">
            <div>Date</div>
            <div>Description</div>
            <div>Category</div>
            <div>Type</div>
            <div>Amount</div>
          </div>

          {transactions.map((transaction, index) => (
            <div className="transactions-row item" key={index}>
              <div className="value">{transaction.date}</div>
              <div className="value">{transaction.description}</div>
              <div className="value">{transaction.category}</div>
              <div className="value">{transaction.type}</div>
              <div className={`value amount ${transaction.amount.startsWith('-') ? 'negative' : ''}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Transactions
