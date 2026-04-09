# Backend — Node.js + Express

## Setup
```bash
npm install
npm run dev      # builds + starts on http://localhost:8080
```

## Routes
src/routes/
├── countries.ts   → GET /countries, GET /countries/:name
├── wars.ts        → GET /wars, GET /wars/summary
├── leaders.ts     → GET /leaders
├── economy.ts     → GET /economy, GET /economy/war-impact
├── news.ts        → GET /news
├── dashboard.ts   → GET /dashboard/summary, GET /dashboard/risk-index
└── health.ts      → GET /healthz

## Add Real Leader Images
Open src/routes/leaders.ts and update the photoUrl field for each leader
with a direct image URL (e.g. from Wikimedia Commons, Cloudinary, etc.)

## Deploy on Render / Railway
1. Push to GitHub
2. Create a new Web Service
3. Build command: npm run build
4. Start command: npm run start
5. Set PORT environment variable (or it defaults to 8080)

## Tech Stack
- Node.js + TypeScript
- Express 5
- Pino (logging)
- esbuild (bundler)
