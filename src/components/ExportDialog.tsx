import React, { useState } from 'react';
import { 
  ExportOption, 
  InvitationData, 
  ShopSettings, 
  StyleCustomization, 
  Template 
} from '../types';
import { exportOptions, exportInvitationJPG } from '../utils/exportEngine';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  CheckCircle, 
  Sparkles, 
  Share2, 
  Copy, 
  Printer, 
  Smartphone, 
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
  data: InvitationData;
  styles: StyleCustomization;
  loadedPhoto: HTMLImageElement | null;
  shopSettings: ShopSettings;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  template,
  data,
  styles,
  loadedPhoto,
  shopSettings,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    shopSettings.defaultExportSize || 'print'
  );
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportedResult, setExportedResult] = useState<{
    filename: string;
    sizeKB: number;
  } | null>(null);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedOption = exportOptions.find((o) => o.id === selectedOptionId) || exportOptions[0];

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const result = await exportInvitationJPG(
        template,
        data,
        styles,
        selectedOption,
        loadedPhoto,
        shopSettings
      );
      setExportedResult(result);

      // Trigger celebratory confetti burst!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7c3aed', '#ec4899', '#facc15', '#06b6d4'],
      });
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please verify canvas permissions.');
    } finally {
      setIsExporting(false);
    }
  };

  // WhatsApp formatted text copy helper
  const generateWhatsAppText = () => {
    const lines = [
      `🎉 *BIRTHDAY INVITATION* 🎉`,
      ``,
      `You are cordially invited to celebrate the birthday of:`,
      `⭐ *${(data.birthdayName || 'Our Birthday Star').toUpperCase()}* ⭐`,
      data.age ? `🎂 Turning: *${data.age}*` : '',
      `📅 *Date:* ${data.birthDate || 'Coming Soon'}`,
      data.eventTime ? `⏰ *Time:* ${data.eventTime}` : '',
      data.venueName ? `📍 *Venue:* ${data.venueName}` : '',
      data.venueAddress ? `   ${data.venueAddress}` : '',
      data.customMessage ? `\n"${data.customMessage}"` : '',
      data.hostName ? `\nWarmly Invited By: *${data.hostName}*` : '',
      data.rsvp ? `RSVP: ${data.rsvp}` : '',
      ``,
      shopSettings.includeShopBranding && shopSettings.shopName
        ? `_Designed & Printed at ${shopSettings.shopName}_`
        : '',
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleCopyWhatsAppText = () => {
    const text = generateWhatsAppText();
    navigator.clipboard.writeText(text);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  const handleOpenWhatsAppWeb = () => {
    const text = encodeURIComponent(generateWhatsAppText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Export High-Resolution JPG</h3>
              <p className="text-[11px] text-slate-500">Ready for studio printing and WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          {/* Output Size Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Output Resolution
            </label>
            <div className="space-y-2">
              {exportOptions.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{opt.label}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {opt.dpi} DPI
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
                      <p className="text-[10px] text-brand-600 font-medium mt-1">
                        Best for: {opt.recommendedFor}
                      </p>
                    </div>

                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setSelectedOptionId(opt.id)}
                      className="mt-1 accent-brand-600"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Success Feedback */}
          {exportedResult && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-emerald-800">JPG Downloaded Successfully!</p>
                <p className="text-emerald-700 font-mono text-[11px] mt-0.5 break-all">
                  {exportedResult.filename} ({exportedResult.sizeKB} KB)
                </p>
              </div>
            </div>
          )}

          {/* WhatsApp Text Share Helper */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Invitation Text</span>
              </span>
              <button
                type="button"
                onClick={handleCopyWhatsAppText}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedWhatsapp ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Copy customer invitation wording formatted with bold highlights and emojis ready for WhatsApp messages.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleOpenWhatsAppWeb}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-brand-500/20 disabled:opacity-50 transition-all"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isExporting ? 'Generating High-Res JPG...' : 'Download High-Res JPG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
