"""check_wordcard_tpl.py —— 普通单词卡通用白板模板的逐词离线验收（DESIGN_MINDMAP_WORDCARD.md §2.4）。
对 VOCAB_DB 里全部普通词（非多义、非功能词；功能词旧版本来就不播动画）× 3 幕：
  1. R1（决策 38 修订：「知识点不丢」取代「文字一字不差上黑板」）：每幕该讲的知识点（见 knowledge()）必须出现在这一幕里——
     板上的词块 / 标签（concept.js 记的 INSIGHT.texts）、顶部讲解字幕（NARR）或底部朗读字幕（SAYS）任一处都算；
     词条按 App 的 wb5PlainData 口径注入，另带两本词源词典互证收录的 __etym / __morph（主文件 ETYM_DB_JSON / MORPH_DB_JSON）；
  2. 在无头浏览器里用打包好的模板（out/wordcard_tpl.html）逐词现场排版：0 报错、确定性（同一时刻两次绘制像素一致）、时长；
  3. 截图抽样：--shots N 随机抽 N 词各一幕拼联络表到 /tmp/wordcard_tpl_sample.png（不入库）。
结果写 ../lab/WORDCARD_TPL_REPORT.md（只记汇总 + 不合格清单）。
用法：python3 v5/check_wordcard_tpl.py [--shots 30] [--part k/n]（分片并行跑，结果存 $WCT_DIR（默认 /tmp）/wct_part_k.json；最后不带 --part、加 --merge n 汇总出报告）"""
import os, asyncio, json, pathlib, subprocess, sys, random, statistics, base64, io, re
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
APP = ROOT / '萌星小学英语_最终合并版.html'
js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');const i=s.indexOf('const VOCAB_DB = ');const j=s.indexOf('];\\n',i);const d=(()=>{const d=eval(s.slice(i+16,j+1));const a=s.indexOf('VOCAB_HEAVY_JSON');if(a>=0){const b=s.indexOf('>',a)+1;const h=JSON.parse(s.slice(b,s.indexOf('</script>',b)));for(const w of d)Object.assign(w,h[w.id]||{});}return d;})();console.log(JSON.stringify(d.filter(w=>!(w.has_polysemy&&w.polysemy_data)&&!w.is_function_word)))"
WS = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
nz = lambda x: ' '.join(str(x or '').split())

def jsonblock(i):
    s = APP.read_text(encoding='utf-8'); a = s.index(f'id="{i}"'); b = s.index('>', a) + 1
    return json.loads(s[b:s.index('</script>', b)])
ETYM, MORPH = jsonblock('ETYM_DB_JSON'), jsonblock('MORPH_DB_JSON')
def lookup(db, w):   # = App 的 etymLookup
    if str(w.get('id', '')).startswith('V6_MORPH_'): return None
    k = str(w.get('word') or '').strip(); return db.get(k) or db.get(k.lower())
for w in WS: w['__etym'], w['__morph'] = lookup(ETYM, w), lookup(MORPH, w)
PH_TIP = re.compile(r'^记忆锦囊：属于【[^】]*】高频核心词。?$')

def knowledge(w, a):   # 每幕必须讲到的知识点（R1 修订：知识点不丢）
    ss = w.get('senses') or []
    s0 = ss[0] if ss else {'pos': w['pos'], 'meaning': w['meaning'], 'ex_en': w['example_en'], 'ex_zh': w['example_zh']}
    if a == 0:
        k = [w['word'], w['phonetic'], f"{w['pos']} {w['meaning']}".strip()]
        syl = [x for x in re.split(r'[-·\s]+', w['syllables'] or '') if x]
        if len(syl) > 1: k += syl if ''.join(syl).lower() == re.sub('[^A-Za-z]', '', w['word']).lower() else [w['syllables']]
        return [nz(x) for x in k if nz(x)]
    if a == 1:
        e, m, k = w['__etym'], w['__morph'], []
        if e and e.get('c'): k += [c[1] for c in e['c']] + [c[0] for c in e['c']] + [w['word']]
        elif m and len(m.get('p') or []) > 1: k += [p[0].strip('-') for p in m['p']] + [w['word']]
        tip = re.sub(r'^📖\s*【[^】]*】\s*', '', nz(w.get('etymology') or w.get('memory_tip')))
        if tip and not PH_TIP.match(tip) and tip != '考场必考不规则/拼写变形词': k.append(tip)
        k += [nz(x) for x in (w.get('memory_assoc') or [])[:1]]
        return [nz(x) for x in k if nz(x)]
    ex = nz(s0.get('ex_en') or w['example_en'])
    k = [] if re.match(r"^Let's learn and use|^Morph form:", ex, re.I) else [ex, nz(s0.get('ex_zh') or w['example_zh'])]
    k += [nz(w.get('syntax_contrast')), nz(w.get('spelling_alert'))]
    return [x for x in k if x]

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
      r.text = [...((S1.INSIGHT && S1.INSIGHT.texts) || []), ...(S1.NARR || []).map(n => n.zh), ...(S1.SAYS || []).flatMap(x => [x.en, x.zh])].join('\n');
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
      for r in res:   # 知识点核对在这里做（--part 分片时不必把整段文字落盘）
          w = next(x for x in mine if x['id'] == r['id']); blob = nz(r.pop('text', '') or '').replace(' ', '')
          r['n'] = len(knowledge(w, r['a'])); r['miss'] = [k for k in knowledge(w, r['a']) if k.replace(' ', '') not in blob] if not r['err'] else []
      if '--part' in sys.argv:
        json.dump({'res': res, 'pics': pics, 'errs': errs}, open(os.path.join(os.environ.get('WCT_DIR', '/tmp'), f'wct_part_{K}.json'), 'w')); print('part saved'); return
    by = {(r['id'], r['a']): r for r in res}
    bad = []
    for w in WS:
      for a in range(3):
        r = by[(w['id'], a)]; miss = r.get('miss') or []
        prob = []
        if miss: prob.append('知识点缺：' + ' / '.join(miss)[:160])
        if r['err']: prob.append('报错：' + r['err'])
        elif not r['det']: prob.append('不确定')
        elif not (8 <= r['dur'] <= 90): prob.append(f"时长 {r['dur']:.0f}s")
        if prob: bad.append(f"| {w['id']} | {w['word']} | 幕{a + 1} | {'；'.join(prob)} |")
    durs = [r['dur'] for r in res if not r['err']]
    rows = sum(r.get('n', 0) for r in res)
    rep = f"""# 普通单词卡通用白板模板 · 逐词验收报告

> 由 `v5/check_wordcard_tpl.py` 生成。模板 v6（决策 38 ①，啊哈卡 `lab/audit38/aha/01_wordcard_tpl.md`）：`v5/scenes/wordcard_tpl.js` + 概念原语 `v5/lib/concept.js`，App 运行时注入词条现场排版。

- 词数：{len(WS)}（VOCAB_DB 全部普通词：非多义、非功能词）× 3 幕 = {len(res)} 幕
- 知识点（R1 修订：知识点不丢，板上 / 讲解字幕 / 朗读字幕任一处）：{rows} 条，缺 {sum(len(r.get('miss') or []) for r in res)} 条
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
