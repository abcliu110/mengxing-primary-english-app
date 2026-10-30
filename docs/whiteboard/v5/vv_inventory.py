"""vv_inventory.py —— 万能动词剧场（VV，主文件 wbmod-vv）旧内容导出：每个词组 → lab/INVENTORY_VV_<KEY>_EXPORT.md，
案例 1 = 旧「① 本义」幕，案例 2 = 旧「② 第二义」幕 + 「③ 合成」卡（合成卡并入 ②，R1 零丢失）。
做法：在浏览器里逐 0.1 s 调 VV.render(key, t) 纯函数，收集出现过的每一段文字（按首次出现时间）；底部字幕条（白字英文 + 黄字中文）记为「朗读」。
另把 VERB_VECTOR_COMBINATIONS 的 本义 / 词义 记为字幕（App 原文）。"""
import asyncio, pathlib, json, html
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parents[3]; APP = ROOT / '萌星小学英语_最终合并版.html'; LAB = ROOT / 'docs/whiteboard/lab'
JS = r"""() => { wbLoadModule('vv'); const A = (typeof vvAssets === 'function') ? vvAssets() : {}; const out = {};
 const keys = Object.keys(VERB_VECTOR_COMBINATIONS).filter(k => VV.has(k));
 for (const k of keys) { const tm = VV.timing(k); const seen = new Map(); const P = new DOMParser();
  for (let t = 0; t < tm.dur; t += 0.1) { const doc = P.parseFromString(VV.render(k, t, A), 'image/svg+xml');
   const op = el => { let o = 1; for (let e = el; e && e.getAttribute; e = e.parentNode) { const v = e.getAttribute('opacity'); if (v !== null) o *= +v; } return o; };
   const texts = [...doc.querySelectorAll('text')].filter(e => op(e) > 0.05 && e.textContent.trim());
   for (let i = 0; i < texts.length; i++) { const e = texts[i], s = e.textContent.trim();
     if (e.getAttribute('y') === '292' && e.getAttribute('fill') === '#fff') { const z = texts[i + 1] ? texts[i + 1].textContent.trim() : ''; const key = 'S|' + s + ' ｜ ' + z; if (!seen.has(key)) seen.set(key, t); i++; continue; }
     const key = 'W|' + s; if (!seen.has(key)) seen.set(key, t); } }
  out[k] = { tm, items: [...seen.entries()].map(([key, t]) => [t, key]), combo: VERB_VECTOR_COMBINATIONS[k] }; }
 return out; }"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(); await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        D = await pg.evaluate(JS); await b.close()
    for k, d in D.items():
        t1, t2, dur = d['tm']['t1'], d['tm']['t2'], d['tm']['dur']; c = d['combo']
        cases = {1: [(0.0, '字幕', f"{c['phrase']}：{c['literal']}")], 2: [(t1, '字幕', f"{c['phrase']}：{c['meaning']}")]}
        for t, key in sorted(d['items']):
            typ, s = key[0], html.unescape(key[2:])
            cases[1 if t < t1 else 2].append((t, '朗读' if typ == 'S' else '白板', s))
        cases[2].append((dur, '朗读', f"{c['exEn']} ｜ {c['exZh']}"))
        md = [f"# 内容清单（R1 零丢失）：`vv_{k}`（万能动词剧场 {c['phrase']}）\n", "> 由 `v5/vv_inventory.py` 从主文件 VV 模块逐帧导出。案例 1 = 旧 ① 本义；案例 2 = 旧 ② 第二义 + ③ 合成。\n"]
        for n in (1, 2):
            rows = cases[n]; span = (t1 if n == 1 else dur - t1)
            md.append(f"## 案例 {n}（约 {round(span)} 秒）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|")
            md += [f"| ☐ | {t:.1f}s | {typ} | {s.replace('|', '｜')} |" for t, typ, s in rows]; md.append('')
        (LAB / f'INVENTORY_VV_{k.upper()}_EXPORT.md').write_text('\n'.join(md), encoding='utf-8')
    print(len(D), 'phrases'); print(json.dumps(list(D), ensure_ascii=False))
asyncio.run(main())
