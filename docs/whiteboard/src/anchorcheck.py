#!/usr/bin/env python3
"""anchorcheck.py [主文件.html] —— 补丁锚点 / 插入标记检查（返回码非 0 = 不通过）。

insert_wb.py 和 docs/home/step*.py 都是按字符串锚点改 5.7 MB 主文件的。锚点一旦没对上，
「if 标记不在: 替换」这类写法会静默跳过，主文件看起来正常、功能却少了一块。本脚本核对「改完之后应该在的东西」：

- 引擎 / 模块区块、各总枢入口、路由、停循环、身世标签、VV 按需加载等标记：各自出现次数在允许范围内；
- insert_wb.py 里登记的每个模块（READY / FP_READY / WO_READY / ZE_READY / 道具 / 共用小工具 / vv）在主文件里恰好有一个 wbmod-<id>；
- TABS 和 READY 里的实验室页签都有且只有一个 <!-- WB_STAGE:<页签> --> 标记（bamboo_tree 用老标记 <!-- WB_STAGE -->）；
- 实验室页内 LAB_GROUPS 里的每个页签都在 READY 里（新页签接线漏一步时会报出来）。

用法：独立运行；jscheck.py 末尾自动调用；insert_wb.py 写文件前调用 check(s)，有问题就不写、报错退出。
"""
import ast, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_MAIN = os.path.abspath(os.path.join(HERE, '..', '..', '..', '萌星小学英语_最终合并版.html'))

# (标记, 最少次数, 最多次数)；None = 不限
MARKERS = [
    ('// <<WB_ENGINE_START>>', 1, 1),
    ('// <<WB_ENGINE_END>>', 1, 1),
    ('<!-- <<WB_MODULES_START>>', 1, 1),
    ('<!-- <<WB_MODULES_END>> -->', 1, 1),
    ('<!-- WB_STAGE -->${wbStageHtml("bamboo_tree"', 1, 1),
    ('<!-- WB_GLOSS -->${wbGlossHtml("bamboo_tree"', 1, 1),
    ('startWBLoop(wbStage)', 1, 1),
    ('<!-- WB_STAGE:fp -->${act.movedTo ? fpMovedHtml(act)', 1, 1),
    ('<!-- WB_GLOSS:fp -->${act.movedTo', 1, 1),
    ('startWBLoop(fpStage, "fp")', 1, 1),
    ('<!-- WO_HOME', 1, 1),
    ('<!-- ZE_HOME', 1, 1),
    ('else if (s === "word_origins_hub") renderWordOriginsHubView();', 1, 1),
    ('else if (s === "zh_en_hub") renderZhEnHubView();', 1, 1),
    ('if (typeof woAnimId !== "undefined" && woAnimId) { cancelAnimationFrame(woAnimId); woAnimId = null; }', 1, 1),
    ('if (typeof zeAnimId !== "undefined" && zeAnimId) { cancelAnimationFrame(zeAnimId); zeAnimId = null; }', 1, 1),
    ('<!-- WO_ORIGIN_TAGS -->', 1, 1),
    ('<script type="text/plain" id="wbmod-vv">', 1, 1),
    ('wbLoadModule("vv")', 1, 1),
    ('<script>\n/* ===== 万能动词×向量转盘 VV 动画', 0, 0),   # 没改成按需加载 = 首页多解析 1.7 MB
    # 首页改版（docs/home/step*.py）
    ('const LAB_GROUPS = [', 1, 1),
    ('${homeContinueHtml()}', 1, 1),
    ('function noteLastView', 1, 1),
    ('class="lab-tab${tab === id ? \' on\' : \'\'}">${labDoneMark(id)}', 1, 1),
    ('class="lab-entry', 1, None),
    ('十五大王炸方法论</h', 0, 0),          # step1 删掉的重复横幅不能回来
    ('v4.0 终极宗师·十二大王炸全规律版', 0, 0),  # step3 去掉的顶栏版本号不能回来
    # 主题思维导图讲解幕（v5/embed_app.py HD_HOOKS，2026-10-30）：舞台 + 挂钩各 1 处；交互导图本身必须还在
    ('<!-- WB5_HD:mindmap_stage -->', 1, 1),
    ('// WB5_HD:mindmap（讲解幕；下方交互导图照常）', 1, 1),
    ('<canvas id="themeMindMapCanvas"', 1, 1),
    # 词卡真实词源 / 💡 巧记小故事分开（src/patch_etym_card.py，2026-10-30）
    ('// ETYM_CARD_V1', 1, 1),
    ('<!-- ETYM_CARD:modal -->${etymRealHtml(w)}', 1, 1),
    ('<!-- ETYM_CARD:grid -->', 1, 1),
    ('<script type="application/json" id="ETYM_DB_JSON">', 1, 1),
    ('📖 词源与巧记故事', 0, 0),          # 旧的混排标题不能回来
    # 决策 14 练习闭环 + 总地图（src/patch_practice.py，2026-10-30）
    ('// PRACTICE_LOOP_V1', 1, 1),
    ('else if (s === "app_map") renderAppMapView();', 1, 1),
    ('if (typeof mqMount === "function") mqMount();', 1, 1),
    ('<script type="application/json" id="MODULE_QUIZ_JSON">', 1, 1),
    ('data-home-map', 1, 1),
]


def registry():
    """页签登记表：原来从 insert_wb.py 读；旧 SVG 白板退役（2026-10-30）后 insert_wb.py 已删，登记表冻结在 wb_registry.json。"""
    return json.load(open(os.path.join(HERE, 'wb_registry.json'), encoding='utf-8'))


RETIRED = '// <<WB_OLD_RETIRED>>'   # 2026-10-30 v5/retire_old_wb.py 删了旧 SVG 白板模块和引擎：相关标记不再检查
RETIRED_SKIP = ('// <<WB_ENGINE_START>>', '// <<WB_ENGINE_END>>', '<script type="text/plain" id="wbmod-vv">')


def check(s):
    errs = []
    retired = RETIRED in s
    for m, lo, hi in MARKERS:
        if retired and m in RETIRED_SKIP: continue
        n = s.count(m)
        if n < lo or (hi is not None and n > hi):
            want = f'{lo}' if lo == hi else f'{lo}–{hi if hi is not None else "∞"}'
            errs.append(f'标记出现 {n} 次（应为 {want}）：{m[:70]!r}')
    reg = registry()
    mods = list(reg.get('READY', [])) + list(reg.get('FP_READY', [])) + list(reg.get('WO_READY', [])) + list(reg.get('ZE_READY', []))
    if reg.get('FP_READY') or reg.get('ZE_READY'): mods.append('fp_props')
    if reg.get('WO_READY'):
        mods.append('wo_props')
        mods += [k for k, ts in reg.get('WO_KITS', {}).items() if any(t in reg['WO_READY'] for t in ts)]
    for mid in ([] if retired else mods):
        n = len(re.findall(r'<script type="text/plain" id="wbmod-%s"' % re.escape(mid), s))
        if n != 1:
            errs.append(f'按需加载模块 wbmod-{mid} 出现 {n} 次（应为 1）')
    tabs = set(reg.get('TABS', {})) | set(reg.get('READY', []))
    for t in sorted(tabs - {'bamboo_tree'}):
        n = s.count(f'<!-- WB_STAGE:{t} -->')
        if n != 1:
            errs.append(f'实验室页签 {t} 的 <!-- WB_STAGE:{t} --> 出现 {n} 次（应为 1）')
    m = re.search(r'const LAB_GROUPS = \[(.*?)\n\];', s, flags=re.S)
    if m:
        group_tabs = re.findall(r'\["(\w+)", "', m.group(1))
        miss = [t for t in group_tabs if t not in reg.get('READY', [])]
        if miss:
            errs.append(f'LAB_GROUPS 里的页签没登记进 wb_registry.json READY：{miss}')
    return errs


if __name__ == '__main__':
    main = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_MAIN
    errs = check(open(main, encoding='utf-8').read())
    for e in errs: print('FAIL', e)
    print('anchorcheck:', 'OK' if not errs else f'FAIL（{len(errs)} 项）')
    sys.exit(1 if errs else 0)
