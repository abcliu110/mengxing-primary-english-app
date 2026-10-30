"""ttscheck.py —— 决策 29 O3 回归：模拟语音列表（中 / 美 / 英），检查 speakText 选对语言的语音、记住用户的语音、没有英文语音时给提示且不报错。"""
import asyncio
from playwright.async_api import async_playwright
INIT = """(()=>{const vs=[{name:'Fake ZH',lang:'zh-CN'},{name:'Fake US',lang:'en-US'},{name:'Fake GB',lang:'en-GB'}]; window.__spoken=[];
 window.SpeechSynthesisUtterance=function(t){this.text=t;}; const S=window.speechSynthesis; S.getVoices=()=>vs; S.speak=u=>window.__spoken.push([u.text,u.lang,u.voice&&u.voice.name]); S.cancel=()=>{};})()"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.add_init_script(INIT)
        await pg.goto('file://' + str(__import__('pathlib').Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html').replace('\\','/') + ''); await pg.wait_for_timeout(1000)
        await pg.evaluate("speakText('hello','en')"); await pg.evaluate("speakText('你好','zh')"); await pg.evaluate("localStorage.setItem('ttsVoice_en','Fake GB'); speakText('again','en')")
        print(await pg.evaluate("window.__spoken"), errs or 'no errors')
        await pg.evaluate("speechSynthesis.getVoices=()=>[{name:'Only ZH',lang:'zh-CN'}]; document.body.insertAdjacentHTML('beforeend','<div id=ttsStatusNote></div>'); speakText('x','en')")
        r = await pg.evaluate("[window.__spoken.slice(-1), (document.getElementById('ttsStatusNote')||{}).textContent]"); print(r)
        sp = await pg.evaluate("window.__spoken.slice(0,3).map(x=>x[2])")
        ok = sp == ['Fake US', 'Fake ZH', 'Fake GB'] and '没有英文' in (r[1] or '') and not errs
        print('ttscheck:', 'OK' if ok else 'FAIL'); import sys; sys.exit(0 if ok else 1)
        await b.close()
asyncio.run(main())
