const fs=require('fs'),path=require('path');
const dir='/workspace/work/mengxing-primary-english-app/docs/whiteboard/v5/scenes';
const out=[];
for(const f of fs.readdirSync(dir).sort()){
  if(!f.endsWith('.js'))continue;
  const s=fs.readFileSync(path.join(dir,f),'utf8');
  const b=(s.match(/(autoBuild|mindmapBuild)\(/)||[])[1]||'custom';
  let items=null,acts=null,title=null,extra=null;
  const mi=s.match(/const ITEMS = (\[[\s\S]*?\n\]);/);
  const ma=s.match(/const ACTS = (\{.*?\});/);
  try{ if(mi) items=eval(mi[1]); }catch(e){items='ERR'}
  try{ if(ma) acts=eval('('+ma[1]+')'); }catch(e){acts='ERR'}
  const mt=s.match(/title: '([^']*)'/); if(mt)title=mt[1];
  if(b==='mindmapBuild'){ const md=s.match(/mindmapBuild\(SP, (\{[\s\S]*\})\);/); extra=md?md[1].slice(0,3000):null;}
  out.push({f,b,title,items,acts,size:s.length,extra, head:b==='custom'?s.slice(0,1500):null});
}
fs.writeFileSync('scenes.json',JSON.stringify(out));
console.log(out.length, out.filter(x=>x.items==='ERR').length, out.filter(x=>x.b==='autoBuild'&&!x.items).map(x=>x.f));
