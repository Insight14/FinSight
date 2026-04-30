import { useState } from 'react'
import UserPage from './components/UserPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import { getInitialTransactions } from './components/transactions.jsx'

function App() {
  const [showUserPage, setShowUserPage] = useState(false)

  // central transactions state shared across pages
  const [transactions, setTransactions] = useState(getInitialTransactions)

  if (showUserPage) {
    return <UserPage onBack={() => setShowUserPage(false)} />
  }

  return (
    <Dashboard
      onSettings={() => setShowUserPage(true)}
      transactions={transactions}
      setTransactions={setTransactions}
    />
  )
}

export default App
