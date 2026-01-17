import { Link } from 'react-router-dom';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon, ExternalLinkIcon } from '../icons/Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#experience', label: 'History' },
    { href: '#insights', label: 'Insights' },
    { href: '#projects', label: 'Archive' },
  ];

  const socialLinks = [
    { href: 'https://github.com/steavengalang', label: 'GitHub', Icon: GitHubIcon, isExternal: true },
    { href: 'https://linkedin.com/in/', label: 'LinkedIn', Icon: LinkedInIcon, isExternal: true },
    { href: 'https://instagram.com/', label: 'Instagram', Icon: InstagramIcon, isExternal: true },
    { href: 'mailto:contact@steavengalang.dev', label: 'Email', Icon: MailIcon, isExternal: false },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 className="footer-title">STAY_CONNECTED</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', lineHeight: 1.6 }}>
              Open for collaboration on innovative web architectures, mobile experiences, and performance-critical systems.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <span className="status-dot status-dot-red"></span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 700,
                color: 'var(--accent-red)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Live Github Stream Active
              </span>
            </div>
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>
              Navigation
            </p>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>
              Protocol
            </p>
            <ul className="footer-links">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {link.label}
                    {link.isExternal ? (
                      <ExternalLinkIcon size={12} />
                    ) : (
                      <link.Icon size={12} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} STEAVEN OCTAVIAN GALANG | BUILT_FOR_SCALE
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link 
              to="/admin" 
              style={{ 
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Admin
            </Link>
            <span className="footer-version">Ver: 3.0.0-STABLE</span>
          </div>
        </div>
      </div>

      {/* Scanline effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(0deg, rgba(0, 238, 255, 0) 0%, rgba(0, 238, 255, 0.03) 50%, rgba(0, 238, 255, 0) 100%)',
        pointerEvents: 'none',
        zIndex: 10
      }}></div>
    </footer>
  );
};

export default Footer;
