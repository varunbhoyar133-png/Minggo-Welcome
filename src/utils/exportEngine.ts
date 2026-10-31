import { ExportOption, InvitationData, StyleCustomization, Template, ShopSettings } from '../types';
import { 
  drawSafeText, 
  drawWrappedText, 
  drawPhotoOnCanvas, 
  formatFriendlyDate, 
  drawRoundedRect,
  drawOrnateDivider,
  drawStar,
  drawMinggoLogo
} from './canvasHelpers';

export const exportOptions: ExportOption[] = [
  {
    id: 'standard',
    label: 'Standard (1200 × 1600 px)',
    category: 'standard',
    width: 1200,
    height: 1600,
    dpi: 150,
    description: 'Perfect for fast printing & WhatsApp sharing',
    recommendedFor: 'WhatsApp & standard 4×6 / 6×8 inch prints',
  },
  {
    id: 'print',
    label: 'Studio Print Quality (1800 × 2400 px)',
    category: 'print',
    width: 1800,
    height: 2400,
    dpi: 300,
    description: 'Crisp 300 DPI studio quality for offset & photo paper',
    recommendedFor: 'Professional lab photo prints & cards',
  },
  {
    id: 'ultra',
    label: 'Ultra HD Print (2400 × 3200 px)',
    category: 'print',
    width: 2400,
    height: 3200,
    dpi: 300,
    description: 'Maximum resolution for large banners and posters',
    recommendedFor: 'Large flex banners, standees & posters',
  },
  {
    id: 'square',
    label: 'Square Card (2400 × 2400 px)',
    category: 'square',
    width: 2400,
    height: 2400,
    dpi: 300,
    description: 'Square 1:1 format for Instagram and WhatsApp DP',
    recommendedFor: 'Instagram posts, square cards & gifts',
  },
  {
    id: 'tv-1080p',
    label: 'TV Screen Full HD (1920 × 1080 px)',
    category: 'tv',
    width: 1920,
    height: 1080,
    dpi: 150,
    description: 'Landscape 16:9 for TV Welcome Display screens and party hall monitors',
    recommendedFor: 'TV Displays, Play Zones, Entrance Screens & Monitors',
  },
  {
    id: 'tv-4k',
    label: 'TV Screen 4K Ultra HD (3840 × 2160 px)',
    category: 'tv',
    width: 3840,
    height: 2160,
    dpi: 300,
    description: 'Maximum 4K clarity for large screen TV monitors & LED video walls',
    recommendedFor: '4K Ultra HD TV Displays, Commercial LED Screens',
  },
];

/**
 * Universal canvas renderer for both on-screen live preview and offscreen high-res export
 */
export function renderInvitationToCanvas(
  canvas: HTMLCanvasElement,
  template: Template,
  data: InvitationData,
  styles: StyleCustomization,
  width: number,
  height: number,
  loadedPhoto: HTMLImageElement | null,
  showSafeMargins: boolean = false,
  shopSettings?: ShopSettings
) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Coordinate scale factor relative to 1200x1600 base
  const scale = width / 1200;
  const isSquare = styles.aspectRatio === 'square' || width === height;

  ctx.save();

  // 1. Solid canvas background + gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  const colors = template.palette.bgGradient;
  if (colors.length === 1) {
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[0]);
  } else if (colors.length === 2) {
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
  } else {
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(0.5, colors[1]);
    grad.addColorStop(1, colors[2] || colors[1]);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Vector decorative artwork from template
  try {
    template.drawDecorations(ctx, width, height, data, styles);
  } catch (err) {
    console.error('Error drawing template decorations:', err);
  }

  // 3. User photo if present
  let photoBottomY = height * 0.22;
  const hasValidPhoto = Boolean(data.hasPhoto && loadedPhoto);

  // 4. Content Typography & Layout
  const nameColor = styles.nameColor || template.palette.textPrimary || '#ffffff';
  const secondaryColor = styles.bodyColor || template.palette.textSecondary || '#cbd5e1';
  const accentColor = styles.accentColor || template.palette.accent || '#f59e0b';

  const titleFont = styles.titleFont || template.defaultFonts.titleFont;
  const nameFont = styles.nameFont || template.defaultFonts.nameFont;
  const bodyFont = styles.bodyFont || template.defaultFonts.bodyFont;

  const fontScale = styles.fontScale || 1.0;
  const safeMargin = 100 * scale;
  const maxContentW = width - safeMargin * 2;

  // A. MinGGo Brand Header Logo (Positioned proudly at top center matching reference design)
  const logoW = (isSquare ? 210 : 250) * scale;
  const logoTopY = hasValidPhoto ? 35 * scale : (isSquare ? 45 * scale : 55 * scale);
  const logoH = drawMinggoLogo(ctx, width / 2, logoTopY, logoW);

  // B. "You're Invited!" (Warm cursive script callout)
  const inviteY = logoTopY + logoH + (hasValidPhoto ? 24 : 36) * scale;
  drawSafeText(
    ctx,
    "You're Invited!",
    width / 2,
    inviteY,
    maxContentW,
    38 * scale * fontScale,
    "'Caveat', 'Dancing Script', 'Pacifico', cursive",
    'bold',
    accentColor,
    'center'
  );

  // C. Photo if uploaded
  if (hasValidPhoto && loadedPhoto) {
    const photoSize = (isSquare ? 260 : 300) * scale;
    const photoCenterY = inviteY + photoSize / 2 + 25 * scale;
    drawPhotoOnCanvas(ctx, {
      img: loadedPhoto,
      x: width / 2,
      y: photoCenterY,
      size: photoSize,
      shape: data.photoShape || 'circle',
      zoom: data.photoZoom || 1.0,
      offset: {
        x: (data.photoOffset?.x || 0) * scale,
        y: (data.photoOffset?.y || 0) * scale,
      },
      borderColor: template.palette.frameBorder || '#f59e0b',
      borderWidth: 6 * scale,
    });
    photoBottomY = photoCenterY + photoSize / 2 + 25 * scale;
  }

  // D. Hero Birthday Person Name (Bold festive script, white with soft shadow for pop)
  const nameY = hasValidPhoto
    ? photoBottomY + 44 * scale
    : (isSquare ? inviteY + 66 * scale : inviteY + 74 * scale);

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 12 * scale;
  drawSafeText(
    ctx,
    data.birthdayName || 'Aarav Sharma',
    width / 2,
    nameY,
    maxContentW,
    72 * scale * fontScale,
    nameFont,
    'bold',
    nameColor,
    'center'
  );
  ctx.restore();

  // E. Turning Age Pill Badge ("TURNING 5" in warm golden pill button)
  let nextY = nameY + 54 * scale;
  if (data.age) {
    const ageText = isNaN(Number(data.age))
      ? `${data.age.toUpperCase()} BIRTHDAY`
      : `TURNING ${data.age}`;

    const badgeW = Math.min(maxContentW * 0.6, 240 * scale);
    const badgeH = 46 * scale;

    drawRoundedRect(
      ctx,
      width / 2 - badgeW / 2,
      nextY - badgeH / 2,
      badgeW,
      badgeH,
      badgeH / 2,
      accentColor,
      '#ffffff',
      1.5 * scale
    );

    drawSafeText(
      ctx,
      ageText,
      width / 2,
      nextY,
      badgeW - 20 * scale,
      22 * scale * fontScale,
      "'Outfit', 'Fredoka', sans-serif",
      'bold',
      '#0f172a',
      'center',
      'uppercase'
    );

    nextY += 56 * scale;
  }

  // F. Custom Heartfelt Message (if provided)
  if (data.customMessage) {
    const msgY = nextY + 15 * scale;
    const msgEnd = drawWrappedText(
      ctx,
      `"${data.customMessage}"`,
      width / 2,
      msgY,
      maxContentW * 0.88,
      26 * scale,
      17 * scale * fontScale,
      bodyFont,
      secondaryColor,
      'center',
      3
    );
    nextY = Math.max(msgEnd + 25 * scale, nextY + 65 * scale);
  }

  // G. Date & Time Block (Clean, high-contrast, exactly like reference)
  const dateInfo = formatFriendlyDate(data.birthDate);
  const dateText = `${dateInfo.dayOfWeek}, ${dateInfo.formattedDate}${dateInfo.year ? ', ' + dateInfo.year : ''}`;
  const timeText = data.eventTime ? data.eventTime : '6:30 PM Onwards';

  const dateBlockY = nextY + 28 * scale;

  drawSafeText(
    ctx,
    dateText,
    width / 2,
    dateBlockY,
    maxContentW * 0.88,
    28 * scale * fontScale,
    "'Outfit', 'Montserrat', sans-serif",
    'bold',
    '#ffffff',
    'center'
  );

  drawSafeText(
    ctx,
    timeText,
    width / 2,
    dateBlockY + 36 * scale,
    maxContentW * 0.88,
    24 * scale * fontScale,
    "'Outfit', 'Montserrat', sans-serif",
    '600',
    '#fde047',
    'center'
  );

  // H. Venue Block
  let venueY = dateBlockY + 84 * scale;
  if (data.venueName) {
    drawSafeText(
      ctx,
      data.venueName,
      width / 2,
      venueY,
      maxContentW * 0.88,
      28 * scale * fontScale,
      "'Outfit', 'Montserrat', sans-serif",
      'bold',
      '#ffffff',
      'center'
    );

    if (data.venueAddress) {
      venueY += 34 * scale;
      drawWrappedText(
        ctx,
        data.venueAddress,
        width / 2,
        venueY,
        maxContentW * 0.82,
        25 * scale,
        20 * scale * fontScale,
        bodyFont,
        secondaryColor,
        'center',
        2
      );
    }
  }

  // I. Host & RSVP (if provided)
  const footerY = height - 110 * scale;
  if (data.hostName || data.rsvp) {
    drawOrnateDivider(ctx, width / 2, footerY - 25 * scale, 320 * scale, accentColor);
    if (data.hostName) {
      drawSafeText(
        ctx,
        `CORDIALLY INVITED BY: ${data.hostName.toUpperCase()}`,
        width / 2,
        footerY,
        maxContentW,
        17 * scale * fontScale,
        titleFont,
        'bold',
        '#ffffff',
        'center',
        'uppercase'
      );
    }
    if (data.rsvp) {
      drawSafeText(
        ctx,
        `RSVP: ${data.rsvp}`,
        width / 2,
        footerY + 24 * scale,
        maxContentW,
        16 * scale * fontScale,
        bodyFont,
        '600',
        '#fde047',
        'center',
        'uppercase'
      );
    }
  }

  // H. Optional Shop Branding / Watermark if enabled in Settings
  if (shopSettings?.includeShopBranding && shopSettings.shopName) {
    const shopText = `Design & Print: ${shopSettings.shopName}${shopSettings.shopPhone ? ' | ' + shopSettings.shopPhone : ''}`;
    drawSafeText(
      ctx,
      shopText,
      width / 2,
      height - 18 * scale,
      width - 40 * scale,
      12 * scale,
      'Inter',
      'normal',
      'rgba(148, 163, 184, 0.75)',
      'center'
    );
  }

  // Optional MINGGO Brand Watermark (disabled by default)
  if (shopSettings?.includeMinggoWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.75;
    const badgeW = 140 * scale;
    const badgeH = 28 * scale;
    const badgeX = width / 2 - badgeW / 2;
    const badgeY = height - 42 * scale;

    drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 8 * scale, 'rgba(15, 23, 42, 0.85)');
    drawSafeText(
      ctx,
      '★ MINGGO STUDIO',
      width / 2,
      badgeY + badgeH / 2,
      badgeW - 16 * scale,
      11 * scale,
      'Fredoka',
      'bold',
      '#ea580c',
      'center',
      'uppercase'
    );
    ctx.restore();
  }

  // I. Safe Margins overlay (for shopkeeper guide)
  if (showSafeMargins) {
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([8 * scale, 8 * scale]);
    ctx.strokeRect(safeMargin, safeMargin, width - safeMargin * 2, height - safeMargin * 2);
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
    ctx.font = `${14 * scale}px sans-serif`;
    ctx.fillText('SAFE PRINT MARGIN (KEEP IMPORTANT TEXT INSIDE)', safeMargin + 10 * scale, safeMargin + 20 * scale);
  }

  ctx.restore();
}

/**
 * High-Resolution JPG export trigger
 */
export async function exportInvitationJPG(
  template: Template,
  data: InvitationData,
  styles: StyleCustomization,
  exportOption: ExportOption,
  loadedPhoto: HTMLImageElement | null,
  shopSettings?: ShopSettings
): Promise<{ success: boolean; filename: string; sizeKB: number }> {
  return new Promise((resolve, reject) => {
    try {
      const offscreenCanvas = document.createElement('canvas');
      renderInvitationToCanvas(
        offscreenCanvas,
        template,
        data,
        styles,
        exportOption.width,
        exportOption.height,
        loadedPhoto,
        false, // no safe margin lines on final export!
        shopSettings
      );

      // Clean filename formatted with customer name and date
      const cleanName = (data.birthdayName || 'Birthday_Invitation')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const year = data.birthDate ? data.birthDate.split('-')[0] : '2026';
      const filename = `${cleanName}_Birthday_Invitation_${exportOption.id}_${year}.jpg`;

      // Export as high-quality JPG (0.95 quality)
      offscreenCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create JPG blob'));
            return;
          }

          const sizeKB = Math.round(blob.size / 1024);
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Clean up memory
          setTimeout(() => URL.revokeObjectURL(url), 4000);
          resolve({ success: true, filename, sizeKB });
        },
        'image/jpeg',
        0.95
      );
    } catch (error) {
      reject(error);
    }
  });
}
