// Dades completes per al Seguiment Econòmic APC
// Font: Control de Gestió - Novembre 2025

// ============ EVOLUCIÓ HISTÒRICA ============
export const evolucioHistorica = {
  anys: [2021, 2022, 2023, 2024, 2025],
  personal: [1200000, 1280000, 1350000, 1459000, 1389000],
  capitol2: [8500000, 8900000, 9200000, 9551000, 10274886],
  altresCapitols: [80000, 85000, 90000, 33000, 84435],
  inversions: [2800000, 3100000, 3200000, 3436000, 4322979],
  ingressosMercat: [2200000, 2500000, 2700000, 2913000, 1010000],
  transferencies: [8500000, 9200000, 9800000, 10447000, 7527000],
};

// ============ EXECUCIÓ PRESSUPOSTÀRIA ============
export const execucioPressuposta = {
  despeses: {
    mensual: 9999384,
    estimacioFinal: 11060029,
    sacc: 11764654,
    pressupost: 11764654,
  },
  ingressos: {
    mensual: 8827486,
    estimacioFinal: 8250228,
    sacc: 8976152,
    pressupost: 8976152,
  },
  inversions: {
    mensual: 3015027,
    estimacioFinal: 4462983,
    sacc: 4322979,
    pressupost: 4322979,
  },
  romanent: {
    capitol2: 2825252,
    capitol8: 800000,
  },
  kpis: {
    sobrantDespesa: 36750,
    sobrantTotalPressupost: 165000,
    percentatgeInversio: 69.7,
  },
};

// ============ CENTRES DE COST (ja existent) ============
export interface CentreCostData {
  nom: string;
  codi: string;
  ingressos: { acumulat: number; previst: number };
  despeses: { acumulat: number; previst: number };
  inversions: { acumulat: number; previst: number };
}

export const centresCost: CentreCostData[] = [
  {
    nom: "Lleida-Alguaire",
    codi: "LLEI",
    ingressos: { acumulat: 1010385, previst: 1102238 },
    despeses: { acumulat: 5799850, previst: 6327109 },
    inversions: { acumulat: 2868806, previst: 3129607 },
  },
  {
    nom: "Andorra-La Seu",
    codi: "LESU",
    ingressos: { acumulat: 303514, previst: 331107 },
    despeses: { acumulat: 1589419, previst: 1733911 },
    inversions: { acumulat: 106619, previst: 116312 },
  },
  {
    nom: "Cerdanya",
    codi: "LECD",
    ingressos: { acumulat: 116815, previst: 127435 },
    despeses: { acumulat: 153183, previst: 167109 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Barcelona",
    codi: "BCN",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 174264, previst: 190106 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Girona",
    codi: "GRO",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 800779, previst: 873577 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Reus",
    codi: "REU",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 447737, previst: 488441 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Heliports+Sabadell",
    codi: "HELI",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 81007, previst: 88371 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Serveis centrals i altres",
    codi: "SSCC",
    ingressos: { acumulat: 563420, previst: 614640 },
    despeses: { acumulat: 945982, previst: 1031980 },
    inversions: { acumulat: 39601, previst: 43202 },
  },
];

// ============ DETALL AEROPORTS ============
export interface DetallAeroport {
  nom: string;
  codi: string;
  ingressos: {
    hangars: { mes: number; acumulat: number; estimacio: number; pressupost: number };
    lloguer: { mes: number; acumulat: number; estimacio: number; pressupost: number };
    tarifes: { mes: number; acumulat: number; estimacio: number; pressupost: number };
    total: { mes: number; acumulat: number; estimacio: number; pressupost: number };
  };
  despeses: {
    assegurances: number;
    bombers: number;
    controlAeri: number;
    fuelling: number;
    handling: number;
    impacteAmbiental: number;
    manteniments: number;
    mantenimentsVaris: number;
    meteorologia: number;
    personal: number;
    publicitat: number;
    seguretat: number;
    serveis: number;
    professionals: number;
    altres: number;
    total: { mes: number; acumulat: number; estimacio: number; pressupost: number };
  };
  resultat: { mes: number; acumulat: number; estimacio: number; pressupost: number };
}

export const detallAeroports: DetallAeroport[] = [
  {
    nom: "Lleida-Alguaire",
    codi: "LLEI",
    ingressos: {
      hangars: { mes: 0, acumulat: 317944, estimacio: 346848, pressupost: 247391 },
      lloguer: { mes: 0, acumulat: 159291, estimacio: 173772, pressupost: 123944 },
      tarifes: { mes: 0, acumulat: 353135, estimacio: 385238, pressupost: 274773 },
      total: { mes: 830369, acumulat: 830369, estimacio: 905858, pressupost: 646107 },
    },
    despeses: {
      assegurances: 177125,
      bombers: 364132,
      controlAeri: 1076748,
      fuelling: 184100,
      handling: 178160,
      impacteAmbiental: 385815,
      manteniments: 493807,
      mantenimentsVaris: 158189,
      meteorologia: 0,
      personal: 554192,
      publicitat: 155957,
      seguretat: 543520,
      serveis: 162670,
      professionals: 536680,
      altres: 101112,
      total: { mes: 5072207, acumulat: 5072207, estimacio: 5533317, pressupost: 7964425 },
    },
    resultat: { mes: 0, acumulat: -4241838, estimacio: -4627459, pressupost: -7318318 },
  },
  {
    nom: "Andorra-La Seu",
    codi: "LESU",
    ingressos: {
      hangars: { mes: 0, acumulat: 182523, estimacio: 199116, pressupost: 130059 },
      lloguer: { mes: 0, acumulat: 10469, estimacio: 11421, pressupost: 7460 },
      tarifes: { mes: 0, acumulat: 94184, estimacio: 102747, pressupost: 67112 },
      total: { mes: 287176, acumulat: 287176, estimacio: 313283, pressupost: 204631 },
    },
    despeses: {
      assegurances: 43205,
      bombers: 158177,
      controlAeri: 303790,
      fuelling: 0,
      handling: 88045,
      impacteAmbiental: 22945,
      manteniments: 76556,
      mantenimentsVaris: 79926,
      meteorologia: 11535,
      personal: 244055,
      publicitat: 3166,
      seguretat: 249802,
      serveis: 44062,
      professionals: 191979,
      altres: 89191,
      total: { mes: 1606435, acumulat: 1606435, estimacio: 1752474, pressupost: 2864726 },
    },
    resultat: { mes: 0, acumulat: -1319259, estimacio: -1439192, pressupost: -2660095 },
  },
  {
    nom: "Cerdanya",
    codi: "LECD",
    ingressos: {
      hangars: { mes: 0, acumulat: 11768, estimacio: 12838, pressupost: 2207 },
      lloguer: { mes: 0, acumulat: 457, estimacio: 498, pressupost: 86 },
      tarifes: { mes: 0, acumulat: 90498, estimacio: 98725, pressupost: 16970 },
      total: { mes: 102723, acumulat: 102723, estimacio: 112061, pressupost: 19262 },
    },
    despeses: {
      assegurances: 0,
      bombers: 0,
      controlAeri: 0,
      fuelling: 0,
      handling: 0,
      impacteAmbiental: 0,
      manteniments: 59320,
      mantenimentsVaris: 1880,
      meteorologia: 0,
      personal: 44110,
      publicitat: 0,
      seguretat: 0,
      serveis: 7663,
      professionals: 35950,
      altres: 2291,
      total: { mes: 151214, acumulat: 151214, estimacio: 164961, pressupost: 230879 },
    },
    resultat: { mes: 0, acumulat: -48491, estimacio: -52900, pressupost: -211617 },
  },
];

// ============ COMERCIAL / PROMOCIÓ ============
export const promocio = {
  ingressos: [
    { concepte: "Conveni Diputació Lleida", acumulat: 144000, estimacio: 180000, pressupost: 180000 },
    { concepte: "Conveni Ajuntament Barcelona", acumulat: 40000, estimacio: 40000, pressupost: 40000 },
    { concepte: "Conveni Govern Andorra", acumulat: 411964, estimacio: 411964, pressupost: 450000 },
  ],
  despeses: [
    { aeroport: "BCN", concepte: "CDRA", acumulat: 0, estimacio: 0, pressupost: 0 },
    { aeroport: "GRO", concepte: "GROwing Girona", acumulat: 756312, estimacio: 825608, pressupost: 825608 },
    { aeroport: "REU", concepte: "Promoció aeroport de Reus", acumulat: 429917, estimacio: 469000, pressupost: 469000 },
    { aeroport: "LLEI", concepte: "Promoció rutes Lleida", acumulat: 702500, estimacio: 750000, pressupost: 750000 },
  ],
  totals: {
    ingressos: { acumulat: 595964, estimacio: 631964, pressupost: 670000 },
    despeses: { acumulat: 1888729, estimacio: 2044608, pressupost: 2044608 },
    resultat: { acumulat: -1292765, estimacio: -1412644, pressupost: -1374608 },
  },
};

// ============ CLIENTS ============
export interface Client {
  nom: string;
  aeroport: string;
  facturat: number;
  cobrat: number;
  estimacio: number;
  pressupost: number;
  deute: number;
}

export const clients: Client[] = [
  { nom: "BAA Training", aeroport: "LLEI", facturat: 180000, cobrat: 165000, estimacio: 200000, pressupost: 200000, deute: 15000 },
  { nom: "CESDA", aeroport: "LLEI", facturat: 120000, cobrat: 110000, estimacio: 130000, pressupost: 130000, deute: 10000 },
  { nom: "Volotea", aeroport: "LLEI", facturat: 85000, cobrat: 75000, estimacio: 95000, pressupost: 100000, deute: 10000 },
  { nom: "Air France", aeroport: "LLEI", facturat: 45000, cobrat: 40000, estimacio: 50000, pressupost: 50000, deute: 5000 },
  { nom: "Aeronpark", aeroport: "LLEI", facturat: 60000, cobrat: 55000, estimacio: 65000, pressupost: 70000, deute: 5000 },
  { nom: "New Space", aeroport: "LLEI", facturat: 35000, cobrat: 30000, estimacio: 40000, pressupost: 45000, deute: 5000 },
  { nom: "Andorra Aviation", aeroport: "LESU", facturat: 95000, cobrat: 85000, estimacio: 100000, pressupost: 110000, deute: 10000 },
  { nom: "Hangars Cerdanya", aeroport: "LECD", facturat: 25000, cobrat: 22000, estimacio: 28000, pressupost: 30000, deute: 3000 },
];

// ============ PROJECTES EUROPEUS ============
export interface ProjecteEuropeu {
  nom: string;
  ratioPressuInici: number;
  dataFi: string;
  pressuTotal: number;
  pressuAPC: number;
  percentatgeSubv: number;
  subvAPC: number;
  pressuSubvExercici: number;
  pressuSubvTramitacio: number;
}

export const projectesEuropeus: ProjecteEuropeu[] = [
  { nom: "2roldub", ratioPressuInici: 85, dataFi: "2026-12-31", pressuTotal: 1500000, pressuAPC: 450000, percentatgeSubv: 75, subvAPC: 337500, pressuSubvExercici: 120000, pressuSubvTramitacio: 80000 },
  { nom: "PRioM", ratioPressuInici: 60, dataFi: "2025-06-30", pressuTotal: 2200000, pressuAPC: 680000, percentatgeSubv: 70, subvAPC: 476000, pressuSubvExercici: 180000, pressuSubvTramitacio: 95000 },
  { nom: "Beejbc", ratioPressuInici: 45, dataFi: "2027-03-31", pressuTotal: 980000, pressuAPC: 320000, percentatgeSubv: 80, subvAPC: 256000, pressuSubvExercici: 85000, pressuSubvTramitacio: 60000 },
  { nom: "Sormilb", ratioPressuInici: 30, dataFi: "2026-09-30", pressuTotal: 1800000, pressuAPC: 520000, percentatgeSubv: 65, subvAPC: 338000, pressuSubvExercici: 95000, pressuSubvTramitacio: 45000 },
  { nom: "EuBest", ratioPressuInici: 70, dataFi: "2025-12-31", pressuTotal: 3200000, pressuAPC: 890000, percentatgeSubv: 75, subvAPC: 667500, pressuSubvExercici: 250000, pressuSubvTramitacio: 120000 },
  { nom: "Velca", ratioPressuInici: 55, dataFi: "2026-06-30", pressuTotal: 1100000, pressuAPC: 380000, percentatgeSubv: 70, subvAPC: 266000, pressuSubvExercici: 110000, pressuSubvTramitacio: 70000 },
];

// ============ UTILITATS ============
export const formatCurrency = (value: number): string => {
  if (value === 0) return "-";
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const formatted = new Intl.NumberFormat("ca-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absValue);
  return isNegative ? `-${formatted} €` : `${formatted} €`;
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const chartColors = [
  "hsl(215, 80%, 35%)",
  "hsl(168, 65%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 50%)",
  "hsl(330, 70%, 50%)",
  "hsl(190, 70%, 45%)",
  "hsl(15, 80%, 50%)",
  "hsl(260, 50%, 45%)",
];
