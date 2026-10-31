import fs from 'fs';
import path from 'path';

const files = ['kids.ts', 'pastelTeddy.ts', 'balloons.ts', 'floral.ts', 'modernMinimal.ts', 'luxuryGold.ts', 'party.ts'];
let total = 0;
for (const f of files) {
  const content = fs.readFileSync(path.join('src/templates', f), 'utf8');
  const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  console.log(`${f} (${matches.length}):`, matches.join(', '));
  total += matches.length;
}
console.log('Total templates:', total);
