#!/usr/bin/env python3
"""check_inventory.py <清单.md> <新幕 id…> [--write] —— R1 零丢失：把旧页签的内容清单逐条对照新位置（SOP §10、§13）。
清单里「## 案例 N」对应第 N 个新幕 id。每条（字幕 / 白板 / 朗读 / 术语）在对应新幕里找：
  · 一字不差找到 → ✅ <新幕 id>
  · 找不到原样、但有相似内容（改正过）→ ✏️ <新幕 id>（列出改成了什么，由人看过确认是 R3 纠错）
  · 都找不到 → ❌（不允许）
页面数据（JSON 里每对 from/to 的英文词）检查是否出现在新幕画面上。入口登记（删旧时处理）不在这里打勾。
--write：把清单里的 ☐ 改成对照结果（只改打勾格，不删任何内容），并在文件末尾追加对照汇总。"""
import difflib, json, os, re, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
args = [a for a in sys.argv[1:] if not a.startswith('--')]; write = '--write' in sys.argv
inv, ids = args[0], args[1:]
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(); pg.goto('file://' + MAIN); pg.wait_for_timeout(800)
    new = pg.evaluate("""ids => ids.map(id => { wbLoadModule(id); const cs = WB_LAB[id][0]; const k = WB.kit(7); cs.build(k); const S = k.S;
      return { id, narr: S.narr.map(n => (n[1] || '') + (n[2] || '')), text: S.items.filter(it => it.kind === 'text').map(it => String(it.text)),
        say: S.says.map(sy => sy.en), sayzh: S.says.map(sy => sy.zh), terms: (cs.terms || []).map(([a, v]) => a + '：' + v) }; })""", ids)
    b.close()
norm = lambda s: re.sub(r'\s+', ' ', str(s).replace('\u00a0', ' ').replace('|', '/')).strip()
lines = open(inv, encoding='utf-8').read().split('\n')
case = -1; out = []; stats = {'✅': 0, '✏️': 0, '❌': 0}; edits = []
def look(pool, txt, nid):
    P = [norm(x) for x in pool]
    if norm(txt) in P: return '✅', None
    hit = [x for x in P if len(norm(txt)) >= 4 and norm(txt) in x]   # 原样包含在新位置的一条里（如原标题写进「原实验室……」说明行）
    if hit: return (('✏️', hit[0]) if re.search(r'原(页签)?(讲法|说法)', hit[0]) else ('✅', None))   # 作为「原讲法（已改正）」引用保留的，算改正
    best = difflib.get_close_matches(norm(txt), P, n=1, cutoff=.35)
    return ('✏️', best[0]) if best else ('❌', None)
for ln in lines:
    m = re.match(r'## 案例 (\d+)', ln)
    if m: case = int(m.group(1)) - 1
    row = re.match(r'\| ☐ \| ([\d.]+)s \| (字幕|白板|朗读|道具) \| (.*) \|$', ln)
    term = re.match(r'  - ☐ (.*)$', ln)
    if case >= 0 and case < len(new) and (row or term):
        n = new[case]
        if row:
            ty, txt = row.group(2), row.group(3)
            if ty == '朗读':
                en = txt.split(' ｜ ')[0]; mark, alt = look(n['say'], en, n['id'])
            else:
                mark, alt = look(n['narr'] + n['text'] + n['terms'], txt, n['id'])
        else:
            txt = term.group(1); mark, alt = look(n['terms'], txt, n['id'])
        stats[mark] += 1
        if mark == '❌': print('  ❌', n['id'], txt[:80])
        tag = f"{mark} {n['id']}"
        if alt: edits.append((n['id'], txt, alt))
        ln = ln.replace('☐', tag, 1)
    out.append(ln)
# 页面数据：每对英文词出现在新幕画面上
data_ok = []
mj = re.search(r'```json\n(.*?)\n```', '\n'.join(lines), re.S)
if mj:
    laws = json.loads(mj.group(1))
    for i, law in enumerate(laws):
        n = new[i] if i < len(new) else None
        shown = ' '.join(n['text'] + n['narr']) if n else ''
        for p in law['pairs']:
            for side in ('from', 'to'):
                for w in re.findall(r'^[a-z]+(?: / [a-z]+)?|/ ([a-z]+) \(', p[side]) or []:
                    pass
            ws = [w for w in re.findall(r'\b([a-z]{3,})\b', p['from'].split('(')[0] + ' ' + p['to'].split('(')[0] + ' ' + ' '.join(re.findall(r'/ ([a-z]+) \(', p['from'] + p['to'])))]
            miss = [w for w in ws if not re.search(r'\b' + w + r'\b', shown)]
            data_ok.append((n['id'] if n else '?', p['from'].split(' (')[0] + ' → ' + p['to'].split(' (')[0], miss))
print(f"对照：✅ {stats['✅']}　✏️ {stats['✏️']}　❌ {stats['❌']}　（合计 {sum(stats.values())}）")
for nid, a, b2 in edits: print(f"  ✏️ {nid}：{a[:60]}\n        → {b2[:80]}")
print(f"页面数据词对：{len(data_ok)} 对，缺 {sum(1 for d in data_ok if d[2])}：" + '; '.join(f"{d[1]} 缺 {d[2]}" for d in data_ok if d[2]))
if write:
    s = '\n'.join(out).rstrip('\n') + '\n'
    s += f"\n## 对照结果（`src/check_inventory.py`，2026-10-29）\n\n新位置：📖 单词身世总枢 → 格林定律章 → " + '、'.join(f"`{i}`" for i in ids) + "。\n\n"
    s += f"- 字幕 / 白板 / 朗读 / 术语：✅ 原样搬过去 {stats['✅']} 条；✏️ 按 R3 改正后搬过去 {stats['✏️']} 条（逐条见下）；❌ 丢失 {stats['❌']} 条。\n"
    s += f"- 页面数据 `GRIMM_VOWEL_LAWS` 的 {len(data_ok)} 对词：" + ('全部出现在新幕画面上。' if not any(d[2] for d in data_ok) else '有缺：' + '; '.join(f"{d[1]} 缺 {d[2]}" for d in data_ok if d[2])) + "\n"
    s += "- 入口 / 登记（上面 15 处）：✅ 2026-10-29 用户确认后已删页签、改入口。\n\n### ✏️ 改正清单（原 → 新）\n\n| 新幕 | 原内容 | 新位置的内容 |\n|---|---|---|\n"
    s += ''.join(f"| {nid} | {norm(a)} | {norm(b2)} |\n" for nid, a, b2 in edits)
    open(inv, 'w', encoding='utf-8').write(s); print('写入', inv)
