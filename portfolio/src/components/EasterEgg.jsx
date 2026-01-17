import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

// 3D Kurama Model Component
const KuramaModel = () => {
  const { scene } = useGLTF('/kurama.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={10}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
};

// Preload the model
useGLTF.preload('/kurama.glb');

// 3D Kurama Fullscreen Component
const Kurama3DFullscreen = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10005,
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0800 50%, #0a0a0a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Canvas */}
      <div style={{ width: '100%', height: '60vh', position: 'relative', marginTop: '-5vh' }}>
        <Canvas
          camera={{ position: [0, 6, 12], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ff6b00" />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ff4500" />
            <pointLight position={[0, 3, 0]} intensity={2} color="#ff8c00" distance={10} />
            
            {/* Kurama Model */}
            <KuramaModel />
            
            {/* Controls - drag to rotate */}
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1.5}
            />
            
            {/* Shadow */}
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.5} 
              scale={10} 
              blur={2} 
              far={4}
              color="#ff4500"
            />
            
            {/* Environment for reflections */}
            <Environment preset="night" />
          </Suspense>
        </Canvas>

        {/* Chakra glow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(255,100,0,0.15) 0%, transparent 60%)',
        }} />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '1rem' }}
      >
        <motion.h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 900,
            color: '#ff6b00',
            textShadow: '0 0 30px #ff6b00, 0 0 60px #ff4500',
            letterSpacing: '0.1em',
            margin: 0,
          }}
          animate={{ 
            textShadow: [
              '0 0 30px #ff6b00, 0 0 60px #ff4500',
              '0 0 50px #ff6b00, 0 0 100px #ff4500',
              '0 0 30px #ff6b00, 0 0 60px #ff4500',
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          九尾の狐
        </motion.h1>
        <motion.p
          style={{
            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
            color: '#ff8c00',
            fontWeight: 700,
            letterSpacing: '0.3em',
            marginTop: '0.5rem',
          }}
        >
          KURAMA • THE NINE-TAILED FOX
        </motion.p>
        <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>
          🖱️ Drag to rotate • Scroll to zoom
        </p>
      </motion.div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,100,0,0.2)',
          border: '2px solid #ff6b00',
          color: '#ff6b00',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </motion.button>

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            background: `rgba(255, ${100 + Math.random() * 100}, 0, ${0.4 + Math.random() * 0.4})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            bottom: '-10px',
            filter: 'blur(2px)',
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -window.innerHeight - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </motion.div>
  );
};

// Chibi Naruto SVG
const ChibiNaruto = ({ mood = 'normal', isTransformed = false }) => {
  if (isTransformed) {
    return (
      <motion.svg width="90" height="90" viewBox="0 0 80 80" animate={{ scale: [1, 1.1, 1], filter: ['drop-shadow(0 0 10px #ff6b00)', 'drop-shadow(0 0 25px #ff6b00)', 'drop-shadow(0 0 10px #ff6b00)'] }} transition={{ duration: 1, repeat: Infinity }}>
        <ellipse cx="40" cy="40" rx="38" ry="38" fill="none" stroke="#ff6b00" strokeWidth="3" opacity="0.6"/>
        <ellipse cx="40" cy="30" rx="28" ry="24" fill="#FFD93D"/>
        <polygon points="15,25 5,10 20,22" fill="#FFD93D"/><polygon points="25,15 18,0 30,12" fill="#FFD93D"/><polygon points="40,10 40,-5 45,8" fill="#FFD93D"/><polygon points="55,15 62,0 50,12" fill="#FFD93D"/><polygon points="65,25 75,10 60,22" fill="#FFD93D"/>
        <ellipse cx="40" cy="42" rx="22" ry="20" fill="#FFE4B5"/>
        <rect x="18" y="28" width="44" height="8" rx="2" fill="#3B82F6"/><rect x="34" y="26" width="12" height="12" rx="1" fill="#C0C0C0"/>
        <line x1="20" y1="45" x2="30" y2="45" stroke="#222" strokeWidth="2"/><line x1="20" y1="48" x2="30" y2="48" stroke="#222" strokeWidth="2"/><line x1="20" y1="51" x2="30" y2="51" stroke="#222" strokeWidth="2"/>
        <line x1="50" y1="45" x2="60" y2="45" stroke="#222" strokeWidth="2"/><line x1="50" y1="48" x2="60" y2="48" stroke="#222" strokeWidth="2"/><line x1="50" y1="51" x2="60" y2="51" stroke="#222" strokeWidth="2"/>
        <ellipse cx="32" cy="42" rx="5" ry="6" fill="#ff0000"/><ellipse cx="48" cy="42" rx="5" ry="6" fill="#ff0000"/>
        <ellipse cx="32" cy="42" rx="2" ry="4" fill="#000"/><ellipse cx="48" cy="42" rx="2" ry="4" fill="#000"/>
        <path d="M 28 54 Q 40 65 52 54" stroke="#1a1a2e" strokeWidth="2.5" fill="none"/>
      </motion.svg>
    );
  }
  const expressions = { normal: 'M 35 55 Q 40 58 45 55', happy: 'M 32 54 Q 40 62 48 54', excited: 'M 30 52 Q 40 65 50 52', wink: 'M 32 54 Q 40 60 48 54' };
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
      <ellipse cx="40" cy="30" rx="28" ry="24" fill="#FFD93D"/>
      <polygon points="15,25 8,15 20,22" fill="#FFD93D"/><polygon points="25,15 20,3 30,12" fill="#FFD93D"/><polygon points="40,10 40,-2 45,8" fill="#FFD93D"/><polygon points="55,15 60,3 50,12" fill="#FFD93D"/><polygon points="65,25 72,15 60,22" fill="#FFD93D"/>
      <ellipse cx="40" cy="42" rx="22" ry="20" fill="#FFDAB9"/>
      <rect x="18" y="28" width="44" height="8" rx="2" fill="#3B82F6"/><rect x="34" y="26" width="12" height="12" rx="1" fill="#C0C0C0"/>
      <line x1="22" y1="45" x2="30" y2="45" stroke="#D4A574" strokeWidth="1"/><line x1="22" y1="48" x2="30" y2="48" stroke="#D4A574" strokeWidth="1"/><line x1="22" y1="51" x2="30" y2="51" stroke="#D4A574" strokeWidth="1"/>
      <line x1="50" y1="45" x2="58" y2="45" stroke="#D4A574" strokeWidth="1"/><line x1="50" y1="48" x2="58" y2="48" stroke="#D4A574" strokeWidth="1"/><line x1="50" y1="51" x2="58" y2="51" stroke="#D4A574" strokeWidth="1"/>
      <ellipse cx="32" cy="42" rx="4" ry="5" fill="#1a1a2e"/><ellipse cx="48" cy="42" rx="4" ry="5" fill="#1a1a2e"/>
      <circle cx="34" cy="40" r="1.5" fill="white"/><circle cx="50" cy="40" r="1.5" fill="white"/>
      <path d={expressions[mood] || expressions.normal} stroke="#1a1a2e" strokeWidth="2" fill="none"/>
      <ellipse cx="25" cy="50" rx="4" ry="2" fill="#FFB6C1" opacity="0.6"/><ellipse cx="55" cy="50" rx="4" ry="2" fill="#FFB6C1" opacity="0.6"/>
    </svg>
  );
};

const SpeechBubble = ({ children }) => (
  <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} style={{ background: 'white', color: '#1a1a2e', padding: '0.75rem 1rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, maxWidth: '240px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', position: 'relative' }}>
    {children}
    <div style={{ position: 'absolute', bottom: '-8px', left: '20px', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid white' }}/>
  </motion.div>
);

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const SECRET_WORD = ['d', 'a', 't', 't', 'e', 'b', 'a', 'y', 'o'];
const KURAMA_WORD = ['k', 'u', 'r', 'a', 'm', 'a'];

const EasterEgg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mood, setMood] = useState('happy');
  const [message, setMessage] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [secretProgress, setSecretProgress] = useState(0);
  const [kuramaProgress, setKuramaProgress] = useState(0);
  const [isTransformed, setIsTransformed] = useState(false);
  const [showKurama, setShowKurama] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const hints = [
    { text: "Yo! Aku Naruto! 🍥 Ketik 'kurama' untuk lihat model 3D-nya!", mood: 'happy' },
    { text: "Ketik 'kurama' untuk summon Nine-Tails 3D! 🦊🔥", mood: 'excited' },
    { text: "Atau 'dattebayo' untuk mode chakra! 🌀", mood: 'wink' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => { setMessage(hints[0].text); setMood(hints[0].mood); setIsVisible(true); }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showKurama || isTransformed) return;
    const interval = setInterval(() => {
      if (!isVisible && Math.random() > 0.6) {
        const hint = hints[(hintLevel + 1) % hints.length];
        setMessage(hint.text); setMood(hint.mood); setIsVisible(true); setHintLevel(prev => prev + 1);
      }
    }, 50000);
    return () => clearInterval(interval);
  }, [hintLevel, isVisible, showKurama, isTransformed]);

  const handleKeyPress = useCallback((e) => {
    const key = e.key.toLowerCase();
    
    if (e.key === KONAMI_CODE[konamiProgress]) {
      setKonamiProgress(prev => prev + 1);
      if (konamiProgress + 1 === KONAMI_CODE.length) { activateRasengan(); setKonamiProgress(0); }
    } else if (e.key === KONAMI_CODE[0]) { setKonamiProgress(1); } else { setKonamiProgress(0); }
    
    if (key === SECRET_WORD[secretProgress]) {
      setSecretProgress(prev => prev + 1);
      if (secretProgress + 1 === SECRET_WORD.length) { activateNineTails(); setSecretProgress(0); }
    } else if (key === SECRET_WORD[0]) { setSecretProgress(1); } else { setSecretProgress(0); }
    
    if (key === KURAMA_WORD[kuramaProgress]) {
      setKuramaProgress(prev => prev + 1);
      if (kuramaProgress + 1 === KURAMA_WORD.length) { summonKurama(); setKuramaProgress(0); }
    } else if (key === KURAMA_WORD[0]) { setKuramaProgress(1); } else { setKuramaProgress(0); }
  }, [konamiProgress, secretProgress, kuramaProgress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const summonKurama = () => {
    setShowKurama(true);
    setIsVisible(false);
    document.body.style.overflow = 'hidden';
  };

  const closeKurama = () => {
    setShowKurama(false);
    document.body.style.overflow = '';
  };

  const activateNineTails = () => {
    setIsTransformed(true); setIsVisible(true);
    setMessage("九尾チャクラモード! KURAMA MODE! 🦊🔥");
    
    // Create epic chakra aura effect
    const aura = document.createElement('div');
    aura.id = 'kurama-aura';
    aura.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, rgba(255,100,0,0.4) 0%, rgba(255,50,0,0.2) 30%, transparent 60%);
      z-index: 9999;
      pointer-events: none;
      animation: aura-pulse 0.5s ease-in-out infinite alternate;
    `;
    document.body.appendChild(aura);

    // Screen flash
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;inset:0;background:rgba(255,100,0,0.6);z-index:10000;pointer-events:none;animation:flash-out 0.5s ease-out forwards`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    // Fire particles rising up
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const fire = document.createElement('div');
        fire.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          bottom: -20px;
          width: ${10 + Math.random() * 20}px;
          height: ${15 + Math.random() * 25}px;
          background: linear-gradient(to top, #ff6b00, #ff4500, #ff0000, transparent);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          z-index: 9998;
          pointer-events: none;
          filter: blur(2px);
          animation: fire-rise ${2 + Math.random() * 2}s ease-out forwards;
        `;
        document.body.appendChild(fire);
        setTimeout(() => fire.remove(), 4000);
      }, i * 50);
    }

    // Chakra ring burst from center
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ring = document.createElement('div');
        ring.style.cssText = `
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 4px solid #ff6b00;
          border-radius: 50%;
          z-index: 10000;
          pointer-events: none;
          animation: ring-expand 1s ease-out forwards;
        `;
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 1000);
      }, i * 200);
    }

    setTimeout(() => { 
      setIsTransformed(false); 
      setIsVisible(false);
      document.getElementById('kurama-aura')?.remove();
    }, 5000);
  };

  const activateRasengan = () => {
    setIsVisible(true); setMood('excited'); setMessage("風遁・螺旋手裏剣! RASENSHURIKEN! 🌀💨");
    createRasenganEffect();
    setTimeout(() => setIsVisible(false), 5000);
  };

  const createChakraExplosion = () => {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const angle = (i / 50) * Math.PI * 2;
      const distance = 100 + Math.random() * 200;
      particle.style.cssText = `position:fixed;left:50%;top:50%;width:${10+Math.random()*15}px;height:${10+Math.random()*15}px;background:linear-gradient(135deg,#ff6b00,#ffa500);border-radius:50%;z-index:10001;pointer-events:none;box-shadow:0 0 20px #ff6b00;animation:chakra-explode 1.5s ease-out forwards;--tx:${Math.cos(angle)*distance}px;--ty:${Math.sin(angle)*distance}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  };

  const createRasenganEffect = () => {
    // RASENSHURIKEN! - Spinning shuriken thrown across screen
    
    // Create the rasenshuriken container
    const shuriken = document.createElement('div');
    shuriken.innerHTML = `
      <svg viewBox="0 0 200 200" style="width:100%;height:100%;animation:shuriken-spin 0.2s linear infinite">
        <!-- Outer wind blades -->
        <path d="M 100 10 L 120 80 L 100 100 L 80 80 Z" fill="#00bfff" opacity="0.8"/>
        <path d="M 190 100 L 120 120 L 100 100 L 120 80 Z" fill="#00bfff" opacity="0.8"/>
        <path d="M 100 190 L 80 120 L 100 100 L 120 120 Z" fill="#00bfff" opacity="0.8"/>
        <path d="M 10 100 L 80 80 L 100 100 L 80 120 Z" fill="#00bfff" opacity="0.8"/>
        <!-- Inner core -->
        <circle cx="100" cy="100" r="30" fill="radial-gradient(circle, #ffffff, #00bfff)"/>
        <circle cx="100" cy="100" r="25" fill="#00bfff"/>
        <circle cx="100" cy="100" r="15" fill="#ffffff"/>
      </svg>
    `;
    shuriken.style.cssText = `
      position: fixed;
      left: -200px;
      top: 50%;
      transform: translateY(-50%);
      width: 200px;
      height: 200px;
      z-index: 10001;
      pointer-events: none;
      filter: drop-shadow(0 0 30px #00bfff) drop-shadow(0 0 60px #00bfff);
      animation: shuriken-throw 2s ease-out forwards;
    `;
    document.body.appendChild(shuriken);

    // Create wind trail particles
    const createWindParticle = (delay) => {
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: fixed;
            left: ${-100 + Math.random() * 50}px;
            top: ${45 + Math.random() * 10}%;
            width: ${20 + Math.random() * 30}px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #00bfff, transparent);
            z-index: 10000;
            pointer-events: none;
            opacity: 0.7;
            animation: wind-trail ${0.5 + Math.random() * 0.3}s ease-out forwards;
          `;
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 800);
        }
      }, delay);
    };

    // Create wind particles along the path
    for (let i = 0; i < 10; i++) {
      createWindParticle(i * 150);
    }

    // Impact explosion at the end
    setTimeout(() => {
      // Screen flash
      const flash = document.createElement('div');
      flash.style.cssText = `position:fixed;inset:0;background:rgba(0,191,255,0.4);z-index:10002;pointer-events:none;animation:flash-out 0.3s ease-out forwards`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 300);

      // Explosion particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        particle.style.cssText = `
          position: fixed;
          right: 10%;
          top: 50%;
          width: ${5 + Math.random() * 10}px;
          height: ${5 + Math.random() * 10}px;
          background: ${Math.random() > 0.5 ? '#00bfff' : '#ffffff'};
          border-radius: 50%;
          z-index: 10001;
          pointer-events: none;
          animation: explosion-particle 0.8s ease-out forwards;
          --ex: ${Math.cos(angle) * distance}px;
          --ey: ${Math.sin(angle) * distance}px;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
    }, 1800);

    setTimeout(() => shuriken.remove(), 2500);
  };

  const handleNarutoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 5) { setMood('excited'); setMessage("Ketik 'kurama' sekarang! 🦊"); setClickCount(0); }
    else {
      const reactions = [{ text: "Hey! 😊", mood: 'happy' }, { text: "Ketik 'kurama'! 🦊", mood: 'excited' }, { text: "K-U-R-A-M-A! 🔥", mood: 'wink' }, { text: "Ayo! 💪", mood: 'excited' }, { text: "Satu lagi! 🦊", mood: 'happy' }];
      setMood(reactions[clickCount].mood); setMessage(reactions[clickCount].text);
    }
  };

  return (
    <>
      <style>{`
        @keyframes chakra-explode { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; } }
        @keyframes shuriken-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shuriken-throw { 
          0% { left: -200px; transform: translateY(-50%) scale(0.5); opacity: 0; }
          10% { transform: translateY(-50%) scale(1); opacity: 1; }
          80% { left: calc(100vw - 300px); transform: translateY(-50%) scale(1.2); opacity: 1; }
          100% { left: calc(100vw - 200px); transform: translateY(-50%) scale(1.5); opacity: 0; }
        }
        @keyframes wind-trail { 0% { transform: translateX(0); opacity: 0.7; } 100% { transform: translateX(100vw); opacity: 0; } }
        @keyframes flash-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes explosion-particle { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--ex), var(--ey)) scale(0); opacity: 0; } }
        @keyframes aura-pulse { from { opacity: 0.6; transform: scale(1); } to { opacity: 1; transform: scale(1.05); } }
        @keyframes fire-rise { 
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-50vh) scale(0.8); opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes ring-expand {
          0% { width: 20px; height: 20px; opacity: 1; border-width: 4px; }
          100% { width: 400px; height: 400px; opacity: 0; border-width: 1px; }
        }
      `}</style>

      {/* 3D KURAMA */}
      <AnimatePresence>
        {showKurama && <Kurama3DFullscreen onClose={closeKurama} />}
      </AnimatePresence>

      {/* Naruto */}
      <AnimatePresence>
        {isVisible && !showKurama && (
          <motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -120, opacity: 0 }} transition={{ type: 'spring', stiffness: 150 }} style={{ position: 'fixed', bottom: '100px', left: '20px', zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <SpeechBubble>{message}</SpeechBubble>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
              <motion.div onClick={handleNarutoClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ cursor: 'pointer' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChibiNaruto mood={mood} isTransformed={isTransformed} />
              </motion.div>
              <motion.button onClick={() => setIsVisible(false)} whileHover={{ scale: 1.1 }} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontSize: '0.6rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}>✕</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      {(konamiProgress > 3 || secretProgress > 3 || kuramaProgress > 2) && !showKurama && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', bottom: '20px', left: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--primary)', background: 'rgba(0,0,0,0.9)', padding: '0.5rem 1rem', borderRadius: '0.5rem', zIndex: 9997, border: '1px solid var(--primary)' }}>
          {konamiProgress > 3 && <div>🎮 Konami: {konamiProgress}/{KONAMI_CODE.length}</div>}
          {secretProgress > 3 && <div>🍥 Dattebayo: {secretProgress}/{SECRET_WORD.length}</div>}
          {kuramaProgress > 2 && <div>🦊 Kurama: {kuramaProgress}/{KURAMA_WORD.length}</div>}
        </motion.div>
      )}
    </>
  );
};

export default EasterEgg;
