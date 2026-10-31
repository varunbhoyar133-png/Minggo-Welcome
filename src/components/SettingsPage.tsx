import React, { useState } from 'react';
import { ShopSettings } from '../types';
import { exportOptions } from '../utils/exportEngine';
import { 
  Store, 
  Phone, 
  MapPin, 
  Printer, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  ShieldCheck,
  Languages
} from 'lucide-react';

interface SettingsPageProps {
  settings: ShopSettings;
  onSaveSettings: (settings: ShopSettings) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<ShopSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleChange = (field: keyof ShopSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Export JSON backup
  const handleExportBackup = () => {
    try {
      const data = {
        settings: formData,
        projects: localStorage.getItem('invitestudio_saved_projects_v1'),
        favorites: localStorage.getItem('invitestudio_favorite_templates_v1'),
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MINGGO_Studio_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Failed to export backup');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Shop & Application Settings</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure your printing shop identity, branding preferences, and default export resolutions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Shop Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Store className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm text-slate-900">Printing Studio Profile</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shop / Studio Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) => handleChange('shopName', e.target.value)}
                placeholder="e.g. Sai Digital Photo & Printing Studio"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop Phone / WhatsApp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.shopPhone}
                  onChange={(e) => handleChange('shopPhone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop Address / City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.shopAddress}
                  onChange={(e) => handleChange('shopAddress', e.target.value)}
                  placeholder="Gandhi Chowk, Nagpur"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Watermark toggles */}
          <div className="pt-2 space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.includeShopBranding}
                onChange={(e) => handleChange('includeShopBranding', e.target.checked)}
                className="mt-0.5 accent-brand-600 rounded"
              />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Include Subtle Shop Attribution on Exported JPGs
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Appends a fine, unobtrusive footer note at the bottom: "Design & Print: {formData.shopName || 'Studio'} | {formData.shopPhone}"
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-brand-200/80 bg-brand-50/30 hover:bg-brand-50/60 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={Boolean(formData.includeMinggoWatermark)}
                onChange={(e) => handleChange('includeMinggoWatermark', e.target.checked)}
                className="mt-0.5 accent-brand-600 rounded"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-900">
                    Optional MINGGO Brand Watermark on Exports
                  </p>
                  <span className="text-[10px] font-semibold bg-brand-100 text-brand-700 px-1.5 py-0.2 rounded">
                    Disabled by Default
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Adds an authentic, subtle MINGGO studio badge in the footer of exported cards. Invitations remain 100% beautiful and complete even when disabled.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Card 2: Export & Print Defaults */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Printer className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm text-slate-900">Export & Resolution Preferences</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default Download Quality
            </label>
            <select
              value={formData.defaultExportSize}
              onChange={(e) => handleChange('defaultExportSize', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
            >
              {exportOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} ({opt.dpi} DPI - {opt.description})
                </option>
              ))}
            </select>
          </div>

          {/* Language Architecture Note */}
          <div className="p-3 bg-brand-50/60 border border-brand-100 rounded-xl flex items-start gap-2.5">
            <Languages className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-brand-900">Multi-Language Architecture Ready</p>
              <p className="text-brand-700 mt-0.5 leading-relaxed">
                MINGGO Invitation Studio is built with English as the primary interface and typography language. The template data layer supports UTF-8 inputs, allowing Marathi and Hindi text or names to be rendered directly.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Backup & Data Storage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Local Data & Privacy</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            All customer details and designs are stored 100% locally on your computer in browser storage. No customer photos or phone numbers are ever uploaded to third-party clouds or external servers.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
