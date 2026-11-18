/**
 * Architectural Scene Configuration
 * Tuned to match the luxury villa and structural framework from banner1.png
 */

export const SCENE_TARGET = { x: -0.5, y: 3.2, z: 1.2 } as const;

/** Initial camera position in spherical coordinates for the hero framing */
export const CAMERA_BASE = {
  radius: 22.5,
  polar: 1.34,
  azimuth: 0.48,
  fov: 34,
} as const;

/** Camera view presets for interactive camera switching */
export const CAMERA_PRESETS = {
  hero: {
    radius: 22.5,
    polar: 1.34,
    azimuth: 0.48,
    target: [-0.5, 3.2, 1.2] as [number, number, number],
  },
  completed: {
    radius: 17.5,
    polar: 1.32,
    azimuth: 0.65,
    target: [-4.2, 3.2, 2.0] as [number, number, number],
  },
  construction: {
    radius: 18.0,
    polar: 1.28,
    azimuth: 0.15,
    target: [3.8, 3.4, 1.5] as [number, number, number],
  },
  topElevation: {
    radius: 26.0,
    polar: 1.05,
    azimuth: 0.52,
    target: [-0.5, 3.6, 0] as [number, number, number],
  },
} as const;

export type CameraPresetKey = keyof typeof CAMERA_PRESETS;

/** Offsets applied as the user scrolls down through the hero section */
export const CAMERA_SCROLL_DELTA = {
  azimuth: -0.35,
  polar: -0.1,
  radius: -3.5,
} as const;

export const CAMERA_LIMITS = {
  minRadius: 10,
  maxRadius: 38,
  minPolar: 0.2,
  maxPolar: 1.54,
} as const;

export const COVERED_WIDTH_METRES = 16;

/**
 * Full 360-degree orbit limits for user interaction.
 * Azimuth is unbounded to allow free 360-degree rotation.
 */
export const ORBIT_LIMITS = {
  minDistance: 12,
  maxDistance: 38,
  minPolar: 0.25,
  maxPolar: 1.52,
  minAzimuth: -Infinity,
  maxAzimuth: Infinity,
} as const;

/** Golden hour sun position casting warm low-angle architectural light */
export const SUN_POSITION: [number, number, number] = [-16, 11, 14];

export const REVEAL_DURATION_SECONDS = 2.4;

export const PARALLAX_STRENGTH = { yaw: 0.045, pitch: 0.02 } as const;

export const SHADOW_MAP_SIZE = { high: 2048, low: 1024 } as const;

export const PIXEL_RATIO_RANGE: Record<"high" | "low", [number, number]> = {
  high: [1, 1.75],
  low: [1, 1.25],
};
