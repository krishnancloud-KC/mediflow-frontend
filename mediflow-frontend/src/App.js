import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import FraudAlerts from './pages/FraudAlerts';
import Chatbot from './pages/Chatbot';
import './styles/App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'fraud':        return <FraudAlerts />;
      case 'chatbot':      return <Chatbot />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
