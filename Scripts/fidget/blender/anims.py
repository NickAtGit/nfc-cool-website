"""Pose-to-pose clips at 30 fps.

Rotations are degrees in armature axes, around each bone's head. The figure faces -Y:
  x+  leans or nods forward (toward the viewer)
  y+  tilts the top toward the figure's left (the viewer's right)
  z+  turns toward the figure's left
Every clip keys every body bone, so a crossfade in three.js never inherits a stale
pose from the previous clip. The antenna is not keyed: the runtime springs it."""
import math

import bpy
from mathutils import Euler, Vector

import rig

FPS = 30
BODY_BONES = [b for b in rig.BONES if not b.startswith('antenna')]


def arm(side, out=0.0, fwd=0.0):
    """Upper-arm rotation from hanging: `out` raises it sideways, `fwd` swings it forward."""
    s = 1 if side == 'L' else -1
    return (-fwd, -out * s, 0.0)


def arms(out_l=4, out_r=4, fwd_l=0, fwd_r=0, elbow_l=0, elbow_r=0):
    return {
        'upper_arm_L': {'rot': arm('L', out_l, fwd_l)}, 'upper_arm_R': {'rot': arm('R', out_r, fwd_r)},
        'forearm_L': {'rot': (-elbow_l, 0, 0)}, 'forearm_R': {'rot': (-elbow_r, 0, 0)},
    }


def P(*parts, **bones):
    """A pose: bone=dict(rot=(x, y, z), loc=(x, y, z), sq=s). Unlisted bones rest.
    `sq` is volume-preserving squash/stretch along the bone (only used on `root`)."""
    out = {}
    for part in parts:
        out.update(part)
    out.update(bones)
    return out


REST = P(arms(4, 4))

IDLE = [
    (0, REST, 'BEZIER'),
    (30, P(arms(5, 4), hips={'rot': (0, 1.2, 0)}, head={'rot': (0, -1, 0)}), 'BEZIER'),
    (60, P(arms(7, 7), root={'sq': 1.018}, chest={'rot': (-2, 0, 0)}, head={'rot': (2, 1.5, 0)}), 'BEZIER'),
    (90, P(arms(4, 5), hips={'rot': (0, -1.2, 0)}, head={'rot': (0, 1, 0)}), 'BEZIER'),
    (120, REST, 'BEZIER'),
]

LOOK_AROUND = [
    (0, REST, 'BEZIER'),
    (16, P(arms(4, 6), chest={'rot': (0, 0, 9)}, head={'rot': (-5, 3, 26)}), 'BEZIER'),
    (58, P(arms(4, 6), chest={'rot': (0, 0, 9)}, head={'rot': (-4, 3, 28)}), 'BEZIER'),
    (76, P(arms(6, 4), chest={'rot': (0, 0, -8)}, head={'rot': (5, -3, -24)}), 'BEZIER'),
    (116, P(arms(6, 4), chest={'rot': (0, 0, -8)}, head={'rot': (6, -3, -25)}), 'BEZIER'),
    (138, REST, 'BEZIER'),
    (150, REST, 'BEZIER'),
]

_WAVE_UP = dict(root={'sq': 1.02}, chest={'rot': (0, 4, 3)}, head={'rot': (0, 8, 9)})
WAVE = [
    (0, REST, 'BEZIER'),
    (7, P(arms(18, 4), root={'sq': 0.96}), 'BEZIER'),
    (15, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -24, 0)}), ('BACK', 'EASE_OUT')),
    (23, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, 26, 0)}), 'BEZIER'),
    (31, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -24, 0)}), 'BEZIER'),
    (39, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, 26, 0)}), 'BEZIER'),
    (47, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -10, 0)}), 'BEZIER'),
    (60, P(arms(10, 4)), 'BEZIER'),
    (72, REST, 'BEZIER'),
]

_TUCK = dict(thigh_L={'rot': (-30, 0, 0)}, thigh_R={'rot': (-30, 0, 0)},
             shin_L={'rot': (45, 0, 0)}, shin_R={'rot': (45, 0, 0)})
JUMP = [
    (0, REST, 'BEZIER'),
    (6, P(arms(16, 16, -25, -25), root={'sq': 0.82}, head={'rot': (7, 0, 0)}, chest={'rot': (8, 0, 0)}), 'LINEAR'),
    (10, P(arms(60, 60, 30, 30), root={'sq': 1.12, 'loc': (0, 0, 0.06)}), ('QUAD', 'EASE_OUT')),
    (17, P(arms(72, 72, 20, 20), _TUCK, root={'loc': (0, 0, 0.3)}, head={'rot': (-7, 0, 0)}), ('QUAD', 'EASE_IN')),
    (24, P(arms(50, 50), root={'sq': 1.08, 'loc': (0, 0, 0.07)}), 'LINEAR'),
    (27, P(arms(22, 22), root={'sq': 0.84}, head={'rot': (8, 0, 0)}), ('BACK', 'EASE_OUT')),
    (31, P(arms(6, 6), root={'sq': 1.04}), 'BEZIER'),
    (36, REST, 'BEZIER'),
]

_COVER = arms(12, 12, 38, 38, 70, 70)  # hands up to the screen, giggling
GIGGLE = [
    (0, REST, 'BEZIER'),
    (3, P(arms(8, 8), root={'sq': 0.86}, head={'rot': (10, 0, 0)}), ('BACK', 'EASE_OUT')),
    (7, P(_COVER, root={'sq': 1.05}, head={'rot': (-4, 8, 0)}), 'BEZIER'),
    (11, P(_COVER, head={'rot': (0, -8, 0)}, chest={'rot': (0, -2, 0)}), 'BEZIER'),
    (15, P(_COVER, head={'rot': (0, 7, 0)}, chest={'rot': (0, 3, 0)}), 'BEZIER'),
    (19, P(_COVER, head={'rot': (0, -5, 0)}), 'BEZIER'),
    (23, P(arms(8, 8), head={'rot': (0, 2, 0)}), 'BEZIER'),
    (30, REST, 'BEZIER'),
]

HOP = [
    (0, REST, 'BEZIER'),
    (3, P(arms(10, 10), root={'sq': 0.85}, chest={'rot': (-8, 0, 0)}), ('BACK', 'EASE_OUT')),
    (7, P(arms(45, 45), root={'sq': 1.1, 'loc': (0, 0, 0.12)}), ('QUAD', 'EASE_OUT')),
    (11, P(arms(50, 50), root={'loc': (0, 0, 0.14)}), ('QUAD', 'EASE_IN')),
    (15, P(arms(20, 20), root={'sq': 0.9}), ('BACK', 'EASE_OUT')),
    (19, P(arms(8, 8), root={'sq': 1.03}), 'BEZIER'),
    (24, REST, 'BEZIER'),
]


def _dizzy():
    poses = []
    for i in range(9):  # i == 8 wraps back to i == 0: a seamless loop
        a = i / 8 * 2 * math.pi
        poses.append((round(i * 60 / 8), P(
            arms(25 + 8 * math.sin(a), 25 - 8 * math.sin(a)),
            root={'sq': 0.98},
            chest={'rot': (7 * math.cos(a), 7 * math.sin(a), 0)},
            head={'rot': (10 * math.cos(a - 0.6), 10 * math.sin(a - 0.6), 0)},
        ), 'BEZIER'))
    return poses


_STRETCH = P(arms(160, 160, 10, 10), root={'sq': 1.08}, chest={'rot': (-8, 0, 0)}, head={'rot': (-18, 6, 0)})
YAWN = [
    (0, REST, 'BEZIER'),
    (18, _STRETCH, 'BEZIER'),
    (45, P(_STRETCH, head={'rot': (-16, -4, 0)}), 'BEZIER'),
    (60, P(arms(10, 10), root={'sq': 0.97}, head={'rot': (6, 0, 0)}), 'BEZIER'),
    (75, REST, 'BEZIER'),
]

_SLUMP = P(arms(3, 3, 10, 10), root={'sq': 0.94}, chest={'rot': (10, 0, 0)}, head={'rot': (22, 10, 0)})
SLEEP_ENTER = [
    (0, REST, 'BEZIER'),
    (20, P(_SLUMP, head={'rot': (14, 4, 0)}), 'BEZIER'),
    (32, P(_SLUMP, head={'rot': (25, 12, 0)}), 'BEZIER'),
    (45, _SLUMP, 'BEZIER'),
]
SLEEP_LOOP = [
    (0, _SLUMP, 'BEZIER'),
    (60, P(_SLUMP, root={'sq': 0.965}, chest={'rot': (8, 0, 0)}, head={'rot': (20, 10, 0)}), 'BEZIER'),
    (120, _SLUMP, 'BEZIER'),
]
WAKE_STARTLE = [
    (0, _SLUMP, 'BEZIER'),
    (4, P(arms(50, 50), root={'sq': 1.15, 'loc': (0, 0, 0.06)}, head={'rot': (-12, 0, 0)}), ('BACK', 'EASE_OUT')),
    (10, P(arms(20, 20), root={'sq': 0.95}), 'BEZIER'),
    (16, P(arms(8, 8), root={'sq': 1.02}), 'BEZIER'),
    (24, REST, 'BEZIER'),
]


def _dance():
    """Four bounces per 2 s loop: one per beat at 120 BPM, arms pumping in turn."""
    poses = []
    for beat in range(4):
        s = 1 if beat % 2 == 0 else -1
        up_l, up_r = (120, 30) if s > 0 else (30, 120)
        hit = P(arms(up_l, up_r, elbow_l=40 if s > 0 else 10, elbow_r=10 if s > 0 else 40),
                root={'sq': 0.93}, hips={'rot': (0, 6 * s, 0)},
                chest={'rot': (0, -3 * s, 8 * s)}, head={'rot': (0, 8 * s, 10 * s)})
        mid = P(arms((up_l + up_r) / 2, (up_l + up_r) / 2), root={'sq': 1.04, 'loc': (0, 0, 0.03)}, head={'rot': (-4, 0, 0)})
        poses.append((beat * 15, hit, ('QUAD', 'EASE_OUT')))
        poses.append((beat * 15 + 8, mid, ('QUAD', 'EASE_IN')))
    poses.append((60, poses[0][1], 'BEZIER'))
    return poses


_CROUCH = P(arms(20, 20, 20, 20, 60, 60), root={'sq': 0.8}, head={'rot': (10, 0, 0)})
_V = P(arms(150, 150), root={'sq': 1.15, 'loc': (0, 0, 0.18)}, head={'rot': (-12, 0, 0)}, chest={'rot': (-8, 0, 0)})
_VICTORY = P(arms(165, 45), forearm_R={'rot': (0, -80, 0)}, root={'sq': 1.03},
             head={'rot': (0, -8, 10)}, chest={'rot': (0, 0, 6)})
POWER_UP = [
    (0, REST, 'BEZIER'),
    (10, _CROUCH, 'BEZIER'),
    (14, P(_CROUCH, chest={'rot': (0, 2, 0)}), 'BEZIER'),
    (18, P(_CROUCH, chest={'rot': (0, -2, 0)}), 'BEZIER'),
    (22, P(_CROUCH, chest={'rot': (0, 2, 0)}), 'BEZIER'),
    (26, _CROUCH, 'LINEAR'),
    (31, _V, ('QUAD', 'EASE_OUT')),
    (40, P(_V, root={'sq': 1.0, 'loc': (0, 0, 0.22)}), ('QUAD', 'EASE_IN')),
    (48, P(arms(60, 60), root={'sq': 0.88}), ('BACK', 'EASE_OUT')),
    (56, _VICTORY, 'BEZIER'),
    (75, _VICTORY, 'BEZIER'),
]

CLIPS = {  # name: (poses, loops)
    'idle': (IDLE, True), 'look_around': (LOOK_AROUND, False), 'wave': (WAVE, False),
    'jump': (JUMP, False), 'giggle': (GIGGLE, False), 'hop': (HOP, False), 'dizzy': (_dizzy(), True),
    'yawn': (YAWN, False), 'sleep_enter': (SLEEP_ENTER, False), 'sleep_loop': (SLEEP_LOOP, True),
    'wake_startle': (WAKE_STARTLE, False), 'dance': (_dance(), True), 'power_up': (POWER_UP, False),
}


def _fcurves(action):
    from bpy_extras.anim_utils import action_get_channelbag_for_slot
    return action_get_channelbag_for_slot(action, action.slots[0]).fcurves


def _key(arm_obj, frame, pose, previous):
    for name in BODY_BONES:
        pb = arm_obj.pose.bones[name]
        spec = pose.get(name, {})
        rest = pb.bone.matrix_local.to_quaternion()
        turn = Euler([math.radians(a) for a in spec.get('rot', (0, 0, 0))], 'XYZ').to_quaternion()
        q = rest.inverted() @ turn @ rest
        if name in previous and previous[name].dot(q) < 0:
            q.negate()  # stay in the same hemisphere so interpolation takes the short way
        previous[name] = q.copy()
        pb.rotation_quaternion = q
        pb.location = rest.inverted() @ Vector(spec.get('loc', (0, 0, 0)))
        s = spec.get('sq', 1.0)
        pb.scale = (1 / math.sqrt(s), s, 1 / math.sqrt(s))
        for path in ('rotation_quaternion', 'location', 'scale'):
            pb.keyframe_insert(path, frame=frame)


def _interp(kp, how):
    kind, easing = (how, None) if isinstance(how, str) else how
    kp.interpolation = kind
    if easing:
        kp.easing = easing


def clip(arm_obj, name, poses, loops):
    action = bpy.data.actions.new(name)
    action.use_fake_user = True
    arm_obj.animation_data_create()
    arm_obj.animation_data.action = action
    previous, how = {}, {}
    for frame, pose, interp in poses:
        _key(arm_obj, frame, pose, previous)
        how[frame] = interp
    for fc in _fcurves(action):
        for kp in fc.keyframe_points:
            _interp(kp, how.get(int(round(kp.co.x)), 'BEZIER'))
        fc.update()
    action.use_frame_range = True
    action.frame_start, action.frame_end = poses[0][0], poses[-1][0]
    action.use_cyclic = loops
    return action


def build_clips(arm_obj):
    bpy.context.scene.render.fps = FPS  # the glTF exporter converts frames to seconds with this
    actions = {name: clip(arm_obj, name, poses, loops) for name, (poses, loops) in CLIPS.items()}
    arm_obj.animation_data.action = actions['idle']
    return actions
