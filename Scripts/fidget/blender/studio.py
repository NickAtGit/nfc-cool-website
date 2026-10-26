"""A seamless photo-studio sweep with softboxes, for concept and reference renders."""
import math

import bmesh
import bpy
from mathutils import Vector

from common import hex_rgba, material

BACKDROP = '#E9E5DF'
VIEWS = {  # name: (camera location, look-at target)
    'front': ((0, -3.6, 0.62), (0, 0, 0.5)),
    'three_quarter': ((-2.3, -2.8, 0.95), (0, 0, 0.5)),
    'back': ((0.9, 3.4, 0.9), (0, 0, 0.5)),
    'closeup': ((-0.75, -1.45, 0.98), (0, 0, 0.74)),
}


def _look_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def _render_settings(scene, samples, res):
    scene.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for device in prefs.devices:
        device.use = True
    scene.cycles.device = 'GPU'
    scene.cycles.samples = samples
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.use_denoising = True
    scene.render.use_persistent_data = True
    scene.render.resolution_x, scene.render.resolution_y = res
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    try:
        scene.view_settings.view_transform = 'AgX'
        scene.view_settings.look = 'AgX - Medium High Contrast'
    except TypeError:
        pass  # look names differ between builds; AgX alone is fine


def _world(scene):
    world = bpy.data.worlds.new('studio')
    scene.world = world
    if world.node_tree is None:
        world.use_nodes = True
    bg = next(n for n in world.node_tree.nodes if n.type == 'BACKGROUND')
    bg.inputs['Color'].default_value = hex_rgba(BACKDROP)
    bg.inputs['Strength'].default_value = 0.35


def _sweep():
    """Floor that curves up into a wall behind the figure: no horizon line."""
    profile = [(-4 + i * 5.5 / 12, 0.0) for i in range(13)]
    radius = 1.2
    for i in range(1, 13):
        t = i / 12 * math.pi / 2
        profile.append((1.5 + radius * math.sin(t), radius - radius * math.cos(t)))
    profile.append((1.5 + radius, 5.0))
    bm = bmesh.new()
    rows = [[bm.verts.new((x, y, z)) for y, z in profile] for x in (-6.0, 6.0)]
    for i in range(len(profile) - 1):
        bm.faces.new((rows[0][i], rows[0][i + 1], rows[1][i + 1], rows[1][i]))
    me = bpy.data.meshes.new('sweep')
    bm.to_mesh(me)
    bm.free()
    for poly in me.polygons:
        poly.use_smooth = True
    me.materials.append(material('studio_sweep', BACKDROP, roughness=0.9))
    obj = bpy.data.objects.new('sweep', me)
    bpy.context.scene.collection.objects.link(obj)


def _softbox(name, location, size, energy, color='#FFFFFF', size_y=None, target=(0, 0, 0.5)):
    data = bpy.data.lights.new(name, 'AREA')
    data.shape = 'RECTANGLE'
    data.size = size
    data.size_y = size_y or size
    data.energy = energy
    data.color = hex_rgba(color)[:3]
    obj = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    _look_at(obj, target)


def build(scene, samples=128, res=(900, 1100)):
    _render_settings(scene, samples, res)
    _world(scene)
    _sweep()
    _softbox('key', (-1.6, -2.0, 2.4), 1.6, 380, '#FFF6EC')
    _softbox('rim', (1.8, 1.4, 1.6), 0.35, 260, '#EAF2FF', size_y=1.8)
    _softbox('fill', (0.6, -2.8, 0.5), 2.4, 70, size_y=1.0)
    _softbox('top', (0, 0, 3.2), 2.0, 120)


def camera(view, lens=70):
    location, target = VIEWS[view]
    data = bpy.data.cameras.new(f'cam_{view}')
    data.lens = lens
    cam = bpy.data.objects.new(f'cam_{view}', data)
    bpy.context.scene.collection.objects.link(cam)
    cam.location = location
    _look_at(cam, target)
    bpy.context.scene.camera = cam
    return cam


def render(path, view):
    cam = camera(view)
    bpy.context.scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
