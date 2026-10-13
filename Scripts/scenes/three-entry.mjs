// Everything Content/StaticFiles/scenes/live-scenes.mjs takes from 'three', re-exported by name
// so esbuild can tree-shake the rest. No post-processing: the scenes are lit and tone mapped
// like the app's RealityKit player, nothing more.
export {
  AnimationMixer, DoubleSide, MeshBasicMaterial, NeutralToneMapping, PMREMGenerator, PointLight,
  SRGBColorSpace, Scene, VideoTexture, WebGLRenderer,
} from 'three';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
export { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
