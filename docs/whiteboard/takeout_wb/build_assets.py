import numpy as np, json, base64, io
from PIL import Image
info={}; data={}
def orange(a):
    rgb=a[...,:3].astype(int); return (rgb[...,0]>180)&(rgb[...,1]>50)&(rgb[...,1]<140)&(rgb[...,2]<90)&(a[...,3]>128)
for n in ['k1','k2','k3','w0','w1','w2','w3','d0','d1','d2','d3']:
    im=Image.open(f'frames/{n}.png')
    if im.height>720: im=im.resize((round(im.width*720/im.height),720),Image.LANCZOS)
    a=np.array(im); al=a[...,3]>128; h,w=al.shape; ys,xs=np.nonzero(al)
    d={'w':w,'h':h,'bottom':int(ys.max())}
    if n[0]=='w':
        d['ax']=float(np.nonzero(al[:int(h*.3)])[1].mean())
        y0=int(h*.45); band=al[y0:int(h*.62)]; r=np.nonzero(band); fx=r[1].max(); d['hand']=[float(fx-10),float(r[0][r[1]==fx].mean()+y0)]
    if n[0]=='d':
        o=orange(a); oy,ox=np.nonzero(o); d['ax']=float(ox.mean()); d['collar']=[float(ox.mean()),float(oy.max()-4)]
    info[n]=d
    b=io.BytesIO(); im.save(b,'WEBP',quality=82,method=6); data[n]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
json.dump(info,open('frames/info.json','w'),indent=1)
open('assets.js','w').write('window.FR='+json.dumps(data)+';window.FI='+json.dumps(info)+';')
import os; print(os.path.getsize('assets.js')); print(json.dumps({k:v for k,v in info.items() if k[0]=='d'}))
