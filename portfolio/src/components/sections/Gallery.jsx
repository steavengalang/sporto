import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getGallery, getCategories } from '../../services/gallery';

const CloseIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronLeft = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);

const ChevronRight = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="9,6 15,12 9,18"/>
  </svg>
);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  useEffect(() => {
    setGalleryItems(getGallery());
  }, []);

  const categories = ['All', ...getCategories()];
  const filteredItems = activeCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (item, index) => { setSelectedImage(item); setCurrentIndex(index); };
  const closeLightbox = () => setSelectedImage(null);
  const goToPrevious = () => { const i = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1; setCurrentIndex(i); setSelectedImage(filteredItems[i]); };
  const goToNext = () => { const i = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1; setCurrentIndex(i); setSelectedImage(filteredItems[i]); };

  // Show Coming Soon if no gallery items
  if (galleryItems.length === 0) {
    return (
      <section id="gallery" ref={sectionRef} style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="container">
          <motion.div className="section-title" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="accent-line" style={{ background: 'var(--accent-red)' }}></div>
            <h2>Gallery</h2>
            <div className="line"></div>
            <span className="tag" style={{ color: 'var(--primary)' }}>Showcase</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              border: '1px dashed var(--border-dark)',
              borderRadius: '1rem',
              background: 'rgba(0, 238, 255, 0.02)',
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
              🖼️
            </motion.div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: 'var(--primary)',
              marginBottom: '0.5rem',
            }}>
              Coming Soon
            </h3>
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.875rem',
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              Gallery sedang dalam pengembangan. Foto, sertifikat, dan dokumentasi akan segera ditampilkan di sini.
            </p>
            <motion.div
              style={{
                marginTop: '1.5rem',
                display: 'inline-flex',
                gap: '0.5rem',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '2rem',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}
              />
              Under Development
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" ref={sectionRef} style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <div className="container">
        <motion.div className="section-title" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="accent-line" style={{ background: 'var(--accent-red)' }}></div>
          <h2>Gallery</h2>
          <div className="line"></div>
          <span className="tag" style={{ color: 'var(--primary)' }}>Showcase</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '0.5rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', background: activeCategory === cat ? 'var(--primary)' : 'transparent', color: activeCategory === cat ? '#000' : 'var(--text-secondary)', border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border-dark)'}`, borderRadius: '0.375rem', cursor: 'pointer' }}>{cat}</motion.button>
          ))}
        </motion.div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }} className="gallery-grid">
          <style>{`@media (min-width: 640px) { .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 1rem !important; } }`}</style>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ y: -5 }} onClick={() => openLightbox(item, index)} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '0.75rem', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-dark)' }}>
                <img src={item.image} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0.75rem' }}>
                  <span className="tag" style={{ fontSize: '0.45rem', marginBottom: '0.375rem', width: 'fit-content', background: 'var(--primary)', color: '#000', border: 'none' }}>{item.category}</span>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700 }}>{item.title}</h4>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox} style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
              <motion.button onClick={closeLightbox} whileHover={{ scale: 1.1 }} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-dark)', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}><CloseIcon size={18} color="var(--text-primary)" /></motion.button>
              <motion.button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} whileHover={{ scale: 1.1 }} style={{ position: 'absolute', left: '1rem', width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-dark)', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={20} color="var(--text-primary)" /></motion.button>
              <motion.button onClick={(e) => { e.stopPropagation(); goToNext(); }} whileHover={{ scale: 1.1 }} style={{ position: 'absolute', right: '1rem', width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-dark)', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={20} color="var(--text-primary)" /></motion.button>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={selectedImage.image} alt={selectedImage.title} style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '0.5rem' }} />
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span className="tag">{selectedImage.category}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem' }}>{selectedImage.title}</h3>
                  {selectedImage.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{selectedImage.description}</p>}
                </div>
              </motion.div>
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentIndex + 1} / {filteredItems.length}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
