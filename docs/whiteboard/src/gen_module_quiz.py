"""gen_module_quiz.py —— 决策 14 练习闭环：从每个模块的 v5 白板场景里取「讲过的课标词」，生成小测词表 MODULE_QUIZ（写进主文件 JSON 块）。
模块 = 实验室页签（lab:<页签>）、单词身世幕（wo:<幕>）、中英对照幕（ze:<幕>）；场景 = v5/scenes/<页签或幕>_<n>.js。
取词：场景 's'（朗读句）里的英文词 ∩ VOCAB_DB 单词（非功能词、单个词），按首次出现排序，最多 8 个；不足 3 个的模块不出小测（记进报告）。
小测本身在 App 里现场出题（认出 → 选择 → 拼写），不编题目内容：题干 / 选项全部来自 VOCAB_DB。"""
import json, re, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parents[3]; APP = ROOT / '萌星小学英语_最终合并版.html'; SC = ROOT / 'docs/whiteboard/v5/scenes'
V = json.load(open('/workspace/work/etym/vocab.json')) if pathlib.Path('/workspace/work/etym/vocab.json').exists() else None
s = APP.read_text(encoding='utf-8')
if V is None:
    import subprocess
    js = "const fs=require('fs');const s=fs.readFileSync(process.argv[1],'utf8');const i=s.indexOf('const VOCAB_DB = ');const j=s.indexOf('];\\n',i);console.log(JSON.stringify(eval(s.slice(i+16,j+1))))"
    V = json.loads(subprocess.run(['node', '-e', js, str(APP)], capture_output=True, text=True, check=True).stdout)
lex = {}
for w in V:
    k = w['word'].strip().lower()
    if ' ' in k or '/' in k or w.get('is_function_word'): continue
    lex.setdefault(k, w['id'])
lab = re.findall(r'\["(\w+)", "[^"]*"\]', s[s.index('const LAB_GROUPS = ['):s.index('];', s.index('const LAB_GROUPS = ['))])
wo = re.findall(r'\{ id: "(wo_\w+)", title:', s); ze = re.findall(r'\{ id: "(ze_\w+)", title:', s)
mods = [('lab:' + t, t) for t in lab] + [('wo:' + t, t) for t in wo] + [('ze:' + t, t) for t in ze]
out, rep = {}, []
for key, pre in mods:
    files = sorted(SC.glob(f'{pre}_[0-9]*.js'), key=lambda p: int(re.search(r'_(\d+)\.js$', p.name).group(1)))
    seen = []
    for f in files:
        txt = f.read_text(encoding='utf-8')
        sents = re.findall(r"\['s', '((?:[^'\\]|\\.)*)'", txt) or re.findall(r"'([A-Z][A-Za-z,' ]+[.!?])'", txt)   # 手工幕（tense_matrix / past_clans / adj_order）没有 ITEMS：取引号里的英文整句
        for en in sents:
            for tok in re.findall(r"[A-Za-z]+", en):
                i = lex.get(tok.lower())
                if i and i not in seen: seen.append(i)
    if len(seen) >= 3: out[key] = seen[:8]
    rep.append(f'| {key} | {len(files)} | {len(seen)} | {"✅ " + str(min(8, len(seen))) + " 词" if len(seen) >= 3 else "❌ 不足 3 词，不出小测"} |')
tag = '<script type="application/json" id="MODULE_QUIZ_JSON">'; js = json.dumps(out, separators=(',', ':'))
if tag in s: i = s.index(tag); j = s.index('</script>', i); s = s[:i] + tag + js + s[j:]
else: i = s.index('<script type="text/plain" id="wb5html-'); s = s[:i] + tag + js + '</script>\n' + s[i:]
APP.write_text(s, encoding='utf-8')
(ROOT / 'docs/whiteboard/lab/MODULE_QUIZ_REPORT.md').write_text('# 决策 14 模块小测词表（`src/gen_module_quiz.py` 生成）\n\n| 模块 | 场景数 | 场景里的课标实词 | 小测 |\n|---|---|---|---|\n' + '\n'.join(rep) + '\n', encoding='utf-8')
print('modules', len(mods), 'with quiz', len(out))
