# 🏥 MediFlow Frontend

> Healthcare Claims Data Engineering Platform — React Dashboard

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org)
[![GCP](https://img.shields.io/badge/GCP-Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)](https://cloud.google.com/run)
[![Cost](https://img.shields.io/badge/Cost-₹0%2Fmonth-brightgreen)](https://cloud.google.com/free)

## ✨ Features

| Page | Description |
|------|-------------|
| 📊 **Dashboard** | Claims overview, trend charts, status breakdown |
| 📋 **Transactions** | Full claims table with filter & search |
| 🚨 **Fraud Alerts** | HIGH/MEDIUM/LOW/SAFE risk detection |
| 🤖 **AI Chatbot** | Telugu & English assistant |

## 🚀 Setup

```bash
# Install
npm install

# Run locally
npm start

# Build
npm run build
```

## ☁️ Deploy to GCP Cloud Run

```bash
gcloud run deploy mediflow-frontend \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080
```

## 📁 Structure

```
src/
├── pages/
│   ├── Dashboard.js     # Charts + stats
│   ├── Transactions.js  # Claims table
│   ├── FraudAlerts.js   # Risk detection
│   └── Chatbot.js       # AI assistant
├── components/
│   └── Navbar.js        # Sidebar navigation
├── data/
│   └── mockData.js      # BigQuery schema mock
└── styles/
    └── App.css          # Global styles
```

## 🔗 Backend

👉 **[mediflow-backend](https://github.com/krishnancloud-KC/mediflow-backend)**

---
*MediFlow | Healthcare Claims | GCP + AWS | April 2026 | ₹0/month*
