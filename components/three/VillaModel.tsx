"use client";

import { useFrame } from "@react-three/fiber";
import { createContext, useContext, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { createVillaMaterials, type VillaMaterials } from "@/components/three/materials";
import { REVEAL_DURATION_SECONDS } from "@/components/three/scene-config";

type Vec3 = [number, number, number];

/* Shared unit geometries to minimize memory and GPU buffer allocations */
const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const UNIT_CYLINDER = new THREE.CylinderGeometry(1, 1, 1, 12);
const UNIT_SPHERE = new THREE.SphereGeometry(1, 16, 12);
const HELMET_DOME = new THREE.SphereGeometry(0.38, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);

const MaterialsContext = createContext<VillaMaterials | null>(null);

function useVillaMaterials(): VillaMaterials {
  const materials = useContext(MaterialsContext);
  if (!materials) throw new Error("useVillaMaterials must be used inside VillaModel");
  return materials;
}

/* ---------------- Helper Primitives ---------------- */

function Box({
  position,
  size,
  material,
  rotation,
  castShadow = true,
  receiveShadow = true,
}: {
  position: Vec3;
  size: Vec3;
  material: THREE.Material;
  rotation?: Vec3;
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  return (
    <mesh
      geometry={UNIT_BOX}
      material={material}
      position={position}
      rotation={rotation}
      scale={size}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}

function Cylinder({
  position,
  radius,
  height,
  material,
  rotation,
  castShadow = true,
}: {
  position: Vec3;
  radius: number;
  height: number;
  material: THREE.Material;
  rotation?: Vec3;
  castShadow?: boolean;
}) {
  return (
    <mesh
      geometry={UNIT_CYLINDER}
      material={material}
      position={position}
      rotation={rotation}
      scale={[radius, height, radius]}
      castShadow={castShadow}
    />
  );
}

/* ---------------- Finished Luxury Villa Wing (Left Section from banner1.png) ---------------- */

function FinishedVillaWing({
  interiorGlowRef,
  groupRef,
}: {
  interiorGlowRef: MutableRefObject<THREE.PointLight | null>;
  groupRef: MutableRefObject<THREE.Group | null>;
}) {
  const m = useVillaMaterials();

  // Vertical teak louvers on the upper floor left side
  const louvers = useMemo(() => {
    const list: number[] = [];
    for (let x = -8.8; x <= -6.0; x += 0.28) {
      list.push(x);
    }
    return list;
  }, []);

  return (
    <group ref={groupRef}>
      {/* 1. Terrace Foundation & Plinth */}
      <Box position={[-4.5, 0.16, 0.8]} size={[9.6, 0.32, 8.2]} material={m.wallPlaster} />

      {/* Floating Entry Steps leading to the patio */}
      <Box position={[-3.6, 0.12, 5.0]} size={[4.2, 0.22, 1.2]} material={m.polishedTerrace} />
      <Box position={[-3.6, 0.24, 4.4]} size={[4.0, 0.22, 1.0]} material={m.polishedTerrace} />

      {/* 2. Ground Floor Interior Volume */}
      <Box position={[-4.6, 1.85, -0.6]} size={[9.2, 3.4, 5.8]} material={m.interiorWarm} />

      {/* Interior Furniture: Modern living room sofa & table */}
      <Box position={[-4.0, 0.65, 0.4]} size={[3.4, 0.55, 1.2]} material={m.interiorFurniture} />
      <Box position={[-5.8, 0.75, 0.8]} size={[0.8, 0.75, 2.0]} material={m.interiorFurniture} />
      <Box position={[-4.0, 0.42, 1.4]} size={[1.4, 0.28, 0.8]} material={m.charcoalTrim} />

      {/* Glowing Warm Ring Chandelier in the living room */}
      <mesh position={[-4.0, 2.8, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.04, 12, 32]} />
        <meshBasicMaterial color="#FFE6AA" />
      </mesh>
      <pointLight ref={interiorGlowRef} position={[-4.0, 2.7, 0.8]} color="#FFC773" intensity={4.5} distance={14} decay={1.8} />

      {/* 3. Ground Floor Panoramic Glazing & Minimalist Frames */}
      <Box position={[-4.2, 1.9, 3.2]} size={[7.6, 3.1, 0.06]} material={m.glassPanels} />
      <Box position={[-4.2, 3.45, 3.22]} size={[7.7, 0.08, 0.1]} material={m.frameBlack} />
      <Box position={[-4.2, 0.36, 3.22]} size={[7.7, 0.08, 0.1]} material={m.frameBlack} />
      {[-8.0, -5.6, -2.8, -0.4].map((x) => (
        <Box key={x} position={[x, 1.9, 3.22]} size={[0.07, 3.1, 0.1]} material={m.frameBlack} />
      ))}

      {/* 4. Cantilevered Ground Terrace Canopy with Teak Wood Soffit */}
      <Box position={[-4.6, 3.75, 1.2]} size={[10.2, 0.38, 8.8]} material={m.whiteFrame} />
      <Box position={[-4.6, 3.52, 2.6]} size={[9.6, 0.05, 5.8]} material={m.teakSoffit} />

      {/* Recessed Warm Ceiling Downlights along the cantilever */}
      {[-7.5, -5.2, -2.8, -0.8].map((x) => (
        <group key={x} position={[x, 3.5, 4.2]}>
          <Cylinder position={[0, 0, 0]} radius={0.12} height={0.02} material={m.recessedLight} />
          <pointLight position={[0, -0.15, 0]} color="#FFD188" intensity={1.2} distance={5} decay={2} />
        </group>
      ))}

      {/* 5. First / Upper Floor: Iconic White Cantilever Frame */}
      <Box position={[-4.6, 5.65, 0.6]} size={[9.8, 3.4, 7.6]} material={m.wallPlaster} />

      {/* The Prominent White Rectangular Architectural Frame from banner1.png */}
      <Box position={[-9.3, 5.65, 3.8]} size={[0.5, 3.6, 0.6]} material={m.whiteFrame} />
      <Box position={[-0.3, 5.65, 3.8]} size={[0.5, 3.6, 0.6]} material={m.whiteFrame} />
      <Box position={[-4.8, 7.35, 3.8]} size={[9.5, 0.5, 0.6]} material={m.whiteFrame} />
      <Box position={[-4.8, 3.75, 4.2]} size={[9.8, 0.45, 0.8]} material={m.whiteFrame} />

      {/* Vertical Teak Wood Louvers on Upper Left Bedroom (banner1.png) */}
      <Box position={[-7.4, 5.65, 3.4]} size={[3.2, 3.1, 0.08]} material={m.charcoalTrim} />
      {louvers.map((x) => (
        <Box key={x} position={[x, 5.65, 3.6]} size={[0.07, 3.1, 0.22]} material={m.teakLouver} />
      ))}

      {/* Upper Floor Master Suite Glazing & Balcony Door */}
      <Box position={[-3.1, 5.65, 2.6]} size={[5.2, 2.9, 0.06]} material={m.glassPanels} />
      <Box position={[-3.1, 5.65, 2.62]} size={[5.3, 0.08, 0.09]} material={m.frameBlack} />
      {[-5.6, -3.2, -0.8].map((x) => (
        <Box key={`upper-mullion-${x}`} position={[x, 5.65, 2.62]} size={[0.07, 2.9, 0.09]} material={m.frameBlack} />
      ))}

      {/* Upper Terrace Balcony & Glass Balustrade */}
      <Box position={[-3.1, 3.96, 3.7]} size={[5.6, 0.08, 2.2]} material={m.polishedTerrace} />
      <Box position={[-3.1, 4.65, 4.3]} size={[5.6, 1.1, 0.04]} material={m.glassBalustrade} />
      <Box position={[-3.1, 5.22, 4.3]} size={[5.7, 0.05, 0.08]} material={m.whiteFrame} />

      {/* Teak Wood Soffit on Upper Roof Overhang */}
      <Box position={[-4.8, 7.15, 2.2]} size={[9.2, 0.05, 4.8]} material={m.teakSoffit} />
      {[-6.8, -4.5, -2.2].map((x) => (
        <Cylinder key={`roof-light-${x}`} position={[x, 7.12, 3.4]} radius={0.11} height={0.02} material={m.recessedLight} />
      ))}

      {/* Flat Cantilevered Roof Slab */}
      <Box position={[-4.8, 7.55, 0.8]} size={[10.2, 0.42, 8.2]} material={m.whiteFrame} />

      {/* 6. Landscape Planters & Architectural Bonsai Tree (banner1.png) */}
      <Box position={[-7.8, 0.45, 4.6]} size={[2.2, 0.65, 0.9]} material={m.planterStone} />
      <Box position={[-1.2, 0.45, 4.6]} size={[1.8, 0.65, 0.9]} material={m.planterStone} />

      {/* Low Shrubs in Planters */}
      {[-8.5, -7.8, -7.1, -1.6, -0.9].map((x) => (
        <mesh key={`shrub-${x}`} position={[x, 0.95, 4.6]} geometry={UNIT_SPHERE} material={m.lushFoliage} scale={[0.42, 0.35, 0.42]} castShadow />
      ))}

      {/* Graceful Entrance Tree with Slender Trunk & Green Canopy */}
      <group position={[-0.8, 0.35, 3.6]}>
        <Cylinder position={[0, 1.4, 0]} radius={0.09} height={2.8} material={m.plantStem} />
        <mesh position={[-0.15, 2.8, 0.1]} geometry={UNIT_SPHERE} material={m.lushFoliage} scale={[1.1, 0.85, 1.0]} castShadow />
        <mesh position={[0.4, 3.2, -0.2]} geometry={UNIT_SPHERE} material={m.lushFoliage} scale={[0.8, 0.7, 0.8]} castShadow />
      </group>

      {/* Balcony Planters with Green Foliage */}
      {[-5.2, -4.6, -1.4].map((x) => (
        <group key={`balcony-plant-${x}`} position={[x, 4.15, 3.9]}>
          <Box position={[0, 0.2, 0]} size={[0.45, 0.4, 0.45]} material={m.charcoalTrim} />
          <mesh position={[0, 0.55, 0]} geometry={UNIT_SPHERE} material={m.lushFoliage} scale={[0.32, 0.35, 0.32]} castShadow />
        </group>
      ))}
    </group>
  );
}

/* ---------------- Structural Concrete & Construction Wing (Right Section from banner1.png) ---------------- */

function ConstructionSkeletonWing({
  scaffoldRef,
  groupRef,
}: {
  scaffoldRef: MutableRefObject<THREE.Group | null>;
  groupRef: MutableRefObject<THREE.Group | null>;
}) {
  const m = useVillaMaterials();

  // 6 Primary RCC Columns grid
  const columns: ReadonlyArray<readonly [number, number]> = [
    [1.2, 3.6],
    [4.4, 3.6],
    [7.4, 3.6],
    [1.2, 0.2],
    [4.4, 0.2],
    [7.4, 0.2],
    [1.2, -3.2],
    [4.4, -3.2],
    [7.4, -3.2],
  ];

  return (
    <group ref={groupRef}>
      {/* 1. Raw Foundation Plinth */}
      <Box position={[4.4, 0.16, 0.4]} size={[7.2, 0.32, 7.6]} material={m.rccConcrete} />

      {/* 2. RCC Columns with Exposed Formwork Texture */}
      {columns.map(([x, z]) => (
        <group key={`col-${x}-${z}`}>
          {/* Ground to first floor column */}
          <Box position={[x, 1.85, z]} size={[0.52, 3.4, 0.52]} material={m.rccConcrete} />
          {/* First floor to roof column */}
          <Box position={[x, 5.5, z]} size={[0.48, 3.3, 0.48]} material={m.rccConcrete} />
          {/* Rebar Starter Bars (Fe550D steel rods protruding 1.2m above columns) */}
          <Cylinder position={[x - 0.12, 7.7, z - 0.12]} radius={0.024} height={1.2} material={m.steelRebar} />
          <Cylinder position={[x + 0.12, 7.6, z - 0.12]} radius={0.024} height={1.0} material={m.steelRebar} />
          <Cylinder position={[x - 0.12, 7.65, z + 0.12]} radius={0.024} height={1.1} material={m.steelRebar} />
          <Cylinder position={[x + 0.12, 7.75, z + 0.12]} radius={0.024} height={1.3} material={m.steelRebar} />
        </group>
      ))}

      {/* 3. Cast Concrete Beams & Intermediate Floor Slabs */}
      <Box position={[4.4, 3.75, 0.4]} size={[7.2, 0.38, 7.6]} material={m.rccConcrete} />
      <Box position={[4.4, 7.35, 0.4]} size={[7.2, 0.38, 7.6]} material={m.rccConcrete} />

      {/* Perimeter Edge Beams */}
      <Box position={[4.4, 3.55, 3.6]} size={[7.2, 0.42, 0.48]} material={m.rccConcrete} />
      <Box position={[4.4, 7.15, 3.6]} size={[7.2, 0.42, 0.48]} material={m.rccConcrete} />

      {/* 4. Exposed Red Brick Infill Walls (banner1.png) */}
      <Box position={[2.8, 1.5, 3.6]} size={[2.6, 2.7, 0.32]} material={m.redBrick} />
      <Box position={[5.9, 4.8, 3.6]} size={[2.5, 1.6, 0.32]} material={m.redBrick} />
      <Box position={[2.8, 4.4, 0.2]} size={[2.6, 1.0, 0.32]} material={m.redBrick} />

      {/* 5. Safety-Green Tubular Scaffolding System (Right Side of banner1.png) */}
      <group ref={scaffoldRef} position={[8.4, 0, 0]}>
        {[-3.0, 0.2, 3.6].map((z) => (
          <group key={`scaffold-col-${z}`}>
            <Cylinder position={[0, 4.3, z]} radius={0.045} height={8.6} material={m.greenScaffold} />
            <Cylinder position={[0.9, 4.3, z]} radius={0.045} height={8.6} material={m.greenScaffold} />
          </group>
        ))}

        {[2.1, 4.1, 6.2, 8.2].map((y) => (
          <group key={`scaffold-tier-${y}`}>
            <Box position={[0, y, 0.3]} size={[0.07, 0.07, 7.0]} material={m.greenScaffold} />
            <Box position={[0.9, y, 0.3]} size={[0.07, 0.07, 7.0]} material={m.greenScaffold} />
            {[-3.0, 0.2, 3.6].map((z) => (
              <Box key={`transom-${z}`} position={[0.45, y, z]} size={[0.9, 0.07, 0.07]} material={m.greenScaffold} />
            ))}
            <Box position={[0.45, y + 0.06, 0.3]} size={[0.75, 0.08, 6.6]} material={m.woodPlank} />
          </group>
        ))}

        <mesh position={[0.45, 3.1, 0.3]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.05, 3.2, 0.05]} />
          <meshStandardMaterial color="#5CA832" roughness={0.4} />
        </mesh>
        <mesh position={[0.45, 5.1, 0.3]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.05, 3.2, 0.05]} />
          <meshStandardMaterial color="#5CA832" roughness={0.4} />
        </mesh>
      </group>

      {/* 6. CAD Holographic Wireframe Grid lines bridging skeleton to finished villa */}
      <CADTransitionGrid />
    </group>
  );
}

/**
 * CAD Wireframe Overlay:
 * Architectural CAD linework from banner1.png that connects
 * the concrete skeleton to the finished villa.
 */
function CADTransitionGrid() {
  const m = useVillaMaterials();
  const lineGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let y = 1.0; y <= 8.5; y += 1.2) {
      points.push(new THREE.Vector3(-2.0, y, 3.8), new THREE.Vector3(4.0, y, 3.8));
      points.push(new THREE.Vector3(0.0, y, 0.0), new THREE.Vector3(3.0, y, 0.0));
    }
    for (let x = -0.5; x <= 3.5; x += 1.0) {
      points.push(new THREE.Vector3(x, 0.2, 3.8), new THREE.Vector3(x, 8.8, 3.8));
    }
    points.push(new THREE.Vector3(-1.0, 7.4, 3.8), new THREE.Vector3(1.5, 9.2, 3.8));
    points.push(new THREE.Vector3(1.5, 9.2, 3.8), new THREE.Vector3(5.0, 8.5, 3.8));

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  return <lineSegments geometry={lineGeo} material={m.cadWireframe} />;
}

/* ---------------- Foreground Technical Blueprint & Helmet (banner1.png Bottom Right) ---------------- */

function ForegroundDraftingTable() {
  const m = useVillaMaterials();

  return (
    <group position={[6.2, 0.15, 6.8]} rotation={[0, -0.22, 0]}>
      <Box position={[0, 0, 0]} size={[3.8, 0.12, 2.2]} material={m.whiteFrame} />

      <mesh position={[-0.4, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial color="#FFFFFF" map={m.blueprintPaper.map} roughness={0.6} />
      </mesh>

      <group position={[0.85, 0.08, 0.25]} rotation={[0, 0.35, 0]}>
        <mesh geometry={HELMET_DOME} material={m.greenHelmet} position={[0, 0.08, 0]} castShadow />
        <Cylinder position={[0, 0.08, 0]} radius={0.46} height={0.03} material={m.greenHelmet} />
        <Box position={[0, 0.44, 0]} size={[0.08, 0.08, 0.52]} material={m.greenHelmet} />
      </group>

      <Cylinder position={[1.4, 0.18, -0.4]} radius={0.11} height={1.6} material={m.blueprintPaper} rotation={[0, 0, Math.PI / 2]} />
      <Cylinder position={[1.4, 0.18, -0.15]} radius={0.09} height={1.4} material={m.blueprintPaper} rotation={[0, 0, Math.PI / 2]} />
      <Cylinder position={[-0.2, 0.08, 0.65]} radius={0.015} height={0.35} material={m.charcoalTrim} rotation={[0, 0.4, Math.PI / 2]} />
    </group>
  );
}

/* ---------------- Ground Courtyard & Distant Landscape ---------------- */

function GroundCourtyard() {
  const m = useVillaMaterials();

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 4.5]} receiveShadow>
        <planeGeometry args={[42, 24]} />
        <primitive object={m.polishedTerrace} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#E8E5DD" roughness={0.9} />
      </mesh>

      <Box position={[-6.0, 1.2, -8.0]} size={[34, 2.4, 0.35]} material={m.wallPlaster} />

      {[-18, -14, -10, -6, -2, 2, 6, 10, 14].map((x) => (
        <group key={`tree-${x}`} position={[x, 0, -9.2]}>
          <Cylinder position={[0, 1.6, 0]} radius={0.2} height={3.2} material={m.plantStem} />
          <mesh position={[0, 4.2, 0]} geometry={UNIT_SPHERE} material={m.lushFoliage} scale={[1.8, 2.2, 1.8]} />
        </group>
      ))}
    </group>
  );
}

/* ---------------- Root Villa Model Component with Progressive Construction Reveal ---------------- */

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export interface VillaModelProps {
  instantReveal?: boolean;
  progressRef?: MutableRefObject<number>;
}

/**
 * 3D Architectural Villa Model with Progressive Construction Reveal:
 * - Faithfully models banner1.png
 * - Automatically animates construction structures based on scroll progress:
 *   - Ground break & foundation plinth
 *   - Rising structural RCC columns and steel rebar
 *   - Progressive scaffolding elevation
 *   - Cantilever facade assembly & teak louvers
 *   - Warm glowing interior chandeliers
 */
export function VillaModel({ instantReveal = false, progressRef }: VillaModelProps) {
  const materials = useMemo(() => createVillaMaterials(), []);
  const scaffoldRef = useRef<THREE.Group | null>(null);
  const interiorGlowRef = useRef<THREE.PointLight | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);
  const finishedGroupRef = useRef<THREE.Group | null>(null);
  const revealProgressRef = useRef(instantReveal ? 1 : 0);

  useEffect(() => () => materials.dispose(), [materials]);

  useFrame((_, delta) => {
    // Initial reveal animation on page load
    if (revealProgressRef.current < 1) {
      revealProgressRef.current = Math.min(1, revealProgressRef.current + delta / REVEAL_DURATION_SECONDS);
    }
    const reveal = revealProgressRef.current;
    const eased = easeOutQuart(reveal);

    // Scroll-based dynamic construction reveal
    const scrollP = progressRef ? Math.max(0, Math.min(1, progressRef.current)) : 0;

    // Interior glow intensifies during sunset or when nearing completion
    if (interiorGlowRef.current) {
      interiorGlowRef.current.intensity = eased * (3.5 + scrollP * 3.0);
    }

    // Dynamic scaffolding and structure elevation based on scroll
    if (scaffoldRef.current && progressRef) {
      const targetScaleY = 0.85 + scrollP * 0.25;
      scaffoldRef.current.scale.y += (targetScaleY - scaffoldRef.current.scale.y) * 0.1;
    }

    // Finished villa wing subtle materialization and alignment
    if (finishedGroupRef.current && progressRef) {
      const targetY = 0;
      finishedGroupRef.current.position.y += (targetY - finishedGroupRef.current.position.y) * 0.1;
    }
  });

  return (
    <MaterialsContext.Provider value={materials}>
      <group>
        <GroundCourtyard />
        <FinishedVillaWing interiorGlowRef={interiorGlowRef} groupRef={finishedGroupRef} />
        <ConstructionSkeletonWing scaffoldRef={scaffoldRef} groupRef={skeletonGroupRef} />
        <ForegroundDraftingTable />
      </group>
    </MaterialsContext.Provider>
  );
}