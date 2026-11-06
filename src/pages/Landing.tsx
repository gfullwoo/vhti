import { Link } from 'react-router-dom';
import TickerBoard from '../components/TickerBoard';

const WHY_STOCKS = [
  {
    title: 'Reach beyond your home market',
    body: 'Companies across Europe, Asia and North America are listed on exchanges you can access. Spreading money across regions means you are not tied to one economy.',
  },
  {
    title: 'Own part of real businesses',
    body: 'A share is a small piece of a company. Its value moves with what the business sells, earns and plans, which makes it easier to follow over time.',
  },
  {
    title: 'Learn at your own pace',
    body: 'Start with the basics, then build knowledge as you go. VHTI explains each term when it first appears, so you never have to guess what something means.',
  },
];

const MINDSETS = [
  {
    step: '1',
    title: 'Tell us where you are',
    body: 'New to stocks, or already investing? We tailor the path to your experience.',
  },
  {
    step: '2',
    title: 'Choose a style that fits',
    body: 'Learn first, invest steadily, or follow markets actively. Each style has its own starting point.',
  },
  {
    step: '3',
    title: 'Track and understand',
    body: 'See your portfolio in one place, get market updates, and ask questions when something is unclear.',
  },
];

const INVESTMENT_TYPES = [
  {
    title: 'ETFs',
    body: 'Exchange-traded funds hold many companies in a single purchase, which spreads risk across a whole market or theme.',
  },
  {
    title: 'Individual stocks',
    body: 'Buy shares in a single company. More focus, and more movement, than a fund.',
  },
  {
    title: 'Worldwide stocks',
    body: 'Invest in companies listed outside your home country to diversify across currencies and economies.',
  },
  {
    title: 'Dividend stocks',
    body: 'Some companies pay part of their profits to shareholders as dividends. Compare payout history before you decide.',
  },
];

const GLOSSARY = [
  {
    term: 'The market',
    body: 'The place where buyers and sellers trade shares. Prices rise and fall as people react to news, earnings and expectations.',
  },
  {
    term: 'Index',
    body: 'A measured group of companies, such as the largest firms on one exchange, used to show how that part of the market is doing.',
  },
  {
    term: 'Dividend',
    body: 'A payment a company makes to its shareholders, usually from profits. Not every company pays one.',
  },
];

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Investing beyond your borders</p>
            <h1>Invest in markets around the world, with clarity at every step.</h1>
            <p className="lead">
              VHTI helps European citizens invest beyond their home country. We explain what you are buying,
              track your portfolio in one place, and answer your questions as you learn.
            </p>
            <div className="cta-row">
              <Link to="/signup" className="btn btn-primary btn-lg">
                I'm new to stocks
              </Link>
              <Link to="/login" className="btn btn-ghost btn-lg">
                I already invest, log in
              </Link>
            </div>
            <ul className="trust-list">
              <li>Education first</li>
              <li>Portfolio tracking</li>
              <li>Market updates by email</li>
            </ul>
          </div>
          <div className="hero-visual">
            <TickerBoard compact />
          </div>
        </div>
      </section>

      <section className="section" id="why-stocks">
        <div className="container">
          <p className="eyebrow">Why stocks</p>
          <h2>Why investing in stocks can help</h2>
          <div className="card-grid">
            {WHY_STOCKS.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-band" id="how-it-works">
        <div className="container">
          <p className="eyebrow">How we help</p>
          <h2>Find the approach that fits your investing mindset</h2>
          <p className="section-intro">
            Everyone starts somewhere. VHTI meets you where you are, whether that means your first euro or your
            tenth portfolio.
          </p>
          <ol className="steps">
            {MINDSETS.map((m) => (
              <li className="step" key={m.step}>
                <span className="step-number" aria-hidden="true">
                  {m.step}
                </span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="explained">
        <div className="container">
          <p className="eyebrow">Plain language</p>
          <h2>What does it all mean?</h2>
          <dl className="glossary">
            {GLOSSARY.map((g) => (
              <div className="glossary-item" key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-band" id="investment-types">
        <div className="container">
          <p className="eyebrow">Investment types</p>
          <h2>Choose how you want to invest</h2>
          <div className="card-grid card-grid-4">
            {INVESTMENT_TYPES.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="markets">
        <div className="container">
          <p className="eyebrow">Markets</p>
          <h2>Watch international stocks in one place</h2>
          <p className="section-intro">
            Prices, daily change and recent movement for companies listed on exchanges across Europe, Asia and
            the US.
          </p>
          <TickerBoard />
          <p className="fine-print">
            Figures shown are sample data for design review. They are not live quotes and should not be used to
            make decisions.
          </p>
        </div>
      </section>

      <section className="crypto-band" id="crypto" aria-labelledby="crypto-title">
        <div className="container crypto-grid">
          <div>
            <p className="eyebrow eyebrow-light">Crypto</p>
            <h2 id="crypto-title">Digital assets, with extra caution</h2>
            <p>
              Crypto is a separate section because it behaves differently from shares and funds. Prices can move
              sharply in a short time, and some tokens can lose all their value. We show you the risks clearly
              before you invest.
            </p>
          </div>
          <div className="crypto-note">
            <p>
              Only invest what you can afford to lose. Crypto should usually be a small part of a wider portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="section cta-final">
        <div className="container cta-final-inner">
          <div>
            <h2>Ready to start?</h2>
            <p>Create a free account, then choose the plan that fits how much help you want.</p>
          </div>
          <div className="cta-row">
            <Link to="/signup#tiers" className="btn btn-primary btn-lg">
              Compare plans
            </Link>
            <Link to="/signup" className="btn btn-ghost btn-lg">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
