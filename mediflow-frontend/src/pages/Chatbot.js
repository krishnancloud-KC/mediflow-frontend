import React, { useState, useRef, useEffect } from 'react';
import { dashboardStats, fraudAlerts, claimsData } from '../data/mockData';

const SUGGESTED = [
  'Total claims this month?',
  'ఈ నెల మొత్తం claims ఎంత?',
  'How many HIGH risk fraud alerts?',
  'Approval rate ఎంత?',
  'Which doctor has most claims?',
  'Show rejected claims',
];

function getBotResponse(input) {
  const q = input.toLowerCase().trim();

  if (q.includes('total') && (q.includes('claim') || q.includes('క్లెయిమ్')))
    return `This month total claims: **${dashboardStats.totalClaims.toLocaleString()}**\n\n✅ Approved: ${dashboardStats.approved} | ❌ Rejected: ${dashboardStats.rejected} | ⏳ Pending: ${dashboardStats.pending}`;

  if ((q.includes('నెల') || q.includes('month')) && q.includes('claim'))
    return `ఈ నెల మొత్తం **${dashboardStats.totalClaims.toLocaleString()}** claims ఉన్నాయి.\n\n✅ Approved: ${dashboardStats.approved}\n❌ Rejected: ${dashboardStats.rejected}\n⏳ Pending: ${dashboardStats.pending}`;

  if (q.includes('fraud') && q.includes('high'))
    return `HIGH risk fraud alerts: **${fraudAlerts.filter(a => a.risk_level === 'HIGH').length}**\n\nThese involve:\n• Amount > ₹50,000\n• Routine checkup (Z00/Z01/Z02) with high amounts\n\nClick Fraud Alerts tab to see full details.`;

  if (q.includes('approval') || q.includes('approve'))
    return `Current approval rate: **${dashboardStats.approvalRate}%** ✅\n\nOut of ${dashboardStats.totalClaims} claims:\n• Approved: ${dashboardStats.approved}\n• Rejected: ${dashboardStats.rejected}\n• Pending: ${dashboardStats.pending}`;

  if (q.includes('రేట్') || q.includes('approval rate'))
    return `Approval rate **${dashboardStats.approvalRate}%** ఉంది. మొత్తం ${dashboardStats.totalClaims} claims లో ${dashboardStats.approved} approved అయ్యాయి.`;

  if (q.includes('doctor') && (q.includes('most') || q.includes('top'))) {
    const map = {};
    claimsData.forEach(c => { map[c.doctor] = (map[c.doctor] || 0) + 1; });
    const top = Object.entries(map).sort((a,b) => b[1]-a[1])[0];
    return `Top doctor by claims: **${top[0]}** with **${top[1]} claims**\n\nFull breakdown:\n${Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([d,c])=>`• ${d}: ${c} claims`).join('\n')}`;
  }

  if (q.includes('reject')) {
    const rej = claimsData.filter(c => c.status === 'REJECTED');
    return `Rejected claims: **${rej.length}**\n\n${rej.map(c => `• ${c.claim_id} — ${c.patient_name} — ₹${c.amount.toLocaleString()}`).join('\n')}`;
  }

  if (q.includes('amount') || q.includes('total amount') || q.includes('మొత్తం అమౌంట్'))
    return `Total claims amount: **₹${(dashboardStats.totalAmount/100000).toFixed(1)} Lakhs** (₹${dashboardStats.totalAmount.toLocaleString()})`;

  if (q.includes('pipeline') || q.includes('పైప్‌లైన్'))
    return `MediFlow Pipeline status: 🟢 **LIVE**\n\n• Cloud Scheduler: Every 5 minutes\n• Cloud Function Gen2: Running\n• BigQuery: raw → clean → mart\n• Fraud Detection: Active\n• AWS S3 Backup: Connected\n• GitHub Actions CI/CD: ✅`;

  if (q.includes('hello') || q.includes('hi') || q.includes('హలో') || q.includes('నమస్కారం'))
    return `Hello! 👋 I'm MediFlow AI Assistant.\n\nI can help you with:\n• Claims statistics & analysis\n• Fraud detection insights\n• Pipeline status\n• Telugu & English queries\n\nWhat would you like to know?`;

  return `I can help with claims data, fraud alerts, and pipeline status.\n\nTry asking:\n• "Total claims this month?"\n• "HIGH risk fraud alerts?"\n• "Approval rate ఎంత?"\n• "Which doctor has most claims?"`;
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hello! 👋 I\'m MediFlow AI Assistant.\n\nI can answer questions about claims, fraud alerts, and pipeline status in Telugu & English.\n\nWhat would you like to know?',
      time: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage(text) {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', text: msg, time: new Date() }]);
    setLoading(true);

    setTimeout(() => {
      const response = getBotResponse(msg);
      setMessages(prev => [...prev, { role: 'bot', text: response, time: new Date() }]);
      setLoading(false);
    }, 600);
  }

  function formatText(text) {
    return text.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <div key={i} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} style={{ lineHeight: 1.6 }} />;
    });
  }

  return (
    <div>
      <div className="page-header">
        <h1>AI Chatbot</h1>
        <p>Telugu & English · Ask about claims, fraud, pipeline status</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'1rem', alignItems:'start' }}>
        {/* Chat window */}
        <div className="card" style={{ padding:0, display:'flex', flexDirection:'column', height:'calc(100vh - 200px)' }}>
          {/* Header */}
          <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:'var(--primary-bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="2" width="16" height="11" rx="2.5" stroke="var(--primary)" strokeWidth="1.5" fill="none"/>
                <path d="M5 16L7 13" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 16L11 13" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="6" cy="7.5" r="1.2" fill="var(--primary)"/>
                <circle cx="9" cy="7.5" r="1.2" fill="var(--primary)"/>
                <circle cx="12" cy="7.5" r="1.2" fill="var(--primary)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight:600, fontSize:14 }}>MediFlow Assistant</div>
              <div style={{ fontSize:11, color:'var(--safe)', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6, height:6, background:'var(--safe)', borderRadius:'50%', display:'inline-block' }}></span>
                Online · Vertex AI powered
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'1.25rem', display:'flex', flexDirection:'column', gap:12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display:'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth:'75%',
                  padding:'10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-page)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: 13,
                  border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                }}>
                  {formatText(msg.text)}
                  <div style={{ fontSize:10, marginTop:6, opacity:0.55, textAlign:'right' }}>
                    {msg.time.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', gap:5, padding:'8px 14px', background:'var(--bg-page)', border:'1px solid var(--border)', borderRadius:'14px 14px 14px 4px', width:'fit-content' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text-muted)', display:'inline-block', animation:`bounce 1.2s ${i*0.2}s infinite` }}></span>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid var(--border)', display:'flex', gap:8 }}>
            <input
              style={{ flex:1, padding:'10px 14px', border:'1px solid var(--border)', borderRadius:8, fontSize:13, fontFamily:'var(--font)', outline:'none', color:'var(--text-primary)', background:'var(--bg-page)' }}
              placeholder="Ask in Telugu or English..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              style={{ padding:'10px 18px', background:'var(--primary)', color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'var(--font)', transition:'background 0.15s' }}
              onMouseOver={e => e.target.style.background='var(--primary-light)'}
              onMouseOut={e => e.target.style.background='var(--primary)'}
            >
              Send
            </button>
          </div>
        </div>

        {/* Suggestions panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div className="card">
            <div className="card-title">Suggested Questions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  style={{ padding:'8px 12px', background:'var(--bg-page)', border:'1px solid var(--border)', borderRadius:8, fontSize:12, color:'var(--text-secondary)', cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', transition:'all 0.15s' }}
                  onMouseOver={e => { e.target.style.borderColor='var(--primary)'; e.target.style.color='var(--primary)'; }}
                  onMouseOut={e => { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--text-secondary)'; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Capabilities</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                ['Claims Analysis', 'Total, approved, rejected stats'],
                ['Fraud Insights', 'HIGH/MEDIUM/LOW breakdown'],
                ['Pipeline Status', 'GCP + AWS live status'],
                ['Telugu Support', 'తెలుగులో అడగొచ్చు'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--primary)', marginTop:5, flexShrink:0 }}></span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)' }}>{title}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
