"""gen_font_chars.py —— 收集所有 v5 场景（scenes/*.js）用到的非 ASCII 字符写进 font_chars.txt：全 App 共用一份字体子集（体积预算）。新增 / 改动场景后重跑，再全部重建。"""
import glob, os
HERE = os.path.dirname(os.path.abspath(__file__))
ch = set()
for f in glob.glob(os.path.join(HERE, 'scenes', '*.js')): ch |= {c for c in open(f, encoding='utf-8').read() if ord(c) > 127}
open(os.path.join(HERE, 'font_chars.txt'), 'w', encoding='utf-8').write(''.join(sorted(ch)))
print(len(ch), 'chars')
