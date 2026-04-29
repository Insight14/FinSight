import './Dashboard.css'

const trendData = [
  { label: 'Mar 1', income: 3200, expenses: 2100 },
  { label: 'Mar 8', income: 3500, expenses: 2300 },
  { label: 'Mar 15', income: 3100, expenses: 2600 },
  { label: 'Mar 22', income: 3800, expenses: 2400 },
  { label: 'Mar 29', income: 4200, expenses: 2800 },
  { label: 'Apr 5', income: 3900, expenses: 2500 },
]

const categoryData = [
  { category: 'Shopping', amount: 1240 },
  { category: 'Food', amount: 890 },
  { category: 'Transport', amount: 560 },
  { category: 'Entertainment', amount: 430 },
  { category: 'Bills', amount: 1120 },
]

function MetricCard({ title, value, subtitle }) {
  return (
    <article className="db-metric-card">
      <p className="db-metric-title">{title}</p>
      <strong className="db-metric-value">{value}</strong>
      <span className="db-metric-subtitle">{subtitle}</span>
    </article>
  )
}

export default function Dashboard() {
  const totalIncome = trendData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = trendData.reduce((sum, item) => sum + item.expenses, 0)
  const netBalance = totalIncome - totalExpenses
  const savingsRate = ((netBalance / (totalIncome || 1)) * 100).toFixed(1)

  const maxCategoryAmount = Math.max(...categoryData.map((item) => item.amount))

  return (
    <div className="db-page">
      <main className="db-content">
        <section className="db-hero">
          <p className="db-overline">Financial Overview</p>
          <h1>Track Your Wealth with Organic Precision</h1>
        </section>

        <section className="db-metrics-grid">
          <article className="db-balance-card">
            <p className="db-metric-title">Net Balance</p>
            <strong className="db-balance-value">${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            <span className="db-metric-subtitle">Your wealth at a glance</span>
          </article>

          <MetricCard
            title="Income"
            value={`$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="+12.5% from last period"
          />
          <MetricCard
            title="Expenses"
            value={`$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="+8.3% from last period"
          />
          <MetricCard title="Savings Rate" value={`${savingsRate}%`} subtitle="of your income saved" />
        </section>

        <section className="db-grid-two">
          <article className="db-card">
            <h2>Income vs Expenses</h2>
            <div className="db-list">
              {trendData.map((item) => (
                <div key={item.label} className="db-list-row">
                  <span>{item.label}</span>
                  <span className="db-income">+${item.income.toLocaleString()}</span>
                  <span className="db-expense">-${item.expenses.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="db-card">
            <h2>Spending by Category</h2>
            <div className="db-category-list">
              {categoryData.map((item) => {
                const width = (item.amount / maxCategoryAmount) * 100
                return (
                  <div key={item.category} className="db-category-row">
                    <div className="db-category-head">
                      <span>{item.category}</span>
                      <strong>${item.amount.toLocaleString()}</strong>
                    </div>
                    <div className="db-progress-track">
                      <span className="db-progress-fill" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
