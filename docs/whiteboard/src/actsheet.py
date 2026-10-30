#!/usr/bin/env python3
"""actsheet.py <页签 id> [案例序号…] [--out 目录] —— R4v2 动作联络表（决策 30，SOP §16）。
在主文件里挂载每个案例，找出全部 k.verb 专属动作（S.acts 里 action 以 verb: 开头），
每个动作按 WB_VERBS.PHASES 取 预备 / 发力 / 结果 三帧（结果帧取动作结束后 0.3 秒），拼成一张表：
一行一个动作，左边标动作 id 和登记的动作词。输出 <目录>/<id>_<n>_动作表.png，逐张人工看：看得出谁、做什么、对谁、在哪。
"""
import os, sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
out = args[args.index('--out') + 1] if '--out' in args else os.path.join(os.getcwd(), 'shots')
args = [a for a in args if a not in ('--out', out)]
tab = args[0]; only = [int(x) for x in args[1:]]
MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))
os.makedirs(out, exist_ok=True)
font = None
for f in ['/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc', '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
    if os.path.exists(f): font = ImageFont.truetype(f, 22); break
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 980, "height": 620})
    pg.goto('file://' + MAIN); pg.wait_for_timeout(800)
    n = pg.evaluate(f"(()=>{{wbLoadAll();return (WB_LAB['{tab}']||[]).length}})()")
    for i in (only or range(n)):
        pg.evaluate("""([tab,i])=>{document.body.innerHTML='<svg id="ss" style="width:960px;height:600px;background:#fdfdfb"></svg>';
          window._p=WB.mount(document.getElementById('ss'),WB_LAB[tab][i].build,7+i);}""", [tab, i])
        # 取 S.acts：包一层 build 再挂一次拿登记（mount 不暴露 S；脚本是确定的，时间和上面一致）
        acts = pg.evaluate("""([tab,i])=>{const rec=[];const k0=WB.mount(document.createElementNS('http://www.w3.org/2000/svg','svg'),k=>{WB_LAB[tab][i].build(k);(k.S.acts||[]).forEach(a=>{if(String(a.action).startsWith('verb:'))rec.push({id:a.verb,t:a.t,dur:a.dur,words:a.words||[],who:a.look})});},7+i);
          return rec.map(a=>({...a, ph:(WB_VERBS.PHASES[a.id]||[.15,.5,.98])}))}""", [tab, i])
        if not acts: print(f"{tab} #{i+1}: 没有 k.verb 专属动作（R4v2 不通过）"); continue
        W, H = 440, 231; rows = []
        for a in acts:
            ims = []
            for j, q in enumerate(a['ph']):
                t = a['t'] + a['dur'] * q + (.3 if j == 2 else 0)
                pg.evaluate(f"_p.render({t})"); pg.wait_for_timeout(30)
                p = f"/tmp/actsheet_{j}.png"; pg.locator('#ss').screenshot(path=p); ims.append(Image.open(p).crop((0, 90, 820, 520)).resize((W, H)))
            rows.append((a, ims))
        sheet = Image.new('RGB', (220 + 3 * W, len(rows) * (H + 10) + 40), 'white'); d = ImageDraw.Draw(sheet)
        for c, lab in enumerate(['预备', '发力', '结果']): d.text((220 + c * W + 8, 8), lab, fill='black', font=font)
        for r, (a, ims) in enumerate(rows):
            y = 40 + r * (H + 10)
            d.text((8, y + 20), a['id'], fill='black', font=font); d.text((8, y + 56), a['who'], fill='gray', font=font)
            d.text((8, y + 92), ' / '.join(a['words'])[:16], fill='blue', font=font)
            for c, im in enumerate(ims): sheet.paste(im, (220 + c * W, y))
        fn = os.path.join(out, f"{tab}_{i+1}_动作表.png"); sheet.save(fn); print(fn, len(rows), '个动作')
    b.close()
