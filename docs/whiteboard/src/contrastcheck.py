"""contrastcheck.py [--list] —— 决策 37 / R37-14：按钮文字 / 背景对比度（WCAG 2.x）。入 runall。
390 px 下逐页扫所有可见按钮（button、[role=button]、可点的 .pill-tab / .nav-btn / [onclick] 块里直接带字的元素）：
  文字色取 computed color（含 opacity）；背景沿祖先找第一个不透明背景，渐变取所有色标里最差的一个；
  门槛：普通字 ≥ 4.5:1，大字（≥ 24 px，或 ≥ 18.66 px 且加粗 ≥ 700）≥ 3:1；disabled 按钮不计（WCAG 例外）。"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
SCREENS = ["goHome()", "navigateTo('vocab_hall')", "navigateTo('grammar_hall')", "navigateTo('oral_hall')", "navigateTo('principles_hub')",
           "navigateTo('practice_hub')", "navigateTo('word_list')", "navigateTo('grammar_detail', { gId: 'G01' })", "navigateTo('grammar_detail', { gId: 'G20' })",
           "navigateTo('super_lab_hub', { labTab: 'tense_matrix' })", "navigateTo('my_study')", "navigateTo('self_test')", "navigateTo('app_map')",
           "navigateTo('method_hub')", "navigateTo('word_origins_hub')", "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })",
           "navigateTo('word_list'); setTimeout(()=>openWordCardModal(VOCAB_DB[0].id), 200)", "openParentGateChallenge(); renderParentSettingsPanel()"]
JS = r"""()=>{
 function parse(c){const m=c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0],p[1],p[2],p.length>3?p[3]:1]}
 function lum(c){const f=v=>{v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4)}; return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])}
 function blend(top,bot){const a=top[3]; return [top[0]*a+bot[0]*(1-a), top[1]*a+bot[1]*(1-a), top[2]*a+bot[2]*(1-a), 1]}
 function bgs(el){ // 返回候选背景色列表（渐变取全部色标）
   let stack=[]; for(let e=el; e && e.nodeType===1; e=e.parentElement){ const cs=getComputedStyle(e);
     const img=cs.backgroundImage; if(img && img!=='none' && /gradient/.test(img)){ const cols=[...img.matchAll(/rgba?\([^)]+\)/g)].map(x=>parse(x[0])); if(cols.length){ stack.push({grad:cols}); break; } }
     const c=parse(cs.backgroundColor); if(c && c[3]>0){ stack.push({c}); if(c[3]>=0.99) break; } }
   let base=[[255,255,255,1]];
   for(let i=stack.length-1;i>=0;i--){ const s=stack[i]; if(s.grad) base=s.grad.map(g=>g[3]<1? blend(g,[255,255,255,1]) : g); else base=base.map(b=>blend(s.c,b)); }
   return base }
 const out=[]; const seen=new Set();
 const els=[...document.querySelectorAll('button, [role=button], .pill-tab, .nav-btn, label[style*="background"], [onclick]')];
 const cand=new Set(); for(const c of els){ if(c.disabled) continue; cand.add(c); c.querySelectorAll('span,b,strong,div,i,em').forEach(x=>cand.add(x)); }
 for(const el of cand){ if(!el.offsetParent && getComputedStyle(el).position!=='fixed') continue;
   const r=el.getBoundingClientRect(); if(r.width<8||r.height<8) continue;
   const txt=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join('').replace(/[\s\u{1F000}-\u{1FFFF}\u2600-\u27BF\uFE0F]/gu,''); if(!txt) continue;
   const cs=getComputedStyle(el); let fg=parse(cs.color); if(!fg) continue; const op=+cs.opacity;
   const B=bgs(el); let worst=99; for(const b of B){ let f=fg[3]<1? blend(fg,b):fg; if(op<1) f=blend([f[0],f[1],f[2],op], b); const L1=lum(f), L2=lum(b); const cr=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05); worst=Math.min(worst,cr); }
   const fs=parseFloat(cs.fontSize), fw=+cs.fontWeight||400; const large= fs>=24 || (fs>=18.66 && fw>=700); const need= large?3:4.5;
   if(worst<need){ const key=cs.color+'|'+B.map(b=>b.map(Math.round).join(',')).join(';'); if(seen.has(key)) continue; seen.add(key);
     out.push({t:el.textContent.trim().slice(0,18), cr:Math.round(worst*100)/100, need, color:cs.color, bg:B.map(b=>'rgb('+b.slice(0,3).map(Math.round).join(',')+')').join(' / '), cls:el.className&&String(el.className).slice(0,30)}) } }
 return out }"""
async def main():
    bad = 0; lst = '--list' in sys.argv
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(APP.as_uri()); await pg.wait_for_timeout(1500)
        allk = set()
        for js in SCREENS:
            try: await pg.evaluate(js)
            except Exception as e: print(js[:40], 'nav err', str(e)[:80]); continue
            await pg.wait_for_timeout(500)
            r = await pg.evaluate(JS)
            r = [x for x in r if (x['color'], x['bg']) not in allk]
            for x in r: allk.add((x['color'], x['bg']))
            bad += len(r)
            if r: print(js[:50], len(r)); [print('   ', x) for x in (r if lst else r[:6])]
            try: await pg.evaluate("closeParentGate()") if 'ParentGate' in js else None
            except Exception: pass
        await b.close()
    print('errors', errs[:5] or 'none'); print('不合格', bad)
asyncio.run(main())
