// Everything Content/StaticFiles/scenes/scene-worker.mjs and phone-figures.mjs take from 'three',
// re-exported by name so esbuild can tree-shake the rest. No post-processing: the scenes are lit and tone mapped
// like the app's RealityKit player, nothing more.
export {
  AnimationMixer, Box3, DirectionalLight, DoubleSide, Group, MeshBasicMaterial, NeutralToneMapping,
  NoBlending, PCFShadowMap, PMREMGenerator, PerspectiveCamera, PointLight, SRGBColorSpace, Scene,
  ShaderMaterial, SpotLight, Texture, Vector3, VideoFrameTexture, VideoTexture, WebGLRenderer,
  // The Business Card page's code-built scenes (Content/StaticFiles/scenes/bc/bc-scenes.mjs).
  BackSide, BoxGeometry, BufferAttribute, CanvasTexture, CatmullRomCurve3, ClampToEdgeWrapping, Color,
  CylinderGeometry, ExtrudeGeometry, FrontSide, LatheGeometry, Mesh, MeshPhysicalMaterial, MeshStandardMaterial,
  NoColorSpace, Path, PlaneGeometry, Raycaster, RingGeometry, ShadowMaterial, Shape, ShapeGeometry, SphereGeometry,
  SplineCurve, TubeGeometry, Vector2,
  TorusGeometry,
} from 'three';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
export { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
