import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLinkIcon } from '../icons/Icons';
import { getProjects } from '../../services/portfolio';

const CloseIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  useEffect(() => {
    setProjects(getProjects().filter(p => p.featured));
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ marginTop: '4rem' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="accent-line"></div>
          <h2>Projects</h2>
          <div className="line"></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
        }} className="projects-grid">
          <style>{`
            @media (min-width: 640px) {
              .projects-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.5rem !important; }
            }
          `}</style>

          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Browser Preview */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                background: 'var(--bg-darker)',
              }}>
                {/* Browser Header */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '24px',
                  background: 'var(--bg-dark)',
                  borderBottom: '1px solid var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  zIndex: 10,
                }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }}/>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }}/>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }}/>
                  </div>
                  <div style={{
                    flex: 1,
                    marginLeft: '10px',
                    height: '14px',
                    background: 'var(--card-dark)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 6px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--text-muted)' }}>
                      🔒 {project.url?.replace('https://', '')}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  right: '6px',
                  zIndex: 15,
                  padding: '0.2rem 0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4rem',
                  textTransform: 'uppercase',
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid var(--primary)',
                  borderRadius: '3px',
                }}>
                  {project.badge}
                </div>

                {/* Image */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }}/>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    color: 'var(--primary)',
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--primary)',
                    borderRadius: '4px',
                  }}>
                    View Details
                  </span>
                </motion.div>
              </div>

              {/* Info */}
              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                  fontWeight: 700,
                  marginBottom: '0.375rem',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-muted)',
                }}>
                  {project.tags.join(' • ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '1rem',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--card-dark)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '0.75rem',
                  maxWidth: '600px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  borderRadius: '0.75rem 0.75rem 0 0',
                  overflow: 'hidden',
                }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--card-dark), transparent 50%)',
                  }}/>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-dark)',
                      background: 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <CloseIcon size={16} />
                  </button>

                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    background: 'var(--primary)',
                    color: '#000',
                    borderRadius: '3px',
                    fontWeight: 700,
                  }}>
                    {selectedProject.badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}>
                    {selectedProject.title}
                  </h2>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>
                    {selectedProject.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="tag tag-primary" style={{ fontSize: '0.5rem' }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }} className="modal-btns">
                    <style>{`
                      @media (min-width: 480px) {
                        .modal-btns { flex-direction: row !important; }
                      }
                    `}</style>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Go to Preview
                      <ExternalLinkIcon size={14} color="#000" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="btn btn-outline"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
