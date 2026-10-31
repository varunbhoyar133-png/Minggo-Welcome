import { Template } from '../types';
import { 
  draw3DKidsDino,
  draw3DKidsSpace,
  draw3DKidsSuperhero,
  draw3DKidsUnicorn,
  draw3DKidsPirate,
  draw3DKidsOcean,
  draw3DKidsRacecar,
  draw3DKidsSafari,
  draw3DKidsFairy,
  draw3DKidsMonster
} from '../utils/artworkEngines';

export const kidsTemplates: Template[] = [
  // 1. MinGGo 3D Dino Safari Party
  {
    id: 'kids-dino',
    name: 'MinGGo 3D Dino Safari Party',
    category: 'kids',
    tags: ['dino', 'safari', 'jurassic', 'green', 'boys', '3d balloons', 'cake'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#051c0f', '#092d19', '#031209'],
      canvasBg: '#051c0f',
      primary: '#22c55e',
      secondary: '#facc15',
      accent: '#4ade80',
      textPrimary: '#ffffff',
      textSecondary: '#86efac',
      textLight: '#ffffff',
      frameBorder: '#22c55e',
      ribbonBg: '#15803d',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DKidsDino(ctx, width, height);
    },
  },

  // 2. MinGGo 3D Cosmic Space Explorer
  {
    id: 'kids-space',
    name: 'MinGGo 3D Cosmic Space Explorer',
    category: 'kids',
    tags: ['space', 'astronaut', 'galaxy', 'rocket', 'stars', '3d balloons'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#030712', '#0f172a', '#020617'],
      canvasBg: '#030712',
      primary: '#38bdf8',
      secondary: '#facc15',
      accent: '#60a5fa',
      textPrimary: '#ffffff',
      textSecondary: '#bae6fd',
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
      draw3DKidsSpace(ctx, width, height);
    },
  },

  // 3. MinGGo 3D Superhero Power
  {
    id: 'kids-superhero',
    name: 'MinGGo 3D Superhero Power',
    category: 'kids',
    tags: ['superhero', 'comic', 'action', 'red', 'gold', '3d balloons'],
    badge: 'Action',
    palette: {
      bgGradient: ['#1c0407', '#33080e', '#120204'],
      canvasBg: '#1c0407',
      primary: '#ef4444',
      secondary: '#facc15',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#fecdd3',
      textLight: '#ffffff',
      frameBorder: '#ef4444',
      ribbonBg: '#b91c1c',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DKidsSuperhero(ctx, width, height);
    },
  },

  // 4. MinGGo 3D Magical Unicorn Fantasy
  {
    id: 'kids-unicorn',
    name: 'MinGGo 3D Magical Unicorn Fantasy',
    category: 'kids',
    tags: ['unicorn', 'rainbow', 'magical', 'pink', 'girls', '3d balloons'],
    badge: 'Magical',
    palette: {
      bgGradient: ['#1c0819', '#330d2e', '#120410'],
      canvasBg: '#1c0819',
      primary: '#f472b6',
      secondary: '#67e8f9',
      accent: '#fde047',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#c026d3',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DKidsUnicorn(ctx, width, height);
    },
  },

  // 5. MinGGo 3D Pirate Treasure Voyage
  {
    id: 'kids-pirate',
    name: 'MinGGo 3D Pirate Treasure Voyage',
    category: 'kids',
    tags: ['pirate', 'treasure', 'ocean', 'gold coins', '3d balloons'],
    badge: 'Adventure',
    palette: {
      bgGradient: ['#120803', '#241208', '#0b0401'],
      canvasBg: '#120803',
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#fbbf24',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
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
      draw3DKidsPirate(ctx, width, height);
    },
  },

  // 6. MinGGo 3D Ocean Adventure
  {
    id: 'kids-underwater',
    name: 'MinGGo 3D Ocean Adventure',
    category: 'kids',
    tags: ['underwater', 'ocean', 'sea turtle', 'marine', 'aqua', '3d balloons'],
    badge: 'Splashing',
    palette: {
      bgGradient: ['#02121c', '#062638', '#010b12'],
      canvasBg: '#02121c',
      primary: '#06b6d4',
      secondary: '#38bdf8',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#a5f3fc',
      textLight: '#ffffff',
      frameBorder: '#06b6d4',
      ribbonBg: '#0891b2',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DKidsOcean(ctx, width, height);
    },
  },

  // 7. MinGGo 3D Speed Champion Racecar
  {
    id: 'kids-racecar',
    name: 'MinGGo 3D Speed Champion Racecar',
    category: 'kids',
    tags: ['racecar', 'speed', 'formula', 'track', 'racing', '3d balloons'],
    badge: 'Turbo',
    palette: {
      bgGradient: ['#170503', '#2e0a05', '#0f0201'],
      canvasBg: '#170503',
      primary: '#f97316',
      secondary: '#facc15',
      accent: '#ef4444',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
      textLight: '#ffffff',
      frameBorder: '#f97316',
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
      draw3DKidsRacecar(ctx, width, height);
    },
  },

  // 8. MinGGo 3D Jungle Kingdom Safari
  {
    id: 'kids-safari',
    name: 'MinGGo 3D Jungle Kingdom Safari',
    category: 'kids',
    tags: ['jungle', 'safari', 'lion', 'wildlife', 'savannah', '3d balloons'],
    badge: 'Wild Safari',
    palette: {
      bgGradient: ['#120c02', '#241804', '#0a0601'],
      canvasBg: '#120c02',
      primary: '#eab308',
      secondary: '#22c55e',
      accent: '#f59e0b',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#eab308',
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
      draw3DKidsSafari(ctx, width, height);
    },
  },

  // 9. MinGGo 3D Enchanted Fairy Garden
  {
    id: 'kids-fairy',
    name: 'MinGGo 3D Enchanted Fairy Garden',
    category: 'kids',
    tags: ['fairy', 'enchanted', 'garden', 'magic', 'sparkles', '3d balloons'],
    badge: 'Charming',
    palette: {
      bgGradient: ['#180614', '#2d0c26', '#10030d'],
      canvasBg: '#180614',
      primary: '#ec4899',
      secondary: '#a855f7',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#fbcfe8',
      textLight: '#ffffff',
      frameBorder: '#ec4899',
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
      draw3DKidsFairy(ctx, width, height);
    },
  },

  // 10. MinGGo 3D Friendly Monster Bash
  {
    id: 'kids-monster',
    name: 'MinGGo 3D Friendly Monster Bash',
    category: 'kids',
    tags: ['monster', 'bash', 'fun', 'purple', 'playful', '3d balloons'],
    badge: 'Party Bash',
    palette: {
      bgGradient: ['#0f051c', '#1d0b36', '#090212'],
      canvasBg: '#0f051c',
      primary: '#a855f7',
      secondary: '#06b6d4',
      accent: '#fb923c',
      textPrimary: '#ffffff',
      textSecondary: '#e9d5ff',
      textLight: '#ffffff',
      frameBorder: '#a855f7',
      ribbonBg: '#7e22ce',
    },
    defaultFonts: {
      titleFont: 'Caveat',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      draw3DKidsMonster(ctx, width, height);
    },
  },
];
