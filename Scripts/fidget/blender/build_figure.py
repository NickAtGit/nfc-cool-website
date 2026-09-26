"""Builds the /fidget figure headless.

  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --concepts DIR
  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --final \
      [--palette A] [--renders DIR] [--playblast DIR] [--glb PATH]
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import bpy  # noqa: E402

import anims  # noqa: E402
import common  # noqa: E402
import concepts  # noqa: E402
import export  # noqa: E402
import model  # noqa: E402
import rig  # noqa: E402
import studio  # noqa: E402


def parse():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    p = argparse.ArgumentParser(prog='build_figure.py')
    p.add_argument('--concepts', metavar='DIR', help='render the M1 concept tiles into DIR')
    p.add_argument('--final', action='store_true', help='build, rig and animate the chosen figure')
    p.add_argument('--palette', default='A')
    p.add_argument('--renders', metavar='DIR', help='Cycles reference renders into DIR')
    p.add_argument('--playblast', metavar='DIR', help='Workbench frames of every clip into DIR/<clip>/')
    p.add_argument('--glb', metavar='PATH', help='write the compressed GLB here')
    p.add_argument('--samples', type=int)
    return p.parse_args(argv)


def run_concepts(out_dir, samples):
    os.makedirs(out_dir, exist_ok=True)
    scene = common.reset_scene()
    studio.build(scene, samples=samples or 128, res=(900, 1100))
    for concept, builder in concepts.BUILDERS.items():
        for palette in ('A', 'B'):
            objs = builder(f'{concept}{palette}', concepts.PALETTES[concept][palette])
            views = ['three_quarter', 'front'] if palette == 'A' else ['three_quarter']
            for view in views:
                studio.render(os.path.join(out_dir, f'{concept}-{palette}-{view}.png'), view)
            common.remove(objs)
    print(f'CONCEPTS_OK {out_dir}')


def run_final(args):
    scene = common.reset_scene()
    parts = model.build_robot(concepts.PALETTES['robot'][args.palette])
    objs = [obj for obj, _, _ in parts]
    for obj in objs:
        common.apply_modifiers(obj)
    print(f'TRIANGLES {common.triangles(objs)}')
    export.bake_ao(objs)
    root = bpy.data.objects.new('Figure', None)
    scene.collection.objects.link(root)
    arm = rig.build_armature()
    rig.attach(arm, parts, root)
    actions = anims.build_clips(arm)
    if args.renders:
        os.makedirs(args.renders, exist_ok=True)
        studio.build(scene, samples=args.samples or 384, res=(1200, 1500))
        arm.animation_data.action = actions['idle']
        scene.frame_set(0)
        for view in studio.VIEWS:
            studio.render(os.path.join(args.renders, f'{view}.png'), view)
        print(f'RENDERS_OK {args.renders}')
    if args.playblast:
        if not args.renders:
            studio.build(scene)
        export.playblast(arm, actions, args.playblast)
        print(f'PLAYBLAST_OK {args.playblast}')
    if args.glb:
        export.strip_screen_texture(bpy.data.materials['face_screen'])
        export.export_glb(args.glb, root)
        print(f'GLB_OK {args.glb}')


if __name__ == '__main__':
    args = parse()
    if args.concepts:
        run_concepts(args.concepts, args.samples)
    if args.final:
        run_final(args)
