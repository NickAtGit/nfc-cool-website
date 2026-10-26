"""Armature for the robot. The parts are hard-surface, so each one rides a single bone
(bone parenting, no skin weights). Joint positions match model.py."""
import bpy
from mathutils import Vector

BONES = {  # name: (head, tail, parent)
    'root': ((0, 0, 0.075), (0, 0, 0.16), None),  # squash/stretch and jump carrier, at the feet
    'hips': ((0, 0, 0.245), (0, 0, 0.30), 'root'),
    'spine': ((0, 0, 0.30), (0, 0, 0.36), 'hips'),
    'chest': ((0, 0, 0.36), (0, 0, 0.545), 'spine'),
    'neck': ((0, 0, 0.545), (0, 0, 0.585), 'chest'),
    'head': ((0, 0, 0.585), (0, 0, 0.8), 'neck'),
    'antenna_1': ((0.1, 0.02, 0.935), (0.1, 0.02, 1.0), 'head'),
    'antenna_2': ((0.1, 0.02, 1.0), (0.1, 0.02, 1.05), 'antenna_1'),
}
for _side, _x in (('L', 1), ('R', -1)):
    BONES.update({
        f'upper_arm_{_side}': ((0.175 * _x, 0, 0.5), (0.195 * _x, 0, 0.405), 'chest'),
        f'forearm_{_side}': ((0.195 * _x, 0, 0.405), (0.21 * _x, 0, 0.33), f'upper_arm_{_side}'),
        f'hand_{_side}': ((0.21 * _x, 0, 0.33), (0.215 * _x, 0, 0.25), f'forearm_{_side}'),
        f'thigh_{_side}': ((0.085 * _x, 0, 0.245), (0.085 * _x, 0, 0.205), 'hips'),
        f'shin_{_side}': ((0.085 * _x, 0, 0.205), (0.085 * _x, 0, 0.135), f'thigh_{_side}'),
        f'foot_{_side}': ((0.085 * _x, 0, 0.135), (0.085 * _x, -0.07, 0.105), f'shin_{_side}'),
    })


def build_armature(name='Armature'):
    data = bpy.data.armatures.new(name)
    arm = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode='EDIT')
    for bone, (head, tail, _) in BONES.items():
        eb = data.edit_bones.new(bone)
        eb.head, eb.tail, eb.roll = Vector(head), Vector(tail), 0.0
    for bone, (_, _, parent) in BONES.items():
        if parent:
            data.edit_bones[bone].parent = data.edit_bones[parent]
    bpy.ops.object.mode_set(mode='OBJECT')
    for pb in arm.pose.bones:
        pb.rotation_mode = 'QUATERNION'
    return arm


def attach(arm, parts, root):
    """Parent each part to its bone (or to the root for the base) without moving it,
    and tag its tap region. glTF exports the tag as node extras -> three.js userData."""
    bpy.context.view_layer.update()
    for obj, region, bone in parts:
        obj['region'] = region
        world = obj.matrix_world.copy()
        if bone:
            obj.parent = arm
            obj.parent_type = 'BONE'
            obj.parent_bone = bone
        else:
            obj.parent = root
        bpy.context.view_layer.update()
        obj.matrix_world = world
    arm.parent = root
