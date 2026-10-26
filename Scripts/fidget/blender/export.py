"""AO bake, motion playblast, and the glTF export."""
import os

import bpy

import studio
from common import principled


def bake_ao(objs, samples=128, strength=0.55):
    """Bake ambient occlusion into a vertex colour (glTF COLOR_0). three.js multiplies
    it into the base colour, which gives crevices depth at zero runtime cost."""
    scene = bpy.context.scene
    if scene.world is None:
        scene.world = bpy.data.worlds.new('bake')
    scene.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for device in prefs.devices:
        device.use = True
    scene.cycles.device = 'GPU'
    scene.cycles.samples = samples
    scene.world.light_settings.distance = 0.12
    for obj in bpy.context.view_layer.objects:
        obj.select_set(False)
    for obj in objs:
        attrs = obj.data.color_attributes
        attr = attrs.get('AO') or attrs.new('AO', 'FLOAT_COLOR', 'POINT')
        attrs.active_color = attr
        attrs.render_color_index = attrs.active_color_index
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')
    for obj in objs:
        attr = obj.data.color_attributes['AO']
        data = [0.0] * (len(attr.data) * 4)
        attr.data.foreach_get('color', data)
        for i in range(0, len(data), 4):
            for c in range(3):
                data[i + c] = 1.0 - strength * (1.0 - data[i + c])
            data[i + 3] = 1.0
        attr.data.foreach_set('color', data)


def strip_screen_texture(mat):
    """The runtime draws the face on a canvas. Keep the image out of the GLB and leave
    emission at zero; figure.mjs sets the canvas as the emissive map."""
    bsdf = principled(mat)
    for link in list(bsdf.inputs['Emission Color'].links):
        mat.node_tree.links.remove(link)
    bsdf.inputs['Emission Color'].default_value = (0, 0, 0, 1)
    bsdf.inputs['Emission Strength'].default_value = 0.0


def playblast(arm, actions, out_dir):
    """Workbench renders of every clip, frame number and clip name stamped on."""
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_WORKBENCH'
    shading = scene.display.shading
    shading.light = 'STUDIO'
    shading.color_type = 'MATERIAL'
    shading.show_shadows = True
    shading.show_cavity = True
    scene.render.resolution_x, scene.render.resolution_y = 540, 675
    scene.render.image_settings.file_format = 'PNG'
    for attr in dir(scene.render):
        if attr.startswith('use_stamp_'):
            try:
                setattr(scene.render, attr, False)
            except (AttributeError, TypeError):
                pass
    scene.render.use_stamp = True
    scene.render.use_stamp_note = True
    scene.render.use_stamp_frame = True
    scene.render.stamp_font_size = 20
    cam = studio.camera('three_quarter')
    for name, action in actions.items():
        arm.animation_data.action = action
        start, end = (int(f) for f in action.frame_range)
        scene.frame_start, scene.frame_end = start, end
        scene.render.stamp_note_text = name
        scene.render.filepath = os.path.join(out_dir, name, 'f_')
        bpy.ops.render.render(animation=True)
    bpy.data.objects.remove(cam, do_unlink=True)


def export_glb(path, root):
    for obj in bpy.context.view_layer.objects:
        obj.select_set(False)
    for obj in (root, *root.children_recursive):
        obj.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=str(path), export_format='GLB', use_selection=True,
        export_apply=True, export_extras=True, export_yup=True,
        export_texcoords=True, export_normals=True,
        export_vertex_color='ACTIVE', export_all_vertex_colors=False,
        export_materials='EXPORT', export_image_format='NONE',
        export_animations=True, export_animation_mode='ACTIONS',
        export_force_sampling=True, export_frame_step=1,
        export_optimize_animation_size=True, export_optimize_animation_keep_anim_armature=True,
        export_anim_slide_to_zero=True, export_reset_pose_bones=True,
        export_skins=True, export_def_bones=False, export_leaf_bone=False,
        export_morph=False, export_lights=False, export_cameras=False,
        export_meshopt_compression_enable=True, export_meshopt_extension='EXT_meshopt_compression',
    )
