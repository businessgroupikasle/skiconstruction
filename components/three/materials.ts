import * as THREE from "three";

/** Deterministic pseudo-random generator for consistent procedural textures. */
function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Procedural teak wood texture with warm timber grain and vertical/horizontal slat seams. */
function createTeakTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const random = mulberry32(42109);
  // Warm golden-teak base
  ctx.fillStyle = "#A86B3E";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle wood fiber streaks
  for (let i = 0; i < 90; i += 1) {
    const x = random() * canvas.width;
    const alpha = 0.04 + random() * 0.12;
    ctx.fillStyle = `rgba(110, 60, 24, ${alpha.toFixed(3)})`;
    ctx.fillRect(x, 0, 1 + random() * 4, canvas.height);
  }

  // Slat seams every 32 px
  ctx.fillStyle = "rgba(64, 32, 12, 0.4)";
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.fillRect(x, 0, 2, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Procedural terracotta red brick texture with cement mortar lines. */
function createBrickTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const random = mulberry32(85262);
  // Grey cement mortar background
  ctx.fillStyle = "#A3A09A";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const rowHeight = 32;
  const brickWidth = 64;
  const mortar = 4;

  let row = 0;
  for (let y = 0; y < canvas.height; y += rowHeight) {
    const offsetX = (row % 2) * (brickWidth / 2);
    for (let x = -brickWidth; x < canvas.width + brickWidth; x += brickWidth) {
      const brickX = x + offsetX;
      // Slight color variation per brick
      const shade = 180 + Math.floor(random() * 40);
      const tone = Math.floor(random() * 20);
      ctx.fillStyle = `rgb(${shade}, ${65 + tone}, ${45 + tone})`;
      ctx.fillRect(brickX + mortar / 2, y + mortar / 2, brickWidth - mortar, rowHeight - mortar);
    }
    row += 1;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(2, 2);
  return texture;
}

/** Procedural cast-in-place concrete texture with subtle formwork grain. */
function createConcreteTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const random = mulberry32(33161);
  ctx.fillStyle = "#B8B7B0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle speckle noise
  for (let i = 0; i < 400; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const r = random() * 2.5;
    ctx.fillStyle = random() > 0.5 ? "rgba(255,255,255,0.08)" : "rgba(60,60,60,0.08)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Formwork board lines
  ctx.strokeStyle = "rgba(70,70,70,0.18)";
  ctx.lineWidth = 2;
  for (let y = 0; y < canvas.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Procedural polished porcelain terrace tiles with fine grout joints. */
function createTileTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#EAE8E2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle marble veining
  ctx.strokeStyle = "rgba(200, 195, 185, 0.4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Tile grout lines
  ctx.strokeStyle = "rgba(160, 155, 145, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 256, 256);
  ctx.strokeRect(256, 0, 256, 256);
  ctx.strokeRect(0, 256, 256, 256);
  ctx.strokeRect(256, 256, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Procedural architectural blueprint drafting sheet. */
function createBlueprintTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#FAFAFA";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Technical cyan/blue drafting lines
  ctx.strokeStyle = "rgba(40, 120, 180, 0.35)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Floor plan schematic rectangles
  ctx.strokeStyle = "#1A5C8A";
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, 240, 320);
  ctx.strokeRect(100, 100, 160, 140);
  ctx.strokeRect(100, 260, 160, 80);

  // Title block
  ctx.fillStyle = "#1A5C8A";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("SKI CONSTRUCTION", 320, 420);
  ctx.font = "12px sans-serif";
  ctx.fillText("PROJECT: LUXURY VILLA", 320, 442);
  ctx.fillText("SCALE: 1:100 | LBS SANCTIONED", 320, 462);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export interface VillaMaterials {
  whiteFrame: THREE.MeshStandardMaterial;
  wallPlaster: THREE.MeshStandardMaterial;
  teakSoffit: THREE.MeshStandardMaterial;
  teakLouver: THREE.MeshStandardMaterial;
  charcoalTrim: THREE.MeshStandardMaterial;
  glassPanels: THREE.MeshPhysicalMaterial;
  glassBalustrade: THREE.MeshPhysicalMaterial;
  frameBlack: THREE.MeshStandardMaterial;
  interiorWarm: THREE.MeshStandardMaterial;
  interiorFurniture: THREE.MeshStandardMaterial;
  recessedLight: THREE.MeshBasicMaterial;
  chandelierGlow: THREE.MeshBasicMaterial;
  rccConcrete: THREE.MeshStandardMaterial;
  redBrick: THREE.MeshStandardMaterial;
  steelRebar: THREE.MeshStandardMaterial;
  greenScaffold: THREE.MeshStandardMaterial;
  woodPlank: THREE.MeshStandardMaterial;
  polishedTerrace: THREE.MeshStandardMaterial;
  planterStone: THREE.MeshStandardMaterial;
  lushFoliage: THREE.MeshStandardMaterial;
  plantStem: THREE.MeshStandardMaterial;
  greenHelmet: THREE.MeshStandardMaterial;
  blueprintPaper: THREE.MeshStandardMaterial;
  cadWireframe: THREE.LineBasicMaterial;
  cadGlowWireframe: THREE.LineBasicMaterial;
  dispose: () => void;
}

/** Creates the scene's materials matching the exact architectural elements in banner1.png */
export function createVillaMaterials(): VillaMaterials {
  const teakTexture = createTeakTexture();
  const brickTexture = createBrickTexture();
  const concreteTexture = createConcreteTexture();
  const tileTexture = createTileTexture();
  const blueprintTexture = createBlueprintTexture();

  const materials: VillaMaterials = {
    // Crisp white architectural cantilever frame (banner1.png left section)
    whiteFrame: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      roughness: 0.25,
      metalness: 0.02,
    }),

    // Exterior smooth ivory/white wall plaster
    wallPlaster: new THREE.MeshStandardMaterial({
      color: "#F6F5F0",
      roughness: 0.7,
      metalness: 0.0,
    }),

    // Warm teak wood soffits with texture
    teakSoffit: new THREE.MeshStandardMaterial({
      color: "#E2934D",
      map: teakTexture,
      roughness: 0.45,
      metalness: 0.05,
    }),

    // Vertical teak louvers / brise-soleil
    teakLouver: new THREE.MeshStandardMaterial({
      color: "#B86A2E",
      roughness: 0.5,
      metalness: 0.05,
    }),

    // Dark architectural accent panels
    charcoalTrim: new THREE.MeshStandardMaterial({
      color: "#232528",
      roughness: 0.4,
      metalness: 0.2,
    }),

    // Highly reflective panoramic architectural glass
    glassPanels: new THREE.MeshPhysicalMaterial({
      color: "#E6F4F8",
      roughness: 0.04,
      metalness: 0.2,
      transmission: 0.65,
      transparent: true,
      opacity: 0.75,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    }),

    // Balcony glass balustrade with subtle tint
    glassBalustrade: new THREE.MeshPhysicalMaterial({
      color: "#CFE8F0",
      roughness: 0.06,
      metalness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    }),

    // Thin black / dark bronze aluminum window frames
    frameBlack: new THREE.MeshStandardMaterial({
      color: "#181A1C",
      roughness: 0.35,
      metalness: 0.6,
    }),

    // Warm glowing interior living room walls
    interiorWarm: new THREE.MeshStandardMaterial({
      color: "#FDF5E6",
      emissive: "#FFBD6B",
      emissiveIntensity: 0.28,
      roughness: 0.85,
    }),

    // Living room sofa & luxury furnishings
    interiorFurniture: new THREE.MeshStandardMaterial({
      color: "#C5B8A5",
      roughness: 0.8,
    }),

    // Ceiling recessed spotlight source
    recessedLight: new THREE.MeshBasicMaterial({
      color: "#FFF2D4",
    }),

    // Ring chandelier glowing fixture
    chandelierGlow: new THREE.MeshBasicMaterial({
      color: "#FFE2A8",
    }),

    // Raw RCC structural concrete (columns, beams, slabs)
    rccConcrete: new THREE.MeshStandardMaterial({
      color: "#CBCAC3",
      map: concreteTexture,
      roughness: 0.9,
      metalness: 0.05,
    }),

    // Red clay construction bricks with mortar
    redBrick: new THREE.MeshStandardMaterial({
      color: "#B85338",
      map: brickTexture,
      roughness: 0.92,
      metalness: 0.0,
    }),

    // Steel rebar starter bars protruding out of columns
    steelRebar: new THREE.MeshStandardMaterial({
      color: "#3A3D42",
      roughness: 0.5,
      metalness: 0.85,
    }),

    // Safety-green scaffolding tubular steel (matches SKI brand green)
    greenScaffold: new THREE.MeshStandardMaterial({
      color: "#5CA832",
      roughness: 0.38,
      metalness: 0.5,
    }),

    // Wood scaffolding walk planks
    woodPlank: new THREE.MeshStandardMaterial({
      color: "#A27848",
      roughness: 0.85,
    }),

    // High-gloss polished porcelain courtyard terrace tiles
    polishedTerrace: new THREE.MeshStandardMaterial({
      color: "#EFECE6",
      map: tileTexture,
      roughness: 0.18,
      metalness: 0.1,
    }),

    // Modern low planter box stone
    planterStone: new THREE.MeshStandardMaterial({
      color: "#9C9B94",
      roughness: 0.75,
    }),

    // Lush landscaping ornamental plants & shrubs
    lushFoliage: new THREE.MeshStandardMaterial({
      color: "#3F752C",
      roughness: 0.65,
    }),

    // Plant stems & tree branches
    plantStem: new THREE.MeshStandardMaterial({
      color: "#5A422D",
      roughness: 0.9,
    }),

    // Iconic SKI Construction green safety helmet
    greenHelmet: new THREE.MeshStandardMaterial({
      color: "#72BF44",
      roughness: 0.18,
      metalness: 0.15,
    }),

    // Rolled and laid blueprint paper
    blueprintPaper: new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      map: blueprintTexture,
      roughness: 0.6,
    }),

    // Holographic CAD green wireframe lines
    cadWireframe: new THREE.LineBasicMaterial({
      color: "#4ADE80",
      transparent: true,
      opacity: 0.65,
    }),

    // Glowing cyan/white CAD transition lines
    cadGlowWireframe: new THREE.LineBasicMaterial({
      color: "#67E8F9",
      transparent: true,
      opacity: 0.85,
    }),

    dispose: () => {
      Object.values(materials).forEach((item) => {
        if (item && typeof item === "object" && "dispose" in item && typeof item.dispose === "function") {
          item.dispose();
        }
      });
      teakTexture?.dispose();
      brickTexture?.dispose();
      concreteTexture?.dispose();
      tileTexture?.dispose();
      blueprintTexture?.dispose();
    },
  };

  return materials;
}
