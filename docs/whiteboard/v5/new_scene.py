"""new_scene.py <内容稿.txt> —— 新内容（不是旧白板搬迁）做成 v5 幕：内容稿 → R1 清单 → gen_auto → 打包 → R1 核对 → 截图验收 → 嵌入 App。
内容稿（docs/whiteboard/content/*.txt）格式：
  第一行  #tab=<页签> case=<幕号 1 起> lib=<角色库名> title=<标题> acts=<JSON：动作词→帧>
  其余每行一条：n|中文字幕   w|白板字   s|English sentence.|中文|先读的词(可省)
清单写到 lab/INVENTORY_<TAB>_<n>_NEW.md（与旧清单同格式，r1v5.py 直接核对）；每条间隔 1 秒（不会被 gen_auto 当成菜单）。
验收不过（R1 缺条 / 不确定 / 报错）不嵌入、返回非 0。"""
import sys, os, re, json, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
src = sys.argv[1]; lines = [l.rstrip('\n') for l in open(src, encoding='utf-8') if l.strip()]
head = dict(re.findall(r'(\w+)=((?:\{.*\})|(?:[^ ]+(?: [^=#]+(?= \w+=|$))?))', lines[0].lstrip('#')))
tab, n, lib, title, acts = head['tab'], int(head['case']), head['lib'], head['title'].strip(), json.loads(head.get('acts', '{}'))
T = {'n': '字幕', 'w': '白板'}; rows = []
for k, l in enumerate(lines[1:]):
    p = l.split('|')
    if p[0] == 's': rows.append(('朗读', f"{p[1]} ｜ {p[2]}" + (f" 〔先读：{p[3]}〕" if len(p) > 3 and p[3] else '')))
    else: rows.append((T[p[0]], p[1]))
nz = lambda x: ' '.join(x.replace('|', '｜').split())
inv = f'../lab/INVENTORY_{tab.upper()}_{n}_NEW.md'
open(inv, 'w', encoding='utf-8').write(f'# 内容清单（新内容）：`{tab}` 幕 {n}\n\n> 由 `v5/new_scene.py {os.path.relpath(src, HERE)}` 从内容稿生成；新幕必须逐条包含（R1）。\n\n## 案例 {n}（{title}）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|\n' + ''.join(f'| ☐ | {i:.1f}s | {t} | {nz(x)} |\n' for i, (t, x) in enumerate(rows)))
frames = sorted({f for v in acts.values() for f in v})
r = subprocess.run(['./run_auto.sh', tab, str(n), lib, inv, title, json.dumps(acts, ensure_ascii=False), *frames], capture_output=True, text=True)
print(r.stdout.strip()[-1500:])
if r.returncode: print(r.stderr[-1500:]); sys.exit(1)
m = re.search(r'(\d+) 条，缺 (\d+)', r.stdout)
ok = m and m.group(2) == '0' and 'errors none sandbox none' in r.stdout and 'deterministic True' in r.stdout
if not ok: print('验收不过，不嵌入'); sys.exit(2)
if '--no-embed' not in sys.argv:
    subprocess.run(['python3', 'embed_app.py', tab, str(n - 1), f'out/{tab}_{n}.html'], check=True)
print('OK', tab, n, m.group(0))
