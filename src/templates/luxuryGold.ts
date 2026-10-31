import { Template } from '../types';
import { 
  draw3DLuxuryArtDeco,
  draw3DLuxuryVelvetShashtipoorthi,
  draw3DLuxuryEmerald,
  draw3DLuxuryStarlight,
  draw3DLuxuryBlackTie,
  draw3DLuxuryMarble,
  draw3DLuxurySilver25th,
  draw3DLuxuryGold50th
} from '../utils/artworkEngines';

export const luxuryGoldTemplates: Template[] = [
  // 1. MinGGo 3D Art Deco 1920s Gatsby
  {
    id: 'luxury-artdeco',
    name: 'MinGGo 3D Art Deco 1920s Gatsby',
    category: 'luxury_gold',
    tags: ['art deco', 'gatsby', '1920s', 'gold', 'black', 'geometric', '3d balloons', 'cake'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#090805', '#17140a', '#060503'],
      canvasBg: '#090805',
      primary: '#f59e0b',
      secondary: '#fde047',
      accent: '#fbbf24',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
      ribbonBg: '#78350f',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryArtDeco(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Royal Velvet 60th Shashtipoorthi
  {
    id: 'luxury-velvet',
    name: 'MinGGo 3D Royal Velvet 60th Shashtipoorthi',
    category: 'luxury_gold',
    tags: ['shashtipoorthi', '60th', 'royal', 'velvet', 'traditional', 'maroon', '3d diya'],
    badge: 'Milestone 60th',
    palette: {
      bgGradient: ['#1a040a', '#310813', '#120207'],
      canvasBg: '#1a040a',
      primary: '#e11d48',
      secondary: '#fde047',
      accent: '#facc15',
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
      draw3DLuxuryVelvetShashtipoorthi(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Malachite & 24K Gold
  {
    id: 'luxury-emerald',
    name: 'MinGGo 3D Malachite & 24K Gold',
    category: 'luxury_gold',
    tags: ['emerald', 'malachite', 'gold', 'palace', 'luxury', '3d balloons'],
    badge: 'Regal',
    palette: {
      bgGradient: ['#02120b', '#05291a', '#010c07'],
      canvasBg: '#02120b',
      primary: '#10b981',
      secondary: '#fde047',
      accent: '#34d399',
      textPrimary: '#ffffff',
      textSecondary: '#a7f3d0',
      textLight: '#ffffff',
      frameBorder: '#10b981',
      ribbonBg: '#064e3b',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryEmerald(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Starlight Gala Oscar
  {
    id: 'luxury-starlight',
    name: 'MinGGo 3D Starlight Gala Oscar',
    category: 'luxury_gold',
    tags: ['starlight', 'gala', 'oscar', 'red carpet', 'vip', '3d balloons'],
    badge: 'VIP Event',
    palette: {
      bgGradient: ['#070709', '#141217', '#050406'],
      canvasBg: '#070709',
      primary: '#facc15',
      secondary: '#ffffff',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#e2e8f0',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#451a03',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryStarlight(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Black Tie Tuxedo
  {
    id: 'luxury-blacktie',
    name: 'MinGGo 3D Black Tie Tuxedo',
    category: 'luxury_gold',
    tags: ['black tie', 'tuxedo', 'suit', 'gentleman', 'sleek', '3d balloons'],
    badge: 'Sleek',
    palette: {
      bgGradient: ['#08080a', '#141418', '#040405'],
      canvasBg: '#08080a',
      primary: '#eab308',
      secondary: '#cbd5e1',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#eab308',
      ribbonBg: '#0f172a',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryBlackTie(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Gold Veined Onyx Marble
  {
    id: 'luxury-marble',
    name: 'MinGGo 3D Gold Veined Onyx Marble',
    category: 'luxury_gold',
    tags: ['marble', 'onyx', 'gold veins', 'italian', 'texture', '3d balloons'],
    badge: 'Prestige',
    palette: {
      bgGradient: ['#09090b', '#18181d', '#050506'],
      canvasBg: '#09090b',
      primary: '#f59e0b',
      secondary: '#94a3b8',
      accent: '#fbbf24',
      textPrimary: '#ffffff',
      textSecondary: '#e2e8f0',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
      ribbonBg: '#1e293b',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryMarble(ctx, width, height);
    },
  },

  // 7. MinGGo 3D Silver Jubilee 25th Milestone
  {
    id: 'luxury-silver-25th',
    name: 'MinGGo 3D Silver Jubilee 25th Milestone',
    category: 'luxury_gold',
    tags: ['silver jubilee', '25th', 'sterling silver', 'navy', 'milestone', '3d balloons'],
    badge: 'Milestone 25th',
    palette: {
      bgGradient: ['#060c17', '#0e1c36', '#03070f'],
      canvasBg: '#060c17',
      primary: '#cbd5e1',
      secondary: '#38bdf8',
      accent: '#ffffff',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      textLight: '#ffffff',
      frameBorder: '#cbd5e1',
      ribbonBg: '#1e293b',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxurySilver25th(ctx, width, height);
    },
  },

  // 8. MinGGo 3D Golden Jubilee 50th Milestone
  {
    id: 'luxury-gold-50th',
    name: 'MinGGo 3D Golden Jubilee 50th Milestone',
    category: 'luxury_gold',
    tags: ['golden jubilee', '50th', '24k gold', 'radiance', 'milestone', '3d balloons'],
    badge: 'Milestone 50th',
    palette: {
      bgGradient: ['#120802', '#261205', '#0b0401'],
      canvasBg: '#120802',
      primary: '#facc15',
      secondary: '#f97316',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#713f12',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DLuxuryGold50th(ctx, width, height);
    },
  },
];
