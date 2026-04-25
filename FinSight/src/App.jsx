import './App.css'
import Transactions from './components/transactions.jsx'

function App() {
  return (
    <div className="app-container">
      <Transactions currentPage="transactions" onNavigate={() => {}} />
    </div>
  )
}

export default App
