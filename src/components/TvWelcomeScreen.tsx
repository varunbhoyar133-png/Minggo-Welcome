import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TvScreenData, TvScreenTemplate } from '../types';
import { 
  allTvTemplates, 
  getTvTemplateById, 
  defaultTvScreenData, 
  sampleTvPresets 
} from '../templates/tvScreens';
import confetti from 'canvas-confetti';
import { 
  Tv, 
  Download, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Check, 
  Copy, 
  Settings2, 
  Palette
} from 'lucide-react';

interface TvWelcomeScreenProps {
  initialName?: string;
  initialAge?: string;
  initialVenue?: string;
}

export const TvWelcomeScreen: React.FC<TvWelcomeScreenProps> = ({
  initialName,
  initialAge,
  initialVenue,
}) => {
  const [activeTemplate, setActiveTemplate] = useState<TvScreenTemplate>(allTvTemplates[0]);
  const [data, setData] = useState<TvScreenData>({
    ...defaultTvScreenData,
    childName: initialName || defaultTvScreenData.childName,
    age: initialAge || defaultTvScreenData.age,
    zoneText: initialVenue || defaultTvScreenData.zoneText,
  });

  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [, setAssetsLoaded] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);

  // Preload authentic MinGGo logo and 3D space cinematic assets once on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setLogoImg(img);
    img.src = '/minggo-logo-tight.png';

    const spaceImg = new Image();
    spaceImg.crossOrigin = 'anonymous';
    spaceImg.onload = () => setAssetsLoaded((prev) => prev + 1);
    spaceImg.src = '/templates/space-astronaut-cinematic.jpg';
  }, []);

  // Universal canvas render helper
  const renderScreen = useCallback((targetCanvas: HTMLCanvasElement, width: number, height: number) => {
    targetCanvas.width = width;
    targetCanvas.height = height;
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;
    activeTemplate.draw(ctx, width, height, data, logoImg);
  }, [activeTemplate, data, logoImg]);

  // Live Canvas render with font load assurance
  useEffect(() => {
    let isCancelled = false;
    const draw = async () => {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font load error
        }
      }
      if (isCancelled || !canvasRef.current) return;
      renderScreen(canvasRef.current, 1920, 1080);
    };

    draw();
    return () => {
      isCancelled = true;
    };
  }, [renderScreen, logoImg]);

  // Fullscreen TV toggle
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (fullscreenContainerRef.current?.requestFullscreen) {
          await fullscreenContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // ignore fullscreen rejection
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Export 1080p or 4K JPG
  const handleDownload = async (resolution: '1080p' | '4k') => {
    try {
      setIsExporting(true);
      const width = resolution === '4k' ? 3840 : 1920;
      const height = resolution === '4k' ? 2160 : 1080;

      const offscreen = document.createElement('canvas');
      renderScreen(offscreen, width, height);

      const cleanName = (data.childName || 'Birthday_Celebration')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `MinGGo_TV_${cleanName}_${data.age || 'Party'}_${resolution}.jpg`;

      offscreen.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 4000);

          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff6200', '#0ea5e9', '#facc15', '#ec4899', '#22c55e'],
          });
          setIsExporting(false);
        },
        'image/jpeg',
        0.96
      );
    } catch {
      setIsExporting(false);
    }
  };

  // Copy image to clipboard
  const handleCopyToClipboard = async () => {
    try {
      if (!canvasRef.current) return;
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedStatus(true);
          setTimeout(() => setCopiedStatus(false), 2500);
        } catch {
          alert('Could not copy image directly. Use Download button instead.');
        }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5 pb-8 max-w-7xl mx-auto">
      {/* 1. Quick Control Panel (Top Horizontal Bar) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Dynamic Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {/* Child's Name Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1 tracking-wider uppercase">
                Child's Name <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                value={data.childName}
                onChange={(e) => setData({ ...data, childName: e.target.value })}
                placeholder="e.g. KAVYA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-base uppercase bg-slate-50/50"
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1 tracking-wider uppercase">
                Age / Milestone
              </label>
              <input
                type="text"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                placeholder="e.g. 7th"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Zone / Floor Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1 tracking-wider uppercase">
                Floor / Zone Pill
              </label>
              <input
                type="text"
                value={data.zoneText}
                onChange={(e) => setData({ ...data, zoneText: e.target.value })}
                placeholder="e.g. 2nd Floor, Play Zone"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-slate-50/50"
              />
            </div>
          </div>

          {/* Quick Display Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 lg:shrink-0 lg:pl-3 lg:border-l lg:border-slate-200">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all"
              title="Present Fullscreen TV (F11)"
            >
              <Tv className="w-4 h-4 text-white" />
              <span>Present Fullscreen TV</span>
            </button>

            <button
              onClick={() => handleDownload('1080p')}
              disabled={isExporting}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-brand-400" />
              <span>Download 1080p</span>
            </button>

            <button
              onClick={() => handleDownload('4k')}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              title="3840 × 2160 4K Ultra HD"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>4K</span>
            </button>
          </div>
        </div>

        {/* 1-Click Quick Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Quick Demos:
          </span>
          {sampleTvPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setData({
                  ...data,
                  childName: preset.name,
                  age: preset.age,
                  zoneText: preset.zone,
                  customHeadline: '',
                });
                const t = getTvTemplateById(preset.templateId);
                setActiveTemplate(t);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-slate-200/80 transition-colors"
            >
              {preset.name} ({preset.age})
            </button>
          ))}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="ml-auto text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Advanced' : 'Custom Words'}</span>
          </button>
        </div>

        {/* Advanced Customizable Text Accordion */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Top Greeting Text
              </label>
              <input
                type="text"
                value={data.titlePrefix}
                onChange={(e) => setData({ ...data, titlePrefix: e.target.value })}
                placeholder="Welcome to"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Event Subtitle Text
              </label>
              <input
                type="text"
                value={data.eventTitle}
                onChange={(e) => setData({ ...data, eventTitle: e.target.value })}
                placeholder="Birthday Party!"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Headline Override (Optional)
              </label>
              <input
                type="text"
                value={data.customHeadline || ''}
                onChange={(e) => setData({ ...data, customHeadline: e.target.value })}
                placeholder="e.g. KAVYA & KABIR's BASH"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Central Cinema TV Monitor Preview (Massive, Crisp, 16:9) */}
      <div 
        ref={fullscreenContainerRef}
        className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800/80 bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-0 bg-black' : ''
        }`}
      >
        <div className="w-full max-w-full aspect-video relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-lg"
          />

          {/* Fullscreen Exit Control Button */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-5 right-5 z-50 px-5 py-2.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-2xl transition-all"
            >
              <Minimize2 className="w-4 h-4 text-brand-400" />
              <span>Exit Fullscreen (Esc)</span>
            </button>
          )}
        </div>

        {/* Status Bar below TV frame */}
        {!isFullscreen && (
          <div className="w-full mt-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 16:9 Display Preview (1920 × 1080)
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-medium">
                Active Theme: <strong className="text-brand-400">{activeTemplate.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                {copiedStatus ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Horizontal Template Theme Selector (10 Diverse Templates) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Palette className="w-4 h-4 text-brand-600" />
            <span>Choose Display Theme ({allTvTemplates.length} Themes)</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Click any theme for instant 16:9 preview
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {allTvTemplates.map((template) => {
            const isSelected = template.id === activeTemplate.id;
            return (
              <button
                key={template.id}
                onClick={() => setActiveTemplate(template)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 inline-block" 
                      style={{ backgroundColor: template.previewColor }}
                    />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {template.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {template.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {template.theme}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-2 text-[10px] font-bold text-brand-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Active Theme</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
