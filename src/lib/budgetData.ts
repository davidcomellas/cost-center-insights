// Dades extretes del PDF "Còpia de control de gestió" - Bloc NOVEMBRE 11
// Font: Anàlisi per centre de cost - Ingressos, Despeses i Inversions mes 2025

export interface CentreCostData {
  nom: string;
  ingressos: {
    acumulat: number;
    previst: number;
  };
  despeses: {
    acumulat: number;
    previst: number;
  };
  inversions: {
    acumulat: number;
    previst: number;
  };
}

export const centresCostData: CentreCostData[] = [
  {
    nom: "Lleida-Alguaire",
    ingressos: { acumulat: 1010385, previst: 1102238 },
    despeses: { acumulat: 5799850, previst: 6327109 },
    inversions: { acumulat: 2868806, previst: 3129607 },
  },
  {
    nom: "Andorra-La Seu",
    ingressos: { acumulat: 303514, previst: 331107 },
    despeses: { acumulat: 1589419, previst: 1733911 },
    inversions: { acumulat: 106619, previst: 116312 },
  },
  {
    nom: "Cerdanya",
    ingressos: { acumulat: 116815, previst: 127435 },
    despeses: { acumulat: 153183, previst: 167109 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Barcelona",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 174264, previst: 190106 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Girona",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 800779, previst: 873577 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Reus",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 447737, previst: 488441 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Heliports+Sabadell",
    ingressos: { acumulat: 0, previst: 0 },
    despeses: { acumulat: 81007, previst: 88371 },
    inversions: { acumulat: 0, previst: 0 },
  },
  {
    nom: "Serveis centrals i altres",
    ingressos: { acumulat: 563420, previst: 614640 },
    despeses: { acumulat: 945982, previst: 1031980 },
    inversions: { acumulat: 39601, previst: 43202 },
  },
];

// Calcular totals
export const totals = {
  ingressos: {
    acumulat: centresCostData.reduce((sum, c) => sum + c.ingressos.acumulat, 0),
    previst: centresCostData.reduce((sum, c) => sum + c.ingressos.previst, 0),
  },
  despeses: {
    acumulat: centresCostData.reduce((sum, c) => sum + c.despeses.acumulat, 0),
    previst: centresCostData.reduce((sum, c) => sum + c.despeses.previst, 0),
  },
  inversions: {
    acumulat: centresCostData.reduce((sum, c) => sum + c.inversions.acumulat, 0),
    previst: centresCostData.reduce((sum, c) => sum + c.inversions.previst, 0),
  },
};

// Format currency
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

// Colors per als gràfics
export const chartColors = [
  "hsl(215, 80%, 35%)",   // Primary blue
  "hsl(168, 65%, 40%)",   // Teal
  "hsl(38, 92%, 50%)",    // Amber
  "hsl(280, 65%, 50%)",   // Purple
  "hsl(330, 70%, 50%)",   // Pink
  "hsl(190, 70%, 45%)",   // Cyan
  "hsl(15, 80%, 50%)",    // Orange
  "hsl(260, 50%, 45%)",   // Indigo
];
