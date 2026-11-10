#!/usr/bin/env python3
"""jscheck.py [主文件.html] —— node --check 验收：抽出主文件全部直接执行的 <script>，拼成一个 js 检查；
按需加载的白板模块（<script type="text/plain" id="wbmod-…">）接在后面一起检查（和运行时一样共享全局作用域），
再逐个单独检查一遍。返回码非 0 = 不通过。
anchorcheck（补丁锚点 / 插入标记）已于 2026-11-09 第六波第 9 项正式废止，不再跑，
见 docs/whiteboard/src/anchorcheck.RETIRED.md。"""
import os, re, subprocess, sys, tempfile
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
s = open(MAIN, encoding='utf-8').read()
tags = list(re.finditer(r'<script([^>]*)>(.*?)</script>', s, flags=re.S))
inline = [m.group(2) for m in tags if 'type=' not in m.group(1) and 'src=' not in m.group(1)]
mods = [(re.search(r'id="([^"]+)"', m.group(1)).group(1), m.group(2)) for m in tags if re.search(r'id="wbmod-[a-z_]+"', m.group(1))]   # 旧模块 2026-10-30 已退役，通常为 0 个
def check(code, name):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f: f.write(code)
    r = subprocess.run(['node', '--check', f.name], capture_output=True, text=True, encoding='utf-8', errors='replace'); os.unlink(f.name)
    if r.returncode: print('FAIL', name, r.stderr[:800])
    return r.returncode == 0
ok = check('\n;\n'.join(inline + [c for _, c in mods]), f'all ({len(inline)} inline + {len(mods)} modules)')
for mid, c in mods: ok = check(c, mid) and ok
print(f"node --check: inline scripts={len(inline)}, lazy modules={len(mods)} →", 'OK' if ok else 'FAIL')
# anchorcheck（补丁锚点 / 插入标记检查）已于 2026-11-09 第六波第 9 项正式废止，
# 见 docs/whiteboard/src/anchorcheck.RETIRED.md：它守护的写入工具与老主文件
# 均已删除，现行主文件从未含这些锚点，继续跑只会永远报 116 项基线失败。
# 此处不再调用 anchorcheck；退出码只由 node --check 决定。
sys.exit(0 if ok else 1)
