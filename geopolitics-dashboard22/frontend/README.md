# Frontend — React + Vite + Tailwind

## Setup
```bash
npm install
npm run dev
```

## Pages
- /            → Global Command Center (dashboard)
- /map         → Interactive world map
- /countries   → Nations database
- /countries/:name → Country detail page
- /leaders     → World leaders monitor
- /news        → Intelligence feed
- /wars        → Active conflicts tracker

## Deploy on Vercel
1. Push to GitHub
2. Import repo in Vercel
3. Set env variable: VITE_API_URL=https://your-backend.onrender.com

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Recharts (charts)
- react-simple-maps (world map)
- Radix UI + shadcn/ui components
- TanStack React Query
- Wouter (routing)
