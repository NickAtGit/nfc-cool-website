// blog_phone.glb: the shared phone (feature_phone.glb) slimmed for the blog's phone figures,
// which show it alone, straight on, at about 300 CSS px.
//
//   node blog-phone.mjs <feature_phone.glb> <blog_phone.glb>   (Scripts/scenes/build.sh runs it)
//   node blog-phone.mjs <einkcase_raw.glb> <blog_einkcase.glb>  (after Scripts/scenes/blog-einkcase.py)
//   node blog-phone.mjs <ipad_raw.glb> <blog_ipad.glb>, <mac_raw.glb> <blog_mac.glb>  (blog-ipad.py, blog-mac.py)
//
// 455 KB of the phone are three 512 px WebP textures (base colour, normal, metal/roughness) on a
// single 8-vertex mesh, Object_9: the earpiece grille's mesh pattern, a few pixels wide at that
// size. A flat near-black material draws it the same, and the phone drops from about 617 KB to
// about 150 KB over the wire. Apart from the Dynamic Island (below), everything else, the
// screen's UVs included, is kept as it is.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, KHRMaterialsUnlit } from '@gltf-transform/extensions';
import { dedup, meshopt, prune } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('usage: node blog-phone.mjs <feature_phone.glb> <blog_phone.glb>');
  process.exit(1);
}
await MeshoptDecoder.ready;
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(input);

// The phone's fixes below apply when the model has the phone in it; the iPad and the Mac
// (Scripts/scenes/blog-ipad.py, blog-mac.py) only get the meshopt pass.
const material = name => doc.getRoot().listMaterials().find(m => m.getName() === name);
const grille = material('_7ProMax_2222');
grille?.setBaseColorTexture(null).setNormalTexture(null).setMetallicRoughnessTexture(null)
  .setBaseColorFactor([0.02, 0.02, 0.02, 1]).setAlphaMode('OPAQUE').setMetallicFactor(0).setRoughnessFactor(0.6);

// The front's black glass (_7ProMax_Black2: the bezel around the screen and the Dynamic Island)
// and the island's ring, sensor and lens reflect the white studio around the phone, and read as a
// grey pill with outlines over the screen. The app screenshots leave the island's place empty, so
// it has to be the plain black of the real thing: unlit, like the screen.
const unlit = doc.createExtension(KHRMaterialsUnlit).createUnlit();
for (const name of ['_7ProMax_Black2', '_7ProMax_1111', '_7ProMax_2112', '_7ProMax_Lens2']) {
  material(name)?.setBaseColorFactor([0, 0, 0, 1]).setExtension('KHR_materials_unlit', unlit);
}

// The camera lenses are mirror-smooth metal, so in the white studio they read as white discs.
// Only the e-ink case figure shows the back; there they should be dark glass.
material('_7ProMax_Lens')
  ?.setBaseColorFactor([0.01, 0.01, 0.015, 1]).setMetallicFactor(0.2).setRoughnessFactor(0.25);

// The e-ink case's phone (the scenes' USD stand-in) carries a cover glass, which Blender's glTF
// exporter turns into an opaque white mirror over the lenses and the screen. Drop it.
for (const node of doc.getRoot().listNodes()) {
  if (node.getMesh()?.listPrimitives().some(p => p.getMaterial()?.getName() === 'CoverGlass')) node.dispose();
}

// The e-ink case (Scripts/scenes/blog-einkcase.py): its soft-touch sheen washes the orange out
// to salmon under the studio light. Without it the shell keeps its own colour.
const caseShell = material('CaseShell');
if (caseShell) caseShell.setExtension('KHR_materials_sheen', null).setRoughnessFactor(0.6);

// keepAttributes: the screen's material has no texture of its own, but the player maps the
// screenshots onto its TEXCOORD_0.
await doc.transform(prune({ keepAttributes: true }), dedup(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
await io.write(output, doc);
console.log(`EXPORT ${output}`);
