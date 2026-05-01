import React, { useState } from 'react';
import { fraudAlerts } from '../data/mockData';

const RISK_FILTERS = ['ALL', 'HIGH', 'MEDIUM', 'LOW', 'SAFE'];

const riskConfig = {
  HIGH:   { color: 'var(--danger)',  bg: 'var(--danger-bg)',  dot: '#C0392B', label: 'HIGH RISK' },
  MEDIUM: { color: 'var(--warning)', bg: 'var(--warning-bg)', dot: '#D68910', label: 'MEDIUM' },
  LOW:    { color: 'var(--info)',    bg: 'var(--info-bg)',    dot: '#1A5276', label: 'LOW' },
  SAFE:   { color: 'var(--safe)',    bg: 'var(--safe-bg)',    dot: '#1A7A4A', label: 'SAFE' },
};

export default function FraudAlerts() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const counts = { HIGH: 0, MEDIUM: 0, LOW: 0, SAFE: 0 };
  fraudAlerts.forEach(a => counts[a.risk_level]++);

  const filtered = activeFilter === 'ALL'
    ? fraudAlerts
    : fraudAlerts.filter(a => a.risk_level === activeFilter);

  return (
    <div>
      <div className="page-header">
        <h1>Fraud Alerts</h1>
        <p>Real-time fraud detection · BigQuery mediflow_mart.fraud_alerts · SQL rule engine</p>
      </div>

      {/* Risk summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
        {Object.entries(riskConfig).map(([level, cfg]) => (
          <div
            key={level}
            className="card"
            style={{ cursor:'pointer', borderLeft:`3px solid ${cfg.dot}`, padding:'1rem 1.25rem', transition:'box-shadow 0.15s' }}
            onClick={() => setActiveFilter(activeFilter === level ? 'ALL' : level)}
          >
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:cfg.color, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:6 }}>
                  {cfg.label}
                </div>
                <div style={{ fontSize:28, fontWeight:700, color:'var(--text-primary)', letterSpacing:'-0.5px', lineHeight:1 }}>
                  {counts[level]}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>alerts</div>
              </div>
              <div style={{ width:36, height:36, borderRadius:8, background:cfg.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  {level === 'SAFE'
                    ? <path d="M5 9l3 3 5-5" stroke={cfg.dot} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    : <>
                        <path d="M9 2L16 14H2L9 2Z" stroke={cfg.dot} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                        <rect x="8.25" y="6" width="1.5" height="4" rx="0.75" fill={cfg.dot}/>
                        <circle cx="9" cy="12" r="0.75" fill={cfg.dot}/>
                      </>
                  }
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fraud rules info */}
      <div className="card" style={{ marginBottom:'1.5rem' }}>
        <div className="card-title">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="var(--primary)" strokeWidth="1.5"/>
            <rect x="6.25" y="4" width="1.5" height="5" rx="0.75" fill="var(--primary)"/>
            <circle cx="7" cy="11" r=".75" fill="var(--primary)"/>
          </svg>
          BigQuery Fraud Detection Rules
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[
            { level:'HIGH',   dot:'#C0392B', rules:['Amount > ₹50,000', 'Z00/Z01/Z02 + Amount > ₹30,000'] },
            { level:'MEDIUM', dot:'#D68910', rules:['Amount ₹20K–₹50K', 'PENDING + Amount > ₹15,000'] },
            { level:'LOW',    dot:'#1A5276', rules:['Non A/B code + Amount > ₹5,000'] },
          ].map(r => (
            <div key={r.level} style={{ padding:'12px', background:'var(--bg-page)', borderRadius:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:riskConfig[r.level].color, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>
                {r.level}
              </div>
              {r.rules.map((rule, i) => (
                <div key={i} style={{ display:'flex', gap:6, alignItems:'flex-start', marginBottom:4, fontSize:12, color:'var(--text-secondary)' }}>
                  <span style={{ marginTop:4, width:5, height:5, borderRadius:'50%', background:r.dot, flexShrink:0 }}></span>
                  {rule}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Filter + table */}
      <div className="card">
        <div className="filter-bar">
          {RISK_FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'ALL' ? 'All Alerts' : f}
              {f !== 'ALL' && <span style={{ marginLeft:5, fontWeight:700 }}>{counts[f]}</span>}
            </button>
          ))}
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Amount</th>
              <th>Risk Level</th>
              <th>Reason</th>
              <th>Flagged At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.claim_id}>
                <td className="mono" style={{ color:'var(--primary)', fontWeight:500 }}>{a.claim_id}</td>
                <td style={{ color:'var(--text-secondary)' }}>{a.doctor}</td>
                <td className="mono" style={{ fontSize:12 }}>{a.diagnosis_code}</td>
                <td className="amount" style={{ fontWeight:600 }}>₹{a.amount.toLocaleString()}</td>
                <td><span className={`risk-pill ${a.risk_level}`}>{a.risk_level}</span></td>
                <td style={{ color:'var(--text-secondary)', fontSize:12, maxWidth:240 }}>{a.reason}</td>
                <td style={{ color:'var(--text-muted)', fontSize:12 }}>
                  {new Date(a.flagged_at).toLocaleString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding:'12px 0 0', color:'var(--text-muted)', fontSize:12 }}>
          {filtered.length} alerts · Clustered by risk_level · BigQuery mediflow_mart.fraud_alerts
        </div>
      </div>
    </div>
  );
}
