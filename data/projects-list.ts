export type ProjectStatus = "ongoing" | "completed";

export interface ProjectItem {
  id: string;
  title: string;
  status: ProjectStatus;
  category: "Residential" | "Commercial" | "Industrial" | "Layout";
  location: string;
  area: string;
  image: string;
  description: string;
  highlights: string[];
}

export const projectsList: ProjectItem[] = [
  // Ongoing Projects
  {
    id: "ongoing-grand-villa",
    title: "Grand Architectural Villa",
    status: "ongoing",
    category: "Residential",
    location: "Kinathukadavu, Coimbatore",
    area: "3,800 sq.ft.",
    image: "/projects/folders/aishwarya-galaxy-152---153/20260924_113512.jpg",
    description: "Multi-level contemporary luxury villa featuring framed concrete cantilevers, double-height living areas, and landscaped courtyards.",
    highlights: ["First-floor slab completed", "Registered LBS supervision", "IS 456 seismic detailing"],
  },
  {
    id: "ongoing-commercial-hub",
    title: "Commercial Retail Complex",
    status: "ongoing",
    category: "Commercial",
    location: "Pollachi Main Road, Coimbatore",
    area: "6,500 sq.ft.",
    image: "/projects/folders/kangayam-site/20250624_143136.jpg",
    description: "Modern commercial retail showroom building with large glass frontage, heavy-duty floor slabs, and dedicated parking basement.",
    highlights: ["Structural steel framework in progress", "DTCP & LPA compliant", "High-traffic commercial zone"],
  },
  {
    id: "ongoing-duplex-residence",
    title: "Contemporary Duplex Home",
    status: "ongoing",
    category: "Residential",
    location: "Malumichampatti, Coimbatore",
    area: "2,400 sq.ft.",
    image: "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg",
    description: "Thoughtfully planned family duplex integrating Vastu Shastra principles with modern daylighting and cross-ventilation.",
    highlights: ["Brick masonry & conduit piping", "Cube strength verified", "Stage-wise BOQ tracking"],
  },
  {
    id: "ongoing-industrial-shed",
    title: "Industrial Warehouse & Workshop",
    status: "ongoing",
    category: "Industrial",
    location: "Othakkalmandapam, Coimbatore",
    area: "8,200 sq.ft.",
    image: "/projects/folders/ramaraj-thamarai-site/20260814_093129.jpg",
    description: "Pre-engineered industrial shed with reinforced VDF concrete flooring, crane gantry framing, and high-clearance access.",
    highlights: ["Foundation & column casting", "Industrial safety certified", "Heavy machinery ready"],
  },

  // Completed Projects
  {
    id: "completed-luxury-villa",
    title: "Signature Contemporary Villa",
    status: "completed",
    category: "Residential",
    location: "Kovaipudur, Coimbatore",
    area: "4,200 sq.ft.",
    image: "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg",
    description: "Turnkey luxury residential villa with private plunge pool, teak wood paneling, premium vitrified tile flooring, and integrated solar backup.",
    highlights: ["Full turnkey handover", "Custom 3D elevation design", "Zero cost escalations"],
  },
  {
    id: "completed-modern-residence",
    title: "Modern Architectural Residence",
    status: "completed",
    category: "Residential",
    location: "Saravanampatti, Coimbatore",
    area: "2,850 sq.ft.",
    image: "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg",
    description: "Sleek minimalist home designed with expansive outdoor terraces, floor-to-ceiling glass windows, and thermal insulated roofing.",
    highlights: ["Completed in 9 months", "LBS approval fast-tracked", "IS 456 cube tested"],
  },
  {
    id: "completed-timber-villa",
    title: "Contemporary Timber Villa",
    status: "completed",
    category: "Residential",
    location: "Kinathukadavu, Coimbatore",
    area: "3,100 sq.ft.",
    image: "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0056.jpg",
    description: "Harmonious two-story family villa featuring treated wood facade cladding, landscaped stone pathways, and open-plan kitchen.",
    highlights: ["Turnkey construction", "100% Vastu compliance", "Enduring structural warranty"],
  },
  {
    id: "completed-commercial-facade",
    title: "Retail & Business Showroom",
    status: "completed",
    category: "Commercial",
    location: "Kinathukadavu Town, Coimbatore",
    area: "4,600 sq.ft.",
    image: "/projects/folders/rs-road-site-kkd/20250620_103523.jpg",
    description: "Modern commercial complex delivered with structural glazing, high-load retail display spaces, and statutory fire compliance.",
    highlights: ["DTCP approved layout", "Turnkey commercial delivery", "Handed over on schedule"],
  },
  {
    id: "completed-hillside-bungalow",
    title: "Executive Hillside Residence",
    status: "completed",
    category: "Residential",
    location: "Coimbatore Outskirts",
    area: "3,500 sq.ft.",
    image: "/projects/folders/senthor-garden-49/20251112_175306.jpg",
    description: "Stunning custom hillside residence designed around natural contours, featuring stone retaining walls and panoramic glass balconies.",
    highlights: ["Soil test calibrated footings", "Reinforced concrete frame", "Turnkey interior & exterior"],
  },
  {
    id: "completed-two-storey-home",
    title: "Two-Storey Modern Bungalow",
    status: "completed",
    category: "Residential",
    location: "Pollachi Road, Coimbatore",
    area: "2,600 sq.ft.",
    image: "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg",
    description: "Practical and elegant family home with covered car porch, spacious terrace pergola, and rainwater harvesting system.",
    highlights: ["Bank loan estimate sanctioned", "Full statutory documentation", "Complete milestone audit"],
  },
];

