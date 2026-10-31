import { Template } from '../types';
import { 
  draw3DMinGGoRoyaleScene,
  draw3DMidnightBalloons,
  draw3DRoseGoldBalloons,
  draw3DEmeraldGoldBalloons,
  draw3DSilverChromeBalloons,
  draw3DRubyRoyaleBalloons,
  draw3DNeonCyberBalloons,
  draw3DSunsetPeachBalloons
} from '../utils/artworkEngines';

export const balloonTemplates: Template[] = [
  // 1. MinGGo 3D Black & Gold Royale (Official Reference Design)
  {
    id: 'balloons-minggo-royale',
    name: 'MinGGo 3D Black & Gold Royale',
    category: 'balloons',
    tags: ['minggo', 'black and gold', '3d balloons', 'cake', 'diya', 'luxury', 'festive'],
    badge: '★ MinGGo Signature',
    palette: {
      bgGradient: ['#070709', '#141216', '#09080b'],
      canvasBg: '#070709',
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
      ribbonBg: '#ea580c',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DMinGGoRoyaleScene(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Midnight Navy & Gold
  {
    id: 'balloons-midnight',
    name: 'MinGGo 3D Midnight Navy & Gold',
    category: 'balloons',
    tags: ['midnight', 'navy', 'gold', '3d balloons', 'celestial', 'royal'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#030712', '#0f172a', '#020617'],
      canvasBg: '#030712',
      primary: '#38bdf8',
      secondary: '#fde047',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      textLight: '#ffffff',
      frameBorder: '#38bdf8',
      ribbonBg: '#0284c7',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DMidnightBalloons(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Rose Gold Glamour
  {
    id: 'balloons-rosegold',
    name: 'MinGGo 3D Rose Gold Glamour',
    category: 'balloons',
    tags: ['rose gold', 'glitz', 'metallic', 'luxury', 'champagne', 'pink'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#1c0c16', '#2d1223', '#13060f'],
      canvasBg: '#1c0c16',
      primary: '#f472b6',
      secondary: '#fef08a',
      accent: '#fb7185',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#be185d',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DRoseGoldBalloons(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Imperial Emerald & Gold
  {
    id: 'balloons-emerald',
    name: 'MinGGo 3D Imperial Emerald & Gold',
    category: 'balloons',
    tags: ['emerald', 'green', 'gold', 'royal', 'velvet', 'luxury'],
    badge: 'Royal',
    palette: {
      bgGradient: ['#03140e', '#062c1f', '#02100b'],
      canvasBg: '#03140e',
      primary: '#10b981',
      secondary: '#facc15',
      accent: '#34d399',
      textPrimary: '#ffffff',
      textSecondary: '#a7f3d0',
      textLight: '#ffffff',
      frameBorder: '#10b981',
      ribbonBg: '#047857',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DEmeraldGoldBalloons(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Platinum Silver Chrome
  {
    id: 'balloons-silver',
    name: 'MinGGo 3D Platinum Silver Chrome',
    category: 'balloons',
    tags: ['silver', 'platinum', 'chrome', 'black tie', 'modern'],
    badge: 'Classy',
    palette: {
      bgGradient: ['#09090b', '#18181b', '#040405'],
      canvasBg: '#09090b',
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#cbd5e1',
      ribbonBg: '#475569',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DSilverChromeBalloons(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Royal Ruby & Gold
  {
    id: 'balloons-ruby',
    name: 'MinGGo 3D Royal Ruby & Gold',
    category: 'balloons',
    tags: ['ruby', 'crimson', 'gold', 'majestic', 'celebration'],
    badge: 'Trending',
    palette: {
      bgGradient: ['#1a050b', '#330a16', '#140308'],
      canvasBg: '#1a050b',
      primary: '#f43f5e',
      secondary: '#facc15',
      accent: '#fb7185',
      textPrimary: '#ffffff',
      textSecondary: '#fecdd3',
      textLight: '#ffffff',
      frameBorder: '#f43f5e',
      ribbonBg: '#be123c',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DRubyRoyaleBalloons(ctx, width, height);
    },
  },

  // 7. MinGGo 3D Cyberpunk Neon Fiesta
  {
    id: 'balloons-neon',
    name: 'MinGGo 3D Cyberpunk Neon Fiesta',
    category: 'balloons',
    tags: ['neon', 'balloons', 'glow', 'party', 'vibrant', 'magenta', 'cyan'],
    badge: 'Electric',
    palette: {
      bgGradient: ['#0b071a', '#1e113b', '#070412'],
      canvasBg: '#0b071a',
      primary: '#d946ef',
      secondary: '#06b6d4',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#67e8f9',
      textLight: '#ffffff',
      frameBorder: '#ec4899',
      ribbonBg: '#d946ef',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DNeonCyberBalloons(ctx, width, height);
    },
  },

  // 8. MinGGo 3D Sunset Peach & Amber
  {
    id: 'balloons-sunset',
    name: 'MinGGo 3D Sunset Peach & Amber',
    category: 'balloons',
    tags: ['sunset', 'peach', 'amber', 'coral', 'warm glow'],
    badge: 'Warm Glow',
    palette: {
      bgGradient: ['#1a0c0a', '#2e1511', '#120706'],
      canvasBg: '#1a0c0a',
      primary: '#f97316',
      secondary: '#fde047',
      accent: '#fb923c',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#f97316',
      ribbonBg: '#ea580c',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DSunsetPeachBalloons(ctx, width, height);
    },
  },
];
