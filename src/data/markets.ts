/**
 * Sample market data for layout and design review only.
 * These prices and changes are placeholders, not live quotes.
 * Replace this module with a real market-data feed before launch.
 */

export interface Ticker {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  changePct: number;
  history: number[];
}

// Deterministic sparkline series that ends at the given percentage change.
function makeHistory(seed: string, changePct: number, points = 30): number[] {
  let state = 0;
  for (const ch of seed) state = (state * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };

  const series: number[] = [100];
  for (let i = 1; i < points; i++) {
    series.push(series[i - 1] * (1 + (rand() - 0.5) * 0.024));
  }

  const target = 100 * (1 + changePct / 100);
  const last = series[points - 1];
  return series.map((v, i) => v + (target - last) * (i / (points - 1)));
}

const RAW: Omit<Ticker, 'history'>[] = [
  { symbol: 'ASML', name: 'ASML Holding', exchange: 'Euronext Amsterdam', currency: 'EUR', price: 712.4, changePct: 1.24 },
  { symbol: 'SAP', name: 'SAP SE', exchange: 'Xetra, Frankfurt', currency: 'EUR', price: 218.15, changePct: -0.42 },
  { symbol: 'MC', name: 'LVMH', exchange: 'Euronext Paris', currency: 'EUR', price: 648.9, changePct: -0.87 },
  { symbol: 'NESN', name: 'Nestlé', exchange: 'SIX Swiss Exchange', currency: 'CHF', price: 91.3, changePct: 0.18 },
  { symbol: 'NOVO-B', name: 'Novo Nordisk', exchange: 'Nasdaq Copenhagen', currency: 'DKK', price: 520.1, changePct: -1.12 },
  { symbol: '7203', name: 'Toyota Motor', exchange: 'Tokyo Stock Exchange', currency: 'JPY', price: 2845, changePct: 0.63 },
  { symbol: '005930', name: 'Samsung Electronics', exchange: 'Korea Exchange', currency: 'KRW', price: 71200, changePct: 1.91 },
  { symbol: 'TSM', name: 'TSMC (ADR)', exchange: 'NYSE', currency: 'USD', price: 205.6, changePct: 2.1 },
  { symbol: 'SHEL', name: 'Shell', exchange: 'London Stock Exchange', currency: 'GBP', price: 27.44, changePct: -0.31 },
];

export const TICKERS: Ticker[] = RAW.map((t) => ({
  ...t,
  history: makeHistory(t.symbol, t.changePct),
}));
