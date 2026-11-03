import json, pathlib
SRC = pathlib.Path('/tmp/mengxing2/laws-prototype/model')
OUT = pathlib.Path.home() / 'workspace/mengxing-etymology-prototype/etymology-prototype.html'
data = json.load(open(SRC/'etymology.json'))
banklist = json.load(open(SRC/'wordbank.json'))
bank = {w['word'].lower(): w for w in banklist}
ver = sorted([r for r in data if r['status']=='verified'], key=lambda r: r['word'])
pend = sorted([{'word': r['word'], 'pending_reason': r.get('pending_reason','')} for r in data if r['status']!='verified'], key=lambda r: r['word'])
FLAG = ['school','charge','camp','law','horse','beach','gentle','magazine','lunatic','coin','doctor','light']
assert all(any(r['word']==w for r in ver) for w in FLAG), 'flagship not all verified'
banksub = {}
for r in ver + pend:
    b = bank.get(r['word'])
    if b: banksub[r['word']] = {'phonetic': b.get('phonetic_gb') or b.get('phonetic') or '', 'meaning': b.get('meaning',''), 'pos': b.get('pos',''), 'emoji': b.get('emoji','') or '', 'theme': (b.get('theme_macro','') or '')}
payload = {'verified': ver, 'pending': pend, 'bank': banksub, 'flagship': FLAG, 'bankTotal': len(banklist)}
pj = json.dumps(payload, ensure_ascii=False).replace('</', '<\\/')
html = r'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>词源故事 · 数据层评审原型</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:#faf6ee;color:#2b2620;line-height:1.65}
.wrap{max-width:1060px;margin:0 auto;padding:14px 14px 70px}
header.top{background:linear-gradient(135deg,#8a5a1e,#b8862e);color:#fff;border-radius:0 0 20px 20px;padding:20px 18px 14px;margin:-14px -14px 14px}
header.top h1{margin:0 0 6px;font-size:24px}
header.top p{margin:0;opacity:.92;font-size:14px}
.card{background:#fff;border:1px solid #e8dfc9;border-radius:14px;padding:16px;margin:0 0 14px}
h2{font-size:19px;margin:2px 0 10px;color:#7a4d14}
h3{font-size:16px;margin:14px 0 8px;color:#7a4d14}
.tag{display:inline-block;background:#f3e9d2;color:#7a4d14;border-radius:999px;padding:1px 10px;font-size:12px;margin:0 6px 6px 0}
.num{font-size:30px;font-weight:700;color:#8a5a1e}
.small{font-size:12.5px;color:#8a8272}
.big{font-size:19px;line-height:1.6;font-weight:600}
button,.chipbtn{cursor:pointer}
.flaggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.flag{background:#fffdf6;border:1.5px solid #e3cf9e;border-radius:12px;padding:12px;text-align:left;font:inherit;width:100%}
.flag b{font-size:18px;color:#31449c}
.flag .mech{font-size:13.5px;margin:6px 0}
.flag .mini{font-size:12px;color:#8a5a1e}
.searchrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.searchrow input{flex:1;min-width:180px;padding:10px 12px;border:1.5px solid #d8cba6;border-radius:10px;font-size:15px;background:#fff}
.letters{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0}
.letters button{border:1px solid #d8cba6;background:#fff;border-radius:8px;padding:3px 9px;font-size:13px;min-height:32px}
.letters button.on{background:#8a5a1e;color:#fff}
.wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:6px}
.wchip{border:1px solid #e8dfc9;background:#fff;border-radius:10px;padding:7px 8px;text-align:left;font:inherit;min-height:44px}
.wchip b{color:#31449c;font-size:14.5px}
.wchip span{display:block;font-size:11.5px;color:#8a8272;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.journey{display:flex;gap:0;overflow-x:auto;padding:6px 2px 12px;-webkit-overflow-scrolling:touch}
.station{flex:0 0 auto;width:158px;background:#fdf8ec;border:1.5px solid #e3cf9e;border-radius:12px;padding:10px}
.station .per{font-size:11.5px;color:#b8862e;font-weight:700}
.station .lang{font-size:12.5px;color:#8a8272}
.station .form{font-size:18px;font-weight:700;color:#31449c;margin:2px 0;word-break:break-word}
.station .gloss{font-size:13px}
.arrow{align-self:center;flex:0 0 auto;padding:0 5px;color:#b8862e;font-size:18px;font-weight:700}
.pathcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.pathcard{background:#f6fbff;border:1.5px solid #cfdff0;border-radius:12px;padding:12px}
.pathcard .m{font-size:16px;font-weight:700;color:#31449c}
.pathcard .p{font-size:12px;color:#8a8272}
.pathcard .h{font-size:13.5px;margin-top:4px}
.vs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vs>div{border-radius:12px;padding:12px}
.vs .old{background:#fdf3e3;border:1.5px solid #eec27f}
.vs .now{background:#eef7ee;border:1.5px solid #a9d3a9}
.hooks li{margin:4px 0}
details.adult{background:#f4f1ea;border:1px solid #ddd3bd;border-radius:12px;padding:10px 14px}
details.adult summary{cursor:pointer;font-weight:700;color:#7a4d14;min-height:32px}
.srcitem{font-size:13.5px;margin:6px 0}
a{color:#31449c}
.navrow{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
.navrow button{border:1.5px solid #31449c;color:#31449c;background:#fff;border-radius:9px;padding:7px 14px;font-size:14px;min-height:38px}
.hero{background:linear-gradient(135deg,#fdf3e3,#fde9b8);border:1.5px solid #eec27f;border-radius:14px;padding:16px;margin-bottom:14px}
.pendgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:5px;max-height:420px;overflow-y:auto}
.pchip{border:1px solid #ddd;background:#f2f2f0;color:#999;border-radius:8px;padding:5px 6px;font-size:13px;min-height:34px}
.pchip.on{border-color:#8a5a1e;color:#8a5a1e;background:#fdf8ec}
#pendDetail{background:#fdf8ec;border:1.5px dashed #d8cba6;border-radius:12px;padding:12px;margin-top:10px;font-size:14px}
@media (max-width:720px){
 .journey{flex-direction:column;overflow-x:visible}
 .station{width:auto}
 .arrow{transform:rotate(90deg);padding:2px 0}
 .vs{grid-template-columns:1fr}
}
</style>
</head>
<body>
<div class="wrap">
<header class="top"><h1>📖 词源故事 · 数据层评审原型</h1><p>词库里每个词「是从哪儿来的」——这一页展示的全部词源事实，都来自已核源的词源数据层，逐字呈现，不加编造。</p></header>
<div id="app"></div>
</div>
<script id="etym-data" type="application/json">__PAYLOAD__</script>
<script>
const D = JSON.parse(document.getElementById('etym-data').textContent);
const VER = D.verified, PEND = D.pending, BANK = D.bank, FLAG = D.flagship;
const byWord = {}; VER.forEach(r=>byWord[r.word]=r);
const app = document.getElementById('app');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let curLetter = '', curQuery = '', curPend = '';

function miniChain(r){
  const ms = r.semantic_path.map(s=>s.meaning);
  return ms.join(' → ');
}
function home(){
  const stats = '<div class="card"><h2>这层数据是什么</h2>'
    + '<p>给词库的每个词补一份「出身档案」：它从哪种语言来、最早是什么意思、意思怎么一步步变成今天这样。档案只收查有实据的——双源互证通过的才进产品。</p>'
    + '<div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:8px">'
    + '<div><div class="num">'+VER.length+'</div><div class="small">verified · 可进产品</div></div>'
    + '<div><div class="num" style="color:#999">'+PEND.length+'</div><div class="small">待核 · 按卡住的原因分五组（本页下方灰置）</div></div>'
    + '<div><div class="num" style="color:#bbb">'+(D.bankTotal-VER.length-PEND.length)+'</div><div class="small">未收 · 没有可靠词源，不强建档案</div></div></div></div>';
  const flags = '<div class="card"><h2>⭐ 旗舰故事词</h2><p class="small">故事性最强的 12 个：意思在路上跳了好几站，或者有一个让人记得住的转折画面。点开看完整词页。</p><div class="flaggrid">'
    + FLAG.map(w=>{ const r=byWord[w]; return '<button class="flag" onclick="goWord(\''+w+'\')"><b>'+esc(w)+'</b><div class="mech">'+esc(r.mechanism_sentence)+'</div><div class="mini">'+esc(miniChain(r))+'</div></button>'; }).join('') + '</div></div>';
  app.innerHTML = stats + flags
    + '<div class="card"><h2>全部已核词（'+VER.length+'）</h2>'
    + '<div class="searchrow"><input id="q" type="search" placeholder="搜一个词，如 school / window / coin…" value="'+esc(curQuery)+'" oninput="curQuery=this.value;renderGrid()"></div>'
    + '<div class="letters">' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(L=>'<button class="'+(curLetter===L?'on':'')+'" onclick="curLetter=curLetter===\''+L+'\'?\'\':\''+L+'\';home()">'+L+'</button>').join('') + '</div>'
    + '<div class="wgrid" id="wgrid"></div></div>'
    + '<div class="card"><h2 style="color:#999">待核（'+PEND.length+'）· 还不能进产品</h2><p class="small">待核不是同一种情况：下面按卡住的原因分成五组。点任意词，看它具体卡在哪——不展示半成品的来源链。</p>'
    + pendGroups()
    + '<div id="pendDetail">' + pendDetail() + '</div></div>';
  renderGrid();
}
function pendCat(reason){ var m=/^([a-z_]+)/.exec(reason||''); var c=m?m[1]:''; if(c==='compositional')return 0; if(c.indexOf('form_of_')===0)return 1; if(c==='origin_unknown'||c==='origin_unconfirmed')return 2; if(c==='trunk_unsettled'||c==='trunk_divergent'||c==='sources_split'||c==='motivation_unsettled')return 3; return 4; }
var PGROUPS=[
 ['🧩 拼一拼就懂的词','这些词不用另查身世：拆开部件，意思就全出来了（比如 classroom = class + room）。它们的故事在词根词缀区讲，这里不重复立档。'],
 ['🔁 是熟词的变形','它们是已立档词的变形（过去式、过去分词、复数等），和基词共用一份身世，看基词的词源页就行。'],
 ['❓ 身世还没查清','词典们自己都写着「来源未定」——这类词的身世是真悬案。宁可留个问号，也不编故事。'],
 ['⚖️ 专家说法还没对齐','几个来源的说法并存、还没对上号。先把分歧如实记下来，等证据更齐了再立档。'],
 ['📄 还差一份证据','目前只找到一个可靠来源。按规矩要两个独立来源对上才立档，差的那份补上就来。']];
function pendChip(p){ return '<button class="pchip'+(curPend===p.word?' on':'')+'" onclick="curPend=\''+p.word.replace(/'/g,"\\'")+'\';home();document.getElementById(\'pendDetail\').scrollIntoView({block:\'nearest\'})">'+esc(p.word)+'</button>'; }
function pendGroups(){ return PGROUPS.map(function(g,gi){ var items=PEND.filter(function(p){return pendCat(p.pending_reason)===gi;}); if(!items.length)return ''; return '<h3 style="color:#8a8272">'+g[0]+'（'+items.length+'）</h3><p class="small">'+g[1]+'</p><div class="pendgrid">'+items.map(pendChip).join('')+'</div>'; }).join(''); }
function pendDetail(){
  if(!curPend) return '点上面任意一个灰词，这里会写清它卡在哪一步。';
  const p = PEND.find(x=>x.word===curPend);
  return '<b>'+esc(p.word)+'</b> 的情况：<br>'+esc(p.pending_reason || '暂无登记原因');
}
function renderGrid(){
  const g = document.getElementById('wgrid'); if(!g) return;
  const q = curQuery.trim().toLowerCase();
  const list = VER.filter(r => (!curLetter || r.word[0].toUpperCase()===curLetter) && (!q || r.word.includes(q)));
  g.innerHTML = list.length ? list.map(r=>'<button class="wchip" onclick="goWord(\''+r.word+'\')"><b>'+esc(r.word)+'</b><span>'+esc((BANK[r.word]||{}).meaning||'')+'</span></button>').join('') : '<p class="small">没有符合的词。</p>';
}
function goWord(w){ location.hash = '#/word/' + encodeURIComponent(w); }
function wordPage(w){
  const r = byWord[w]; if(!r){ home(); return; }
  const b = BANK[w] || {};
  const idx = VER.findIndex(x=>x.word===w);
  const prev = idx>0 ? VER[idx-1].word : null, next = idx<VER.length-1 ? VER[idx+1].word : null;
  const path = r.semantic_path;
  let h = '<div class="navrow"><button onclick="location.hash=\'\'">← 返回索引</button>'
    + (prev?'<button onclick="goWord(\''+prev+'\')">← 上一词 '+esc(prev)+'</button>':'')
    + (next?'<button onclick="goWord(\''+next+'\')">下一词 '+esc(next)+' →</button>':'') + '</div>';
  h += '<div class="card"><div style="font-size:30px;font-weight:800;color:#31449c">'+esc(r.word)+' <span style="font-size:20px">'+esc(b.emoji||'')+'</span></div>'
    + '<div>'+ (b.phonetic?'<span class="tag">'+esc(b.phonetic)+'</span>':'') + (b.pos?'<span class="tag">'+esc(b.pos)+'</span>':'') + (b.meaning?'<span class="tag">'+esc(b.meaning)+'</span>':'') + '<span class="small">（音标与释义为词库登记字段）</span></div>'
    + '<h2 style="margin-top:12px">词源故事 · '+esc(r.word)+'：从「'+esc(path[0].meaning)+'」到「'+esc(path[path.length-1].meaning)+'」</h2></div>';
  h += '<div class="hero"><div class="small">先记住这一句（机制句）</div><div class="big">'+esc(r.mechanism_sentence)+'</div></div>';
  h += '<div class="card"><h2>🧭 来源链旅程（从老到新）</h2><div class="journey">'
    + r.source_chain.map((s,i)=> (i? '<div class="arrow">➜</div>':'') + '<div class="station"><div class="per">'+esc(s.period||'')+'</div><div class="lang">'+esc(s.lang)+'</div><div class="form">'+esc(s.form)+'</div><div class="gloss">'+esc(s.gloss||'（此站无登记释义）')+'</div></div>').join('')
    + '</div><p><b>英语里第一次出现：</b>'+esc(r.first_attested)+'</p></div>';
  h += '<div class="card"><h2>🔀 意思是怎么变过来的</h2><div class="pathcards">'
    + path.map((s,i)=> '<div class="pathcard"><div class="p">第 '+(i+1)+' 站 · '+esc(s.period||'')+'</div><div class="m">'+esc(s.meaning)+'</div><div class="h">'+esc(s.how)+'</div></div>').join('')
    + '</div></div>';
  h += '<div class="card"><h2>⏳ 原义 → 今义</h2><div class="vs"><div class="old"><b>最早的意思</b><br>'+esc(r.original_meaning)+'</div><div class="now"><b>今天的意思</b><br>'+esc(path[path.length-1].meaning)+'</div></div>'
    + '<p style="margin-top:10px">'+esc(r.modern_meanings_link)+'</p></div>';
  h += '<div class="card"><h2>🎣 故事钩子（已核实的事实点）</h2><ul class="hooks">'
    + r.story_hooks.map(x=>'<li>'+esc(x)+'</li>').join('') + '</ul><p class="small">展示层写词源故事时，只能用上面这些已核实的事实点。</p></div>';
  h += '<details class="adult"><summary>🧑‍🏫 给大人的说明（出处与核查）</summary>'
    + '<h3>出处</h3>' + r.sources.map(s=>'<div class="srcitem">· <b>'+esc(s.name)+'</b>：'+esc(s.detail)+' <a href="'+esc(s.url)+'" target="_blank" rel="noopener">打开来源 ↗</a></div>').join('')
    + '<h3>证据等级</h3><p>'+esc(r.evidence_grade)+'</p>'
    + '<h3>争议与不确定</h3><p>'+esc(r.disputes)+'</p>'
    + '<h3>民间词源排查</h3><p>'+esc(r.folk_etymology_check)+'</p></details>';
  h += '<div class="navrow"><button onclick="location.hash=\'\'">← 返回索引</button>'
    + (prev?'<button onclick="goWord(\''+prev+'\')">← 上一词 '+esc(prev)+'</button>':'')
    + (next?'<button onclick="goWord(\''+next+'\')">下一词 '+esc(next)+' →</button>':'') + '</div>';
  app.innerHTML = h;
  window.scrollTo(0,0);
}
function route(){
  const m = location.hash.match(/^#\/word\/(.+)$/);
  if(m) wordPage(decodeURIComponent(m[1])); else home();
}
window.addEventListener('hashchange', route);
route();
</script>
</body>
</html>
'''
OUT.write_text(html.replace('__PAYLOAD__', pj), encoding='utf-8')
print('written:', OUT, OUT.stat().st_size, 'bytes | verified:', len(ver), '| pending:', len(pend))
