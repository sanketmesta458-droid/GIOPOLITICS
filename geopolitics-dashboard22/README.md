# Geopolitics Intelligence Dashboard

A full-stack dark-themed geopolitics intelligence dashboard.

## Structure

```
geopolitics-dashboard/
├── frontend/   → React + Vite + Tailwind CSS (deploy on Vercel)
└── backend/    → Node.js + Express REST API (deploy on Render/Railway)
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev         # runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

## API Endpoints
- GET /api/countries          → all countries (filter by status/region/search)
- GET /api/countries/:name    → country detail
- GET /api/wars               → active conflicts
- GET /api/wars/summary       → war stats
- GET /api/leaders            → world leaders + statements
- GET /api/economy            → global economy indicators
- GET /api/economy/war-impact → war economic impact
- GET /api/news               → news articles (filter by category/region)
- GET /api/dashboard/summary  → dashboard summary
- GET /api/dashboard/risk-index → geopolitical risk index
