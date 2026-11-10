#!/usr/bin/env python3
"""app_check_parts.py —— 长幕分节结构回归（原 Playwright 版查已删老 App 的分节按钮与切节播放）。

用法：python3 app_check_parts.py [durations.json]
  durations.json 缺省为 docs/whiteboard/lab/audit36/durations.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的长幕分节一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：分节事实源是两处现行文件——白板幕源文件
  docs/whiteboard/v5/scenes/<页签>[_pN]_<幕号>.js 与 durations.json：
  - 可跑（静态）：① 原 CASES 9 幕（与旧版同表）：主幕文件在、分节子幕
    <页签>_p2..pN_<幕号> 文件齐全且节号连续（从 2 起）、主幕与每节在
    durations.json 里都有时长条目且 > 0；② 原 NONE 1 幕（tense_matrix 第 2 幕）：
    无分节子幕、主幕 durations 条目 > 0；③ 全库：durations 里每个 _pN 条目
    都有对应幕源文件；每个非 gen_ 的 _pN 幕源文件都有 durations 条目。
    核查时 9 幕分节节数：tense_matrix_3 为 2 节、fp_economy_1 / hd_g07_1
    为 2 节、wo_port_1 为 5 节、aux_transformer_1 / tense_matrix_1 为 4 节、
    past_clans_1 / adj_order_1 / five_patterns_5 为 3 节；全库 _pN 条目
    48 个，幕源文件 77 个中多出的 29 个全是 gen_ 前缀的生成 stock/twin
    变体（durations 不跟踪，见下）。
  - 不断言：gen_stock_* / gen_b6pilot_* 等 gen_ 前缀 _pN 幕源文件不在
    durations.json 里——它们是生成器产出的 stock/twin 变体，不是分节子幕，
    不要求 durations 条目。
  - 跳过（打印说明，不静默）：分节按钮 UI（白板下「第 1 节 / 第 2 节」按钮、
    点节切换子幕可播、点回第 1 节），全部是已删老 App 白板挂载页
    （.wb5-parts / wb5Frame）的实时 UI 行为；现主文件与全仓库均无这些标识，
    白板线已定 C（白板独立、不嵌入新 App），新 App 也无分节呈现位。若要恢复，
    须先在新 App 立呈现位并定新口径，另立项，本脚本不自行补数据。
    分节后各节能否播，由 durcheck / v5check / 打包探针另行覆盖。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check_parts：长幕分节 N 幕（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SCENES = HERE / 'scenes'
DUR_DEFAULT = HERE.parent / 'lab' / 'audit36' / 'durations.json'
# 与旧版同表：(页签, 0 起幕号)；NONE 是不分节的抽查幕。
CASES = [
    ('tense_matrix', 2), ('fp_economy', 0), ('hd_g07', 0), ('wo_port', 0),
    ('aux_transformer', 0), ('tense_matrix', 0), ('past_clans', 0),
    ('adj_order', 0), ('five_patterns', 4),
]
NONE = [('tense_matrix', 1)]
PART_RE = re.compile(r'^(.+)_p(\d+)_(\d+)$')


def parts_of(tab, idx, files):
    """(页签, 0 起幕号) 的分节子幕节号列表（从 2 起连续才算）。"""
    want = f'{tab}_p'
    out = []
    for f in files:
        m = PART_RE.match(f)
        if m and m.group(1) == tab and int(m.group(3)) == idx + 1:
            out.append(int(m.group(2)))
    return sorted(out)


def main():
    dur_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DUR_DEFAULT
    try:
        dur = json.loads(dur_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check_parts：文件不存在：{dur_path}')
        sys.exit(2)
    if not SCENES.is_dir():
        print(f'app_check_parts：无事实源：{SCENES} 不存在')
        sys.exit(2)
    files = {p.stem for p in SCENES.glob('*.js')}
    bad = []

    def check_dur(key):
        d = dur.get(key)
        if d is None:
            bad.append(f'durations.json 缺 {key}')
        elif not isinstance(d, (int, float)) or d <= 0:
            bad.append(f'{key} 时长异常：{d}')

    n_parts = {}
    for tab, idx in CASES:
        base = f'{tab}_{idx + 1}'
        if base not in files:
            bad.append(f'缺主幕文件 {base}.js')
            continue
        check_dur(base)
        ps = parts_of(tab, idx, files)
        n_parts[base] = len(ps) + 1
        if not ps:
            bad.append(f'{base} 无分节子幕（期望 ≥ 2 节）')
            continue
        if ps != list(range(2, 2 + len(ps))):
            bad.append(f'{base} 节号不连续：{ps}')
        for n in ps:
            key = f'{tab}_p{n}_{idx + 1}'
            if key not in files:
                bad.append(f'缺分节幕文件 {key}.js')
            check_dur(key)
    for tab, idx in NONE:
        base = f'{tab}_{idx + 1}'
        if base not in files:
            bad.append(f'缺主幕文件 {base}.js')
            continue
        check_dur(base)
        ps = parts_of(tab, idx, files)
        if ps:
            bad.append(f'{base} 不应分节，却有子幕 {ps}')
    dur_parts = {k for k in dur if PART_RE.match(k)}
    for k in sorted(dur_parts):
        if k not in files:
            bad.append(f'durations 分节条目无幕源文件：{k}')
    for f in sorted(files):
        m = PART_RE.match(f)
        if m and not f.startswith('gen_') and f not in dur:
            bad.append(f'分节幕源文件无 durations 条目：{f}')
    for b in bad:
        print('BAD', b)
    print('app_check_parts：跳过分节按钮 UI 腿（点节切换/点回第 1 节，需已删老 App 的 .wb5-parts 与 wb5Frame，现主文件与全仓库均无，白板线已定 C 独立，见脚本头注）；只跑分节结构静态核查')
    print(f'app_check_parts：长幕分节 {len(CASES)} 幕（{n_parts}；不分节抽查 {len(NONE)} 幕；全库 _pN durations 条目 {len(dur_parts)} 个）（scenes/*.js ↔ durations.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
