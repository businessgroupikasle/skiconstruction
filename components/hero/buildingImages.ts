/**
 * 20 Original architectural and construction images telling the complete
 * building story from site preparation and foundation to structural work,
 * finishing, and completed luxury residences.
 */
export type BuildingImage = {
  src: string;
  alt: string;
  /** Optional CSS object-position, e.g. '52% 44%'. */
  focus?: string;
};

export const buildingImages: readonly BuildingImage[] = [
  { src: '/images/hero/building-01.webp', alt: 'Site clearing, earthmoving and topographical preparation for construction' },
  { src: '/images/hero/building-02.webp', alt: 'Site excavation, leveling and soil test trenching' },
  { src: '/images/hero/building-03.webp', alt: 'Foundation trench marking, sub-base preparation and ground grid' },
  { src: '/images/hero/building-04.webp', alt: 'Fe550D reinforcement steel binding, column footing cages and formwork' },
  { src: '/images/hero/building-05.webp', alt: 'Cast concrete pouring and foundation curing on site' },
  { src: '/images/hero/building-06.webp', alt: 'Column shuttering, vertical RCC column casting and alignment' },
  { src: '/images/hero/building-07.webp', alt: 'Ground floor beam and slab steel reinforcement with on-site engineering team' },
  { src: '/images/hero/building-08.webp', alt: 'Multi-tier RCC structural framework, scaffolding and intermediate slabs' },
  { src: '/images/hero/building-09.webp', alt: 'Structural BIM framework and architectural gridline alignment' },
  { src: '/images/hero/building-10.webp', alt: 'Er. D. Satheeshkumar structural drawing review, Vastu audit and site checklist' },
  { src: '/images/hero/building-11.webp', alt: 'Photorealistic 3D architectural elevation design with exterior finishes' },
  { src: '/images/hero/building-12.webp', alt: 'Structural framing, exterior lintels and masonry wall construction' },
  { src: '/images/hero/building-13.webp', alt: 'Structural brick masonry, exterior stone cladding and boundary walls' },
  { src: '/images/hero/building-14.webp', alt: 'Contemporary villa facade with teak louvers and panoramic window framing' },
  { src: '/images/hero/building-15.webp', alt: 'Modern residence cantilever framework, glass balustrade and terrace deck' },
  { src: '/images/hero/building-16.webp', alt: 'Exterior wall plastering, weather-coat priming and terrace waterproofing' },
  { src: '/images/hero/building-17.webp', alt: 'Interior living room architectural finishes, false ceiling and warm lighting' },
  { src: '/images/hero/building-18.webp', alt: 'Master bedroom architectural detailing, custom joinery and flooring' },
  { src: '/images/hero/building-19.webp', alt: 'Completed contemporary luxury villa with landscaped lawn and entrance walkway' },
  { src: '/images/hero/building-20.webp', alt: 'Grand flagship luxury villa architecture, structural framework and drafting suite' },
] as const;

if (buildingImages.length !== 20) {
  throw new Error('Cinematic hero must reference exactly 20 original building images');
}