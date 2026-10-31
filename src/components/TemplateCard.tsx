import React, { useEffect, useRef } from 'react';
import { Template } from '../types';
import { Heart, Sparkles, Check } from 'lucide-react';
import { drawMinggoLogo, drawRoundedRect } from '../utils/canvasHelpers';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (template: Template) => void;
  onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render miniature template preview thumbnail on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 280;
    const height = 370;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    // 1. Background gradient
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

    // 2. Draw decorations
    try {
      template.drawDecorations(
        ctx,
        width,
        height,
        {
          birthdayName: 'Aarav',
          birthDate: '2026-11-15',
          hasPhoto: false,
          photoShape: 'circle',
          photoZoom: 1,
          photoOffset: { x: 0, y: 0 },
        },
        {
          titleFont: template.defaultFonts.titleFont,
          nameFont: template.defaultFonts.nameFont,
          bodyFont: template.defaultFonts.bodyFont,
          fontScale: 1,
          textAlignment: 'center',
          aspectRatio: 'portrait',
        }
      );
    } catch (e) {
      // ignore
    }

    // 3. Stylized typography for preview accurately matching MinGGo reference card
    drawMinggoLogo(ctx, width / 2, 12, 64);

    // You're Invited!
    ctx.fillStyle = template.palette.accent || '#fbbf24';
    ctx.font = 'bold 11px "Caveat", "Dancing Script", "Pacifico", cursive';
    ctx.textAlign = 'center';
    ctx.fillText("You're Invited!", width / 2, 46);

    // Hero Birthday Star Name
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 6;
    ctx.font = 'bold 18px "Fredoka", "Outfit", cursive, sans-serif';
    ctx.fillText('Aarav Sharma', width / 2, 70);
    ctx.restore();

    // Turning age golden pill badge
    const badgeW = 76;
    const badgeH = 16;
    drawRoundedRect(
      ctx,
      width / 2 - badgeW / 2,
      80,
      badgeW,
      badgeH,
      badgeH / 2,
      template.palette.accent || '#f59e0b',
      '#ffffff',
      0.8
    );
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8px "Outfit", "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TURNING 5', width / 2, 91);

    // Date & Time
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px "Outfit", "Montserrat", sans-serif';
    ctx.fillText('Sunday, Nov 15, 2026', width / 2, 114);

    ctx.fillStyle = '#fde047';
    ctx.font = '600 7px "Outfit", "Montserrat", sans-serif';
    ctx.fillText('6:30 PM Onwards', width / 2, 125);

    // Venue
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px "Outfit", "Montserrat", sans-serif';
    ctx.fillText('The Royal Orchid Banquet', width / 2, 144);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 7px "Outfit", "Montserrat", sans-serif';
    ctx.fillText('Nagpur, Maharashtra', width / 2, 155);

    ctx.restore();
  }, [template]);

  return (
    <div
      onClick={() => onSelect(template)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col ${
        isSelected
          ? 'border-brand-600 ring-2 ring-brand-600/30 shadow-lg shadow-brand-500/10'
          : 'border-slate-200 hover:border-brand-400 hover:shadow-md'
      }`}
    >
      {/* Thumbnail Preview Area */}
      <div className="relative aspect-[3/4] bg-slate-100 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => onToggleFavorite(template.id, e)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Badge (Popular / Best Seller / New) */}
        {template.badge && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {template.badge}
          </span>
        )}

        {/* Selected Checkmark Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-brand-900/20 backdrop-blur-[0.5px] flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        )}
      </div>

      {/* Card Info Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-brand-600 transition-colors">
            {template.name}
          </h4>
          <p className="text-[11px] text-slate-500 capitalize truncate mt-0.5">
            {template.category.replace('_', ' ')}
          </p>
        </div>

        <button
          type="button"
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            isSelected
              ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200'
              : 'bg-slate-100 text-slate-600 hover:bg-brand-600 hover:text-white'
          }`}
        >
          {isSelected ? 'Active' : 'Apply'}
        </button>
      </div>
    </div>
  );
};
