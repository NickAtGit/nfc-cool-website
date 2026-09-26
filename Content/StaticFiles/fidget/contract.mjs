// Names shared by the Blender export (Scripts/fidget/blender) and this runtime.
// Scripts/fidget/tests/glb-contract.test.mjs fails if figure.glb drifts from them.
export const ROOT_NODE = 'Figure';

export const CLIP_NAMES = [
  'idle', 'look_around', 'wave', 'jump', 'giggle', 'hop', 'dizzy',
  'yawn', 'sleep_enter', 'sleep_loop', 'wake_startle', 'dance', 'power_up',
];

export const LOOPING_CLIPS = ['idle', 'dizzy', 'sleep_loop', 'dance'];

// three.js strips '.' from node names, so bones use underscores.
export const BONE_NAMES = [
  'root', 'hips', 'spine', 'chest', 'neck', 'head', 'antenna_1', 'antenna_2',
  'upper_arm_L', 'forearm_L', 'hand_L', 'thigh_L', 'shin_L', 'foot_L',
  'upper_arm_R', 'forearm_R', 'hand_R', 'thigh_R', 'shin_R', 'foot_R',
];

export const REGIONS = ['head', 'belly', 'base'];

export const MATERIALS = { face: 'face_screen', core: 'core_light', baseRim: 'base_rim' };

export const LIMITS = { bytes: 1_048_576, triangles: 60_000 };
