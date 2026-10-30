"""do_unit.py <units.json> <页签> —— 批量重画一个单元：每幕 生成 → 打包 → R1 → 联络表 → embed_app 替换进 App → log_done；最后 app_check 回归。
units.json：{页签: {"field": 状态字段, "lib": 库前缀, "cases": {"1": {"title": 标题, "acts": {词: [帧…]}}…}}}"""
import json, sys, subprocess, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
U = json.load(open(sys.argv[1], encoding='utf-8')); tab = sys.argv[2]; u = U[tab]
inv = f'../lab/INVENTORY_{tab.upper()}_EXPORT.md'
if not os.path.exists(inv): subprocess.run(f'python3 ../src/export_inventory.py {tab} > {inv}', shell=True, check=True)
n_all = len(re.findall(r'^## 案例 ', open(inv, encoding='utf-8').read(), re.M))
only = sys.argv[3:]
for n in range(1, n_all + 1):
    if only and str(n) not in only: continue
    c = u['cases'].get(str(n), {}); title = c.get('title') or f"{u.get('name', tab)} · {n}"
    acts = c.get('acts', {}); frames = sorted({f for v in acts.values() for f in v})
    lib = f"{u['lib']}{n}"
    out = subprocess.run(['./run_auto.sh', tab, str(n), lib, inv, title, json.dumps(acts, ensure_ascii=False), *frames], capture_output=True, text=True)
    print(out.stdout.strip()); 
    if out.returncode: print(out.stderr[-2000:]); sys.exit(1)
    r1 = re.search(r'(\d+) 条，缺 (\d+)', out.stdout); dur = re.search(r'dur ([\d.]+)', out.stdout).group(1)
    assert r1.group(2) == '0' and 'errors none sandbox none' in out.stdout and 'deterministic True' in out.stdout, 'acceptance failed'
    subprocess.run(['python3', 'embed_app.py', tab, str(n - 1), f'out/{tab}_{n}.html'], check=True, capture_output=True)
    subprocess.run(['python3', 'log_done.py', tab, str(n), str(n_all), f'{r1.group(1)}/{r1.group(1)}', str(round(float(dur))), title], check=True)
chk = ['python3', 'app_check2.py', u['field'], tab, str(n_all)] if u['field'] in ('fp', 'wo', 'ze') else ['python3', 'app_check.py', tab, u['field'], str(n_all)]
r = subprocess.run(chk, capture_output=True, text=True); print(r.stdout, r.stderr[-800:])
