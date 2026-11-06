import { TICKERS, type Ticker } from '../data/markets';

const formatPrice = (t: Ticker) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: t.currency,
    maximumFractionDigits: t.price >= 1000 ? 0 : 2,
  }).format(t.price);

function Sparkline({ values, up }: { values: number[]; up: boolean }) {
  const w = 120;
  const h = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      className={`spark ${up ? 'is-up' : 'is-down'}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function TickerTile({ t }: { t: Ticker }) {
  const up = t.changePct >= 0;
  return (
    <article className="tile">
      <header className="tile-head">
        <span className="tile-symbol">{t.symbol}</span>
        <span className="tile-exchange">{t.exchange}</span>
      </header>
      <p className="tile-name">{t.name}</p>
      <p className="tile-price">{formatPrice(t)}</p>
      <p className={`tile-change ${up ? 'is-up' : 'is-down'}`}>
        <span aria-hidden="true">{up ? '▲' : '▼'}</span>
        <span>
          {up ? '+' : '−'}
          {Math.abs(t.changePct).toFixed(2)}%
        </span>
        <span className="sr-only">{up ? 'up' : 'down'} today</span>
      </p>
      <Sparkline values={t.history} up={up} />
    </article>
  );
}

export default function TickerBoard({ compact = false }: { compact?: boolean }) {
  const list = compact ? TICKERS.slice(0, 4) : TICKERS;
  return (
    <div className={`board ${compact ? 'is-compact' : ''}`} role="region" aria-label="International stock tickers">
      <div className="board-head">
        <span className="board-title">Global markets</span>
        <span className="badge">Sample data</span>
      </div>
      <div className="tiles">
        {list.map((t) => (
          <TickerTile key={t.symbol} t={t} />
        ))}
      </div>
    </div>
  );
}
