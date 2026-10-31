export type TemplateCategory = 
  | 'all'
  | 'kids'
  | 'pastel_teddy'
  | 'balloons'
  | 'floral'
  | 'modern_minimal'
  | 'luxury_gold'
  | 'party';

export interface CategoryMeta {
  id: TemplateCategory;
  name: string;
  description: string;
  count: number;
  iconName: string;
}

export interface InvitationData {
  birthdayName: string;
  birthDate: string;
  age?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  hostName?: string;
  rsvp?: string;
  customMessage?: string;
  photoUrl?: string | null;
  photoShape: 'circle' | 'rounded' | 'badge';
  photoZoom: number;
  photoOffset: { x: number; y: number };
  hasPhoto: boolean;
}

export interface StyleCustomization {
  titleFont: string;
  nameFont: string;
  bodyFont: string;
  titleColor?: string;
  nameColor?: string;
  bodyColor?: string;
  accentColor?: string;
  fontScale: number; // 0.8 to 1.3
  textAlignment: 'center' | 'left';
  aspectRatio: 'portrait' | 'square' | 'landscape';
}

export interface TemplatePalette {
  bgGradient: string[];
  canvasBg: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  frameBorder: string;
  ribbonBg?: string;
}

export interface TemplateFonts {
  titleFont: string;
  nameFont: string;
  bodyFont: string;
  accentFont: string;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  tags: string[];
  badge?: string;
  palette: TemplatePalette;
  defaultFonts: TemplateFonts;
  supportedRatios: ('portrait' | 'square' | 'landscape')[];
  drawDecorations: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: InvitationData,
    styles: StyleCustomization
  ) => void;
}

export interface TvScreenData {
  childName: string;
  age: string;
  titlePrefix: string; // e.g. "Welcome to"
  eventTitle: string; // e.g. "Birthday Party!"
  zoneText: string; // e.g. "2nd Floor, Play Zone"
  customHeadline?: string;
  showLogo?: boolean;
}

export interface TvScreenTemplate {
  id: string;
  name: string;
  theme: string;
  description: string;
  badge: string;
  previewColor: string;
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: TvScreenData,
    logoImg?: HTMLImageElement | null
  ) => void;
}

export interface SavedProject {
  id: string;
  projectName: string;
  templateId: string;
  data: InvitationData;
  customization: StyleCustomization;
  updatedAt: number;
  thumbnailUrl?: string;
}

export interface ExportOption {
  id: string;
  label: string;
  category: 'standard' | 'print' | 'square' | 'social' | 'tv';
  width: number;
  height: number;
  dpi: number;
  description: string;
  recommendedFor: string;
}

export interface ShopSettings {
  shopName: string;
  shopPhone: string;
  shopAddress: string;
  includeShopBranding: boolean;
  includeMinggoWatermark?: boolean; // Optional MINGGO watermark on exported cards (disabled by default)
  defaultExportSize: string;
  autoSave: boolean;
}
