import asyncio,base64,io,sys,json,pathlib
from playwright.async_api import async_playwright
from PIL import Image,ImageDraw
names=sys.argv[1].split(','); N=int(sys.argv[2]) if len(sys.argv)>2 else 8
pathlib.Path('shots').mkdir(exist_ok=True)
async def one(b,name):
    pg=await b.new_page(viewport={'width':1300,'height':800}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(pathlib.Path(f'html/{name}.html').resolve().as_uri())
    await pg.evaluate('window.__ready')
    dur=await pg.evaluate('window.__dur'); cues=await pg.evaluate('window.__cues')
    ts=[round(dur*(i+0.5)/N,2) for i in range(N)]
    tiles=[]
    for t in ts:
        d=await pg.evaluate(f'(()=>{{window.__seek({t});return document.getElementById("stage").toDataURL("image/png")}})()')
        tiles.append((t,Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('RGB')))
    await pg.close()
    cols=4;rows=(len(tiles)+cols-1)//cols
    sh=Image.new('RGB',(480*cols+10*(cols+1),270*rows+10*(rows+1)),'#d8d6d2')
    for i,(t,im) in enumerate(tiles):
        x,y=10+(i%cols)*490,10+(i//cols)*280
        sh.paste(im.resize((480,270)),(x,y));ImageDraw.Draw(sh).text((x+6,y+4),f't={t}s',fill='#EF7226')
    sh.save(f'shots/{name}.png')
    return {'name':name,'dur':dur,'cues':cues,'errs':errs}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        res=await asyncio.gather(*[one(b,n) for n in names])
        await b.close()
    for r in res:
        open(f'shots/{r["name"]}.json','w').write(json.dumps(r,ensure_ascii=False))
        print(r['name'],r['dur'],len(r['cues'] or []),r['errs'] or '')
asyncio.run(main())
