import fs from 'fs';
import path from 'path';

const kidsContent = `import { Template } from '../types';
import { 
  drawDinoSafariAdventure,
  drawAstronautGalaxy,
  drawSuperheroComic,
  drawUnicornRainbow,
  drawPirateTreasure,
  drawMermaidOcean,
  drawSpeedwayRace,
  drawWildSafari,
  drawFairyForest,
  drawMonsterBash
} from '../utils/artworkEngines';

export const kidsTemplates: Template[] = [
  // 1. Dino Safari Adventure
  {
    id: 'kids-dino',
    name: 'Dino Safari Adventure',
    category: 'kids',
    tags: ['dinosaur', 'jungle', 'safari', 'boys', 'green'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#143818', '#0d2410', '#071308'],
      canvasBg: '#143818',
      primary: '#4ade80',
      secondary: '#fbbf24',
      accent: '#22c55e',
      textPrimary: '#ffffff',
      textSecondary: '#bbf7d0',
      textLight: '#f0fdf4',
      frameBorder: '#22c55e',
      ribbonBg: '#15803d',
    },
    defaultFonts: {
      titleFont: 'Bungee',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Fredoka',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawDinoSafariAdventure(ctx, width, height);
    },
  },

  // 2. Little Astronaut Galaxy
  {
    id: 'kids-space',
    name: 'Little Astronaut Galaxy',
    category: 'kids',
    tags: ['space', 'astronaut', 'galaxy', 'rocket', 'stars'],
    badge: 'Trending',
    palette: {
      bgGradient: ['#060818', '#130f30', '#050212'],
      canvasBg: '#060818',
      primary: '#38bdf8',
      secondary: '#fb7185',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#f8fafc',
      frameBorder: '#38bdf8',
      ribbonBg: '#6366f1',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Fredoka',
      bodyFont: 'Inter',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawAstronautGalaxy(ctx, width, height);
    },
  },

  // 3. Superhero Comic Blast
  {
    id: 'kids-superhero',
    name: 'Superhero Comic Blast',
    category: 'kids',
    tags: ['superhero', 'comic', 'action', 'pow', 'bold'],
    badge: 'Hero Choice',
    palette: {
      bgGradient: ['#7f1d1d', '#991b1b', '#450a0a'],
      canvasBg: '#7f1d1d',
      primary: '#facc15',
      secondary: '#38bdf8',
      accent: '#ef4444',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#dc2626',
    },
    defaultFonts: {
      titleFont: 'Bungee',
      nameFont: 'Bungee',
      bodyFont: 'Montserrat',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawSuperheroComic(ctx, width, height);
    },
  },

  // 4. Magical Unicorn Rainbow
  {
    id: 'kids-unicorn',
    name: 'Magical Unicorn Rainbow',
    category: 'kids',
    tags: ['unicorn', 'rainbow', 'magic', 'pastel', 'girls'],
    badge: 'Favorite',
    palette: {
      bgGradient: ['#fdf2f8', '#fae8ff', '#e0f2fe'],
      canvasBg: '#fdf2f8',
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#d97706',
      textPrimary: '#4a044e',
      textSecondary: '#701a75',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#db2777',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Fredoka',
      bodyFont: 'Outfit',
      accentFont: 'Pacifico',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawUnicornRainbow(ctx, width, height);
    },
  },

  // 5. Pirate Treasure Quest
  {
    id: 'kids-pirate',
    name: 'Pirate Treasure Quest',
    category: 'kids',
    tags: ['pirate', 'treasure', 'island', 'ocean', 'ship'],
    palette: {
      bgGradient: ['#fef3c7', '#fde68a', '#d97706'],
      canvasBg: '#fef3c7',
      primary: '#b45309',
      secondary: '#0284c7',
      accent: '#dc2626',
      textPrimary: '#451a03',
      textSecondary: '#78350f',
      textLight: '#ffffff',
      frameBorder: '#b45309',
      ribbonBg: '#92400e',
    },
    defaultFonts: {
      titleFont: 'Cinzel',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Cinzel',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawPirateTreasure(ctx, width, height);
    },
  },

  // 6. Mermaid Ocean Kingdom
  {
    id: 'kids-underwater',
    name: 'Mermaid Ocean Kingdom',
    category: 'kids',
    tags: ['mermaid', 'ocean', 'underwater', 'pearl', 'sea'],
    badge: 'Magical',
    palette: {
      bgGradient: ['#0f766e', '#115e59', '#042f2e'],
      canvasBg: '#0f766e',
      primary: '#2dd4bf',
      secondary: '#f472b6',
      accent: '#fef08a',
      textPrimary: '#ffffff',
      textSecondary: '#ccfbf1',
      textLight: '#f0fdfa',
      frameBorder: '#2dd4bf',
      ribbonBg: '#0d9488',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Fredoka',
      bodyFont: 'Outfit',
      accentFont: 'Dancing Script',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawMermaidOcean(ctx, width, height);
    },
  },

  // 7. Speedway Grand Prix
  {
    id: 'kids-racecar',
    name: 'Speedway Grand Prix',
    category: 'kids',
    tags: ['racing', 'cars', 'checkered', 'speed', 'formula1'],
    palette: {
      bgGradient: ['#1e293b', '#0f172a', '#020617'],
      canvasBg: '#1e293b',
      primary: '#ef4444',
      secondary: '#f59e0b',
      accent: '#ffffff',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#ef4444',
      ribbonBg: '#dc2626',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Bungee',
      bodyFont: 'Inter',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawSpeedwayRace(ctx, width, height);
    },
  },

  // 8. Wild One Jungle Safari
  {
    id: 'kids-safari',
    name: 'Wild One Jungle Safari',
    category: 'kids',
    tags: ['safari', 'wildone', 'animals', 'lion', 'firstbirthday'],
    badge: '1st Birthday',
    palette: {
      bgGradient: ['#fefce8', '#fef9c3', '#fef08a'],
      canvasBg: '#fefce8',
      primary: '#65a30d',
      secondary: '#d97706',
      accent: '#ca8a04',
      textPrimary: '#3f2c1d',
      textSecondary: '#713f12',
      textLight: '#ffffff',
      frameBorder: '#65a30d',
      ribbonBg: '#4d7c0f',
    },
    defaultFonts: {
      titleFont: 'Fredoka',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Fredoka',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawWildSafari(ctx, width, height);
    },
  },

  // 9. Enchanted Fairy Forest
  {
    id: 'kids-fairy',
    name: 'Enchanted Fairy Forest',
    category: 'kids',
    tags: ['fairy', 'forest', 'magic', 'woodland', 'whimsical'],
    palette: {
      bgGradient: ['#1e1b4b', '#2e1065', '#0f172a'],
      canvasBg: '#1e1b4b',
      primary: '#e879f9',
      secondary: '#38bdf8',
      accent: '#fde047',
      textPrimary: '#ffffff',
      textSecondary: '#f5d0fe',
      textLight: '#ffffff',
      frameBorder: '#e879f9',
      ribbonBg: '#c026d3',
    },
    defaultFonts: {
      titleFont: 'Dancing Script',
      nameFont: 'Fredoka',
      bodyFont: 'Outfit',
      accentFont: 'Dancing Script',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawFairyForest(ctx, width, height);
    },
  },

  // 10. Cute Monster Bash
  {
    id: 'kids-monster',
    name: 'Cute Monster Bash',
    category: 'kids',
    tags: ['monsters', 'colorful', 'playful', 'party', 'funny'],
    palette: {
      bgGradient: ['#f0fdf4', '#dcfce7', '#bbf7d0'],
      canvasBg: '#f0fdf4',
      primary: '#16a34a',
      secondary: '#3b82f6',
      accent: '#f97316',
      textPrimary: '#14532d',
      textSecondary: '#166534',
      textLight: '#ffffff',
      frameBorder: '#16a34a',
      ribbonBg: '#15803d',
    },
    defaultFonts: {
      titleFont: 'Chewy',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Chewy',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawMonsterBash(ctx, width, height);
    },
  },
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/templates/kids.ts'), kidsContent, 'utf8');
console.log('Successfully updated src/templates/kids.ts');
