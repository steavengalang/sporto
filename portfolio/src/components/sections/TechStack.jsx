import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  DatabaseIcon, 
  CodeIcon,
  WebIcon,
  SmartphoneIcon 
} from '../icons/Icons';

// Optimized SVG Icons for each tech
const FlutterSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--primary)">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
  </svg>
);

const KotlinSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent-orange)">
    <path d="M24 24H0V0h24L12 12z"/>
  </svg>
);

const JavaScriptSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#f7df1e"/>
    <path d="M7.5 17.5c0-1 1.5-1 1.5 0s1.5 1 1.5 0v-6h-3v6z" fill="#323330"/>
  </svg>
);

const PHPSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="11" ry="6" fill="#777bb3"/>
    <text x="12" y="14" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">PHP</text>
  </svg>
);

const ReactSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/>
  </svg>
);

const LaravelSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff2d20">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
  </svg>
);

const MySQLSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="9" ry="3" fill="#00a0c6"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" fill="#00758f"/>
  </svg>
);

const NodeSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#3c873a">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
  </svg>
);

const skills = [
  { name: 'Flutter', code: 'FL', color: 'primary', Icon: FlutterSVG, desc: 'Cross-Platform', bgIcon: SmartphoneIcon },
  { name: 'Kotlin', code: 'KT', color: 'orange', Icon: KotlinSVG, desc: 'Android', bgIcon: CodeIcon },
  { name: 'JavaScript', code: 'JS', color: 'primary', Icon: JavaScriptSVG, desc: 'Full-Stack', bgIcon: CodeIcon },
  { name: 'PHP', code: 'PHP', color: 'primary', Icon: PHPSVG, desc: 'Backend', bgIcon: WebIcon },
  { name: 'React', code: 'RX', color: 'primary', Icon: ReactSVG, desc: 'Frontend', bgIcon: CodeIcon },
  { name: 'Laravel', code: 'LV', color: 'red', Icon: LaravelSVG, desc: 'Framework', bgIcon: WebIcon },
  { name: 'MySQL', code: 'DB', color: 'primary', Icon: MySQLSVG, desc: 'Database', bgIcon: DatabaseIcon },
  { name: 'Node.js', code: 'ND', color: 'primary', Icon: NodeSVG, desc: 'Runtime', bgIcon: CodeIcon },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} style={{ marginTop: '4rem' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="accent-line"></div>
          <h2>Tech Stack</h2>
          <div className="line"></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
        }} className="tech-grid">
          <style>{`
            @media (min-width: 480px) {
              .tech-grid { gap: 1rem !important; }
            }
            @media (min-width: 640px) {
              .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
            @media (min-width: 1024px) {
              .tech-grid { grid-template-columns: repeat(4, 1fr) !important; }
            }
          `}</style>

          {skills.map((skill, index) => (
            <motion.div
              key={skill.code}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, borderColor: 'var(--primary)' }}
              className="card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '1rem',
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}>
                <skill.Icon />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {skill.code}
                </span>
              </div>

              <h4 style={{
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}>
                {skill.name}
              </h4>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
