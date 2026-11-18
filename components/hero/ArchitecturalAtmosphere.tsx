'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';

/** Subtle WebGL depth treatment behind the real photo content, not a fake 3D model. */
function Atmosphere({ progress }: { progress: MutableRefObject<number> }) {
  const gridRef = useRef<THREE.Group>(null);
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null);
  const dustRef = useRef<THREE.Points>(null);

  const gridPositions = useMemo(() => {
    const v: number[] = [];
    for (let x = -10; x <= 10; x += 0.9) {
      v.push(x, -2.7, -12, x, -2.7, 4);
    }
    for (let z = -12; z <= 4; z += 0.9) {
      v.push(-10, -2.7, z, 10, -2.7, z);
    }
    // Deliberately subtle architectural guides, not an artificial building.
    for (let x = -7; x <= 7; x += 3.5) {
      v.push(x, -2.7, -7, x, 3.2, -7);
    }
    return new Float32Array(v);
  }, []);

  const dustPositions = useMemo(() => {
    const count = 95;
    const v = new Float32Array(count * 3);
    // Deterministic positions prevent visual popping during React re-renders.
    for (let i = 0; i < count; i++) {
      const a = (i * 2.399963229728653) % (Math.PI * 2);
      const r = Math.sqrt((i + 0.5) / count);
      v[3 * i] = Math.cos(a) * r * 12;
      v[3 * i + 1] = Math.sin(a) * r * 5;
      v[3 * i + 2] = -2 - ((i * 7) % 15) / 3;
    }
    return v;
  }, []);

  useFrame(({ clock }) => {
    const p = progress.current;
    if (gridRef.current) {
      gridRef.current.rotation.y = -0.14 + p * 0.28;
      gridRef.current.position.x = Math.sin(p * Math.PI * 2) * 0.18;
    }
    if (lineMaterial.current) {
      lineMaterial.current.opacity = Math.max(0.015, 0.12 - p * 0.12);
    }
    if (dustRef.current) {
      dustRef.current.rotation.y = clock.elapsedTime * 0.006;
      dustRef.current.position.y = Math.sin(clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <>
      <group ref={gridRef}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[gridPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={lineMaterial}
            color="#dce5ed"
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </lineSegments>
      </group>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.023}
          transparent
          opacity={0.13}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export default function ArchitecturalAtmosphere({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      aria-hidden
      camera={{ position: [0, 1.9, 10], fov: 51, near: 0.1, far: 40 }}
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <Atmosphere progress={progress} />
    </Canvas>
  );
}
