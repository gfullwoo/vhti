import logo from '../assets/vhti-logo.svg';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <img src={logo} alt="VHTI" className="footer-logo" />
        <p className="footer-disclaimer">
          VHTI provides education, portfolio tracking and market information. It does not give personal
          investment advice. Every investment can lose value, and past performance does not predict future
          results.
        </p>
        <nav className="footer-links" aria-label="Legal">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#cookies">Cookies</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} VHTI. All rights reserved.</p>
      </div>
    </footer>
  );
}
