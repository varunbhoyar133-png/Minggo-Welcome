import { TvScreenData, TvScreenTemplate } from '../types';
import { drawMinggoLogo, drawRoundedRect, drawSparkle } from '../utils/canvasHelpers';

/**
 * High-Precision TV Display Vector Engine (16:9 Landscape)
 * Base Reference: 1920 × 1080 Full HD
 */

// Draw realistic, glossy latex party balloons with true Qualatex teardrop silhouette, multi-layer shading, softbox reflection streak, and realistic tied knot
function drawAuthenticBalloon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rX: number,
  rY: number,
  baseColor: string,
  highlightColor: string,
  anchorX: number,
  anchorY: number,
  s: number,
  tiltDeg: number = 0
) {
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // 1. Natural celebration ribbon curling down to bouquet anchor
  const knotLocalX = 0;
  const knotLocalY = rY + 14 * s;
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);
  const knotWorldX = cx + knotLocalX * cosT - knotLocalY * sinT;
  const knotWorldY = cy + knotLocalX * sinT + knotLocalY * cosT;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(knotWorldX, knotWorldY);
  const dx = anchorX - knotWorldX;
  const dy = anchorY - knotWorldY;
  // Natural S-curve wave for festive celebration ribbon
  const waveSide = knotWorldX < anchorX ? 32 * s : -32 * s;
  ctx.bezierCurveTo(
    knotWorldX + dx * 0.28 + waveSide,
    knotWorldY + dy * 0.32,
    knotWorldX + dx * 0.72 - waveSide * 0.6,
    knotWorldY + dy * 0.68,
    anchorX,
    anchorY
  );
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.45)';
  ctx.lineWidth = 2.2 * s;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // 2. Transformed balloon coordinate space (centered at cx, cy with natural tilt)
  ctx.save();
  ctx.translate(cx, cy);
  if (tiltDeg !== 0) {
    ctx.rotate(tiltRad);
  }

  // --- Silhouette Path: Authentic Latex Helium Balloon Silhouette ---
  // Widest point at upper hemisphere (y = -rY * 0.18), smooth spherical top dome,
  // and sleek, continuous conical taper down to the gathered neck at (0, rY).
  function traceBalloonPath() {
    ctx.beginPath();
    ctx.moveTo(0, rY);
    // Lower-left continuous taper into neck
    ctx.bezierCurveTo(-rX * 0.22, rY * 0.78, -rX * 0.96, rY * 0.22, -rX, -rY * 0.18);
    // Upper-left shoulder to top apex
    ctx.bezierCurveTo(-rX * 1.00, -rY * 0.62, -rX * 0.54, -rY * 1.00, 0, -rY);
    // Top apex to upper-right shoulder
    ctx.bezierCurveTo(rX * 0.54, -rY * 1.00, rX * 1.00, -rY * 0.62, rX, -rY * 0.18);
    // Upper-right flank to bottom neck
    ctx.bezierCurveTo(rX * 0.96, rY * 0.22, rX * 0.22, rY * 0.78, 0, rY);
    ctx.closePath();
  }

  // 3. Ambient Soft Drop Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.18)';
  ctx.shadowBlur = 22 * s;
  ctx.shadowOffsetY = 10 * s;
  ctx.shadowOffsetX = 3 * s;
  traceBalloonPath();
  ctx.fillStyle = shadeColor(baseColor, -20);
  ctx.fill();
  ctx.restore();

  // 4. 3D Spherical Volume Body Gradient (Rich Latex Material)
  const lightX = -rX * 0.32;
  const lightY = -rY * 0.36;
  const bodyGrad = ctx.createRadialGradient(
    lightX,
    lightY,
    rX * 0.06,
    0,
    0,
    rX * 1.25
  );
  bodyGrad.addColorStop(0, highlightColor);
  bodyGrad.addColorStop(0.35, tintColor(baseColor, 0.25));
  bodyGrad.addColorStop(0.65, baseColor);
  bodyGrad.addColorStop(0.88, shadeColor(baseColor, -16));
  bodyGrad.addColorStop(1.0, shadeColor(baseColor, -30));

  traceBalloonPath();
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // 5. Translucent Subsurface Rim Glow (Thin latex rim transmission)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2.5 * s;
  traceBalloonPath();
  ctx.stroke();
  ctx.restore();

  // 6. Primary Glossy Softbox Reflection (Curved Streak hugging upper-left flank)
  ctx.save();
  ctx.translate(-rX * 0.40, -rY * 0.40);
  ctx.rotate(-Math.PI / 4.8); // ~ -37.5 deg
  const streakGrad = ctx.createLinearGradient(0, -rY * 0.38, 0, rY * 0.38);
  streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
  streakGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.65)');
  streakGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.20)');
  streakGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.beginPath();
  ctx.ellipse(0, 0, rX * 0.16, rY * 0.38, 0, 0, Math.PI * 2);
  ctx.fillStyle = streakGrad;
  ctx.fill();
  ctx.restore();

  // 7. Pinpoint Specular Hotspot Glint (Crisp overhead studio bulb reflection)
  ctx.save();
  ctx.translate(-rX * 0.46, -rY * 0.54);
  ctx.rotate(-Math.PI / 4.8);
  ctx.beginPath();
  ctx.ellipse(0, 0, rX * 0.065, rY * 0.11, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fill();
  ctx.restore();

  // 8. Secondary Ambient Bounce Reflection (Bottom-right rim roundness)
  ctx.save();
  ctx.translate(rX * 0.42, rY * 0.36);
  ctx.rotate(-Math.PI / 4.8);
  const bounceGrad = ctx.createLinearGradient(0, -rY * 0.26, 0, rY * 0.26);
  bounceGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
  bounceGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
  bounceGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.beginPath();
  ctx.ellipse(0, 0, rX * 0.10, rY * 0.26, 0, 0, Math.PI * 2);
  ctx.fillStyle = bounceGrad;
  ctx.fill();
  ctx.restore();

  // 9. Realistic Gathered Latex Knot & Rolled Collar
  // Part A: Tapered gathered latex neck tab
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-7 * s, rY - 2 * s);
  ctx.lineTo(7 * s, rY - 2 * s);
  ctx.lineTo(5 * s, rY + 11 * s);
  ctx.lineTo(-5 * s, rY + 11 * s);
  ctx.closePath();
  ctx.fillStyle = shadeColor(baseColor, -20);
  ctx.fill();

  // Part B: The tied latex knot bead
  ctx.beginPath();
  ctx.ellipse(0, rY + 11 * s, 6.5 * s, 4.5 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = shadeColor(baseColor, -28);
  ctx.fill();

  // Part C: The rolled latex collar / lip ring (inflation bead)
  ctx.beginPath();
  ctx.ellipse(0, rY + 14 * s, 9 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = shadeColor(baseColor, -34);
  ctx.fill();

  // Tiny glint on the rolled collar ring
  ctx.beginPath();
  ctx.ellipse(-2 * s, rY + 13 * s, 3.5 * s, 1.5 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fill();
  ctx.restore();

  // Restore transformed balloon coordinates
  ctx.restore();
}

function tintColor(color: string, factor: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;

  const R = Math.round(r + (255 - r) * factor);
  const G = Math.round(g + (255 - g) * factor);
  const B = Math.round(b + (255 - b) * factor);

  const RR = Math.min(255, Math.max(0, R)).toString(16).padStart(2, '0');
  const GG = Math.min(255, Math.max(0, G)).toString(16).padStart(2, '0');
  const BB = Math.min(255, Math.max(0, B)).toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

function shadeColor(color: string, percent: number): string {
  let R = parseInt(color.substring(1, 3), 16) || 0;
  let G = parseInt(color.substring(3, 5), 16) || 0;
  let B = parseInt(color.substring(5, 7), 16) || 0;

  R = Math.round((R * (100 + percent)) / 100);
  G = Math.round((G * (100 + percent)) / 100);
  B = Math.round((B * (100 + percent)) / 100);

  R = Math.min(255, Math.max(0, R));
  G = Math.min(255, Math.max(0, G));
  B = Math.min(255, Math.max(0, B));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

// 60 Rich Confetti Pieces
const richConfetti = [
  { x: 0.05, y: 0.08, w: 20, h: 9, rot: 25, color: '#00d2ff' },
  { x: 0.12, y: 0.14, w: 16, h: 16, rot: 45, color: '#ff2d87' },
  { x: 0.18, y: 0.07, w: 22, h: 10, rot: -30, color: '#ff7700' },
  { x: 0.25, y: 0.16, w: 14, h: 14, rot: 15, color: '#ffd200' },
  { x: 0.32, y: 0.09, w: 20, h: 9, rot: 40, color: '#00e676' },
  { x: 0.38, y: 0.22, w: 12, h: 12, rot: -15, color: '#a855f7' },
  { x: 0.62, y: 0.08, w: 22, h: 10, rot: -20, color: '#ffd200' },
  { x: 0.68, y: 0.22, w: 16, h: 16, rot: 35, color: '#ff2d87' },
  { x: 0.74, y: 0.10, w: 20, h: 9, rot: -45, color: '#00d2ff' },
  { x: 0.81, y: 0.18, w: 14, h: 14, rot: 10, color: '#00e676' },
  { x: 0.88, y: 0.09, w: 22, h: 10, rot: 30, color: '#ff7700' },
  { x: 0.95, y: 0.15, w: 16, h: 16, rot: -25, color: '#a855f7' },
  // Sides & Around Text
  { x: 0.04, y: 0.35, w: 18, h: 9, rot: -15, color: '#ffd200' },
  { x: 0.44, y: 0.32, w: 16, h: 8, rot: 35, color: '#00d2ff' },
  { x: 0.56, y: 0.33, w: 18, h: 9, rot: -25, color: '#ff7700' },
  { x: 0.96, y: 0.38, w: 14, h: 14, rot: 20, color: '#ff2d87' },
  { x: 0.42, y: 0.52, w: 20, h: 10, rot: -40, color: '#00e676' },
  { x: 0.58, y: 0.53, w: 16, h: 8, rot: 30, color: '#ffd200' },
  { x: 0.46, y: 0.68, w: 18, h: 9, rot: 15, color: '#00d2ff' },
  { x: 0.54, y: 0.69, w: 14, h: 14, rot: -30, color: '#ff2d87' },
  // Bottom Area
  { x: 0.06, y: 0.72, w: 22, h: 10, rot: 45, color: '#ff2d87' },
  { x: 0.14, y: 0.85, w: 16, h: 16, rot: -10, color: '#00d2ff' },
  { x: 0.22, y: 0.92, w: 20, h: 9, rot: 30, color: '#ffd200' },
  { x: 0.35, y: 0.88, w: 14, h: 14, rot: -35, color: '#00e676' },
  { x: 0.65, y: 0.89, w: 20, h: 10, rot: 25, color: '#ff7700' },
  { x: 0.78, y: 0.84, w: 16, h: 16, rot: -40, color: '#00d2ff' },
  { x: 0.86, y: 0.91, w: 22, h: 10, rot: 15, color: '#ff2d87' },
  { x: 0.94, y: 0.75, w: 18, h: 9, rot: -20, color: '#ffd200' },
];

function drawRichConfetti(ctx: CanvasRenderingContext2D, width: number, height: number, s: number) {
  ctx.save();
  for (const c of richConfetti) {
    ctx.save();
    ctx.translate(c.x * width, c.y * height);
    ctx.rotate((c.rot * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.w * s * 0.5, -c.h * s * 0.5, c.w * s, c.h * s);
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Draws the top MinGGo Logo in a white rounded pill with cyan border,
 * exactly matching the TV screen in the reference photo.
 */
function drawTvMinggoLogoPill(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  s: number,
  borderColor: string = '#38bdf8',
  shadowColor: string = 'rgba(56, 189, 248, 0.4)',
  logoImg?: HTMLImageElement | null
) {
  const pillW = 410 * s;
  const pillH = 144 * s;
  const pillRadius = pillH / 2;

  ctx.save();
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 24 * s;
  ctx.shadowOffsetY = 6 * s;

  drawRoundedRect(
    ctx,
    centerX - pillW / 2,
    topY,
    pillW,
    pillH,
    pillRadius,
    '#ffffff',
    borderColor,
    4 * s
  );
  ctx.restore();

  // If a preloaded logo image is available, draw it directly!
  const logoW = 280 * s;
  const logoH = logoW / 2.756;
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    ctx.save();
    ctx.shadowColor = 'rgba(249, 115, 22, 0.35)';
    ctx.shadowBlur = 12 * s;
    ctx.drawImage(
      logoImg,
      centerX - logoW / 2,
      topY + (pillH - logoH) / 2,
      logoW,
      logoH
    );
    ctx.restore();
  } else {
    drawMinggoLogo(ctx, centerX, topY + (pillH - logoH) / 2, logoW);
  }
}

function getHeroNameText(data: TvScreenData): string {
  if (data.customHeadline) return data.customHeadline;
  const cleanName = (data.childName || 'KAVYA').trim().toUpperCase();
  const cleanAge = (data.age || '').trim();
  if (!cleanAge) return cleanName;
  if (cleanName.endsWith("'S") || cleanName.endsWith("’S")) {
    return `${cleanName} ${cleanAge}`;
  }
  return `${cleanName}'s ${cleanAge}`;
}

// ============================================================================
// TEMPLATE 1: MINGGO CLASSIC PLAY ZONE (EXACT MATCH TO TV PHOTO)
// ============================================================================
const templateClassicBalloons: TvScreenTemplate = {
  id: 'tv-classic-balloons',
  name: 'MinGGo Play Zone Balloon Party',
  theme: 'Classic MinGGo TV Display',
  description: 'Exact 1:1 replica of the MinGGo in-store TV display with massive colorful cartoon balloons, rich confetti, and giant die-cut puffy sticker name',
  badge: 'EXACT REPLICA',
  previewColor: '#ff6200',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    // 1. Crisp clean luminous white background with subtle center brightness
    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      150 * s,
      width / 2,
      height / 2,
      1050 * s
    );
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.7, '#fdfefe');
    bgGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Rich Confetti scattering across background
    drawRichConfetti(ctx, width, height, s);

    // 3. Left Balloon Bouquet (Huge, realistic glossy latex balloons filling left 30% of screen)
    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    // Top Red-Orange Balloon
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#ef4444', '#fecdd3', leftAnchorX, leftAnchorY, s, -6);
    // Middle-Right Yellow Balloon
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#eab308', '#fef9c3', leftAnchorX, leftAnchorY, s, 7);
    // Bottom-Left Sky Blue Balloon
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#0ea5e9', '#e0f2fe', leftAnchorX, leftAnchorY, s, -8);
    // Bottom-Right Magenta Pink Balloon
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#d946ef', '#fdf2f8', leftAnchorX, leftAnchorY, s, 5);

    // 4. Right Balloon Bouquet (Green, Purple, Yellow, Pink)
    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    // Top Bright Green Balloon
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#22c55e', '#dcfce7', rightAnchorX, rightAnchorY, s, 7);
    // Middle-Left Royal Purple Balloon
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#8b5cf6', '#ede9fe', rightAnchorX, rightAnchorY, s, -7);
    // Middle-Right Bright Yellow Balloon
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#facc15', '#fef9c3', rightAnchorX, rightAnchorY, s, 8);
    // Bottom Rose Pink Balloon
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#f472b6', '#fdf2f8', rightAnchorX, rightAnchorY, s, -5);

    // 5. MinGGo Logo Pill at top
    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#38bdf8', 'rgba(56, 189, 248, 0.4)', logoImg);

    // 6. Text: "Welcome to" (Bold, clean, room-filling)
    const welcomeText = data.titlePrefix || 'Welcome to';
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(62 * s)}px "Baloo 2", "Fredoka", "Outfit", sans-serif`;
    ctx.fillStyle = '#1e3a8a'; // Deep Navy Blue
    ctx.fillText(welcomeText, width / 2, 275 * s);
    ctx.restore();

    // 7. Hero Name: e.g. "KAVYA's 7th" (GIANT, BUBBLY, DIE-CUT STICKER)
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Massive font size matching reference photo
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Baloo 2", "Montserrat", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Baloo 2", "Montserrat", sans-serif`;
    }

    const heroY = 460 * s;

    // Layer A: Drop Shadow under the entire white sticker
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 32 * s;
    ctx.shadowOffsetY = 12 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    // Layer B: Heavy White Die-Cut Sticker Outline (Letters blend into one party badge!)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    // Layer C: Vibrant MinGGo Orange Fill with subtle vertical lighting
    const nameGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    nameGrad.addColorStop(0, '#ff6a00');
    nameGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = nameGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // 8. Text: "Birthday Party!" (Bold Navy with white stroke)
    const partyText = data.eventTitle || 'Birthday Party!';
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(86 * s)}px "Baloo 2", "Fredoka", "Outfit", sans-serif`;

    // White outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(partyText, width / 2, 630 * s);

    // Deep Navy Fill
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(partyText, width / 2, 630 * s);
    ctx.restore();

    // 9. Bottom Pill Badge: "2nd Floor, Play Zone"
    const zone = data.zoneText || '2nd Floor, Play Zone';
    ctx.save();
    ctx.font = `700 ${Math.round(34 * s)}px "Outfit", "Fredoka", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    ctx.shadowColor = 'rgba(30, 58, 138, 0.35)';
    ctx.shadowBlur = 18 * s;
    ctx.shadowOffsetY = 6 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#1e3a8a',
      '#3b82f6',
      2 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.round(34 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 2: MINGGO ROYALE MIDNIGHT & 3D GOLD
// ============================================================================
const templateMidnightGold: TvScreenTemplate = {
  id: 'tv-midnight-gold',
  name: 'MinGGo Royale Midnight & 3D Gold',
  theme: 'Luxury Gold & VIP',
  description: 'Rich midnight navy backdrop with shimmering 3D metallic gold balloons, golden stardust, and radiant metallic gold name',
  badge: 'LUXURY',
  previewColor: '#f59e0b',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060814');
    bgGrad.addColorStop(0.5, '#0b1329');
    bgGrad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Stardust
    ctx.save();
    for (let i = 0; i < 55; i++) {
      const sx = (Math.sin(i * 12.3) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 19.7) * 0.5 + 0.5) * height;
      const sz = ((i % 5) + 3.5) * s;
      drawSparkle(ctx, sx, sy, sz, i % 2 === 0 ? '#facc15' : '#fef08a');
    }
    ctx.restore();

    // 3D Metallic Balloons
    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#d97706', '#fef08a', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#1e293b', '#94a3b8', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#b45309', '#fde047', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#78350f', '#f59e0b', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#d97706', '#fef08a', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#b45309', '#fde047', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#1e293b', '#94a3b8', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#d97706', '#fef08a', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#f59e0b', 'rgba(245, 158, 11, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `600 ${Math.round(60 * s)}px "Outfit", "Playfair Display", sans-serif`;
    ctx.fillStyle = '#fef08a';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Radiant Gold
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 158 * s;
    ctx.font = `900 ${heroFontSize}px "Cinzel", "Outfit", "Playfair Display", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Cinzel", "Outfit", "Playfair Display", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.save();
    ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
    ctx.shadowBlur = 36 * s;
    ctx.shadowOffsetY = 6 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 26 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    const goldGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    goldGrad.addColorStop(0, '#ffffff');
    goldGrad.addColorStop(0.35, '#fef08a');
    goldGrad.addColorStop(0.7, '#f59e0b');
    goldGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = goldGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(82 * s)}px "Outfit", "Playfair Display", sans-serif`;
    ctx.fillStyle = '#fde047';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 16 * s;
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Gold-bordered Venue Pill
    const zone = data.zoneText || 'VIP Banquet & Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 74 * s;
    const zoneY = 765 * s;

    ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
    ctx.shadowBlur = 20 * s;
    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      'rgba(15, 23, 42, 0.95)',
      '#f59e0b',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#fef08a';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 3: MINGGO DINO SAFARI PARK
// ============================================================================
const templateDinoSafari: TvScreenTemplate = {
  id: 'tv-dino-safari',
  name: 'MinGGo Dino Safari Park',
  theme: 'Kids Dinosaur Adventure',
  description: 'Lush tropical jungle palms with friendly dinosaur vibes, sunny amber cartoon lettering, and safari badge',
  badge: 'KIDS FAVORITE',
  previewColor: '#10b981',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#064e3b');
    bgGrad.addColorStop(0.55, '#047857');
    bgGrad.addColorStop(1, '#065f46');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Jungle Palm Fronds
    ctx.save();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.ellipse(120 * s + i * 25 * s, 160 * s, 220 * s, 60 * s, (i * 15 * Math.PI) / 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(width - (120 * s + i * 25 * s), 160 * s, 220 * s, 60 * s, -(i * 15 * Math.PI) / 180, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Jungle Balloons
    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#f59e0b', '#fef08a', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#10b981', '#a7f3d0', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#84cc16', '#d9f99d', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#059669', '#6ee7b7', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#84cc16', '#d9f99d', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#f59e0b', '#fef08a', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#10b981', '#a7f3d0', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#047857', '#6ee7b7', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#10b981', 'rgba(16, 185, 129, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.fillStyle = '#fef3c7';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Sunny Amber
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 160 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }

    const heroY = 460 * s;

    // White outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#fbbf24';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#065f46';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Safari Badge
    const zone = data.zoneText || 'Jungle Safari Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(34 * s)}px "Outfit", "Fredoka", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#065f46',
      '#34d399',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(34 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.fillStyle = '#ecfdf5';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 4: MINGGO SPACE GALAXY ODYSSEY
// ============================================================================
const templateSpaceGalaxy: TvScreenTemplate = {
  id: 'tv-space-galaxy',
  name: 'MinGGo Space Galaxy Odyssey',
  theme: 'Cosmic Galaxy & Astronaut',
  description: 'Deep cosmic starfield with glowing nebula, electric cyan and neon orange lettering, and planetary badges',
  badge: 'SCI-FI',
  previewColor: '#06b6d4',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      120 * s,
      width / 2,
      height / 2,
      1050 * s
    );
    bgGrad.addColorStop(0, '#1e1b4b');
    bgGrad.addColorStop(0.6, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Stars
    ctx.save();
    for (let i = 0; i < 60; i++) {
      const sx = (Math.sin(i * 14.1) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 23.3) * 0.5 + 0.5) * height;
      const r = ((i % 3) + 2) * s;
      ctx.fillStyle = i % 3 === 0 ? '#38bdf8' : i % 2 === 0 ? '#ffffff' : '#f43f5e';
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#0284c7', '#7dd3fc', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#6366f1', '#a5b4fc', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#f97316', '#fed7aa', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#06b6d4', '#a5f3fc', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#f97316', '#fed7aa', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#06b6d4', '#a5f3fc', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#6366f1', '#a5b4fc', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#0284c7', '#7dd3fc', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#38bdf8', 'rgba(56, 189, 248, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Electric Orange / Cyan Glow
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 160 * s;
    ctx.font = `900 ${heroFontSize}px "Outfit", "Fredoka", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Outfit", "Fredoka", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.save();
    ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
    ctx.shadowBlur = 32 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.fillStyle = '#ff7b00';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#0284c7';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Space Zone Pill Badge
    const zone = data.zoneText || 'Galactic Play Zone - Launch Pad 1';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      'rgba(15, 23, 42, 0.95)',
      '#38bdf8',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 5: MINGGO SUPERHERO COMIC BLAST
// ============================================================================
const templateSuperheroBlast: TvScreenTemplate = {
  id: 'tv-superhero-blast',
  name: 'MinGGo Superhero Comic Blast',
  theme: 'Action Superhero Comic',
  description: 'Dynamic pop-art comic rays, halftone dot bursts, bold 3D comic block lettering, and superhero action headquarters badge',
  badge: 'ACTION',
  previewColor: '#ef4444',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    // Sunburst rays
    ctx.save();
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, width, height);

    const rays = 24;
    const angleStep = (Math.PI * 2) / rays;
    ctx.fillStyle = '#2563eb';
    for (let i = 0; i < rays; i += 2) {
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.arc(width / 2, height / 2, width, i * angleStep, (i + 1) * angleStep);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#ef4444', '#fca5a5', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#facc15', '#fef08a', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#0ea5e9', '#7dd3fc', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#dc2626', '#f87171', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#facc15', '#fef08a', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#ef4444', '#fca5a5', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#0ea5e9', '#7dd3fc', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#f59e0b', '#fef08a', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#ef4444', 'rgba(239, 68, 68, 0.45)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(62 * s)}px "Bungee", "Fredoka", sans-serif`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8 * s;
    ctx.strokeText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in 3D Comic Block Lettering
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 160 * s;
    ctx.font = `900 ${heroFontSize}px "Bungee", "Fredoka", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Bungee", "Fredoka", sans-serif`;
    }

    const heroY = 460 * s;

    // Heavy Black 3D Drop
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 32 * s;
    ctx.strokeText(heroText, width / 2, heroY + 12 * s);

    // White outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22 * s;
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#facc15';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(84 * s)}px "Bungee", "Fredoka", sans-serif`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 10 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Superhero HQ Badge
    const zone = data.zoneText || 'Superhero HQ - Party Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#ef4444',
      '#facc15',
      3.5 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 6: MINGGO CUTE PASTEL TEDDY & CLOUDS
// ============================================================================
const templatePastelTeddy: TvScreenTemplate = {
  id: 'tv-pastel-teddy',
  name: 'MinGGo Cute Pastel Teddy & Clouds',
  theme: 'Pastel Baby Dream & 1st Birthday',
  description: 'Soft baby blue dream sky with fluffy marshmallow clouds, adorable pastel rainbow, gentle caramel lettering, and sweet baby zone badge',
  badge: 'SWEET & CUTE',
  previewColor: '#38bdf8',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#e0f2fe');
    bgGrad.addColorStop(0.6, '#f0f9ff');
    bgGrad.addColorStop(1, '#fef2f2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Fluffy clouds at bottom
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.arc((i * 240 + 100) * s, height - 35 * s, 140 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#38bdf8', '#bae6fd', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#f472b6', '#fbcfe8', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#34d399', '#a7f3d0', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#facc15', '#fef08a', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#f472b6', '#fbcfe8', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#38bdf8', '#bae6fd', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#facc15', '#fef08a', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#c084fc', '#e9d5ff', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#7dd3fc', 'rgba(125, 211, 252, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Caveat", "Dancing Script", cursive`;
    ctx.fillStyle = '#0369a1';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 162 * s;
    ctx.font = `bold ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `bold ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }

    const heroY = 460 * s;

    // White cloud stroke
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#0284c7';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#e11d48';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Baby Star Pill
    const zone = data.zoneText || 'Little Star & Toddler Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#0284c7',
      '#7dd3fc',
      2.5 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 7: MINGGO PRINCESS & MAGICAL UNICORN
// ============================================================================
const templatePrincessUnicorn: TvScreenTemplate = {
  id: 'tv-princess-unicorn',
  name: 'MinGGo Princess & Magical Unicorn',
  theme: 'Fairytale Princess & Magic',
  description: 'Sparkling fairytale sunset with magical unicorn vibes, rose gold and pastel lilac balloons, and royal palace crown badge',
  badge: 'FAIRYTALE',
  previewColor: '#ec4899',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#fdf2f8');
    bgGrad.addColorStop(0.5, '#f5d0fe');
    bgGrad.addColorStop(1, '#e0e7ff');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Sparkles
    ctx.save();
    for (let i = 0; i < 45; i++) {
      const sx = (Math.sin(i * 11.7) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 17.3) * 0.5 + 0.5) * height;
      drawSparkle(ctx, sx, sy, 8 * s, '#ec4899');
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#ec4899', '#fbcfe8', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#c084fc', '#f3e8ff', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#fb7185', '#ffe4e6', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#a855f7', '#e9d5ff', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#c084fc', '#f3e8ff', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#ec4899', '#fbcfe8', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#fb7185', '#ffe4e6', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#a855f7', '#e9d5ff', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#f472b6', 'rgba(244, 114, 182, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Caveat", "Dancing Script", cursive`;
    ctx.fillStyle = '#831843';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Magenta / Rose Gold
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 162 * s;
    ctx.font = `bold ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `bold ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#db2777';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#7e22ce';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Princess Royal Palace Pill
    const zone = data.zoneText || 'Princess Royal Palace & Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#be185d',
      '#f472b6',
      2.5 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#fdf2f8';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 8: MINGGO CYBER ARCADE & GAMING
// ============================================================================
const templateCyberArcade: TvScreenTemplate = {
  id: 'tv-cyber-arcade',
  name: 'MinGGo Cyber Arcade & Gaming',
  theme: 'Arcade Gaming & Cyber Neon',
  description: 'Retro synthwave neon grid floor, 8-bit game controllers, electric magenta and laser cyan glow lettering, and gamer play zone arena badge',
  badge: 'GAMER',
  previewColor: '#8b5cf6',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#09090b');
    bgGrad.addColorStop(0.5, '#18181b');
    bgGrad.addColorStop(1, '#27272a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid Floor
    ctx.save();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.lineWidth = 2 * s;
    const horizonY = height * 0.72;
    for (let x = -width; x < width * 2; x += 120 * s) {
      ctx.beginPath();
      ctx.moveTo(width / 2, horizonY);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = horizonY; y < height; y += (y - horizonY) * 0.4 + 18 * s) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#06b6d4', '#67e8f9', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#d946ef', '#f5d0fe', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#8b5cf6', '#c4b5fd', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#22c55e', '#86efac', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#d946ef', '#f5d0fe', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#06b6d4', '#67e8f9', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#8b5cf6', '#c4b5fd', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#22c55e', '#86efac', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#06b6d4', 'rgba(6, 182, 212, 0.55)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.fillStyle = '#22d3ee';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Neon Magenta / Cyan Glow
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 160 * s;
    ctx.font = `900 ${heroFontSize}px "Outfit", "Fredoka", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Outfit", "Fredoka", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.save();
    ctx.shadowColor = 'rgba(236, 72, 153, 0.85)';
    ctx.shadowBlur = 32 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.fillStyle = '#ec4899';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Outfit", "Fredoka", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#fde047';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Gamer Arena Pill
    const zone = data.zoneText || 'Level 7 Gamer Arena - Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#18181b',
      '#a855f7',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#f5d0fe';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 9: MINGGO BIG TOP CARNIVAL & CIRCUS
// ============================================================================
const templateCarnivalCircus: TvScreenTemplate = {
  id: 'tv-carnival-circus',
  name: 'MinGGo Big Top Carnival & Circus',
  theme: 'Carnival & Circus Big Top',
  description: 'Festive red & cream big top circus tent drape with colorful pennant bunting garland, carnival balloons, and marquee lettering',
  badge: 'FESTIVE',
  previewColor: '#dc2626',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    ctx.fillStyle = '#fefce8';
    ctx.fillRect(0, 0, width, height);

    // Circus Awning Drape at Top
    ctx.save();
    const drapes = 12;
    const drapeW = width / drapes;
    for (let i = 0; i < drapes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#dc2626' : '#fef08a';
      ctx.beginPath();
      ctx.moveTo(i * drapeW, 0);
      ctx.lineTo((i + 1) * drapeW, 0);
      ctx.quadraticCurveTo((i + 0.5) * drapeW, 60 * s, (i + 1) * drapeW, 0);
      ctx.lineTo(i * drapeW, 0);
      ctx.fillRect(i * drapeW, 0, drapeW, 45 * s);
      ctx.fill();
    }
    ctx.restore();

    drawRichConfetti(ctx, width, height, s);

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#dc2626', '#fca5a5', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#2563eb', '#93c5fd', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#facc15', '#fef08a', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#16a34a', '#86efac', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#facc15', '#fef08a', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#dc2626', '#fca5a5', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#2563eb', '#93c5fd', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#16a34a', '#86efac', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#dc2626', 'rgba(220, 38, 38, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Carnival Red & Gold
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 160 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#dc2626';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#2563eb';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Carnival Arena Pill
    const zone = data.zoneText || 'Grand Carnival Arena - 2nd Floor';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#dc2626',
      '#facc15',
      3.5 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 10: MINGGO TROPICAL SUNSHINE FIESTA
// ============================================================================
const templateTropicalFiesta: TvScreenTemplate = {
  id: 'tv-tropical-fiesta',
  name: 'MinGGo Tropical Sunshine Fiesta',
  theme: 'Tropical Sunshine & Flamingo',
  description: 'Warm sunny gradient with cheerful tropical monstera palms, pink flamingo party vibes, and sunshine mango orange lettering',
  badge: 'SUNNY',
  previewColor: '#fb923c',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#fffbeb');
    bgGrad.addColorStop(0.5, '#fef3c7');
    bgGrad.addColorStop(1, '#ffe4e6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 152 * s, '#f97316', '#fed7aa', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 144 * s, '#ec4899', '#fbcfe8', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 150 * s, '#06b6d4', '#a5f3fc', leftAnchorX, leftAnchorY, s);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 138 * s, '#facc15', '#fef08a', leftAnchorX, leftAnchorY, s);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 150 * s, '#ec4899', '#fbcfe8', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 144 * s, '#f97316', '#fed7aa', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 148 * s, '#06b6d4', '#a5f3fc', rightAnchorX, rightAnchorY, s);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 134 * s, '#facc15', '#fef08a', rightAnchorX, rightAnchorY, s);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#fb923c', 'rgba(251, 146, 60, 0.4)', logoImg);

    // "Welcome to"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(62 * s)}px "Caveat", "Dancing Script", cursive`;
    ctx.fillStyle = '#0f766e';
    ctx.fillText(data.titlePrefix || 'Welcome to', width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Mango Orange
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }

    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#ea580c';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Birthday Party!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#0d9488';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    // Tropical Splash Zone Pill
    const zone = data.zoneText || 'Tropical Splash Play Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#0d9488',
      '#5eead4',
      2.5 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 11: MINGGO UNDERSEA MERMAID KINGDOM
// ============================================================================
const templateOceanMermaid: TvScreenTemplate = {
  id: 'tv-ocean-mermaid',
  name: 'MinGGo Undersea Mermaid Kingdom',
  theme: 'Undersea Mermaid & Ocean Coral',
  description: 'Deep aquamarine coral reef, floating luminous sea bubbles, starfish sparkle, and iridescent pearl lettering',
  badge: 'MERMAID & SEA',
  previewColor: '#06b6d4',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0369a1');
    bgGrad.addColorStop(0.4, '#0284c7');
    bgGrad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(width * 0.2 + i * 220 * s, 0);
      ctx.lineTo(width * 0.05 + i * 280 * s, height);
      ctx.lineTo(width * 0.12 + i * 280 * s, height);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    const bubbles = [
      { x: 0.10, y: 0.25, r: 18 }, { x: 0.18, y: 0.70, r: 24 }, { x: 0.26, y: 0.40, r: 14 },
      { x: 0.35, y: 0.85, r: 20 }, { x: 0.65, y: 0.30, r: 16 }, { x: 0.72, y: 0.75, r: 26 },
      { x: 0.82, y: 0.45, r: 22 }, { x: 0.90, y: 0.80, r: 15 }, { x: 0.48, y: 0.18, r: 12 },
      { x: 0.52, y: 0.88, r: 28 }, { x: 0.08, y: 0.50, r: 16 }, { x: 0.94, y: 0.35, r: 20 },
    ];
    for (const b of bubbles) {
      const bx = b.x * width;
      const by = b.y * height;
      const br = b.r * s;
      ctx.save();
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx - br * 0.35, by - br * 0.35, br * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();
      ctx.restore();
    }

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#0284c7', '#bae6fd', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#fb7185', '#ffe4e6', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#0d9488', '#99f6e4', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#38bdf8', '#e0f2fe', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#38bdf8', '#e0f2fe', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#fb7185', '#ffe4e6', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#0d9488', '#99f6e4', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#c084fc', '#f3e8ff', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#06b6d4', 'rgba(6, 182, 212, 0.45)', logoImg);

    const welcome = data.titlePrefix || 'Welcome to';
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(58 * s)}px "Caveat", "Outfit", cursive`;
    ctx.fillStyle = '#67e8f9';
    ctx.fillText(welcome, width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    ctx.strokeStyle = '#082f49';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 26 * s;
    ctx.strokeText(heroText, width / 2, heroY);

    const nameGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    nameGrad.addColorStop(0, '#ffffff');
    nameGrad.addColorStop(0.6, '#e0f2fe');
    nameGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = nameGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    drawSparkle(ctx, width / 2 - 280 * s, heroY - 50 * s, 18 * s, '#ffffff');
    drawSparkle(ctx, width / 2 + 280 * s, heroY - 45 * s, 16 * s, '#67e8f9');

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#082f49';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#67e8f9';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Undersea Coral & Ball Pool Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#0f172a',
      '#22d3ee',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#a5f3fc';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 12: MINGGO GRAND PRIX SUPERCAR RACING
// ============================================================================
const templateSpeedRacing: TvScreenTemplate = {
  id: 'tv-speed-racing',
  name: 'MinGGo Grand Prix Supercar Racing',
  theme: 'Supercars & Racing Champions',
  description: 'Carbon fiber asphalt grid, high-speed Ferrari red and gold racing stripes, checkered borders, and roaring turbo typography',
  badge: 'SPEED RACER',
  previewColor: '#dc2626',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    // Dark carbon slate background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#1e293b');
    bgGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Dynamic racing stripes (diagonal velocity ribbons)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width, height * 0.35);
    ctx.lineTo(width, height * 0.42);
    ctx.lineTo(0, height * 0.77);
    ctx.closePath();
    ctx.fillStyle = 'rgba(220, 38, 38, 0.45)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height * 0.78);
    ctx.lineTo(width, height * 0.43);
    ctx.lineTo(width, height * 0.46);
    ctx.lineTo(0, height * 0.81);
    ctx.closePath();
    ctx.fillStyle = 'rgba(250, 204, 21, 0.6)';
    ctx.fill();
    ctx.restore();

    // Checkered racing flag pattern at top and bottom
    const checkSize = 24 * s;
    const checksCount = Math.ceil(width / checkSize);
    for (let i = 0; i < checksCount; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(i * checkSize, 0, checkSize, 12 * s);
        ctx.fillRect(i * checkSize, height - 12 * s, checkSize, 12 * s);
      }
    }

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#dc2626', '#fca5a5', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#facc15', '#fef08a', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#334155', '#94a3b8', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#f8fafc', '#ffffff', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#f8fafc', '#ffffff', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#facc15', '#fef08a', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#dc2626', '#fca5a5', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#06b6d4', '#67e8f9', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#ef4444', 'rgba(239, 68, 68, 0.45)', logoImg);

    // "START YOUR ENGINES FOR"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(52 * s)}px "Outfit", "Montserrat", sans-serif`;
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = 'rgba(250, 204, 21, 0.5)';
    ctx.shadowBlur = 14 * s;
    ctx.fillText((data.titlePrefix || 'START YOUR ENGINES FOR').toUpperCase(), width / 2, 275 * s);
    ctx.restore();

    // Hero Name in Slanted Fiery Speed Font
    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Montserrat", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Montserrat", sans-serif`;
    }
    const heroY = 460 * s;

    // Drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 32 * s;
    ctx.shadowOffsetY = 14 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    // Hot Flame Gradient
    const flameGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    flameGrad.addColorStop(0, '#fef08a');
    flameGrad.addColorStop(0.3, '#f97316');
    flameGrad.addColorStop(1, '#dc2626');
    ctx.fillStyle = flameGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // "Grand Prix Birthday Championship!"
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(82 * s)}px "Outfit", sans-serif`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Grand Prix Birthday Championship!', width / 2, 630 * s);
    ctx.fillStyle = '#facc15';
    ctx.fillText(data.eventTitle || 'Grand Prix Birthday Championship!', width / 2, 630 * s);
    ctx.restore();

    // Pit Lane Zone Pill
    const zone = data.zoneText || 'Pit Lane & Go-Kart Arena • Level 1';
    ctx.save();
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#dc2626',
      '#facc15',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 13: MINGGO SWEET CANDY WONDERLAND
// ============================================================================
const templateCandyWonderland: TvScreenTemplate = {
  id: 'tv-candy-wonderland',
  name: 'MinGGo Sweet Candy Wonderland',
  theme: 'Candy, Lollipops & Sweet Treats',
  description: 'Pastel marshmallow swirls, giant peppermint lollipops, candy sprinkles, and glossy bubblegum strawberry 3D lettering',
  badge: 'SWEET CANDY',
  previewColor: '#f43f5e',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createRadialGradient(
      width / 2, height / 2, 100 * s,
      width / 2, height / 2, 1100 * s
    );
    bgGrad.addColorStop(0, '#fff5f7');
    bgGrad.addColorStop(0.6, '#ffe4e6');
    bgGrad.addColorStop(1, '#fce7f3');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative floating candy sprinkles
    const sprinkles = [
      { x: 0.08, y: 0.12, c: '#f43f5e', r: 35 }, { x: 0.22, y: 0.08, c: '#2dd4bf', r: -20 },
      { x: 0.42, y: 0.15, c: '#fde047', r: 45 }, { x: 0.62, y: 0.09, c: '#c084fc', r: -30 },
      { x: 0.82, y: 0.14, c: '#fb7185', r: 25 }, { x: 0.94, y: 0.20, c: '#38bdf8', r: -15 },
      { x: 0.06, y: 0.65, c: '#2dd4bf', r: 50 }, { x: 0.46, y: 0.70, c: '#f43f5e', r: -40 },
      { x: 0.54, y: 0.72, c: '#fde047', r: 20 }, { x: 0.95, y: 0.68, c: '#c084fc', r: 35 },
      { x: 0.14, y: 0.90, c: '#f43f5e', r: -25 }, { x: 0.86, y: 0.88, c: '#2dd4bf', r: 45 },
    ];
    for (const sp of sprinkles) {
      ctx.save();
      ctx.translate(sp.x * width, sp.y * height);
      ctx.rotate((sp.r * Math.PI) / 180);
      drawRoundedRect(ctx, -14 * s, -5 * s, 28 * s, 10 * s, 5 * s, sp.c);
      ctx.restore();
    }

    // Swirled lollipop decoration behind bouquets
    function drawSwirlLollipop(lx: number, ly: number, lr: number) {
      ctx.save();
      // Stick
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lx - 4 * s, ly, 8 * s, 140 * s);
      // Candy spiral disc
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6 * s;
      ctx.stroke();
      ctx.restore();
    }
    drawSwirlLollipop(120 * s, 260 * s, 54 * s);
    drawSwirlLollipop(1800 * s, 260 * s, 54 * s);

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#f43f5e', '#ffe4e6', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#2dd4bf', '#ccfbf1', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#fde047', '#fef9c3', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#c084fc', '#f3e8ff', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#c084fc', '#f3e8ff', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#fde047', '#fef9c3', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#f43f5e', '#ffe4e6', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#2dd4bf', '#ccfbf1', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#f43f5e', 'rgba(244, 63, 94, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(60 * s)}px "Caveat", "Outfit", cursive`;
    ctx.fillStyle = '#db2777';
    ctx.fillText(data.titlePrefix || 'Sweetest Birthday Wishes to', width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    // Confectionery piped white border
    ctx.save();
    ctx.shadowColor = 'rgba(244, 63, 94, 0.35)';
    ctx.shadowBlur = 28 * s;
    ctx.shadowOffsetY = 10 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);
    ctx.restore();

    // Strawberry Pink Fill
    const candyGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    candyGrad.addColorStop(0, '#fb7185');
    candyGrad.addColorStop(1, '#e11d48');
    ctx.fillStyle = candyGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // Subtitle
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#0d9488';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Lollipop Lounge & Candy Land Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#f43f5e',
      '#ffffff',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 14: MINGGO CYBER LASER TAG & NEON GLOW
// ============================================================================
const templateNeonLaserGlow: TvScreenTemplate = {
  id: 'tv-neon-laser-glow',
  name: 'MinGGo Cyber Laser Tag & Neon Glow',
  theme: 'Neon Glow & Laser Tag Arena',
  description: 'Blacklight UV darkroom, criss-crossing neon lasers, perspective cyber grid floor, and hyper-glowing multi-layer typography',
  badge: 'NEON GLOW',
  previewColor: '#22c55e',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    // Pitch Blackroom
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    // 3D Perspective Cyber Floor Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.22)';
    ctx.lineWidth = 1.5 * s;
    const horizon = height * 0.72;
    for (let x = -width; x <= width * 2; x += 120 * s) {
      ctx.beginPath();
      ctx.moveTo(width / 2, horizon);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = horizon; y <= height; y += (y - horizon) * 0.45 + 16 * s) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Criss-crossing glowing laser beams
    const lasers = [
      { x1: 0, y1: 180 * s, x2: width, y2: 600 * s, c: '#ec4899', w: 3 },
      { x1: width, y1: 220 * s, x2: 0, y2: 680 * s, c: '#22c55e', w: 3 },
      { x1: 0, y1: 850 * s, x2: width, y2: 300 * s, c: '#06b6d4', w: 2.5 },
      { x1: width * 0.2, y1: 0, x2: width * 0.8, y2: height, c: '#a855f7', w: 2 },
    ];
    for (const l of lasers) {
      ctx.save();
      ctx.shadowColor = l.c;
      ctx.shadowBlur = 18 * s;
      ctx.strokeStyle = l.c;
      ctx.lineWidth = l.w * s;
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
      ctx.restore();
    }

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#22c55e', '#86efac', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#ec4899', '#fbcfe8', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#06b6d4', '#67e8f9', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#a855f7', '#e9d5ff', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#ec4899', '#fbcfe8', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#06b6d4', '#67e8f9', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#22c55e', '#86efac', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#a855f7', '#e9d5ff', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#22c55e', 'rgba(34, 197, 94, 0.65)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(48 * s)}px "Outfit", monospace`;
    ctx.fillStyle = '#4ade80';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 16 * s;
    ctx.fillText((data.titlePrefix || 'SYSTEM ONLINE: WELCOME TO').toUpperCase(), width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    // Outer neon glow
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 36 * s;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 32 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#22c55e';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    // Subtitle
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(82 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 24 * s;
    ctx.fillStyle = '#f43f5e';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Laser Tag Arena & Blacklight Bunker';
    ctx.save();
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#022c22',
      '#4ade80',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#86efac';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 15: MINGGO WILD JUNGLE & SAFARI ADVENTURE
// ============================================================================
const templateWildSafari: TvScreenTemplate = {
  id: 'tv-wild-safari',
  name: 'MinGGo Wild Jungle & Safari Adventure',
  theme: 'Wild Jungle & Savannah Safari',
  description: 'Warm golden savannah sunset, acacia tree silhouettes, hanging tropical jungle vines, and rugged explorer carved typography',
  badge: 'JUNGLE WILD',
  previewColor: '#84cc16',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#fef3c7');
    bgGrad.addColorStop(0.5, '#fed7aa');
    bgGrad.addColorStop(1, '#fb923c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Acacia silhouettes at bottom horizon
    ctx.save();
    ctx.fillStyle = 'rgba(67, 20, 7, 0.2)';
    ctx.beginPath();
    ctx.rect(0, height - 60 * s, width, 60 * s);
    ctx.fill();
    ctx.restore();

    // Jungle hanging leaves along top
    ctx.save();
    ctx.fillStyle = '#15803d';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 115 * s + 30 * s, 10 * s, 45 * s, 25 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#eab308', '#fef08a', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#15803d', '#86efac', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#c2410c', '#fed7aa', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#fde047', '#fef9c3', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#15803d', '#86efac', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#c2410c', '#fed7aa', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#eab308', '#fef08a', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#78350f', '#fde047', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#eab308', 'rgba(234, 179, 8, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(54 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#14532d';
    ctx.fillText(data.titlePrefix || 'WELCOME EXPEDITION CREW TO', width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 34 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    const woodGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    woodGrad.addColorStop(0, '#f59e0b');
    woodGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = woodGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#c2410c';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Safari Trek & Animal Adventure Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#14532d',
      '#facc15',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#fef08a';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 16: MINGGO ENCHANTED WIZARD & MAGIC SPELL
// ============================================================================
const templateMagicWizard: TvScreenTemplate = {
  id: 'tv-magic-wizard',
  name: 'MinGGo Enchanted Wizard & Magic Spell',
  theme: 'Magical Spells & Enchanted Castle',
  description: 'Royal midnight violet cosmos, sparkling golden spell spiral, floating arcane runes, and 24K gilded gold foil typography',
  badge: 'MAGIC WIZARD',
  previewColor: '#9333ea',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createRadialGradient(
      width / 2, height / 2, 100 * s,
      width / 2, height / 2, 1100 * s
    );
    bgGrad.addColorStop(0, '#1e1147');
    bgGrad.addColorStop(0.6, '#2e1065');
    bgGrad.addColorStop(1, '#0f0728');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Golden magical sparkles and stars
    for (let i = 0; i < 28; i++) {
      const sx = (0.05 + ((i * 37) % 90) / 100) * width;
      const sy = (0.08 + ((i * 43) % 84) / 100) * height;
      drawSparkle(ctx, sx, sy, (10 + (i % 8) * 2) * s, '#fbbf24');
    }

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#9333ea', '#e9d5ff', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#eab308', '#fef08a', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#3b82f6', '#bfdbfe', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#14b8a6', '#99f6e4', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#eab308', '#fef08a', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#9333ea', '#e9d5ff', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#14b8a6', '#99f6e4', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#3b82f6', '#bfdbfe', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#facc15', 'rgba(250, 204, 21, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(54 * s)}px "Outfit", serif`;
    ctx.fillStyle = '#fde047';
    ctx.fillText(data.titlePrefix || 'BY ROYAL DECREE, WELCOME TO', width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    // Golden foil border with purple aura
    ctx.shadowColor = 'rgba(250, 204, 21, 0.55)';
    ctx.shadowBlur = 32 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 34 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    const goldGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    goldGrad.addColorStop(0, '#fef08a');
    goldGrad.addColorStop(0.5, '#facc15');
    goldGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = goldGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#c084fc';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Wizardry Chamber & Secret Spell Tower';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#581c87',
      '#facc15',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#fef08a';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 17: MINGGO MASTER BUILDER BRICK WORLD
// ============================================================================
const templateBuildingBlocks: TvScreenTemplate = {
  id: 'tv-building-blocks',
  name: 'MinGGo Master Builder Brick World',
  theme: 'Colorful Toy Building Blocks',
  description: 'Toy room blueprint grid, floating 3D primary-colored building bricks with studs, and chunky dimensional block lettering',
  badge: 'MASTER BUILDER',
  previewColor: '#2563eb',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    // Clean Playroom Blueprint Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Subtle Grid pattern
    ctx.save();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5 * s;
    const gridStep = 48 * s;
    for (let x = 0; x <= width; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Floating 3D Toy Bricks with studs
    function drawToyBrick(bx: number, by: number, bw: number, bh: number, color: string) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 12 * s;
      ctx.shadowOffsetY = 6 * s;
      drawRoundedRect(ctx, bx, by, bw, bh, 6 * s, color);
      // Studs on top of brick
      const studs = Math.floor(bw / (26 * s));
      ctx.fillStyle = shadeColor(color, 15);
      for (let i = 0; i < studs; i++) {
        ctx.beginPath();
        ctx.arc(bx + 14 * s + i * 26 * s, by + bh * 0.5, 6 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawToyBrick(140 * s, 120 * s, 80 * s, 32 * s, '#dc2626');
    drawToyBrick(320 * s, 160 * s, 104 * s, 32 * s, '#2563eb');
    drawToyBrick(1600 * s, 130 * s, 80 * s, 32 * s, '#eab308');
    drawToyBrick(1740 * s, 180 * s, 104 * s, 32 * s, '#16a34a');

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#dc2626', '#fca5a5', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#2563eb', '#93c5fd', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#eab308', '#fef08a', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#16a34a', '#86efac', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#2563eb', '#93c5fd', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#dc2626', '#fca5a5', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#16a34a', '#86efac', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#eab308', '#fef08a', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#2563eb', 'rgba(37, 99, 235, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(52 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#dc2626';
    ctx.fillText(data.titlePrefix || 'BUILDING SPECIAL MEMORIES FOR', width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    ctx.fillStyle = '#2563eb';
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#dc2626';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Lego Construction & Brick Zone';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#2563eb',
      '#facc15',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 18: MINGGO GRAVITY BOUNCE & TRAMPOLINE ARENA
// ============================================================================
const templateBounceTrampoline: TvScreenTemplate = {
  id: 'tv-bounce-trampoline',
  name: 'MinGGo Gravity Bounce & Trampoline Arena',
  theme: 'Trampoline Bounce & Free-Jump',
  description: 'Kinetic electric violet to sunset coral gradient, dynamic motion springs, energetic velocity streaks, and ultra-punchy bouncy 3D typography',
  badge: 'BOUNCE ARENA',
  previewColor: '#8b5cf6',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#3b0764');
    bgGrad.addColorStop(0.5, '#7c3aed');
    bgGrad.addColorStop(1, '#f43f5e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Dynamic diagonal energy motion lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 3 * s;
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 180 * s - 200 * s, height);
      ctx.lineTo(i * 180 * s + 300 * s, 0);
      ctx.stroke();
    }
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#8b5cf6', '#ede9fe', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#f43f5e', '#ffe4e6', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#84cc16', '#d9f99d', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#06b6d4', '#67e8f9', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#f43f5e', '#ffe4e6', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#8b5cf6', '#ede9fe', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#06b6d4', '#67e8f9', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#84cc16', '#d9f99d', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#a855f7', 'rgba(168, 85, 247, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(52 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#facc15';
    ctx.fillText((data.titlePrefix || 'GET READY TO JUMP & FLY WITH').toUpperCase(), width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    const coralGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    coralGrad.addColorStop(0, '#fb7185');
    coralGrad.addColorStop(1, '#e11d48');
    ctx.fillStyle = coralGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#2e1065';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#22d3ee';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Foam Pit & Trampoline Jump Court';
    ctx.save();
    ctx.font = `900 ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#f43f5e',
      '#a855f7',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 19: MINGGO FROZEN CRYSTAL WINTER CASTLE
// ============================================================================
const templateFrozenWinter: TvScreenTemplate = {
  id: 'tv-frozen-winter',
  name: 'MinGGo Frozen Crystal Winter Castle',
  theme: 'Frozen Ice Castle & Snowflakes',
  description: 'Frosted glacial cyan sky, floating crystal snowflakes, diamond glints, and crystalline royal winter coronation typography',
  badge: 'ICE CASTLE',
  previewColor: '#38bdf8',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#f0f9ff');
    bgGrad.addColorStop(0.5, '#e0f2fe');
    bgGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Delicate floating snowflakes
    function drawSnowflake(sx: number, sy: number, sr: number) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(rad) * sr, sy + Math.sin(rad) * sr);
      }
      ctx.stroke();
      ctx.restore();
    }

    const flakes = [
      { x: 0.12, y: 0.18, r: 16 }, { x: 0.28, y: 0.12, r: 24 }, { x: 0.45, y: 0.19, r: 14 },
      { x: 0.65, y: 0.14, r: 20 }, { x: 0.85, y: 0.18, r: 26 }, { x: 0.08, y: 0.65, r: 20 },
      { x: 0.42, y: 0.72, r: 16 }, { x: 0.58, y: 0.70, r: 22 }, { x: 0.92, y: 0.64, r: 18 },
    ];
    for (const f of flakes) {
      drawSnowflake(f.x * width, f.y * height, f.r * s);
    }

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#0284c7', '#bae6fd', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#38bdf8', '#e0f2fe', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#e2e8f0', '#ffffff', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#c084fc', '#f3e8ff', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#38bdf8', '#e0f2fe', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#c084fc', '#f3e8ff', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#0284c7', '#bae6fd', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#e2e8f0', '#ffffff', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#38bdf8', 'rgba(56, 189, 248, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(56 * s)}px "Caveat", "Outfit", cursive`;
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText(data.titlePrefix || 'A Royal Winter Celebration for', width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    // Glacial ice outline
    ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
    ctx.shadowBlur = 32 * s;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    const iceGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    iceGrad.addColorStop(0, '#0284c7');
    iceGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = iceGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#0284c7';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'Ice Skating & Frozen Castle Arena';
    ctx.save();
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#0284c7',
      '#e0f2fe',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(32 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// TEMPLATE 20: MINGGO ROCKSTAR VIP CONCERT STAGE
// ============================================================================
const templateRockstarMusic: TvScreenTemplate = {
  id: 'tv-rockstar-music',
  name: 'MinGGo Rockstar VIP Concert Stage',
  theme: 'Rock Concert & Music VIP',
  description: 'Rock arena dark stage, sweeping concert spotlight beams, floating music notes, and fiery high-impact rockstar typography',
  badge: 'ROCKSTAR VIP',
  previewColor: '#e11d48',
  draw: (ctx, width, height, data, logoImg) => {
    const s = width / 1920;

    const bgGrad = ctx.createRadialGradient(
      width / 2, height / 2, 80 * s,
      width / 2, height / 2, 1050 * s
    );
    bgGrad.addColorStop(0, '#1e1b4b');
    bgGrad.addColorStop(0.6, '#0f172a');
    bgGrad.addColorStop(1, '#050814');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Sweeping concert stage spotlights
    ctx.save();
    ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
    ctx.beginPath();
    ctx.moveTo(100 * s, 0);
    ctx.lineTo(width * 0.45, height);
    ctx.lineTo(width * 0.65, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(250, 204, 21, 0.15)';
    ctx.beginPath();
    ctx.moveTo(width - 100 * s, 0);
    ctx.lineTo(width * 0.55, height);
    ctx.lineTo(width * 0.35, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    const leftAnchorX = 240 * s;
    const leftAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 240 * s, 320 * s, 126 * s, 156 * s, '#e11d48', '#fda4af', leftAnchorX, leftAnchorY, s, -6);
    drawAuthenticBalloon(ctx, 360 * s, 485 * s, 118 * s, 148 * s, '#9333ea', '#e9d5ff', leftAnchorX, leftAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 195 * s, 630 * s, 124 * s, 154 * s, '#eab308', '#fef08a', leftAnchorX, leftAnchorY, s, -8);
    drawAuthenticBalloon(ctx, 315 * s, 765 * s, 112 * s, 140 * s, '#1e293b', '#94a3b8', leftAnchorX, leftAnchorY, s, 5);

    const rightAnchorX = 1660 * s;
    const rightAnchorY = 1010 * s;
    drawAuthenticBalloon(ctx, 1680 * s, 410 * s, 124 * s, 156 * s, '#eab308', '#fef08a', rightAnchorX, rightAnchorY, s, 7);
    drawAuthenticBalloon(ctx, 1560 * s, 560 * s, 118 * s, 148 * s, '#e11d48', '#fda4af', rightAnchorX, rightAnchorY, s, -7);
    drawAuthenticBalloon(ctx, 1710 * s, 710 * s, 122 * s, 152 * s, '#1e293b', '#94a3b8', rightAnchorX, rightAnchorY, s, 8);
    drawAuthenticBalloon(ctx, 1570 * s, 830 * s, 108 * s, 136 * s, '#9333ea', '#e9d5ff', rightAnchorX, rightAnchorY, s, -5);

    drawTvMinggoLogoPill(ctx, width / 2, 58 * s, s, '#eab308', 'rgba(234, 179, 8, 0.45)', logoImg);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(52 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 18 * s;
    ctx.fillText((data.titlePrefix || '★ LIVE ON THE MAIN STAGE ★').toUpperCase(), width / 2, 275 * s);
    ctx.restore();

    const heroText = getHeroNameText(data);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let heroFontSize = 162 * s;
    ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    let textWidth = ctx.measureText(heroText).width;
    const maxTextWidth = 1320 * s;
    if (textWidth > maxTextWidth) {
      heroFontSize = Math.floor(heroFontSize * (maxTextWidth / textWidth));
      ctx.font = `italic 900 ${heroFontSize}px "Fredoka", "Outfit", sans-serif`;
    }
    const heroY = 460 * s;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 36 * s;
    ctx.lineJoin = 'round';
    ctx.strokeText(heroText, width / 2, heroY);

    const rockGrad = ctx.createLinearGradient(0, heroY - 70 * s, 0, heroY + 60 * s);
    rockGrad.addColorStop(0, '#f43f5e');
    rockGrad.addColorStop(1, '#9f1239');
    ctx.fillStyle = rockGrad;
    ctx.fillText(heroText, width / 2, heroY);
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 900 ${Math.round(86 * s)}px "Fredoka", "Outfit", sans-serif`;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14 * s;
    ctx.strokeText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.fillStyle = '#ec4899';
    ctx.fillText(data.eventTitle || 'Birthday Party!', width / 2, 630 * s);
    ctx.restore();

    const zone = data.zoneText || 'VIP All-Access Pass • Main Stage Arena';
    ctx.save();
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    const zoneW = ctx.measureText(zone).width + 96 * s;
    const zoneH = 76 * s;
    const zoneY = 765 * s;

    drawRoundedRect(
      ctx,
      width / 2 - zoneW / 2,
      zoneY - zoneH / 2,
      zoneW,
      zoneH,
      zoneH / 2,
      '#eab308',
      '#ffffff',
      3 * s
    );
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.round(30 * s)}px "Outfit", sans-serif`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText(zone, width / 2, zoneY);
    ctx.restore();
  },
};

// ============================================================================
// AGGREGATION & EXPORTS (20 TV DISPLAY TEMPLATES)
// ============================================================================
export const allTvTemplates: TvScreenTemplate[] = [
  templateClassicBalloons,
  templateMidnightGold,
  templateDinoSafari,
  templateSpaceGalaxy,
  templateSuperheroBlast,
  templatePastelTeddy,
  templatePrincessUnicorn,
  templateCyberArcade,
  templateCarnivalCircus,
  templateTropicalFiesta,
  templateOceanMermaid,
  templateSpeedRacing,
  templateCandyWonderland,
  templateNeonLaserGlow,
  templateWildSafari,
  templateMagicWizard,
  templateBuildingBlocks,
  templateBounceTrampoline,
  templateFrozenWinter,
  templateRockstarMusic,
];

export function getTvTemplateById(id: string): TvScreenTemplate {
  return allTvTemplates.find((t) => t.id === id) || allTvTemplates[0];
}

export const defaultTvScreenData: TvScreenData = {
  childName: 'KAVYA',
  age: '7th',
  titlePrefix: 'Welcome to',
  eventTitle: 'Birthday Party!',
  zoneText: '2nd Floor, Play Zone',
  showLogo: true,
};

export const sampleTvPresets = [
  { id: 'kavya', name: 'Kavya', age: '7th', zone: '2nd Floor, Play Zone', templateId: 'tv-classic-balloons' },
  { id: 'aarav', name: 'Aarav', age: '5th', zone: 'Dino Adventure Zone', templateId: 'tv-dino-safari' },
  { id: 'saanvi', name: 'Baby Saanvi', age: '1st', zone: 'Toddler Cloud Zone', templateId: 'tv-pastel-teddy' },
  { id: 'rohan', name: 'Rohan', age: '10th', zone: 'Arcade Arena Level 2', templateId: 'tv-cyber-arcade' },
  { id: 'ananya', name: 'Ananya', age: '8th', zone: 'Royal Princess Palace', templateId: 'tv-princess-unicorn' },
  { id: 'reyansh', name: 'Reyansh', age: '6th', zone: 'Superhero HQ Zone', templateId: 'tv-superhero-blast' },
  { id: 'kiara', name: 'Kiara', age: '7th', zone: 'Undersea Coral & Ball Pool', templateId: 'tv-ocean-mermaid' },
  { id: 'kabir', name: 'Kabir', age: '8th', zone: 'Pit Lane & Go-Kart Arena', templateId: 'tv-speed-racing' },
  { id: 'myra', name: 'Myra', age: '4th', zone: 'Lollipop Lounge & Candy Land', templateId: 'tv-candy-wonderland' },
  { id: 'vivaan', name: 'Vivaan', age: '9th', zone: 'Laser Tag Arena & Bunker', templateId: 'tv-neon-laser-glow' },
  { id: 'advait', name: 'Advait', age: '6th', zone: 'Lego Construction & Brick Zone', templateId: 'tv-building-blocks' },
  { id: 'shanaya', name: 'Shanaya', age: '7th', zone: 'Ice Skating & Frozen Castle', templateId: 'tv-frozen-winter' },
];
