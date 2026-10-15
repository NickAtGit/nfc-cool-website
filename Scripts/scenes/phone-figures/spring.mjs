// A damped spring for one angle of the phone (degrees). It runs only while it moves: the player
// stops drawing once every spring has settled.
export function createSpring({ value = 0, stiffness = 170, damping = 22 } = {}) {
  let velocity = 0;
  const spring = {
    value,
    target: value,
    get settled() {
      return Math.abs(spring.target - spring.value) < 0.02 && Math.abs(velocity) < 0.05;
    },
    // A push in degrees per second, for the swing on a step change.
    kick(v) { velocity += v; },
    step(dt) {
      // Fixed substeps keep it stable through a long frame (a tab coming back).
      let left = Math.min(dt, 0.25);
      while (left > 0) {
        const h = Math.min(left, 1 / 120);
        const force = stiffness * (spring.target - spring.value) - damping * velocity;
        velocity += force * h;
        spring.value += velocity * h;
        left -= h;
      }
      if (spring.settled) {
        spring.value = spring.target;
        velocity = 0;
      }
    },
  };
  return spring;
}
