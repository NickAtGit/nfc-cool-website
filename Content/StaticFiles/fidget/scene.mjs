import {
  BackSide, BokehPass, BoxGeometry, CanvasTexture, Color, DirectionalLight, EffectComposer, FullScreenQuad,
  GTAOPass, HalfFloatType, Mesh, MeshBasicMaterial, OutputPass, Pass, PerspectiveCamera, PlaneGeometry,
  PMREMGenerator, RenderPass, Scene, ShaderMaterial, ShaderPass, ShadowMaterial, SRGBColorSpace,
  UnrealBloomPass, Vector2, Vector3, WebGLRenderTarget,
} from 'three';

export const CAMERA_TARGET = new Vector3(0, 0.56, 0); // a little high: the power-up jump needs headroom

const LOOKS = {
  light: { center: '#F7F5F1', edge: '#E2DED8', shadow: 0.2, contact: 0.5 },
  dark: { center: '#2B2F38', edge: '#111317', shadow: 0.42, contact: 0.75 },
};

/** A photo studio rendered once into an environment map: a soft grey room with four
 *  softboxes. It is what gives the glossy plastic its crisp highlights, at zero bytes. */
function studioEnvironment(renderer) {
  const env = new Scene();
  env.add(new Mesh(new BoxGeometry(12, 12, 12), new MeshBasicMaterial({ color: new Color(0.42, 0.41, 0.4), side: BackSide })));
  const softbox = (w, h, intensity, x, y, z) => {
    const panel = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(intensity, intensity, intensity) }));
    panel.position.set(x, y, z);
    panel.lookAt(CAMERA_TARGET);
    env.add(panel);
  };
  softbox(4, 3, 7, -3.5, 4.5, 3.5);  // key: big, upper left, in front
  softbox(1, 6, 5, 5, 1.8, -2);      // rim strip: right, behind
  softbox(7, 1.4, 1.6, 0, 0.6, 5.5); // low fill in front
  softbox(5, 5, 2.2, 0, 5.8, 0);     // overhead
  const pmrem = new PMREMGenerator(renderer);
  const texture = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  env.traverse(o => {
    if (o.isMesh) {
      o.geometry.dispose();
      o.material.dispose();
    }
  });
  return texture;
}

function contactShadowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(0.5, 'rgba(0,0,0,0.9)'); // the base's rim sits at ~0.52 of this plane
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.35)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, size, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Seamless backdrop drawn in screen space before the scene, so depth-based passes
 *  (GTAO, bokeh) never see it as geometry. Dithered against banding. */
function createBackdrop() {
  const material = new ShaderMaterial({
    uniforms: { uCenter: { value: new Color() }, uEdge: { value: new Color() }, uResolution: { value: new Vector2(1, 1) } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: `
      uniform vec3 uCenter; uniform vec3 uEdge; uniform vec2 uResolution;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main() {
        vec2 p = (vUv - vec2(0.5, 0.4)) * vec2(uResolution.x / uResolution.y, 1.0);
        vec3 color = mix(uCenter, uEdge, smoothstep(0.0, 1.15, length(p)));
        color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    depthTest: false,
    depthWrite: false,
  });
  return { material, quad: new FullScreenQuad(material) };
}

class BackdropPass extends Pass {
  constructor(backdrop) {
    super();
    this.backdrop = backdrop;
    this.needsSwap = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.clear();
    this.backdrop.quad.render(renderer);
  }
}

const VIGNETTE_GRAIN = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVignette: { value: 0.16 }, uGrain: { value: 0.018 } },
  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignette; uniform float uGrain;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime) * 43758.5453); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      c.rgb *= 1.0 - uVignette * smoothstep(0.35, 0.85, length((vUv - 0.5) * vec2(1.1, 1.0)));
      c.rgb += (hash(vUv * 1000.0) - 0.5) * uGrain;
      gl_FragColor = c;
    }`,
};

export function createStage(renderer, { tier, dark = false, reducedMotion = false }) {
  const scene = new Scene();
  scene.environment = studioEnvironment(renderer);

  const camera = new PerspectiveCamera(30, 1, 0.1, 40);
  camera.position.set(0, 1.25, 3.4);
  camera.lookAt(CAMERA_TARGET);

  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(-2.4, 4.2, 2.8);
  key.target.position.set(0, 0.4, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -1.2, right: 1.2, top: 1.2, bottom: -1.2, near: 1, far: 10 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.012;
  key.shadow.radius = 6;
  scene.add(key, key.target);

  const floor = new Mesh(new PlaneGeometry(14, 14), new ShadowMaterial({ opacity: 0.2 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const contact = new Mesh(new PlaneGeometry(1.2, 1.2),
    new MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, depthWrite: false, opacity: 0.5 }));
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.001;
  contact.renderOrder = -1;
  scene.add(contact);

  const backdrop = createBackdrop();
  const size = new Vector2();
  let post = null;

  function buildPost() {
    post?.composer.dispose();
    post = null;
    if (stage.tier === 'low') return;
    renderer.getDrawingBufferSize(size);
    const composer = new EffectComposer(renderer, new WebGLRenderTarget(size.x, size.y, { type: HalfFloatType, samples: 4 }));
    composer.addPass(new BackdropPass(backdrop));
    const render = new RenderPass(scene, camera);
    render.clear = false;
    composer.addPass(render);
    let bokeh = null;
    if (stage.tier === 'high') {
      const gtao = new GTAOPass(scene, camera, size.x, size.y);
      gtao.blendIntensity = 0.65;
      gtao.updateGtaoMaterial({ radius: 0.14, distanceExponent: 1.6, thickness: 1, scale: 1, samples: 12 });
      composer.addPass(gtao);
      if (!reducedMotion) {
        bokeh = new BokehPass(scene, camera, { focus: 3.6, aperture: 0.0016, maxblur: 0.006 });
        composer.addPass(bokeh);
      }
    }
    composer.addPass(new UnrealBloomPass(new Vector2(size.x, size.y), 0.22, 0.5, 1.25));
    composer.addPass(new OutputPass());
    const grain = new ShaderPass(VIGNETTE_GRAIN);
    composer.addPass(grain);
    post = { composer, bokeh, grain };
  }

  const stage = {
    scene,
    camera,
    key,
    tier,
    setTier(next) {
      stage.tier = next;
      buildPost(); // the caller resizes afterwards
    },
    setDark(isDark) {
      const look = LOOKS[isDark ? 'dark' : 'light'];
      backdrop.material.uniforms.uCenter.value.set(look.center);
      backdrop.material.uniforms.uEdge.value.set(look.edge);
      floor.material.opacity = look.shadow;
      contact.material.opacity = look.contact;
    },
    resize(width, height, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.getDrawingBufferSize(size);
      backdrop.material.uniforms.uResolution.value.copy(size);
      if (post) {
        post.composer.setPixelRatio(dpr);
        post.composer.setSize(width, height);
      }
    },
    render(dt) {
      if (!post) {
        renderer.setRenderTarget(null);
        renderer.autoClear = true;
        backdrop.quad.render(renderer);
        renderer.autoClear = false;
        renderer.render(scene, camera);
        renderer.autoClear = true;
        return;
      }
      if (post.bokeh) post.bokeh.uniforms.focus.value = camera.position.distanceTo(CAMERA_TARGET);
      post.grain.uniforms.uTime.value = (post.grain.uniforms.uTime.value + dt) % 100;
      post.composer.render(dt);
    },
  };
  stage.setDark(dark);
  buildPost();
  return stage;
}
