import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Film, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  CheckCircle2,
  X,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';

interface HeroVideoShowreelProps {
  onOpenQuoteModal?: () => void;
  className?: string;
  isCinemaModalOpen?: boolean;
  onCloseCinemaModal?: () => void;
}

export const HeroVideoShowreel: React.FC<HeroVideoShowreelProps> = ({
  onOpenQuoteModal,
  className = '',
  isCinemaModalOpen = false,
  onCloseCinemaModal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [qualityMode, setQualityMode] = useState<'4K' | '1080P'>('4K');

  const chapters = [
    { title: 'Haute Horlogerie Kinematics', duration: 18, code: '01 / WATCHMAKING' },
    { title: 'Private Aviation Aerodynamics', duration: 22, code: '02 / MOBILITY' },
    { title: 'Real-Time Three.js 3D Atelier', duration: 24, code: '03 / 3D STUDIO' },
    { title: 'Algorithmic Attribution & CAPI', duration: 20, code: '04 / GROWTH' },
  ];

  const totalDuration = chapters.reduce((acc, c) => acc + c.duration, 0);

  // Web Audio Luxury Ambient Harmonic Soundscape (Plays when unmuted)
  useEffect(() => {
    if (!isMuted && isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Warm harmonic sub-drone and shimmer chord
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorNodesRef.current = { osc1, osc2, gain };
      } catch {
        // Audio policy safe
      }
    } else {
      if (oscillatorNodesRef.current && audioCtxRef.current) {
        try {
          const { gain, osc1, osc2 } = oscillatorNodesRef.current;
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.4);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              osc1.disconnect();
              osc2.disconnect();
            } catch {
              // Ignore
            }
          }, 450);
          oscillatorNodesRef.current = null;
        } catch {
          // Ignore
        }
      }
    }

    return () => {
      if (oscillatorNodesRef.current) {
        try {
          oscillatorNodesRef.current.osc1.stop();
          oscillatorNodesRef.current.osc2.stop();
        } catch {
          // Ignore
        }
      }
    };
  }, [isMuted, isPlaying]);

  // Procedural Cinema Video Engine on Canvas (Kinetic luxury watch escapement + golden caustic rays + floating dust)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Golden dust particles
    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.0008,
      speedY: -Math.random() * 0.0012 - 0.0004,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      if (isPlaying) {
        time += 0.016;
        setProgress((prev) => (prev >= totalDuration ? 0 : prev + 0.016));
      }

      const w = (canvas.width = canvas.parentElement?.clientWidth || 640);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 360);

      // Deep obsidian studio background
      ctx.fillStyle = '#090807';
      ctx.fillRect(0, 0, w, h);

      // 1. Moving Atmospheric Radial Caustic Glow
      const glowX = w * 0.5 + Math.sin(time * 0.4) * (w * 0.25);
      const glowY = h * 0.5 + Math.cos(time * 0.5) * (h * 0.2);
      const radialGlow = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, w * 0.6);
      radialGlow.addColorStop(0, 'rgba(214, 184, 120, 0.28)');
      radialGlow.addColorStop(0.35, 'rgba(156, 123, 61, 0.12)');
      radialGlow.addColorStop(0.7, 'rgba(32, 26, 18, 0.05)');
      radialGlow.addColorStop(1, 'rgba(9, 8, 7, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, w, h);

      // 2. Anamorphic Cinematic Light Streaks (Horizontal Lens Flare)
      const flareY = h * 0.5 + Math.sin(time * 0.7) * 30;
      const flareGrad = ctx.createLinearGradient(0, flareY, w, flareY);
      flareGrad.addColorStop(0, 'rgba(214, 184, 120, 0)');
      flareGrad.addColorStop(0.4, 'rgba(240, 221, 170, 0.12)');
      flareGrad.addColorStop(0.5, 'rgba(255, 245, 225, 0.35)');
      flareGrad.addColorStop(0.6, 'rgba(240, 221, 170, 0.12)');
      flareGrad.addColorStop(1, 'rgba(214, 184, 120, 0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, flareY - 1.5, w, 3);

      // 3. Central Kinetic Luxury Watchmaking / Architectural Mechanism
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);

      // Outer Beveled Golden Ring with Ticks
      const baseRadius = Math.min(w, h) * 0.32;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(214, 184, 120, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Precision Dial Ticks (60 subdivisions like luxury chronograph)
      ctx.save();
      ctx.rotate(time * 0.08);
      for (let i = 0; i < 60; i++) {
        const isMajor = i % 5 === 0;
        const tickLen = isMajor ? 9 : 4;
        ctx.beginPath();
        ctx.moveTo(baseRadius - tickLen, 0);
        ctx.lineTo(baseRadius, 0);
        ctx.strokeStyle = isMajor ? '#F0DDAA' : 'rgba(214, 184, 120, 0.35)';
        ctx.lineWidth = isMajor ? 1.8 : 1;
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / 60);
      }
      ctx.restore();

      // Secondary Concentric Planetary Gear / Orbital Rings
      const innerRadius1 = baseRadius * 0.75;
      ctx.save();
      ctx.rotate(-time * 0.14);
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180, 145, 80, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Satellite Jewels on Orbit
      for (let j = 0; j < 6; j++) {
        const ang = (j * Math.PI * 2) / 6;
        const jx = Math.cos(ang) * innerRadius1;
        const jy = Math.sin(ang) * innerRadius1;
        ctx.beginPath();
        ctx.arc(jx, jy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#F0DDAA';
        ctx.shadowColor = '#D6B878';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // Escapement Tourbillon Kinetic Cage
      ctx.save();
      ctx.rotate(time * 0.4);
      ctx.beginPath();
      ctx.rect(-baseRadius * 0.38, -baseRadius * 0.38, baseRadius * 0.76, baseRadius * 0.76);
      ctx.strokeStyle = 'rgba(214, 184, 120, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Central Diamond Pivot
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#FBF4E6';
      ctx.shadowColor = '#F0DDAA';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Sweep Chronograph Hands with Gold Tail
      ctx.save();
      ctx.rotate(time * 1.2);
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(0, -baseRadius * 0.92);
      ctx.strokeStyle = '#D6B878';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      // Counterweight diamond
      ctx.beginPath();
      ctx.arc(0, 14, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#D6B878';
      ctx.fill();
      ctx.restore();

      ctx.restore(); // end center translation

      // 4. Floating Ambient Gold Dust Particles
      particles.forEach((p) => {
        if (isPlaying) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulse += 0.03;
          if (p.y < 0) p.y = 1;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
        }

        const px = p.x * w;
        const py = p.y * h;
        const alpha = Math.sin(p.pulse) * 0.3 + p.alpha;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 221, 170, ${Math.max(0.1, alpha)})`;
        ctx.shadowColor = 'rgba(214, 184, 120, 0.6)';
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Filmic Letterbox Mask & 35mm Vignette Overlay
      const gradVignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.4, w / 2, h / 2, Math.max(w, h) * 0.75);
      gradVignette.addColorStop(0, 'rgba(0,0,0,0)');
      gradVignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = gradVignette;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, totalDuration]);

  // Active chapter computation
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < chapters.length; i++) {
      accumulated += chapters[i].duration;
      if (progress <= accumulated) {
        setCurrentChapterIndex(i);
        break;
      }
    }
  }, [progress]);

  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`relative w-full rounded-3xl bg-[#0D0C0A] border border-[var(--border-gold)] overflow-hidden shadow-2xl group ${className}`}>
      {/* Aspect Ratio Container (2.1:1 Widescreen Cinema Format) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#080808]">
        {/* Procedural WebGL / Canvas Cinematic Video Stream */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        />

        {/* Cinematic Film Grain & Scanline Ambient Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(214, 184, 120, 0.15) 1px, transparent 0)`,
            backgroundSize: '4px 4px',
          }}
        />

        {/* Top Video HUD Information Bar */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between text-xs z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#14120E]/90 border border-[#383126] text-[#D6B878] font-mono text-[10px] tracking-wider uppercase backdrop-blur-md">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-amber-500'}`} />
              <span>{isPlaying ? 'LIVE PRORES 4K' : 'PAUSED'}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-[#B6B0A4] border border-[#383126]">
              <span>60 FPS</span>
              <span className="text-[#D6B878]">•</span>
              <span>ACES FILMIC</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#D6B878] tracking-widest hidden md:inline">
              BZ DIGITAL SHOWREEL 2026
            </span>
            <div className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1C1812] text-[#F0DDAA] border border-[#383126]">
              {qualityMode} MASTER
            </div>
          </div>
        </div>

        {/* Center Big Play Button Overlay (when paused or hover) */}
        {!isPlaying && (
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs cursor-pointer z-30 transition-all duration-300"
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] flex items-center justify-center shadow-[0_0_35px_rgba(214,184,120,0.6)] cursor-pointer"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
            </motion.div>
          </div>
        )}

        {/* Chapter Title & Lower Third Overlay */}
        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 z-20 max-w-md pointer-events-none">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#D6B878] uppercase mb-1">
            <Sparkles className="w-3 h-3 text-[#D6B878]" />
            <span>{currentChapter.code}</span>
          </div>
          <h4 className="text-base sm:text-xl font-serif-luxury font-bold text-[#F5F1E8] drop-shadow-md">
            {currentChapter.title}
          </h4>
        </div>

        {/* Interactive Bottom Control Dock */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 flex flex-col gap-2">
          {/* Progress Timeline Scrubber */}
          <div 
            className="w-full h-1.5 bg-[#252018] rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              setProgress(ratio * totalDuration);
            }}
          >
            <div 
              className="h-full bg-gradient-to-r from-[#D6B878] via-[#F0DDAA] to-[#D6B878] rounded-full transition-all duration-100"
              style={{ width: `${(progress / totalDuration) * 100}%` }}
            />
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between pt-1">
            {/* Play/Pause & Audio Toggles */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 sm:p-2 rounded-lg bg-[#181612] border border-[#383126] text-[#D6B878] hover:text-[#F0DDAA] hover:border-[#D6B878] transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 sm:p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  !isMuted 
                    ? 'bg-[#1C1812] border-[#D6B878] text-[#F0DDAA] shadow-[0_0_12px_rgba(214,184,120,0.3)]' 
                    : 'bg-[#181612] border-[#383126] text-[#B6B0A4] hover:text-[#F5F1E8]'
                }`}
                aria-label={isMuted ? 'Unmute luxury soundscape' : 'Mute soundscape'}
                title={isMuted ? 'Enable Ambient Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D6B878] animate-pulse" />}
                <span className="hidden sm:inline text-[10px] font-mono uppercase">
                  {isMuted ? 'Muted' : 'Audio On'}
                </span>
              </button>

              {/* Timestamp */}
              <div className="text-[11px] font-mono text-[#B6B0A4] pl-1 hidden sm:block">
                <span>{formatTime(progress)}</span> / <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Chapter Selection Pills */}
            <div className="hidden lg:flex items-center gap-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    let acc = 0;
                    for (let j = 0; j < idx; j++) acc += chapters[j].duration;
                    setProgress(acc);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                    currentChapterIndex === idx 
                      ? 'bg-[#2A241C] text-[#F0DDAA] border border-[#D6B878]' 
                      : 'bg-black/40 text-[#8E877B] hover:text-[#B6B0A4]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Quality & Action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQualityMode(qualityMode === '4K' ? '1080P' : '4K')}
                className="px-2 py-1 rounded text-[10px] font-mono bg-[#181612] text-[#D6B878] border border-[#383126] hover:border-[#D6B878] transition-colors cursor-pointer"
              >
                {qualityMode}
              </button>

              {onOpenQuoteModal && (
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D6B878] to-[#F0DDAA] text-[#080808] font-display hover:brightness-105 transition-all cursor-pointer font-bold"
                >
                  <span>Commission Film</span>
                  <ArrowRight className="w-3 h-3 text-[#080808]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
