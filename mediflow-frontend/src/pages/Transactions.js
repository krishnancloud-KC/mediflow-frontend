import React, { useState } from 'react';
import { claimsData } from '../data/mockData';

const FILTERS = ['ALL', 'APPROVED', 'REJECTED', 'PENDING'];

export default function Transactions() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = claimsData.filter(c => {
    const matchStatus = activeFilter === 'ALL' || c.status === activeFilter;
    const matchSearch = search === '' ||
      c.claim_id.toLowerCase().includes(search.toLowerCase()) ||
      c.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      c.doctor.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const total   = claimsData.length;
  const approved = claimsData.filter(c => c.status === 'APPROVED').length;
  const rejected = claimsData.filter(c => c.status === 'REJECTED').length;
  const pending  = claimsData.filter(c => c.status === 'PENDING').length;

  return (
    <div>
      <div className="page-header">
        <h1>Transactions</h1>
        <p>All claims from BigQuery · mediflow_raw.raw_claims + mediflow_clean.clean_claims</p>
      </div>

      {/* Summary mini-cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
        {[
          { label:'Total', value: total,    color:'var(--info)',    bg:'var(--info-bg)' },
          { label:'Approved', value: approved, color:'var(--safe)',    bg:'var(--safe-bg)' },
          { label:'Rejected', value: rejected, color:'var(--danger)',  bg:'var(--danger-bg)' },
          { label:'Pending',  value: pending,  color:'var(--warning)', bg:'var(--warning-bg)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding:'1rem', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700, color:s.color }}>
              {s.value}
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
              <div style={{ fontSize:13, fontWeight:600, color:s.color }}>claims</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'ALL' ? 'All Claims' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
          <input
            className="search-input"
            placeholder="Search claim, patient, doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign:'center', padding:'2rem', color:'var(--text-muted)' }}>No claims found</td></tr>
            ) : (
              filtered.map(c => (
                <tr key={c.claim_id}>
                  <td className="mono" style={{ color:'var(--primary)', fontWeight:500 }}>{c.claim_id}</td>
                  <td className="mono" style={{ color:'var(--text-secondary)' }}>{c.patient_id}</td>
                  <td style={{ fontWeight:500 }}>{c.patient_name}</td>
                  <td style={{ color:'var(--text-secondary)' }}>{c.doctor}</td>
                  <td>
                    <span className="mono" style={{ background:'var(--bg-page)', padding:'2px 6px', borderRadius:4, fontSize:11, marginRight:6 }}>{c.diagnosis_code}</span>
                    {c.diagnosis_desc}
                  </td>
                  <td className="amount" style={{ fontWeight:600 }}>₹{c.amount.toLocaleString()}</td>
                  <td><span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span></td>
                  <td style={{ color:'var(--text-muted)', fontSize:12 }}>
                    {new Date(c.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ padding:'12px 0 0', color:'var(--text-muted)', fontSize:12 }}>
          Showing {filtered.length} of {total} claims · BigQuery mediflow_raw.raw_claims
        </div>
      </div>
    </div>
  );
}
