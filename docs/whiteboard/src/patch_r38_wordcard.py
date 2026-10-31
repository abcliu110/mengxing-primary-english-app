"""patch_r38_wordcard.py —— 决策 38 ①：单词卡白板模板 v6 要的真实词源 / 真实构词由 App 查好一起注入（幂等；标记 R38_01_WORDCARD）。
wb5PlainData(d)（R37-02 加的注入前取重字段）再带上 __etym = etymLookup('ETYM_DB_JSON', d)、__morph = etymLookup('MORPH_DB_JSON', d)：
只给两本词源词典互证收录的条目（Wiktionary + Etymonline），没有就是 null，模板就不讲来历。"""
import pathlib, sys; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
if 'R38_01_WORDCARD' not in s:
    a = '  return o;\n}\nfunction wb5TplAct(w, a) {'
    assert s.count(a) == 1
    s = s.replace(a, '  try { if (typeof etymLookup === "function" && d && d.word) { o.__etym = etymLookup("ETYM_DB_JSON", d); o.__morph = etymLookup("MORPH_DB_JSON", d); } } catch (e) {}   // R38_01_WORDCARD：真实词源 / 构词（互证收录才有）\n' + a, 1)
    __import__('appwrite').save(s); print('patched')
else: print('already')
