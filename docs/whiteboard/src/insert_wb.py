#!/usr/bin/env python3
"""把白板引擎 + cases/*.js 全部案例 + App 接线写进主 HTML（可重复运行，按标记替换）。

- 代码块：// <<WB_ENGINE_START>> … // <<WB_ENGINE_END>>
- 每个王炸页签的 Canvas 外框换成 ${wbStageHtml("tab", superLabState.xxxIdx)}；
  没有登记案例的页签，wbStageHtml 会原样输出旧 Canvas，所以可以一个页签一个页签地做。
"""
import re, os, glob
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
F = os.path.join(ROOT, '萌星小学英语_最终合并版.html')
s = open(F, encoding='utf-8').read()
rd = lambda p: open(p, encoding='utf-8').read()

# 页签 → 当前案例序号变量（和 superLabState 一致）
TABS = {
    'bamboo_tree': 'btIdx', 'vowel_shift': 'grimmIdx', 'adj_order': 'adjExIdx', 'past_clans': 'clanIdx',
    'stress_rhythm': 'stressIdx', 'metaphor_code': 'metaIdx', 'tense_matrix': 'tenseIdx',
    'aux_transformer': 'auxIdx', 'five_patterns': 'patIdx', 'writing_alchemist': 'writeIdx',
}
case_files = sorted(glob.glob(os.path.join(HERE, 'cases', '*.js')))
block = ('// <<WB_ENGINE_START>>\n' + rd(os.path.join(HERE, 'wb_engine.js')) + '\n'
         + '\n'.join(rd(p) for p in case_files) + '\n' + rd(os.path.join(HERE, 'wb_app.js')) + '// <<WB_ENGINE_END>>\n')
if '// <<WB_ENGINE_START>>' in s:
    s = re.sub(r'// <<WB_ENGINE_START>>.*?// <<WB_ENGINE_END>>\n', lambda m: block, s, flags=re.S)
else:
    anchor = '// ==================== 王炸引擎 ③ 数据'
    assert s.count(anchor) == 1
    s = s.replace(anchor, block + '\n' + anchor)

# 竹节句页签（第一个做的，结构稍有不同）：统一成 wbStageHtml + wbGlossHtml
s = re.sub(r'        <!-- WB_STAGE -->\n        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#fff; margin-bottom:14px;">\n          <svg id="wbStage".*?\n        </div>\n',
           '        <!-- WB_STAGE -->${wbStageHtml("bamboo_tree", superLabState.btIdx, false)}\n', s, flags=re.S)
s = re.sub(r'        <!-- WB_GLOSS -->\n        <div style="margin-top:14px; background:#f8fafc;.*?\.join\(""\)\}\n        </div>\n',
           '        <!-- WB_GLOSS -->${wbGlossHtml("bamboo_tree", superLabState.btIdx)}\n', s, flags=re.S)

# 其余页签：把 tab 分支里第一个 Canvas 外框换成 wbStageHtml
OLD = ('        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a; margin-bottom:16px;">\n'
       '          <canvas id="superLabCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>\n'
       '        </div>')
for tab, var in TABS.items():
    if tab == 'bamboo_tree':
        continue
    # writing_alchemist 是最后的 else 分支
    head = '  } else {\n    const curWrite' if tab == 'writing_alchemist' else f'  }} else if (tab === "{tab}") {{\n'
    i = s.find(head, s.find('function renderSuperLabHubView'))
    assert i > 0, tab
    cands = [x for x in (s.find('  } else if (tab ===', i + len(head)), s.find('  } else {\n', i + len(head))) if x > 0]
    end = min(cands) if tab != 'writing_alchemist' else s.find('\n    `;\n', i)
    seg = s[i:end]
    tag = f'<!-- WB_STAGE:{tab} -->'
    if tag in seg:
        continue
    assert seg.count(OLD) == 1, (tab, seg.count(OLD))
    seg = seg.replace(OLD, f'        {tag}${{wbStageHtml("{tab}", superLabState.{var})}}')
    s = s[:i] + seg + s[end:]

old_loop = '''  if (vvStage && typeof VV !== "undefined") { startVVLoop(vvStage); return; }'''
if 'startWBLoop(wbStage)' not in s:
    s = s.replace(old_loop, old_loop + '''
  const wbStage = document.getElementById("wbStage");
  if (wbStage && typeof WB !== "undefined") { startWBLoop(wbStage); return; }''')
open(F, 'w', encoding='utf-8').write(s)
print('ok, cases:', [os.path.basename(p) for p in case_files])
