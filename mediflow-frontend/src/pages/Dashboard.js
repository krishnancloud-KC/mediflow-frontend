import React, { useEffect, useRef } from 'react';
import { dashboardStats, trendData, claimsData } from '../data/mockData';
import '../styles/App.css';

export default function Dashboard() {
  const lineRef  = useRef(null);
  const donutRef = useRef(null);
  const barRef   = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload = () => initCharts();
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  function initCharts() {
    if (window.Chart) {
      // Line chart — claims trend
      new window.Chart(lineRef.current, {
        type: 'line',
        data: {
          labels: trendData.map(d => d.date),
          datasets: [{
            label: 'Claims',
            data: trendData.map(d => d.claims),
            borderColor: '#0F6E56',
            backgroundColor: 'rgba(15,110,86,0.07)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#0F6E56',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, family: 'DM Sans' }, color: '#8A9AB0' } },
            y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11, family: 'DM Sans' }, color: '#8A9AB0' } }
          }
        }
      });

      // Donut — status breakdown
      new window.Chart(donutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Rejected', 'Pending'],
          datasets: [{
            data: [dashboardStats.approved, dashboardStats.rejected, dashboardStats.pending],
            backgroundColor: ['#1A7A4A', '#C0392B', '#D68910'],
            borderWidth: 0,
            hoverOffset: 6,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          cutout: '68%',
          plugins: { legend: { display: false } }
        }
      });

      // Bar — amount by doctor
      const doctorMap = {};
      claimsData.forEach(c => {
        doctorMap[c.doctor] = (doctorMap[c.doctor] || 0) + c.amount;
      });
      const doctors = Object.keys(doctorMap);
      const amounts = doctors.map(d => Math.round(doctorMap[d] / 1000));

      new window.Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: doctors,
          datasets: [{
            label: '₹ (thousands)',
            data: amounts,
            backgroundColor: 'rgba(15,110,86,0.75)',
            borderRadius: 5,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10, family: 'DM Sans' }, color: '#8A9AB0' } },
            y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11, family: 'DM Sans' }, color: '#8A9AB0', callback: v => '₹' + v + 'K' } }
          }
        }
      });
    }
  }

  const recentClaims = claimsData.slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Healthcare Claims Overview · GCP BigQuery · April 2026</p>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-label">Total Claims</div>
          <div className="stat-value">{dashboardStats.totalClaims.toLocaleString()}</div>
          <span className="stat-badge info">This month</span>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Total Amount</div>
          <div className="stat-value">₹{(dashboardStats.totalAmount / 100000).toFixed(1)}L</div>
          <span className="stat-badge success">+12% vs last month</span>
        </div>
        <div className="stat-card red">
          <div className="stat-label">Fraud Alerts</div>
          <div className="stat-value">{dashboardStats.fraudAlerts}</div>
          <span className="stat-badge danger">6 HIGH risk</span>
        </div>
        <div className="stat-card amber">
          <div className="stat-label">Approval Rate</div>
          <div className="stat-value">{dashboardStats.approvalRate}%</div>
          <span className="stat-badge success">Healthy</span>
        </div>
      </div>

      {/* Charts row */}
      <div className="two-col">
        <div className="card">
          <div className="card-title">Claims Trend — Last 7 Days</div>
          <div style={{ position: 'relative', height: '200px' }}>
            <canvas ref={lineRef} role="img" aria-label="Line chart showing daily claims trend"></canvas>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Claims by Status</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            {[['#1A7A4A','Approved','78%'],['#C0392B','Rejected','12%'],['#D68910','Pending','10%']].map(([c,l,v]) => (
              <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'var(--text-secondary)' }}>
                <span style={{ width:10, height:10, borderRadius:2, background:c, display:'inline-block' }}></span>
                {l} {v}
              </span>
            ))}
          </div>
          <div style={{ position: 'relative', height: '160px' }}>
            <canvas ref={donutRef} role="img" aria-label="Doughnut chart: Approved 78%, Rejected 12%, Pending 10%">Approved 78%, Rejected 12%, Pending 10%</canvas>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-title">Claim Amount by Doctor (₹K)</div>
        <div style={{ position: 'relative', height: '180px' }}>
          <canvas ref={barRef} role="img" aria-label="Bar chart showing claim amounts by doctor"></canvas>
        </div>
      </div>

      {/* Recent claims */}
      <div className="card">
        <div className="card-title">Recent Claims</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentClaims.map(c => (
              <tr key={c.claim_id}>
                <td className="mono">{c.claim_id}</td>
                <td>{c.patient_name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{c.doctor}</td>
                <td><span className="mono">{c.diagnosis_code}</span> — {c.diagnosis_desc}</td>
                <td className="amount">₹{c.amount.toLocaleString()}</td>
                <td><span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
