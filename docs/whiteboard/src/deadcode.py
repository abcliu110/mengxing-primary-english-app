#!/usr/bin/env python3
"""deadcode.py [--json] —— 决策 29 O6：列出主文件里无引用的代码。
① JS：直接执行的 <script> 里顶层 function 声明（src/fnranges.js，需要 acorn），在「整个主文件去掉它自己的函数体」+「全部 wb5 共享块解压后」
   都找不到名字（整词）的 = 零引用。反复迭代：删掉零引用函数后，只被它们调用的函数也算零引用（--json 输出带轮次）。
   动态拼名调用（window[name]()、'fn' + x）扫不出来，所以白名单 KEEP 里的不报。
② CSS：@keyframes 名字没有任何 animation 引用的；以及浏览器里实际不生效的 @keyframes（见 O6 记录：`.method-hub @keyframes x` 前缀写法整条被丢弃）。
只报告不改；删除由 src/patch_deadcode.py 做。"""
import json, re, subprocess, sys, pathlib, base64, gzip
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
KEEP = set()
def blobs(s):
    out = []
    for m in re.finditer(r'<script type="text/plain" id="(wb5[^"]*)">([\s\S]*?)</script>', s):
        t = m.group(2).strip()
        if t.startswith('gz:'): t = t[3:]
        try: out.append(gzip.decompress(base64.b64decode(t)).decode('utf-8', 'replace'))
        except Exception: pass
    return '\n'.join(out)
def scan(s):
    fns = json.loads(subprocess.run(['node', str(HERE / 'fnranges.js'), str(APP)], capture_output=True, text=True, check=True, env={'NODE_PATH': '/tmp/acorn/node_modules', 'PATH': '/usr/local/bin:/usr/bin:/bin'}).stdout)
    extra = blobs(s)
    from collections import Counter
    ID = re.compile(r'(?<![\w$])[A-Za-z_$][\w$]*')
    names = {f['name'] for f in fns}
    tot = Counter(m.group(0) for m in ID.finditer(s) if m.group(0) in names) + Counter(m.group(0) for m in ID.finditer(extra) if m.group(0) in names)
    inner = [Counter(m.group(0) for m in ID.finditer(s[f['start']:f['end']]) if m.group(0) in names) for f in fns]
    dead_all, rounds, removed = [], [], set()
    while True:
        cnt = Counter(tot)
        for i in removed: cnt.subtract(inner[i])
        new = [i for i, f in enumerate(fns) if i not in removed and f['name'] not in KEEP and cnt[f['name']] - inner[i][f['name']] <= 0]
        if not new: break
        rounds.append([fns[i]['name'] for i in new]); removed |= set(new); dead_all += [fns[i] for i in new]
    return fns, dead_all, rounds
def keyframes(s):
    names = re.findall(r'@keyframes\s+([\w-]+)', s); out = []
    for k in names:
        refs = [m for m in re.finditer(r'animation(?:-name)?\s*:[^;"}]*(?<![\w-])' + re.escape(k) + r'(?![\w-])', s)]
        broken = bool(re.search(r'\.method-hub\s*(?:/\*[\s\S]*?\*/\s*)?@keyframes\s+' + re.escape(k) + r'\b', s))
        out.append({'name': k, 'refs': len(refs), 'broken_prefix': broken})
    return out
if __name__ == '__main__':
    s = APP.read_text(encoding='utf-8')
    fns, dead, rounds = scan(s); kf = keyframes(s)
    if '--json' in sys.argv:
        print(json.dumps({'dead': [{'name': f['name'], 'start': f['start'], 'end': f['end']} for f in dead], 'rounds': rounds, 'keyframes': kf}, ensure_ascii=False)); sys.exit(0)
    print(f'顶层函数 {len(fns)} 个；零引用 {len(dead)} 个（{len(rounds)} 轮），约 {sum(f["end"] - f["start"] for f in dead)} 字符')
    for i, r in enumerate(rounds): print(f'  第 {i + 1} 轮：', ' '.join(r))
    bad = [k for k in kf if not k['refs'] or k['broken_prefix']]
    print(f'@keyframes {len(kf)} 个；无引用或不生效 {len(bad)} 个：', ' '.join(k['name'] for k in bad))
