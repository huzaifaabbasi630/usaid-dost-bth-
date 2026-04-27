import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Gift, Lock, Unlock, MapPin, MessageCircle, Cake, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

import imgJoy from '../../assets/img.png';
import imgSerenity from '../../assets/img2.png';
import imgCelebration from '../../assets/img3.png';

export const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-8 rounded-3xl luxury-glass ${className}`}
  >
    {children}
  </motion.div>
);

// 1. Countdown
export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
  useEffect(() => {
    const target = new Date('2026-04-30T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 text-brand-gold mt-6 font-mono text-xl">
      <div className="flex flex-col items-center bg-white/50 p-3 rounded-xl backdrop-blur-sm border border-brand-gold/20 shadow-sm">
        <span className="text-2xl font-bold">{String(timeLeft.d).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Days</span>
      </div>
      <div className="flex flex-col items-center bg-white/50 p-3 rounded-xl backdrop-blur-sm border border-brand-gold/20 shadow-sm">
        <span className="text-2xl font-bold">{String(timeLeft.h).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-white/50 p-3 rounded-xl backdrop-blur-sm border border-brand-gold/20 shadow-sm">
        <span className="text-2xl font-bold">{String(timeLeft.m).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Mins</span>
      </div>
      <div className="flex flex-col items-center bg-white/50 p-3 rounded-xl backdrop-blur-sm border border-brand-gold/20 shadow-sm">
        <span className="text-2xl font-bold">{String(timeLeft.s).padStart(2, '0')}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Secs</span>
      </div>
    </div>
  );
};

// 2. Flip Cards
export const FlipCards = () => {
  const cards = [
    { img: imgJoy, title: "Our Best Laugh", desc: "Remember when we couldn't stop laughing at this?" },
    { img: imgSerenity, title: "Peaceful Times", desc: "Just chilling and enjoying life together." },
    { img: imgCelebration, title: "Party Hard", desc: "Celebrating every milestone with you!" }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-serif">Memory Flip Cards</h3>
        <p className="text-gray-500 font-light italic mt-2">Hover to reveal the memory behind the picture.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
        {cards.map((card, i) => (
          <motion.div key={i} className="relative w-full h-[400px] group cursor-pointer" whileHover={{ scale: 1.05 }}>
            <div className="absolute inset-0 w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src={card.img} className="w-full h-full object-cover" alt="" />
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-brand-blush/20 backdrop-blur-md rounded-2xl shadow-xl border border-brand-blush p-8 flex flex-col justify-center items-center text-center">
                <h4 className="text-2xl font-accent text-brand-gold mb-4">{card.title}</h4>
                <p className="text-gray-700 italic">{card.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// 3. Voice Note
export const VoiceNote = ({ onToggle }: { onToggle?: (isPlayingVoiceNote: boolean) => void }) => {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(new Audio('https://cdn.pixabay.com/download/audio/2022/10/25/audio_51a2d5e69e.mp3')); // Demo audio
  
  const toggle = () => {
    if (playing) {
      audio.current.pause();
      if (onToggle) onToggle(false);
    } else {
      audio.current.play();
      if (onToggle) onToggle(true);
    }
    setPlaying(!playing);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 rounded-full bg-white/80 border border-brand-gold/30 shadow-lg flex items-center justify-between cursor-pointer hover:bg-white transition-all" onClick={toggle}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white">
          {playing ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </div>
        <div>
          <p className="font-semibold text-gray-800">A special message for you</p>
          <p className="text-xs text-gray-500">Tap to {playing ? 'pause' : 'listen'} ❤️</p>
        </div>
      </div>
      <div className="flex gap-1 h-6 items-end">
        {[1,2,3,4,5].map(i => (
          <motion.div key={i} animate={{ height: playing ? [10, 24, 10] : 10 }} transition={{ repeat: Infinity, duration: 0.5 + i*0.1 }} className="w-1 bg-brand-gold rounded-t-full"></motion.div>
        ))}
      </div>
    </div>
  );
};

// 4. Digital Gifts
export const DigitalGifts = () => {
  const [opened, setOpened] = useState<number[]>([]);
  const gifts = ["A Big Hug 🤗", "Shopping Spree 👗", "Secret Surprise 🎁"];

  const openGift = (i: number, e: any) => {
    if (!opened.includes(i)) {
      setOpened([...opened, i]);
      confetti({ origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center">
      <h3 className="text-3xl font-serif mb-12">Pick Your Digital Gifts</h3>
      <div className="flex justify-center gap-8 flex-wrap">
        {gifts.map((g, i) => (
          <motion.div key={i} onClick={(e) => openGift(i, e)} className="cursor-pointer" whileHover={{ scale: opened.includes(i) ? 1 : 1.1 }}>
            <LuxuryCard className={`w-40 h-40 flex items-center justify-center transition-all ${opened.includes(i) ? 'bg-white border-brand-gold text-brand-gold' : 'gold-gradient text-white'}`}>
              {opened.includes(i) ? <span className="font-bold text-center">{g}</span> : <Gift size={48} />}
            </LuxuryCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};



// 6. Blow Candles
export const BlowCandles = () => {
  const [blown, setBlown] = useState(false);
  const handleBlow = () => {
    setBlown(true);
    confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
  };
  return (
    <section className="py-24 text-center">
      <h3 className="text-4xl font-serif mb-8">Make a Wish & Blow the Candles!</h3>
      <div className="relative inline-block cursor-pointer group" onClick={handleBlow}>
        <motion.div animate={{ scale: blown ? 1 : [1, 1.05, 1] }} transition={{ repeat: blown ? 0 : Infinity, duration: 2 }}>
          <Cake size={120} className={blown ? "text-gray-400" : "text-brand-blush drop-shadow-xl"} />
        </motion.div>
        {!blown && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
            {[1,2,3].map(i => (
              <motion.div key={i} animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: Math.random()+0.5 }} className="w-3 h-6 bg-orange-400 rounded-full blur-[2px] shadow-[0_0_15px_orange]"></motion.div>
            ))}
          </div>
        )}
        <p className="mt-8 font-semibold text-brand-gold">{blown ? "Yay! Happy Birthday! 🎉" : "Tap the cake to blow!"}</p>
      </div>
    </section>
  );
};

// 7. Map & Time Capsule
export const InteractiveExtras = () => {
  return (
    <section className="py-24 max-w-2xl mx-auto px-4 flex flex-col gap-8">
      <LuxuryCard className="text-center bg-white/70">
        <Lock className="mx-auto text-brand-gold mb-4" size={40} />
        <h4 className="text-2xl font-serif mb-2">Time Capsule</h4>
        <p className="text-gray-500 mb-6">A secret message locked until next year.</p>
        <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-400 cursor-not-allowed">Opens 26 April 2027</button>
      </LuxuryCard>
    </section>
  );
};

export const FireworksEffect = () => {
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};
