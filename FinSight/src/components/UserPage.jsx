import './UserPage.css'

function UserPage() {
  return (
    <main className="user-page">
      <header className="page-header">
        <div>
          <p className="page-subtitle">Dashboard</p>
          <h1>User settings</h1>
        </div>
        <nav className="top-nav">
          <button className="nav-pill active">Profile</button>
          <button className="nav-pill">Security</button>
          <button className="nav-pill">Data</button>
        </nav>
      </header>

      <section className="profile-card">
        <div className="profile-summary">
          <div className="avatar-circle">
            FL
            <span className="avatar-badge">Cam</span>
          </div>
          <div>
            <h2>First Last</h2>
            <p>first.last@gmail.com</p>
          </div>
        </div>

        <div className="profile-form">
          <div className="profile-field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" type="text" placeholder="First Last" />
          </div>
          <div className="profile-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="first.last@gmail.com" />
          </div>
          <div className="profile-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="(555) 123-4567" />
          </div>
        </div>
      </section>

      <section className="grid-sections">
        <section className="panel">
          <h3>Account Preferences</h3>
          <p>Choose your default currency and theme.</p>
          <div className="control-group">
            <div className="profile-field">
              <label htmlFor="currency">Default Currency</label>
              <select id="currency" className="currency-select">
                <option>USD ($)</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            <div className="theme-buttons">
              <button className="theme-button">Light</button>
              <button className="theme-button active">Dark</button>
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>Notifications</h3>
          <p>Activity updates and report preferences.</p>
          <div className="control-group">
            <div className="control-row">
              <span>Email Report</span>
              <button className="toggle active" aria-label="Email Report enabled" />
            </div>
            <div className="control-row">
              <span>Budget reports</span>
              <button className="toggle active" aria-label="Budget reports enabled" />
            </div>
            <div className="control-row">
              <span>Large transactions alert</span>
              <button className="toggle" aria-label="Large transactions alert disabled" />
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>Security</h3>
          <p>Keep your account protected.</p>
          <div className="security-row">
            <button className="security-action">Change password</button>
            <button className="security-action secondary">Setup two-factor</button>
          </div>
        </section>
      </section>

      <section className="data-panel">
        <div className="data-actions">
          <button className="action-button">Export Data</button>
          <button className="action-button secondary">Reset Data</button>
        </div>
        <footer>
          <span>Need help?</span>
          <a href="#">Sign out</a>
        </footer>
      </section>
    </main>
  )
}

export default UserPage
