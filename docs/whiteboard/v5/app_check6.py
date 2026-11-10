#!/usr/bin/env python3
"""app_check6.py —— 主题思维导图讲解幕（hd_mindmap）回归（原 Playwright 版查已删老 App 的交互导图）。

用法：python3 app_check6.py [wordbank.json]
  wordbank.json 缺省为 laws-prototype/model/wordbank.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的思维导图一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：
  - 可跑（静态）：词库 38 个 theme_sub 中 25 个内容子主题（其余 13 个是波次例词/
    锚词/旗舰例词等桶子主题，见 BUCKETS）与白板 25 幕 hd_mindmap_1..25 的幕首
    子主题名一一对应（集合相等，不按顺序——幕号顺序与词库首现顺序不一致）；
    25 幕在 docs/whiteboard/lab/audit36/durations.json 里都有时长条目且 > 0。
    核查：① 幕首子主题集合 = 内容子主题集合；② 25 幕文件齐全；③ durations
    条目齐全且时长 > 0；④ 每个内容子主题在词库里至少有 1 词。
  - 跳过（打印说明，不静默）：下方交互导图（16 节点可点、缩放/滚轮/拖拽/复位、
    点节点弹词卡）、讲解幕在导图上方等，全部是已删老 App vocab_theme 页
    （mmState / zoomMindMap / themeMindMapCanvas）的实时 UI 行为；现主文件与
    全仓库均无这些标识，新 App 也无主题思维导图呈现位。若要恢复，须先在新 App
    立呈现位并定新口径，另立项，本脚本不自行补数据。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check6：思维导图 N 子主题（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
WB_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'wordbank.json'
SCENES = HERE / 'scenes'
DUR = HERE.parent / 'lab' / 'audit36' / 'durations.json'
# 桶子主题：不是内容子主题，不配思维导图幕（2026-11-11 按名核实，13 个）。
BUCKETS = {
    'SR组例词', 'S组例词', '收官缺口补入（SR-06 锚词）', '旗舰例词',
    '词表缺口普查补入',
}
BUCKET_SUBSTR = ('波次例词',)


def is_bucket(sub):
    return sub in BUCKETS or any(s in sub for s in BUCKET_SUBSTR)


def scene_sub(path):
    """幕首注释里的子主题名，如「// 🗺️ 学校与学习 · 思维导图讲解」。"""
    head = path.read_text(encoding='utf-8')[:600]
    m = re.search(r'🗺️\s*(.+?)\s*·\s*思维导图', head)
    return m.group(1) if m else None


def main():
    wb_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else WB_DEFAULT
    try:
        wb = json.loads(wb_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check6：文件不存在：{wb_path}')
        sys.exit(2)
    if not DUR.exists():
        print(f'app_check6：无事实源：{DUR} 不存在')
        sys.exit(2)
    dur = json.loads(DUR.read_text(encoding='utf-8'))
    bad = []
    subs = {}
    for w in wb:
        subs.setdefault(w['theme_sub'], 0)
        subs[w['theme_sub']] += 1
    content = {s for s in subs if not is_bucket(s)}
    buckets = {s for s in subs if is_bucket(s)}
    if len(content) != 25:
        bad.append(f'内容子主题 {len(content)} 个（期望 25）：{sorted(content)}')
    if len(buckets) != 13:
        bad.append(f'桶子主题 {len(buckets)} 个（期望 13，新桶出现请更新 BUCKETS）：{sorted(buckets)}')
    scene_subs = {}
    for n in range(1, 26):
        p = SCENES / f'hd_mindmap_{n}.js'
        if not p.exists():
            bad.append(f'缺幕文件 hd_mindmap_{n}.js')
            continue
        s = scene_sub(p)
        if not s:
            bad.append(f'hd_mindmap_{n}.js 幕首无子主题名')
        elif s in scene_subs:
            bad.append(f'子主题 {s} 在 hd_mindmap_{scene_subs[s]}.js 与 hd_mindmap_{n}.js 重复')
        else:
            scene_subs[s] = n
        d = dur.get(f'hd_mindmap_{n}')
        if not d:
            bad.append(f'durations.json 缺 hd_mindmap_{n}')
        elif not isinstance(d, (int, float)) or d <= 0:
            bad.append(f'hd_mindmap_{n} 时长异常：{d}')
    if set(scene_subs) != content:
        bad.append(f'幕首子主题集合 ≠ 内容子主题集合：只在幕里 {sorted(set(scene_subs) - content)}；只在词库里 {sorted(content - set(scene_subs))}')
    low = [s for s in content if subs.get(s, 0) < 1]
    if low:
        bad.append(f'0 词子主题 {low}')
    for b in bad:
        print('BAD', b)
    print('app_check6：跳过交互导图腿（16 节点/缩放/拖拽/点节点弹词卡，需已删老 App 的 vocab_theme 页 mmState，现主文件与全仓库均无，见脚本头注）；只跑子主题↔幕↔时长静态核查')
    print(f'app_check6：思维导图 {len(content)} 子主题、{len(scene_subs)} 幕（wordbank.json ↔ scenes/hd_mindmap_*.js ↔ durations.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
