import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SchoolIcon, RocketIcon, CheckCircleIcon } from '../icons/Icons';

const CurrentStatus = () => {
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
          <div className="accent-line" style={{ background: 'var(--accent-red)' }}></div>
          <h2>Status</h2>
          <div className="line"></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
        }} className="status-grid">
          <style>{`
            @media (min-width: 640px) {
              .status-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>

          {/* Academic */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ borderColor: 'var(--primary)' }}
            className="card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SchoolIcon size={14} color="#000" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Academic
                </p>
                <h3 style={{ fontWeight: 700, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>SMK NEGERI 71 Jakarta</h3>
              </div>
            </div>

            <div style={{
              padding: '0.75rem',
              background: 'rgba(0, 238, 255, 0.05)',
              borderRadius: '0.375rem',
              marginBottom: '0.75rem',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.125rem' }}>Major</p>
              <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Rekayasa Perangkat Lunak</p>
            </div>

            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {['Mobile Dev', 'Web Dev', 'Database'].map(tech => (
                <span key={tech} className="tag" style={{ fontSize: '0.5rem' }}>{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ borderColor: 'var(--accent-red)' }}
            className="card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.375rem',
                background: 'var(--accent-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <RocketIcon size={14} color="#fff" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent-red)', textTransform: 'uppercase' }}>
                  Role
                </p>
                <h3 style={{ fontWeight: 700, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Lead Developer</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { title: 'Web Development', desc: 'Full-stack enterprise' },
                { title: 'Project Management', desc: 'Timeline & deliverables' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircleIcon size={12} color="var(--accent-red)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.title}</span>
                  <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>• {item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentStatus;
