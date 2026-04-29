import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import Analysis from './components/analysis.jsx'
import GlobalNav from './components/GlobalNav.jsx'
import Transactions from './components/transactions.jsx'
import UserPage from './components/UserPage.jsx'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    if (activePage === 'transactions') return <Transactions />
    if (activePage === 'analysis') return <Analysis />
    if (activePage === 'profile') return <UserPage />

    return <Dashboard />
  }

  return (
    <>
      <GlobalNav activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
    </>
  )
}

export default App
