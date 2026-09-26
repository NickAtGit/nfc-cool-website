// Everything the /fidget modules import from 'three', re-exported by name so esbuild
// can tree-shake the rest. Scripts/fidget/tests/bundle.test.mjs fails if a module
// imports a name that is missing here.
export {
  AnimationMixer, BackSide, BoxGeometry, CanvasTexture, Color, DirectionalLight, DoubleSide,
  DynamicDrawUsage, Euler, ExtrudeGeometry, Group, HalfFloatType, InstancedMesh, LoopOnce,
  LoopRepeat, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial,
  NeutralToneMapping, Object3D, PCFShadowMap, PerspectiveCamera, Plane, PlaneGeometry,
  PMREMGenerator, Quaternion, Raycaster, RingGeometry, Scene, ShaderMaterial, ShadowMaterial,
  Shape, Spherical, Sprite, SpriteMaterial, SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
export { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
export { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
export { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
export { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
export { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
export { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
export { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
export { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
