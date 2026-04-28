import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Heart, 
  Camera, 
  Clock, 
  Music, 
  Pause, 
  Play, 
  Sparkles, 
  ArrowRight,
  Smile,
  Cake,
  Star,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

import imgJoy from '../assets/img.png';
import imgSerenity from '../assets/img2.png';
import imgCelebration from '../assets/img3.png';
import bgMusic from '../assets/music.mp3';
import { CountdownTimer, FlipCards, VoiceNote, DigitalGifts, BlowCandles, InteractiveExtras, FireworksEffect } from './components/PremiumFeatures';



// --- Components ---

const ConfettiEffect = () => {
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
};

const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-8 rounded-3xl luxury-glass ${className}`}
  >
    {children}
  </motion.div>
);

const SurpriseNote = ({ label, message, icon: Icon, color }: { label: string, message: string, icon: any, color: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-white shadow-lg transition-colors ${color}`}
      >
        <Icon size={18} />
        <span className="font-medium text-sm lg:text-base">{label}</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-blush text-center max-w-xs shadow-md"
          >
            <p className="text-gray-700 italic font-serif">"{message}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- App ---

export default function App() {
  const [stage, setStage] = useState<'landing' | 'opening' | 'main'>('landing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(bgMusic); 
    audioRef.current.loop = true;
    
    // Attempt autoplay immediately
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Autoplay blocked by browser. User interaction needed.");
      });
    }

    // Fallback: Start playing on first user interaction if it was blocked
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      // Remove listener once interacted
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      audioRef.current?.pause();
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Music play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenGift = () => {
    setStage('opening');
    setTimeout(() => {
      setStage('main');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fce4ec', '#f3e5f5', '#d4af37']
      });
    }, 2000);
  };

  const triggerConfetti = (e?: React.MouseEvent | any) => {
    const origin = e ? { 
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    } : { y: 0.7 };

    confetti({
      particleCount: 100,
      spread: 70,
      origin,
      colors: ['#fce4ec', '#f3e5f5', '#d4af37', '#e1f5fe']
    });
  };

  const handleVoiceNoteToggle = (isPlayingVoiceNote: boolean) => {
    if (isPlayingVoiceNote) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(e => console.log("Music play blocked", e));
      setIsPlaying(true);
    }
  };

  const handleMakeWish = () => {
    FireworksEffect();
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Background Sparkles / Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: '110vh' }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: '-10vh',
              x: `${Math.random() * 100}vw`
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute"
          >
            <Sparkles className="text-brand-gold/30" size={12 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.section
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Gift size={64} className="text-brand-gold" />
                </motion.div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                Happy Birthday <br />
                <span className="text-transparent bg-clip-text gold-gradient">Maham Mansoor</span> 🎉
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                A little surprise made with love for your special day.
              </p>
              
              <CountdownTimer />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenGift}
                className="mt-8 px-10 py-4 bg-brand-gold text-white rounded-full font-semibold shadow-2xl flex items-center gap-3 mx-auto transition-all hover:bg-opacity-90"
              >
                <span>Open Your Surprise</span>
                <Gift size={20} />
              </motion.button>
            </motion.div>
            
            {/* Floating Balloons Decor */}
            <div className="absolute top-20 left-10 hidden lg:block opacity-40">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                <Circle fill="#fce4ec" size={80} />
              </motion.div>
            </div>
            <div className="absolute bottom-20 right-10 hidden lg:block opacity-40">
              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <Circle fill="#f3e5f5" size={100} />
              </motion.div>
            </div>
          </motion.section>
        )}

        {stage === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-brand-cream/80 backdrop-blur-md"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 0.8, 15], 
                rotate: [0, 10, -10, 0],
                opacity: [1, 1, 1, 0]
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="relative"
            >
              <Gift size={120} className="text-brand-gold" />
              <motion.div
                animate={{ y: [-20, -100] }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Sparkles size={40} className="text-brand-gold animate-ping" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full"
          >
            {/* Fixed Controls */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className="w-12 h-12 flex items-center justify-center rounded-full luxury-glass text-brand-gold border-brand-gold/30 hover:bg-brand-gold hover:text-white transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
            </div>

            {/* Header / Intro Card */}
            <section className="pt-24 pb-16 px-4 max-w-4xl mx-auto text-center">
              <LuxuryCard className="border-brand-blush/40 !bg-white/60">
                <Heart className="mx-auto text-brand-blush mb-6" size={48} fill="#fce4ec" />
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 italic">
                  Dear Maham,
                </h2>
                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  <p>May your day be filled with happiness, laughter, and beautiful memories.</p>
                  <p>You deserve all the love in the world.</p>
                  <p className="text-2xl font-accent text-brand-gold pt-4">Happy Birthday ❤️</p>
                </div>
              </LuxuryCard>
              <VoiceNote onToggle={handleVoiceNoteToggle} />
            </section>

            {/* Photo Gallery (Polaroid Style) */}
            <section className="py-24 px-4 bg-brand-blush/10 overflow-hidden">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-4xl md:text-5xl font-serif mb-4">Beautiful Memories Together</h3>
                    <div className="w-32 h-1 gold-gradient mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-500 font-light italic">Captured moments that stay in the heart forever.</p>
                  </motion.div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-12">
                  {[
                    { 
                      id: 1, 
                      title: "Pure Joy", 
                      img: imgJoy,
                      rotate: -3
                    },
                    { 
                      id: 2, 
                      title: "Serenity", 
                      img: imgSerenity,
                      rotate: 2
                    },
                    { 
                      id: 3, 
                      title: "Celebration", 
                      img: imgCelebration,
                      rotate: -1
                    }
                  ].map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                      className="bg-white p-4 pb-12 shadow-2xl rounded-sm w-[300px] border border-gray-100 group"
                    >
                      <div 
                        className="overflow-hidden aspect-square mb-4 bg-gray-50 cursor-zoom-in"
                        onClick={(e) => {
                          setSelectedImage(item.img);
                          triggerConfetti(e);
                        }}
                        onMouseEnter={(e) => triggerConfetti(e)}
                      >
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          src={item.img} 
                          alt={item.title}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                        />
                      </div>
                      <p className="text-center font-accent text-2xl text-gray-700 mt-2">{item.title}</p>
                      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 font-mono tracking-widest uppercase">
                        2026.04.30
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Memory Timeline */}
            <section className="py-24 px-4 max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Clock className="mx-auto text-brand-gold mb-4" size={32} />
                <h3 className="text-3xl font-serif">Journey of Memories</h3>
              </div>

              <div className="relative space-y-12">
                {/* Center Line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-brand-gold/30 -translate-x-1/2 hidden md:block"></div>

                {[
                  { title: "Childhood Memories", desc: "From playing together to growing up side by side.", icon: Smile },
                  { title: "Beautiful Moments", desc: "Every smile shared and secret kept has made our bond stronger.", icon: Heart },
                  { title: "Today We Celebrate You", desc: "The woman you've become is our pride and joy.", icon: Cake }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="hidden md:flex flex-1 justify-end">
                      {idx % 2 !== 0 && (
                        <div className="text-right p-6 rounded-2xl bg-white shadow-lg border border-brand-lavender max-w-sm">
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-gray-600 font-light">{step.desc}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg z-10">
                      <step.icon size={20} className="text-white" />
                    </div>

                    <div className="flex-1">
                      {idx % 2 === 0 ? (
                        <div className="p-6 rounded-2xl bg-white shadow-lg border border-brand-lavender max-w-sm">
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-gray-600 font-light">{step.desc}</p>
                        </div>
                      ) : (
                        <div className="md:hidden p-6 rounded-2xl bg-white shadow-lg border border-brand-lavender max-w-sm">
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-gray-600 font-light">{step.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Surprise Notes Section */}
            <section className="py-20 px-4 bg-brand-lavender/30">
              <div className="max-w-4xl mx-auto text-center space-y-12">
                <h3 className="text-3xl font-serif">Little Tidbits for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SurpriseNote 
                    label="Open When You Smile" 
                    message="Your smile is the most beautiful thing about you. Keep shining!" 
                    icon={Smile} 
                    color="bg-brand-sky hover:bg-sky-400"
                  />
                  <SurpriseNote 
                    label="Open When You Need Love" 
                    message="You are cherished more than you know. Always here for you." 
                    icon={Heart} 
                    color="bg-brand-blush hover:bg-pink-300"
                  />
                  <SurpriseNote 
                    label="Open For A Surprise" 
                    message="Check your room later for a special handwritten letter!" 
                    icon={Star} 
                    color="bg-brand-gold hover:bg-yellow-600"
                  />
                </div>
              </div>
            </section>

            <DigitalGifts />
            <FlipCards />
            <InteractiveExtras />
            <BlowCandles />

            {/* Final Wish Section */}
            <section className="py-32 px-4 text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto space-y-12 relative z-10"
              >
                <div className="relative inline-block">
                  <div className="p-6 rounded-full bg-brand-gold/10 text-brand-gold mb-4 relative z-10">
                    <Cake size={64} />
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-brand-gold/20 rounded-full blur-xl"
                  ></motion.div>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-tight">
                  Wishing You Endless <br /> Happiness, Maham ✨
                </h2>
                
                <p className="text-gray-500 font-light italic text-lg">Close your eyes, make a wish, and click below.</p>

                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 0 50px rgba(212, 175, 55, 0.6)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMakeWish}
                  className="px-16 py-6 gold-gradient text-white rounded-full font-bold text-xl shadow-2xl uppercase tracking-[0.2em] mt-6 transition-all"
                >
                  Make A Wish
                </motion.button>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-brand-gold/10 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 font-light italic">
                <span>Made with</span>
                <Heart size={16} className="text-brand-blush fill-brand-blush" />
                <span>Love for Maham</span>
              </div>
              <p className="mt-4 text-xs text-gray-400 tracking-tighter uppercase font-sans">&copy; 2026 Celebration Studio</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Helper Components ---

const Circle = ({ fill, size }: { fill: string, size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={fill} />
  </svg>
);
