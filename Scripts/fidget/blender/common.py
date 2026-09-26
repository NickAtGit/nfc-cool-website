"""Shared helpers for the /fidget figure build (Blender 5.2, run headless)."""
import math

import bmesh
import bpy
from mathutils import Vector


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene


def _srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgba(hex_color):
    """'#RRGGBB' -> linear RGBA. Blender colour sockets are scene-linear."""
    h = hex_color.lstrip('#')
    return tuple(_srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


def principled(mat):
    if mat.node_tree is None:
        mat.use_nodes = True
    return next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')


def material(name, color, roughness=0.4, metallic=0.0, coat=0.0, coat_roughness=0.06,
             emission=None, emission_strength=0.0, transmission=0.0, ior=1.45):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    i = principled(mat).inputs
    i['Base Color'].default_value = hex_rgba(color)
    i['Roughness'].default_value = roughness
    i['Metallic'].default_value = metallic
    i['Coat Weight'].default_value = coat
    i['Coat Roughness'].default_value = coat_roughness
    i['Transmission Weight'].default_value = transmission
    i['IOR'].default_value = ior
    if emission:
        i['Emission Color'].default_value = hex_rgba(emission)
        i['Emission Strength'].default_value = emission_strength
    mat.diffuse_color = hex_rgba(color)  # what Workbench playblasts show
    return mat


def screen_material(name, image, strength=3.0):
    """Glossy black glass whose emission is the face image (renders only; export strips it)."""
    mat = material(name, '#07090D', roughness=0.1, coat=1.0, coat_roughness=0.02)
    bsdf = principled(mat)
    tex = mat.node_tree.nodes.new('ShaderNodeTexImage')
    tex.image = image
    mat.node_tree.links.new(tex.outputs['Color'], bsdf.inputs['Emission Color'])
    bsdf.inputs['Emission Strength'].default_value = strength
    return mat


def _object(name, bm, mat, smooth=True):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    if mat is not None:
        me.materials.append(mat)
    for poly in me.polygons:
        poly.use_smooth = smooth
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def _bevel(obj, width, segments, angle=None):
    mod = obj.modifiers.new('bevel', 'BEVEL')
    mod.width = width
    mod.segments = segments
    mod.use_clamp_overlap = True
    mod.harden_normals = True  # keeps flat faces flat under smooth shading
    if angle is None:
        mod.limit_method = 'NONE'
    else:
        mod.limit_method = 'ANGLE'
        mod.angle_limit = math.radians(angle)
    return mod


def rounded_box(name, size, radius, mat, location=(0, 0, 0), rotation=(0, 0, 0), segments=6, bulge=0.0):
    """A soft vinyl block. `bulge` pushes the -Y face outward, like a curved screen."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    angle = None
    if bulge:
        bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=8, use_grid_fill=True)
        hw, hh = size[0] / 2, size[2] / 2
        for v in bm.verts:
            if v.co.y < 0:
                v.co.y -= bulge * (1 - (v.co.x / hw) ** 2) * (1 - 0.5 * (v.co.z / hh) ** 2)
        angle = 35  # bevel the box edges only, not the grid
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    _bevel(obj, radius, segments, angle)
    return obj


def rounded_cylinder(name, radius, depth, mat, location=(0, 0, 0), rotation=(0, 0, 0), edge=0.01, segments=48):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segments,
                          radius1=radius, radius2=radius, depth=depth)
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    _bevel(obj, edge, 4, angle=30)
    return obj


def sphere(name, radius, mat, location=(0, 0, 0), scale=(1, 1, 1), segments=32, rings=16):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segments, v_segments=rings, radius=radius)
    obj = _object(name, bm, mat)
    obj.location = location
    obj.scale = scale
    return obj


def capsule(name, radius, length, mat, location=(0, 0, 0), rotation=(0, 0, 0), segments=32, rings=17):
    """A sphere split at the equator and stretched: a pill `length` taller than it is wide.
    An odd ring count means no vertex sits exactly on the equator."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segments, v_segments=rings, radius=radius)
    for v in bm.verts:
        v.co.z += length / 2 if v.co.z > 0 else -length / 2
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    return obj


def apply_modifiers(obj):
    """Bake the modifier stack into the mesh (needed before AO baking and UV edits)."""
    if not obj.modifiers:
        return
    dg = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(obj.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    old = obj.data
    obj.modifiers.clear()
    obj.data = mesh
    if old.users == 0:
        bpy.data.meshes.remove(old)


def triangles(objs):
    dg = bpy.context.evaluated_depsgraph_get()
    total = 0
    for obj in objs:
        if obj.type != 'MESH':
            continue
        evaluated = obj.evaluated_get(dg)
        me = evaluated.to_mesh()
        total += sum(len(p.vertices) - 2 for p in me.polygons)
        evaluated.to_mesh_clear()
    return total


def remove(objs):
    for obj in objs:
        bpy.data.objects.remove(obj, do_unlink=True)
