"""The robot with a screen face: about 1.06 tall on a 0.62 wide collectible base.
Z is up and the figure faces -Y (Blender front view). Mesh objects never reuse a
bone name: three.js renames duplicates and a clip could bind to the mesh."""
import math

import face_image
from common import apply_modifiers, capsule, material, rounded_box, rounded_cylinder, screen_material, sphere

Z0 = 0.075  # top of the base: the figure stands here
RIGHT = math.radians(90)


def face_uvs(obj):
    """The runtime canvas maps onto the -Y facing part of the screen as one 0..1 island.
    Every other face samples UV (0, 0), which the canvas keeps black."""
    me = obj.data
    uv = me.uv_layers[0] if me.uv_layers else me.uv_layers.new(name='UVMap')
    front = [p for p in me.polygons if p.normal.y < -0.5]
    xs = [me.vertices[i].co.x for p in front for i in p.vertices]
    zs = [me.vertices[i].co.z for p in front for i in p.vertices]
    x0, x1, z0, z1 = min(xs), max(xs), min(zs), max(zs)
    for p in me.polygons:
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = ((co.x - x0) / (x1 - x0), (co.z - z0) / (z1 - z0)) if p.normal.y < -0.5 else (0.0, 0.0)


def build_robot(palette, key=None):
    """Returns [(object, region, bone)]. `key` prefixes names so several palettes can
    coexist in one concept scene; the final export passes key=None so materials and
    objects carry the contract names."""
    n = (lambda s: s) if key is None else (lambda s: f'{key}_{s}')
    shell = material(n('shell_primary'), palette['primary'], roughness=0.36, coat=0.35)
    shell2 = material(n('shell_secondary'), palette['secondary'], roughness=0.42, coat=0.25)
    rubber = material(n('rubber'), '#2A2C33', roughness=0.7)
    metal = material(n('metal'), '#C8CCD4', roughness=0.26, metallic=1.0)
    accent = material(n('accent'), palette['accent'], roughness=0.3, coat=0.5)
    core = material(n('core_light'), '#7DF9FF', roughness=0.3, emission='#7DF9FF', emission_strength=3.0)
    screen = screen_material(n('face_screen'), face_image.neutral(n('face')))
    rim = material(n('base_rim'), palette['accent'], roughness=0.34, coat=0.4)
    top = material(n('base_top'), '#F7F4EE', roughness=0.22, coat=0.6)

    parts = []

    def add(obj, region, bone):
        parts.append((obj, region, bone))
        return obj

    # Base: never rigged, so it stays put when the figure jumps.
    add(rounded_cylinder(n('base_body'), 0.31, 0.075, rim, (0, 0, 0.0375), edge=0.014), 'base', None)
    add(rounded_cylinder(n('base_top'), 0.285, 0.012, top, (0, 0, 0.078), edge=0.004), 'base', None)

    for side, x in (('L', 1), ('R', -1)):
        add(rounded_box(n(f'foot_{side}_shell'), (0.12, 0.17, 0.06), 0.026, shell2, (0.085 * x, -0.015, Z0 + 0.03)), 'belly', f'foot_{side}')
        add(rounded_cylinder(n(f'shin_{side}_rubber'), 0.032, 0.075, rubber, (0.085 * x, 0, Z0 + 0.095), edge=0.008, segments=32), 'belly', f'shin_{side}')
        add(sphere(n(f'shoulder_{side}_ball'), 0.045, rubber, (0.175 * x, 0, 0.50)), 'belly', f'upper_arm_{side}')
        add(rounded_cylinder(n(f'upper_arm_{side}_rubber'), 0.03, 0.075, rubber, (0.187 * x, 0, 0.445),
                             rotation=(0, math.radians(8 * x), 0), edge=0.008, segments=32), 'belly', f'upper_arm_{side}')
        add(capsule(n(f'forearm_{side}_shell'), 0.042, 0.05, shell, (0.203 * x, 0, 0.365),
                    rotation=(0, math.radians(6 * x), 0)), 'belly', f'forearm_{side}')
        add(sphere(n(f'hand_{side}_mitten'), 0.05, shell2, (0.212 * x, 0, 0.29), scale=(1, 0.9, 1.1)), 'belly', f'hand_{side}')
        add(sphere(n(f'thumb_{side}'), 0.02, shell2, (0.19 * x, -0.04, 0.31), segments=16, rings=8), 'belly', f'hand_{side}')
        add(rounded_cylinder(n(f'ear_{side}'), 0.075, 0.05, shell2, (0.265 * x, 0, 0.745),
                             rotation=(0, RIGHT, 0), edge=0.012, segments=40), 'head', 'head')
        add(rounded_cylinder(n(f'ear_cap_{side}'), 0.04, 0.02, metal, (0.295 * x, 0, 0.745),
                             rotation=(0, RIGHT, 0), edge=0.005, segments=32), 'head', 'head')

    add(rounded_box(n('pelvis_shell'), (0.25, 0.19, 0.08), 0.035, shell2, (0, 0, 0.245)), 'belly', 'hips')
    add(rounded_box(n('torso_shell'), (0.30, 0.25, 0.26), 0.08, shell, (0, 0, 0.415)), 'belly', 'chest')
    add(rounded_cylinder(n('chest_plate'), 0.07, 0.018, shell2, (0, -0.129, 0.42), rotation=(RIGHT, 0, 0), edge=0.005), 'belly', 'chest')
    add(rounded_cylinder(n('core_light'), 0.02, 0.01, core, (0, -0.139, 0.42), rotation=(RIGHT, 0, 0), edge=0.003, segments=24), 'belly', 'chest')
    for i in range(4):
        a = math.radians(45 + 90 * i)
        add(rounded_cylinder(n(f'screw_{i}'), 0.0065, 0.004, metal, (0.05 * math.cos(a), -0.139, 0.42 + 0.05 * math.sin(a)),
                             rotation=(RIGHT, 0, 0), edge=0.0015, segments=16), 'belly', 'chest')
    add(rounded_box(n('backpack'), (0.2, 0.08, 0.17), 0.03, shell2, (0, 0.15, 0.42)), 'belly', 'chest')
    for i, z in enumerate((0.455, 0.42, 0.385)):
        add(rounded_box(n(f'vent_{i}'), (0.12, 0.014, 0.012), 0.005, rubber, (0, 0.19, z), segments=3), 'belly', 'chest')
    add(rounded_cylinder(n('neck_rubber'), 0.045, 0.045, rubber, (0, 0, 0.56), edge=0.008, segments=32), 'belly', 'neck')
    add(rounded_box(n('head_shell'), (0.5, 0.4, 0.36), 0.11, shell, (0, 0, 0.745)), 'head', 'head')
    visor = add(rounded_box(n('visor'), (0.4, 0.06, 0.25), 0.05, screen, (0, -0.19, 0.745), bulge=0.012), 'head', 'head')
    apply_modifiers(visor)
    face_uvs(visor)
    add(rounded_cylinder(n('antenna_base'), 0.022, 0.03, metal, (0.1, 0.02, 0.935), edge=0.006, segments=24), 'head', 'head')
    add(rounded_cylinder(n('antenna_stem_1'), 0.008, 0.065, metal, (0.1, 0.02, 0.9675), edge=0.002, segments=16), 'head', 'antenna_1')
    add(rounded_cylinder(n('antenna_stem_2'), 0.007, 0.055, metal, (0.1, 0.02, 1.0225), edge=0.002, segments=16), 'head', 'antenna_2')
    add(sphere(n('antenna_tip'), 0.028, accent, (0.1, 0.02, 1.062)), 'head', 'antenna_2')
    return parts
