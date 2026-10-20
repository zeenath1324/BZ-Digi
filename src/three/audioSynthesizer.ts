/**
 * Procedural Web Audio API sound generator for luxury mechanical timepieces.
 * Zero external MP3/WAV dependencies — synthesized purely with Web Audio API.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private lastTickTime: number = 0;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled && this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * High-frequency subtle mechanical escapement pallet click (4Hz / 28,800 vph horlogerie pulse)
   */
  public playEscapementTick(isAltTick = false) {
    if (!this.isEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastTickTime < 0.08) return; // rate limit
    this.lastTickTime = now;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Subtle crisp metallic click (higher pitch for pallet jewel strike)
    const baseFreq = isAltTick ? 3400 : 3800;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * Tactile slider adjustment or camera glide chime
   */
  public playGlideChime(freq = 520) {
    if (!this.isEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.1);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const studioAudio = new AudioSynthesizer();
