// Node resolve hook: maps the bare 'three' specifier to the vendored bundle, the same
// job the importmap does in the browser, so figure.mjs can be tested unmodified.
const BUNDLE = new URL('../../../Content/StaticFiles/fidget/vendor/three.bundle.min.mjs', import.meta.url).href;

export async function resolve(specifier, context, next) {
  if (specifier === 'three') return { url: BUNDLE, shortCircuit: true };
  return next(specifier, context);
}
