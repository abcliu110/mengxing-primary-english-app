#!/usr/bin/env python3
"""export_inventory.py <页签/幕 id> [数据数组名] [页签名关键字…] —— R1 零丢失「内容清单」导出（SOP §10 第 1 步）。
在主文件里逐个案例执行 build，按时间顺序列出：讲解字幕（N）、白板文字（T）、道具文字、朗读（say：英文 / 中文 / 先读的词）、
徽章、彩蛋词、术语小词典；再导出页面数据数组（如 GRIMM_VOWEL_LAWS）原文，和主文件里所有指向这个页签的入口（navigateTo / labTab / TABS 登记）。
搬迁 / 合并时逐条打勾对照，新位置只增不减，全部对上才能删旧的。输出 Markdown 到标准输出。"""
import json, os, re, sys
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
tab = sys.argv[1]; arr = sys.argv[2] if len(sys.argv) > 2 else None; keys = sys.argv[3:] or [tab]
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page()
    pg.goto('file://' + MAIN); pg.wait_for_timeout(800)
    res = pg.evaluate("""([tab, arr]) => {
      if (typeof wbLoadModule === 'function') wbLoadModule(tab);
      const cases = (WB_LAB[tab] || []).map((cs, i) => {
        const k = WB.kit(7 + i); cs.build(k); const S = k.S, ev = [];
        (S.narr || []).forEach(n => ev.push([n[0], '字幕', (n[1] || '') + (n[2] || '')]));
        S.items.forEach(it => { if (it.kind === 'text' && String(it.text).trim()) ev.push([it.t, '白板', it.text]); });
        (S.extraTexts || []).forEach(x => ev.push([x.t, '道具', x.text]));
        (S.says || []).forEach(sy => ev.push([sy.t, '朗读', sy.en + (sy.zh ? ' ｜ ' + sy.zh : '') + (sy.word ? ' 〔先读：' + sy.word + '〕' : '')]));
        ev.sort((a, b) => a[0] - b[0]);
        return { i, end: S.at, ev, badges: S.badges || [], eggs: S.eggs || [], terms: cs.terms || [], actionWords: cs.actionWords || [] };
      });
      let data = null; try { data = arr ? eval(arr) : null; } catch (e) { data = 'ERR ' + e.message; }
      return { cases, data };
    }""", [tab, arr])
    b.close()
src = open(MAIN, encoding='utf-8').read()
print(f"# 内容清单（R1 零丢失）：`{tab}`\n\n> 由 `src/export_inventory.py {' '.join(sys.argv[1:])}` 从主文件导出。搬迁时逐条打勾：新位置只增不减。\n")
for c in res['cases']:
    print(f"## 案例 {c['i'] + 1}（约 {c['end']:.0f} 秒）\n")
    print("| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|")
    for t, ty, txt in c['ev']:
        print(f"| ☐ | {max(0, t):.1f}s | {ty} | {str(txt).replace('|', '/').replace(chr(10), ' ')} |")
    print(f"\n- 徽章：{' '.join(c['badges']) or '（无）'}　彩蛋词：{', '.join(c['eggs']) or '（无）'}")
    if c['actionWords']: print(f"- 动作词：{', '.join(a['word'] for a in c['actionWords'])}")
    if c['terms']:
        print("- 术语小词典：")
        for k, v in c['terms']: print(f"  - ☐ {k}：{v}")
    print()
if arr:
    print(f"## 页面数据 `{arr}`（原文）\n\n```json\n{json.dumps(res['data'], ensure_ascii=False, indent=1)}\n```\n")
print("## 主文件里的入口 / 登记（删旧时逐个处理）\n")
lines = src.split('\n')
for i, ln in enumerate(lines):
    if any(k in ln for k in keys) and 'WB_LAB.' not in ln and not ln.startswith('<script type="text/plain"'):
        print(f"- ☐ 第 {i + 1} 行：`{ln.strip()[:160].replace('`', '´')}`")
