import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/vhti-logo.svg';

const SECTION_LINKS = [
  { to: '/#investment-types', label: 'Investment types' },
  { to: '/#crypto', label: 'Crypto' },
  { to: '/#markets', label: 'Markets' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/signup#tiers', label: 'Plans' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  // Close the drawer whenever the visitor navigates.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Escape closes the drawer, the page stops scrolling behind it, and focus moves into it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="VHTI home">
          <img src={logo} alt="" className="brand-logo" />
        </Link>

        <div className="header-actions">
          <Link to="/login" className="header-link">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign up
          </Link>
          <button
            ref={menuButton}
            type="button"
            className={`menu-button ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`drawer-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="site-drawer"
        ref={drawer}
        className={`drawer ${open ? 'is-open' : ''}`}
        aria-label="Site menu"
      >
        <div className="drawer-head">
          <img src={logo} alt="" className="brand-logo" />
          <button
            type="button"
            className="drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Menu">
          <ul className="drawer-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            {SECTION_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer-cta">
          <Link to="/signup" className="btn btn-primary btn-block">
            Create account
          </Link>
          <Link to="/login" className="btn btn-ghost btn-block">
            Log in
          </Link>
        </div>
        <p className="drawer-note">
          Education, portfolio tracking and market information. Not personal investment advice.
        </p>
      </aside>
    </header>
  );
}
