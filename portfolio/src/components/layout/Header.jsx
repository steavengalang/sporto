import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TerminalIcon, ArrowRightIcon } from '../icons/Icons';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '#hero', label: 'System' },
    { href: '#experience', label: 'History' },
    { href: '#insights', label: 'Insights' },
    { href: '#projects', label: 'Archive' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo-icon">
              <TerminalIcon size={16} color="#000" />
            </div>
            <span className="logo-text">S.O.G</span>
          </Link>

          <nav className="nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn nav-btn"
              onClick={(e) => scrollToSection(e, '#contact')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Initialize Contact
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              transition: 'transform 0.3s ease'
            }}></span>
            <span style={{
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}></span>
            <span style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              transition: 'transform 0.3s ease'
            }}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem 0',
            borderTop: '1px solid var(--border-dark)',
            marginTop: '1rem',
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={(e) => scrollToSection(e, link.href)}
                style={{ padding: '0.5rem 0' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn nav-btn"
              onClick={(e) => scrollToSection(e, '#contact')}
              style={{ marginTop: '0.5rem', textAlign: 'center' }}
            >
              Initialize Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
