# -*- coding: utf-8 -*-
"""把词源数据层接入 laws-prototype/mengxing-prototype-v1.html（词源区）。
数据从当前 model/etymology.json + wordbank.json 程序化生成，版式照 etymology-prototype.html（build.py）。
只做定点插入，每处锚点断言唯一；不 commit。"""
import json, pathlib, sys

LP = pathlib.Path('/tmp/mengxing2/laws-prototype')
HTML = LP / 'mengxing-prototype-v1.html'

data = json.load(open(LP / 'model/etymology.json'))
bank_raw = json.load(open(LP / 'model/wordbank.json'))
bank = {w['word'].lower(): w for w in bank_raw}
bank_total = len(bank_raw)

ver = sorted([r for r in data if r['status'] == 'verified'], key=lambda r: r['word'])
pend = sorted([{'word': r['word'], 'pending_reason': r.get('pending_reason', '')}
               for r in data if r['status'] != 'verified'], key=lambda r: r['word'])
FLAG = ['school', 'camp', 'law', 'horse', 'beach', 'gentle', 'magazine',
        'lunatic', 'coin', 'charge', 'doctor', 'light']
assert len(ver) == 801, len(ver)
assert len(pend) == 1477, len(pend)
assert all(any(r['word'] == w for r in ver) for w in FLAG), 'flagship not all verified'
byw = {r['word']: r for r in ver}
pen_forms = [s['form'] for s in byw['pen']['source_chain']]
assert 'penna' in pen_forms, pen_forms
match_forms = [s['form'] for s in byw['match']['source_chain']]
assert any('mæcca' in f for f in match_forms), match_forms
unc = bank_total - len(ver) - len(pend)
assert unc == 195, unc

banksub = {}
for r in ver + pend:
    b = bank.get(r['word']) or bank.get(r['word'].lower())
    if b:
        banksub[r['word']] = {
            'phonetic': b.get('phonetic_gb') or b.get('phonetic') or '',
            'meaning': b.get('meaning', ''), 'pos': b.get('pos', ''),
            'emoji': b.get('emoji', '') or ''}
payload = {'verified': ver, 'pending': pend, 'bank': banksub,
           'flagship': FLAG, 'bankTotal': bank_total}
pj = json.dumps(payload, ensure_ascii=False).replace('</', '<\\/')

CSS = r'''
.et-scope,.et-scope *{box-sizing:border-box;margin:0;padding:0}
.et-scope{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:#2b2620;line-height:1.65;font-size:15px}
.et-scope .card{background:#fff;border:1px solid #e8dfc9;border-radius:14px;padding:16px;margin:0 0 14px}
.et-scope h2{font-size:19px;margin:2px 0 10px;color:#7a4d14}
.et-scope h3{font-size:16px;margin:14px 0 8px;color:#7a4d14}
.et-scope .tag{display:inline-block;background:#f3e9d2;color:#7a4d14;border-radius:999px;padding:1px 10px;font-size:12px;margin:0 6px 6px 0}
.et-scope .num{font-size:30px;font-weight:700;color:#8a5a1e}
.et-scope .small{font-size:12.5px;color:#8a8272}
.et-scope .big{font-size:19px;line-height:1.6;font-weight:600}
.et-scope button{cursor:pointer}
.et-scope .flaggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.et-scope .flag{background:#fffdf6;border:1.5px solid #e3cf9e;border-radius:12px;padding:12px;text-align:left;font:inherit;width:100%;color:inherit}
.et-scope .flag b{font-size:18px;color:#31449c}
.et-scope .flag .mech{font-size:13.5px;margin:6px 0}
.et-scope .flag .mini{font-size:12px;color:#8a5a1e}
.et-scope .searchrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.et-scope .searchrow input{flex:1;min-width:180px;padding:10px 12px;border:1.5px solid #d8cba6;border-radius:10px;font-size:15px;background:#fff;font:inherit}
.et-scope .letters{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0}
.et-scope .letters button{border:1px solid #d8cba6;background:#fff;border-radius:8px;padding:3px 9px;font-size:13px;min-height:32px;font:inherit;color:inherit}
.et-scope .letters button.on{background:#8a5a1e;color:#fff}
.et-scope .wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:6px}
.et-scope .wchip{border:1px solid #e8dfc9;background:#fff;border-radius:10px;padding:7px 8px;text-align:left;font:inherit;min-height:44px;color:inherit}
.et-scope .wchip b{color:#31449c;font-size:14.5px}
.et-scope .wchip span{display:block;font-size:11.5px;color:#8a8272;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.et-scope .journey{display:flex;gap:0;overflow-x:auto;padding:6px 2px 12px;-webkit-overflow-scrolling:touch}
.et-scope .station{flex:0 0 auto;width:158px;background:#fdf8ec;border:1.5px solid #e3cf9e;border-radius:12px;padding:10px}
.et-scope .station .per{font-size:11.5px;color:#b8862e;font-weight:700}
.et-scope .station .lang{font-size:12.5px;color:#8a8272}
.et-scope .station .form{font-size:18px;font-weight:700;color:#31449c;margin:2px 0;word-break:break-word}
.et-scope .station .gloss{font-size:13px}
.et-scope .arrow{align-self:center;flex:0 0 auto;padding:0 5px;color:#b8862e;font-size:18px;font-weight:700}
.et-scope .pathcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.et-scope .pathcard{background:#f6fbff;border:1.5px solid #cfdff0;border-radius:12px;padding:12px}
.et-scope .pathcard .m{font-size:16px;font-weight:700;color:#31449c}
.et-scope .pathcard .p{font-size:12px;color:#8a8272}
.et-scope .pathcard .h{font-size:13.5px;margin-top:4px}
.et-scope .vs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.et-scope .vs>div{border-radius:12px;padding:12px}
.et-scope .vs .old{background:#fdf3e3;border:1.5px solid #eec27f}
.et-scope .vs .now{background:#eef7ee;border:1.5px solid #a9d3a9}
.et-scope .hooks{padding-left:20px}
.et-scope .hooks li{margin:4px 0}
.et-scope details.et-adult{background:#f4f1ea;border:1px solid #ddd3bd;border-radius:12px;padding:10px 14px;margin:0 0 14px}
.et-scope details.et-adult summary{cursor:pointer;font-weight:700;color:#7a4d14;min-height:32px}
.et-scope .srcitem{font-size:13.5px;margin:6px 0}
.et-scope a{color:#31449c}
.et-scope .navrow{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
.et-scope .navrow button{border:1.5px solid #31449c;color:#31449c;background:#fff;border-radius:9px;padding:7px 14px;font-size:14px;min-height:38px;font:inherit}
.et-scope .hero{background:linear-gradient(135deg,#fdf3e3,#fde9b8);border:1.5px solid #eec27f;border-radius:14px;padding:16px;margin-bottom:14px}
.et-scope .pendgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:5px;max-height:420px;overflow-y:auto}
.et-scope .pchip{border:1px solid #ddd;background:#f2f2f0;color:#999;border-radius:8px;padding:5px 6px;font-size:13px;min-height:34px;font:inherit}
.et-scope .pchip.on{border-color:#8a5a1e;color:#8a5a1e;background:#fdf8ec}
.et-scope #etPendDetail{background:#fdf8ec;border:1.5px dashed #d8cba6;border-radius:12px;padding:12px;margin-top:10px;font-size:14px}
@media (max-width:720px){
.et-scope .journey{flex-direction:column;overflow-x:visible}
.et-scope .station{width:auto}
.et-scope .arrow{transform:rotate(90deg);padding:2px 0}
.et-scope .vs{grid-template-columns:1fr}
}
'''.strip()

JS = r'''
(function(){
"use strict";
var D = __PAYLOAD__;
var VER = D.verified, PEND = D.pending, BANK = D.bank, FLAG = D.flagship;
var UNC = D.bankTotal - VER.length - PEND.length;
var byWord = {}, pendByWord = {};
VER.forEach(function(r){ byWord[r.word]=r; });
PEND.forEach(function(p){ pendByWord[p.word]=p; });
var curLetter='', curQuery='', curPend='', curWord=null;
var idxEl=document.getElementById('et-index'), detEl=document.getElementById('et-detail');
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function miniChain(r){return r.semantic_path.map(function(s){return s.meaning;}).join(' → ');}
function pendDetailHtml(){
  if(!curPend) return '点上面任意一个灰词，这里会写清它卡在哪一步。';
  var p=pendByWord[curPend]; if(!p) return '';
  return '<b>'+esc(p.word)+'</b> 为什么还没达标：<br>'+esc(p.pending_reason||'暂无登记原因');
}
function renderGrid(){
  var g=document.getElementById('etwgrid'); if(!g) return;
  var q=curQuery.trim().toLowerCase();
  var list=VER.filter(function(r){ return (!curLetter || r.word.charAt(0).toUpperCase()===curLetter) && (!q || r.word.toLowerCase().indexOf(q)>-1); });
  g.innerHTML = list.length ? list.map(function(r){ return '<button type="button" class="wchip" data-w="'+esc(r.word)+'" onclick="ET.open(this.dataset.w)"><b>'+esc(r.word)+'</b><span>'+esc((BANK[r.word]||{}).meaning||'')+'</span></button>'; }).join('') : '<p class="small">没有符合的词。</p>';
}
function renderIndex(){
  var stats = '<div class="card"><h2>这层数据是什么</h2>'
    + '<p>给词库的每个词补一份「出身档案」：它从哪种语言来、最早是什么意思、意思怎么一步步变成今天这样。档案只收查有实据的——双源互证通过的才进产品。</p>'
    + '<div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:8px">'
    + '<div><div class="num">'+VER.length+'</div><div class="small">verified · 可进产品</div></div>'
    + '<div><div class="num" style="color:#999">'+PEND.length+'</div><div class="small">待核 · 有线索但没达到双源互证（本页下方灰置）</div></div>'
    + '<div><div class="num" style="color:#bbb">'+UNC+'</div><div class="small">未收 · 没有可靠词源，不强建档案</div></div></div></div>';
  var flags = '<div class="card"><h2>⭐ 旗舰故事词</h2><p class="small">故事性最强的 12 个：意思在路上跳了好几站，或者有一个让人记得住的转折画面。点开看完整词页。</p><div class="flaggrid">'
    + FLAG.map(function(w){ var r=byWord[w]; return '<button type="button" class="flag" data-w="'+esc(w)+'" onclick="ET.open(this.dataset.w)"><b>'+esc(w)+'</b><div class="mech">'+esc(r.mechanism_sentence)+'</div><div class="mini">'+esc(miniChain(r))+'</div></button>'; }).join('') + '</div></div>';
  idxEl.innerHTML = stats + flags
    + '<div class="card"><h2>全部已核词（'+VER.length+'）</h2>'
    + '<div class="searchrow"><input id="etq" type="search" placeholder="搜一个词，如 school / window / coin…" value="'+esc(curQuery)+'" oninput="ET.q(this.value)"></div>'
    + '<div class="letters">' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(L){ return '<button type="button" class="'+(curLetter===L?'on':'')+'" onclick="ET.letter(\''+L+'\')">'+L+'</button>'; }).join('') + '</div>'
    + '<div class="wgrid" id="etwgrid"></div></div>'
    + '<div class="card"><h2 style="color:#999">待核（'+PEND.length+'）· 还不能进产品</h2><p class="small">这些词有词源线索，但没达到「两个独立来源互证」的标准。点任意词，只看它为什么还没达标——不展示半成品的来源链。</p>'
    + '<div class="pendgrid">' + PEND.map(function(p){ return '<button type="button" class="pchip'+(curPend===p.word?' on':'')+'" data-w="'+esc(p.word)+'" onclick="ET.pend(this.dataset.w)">'+esc(p.word)+'</button>'; }).join('') + '</div>'
    + '<div id="etPendDetail">' + pendDetailHtml() + '</div></div>';
  renderGrid();
}
function wordHtml(r){
  var b = BANK[r.word] || {};
  var idx = VER.findIndex(function(x){return x.word===r.word;});
  var prev = idx>0 ? VER[idx-1].word : null, next = idx<VER.length-1 ? VER[idx+1].word : null;
  var path = r.semantic_path;
  var nav = '<div class="navrow"><button type="button" onclick="ET.back()">← 返回索引</button>'
    + (prev?'<button type="button" onclick="ET.step(-1)">← 上一词 '+esc(prev)+'</button>':'')
    + (next?'<button type="button" onclick="ET.step(1)">下一词 '+esc(next)+' →</button>':'') + '</div>';
  var h = nav;
  h += '<div class="card"><div style="font-size:30px;font-weight:800;color:#31449c">'+esc(r.word)+' <span style="font-size:20px">'+esc(b.emoji||'')+'</span></div>'
    + '<div>'+ (b.phonetic?'<span class="tag">'+esc(b.phonetic)+'</span>':'') + (b.pos?'<span class="tag">'+esc(b.pos)+'</span>':'') + (b.meaning?'<span class="tag">'+esc(b.meaning)+'</span>':'') + '<span class="small">（音标与释义为词库登记字段）</span></div>'
    + '<h2 style="margin-top:12px">词源故事 · '+esc(r.word)+'：从「'+esc(path[0].meaning)+'」到「'+esc(path[path.length-1].meaning)+'」</h2></div>';
  h += '<div class="hero"><div class="small">先记住这一句（机制句）</div><div class="big">'+esc(r.mechanism_sentence)+'</div></div>';
  h += '<div class="card"><h2>🧭 来源链旅程（从老到新）</h2><div class="journey">'
    + r.source_chain.map(function(s,i){ return (i? '<div class="arrow">➜</div>':'') + '<div class="station"><div class="per">'+esc(s.period||'')+'</div><div class="lang">'+esc(s.lang)+'</div><div class="form">'+esc(s.form)+'</div><div class="gloss">'+esc(s.gloss||'（此站无登记释义）')+'</div></div>'; }).join('')
    + '</div><p><b>英语里第一次出现：</b>'+esc(r.first_attested)+'</p></div>';
  h += '<div class="card"><h2>🔀 意思是怎么变过来的</h2><div class="pathcards">'
    + path.map(function(s,i){ return '<div class="pathcard"><div class="p">第 '+(i+1)+' 站 · '+esc(s.period||'')+'</div><div class="m">'+esc(s.meaning)+'</div><div class="h">'+esc(s.how)+'</div></div>'; }).join('')
    + '</div></div>';
  h += '<div class="card"><h2>⏳ 原义 → 今义</h2><div class="vs"><div class="old"><b>最早的意思</b><br>'+esc(r.original_meaning)+'</div><div class="now"><b>今天的意思</b><br>'+esc(path[path.length-1].meaning)+'</div></div>'
    + '<p style="margin-top:10px">'+esc(r.modern_meanings_link)+'</p></div>';
  h += '<div class="card"><h2>🎣 故事钩子（已核实的事实点）</h2><ul class="hooks">'
    + r.story_hooks.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('') + '</ul><p class="small">展示层写词源故事时，只能用上面这些已核实的事实点。</p></div>';
  h += '<details class="et-adult"><summary>🧑‍🏫 给大人的说明（出处与核查）</summary>'
    + '<h3>出处</h3>' + r.sources.map(function(s){ return '<div class="srcitem">· <b>'+esc(s.name)+'</b>：'+esc(s.detail)+' <a href="'+esc(s.url)+'" target="_blank" rel="noopener">打开来源 ↗</a></div>'; }).join('')
    + '<h3>证据等级</h3><p>'+esc(r.evidence_grade)+'</p>'
    + '<h3>争议与不确定</h3><p>'+esc(r.disputes)+'</p>'
    + '<h3>民间词源排查</h3><p>'+esc(r.folk_etymology_check)+'</p></details>';
  h += nav;
  return h;
}
function openWord(w){
  var r=byWord[w]; if(!r) return;
  curWord=w;
  detEl.innerHTML = wordHtml(r);
  show('etym-detail');
  window.scrollTo(0,0);
}
function step(d){
  if(!curWord) return;
  var i=VER.findIndex(function(x){return x.word===curWord;});
  var n=i+d; if(n<0||n>=VER.length) return;
  openWord(VER[n].word);
}
window.ET = {
  open: openWord,
  back: function(){ show('etym'); },
  step: step,
  q: function(v){ curQuery=v; renderGrid(); },
  letter: function(L){ curLetter=(curLetter===L?'':L); renderIndex(); },
  pend: function(w){ curPend=(curPend===w?'':w); renderIndex(); var d=document.getElementById('etPendDetail'); if(d&&curPend){ d.scrollIntoView({block:'nearest'}); } }
};
renderIndex();
})();
'''.strip()

BLOCK = (
    '<!-- ============ 词源区（独立区，词源数据层：801 已核 + 1,477 待核） ============ -->\n'
    '<style>\n' + CSS + '\n</style>\n'
    '<section class="view" id="v-etym">\n'
    '<span class="back" data-go="home">← 回首页</span>\n'
    '<h2 class="zt">📜 词源区</h2>\n'
    '<p class="sub">801 个词的身世档案 · 全部双源核实：来源链、最早的意思、意思怎么变过来、故事钩子都查有实据；没达到双源互证的 1,477 个词如实标待核，不编故事。</p>\n'
    '<div class="et-scope" id="et-index"></div>\n'
    '</section>\n'
    '<section class="view" id="v-etym-detail"><div class="et-scope" id="et-detail"></div></section>\n'
    '<script>\n' + JS.replace('__PAYLOAD__', pj) + '\n</script>'
)

HOME_CARD = ('<div class="card" data-go="etym"><div class="ic">📜</div><h3>词源区</h3>'
             '<p>每个词的身世档案：从哪种语言来、最早是什么意思、怎么一步步变成今天这样。</p>'
             '<span class="n">801 词 · 双源核实 · 真模块</span></div>')
CROSSLINK = ('<div class="urow" data-go="etym"><span class="id">📜</span>'
             '<span class="tt">词源区：801 个词的身世档案——从哪来、最早是什么意思、怎么一步步变成今天这样；拆词看结构，来历看词源</span>'
             '<span class="st deep">独立成区</span></div>')

src = HTML.read_text(encoding='utf-8')
orig_size = len(src.encode('utf-8'))
lines = src.split('\n')

def find1(pred, label):
    hits = [i for i, ln in enumerate(lines) if pred(ln)]
    assert len(hits) == 1, f'{label}: {len(hits)} hits'
    return hits[0]

i = find1(lambda ln: 'data-v="morph"' in ln and 'nbtn' in ln, 'morph pill')
lines.insert(i + 1, '<button class="nbtn" data-v="etym">词源区</button>')

i = find1(lambda ln: '<div class="sec-t">十二区</div>' in ln, 'sec-t count')
lines[i] = lines[i].replace('十二区', '十三区')

i = find1(lambda ln: 'data-go="morph"><div class="ic">' in ln, 'morph home card')
lines.insert(i + 1, HOME_CARD)

i = find1(lambda ln: 'id="mz-index"' in ln, 'mz-index')
lines.insert(i + 1, CROSSLINK)

i = find1(lambda ln: ln.strip() == '<!-- ============ 语法区（目录页） ============ -->', 'grammar comment')
lines[i:i] = BLOCK.split('\n')

out = '\n'.join(lines)
HTML.write_text(out, encoding='utf-8')
print('OK | verified', len(ver), '| pending', len(pend), '| uncollected', unc,
      '| payload bytes', len(pj.encode('utf-8')),
      '| file', orig_size, '->', len(out.encode('utf-8')))
