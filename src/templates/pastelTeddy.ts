import { Template } from '../types';
import { 
  draw3DPastelTeddy,
  draw3DPastelCloudDream,
  draw3DPastelPrince,
  draw3DPastelPrincess,
  draw3DPastelHotAir,
  draw3DPastelBunny,
  draw3DPastelSweetLamb,
  draw3DPastelCarousel
} from '../utils/artworkEngines';

export const pastelTeddyTemplates: Template[] = [
  // 1. MinGGo 3D Cuddle Teddy Bear
  {
    id: 'teddy-classic',
    name: 'MinGGo 3D Cuddle Teddy Bear',
    category: 'pastel_teddy',
    tags: ['teddy', 'bear', 'cuddle', 'baby boy', 'cream', '3d balloons', 'cake'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#120904', '#261408', '#0d0603'],
      canvasBg: '#120904',
      primary: '#f59e0b',
      secondary: '#fed7aa',
      accent: '#fbbf24',
      textPrimary: '#ffffff',
      textSecondary: '#fde68a',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
      ribbonBg: '#b45309',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelTeddy(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Baby Saanvi Cloud Dream
  {
    id: 'pastel-baby-dream',
    name: 'MinGGo 3D Baby Saanvi Cloud Dream',
    category: 'pastel_teddy',
    tags: ['baby girl', 'cloud', 'dream', 'blush', '1st birthday', '3d balloons'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#170712', '#2b0d21', '#10040c'],
      canvasBg: '#170712',
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
      draw3DPastelCloudDream(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Little Prince Crown
  {
    id: 'pastel-prince',
    name: 'MinGGo 3D Little Prince Crown',
    category: 'pastel_teddy',
    tags: ['prince', 'crown', 'royal', 'baby boy', 'blue', 'gold', '3d balloons'],
    badge: 'Royal Baby',
    palette: {
      bgGradient: ['#030b17', '#081a33', '#02070f'],
      canvasBg: '#030b17',
      primary: '#60a5fa',
      secondary: '#facc15',
      accent: '#93c5fd',
      textPrimary: '#ffffff',
      textSecondary: '#bfdbfe',
      textLight: '#ffffff',
      frameBorder: '#60a5fa',
      ribbonBg: '#1d4ed8',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelPrince(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Little Princess Tiara
  {
    id: 'pastel-princess',
    name: 'MinGGo 3D Little Princess Tiara',
    category: 'pastel_teddy',
    tags: ['princess', 'tiara', 'gold', 'pink', 'royal', '3d balloons'],
    badge: 'Precious',
    palette: {
      bgGradient: ['#1a0614', '#2e0a24', '#12030e'],
      canvasBg: '#1a0614',
      primary: '#f472b6',
      secondary: '#fde047',
      accent: '#ec4899',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#db2777',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelPrincess(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Pastel Hot Air Balloon
  {
    id: 'pastel-balloon',
    name: 'MinGGo 3D Pastel Hot Air Balloon',
    category: 'pastel_teddy',
    tags: ['hot air balloon', 'adventure', 'clouds', 'pastel', '3d balloons'],
    badge: 'Whimsical',
    palette: {
      bgGradient: ['#140803', '#261108', '#0c0401'],
      canvasBg: '#140803',
      primary: '#fb923c',
      secondary: '#67e8f9',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#fb923c',
      ribbonBg: '#c2410c',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelHotAir(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Woodland Bunny Meadow
  {
    id: 'teddy-bunny',
    name: 'MinGGo 3D Woodland Bunny Meadow',
    category: 'pastel_teddy',
    tags: ['bunny', 'woodland', 'sage', 'meadow', 'cute', '3d balloons'],
    badge: 'Gentle',
    palette: {
      bgGradient: ['#03140e', '#07261b', '#020d09'],
      canvasBg: '#03140e',
      primary: '#34d399',
      secondary: '#f472b6',
      accent: '#a7f3d0',
      textPrimary: '#ffffff',
      textSecondary: '#a7f3d0',
      textLight: '#ffffff',
      frameBorder: '#34d399',
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
      draw3DPastelBunny(ctx, width, height);
    },
  },

  // 7. MinGGo 3D Sweet Dreams Lamb
  {
    id: 'pastel-lamb',
    name: 'MinGGo 3D Sweet Dreams Lamb',
    category: 'pastel_teddy',
    tags: ['lamb', 'stars', 'moon', 'sleepy', 'lavender', '3d balloons'],
    badge: 'Serene',
    palette: {
      bgGradient: ['#0d0417', '#1a092e', '#08020f'],
      canvasBg: '#0d0417',
      primary: '#a855f7',
      secondary: '#fde047',
      accent: '#c084fc',
      textPrimary: '#ffffff',
      textSecondary: '#e9d5ff',
      textLight: '#ffffff',
      frameBorder: '#a855f7',
      ribbonBg: '#6b21a8',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelSweetLamb(ctx, width, height);
    },
  },

  // 8. MinGGo 3D Golden Vintage Carousel
  {
    id: 'pastel-carousel',
    name: 'MinGGo 3D Golden Vintage Carousel',
    category: 'pastel_teddy',
    tags: ['carousel', 'vintage', 'carnival', 'gold', 'cream', '3d balloons'],
    badge: 'Vintage',
    palette: {
      bgGradient: ['#120803', '#241007', '#0b0401'],
      canvasBg: '#120803',
      primary: '#facc15',
      secondary: '#f472b6',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#b45309',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DPastelCarousel(ctx, width, height);
    },
  },
];
