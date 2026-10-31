import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
console.log('Checking dist directory:', fs.readdirSync(distDir));
const assetsDir = path.join(distDir, 'assets');
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
console.log('JS Bundle:', jsFiles);

const jsContent = fs.readFileSync(path.join(assetsDir, jsFiles[0]), 'utf8');

const templateIds = [
  // Balloons & Royale (8)
  'balloons-minggo-royale', 'balloons-midnight', 'balloons-rosegold', 'balloons-emerald',
  'balloons-silver', 'balloons-ruby', 'balloons-neon', 'balloons-sunset',
  // Kids & Cartoon (10)
  'kids-dino', 'kids-space', 'kids-superhero', 'kids-unicorn', 'kids-pirate',
  'kids-underwater', 'kids-racecar', 'kids-safari', 'kids-fairy', 'kids-monster',
  // Pastel Teddy (8)
  'teddy-classic', 'pastel-baby-dream', 'pastel-prince', 'pastel-princess',
  'pastel-balloon', 'teddy-bunny', 'pastel-lamb', 'pastel-carousel',
  // Floral & Elegant (8)
  'floral-eucalyptus', 'floral-blush-peony', 'floral-midnight-rose', 'floral-sunflower',
  'floral-white-lily', 'floral-lavender', 'floral-tropical-orchid', 'floral-sakura',
  // Modern & Minimalist (6)
  'modern-scandi', 'modern-glass', 'modern-bauhaus', 'modern-swiss',
  'modern-monochrome', 'modern-brutalist',
  // Premium Gold & Luxury (8)
  'luxury-artdeco', 'luxury-velvet', 'luxury-emerald', 'luxury-starlight',
  'luxury-blacktie', 'luxury-marble', 'luxury-silver-25th', 'luxury-gold-50th',
  // Colorful Party (6)
  'party-bollywood', 'party-disco', 'party-flamingo', 'party-circus',
  'party-cyberneon', 'party-havana'
];

console.log(`Verifying all ${templateIds.length} template IDs in production bundle:`);
let missing = 0;
for (const id of templateIds) {
  if (!jsContent.includes(id)) {
    console.error('MISSING in bundle:', id);
    missing++;
  }
}
if (missing === 0) {
  console.log(`ALL ${templateIds.length} TEMPLATES VERIFIED in production build bundle! (${templateIds.length} / ${templateIds.length})`);
} else {
  console.error(`${missing} templates missing!`);
}

// Check MINGGO Branding keywords
const brandingKeywords = ['MINGGO', 'minggo-logo-tight.png', 'Making Every Celebration Special', 'includeMinggoWatermark'];
for (const kw of brandingKeywords) {
  console.log(`Checking branding '${kw}':`, jsContent.includes(kw) ? 'FOUND' : 'MISSING');
}
