import fs from 'fs';
import path from 'path';

// 1. Upgrade pastelTeddy.ts
const pastelTeddyContent = `import { Template } from '../types';
import { 
  drawClassicTeddy,
  drawBabyDreamCloud,
  drawBunnyMeadow,
  drawRoyalPrince,
  drawRoyalPrincess,
  drawHotAirBalloonArt,
  drawBabyLamb,
  drawVintageCarousel
} from '../utils/artworkEngines';

export const pastelTeddyTemplates: Template[] = [
  // 11. Classic Teddy Bear & Moon
  {
    id: 'teddy-classic',
    name: 'Classic Teddy & Moon',
    category: 'pastel_teddy',
    tags: ['teddy', 'bear', 'moon', 'stars', 'baby boy', 'cream', 'blue'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#f8fafc', '#e0f2fe', '#bae6fd'],
      canvasBg: '#f8fafc',
      primary: '#0284c7',
      secondary: '#ca8a04',
      accent: '#facc15',
      textPrimary: '#0f172a',
      textSecondary: '#0369a1',
      textLight: '#ffffff',
      frameBorder: '#38bdf8',
      ribbonBg: '#0284c7',
    },
    defaultFonts: {
      titleFont: 'Fredoka',
      nameFont: 'Great Vibes',
      bodyFont: 'Poppins',
      accentFont: 'Fredoka',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawClassicTeddy(ctx, width, height);
    },
  },

  // 12. Soft Pastel Baby Dream
  {
    id: 'pastel-baby-dream',
    name: 'Soft Pastel Baby Dream',
    category: 'pastel_teddy',
    tags: ['pastel', 'clouds', 'gentle', 'dreamy', 'baby', 'yellow', 'blush'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#fffbeb', '#fef3c7', '#fde68a'],
      canvasBg: '#fffbeb',
      primary: '#d97706',
      secondary: '#ec4899',
      accent: '#f59e0b',
      textPrimary: '#451a03',
      textSecondary: '#92400e',
      textLight: '#ffffff',
      frameBorder: '#f59e0b',
      ribbonBg: '#d97706',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Pacifico',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawBabyDreamCloud(ctx, width, height);
    },
  },

  // 13. Sweet Bunny Meadow
  {
    id: 'teddy-bunny',
    name: 'Sweet Bunny Meadow',
    category: 'pastel_teddy',
    tags: ['bunny', 'rabbit', 'floral', 'spring', 'meadow', 'blush pink', 'green'],
    palette: {
      bgGradient: ['#fdf2f8', '#fce7f3', '#fbcfe8'],
      canvasBg: '#fdf2f8',
      primary: '#db2777',
      secondary: '#059669',
      accent: '#ec4899',
      textPrimary: '#831843',
      textSecondary: '#9d174d',
      textLight: '#ffffff',
      frameBorder: '#f472b6',
      ribbonBg: '#db2777',
    },
    defaultFonts: {
      titleFont: 'Dancing Script',
      nameFont: 'Fredoka',
      bodyFont: 'Poppins',
      accentFont: 'Dancing Script',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawBunnyMeadow(ctx, width, height);
    },
  },

  // 14. Royal Baby Prince
  {
    id: 'pastel-prince',
    name: 'Royal Baby Prince',
    category: 'pastel_teddy',
    tags: ['prince', 'royal', 'crown', 'baby boy', 'powder blue', 'gold'],
    badge: 'Royal Choice',
    palette: {
      bgGradient: ['#f0f9ff', '#e0f2fe', '#bae6fd'],
      canvasBg: '#f0f9ff',
      primary: '#0284c7',
      secondary: '#ca8a04',
      accent: '#d4af37',
      textPrimary: '#0c4a6e',
      textSecondary: '#0369a1',
      textLight: '#ffffff',
      frameBorder: '#d4af37',
      ribbonBg: '#0284c7',
    },
    defaultFonts: {
      titleFont: 'Cinzel',
      nameFont: 'Great Vibes',
      bodyFont: 'Montserrat',
      accentFont: 'Cinzel',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawRoyalPrince(ctx, width, height);
    },
  },

  // 15. Royal Baby Princess
  {
    id: 'pastel-princess',
    name: 'Royal Baby Princess',
    category: 'pastel_teddy',
    tags: ['princess', 'tiara', 'royal', 'baby girl', 'rose gold', 'blush pink'],
    palette: {
      bgGradient: ['#fff1f2', '#ffe4e6', '#fecdd3'],
      canvasBg: '#fff1f2',
      primary: '#e11d48',
      secondary: '#ca8a04',
      accent: '#fb7185',
      textPrimary: '#881337',
      textSecondary: '#9f1239',
      textLight: '#ffffff',
      frameBorder: '#fb7185',
      ribbonBg: '#e11d48',
    },
    defaultFonts: {
      titleFont: 'Cinzel',
      nameFont: 'Great Vibes',
      bodyFont: 'Montserrat',
      accentFont: 'Cinzel',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawRoyalPrincess(ctx, width, height);
    },
  },

  // 16. Hot Air Balloon Adventure
  {
    id: 'pastel-balloon',
    name: 'Hot Air Balloon Adventure',
    category: 'pastel_teddy',
    tags: ['hot air balloon', 'clouds', 'adventure', 'whimsical', 'pastel'],
    palette: {
      bgGradient: ['#f0fdfa', '#ccfbf1', '#99f6e4'],
      canvasBg: '#f0fdfa',
      primary: '#0d9488',
      secondary: '#f59e0b',
      accent: '#14b8a6',
      textPrimary: '#134e4a',
      textSecondary: '#115e59',
      textLight: '#ffffff',
      frameBorder: '#14b8a6',
      ribbonBg: '#0d9488',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Fredoka',
      bodyFont: 'Outfit',
      accentFont: 'Pacifico',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawHotAirBalloonArt(ctx, width, height);
    },
  },

  // 17. Gentle Baby Lamb
  {
    id: 'pastel-lamb',
    name: 'Gentle Baby Lamb',
    category: 'pastel_teddy',
    tags: ['lamb', 'sheep', 'nursery', 'soft', 'sage', 'cream'],
    palette: {
      bgGradient: ['#f7fee7', '#ecfccb', '#d9f99d'],
      canvasBg: '#f7fee7',
      primary: '#4d7c0f',
      secondary: '#d97706',
      accent: '#65a30d',
      textPrimary: '#365314',
      textSecondary: '#4d7c0f',
      textLight: '#ffffff',
      frameBorder: '#84cc16',
      ribbonBg: '#4d7c0f',
    },
    defaultFonts: {
      titleFont: 'Fredoka',
      nameFont: 'Fredoka',
      bodyFont: 'Poppins',
      accentFont: 'Fredoka',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawBabyLamb(ctx, width, height);
    },
  },

  // 18. Vintage Carousel Romance
  {
    id: 'pastel-carousel',
    name: 'Vintage Carousel Romance',
    category: 'pastel_teddy',
    tags: ['carousel', 'carnival', 'horse', 'vintage', 'fairytale', 'gold'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#fff7ed', '#ffedd5', '#fed7aa'],
      canvasBg: '#fff7ed',
      primary: '#c2410c',
      secondary: '#ca8a04',
      accent: '#ea580c',
      textPrimary: '#7c2d12',
      textSecondary: '#9a3412',
      textLight: '#ffffff',
      frameBorder: '#fb923c',
      ribbonBg: '#c2410c',
    },
    defaultFonts: {
      titleFont: 'Playfair Display',
      nameFont: 'Great Vibes',
      bodyFont: 'Montserrat',
      accentFont: 'Playfair Display',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawVintageCarousel(ctx, width, height);
    },
  },
];
`;
fs.writeFileSync(path.join(process.cwd(), 'src/templates/pastelTeddy.ts'), pastelTeddyContent, 'utf8');

// 2. Upgrade balloons.ts
const balloonsContent = `import { Template } from '../types';
import { 
  drawNeonBalloons,
  drawRoseGoldBalloons,
  drawMidnightBalloons,
  drawPastelRainbowBalloons,
  drawSilverFoilBalloons,
  drawGoldenHeliumBalloons,
  drawConfettiBurst,
  drawBokehLights
} from '../utils/artworkEngines';

export const balloonTemplates: Template[] = [
  // 19. Neon Balloon Fiesta
  {
    id: 'balloons-neon',
    name: 'Neon Balloon Fiesta',
    category: 'balloons',
    tags: ['neon', 'balloons', 'glow', 'party', 'vibrant', 'magenta', 'cyan'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#1e1b4b', '#2e1065', '#0f172a'],
      canvasBg: '#1e1b4b',
      primary: '#ec4899',
      secondary: '#06b6d4',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#67e8f9',
      textLight: '#ffffff',
      frameBorder: '#ec4899',
      ribbonBg: '#d946ef',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawNeonBalloons(ctx, width, height);
    },
  },

  // 20. Rose Gold Glamour & Balloons
  {
    id: 'balloons-rosegold',
    name: 'Rose Gold Glamour',
    category: 'balloons',
    tags: ['rose gold', 'glitz', 'metallic', 'luxury', 'champagne', 'pink'],
    badge: 'Best Seller',
    palette: {
      bgGradient: ['#2a1820', '#1c1016', '#12080e'],
      canvasBg: '#2a1820',
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
      titleFont: 'Playfair Display',
      nameFont: 'Great Vibes',
      bodyFont: 'Montserrat',
      accentFont: 'Playfair Display',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawRoseGoldBalloons(ctx, width, height);
    },
  },

  // 21. Midnight Blue Celestial Balloons
  {
    id: 'balloons-midnight',
    name: 'Midnight Blue Balloon Gala',
    category: 'balloons',
    tags: ['midnight', 'navy', 'gold balloons', 'stars', 'elegant', 'royal'],
    badge: 'Classy',
    palette: {
      bgGradient: ['#0f172a', '#1e293b', '#020617'],
      canvasBg: '#0f172a',
      primary: '#facc15',
      secondary: '#94a3b8',
      accent: '#eab308',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#1e3a8a',
    },
    defaultFonts: {
      titleFont: 'Cinzel',
      nameFont: 'Playfair Display',
      bodyFont: 'Montserrat',
      accentFont: 'Cinzel',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawMidnightBalloons(ctx, width, height);
    },
  },

  // 22. Pastel Rainbow Balloon Cascade
  {
    id: 'balloons-rainbow',
    name: 'Pastel Rainbow Balloon Cascade',
    category: 'balloons',
    tags: ['pastel', 'rainbow', 'balloon garland', 'macaron', 'whimsical'],
    palette: {
      bgGradient: ['#faf5ff', '#f3e8ff', '#e9d5ff'],
      canvasBg: '#faf5ff',
      primary: '#9333ea',
      secondary: '#06b6d4',
      accent: '#ec4899',
      textPrimary: '#581c87',
      textSecondary: '#6b21a8',
      textLight: '#ffffff',
      frameBorder: '#c084fc',
      ribbonBg: '#9333ea',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Fredoka',
      bodyFont: 'Outfit',
      accentFont: 'Pacifico',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawPastelRainbowBalloons(ctx, width, height);
    },
  },

  // 23. Silver Foil Balloon Shimmer
  {
    id: 'balloons-silver',
    name: 'Silver Foil Balloon Shimmer',
    category: 'balloons',
    tags: ['silver', 'foil', 'chrome', 'monochrome', 'sleek', 'modern'],
    palette: {
      bgGradient: ['#18181b', '#27272a', '#09090b'],
      canvasBg: '#18181b',
      primary: '#e4e4e7',
      secondary: '#a1a1aa',
      accent: '#ffffff',
      textPrimary: '#ffffff',
      textSecondary: '#d4d4d8',
      textLight: '#ffffff',
      frameBorder: '#a1a1aa',
      ribbonBg: '#3f3f46',
    },
    defaultFonts: {
      titleFont: 'Oswald',
      nameFont: 'Great Vibes',
      bodyFont: 'Inter',
      accentFont: 'Oswald',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawSilverFoilBalloons(ctx, width, height);
    },
  },

  // 24. Golden Helium Celebration
  {
    id: 'balloons-golden',
    name: 'Golden Helium Celebration',
    category: 'balloons',
    tags: ['golden', 'helium', 'luxury', 'anniversary', '50th', 'royal'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#1c1917', '#292524', '#0c0a09'],
      canvasBg: '#1c1917',
      primary: '#facc15',
      secondary: '#ca8a04',
      accent: '#fde047',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#a16207',
    },
    defaultFonts: {
      titleFont: 'Cinzel',
      nameFont: 'Cinzel Decorative',
      bodyFont: 'Montserrat',
      accentFont: 'Cinzel',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawGoldenHeliumBalloons(ctx, width, height);
    },
  },

  // 25. Confetti Carnival & Streamers
  {
    id: 'balloons-confetti',
    name: 'Confetti Carnival Burst',
    category: 'balloons',
    tags: ['confetti', 'carnival', 'streamers', 'colorful', 'party poppers'],
    palette: {
      bgGradient: ['#ffffff', '#fffbeb', '#fef3c7'],
      canvasBg: '#ffffff',
      primary: '#ea580c',
      secondary: '#0284c7',
      accent: '#16a34a',
      textPrimary: '#1e293b',
      textSecondary: '#475569',
      textLight: '#ffffff',
      frameBorder: '#f97316',
      ribbonBg: '#ea580c',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawConfettiBurst(ctx, width, height);
    },
  },

  // 26. Champagne Bokeh & Fairy Lights
  {
    id: 'balloons-bokeh',
    name: 'Champagne Bokeh & Fairy Lights',
    category: 'balloons',
    tags: ['bokeh', 'fairy lights', 'champagne', 'dreamy', 'warm glow'],
    palette: {
      bgGradient: ['#18181b', '#27272a', '#18181b'],
      canvasBg: '#18181b',
      primary: '#fde047',
      secondary: '#fb923c',
      accent: '#facc15',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#facc15',
      ribbonBg: '#ca8a04',
    },
    defaultFonts: {
      titleFont: 'Playfair Display',
      nameFont: 'Great Vibes',
      bodyFont: 'Poppins',
      accentFont: 'Playfair Display',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawBokehLights(ctx, width, height);
    },
  },
];
`;
fs.writeFileSync(path.join(process.cwd(), 'src/templates/balloons.ts'), balloonsContent, 'utf8');

// 3. Upgrade modernMinimal.ts
const modernMinimalContent = `import { Template } from '../types';
import { 
  drawSwissEditorial,
  drawMonochromeSerif,
  drawScandiArches,
  drawSplitBlock,
  drawFrostedGlass,
  drawBauhausGeometric
} from '../utils/artworkEngines';

export const modernMinimalTemplates: Template[] = [
  // 35. Bold Swiss Typographic Poster
  {
    id: 'modern-swiss',
    name: 'Bold Swiss Typographic',
    category: 'modern_minimal',
    tags: ['swiss', 'typographic', 'bold', 'minimal', 'poster', 'red', 'black'],
    badge: 'Trending',
    palette: {
      bgGradient: ['#ffffff', '#ffffff', '#ffffff'],
      canvasBg: '#ffffff',
      primary: '#dc2626',
      secondary: '#000000',
      accent: '#7f1d1d',
      textPrimary: '#000000',
      textSecondary: '#4b5563',
      textLight: '#ffffff',
      frameBorder: '#000000',
      ribbonBg: '#dc2626',
    },
    defaultFonts: {
      titleFont: 'Oswald',
      nameFont: 'Oswald',
      bodyFont: 'Inter',
      accentFont: 'Oswald',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawSwissEditorial(ctx, width, height);
    },
  },

  // 36. Editorial Monochrome Serif
  {
    id: 'modern-monochrome',
    name: 'Editorial Monochrome Serif',
    category: 'modern_minimal',
    tags: ['monochrome', 'editorial', 'vogue', 'clean', 'serif', 'black and white'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#fafafa', '#f4f4f5', '#e4e4e7'],
      canvasBg: '#fafafa',
      primary: '#18181b',
      secondary: '#71717a',
      accent: '#27272a',
      textPrimary: '#18181b',
      textSecondary: '#52525b',
      textLight: '#ffffff',
      frameBorder: '#18181b',
      ribbonBg: '#27272a',
    },
    defaultFonts: {
      titleFont: 'Playfair Display',
      nameFont: 'Playfair Display',
      bodyFont: 'Inter',
      accentFont: 'Playfair Display',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawMonochromeSerif(ctx, width, height);
    },
  },

  // 37. Scandinavian Pastel Arches
  {
    id: 'modern-scandi',
    name: 'Scandinavian Pastel Arches',
    category: 'modern_minimal',
    tags: ['scandinavian', 'arches', 'oat', 'terracotta', 'sage', 'nordic'],
    palette: {
      bgGradient: ['#fdfbf7', '#f7f4ec', '#ece5d8'],
      canvasBg: '#fdfbf7',
      primary: '#997c60',
      secondary: '#4d7c0f',
      accent: '#7d634d',
      textPrimary: '#4f3f33',
      textSecondary: '#644f3f',
      textLight: '#ffffff',
      frameBorder: '#b4977b',
      ribbonBg: '#997c60',
    },
    defaultFonts: {
      titleFont: 'Outfit',
      nameFont: 'Outfit',
      bodyFont: 'Inter',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawScandiArches(ctx, width, height);
    },
  },

  // 38. Asymmetric Split Color Block
  {
    id: 'modern-split',
    name: 'Asymmetric Split Block',
    category: 'modern_minimal',
    tags: ['split', 'color block', 'duotone', 'modern', 'geometry'],
    palette: {
      bgGradient: ['#0f172a', '#1e293b', '#334155'],
      canvasBg: '#0f172a',
      primary: '#38bdf8',
      secondary: '#f59e0b',
      accent: '#ffffff',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textLight: '#ffffff',
      frameBorder: '#38bdf8',
      ribbonBg: '#0284c7',
    },
    defaultFonts: {
      titleFont: 'Montserrat',
      nameFont: 'Montserrat',
      bodyFont: 'Inter',
      accentFont: 'Montserrat',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawSplitBlock(ctx, width, height);
    },
  },

  // 39. Frosted Glassmorphism Card
  {
    id: 'modern-glass',
    name: 'Frosted Glassmorphism Card',
    category: 'modern_minimal',
    tags: ['glassmorphism', 'frosted', 'blur', 'translucent', 'cyber', 'modern'],
    palette: {
      bgGradient: ['#1e1b4b', '#312e81', '#1e1b4b'],
      canvasBg: '#1e1b4b',
      primary: '#a855f7',
      secondary: '#38bdf8',
      accent: '#ec4899',
      textPrimary: '#ffffff',
      textSecondary: '#e0e7ff',
      textLight: '#ffffff',
      frameBorder: '#c084fc',
      ribbonBg: '#7e22ce',
    },
    defaultFonts: {
      titleFont: 'Outfit',
      nameFont: 'Outfit',
      bodyFont: 'Inter',
      accentFont: 'Outfit',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawFrostedGlass(ctx, width, height);
    },
  },

  // 40. Bauhaus Geometric Vanguard
  {
    id: 'modern-bauhaus',
    name: 'Bauhaus Geometric Vanguard',
    category: 'modern_minimal',
    tags: ['bauhaus', 'geometric', 'primary colors', 'circle', 'triangle', 'avant-garde'],
    palette: {
      bgGradient: ['#ffffff', '#f8fafc', '#f1f5f9'],
      canvasBg: '#ffffff',
      primary: '#ef4444',
      secondary: '#3b82f6',
      accent: '#facc15',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textLight: '#ffffff',
      frameBorder: '#0f172a',
      ribbonBg: '#ef4444',
    },
    defaultFonts: {
      titleFont: 'Oswald',
      nameFont: 'Oswald',
      bodyFont: 'Inter',
      accentFont: 'Oswald',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawBauhausGeometric(ctx, width, height);
    },
  },
];
`;
fs.writeFileSync(path.join(process.cwd(), 'src/templates/modernMinimal.ts'), modernMinimalContent, 'utf8');

// 4. Upgrade party.ts
const partyContent = `import { Template } from '../types';
import { 
  drawRetroDisco,
  drawTropicalFlamingo,
  drawVintageCarnivalCircus,
  drawHoliColorSplash,
  drawCyberpunkNeon
} from '../utils/artworkEngines';

export const partyTemplates: Template[] = [
  // 46. Retro 70s Disco Funk
  {
    id: 'party-disco',
    name: 'Retro 70s Disco Funk',
    category: 'party',
    tags: ['disco', '70s', 'funk', 'groove', 'retro', 'party', 'dance'],
    badge: 'Popular',
    palette: {
      bgGradient: ['#312e81', '#4c1d95', '#1e1b4b'],
      canvasBg: '#312e81',
      primary: '#f43f5e',
      secondary: '#facc15',
      accent: '#38bdf8',
      textPrimary: '#ffffff',
      textSecondary: '#fef08a',
      textLight: '#ffffff',
      frameBorder: '#f43f5e',
      ribbonBg: '#db2777',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Bungee',
      bodyFont: 'Montserrat',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawRetroDisco(ctx, width, height);
    },
  },

  // 47. Tropical Flamingo Fiesta
  {
    id: 'party-flamingo',
    name: 'Tropical Flamingo Fiesta',
    category: 'party',
    tags: ['flamingo', 'tropical', 'palm', 'summer', 'pool party', 'pink'],
    badge: 'Summer Hit',
    palette: {
      bgGradient: ['#fff1f2', '#ffe4e6', '#fecdd3'],
      canvasBg: '#fff1f2',
      primary: '#f43f5e',
      secondary: '#10b981',
      accent: '#fb7185',
      textPrimary: '#881337',
      textSecondary: '#9f1239',
      textLight: '#ffffff',
      frameBorder: '#fb7185',
      ribbonBg: '#f43f5e',
    },
    defaultFonts: {
      titleFont: 'Pacifico',
      nameFont: 'Pacifico',
      bodyFont: 'Poppins',
      accentFont: 'Dancing Script',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawTropicalFlamingo(ctx, width, height);
    },
  },

  // 48. Vintage Big Top Circus Carnival
  {
    id: 'party-circus',
    name: 'Big Top Circus Carnival',
    category: 'party',
    tags: ['circus', 'carnival', 'big top', 'vintage', 'stripes', 'tickets'],
    palette: {
      bgGradient: ['#fef2f2', '#fee2e2', '#fecaca'],
      canvasBg: '#fef2f2',
      primary: '#dc2626',
      secondary: '#ca8a04',
      accent: '#facc15',
      textPrimary: '#7f1d1d',
      textSecondary: '#991b1b',
      textLight: '#ffffff',
      frameBorder: '#dc2626',
      ribbonBg: '#b91c1c',
    },
    defaultFonts: {
      titleFont: 'Bungee',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Bungee',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawVintageCarnivalCircus(ctx, width, height);
    },
  },

  // 49. Festive Holi Color Splash
  {
    id: 'party-holisplash',
    name: 'Festive Holi Color Splash',
    category: 'party',
    tags: ['holi', 'rangoli', 'color splash', 'indian festival', 'gulal', 'vibrant'],
    badge: 'Festive',
    palette: {
      bgGradient: ['#ffffff', '#fafafa', '#f5f5f5'],
      canvasBg: '#ffffff',
      primary: '#ec4899',
      secondary: '#06b6d4',
      accent: '#eab308',
      textPrimary: '#1e293b',
      textSecondary: '#475569',
      textLight: '#ffffff',
      frameBorder: '#ec4899',
      ribbonBg: '#db2777',
    },
    defaultFonts: {
      titleFont: 'Bungee',
      nameFont: 'Fredoka',
      bodyFont: 'Montserrat',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawHoliColorSplash(ctx, width, height);
    },
  },

  // 50. Cyberpunk Electric Neon Party
  {
    id: 'party-cyberneon',
    name: 'Cyberpunk Electric Neon',
    category: 'party',
    tags: ['cyberpunk', 'neon', 'techno', 'glow', 'electric', 'nightclub'],
    palette: {
      bgGradient: ['#030712', '#090d16', '#02040a'],
      canvasBg: '#030712',
      primary: '#06b6d4',
      secondary: '#f43f5e',
      accent: '#a855f7',
      textPrimary: '#ffffff',
      textSecondary: '#67e8f9',
      textLight: '#ffffff',
      frameBorder: '#06b6d4',
      ribbonBg: '#0891b2',
    },
    defaultFonts: {
      titleFont: 'Righteous',
      nameFont: 'Righteous',
      bodyFont: 'Inter',
      accentFont: 'Righteous',
    },
    supportedRatios: ['portrait', 'square'],
    drawDecorations: (ctx, width, height) => {
      drawCyberpunkNeon(ctx, width, height);
    },
  },
];
`;
fs.writeFileSync(path.join(process.cwd(), 'src/templates/party.ts'), partyContent, 'utf8');

console.log('Successfully upgraded all template categories!');
