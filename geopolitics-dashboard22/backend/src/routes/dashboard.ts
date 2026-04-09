import { Router } from "express";

const router = Router();

router.get("/summary", (_req, res) => {
  res.json({
    totalConflicts: 10,
    countriesAtWar: 9,
    countriesAtPeace: 168,
    countriesInTension: 18,
    globalRiskScore: 7.2,
    oilPrice: 87.1,
    goldPrice: 2710,
    globalInflation: 4.3,
    recentAlerts: [
      "BREAKING: North Korea launches ICBM test over Sea of Japan",
      "Ukraine drones strike Russian oil refineries in Saratov Oblast",
      "Gaza death toll surpasses 45,000 — UN warns of imminent famine",
      "China PLA conducts live-fire exercises encircling Taiwan",
      "Sudan: RSF accused of mass atrocities in Darfur — ICC opens investigation",
      "Oil surges 3.2% as Houthi attacks disrupt Red Sea shipping lanes",
      "Gold hits all-time high of $2,720 amid safe-haven demand",
      "G7 finalizes $50 billion Ukraine loan backed by frozen Russian assets",
    ],
  });
});

router.get("/risk-index", (_req, res) => {
  res.json({
    score: 7.2,
    level: "high",
    trend: "worsening",
    history: [
      { date: "Jan", value: 6.1 },
      { date: "Feb", value: 6.4 },
      { date: "Mar", value: 6.9 },
      { date: "Apr", value: 7.0 },
      { date: "May", value: 6.7 },
      { date: "Jun", value: 7.1 },
      { date: "Jul", value: 7.3 },
      { date: "Aug", value: 7.5 },
      { date: "Sep", value: 7.4 },
      { date: "Oct", value: 7.2 },
      { date: "Nov", value: 7.4 },
      { date: "Dec", value: 7.2 },
    ],
    components: [
      { name: "Active Conflicts", score: 8.9, weight: 0.35 },
      { name: "Nuclear Threat", score: 7.4, weight: 0.25 },
      { name: "Economic Instability", score: 6.8, weight: 0.20 },
      { name: "Political Fragility", score: 7.1, weight: 0.12 },
      { name: "Humanitarian Crisis", score: 8.2, weight: 0.08 },
    ],
  });
});

export default router;
