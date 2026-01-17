import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnalyticsIcon, PieChartIcon, StarIcon, GitHubIcon, ExternalLinkIcon } from '../icons/Icons';
import { useGitHub } from '../../hooks/useGitHub';

const GitHubInsights = () => {
  const { profile, starredRepos, languageStats, contributionGrid, loading } = useGitHub();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const totalContributions = contributionGrid.flat().reduce((sum, level) => sum + level * 50, 0);

  // Default languages with proper colors
  const defaultLanguages = [
    { name: 'JavaScript', percent: 45, color: '#00eeff' },
    { name: 'PHP', percent: 30, color: '#FF0000' },
    { name: 'Dart', percent: 15, color: '#ffffff' },
    { name: 'Other', percent: 10, color: '#FF4B12' },
  ];

  const displayLanguages = languageStats.length > 0 
    ? languageStats.slice(0, 4).map(([lang, percent], i) => ({
        name: lang,
        percent,
        color: ['#00eeff', '#FF0000', '#ffffff', '#FF4B12'][i]
      }))
    : defaultLanguages;

  // Calculate donut chart segments
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="insights" ref={sectionRef} style={{ marginTop: '4rem' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="accent-line"></div>
          <h2>GitHub</h2>
          <div className="line"></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
        }} className="github-grid">
          <style>{`
            @media (min-width: 768px) {
              .github-grid { grid-template-columns: 2fr 1fr !important; }
            }
          `}</style>

          {/* Contribution Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ borderColor: 'rgba(0, 238, 255, 0.4)' }}
            className="card"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AnalyticsIcon size={18} color="var(--primary)" />
                <h3 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Activity Heatmap
                </h3>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                {loading ? 'Loading...' : `${totalContributions.toLocaleString()} contributions`}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(52, 1fr)',
              gap: '2px',
              overflow: 'auto',
            }}>
              {contributionGrid.map((week, wi) =>
                week.map((level, di) => (
                  <motion.div
                    key={`${wi}-${di}`}
                    className={`contribution-square square-l${level}`}
                    style={{ minWidth: '6px', minHeight: '6px' }}
                    whileHover={{ scale: 1.5, zIndex: 10 }}
                  />
                ))
              )}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.375rem',
              marginTop: '0.75rem',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'var(--text-muted)' }}>Less</span>
              {[0, 1, 2, 3, 4].map(l => (
                <div key={l} className={`square-l${l}`} style={{ width: '8px', height: '8px', borderRadius: '2px' }}/>
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'var(--text-muted)' }}>More</span>
            </div>
          </motion.div>

          {/* Languages with proper donut chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ borderColor: 'rgba(255, 0, 0, 0.4)' }}
            className="card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <PieChartIcon size={18} color="var(--accent-red)" />
              <h3 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Top Languages
              </h3>
            </div>

            {/* Donut Chart */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', position: 'relative' }}>
              <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="70" cy="70" r={radius} fill="none" strokeWidth="14" stroke="rgba(255,255,255,0.05)" />
                {(() => {
                  let offset = 0;
                  return displayLanguages.map((lang, index) => {
                    const segmentLength = (lang.percent / 100) * circumference;
                    const dashArray = `${segmentLength} ${circumference}`;
                    const dashOffset = -offset;
                    offset += segmentLength;
                    
                    return (
                      <motion.circle
                        key={lang.name}
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        strokeWidth="14"
                        stroke={lang.color}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      />
                    );
                  });
                })()}
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>100%</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Allocation
                </span>
              </div>
            </div>

            {/* Language List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {displayLanguages.map((lang, i) => (
                <motion.div 
                  key={lang.name} 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: lang.color,
                    boxShadow: `0 0 8px ${lang.color}`,
                    flexShrink: 0,
                  }}/>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, flex: 1, textTransform: 'uppercase' }}>
                    {lang.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{lang.percent}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Repos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card"
            style={{ gridColumn: '1 / -1' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StarIcon size={18} color="var(--primary)" />
                <h3 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Repositories
                </h3>
              </div>
              {profile && (
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                  }}
                >
                  View All <ExternalLinkIcon size={10} color="var(--primary)" />
                </a>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0.75rem',
            }} className="repos-grid">
              <style>{`
                @media (min-width: 640px) {
                  .repos-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
              `}</style>

              {(starredRepos.length > 0 ? starredRepos.slice(0, 3) : [
                { id: 1, name: 'jualplastik.co.id', description: 'E-commerce platform for plastic products', stargazers_count: 12, html_url: '#' },
                { id: 2, name: 'yttasmp-web', description: 'Modern Minecraft server website', stargazers_count: 8, html_url: '#' },
                { id: 3, name: 'portfolio-v2', description: 'Personal developer portfolio', stargazers_count: 5, html_url: '#' },
              ]).map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                  style={{
                    display: 'block',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <GitHubIcon size={16} color="var(--primary)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                      ⭐ {repo.stargazers_count}
                    </span>
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{repo.name}</h4>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {repo.description || 'No description'}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubInsights;
