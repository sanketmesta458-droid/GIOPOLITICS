import { Router } from "express";

const router = Router();

const wars = [
  {
    id: "russia-ukraine",
    name: "Russia-Ukraine War",
    countries: ["Russia", "Ukraine"],
    startDate: "2022-02-24",
    casualties: 500000,
    type: "interstate",
    status: "active",
    description:
      "Russia's full-scale invasion of Ukraine, the largest conventional warfare conflict in Europe since WWII. Involves massive artillery exchanges, air strikes, naval combat, and drone warfare. Ukraine has received significant Western military and financial support.",
    region: "Europe",
  },
  {
    id: "israel-gaza",
    name: "Israel-Gaza War",
    countries: ["Israel", "Palestine", "Hamas"],
    startDate: "2023-10-07",
    casualties: 45000,
    type: "interstate",
    status: "active",
    description:
      "Following the October 7 Hamas surprise attack on Israel, the IDF launched a comprehensive ground and air campaign in Gaza. The conflict has caused a humanitarian catastrophe with over 2 million people facing starvation.",
    region: "Middle East",
  },
  {
    id: "sudan-civil-war",
    name: "Sudan Civil War",
    countries: ["Sudan", "RSF"],
    startDate: "2023-04-15",
    casualties: 150000,
    type: "civil",
    status: "active",
    description:
      "Armed conflict between the Sudanese Armed Forces and the Rapid Support Forces paramilitary group. The war has created one of the world's worst humanitarian crises with over 8 million displaced.",
    region: "Africa",
  },
  {
    id: "myanmar-civil-war",
    name: "Myanmar Civil War",
    countries: ["Myanmar Military", "PDF", "EAOs"],
    startDate: "2021-02-01",
    casualties: 50000,
    type: "civil",
    status: "escalating",
    description:
      "Following the 2021 military coup, the People's Defence Force alongside ethnic armed organizations have seized significant territory from the junta. Opposition forces now control over 50% of the country.",
    region: "Asia",
  },
  {
    id: "somalia-insurgency",
    name: "Somalia Al-Shabaab Insurgency",
    countries: ["Somalia", "Al-Shabaab"],
    startDate: "2006-01-01",
    casualties: 500000,
    type: "civil",
    status: "active",
    description:
      "Al-Shabaab, an Al-Qaeda affiliate, controls large portions of southern Somalia. The Somali National Army with African Union support has made urban gains, but rural areas remain contested.",
    region: "Africa",
  },
  {
    id: "mali-insurgency",
    name: "Sahel Jihadist Insurgency",
    countries: ["Mali", "Burkina Faso", "Niger", "JNIM", "ISGS"],
    startDate: "2012-01-01",
    casualties: 30000,
    type: "civil",
    status: "escalating",
    description:
      "Jihadist groups including JNIM (linked to Al-Qaeda) and ISGS (linked to ISIS) have expanded across the Sahel. Following the expulsion of French forces, Wagner Group mercenaries operate in Mali and Burkina Faso.",
    region: "Africa",
  },
  {
    id: "haiti-gang-war",
    name: "Haiti Gang War",
    countries: ["Haiti", "G9 Alliance"],
    startDate: "2021-07-07",
    casualties: 5000,
    type: "civil",
    status: "escalating",
    description:
      "Following the assassination of President Jovenel Moïse, gangs led by the G9 federation under Jimmy Chérizier seized control of 80% of Port-au-Prince. A Kenyan-led multinational security mission was approved in 2024.",
    region: "Americas",
  },
  {
    id: "ethiopia-amhara",
    name: "Ethiopia Amhara Conflict",
    countries: ["Ethiopia", "Amhara Fano"],
    startDate: "2023-04-01",
    casualties: 10000,
    type: "civil",
    status: "active",
    description:
      "Following the Tigray peace deal, the Ethiopian government began disarming Amhara regional forces, triggering armed resistance from the Fano militia. Fighting has spread across Amhara and Oromia regions.",
    region: "Africa",
  },
  {
    id: "houthi-red-sea",
    name: "Houthi Red Sea Campaign",
    countries: ["Yemen", "Houthis", "USA", "UK"],
    startDate: "2023-10-19",
    casualties: 200,
    type: "proxy",
    status: "active",
    description:
      "Houthi forces in Yemen have launched drone and missile attacks on commercial shipping in the Red Sea in solidarity with Gaza. The US and UK have conducted airstrikes on Houthi positions in response, disrupting global trade routes.",
    region: "Middle East",
  },
  {
    id: "lebanon-israel",
    name: "Israel-Hezbollah Conflict",
    countries: ["Israel", "Lebanon", "Hezbollah"],
    startDate: "2023-10-08",
    casualties: 4500,
    type: "proxy",
    status: "ceasefire",
    description:
      "Following cross-border exchanges since October 2023, Israel launched a major offensive against Hezbollah in September 2024, killing senior leadership including Hassan Nasrallah. A ceasefire was reached in November 2024.",
    region: "Middle East",
  },
];

router.get("/", (_req, res) => {
  res.json(wars);
});

router.get("/summary", (_req, res) => {
  const atWar = ["ukraine", "russia", "israel", "palestine", "sudan", "myanmar", "somalia", "mali", "haiti"].length;
  const inTension = ["iran", "china", "north-korea", "taiwan", "pakistan", "india", "venezuela", "nigeria", "south-africa", "ethiopia"].length;
  const total = 195;

  res.json({
    totalCountriesAtWar: atWar,
    totalCountriesAtPeace: total - atWar - inTension,
    totalCountriesInTension: inTension,
    activeConflicts: wars.filter((w) => w.status === "active" || w.status === "escalating").length,
    totalCasualties: wars.reduce((sum, w) => sum + (w.casualties || 0), 0),
    mostDangerousRegion: "Middle East",
  });
});

export default router;
