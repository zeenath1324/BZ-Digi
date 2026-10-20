import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Film, 
  Layers, 
  Compass, 
  TrendingUp, 
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';

interface HeroCinematicVideoProps {
  onOpenShowreelModal?: () => void;
}

export const HeroCinematicVideo: React.FC<HeroCinematicVideoProps> = ({ onOpenShowreelModal }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(18);
  const [currentTime, setCurrentTime] = useState<string>('00:16');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const chapters = [
    { title: 'Haute Horlogerie 3D', duration: '00:00 - 00:22', icon: Compass },
    { title: 'Sub-Second Headless Web', duration: '00:22 - 00:45', icon: Layers },
    { title: 'Algorithmic Acquisition', duration: '00:45 - 01:05', icon: TrendingUp },
    { title: 'Category Domination', duration: '01:05 - 01:24', icon: ShieldCheck },
  ];

  // Procedural canvas particle / liquid gold animation loop for cinema visuals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 500;
    const height = canvas.clientHeight || 500;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Particle nodes for kinematic mesh
    const numPoints = 28;
    const points: Array<{ x: number; y: number; r: number; speed: number; angle: number }> = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: width * (0.2 + Math.random() * 0.6),
        y: height * (0.2 + Math.random() * 0.6),
        r: 2 + Math.random() * 4,
        speed: 0.005 + Math.random() * 0.015,
        angle: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      t += 0.02;

      // Dark cinematic obsidian canvas
      ctx.fillStyle = '#0A0907';
      ctx.fillRect(0, 0, width, height);

      // Radial Gold Ambient Backlight
      const radGrad = ctx.createRadialGradient(
        width / 2, height / 2, 20,
        width / 2, height / 2, width * 0.6
      );
      radGrad.addColorStop(0, 'rgba(214, 184, 120, 0.25)');
      radGrad.addColorStop(0.4, 'rgba(156, 123, 61, 0.12)');
      radGrad.addColorStop(0.8, 'rgba(16, 14, 10, 0.8)');
      radGrad.addColorStop(1, '#080808');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Rotating Concentric Luxury Gold Rings
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.32;

      for (let ring = 1; ring <= 3; ring++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * (ring % 2 === 0 ? 0.3 : -0.2) + ring);
        
        ctx.beginPath();
        ctx.arc(0, 0, baseR * (0.6 + ring * 0.22), 0, Math.PI * 2);
        ctx.strokeStyle = ring === 2 ? 'rgba(240, 221, 170, 0.45)' : 'rgba(214, 184, 120, 0.2)';
        ctx.lineWidth = ring === 2 ? 1.5 : 1;
        ctx.stroke();

        // Small orbital satellite dots
        const dotAngle = t * (0.8 + ring * 0.2);
        const rDot = baseR * (0.6 + ring * 0.22);
        const dotX = Math.cos(dotAngle) * rDot;
        const dotY = Math.sin(dotAngle) * rDot;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#F0DDAA';
        ctx.shadowColor = '#D6B878';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // Procedural Shimmering Kinetic Mesh Lines
      ctx.save();
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        pt.angle += pt.speed;
        const curX = pt.x + Math.sin(pt.angle + t) * 35;
        const curY = pt.y + Math.cos(pt.angle * 1.2 + t) * 35;

        // Draw connections to nearby points
        for (let j = i + 1; j < points.length; j++) {
          const pt2 = points[j];
          const curX2 = pt2.x + Math.sin(pt2.angle + t) * 35;
          const curY2 = pt2.y + Math.cos(pt2.angle * 1.2 + t) * 35;
          const dist = Math.hypot(curX - curX2, curY - curY2);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.4;
            ctx.beginPath();
            ctx.moveTo(curX, curY);
            ctx.lineTo(curX2, curY2);
            ctx.strokeStyle = `rgba(214, 184, 120, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw glowing golden particle
        ctx.beginPath();
        ctx.arc(curX, curY, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 222, 179, 0.7)';
        ctx.shadowColor = '#D6B878';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();

      // Central Imperial Emblem Glow
      ctx.save();
      ctx.translate(cx, cy);
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      ctx.scale(pulse, pulse);

      // Central Shield/Box
      ctx.beginPath();
      const s = 48;
      ctx.roundRect(-s / 2, -s / 2, s, s, 10);
      ctx.fillStyle = '#14120E';
      ctx.strokeStyle = '#D6B878';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(214, 184, 120, 0.4)';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.stroke();

      // Golden Interlocking Serif Monogram Text
      ctx.fillStyle = '#F5F1E8';
      ctx.font = 'bold 20px "Cinzel Decorative", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BZ', 0, 1);
      ctx.restore();

      if (isPlaying) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  // Video progress counter simulation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev >= 100 ? 0 : prev + 0.6;
        const totalSeconds = 84; // 1:24
        const curSeconds = Math.floor((next / 100) * totalSeconds);
        const mins = Math.floor(curSeconds / 60);
        const secs = curSeconds % 60;
        setCurrentTime(`0${mins}:${secs < 10 ? '0' : ''}${secs}`);

        // Update chapters
        if (curSeconds < 22) setActiveChapterIndex(0);
        else if (curSeconds < 45) setActiveChapterIndex(1);
        else if (curSeconds < 65) setActiveChapterIndex(2);
        else setActiveChapterIndex(3);

        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const jumpToChapter = (idx: number) => {
    setActiveChapterIndex(idx);
    const chapterProgress = [0, 26, 54, 78];
    setProgress(chapterProgress[idx]);
  };

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex flex-col justify-between rounded-3xl bg-[#0C0B08] border-2 border-[var(--border-gold)] p-3 sm:p-4 shadow-2xl overflow-hidden group select-none transition-all duration-300 hover:border-[var(--gold-primary)] hover:shadow-[0_20px_60px_rgba(214,184,120,0.18)]">
      
      {/* Golden Corner Alignment Marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold-primary)] pointer-events-none z-30" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold-primary)] pointer-events-none z-30" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold-primary)] pointer-events-none z-30" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold-primary)] pointer-events-none z-30" />

      {/* Top Video Header Bar */}
      <div className="relative z-20 flex items-center justify-between pb-2.5 px-2 border-b border-[#383126]/60 text-xs">
        {/* Left Live Recording / Broadcast Pill */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-red-400 opacity-75' : 'bg-yellow-400 opacity-50'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-red-500' : 'bg-yellow-500'}`} />
          </span>
          <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--gold-primary)] font-bold">
            {isPlaying ? 'SHOWREEL • PLAYING' : 'SHOWREEL • PAUSED'}
          </span>
        </div>

        {/* Right Quality Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#181510] text-[#D6B878] border border-[#383126]">
            4K CINEMA • 60 FPS
          </span>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono text-[#F5F1E8] bg-[#14120E] border border-[#2D261C]">
            ACES PBR
          </span>
        </div>
      </div>

      {/* Center Video Frame Canvas & Animated Motion Backdrop */}
      <div className="relative flex-1 w-full rounded-2xl overflow-hidden my-2 flex items-center justify-center bg-black">
        {/* Canvas Rendered Procedural Liquid Gold & 3D Kinematics */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover block cursor-pointer"
          onClick={togglePlay}
          title="Click to play/pause video showreel"
        />

        {/* Subtle Anamorphic Lens Flare & Scanline Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />

        {/* Big Center Play/Pause Overlay Button when Hovered or Paused */}
        <div 
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            !isPlaying ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] text-[#080808] flex items-center justify-center shadow-[0_0_30px_var(--gold-glow)] pointer-events-auto transform group-hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Floating Active Chapter Indicator Tag */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[var(--border-gold)] flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[var(--gold-primary)]" />
          <span className="text-[10px] font-mono text-[#F5F1E8] font-medium tracking-wide">
            {chapters[activeChapterIndex].title}
          </span>
        </div>

        {/* Floating Timecode */}
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#383126] font-mono text-[10px] text-[var(--gold-light)]">
          {currentTime} / 01:24
        </div>
      </div>

      {/* Video Progress Scrubber Bar */}
      <div className="relative z-20 px-1 pt-1 pb-2">
        <div 
          className="w-full h-1.5 rounded-full bg-[#1C1812] border border-[#383126] cursor-pointer overflow-hidden relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            setProgress(pos * 100);
          }}
        >
          <div 
            className="h-full bg-gradient-to-r from-[var(--gold-primary)] via-[#F0DDAA] to-[var(--gold-primary)] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Video Controls & Chapter Navigation */}
      <div className="relative z-20 flex flex-col gap-2 pt-1 border-t border-[#383126]/60">
        {/* Quick Chapter Selector Pills */}
        <div className="grid grid-cols-4 gap-1">
          {chapters.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToChapter(idx)}
                className={`py-1 px-1.5 rounded-md text-[9px] font-mono uppercase tracking-tight text-center truncate transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-[#1C1812] border-[var(--gold-primary)] text-[var(--gold-primary)] font-bold'
                    : 'bg-[#12100C] border-[#2D261C] text-[#8E877B] hover:text-[#B6B0A4]'
                }`}
                title={ch.title}
              >
                0{idx + 1}. {ch.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-[#14120E] border border-[#383126] text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-[#14120E] border border-[#383126] text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <span className="text-[10px] text-[#8E877B] font-mono hidden sm:inline">
              {isMuted ? 'Muted' : 'Audio On'}
            </span>
          </div>

          {/* Fullscreen / Theater Modal Trigger */}
          <button
            type="button"
            onClick={onOpenShowreelModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181611] border border-[var(--border-gold)] hover:border-[var(--gold-primary)] text-[#F5F1E8] hover:text-[var(--gold-light)] text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <Maximize2 className="w-3 h-3 text-[var(--gold-primary)]" />
            <span>Theater Mode</span>
          </button>
        </div>
      </div>

    </div>
  );
};
