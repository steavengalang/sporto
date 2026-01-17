import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RocketIcon, HistoryIcon, CheckCircleIcon } from '../icons/Icons';

const experiences = [
  {
    year: '2024',
    type: 'Education',
    title: 'SMK NEGERI 71 Jakarta',
    description: 'Memulai pendidikan vokasi jurusan Rekayasa Perangkat Lunak (RPL). Fokus pada algoritma, mobile development, dan software lifecycle.',
    tags: ['RPL', 'Core Engineering'],
    color: 'red',
    Icon: HistoryIcon,
  },
  {
    year: 'Mid 2025',
    type: 'Freelance',
    title: 'Enterprise Development',
    description: 'Mengerjakan proyek freelance untuk berbagai klien. Membangun platform e-commerce dan sistem manajemen custom.',
    highlights: [{ title: 'Lead Developer', desc: 'Full-stack development' }],
    tags: ['Freelance', 'Full-Stack'],
    color: 'primary',
    Icon: RocketIcon,
  },
  {
    year: 'Late 2025',
    type: 'Production',
    title: 'Multi-Platform Launch',
    description: 'Meluncurkan jualplastik.co.id dan welcometo.yttasmp.my.id. Sepenuhnya mengelola arsitektur dan maintenance.',
    highlights: [{ title: 'Creator & Manager', desc: 'System architecture design' }],
    tags: ['Full-Stack', 'Production'],
    color: 'primary',
    Icon: RocketIcon,
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section id="experience" ref={sectionRef} style={{ marginTop: '4rem' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>Experience</h2>
          <div className="line"></div>
        </motion.div>

        <div style={{ position: 'relative', marginTop: '2rem' }}>
          {/* Timeline Line - Mobile left, Desktop center */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: 0,
              bottom: 0,
              width: '3px',
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, var(--accent-red), var(--primary))',
              borderRadius: '9999px',
            }} 
            className="timeline-line"
          />
          <style>{`
            @media (min-width: 768px) {
              .timeline-line {
                left: 50% !important;
                transform: translateX(-50%);
              }
              .exp-item {
                padding-left: 0 !important;
              }
              .exp-item-left {
                flex-direction: row-reverse !important;
                padding-right: 52% !important;
              }
              .exp-item-right {
                padding-left: 52% !important;
              }
              .exp-dot {
                left: 50% !important;
                transform: translateX(-50%) !important;
              }
            }
          `}</style>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`exp-item exp-item-${isLeft ? 'left' : 'right'}`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  style={{
                    position: 'relative',
                    paddingLeft: '2.5rem',
                  }}
                >
                  {/* Dot */}
                  <motion.div 
                    className="exp-dot"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '1rem',
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--bg-dark)',
                      border: `2px solid ${exp.color === 'red' ? 'var(--accent-red)' : 'var(--primary)'}`,
                      zIndex: 10,
                    }}
                  >
                    <exp.Icon size={10} color={exp.color === 'red' ? 'var(--accent-red)' : 'var(--primary)'} />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ borderColor: exp.color === 'red' ? 'var(--accent-red)' : 'var(--primary)' }}
                    className={`timeline-card ${exp.color}`}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      <time style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: exp.color === 'red' ? 'var(--accent-red)' : 'var(--primary)',
                      }}>
                        {exp.year}
                      </time>
                      <span className={`tag ${exp.color === 'red' ? 'tag-red' : 'tag-primary'}`}>
                        {exp.type}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}>
                      {exp.title}
                    </h3>

                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      lineHeight: 1.6,
                      marginBottom: '0.75rem',
                    }}>
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        {exp.highlights.map((hl, i) => (
                          <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <CheckCircleIcon size={14} color="var(--primary)" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{hl.title}</span>
                            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>• {hl.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      {exp.tags.map(tag => (
                        <span key={tag} className="tag" style={{ fontSize: '0.5rem' }}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
