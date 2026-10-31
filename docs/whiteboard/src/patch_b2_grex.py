"""patch_b2_grex.py —— 决策 35-B2：只把 lab/GRAMMAR_EXAMPLES.json 重新写进主文件的 GRAMMAR_EX_JSON 块（不动 GRAMMAR_EX_V1 函数块；
patch_grammar_examples.py 的函数块替换段落已与后来的补丁不兼容，重跑会冲掉别的块）。幂等。"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP
ROOT = pathlib.Path(__file__).resolve().parents[3]
D = json.loads((ROOT / 'docs/whiteboard/lab/GRAMMAR_EXAMPLES.json').read_text(encoding='utf-8'))
js = json.dumps({g: [[x[0], x[1], x[2]] for x in v] for g, v in D.items()}, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
s = APP.read_text(encoding='utf-8'); tag = '<script type="application/json" id="GRAMMAR_EX_JSON">'
i = s.index(tag) + len(tag); j = s.index('</script>', i)
if s[i:j] == js: print('GRAMMAR_EX_JSON 已是最新'); sys.exit(0)
s = s[:i] + js + s[j:]; save(s); print('GRAMMAR_EX_JSON 已更新', sum(len(v) for v in D.values()), '句')
