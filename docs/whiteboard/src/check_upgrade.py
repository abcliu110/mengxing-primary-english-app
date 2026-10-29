#!/usr/bin/env python3
"""check_upgrade.py <升级前.js> <升级后.js> <输出.md> <标题> —— v2 升级零丢失对照：升级前文件里每个字符串都要原样出现在新文件。"""
import re,sys
cls,new,out,title=sys.argv[1:5]
def strs(f):
    s=open(f).read(); s=s[s.index('build(k)'):]
    return [m.group(1) for m in re.finditer(r'"((?:[^"\\]|\\.)*)"',s)]
code=open(new).read(); flat=code.replace('\\n','')
rows=[]; lost=0
for x in strs(cls):
    if len(x)<2 or x in {"middle","start"} or re.fullmatch(r'[a-z_]+',x): continue
    ok = x in code or x in flat
    if not ok: lost+=1
    rows.append(f"| {'✅' if ok else '❌'} | {x.replace('|','｜')} |")
open(out,'w').write(f"# 内容清单（R1 零丢失）：{title}\n\n> 由 `src/check_upgrade.py` 逐条对照升级前文件 `{cls.split('/')[-1]}` 里的全部字幕 / 白板文字 / 朗读 / 术语字符串，检查是否原样出现在新文件 `{new.split('/')[-1]}`（金句卡里的换行不计）。\n\n| ☐ | 原内容 |\n|---|---|\n"+'\n'.join(rows)+f"\n\n## 结论\n\n- 共 {len(rows)} 条：✅ {len(rows)-lost}，❌ 丢失 {lost}。\n- 升级前文件原样保留，可随时回退。\n")
print(len(rows),lost)
