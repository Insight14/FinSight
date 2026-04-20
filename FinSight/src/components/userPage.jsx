import '../App.css'

const notificationRows = [
	{ label: 'Email report', enabled: true },
	{ label: 'Budget reports', enabled: true },
	{ label: 'Large transactions alert', enabled: true },
]

const securityRows = [
	{ label: 'Change password', action: 'Update' },
	{ label: 'Two-factor authentication', action: 'Setup' },
]

function Toggle({ enabled }) {
	return <span className={`theme-toggle${enabled ? ' is-on' : ''}`} aria-hidden="true" />
}

function UserPage() {
	return (
		<main className="user-page">
			<section className="user-page__header card-surface">
				<div className="profile-summary">
					<div className="avatar-wrap">
						<div className="profile-avatar profile-avatar--large">FL</div>
						<button type="button" className="avatar-camera" aria-label="Change profile photo">
							⌾
						</button>
					</div>
					<h1 className="profile-name profile-name--large">First Last</h1>
					<p className="profile-email">First.last@gmail.com</p>
				</div>

				<div className="profile-form">
					<label className="field-group">
						<span>Full Name</span>
						<input type="text" defaultValue="First Last" />
					</label>
					<label className="field-group">
						<span>Email</span>
						<input type="email" defaultValue="First.last@gmail.com" />
					</label>
					<label className="field-group">
						<span>Phone Number</span>
						<input type="tel" defaultValue="+1 (555) 123-4567" />
					</label>
				</div>
			</section>

			<section className="user-page__grid">
				<article className="card-surface settings-card">
					<h2>Account Preferences</h2>
					<label className="field-group field-group--select">
						<span>Default Currency</span>
						<select defaultValue="USD">
							<option value="USD">USD ($)</option>
							<option value="EUR">EUR (€)</option>
							<option value="GBP">GBP (£)</option>
						</select>
					</label>

					<div className="theme-switches">
						<span>Theme</span>
						<div className="theme-switch-row">
							<button type="button" className="theme-chip is-active">Light</button>
							<button type="button" className="theme-chip">Dark</button>
						</div>
					</div>
				</article>

				<article className="card-surface settings-card">
					<h2>Notifications</h2>
					<div className="stack-list">
						{notificationRows.map((row) => (
							<div key={row.label} className="stack-row">
								<span>{row.label}</span>
								<Toggle enabled={row.enabled} />
							</div>
						))}
					</div>
				</article>

				<article className="card-surface settings-card">
					<h2>Security</h2>
					<div className="stack-list stack-list--security">
						{securityRows.map((row) => (
							<div key={row.label} className="security-row">
								<div className="security-copy">{row.label}</div>
								<button type="button" className="inline-button">
									{row.action}
								</button>
							</div>
						))}
					</div>
				</article>
			</section>

			<section className="card-surface data-card">
				<h2>Data Management</h2>
				<div className="data-actions">
					<button type="button" className="primary-button">Export Data</button>
					<button type="button" className="secondary-button">Reset Data</button>
				</div>
				<div className="data-footer">
					<button type="button" className="link-button">Help</button>
					<button type="button" className="link-button">Sign out</button>
				</div>
			</section>
		</main>
	)
}

export default UserPage
