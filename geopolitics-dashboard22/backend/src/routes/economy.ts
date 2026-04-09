import { Router } from "express";

const router = Router();

function genSeries(base: number, length: number, trend: number, volatility: number, startYear = 2016) {
  return Array.from({ length }, (_, i) => ({
    date: `${startYear + i}`,
    value: Math.round((base + trend * i + (Math.random() - 0.5) * volatility) * 100) / 100,
  }));
}

const gdpTrend = [
  { date: "2016", value: 3.4 },
  { date: "2017", value: 3.9 },
  { date: "2018", value: 3.6 },
  { date: "2019", value: 2.9 },
  { date: "2020", value: -3.1 },
  { date: "2021", value: 6.3 },
  { date: "2022", value: 3.5 },
  { date: "2023", value: 3.2 },
  { date: "2024", value: 3.1 },
];

const inflationTrend = [
  { date: "2016", value: 1.6 },
  { date: "2017", value: 2.2 },
  { date: "2018", value: 2.9 },
  { date: "2019", value: 2.1 },
  { date: "2020", value: 0.7 },
  { date: "2021", value: 3.5 },
  { date: "2022", value: 8.8 },
  { date: "2023", value: 5.9 },
  { date: "2024", value: 4.3 },
];

const oilPriceTrend = [
  { date: "Jan", value: 75.2 },
  { date: "Feb", value: 78.4 },
  { date: "Mar", value: 81.1 },
  { date: "Apr", value: 85.3 },
  { date: "May", value: 83.7 },
  { date: "Jun", value: 86.2 },
  { date: "Jul", value: 82.9 },
  { date: "Aug", value: 88.4 },
  { date: "Sep", value: 91.2 },
  { date: "Oct", value: 89.7 },
  { date: "Nov", value: 84.3 },
  { date: "Dec", value: 87.1 },
];

const goldPriceTrend = [
  { date: "Jan", value: 1985 },
  { date: "Feb", value: 2031 },
  { date: "Mar", value: 2180 },
  { date: "Apr", value: 2330 },
  { date: "May", value: 2440 },
  { date: "Jun", value: 2320 },
  { date: "Jul", value: 2390 },
  { date: "Aug", value: 2500 },
  { date: "Sep", value: 2620 },
  { date: "Oct", value: 2720 },
  { date: "Nov", value: 2650 },
  { date: "Dec", value: 2710 },
];

router.get("/", (_req, res) => {
  res.json({
    globalGdpGrowth: 3.1,
    globalInflation: 4.3,
    oilPrice: 87.1,
    goldPrice: 2710,
    oilPriceTrend,
    goldPriceTrend,
    gdpTrend,
    inflationTrend,
    topEconomies: [
      { country: "United States", gdp: 27360, inflation: 3.1, growth: 2.5 },
      { country: "China", gdp: 17700, inflation: 0.7, growth: 4.9 },
      { country: "Germany", gdp: 4080, inflation: 2.8, growth: 0.1 },
      { country: "Japan", gdp: 4230, inflation: 2.9, growth: 1.9 },
      { country: "India", gdp: 3730, inflation: 4.8, growth: 6.7 },
      { country: "United Kingdom", gdp: 3080, inflation: 3.9, growth: 0.3 },
      { country: "France", gdp: 2920, inflation: 2.4, growth: 0.8 },
      { country: "Brazil", gdp: 2080, inflation: 4.6, growth: 2.9 },
    ],
  });
});

router.get("/war-impact", (_req, res) => {
  res.json({
    gdpImpact: -4.2,
    inflationImpact: 2.8,
    tradeImpact: -6.7,
    oilImpact: 18.4,
    gdpTimeline: [
      { date: "2019", value: 3.2 },
      { date: "2020", value: -2.8 },
      { date: "2021", value: 6.1 },
      { date: "2022", value: 0.8 },
      { date: "2023", value: 1.4 },
      { date: "2024", value: 1.9 },
    ],
    inflationTimeline: [
      { date: "2019", value: 2.0 },
      { date: "2020", value: 1.2 },
      { date: "2021", value: 4.7 },
      { date: "2022", value: 10.3 },
      { date: "2023", value: 7.1 },
      { date: "2024", value: 5.2 },
    ],
    tradeTimeline: [
      { date: "2019", value: 24.3 },
      { date: "2020", value: 21.1 },
      { date: "2021", value: 28.5 },
      { date: "2022", value: 19.2 },
      { date: "2023", value: 18.4 },
      { date: "2024", value: 19.8 },
    ],
    energyTimeline: [
      { date: "2019", value: 62.1 },
      { date: "2020", value: 41.5 },
      { date: "2021", value: 71.3 },
      { date: "2022", value: 101.4 },
      { date: "2023", value: 87.2 },
      { date: "2024", value: 87.1 },
    ],
  });
});

export default router;
