import { useState } from 'react'
import UserPage from './components/UserPage.jsx'
import Dashboard from './components/Dashboard.jsx'

function App() {
  const [guestMode, setGuestMode] = useState(false)

  if (guestMode) {
    return <Dashboard onExit={() => setGuestMode(false)} />
  }

  return <UserPage onGuestMode={() => setGuestMode(true)} />
}

export default App
