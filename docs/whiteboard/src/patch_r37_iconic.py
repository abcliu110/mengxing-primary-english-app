"""patch_r37_iconic.py —— 决策 37 / R37-02：单词卡不出现自造「字母象形」词源（幂等；标记 R37_02_ICONIC）。
现状：记忆锦囊 memory_tip、构词说明 affix_root、巧记小故事 etymology 里有「w 像水波纹」「b 和 d 像翅膀」「【象形独体词】」这类说法，
就挨着「📖 词源」显示，孩子会当成真实词源。判定见 src/iconic.py（etymcheck.py 共用）。
做法（R1：原句一字不删，只是换地方、加标注）：
  ① 数据：VOCAB_HEAVY_JSON 里这三个字段中的象形句（按句切：。！？；；括号里的「巧记：…」整段）挪到新字段 memory_assoc（字符串数组，去重）；
     原字段剩下的照旧显示；「【象形独体词】」标签删掉、「象形造词妈妈」→「造词妈妈」；构词说明删空了就写「音节拼读：<音节>」（取词条自己的 syllables）。
     少数整句拆不干净的按 OVERRIDE 手工定（结果仍全部进 memory_assoc）。
  ② 词卡：新块「🧠 记忆联想」+「非词源」徽章，放在卡片最后（汉英对比之后 / 构词行之后），不与「📖 词源」相邻；
     认读卡「拼读规律」后面 memory_tip 为空时不再出空括号。
  ③ 白板单词卡模板（v5/scenes/wordcard_items.js）另改：标题去掉「象形词源」，记忆联想放第 ③ 框最后并标「非词源」；需重建模板幕。
检查：src/etymcheck.py（入 runall）。"""
import json, re, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
from iconic import PAT, FIELDS, SENT, sent_iconic, is_iconic
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = 'R37_02_ICONIC'
TAG = '<script type="application/json" id="VOCAB_HEAVY_JSON">'
i = s.index(TAG) + len(TAG); j = s.index('</script>', i)
H = json.loads(s[i:j].replace('<\\/', '</'))
k0 = s.index('const VOCAB_DB = '); k1 = s.index('];\n', k0) + 1
LIGHT = {w['id']: w for w in json.loads(s[k0 + 16:k1])}

# 手工定（原字段剩下的文字, 挪进 memory_assoc 的文字）
OVERRIDE = {
    ('G1_009', 'affix_root'): ('🧩 【积木拆词】造词妈妈：e-y-e (➔ eyebrow 眉毛, eyesight 视力)', '两个e像两只大眼睛，中间y像鼻梁'),
    ('G5_0322', 'etymology'): ('📖 【秒懂造词小故事】词尾 -ress 专门表示女性：舞台上表演的女演员就是 actress！', '词尾 -ress 像漂亮的长裙摆'),
    ('G1_008', 'etymology'): ('', None),   # 整段（hear = h + ear、pear 像耳朵）都是联想，整段挪走
    ('G1_040', 'memory_tip'): ('', None),
    ('G1_040', 'etymology'): ('', None),   # pear = p + ear 是自造拆分，「像耳朵形状」是长相联想
    ('G1_040', 'affix_root'): ('🧩 【基础独体词】音节拼读：pear', 'p + ear(耳朵)，像耳朵形状的黄鸭梨'),
}
PAREN = re.compile(r'[（(](?:巧记：)?([^（）()]*)[）)]')
def split(v):
    """返回 (剩下的, [挪走的句子])"""
    moved = []
    def par(m):
        if is_iconic(m.group(1)): moved.append(m.group(1).strip()); return ''
        return m.group(0)
    v = PAREN.sub(par, v)
    v = v.replace('【象形独体词】', '').replace('象形造词妈妈', '造词妈妈')
    m = re.match(r'^(📖\s*【[^】]*】\s*|🧩\s*(?:【[^】]*】\s*)*)', v); head = m.group(0) if m else ''; body = v[len(head):]
    keep = []
    for sent in SENT.findall(body):
        if not sent: continue
        (moved if sent_iconic(sent) else keep).append(sent)
    rest = head + ''.join(keep)
    return rest.strip(), [x.strip() for x in moved if x.strip()]

n = 0
for wid, r in H.items():
    assoc = list(r.get('memory_assoc') or [])
    for f in FIELDS:
        v = r.get(f)
        if not isinstance(v, str) or not (is_iconic(v) or (wid, f) in OVERRIDE): continue
        if (wid, f) in OVERRIDE and v == OVERRIDE[(wid, f)][0]: continue   # 已改过
        if (wid, f) in OVERRIDE:
            rest, mv = OVERRIDE[(wid, f)]; mv = [mv] if mv else [re.sub(r'^📖\s*【[^】]*】\s*', '', v).strip()]
        else:
            rest, mv = split(v)
        if f == 'affix_root' and re.fullmatch(r'🧩\s*(?:【[^】]*】\s*)*', rest):
            rest = (rest.strip() + '音节拼读：' + LIGHT.get(wid, {}).get('syllables', '')).strip()
        if f == 'etymology' and re.fullmatch(r'📖\s*【[^】]*】\s*', rest): rest = ''
        r[f] = rest
        for x in mv:
            x = x.strip('，。 ')
            if x and not any(x == a or x in a for a in assoc):
                assoc = [a for a in assoc if a not in x] + [x]
        n += 1
    if assoc: r['memory_assoc'] = assoc
blob = json.dumps(H, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
s = s[:i] + blob + s[j:]

# 重字段 getter 认新字段
G_OLD = 'const H = ["senses", "affix_root", "collocations", "etymology", "syntax_contrast", "memory_tip", "visual_scene", "example_zh", "polysemy_data", "example_en"];'
if G_OLD in s: s = s.replace(G_OLD, G_OLD[:-2] + ', "memory_assoc"];', 1)
assert '"memory_assoc"];' in s

if MARK not in s:
    FN = r'''
// R37_02_ICONIC：「🧠 记忆联想」块——字母象形之类帮记忆的联想，不是词源；单独成块、带「非词源」徽章，放在卡片最后，不挨着「📖 词源」（src/patch_r37_iconic.py）
function etymAssocHtml(w) {
  const a = (w && w.memory_assoc) || []; if (!a.length) return "";
  return `<div data-etym-assoc="1" style="background:#f8fafc; padding:12px 14px; border-radius:12px; border:2px dashed #cbd5e1;">
    <div style="font-weight:900; color:#334155; font-size:0.9rem;">🧠 记忆联想 <span data-badge="non-etym" style="background:#fee2e2; color:#991b1b; border-radius:999px; padding:2px 8px; font-size:0.74rem; font-weight:900;">非词源</span> <span style="font-weight:700; color:#64748b; font-size:0.78rem;">（看字母形状帮着记，单词不是这样来的）</span></div>
    <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${a.map(etymEsc).join("<br>")}</div>
  </div>`;
}
'''
    a = 'function etymTipHtml(w) {'; assert s.count(a) == 1; s = s.replace(a, FN.lstrip('\n') + a, 1)
    # 词卡大弹窗：汉英对比块之后
    b = '''              🔗 常用搭配动词：${(w.collocations?.verbs||[]).join(" / ")} ｜ 形容词：${(w.collocations?.adjs||[]).join(" / ")}
            </div>
          </div>
'''
    assert s.count(b) == 1, s.count(b); s = s.replace(b, b + '          <!-- R37_02_ICONIC:modal -->${etymAssocHtml(w)}\n', 1)
    # 旧小弹窗：构词行之后
    c = '''      <div style="font-weight:800; color:#059669;">${w.affix_root}</div>
    </div>
'''
    assert s.count(c) == 1, s.count(c); s = s.replace(c, c[:-len('    </div>\n')] + '      <!-- R37_02_ICONIC:grid --><div style="margin-top:8px;">${etymAssocHtml(w)}</div>\n    </div>\n', 1)
    # 认读卡：memory_tip 为空不出空括号
    d = '${etymIsPlaceholderTip(w.memory_tip) ? "" : `（${w.memory_tip}）`}'
    assert s.count(d) == 1; s = s.replace(d, '${!w.memory_tip || etymIsPlaceholderTip(w.memory_tip) ? "" : `（${w.memory_tip}）`}<!-- R37_02_ICONIC:sight -->', 1)
# 白板单词卡模板注入词条：O1 拆分后重字段挂在原型 getter 上，JSON.stringify 拿不到（模板幕一直只收到轻字段，词源 / 构词 / 例句框是空的）——注入前把重字段读出来
e = r'JSON.stringify(w.__wb5Data).replace(/</g, "\\u003c")'
if e in s:
    s = s.replace(e, r'JSON.stringify(wb5PlainData(w.__wb5Data)).replace(/</g, "\\u003c")', 1)
    f = 'function wb5TplAct(w, a) {'; assert s.count(f) == 1
    s = s.replace(f, 'function wb5PlainData(d) {   // R37_02_ICONIC：词条的按需重字段（VOCAB_SPLIT_V1 原型 getter）一并带上\n  const o = Object.assign({}, d); ["senses", "affix_root", "collocations", "etymology", "syntax_contrast", "memory_tip", "visual_scene", "example_zh", "polysemy_data", "example_en", "memory_assoc"].forEach(k => { if (!(k in o) && d[k] !== undefined) o[k] = d[k]; });\n  return o;\n}\n' + f, 1)
assert 'wb5PlainData(w.__wb5Data)' in s
# 方法论页内嵌的小词库 MH_VOCAB_DB（22 词，自带一份 etymology）里的 2 条同样挪进 memory_assoc（它的词卡弹窗用同一个 etymAssocHtml）
for old, new in [('"etymology":"📖 象形造词：左右两个 e 像两只眼睛，中间的 y 像鼻梁！"', '"etymology":"","memory_assoc":["左右两个 e 像两只眼睛，中间的 y 像鼻梁"]'),
                 ('"etymology":"💧 w 就像荡漾的水波纹！既是不可数名词“水”，也是动词“浇水”！"', '"etymology":"💧 既是不可数名词“水”，也是动词“浇水”！","memory_assoc":["w 就像荡漾的水波纹"]')]:
    if old in s: assert s.count(old) == 1; s = s.replace(old, new)
__import__('appwrite').save(s)
print('fields changed', n, 'words with memory_assoc', sum(1 for r in H.values() if r.get('memory_assoc')))
