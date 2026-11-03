# -*- coding: utf-8 -*-
"""待核面板按原因分组展示：同步改 build.py（独立原型）与主文件词源区 ET JS。
分组口径：compositional→拼一拼就懂 / form_of_*→熟词变形 / origin_unknown+origin_unconfirmed→身世未查清 /
trunk_*+sources_split+motivation_unsettled→说法未对齐 / 其余(single_source, evidence_gap)→还差一份证据。"""
import pathlib, re

GROUPS_JS = r"""function pendCat(reason){ var m=/^([a-z_]+)/.exec(reason||''); var c=m?m[1]:''; if(c==='compositional')return 0; if(c.indexOf('form_of_')===0)return 1; if(c==='origin_unknown'||c==='origin_unconfirmed')return 2; if(c==='trunk_unsettled'||c==='trunk_divergent'||c==='sources_split'||c==='motivation_unsettled')return 3; return 4; }
var PGROUPS=[
 ['🧩 拼一拼就懂的词','这些词不用另查身世：拆开部件，意思就全出来了（比如 classroom = class + room）。它们的故事在词根词缀区讲，这里不重复立档。'],
 ['🔁 是熟词的变形','它们是已立档词的变形（过去式、过去分词、复数等），和基词共用一份身世，看基词的词源页就行。'],
 ['❓ 身世还没查清','词典们自己都写着「来源未定」——这类词的身世是真悬案。宁可留个问号，也不编故事。'],
 ['⚖️ 专家说法还没对齐','几个来源的说法并存、还没对上号。先把分歧如实记下来，等证据更齐了再立档。'],
 ['📄 还差一份证据','目前只找到一个可靠来源。按规矩要两个独立来源对上才立档，差的那份补上就来。']];
"""

def sub_once(text, a, b, tag):
    n = text.count(a)
    assert n == 1, f'{tag}: hit {n} != 1 for {a[:40]!r}'
    return text.replace(a, b)

# ============ 1) build.py（独立原型） ============
bp = pathlib.Path.home() / 'workspace/mengxing-etymology-prototype/build.py'
t = bp.read_text(encoding='utf-8')

t = sub_once(t, "bank = {w['word'].lower(): w for w in json.load(open(SRC/'wordbank.json'))}",
             "banklist = json.load(open(SRC/'wordbank.json'))\nbank = {w['word'].lower(): w for w in banklist}",
             'build.py banklist')
t = sub_once(t, "payload = {'verified': ver, 'pending': pend, 'bank': banksub, 'flagship': FLAG}",
             "payload = {'verified': ver, 'pending': pend, 'bank': banksub, 'flagship': FLAG, 'bankTotal': len(banklist)}",
             'build.py payload')
t = sub_once(t, '待核 · 有线索但没达到双源互证（本页下方灰置）',
             '待核 · 按卡住的原因分五组（本页下方灰置）', 'build.py stats label')
t = sub_once(t, '192</div>', "'+(D.bankTotal-VER.length-PEND.length)+'</div>", 'build.py UNC')
t = sub_once(t, '为什么还没达标：', '的情况：', 'build.py pendDetail')

lines = t.split('\n')
# 待核卡片整行替换（标题行 + pendgrid 行 → 标题行 + pendGroups()）
idx = [i for i, ln in enumerate(lines) if '还不能进产品' in ln]
assert len(idx) == 1, f'build.py card lines {idx}'
i = idx[0]
assert 'pendgrid' in lines[i + 1], 'build.py: next line is not pendgrid'
lines[i] = ('    + \'<div class="card"><h2 style="color:#999">待核（\'+PEND.length+\'）· 还不能进产品</h2>'
            '<p class="small">待核不是同一种情况：下面按卡住的原因分成五组。点任意词，看它具体卡在哪——不展示半成品的来源链。</p>\'')
lines[i + 1] = '    + pendGroups()'
t = '\n'.join(lines)

helpers = GROUPS_JS + r"""function pendChip(p){ return '<button class="pchip'+(curPend===p.word?' on':'')+'" onclick="curPend=\''+p.word.replace(/'/g,"\\'")+'\';home();document.getElementById(\'pendDetail\').scrollIntoView({block:\'nearest\'})">'+esc(p.word)+'</button>'; }
function pendGroups(){ return PGROUPS.map(function(g,gi){ var items=PEND.filter(function(p){return pendCat(p.pending_reason)===gi;}); if(!items.length)return ''; return '<h3 style="color:#8a8272">'+g[0]+'（'+items.length+'）</h3><p class="small">'+g[1]+'</p><div class="pendgrid">'+items.map(pendChip).join('')+'</div>'; }).join(''); }
"""
t = sub_once(t, 'function pendDetail(){', helpers + 'function pendDetail(){', 'build.py helpers')
bp.write_text(t, encoding='utf-8')
print('build.py patched')

# ============ 2) 主文件 ET 区 ============
hp = pathlib.Path('/tmp/mengxing2/laws-prototype/mengxing-prototype-v1.html')
h = hp.read_text(encoding='utf-8')

h = sub_once(h, '待核 · 有线索但没达到双源互证（本页下方灰置）',
             '待核 · 按卡住的原因分五组（本页下方灰置）', 'html stats label')
h = sub_once(h, '为什么还没达标：', '的情况：', 'html pendDetail')
h = sub_once(h, '没达到双源互证的 521 个词如实标待核',
             '其余 521 个词按卡住的原因分五组如实标待核', 'html subtitle')

lines = h.split('\n')
idx = [i for i, ln in enumerate(lines) if '还不能进产品' in ln]
assert len(idx) == 1, f'html card lines {idx}'
i = idx[0]
assert 'pendgrid' in lines[i + 1], 'html: next line is not pendgrid'
lines[i] = ('    + \'<div class=\\"card\\"><h2 style=\\"color:#999\\">待核（\'+PEND.length+\'）· 还不能进产品</h2>'
            '<p class=\\"small\\">待核不是同一种情况：下面按卡住的原因分成五组。点任意词，看它具体卡在哪——不展示半成品的来源链。</p>\'')
lines[i + 1] = '    + pendGroupsHtml()'
h = '\n'.join(lines)

helpers_h = GROUPS_JS + r"""function pendGroupsHtml(){ return PGROUPS.map(function(g,gi){ var items=PEND.filter(function(p){return pendCat(p.pending_reason)===gi;}); if(!items.length) return ''; return '<h3 style="color:#8a8272">'+g[0]+'（'+items.length+'）</h3><p class="small">'+g[1]+'</p><div class="pendgrid">' + items.map(function(p){ return '<button type="button" class="pchip'+(curPend===p.word?' on':'')+'" data-w="'+esc(p.word)+'" onclick="ET.pend(this.dataset.w)">'+esc(p.word)+'</button>'; }).join('') + '</div>'; }).join(''); }
"""
h = sub_once(h, 'function pendDetailHtml(){', helpers_h + 'function pendDetailHtml(){', 'html helpers')
hp.write_text(h, encoding='utf-8')
print('main HTML patched')

# ============ 3) refresh_et.py 计数文案对更新到当前口径 ============
rp = pathlib.Path.home() / 'workspace/mengxing-etymology-prototype/refresh_et.py'
r = rp.read_text(encoding='utf-8')
r = sub_once(r, "('词源数据层：801 已核 + 1,477 待核', f'词源数据层：{NV} 已核 + {NP} 待核')",
             "('词源数据层：1757 已核 + 521 待核', f'词源数据层：{NV} 已核 + {NP} 待核')", 'refresh pair1')
r = sub_once(r, "('801 个词的身世档案 · 全部双源核实', f'{NV} 个词的身世档案 · 全部双源核实')",
             "('1757 个词的身世档案 · 全部双源核实', f'{NV} 个词的身世档案 · 全部双源核实')", 'refresh pair2')
r = sub_once(r, "('没达到双源互证的 1,477 个词如实标待核', f'没达到双源互证的 {NP} 个词如实标待核')",
             "('其余 521 个词按卡住的原因分五组如实标待核', f'其余 {NP} 个词按卡住的原因分五组如实标待核')", 'refresh pair3')
r = sub_once(r, "('<span class=\"n\">801 词 · 双源核实 · 真模块</span>', f'<span class=\"n\">{NV} 词 · 双源核实 · 真模块</span>')",
             "('<span class=\"n\">1757 词 · 双源核实 · 真模块</span>', f'<span class=\"n\">{NV} 词 · 双源核实 · 真模块</span>')", 'refresh pair4')
r = sub_once(r, "('词源区：801 个词的身世档案', f'词源区：{NV} 个词的身世档案')",
             "('词源区：1757 个词的身世档案', f'词源区：{NV} 个词的身世档案')", 'refresh pair5')
rp.write_text(r, encoding='utf-8')
print('refresh_et.py updated')
print('ALL PATCHED')
