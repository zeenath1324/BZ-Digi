import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Eye, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Compass, 
  Maximize2,
  Watch,
  Box,
  Send
} from 'lucide-react';
import { SceneSubject, CameraPreset } from '../three/StudioScene';
import { MaterialFinish } from '../three/models/chronographModel';
import { studioAudio } from '../three/audioSynthesizer';

interface StudioDockProps {
  currentSubject: SceneSubject;
  onSubjectChange: (subject: SceneSubject) => void;
  currentFinish: MaterialFinish;
  onFinishChange: (finish: MaterialFinish) => void;
  explodedProgress: number;
  onExplodedChange: (value: number) => void;
  currentPreset: CameraPreset;
  onCameraPresetChange: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  fps: number;
}

export const StudioDock: React.FC<StudioDockProps> = ({
  currentSubject,
  onSubjectChange,
  currentFinish,
  onFinishChange,
  explodedProgress,
  onExplodedChange,
  currentPreset,
  onCameraPresetChange,
  autoRotate,
  onToggleAutoRotate,
  wireframe,
  onToggleWireframe,
  fps,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'exploded' | 'finishes' | 'camera'>('exploded');

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    studioAudio.init();
    studioAudio.setEnabled(next);
  };

  const finishes: { id: MaterialFinish; label: string; colorHex: string }[] = [
    { id: 'gold', label: '18K Gold', colorHex: '#D6B878' },
    { id: 'dark', label: 'Titanium', colorHex: '#4A4E5A' },
    { id: 'rose', label: 'Rose Gold', colorHex: '#E2A499' },
    { id: 'platinum', label: 'Platinum', colorHex: '#E0E6ED' },
  ];

  const cameraViews: { id: CameraPreset; label: string }[] = [
    { id: 'hero', label: 'Hero 3/4' },
    { id: 'macro', label: 'Macro Core' },
    { id: 'profile', label: 'Profile' },
    { id: 'top', label: 'Top-Down' },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-4xl select-none transition-transform duration-300 pointer-events-auto">
      {/* Collapse / Expand Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#D6B878] bg-[#12100E] border-t border-x border-[#383126] rounded-t-lg shadow-lg hover:text-[#F5DEB3] hover:bg-[#1A1714] transition-all cursor-pointer"
          title={isCollapsed ? 'Show Atelier Controls (H)' : 'Hide Controls for Fullscreen View (H)'}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Zen View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Solid Luxury Surface Dock (No backdrop-filter to prevent WebGL stalls) */}
      <div
        className={`bg-[#12100E] border border-[#383126] rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-300 ${
          isCollapsed ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Row 1: Subject Model Tabs & Utility Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2A241C]">
          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 bg-[#0C0B0A] p-1 rounded-xl border border-[#241F18]">
            <button
              onClick={() => onSubjectChange('chronograph')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                currentSubject === 'chronograph'
                  ? 'bg-[#2A2318] text-[#F3D28E] border border-[#D6B878]/50 shadow-sm'
                  : 'text-[#A8A296] hover:text-[#F5F1E8] hover:bg-[#181613]'
              }`}
            >
              <Watch className="w-3.5 h-3.5" />
              <span>Haute Chronograph</span>
            </button>

            <button
              onClick={() => onSubjectChange('monolith')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                currentSubject === 'monolith'
                  ? 'bg-[#2A2318] text-[#F3D28E] border border-[#D6B878]/50 shadow-sm'
                  : 'text-[#A8A296] hover:text-[#F5F1E8] hover:bg-[#181613]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Kinetic Monolith</span>
            </button>

            <button
              onClick={() => onSubjectChange('aero')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                currentSubject === 'aero'
                  ? 'bg-[#2A2318] text-[#F3D28E] border border-[#D6B878]/50 shadow-sm'
                  : 'text-[#A8A296] hover:text-[#F5F1E8] hover:bg-[#181613]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Aero Horizon</span>
            </button>
          </div>

          {/* Quick Toggles: Orbit, Sound, Wireframe, FPS (clean static status, NO pulsating dots) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAutoRotate}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                autoRotate
                  ? 'bg-[#2A2318] text-[#F3D28E] border-[#D6B878]/40'
                  : 'bg-[#181613] text-[#A8A296] border-[#2A241C] hover:text-[#F5F1E8]'
              }`}
              title="Toggle Slow Orbital Rotation"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'text-[#D6B878]' : ''}`} />
              <span className="hidden sm:inline text-[11px]">Orbit</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-[#2A2318] text-[#F3D28E] border-[#D6B878]/40'
                  : 'bg-[#181613] text-[#A8A296] border-[#2A241C] hover:text-[#F5F1E8]'
              }`}
              title="Toggle Mechanical Escapement Sound (Web Audio)"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D6B878]" />
                  <span className="hidden sm:inline text-[11px]">Audio</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Mute</span>
                </>
              )}
            </button>

            <button
              onClick={onToggleWireframe}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                wireframe
                  ? 'bg-[#2A2318] text-[#F3D28E] border-[#D6B878]/40'
                  : 'bg-[#181613] text-[#A8A296] border-[#2A241C] hover:text-[#F5F1E8]'
              }`}
              title="Inspect 3D Geometry Wireframe"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Wire</span>
            </button>

            {/* Static Clean Spec Badge (no pulse animation) */}
            <div className="px-2.5 py-1 bg-[#0A0A0C] border border-[#241F18] rounded-md text-[10.5px] font-mono text-[#D6B878]">
              {fps > 0 ? `${fps} FPS` : '60 FPS'}
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Controls (Exploded View / Finishes / Camera Presets) */}
        <div className="pt-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Exploded View Slider Section */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A8A296] flex items-center gap-1.5 font-medium">
                <Layers className="w-3.5 h-3.5 text-[#D6B878]" />
                Exploded Architecture
              </span>
              <span className="font-mono text-[#F3D28E] font-semibold">
                {Math.round(explodedProgress * 100)}%
              </span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedProgress}
                onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#221D16] rounded-lg appearance-none cursor-pointer accent-[#D6B878]"
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#787164]">
              <span>Assembled Piece</span>
              <span>Layer Separation</span>
            </div>
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-[#2A241C]" />

          {/* Material Finish Swatches */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#A8A296] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />
              Physical Material
            </span>
            <div className="flex items-center gap-2">
              {finishes.map((f) => {
                const isSelected = currentFinish === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      onFinishChange(f.id);
                      studioAudio.playGlideChime(640);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2A2318] text-[#F3D28E] border-[#D6B878]'
                        : 'bg-[#181613] text-[#A8A296] border-[#2A241C] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/40 shadow-inner"
                      style={{ backgroundColor: f.colorHex }}
                    />
                    <span className="text-[11px]">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-[#2A241C]" />

          {/* Camera Angles */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#A8A296] font-medium flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#D6B878]" />
              Camera Angles
            </span>
            <div className="flex items-center gap-1.5">
              {cameraViews.map((c) => {
                const isSelected = currentPreset === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onCameraPresetChange(c.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2A2318] text-[#F3D28E] border-[#D6B878]'
                        : 'bg-[#181613] text-[#A8A296] border-[#2A241C] hover:text-[#F5F1E8]'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
