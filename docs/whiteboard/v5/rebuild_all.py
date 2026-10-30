"""rebuild_all.py —— 引擎 / 字体改动后，把所有 v5 场景重新打包（node build.mjs）并重新替换进 App（embed_app.py，每个页签一次）。
场景文件名 <页签>_<n>.js → App 里 <页签> 第 n-1 号。标题取场景文件第一行注释。"""
import glob, os, re, subprocess, collections
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
subprocess.run(['python3', 'gen_font_chars.py'], check=True)
tabs = collections.defaultdict(list)
for f in sorted(glob.glob('scenes/*_[0-9].js')):
    m = re.match(r'scenes/(.+)_(\d+)\.js$', f); tab, n = m.group(1), int(m.group(2))
    title = re.match(r'// (.*?) —', open(f, encoding='utf-8').readline()); title = title.group(1) if title else f'{tab} {n}'
    lib = re.search(r"from '\.\./sprites/([a-z0-9_]+)\.js'", open(f, encoding='utf-8').read()).group(1)
    if not os.path.exists(f'sprites/{lib}.js'):   # 自动生成的角色包不进仓库：按场景 ACTS 里用到的帧从 cast/ 重建
        acts = re.search(r'const ACTS = (\{.*?\});', open(f, encoding='utf-8').read())
        names = sorted({x for v in (eval(acts.group(1)) if acts else {}).values() for x in v})
        if names: subprocess.run(['python3', 'sprites/build_sprites.py', lib, *names], check=True, capture_output=True)
        else: open(f'sprites/{lib}.js', 'w').write('export const FR = {}; export const FI = {};\n')
    subprocess.run(['node', 'build.mjs', f, f'out/{tab}_{n}.html', title], check=True, capture_output=True)
    tabs[tab].append((n - 1, f'out/{tab}_{n}.html'))
for tab, items in tabs.items():
    args = [x for i, p in items for x in (str(i), p)]
    r = subprocess.run(['python3', 'embed_app.py', tab, *args], check=True, capture_output=True, text=True)
    print(tab, len(items), r.stdout.strip().splitlines()[-1])
