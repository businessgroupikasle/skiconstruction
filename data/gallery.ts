import type { ImageAsset } from "@/data/types";

export const galleryCategories = [
  "Residential",
  "Interiors",
  "Construction",
  "Design & Planning",
  "Commercial",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  /** Shown on the home-page preview */
  featured: boolean;
  image: ImageAsset;
}

/**
 * Gallery photographs. Every image is an illustrative stock photograph of the type of
 * work SKI Construction does, not a record of a specific project. Replace them with the
 * company's own photographs (same paths, or update the image entries) before launch.
 */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: "luxury-villa",
    title: "Signature contemporary villa",
    category: "Residential",
    featured: true,
    image: { src: "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg", alt: "Completed luxury villa by SKI Construction in Coimbatore", width: 1000, height: 667 },
  },
  {
    id: "modern-residence",
    title: "Modern residence in Krishnapuram",
    category: "Residential",
    featured: true,
    image: { src: "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg", alt: "Modern residence built by SKI Construction", width: 1000, height: 667 },
  },
  {
    id: "contemporary-villa",
    title: "Turnkey villa handover to family",
    category: "Residential",
    featured: false,
    image: { src: "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0056.jpg", alt: "Completed villa project handover by SKI Construction", width: 1000, height: 667 },
  },
  {
    id: "coastal-residence",
    title: "Two-storey family residence",
    category: "Residential",
    featured: false,
    image: { src: "/projects/folders/senthor-garden-49/20251112_175306.jpg", alt: "Two-storey family residence by SKI Construction", width: 1000, height: 667 },
  },
  {
    id: "hillside-house",
    title: "Independent villa brick & structural work",
    category: "Residential",
    featured: false,
    image: { src: "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg", alt: "Independent villa construction by SKI Construction", width: 1000, height: 667 },
  },
  {
    id: "two-storey-home",
    title: "Commercial showroom & complex",
    category: "Commercial",
    featured: false,
    image: { src: "/projects/folders/rs-road-site-kkd/20250829_063645.jpg", alt: "Commercial complex delivered by SKI Construction", width: 1000, height: 667 },
  },
  {
    id: "3d-elevation",
    title: "Dusk elevation for a modern house",
    category: "Design & Planning",
    featured: true,
    image: { src: "/images/services/3d-elevation-design.png", alt: "Illustrative: modern house exterior lit warmly at dusk", width: 800, height: 533 },
  },
  {
    id: "lbs-drafting",
    title: "Drafting plans for approval",
    category: "Design & Planning",
    featured: false,
    image: { src: "/images/services/lbs-plan-approval.png", alt: "Illustrative: architect drafting plans with a ruler", width: 800, height: 533 },
  },
  {
    id: "approval-checklist",
    title: "Approval checklist and documents",
    category: "Design & Planning",
    featured: false,
    image: { src: "/images/services/dtcp-lpa-approval.png", alt: "Illustrative: approval checklist on a clipboard beside a laptop", width: 800, height: 533 },
  },
  {
    id: "building-construction",
    title: "Reinforcement and slab work on site",
    category: "Construction",
    featured: true,
    image: { src: "/images/services/building-construction.png", alt: "Illustrative: construction site with reinforcement steel and workers", width: 800, height: 533 },
  },
  {
    id: "consulting-site",
    title: "Site team reviewing progress",
    category: "Construction",
    featured: false,
    image: { src: "/images/services/construction-consulting.png", alt: "Illustrative: aerial view of a construction site with engineers", width: 800, height: 533 },
  },
  {
    id: "interior-living",
    title: "Open living room with wood accents",
    category: "Interiors",
    featured: true,
    image: { src: "/images/gallery/interior-living.jpg", alt: "Illustrative: open living room with a sofa and timber accents", width: 1000, height: 667 },
  },
  {
    id: "interior-dining",
    title: "Dining area beside a glazed wall",
    category: "Interiors",
    featured: false,
    image: { src: "/images/gallery/interior-dining.jpg", alt: "Illustrative: dining area with a staircase and glazed wall", width: 1000, height: 667 },
  },
  {
    id: "interior-bedroom",
    title: "Bedroom with soft natural light",
    category: "Interiors",
    featured: false,
    image: { src: "/images/gallery/interior-bedroom.jpg", alt: "Illustrative: bedroom with a large window and soft light", width: 1000, height: 667 },
  },
  {
    id: "vastu-living",
    title: "Living room with planting",
    category: "Interiors",
    featured: false,
    image: { src: "/images/services/vastu-plan.png", alt: "Illustrative: bright living room with indoor plants and warm furniture", width: 800, height: 533 },
  },
  {
    id: "commercial-facade",
    title: "Multi-storey building with blue facade",
    category: "Commercial",
    featured: true,
    image: { src: "/images/gallery/commercial-facade.jpg", alt: "Illustrative: multi-storey commercial building with a blue facade", width: 1000, height: 667 },
  },
];

export const featuredGalleryItems = galleryItems.filter((item) => item.featured);

export interface GalleryDesignFile {
  id: string;
  title: string;
  category: GalleryCategory;
  /** Preview shown on the card */
  image: ImageAsset;
  /** The file the visitor downloads, served from /public */
  href: string;
  /** File type shown on the card, e.g. "JPG" or "PDF" */
  format: string;
}

/**
 * Design files under "Computer files". Each `href` is a real file in /public, so the
 * download works as it is. Replace the sample files with the company's own drawings
 * (PDF, DWG, etc.) before launch, and update `format` to match.
 */
export const designFiles: readonly GalleryDesignFile[] = [
  {
    id: "design-3d-elevation",
    title: "Dusk elevation for a modern house",
    category: "Design & Planning",
    image: { src: "/images/services/3d-elevation-design.png", alt: "Illustrative: modern house exterior lit warmly at dusk", width: 800, height: 533 },
    href: "/images/services/3d-elevation-design.png",
    format: "PNG",
  },
  {
    id: "design-lbs-drafting",
    title: "Drafting plans for approval",
    category: "Design & Planning",
    image: { src: "/images/services/lbs-plan-approval.png", alt: "Illustrative: architect drafting plans with a ruler", width: 800, height: 533 },
    href: "/images/services/lbs-plan-approval.png",
    format: "PNG",
  },
  {
    id: "design-approval-checklist",
    title: "Approval checklist and documents",
    category: "Design & Planning",
    image: { src: "/images/services/dtcp-lpa-approval.png", alt: "Illustrative: approval checklist on a clipboard beside a laptop", width: 800, height: 533 },
    href: "/images/services/dtcp-lpa-approval.png",
    format: "PNG",
  },
];

export interface GalleryVideo {
  id: string;
  title: string;
  category: GalleryCategory;
  /** An .mp4 file in /public/videos */
  src: string;
  /** Still frame shown before the video plays, in /public */
  poster: string;
}
/**
 * Videos under "Videos and images". None are added yet. To add one, put the .mp4 in
 * /public/videos, add a poster image, and add an entry here.
 */
export const galleryVideos: readonly GalleryVideo[] = [
  {
    id: "video-1",
    title: "Aishwarya Galaxy 152 & 153 - Site Structural Progress",
    category: "Residential",
    src: "/projects/folders/aishwarya-galaxy-152---153/20260811_184130.mp4",
    poster: "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg",
  },
  {
    id: "video-2",
    title: "Ganesh & Tharani SK Garden - Slab Casting & Shuttering",
    category: "Construction",
    src: "/projects/folders/ganesh-tharani-sk-garden/20251228_100858.mp4",
    poster: "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg",
  },
  {
    id: "video-3",
    title: "Ramaraj Thamarai Site - Plinth Beam & Foundation Concrete",
    category: "Construction",
    src: "/projects/folders/ramaraj-thamarai-site/20260814_093123.mp4",
    poster: "/projects/folders/ramaraj-thamarai-site/20260814_093129.jpg",
  },
  {
    id: "video-4",
    title: "Senthor Garden 49 - First Floor Slab Concrete Pour",
    category: "Residential",
    src: "/projects/folders/senthor-garden-49/VID20240902111549.mp4",
    poster: "/projects/folders/senthor-garden-49/IMG20240822082721.jpg",
  },
  {
    id: "video-5",
    title: "Kangayam Site - Heavy Structural RCC Work & Inspection",
    category: "Construction",
    src: "/projects/folders/kangayam-site/VID-20250411-WA0060.mp4",
    poster: "/projects/folders/kangayam-site/20250624_143136.jpg",
  },
  {
    id: "video-6",
    title: "Sivaperumal Aishwarya Galaxy - On-Site Walkthrough & Finishing",
    category: "Residential",
    src: "/projects/folders/sivaperumal-aishwarya-galaxy/20260606_075119.mp4",
    poster: "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg",
  },
];
