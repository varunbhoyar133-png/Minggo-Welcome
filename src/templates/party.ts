import { Template } from '../types';
import { 
  draw3DPartyBollywood,
  draw3DPartyDisco,
  draw3DPartyFlamingo,
  draw3DPartyCircus,
  draw3DPartyCyberpunk,
  draw3DPartyHavana
} from '../utils/artworkEngines';

export const partyTemplates: Template[] = [
  // 1. MinGGo 3D Bollywood Dhamaka
  {
    id: 'party-bollywood',
    name: 'MinGGo 3D Bollywood Dhamaka',
    category: 'party',
    tags: ['bollywood', 'dhamaka', 'desi', 'saffron', 'gold', 'sparkler', '3d balloons', 'cake'],
    badge: 'Desi Dhamaka',
    palette: {
      bgGradient: ['#1c040d', '#330819', '#120208'],
      canvasBg: '#1c040d',
      primary: '#f59e0b',
      secondary: '#fde047',
      accent: '#f97316',
      textPrimary: '#ffffff',
      textSecondary: '#fecdd3',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
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
      draw3DPartyBollywood(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Retro Mirror Disco Ball
  {
    id: 'party-disco',
    name: 'MinGGo 3D Retro Mirror Disco Ball',
    category: 'party',
    tags: ['disco', 'disco ball', 'retro', 'groove', 'silver', 'sparkles', '3d balloons'],
    badge: 'Groove',
    palette: {
      bgGradient: ['#09090e', '#131321', '#050508'],
      canvasBg: '#09090e',
      primary: '#cbd5e1',
      secondary: '#a855f7',
      accent: '#ffffff',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#cbd5e1',
      ribbonBg: '#334155',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPartyDisco(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Tropical Neon Flamingo
  {
    id: 'party-flamingo',
    name: 'MinGGo 3D Tropical Neon Flamingo',
    category: 'party',
    tags: ['flamingo', 'tropical', 'neon', 'pink', 'palm', '3d balloons'],
    badge: 'Tropical',
    palette: {
      bgGradient: ['#170412', '#2e0824', '#0f020c'],
      canvasBg: '#170412',
      primary: '#ec4899',
      secondary: '#34d399',
      accent: '#f472b6',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#ec4899',
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
      draw3DPartyFlamingo(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Big Top Circus Carnival
  {
    id: 'party-circus',
    name: 'MinGGo 3D Big Top Circus Carnival',
    category: 'party',
    tags: ['circus', 'carnival', 'big top', 'funfair', 'red', 'gold', '3d balloons'],
    badge: 'Carnival',
    palette: {
      bgGradient: ['#140404', '#290808', '#0d0202'],
      canvasBg: '#140404',
      primary: '#ef4444',
      secondary: '#facc15',
      accent: '#fde047',
      textPrimary: '#ffffff',
      textSecondary: '#fecdd3',
      textLight: '#ffffff',
      frameBorder: '#ef4444',
      ribbonBg: '#991b1b',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPartyCircus(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Cyberpunk Neon Night
  {
    id: 'party-cyberneon',
    name: 'MinGGo 3D Cyberpunk Neon Night',
    category: 'party',
    tags: ['cyberpunk', 'laser', 'neon', 'cyan', 'magenta', 'synthwave', '3d balloons'],
    badge: 'Futuristic',
    palette: {
      bgGradient: ['#070414', '#110a30', '#04020c'],
      canvasBg: '#070414',
      primary: '#06b6d4',
      secondary: '#d946ef',
      accent: '#67e8f9',
      textPrimary: '#ffffff',
      textSecondary: '#a5f3fc',
      textLight: '#ffffff',
      frameBorder: '#06b6d4',
      ribbonBg: '#1e1b4b',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPartyCyberpunk(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Havana Tropical Fiesta
  {
    id: 'party-havana',
    name: 'MinGGo 3D Havana Tropical Fiesta',
    category: 'party',
    tags: ['havana', 'cuba', 'fiesta', 'sunset', 'amber', 'emerald', '3d balloons'],
    badge: 'Fiesta',
    palette: {
      bgGradient: ['#140803', '#291006', '#0d0502'],
      canvasBg: '#140803',
      primary: '#f97316',
      secondary: '#10b981',
      accent: '#fdba74',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#f97316',
      ribbonBg: '#9a3412',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPartyHavana(ctx, width, height);
    },
  },
];
