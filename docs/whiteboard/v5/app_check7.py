#!/usr/bin/env python3
"""app_check7.py —— 第一性原理总枢核查（原 Playwright 版查已删老 App 的原理总枢逐幕挂载）。

用法：python3 app_check7.py [wb13_fp.json]
  wb13_fp.json 缺省为 docs/whiteboard/src/wb13/wb13_fp.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的第一性原理一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：原理事实源已换形——老 App 内嵌 FIRST_PRINCIPLES_DB
  不复存在，现行事实源是白板分镜表 docs/whiteboard/src/wb13/wb13_fp.json
  （源：first_principles/STORYBOARD.md，6 原理 × 4 幕 = 24 段）：
  - 可跑（静态）：① 6 原理 × 4 幕 = 24 段、幕 id 唯一；② 未迁移的 22 幕：
    幕源文件 scenes/<id>.js 在、durations.json 条目在且时长 > 0；③ 已迁移
    的 2 幕（fp_one_king_1 → ze_be、fp_zoom_focus_1 → ze_modifier，映射旧
    断言 movedTo 跳转）：本幕无独立幕源文件、无 durations 条目（不重复建幕），
    迁移目标 ze_be_1 / ze_modifier_1 的幕源文件与 durations 条目都在。
    核查时 24 段全对上。
  - 跳过（打印说明，不静默）：总枢 UI（逐幕打开、v5 iframe / 跳转 / 旧 canvas
    三态、页面 canvas 清单），全部是已删老 App first_principles_hub 页
    （navigateTo / fpState / wb5Frame）的实时 UI 行为；现主文件与全仓库均无
    这些标识，新 App 也无原理总枢呈现位。若要恢复，须先在新 App 立呈现位
    并定新口径，另立项，本脚本不自行补数据。各幕能否播，由 durcheck /
    v5check / 打包探针另行覆盖。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check7：第一性原理 N 段（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FP_DEFAULT = HERE.parent / 'src' / 'wb13' / 'wb13_fp.json'
SCENES = HERE / 'scenes'
DUR = HERE.parent / 'lab' / 'audit36' / 'durations.json'
MOVED_RE = re.compile(r'已迁\S+\s+([A-Za-z0-9_]+)')


def main():
    fp_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else FP_DEFAULT
    try:
        fp = json.loads(fp_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check7：文件不存在：{fp_path}')
        sys.exit(2)
    if not DUR.exists():
        print(f'app_check7：无事实源：{DUR} 不存在')
        sys.exit(2)
    dur = json.loads(DUR.read_text(encoding='utf-8'))
    bad = []
    principles = fp.get('principles') or []
    if len(principles) != 6:
        bad.append(f'原理 {len(principles)} 条（期望 6）')
    seen = {}
    n_ok = n_moved = 0
    for p in principles:
        scenes = p.get('scenes') or []
        if len(scenes) != 4:
            bad.append(f'{p.get("id")} 幕 {len(scenes)} 段（期望 4）')
        for s in scenes:
            sid = s.get('id')
            if not sid:
                bad.append(f'{p.get("id")} 有无 id 的幕')
                continue
            if sid in seen:
                bad.append(f'幕 id 重复：{sid}')
            seen[sid] = True
            status = s.get('status_in_v5') or ''
            m = MOVED_RE.search(status)
            if m:
                target = m.group(1)
                n_moved += 1
                if (SCENES / f'{sid}.js').exists():
                    bad.append(f'已迁移幕仍有独立幕源文件：{sid}（→ {target}，应只留跳转）')
                if sid in dur:
                    bad.append(f'已迁移幕仍有 durations 条目：{sid}（→ {target}，应不重复建幕）')
                if not (SCENES / f'{target}_1.js').exists():
                    bad.append(f'迁移目标无幕源文件：{sid} → {target}_1.js')
                elif target + '_1' not in dur or not dur.get(target + '_1'):
                    bad.append(f'迁移目标无 durations 条目：{sid} → {target}_1')
            else:
                n_ok += 1
                if not (SCENES / f'{sid}.js').exists():
                    bad.append(f'缺幕源文件：{sid}.js')
                d = dur.get(sid)
                if d is None:
                    bad.append(f'durations.json 缺 {sid}')
                elif not isinstance(d, (int, float)) or d <= 0:
                    bad.append(f'{sid} 时长异常：{d}')
    for b in bad:
        print('BAD', b)
    print('app_check7：跳过总枢 UI 腿（逐幕打开/v5 iframe/跳转/旧 canvas 三态，需已删老 App 的 first_principles_hub 页，现主文件与全仓库均无，见脚本头注）；只跑原理分镜静态核查')
    print(f'app_check7：第一性原理 {len(seen)} 段（在幕 {n_ok}、已迁移 {n_moved}）（wb13_fp.json ↔ scenes/*.js ↔ durations.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
