import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesSourceMap = [
  { file: 'public/images/background/about-bulduzar-1-1.png', alt: 'Site clearing, earthmoving and topographical preparation for construction' },
  { file: 'public/images/background/1 (1).jpg', alt: 'Site excavation, leveling and soil test trenching' },
  { file: 'public/images/background/1 (2).jpg', alt: 'Foundation trench marking, sub-base preparation and ground grid' },
  { file: 'public/images/background/1 (3).jpg', alt: 'Fe550D reinforcement steel binding, column footing cages and formwork' },
  { file: 'public/images/background/1 (4).jpg', alt: 'Cast concrete pouring and foundation curing on site' },
  { file: 'public/images/background/1 (5).jpg', alt: 'Column shuttering, vertical RCC column casting and alignment' },
  { file: 'public/images/services/building-construction.png', alt: 'Ground floor beam and slab steel reinforcement with on-site engineering team' },
  { file: 'D:/Project/ski/public/images/home/rcc-construction-site.jpg', alt: 'Multi-tier RCC structural framework, scaffolding and intermediate slabs' },
  { file: 'public/images/about/ref/building-wireframe.png', alt: 'Structural BIM framework and architectural gridline alignment' },
  { file: 'public/images/about/founder-workspace.jpg', alt: 'Er. D. Satheeshkumar structural drawing review, Vastu audit and site checklist' },
  { file: 'public/images/services/3d-elevation-design.png', alt: 'Photorealistic 3D architectural elevation design with exterior finishes' },
  { file: 'public/images/gallery/commercial-facade.jpg', alt: 'Structural framing, exterior lintels and masonry wall construction' },
  { file: 'public/images/projects/hillside-house.jpg', alt: 'Structural brick masonry, exterior stone cladding and boundary walls' },
  { file: 'public/images/projects/contemporary-villa.jpg', alt: 'Contemporary villa facade with teak louvers and panoramic window framing' },
  { file: 'public/images/projects/modern-residence.jpg', alt: 'Modern residence cantilever framework, glass balustrade and terrace deck' },
  { file: 'public/images/projects/coastal-residence.jpg', alt: 'Exterior wall plastering, weather-coat priming and terrace waterproofing' },
  { file: 'public/images/gallery/interior-living.jpg', alt: 'Interior living room architectural finishes, false ceiling and warm lighting' },
  { file: 'public/images/gallery/interior-bedroom.jpg', alt: 'Master bedroom architectural detailing, custom joinery and flooring' },
  { file: 'public/images/about/villa-exterior.jpg', alt: 'Completed contemporary luxury villa with landscaped lawn and entrance walkway' },
  { file: 'public/images/hero/banner1.png', alt: 'Grand flagship luxury villa architecture, structural framework and drafting suite' },
];

const outDir = path.join(process.cwd(), 'public', 'images', 'hero');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Converting 20 authentic construction images to high-quality WebP...');

for (let i = 0; i < imagesSourceMap.length; i++) {
  const item = imagesSourceMap[i];
  const num = String(i + 1).padStart(2, '0');
  const targetFile = path.join(outDir, `building-${num}.webp`);
  
  const srcPath = path.isAbsolute(item.file) ? item.file : path.join(process.cwd(), item.file);
  if (!fs.existsSync(srcPath)) {
    console.error(`Source not found: ${srcPath}`);
    process.exit(1);
  }

  await sharp(srcPath)
    .webp({ quality: 90, effort: 4 })
    .toFile(targetFile);

  const stats = fs.statSync(targetFile);
  console.log(`[${num}/20] building-${num}.webp (${(stats.size / 1024).toFixed(1)} KB) <- ${path.basename(srcPath)}`);
}

console.log('\nAll 20 construction images successfully prepared!');
