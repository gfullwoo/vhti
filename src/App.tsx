import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TickerTape from './components/TickerTape';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';

export default function App() {
  const { hash } = useLocation();

  // Hash links such as /#markets should scroll to their section.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <TickerTape />
      <main id="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route
            path="*"
            element={
              <section className="section">
                <div className="container">
                  <h1>Page not found</h1>
                  <p>
                    <Link to="/">Back to home</Link>
                  </p>
                </div>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
