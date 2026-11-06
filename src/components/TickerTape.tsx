import { TICKERS, type Ticker } from '../data/markets';

const formatPrice = (t: Ticker) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: t.currency,
    maximumFractionDigits: t.price >= 1000 ? 0 : 2,
  }).format(t.price);

function TapeItem({ t }: { t: Ticker }) {
  const up = t.changePct >= 0;
  return (
    <span className="ticker-item">
      <span className="ticker-symbol">{t.symbol}</span>
      <span className="ticker-price">{formatPrice(t)}</span>
      <span className={`ticker-change ${up ? 'is-up' : 'is-down'}`}>
        <span aria-hidden="true">{up ? '▲' : '▼'}</span>
        {up ? '+' : '−'}
        {Math.abs(t.changePct).toFixed(2)}%
      </span>
    </span>
  );
}

/**
 * Scrolling strip of international stock prices, shown under the header on every page.
 * The list is rendered twice so the loop is seamless. The second copy is hidden from
 * screen readers. The animation pauses on hover and is turned off for reduced motion.
 */
export default function TickerTape() {
  return (
    <div className="ticker-tape" role="region" aria-label="International stock prices, sample data">
      <span className="ticker-label">Sample data</span>
      <div className="ticker-track">
        <div className="ticker-group">
          {TICKERS.map((t) => (
            <TapeItem key={t.symbol} t={t} />
          ))}
        </div>
        <div className="ticker-group" aria-hidden="true">
          {TICKERS.map((t) => (
            <TapeItem key={`copy-${t.symbol}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
