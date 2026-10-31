import { Template } from '../types';
import { 
  draw3DFloralEucalyptus,
  draw3DFloralPeony,
  draw3DFloralMidnightRose,
  draw3DFloralSunflower,
  draw3DFloralLily,
  draw3DFloralLavender,
  draw3DFloralOrchid,
  draw3DFloralSakura
} from '../utils/artworkEngines';

export const floralTemplates: Template[] = [
  // 1. MinGGo 3D Botanical Gold Eucalyptus
  {
    id: 'floral-eucalyptus',
    name: 'MinGGo 3D Botanical Gold Eucalyptus',
    category: 'floral',
    tags: ['botanical', 'eucalyptus', 'gold', 'sage', 'elegant', '3d balloons', 'cake'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#03140e', '#072b1e', '#020d09'],
      canvasBg: '#03140e',
      primary: '#34d399',
      secondary: '#fde047',
      accent: '#6ee7b7',
      textPrimary: '#ffffff',
      textSecondary: '#a7f3d0',
      textLight: '#ffffff',
      frameBorder: '#34d399',
      ribbonBg: '#065f46',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralEucalyptus(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Blush Peony & Pearls
  {
    id: 'floral-blush-peony',
    name: 'MinGGo 3D Blush Peony & Pearls',
    category: 'floral',
    tags: ['peony', 'blush', 'pearls', 'floral', 'pink', '3d balloons'],
    badge: 'Romantic',
    palette: {
      bgGradient: ['#170612', '#2b0c23', '#10030d'],
      canvasBg: '#170612',
      primary: '#f472b6',
      secondary: '#fef08a',
      accent: '#fbcfe8',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#9d174d',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralPeony(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Midnight Rose & Gold
  {
    id: 'floral-midnight-rose',
    name: 'MinGGo 3D Midnight Rose & Gold',
    category: 'floral',
    tags: ['rose', 'midnight', 'crimson', 'gold leaf', '3d balloons'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#17040a', '#2e0814', '#0f0206'],
      canvasBg: '#17040a',
      primary: '#e11d48',
      secondary: '#fde047',
      accent: '#fda4af',
      textPrimary: '#ffffff',
      textSecondary: '#fecdd3',
      textLight: '#ffffff',
      frameBorder: '#e11d48',
      ribbonBg: '#881337',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralMidnightRose(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Golden Sunflower Bloom
  {
    id: 'floral-sunflower',
    name: 'MinGGo 3D Golden Sunflower Bloom',
    category: 'floral',
    tags: ['sunflower', 'bloom', 'amber', 'golden', 'sunshine', '3d balloons'],
    badge: 'Vibrant',
    palette: {
      bgGradient: ['#140a02', '#261304', '#0d0601'],
      canvasBg: '#140a02',
      primary: '#facc15',
      secondary: '#f97316',
      accent: '#fef08a',
      textPrimary: '#ffffff',
      textSecondary: '#fde68a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#854d0e',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralSunflower(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Royal White Lily
  {
    id: 'floral-white-lily',
    name: 'MinGGo 3D Royal White Lily',
    category: 'floral',
    tags: ['lily', 'white', 'royal navy', 'pure', 'gold ribbons', '3d balloons'],
    badge: 'Pure Elegance',
    palette: {
      bgGradient: ['#050c17', '#0b1a33', '#03070f'],
      canvasBg: '#050c17',
      primary: '#60a5fa',
      secondary: '#ffffff',
      accent: '#fde047',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#60a5fa',
      ribbonBg: '#1e3a8a',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralLily(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Lavender & Starlight Diya
  {
    id: 'floral-lavender',
    name: 'MinGGo 3D Lavender & Starlight Diya',
    category: 'floral',
    tags: ['lavender', 'starlight', 'diya', 'purple', 'violet', '3d balloons'],
    badge: 'Soothing',
    palette: {
      bgGradient: ['#0c0417', '#1a082e', '#07020f'],
      canvasBg: '#0c0417',
      primary: '#a855f7',
      secondary: '#fde047',
      accent: '#d8b4fe',
      textPrimary: '#ffffff',
      textSecondary: '#e9d5ff',
      textLight: '#ffffff',
      frameBorder: '#a855f7',
      ribbonBg: '#581c87',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralLavender(ctx, width, height);
    },
  },

  // 7. MinGGo 3D Fuchsia Orchid Oasis
  {
    id: 'floral-tropical-orchid',
    name: 'MinGGo 3D Fuchsia Orchid Oasis',
    category: 'floral',
    tags: ['orchid', 'fuchsia', 'magenta', 'emerald', 'tropical', '3d balloons'],
    badge: 'Exotic',
    palette: {
      bgGradient: ['#170414', '#2d0827', '#0f020d'],
      canvasBg: '#170414',
      primary: '#d946ef',
      secondary: '#34d399',
      accent: '#f0abfc',
      textPrimary: '#ffffff',
      textSecondary: '#f5d0fe',
      textLight: '#ffffff',
      frameBorder: '#d946ef',
      ribbonBg: '#86198f',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralOrchid(ctx, width, height);
    },
  },

  // 8. MinGGo 3D Midnight Sakura Cherry Blossom
  {
    id: 'floral-sakura',
    name: 'MinGGo 3D Midnight Sakura Cherry Blossom',
    category: 'floral',
    tags: ['sakura', 'cherry blossom', 'japanese', 'pink', 'spring', '3d balloons'],
    badge: 'Delicate',
    palette: {
      bgGradient: ['#17050d', '#2c0b1a', '#0f0208'],
      canvasBg: '#17050d',
      primary: '#fb7185',
      secondary: '#fde047',
      accent: '#fecdd3',
      textPrimary: '#ffffff',
      textSecondary: '#ffe4e6',
      textLight: '#ffffff',
      frameBorder: '#fb7185',
      ribbonBg: '#9f1239',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DFloralSakura(ctx, width, height);
    },
  },
];
