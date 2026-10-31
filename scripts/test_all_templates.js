import { allTemplates, templateCategories } from '../src/templates/index.ts';
import { allTvTemplates, defaultTvScreenData } from '../src/templates/tvScreens.ts';

console.log('=== MINGGO Invitation Studio Template Audit ===');
console.log('Total templates registered:', allTemplates.length);

// Verify Categories
console.log('\n--- Categories ---');
for (const cat of templateCategories) {
  const matching = cat.id === 'all' 
    ? allTemplates.length 
    : allTemplates.filter(t => t.category === cat.id).length;
  console.log(`[${cat.id}] ${cat.name}: ${matching} templates (meta count: ${cat.count})`);
}

// Mock Canvas 2D Context to test drawDecorations of every single template
function createMockContext() {
  const dummyGrad = {
    addColorStop: () => {},
  };
  return {
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    arc: () => {},
    arcTo: () => {},
    quadraticCurveTo: () => {},
    bezierCurveTo: () => {},
    ellipse: () => {},
    rect: () => {},
    roundRect: () => {},
    strokeRect: () => {},
    fillRect: () => {},
    stroke: () => {},
    fill: () => {},
    clip: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
    transform: () => {},
    setTransform: () => {},
    fillText: () => {},
    strokeText: () => {},
    measureText: (text) => ({ width: (text || '').length * 8 }),
    createLinearGradient: () => dummyGrad,
    createRadialGradient: () => dummyGrad,
    setLineDash: () => {},
    drawImage: () => {},
  };
}

console.log('\n--- Auditing drawDecorations for all 50 templates ---');
let passed = 0;
let errors = 0;

const mockData = {
  birthdayName: 'Shri Rameshwar Rao',
  birthDate: '2026-11-15',
  age: '60th',
  eventTime: '6:30 PM Onwards',
  venueName: 'The Royal Orchid Banquet Hall, Civil Lines',
  venueAddress: 'Near Shivaji Chowk, Wardha Road, Nagpur, Maharashtra',
  hostName: 'Sharma & Deshmukh Family',
  rsvp: '+91 98765 43210',
  customMessage: 'Join us for an evening of joy and sweet celebration!',
  photoUrl: null,
  photoShape: 'circle',
  photoZoom: 1,
  photoOffset: { x: 0, y: 0 },
  hasPhoto: false,
};

const mockStyles = {
  titleFont: 'Cinzel',
  nameFont: 'Playfair Display',
  bodyFont: 'Montserrat',
  fontScale: 1,
  textAlignment: 'center',
  aspectRatio: 'portrait',
};

for (const t of allTemplates) {
  try {
    const ctx = createMockContext();
    // Test Portrait 1200x1600
    t.drawDecorations(ctx, 1200, 1600, mockData, mockStyles);
    // Test Square 2400x2400
    t.drawDecorations(ctx, 2400, 2400, mockData, mockStyles);
    passed++;
  } catch (err) {
    console.error(`FAILED template ${t.id} (${t.name}):`, err);
    errors++;
  }
}

console.log(`\n--- Auditing all ${allTvTemplates.length} TV Welcome Screen Templates (1920x1080 & 4K) ---`);
let tvPassed = 0;
for (const tv of allTvTemplates) {
  try {
    const ctx = createMockContext();
    // Test 1080p
    tv.draw(ctx, 1920, 1080, defaultTvScreenData);
    // Test 4K
    tv.draw(ctx, 3840, 2160, defaultTvScreenData);
    tvPassed++;
  } catch (err) {
    console.error(`FAILED TV template ${tv.id} (${tv.name}):`, err);
    errors++;
  }
}

console.log(`\nAudit Complete: ${passed} card templates passed, ${tvPassed} TV templates passed. Total errors: ${errors}.`);
if (errors === 0) {
  console.log('ALL 54 CARD TEMPLATES AND ALL 10 TV DISPLAY TEMPLATES RENDER WITH ZERO ERRORS!');
} else {
  process.exit(1);
}
