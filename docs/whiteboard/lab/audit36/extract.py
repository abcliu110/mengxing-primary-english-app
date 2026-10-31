import re,base64,gzip,sys,os
src=open('/workspace/work/mengxing-primary-english-app/萌星小学英语_最终合并版.html',encoding='utf-8').read()
blobs={}
for m in re.finditer(r'<script type="text/plain" id="wb5blob-([0-9a-f]{16})"[^>]*>(.*?)</script>',src,re.S):
    t=m.group(2)
    if t.startswith('gz:'): t=gzip.decompress(base64.b64decode(t[3:])).decode()
    blobs[m.group(1)]=t
n=0
for m in re.finditer(r'<script type="text/plain" id="wb5html-([^"]+)"([^>]*)>(.*?)</script>',src,re.S):
    key,attrs,body=m.groups()
    t=gzip.decompress(base64.b64decode(body.strip())).decode() if 'data-gz' in attrs else body
    t=t.replace('</wb5-script','</script')
    t=re.sub(r'@@B:([0-9a-f]{16})@@',lambda x:blobs.get(x.group(1),''),t)
    open(f'html/{key}.html','w').write(t); n+=1
print(n,len(blobs))
