import { Router } from "express";

const router = Router();

const articles = [
  {
    id: "1",
    headline: "Ukraine Launches Largest Drone Strike Deep Into Russian Territory",
    snippet: "Ukrainian forces conducted an unprecedented drone attack targeting oil refineries in Saratov Oblast, marking a significant escalation in long-range strike capabilities. Russian air defenses intercepted 40% of the incoming drones.",
    source: "Reuters",
    thumbnailUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80",
    link: "https://reuters.com",
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    category: "war",
    region: "Europe",
    country: "Ukraine",
  },
  {
    id: "2",
    headline: "Gaza Death Toll Surpasses 45,000 as Humanitarian Aid Blocked",
    snippet: "UN agencies warn of catastrophic conditions in northern Gaza as Israeli military operations continue. Food and medicine convoys face repeated delays, with UNRWA reporting unprecedented levels of malnutrition.",
    source: "BBC",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    link: "https://bbc.com",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    category: "war",
    region: "Middle East",
    country: "Palestine",
  },
  {
    id: "3",
    headline: "Oil Markets Surge as Houthi Attacks Disrupt Red Sea Shipping",
    snippet: "Brent crude jumped 3.2% after Houthi forces launched coordinated drone and missile attacks on commercial vessels in the Bab el-Mandeb strait, forcing major shipping companies to reroute around the Cape of Good Hope.",
    source: "Bloomberg",
    thumbnailUrl: "https://images.unsplash.com/photo-1518965088000-fc39593f8dbb?w=400&q=80",
    link: "https://bloomberg.com",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    category: "economy",
    region: "Middle East",
    country: "Yemen",
  },
  {
    id: "4",
    headline: "China Conducts Largest Taiwan Strait Military Exercise in Decade",
    snippet: "The PLA launched a 72-hour live-fire exercise encircling Taiwan following the inauguration of the new Taiwanese president. The US deployed two carrier strike groups to the region in response.",
    source: "Wall Street Journal",
    thumbnailUrl: "https://images.unsplash.com/photo-1474039960517-87d6c1e9e29c?w=400&q=80",
    link: "https://wsj.com",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    category: "war",
    region: "Asia",
    country: "China",
  },
  {
    id: "5",
    headline: "IMF Cuts Global Growth Forecast Amid Geopolitical Fragmentation",
    snippet: "The International Monetary Fund revised its 2024 global growth forecast down to 3.1% from 3.3%, citing escalating trade barriers, conflict spillovers, and tighter monetary conditions in advanced economies.",
    source: "Financial Times",
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    link: "https://ft.com",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    category: "economy",
    region: "Global",
    country: null,
  },
  {
    id: "6",
    headline: "Putin Warns NATO of Nuclear Response if Russia Faces Existential Threat",
    snippet: "In a nationally televised address, President Putin stated that Russia would not hesitate to use tactical nuclear weapons if its territorial integrity was threatened. Western officials called the statement 'irresponsible escalation'.",
    source: "Associated Press",
    thumbnailUrl: "https://images.unsplash.com/photo-1531986362435-16b427eb9c26?w=400&q=80",
    link: "https://apnews.com",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    category: "leader",
    region: "Europe",
    country: "Russia",
  },
  {
    id: "7",
    headline: "Sudan Conflict: 10 Million Displaced in World's Largest Crisis",
    snippet: "The UN High Commissioner for Refugees declared Sudan's conflict the world's largest displacement crisis, with over 10 million people forced from their homes. The RSF has been accused of systematic atrocities in Darfur.",
    source: "Al Jazeera",
    thumbnailUrl: "https://images.unsplash.com/photo-1487107978693-27a1284fa614?w=400&q=80",
    link: "https://aljazeera.com",
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    category: "humanitarian",
    region: "Africa",
    country: "Sudan",
  },
  {
    id: "8",
    headline: "Gold Hits All-Time High of $2,720 as Investors Seek Safe Havens",
    snippet: "Gold prices reached historic levels as geopolitical uncertainty, de-dollarization trends by BRICS nations, and central bank buying drove unprecedented demand for the precious metal.",
    source: "Bloomberg",
    thumbnailUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80",
    link: "https://bloomberg.com",
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    category: "economy",
    region: "Global",
    country: null,
  },
  {
    id: "9",
    headline: "North Korea Tests ICBM Capable of Reaching US Mainland",
    snippet: "North Korea launched a Hwasong-18 solid-fuel ICBM that flew for 86 minutes before landing in the Sea of Japan, demonstrating capability to strike any target in the continental United States.",
    source: "Reuters",
    thumbnailUrl: "https://images.unsplash.com/photo-1562690867-5b23c5a0e4a5?w=400&q=80",
    link: "https://reuters.com",
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    category: "war",
    region: "Asia",
    country: "North Korea",
  },
  {
    id: "10",
    headline: "G7 Nations Pledge $50 Billion Aid Package for Ukraine Using Frozen Russian Assets",
    snippet: "Western leaders finalized a historic deal to loan Ukraine $50 billion backed by interest from $300 billion in frozen Russian central bank assets, marking the first use of state assets as war reparations collateral.",
    source: "BBC",
    thumbnailUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
    link: "https://bbc.com",
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    category: "diplomacy",
    region: "Europe",
    country: "Ukraine",
  },
  {
    id: "11",
    headline: "Myanmar Junta Loses Control of Major Border Cities to Resistance Forces",
    snippet: "The Brotherhood Alliance seized Laukkaing and Chinshwehaw along the Chinese border, controlling a critical trade route worth $1 billion annually. China has called for an immediate ceasefire to protect its economic interests.",
    source: "The Guardian",
    thumbnailUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
    link: "https://guardian.com",
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    category: "war",
    region: "Asia",
    country: "Myanmar",
  },
  {
    id: "12",
    headline: "Iran Nuclear Talks Collapse as Enrichment Reaches 84% Purity",
    snippet: "IAEA inspectors confirmed Iran has enriched uranium to 84% purity, just below weapons-grade 90%. The revelation collapsed ongoing diplomatic talks in Vienna, with the US reinstating full sanctions.",
    source: "Financial Times",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    link: "https://ft.com",
    publishedAt: new Date(Date.now() - 43200000).toISOString(),
    category: "diplomacy",
    region: "Middle East",
    country: "Iran",
  },
  {
    id: "13",
    headline: "Saudi Arabia Cuts Oil Production, OPEC+ Maintains Tight Supply",
    snippet: "Saudi Arabia extended voluntary production cuts of 1 million barrels per day through the year, supporting oil prices above $85 per barrel. US officials criticized the decision as undermining global economic recovery.",
    source: "Bloomberg",
    thumbnailUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    link: "https://bloomberg.com",
    publishedAt: new Date(Date.now() - 50400000).toISOString(),
    category: "economy",
    region: "Middle East",
    country: "Saudi Arabia",
  },
  {
    id: "14",
    headline: "Haiti Gang Violence Forces UN to Approve Kenyan-Led Security Mission",
    snippet: "The UN Security Council approved a 1,000-strong multinational force led by Kenya to restore order in Haiti, where gang federation G9 controls 80% of the capital Port-au-Prince.",
    source: "AP",
    thumbnailUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
    link: "https://apnews.com",
    publishedAt: new Date(Date.now() - 57600000).toISOString(),
    category: "humanitarian",
    region: "Americas",
    country: "Haiti",
  },
  {
    id: "15",
    headline: "Zelensky Addresses Congress: Demands F-16s, Long-Range Missiles",
    snippet: "Ukrainian President Zelensky made an urgent plea to US lawmakers for additional weapons, particularly F-16 fighter jets and ATACMS missiles with 300km range, stating Ukraine cannot hold its current defensive lines without immediate support.",
    source: "Washington Post",
    thumbnailUrl: "https://images.unsplash.com/photo-1553284966-19b8815c7817?w=400&q=80",
    link: "https://washingtonpost.com",
    publishedAt: new Date(Date.now() - 64800000).toISOString(),
    category: "leader",
    region: "Europe",
    country: "Ukraine",
  },
];

router.get("/", (req, res) => {
  const { category, region, sort } = req.query as Record<string, string>;
  let result = [...articles];

  if (category && category !== "all") {
    result = result.filter((a) => a.category === category);
  }
  if (region) {
    result = result.filter((a) =>
      a.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  if (sort === "relevance") {
    result = result.sort((a, b) => (b.category === "war" ? 1 : 0) - (a.category === "war" ? 1 : 0));
  } else {
    // default: recent
    result = result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  res.json(result);
});

export default router;
