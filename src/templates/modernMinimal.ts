import { Template } from '../types';
import { 
  draw3DModernScandi,
  draw3DModernGlass,
  draw3DModernBauhaus,
  draw3DModernSwiss,
  draw3DModernSplit,
  draw3DModernBrutalist
} from '../utils/artworkEngines';

export const modernMinimalTemplates: Template[] = [
  // 1. MinGGo 3D Scandinavian Terracotta Arch
  {
    id: 'modern-scandi',
    name: 'MinGGo 3D Scandinavian Terracotta Arch',
    category: 'modern_minimal',
    tags: ['scandi', 'terracotta', 'arch', 'minimal', 'nordic', '3d balloons', 'cake'],
    badge: 'Nordic Style',
    palette: {
      bgGradient: ['#140804', '#261108', '#0c0401'],
      canvasBg: '#140804',
      primary: '#ea580c',
      secondary: '#fde047',
      accent: '#fdba74',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#ea580c',
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
      draw3DModernScandi(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Frosted Glass Prism
  {
    id: 'modern-glass',
    name: 'MinGGo 3D Frosted Glass Prism',
    category: 'modern_minimal',
    tags: ['frosted glass', 'glassmorphic', 'prism', 'iridescent', '3d balloons'],
    badge: 'Glassmorphism',
    palette: {
      bgGradient: ['#04121a', '#082333', '#020b10'],
      canvasBg: '#04121a',
      primary: '#38bdf8',
      secondary: '#f0abfc',
      accent: '#67e8f9',
      textPrimary: '#ffffff',
      textSecondary: '#bae6fd',
      textLight: '#ffffff',
      frameBorder: '#38bdf8',
      ribbonBg: '#0e7490',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DModernGlass(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Bauhaus Modernist
  {
    id: 'modern-bauhaus',
    name: 'MinGGo 3D Bauhaus Modernist',
    category: 'modern_minimal',
    tags: ['bauhaus', 'geometric', 'primary colors', 'modernist', '3d balloons'],
    badge: 'Avant-Garde',
    palette: {
      bgGradient: ['#120404', '#240808', '#0b0202'],
      canvasBg: '#120404',
      primary: '#ef4444',
      secondary: '#3b82f6',
      accent: '#f59e0b',
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
      draw3DModernBauhaus(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Swiss Typographic
  {
    id: 'modern-swiss',
    name: 'MinGGo 3D Swiss Typographic',
    category: 'modern_minimal',
    tags: ['swiss', 'typographic', 'bold', 'minimal', 'poster', 'red', 'black'],
    badge: 'Trending',
    palette: {
      bgGradient: ['#08080a', '#141418', '#040405'],
      canvasBg: '#08080a',
      primary: '#e11d48',
      secondary: '#ffffff',
      accent: '#cbd5e1',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#e11d48',
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
      draw3DModernSwiss(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Split Onyx & Sand
  {
    id: 'modern-monochrome',
    name: 'MinGGo 3D Split Onyx & Sand',
    category: 'modern_minimal',
    tags: ['split', 'duo', 'sand', 'onyx', 'minimal', '3d balloons'],
    badge: 'Minimal Duo',
    palette: {
      bgGradient: ['#0c0805', '#1a110a', '#060402'],
      canvasBg: '#0c0805',
      primary: '#f59e0b',
      secondary: '#ea580c',
      accent: '#fef08a',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
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
      draw3DModernSplit(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Brutalist Neon Geometry
  {
    id: 'modern-brutalist',
    name: 'MinGGo 3D Brutalist Neon Geometry',
    category: 'modern_minimal',
    tags: ['brutalist', 'neon', 'concrete', 'wireframe', 'edge', '3d balloons'],
    badge: 'Edgy',
    palette: {
      bgGradient: ['#070a0f', '#0f1724', '#040609'],
      canvasBg: '#070a0f',
      primary: '#06b6d4',
      secondary: '#ec4899',
      accent: '#22d3ee',
      textPrimary: '#ffffff',
      textSecondary: '#a5f3fc',
      textLight: '#ffffff',
      frameBorder: '#06b6d4',
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
      draw3DModernBrutalist(ctx, width, height);
    },
  },
];
