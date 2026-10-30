"""check_wordcard_tpl.py —— 普通单词卡通用白板模板的逐词离线验收（DESIGN_MINDMAP_WORDCARD.md §2.4）。
对 VOCAB_DB 里全部普通词（非多义、非功能词；功能词旧版本来就不播动画）× 3 幕：
  1. R1：旧 wordModalCanvas 非多义分支画的全部文字（这里独立按旧代码重写一遍，但用完整原句、不截断）必须一字不差出现在模板生成的 ITEMS 里；
  2. 在无头浏览器里用打包好的模板（out/wordcard_tpl.html）逐词现场排版：0 报错、确定性（同一时刻两次绘制像素一致）、时长；
  3. 截图抽样：--shots N 随机抽 N 词各一幕拼联络表到 /tmp/wordcard_tpl_sample.png（不入库）。
结果写 ../lab/WORDCARD_TPL_REPORT.md（只记汇总 + 不合格清单）。
用法：python3 v5/check_wordcard_tpl.py [--shots 30] [--part k/n]（分片并行跑，结果存 $WCT_DIR（默认 /tmp）/wct_part_k.json；最后不带 --part、加 --merge n 汇总出报告）"""
import os, asyncio, json, pathlib, subprocess, sys, random, statistics, base64, io
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
APP = ROOT / '萌星小学英语_最终合并版.html'
js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');const i=s.indexOf('const VOCAB_DB = ');const j=s.indexOf('];\\n',i);const d=eval(s.slice(i+16,j+1));console.log(JSON.stringify(d.filter(w=>!(w.has_polysemy&&w.polysemy_data)&&!w.is_function_word)))"
WS = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
nz = lambda x: ' '.join(str(x or '').split())

def old_texts(w, a):   # 旧 canvas（startWordModalCanvasAnim 非多义分支）上的全部文字，完整原句
    ss = w.get('senses') or []
    s0 = ss[0] if ss else {'pos': w['pos'], 'meaning': w['meaning'], 'ex_en': w['example_en'], 'ex_zh': w['example_zh']}
    co = w.get('collocations') or {}
    verbs = ' / '.join((co.get('verbs') or [])[:3]) or w['word']
    ety = (w.get('etymology') or '').replace('📖 【秒懂造词小故事】', '').replace('📖 【秒懂巧记小故事】', '')
    rows = ['词源与构词原理', f"{w['emoji']} {w['word']} {w['phonetic']} — 【{w['pos']}】{w['meaning']}", w.get('affix_root') or w.get('memory_tip'),
            f"🔬 『{w['word']}』三维深度解剖：象形词源 × 构词家族 × 汉英句法防坑",
            f"① 词源与音节拆解：【{w['syllables']}】{w.get('memory_tip') or ''}", ety,
            f"② 积木构词与搭配：{(w.get('affix_root') or '').replace('🧩 ', '').split('｜')[0]}", f"常用搭配动词：{verbs}",
            f"③ 地道例句：{s0['ex_en']} ({s0['ex_zh']})", w.get('syntax_contrast'),
            f"精讲第{a + 1}幕", s0['ex_en'], f"{w['word']} ({w['pos']} {w['meaning']})：{s0['ex_zh']}"]
    return [nz(r) for r in rows if nz(r)]

PAGE = r"""async ([ws, shots]) => {
  const out = [], pics = [];
  const cv = document.createElement('canvas'); cv.width = 1920; cv.height = 1080; const g = cv.getContext('2d');
  const px = t => { g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,1920,1080); return cv.toDataURL('image/png'); };
  for (const w of ws) for (let a = 0; a < 3; a++) {
    const r = { id: w.id, a, err: null };
    try {
      globalThis.__WB5_WORD__ = w; globalThis.__WB5_ACT__ = a;
      const S1 = globalThis.__WB5_SCENE__(); await S1.loadAssets();
      const S2 = globalThis.__WB5_SCENE__(); await S2.loadAssets();
      r.dur = S1.DUR; r.cues = S1.CUES.length; 
      let same = true;
      for (const f of [0.2, 0.5, 0.85]) {
        S1.drawFrame(g, S1.DUR * f); const p1 = cv.toDataURL('image/png');
        S2.drawFrame(g, S2.DUR * f); const p2 = cv.toDataURL('image/png');
        if (p1 !== p2) same = false;
      }
      r.det = same;
      if (shots.includes(w.id + ':' + a)) { S1.drawFrame(g, S1.DUR * 0.45); pics.push([w.word + ' #' + (a + 1), cv.toDataURL('image/jpeg', 0.6)]); }
    } catch (e) { r.err = String(e && e.stack || e).slice(0, 300); }
    out.push(r);
  }
  return [out, pics];
}"""

async def main():
    nshot = int(sys.argv[sys.argv.index('--shots') + 1]) if '--shots' in sys.argv else 0
    random.seed(7); shots = [f"{w['id']}:{random.randrange(3)}" for w in random.sample(WS, min(nshot, len(WS)))]
    # 模板生成的 ITEMS：用 node 直接跑同一份 wordcard_items.js（R1 只看数据，不依赖浏览器）
    p = subprocess.run(['node', '--input-type=module', '-e', f"import {{ wordItems }} from '{(HERE / 'scenes/wordcard_items.js').as_posix()}'; import fs from 'fs'; const ws = JSON.parse(fs.readFileSync(0, 'utf8')); console.log(JSON.stringify(ws.map(w => [0,1,2].map(a => wordItems(w, a)))));"],
                       input=json.dumps(WS, ensure_ascii=False), capture_output=True, text=True, check=True)
    items = json.loads(p.stdout)
    r1 = []
    for w, acts in zip(WS, items):
        for a in range(3):
            blob = '\n'.join(nz(x) for it in acts[a] for x in it[1:] if isinstance(x, str))
            miss = [t for t in old_texts(w, a) if t not in blob]
            r1.append((w, a, len(old_texts(w, a)), miss))
    res, pics, errs = [], [], []
    if '--merge' in sys.argv:
        for k in range(int(sys.argv[sys.argv.index('--merge') + 1])):
            d = json.load(open(os.path.join(os.environ.get('WCT_DIR', '/tmp'), f'wct_part_{k}.json'))); res += d['res']; pics += d['pics']; errs += d['errs']
    else:
      part = sys.argv[sys.argv.index('--part') + 1] if '--part' in sys.argv else '0/1'; K, NP = map(int, part.split('/'))
      mine = WS[K::NP]
      async with async_playwright() as pw:
        b = await pw.chromium.launch(); pg = await b.new_page()
        pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
        await pg.goto((HERE / 'out/wordcard_tpl.html').as_uri()); await pg.evaluate('window.__ready')
        for i in range(0, len(mine), 40):
            o, ps = await pg.evaluate(PAGE, [mine[i:i + 40], shots]); res += o; pics += ps
            print(f'{min(i + 40, len(mine))}/{len(mine)}', flush=True)
        await b.close()
      if '--part' in sys.argv:
        for r in res: r.pop('text', None)
        json.dump({'res': res, 'pics': pics, 'errs': errs}, open(os.path.join(os.environ.get('WCT_DIR', '/tmp'), f'wct_part_{K}.json'), 'w')); print('part saved'); return
    by = {(r['id'], r['a']): r for r in res}
    bad = []
    for w, a, n, miss in r1:
        r = by[(w['id'], a)]
        prob = []
        if miss: prob.append('R1 缺：' + ' / '.join(miss))
        if r['err']: prob.append('报错：' + r['err'])
        elif not r['det']: prob.append('不确定')
        elif not (20 <= r['dur'] <= 180): prob.append(f"时长 {r['dur']:.0f}s")
        if prob: bad.append(f"| {w['id']} | {w['word']} | 幕{a + 1} | {'；'.join(prob)} |")
    durs = [r['dur'] for r in res if not r['err']]
    rows = sum(n for _, _, n, _ in r1)
    rep = f"""# 普通单词卡通用白板模板 · 逐词验收报告

> 由 `v5/check_wordcard_tpl.py` 生成（设计：`DESIGN_MINDMAP_WORDCARD.md` §2.4）。模板：`v5/scenes/wordcard_tpl.js` + `wordcard_items.js`，App 运行时注入词条现场排版。

- 词数：{len(WS)}（VOCAB_DB 全部普通词：非多义、非功能词）× 3 幕 = {len(res)} 幕
- R1：旧舞台文字 {rows} 条（完整原句），缺 {sum(len(m) for *_, m in r1)} 条
- 报错：{sum(1 for r in res if r['err'])} 幕；页面控制台错误 {len(errs)} 条
- 确定性：{sum(1 for r in res if r.get('det'))}/{len(res)} 幕同一时刻两次绘制像素一致
- 时长：最短 {min(durs):.0f}s · 中位 {statistics.median(durs):.0f}s · 最长 {max(durs):.0f}s

## 不合格清单（{len(bad)}）

| id | 单词 | 幕 | 问题 |
|---|---|---|---|
""" + ('\n'.join(bad) if bad else '| — | — | — | 无 |') + '\n'
    (ROOT / 'docs/whiteboard/lab/WORDCARD_TPL_REPORT.md').write_text(rep, encoding='utf-8')
    print(rep.split('## 不合格')[0]); print('bad', len(bad)); print('\n'.join(bad[:20])); print(errs[:5])
    if pics:
        from PIL import Image, ImageDraw
        ims = [Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).resize((480, 270)) for _, u in pics]
        cols = 5; sheet = Image.new('RGB', (cols * 490, ((len(ims) + cols - 1) // cols) * 300), '#ddd')
        for k, (im, (lab, _)) in enumerate(zip(ims, pics)):
            x, y = (k % cols) * 490, (k // cols) * 300; sheet.paste(im, (x + 5, y + 25)); ImageDraw.Draw(sheet).text((x + 8, y + 6), lab, fill='black')
        sheet.save('/tmp/wordcard_tpl_sample.png'); print('sheet /tmp/wordcard_tpl_sample.png')
asyncio.run(main())
