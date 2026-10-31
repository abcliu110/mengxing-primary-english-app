#!/usr/bin/env python3
# usage: ci.py "<title>" "<changelog body md>" "<breakpoint md>" [files...]   (commit msg = "决策38: "+title)
import sys, subprocess, re, os
R=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../..')); W=R+'/docs/whiteboard'
title, body, bp = sys.argv[1:4]; files=sys.argv[4:]
now=subprocess.check_output(['bash','-c','TZ=Asia/Tokyo date "+%Y-%m-%d %H:%M"']).decode().strip()
with open(W+'/CHANGELOG.md','a') as f: f.write(f"\n## {now} JST · 决策 38 {title}\n{body}\n")
h=open(W+'/HANDOFF.md').read()
blk=f"<!--R38BP-->**断点（{now} JST）**：{bp}<!--/R38BP-->"
if '<!--R38BP-->' in h: h=re.sub(r'<!--R38BP-->.*?<!--/R38BP-->', lambda m: blk, h, flags=re.S)
else:
    a='   **做法（接手照抄）**'; assert h.count(a)==1; h=h.replace(a, '   '+blk+'\n'+a)
h=re.sub(r'^> 更新：', f'> 更新：{now} JST（决策 38 {title}）；', h, count=1, flags=re.M)
open(W+'/HANDOFF.md','w').write(h)
g=lambda *a: subprocess.run(['git','-C',R,*a],check=True)
g('add','docs/whiteboard/CHANGELOG.md','docs/whiteboard/HANDOFF.md',*files)
g('commit','-q','-m','决策38: '+title)
for i in range(3):
    if subprocess.run(['git','-C',R,'push','-q','origin','master']).returncode==0: break
    g('pull','--rebase','--autostash','-q','origin','master')
print(subprocess.check_output(['git','-C',R,'log','-1','--format=%h %ad %s','--date=format-local:%H:%M'],env={**os.environ,'TZ':'Asia/Tokyo'}).decode())
