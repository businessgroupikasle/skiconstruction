"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Sky } from "@react-three/drei";
import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { VillaModel } from "@/components/three/VillaModel";
import {
  CAMERA_BASE,
  CAMERA_LIMITS,
  CAMERA_PRESETS,
  CAMERA_SCROLL_DELTA,
  COVERED_WIDTH_METRES,
  ORBIT_LIMITS,
  PARALLAX_STRENGTH,
  PIXEL_RATIO_RANGE,
  SCENE_TARGET,
  SHADOW_MAP_SIZE,
  SUN_POSITION,
  type CameraPresetKey,
} from "@/components/three/scene-config";

export interface Villa3DSceneProps {
  /** Scroll progress 0 to 1, written by GSAP ScrollTrigger in the parent */
  progressRef?: MutableRefObject<number>;
  frameloop: "always" | "demand" | "never";
  quality: "high" | "low";
  reducedMotion: boolean;
  interactive: boolean;
  touch: boolean;
  label: string;
  autoRotate?: boolean;
  activePreset?: CameraPresetKey;
  lightingMode?: "day" | "sunset" | "blueprint";
  onReady?: () => void;
  onError?: () => void;
}

interface OrbitControlsLike {
  listenToKeyEvents?: (element: HTMLElement) => void;
  stopListenToKeyEvents?: () => void;
  target: THREE.Vector3;
}

interface PointerState {
  x: number;
  y: number;
}

const TARGET = new THREE.Vector3(SCENE_TARGET.x, SCENE_TARGET.y, SCENE_TARGET.z);
const BASE_POSITION = new THREE.Vector3()
  .setFromSpherical(new THREE.Spherical(CAMERA_BASE.radius, CAMERA_BASE.polar, CAMERA_BASE.azimuth))
  .add(TARGET);

const scratchOffset = new THREE.Vector3();
const scratchSpherical = new THREE.Spherical();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function orbitCamera(camera: THREE.Camera, azimuth: number, polar: number, radius: number) {
  scratchOffset.copy(camera.position).sub(TARGET);
  scratchSpherical.setFromVector3(scratchOffset);
  scratchSpherical.theta += azimuth;
  scratchSpherical.phi = clamp(scratchSpherical.phi + polar, CAMERA_LIMITS.minPolar, CAMERA_LIMITS.maxPolar);
  scratchSpherical.radius = clamp(scratchSpherical.radius + radius, CAMERA_LIMITS.minRadius, CAMERA_LIMITS.maxRadius);
  scratchOffset.setFromSpherical(scratchSpherical);
  camera.position.copy(TARGET).add(scratchOffset);
  camera.lookAt(TARGET);
}

function fitRadius(aspect: number): number {
  const halfWidthPerUnitDistance = Math.tan(THREE.MathUtils.degToRad(CAMERA_BASE.fov) / 2) * aspect;
  const required = COVERED_WIDTH_METRES / 2 / halfWidthPerUnitDistance;
  return clamp(required, CAMERA_BASE.radius, CAMERA_LIMITS.maxRadius);
}

function easeGroupRotation(group: THREE.Group, yaw: number, pitch: number, blend: number) {
  group.rotation.y += (yaw - group.rotation.y) * blend;
  group.rotation.x += (pitch - group.rotation.x) * blend;
}

function setTouchAction(element: HTMLElement, value: string) {
  element.style.touchAction = value;
}

interface CameraRigProps {
  progressRef?: MutableRefObject<number>;
  reducedMotion: boolean;
  parallaxEnabled: boolean;
  pointerRef: MutableRefObject<PointerState>;
  worldRef: MutableRefObject<THREE.Group | null>;
  activePreset?: CameraPresetKey;
}

function CameraRig({
  progressRef,
  reducedMotion,
  parallaxEnabled,
  pointerRef,
  worldRef,
  activePreset = "hero",
}: CameraRigProps) {
  const applied = useRef({ azimuth: 0, polar: 0, radius: 0 });
  const framed = useRef(false);
  const lastPresetRef = useRef<CameraPresetKey | null>(null);
  const targetCameraPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (!activePreset) return;
    const preset = CAMERA_PRESETS[activePreset] ?? CAMERA_PRESETS.hero;
    const target = new THREE.Vector3(...preset.target);
    const offset = new THREE.Vector3().setFromSpherical(
      new THREE.Spherical(preset.radius, preset.polar, preset.azimuth)
    );
    targetCameraPos.current.copy(target).add(offset);
    targetLookAt.current.copy(target);
    if (lastPresetRef.current !== null && lastPresetRef.current !== activePreset) {
      isTransitioning.current = true;
    }
    lastPresetRef.current = activePreset;
  }, [activePreset]);

  useFrame((state, delta) => {
    if (!framed.current) {
      framed.current = true;
      const extra = fitRadius(state.size.width / Math.max(1, state.size.height)) - CAMERA_BASE.radius;
      if (extra > 0.01) orbitCamera(state.camera, 0, 0, extra);
    }

    const controls = state.controls as unknown as OrbitControlsLike | null;

    // Smooth preset transition
    if (isTransitioning.current && !reducedMotion) {
      const blend = 1 - Math.exp(-delta * 3.5);
      state.camera.position.lerp(targetCameraPos.current, blend);
      if (controls && controls.target) {
        controls.target.lerp(targetLookAt.current, blend);
      } else {
        state.camera.lookAt(targetLookAt.current);
      }
      if (state.camera.position.distanceTo(targetCameraPos.current) < 0.08) {
        isTransitioning.current = false;
      }
    }

    // Scroll progress camera interpolation with multi-stage cinematic path
    const rawProgress = reducedMotion || !progressRef ? 0 : clamp(progressRef.current, 0, 1);
    const progress = smoothstep(rawProgress);
    const ease = 1 - Math.exp(-delta * 3.5);
    const current = applied.current;

    const stepAzimuth = (CAMERA_SCROLL_DELTA.azimuth * progress - current.azimuth) * ease;
    const stepPolar = (CAMERA_SCROLL_DELTA.polar * progress - current.polar) * ease;
    const stepRadius = (CAMERA_SCROLL_DELTA.radius * progress - current.radius) * ease;

    if (Math.abs(stepAzimuth) + Math.abs(stepPolar) + Math.abs(stepRadius) > 1e-6) {
      orbitCamera(state.camera, stepAzimuth, stepPolar, stepRadius);
      current.azimuth += stepAzimuth;
      current.polar += stepPolar;
      current.radius += stepRadius;
    }

    // Subtle 3D mouse parallax
    const world = worldRef.current;
    if (world) {
      const yaw = parallaxEnabled ? pointerRef.current.x * PARALLAX_STRENGTH.yaw : 0;
      const pitch = parallaxEnabled ? pointerRef.current.y * PARALLAX_STRENGTH.pitch : 0;
      easeGroupRotation(world, yaw, pitch, 1 - Math.exp(-delta * 3));
    }
  });

  return null;
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    onReady?.();
  });
  return null;
}

interface SceneContentProps {
  progressRef?: MutableRefObject<number>;
  reducedMotion: boolean;
  quality: "high" | "low";
  interactive: boolean;
  touch: boolean;
  autoRotate?: boolean;
  activePreset?: CameraPresetKey;
  lightingMode?: "day" | "sunset" | "blueprint";
  onReady?: () => void;
  worldRef: MutableRefObject<THREE.Group | null>;
  pointerRef: MutableRefObject<PointerState>;
  parallaxEnabled: boolean;
}

function SceneContent({
  progressRef,
  reducedMotion,
  quality,
  interactive,
  touch,
  autoRotate = false,
  activePreset = "hero",
  lightingMode = "day",
  onReady,
  worldRef,
  pointerRef,
  parallaxEnabled,
}: SceneContentProps) {
  const gl = useThree((state) => state.gl);
  const controls = useThree((state) => state.controls) as unknown as OrbitControlsLike | null;
  const shadowSize = SHADOW_MAP_SIZE[quality];

  const isSunset = lightingMode === "sunset";
  const isBlueprint = lightingMode === "blueprint";

  const sunPos: [number, number, number] = isSunset
    ? [-18, 4.8, 12]
    : isBlueprint
      ? [-20, 3.2, 10]
      : SUN_POSITION;

  const sunColor = isSunset ? "#FFA352" : isBlueprint ? "#38BDF8" : "#FFF4E0";
  const sunIntensity = isSunset ? 3.5 : isBlueprint ? 2.2 : 2.8;

  const hemiSky = isSunset ? "#FFD3A3" : isBlueprint ? "#1E3A5F" : "#FFF3E2";
  const hemiGround = isSunset ? "#3C3220" : isBlueprint ? "#0B1E28" : "#7A8A62";
  const hemiIntensity = isSunset ? 1.0 : isBlueprint ? 1.4 : 1.2;

  const fillColor = isSunset ? "#FF8C42" : isBlueprint ? "#4ADE80" : "#E8D2B0";
  const fillIntensity = isSunset ? 1.2 : isBlueprint ? 0.95 : 0.65;

  useEffect(() => {
    if (!controls?.listenToKeyEvents) return;
    controls.listenToKeyEvents(gl.domElement);
    return () => controls.stopListenToKeyEvents?.();
  }, [controls, gl]);

  useEffect(() => {
    if (touch) setTouchAction(gl.domElement, "pan-y");
  }, [gl, touch]);

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={sunPos}
        inclination={isSunset ? 0.6 : isBlueprint ? 0.8 : 0.48}
        azimuth={isSunset ? 0.4 : isBlueprint ? 0.5 : 0.28}
        turbidity={isSunset ? 8.0 : isBlueprint ? 12.0 : 4.0}
        rayleigh={isSunset ? 2.5 : isBlueprint ? 0.2 : 0.8}
        mieCoefficient={0.005}
        mieDirectionalG={0.82}
      />
      <hemisphereLight args={[hemiSky, hemiGround, hemiIntensity]} />
      <directionalLight
        position={sunPos}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-near={1}
        shadow-camera-far={65}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0003}
        shadow-normalBias={0.025}
      />

      <directionalLight position={[10, 6, -10]} intensity={fillIntensity} color={fillColor} />

      <group ref={worldRef}>
        <VillaModel instantReveal={reducedMotion} progressRef={progressRef} />
      </group>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={isBlueprint ? 0.35 : 0.55}
        scale={42}
        blur={2.4}
        far={10}
        resolution={quality === "high" ? 1024 : 512}
        frames={1}
      />

      <OrbitControls
        makeDefault
        enabled={interactive}
        target={[SCENE_TARGET.x, SCENE_TARGET.y, SCENE_TARGET.z]}
        enablePan={false}
        enableZoom={true}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.55}
        autoRotate={autoRotate}
        autoRotateSpeed={0.75}
        minDistance={ORBIT_LIMITS.minDistance}
        maxDistance={ORBIT_LIMITS.maxDistance}
        minPolarAngle={ORBIT_LIMITS.minPolar}
        maxPolarAngle={ORBIT_LIMITS.maxPolar}
        minAzimuthAngle={ORBIT_LIMITS.minAzimuth}
        maxAzimuthAngle={ORBIT_LIMITS.maxAzimuth}
      />

      <CameraRig
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        parallaxEnabled={parallaxEnabled}
        pointerRef={pointerRef}
        worldRef={worldRef}
        activePreset={activePreset}
      />
      <ReadySignal onReady={onReady} />
    </>
  );
}

export function Villa3DScene({
  progressRef,
  frameloop,
  quality,
  reducedMotion,
  interactive,
  touch,
  label,
  autoRotate = false,
  activePreset = "hero",
  lightingMode = "day",
  onReady,
  onError,
}: Villa3DSceneProps) {
  const worldRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const parallaxEnabled = !reducedMotion && !touch;

  useEffect(() => {
    if (!parallaxEnabled) return;
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [parallaxEnabled]);

  return (
    <Canvas
      shadows={quality === "high" ? "soft" : true}
      dpr={PIXEL_RATIO_RANGE[quality]}
      camera={{ position: BASE_POSITION.toArray(), fov: CAMERA_BASE.fov, near: 0.1, far: 260 }}
      gl={{
        antialias: quality === "high",
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
      }}
      frameloop={frameloop}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        const element = gl.domElement;
        element.setAttribute("role", "img");
        element.setAttribute("aria-label", label);
        element.tabIndex = interactive ? 0 : -1;
        element.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onError?.();
        });
      }}
    >
      <SceneContent
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        quality={quality}
        interactive={interactive}
        touch={touch}
        autoRotate={autoRotate}
        activePreset={activePreset}
        lightingMode={lightingMode}
        onReady={onReady}
        worldRef={worldRef}
        pointerRef={pointerRef}
        parallaxEnabled={parallaxEnabled}
      />
    </Canvas>
  );
}