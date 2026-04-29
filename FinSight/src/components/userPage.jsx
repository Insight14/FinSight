import React, { useState, useRef, useEffect } from 'react';
import './UserPage.css';

function Toast({ messages }) {
  return (
    <div className="up-toast-container">
      {messages.map((msg) => (
        <div key={msg.id} className="up-toast">
          <span className="up-toast-icon">✨</span>
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default function UserProfile() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('up_user_data');
    return saved ? JSON.parse(saved) : { name: 'First Last', email: 'first.last@gmail.com', phone: '' };
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('up_theme') || 'dark');
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('up_notifs');
    return saved ? JSON.parse(saved) : { email: true, budget: true, alert: false };
  });

  const [avatar, setAvatar] = useState(() => localStorage.getItem('up_avatar') || null);
  const [toasts, setToasts] = useState([]);
  const fileRef = useRef();

  useEffect(() => {
    localStorage.setItem('up_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = (text) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const handleInputChange = (field, value) => {
    const newUser = { ...user, [field]: value };
    setUser(newUser);
    localStorage.setItem('up_user_data', JSON.stringify(newUser));
  };

  const handleToggle = (key) => {
    const next = !notifications[key];
    setNotifications((prev) => ({ ...prev, [key]: next }));
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} preference updated`);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('up_avatar', reader.result);
        showToast('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="up-root">
      <Toast messages={toasts} />
      
      <div className="up-container">
        {/* Profile Hero */}
        <div className="up-hero-box">
          <div className="up-hero-left">
            <div className="up-avatar-container" onClick={() => fileRef.current.click()}>
              {avatar ? <img src={avatar} alt="avatar" className="up-avatar-img" /> : <div className="up-avatar-init">FL</div>}
              <div className="up-cam-icon">📷</div>
              <input ref={fileRef} type="file" hidden onChange={handleAvatarChange} />
            </div>
            <h2 className="up-display-name">{user.name}</h2>
            <p className="up-display-email">{user.email}</p>
          </div>

          <div className="up-hero-right">
            {['name', 'email', 'phone'].map((field) => (
              <div className="up-hero-field" key={field}>
                <label>{field === 'name' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input 
                  type={field === 'email' ? 'email' : 'text'} 
                  value={user[field]} 
                  placeholder={`Enter your ${field}`}
                  onChange={(e) => handleInputChange(field, e.target.value)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Settings Grid */}
        <div className="up-settings-grid">
          <div className="up-sub-card">
            <h3>Account Preferences</h3>
            <label className="up-label-small">Default Currency</label>
            <select className="up-styled-select">
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
            <label className="up-label-small">Interface Theme</label>
            <div className="up-theme-switcher">
              <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>☀️ Light</button>
              <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>🌙 Dark</button>
            </div>
          </div>

          <div className="up-sub-card">
            <h3>Notifications</h3>
            {Object.keys(notifications).map((key) => (
              <div className="up-toggle-row" key={key} onClick={() => handleToggle(key)}>
                <span>{key.charAt(0).toUpperCase() + key.slice(1)} Alerts</span>
                <div className={`up-switch ${notifications[key] ? 'on' : ''}`}>
                  <div className="up-switch-handle" />
                </div>
              </div>
            ))}
          </div>

          <div className="up-sub-card">
            <h3>Security</h3>
            <div className="up-sec-row">
              <span>🔑 Password</span>
              <button className="up-btn-mini" onClick={() => showToast('Security email sent')}>Update</button>
            </div>
            <div className="up-sec-row">
              <span>🛡️ 2FA Auth</span>
              <button className="up-btn-mini accent" onClick={() => showToast('2FA Setup Initialized')}>Setup</button>
            </div>
          </div>
        </div>

        {/* Footer Data Bar */}
        <div className="up-footer-card">
          <div className="up-footer-left">
            <button className="up-btn-rect" onClick={() => showToast('Preparing your data...')}><span className="icon">📤</span> Export Data</button>
            <button className="up-btn-rect outline" onClick={() => { localStorage.clear(); window.location.reload(); }}><span>🔄</span> Reset</button>
          </div>
          <div className="up-footer-right">
             <button className="up-text-link" onClick={() => showToast('Redirecting to Support')}>Help Center</button>
             <button className="up-text-link red" onClick={() => showToast('Signing out...')}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
