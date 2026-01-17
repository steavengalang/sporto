import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '../icons/Icons';

// WhatsApp Icon
const WhatsAppIcon = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Animated grid lines background
const GridLines = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.4 }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={`h-${i}`}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${(i + 1) * 16}%`,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 238, 255, 0.15), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: i * 0.1 }}
      />
    ))}
  </div>
);

// Glowing orbs
const GlowingOrbs = () => (
  <>
    <motion.div
      style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 238, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    <motion.div
      style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 0, 0, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, delay: 1 }}
    />
  </>
);

// Typing effect
const TypeWriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <span>
      {displayText}
      <span style={{ opacity: showCursor ? 1 : 0 }} className="typing-cursor"></span>
    </span>
  );
};

// Stat card
const StatCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
    style={{
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '0.75rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
    }}
  >
    <motion.p
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay: delay + 0.2, type: 'spring' }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 800,
        color: 'var(--primary)',
        textShadow: '0 0 20px rgba(0, 238, 255, 0.5)',
      }}
    >
      {value}
    </motion.p>
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.5rem',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginTop: '0.25rem',
    }}>
      {label}
    </p>
  </motion.div>
);

// Animated letter component with hover effect
const AnimatedLetter = ({ letter, index, baseDelay, color, isMiddleName }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        color: isHovered ? (isMiddleName ? 'var(--accent-red)' : 'var(--primary)') : color,
        scale: isHovered ? 1.15 : 1,
        textShadow: isHovered 
          ? (isMiddleName ? '0 0 30px rgba(255, 0, 0, 0.8)' : '0 0 30px rgba(0, 238, 255, 0.8)')
          : 'none',
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: baseDelay + index * 0.04 },
        y: { duration: 0.5, delay: baseDelay + index * 0.04 },
        rotateX: { duration: 0.5, delay: baseDelay + index * 0.04 },
        color: { duration: 0.2 },
        scale: { duration: 0.2 },
        textShadow: { duration: 0.2 },
      }}
      style={{ 
        display: 'inline-block', 
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      {letter}
    </motion.span>
  );
};

const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const waNumber = '6281228435753';
  const waMessage = encodeURIComponent('Halo, saya tertarik dengan jasa pembuatan website!');
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section id="hero" style={{ 
      paddingTop: '7rem', 
      paddingBottom: '3rem',
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <GridLines />
      <GlowingOrbs />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }} className="hero-wrapper">
          <style>{`
            @media (min-width: 1024px) {
              .hero-wrapper {
                flex-direction: row !important;
                align-items: center;
                justify-content: space-between;
                gap: 3rem;
              }
              .hero-content { flex: 1; }
              .hero-right { display: flex !important; }
            }
            .hero-right { display: none; }
            .hero-photo-mobile { display: flex; }
            @media (min-width: 1024px) {
              .hero-photo-mobile { display: none !important; }
            }
          `}</style>

          {/* Left Content */}
          <div className="hero-content">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="tag tag-primary"
              style={{ marginBottom: '1.5rem' }}
            >
              <motion.span 
                className="status-dot"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>2+ Years <TypeWriter text="Full-stack Developer" /></span>
            </motion.div>

            {/* Mobile Photo */}
            <motion.div
              className="hero-photo-mobile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ justifyContent: 'center', marginBottom: '1.5rem' }}
            >
              <div 
                className="profile-photo"
                style={{
                  width: '140px',
                  height: '140px',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src="/gambar.jpeg" 
                  alt="Steaven Octavian Galang"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                  }}
                />
              </div>
            </motion.div>

            {/* Name with letter hover effects */}
            <div style={{
              fontSize: 'clamp(2.5rem, 11vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              {/* STEAVEN */}
              <div style={{ overflow: 'hidden' }}>
                {'STEAVEN'.split('').map((letter, i) => (
                  <AnimatedLetter 
                    key={i} 
                    letter={letter} 
                    index={i} 
                    baseDelay={0.1} 
                    color="var(--text-primary)"
                    isMiddleName={false}
                  />
                ))}
              </div>
              
              {/* OCTAVIAN - with special hover effect */}
              <div style={{ overflow: 'hidden', fontStyle: 'italic' }}>
                {'OCTAVIAN'.split('').map((letter, i) => (
                  <AnimatedLetter 
                    key={i} 
                    letter={letter} 
                    index={i} 
                    baseDelay={0.35} 
                    color="var(--primary)"
                    isMiddleName={true}
                  />
                ))}
              </div>
              
              {/* GALANG */}
              <div style={{ overflow: 'hidden' }}>
                {'GALANG'.split('').map((letter, i) => (
                  <AnimatedLetter 
                    key={i} 
                    letter={letter} 
                    index={i} 
                    baseDelay={0.65} 
                    color="var(--text-primary)"
                    isMiddleName={false}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '1.5rem',
              }}
            >
              Architecting high-performance digital and mobile experiences. 
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}> Focused on scalability</span>, clean code, and modular design systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}
            >
              <motion.button
                className="btn btn-primary"
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 238, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
                <ArrowRightIcon size={14} color="#000" />
              </motion.button>
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(37, 211, 102, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <WhatsAppIcon size={16} />
                Hire Me
              </motion.a>
            </motion.div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              maxWidth: '400px',
            }} className="stats-grid">
              <style>{`
                @media (min-width: 480px) {
                  .stats-grid { grid-template-columns: repeat(4, 1fr) !important; max-width: 550px !important; }
                }
              `}</style>
              <StatCard label="Years" value="2+" delay={1.2} />
              <StatCard label="Projects" value="10+" delay={1.3} />
              <StatCard label="Tech" value="15+" delay={1.4} />
              <StatCard label="Clients" value="5+" delay={1.5} />
            </div>
          </div>

          {/* Right Photo - Desktop */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <motion.div 
              className="profile-photo"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 238, 255, 0.5)' }}
              style={{
                width: '260px',
                height: '260px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img 
                src="/gambar.jpeg" 
                alt="Steaven Octavian Galang"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                }}
              />
            </motion.div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              📍 Jakarta, Indonesia
            </p>
          </motion.div>
        </div>

        {/* Service Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="service-banner"
          style={{ marginTop: '3rem' }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }} className="service-inner">
            <style>{`
              @media (min-width: 768px) {
                .service-inner { flex-direction: row !important; justify-content: space-between; }
                .service-text { text-align: left !important; }
              }
            `}</style>
            
            <div style={{ textAlign: 'center' }} className="service-text">
              <h3 style={{ 
                fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', 
                marginBottom: '0.5rem',
              }}>
                🚀 Buka Jasa Pembuatan Website
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
                Mulai dari <span style={{ 
                  color: 'var(--primary)', 
                  fontWeight: 800, 
                  fontSize: '1.3em',
                  textShadow: '0 0 10px rgba(0, 238, 255, 0.5)',
                }}>Rp 400.000</span> saja!
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                Company Profile • E-commerce • Portfolio • Landing Page
              </p>
            </div>

            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ minWidth: '160px', justifyContent: 'center' }}
            >
              <WhatsAppIcon size={18} />
              Chat Sekarang
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <WhatsAppIcon size={28} />
      </motion.a>
    </section>
  );
};

export default Hero;
