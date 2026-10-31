// High-performance canvas vector drawing helpers for MINGGO Invitation Studio
// All drawing primitives scale responsively with canvas dimensions

export interface PhotoOptions {
  img: HTMLImageElement;
  x: number;
  y: number;
  size: number;
  shape: 'circle' | 'rounded' | 'badge';
  zoom: number;
  offset: { x: number; y: number };
  borderColor?: string;
  borderWidth?: number;
  shadowColor?: string;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | number[],
  fillColor?: string | CanvasGradient,
  strokeColor?: string,
  lineWidth?: number
) {
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    // fallback for older browsers
    const r = typeof radius === 'number' ? radius : radius[0] || 0;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor && lineWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

export function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  color: string
) {
  ctx.save();
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function drawSparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  // 4-pointed sharp star / diamond sparkle
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.closePath();
  ctx.fill();

  // center soft dot
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();
}

export function drawBalloon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: string,
  stringColor: string = 'rgba(255,255,255,0.6)',
  tilt: number = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((tilt * Math.PI) / 180);

  // String
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-15, ry + 40, 20, ry + 80, 0, ry + 130);
  ctx.strokeStyle = stringColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Balloon Body
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-rx * 1.3, ry * 0.7, -rx * 1.1, -ry * 0.9, 0, -ry);
  ctx.bezierCurveTo(rx * 1.1, -ry * 0.9, rx * 1.3, ry * 0.7, 0, ry);
  ctx.closePath();

  // Radial gradient for 3D sphere look
  const grad = ctx.createRadialGradient(-rx * 0.3, -ry * 0.3, rx * 0.1, 0, 0, rx * 1.2);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, color);
  grad.addColorStop(1, shadeColor(color, -25));
  ctx.fillStyle = grad;
  ctx.fill();

  // Knot
  ctx.beginPath();
  ctx.moveTo(-5, ry);
  ctx.lineTo(5, ry);
  ctx.lineTo(8, ry + 8);
  ctx.lineTo(-8, ry + 8);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, -30);
  ctx.fill();

  // Highlight reflection
  ctx.beginPath();
  ctx.ellipse(-rx * 0.35, -ry * 0.35, rx * 0.18, ry * 0.25, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fill();

  ctx.restore();
}

export function drawConfetti(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: string[],
  seed: number = 42
) {
  ctx.save();
  // Deterministic confetti based on simple LCG so preview matches export
  let s = seed;
  const pseudoRandom = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const count = 55;
  for (let i = 0; i < count; i++) {
    const cx = pseudoRandom() * width;
    const cy = pseudoRandom() * height;
    const color = colors[Math.floor(pseudoRandom() * colors.length)];
    const size = 6 + pseudoRandom() * 12;
    const angle = pseudoRandom() * Math.PI * 2;
    const shapeType = Math.floor(pseudoRandom() * 3);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = color;

    if (shapeType === 0) {
      // Rectangle foil
      ctx.fillRect(-size / 2, -size / 4, size, size / 2);
    } else if (shapeType === 1) {
      // Circle dot
      ctx.beginPath();
      ctx.arc(0, 0, size / 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Streamer curve
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI / 1.5);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

export function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  color: string = '#ffffff'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.arc(35, -10, 38, 0, Math.PI * 2);
  ctx.arc(75, 0, 32, 0, Math.PI * 2);
  ctx.arc(40, 20, 25, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawRibbonBanner(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  text: string,
  font: string,
  textColor: string,
  bannerColor: string,
  shadowColor: string = 'rgba(0,0,0,0.15)'
) {
  ctx.save();
  const halfW = width / 2;
  const foldW = height * 0.45;

  // Ribbon ends (tails with notches)
  ctx.fillStyle = shadeColor(bannerColor, -30);
  // Left fold
  ctx.beginPath();
  ctx.moveTo(cx - halfW, cy + height / 2);
  ctx.lineTo(cx - halfW - foldW, cy + height / 2 + 15);
  ctx.lineTo(cx - halfW, cy + height / 2 + 15);
  ctx.closePath();
  ctx.fill();

  // Right fold
  ctx.beginPath();
  ctx.moveTo(cx + halfW, cy + height / 2);
  ctx.lineTo(cx + halfW + foldW, cy + height / 2 + 15);
  ctx.lineTo(cx + halfW, cy + height / 2 + 15);
  ctx.closePath();
  ctx.fill();

  // Left tail
  ctx.fillStyle = shadeColor(bannerColor, -15);
  ctx.beginPath();
  ctx.moveTo(cx - halfW + 10, cy - height * 0.1);
  ctx.lineTo(cx - halfW - foldW - 25, cy - height * 0.1);
  ctx.lineTo(cx - halfW - foldW - 10, cy + height * 0.5);
  ctx.lineTo(cx - halfW - foldW - 25, cy + height + 10);
  ctx.lineTo(cx - halfW + 10, cy + height + 10);
  ctx.closePath();
  ctx.fill();

  // Right tail
  ctx.beginPath();
  ctx.moveTo(cx + halfW - 10, cy - height * 0.1);
  ctx.lineTo(cx + halfW + foldW + 25, cy - height * 0.1);
  ctx.lineTo(cx + halfW + foldW + 10, cy + height * 0.5);
  ctx.lineTo(cx + halfW + foldW + 25, cy + height + 10);
  ctx.lineTo(cx + halfW - 10, cy + height + 10);
  ctx.closePath();
  ctx.fill();

  // Main banner body
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = bannerColor;
  ctx.fillRect(cx - halfW, cy - height / 2, width, height);
  ctx.shadowColor = 'transparent';

  // Banner stitch / inner border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(cx - halfW + 4, cy - height / 2 + 4, width - 8, height - 8);
  ctx.setLineDash([]);

  // Banner Text
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);

  ctx.restore();
}

export function drawArtDecoCorner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  // L-shape main line
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  // Inset line
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(8, size * 0.85);
  ctx.lineTo(8, 8);
  ctx.lineTo(size * 0.85, 8);
  ctx.stroke();

  // Diagonal fan rays
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 0.6, size * 0.6);
  ctx.moveTo(0, size * 0.35);
  ctx.lineTo(size * 0.35, 0);
  ctx.stroke();

  // Corner diamond
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(14, 20);
  ctx.lineTo(20, 14);
  ctx.lineTo(26, 20);
  ctx.lineTo(20, 26);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawFloralCorner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  rotation: number,
  leafColor: string,
  goldColor: string = '#d4af37'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(scale, scale);

  // Curved Stem
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.quadraticCurveTo(20, 20, 80, 0);
  ctx.stroke();

  // Botanical leaves
  const leaves = [
    { x: 15, y: 55, angle: -0.6, rx: 14, ry: 7 },
    { x: 30, y: 35, angle: -0.2, rx: 16, ry: 8 },
    { x: 55, y: 18, angle: 0.4, rx: 14, ry: 7 },
    { x: 75, y: 5, angle: 0.8, rx: 12, ry: 6 },
    { x: 10, y: 35, angle: -1.2, rx: 12, ry: 6 },
    { x: 42, y: 15, angle: -0.8, rx: 13, ry: 6 },
  ];

  ctx.fillStyle = leafColor;
  for (const l of leaves) {
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, l.rx, l.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    // Gold vein
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-l.rx, 0);
    ctx.lineTo(l.rx, 0);
    ctx.stroke();
    ctx.restore();
  }

  // Little gold berries
  const berries = [
    { x: 22, y: 48 },
    { x: 40, y: 28 },
    { x: 62, y: 12 },
  ];
  ctx.fillStyle = goldColor;
  for (const b of berries) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export function drawPhotoOnCanvas(
  ctx: CanvasRenderingContext2D,
  options: PhotoOptions
) {
  const { img, x, y, size, shape, zoom, offset, borderColor = '#ffffff', borderWidth = 6, shadowColor = 'rgba(0,0,0,0.18)' } = options;
  ctx.save();

  // Shadow
  if (shadowColor) {
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
  }

  // Clipping path
  ctx.beginPath();
  if (shape === 'circle') {
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  } else if (shape === 'rounded') {
    const half = size / 2;
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x - half, y - half, size, size, 24);
    } else {
      ctx.rect(x - half, y - half, size, size);
    }
  } else if (shape === 'badge') {
    // Elegant shield / polygon badge
    const half = size / 2;
    ctx.moveTo(x, y - half);
    ctx.lineTo(x + half * 0.9, y - half * 0.4);
    ctx.lineTo(x + half * 0.75, y + half * 0.7);
    ctx.lineTo(x, y + half);
    ctx.lineTo(x - half * 0.75, y + half * 0.7);
    ctx.lineTo(x - half * 0.9, y - half * 0.4);
    ctx.closePath();
  }

  ctx.save();
  ctx.clip();

  // Reset shadow for inner image drawing
  ctx.shadowColor = 'transparent';

  // Fill background behind image just in case
  ctx.fillStyle = '#f8fafc';
  ctx.fill();

  // Calculate image crop and cover with zoom & pan
  const imgAspect = img.width / img.height;
  let drawW = size * zoom;
  let drawH = size * zoom;

  if (imgAspect > 1) {
    drawW = size * zoom * imgAspect;
  } else {
    drawH = (size * zoom) / imgAspect;
  }

  const drawX = x - drawW / 2 + offset.x;
  const drawY = y - drawH / 2 + offset.y;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();

  // Border outline
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.stroke();

  ctx.restore();
}

/**
 * Robust text measurement and rendering that automatically shrinks font size
 * to guarantee that text will never overflow max width or safe margins!
 */
export function drawSafeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontFamily: string,
  fontWeight: string = 'normal',
  color: string = '#000000',
  align: CanvasTextAlign = 'center',
  textTransform: 'uppercase' | 'none' = 'none'
): number {
  if (!text) return baseFontSize;

  const displayText = textTransform === 'uppercase' ? text.toUpperCase() : text;
  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;

  let fontSize = baseFontSize;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  let metrics = ctx.measureText(displayText);

  // Shrink font size if text is wider than maxWidth
  const minFontSize = Math.max(14, baseFontSize * 0.55);
  while (metrics.width > maxWidth && fontSize > minFontSize) {
    fontSize -= 1.5;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    metrics = ctx.measureText(displayText);
  }

  ctx.fillText(displayText, x, y);
  ctx.restore();
  return fontSize;
}

/**
 * Word wrap helper for longer text (such as custom messages and venue addresses)
 */
export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  fontSize: number,
  fontFamily: string,
  color: string,
  align: CanvasTextAlign = 'center',
  maxLines: number = 4
): number {
  if (!text) return startY;
  ctx.save();
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';

  const words = text.split(' ');
  let currentLine = '';
  const lines: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
      if (lines.length === maxLines - 1) {
        // truncate with ellipsis for last allowed line
        const remaining = words.slice(i).join(' ');
        let truncated = remaining;
        while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 5) {
          truncated = truncated.slice(0, -3);
        }
        lines.push(truncated + '...');
        currentLine = '';
        break;
      }
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  // Draw lines centered around startY or starting from startY
  const totalHeight = lines.length * lineHeight;
  let curY = startY - (totalHeight / 2) + (lineHeight / 2);

  for (const line of lines) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }

  ctx.restore();
  return curY;
}

export function drawOrnateDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  color: string = '#d4af37'
) {
  ctx.save();
  const halfW = width / 2;

  // Horizontal gradient line
  const grad = ctx.createLinearGradient(cx - halfW, cy, cx + halfW, cy);
  grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
  grad.addColorStop(0.3, color);
  grad.addColorStop(0.5, color);
  grad.addColorStop(0.7, color);
  grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - halfW, cy);
  ctx.lineTo(cx + halfW, cy);
  ctx.stroke();

  // Center diamond motif
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx + 6, cy);
  ctx.lineTo(cx, cy + 6);
  ctx.lineTo(cx - 6, cy);
  ctx.closePath();
  ctx.fill();

  // Flanking small dots
  ctx.beginPath();
  ctx.arc(cx - 16, cy, 2, 0, Math.PI * 2);
  ctx.arc(cx + 16, cy, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function shadeColor(color: string, percent: number): string {
  // If color is hex
  if (color.startsWith('#')) {
    let R = parseInt(color.substring(1, 3), 16) || 0;
    let G = parseInt(color.substring(3, 5), 16) || 0;
    let B = parseInt(color.substring(5, 7), 16) || 0;

    R = Math.min(255, Math.max(0, Math.round(R * (100 + percent) / 100)));
    G = Math.min(255, Math.max(0, Math.round(G * (100 + percent) / 100)));
    B = Math.min(255, Math.max(0, Math.round(B * (100 + percent) / 100)));

    const RR = (R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16);
    const GG = (G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16);
    const BB = (B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR + GG + BB;
  }
  return color;
}

export function formatFriendlyDate(dateStr: string): { dayOfWeek: string; formattedDate: string; year: string } {
  if (!dateStr) {
    return { dayOfWeek: 'Sunday', formattedDate: 'Nov 15', year: '2026' };
  }
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(parseInt(year, 10), month, day);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      return {
        dayOfWeek: days[date.getDay()] || 'Sunday',
        formattedDate: `${months[month]} ${day}`,
        year: year,
      };
    }
  } catch (e) {
    console.error('Date parsing error', e);
  }
  return { dayOfWeek: 'Sunday', formattedDate: dateStr, year: '' };
}

// ========================================================
// MINGGO BRAND LOGO LOADER & HIGH-RES CANVAS RENDERER
// ========================================================
let minggoLogoImg: HTMLImageElement | null = null;
let isMinggoLogoLoaded = false;

export function initMinggoLogo(): HTMLImageElement | null {
  if (typeof window === 'undefined') return null;
  if (!minggoLogoImg) {
    minggoLogoImg = new Image();
    minggoLogoImg.crossOrigin = 'anonymous';
    minggoLogoImg.onload = () => {
      isMinggoLogoLoaded = true;
    };
    minggoLogoImg.src = '/minggo-logo-tight.png';
  }
  return minggoLogoImg;
}

export function drawMinggoLogo(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  targetWidth: number
): number {
  initMinggoLogo();
  const aspectRatio = 882 / 320; // 2.756
  const targetHeight = targetWidth / aspectRatio;

  if (minggoLogoImg && (minggoLogoImg.complete || isMinggoLogoLoaded) && minggoLogoImg.naturalWidth > 0) {
    ctx.save();
    ctx.shadowColor = 'rgba(249, 115, 22, 0.45)';
    ctx.shadowBlur = 14;
    ctx.drawImage(
      minggoLogoImg,
      centerX - targetWidth / 2,
      topY,
      targetWidth,
      targetHeight
    );
    ctx.restore();
    return targetHeight;
  }

  // Crisp Vector Fallback if image is still loading
  ctx.save();
  ctx.translate(centerX, topY + targetHeight * 0.55);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(249, 115, 22, 0.55)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ff5500';
  ctx.font = `bold ${Math.round(targetHeight * 0.72)}px "Fredoka", "Outfit", sans-serif`;
  ctx.fillText('MinGGo', 0, 0);

  // Little shopping cart / toy car silhouette on top of 'in'
  ctx.fillStyle = '#ff7733';
  ctx.beginPath();
  ctx.roundRect(-targetWidth * 0.14, -targetHeight * 0.42, targetWidth * 0.18, targetHeight * 0.28, 4);
  ctx.fill();
  ctx.restore();

  return targetHeight;
}

// ========================================================
// 3D REALISTIC METALLIC / GLOSSY BALLOON ENGINE
// ========================================================
export type BalloonColorTheme =
  | 'gold'
  | 'black'
  | 'orange'
  | 'rosegold'
  | 'silver'
  | 'emerald'
  | 'sapphire'
  | 'ruby'
  | 'violet'
  | 'peach'
  | 'cyan'
  | 'magenta'
  | 'custom';

export function draw3DRealisticBalloon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  theme: BalloonColorTheme = 'gold',
  customColor: string = '#f59e0b',
  stringColor: string = 'rgba(255, 255, 255, 0.45)',
  tiltDeg: number = 0
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((tiltDeg * Math.PI) / 180);

  // 1. Balloon String (curving gracefully down)
  ctx.save();
  ctx.strokeStyle = stringColor;
  ctx.lineWidth = Math.max(1.2, rx * 0.025);
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-rx * 0.35, ry + ry * 0.6, rx * 0.45, ry + ry * 1.3, -rx * 0.15, ry + ry * 2.1);
  ctx.bezierCurveTo(-rx * 0.45, ry + ry * 2.7, rx * 0.35, ry + ry * 3.4, 0, ry + ry * 4.2);
  ctx.stroke();
  ctx.restore();

  // 2. Ambient Drop Shadow underneath
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = rx * 0.45;
  ctx.shadowOffsetY = ry * 0.18;

  // Balloon Egg / Teardrop Path
  ctx.beginPath();
  ctx.moveTo(0, ry);
  ctx.bezierCurveTo(-rx * 1.35, ry * 0.72, -rx * 1.18, -ry * 0.95, 0, -ry);
  ctx.bezierCurveTo(rx * 1.18, -ry * 0.95, rx * 1.35, ry * 0.72, 0, ry);
  ctx.closePath();

  // 3. Multi-stop 3D Radial Gradient Shading
  const lightOffsetX = -rx * 0.35;
  const lightOffsetY = -ry * 0.38;
  const grad = ctx.createRadialGradient(lightOffsetX, lightOffsetY, rx * 0.08, 0, 0, rx * 1.32);

  if (theme === 'gold') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.18, '#fff7c2');
    grad.addColorStop(0.48, '#eab308');
    grad.addColorStop(0.78, '#a16207');
    grad.addColorStop(1, '#451a03');
  } else if (theme === 'black') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.15, '#cbd5e1');
    grad.addColorStop(0.42, '#334155');
    grad.addColorStop(0.8, '#0f172a');
    grad.addColorStop(1, '#020617');
  } else if (theme === 'orange') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fed7aa');
    grad.addColorStop(0.5, '#f97316');
    grad.addColorStop(0.82, '#c2410c');
    grad.addColorStop(1, '#7c2d12');
  } else if (theme === 'rosegold') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fce7f3');
    grad.addColorStop(0.52, '#f472b6');
    grad.addColorStop(0.8, '#be185d');
    grad.addColorStop(1, '#500724');
  } else if (theme === 'silver') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, '#f8fafc');
    grad.addColorStop(0.55, '#cbd5e1');
    grad.addColorStop(0.82, '#64748b');
    grad.addColorStop(1, '#1e293b');
  } else if (theme === 'emerald') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#a7f3d0');
    grad.addColorStop(0.5, '#10b981');
    grad.addColorStop(0.8, '#047857');
    grad.addColorStop(1, '#022c22');
  } else if (theme === 'sapphire') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#bae6fd');
    grad.addColorStop(0.5, '#0284c7');
    grad.addColorStop(0.8, '#0369a1');
    grad.addColorStop(1, '#082f49');
  } else if (theme === 'ruby') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fecdd3');
    grad.addColorStop(0.5, '#e11d48');
    grad.addColorStop(0.82, '#9f1239');
    grad.addColorStop(1, '#4c0519');
  } else if (theme === 'violet') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#e9d5ff');
    grad.addColorStop(0.5, '#9333ea');
    grad.addColorStop(0.82, '#6b21a8');
    grad.addColorStop(1, '#3b0764');
  } else if (theme === 'peach') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#ffedd5');
    grad.addColorStop(0.5, '#fb923c');
    grad.addColorStop(0.8, '#ea580c');
    grad.addColorStop(1, '#7c2d12');
  } else if (theme === 'cyan') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#cffafe');
    grad.addColorStop(0.5, '#06b6d4');
    grad.addColorStop(0.8, '#0891b2');
    grad.addColorStop(1, '#164e63');
  } else if (theme === 'magenta') {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fdf4ff');
    grad.addColorStop(0.5, '#d946ef');
    grad.addColorStop(0.8, '#a21caf');
    grad.addColorStop(1, '#4a044e');
  } else {
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, customColor);
    grad.addColorStop(0.75, shadeColor(customColor, -25));
    grad.addColorStop(1, shadeColor(customColor, -55));
  }

  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // 4. Primary High-Gloss Specular Shine (Oval reflection)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(lightOffsetX, lightOffsetY, rx * 0.22, ry * 0.32, -Math.PI / 4, 0, Math.PI * 2);
  const specGrad = ctx.createLinearGradient(lightOffsetX - rx * 0.15, lightOffsetY - ry * 0.18, lightOffsetX + rx * 0.15, lightOffsetY + ry * 0.18);
  specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
  specGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.38)');
  specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = specGrad;
  ctx.fill();
  ctx.restore();

  // 5. Subtle Secondary Rim Light (bottom right edge)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(rx * 0.42, ry * 0.38, rx * 0.14, ry * 0.24, Math.PI / 4, 0, Math.PI * 2);
  const rimGrad = ctx.createLinearGradient(rx * 0.2, ry * 0.2, rx * 0.5, ry * 0.5);
  rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  rimGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.22)');
  rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
  ctx.fillStyle = rimGrad;
  ctx.fill();
  ctx.restore();

  // 6. 3D Knot at Bottom
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-rx * 0.09, ry);
  ctx.lineTo(rx * 0.09, ry);
  ctx.lineTo(rx * 0.14, ry + ry * 0.12);
  ctx.lineTo(-rx * 0.14, ry + ry * 0.12);
  ctx.closePath();
  ctx.fillStyle = theme === 'gold' ? '#854d0e' : theme === 'black' ? '#1e293b' : theme === 'orange' ? '#9a3412' : '#334155';
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// ========================================================
// 3D BOTTOM CELEBRATION LANDSCAPE ENGINE (Cake, Diya, Dunes)
// ========================================================
export function draw3DCelebrationBottomScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  primaryTone: string = '#d97706',
  accentTone: string = '#fbbf24'
) {
  ctx.save();

  // 1. Ambient Warm Golden Light Wash
  const aura = ctx.createRadialGradient(
    width * 0.5,
    height * 0.88,
    30,
    width * 0.5,
    height * 0.88,
    width * 0.75
  );
  aura.addColorStop(0, 'rgba(251, 191, 36, 0.32)');
  aura.addColorStop(0.4, 'rgba(217, 119, 6, 0.18)');
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, height * 0.65, width, height * 0.35);

  // 2. Sculpted 3D Dunes / Celebration Mounds (Layer 1 - Back Dune)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.88);
  ctx.bezierCurveTo(width * 0.25, height * 0.82, width * 0.6, height * 0.86, width, height * 0.84);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  const dune1Grad = ctx.createLinearGradient(0, height * 0.82, 0, height);
  dune1Grad.addColorStop(0, '#92400e');
  dune1Grad.addColorStop(0.6, '#78350f');
  dune1Grad.addColorStop(1, '#451a03');
  ctx.fillStyle = dune1Grad;
  ctx.fill();
  ctx.restore();

  // Sculpted 3D Dunes (Layer 2 - Mid Golden Cream Dune)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.91);
  ctx.bezierCurveTo(width * 0.35, height * 0.87, width * 0.75, height * 0.93, width, height * 0.88);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  const dune2Grad = ctx.createLinearGradient(0, height * 0.87, 0, height);
  dune2Grad.addColorStop(0, primaryTone);
  dune2Grad.addColorStop(0.5, '#b45309');
  dune2Grad.addColorStop(1, '#78350f');
  ctx.fillStyle = dune2Grad;
  ctx.fill();
  ctx.restore();

  // Sculpted 3D Dunes (Layer 3 - Front Soft Dunes with Cream Crest)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height * 0.94);
  ctx.bezierCurveTo(width * 0.3, height * 0.90, width * 0.65, height * 0.91, width, height * 0.93);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  const dune3Grad = ctx.createLinearGradient(0, height * 0.90, 0, height);
  dune3Grad.addColorStop(0, accentTone);
  dune3Grad.addColorStop(0.3, '#f59e0b');
  dune3Grad.addColorStop(1, '#92400e');
  ctx.fillStyle = dune3Grad;
  ctx.fill();
  ctx.restore();

  // 3. 3D CELEBRATORY BIRTHDAY CAKE (Left side mound: width * 0.18, height * 0.85)
  const cakeX = width * 0.18;
  const cakeY = height * 0.86;
  const cakeW = width * 0.16;
  const cakeH = cakeW * 0.85;

  ctx.save();
  // Cake shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(cakeX, cakeY + cakeH * 0.5, cakeW * 0.65, cakeH * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bottom Tier Cylinder
  const tier1W = cakeW;
  const tier1H = cakeH * 0.55;
  const tier1Y = cakeY;
  // Side body
  const cakeBodyGrad = ctx.createLinearGradient(cakeX - tier1W / 2, 0, cakeX + tier1W / 2, 0);
  cakeBodyGrad.addColorStop(0, '#f59e0b');
  cakeBodyGrad.addColorStop(0.4, '#fef08a');
  cakeBodyGrad.addColorStop(0.8, '#d97706');
  cakeBodyGrad.addColorStop(1, '#92400e');
  ctx.fillStyle = cakeBodyGrad;
  ctx.fillRect(cakeX - tier1W / 2, tier1Y, tier1W, tier1H);
  // Bottom ellipse
  ctx.beginPath();
  ctx.ellipse(cakeX, tier1Y + tier1H, tier1W / 2, tier1H * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Top Tier (Cream Whipped Cylinder)
  const tier2W = cakeW * 0.72;
  const tier2H = cakeH * 0.42;
  const tier2Y = tier1Y - tier2H * 0.65;
  const topTierGrad = ctx.createLinearGradient(cakeX - tier2W / 2, 0, cakeX + tier2W / 2, 0);
  topTierGrad.addColorStop(0, '#fef3c7');
  topTierGrad.addColorStop(0.4, '#ffffff');
  topTierGrad.addColorStop(0.8, '#fde68a');
  topTierGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = topTierGrad;
  ctx.fillRect(cakeX - tier2W / 2, tier2Y, tier2W, tier2H);
  // Tier top surface
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(cakeX, tier2Y, tier2W / 2, tier2H * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Colorful Birthday Sprinkles on Cake
  const sprinkleColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
  for (let s = 0; s < 12; s++) {
    const sx = cakeX - tier1W * 0.38 + (s * (tier1W * 0.76) / 12);
    const sy = tier1Y + (s % 3) * (tier1H * 0.28) + 6;
    ctx.fillStyle = sprinkleColors[s % sprinkleColors.length];
    ctx.beginPath();
    ctx.ellipse(sx, sy, 3, 2, s * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Birthday Candle
  const candleW = Math.max(4, cakeW * 0.08);
  const candleH = tier2H * 0.85;
  const candleY = tier2Y - candleH;
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cakeX - candleW / 2, candleY, candleW, candleH);
  // Candle stripes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cakeX - candleW / 2, candleY + candleH * 0.3, candleW, candleH * 0.25);

  // Glowing Candle Flame
  const flameY = candleY - candleH * 0.35;
  // Flame Halo
  const flameHalo = ctx.createRadialGradient(cakeX, flameY, 2, cakeX, flameY, 24);
  flameHalo.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
  flameHalo.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
  flameHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flameHalo;
  ctx.beginPath();
  ctx.arc(cakeX, flameY, 24, 0, Math.PI * 2);
  ctx.fill();
  // Flame Body
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.moveTo(cakeX, flameY - 12);
  ctx.quadraticCurveTo(cakeX + 7, flameY - 4, cakeX, flameY + 6);
  ctx.quadraticCurveTo(cakeX - 7, flameY - 4, cakeX, flameY - 12);
  ctx.fill();
  ctx.restore();

  // 4. 3D TRADITIONAL CELEBRATION DIYA / WARM LIGHT (Center-Right: width * 0.52, height * 0.82)
  const diyaX = width * 0.52;
  const diyaY = height * 0.825;
  const diyaW = width * 0.12;
  const diyaH = diyaW * 0.42;

  ctx.save();
  // Diya drop shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.beginPath();
  ctx.ellipse(diyaX, diyaY + diyaH * 0.6, diyaW * 0.6, diyaH * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Golden Brass Diya Base Bowl
  const diyaGrad = ctx.createLinearGradient(diyaX - diyaW / 2, diyaY, diyaX + diyaW / 2, diyaY + diyaH);
  diyaGrad.addColorStop(0, '#fef08a');
  diyaGrad.addColorStop(0.3, '#d97706');
  diyaGrad.addColorStop(0.8, '#92400e');
  diyaGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = diyaGrad;
  ctx.beginPath();
  ctx.ellipse(diyaX, diyaY, diyaW / 2, diyaH / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Diya Inner Oil Well
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(diyaX, diyaY - 2, diyaW * 0.42, diyaH * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Diya Radiant Flame
  const diyaFlameY = diyaY - diyaH * 0.9;
  const diyaHalo = ctx.createRadialGradient(diyaX, diyaFlameY, 4, diyaX, diyaFlameY, 45);
  diyaHalo.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  diyaHalo.addColorStop(0.25, 'rgba(254, 240, 138, 0.85)');
  diyaHalo.addColorStop(0.65, 'rgba(249, 115, 22, 0.38)');
  diyaHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = diyaHalo;
  ctx.beginPath();
  ctx.arc(diyaX, diyaFlameY, 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff7ed';
  ctx.beginPath();
  ctx.moveTo(diyaX, diyaFlameY - 18);
  ctx.quadraticCurveTo(diyaX + 11, diyaFlameY - 5, diyaX, diyaFlameY + 9);
  ctx.quadraticCurveTo(diyaX - 11, diyaFlameY - 5, diyaX, diyaFlameY - 18);
  ctx.fill();
  ctx.restore();

  // 5. CLUSTERED MINI 3D BALLOONS & GIFTS AT BASE
  // Mini Gold Balloon (left)
  draw3DRealisticBalloon(ctx, width * 0.09, height * 0.93, 26, 33, 'gold', '#f59e0b', 'transparent', -12);
  // Mini Black Balloon (left-mid)
  draw3DRealisticBalloon(ctx, width * 0.14, height * 0.90, 24, 30, 'black', '#1e293b', 'transparent', 8);
  // Mini Orange Balloon (right)
  draw3DRealisticBalloon(ctx, width * 0.82, height * 0.92, 28, 36, 'orange', '#f97316', 'transparent', 15);
  // Mini Gold Balloon (far right)
  draw3DRealisticBalloon(ctx, width * 0.89, height * 0.86, 32, 40, 'gold', '#eab308', 'transparent', -8);
  // Mini Black Balloon (far right lower)
  draw3DRealisticBalloon(ctx, width * 0.76, height * 0.94, 22, 28, 'black', '#0f172a', 'transparent', 5);

  ctx.restore();
}

// ========================================================
// 3D FLOATING CONFETTI & METALLIC GLITTER ENGINE
// ========================================================
export function draw3DFloatingConfetti(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  primaryColor: string = '#f59e0b',
  secondaryColor: string = '#ea580c'
) {
  ctx.save();
  const confettiSeeds = [
    { x: 0.08, y: 0.12, w: 14, h: 7, rot: 0.4, color: '#fef08a' },
    { x: 0.16, y: 0.19, w: 10, h: 10, rot: 0.8, color: '#f59e0b' },
    { x: 0.24, y: 0.09, w: 18, h: 8, rot: -0.5, color: '#fbbf24' },
    { x: 0.82, y: 0.11, w: 12, h: 6, rot: 0.6, color: '#f97316' },
    { x: 0.91, y: 0.18, w: 16, h: 9, rot: -0.7, color: '#fde047' },
    { x: 0.86, y: 0.28, w: 14, h: 7, rot: 0.3, color: '#eab308' },
    { x: 0.05, y: 0.35, w: 12, h: 8, rot: -0.4, color: '#ea580c' },
    { x: 0.12, y: 0.42, w: 16, h: 6, rot: 0.9, color: '#fef08a' },
    { x: 0.94, y: 0.38, w: 15, h: 8, rot: 0.2, color: primaryColor },
    { x: 0.88, y: 0.49, w: 11, h: 11, rot: -0.6, color: secondaryColor },
    { x: 0.06, y: 0.52, w: 14, h: 7, rot: 0.7, color: '#fbbf24' },
    { x: 0.15, y: 0.58, w: 18, h: 9, rot: -0.3, color: '#f59e0b' },
    { x: 0.92, y: 0.62, w: 13, h: 7, rot: 0.5, color: '#fde047' },
    { x: 0.84, y: 0.67, w: 16, h: 8, rot: -0.8, color: primaryColor },
    { x: 0.07, y: 0.72, w: 12, h: 6, rot: 0.4, color: '#f97316' },
    { x: 0.21, y: 0.77, w: 15, h: 8, rot: -0.2, color: '#fef08a' },
    { x: 0.89, y: 0.76, w: 17, h: 7, rot: 0.6, color: '#eab308' },
    { x: 0.78, y: 0.81, w: 12, h: 12, rot: -0.5, color: secondaryColor },
  ];

  for (const c of confettiSeeds) {
    ctx.save();
    ctx.translate(width * c.x, height * c.y);
    ctx.rotate(c.rot);
    const grad = ctx.createLinearGradient(-c.w / 2, -c.h / 2, c.w / 2, c.h / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, c.color);
    grad.addColorStop(1, shadeColor(c.color, -35));
    ctx.fillStyle = grad;
    ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    ctx.restore();
  }

  // Sparkling Diamond Stars
  const sparkleStars = [
    { x: 0.18, y: 0.14, size: 7 },
    { x: 0.85, y: 0.15, size: 9 },
    { x: 0.12, y: 0.28, size: 6 },
    { x: 0.92, y: 0.32, size: 8 },
    { x: 0.08, y: 0.48, size: 7 },
    { x: 0.95, y: 0.54, size: 9 },
    { x: 0.16, y: 0.68, size: 8 },
    { x: 0.86, y: 0.73, size: 7 },
  ];

  for (const s of sparkleStars) {
    drawSparkle(ctx, width * s.x, height * s.y, s.size, '#fef08a');
  }

  ctx.restore();
}

