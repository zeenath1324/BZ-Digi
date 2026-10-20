import * as THREE from 'three';

/**
 * Procedural texture generators for luxury materials and dials.
 * All textures are generated 100% procedurally on HTML5 Canvas.
 * No external image assets or 404 dependencies.
 */

export function createWatchDialTexture(finish: 'gold' | 'dark' | 'rose' | 'platinum'): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;

  // Background base tone
  let bgGradient: CanvasGradient;
  let primaryGold: string;
  let secondaryGold: string;

  if (finish === 'dark') {
    bgGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    bgGradient.addColorStop(0, '#1E1E22');
    bgGradient.addColorStop(0.7, '#121214');
    bgGradient.addColorStop(1, '#0A0A0C');
    primaryGold = '#D6B878';
    secondaryGold = '#8C774B';
  } else if (finish === 'rose') {
    bgGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    bgGradient.addColorStop(0, '#2A2022');
    bgGradient.addColorStop(0.7, '#1A1416');
    bgGradient.addColorStop(1, '#100D0E');
    primaryGold = '#E8A399';
    secondaryGold = '#A56A60';
  } else if (finish === 'platinum') {
    bgGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    bgGradient.addColorStop(0, '#2C3038');
    bgGradient.addColorStop(0.7, '#1A1C22');
    bgGradient.addColorStop(1, '#0F1014');
    primaryGold = '#E0E6ED';
    secondaryGold = '#8B94A0';
  } else {
    // Gold
    bgGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    bgGradient.addColorStop(0, '#241F16');
    bgGradient.addColorStop(0.7, '#16130D');
    bgGradient.addColorStop(1, '#0C0A07');
    primaryGold = '#F3D28E';
    secondaryGold = '#A6833D';
  }

  ctx.fillStyle = bgGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Procedural Guilloché sunburst radial rays
  ctx.save();
  ctx.translate(cx, cy);
  const rays = 120;
  for (let i = 0; i < rays; i++) {
    const angle = (i * Math.PI * 2) / rays;
    ctx.rotate((Math.PI * 2) / rays);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(214, 184, 120, 0.08)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(70, 0);
    ctx.lineTo(r - 40, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Concentric Clous de Paris ring
  ctx.strokeStyle = 'rgba(214, 184, 120, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(214, 184, 120, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 90, 0, Math.PI * 2);
  ctx.stroke();

  // Minute & Second track (60 tick marks)
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI * 2) / 60 - Math.PI / 2;
    const isHour = i % 5 === 0;
    const innerRadius = isHour ? r - 80 : r - 65;
    const outerRadius = r - 50;

    const x1 = cx + Math.cos(angle) * innerRadius;
    const y1 = cy + Math.sin(angle) * innerRadius;
    const x2 = cx + Math.cos(angle) * outerRadius;
    const y2 = cy + Math.sin(angle) * outerRadius;

    ctx.strokeStyle = isHour ? primaryGold : 'rgba(214, 184, 120, 0.4)';
    ctx.lineWidth = isHour ? 3.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Roman Numerals for 12, 3, 6, 9
  ctx.fillStyle = primaryGold;
  ctx.font = 'bold 34px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const romanHours = [
    { num: 'XII', angle: -Math.PI / 2 },
    { num: 'III', angle: 0 },
    { num: 'VI', angle: Math.PI / 2 },
    { num: 'IX', angle: Math.PI },
  ];

  const numeralRadius = r - 120;
  romanHours.forEach(({ num, angle }) => {
    // Leave space at bottom for tourbillon aperture (VI is skipped or subtle)
    if (num === 'VI') return;
    const x = cx + Math.cos(angle) * numeralRadius;
    const y = cy + Math.sin(angle) * numeralRadius;
    ctx.fillText(num, x, y);
  });

  // Haute Horlogerie Brand Typography
  ctx.fillStyle = primaryGold;
  ctx.font = 'bold 22px "Cinzel", Georgia, serif';
  ctx.fillText('BZ DIGITAL', cx, cy - 110);

  ctx.fillStyle = secondaryGold;
  ctx.font = '10px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('HAUTE HORLOGERIE • ATELIER NO. 01', cx, cy - 85);

  ctx.fillStyle = 'rgba(214, 184, 120, 0.7)';
  ctx.font = '9px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TOURBILLON CHRONOMÈTRE', cx, cy + 85);

  // Subdial circle at 9 o'clock (30-minute counter)
  const subX = cx - 120;
  const subY = cy;
  const subR = 60;
  ctx.strokeStyle = 'rgba(214, 184, 120, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(subX, subY, subR, 0, Math.PI * 2);
  ctx.stroke();

  // Subdial ticks
  for (let s = 0; s < 12; s++) {
    const sAngle = (s * Math.PI * 2) / 12;
    const sx1 = subX + Math.cos(sAngle) * (subR - 10);
    const sy1 = subY + Math.sin(sAngle) * (subR - 10);
    const sx2 = subX + Math.cos(sAngle) * subR;
    const sy2 = subY + Math.sin(sAngle) * subR;
    ctx.beginPath();
    ctx.moveTo(sx1, sy1);
    ctx.lineTo(sx2, sy2);
    ctx.stroke();
  }

  // Open-heart tourbillon aperture ring at 6 o'clock
  const tourbillonX = cx;
  const tourbillonY = cy + 130;
  const tourbillonR = 80;
  ctx.strokeStyle = primaryGold;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(tourbillonX, tourbillonY, tourbillonR, 0, Math.PI * 2);
  ctx.stroke();

  // Cut-out dark depth inside aperture
  ctx.fillStyle = '#050505';
  ctx.beginPath();
  ctx.arc(tourbillonX, tourbillonY, tourbillonR - 3, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural brushed metal / micro-scratches normal & roughness map
 */
export function createBrushedMetalTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  // Generate directional micro-grooves
  for (let y = 0; y < size; y++) {
    const rowNoise = Math.sin(y * 0.4) * 15 + (Math.random() - 0.5) * 20;
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const grain = 128 + rowNoise + (Math.random() - 0.5) * 15;
      const clamped = Math.max(0, Math.min(255, grain));

      // Tangent space normal pointing primarily along Z (0, 0, 1) = RGB(128, 128, 255)
      data[idx] = 128 + (Math.random() - 0.5) * 10;
      data[idx + 1] = clamped;
      data[idx + 2] = 245;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * Procedural soft radial contact shadow texture for grounding hero objects
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
  grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.45)');
  grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
