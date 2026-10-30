"""log_done.py <页签> <第几幕> <总幕数> <R1 条数> <时长秒> <幕名> —— 每幕替换进 App 后更新 REDRAW_V5 / HANDOFF / CHANGELOG（SOP §17 收尾）。"""
import re, sys, os, datetime
tab, n, tot, r1, dur, name = sys.argv[1:7]; n, tot = int(n), int(tot)
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
app = os.path.getsize(os.path.join(D, '..', '..', '萌星小学英语_最终合并版.html'))
p = os.path.join(D, 'REDRAW_V5.md'); s = open(p, encoding='utf-8').read()
m = re.search(rf'^\| (\d+) \| `{tab}` \| (\d+) \| (.*?) \|(.*?)\|$', s, re.M)
done = f'{n}/{tot} 幕 v5.1 已替换进 App' + ('（单元完成 ✅）' if n == tot else '')
if m:
    prev = m.group(3); prev = '' if prev.startswith('⬜') else re.sub(r'^\S+ \d+/\d+ 幕 v5\.1 已替换进 App(（单元完成 ✅）)?；?', '', prev)
    note = f'{"✅" if n == tot else "🟡"} {done}；{prev}{"；" if prev else ""}第{n}幕 {name}（R1 {r1}，{dur} s）'
    s = s[:m.start()] + f'| {m.group(1)} | `{tab}` | {m.group(2)} | {note} | 见 git log |' + s[m.end():]
    open(p, 'w', encoding='utf-8').write(s)
if '--redraw-only' in sys.argv: sys.exit()
p = os.path.join(D, 'HANDOFF.md'); s = open(p, encoding='utf-8').read()
line = f'- ✅ `{tab}` 第{n}/{tot}幕 {name} v5.1 重画并替换进 App（`v5/scenes/{tab}_{n}.js`，R1 {r1}，{dur} s，0 报错；主文件 {app:,} bytes）'
s = re.sub(rf'^- ✅ `{tab}` 第{n}/{tot}幕 .*\n', '', s, flags=re.M)
s = s.replace('- **用户规则（2026-10-30 14:05）', line + '\n- **用户规则（2026-10-30 14:05）', 1)
open(p, 'w', encoding='utf-8').write(s)
cl = open(os.path.join(D, 'CHANGELOG.md'), encoding='utf-8').read()
if f'· {tab} 第{n}幕 v5.1' not in cl: open(os.path.join(D, 'CHANGELOG.md'), 'a', encoding='utf-8').write(f'\n## {datetime.date.today()} · {tab} 第{n}幕 v5.1 重画并替换进 App\n- {name}：R1 {r1}，{dur} s，主文件 {app:,} bytes。\n')
print('logged', tab, n, tot)
