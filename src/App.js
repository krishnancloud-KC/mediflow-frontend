import React, { useState } from 'react';

const mockClaims = [
  { id:'CLM-1001', patient:'Ravi Kumar', doctor:'Dr. Sharma', code:'A15', desc:'Tuberculosis', amount:48200, status:'APPROVED' },
  { id:'CLM-1002', patient:'Priya Nair', doctor:'Dr. Reddy', code:'Z00', desc:'Routine Checkup', amount:35500, status:'REJECTED' },
  { id:'CLM-1003', patient:'Suresh Babu', doctor:'Dr. Mehta', code:'B20', desc:'HIV', amount:12800, status:'APPROVED' },
  { id:'CLM-1004', patient:'Anita Rao', doctor:'Dr. Iyer', code:'J45', desc:'Asthma', amount:8400, status:'PENDING' },
  { id:'CLM-1005', patient:'Mohammed Ali', doctor:'Dr. Khan', code:'E11', desc:'Diabetes', amount:22100, status:'APPROVED' },
  { id:'CLM-1006', patient:'Lakshmi Devi', doctor:'Dr. Sharma', code:'Z01', desc:'Health Exam', amount:31000, status:'REJECTED' },
  { id:'CLM-1007', patient:'Venkat Rao', doctor:'Dr. Patel', code:'I10', desc:'Hypertension', amount:15600, status:'APPROVED' },
];

const fraudData = [
  { id:'CLM-1002', amount:35500, risk:'HIGH', reason:'Z00 + amount > ₹30,000', doctor:'Dr. Reddy' },
  { id:'CLM-1006', amount:31000, risk:'HIGH', reason:'Z01 + amount > ₹30,000', doctor:'Dr. Sharma' },
  { id:'CLM-1001', amount:48200, risk:'MEDIUM', reason:'Amount ₹20K–₹50K review', doctor:'Dr. Sharma' },
  { id:'CLM-1005', amount:22100, risk:'MEDIUM', reason:'Pending + amount > ₹15K', doctor:'Dr. Khan' },
  { id:'CLM-1003', amount:12800, risk:'LOW', reason:'Non A/B code + amount > ₹5K', doctor:'Dr. Mehta' },
  { id:'CLM-1004', amount:8400, risk:'SAFE', reason:'No fraud rules triggered', doctor:'Dr. Iyer' },
];

const riskColor = { HIGH:'#C0392B', MEDIUM:'#D68910', LOW:'#1A5276', SAFE:'#1A7A4A' };
const riskBg = { HIGH:'#FDEDEC', MEDIUM:'#FEF9E7', LOW:'#EBF5FB', SAFE:'#E9F7EF' };
const statusColor = { APPROVED:'#1A7A4A', REJECTED:'#C0392B', PENDING:'#D68910' };
const statusBg = { APPROVED:'#E9F7EF', REJECTED:'#FDEDEC', PENDING:'#FEF9E7' };

function Sidebar({ page, setPage }) {
  const items = [
    { id:'dashboard', label:'📊 Dashboard' },
    { id:'transactions', label:'📋 Transactions' },
    { id:'fraud', label:'🚨 Fraud Alerts' },
    { id:'chatbot', label:'🤖 AI Chatbot' },
  ];
  return (
    <div style={{width:220,minHeight:'100vh',background:'#0D1B2A',display:'flex',flexDirection:'column',padding:'0'}}>
      <div style={{padding:'1.5rem 1.25rem',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,background:'#0F6E56',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>+</div>
          <div>
            <div style={{color:'white',fontWeight:700,fontSize:15}}>MediFlow</div>
            <div style={{color:'rgba(255,255,255,0.4)',fontSize:11}}>Claims Platform</div>
          </div>
        </div>
      </div>
      <div style={{padding:'0.75rem'}}>
        {items.map(i => (
          <div key={i.id} onClick={() => setPage(i.id)}
            style={{padding:'10px 12px',borderRadius:8,cursor:'pointer',marginBottom:2,fontSize:13,
              background: page===i.id ? 'rgba(15,110,86,0.25)' : 'transparent',
              color: page===i.id ? '#4DCBA4' : 'rgba(255,255,255,0.5)',
              fontWeight: page===i.id ? 600 : 400}}>
            {i.label}
          </div>
        ))}
      </div>
      <div style={{marginTop:'auto',padding:'1rem 1.25rem',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#4DCBA4'}}></div>
          <div style={{fontSize:11,color:'#4DCBA4'}}>Pipeline Live · Every 5min</div>
        </div>
        <div style={{display:'flex',gap:6}}>
          {['GCP','AWS','BigQuery'].map(b => (
            <span key={b} style={{fontSize:10,padding:'2px 6px',background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.4)',borderRadius:4}}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:22,fontWeight:700,color:'#1A2332'}}>Dashboard</h1>
        <p style={{color:'#5A6A7A',fontSize:13}}>Healthcare Claims Overview · GCP BigQuery · April 2026</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
        {[
          {label:'Total Claims',value:'1,284',badge:'This month',bc:'#EBF5FB',tc:'#1A5276',border:'#185FA5'},
          {label:'Total Amount',value:'₹24.6L',badge:'+12% vs last month',bc:'#E9F7EF',tc:'#1A7A4A',border:'#0F6E56'},
          {label:'Fraud Alerts',value:'43',badge:'6 HIGH risk',bc:'#FDEDEC',tc:'#C0392B',border:'#C0392B'},
          {label:'Approval Rate',value:'78%',badge:'Healthy',bc:'#E9F7EF',tc:'#1A7A4A',border:'#0F6E56'},
        ].map(s => (
          <div key={s.label} style={{background:'white',borderRadius:12,padding:'1.25rem 1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)',borderTop:`3px solid ${s.border}`}}>
            <div style={{fontSize:12,color:'#8A9AB0',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:8}}>{s.label}</div>
            <div style={{fontSize:26,fontWeight:700,color:'#1A2332',marginBottom:8}}>{s.value}</div>
            <span style={{fontSize:11,padding:'3px 8px',borderRadius:20,background:s.bc,color:s.tc,fontWeight:500}}>{s.badge}</span>
          </div>
        ))}
      </div>
      <div style={{background:'white',borderRadius:12,padding:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)',marginBottom:16}}>
        <div style={{fontWeight:600,marginBottom:16}}>Recent Claims</div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr style={{background:'#FAFBFC'}}>
              {['Claim ID','Patient','Doctor','Diagnosis','Amount','Status'].map(h => (
                <th key={h} style={{textAlign:'left',padding:'10px 12px',fontSize:11,color:'#8A9AB0',fontWeight:600,textTransform:'uppercase',borderBottom:'1px solid #E8ECF0'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockClaims.map(c => (
              <tr key={c.id} style={{borderBottom:'1px solid #F0F4F8'}}>
                <td style={{padding:'12px',color:'#0F6E56',fontWeight:500,fontFamily:'monospace'}}>{c.id}</td>
                <td style={{padding:'12px'}}>{c.patient}</td>
                <td style={{padding:'12px',color:'#5A6A7A'}}>{c.doctor}</td>
                <td style={{padding:'12px'}}><span style={{background:'#F4F6F8',padding:'2px 6px',borderRadius:4,fontSize:11,fontFamily:'monospace'}}>{c.code}</span> {c.desc}</td>
                <td style={{padding:'12px',fontWeight:600,fontFamily:'monospace'}}>₹{c.amount.toLocaleString()}</td>
                <td style={{padding:'12px'}}><span style={{padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:600,background:statusBg[c.status],color:statusColor[c.status]}}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Transactions() {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? mockClaims : mockClaims.filter(c => c.status === filter);
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:22,fontWeight:700,color:'#1A2332'}}>Transactions</h1>
        <p style={{color:'#5A6A7A',fontSize:13}}>All claims · BigQuery mediflow_raw.raw_claims</p>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        {['ALL','APPROVED','REJECTED','PENDING'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{padding:'6px 16px',borderRadius:20,border:'1px solid',fontSize:12,fontWeight:500,cursor:'pointer',
              background: filter===f ? '#0F6E56' : 'white',
              color: filter===f ? 'white' : '#5A6A7A',
              borderColor: filter===f ? '#0F6E56' : '#E8ECF0'}}>
            {f === 'ALL' ? 'All Claims' : f}
          </button>
        ))}
      </div>
      <div style={{background:'white',borderRadius:12,padding:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr style={{background:'#FAFBFC'}}>
              {['Claim ID','Patient','Doctor','Diagnosis','Amount','Status'].map(h => (
                <th key={h} style={{textAlign:'left',padding:'10px 12px',fontSize:11,color:'#8A9AB0',fontWeight:600,textTransform:'uppercase',borderBottom:'1px solid #E8ECF0'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{borderBottom:'1px solid #F0F4F8'}}>
                <td style={{padding:'12px',color:'#0F6E56',fontWeight:500,fontFamily:'monospace'}}>{c.id}</td>
                <td style={{padding:'12px',fontWeight:500}}>{c.patient}</td>
                <td style={{padding:'12px',color:'#5A6A7A'}}>{c.doctor}</td>
                <td style={{padding:'12px'}}><span style={{background:'#F4F6F8',padding:'2px 6px',borderRadius:4,fontSize:11,fontFamily:'monospace'}}>{c.code}</span> {c.desc}</td>
                <td style={{padding:'12px',fontWeight:600,fontFamily:'monospace'}}>₹{c.amount.toLocaleString()}</td>
                <td style={{padding:'12px'}}><span style={{padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:600,background:statusBg[c.status],color:statusColor[c.status]}}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:12,fontSize:12,color:'#8A9AB0'}}>Showing {filtered.length} of {mockClaims.length} claims</div>
      </div>
    </div>
  );
}

function FraudAlerts() {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? fraudData : fraudData.filter(f => f.risk === filter);
  const counts = {HIGH:0,MEDIUM:0,LOW:0,SAFE:0};
  fraudData.forEach(f => counts[f.risk]++);
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:22,fontWeight:700,color:'#1A2332'}}>Fraud Alerts</h1>
        <p style={{color:'#5A6A7A',fontSize:13}}>Real-time fraud detection · BigQuery mediflow_mart.fraud_alerts</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
        {Object.entries(counts).map(([level, count]) => (
          <div key={level} onClick={() => setFilter(filter===level?'ALL':level)}
            style={{background:'white',borderRadius:12,padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)',
              borderLeft:`3px solid ${riskColor[level]}`,cursor:'pointer'}}>
            <div style={{fontSize:11,fontWeight:700,color:riskColor[level],textTransform:'uppercase',marginBottom:6}}>{level}</div>
            <div style={{fontSize:28,fontWeight:700,color:'#1A2332'}}>{count}</div>
            <div style={{fontSize:11,color:'#8A9AB0'}}>alerts</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        {['ALL','HIGH','MEDIUM','LOW','SAFE'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{padding:'6px 16px',borderRadius:20,border:'1px solid',fontSize:12,fontWeight:500,cursor:'pointer',
              background: filter===f ? '#0F6E56' : 'white',
              color: filter===f ? 'white' : '#5A6A7A',
              borderColor: filter===f ? '#0F6E56' : '#E8ECF0'}}>
            {f}
          </button>
        ))}
      </div>
      <div style={{background:'white',borderRadius:12,padding:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr style={{background:'#FAFBFC'}}>
              {['Claim ID','Doctor','Amount','Risk Level','Reason'].map(h => (
                <th key={h} style={{textAlign:'left',padding:'10px 12px',fontSize:11,color:'#8A9AB0',fontWeight:600,textTransform:'uppercase',borderBottom:'1px solid #E8ECF0'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} style={{borderBottom:'1px solid #F0F4F8'}}>
                <td style={{padding:'12px',color:'#0F6E56',fontWeight:500,fontFamily:'monospace'}}>{f.id}</td>
                <td style={{padding:'12px',color:'#5A6A7A'}}>{f.doctor}</td>
                <td style={{padding:'12px',fontWeight:600,fontFamily:'monospace'}}>₹{f.amount.toLocaleString()}</td>
                <td style={{padding:'12px'}}><span style={{padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,background:riskBg[f.risk],color:riskColor[f.risk]}}>{f.risk}</span></td>
                <td style={{padding:'12px',color:'#5A6A7A',fontSize:12}}>{f.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([{role:'bot',text:'Hello! 👋 I\'m MediFlow AI. Ask me about claims, fraud alerts in Telugu or English!'}]);
  const [input, setInput] = useState('');

  function reply(q) {
    const t = q.toLowerCase();
    if (t.includes('total') || t.includes('claim') || t.includes('క్లెయిమ్')) return 'Total claims this month: **1,284** ✅ Approved: 1002 | ❌ Rejected: 154 | ⏳ Pending: 128';
    if (t.includes('fraud') || t.includes('high')) return 'HIGH risk fraud alerts: **2** 🔴\n\nCLM-1002: Z00 + ₹35,500\nCLM-1006: Z01 + ₹31,000';
    if (t.includes('approval') || t.includes('రేట్')) return 'Approval rate: **78%** ✅\n1,002 approved out of 1,284 claims';
    if (t.includes('amount') || t.includes('అమౌంట్')) return 'Total claims amount: **₹24.6 Lakhs** 💰';
    if (t.includes('pipeline') || t.includes('పైప్')) return 'Pipeline status: 🟢 LIVE\n\nCloud Scheduler → Cloud Function → BigQuery → Fraud Detection → AWS S3';
    if (t.includes('hello') || t.includes('hi') || t.includes('హలో')) return 'Hello! 👋 Ask me about claims, fraud, pipeline status in Telugu or English!';
    return 'I can help with claims data, fraud alerts & pipeline status.\n\nTry: "Total claims?" or "Fraud alerts?" or "Approval rate ఎంత?"';
  }

  function send() {
    if (!input.trim()) return;
    const userMsg = {role:'user', text:input};
    setMessages(prev => [...prev, userMsg, {role:'bot', text:reply(input)}]);
    setInput('');
  }

  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:22,fontWeight:700,color:'#1A2332'}}>AI Chatbot</h1>
        <p style={{color:'#5A6A7A',fontSize:13}}>Telugu & English · Ask about claims, fraud, pipeline</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:16}}>
        <div style={{background:'white',borderRadius:12,boxShadow:'0 1px 3px rgba(0,0,0,0.06)',display:'flex',flexDirection:'column',height:'70vh'}}>
          <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid #E8ECF0',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,background:'#E9F7EF',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🤖</div>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>MediFlow Assistant</div>
              <div style={{fontSize:11,color:'#1A7A4A'}}>🟢 Online</div>
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'1rem',display:'flex',flexDirection:'column',gap:10}}>
            {messages.map((m,i) => (
              <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                <div style={{maxWidth:'75%',padding:'10px 14px',borderRadius:m.role==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px',
                  background:m.role==='user'?'#0F6E56':'#F4F6F8',color:m.role==='user'?'white':'#1A2332',fontSize:13,whiteSpace:'pre-line'}}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:'1rem',borderTop:'1px solid #E8ECF0',display:'flex',gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Ask in Telugu or English..."
              style={{flex:1,padding:'10px 14px',border:'1px solid #E8ECF0',borderRadius:8,fontSize:13,outline:'none'}}/>
            <button onClick={send}
              style={{padding:'10px 20px',background:'#0F6E56',color:'white',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>
              Send
            </button>
          </div>
        </div>
        <div style={{background:'white',borderRadius:12,padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Try asking:</div>
          {['Total claims this month?','ఈ నెల క్లెయిమ్స్ ఎంత?','HIGH fraud alerts?','Approval rate ఎంత?','Pipeline status?'].map(s => (
            <div key={s} onClick={() => { setInput(s); }}
              style={{padding:'8px 10px',background:'#F4F6F8',borderRadius:8,marginBottom:6,fontSize:12,color:'#5A6A7A',cursor:'pointer'}}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('dashboard');
  const pages = { dashboard:<Dashboard/>, transactions:<Transactions/>, fraud:<FraudAlerts/>, chatbot:<Chatbot/> };
  return (
    <div style={{display:'flex',minHeight:'100vh',fontFamily:"'Segoe UI',sans-serif"}}>
      <Sidebar page={page} setPage={setPage}/>
      <main style={{flex:1,padding:'2rem',background:'#F4F6F8',overflowY:'auto'}}>
        {pages[page]}
      </main>
    </div>
  );
}

export default App;