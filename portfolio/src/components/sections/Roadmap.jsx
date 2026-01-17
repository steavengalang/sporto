import { SmartphoneIcon, BoltIcon, TrophyIcon } from '../icons/Icons';

const roadmapItems = [
  {
    Icon: SmartphoneIcon,
    title: 'Mobile Solution Architect',
    time: 'Q1 2025',
    description: 'Deploying scalable cross-platform applications using Flutter and native Kotlin modules for enterprise resource management.',
  },
  {
    Icon: BoltIcon,
    title: 'Engineering Manager',
    time: 'Q4 2025',
    description: 'Overseeing the technical roadmap and lifecycle management of production applications for multiple local enterprises.',
  },
  {
    Icon: TrophyIcon,
    title: 'Infrastructure Scale',
    time: '2026',
    description: 'Scaling operations and integrating AI-driven automation into the development workflow for 10+ concurrent projects across web and mobile.',
  },
];

const Roadmap = () => {
  return (
    <section style={{ marginTop: '8rem' }}>
      <div className="container">
        <div className="section-title">
          <h2>Strategic Roadmap</h2>
          <div className="line"></div>
          <span className="tag" style={{ color: 'var(--primary)' }}>2025 - 2026 Archive</span>
        </div>

        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '6rem',
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '1.25rem',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent 0%, var(--border-dark) 10%, var(--border-dark) 90%, transparent 100%)',
          }} className="roadmap-line"></div>
          <style>{`
            @media (min-width: 768px) {
              .roadmap-line {
                left: 50% !important;
                transform: translateX(-50%);
              }
            }
          `}</style>

          {roadmapItems.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                paddingLeft: '4rem',
              }}
              className={`roadmap-item roadmap-item-${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <style>{`
                @media (min-width: 768px) {
                  .roadmap-item {
                    padding-left: 0 !important;
                    justify-content: center;
                  }
                  .roadmap-item-left {
                    flex-direction: row-reverse !important;
                  }
                  .roadmap-item-right {
                    flex-direction: row !important;
                  }
                  .roadmap-card {
                    width: calc(50% - 2.5rem) !important;
                  }
                }
                .roadmap-card:hover {
                  border-color: rgba(0, 238, 255, 0.5) !important;
                  transform: translateY(-2px);
                }
                .roadmap-dot:hover {
                  border-color: var(--primary) !important;
                  box-shadow: 0 0 15px rgba(0, 238, 255, 0.4);
                }
              `}</style>

              {/* Dot with Icon */}
              <div
                className="roadmap-dot"
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-dark)',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                }}
              >
                <item.Icon size={18} color="var(--primary)" />
              </div>
              <style>{`
                @media (min-width: 768px) {
                  .roadmap-dot {
                    left: 50% !important;
                    transform: translateX(-50%);
                  }
                }
              `}</style>

              {/* Card */}
              <div
                className="roadmap-card card"
                style={{
                  width: '100%',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{item.title}</h3>
                  <time style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    color: 'var(--primary)',
                    background: 'rgba(0, 238, 255, 0.1)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {item.time}
                  </time>
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
