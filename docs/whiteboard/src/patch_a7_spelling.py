"""patch_a7_spelling.py —— 决策 35-A7 英美拼写（幂等，走 appwrite）。方案见 MASTER_DESIGN 决策 35 A7 行下「A7 定案」。
① 主拼写跟课标用英式，美式并成别名（WORD_ALIAS 标「美式」，主卡显示「美式：math」标签；学习记录由 migrateWordAliasRecords 转到主词条）：
   math → maths、mom → mum、center → centre（原来 centre / center 两张主卡靠 WORD_SEE 互指，去掉）。color → colour、gray → grey 此前已是别名。
② 音标用方案 B：保留美式音标，词卡音标后标 🇺🇸（A7_US_PHON）。
③ at / on the weekend：正文按人教用 on，注明英式 at（G14 精确点 at 的时间例）。"""
import json, re, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent)); import appwrite
s = appwrite.APP.read_text(encoding='utf-8')
ALIAS = {'V6_学校_30': ['V6_学校_31', '美式'], 'V6_家庭_7': ['V6_家庭_6', '美式'], 'G5_0689': ['G5_0374', '美式']}
m = re.search(r'const WORD_ALIAS = (\{.*?\});', s); WA = json.loads(m.group(1))
if any(k not in WA for k in ALIAS):
    WA.update(ALIAS); s = s[:m.start(1)] + json.dumps(WA, ensure_ascii=False) + s[m.end(1):]
m = re.search(r'const WORD_SEE = (\{.*?\});', s); WS = json.loads(m.group(1))
if 'G5_0689' in WS or 'G5_0374' in WS:
    WS.pop('G5_0689', None); WS.pop('G5_0374', None); s = s[:m.start(1)] + json.dumps(WS, ensure_ascii=False) + s[m.end(1):]
A = '**at 7:30 / at noon / at night / at the weekend**'
if A in s: s = s.replace(A, '**at 7:30 / at noon / at night**（周末：人教用 on the weekend，英式也说 at the weekend）')
P = '${w.phonetic} · <span style="color:#2563eb;">${w.pos}</span>'
if 'A7_US_PHON' not in s:
    assert s.count(P) == 1, s.count(P)
    s = s.replace(P, '${w.phonetic}<span title="音标按美式读音（决策 35-A7 方案 B）" style="font-size:0.8rem; margin-left:2px;">🇺🇸</span><!-- A7_US_PHON --> · <span style="color:#2563eb;">${w.pos}</span>')
appwrite.save(s); print('ok')
