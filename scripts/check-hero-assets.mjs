/* Run from your Next.js project root: node scripts/check-hero-assets.mjs */
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

let found = 0;
const missing = [];
for (let n = 1; n <= 20; n++) {
  const fileName = `building-${String(n).padStart(2, '0')}.webp`;
  const filePath = path.join(process.cwd(), 'public', 'images', 'hero', fileName);
  if (existsSync(filePath) && statSync(filePath).size > 1000) {
    found++;
  } else {
    missing.push(fileName);
  }
}
console.log(`Original hero image assets found: ${found}/20`);
if (missing.length) {
  console.error('Missing:', missing.join(', '));
  console.error('Copy the original images and preserve their intended order; do not use stock replacements.');
  process.exitCode = 1;
} else {
  console.log('All 20 filename slots are populated. Check that images are the originals visually.');
}
