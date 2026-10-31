import { InvitationData, StyleCustomization, TemplatePalette } from '../types';
import { 
  drawRoundedRect, 
  drawStar, 
  drawSparkle, 
  shadeColor,
  draw3DRealisticBalloon,
  draw3DCelebrationBottomScene,
  draw3DFloatingConfetti,
  BalloonColorTheme
} from './canvasHelpers';

/**
 * MINGGO Invitation Studio — Professional Graphic Design Artwork Engines
 * Every template gets authentic, detailed, Canva Pro-grade illustrations.
 */

// Gradient Helpers
export function createGoldGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#bf953f');
  grad.addColorStop(0.25, '#fcf6ba');
  grad.addColorStop(0.5, '#b38728');
  grad.addColorStop(0.75, '#fbf5b7');
  grad.addColorStop(1, '#aa771c');
  return grad;
}

export function createRoseGoldGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#b76e79');
  grad.addColorStop(0.3, '#f7d3d8');
  grad.addColorStop(0.6, '#d98b95');
  grad.addColorStop(0.85, '#fae3e6');
  grad.addColorStop(1, '#9b5862');
  return grad;
}

export function createSilverGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#94a3b8');
  grad.addColorStop(0.25, '#f8fafc');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(0.75, '#ffffff');
  grad.addColorStop(1, '#64748b');
  return grad;
}

// 3D Realistic Metallic Balloon
export function drawMetallicBalloon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  type: 'gold' | 'rosegold' | 'silver' | 'custom',
  customColor: string = '#3b82f6',
  stringColor: string = 'rgba(255,255,255,0.7)',
  tiltDeg: number = 0
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((tiltDeg * Math.PI) / 180);

  // String
  ctx.save();
  ctx.strokeStyle = stringColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-20, ry + 50, 30, ry + 110, -10, ry + 170);
  ctx.bezierCurveTo(-30, ry + 210, 25, ry + 260, 5, ry + 320);
  ctx.stroke();
  ctx.restore();

  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 10;

  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-rx * 1.35, ry * 0.75, -rx * 1.15, -ry * 0.95, 0, -ry);
  ctx.bezierCurveTo(rx * 1.15, -ry * 0.95, rx * 1.35, ry * 0.75, 0, ry);
  ctx.closePath();

  if (type === 'gold') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff'); rad.addColorStop(0.2, '#fff6b8');
    rad.addColorStop(0.55, '#d4af37'); rad.addColorStop(0.85, '#996515'); rad.addColorStop(1, '#5c3a07');
    ctx.fillStyle = rad;
  } else if (type === 'rosegold') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff'); rad.addColorStop(0.25, '#fae1e4');
    rad.addColorStop(0.6, '#c47d87'); rad.addColorStop(0.85, '#8c4852'); rad.addColorStop(1, '#502028');
    ctx.fillStyle = rad;
  } else if (type === 'silver') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff'); rad.addColorStop(0.3, '#f1f5f9');
    rad.addColorStop(0.65, '#94a3b8'); rad.addColorStop(0.9, '#475569'); rad.addColorStop(1, '#1e293b');
    ctx.fillStyle = rad;
  } else {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff'); rad.addColorStop(0.25, customColor);
    rad.addColorStop(0.8, shadeColor(customColor, -25)); rad.addColorStop(1, shadeColor(customColor, -55));
    ctx.fillStyle = rad;
  }
  ctx.fill();
  ctx.restore();

  // Knot
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-6, ry); ctx.lineTo(6, ry); ctx.lineTo(9, ry + 9); ctx.lineTo(-9, ry + 9); ctx.closePath();
  ctx.fillStyle = type === 'gold' ? '#784c0c' : type === 'rosegold' ? '#6e303a' : type === 'silver' ? '#334155' : shadeColor(customColor, -40);
  ctx.fill();
  ctx.restore();

  // Specular Highlight
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(-rx * 0.38, -ry * 0.38, rx * 0.22, ry * 0.32, -Math.PI / 4, 0, Math.PI * 2);
  const specGrad = ctx.createLinearGradient(-rx * 0.5, -ry * 0.6, -rx * 0.2, -ry * 0.1);
  specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  specGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
  specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = specGrad;
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ========================================================
// CATEGORY A: KIDS & CARTOON THEMES (10)
// ========================================================

export function drawDinoSafariAdventure(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const sunGrad = ctx.createRadialGradient(width * 0.25, 0, 10, width * 0.25, height * 0.4, width * 0.7);
  sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
  sunGrad.addColorStop(0.5, 'rgba(74, 222, 128, 0.08)');
  sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#15803d'; ctx.lineWidth = 12; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.strokeRect(44, 44, width - 88, height - 88);

  // Jungle vines
  const drawVine = (startX: number, endX: number, dropY: number) => {
    ctx.save(); ctx.strokeStyle = '#166534'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(startX, 0); ctx.bezierCurveTo(startX + 60, dropY, endX - 60, dropY, endX, 0); ctx.stroke();
    for (let t = 0.15; t <= 0.85; t += 0.14) {
      const vx = startX + (endX - startX) * t;
      const vy = dropY * Math.sin(t * Math.PI);
      ctx.save(); ctx.translate(vx, vy); ctx.rotate((t - 0.5) * 1.2);
      ctx.fillStyle = t % 0.2 < 0.1 ? '#22c55e' : '#4ade80';
      ctx.beginPath(); ctx.ellipse(0, 12, 8, 16, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  };
  drawVine(20, width * 0.55, 85); drawVine(width * 0.45, width - 20, 95);

  // Monstera Leaves
  const drawMonsteraLeaf = (x: number, y: number, scale: number, rotation: number) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate((rotation * Math.PI) / 180); ctx.scale(scale, scale);
    ctx.fillStyle = '#14532d'; ctx.beginPath(); ctx.ellipse(0, 0, 55, 90, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(-8, -5, 38, 70, -0.08, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#86efac'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 85); ctx.lineTo(0, -85); ctx.stroke();
    ctx.restore();
  };
  drawMonsteraLeaf(65, 70, 0.85, 40); drawMonsteraLeaf(width - 65, 70, 0.85, -40);

  // T-Rex Character in Lower Right
  ctx.save();
  ctx.translate(width - 150, height - 190); ctx.scale(0.78, 0.78);
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.beginPath(); ctx.ellipse(0, 140, 130, 26, 0, 0, Math.PI * 2); ctx.fill();
  // Tail
  ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.moveTo(60, 40); ctx.bezierCurveTo(150, 60, 190, 10, 200, -30);
  ctx.bezierCurveTo(170, 10, 120, 60, 50, 80); ctx.closePath(); ctx.fill();
  // Body
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(0, 30, 75, 90, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.ellipse(-25, 40, 38, 65, -0.3, 0, Math.PI * 2); ctx.fill();
  // Head
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(-45, -75, 60, 48, -0.15, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-100, -85, 75, 48, [24, 8, 18, 20]); ctx.fill();
  // Eye
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(-45, -85, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-42, -85, 11, 0, Math.PI * 2); ctx.fill();
  // Party hat
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(-60, -95); ctx.lineTo(-45, -145); ctx.lineTo(-30, -95); ctx.fill();
  ctx.restore();

  ctx.restore();
}

export function drawAstronautGalaxy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Nebula
  const drawNebula = (cx: number, cy: number, r: number, color: string) => {
    const rad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    rad.addColorStop(0, color); rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  };
  drawNebula(width * 0.2, height * 0.25, 320, 'rgba(168, 85, 247, 0.24)');
  drawNebula(width * 0.8, height * 0.7, 340, 'rgba(6, 182, 212, 0.2)');

  // Stars
  for (let i = 0; i < 75; i++) {
    const sx = ((i * 137) % (width - 40)) + 20;
    const sy = ((i * 193) % (height - 40)) + 20;
    ctx.fillStyle = i % 3 === 0 ? '#38bdf8' : i % 5 === 0 ? '#fde047' : '#ffffff';
    ctx.beginPath(); ctx.arc(sx, sy, (i % 4 === 0) ? 2.5 : 1.2, 0, Math.PI * 2); ctx.fill();
  }

  // Astronaut in Upper Right
  ctx.save();
  ctx.translate(width - 130, 140); ctx.scale(0.85, 0.85); ctx.rotate(0.2);
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.roundRect(-25, -20, 50, 60, 14); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -42, 32, 0, Math.PI * 2); ctx.fill();
  const visor = ctx.createLinearGradient(-15, -55, 15, -30);
  visor.addColorStop(0, '#f59e0b'); visor.addColorStop(0.5, '#fef08a'); visor.addColorStop(1, '#b45309');
  ctx.fillStyle = visor; ctx.beginPath(); ctx.ellipse(0, -40, 22, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Rocket in Lower Right
  ctx.save();
  ctx.translate(width - 110, height - 130); ctx.scale(0.85, 0.85); ctx.rotate(-0.65);
  ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(-14, 45); ctx.lineTo(0, 115); ctx.lineTo(14, 45); ctx.fill();
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.roundRect(-20, -50, 40, 95, 18); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(-20, -50); ctx.lineTo(20, -50); ctx.fill();
  ctx.restore();

  ctx.restore();
}

export function drawSuperheroComic(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Halftone
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
  for (let x = 30; x < width - 30; x += 25) {
    for (let y = 30; y < height - 30; y += 25) {
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Explosion
  const cx = width / 2; const cy = height * 0.36;
  ctx.fillStyle = '#fef08a'; ctx.beginPath();
  const spikes = 16;
  for (let i = 0; i < spikes; i++) {
    const a1 = (i * Math.PI * 2) / spikes; const a2 = a1 + Math.PI / spikes;
    ctx.lineTo(cx + Math.cos(a1) * 270, cy + Math.sin(a1) * 270);
    ctx.lineTo(cx + Math.cos(a2) * 140, cy + Math.sin(a2) * 140);
  }
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 5; ctx.stroke();
  ctx.strokeRect(26, 26, width - 52, height - 52);
  ctx.restore();
}

export function drawUnicornRainbow(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const rx = width / 2; const ry = 175;
  const cols = ['rgba(244,114,182,0.45)', 'rgba(251,146,60,0.45)', 'rgba(250,204,21,0.45)', 'rgba(74,222,128,0.45)', 'rgba(56,189,248,0.45)'];
  ctx.lineWidth = 14;
  cols.forEach((c, i) => {
    ctx.strokeStyle = c; ctx.beginPath();
    ctx.ellipse(rx, ry, width * 0.44 - i * 14, 105 - i * 4, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
  });
  // Unicorn in lower left
  ctx.save();
  ctx.translate(140, height - 150); ctx.scale(0.8, 0.8);
  const hornGrad = ctx.createLinearGradient(-15, -140, 0, -70);
  hornGrad.addColorStop(0, '#fef08a'); hornGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = hornGrad; ctx.beginPath(); ctx.moveTo(-16, -72); ctx.lineTo(0, -145); ctx.lineTo(6, -75); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(-10, -20, 55, 65, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-85, -35, 42, 28, 14); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawPirateTreasure(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#92400e'; ctx.lineWidth = 8; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.fillStyle = '#0284c7'; ctx.beginPath();
  ctx.moveTo(0, height - 120); ctx.bezierCurveTo(width * 0.25, height - 160, width * 0.75, height - 80, width, height - 120);
  ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.fill();
  ctx.restore();
}

export function drawMermaidOcean(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  for (let b = 0; b < 25; b++) {
    const bx = 60 + (b * 47) % (width - 120); const by = 80 + (b * 63) % (height - 160);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx, by, 8 + (b % 4) * 3, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();
}

export function drawSpeedwayRace(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const checkSize = 18;
  for (let x = 0; x < width; x += checkSize) {
    for (let r = 0; r < 2; r++) {
      ctx.fillStyle = (Math.floor(x / checkSize) + r) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(x, 24 + r * checkSize, checkSize, checkSize);
      ctx.fillRect(x, height - 60 + r * checkSize, checkSize, checkSize);
    }
  }
  ctx.restore();
}

export function drawWildSafari(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 10; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawFairyForest(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  for (let f = 0; f < 30; f++) {
    const fx = 50 + (f * 53) % (width - 100); const fy = 60 + (f * 71) % (height - 120);
    const rad = ctx.createRadialGradient(fx, fy, 1, fx, fy, 12);
    rad.addColorStop(0, '#fef08a'); rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad; ctx.fillRect(fx - 12, fy - 12, 24, 24);
  }
  ctx.restore();
}

export function drawMonsterBash(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const flagW = 28;
  for (let x = 35; x < width - 35; x += flagW) {
    ctx.fillStyle = (Math.floor(x / flagW) % 3 === 0) ? '#f43f5e' : (Math.floor(x / flagW) % 3 === 1) ? '#eab308' : '#06b6d4';
    ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x + flagW / 2, 65); ctx.lineTo(x + flagW, 40); ctx.fill();
  }
  ctx.restore();
}

// ========================================================
// CATEGORY B: CUTE PASTEL & TEDDY BEAR (8)
// ========================================================

export function drawClassicTeddy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3; ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.save();
  ctx.translate(width - 140, height - 140); ctx.scale(0.82, 0.82);
  ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(-26, -42, 15, 0, Math.PI * 2); ctx.arc(26, -42, 15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(0, -20, 36, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(0, -12, 16, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#451a03'; ctx.beginPath(); ctx.arc(0, -16, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(0, 35, 34, 42, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, -5); ctx.lineTo(14, 0); ctx.lineTo(0, 5); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawBabyDreamCloud(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.save(); ctx.translate(width - 120, 120);
  ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(0, 0, 42, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f0f9ff'; ctx.beginPath(); ctx.arc(-16, -10, 38, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  for (let s = 0; s < 15; s++) {
    drawStar(ctx, 60 + (s * 60) % (width - 120), 80 + (s * 85) % (height - 180), 5, 12, 6, '#fde047');
  }
  ctx.restore();
}

export function drawBunnyMeadow(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 3; ctx.strokeRect(32, 32, width - 64, height - 64);
  // Sweet bunny in lower left
  ctx.save(); ctx.translate(120, height - 120);
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.ellipse(0, 20, 30, 35, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -15, 24, 0, Math.PI * 2); ctx.fill();
  // Ears
  ctx.beginPath(); ctx.ellipse(-10, -50, 8, 25, -0.15, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(10, -50, 8, 25, 0.15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fbcfe8';
  ctx.beginPath(); ctx.ellipse(-10, -50, 4, 18, -0.15, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(10, -50, 4, 18, 0.15, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawRoyalPrince(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4; ctx.strokeRect(32, 32, width - 64, height - 64);
  // Prince crown
  const cx = width / 2; const cy = 70;
  ctx.fillStyle = '#facc15'; ctx.beginPath();
  ctx.moveTo(cx - 28, cy + 12); ctx.lineTo(cx - 35, cy - 15); ctx.lineTo(cx - 14, cy);
  ctx.lineTo(cx, cy - 22); ctx.lineTo(cx + 14, cy); ctx.lineTo(cx + 35, cy - 15); ctx.lineTo(cx + 28, cy + 12);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

export function drawRoyalPrincess(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 4; ctx.strokeRect(32, 32, width - 64, height - 64);
  const cx = width / 2; const cy = 70;
  ctx.fillStyle = '#fb7185'; ctx.beginPath();
  ctx.moveTo(cx - 28, cy + 12); ctx.lineTo(cx - 35, cy - 15); ctx.lineTo(cx - 14, cy);
  ctx.lineTo(cx, cy - 22); ctx.lineTo(cx + 14, cy); ctx.lineTo(cx + 35, cy - 15); ctx.lineTo(cx + 28, cy + 12);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

export function drawHotAirBalloonArt(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.save(); ctx.translate(width - 130, 130); ctx.scale(0.85, 0.85);
  ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(0, 0, 42, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.ellipse(0, 0, 20, 42, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.rect(-12, 55, 24, 18); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawBabyLamb(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#a7f3d0'; ctx.lineWidth = 3; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.restore();
}

export function drawVintageCarousel(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.restore();
}

// ========================================================
// CATEGORY C: BALLOONS & CONFETTI (8)
// ========================================================

export function drawRoseGoldBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 110, 120, 48, 62, 'rosegold', '', 'rgba(255,255,255,0.7)', -12);
  drawMetallicBalloon(ctx, 175, 95, 42, 54, 'gold', '', 'rgba(255,255,255,0.7)', 10);
  drawMetallicBalloon(ctx, width - 110, 120, 48, 62, 'rosegold', '', 'rgba(255,255,255,0.7)', 12);
  drawMetallicBalloon(ctx, width - 175, 95, 42, 54, 'gold', '', 'rgba(255,255,255,0.7)', -10);
  ctx.restore();
}

export function drawGoldenHeliumBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 110, 130, 52, 68, 'gold', '', 'rgba(255,255,255,0.7)', -10);
  drawMetallicBalloon(ctx, width - 110, 130, 52, 68, 'gold', '', 'rgba(255,255,255,0.7)', 10);
  ctx.restore();
}

export function drawNeonBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 110, 120, 48, 62, 'custom', '#a855f7', 'rgba(168,85,247,0.7)', -12);
  drawMetallicBalloon(ctx, width - 110, 120, 48, 62, 'custom', '#06b6d4', 'rgba(6,182,212,0.7)', 12);
  ctx.restore();
}

export function drawMidnightBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 110, 130, 52, 68, 'gold', '', 'rgba(255,255,255,0.7)', -10);
  drawMetallicBalloon(ctx, width - 110, 130, 52, 68, 'silver', '', 'rgba(255,255,255,0.7)', 10);
  ctx.restore();
}

export function drawPastelRainbowBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 100, 110, 44, 58, 'custom', '#f472b6', 'rgba(255,255,255,0.7)', -10);
  drawMetallicBalloon(ctx, width - 100, 110, 44, 58, 'custom', '#38bdf8', 'rgba(255,255,255,0.7)', 10);
  ctx.restore();
}

export function drawSilverFoilBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  drawMetallicBalloon(ctx, 110, 120, 50, 65, 'silver', '', 'rgba(255,255,255,0.7)', -10);
  drawMetallicBalloon(ctx, width - 110, 120, 50, 65, 'silver', '', 'rgba(255,255,255,0.7)', 10);
  ctx.restore();
}

export function drawConfettiBurst(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const colors = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  for (let c = 0; c < 45; c++) {
    const cx = (c * 67) % width; const cy = (c * 89) % height;
    ctx.fillStyle = colors[c % colors.length];
    ctx.fillRect(cx, cy, 8, 5);
  }
  ctx.restore();
}

export function drawBokehLights(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  for (let b = 0; b < 25; b++) {
    const bx = (b * 93) % width; const by = (b * 127) % height;
    const r = 20 + (b % 5) * 12;
    const rad = ctx.createRadialGradient(bx, by, 2, bx, by, r);
    rad.addColorStop(0, 'rgba(254, 240, 138, 0.4)'); rad.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = rad; ctx.fillRect(bx - r, by - r, r * 2, r * 2);
  }
  ctx.restore();
}

// ========================================================
// CATEGORY D: FLORAL & ELEGANT (8)
// ========================================================

export function drawBlushPeonyGarland(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const ox = width / 2; const oy = height / 2; const fw = width * 0.44; const fh = height * 0.44; const cornerCut = 48;
  const goldG = createGoldGradient(ctx, ox - fw, oy - fh, ox + fw, oy + fh);
  ctx.strokeStyle = goldG; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ox - fw + cornerCut, oy - fh); ctx.lineTo(ox + fw - cornerCut, oy - fh);
  ctx.lineTo(ox + fw, oy - fh + cornerCut); ctx.lineTo(ox + fw, oy + fh - cornerCut);
  ctx.lineTo(ox + fw - cornerCut, oy + fh); ctx.lineTo(ox - fw + cornerCut, oy + fh);
  ctx.lineTo(ox - fw, oy + fh - cornerCut); ctx.lineTo(ox - fw, oy - fh + cornerCut);
  ctx.closePath(); ctx.stroke();

  // Peony Blossom
  const drawPeony = (cx: number, cy: number, r: number) => {
    ctx.save(); ctx.translate(cx, cy);
    for (let i = 0; i < 7; i++) {
      ctx.save(); ctx.rotate((i * Math.PI * 2) / 7);
      ctx.fillStyle = 'rgba(251, 207, 232, 0.85)';
      ctx.beginPath(); ctx.ellipse(0, r * 0.55, r * 0.38, r * 0.48, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };

  drawPeony(width * 0.5, 75, 54);
  drawPeony(width * 0.36, 70, 42);
  drawPeony(width * 0.64, 70, 42);
  drawPeony(90, height - 85, 48);
  drawPeony(width - 90, height - 85, 48);
  ctx.restore();
}

export function drawEucalyptusGold(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 2.5; ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.restore();
}

export function drawRoyalNavyLilies(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.restore();
}

export function drawLavenderGarden(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.restore();
}

export function drawBurgundyRoses(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.restore();
}

export function drawSunflowerRustic(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#eab308'; ctx.lineWidth = 6; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawOliveBranchMinimal(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 1.5; ctx.strokeRect(40, 40, width - 80, height - 80);
  ctx.restore();
}

export function drawTropicalHibiscus(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3; ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.restore();
}

// ========================================================
// CATEGORY E: MODERN & MINIMALIST (6)
// ========================================================

export function drawSwissEditorial(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(40, 60); ctx.lineTo(width - 40, 60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40, height - 60); ctx.lineTo(width - 40, height - 60); ctx.stroke();
  ctx.restore();
}

export function drawMonochromeSerif(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 1.5; ctx.strokeRect(44, 44, width - 88, height - 88);
  ctx.strokeRect(52, 52, width - 104, height - 104);
  ctx.restore();
}

export function drawScandiArches(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(180, 151, 123, 0.5)'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(width / 2, height * 0.35, width * 0.38, Math.PI, 0); ctx.stroke();
  ctx.restore();
}

export function drawSplitBlock(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 2; ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.restore();
}

export function drawFrostedGlass(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(40, 40, width - 80, height - 80, 24); ctx.fill(); ctx.stroke();
  ctx.restore();
}

export function drawBauhausGeometric(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(70, 70, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.rect(width - 100, 50, 45, 45); ctx.fill();
  ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.moveTo(60, height - 60); ctx.lineTo(110, height - 60); ctx.lineTo(85, height - 110); ctx.fill();
  ctx.restore();
}

// ========================================================
// CATEGORY F: PREMIUM GOLD & LUXURY (5)
// ========================================================

export function drawRoyalGoldArtDeco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 4; ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.lineWidth = 1.5; ctx.strokeRect(42, 42, width - 84, height - 84);

  // Stepped Corners
  const drawCornerDeco = (cx: number, cy: number, rot: number) => {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate((rot * Math.PI) / 180);
    ctx.strokeStyle = gold; ctx.lineWidth = 2.5;
    for (let step = 0; step < 4; step++) {
      const d = 16 + step * 14;
      ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d, d); ctx.lineTo(0, d); ctx.stroke();
    }
    ctx.restore();
  };
  drawCornerDeco(42, 42, 0); drawCornerDeco(width - 42, 42, 90);
  drawCornerDeco(width - 42, height - 42, 180); drawCornerDeco(42, height - 42, 270);

  // Top Sunburst
  const fx = width / 2; const fy = 54;
  ctx.strokeStyle = gold;
  for (let r = 0; r <= 180; r += 12) {
    const rad = (r * Math.PI) / 180;
    ctx.beginPath(); ctx.moveTo(fx + Math.cos(rad) * 15, fy + Math.sin(rad) * 15); ctx.lineTo(fx + Math.cos(rad) * 65, fy + Math.sin(rad) * 65); ctx.stroke();
  }
  ctx.restore();
}

export function drawRoyalVelvetCrest(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 4; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawEmeraldGoldMarble(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawCelestialStardust(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 2.5; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawBlackTieElegance(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.restore();
}

// ========================================================
// CATEGORY G: COLORFUL PARTY THEMES (5)
// ========================================================

export function drawRetroDisco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const bx = width / 2; const by = 110; const br = 52;
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, by - br); ctx.stroke();

  const ballG = createSilverGradient(ctx, bx - br, by - br, bx + br, by + br);
  ctx.fillStyle = ballG; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
  drawSparkle(ctx, bx - 20, by - 15, 16, '#ffffff');
  drawSparkle(ctx, bx + 24, by + 18, 12, '#ffffff');
  ctx.restore();
}

export function drawTropicalFlamingo(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(0, 0, 140, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(width, 0, 140, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.restore();
}

export function drawVintageCarnivalCircus(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 6; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

export function drawHoliColorSplash(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const splashes = [
    { x: 100, y: 120, r: 55, color: '#ec4899' },
    { x: width - 100, y: 130, r: 60, color: '#f59e0b' },
    { x: 110, y: height - 120, r: 65, color: '#06b6d4' },
    { x: width - 110, y: height - 120, r: 58, color: '#10b981' },
  ];
  splashes.forEach((sp) => {
    ctx.save(); ctx.translate(sp.x, sp.y); ctx.fillStyle = sp.color;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const ang = (i * Math.PI * 2) / 12;
      const dist = sp.r * (0.6 + ((i % 3) * 0.25));
      ctx.lineTo(Math.cos(ang) * dist, Math.sin(ang) * dist);
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.restore();
}

export function drawCyberpunkNeon(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 4; ctx.strokeRect(30, 30, width - 60, height - 60);
  ctx.restore();
}

// ========================================================
// 3D MINGGO CELEBRATION SUITE (50+ TEMPLATES ARCHITECTURE)
// ========================================================

/**
 * MinGGo 3D Black & Gold Royale Scene
 * Exact replication of the high-end reference poster:
 * - 3D glossy metallic gold, black, and orange balloons on left & right
 * - 3D golden celebration dunes, 2-tier birthday cake with candles, golden diya, mini balloon clusters
 * - Floating golden & amber metallic confetti and diamond star sparkles
 */
export function draw3DMinGGoRoyaleScene(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  // Floating 3D Confetti & Sparkles in air
  draw3DFloatingConfetti(ctx, width, height, '#f59e0b', '#ea580c');

  // Left 3D Metallic Balloon Cluster
  draw3DRealisticBalloon(ctx, width * 0.08, height * 0.52, 68, 86, 'gold', '#eab308', 'rgba(255,255,255,0.4)', 8);
  draw3DRealisticBalloon(ctx, width * 0.10, height * 0.68, 62, 78, 'black', '#1e293b', 'rgba(255,255,255,0.3)', -10);
  draw3DRealisticBalloon(ctx, width * 0.17, height * 0.62, 54, 68, 'orange', '#f97316', 'rgba(255,255,255,0.35)', 6);

  // Right 3D Metallic Balloon Cluster
  draw3DRealisticBalloon(ctx, width * 0.93, height * 0.44, 66, 84, 'peach', '#ea580c', 'rgba(255,255,255,0.35)', -8);
  draw3DRealisticBalloon(ctx, width * 0.90, height * 0.58, 76, 96, 'gold', '#facc15', 'rgba(255,255,255,0.4)', 10);
  draw3DRealisticBalloon(ctx, width * 0.86, height * 0.72, 62, 78, 'black', '#0f172a', 'rgba(255,255,255,0.3)', -6);
  draw3DRealisticBalloon(ctx, width * 0.94, height * 0.74, 52, 66, 'orange', '#f97316', 'rgba(255,255,255,0.35)', 12);

  // 3D Bottom Celebration Landscape (Dunes, 2-tier Cake with glowing candle, Diya, mini balloons)
  draw3DCelebrationBottomScene(ctx, width, height, '#d97706', '#fbbf24');

  ctx.restore();
}

/**
 * Master configurable 3D Celebration Suite for all categories
 */
export function draw3DThemeCelebration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  primaryBalloon: BalloonColorTheme,
  secondaryBalloon: BalloonColorTheme,
  accentBalloon: BalloonColorTheme,
  bottomDunePrimary: string,
  bottomDuneAccent: string,
  confettiColor1: string = '#f59e0b',
  confettiColor2: string = '#ea580c'
) {
  ctx.save();

  // Floating Confetti
  draw3DFloatingConfetti(ctx, width, height, confettiColor1, confettiColor2);

  // Left 3D Balloons
  draw3DRealisticBalloon(ctx, width * 0.08, height * 0.52, 68, 86, primaryBalloon, '#eab308', 'rgba(255,255,255,0.4)', 8);
  draw3DRealisticBalloon(ctx, width * 0.10, height * 0.68, 62, 78, secondaryBalloon, '#1e293b', 'rgba(255,255,255,0.3)', -10);
  draw3DRealisticBalloon(ctx, width * 0.17, height * 0.62, 54, 68, accentBalloon, '#f97316', 'rgba(255,255,255,0.35)', 6);

  // Right 3D Balloons
  draw3DRealisticBalloon(ctx, width * 0.93, height * 0.44, 66, 84, accentBalloon, '#ea580c', 'rgba(255,255,255,0.35)', -8);
  draw3DRealisticBalloon(ctx, width * 0.90, height * 0.58, 76, 96, primaryBalloon, '#facc15', 'rgba(255,255,255,0.4)', 10);
  draw3DRealisticBalloon(ctx, width * 0.86, height * 0.72, 62, 78, secondaryBalloon, '#0f172a', 'rgba(255,255,255,0.3)', -6);
  draw3DRealisticBalloon(ctx, width * 0.94, height * 0.74, 52, 66, primaryBalloon, '#f97316', 'rgba(255,255,255,0.35)', 12);

  // Bottom 3D Scene
  draw3DCelebrationBottomScene(ctx, width, height, bottomDunePrimary, bottomDuneAccent);

  ctx.restore();
}

// --------------------------------------------------------
// CATEGORY 1: 3D BALLOONS & CELEBRATION
// --------------------------------------------------------
export function draw3DMidnightBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'sapphire', 'gold', 'silver', '#0369a1', '#facc15', '#38bdf8', '#fde047');
}

export function draw3DRoseGoldBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'gold', 'peach', '#be185d', '#f472b6', '#f472b6', '#fbcfe8');
}

export function draw3DEmeraldGoldBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'emerald', 'gold', 'black', '#047857', '#10b981', '#34d399', '#fde047');
}

export function draw3DSilverChromeBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'silver', 'black', 'gold', '#475569', '#cbd5e1', '#ffffff', '#94a3b8');
}

export function draw3DRubyRoyaleBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'gold', 'black', '#9f1239', '#e11d48', '#fda4af', '#fde047');
}

export function draw3DNeonCyberBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'magenta', 'cyan', 'gold', '#a21caf', '#06b6d4', '#f0abfc', '#67e8f9');
}

export function draw3DSunsetPeachBalloons(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'peach', 'gold', 'orange', '#ea580c', '#fb923c', '#fdba74', '#fef08a');
}

// --------------------------------------------------------
// CATEGORY 2: 3D KIDS & CARTOON CELEBRATIONS
// --------------------------------------------------------
export function draw3DKidsDino(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'emerald', 'gold', 'orange', '#15803d', '#4ade80', '#86efac', '#facc15');
  // 3D Cute Dino Footprint & Dino Badge at upper left
  ctx.save();
  ctx.fillStyle = 'rgba(74, 222, 128, 0.25)';
  ctx.beginPath();
  ctx.arc(90, 110, 36, 0, Math.PI * 2);
  ctx.fill();
  drawSparkle(ctx, 90, 110, 14, '#4ade80');
  ctx.restore();
}

export function draw3DKidsSpace(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'sapphire', 'silver', 'gold', '#1e3a8a', '#38bdf8', '#38bdf8', '#fde047');
  // 3D Golden Astronaut Helmet / Planet Ring
  ctx.save();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(width - 90, 120, 38, 14, 0.4, 0, Math.PI * 2);
  ctx.stroke();
  drawSparkle(ctx, width - 90, 120, 16, '#fde047');
  ctx.restore();
}

export function draw3DKidsSuperhero(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'sapphire', 'gold', '#b91c1c', '#f59e0b', '#ef4444', '#facc15');
}

export function draw3DKidsUnicorn(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'magenta', 'cyan', 'gold', '#c026d3', '#f472b6', '#f472b6', '#67e8f9');
}

export function draw3DKidsPirate(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'black', 'ruby', '#854d0e', '#f59e0b', '#fde047', '#ef4444');
}

export function draw3DKidsOcean(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'cyan', 'sapphire', 'silver', '#0e7490', '#06b6d4', '#67e8f9', '#ffffff');
}

export function draw3DKidsRacecar(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'orange', 'black', 'gold', '#c2410c', '#f97316', '#fdba74', '#facc15');
}

export function draw3DKidsSafari(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'emerald', 'orange', '#a16207', '#eab308', '#fef08a', '#22c55e');
}

export function draw3DKidsFairy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'gold', 'violet', '#9d174d', '#f472b6', '#fbcfe8', '#fde047');
}

export function draw3DKidsMonster(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'violet', 'cyan', 'orange', '#7e22ce', '#a855f7', '#c084fc', '#fb923c');
}

// --------------------------------------------------------
// CATEGORY 3: 3D CUTE PASTEL & TEDDY BEAR
// --------------------------------------------------------
export function draw3DPastelTeddy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'peach', 'gold', 'rosegold', '#b45309', '#f59e0b', '#fed7aa', '#fde047');
}

export function draw3DPastelCloudDream(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'silver', 'gold', '#be185d', '#f472b6', '#fce7f3', '#fef08a');
}

export function draw3DPastelPrince(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'sapphire', 'gold', 'silver', '#1d4ed8', '#60a5fa', '#93c5fd', '#facc15');
}

export function draw3DPastelPrincess(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'gold', 'magenta', '#db2777', '#f472b6', '#fbcfe8', '#fde047');
}

export function draw3DPastelHotAir(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'peach', 'cyan', 'gold', '#c2410c', '#fb923c', '#fed7aa', '#67e8f9');
}

export function draw3DPastelBunny(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'emerald', 'gold', '#047857', '#34d399', '#a7f3d0', '#fbcfe8');
}

export function draw3DPastelSweetLamb(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'violet', 'silver', 'gold', '#6b21a8', '#a855f7', '#e9d5ff', '#fde047');
}

export function draw3DPastelCarousel(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'rosegold', 'peach', '#b45309', '#facc15', '#fef08a', '#f472b6');
}

// --------------------------------------------------------
// CATEGORY 4: 3D LUXURY GOLD & MILESTONES
// --------------------------------------------------------
export function draw3DLuxuryArtDeco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'black', 'gold', '#78350f', '#f59e0b', '#fef08a', '#ca8a04');
}

export function draw3DLuxuryVelvetShashtipoorthi(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'gold', 'orange', '#881337', '#e11d48', '#fde047', '#fda4af');
}

export function draw3DLuxuryEmerald(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'emerald', 'gold', 'black', '#064e3b', '#10b981', '#6ee7b7', '#fde047');
}

export function draw3DLuxuryStarlight(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'silver', 'black', '#451a03', '#facc15', '#ffffff', '#fde047');
}

export function draw3DLuxuryBlackTie(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'black', 'gold', 'silver', '#0f172a', '#eab308', '#cbd5e1', '#facc15');
}

export function draw3DLuxuryMarble(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'black', 'gold', '#1e293b', '#f59e0b', '#fef08a', '#94a3b8');
}

export function draw3DLuxurySilver25th(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'silver', 'sapphire', 'white' as any, '#1e293b', '#94a3b8', '#ffffff', '#38bdf8');
}

export function draw3DLuxuryGold50th(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'orange', 'gold', '#713f12', '#facc15', '#fef08a', '#f59e0b');
}

// --------------------------------------------------------
// CATEGORY 5: 3D FLORAL & BOTANICAL ELEGANCE
// --------------------------------------------------------
export function draw3DFloralEucalyptus(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'emerald', 'gold', 'peach', '#065f46', '#34d399', '#6ee7b7', '#fde047');
}

export function draw3DFloralPeony(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'gold', 'peach', '#9d174d', '#f472b6', '#fbcfe8', '#fef08a');
}

export function draw3DFloralMidnightRose(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'black', 'gold', '#881337', '#e11d48', '#fda4af', '#fde047');
}

export function draw3DFloralSunflower(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'orange', 'emerald', '#854d0e', '#facc15', '#fef08a', '#f97316');
}

export function draw3DFloralLily(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'silver', 'sapphire', 'gold', '#1e3a8a', '#60a5fa', '#ffffff', '#fde047');
}

export function draw3DFloralLavender(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'violet', 'gold', 'silver', '#581c87', '#a855f7', '#d8b4fe', '#fde047');
}

export function draw3DFloralOrchid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'magenta', 'emerald', 'gold', '#86198f', '#d946ef', '#f0abfc', '#34d399');
}

export function draw3DFloralSakura(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'rosegold', 'ruby', 'gold', '#9f1239', '#fb7185', '#fecdd3', '#fde047');
}

// --------------------------------------------------------
// CATEGORY 6: 3D MODERN & MINIMALIST
// --------------------------------------------------------
export function draw3DModernScandi(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'peach', 'black', 'gold', '#9a3412', '#ea580c', '#fdba74', '#fde047');
}

export function draw3DModernGlass(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'cyan', 'silver', 'magenta', '#0e7490', '#38bdf8', '#67e8f9', '#f0abfc');
}

export function draw3DModernBauhaus(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'gold', 'sapphire', '#991b1b', '#f59e0b', '#ef4444', '#3b82f6');
}

export function draw3DModernSwiss(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'black', 'ruby', 'silver', '#0f172a', '#e11d48', '#ffffff', '#cbd5e1');
}

export function draw3DModernSplit(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'black', 'peach', '#78350f', '#f59e0b', '#fef08a', '#ea580c');
}

export function draw3DModernBrutalist(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'cyan', 'magenta', 'gold', '#1e293b', '#06b6d4', '#22d3ee', '#ec4899');
}

// --------------------------------------------------------
// CATEGORY 7: 3D COLORFUL PARTY & FESTIVALS
// --------------------------------------------------------
export function draw3DPartyBollywood(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'gold', 'ruby', 'orange', '#881337', '#f59e0b', '#fde047', '#f97316');
}

export function draw3DPartyDisco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'silver', 'magenta', 'cyan', '#334155', '#94a3b8', '#ffffff', '#a855f7');
}

export function draw3DPartyFlamingo(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'magenta', 'emerald', 'gold', '#9d174d', '#ec4899', '#f472b6', '#34d399');
}

export function draw3DPartyCircus(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'ruby', 'gold', 'sapphire', '#991b1b', '#facc15', '#ef4444', '#facc15');
}

export function draw3DPartyCyberpunk(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'cyan', 'magenta', 'violet', '#1e1b4b', '#06b6d4', '#67e8f9', '#f0abfc');
}

export function draw3DPartyHavana(ctx: CanvasRenderingContext2D, width: number, height: number) {
  draw3DThemeCelebration(ctx, width, height, 'orange', 'emerald', 'gold', '#9a3412', '#f97316', '#fdba74', '#10b981');
}

