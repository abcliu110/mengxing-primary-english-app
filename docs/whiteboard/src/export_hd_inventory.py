"""export_hd_inventory.py <名称> <幕数> '<进入页面的 JS>' [每幕前额外 JS 模板，{i} = 幕号] —— 三大厅 HD 剧场（canvas）内容清单导出（R1 零丢失，决策 23）。
做法：在真 App 里打开页面，每一幕锁定 hdTheaterState.actIdx，跑约 4 秒动画，截获 canvas 上画出的每一段文字（fillText，按首次出现顺序去重）
和字幕条 drawHDSubtitleBar(标签, 英文, 中文)（= 同步配音解说的内容）。输出格式与 export_inventory.py 相同（v5/gen_auto.py、r1v5.py 直接用）。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
name, n, enter = sys.argv[1], int(sys.argv[2]), sys.argv[3]
per = sys.argv[4] if len(sys.argv) > 4 else ''
HOOK = """(() => { if (window.__hdHook) return; window.__hdHook = 1; window.__hdTxt = []; window.__hdSub = [];
  const f = CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText = function (s, ...a) { if (window.__hdOn) window.__hdTxt.push(String(s)); return f.call(this, s, ...a); };
  window.__hdFull = [];   // 横幅 / 工作台标题等：记原始整句（canvas 上可能被截断）
  const wrapFull = (nm, idx) => { const o = window[nm]; if (!o) return; window[nm] = function () { if (window.__hdOn) idx.forEach(k => { const v = arguments[k]; if (typeof v === 'string' && v.trim()) window.__hdFull.push(v); }); return o.apply(this, arguments); }; };
  wrapFull('drawTopPrincipleBanner', [2, 3, 4]); wrapFull('drawCenterWorkbench', [1]);
  const ac = window.drawHDCharacterActor; window.drawHDCharacterActor = function () { const was = window.__hdOn; window.__hdOn = 0; try { return ac.apply(this, arguments); } finally { window.__hdOn = was; } };   // HD 角色名牌（Robot Max / Mia 等）不算教学内容：v5 由 cast 人物替代
  const sb = window.drawHDSubtitleBar; window.drawHDSubtitleBar = function (ctx, W, H, lab, en, zh) { if (window.__hdOn) window.__hdSub.push([lab, en, zh]); return sb.apply(this, arguments); };
})()"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1200)
        await pg.evaluate(HOOK)
        out = [f'# 内容清单（R1 零丢失）：三大厅 HD 剧场 `{name}`\n\n> 由 `src/export_hd_inventory.py` 从主文件导出（canvas 文字 + 字幕条 / 配音）。重画后逐条打勾：新位置只增不减。\n']
        for i in range(n):
            await pg.evaluate(enter); await pg.wait_for_timeout(300)
            if per: await pg.evaluate(per.replace('{i}', str(i))); 
            await pg.evaluate(f"hdTheaterState.actIdx = {i}; hdTheaterState.manualActLock = true; window.__hdTxt = []; window.__hdSub = []; window.__hdFull = []; window.__hdOn = 1;")
            await pg.wait_for_timeout(4500)
            txt, sub, full = await pg.evaluate("(() => { window.__hdOn = 0; return [window.__hdTxt, window.__hdSub, window.__hdFull]; })()")
            seen, rows, t = set(), [], 0.0
            subs = {(s[0], s[1], s[2]) for s in sub}
            subtxt = {x for s in subs for x in s}
            nz = lambda x: ' '.join(str(x).replace('|', '｜').split())
            fulls = [nz(x) for x in full]
            big = [nz(x) for s in subs for x in s] + fulls + [nz(f'{s[1]} ｜ {s[2]}') for s in subs]
            seq = []
            for x in full: seq.append(('F', x))
            for x in txt: seq.append(('T', x))
            for kind, s in seq:
                s = nz(s)
                if not s or s in seen or s in subtxt: continue
                if kind == 'T' and any(s != b and (s.rstrip('…') in b) for b in big): continue   # 被截断 / 字幕条里画出来的片段：用原句
                seen.add(s); rows.append((t, '白板', s)); t += 1.0
            for lab, en, zh in sorted(subs):
                if lab and lab not in seen: rows.append((t, '白板', lab)); seen.add(lab); t += 1.0
                rows.append((t, '朗读', f'{en} ｜ {zh}')); t += 1.0
            out.append(f'\n## 案例 {i + 1}（HD 第 {i + 1} 幕）\n\n| ☐ | 时间 | 类型 | 内容 |\n|---|---|---|---|\n' + '\n'.join(f'| ☐ | {tm:.1f}s | {ty} | {tx.replace("|", "｜")} |' for tm, ty, tx in rows) + '\n')
        dst = pathlib.Path(__file__).resolve().parents[1] / 'lab' / f'INVENTORY_HD_{name.upper()}_EXPORT.md'
        dst.write_text(''.join(out), encoding='utf-8'); print(dst.name, 'errors', errs[:3] or 'none'); await b.close()
asyncio.run(main())
