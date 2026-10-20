import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Info } from 'lucide-react';
import { StudioScene, SceneSubject, CameraPreset } from '../three/StudioScene';
import { MaterialFinish } from '../three/models/chronographModel';
import { StudioDock } from '../components/StudioDock';

interface Atelier3DProps {
  onOpenQuoteModal?: () => void;
}

export const Atelier3D: React.FC<Atelier3DProps> = ({ onOpenQuoteModal }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<StudioScene | null>(null);

  const [subject, setSubject] = useState<SceneSubject>('chronograph');
  const [finish, setFinish] = useState<MaterialFinish>('gold');
  const [exploded, setExploded] = useState<number>(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('hero');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [showSpecSheet, setShowSpecSheet] = useState<boolean>(false);

  // Initialize WebGL Scene on mount once
  useEffect(() => {
    if (!mountRef.current) return;

    const studio = new StudioScene({
      container: mountRef.current,
      initialSubject: 'chronograph',
      initialFinish: 'gold',
      onFpsUpdate: (currentFps) => setFps(currentFps),
    });
    studioRef.current = studio;

    return () => {
      studio.dispose();
      studioRef.current = null;
    };
  }, []);

  // Update subject
  const handleSubjectChange = useCallback((nextSubject: SceneSubject) => {
    setSubject(nextSubject);
    studioRef.current?.loadSubject(nextSubject);
    // Reset exploded slider on subject change
    setExploded(0);
    studioRef.current?.setExplodedProgress(0);
  }, []);

  // Update finish
  const handleFinishChange = useCallback((nextFinish: MaterialFinish) => {
    setFinish(nextFinish);
    studioRef.current?.setFinish(nextFinish);
  }, []);

  // Update exploded slider
  const handleExplodedChange = useCallback((value: number) => {
    setExploded(value);
    studioRef.current?.setExplodedProgress(value);
  }, []);

  // Update camera preset
  const handleCameraPresetChange = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset);
    studioRef.current?.applyCameraPreset(preset);
  }, []);

  // Toggle auto orbit
  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => {
      const next = !prev;
      studioRef.current?.setAutoRotate(next);
      return next;
    });
  }, []);

  // Toggle wireframe
  const handleToggleWireframe = useCallback(() => {
    setWireframe((prev) => {
      const next = !prev;
      studioRef.current?.setWireframe(next);
      return next;
    });
  }, []);

  // Metadata for active subject
  const subjectSpecs: Record<SceneSubject, { title: string; subtitle: string; parts: string; highlight: string }> = {
    chronograph: {
      title: 'Haute Horlogerie Chronographe No. 01',
      subtitle: 'Open-Heart Flying Tourbillon & Perpetual Escapement',
      parts: '11 Procedural Micro-Assemblies',
      highlight: '28,800 vph Harmonic Balance Wheel • 18K Solid Gold / Titanium',
    },
    monolith: {
      title: 'Sovereign Monolith & Kinetic Gyroscope',
      subtitle: 'Multiaxial Orbital Gimbal & Diamond Octahedron Core',
      parts: '6 Geometric Kinetic Sub-Structures',
      highlight: 'Optical Dispersion Crystal • Black Granite Architectural Plinth',
    },
    aero: {
      title: 'Aero Concept Horizon Supersonic',
      subtitle: 'Mach 2.4 Luxury Jet Fuselage & Swept Strakes',
      parts: '6 Aerodynamic Component Modules',
      highlight: 'Titanium-Alloy Airframe • Twin Turbofan Propulsion Disk Array',
    },
  };

  const activeSpec = subjectSpecs[subject];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0C] text-[#F5F1E8]">
      {/* 1. Isolated WebGL Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. Top-Left Luxury HUD Specification Badge (Minimal footprint, <= 15% viewport) */}
      <div className="absolute top-6 left-6 z-30 flex flex-col gap-2 max-w-sm pointer-events-auto">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#D6B878] bg-[#12100E] border border-[#383126] rounded-lg hover:text-[#F5DEB3] hover:border-[#D6B878] transition-all shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </Link>

          <button
            onClick={() => setShowSpecSheet(!showSpecSheet)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#A8A296] bg-[#12100E] border border-[#383126] rounded-lg hover:text-[#D6B878] transition-colors shadow-lg cursor-pointer"
            title="Toggle Technical Blueprint Specifications"
          >
            <Info className="w-3.5 h-3.5 text-[#D6B878]" />
            <span className="hidden sm:inline">Tech Specs</span>
          </button>
        </div>

        {/* Spec Box */}
        <div className="bg-[#12100E] border border-[#383126] rounded-xl p-3.5 shadow-2xl transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6B878] bg-[#241F16] px-2 py-0.5 rounded border border-[#383126]">
              BZ Atelier 3D
            </span>
            <span className="text-[10px] font-mono text-[#8C8476]">{activeSpec.parts}</span>
          </div>
          <h1 className="text-sm sm:text-base font-serif-luxury font-bold text-[#F5F1E8] tracking-wide">
            {activeSpec.title}
          </h1>
          <p className="text-xs text-[#B6B0A4] mt-0.5 line-clamp-1">{activeSpec.subtitle}</p>
          <div className="mt-2 pt-2 border-t border-[#241F16] flex items-center justify-between text-[11px] text-[#D6B878]">
            <span className="truncate pr-2">{activeSpec.highlight}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#D6B878] flex-shrink-0" />
          </div>
        </div>

        {/* Extended Technical Blueprint Drawer (Optional expansion) */}
        {showSpecSheet && (
          <div className="bg-[#12100E] border border-[#383126] rounded-xl p-3.5 shadow-2xl text-xs space-y-2 animate-fadeIn">
            <div className="text-[11px] font-semibold text-[#D6B878] uppercase tracking-wider">
              Procedural Craft Architecture
            </div>
            <p className="text-[11px] text-[#A8A296] leading-relaxed">
              Every curve, gear tooth, bevel, and reflection is synthesized in real-time code via Three.js PBR shaders. No external 3D model files are downloaded.
            </p>
            <ul className="text-[10.5px] space-y-1 text-[#C6C0B4] pt-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B878]" />
                PBR Tone-Mapping: ACES Filmic with Studio Environment
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B878]" />
                Zero-GC Kinematic Animation Loop with Clamped Delta
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B878]" />
                Interactive Exploded View with Exponential Damping
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 3. Top-Right Call to Action (Inquire for Custom 3D Experiences) */}
      <div className="absolute top-6 right-6 z-30 pointer-events-auto">
        {onOpenQuoteModal && (
          <button
            onClick={onOpenQuoteModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D6B878] to-[#F3D28E] text-[#12100E] font-semibold text-xs tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission 3D Atelier</span>
          </button>
        )}
      </div>

      {/* 4. Unified Ergonomic Bottom Control Dock */}
      <StudioDock
        currentSubject={subject}
        onSubjectChange={handleSubjectChange}
        currentFinish={finish}
        onFinishChange={handleFinishChange}
        explodedProgress={exploded}
        onExplodedChange={handleExplodedChange}
        currentPreset={cameraPreset}
        onCameraPresetChange={handleCameraPresetChange}
        autoRotate={autoRotate}
        onToggleAutoRotate={handleToggleAutoRotate}
        wireframe={wireframe}
        onToggleWireframe={handleToggleWireframe}
        fps={fps}
      />
    </div>
  );
};
