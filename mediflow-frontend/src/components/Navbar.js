import React from 'react';
import './Navbar.css';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor"/>
        <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="1" y="11" width="9" height="2" rx="1" fill="currentColor" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: 'fraud',
    label: 'Fraud Alerts',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <rect x="7.25" y="5.5" width="1.5" height="4" rx="0.75" fill="currentColor"/>
        <circle cx="8" cy="11" r="0.75" fill="currentColor"/>
      </svg>
    ),
    badge: 3,
  },
  {
    id: 'chatbot',
    label: 'AI Chatbot',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M4 14L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 14L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="5.5" cy="7" r="1" fill="currentColor"/>
        <circle cx="8" cy="7" r="1" fill="currentColor"/>
        <circle cx="10.5" cy="7" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="5" fill="white" fillOpacity="0.15"/>
            <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="logo-name">MediFlow</div>
          <div className="logo-sub">Claims Platform</div>
        </div>
      </div>

      <div className="sidebar-section-label">Navigation</div>

      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="pipeline-status">
          <div className="status-dot live"></div>
          <div>
            <div className="status-label">Pipeline</div>
            <div className="status-value">Live · Every 5 min</div>
          </div>
        </div>
        <div className="infra-badges">
          <span className="infra-badge">GCP</span>
          <span className="infra-badge">AWS</span>
          <span className="infra-badge">BigQuery</span>
        </div>
      </div>
    </nav>
  );
}
