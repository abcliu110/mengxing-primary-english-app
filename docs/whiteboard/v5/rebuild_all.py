"""rebuild_all.py —— 引擎 / 字体改动后，把所有 v5 场景重新打包（node build.mjs）并重新替换进 App（embed_app.py，每个页签一次）。
场景文件名 <页签>_<n>.js → App 里 <页签> 第 n-1 号。标题取场景文件第一行注释。"""
import glob, os, re, subprocess, collections, sys
from concurrent.futures import ThreadPoolExecutor
# --resume：只重建比引擎源（auto.js / wb5.js / player.js / engine.js / font_chars.txt）旧的 out/*.html（中途超时后接着跑）；两路并行打包
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
RESUME = '--resume' in sys.argv
if not RESUME: subprocess.run(['python3', 'gen_font_chars.py'], check=True)
SRC_T = max(os.path.getmtime(x) for x in ['scenes/auto.js', 'wb5.js', 'player.js', 'engine.js', 'font_chars.txt', 'build.mjs'])
fresh = lambda o: RESUME and os.path.exists(o) and os.path.getmtime(o) > SRC_T
jobs = []
tabs = collections.defaultdict(list)
for f in sorted(glob.glob('scenes/*_[0-9]*.js')):   # 2026-10-30：原 glob 只认个位案例号，≥10 的幕漏重建
    m = re.match(r'scenes/(.+)_(\d+)\.js$', f)
    if not m: continue
    tab, n = m.group(1), int(m.group(2))
    title = re.match(r'// (.*?) —', open(f, encoding='utf-8').readline()); title = title.group(1) if title else f'{tab} {n}'
    lib = re.search(r"from '\.\./sprites/([a-z0-9_]+)\.js'", open(f, encoding='utf-8').read()).group(1)
    if not os.path.exists(f'sprites/{lib}.js'):   # 自动生成的角色包不进仓库：按场景 ACTS 里用到的帧从 cast/ 重建
        acts = re.search(r'const ACTS = (\{.*?\});', open(f, encoding='utf-8').read())
        names = sorted({x for v in (eval(acts.group(1)) if acts else {}).values() for x in v})
        if names: subprocess.run(['python3', 'sprites/build_sprites.py', lib, *names], check=True, capture_output=True)
        else: open(f'sprites/{lib}.js', 'w').write('export const FR = {}; export const FI = {};\n')
    if not fresh(f'out/{tab}_{n}.html'): jobs.append(['node', 'build.mjs', f, f'out/{tab}_{n}.html', title])
    tabs[tab].append((n - 1, f'out/{tab}_{n}.html'))
if not os.path.exists('sprites/wordtpl.js'):   # 2026-10-30：模板幕的角色包不在 scenes/*_<n>.js 里，沙箱重置后也要重建（帧 = wordcard_items.js 的 ACT_FRAMES）
    fr = sorted(set(re.findall(r"'(l_[a-z0-9_]+)'", open('scenes/wordcard_items.js', encoding='utf-8').read().split('export const ACT_NAMES')[0])))
    subprocess.run(['python3', 'sprites/build_sprites.py', 'wordtpl', *fr], check=True, capture_output=True)
jobs.append(['node', 'build.mjs', 'scenes/wordcard_tpl.js', 'out/wordcard_tpl.html', '单词卡 · 通用白板模板'])
print('build', len(jobs), flush=True)
with ThreadPoolExecutor(2) as ex: list(ex.map(lambda c: subprocess.run(c, check=True, capture_output=True), jobs))   # 普通单词卡通用模板（App 运行时注入词条）
tabs['wordcard_tpl'].append((0, 'out/wordcard_tpl.html'))
for tab, items in tabs.items():
    args = [x for i, p in items for x in (str(i), p)]
    r = subprocess.run(['python3', 'embed_app.py', tab, *args], check=True, capture_output=True, text=True)
    print(tab, len(items), r.stdout.strip().splitlines()[-1])
