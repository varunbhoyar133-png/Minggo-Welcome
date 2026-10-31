import fs from 'fs';
import path from 'path';

const content = `import { InvitationData, StyleCustomization, TemplatePalette } from '../types';
import { drawRoundedRect, drawStar, drawSparkle, shadeColor } from './canvasHelpers';

/**
 * MINGGO Invitation Studio — High-Precision Vector & Raster Artwork Engines
 * Implements professional, print-ready illustrations, textures, foliage, and effects.
 */

// Helper to create metallic gold gradient
export function createGoldGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#bf953f');
  grad.addColorStop(0.25, '#fcf6ba');
  grad.addColorStop(0.5, '#b38728');
  grad.addColorStop(0.75, '#fbf5b7');
  grad.addColorStop(1, '#aa771c');
  return grad;
}

// Helper to create rose gold gradient
export function createRoseGoldGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#b76e79');
  grad.addColorStop(0.3, '#f7d3d8');
  grad.addColorStop(0.6, '#d98b95');
  grad.addColorStop(0.85, '#fae3e6');
  grad.addColorStop(1, '#9b5862');
  return grad;
}

// Helper to create chrome silver gradient
export function createSilverGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, '#94a3b8');
  grad.addColorStop(0.25, '#f8fafc');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(0.75, '#ffffff');
  grad.addColorStop(1, '#64748b');
  return grad;
}

// Draw realistic metallic balloon with 3D specular shine, knot, and curled ribbon
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

  // 1. Curled Ribbon String
  ctx.save();
  ctx.strokeStyle = stringColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-20, ry + 50, 30, ry + 110, -10, ry + 170);
  ctx.bezierCurveTo(-30, ry + 210, 25, ry + 260, 5, ry + 320);
  ctx.stroke();
  ctx.restore();

  // 2. Balloon Body Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;

  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-rx * 1.35, ry * 0.75, -rx * 1.15, -ry * 0.95, 0, -ry);
  ctx.bezierCurveTo(rx * 1.15, -ry * 0.95, rx * 1.35, ry * 0.75, 0, ry);
  ctx.closePath();

  // Shading fill
  if (type === 'gold') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff');
    rad.addColorStop(0.2, '#fff6b8');
    rad.addColorStop(0.55, '#d4af37');
    rad.addColorStop(0.85, '#996515');
    rad.addColorStop(1, '#5c3a07');
    ctx.fillStyle = rad;
  } else if (type === 'rosegold') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff');
    rad.addColorStop(0.25, '#fae1e4');
    rad.addColorStop(0.6, '#c47d87');
    rad.addColorStop(0.85, '#8c4852');
    rad.addColorStop(1, '#502028');
    ctx.fillStyle = rad;
  } else if (type === 'silver') {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff');
    rad.addColorStop(0.3, '#f1f5f9');
    rad.addColorStop(0.65, '#94a3b8');
    rad.addColorStop(0.9, '#475569');
    rad.addColorStop(1, '#1e293b');
    ctx.fillStyle = rad;
  } else {
    const rad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.35, rx * 0.1, 0, 0, rx * 1.3);
    rad.addColorStop(0, '#ffffff');
    rad.addColorStop(0.25, customColor);
    rad.addColorStop(0.8, shadeColor(customColor, -25));
    rad.addColorStop(1, shadeColor(customColor, -55));
    ctx.fillStyle = rad;
  }
  ctx.fill();
  ctx.restore();

  // 3. Balloon Knot
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-6, ry);
  ctx.lineTo(6, ry);
  ctx.lineTo(10, ry + 10);
  ctx.lineTo(-10, ry + 10);
  ctx.closePath();
  ctx.fillStyle = type === 'gold' ? '#784c0c' : type === 'rosegold' ? '#6e303a' : type === 'silver' ? '#334155' : shadeColor(customColor, -40);
  ctx.fill();
  ctx.restore();

  // 4. Realistic Curved Specular Highlight Arc
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(-rx * 0.38, -ry * 0.38, rx * 0.22, ry * 0.32, -Math.PI / 4, 0, Math.PI * 2);
  const specGrad = ctx.createLinearGradient(-rx * 0.5, -ry * 0.6, -rx * 0.2, -ry * 0.1);
  specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  specGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
  specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = specGrad;
  ctx.fill();

  // Secondary soft bounce reflection on opposite rim
  ctx.beginPath();
  ctx.ellipse(rx * 0.55, ry * 0.45, rx * 0.12, ry * 0.25, Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 1. DINO SAFARI ADVENTURE
// ==========================================
export function drawDinoSafariAdventure(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const sunGrad = ctx.createRadialGradient(width * 0.25, 0, 10, width * 0.25, height * 0.4, width * 0.7);
  sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
  sunGrad.addColorStop(0.5, 'rgba(74, 222, 128, 0.08)');
  sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 12;
  ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(44, 44, width - 88, height - 88);

  // Hanging jungle vines
  const drawVine = (startX: number, endX: number, dropY: number) => {
    ctx.save();
    ctx.strokeStyle = '#166534';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.bezierCurveTo(startX + 60, dropY, endX - 60, dropY, endX, 0);
    ctx.stroke();

    for (let t = 0.15; t <= 0.85; t += 0.14) {
      const vx = startX + (endX - startX) * t;
      const vy = dropY * Math.sin(t * Math.PI);
      ctx.save();
      ctx.translate(vx, vy);
      ctx.rotate((t - 0.5) * 1.2);
      ctx.fillStyle = t % 0.2 < 0.1 ? '#22c55e' : '#4ade80';
      ctx.beginPath();
      ctx.ellipse(0, 12, 8, 16, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  };

  drawVine(20, width * 0.55, 85);
  drawVine(width * 0.45, width - 20, 95);

  // Monstera Leaves
  const drawMonsteraLeaf = (x: number, y: number, scale: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    ctx.fillStyle = '#14532d';
    ctx.beginPath();
    ctx.ellipse(0, 0, 55, 90, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(-8, -5, 38, 70, -0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#86efac';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 85);
    ctx.lineTo(0, -85);
    ctx.stroke();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 6;
    for (const cutY of [-45, -20, 10, 35]) {
      ctx.beginPath();
      ctx.moveTo(-45, cutY - 10);
      ctx.lineTo(-8, cutY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(45, cutY - 10);
      ctx.lineTo(8, cutY);
      ctx.stroke();
    }
    ctx.restore();
  };

  drawMonsteraLeaf(65, 70, 0.85, 40);
  drawMonsteraLeaf(120, 50, 0.65, 75);
  drawMonsteraLeaf(width - 65, 70, 0.85, -40);
  drawMonsteraLeaf(width - 120, 50, 0.65, -75);

  // T-Rex Character in Lower Right
  const drawIllustratedTRex = (x: number, y: number, scale: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 140, 130, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(60, 40);
    ctx.bezierCurveTo(150, 60, 190, 10, 200, -30);
    ctx.bezierCurveTo(170, 10, 120, 60, 50, 80);
    ctx.closePath();
    ctx.fill();

    // Spikes
    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(90 + i * 25, 45 - i * 15);
      ctx.lineTo(100 + i * 25, 25 - i * 18);
      ctx.lineTo(110 + i * 25, 42 - i * 15);
      ctx.closePath();
      ctx.fill();
    }

    // Legs
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.ellipse(30, 95, 26, 42, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(35, 135, 28, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(0, 30, 75, 90, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Yellow belly
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(-25, 40, 38, 65, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(-45, -75, 60, 48, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-100, -85, 75, 48, [24, 8, 18, 20]);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-95, -55);
    ctx.quadraticCurveTo(-60, -45, -30, -58);
    ctx.stroke();

    // Teeth
    ctx.fillStyle = '#ffffff';
    for (const tx of [-88, -74, -60, -46]) {
      ctx.beginPath();
      ctx.moveTo(tx, -55); ctx.lineTo(tx + 6, -47); ctx.lineTo(tx + 12, -55);
      ctx.closePath(); ctx.fill();
    }

    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(-45, -85, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.arc(-42, -85, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(-45, -88, 5, 0, Math.PI * 2); ctx.fill();

    // Party Hat
    ctx.save();
    ctx.translate(-50, -120);
    ctx.rotate(0.18);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.moveTo(-20, 25); ctx.lineTo(0, -35); ctx.lineTo(20, 25); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-12, 10); ctx.lineTo(12, 10); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(0, -38, 7, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Front arm
    ctx.fillStyle = '#16a34a';
    ctx.beginPath(); ctx.roundRect(-30, 0, 28, 14, 8); ctx.fill();
    ctx.restore();
  };

  drawIllustratedTRex(width - 150, height - 190, 0.78);

  // Flying Pterodactyl
  ctx.save();
  ctx.translate(130, 140);
  ctx.rotate(-0.18);
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-45, -35, -70, -25);
  ctx.quadraticCurveTo(-40, -10, -15, 8);
  ctx.lineTo(0, 0);
  ctx.quadraticCurveTo(45, -35, 70, -25);
  ctx.quadraticCurveTo(40, -10, 15, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 2. LITTLE ASTRONAUT GALAXY
// ==========================================
export function drawAstronautGalaxy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  // Nebula
  const drawNebula = (cx: number, cy: number, r: number, color: string) => {
    const rad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    rad.addColorStop(0, color);
    rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  };

  drawNebula(width * 0.2, height * 0.25, 320, 'rgba(168, 85, 247, 0.24)');
  drawNebula(width * 0.8, height * 0.7, 340, 'rgba(6, 182, 212, 0.2)');
  drawNebula(width * 0.5, height * 0.45, 280, 'rgba(236, 72, 153, 0.16)');

  // Stars
  let s = 101;
  for (let i = 0; i < 90; i++) {
    s = (s * 9301 + 49297) % 233280;
    const sx = (s / 233280) * width;
    s = (s * 9301 + 49297) % 233280;
    const sy = (s / 233280) * height;
    const sz = (i % 6 === 0) ? 3.5 : (i % 3 === 0) ? 2 : 1;
    ctx.fillStyle = i % 4 === 0 ? '#38bdf8' : i % 5 === 0 ? '#fde047' : '#ffffff';
    ctx.beginPath(); ctx.arc(sx, sy, sz, 0, Math.PI * 2); ctx.fill();
    if (i % 12 === 0) drawSparkle(ctx, sx, sy, 10, '#ffffff');
  }

  // Saturn
  ctx.save();
  ctx.translate(130, 140);
  ctx.rotate(-0.35);
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.6)'; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.ellipse(0, 0, 75, 22, 0, Math.PI, Math.PI * 2); ctx.stroke();
  const saturnGrad = ctx.createRadialGradient(-15, -15, 5, 0, 0, 40);
  saturnGrad.addColorStop(0, '#fef08a'); saturnGrad.addColorStop(0.5, '#eab308'); saturnGrad.addColorStop(1, '#854d0e');
  ctx.fillStyle = saturnGrad; ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.85)'; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.ellipse(0, 0, 75, 22, 0, 0, Math.PI); ctx.stroke();
  ctx.restore();

  // Astronaut in Upper Right
  const drawAstronaut = (ax: number, ay: number, scale: number) => {
    ctx.save();
    ctx.translate(ax, ay);
    ctx.scale(scale, scale);
    ctx.rotate(0.2);

    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.roundRect(15, -30, 26, 65, 8); ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.roundRect(-25, -20, 50, 60, 14); ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.roundRect(-14, -8, 28, 22, 4); ctx.fill();

    // Helmet & Visor
    ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(0, -42, 32, 0, Math.PI * 2); ctx.fill();
    const visorGrad = ctx.createLinearGradient(-15, -55, 15, -30);
    visorGrad.addColorStop(0, '#f59e0b'); visorGrad.addColorStop(0.5, '#fef08a'); visorGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = visorGrad;
    ctx.beginPath(); ctx.ellipse(0, -40, 22, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath(); ctx.ellipse(-8, -46, 6, 3, -0.4, 0, Math.PI * 2); ctx.fill();

    // Arms
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.roundRect(-48, -25, 22, 48, 10); ctx.fill();
    ctx.beginPath(); ctx.roundRect(24, -15, 18, 42, 10); ctx.fill();
    ctx.restore();
  };
  drawAstronaut(width - 140, 150, 0.85);

  // Rocket in Lower Right
  ctx.save();
  ctx.translate(width - 120, height - 140);
  ctx.scale(0.85, 0.85);
  ctx.rotate(-0.65);
  // Fire
  const fireGrad = ctx.createLinearGradient(0, 50, 0, 130);
  fireGrad.addColorStop(0, '#fde047'); fireGrad.addColorStop(0.4, '#f97316'); fireGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = fireGrad; ctx.beginPath(); ctx.moveTo(-16, 50); ctx.quadraticCurveTo(-25, 90, 0, 135); ctx.quadraticCurveTo(25, 90, 16, 50); ctx.fill();
  // Body
  ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(0, -65); ctx.bezierCurveTo(28, -25, 26, 35, 20, 50); ctx.lineTo(-20, 50); ctx.bezierCurveTo(-26, 35, -28, -25, 0, -65); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(0, -65); ctx.bezierCurveTo(14, -45, 16, -35, 16, -28); ctx.lineTo(-16, -28); ctx.bezierCurveTo(-16, -35, -14, -45, 0, -65); ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 3. MAGICAL UNICORN RAINBOW
// ==========================================
export function drawUnicornRainbow(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const rx = width / 2;
  const ry = 180;
  const rainbowColors = [
    'rgba(244, 114, 182, 0.45)', 'rgba(251, 146, 60, 0.45)', 'rgba(250, 204, 21, 0.45)',
    'rgba(74, 222, 128, 0.45)', 'rgba(56, 189, 248, 0.45)', 'rgba(192, 132, 252, 0.45)',
  ];
  ctx.lineWidth = 14;
  rainbowColors.forEach((col, i) => {
    ctx.strokeStyle = col; ctx.beginPath();
    ctx.ellipse(rx, ry, width * 0.46 - i * 14, 110 - i * 4, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
  });

  // Clouds
  const drawFluffyCloud = (cx: number, cy: number, scale: number) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2); ctx.arc(32, -10, 38, 0, Math.PI * 2);
    ctx.arc(72, 0, 34, 0, Math.PI * 2); ctx.arc(40, 20, 28, 0, Math.PI * 2);
    ctx.closePath(); ctx.fill(); ctx.restore();
  };
  drawFluffyCloud(75, 190, 0.85);
  drawFluffyCloud(width - 150, 190, 0.85);

  // Unicorn in Lower Left
  ctx.save();
  ctx.translate(140, height - 160);
  ctx.scale(0.82, 0.82);
  // Horn
  const hornGrad = ctx.createLinearGradient(-15, -140, 0, -70);
  hornGrad.addColorStop(0, '#fef08a'); hornGrad.addColorStop(0.5, '#f59e0b'); hornGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = hornGrad;
  ctx.beginPath(); ctx.moveTo(-16, -72); ctx.lineTo(0, -145); ctx.lineTo(6, -75); ctx.fill();
  drawSparkle(ctx, 0, -148, 14, '#ffffff');

  // Head
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(35, 70); ctx.bezierCurveTo(45, 10, 30, -35, 10, -60);
  ctx.bezierCurveTo(-15, -65, -45, -55, -65, -40); ctx.bezierCurveTo(-85, -25, -95, 20, -50, 65); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-85, -35, 42, 28, 14); ctx.fill();
  // Nose
  ctx.fillStyle = '#fbcfe8'; ctx.beginPath(); ctx.ellipse(-74, -22, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
  // Eye
  ctx.strokeStyle = '#4a044e'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(-30, -38, 10, 0.2, Math.PI - 0.2); ctx.stroke();
  // Mane
  ['#f472b6', '#a78bfa', '#38bdf8', '#4ade80'].forEach((c, idx) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.ellipse(25 + idx * 8, -30 + idx * 25, 28, 14, 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // Sparkles
  for (let p = 0; p < 20; p++) {
    drawSparkle(ctx, 60 + (p * 50) % (width - 120), 70 + (p * 80) % (height - 150), 6, '#f472b6');
  }

  ctx.restore();
}

// ==========================================
// 4. BLUSH PEONY GARLAND
// ==========================================
export function drawBlushPeonyGarland(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const ox = width / 2;
  const oy = height / 2;
  const fw = width * 0.44;
  const fh = height * 0.44;
  const cornerCut = 48;

  const goldG = createGoldGradient(ctx, ox - fw, oy - fh, ox + fw, oy + fh);
  ctx.strokeStyle = goldG;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ox - fw + cornerCut, oy - fh);
  ctx.lineTo(ox + fw - cornerCut, oy - fh);
  ctx.lineTo(ox + fw, oy - fh + cornerCut);
  ctx.lineTo(ox + fw, oy + fh - cornerCut);
  ctx.lineTo(ox + fw - cornerCut, oy + fh);
  ctx.lineTo(ox - fw + cornerCut, oy + fh);
  ctx.lineTo(ox - fw, oy + fh - cornerCut);
  ctx.lineTo(ox - fw, oy - fh + cornerCut);
  ctx.closePath();
  ctx.stroke();

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

// ==========================================
// 5. ROYAL GOLD ART DECO
// ==========================================
export function drawRoyalGoldArtDeco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const gold = createGoldGradient(ctx, 0, 0, width, height);

  ctx.strokeStyle = gold;
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, width - 84, height - 84);

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
  drawCornerDeco(42, 42, 0);
  drawCornerDeco(width - 42, 42, 90);
  drawCornerDeco(width - 42, height - 42, 180);
  drawCornerDeco(42, height - 42, 270);

  // Top Sunburst
  const fx = width / 2; const fy = 54;
  ctx.strokeStyle = gold;
  for (let r = 0; r <= 180; r += 12) {
    const rad = (r * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(fx + Math.cos(rad) * 15, fy + Math.sin(rad) * 15);
    ctx.lineTo(fx + Math.cos(rad) * 65, fy + Math.sin(rad) * 65);
    ctx.stroke();
  }
  ctx.restore();
}

// ==========================================
// 6. SUPERHERO COMIC BLAST
// ==========================================
export function drawSuperheroComic(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Comic halftone dots
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
  for (let x = 30; x < width - 30; x += 25) {
    for (let y = 30; y < height - 30; y += 25) {
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Dynamic yellow explosion burst in background
  const cx = width / 2; const cy = height * 0.38;
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  const spikes = 16;
  for (let i = 0; i < spikes; i++) {
    const a1 = (i * Math.PI * 2) / spikes;
    const a2 = a1 + Math.PI / spikes;
    const r1 = 280; const r2 = 140;
    ctx.lineTo(cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1);
    ctx.lineTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 5; ctx.stroke();

  // Heavy comic border
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 8;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // Lightning bolts
  const drawBolt = (bx: number, by: number, scale: number) => {
    ctx.save(); ctx.translate(bx, by); ctx.scale(scale, scale);
    ctx.fillStyle = '#f59e0b'; ctx.strokeStyle = '#000000'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(15, -5); ctx.lineTo(5, -2); ctx.lineTo(18, 30);
    ctx.lineTo(-8, 5); ctx.lineTo(2, 2); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  };
  drawBolt(70, 100, 1.2);
  drawBolt(width - 70, 100, 1.2);
  ctx.restore();
}

// ==========================================
// 7. PIRATE TREASURE QUEST
// ==========================================
export function drawPirateTreasure(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Nautical rope border
  ctx.strokeStyle = '#92400e'; ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Ocean waves at bottom
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(0, height - 120);
  ctx.bezierCurveTo(width * 0.25, height - 160, width * 0.75, height - 80, width, height - 120);
  ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.closePath();
  ctx.fill();

  // Pirate Galleon Ship in lower center
  ctx.save();
  ctx.translate(width - 150, height - 150);
  ctx.scale(0.85, 0.85);
  // Hull
  ctx.fillStyle = '#451a03';
  ctx.beginPath(); ctx.moveTo(-60, 20); ctx.lineTo(70, 20); ctx.lineTo(50, 50); ctx.lineTo(-45, 50); ctx.closePath(); ctx.fill();
  // Sails
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.moveTo(-20, -50); ctx.quadraticCurveTo(10, -40, 0, 10); ctx.lineTo(-20, 10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(15, -40); ctx.quadraticCurveTo(45, -30, 35, 10); ctx.lineTo(15, 10); ctx.closePath(); ctx.fill();
  // Flag
  ctx.fillStyle = '#000000'; ctx.beginPath(); ctx.rect(-24, -65, 24, 15); ctx.fill();
  ctx.restore();

  // Compass Rose in top left
  ctx.save();
  ctx.translate(110, 110);
  ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 2); ctx.stroke();
  drawStar(ctx, 0, 0, 4, 40, 12, '#92400e');
  ctx.restore();
  ctx.restore();
}

// ==========================================
// 8. MERMAID OCEAN KINGDOM
// ==========================================
export function drawMermaidOcean(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Water bubbles
  for (let b = 0; b < 25; b++) {
    const bx = 60 + (b * 47) % (width - 120);
    const by = 80 + (b * 63) % (height - 160);
    const br = 6 + (b % 4) * 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath(); ctx.arc(bx - br * 0.3, by - br * 0.3, br * 0.25, 0, Math.PI * 2); ctx.fill();
  }

  // Giant Clam Shell with Pearl in lower right
  ctx.save();
  ctx.translate(width - 130, height - 120);
  ctx.scale(0.85, 0.85);
  ctx.fillStyle = '#f472b6';
  ctx.beginPath(); ctx.ellipse(0, 15, 65, 35, 0, 0, Math.PI * 2); ctx.fill();
  // Glowing Pearl
  const pearlG = ctx.createRadialGradient(-4, -6, 2, 0, 0, 20);
  pearlG.addColorStop(0, '#ffffff'); pearlG.addColorStop(0.7, '#fbcfe8'); pearlG.addColorStop(1, '#93c5fd');
  ctx.fillStyle = pearlG; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Seaweed & Coral in lower left
  ctx.save();
  ctx.translate(70, height - 70);
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-20, -50, 20, -90, 0, -140); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(25, 0); ctx.bezierCurveTo(40, -40, 10, -80, 30, -120); ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 9. SPEEDWAY GRAND PRIX
// ==========================================
export function drawSpeedwayRace(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Checkered borders top and bottom
  const checkSize = 18;
  for (let x = 0; x < width; x += checkSize) {
    for (let r = 0; r < 2; r++) {
      ctx.fillStyle = (Math.floor(x / checkSize) + r) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(x, 24 + r * checkSize, checkSize, checkSize);
      ctx.fillRect(x, height - 60 + r * checkSize, checkSize, checkSize);
    }
  }

  // Sleek Aerodynamic Race Car in Lower Center
  ctx.save();
  ctx.translate(width / 2, height - 130);
  ctx.scale(0.9, 0.9);
  // Red Body
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.roundRect(-90, -15, 180, 30, 12); ctx.fill();
  // Cockpit
  ctx.fillStyle = '#0f172a';
  ctx.beginPath(); ctx.ellipse(-10, -18, 35, 16, 0, 0, Math.PI * 2); ctx.fill();
  // Wheels
  ctx.fillStyle = '#1e293b';
  ctx.beginPath(); ctx.roundRect(-75, 12, 32, 14, 4); ctx.roundRect(45, 12, 32, 14, 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-75, -26, 32, 14, 4); ctx.roundRect(45, -26, 32, 14, 4); ctx.fill();
  // Spoiler
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.rect(-96, -8, 8, 16); ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 10. WILD ONE JUNGLE SAFARI
// ==========================================
export function drawWildSafari(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Tropical frame
  ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Acacia Tree Silhouette in background
  ctx.save();
  ctx.translate(width - 120, height * 0.35);
  ctx.fillStyle = 'rgba(77, 124, 15, 0.25)';
  ctx.beginPath(); ctx.rect(-5, 0, 10, 80); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -10, 60, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Cute Baby Lion in Lower Left
  ctx.save();
  ctx.translate(130, height - 120);
  ctx.scale(0.85, 0.85);
  // Mane
  ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.arc(0, 0, 48, 0, Math.PI * 2); ctx.fill();
  // Face
  ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fill();
  // Eyes & Nose
  ctx.fillStyle = '#451a03';
  ctx.beginPath(); ctx.arc(-12, -6, 5, 0, Math.PI * 2); ctx.arc(12, -6, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-6, 6); ctx.lineTo(6, 6); ctx.lineTo(0, 12); ctx.closePath(); ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 11. ENCHANTED FAIRY FOREST
// ==========================================
export function drawFairyForest(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Glowing fireflies
  for (let f = 0; f < 30; f++) {
    const fx = 50 + (f * 53) % (width - 100);
    const fy = 60 + (f * 71) % (height - 120);
    const rad = ctx.createRadialGradient(fx, fy, 1, fx, fy, 12);
    rad.addColorStop(0, '#fef08a'); rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad; ctx.fillRect(fx - 12, fy - 12, 24, 24);
  }

  // Glowing Magic Mushrooms in lower corners
  const drawMushroom = (mx: number, my: number, color: string) => {
    ctx.save(); ctx.translate(mx, my);
    ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.roundRect(-6, 0, 12, 35, 4); ctx.fill();
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, 0, 24, Math.PI, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(-8, -10, 3, 0, Math.PI * 2); ctx.arc(8, -10, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };
  drawMushroom(90, height - 85, '#ec4899');
  drawMushroom(width - 90, height - 85, '#06b6d4');
  ctx.restore();
}

// ==========================================
// 12. CUTE MONSTER BASH
// ==========================================
export function drawMonsterBash(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Pennant Bunting Garland
  const flagW = 28;
  for (let x = 35; x < width - 35; x += flagW) {
    ctx.fillStyle = (Math.floor(x / flagW) % 3 === 0) ? '#f43f5e' : (Math.floor(x / flagW) % 3 === 1) ? '#eab308' : '#06b6d4';
    ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x + flagW / 2, 65); ctx.lineTo(x + flagW, 40); ctx.closePath(); ctx.fill();
  }

  // Cute Furry Monster in lower right
  ctx.save();
  ctx.translate(width - 120, height - 120);
  ctx.scale(0.85, 0.85);
  ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.roundRect(-45, -45, 90, 90, 28); ctx.fill();
  // Horns
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.moveTo(-35, -45); ctx.lineTo(-45, -70); ctx.lineTo(-20, -45); ctx.fill();
  ctx.beginPath(); ctx.moveTo(35, -45); ctx.lineTo(45, -70); ctx.lineTo(20, -45); ctx.fill();
  // Big Single Eye
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0, -10, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(0, -10, 11, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(-4, -14, 4, 0, Math.PI * 2); ctx.fill();
  // Happy Smile
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(0, 15, 14, 0.2, Math.PI - 0.2); ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 13. CLASSIC TEDDY BEAR
// ==========================================
export function drawClassicTeddy(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Soft border
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, width - 68, height - 68);

  // Illustrated Teddy Bear in lower right
  ctx.save();
  ctx.translate(width - 140, height - 140);
  ctx.scale(0.82, 0.82);
  // Ears
  ctx.fillStyle = '#b45309';
  ctx.beginPath(); ctx.arc(-26, -42, 15, 0, Math.PI * 2); ctx.arc(26, -42, 15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fde68a';
  ctx.beginPath(); ctx.arc(-26, -42, 8, 0, Math.PI * 2); ctx.arc(26, -42, 8, 0, Math.PI * 2); ctx.fill();
  // Head
  ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(0, -20, 36, 0, Math.PI * 2); ctx.fill();
  // Snout
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(0, -12, 16, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#451a03'; ctx.beginPath(); ctx.arc(0, -16, 5, 0, Math.PI * 2); ctx.fill();
  // Body
  ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(0, 35, 34, 42, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(0, 35, 20, 26, 0, 0, Math.PI * 2); ctx.fill();
  // Bow tie
  ctx.fillStyle = '#ec4899';
  ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, -5); ctx.lineTo(14, 0); ctx.lineTo(0, 5); ctx.closePath(); ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 14. BABY DREAM CLOUDS
// ==========================================
export function drawBabyDreamCloud(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Crescent Moon
  ctx.save();
  ctx.translate(width - 120, 120);
  ctx.fillStyle = '#fde047';
  ctx.beginPath(); ctx.arc(0, 0, 42, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath(); ctx.arc(-16, -10, 38, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Floating stars
  for (let s = 0; s < 15; s++) {
    drawStar(ctx, 60 + (s * 60) % (width - 120), 80 + (s * 85) % (height - 180), 5, 12, 6, '#fde047');
  }
  ctx.restore();
}

// ==========================================
// 15. METALLIC BALLOONS CLUSTERS
// ==========================================
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

// ==========================================
// 16. RETRO 70s DISCO
// ==========================================
export function drawRetroDisco(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Mirrored Disco Ball in top center
  const bx = width / 2; const by = 110; const br = 52;
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, by - br); ctx.stroke();

  // Silver sphere
  const ballG = createSilverGradient(ctx, bx - br, by - br, bx + br, by + br);
  ctx.fillStyle = ballG; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();

  // Mirrored Facets
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1;
  for (let y = -br + 8; y < br; y += 10) {
    ctx.beginPath(); ctx.moveTo(bx - Math.sqrt(br*br - y*y), by + y); ctx.lineTo(bx + Math.sqrt(br*br - y*y), by + y); ctx.stroke();
  }
  drawSparkle(ctx, bx - 20, by - 15, 16, '#ffffff');
  drawSparkle(ctx, bx + 24, by + 18, 12, '#ffffff');
  ctx.restore();
}

// ==========================================
// 17. TROPICAL FLAMINGO
// ==========================================
export function drawTropicalFlamingo(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  // Palm leaves at top corners
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(0, 0, 140, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(width, 0, 140, Math.PI / 2, Math.PI); ctx.stroke();

  // Pink Flamingo in lower right
  ctx.save();
  ctx.translate(width - 120, height - 130);
  ctx.scale(0.85, 0.85);
  ctx.fillStyle = '#f43f5e';
  // Body
  ctx.beginPath(); ctx.ellipse(0, 20, 32, 22, -0.2, 0, Math.PI * 2); ctx.fill();
  // Long S-curved Neck
  ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.moveTo(-15, 15); ctx.bezierCurveTo(-35, -15, -10, -50, -25, -70); ctx.stroke();
  // Head & Beak
  ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(-25, -70, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(-32, -72); ctx.lineTo(-44, -66); ctx.lineTo(-32, -62); ctx.fill();
  // Stilt Legs
  ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-5, 40); ctx.lineTo(-5, 95); ctx.moveTo(8, 40); ctx.lineTo(16, 95); ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// ==========================================
// 18. HOLI COLOR SPLASH
// ==========================================
export function drawHoliColorSplash(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const splashes = [
    { x: 100, y: 120, r: 55, color: '#ec4899' },
    { x: width - 100, y: 130, r: 60, color: '#f59e0b' },
    { x: 110, y: height - 120, r: 65, color: '#06b6d4' },
    { x: width - 110, y: height - 120, r: 58, color: '#10b981' },
  ];

  splashes.forEach((sp) => {
    ctx.save();
    ctx.translate(sp.x, sp.y);
    ctx.fillStyle = sp.color;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const ang = (i * Math.PI * 2) / 12;
      const dist = sp.r * (0.6 + ((i % 3) * 0.25));
      ctx.lineTo(Math.cos(ang) * dist, Math.sin(ang) * dist);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/utils/artworkEngines.ts'), content, 'utf8');
console.log('Successfully wrote src/utils/artworkEngines.ts');
