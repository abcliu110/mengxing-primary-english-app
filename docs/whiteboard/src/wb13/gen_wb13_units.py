"""gen_wb13_units.py —— TODO 1.3 白板实施：把 5 类主题登记进 v5/units.json。

只改 units.json，不改其他文件。写入格式与原文件逐字节兼容
（json.dumps(indent=1, ensure_ascii=False)，无尾换行；已断言 roundtrip）。

改动：
1. 新增 32 个 vv_<动词>_<小品词> 页签（cases 1/2，acts {}），插在 vv_give_out 之后。
2. 新增 12 个 vv_<动词>_core 页签（单独 12 幕，2026-11-09 第二波定夺转正，无 placeholder 标记），跟在 32 格之后。
3. 新增 hd_poly_law_v16 / v41 / v42 三个页签（各 1 幕，enter 走 openLaw），
   插在 hd_poly_v6_p14 之后。
4. 新增 hd_mindmap 页签（25 幕，标题/ACTS 从场景文件取），插在 hd_phonics 之后。
5. 补登记 ze_link / ze_pronoun / ze_yesno 第 1 幕（场景已存在，cases 原为空）。
6. vv_give_down 已下线（2026-11-09 第二波定夺）：场景文件删除、units 登记删除；
   vv_give_on 同批下线后于 2026-11-09 第四波恢复另立（见第 9 条）；
   checked_absent 记录保留在 laws-prototype/model/phrasal_combos.json 与 wb13_phrasal.json（数据文件，本脚本不管）。
7. 第一性原理：不改（22 幕 canonical 已登记；另 fp_economy_p2_1 为 parts 机制幕，
   不在 units 口径内；fp_one_king_1 / fp_zoom_focus_1 已迁中英对照）。
8. vv_give_back（2026-11-09 第三波）：give back 另立页签，场景系已下线 vv_give_down
   原文手写恢复（非 72 格），units.json 手工登记（插在 vv_give_over 之后），
   不在本脚本生成范围；本脚本基线断言（186 页签）已过时，勿直接重跑。
9. vv_give_on（2026-11-09 第四波）：give on (onto) 另立页签，场景系已下线 vv_give_on
   原文手写恢复（非 72 格），units.json 手工登记（插在 vv_give_back 之后），
   不在本脚本生成范围。

用法：python3 docs/whiteboard/src/wb13/gen_wb13_units.py [--check-only]
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
UNITS = os.path.join(ROOT, 'docs/whiteboard/v5/units.json')
WB13 = os.path.join(ROOT, 'docs/whiteboard/src/wb13')
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')

def scene_title(fname):
    txt = open(os.path.join(SCENES, fname), encoding='utf-8').read()
    m = re.search(r"title: '((?:[^'\\]|\\.)*)'", txt)
    assert m, f'取不到标题：{fname}'
    return m.group(1).replace("\\'", "'")

def scene_acts(fname):
    txt = open(os.path.join(SCENES, fname), encoding='utf-8').read()
    m = re.search(r"const ACTS = (\{.*?\});", txt)
    assert m, f'取不到 ACTS：{fname}'
    return json.loads(m.group(1))

def main():
    check_only = '--check-only' in sys.argv
    raw = open(UNITS, encoding='utf-8').read()
    U = json.loads(raw)
    assert json.dumps(U, ensure_ascii=False, indent=1) == raw, 'units.json 格式已漂移，先人工核对'
    assert len(U) == 186, f'页签基线应为 186，实得 {len(U)}'
    phrasal = json.load(open(os.path.join(WB13, 'wb13_phrasal.json'), encoding='utf-8'))
    pages = phrasal['pages']
    missing = [p for p in pages if p['kind'] == 'grid_cell' and p['status'] == 'attested' and not p['covered_by_vv']]
    assert len(missing) == 32
    cores = [p for p in pages if p['kind'] == 'verb_core']
    assert len(cores) == 12

    # 1+2. 32 格 + 12 核心义页签（单独 12 幕，已转正）
    vv_new = {}
    for p in missing:
        verb, part, combo = p['verb'], p['particle'], p['phrasal']
        tab = f'vv_{verb}_{part}'
        assert tab not in U, tab
        for n in (1, 2):
            assert os.path.exists(os.path.join(SCENES, f'{tab}_{n}.js')), f'{tab}_{n}.js 缺失'
        vv_new[tab] = {
            'field': 'vv', 'lib': 'vv' + verb + part,
            'name': f'🎬 万能动词 · {combo}',
            'cases': {
                '1': {'title': f'🎬 万能动词 · {combo} ①', 'acts': {}},
                '2': {'title': f'🎬 万能动词 · {combo} ②', 'acts': {}},
            },
        }
    for c in cores:
        verb = c['verb']
        tab = f'vv_{verb}_core'
        assert tab not in U, tab
        assert os.path.exists(os.path.join(SCENES, f'{tab}_1.js')), f'{tab}_1.js 缺失'
        vv_new[tab] = {
            'field': 'vv', 'lib': 'vv' + verb + 'core',
            'name': f'🎬 万能动词 · {verb} 核心义',
            'cases': {'1': {'title': f'🎬 万能动词 · {verb} 核心义', 'acts': {}}},
        }

    # 3. 一词多义规律页三页签
    poly = json.load(open(os.path.join(WB13, 'wb13_poly_laws.json'), encoding='utf-8'))
    poly_new = {}
    for pg in poly['pages']:
        sid = pg['v5_scene_id']  # hd_poly_law_v16
        law = pg['law_id']
        assert os.path.exists(os.path.join(SCENES, f'{sid}_1.js')), f'{sid}_1.js 缺失'
        poly_new[sid] = {
            'field': 'hd', 'enter': f"openLaw('{law}')", 'lib': 'hdplv' + law[2:],
            'name': f"🎞️ 一词多义 · {law} {pg['title']}",
            'cases': {'1': {'title': pg['title'], 'acts': {}}},
        }

    # 4. 思维导图 25 幕
    mm_cases = {}
    for n in range(1, 26):
        fname = f'hd_mindmap_{n}.js'
        assert os.path.exists(os.path.join(SCENES, fname)), fname
        mm_cases[str(n)] = {'title': scene_title(fname), 'acts': scene_acts(fname)}
    assert len({json.dumps(c['acts'], sort_keys=True) for c in mm_cases.values()}) == 1, '导图 25 幕 ACTS 不一致'
    mm_new = {
        'field': 'hd', 'enter': "navigateTo('vocab_theme', { viewMode: 'mindmap' })",
        'lib': 'mindmap', 'name': '🗺️ 主题思维导图讲解', 'cases': mm_cases,
    }

    # 5. 中英对照三幕补登记
    for tab in ('ze_link', 'ze_pronoun', 'ze_yesno'):
        assert U[tab]['cases'] == {}, f'{tab} cases 不为空：{U[tab]["cases"]}'
        U[tab]['cases'] = {'1': {'title': scene_title(f'{tab}_1.js'), 'acts': scene_acts(f'{tab}_1.js')}}

    # 6. give down / give on 已下线（2026-11-09 第二波定夺）：场景文件与 units 登记均已删除，
    #    本脚本不再向 units 写 checked_absent 标注；checked_absent 记录留在数据文件里。

    # 按锚点插入新页签
    out = {}
    for k, v in U.items():
        out[k] = v
        if k == 'vv_give_out':
            out.update(vv_new)
        elif k == 'hd_phonics':
            out['hd_mindmap'] = mm_new
        elif k == 'hd_poly_v6_p14':
            out.update(poly_new)
    assert len(out) == 186 + 32 + 12 + 3 + 1, f'页签总数应为 234，实得 {len(out)}'
    assert list(out.keys()).index('hd_mindmap') == list(out.keys()).index('hd_phonics') + 1
    assert list(out.keys()).index('hd_poly_law_v16') == list(out.keys()).index('hd_poly_v6_p14') + 1

    new_raw = json.dumps(out, ensure_ascii=False, indent=1)
    assert json.dumps(json.loads(new_raw), ensure_ascii=False, indent=1) == new_raw
    print(f'页签 186 → {len(out)}（+32 格 +12 核心义 +3 规律页 +1 导图）；'
          f'补登记 ze 3 幕；标注 checked_absent 2 处')
    if check_only:
        print('check-only：未写文件')
        return
    open(UNITS, 'w', encoding='utf-8').write(new_raw)
    print('已写 units.json')

if __name__ == '__main__':
    main()
