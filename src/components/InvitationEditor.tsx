import React, { useRef, useState } from 'react';
import { 
  InvitationData, 
  StyleCustomization, 
  Template 
} from '../types';
import { samplePresets } from '../templates';
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Sparkles, 
  Upload, 
  Trash2, 
  ZoomIn, 
  Move, 
  Save, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface InvitationEditorProps {
  data: InvitationData;
  onChangeData: (data: InvitationData) => void;
  styles: StyleCustomization;
  onChangeStyles: (styles: StyleCustomization) => void;
  activeTemplate: Template;
  onSaveProject: () => void;
  saveStatusText?: string;
  onApplyPreset: (presetId: string) => void;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({
  data,
  onChangeData,
  styles,
  onChangeStyles,
  activeTemplate,
  onSaveProject,
  saveStatusText,
  onApplyPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'photo' | 'style' | 'presets'>('details');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFieldChange = (field: keyof InvitationData, value: any) => {
    onChangeData({
      ...data,
      [field]: value,
    });
  };

  const handleStyleChange = (field: keyof StyleCustomization, value: any) => {
    onChangeStyles({
      ...styles,
      [field]: value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChangeData({
        ...data,
        photoUrl: result,
        hasPhoto: true,
        photoZoom: 1.0,
        photoOffset: { x: 0, y: 0 },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onChangeData({
      ...data,
      photoUrl: null,
      hasPhoto: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fontOptions = [
    { label: 'Template Default', value: '' },
    { label: 'Fredoka (Playful Sans)', value: 'Fredoka' },
    { label: 'Playfair Display (Luxury Serif)', value: 'Playfair Display' },
    { label: 'Great Vibes (Elegant Script)', value: 'Great Vibes' },
    { label: 'Cinzel (Royal Classical)', value: 'Cinzel' },
    { label: 'Righteous (Modern Retro)', value: 'Righteous' },
    { label: 'Bungee (Bold Comic Poster)', value: 'Bungee' },
    { label: 'Montserrat (Modern Bold)', value: 'Montserrat' },
    { label: 'Dancing Script (Whimsical)', value: 'Dancing Script' },
    { label: 'Pacifico (Casual Script)', value: 'Pacifico' },
    { label: 'Chewy (Fun Kids)', value: 'Chewy' },
    { label: 'Oswald (Clean Condensed)', value: 'Oswald' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Editor Header & Tab Switcher */}
      <div className="border-b border-slate-100 p-3 bg-slate-50/60">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">Invitation Details</span>
            <span className="text-[11px] text-slate-500 font-medium bg-slate-200/70 px-2 py-0.5 rounded-full">
              Live Sync
            </span>
          </div>

          <button
            onClick={onSaveProject}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatusText || 'Save Project'}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/70 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'details'
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => setActiveTab('photo')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all relative ${
              activeTab === 'photo'
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photo</span>
            {data.hasPhoto && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('style')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'style'
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Style</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'presets'
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Tab Contents (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: CUSTOMER DETAILS */}
        {activeTab === 'details' && (
          <div className="space-y-4">
            {/* Required Notice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Enter customer details below. The live invitation preview on the right will update in real time.
              </span>
            </div>

            {/* Birthday Person's Name (Required) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>Birthday Person's Name *</span>
                <span className="text-[11px] text-brand-600 font-normal">Auto-scales</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={data.birthdayName}
                  onChange={(e) => handleFieldChange('birthdayName', e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            {/* Date & Age Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Birthday Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    value={data.birthDate}
                    onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age (Optional)
                </label>
                <input
                  type="text"
                  value={data.age || ''}
                  onChange={(e) => handleFieldChange('age', e.target.value)}
                  placeholder="e.g. 5 or 1st or 25th"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            {/* Event Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Event Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={data.eventTime || ''}
                  onChange={(e) => handleFieldChange('eventTime', e.target.value)}
                  placeholder="e.g. 6:30 PM Onwards"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            {/* Venue Details */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Venue & Location</span>
              </label>
              <input
                type="text"
                value={data.venueName || ''}
                onChange={(e) => handleFieldChange('venueName', e.target.value)}
                placeholder="Banquet Hall / Lawn Name"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
              />
              <input
                type="text"
                value={data.venueAddress || ''}
                onChange={(e) => handleFieldChange('venueAddress', e.target.value)}
                placeholder="Full address / Landmark, City"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {/* Host & RSVP */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Host / Family Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={data.hostName || ''}
                    onChange={(e) => handleFieldChange('hostName', e.target.value)}
                    placeholder="e.g. Sharma Family"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  RSVP Phone
                </label>
                <input
                  type="text"
                  value={data.rsvp || ''}
                  onChange={(e) => handleFieldChange('rsvp', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Custom Invitation Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Custom Invitation Message</span>
              </label>
              <textarea
                rows={3}
                value={data.customMessage || ''}
                onChange={(e) => handleFieldChange('customMessage', e.target.value)}
                placeholder="Join us for an evening of joy, delicious food, and celebration..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PHOTO UPLOAD & POSITIONING */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {!data.photoUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50 hover:bg-brand-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800">Upload Birthday Photo</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Upload customer's high quality portrait (JPG or PNG)
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium shadow-sm"
                >
                  Browse Computer
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Photo Preview Card */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={data.photoUrl}
                    alt="Birthday Star Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">Photo Loaded</p>
                    <p className="text-[11px] text-emerald-600 font-medium">Included in invitation</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-brand-600 hover:underline font-medium"
                      >
                        Change Photo
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-xs text-rose-600 hover:underline font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Photo Shape Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Photo Crop Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['circle', 'rounded', 'badge'] as const).map((shape) => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => handleFieldChange('photoShape', shape)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border capitalize transition-all ${
                          data.photoShape === shape
                            ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Zoom Control */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Photo Zoom</span>
                    </span>
                    <span>{Math.round((data.photoZoom || 1) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="2.0"
                    step="0.05"
                    value={data.photoZoom || 1.0}
                    onChange={(e) => handleFieldChange('photoZoom', parseFloat(e.target.value))}
                    className="w-full accent-brand-600 cursor-pointer"
                  />
                </div>

                {/* Photo Pan / Offset */}
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Move className="w-3.5 h-3.5" />
                    <span>Pan Adjustments</span>
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500">Horizontal (X)</span>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={data.photoOffset?.x || 0}
                        onChange={(e) =>
                          handleFieldChange('photoOffset', {
                            ...data.photoOffset,
                            x: parseInt(e.target.value, 10),
                          })
                        }
                        className="w-full accent-brand-600 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500">Vertical (Y)</span>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={data.photoOffset?.y || 0}
                        onChange={(e) =>
                          handleFieldChange('photoOffset', {
                            ...data.photoOffset,
                            y: parseInt(e.target.value, 10),
                          })
                        }
                        className="w-full accent-brand-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TYPOGRAPHY & COLORS */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Font Pairings */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                <span>Birthday Name Font</span>
              </label>
              <select
                value={styles.nameFont || ''}
                onChange={(e) => handleStyleChange('nameFont', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Headings & Titles Font
              </label>
              <select
                value={styles.titleFont || ''}
                onChange={(e) => handleStyleChange('titleFont', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Scale Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Overall Font Scale</span>
                <span>{Math.round(styles.fontScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.25"
                step="0.05"
                value={styles.fontScale}
                onChange={(e) => handleStyleChange('fontScale', parseFloat(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            {/* Color Customizations */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="block text-xs font-semibold text-slate-700">
                Custom Color Overrides
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Name Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={styles.nameColor || activeTemplate.palette.textPrimary}
                      onChange={(e) => handleStyleChange('nameColor', e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => handleStyleChange('nameColor', undefined)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Title Accent</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={styles.accentColor || activeTemplate.palette.accent}
                      onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => handleStyleChange('accentColor', undefined)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SAMPLE PRESETS */}
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              1-Click sample presets designed for Indian printing shops. Click any preset to instantly populate customer details and template.
            </p>

            <div className="space-y-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onApplyPreset(preset.id)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-start justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-brand-700">
                        {preset.label}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate max-w-[260px]">
                      {preset.data.venueName} • {preset.data.birthDate}
                    </p>
                  </div>
                  <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-brand-600 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
