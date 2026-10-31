import React, { useEffect, useRef, useState } from 'react';
import { 
  Template, 
  InvitationData, 
  StyleCustomization, 
  ShopSettings 
} from '../types';
import { renderInvitationToCanvas } from '../utils/exportEngine';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Eye, 
  Download, 
  Sparkles, 
  Layers, 
  Square, 
  RectangleVertical,
  Tv
} from 'lucide-react';

interface InvitationCanvasProps {
  template: Template;
  data: InvitationData;
  styles: StyleCustomization;
  loadedPhoto: HTMLImageElement | null;
  shopSettings?: ShopSettings;
  onOpenExportModal: () => void;
  onChangeAspectRatio: (ratio: 'portrait' | 'square' | 'landscape') => void;
}

export const InvitationCanvas: React.FC<InvitationCanvasProps> = ({
  template,
  data,
  styles,
  loadedPhoto,
  shopSettings,
  onOpenExportModal,
  onChangeAspectRatio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showSafeMargins, setShowSafeMargins] = useState<boolean>(false);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const isSquare = styles.aspectRatio === 'square';
  const isLandscape = styles.aspectRatio === 'landscape';
  const targetWidth = isLandscape ? 1600 : 1200;
  const targetHeight = isSquare ? 1200 : (isLandscape ? 900 : 1600);

  // Render canvas whenever inputs change
  useEffect(() => {
    let isCancelled = false;
    const render = async () => {
      if (!canvasRef.current) return;
      setIsRendering(true);

      // Give fonts a brief tick to load if recently injected
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (e) {
          // ignore font load error
        }
      }

      if (isCancelled || !canvasRef.current) return;

      renderInvitationToCanvas(
        canvasRef.current,
        template,
        data,
        styles,
        targetWidth,
        targetHeight,
        loadedPhoto,
        showSafeMargins,
        shopSettings
      );
      setIsRendering(false);
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [template, data, styles, loadedPhoto, showSafeMargins, shopSettings, isSquare, targetWidth, targetHeight]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(150, Math.max(50, prev + delta)));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/80 rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
      {/* Top Preview Control Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Template Info & Category */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-800">{template.name}</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
            {template.category.replace('_', ' ')}
          </span>
          {template.badge && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {template.badge}
            </span>
          )}
        </div>

        {/* Aspect Ratio & Display Controls */}
        <div className="flex items-center gap-2">
          {/* Ratio Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => onChangeAspectRatio('portrait')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                !isSquare && !isLandscape
                  ? 'bg-white text-brand-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Portrait 3:4 (Standard Print)"
            >
              <RectangleVertical className="w-3.5 h-3.5" />
              <span>Portrait</span>
            </button>
            <button
              onClick={() => onChangeAspectRatio('square')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                isSquare
                  ? 'bg-white text-brand-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Square 1:1 (WhatsApp / Instagram)"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Square</span>
            </button>
            <button
              onClick={() => onChangeAspectRatio('landscape')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                isLandscape
                  ? 'bg-white text-brand-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Landscape 16:9 (TV Display)"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Landscape</span>
            </button>
          </div>

          {/* Safe Margins Toggle */}
          <button
            onClick={() => setShowSafeMargins(!showSafeMargins)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              showSafeMargins
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-medium'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Safe Print Margins Guide"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Safe Margins</span>
          </button>

          {/* Zoom In/Out */}
          <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 text-slate-600">
            <button
              onClick={() => handleZoom(-15)}
              className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-l-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 text-xs font-medium hover:text-slate-900"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={() => handleZoom(15)}
              className="p-1.5 hover:text-slate-900 hover:bg-slate-200/60 rounded-r-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Export Button */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all shadow-brand-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JPG</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center canvas-checkerboard relative"
      >
        <div
          className="transition-all duration-200 ease-out origin-center"
          style={{
            transform: `scale(${zoomLevel / 100})`,
          }}
        >
          {/* Shadowed Card Frame around Canvas */}
          <div className="relative rounded-lg shadow-2xl shadow-slate-950/20 border-4 border-white bg-white overflow-hidden">
            <canvas
              ref={canvasRef}
              className="block max-w-full h-auto"
              style={{
                width: isSquare ? '450px' : (isLandscape ? '560px' : '420px'),
                aspectRatio: isSquare ? '1 / 1' : (isLandscape ? '16 / 9' : '3 / 4'),
              }}
            />

            {/* Rendering Indicator */}
            {isRendering && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="p-2 bg-white rounded-full shadow-lg">
                  <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resolution Badge in bottom right corner */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
          Export: {targetWidth} × {targetHeight} px
        </div>
      </div>
    </div>
  );
};
