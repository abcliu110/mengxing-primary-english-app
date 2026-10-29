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
# 只写入已验收的页签（做完一个页签就加进来）；其余 cases/*.js 可能还在制作中
FP_READY = ['fp_economy', 'fp_vectors', 'fp_boundedness', 'fp_one_king', 'fp_zoom_focus', 'fp_iconicity']   # 第一性原理总枢：做完一条原理就把 id 加进来，如 'fp_economy'
READY = ['bamboo_tree', 'vowel_shift', 'adj_order', 'past_clans', 'stress_rhythm', 'metaphor_code', 'tense_matrix', 'aux_transformer', 'five_patterns', 'writing_alchemist']
# 单词身世总枢：做完一个溯源幕就把场景 id 加进来（没登记的场景在总枢里显示「即将上线」）
WO_READY = ['wo_port']
case_files = [os.path.join(HERE, 'cases', t + '.js') for t in READY]
if FP_READY:
    case_files += [os.path.join(HERE, 'cases', 'fp_props.js')] + [os.path.join(HERE, 'cases', t + '.js') for t in FP_READY]
if WO_READY:
    case_files += [os.path.join(HERE, 'cases', 'wo_props.js')] + [os.path.join(HERE, 'cases', t + '.js') for t in WO_READY]
block = ('// <<WB_ENGINE_START>>\n' + rd(os.path.join(HERE, 'wb_engine.js')) + '\n'
         + rd(os.path.join(HERE, 'wb_actor.js')) + '\n'
         + '\n'.join(rd(p) for p in case_files) + '\n' + rd(os.path.join(HERE, 'wb_app.js'))
         + rd(os.path.join(HERE, 'wo_hub.js')) + '// <<WB_ENGINE_END>>\n')
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

# ---------- 第一性原理总枢 ----------
FP_OLD = ('      <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#0f172a;">\n'
          '        <canvas id="firstPrinciplesCanvas" style="width:100%; max-width:100%; height:auto; aspect-ratio:740/320; display:block;"></canvas>\n'
          '      </div>')
if '<!-- WB_STAGE:fp -->' not in s:
    assert s.count(FP_OLD) == 1
    s = s.replace(FP_OLD, '      <!-- WB_STAGE:fp -->${wbStageHtml(law.id, fpState.actIdx, false, "fpWbStage")}')
GL_ANCHOR = '    </div>\n\n    <!-- One-Law-Unifies-Ten-Rules Comparison Table -->'
if '<!-- WB_GLOSS:fp -->' not in s:
    assert s.count(GL_ANCHOR) == 1
    s = s.replace(GL_ANCHOR, '      <!-- WB_GLOSS:fp -->${wbGlossHtml(law.id, fpState.actIdx)}\n' + GL_ANCHOR)
FP_LOOP = ('  if (fpAnimId) { cancelAnimationFrame(fpAnimId); fpAnimId = null; }\n'
           '  const canvas = document.getElementById("firstPrinciplesCanvas");')
if 'startWBLoop(fpStage, "fp")' not in s:
    assert s.count(FP_LOOP) == 1
    s = s.replace(FP_LOOP, '  if (fpAnimId) { cancelAnimationFrame(fpAnimId); fpAnimId = null; }\n'
                  '  const fpStage = document.getElementById("fpWbStage");\n'
                  '  if (fpStage) { startWBLoop(fpStage, "fp"); return; }\n'
                  '  const canvas = document.getElementById("firstPrinciplesCanvas");')

# ---------- 单词身世总枢：首页入口 + 路由 + 动画循环登记 ----------
WO_HOME = '''    <!-- WO_HOME：单词身世总枢入口（和第一性原理总枢并列） -->
    <div onclick="navigateTo('word_origins_hub', { scene: 'wo_port' })"
      style="background:linear-gradient(135deg, #1e293b 0%, #422006 60%, #78350f 100%); color:#ffffff; border-radius:22px; padding:18px 24px; border:3px solid #f59e0b; margin-bottom:24px; cursor:pointer; box-shadow:0 12px 28px rgba(15,23,42,0.18);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
        <div style="flex:1; min-width:290px;">
          <h2 style="margin:0 0 6px; font-size:1.36rem; color:#ffffff; font-weight:900;">📖 单词身世总枢：每个单词都有自己的故事</h2>
          <p style="margin:0 0 10px; font-size:0.92rem; color:#e2e8f0; line-height:1.55;">地图 + 时间线：罗马 → 维京 → 诺曼 → 大航海 → 现代。看一个 <strong>port（港口）</strong> 怎么长出 import、export、passport、airport 一整家单词；每个说法都标 📜 真实词源 / 💡 记忆联想。</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(251,191,36,0.45); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#fef3c7;">🏛️ 欧洲文化密码</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(251,191,36,0.45); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#fef3c7;">⛵ 单词环游世界</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(251,191,36,0.45); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#fef3c7;">🦛 动植物名字里的画面</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(251,191,36,0.45); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#fef3c7;">🔍 辟谣角 …</span>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#f59e0b,#d97706); color:#0f172a; font-weight:900; font-size:1.02rem; padding:14px 22px; border-radius:16px; white-space:nowrap;">进入单词身世总枢 ➔</div>
      </div>
    </div>

'''
HOME_ANCHOR = '    <!-- v4.0 终极宗师版：十二大王炸全规律实验室 -->'
if '<!-- WO_HOME' not in s:
    assert s.count(HOME_ANCHOR) == 1
    s = s.replace(HOME_ANCHOR, WO_HOME + HOME_ANCHOR)
ROUTE = '  else if (s === "first_principles_hub") renderFirstPrinciplesHubView();\n'
if 'word_origins_hub' not in s.split(ROUTE)[1][:400]:
    assert s.count(ROUTE) == 1
    s = s.replace(ROUTE, ROUTE + '  else if (s === "word_origins_hub") renderWordOriginsHubView();\n')
STOP = 'function stopActiveCanvasLoops() {\n'
if 'woAnimId' not in s.split(STOP)[1][:300]:
    assert s.count(STOP) == 1
    s = s.replace(STOP, STOP + '  if (typeof woAnimId !== "undefined" && woAnimId) { cancelAnimationFrame(woAnimId); woAnimId = null; }\n')

open(F, 'w', encoding='utf-8').write(s)
print('ok, cases:', [os.path.basename(p) for p in case_files])
