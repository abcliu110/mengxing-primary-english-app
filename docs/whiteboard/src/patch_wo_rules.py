"""patch_wo_rules.py —— 决策 25 扩展 / HANDOFF §5.2 1e：单词身世总枢在「🔤 格林定律」章之后新开一章「🔬 音变与词汇规律」（12 + 6 条，幂等，走 appwrite）。
规律 1（维尔纳）复用 wo_grimm_verner、规律 3（i-变音）复用 wo_vowel_a；其余 16 条是新幕 wo_rule_*（内容稿 content/wo_rule_*_1.txt，核对见 word_origins/RULES_REVIEW.md）。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
MARK = '// WO_RULES_CHAPTER_V1'
# 规律 1 / 3 复用其它章的幕：总地图按 key 去重，不重复列同一幕（app_check9 节点数 = appMapNodes 长度）
D0 = '(ch.scenes || []).forEach(s => { if (typeof woSceneReady !== "function" || woSceneReady(s.id)) out.push('
D1 = '(ch.scenes || []).forEach(s => { if ((typeof woSceneReady !== "function" || woSceneReady(s.id)) && !out.some(o => o.key === "wo:" + s.id)) out.push('
if D0 in s:
    assert s.count(D0) == 1; s = s.replace(D0, D1)
    if MARK in s: __import__('appwrite').save(s); print('dedupe patched'); sys.exit(0)
if MARK in s: print('already'); sys.exit(0)
A = '  { id: "loanwords", icon: "⛵", title: "单词环游世界"'
assert s.count(A) == 1
R = [('wo_grimm_verner', '1 维尔纳定律', 'father 和 brother；was ↔ were', ['📜', '⚠️']),
     ('wo_rule_gvs', '2 元音大转移', 'name 为什么读 /eɪ/：拼写是旧照片', ['📜', '✂️']),
     ('wo_vowel_a', '3 i-变音', 'foot → feet、man → men', ['📜', '✂️', '⚠️']),
     ('wo_rule_ablaut', '4 元音递变', 'sing sang sung、ride rode ridden', ['📜', '⚠️']),
     ('wo_rule_hgcs', '5 英语 ↔ 德语', 'water / Wasser、apple / Apfel', ['📜', '💡']),
     ('wo_rule_norse', '6 维京双胞胎词', 'shirt / skirt、church / kirk', ['📜', '💡']),
     ('wo_rule_norman', '7 诺曼法语 w ↔ g', 'war / guerre、ward / guard', ['📜', '⚠️']),
     ('wo_rule_french_s', '8 法语丢了 s', 'forest / forêt、hostel / hotel', ['📜', '💡']),
     ('wo_rule_register', '9 动物和肉', 'cow / beef、pig / pork、sheep / mutton', ['📜', '⚠️']),
     ('wo_rule_assim', '10 前缀同化', 'impossible、illegal、irregular', ['📜', '💡']),
     ('wo_rule_tsl', '11 词变长元音变短', 'south → southern、shade → shadow', ['📜', '✂️']),
     ('wo_rule_metath', '12 换位与不发音字母', 'bird ← bridd、write、knight', ['📜', '💡']),
     ('wo_rule_en_plural', '13 老复数 -en', 'oxen、children（双重复数）', ['📜', '⚠️']),
     ('wo_rule_greek', '14 希腊拼写', 'phone、school、gym', ['📜', '💡']),
     ('wo_rule_usuk', '15 英式 ↔ 美式拼写', 'colour / color、centre / center', ['📜', '⚠️']),
     ('wo_rule_latplural', '16 外来复数', 'cactus → cacti、crisis → crises', ['📜', '⚠️']),
     ('wo_rule_sc_sh', '17 sh 本族、sk 维京', 'ship、fish ↔ sky、skin', ['📜', '💡']),
     ('wo_rule_c_ch', '18 c 变 ch', 'cheese ↔ 德语 Käse、church', ['📜', '💡'])]
import json
sc = ''.join(f'      {{ id: "{i}", title: "规律 {t}", sub: {json.dumps(u, ensure_ascii=False)}, badges: {json.dumps(b, ensure_ascii=False)} }},\n' for i, t, u, b in R)
NEW = ('  { id: "rules", icon: "🔬", title: "音变与词汇规律", insight: "英语里很多「怪」拼写和「怪」变化，背后都有一条规律。",   ' + MARK + '\n    scenes: [\n' + sc + '    ] },\n' + A)
s = s.replace(A, NEW)
__import__('appwrite').save(s); print('patched')
