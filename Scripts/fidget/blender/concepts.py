"""Checkpoint M1: three concepts on the same base, in the same studio, two palettes each."""
import math

from common import capsule, material, rounded_box, rounded_cylinder, sphere
from model import Z0, build_robot

PALETTES = {
    'robot': {'A': dict(primary='#F26B5B', secondary='#F4EDE4', accent='#F2B84B'),
              'B': dict(primary='#7FD1B9', secondary='#243049', accent='#FF8A65')},
    'astronaut': {'A': dict(primary='#F2F1EC', secondary='#FF7A3D', accent='#B79CFF'),
                  'B': dict(primary='#F2F1EC', secondary='#1FB5A8', accent='#FFB38A')},
    'sprite': {'A': dict(primary='#E5484D', secondary='#F6E7CF', accent='#FFD166'),
               'B': dict(primary='#8E6CF0', secondary='#DDF3E4', accent='#FF9ECF')},
}


def _base(key, p):
    rim = material(f'{key}_rim', p['accent'], roughness=0.34, coat=0.4)
    top = material(f'{key}_top', '#F7F4EE', roughness=0.22, coat=0.6)
    return [rounded_cylinder(f'{key}_base', 0.31, 0.075, rim, (0, 0, 0.0375), edge=0.014),
            rounded_cylinder(f'{key}_base_top', 0.285, 0.012, top, (0, 0, 0.078), edge=0.004)]


def robot(key, p):
    return [obj for obj, _, _ in build_robot(p, key)]


def astronaut(key, p):
    suit = material(f'{key}_suit', p['primary'], roughness=0.5, coat=0.2)
    trim = material(f'{key}_trim', p['secondary'], roughness=0.35, coat=0.4)
    skin = material(f'{key}_skin', p['accent'], roughness=0.45, coat=0.3)
    glass = material(f'{key}_glass', '#FFFFFF', roughness=0.02, transmission=1.0, ior=1.45)
    eye = material(f'{key}_eye', '#15161A', roughness=0.08, coat=1.0)
    objs = _base(key, p)
    for side, x in (('L', 1), ('R', -1)):
        objs += [
            rounded_box(f'{key}_boot_{side}', (0.12, 0.16, 0.07), 0.03, trim, (0.08 * x, -0.01, Z0 + 0.035)),
            capsule(f'{key}_arm_{side}', 0.05, 0.12, suit, (0.19 * x, 0, Z0 + 0.3), rotation=(0, math.radians(-15 * x), 0)),
            sphere(f'{key}_glove_{side}', 0.055, trim, (0.215 * x, 0, Z0 + 0.19)),
            sphere(f'{key}_eye_{side}', 0.035, eye, (0.07 * x, -0.17, Z0 + 0.68), scale=(1, 0.6, 1.3)),
        ]
    objs += [
        capsule(f'{key}_body', 0.15, 0.14, suit, (0, 0, Z0 + 0.25)),
        rounded_box(f'{key}_pack', (0.24, 0.12, 0.24), 0.05, suit, (0, 0.13, Z0 + 0.3)),
        rounded_cylinder(f'{key}_collar', 0.15, 0.04, trim, (0, 0, Z0 + 0.46), edge=0.012),
        sphere(f'{key}_head', 0.19, skin, (0, 0, Z0 + 0.66)),
        sphere(f'{key}_helmet', 0.26, glass, (0, 0, Z0 + 0.66), segments=64, rings=32),
        rounded_cylinder(f'{key}_antenna', 0.007, 0.1, trim, (0.11, 0.09, Z0 + 0.95), edge=0.002, segments=16),
        sphere(f'{key}_antenna_tip', 0.025, trim, (0.11, 0.09, Z0 + 1.01)),
    ]
    return objs


def sprite(key, p):
    cap = material(f'{key}_cap', p['primary'], roughness=0.38, coat=0.35)
    body = material(f'{key}_body', p['secondary'], roughness=0.5, coat=0.15)
    spot = material(f'{key}_spot', '#FFFDF7', roughness=0.4, coat=0.3)
    blush = material(f'{key}_blush', p['accent'], roughness=0.6)
    eye = material(f'{key}_eye', '#15161A', roughness=0.08, coat=1.0)
    glint = material(f'{key}_glint', '#FFFFFF', roughness=0.2, emission='#FFFFFF', emission_strength=2.0)
    objs = _base(key, p)
    for side, x in (('L', 1), ('R', -1)):
        objs += [
            sphere(f'{key}_foot_{side}', 0.07, body, (0.085 * x, -0.02, Z0 + 0.04), scale=(1, 1.3, 0.6)),
            capsule(f'{key}_arm_{side}', 0.04, 0.05, body, (0.18 * x, 0, Z0 + 0.25), rotation=(0, math.radians(-30 * x), 0)),
            sphere(f'{key}_eye_{side}', 0.04, eye, (0.075 * x, -0.155, Z0 + 0.33), scale=(1, 0.5, 1.35)),
            sphere(f'{key}_glint_{side}', 0.012, glint, (0.085 * x, -0.172, Z0 + 0.35), segments=12, rings=6),
            sphere(f'{key}_blush_{side}', 0.03, blush, (0.12 * x, -0.14, Z0 + 0.27), scale=(1.4, 0.3, 0.8)),
        ]
    objs += [
        capsule(f'{key}_stem', 0.17, 0.12, body, (0, 0, Z0 + 0.27)),
        sphere(f'{key}_cap', 0.34, cap, (0, 0, Z0 + 0.62), scale=(1, 1, 0.62), segments=64, rings=32),
    ]
    a, c = 0.34, 0.34 * 0.62
    for i, (az, el) in enumerate([(-90, 50), (-45, 25), (-135, 25), (0, 45), (180, 45), (90, 40), (-90, 86)]):
        t, f = math.radians(az), math.radians(el)
        s = sphere(f'{key}_spot_{i}', 0.055, spot, (a * math.cos(f) * math.cos(t), a * math.cos(f) * math.sin(t), Z0 + 0.62 + c * math.sin(f)),
                   scale=(1, 1, 0.35), segments=24, rings=12)
        normal = s.location.copy()
        normal.z -= Z0 + 0.62
        normal.x /= a * a
        normal.y /= a * a
        normal.z /= c * c
        s.rotation_euler = normal.to_track_quat('Z', 'Y').to_euler()
        objs.append(s)
    return objs


BUILDERS = {'robot': robot, 'astronaut': astronaut, 'sprite': sprite}
