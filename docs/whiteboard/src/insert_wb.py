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
    'bamboo_tree': 'btIdx', 'adj_order': 'adjExIdx', 'past_clans': 'clanIdx',
    'metaphor_code': 'metaIdx',   # stress_rhythm 已并入 intonation_map（WB_STAGE 标记已在主文件里，不再自动替换）
    'tense_matrix': 'tenseIdx',   # 2026-10-30 修：这一项原来被上一行注释吞掉了（标记已在主文件里，所以没出问题）
    'aux_transformer': 'auxIdx', 'five_patterns': 'patIdx', 'writing_alchemist': 'writeIdx',
}
# 只写入已验收的页签（做完一个页签就加进来）；其余 cases/*.js 可能还在制作中
FP_DEPS = {'fp_economy': 'wo_props fp_props', 'fp_vectors': 'wo_props fp_props', 'fp_boundedness': 'wo_props fp_props', 'fp_iconicity': 'wo_props fp_props', 'fp_one_king': 'wo_props fp_props', 'fp_zoom_focus': 'wo_props fp_props'}   # 升了引擎 v2 + 讲解员的原理（用 WO_PROPS 镜头模板 + fp_props 口型道具）
FP_READY = ['fp_economy', 'fp_vectors', 'fp_boundedness', 'fp_one_king', 'fp_zoom_focus', 'fp_iconicity']   # 第一性原理总枢：做完一条原理就把 id 加进来，如 'fp_economy'
READY = ['phrasal_key', 'eight_endings', 'pron_map', 'intonation_map', 'irregular_plural', 'bamboo_tree', 'adj_order', 'past_clans', 'stress_rhythm', 'metaphor_code', 'tense_matrix', 'aux_transformer', 'five_patterns', 'writing_alchemist']
SAMPLES = ['verb_demo']   # 样板模块（决策 30 动作系统 v2）：只写进按需模块供验收 / 审片（wbLoadAll 可见），不进页签、没有 WB_STAGE
# 单词身世总枢：做完一个溯源幕就把场景 id 加进来（没登记的场景在总枢里显示「即将上线」）
WO_READY = ['wo_port', 'wo_europe', 'wo_bluetooth', 'wo_grimm', 'wo_vowel_a', 'wo_vowel_b', 'wo_vowel_c', 'wo_time_num', 'wo_time_week']
# 中英对照总枢：做完一幕就把 id 加进来（搬迁幕依赖第一性原理道具 fp_props）
ZE_READY = ['ze_be', 'ze_modifier', 'ze_same', 'ze_yesno', 'ze_borrow', 'ze_subject', 'ze_link', 'ze_mark', 'ze_say', 'ze_wear', 'ze_pronoun']
ZE_DEPS = {'ze_be': 'wo_props', 'ze_modifier': 'wo_props', 'ze_same': 'wo_props', 'ze_yesno': 'wo_props', 'ze_borrow': 'wo_props', 'ze_subject': 'wo_props', 'ze_link': 'wo_props', 'ze_mark': 'wo_props', 'ze_say': 'wo_props', 'ze_wear': 'wo_props', 'ze_pronoun': 'wo_props'}   # 新做的对照幕用单词身世的 v2 镜头模板（WO_PROPS）；搬迁幕用 fp_props
WO_KITS = {'wo_vowel_kit': ['wo_vowel_a', 'wo_vowel_b', 'wo_vowel_c']}   # 几幕共用的小工具文件（作为依赖先执行）
# ---------- 按需加载（决策 13）：每个模块写成不执行的 <script type="text/plain" id="wbmod-<id>">，
# 第一次进入时由 wbLoadModule(id) 取出文字执行（见 wb_app.js）；道具文件是依赖（data-deps），先于模块执行。
# 引擎、讲解员、App 接线、单词身世总枢页面仍然直接执行（首页和各总枢页面要用）。
LAB_DEPS = {'phrasal_key': 'wo_props', 'eight_endings': 'wo_props', 'pron_map': 'wo_props fp_props', 'intonation_map': 'wo_props', 'irregular_plural': 'wo_props', 'bamboo_tree': 'wo_props', 'aux_transformer': 'wo_props', 'five_patterns': 'wo_props', 'tense_matrix': 'wo_props', 'past_clans': 'wo_props', 'adj_order': 'wo_props', 'metaphor_code': 'wo_props', 'stress_rhythm': 'wo_props', 'verb_demo': 'wo_props'}   # 用 v2 镜头模板的实验室页签（白板课）
MODS = [(t, LAB_DEPS.get(t, '')) for t in READY + SAMPLES]
if FP_READY:
    MODS += [('fp_props', '')] + [(t, FP_DEPS.get(t, 'fp_props')) for t in FP_READY]
if WO_READY:
    kit_of = {t: kit for kit, ts in WO_KITS.items() for t in ts if t in WO_READY}
    MODS += [('wo_props', '')] + [(kit, 'wo_props') for kit in WO_KITS if any(kit_of.get(t) == kit for t in WO_READY)]
    MODS += [(t, 'wo_props' + (' ' + kit_of[t] if t in kit_of else '')) for t in WO_READY]
if ZE_READY:
    if not FP_READY: MODS += [('fp_props', '')]
    MODS += [(t, ZE_DEPS.get(t, 'fp_props')) for t in ZE_READY]
case_files = [os.path.join(HERE, 'cases', t + '.js') for t, _ in MODS]
def mod_tag(mid, deps):
    src = rd(os.path.join(HERE, 'cases', mid + '.js'))
    # text/plain 里不能出现这两个序列，否则 HTML 解析器会提前结束或进入转义状态
    assert '</script' not in src.lower() and '<!--' not in src, mid
    return f'<script type="text/plain" id="wbmod-{mid}"' + (f' data-deps="{deps}"' if deps else '') + '>\n' + src + '\n</script>\n'
mods_html = ('<!-- <<WB_MODULES_START>> 白板模块（按需加载，不要手改；改 docs/whiteboard/src/cases/*.js 后运行 insert_wb.py） -->\n'
             + ''.join(mod_tag(m, d) for m, d in MODS) + '<!-- <<WB_MODULES_END>> -->\n')
block = ('// <<WB_ENGINE_START>>\n' + rd(os.path.join(HERE, 'wb_engine.js')) + '\n'
         + rd(os.path.join(HERE, 'wb_actor.js')) + '\n'
         + rd(os.path.join(HERE, 'wb_verbs.js')) + '\n'
         + rd(os.path.join(HERE, 'wb_app.js'))
         + rd(os.path.join(HERE, 'wo_hub.js'))
         + rd(os.path.join(HERE, 'ze_hub.js')) + '// <<WB_ENGINE_END>>\n')
if '<!-- <<WB_MODULES_START>>' in s:
    s = re.sub(r'<!-- <<WB_MODULES_START>>.*?<!-- <<WB_MODULES_END>> -->\n', lambda m: mods_html, s, flags=re.S)
else:
    assert s.count('</body>') == 1
    s = s.replace('</body>', mods_html + '</body>')
if '// <<WB_ENGINE_START>>' in s:
    s = re.sub(r'// <<WB_ENGINE_START>>.*?// <<WB_ENGINE_END>>\n', lambda m: block, s, flags=re.S)
else:
    anchor = '// ==================== 王炸引擎 ③ 数据'
    assert s.count(anchor) == 1
    s = s.replace(anchor, block + '\n' + anchor)

# 竹节句页签（第一个做的，结构稍有不同）：统一成 wbStageHtml + wbGlossHtml
s, _n_st = re.subn(r'        <!-- WB_STAGE -->\n        <div style="width:100%; overflow:hidden; border-radius:16px; border:2px solid #94a3b8; background:#fff; margin-bottom:14px;">\n          <svg id="wbStage".*?\n        </div>\n',
           '        <!-- WB_STAGE -->${wbStageHtml("bamboo_tree", superLabState.btIdx, false)}\n', s, flags=re.S)
s, _n_gl = re.subn(r'        <!-- WB_GLOSS -->\n        <div style="margin-top:14px; background:#f8fafc;.*?\.join\(""\)\}\n        </div>\n',
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
    assert s.count(old_loop) == 1, '锚点 old_loop 没对上'
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

# ---------- 中英对照总枢：首页入口（单词身世横幅下面）+ 路由 + 动画循环登记 ----------
ZE_HOME = '''    <!-- ZE_HOME：中英对照总枢入口（和第一性原理、单词身世总枢并列） -->
    <div onclick="navigateTo('zh_en_hub', { scene: 'ze_be' })"
      style="background:linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #0f766e 100%); color:#ffffff; border-radius:22px; padding:18px 24px; border:3px solid #14b8a6; margin-bottom:24px; cursor:pointer; box-shadow:0 12px 28px rgba(15,23,42,0.18);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
        <div style="flex:1; min-width:290px;">
          <h2 style="margin:0 0 6px; font-size:1.36rem; color:#ffffff; font-weight:900;">🔀 中英对照总枢：中文的习惯，哪些能搬、哪些不能搬</h2>
          <p style="margin:0 0 10px; font-size:0.92rem; color:#e2e8f0; line-height:1.55;">为什么不能说 <strong>I am like apples</strong>？「是」不等于 be、长修饰语要挂在名词后面、句子必须有主语……先讲中英文一样的，再讲不一样的。</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">✅ 这些你已经会了</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">🧠 「是」≠ be</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">❓ Yes / No 怎么答</span>
            <span style="background:rgba(255,255,255,0.12); border:1px solid rgba(94,234,212,0.5); padding:4px 10px; border-radius:8px; font-size:0.8rem; font-weight:700; color:#ccfbf1;">🔀 借：borrow / lend …</span>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#14b8a6,#0d9488); color:#0f172a; font-weight:900; font-size:1.02rem; padding:14px 22px; border-radius:16px; white-space:nowrap;">进入中英对照总枢 ➔</div>
      </div>
    </div>

'''
if ZE_READY and '<!-- ZE_HOME' not in s:
    assert s.count(HOME_ANCHOR) == 1
    s = s.replace(HOME_ANCHOR, ZE_HOME + HOME_ANCHOR)
if ZE_READY and 'zh_en_hub' not in s.split(ROUTE)[1][:400]:
    assert s.count(ROUTE) == 1
    s = s.replace(ROUTE, ROUTE + '  else if (s === "zh_en_hub") renderZhEnHubView();\n')
if ZE_READY and 'zeAnimId' not in s.split(STOP)[1][:400]:
    assert s.count(STOP) == 1
    s = s.replace(STOP, STOP + '  if (typeof zeAnimId !== "undefined" && zeAnimId) { cancelAnimationFrame(zeAnimId); zeAnimId = null; }\n')

# 第一性原理里搬走的幕（act.movedTo）：舞台和术语换成「一句话 + 跳转」卡片（fpMovedHtml 在 ze_hub.js）
FP_ST = '<!-- WB_STAGE:fp -->${wbStageHtml(law.id, fpState.actIdx, false, "fpWbStage")}'
if FP_ST in s:
    s = s.replace(FP_ST, '<!-- WB_STAGE:fp -->${act.movedTo ? fpMovedHtml(act) : wbStageHtml(law.id, fpState.actIdx, false, "fpWbStage")}')
FP_GL = '<!-- WB_GLOSS:fp -->${wbGlossHtml(law.id, fpState.actIdx)}'
if FP_GL in s:
    s = s.replace(FP_GL, '<!-- WB_GLOSS:fp -->${act.movedTo ? "" : wbGlossHtml(law.id, fpState.actIdx)}')

# ---------- 按需加载（决策 13 第 3 条）：「万能动词 × 向量转盘」VV 动画脚本（约 1.7 MB：webp 素材 base64 + 场景）
# 只有 verb_matrix 页签用，改成不执行的 wbmod-vv，进入页签渲染时才载入（首页不再解析这 1.7 MB）
VV_OPEN = '<script>\n/* ===== 万能动词×向量转盘 VV 动画'
if VV_OPEN in s:
    assert s.count(VV_OPEN) == 1
    i = s.index(VV_OPEN); j = s.index('</script>', i)
    assert '<!--' not in s[i + 8:j]
    s = s[:i] + '<script type="text/plain" id="wbmod-vv">' + s[i + 8:]
VV_USE = '${(typeof VV !== "undefined" && VV.has(comboKey))'
if VV_USE in s:
    assert s.count(VV_USE) == 1
    s = s.replace(VV_USE, '${(typeof wbLoadModule === "function" && wbLoadModule("vv"), typeof VV !== "undefined" && VV.has(comboKey))')

# ---------- 📖 身世标签（决策 11 + 12）：词卡背面「词源与巧记故事」下面插入标签（woOriginTagHtml 在 wo_hub.js）----------
CARD_ETY = """            <div style="font-size:0.9rem; color:#334155; margin-top:4px;">${w.etymology || w.memory_tip}</div>
          </div>
"""
if '<!-- WO_ORIGIN_TAGS -->' not in s:
    assert s.count(CARD_ETY) == 1
    s = s.replace(CARD_ETY, CARD_ETY + '          <!-- WO_ORIGIN_TAGS -->${typeof woOriginTagHtml === "function" ? woOriginTagHtml(w) : ""}\n')

# 写文件前核对：锚点没对上（静默跳过）时，改完的东西会少一块 —— 有问题就不写、报错退出
import sys
sys.path.insert(0, HERE)
import anchorcheck
_errs = anchorcheck.check(s)
if _errs:
    for e in _errs: print('FAIL', e)
    sys.exit('insert_wb: 锚点 / 插入标记检查不通过，主文件未改动')
open(F, 'w', encoding='utf-8').write(s)
print('ok, lazy modules:', [m for m, _ in MODS])
