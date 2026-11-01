#!/usr/bin/env python3
"""mindmap 叶级对齐校验器（T12_plan 缺口 G7 门禁；T12-B9 固化）。

防再分叉门：mindmap 25 幕的唯一内容源 = 主 HTML 的 VOCAB_DB（补丁后）+ v5/mindmap_groups.json 分组表。
任一侧被单独改动而另一侧/场景未同步，本校验必须报错。

用法: python3 validate_mindmap.py [场景目录]   （缺省 docs/whiteboard/v5/scenes；可指向任意目录做对照）

规则:
  M1 分组表↔DB：每子主题 nodes 必须等于 DB 该 theme_sub 前 16 个词条 id（旧导图节点集口径，与 gen_mindmap_groups 一致）
  M2 分组闭合：每子主题各组 ids 展平后与 nodes 恰等（无重复、无遗漏、无表外 id）
  M3 场景↔源逐叶全等：hd_mindmap_<idx+1>.js 的 GROUPS（组名/组序/叶序）与
     「分组表 ids × DB 现行 emoji/word/meaning」重建结果逐字一致（叶格式 [emoji+' '+word, meaning, word]）
  M4 叶数总账：全量叶数 = 分组表 ids 总数（当前 398），且 25 幕齐全
"""
import json, pathlib, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
V5 = ROOT / 'docs' / 'whiteboard' / 'v5'
sys.path.insert(0, str(V5))
from gen_mindmap_groups import load_db  # noqa: E402  （其 APP 路径按自身位置解析，直读仓库根主 HTML）

EXTRACT_JS = r"""
const fs = require('fs'), path = require('path');
const dir = process.argv[1], out = {};
for (let n = 1; n <= 25; n++) {
  const f = path.join(dir, `hd_mindmap_${n}.js`);
  if (!fs.existsSync(f)) { out[`hd_mindmap_${n}`] = null; continue; }
  const src = fs.readFileSync(f, 'utf8');
  const a = src.indexOf('const GROUPS = '), b = src.indexOf('\n];', a);
  out[`hd_mindmap_${n}`] = eval(src.slice(a + 'const GROUPS = '.length, b + 2));
}
console.log(JSON.stringify(out));
"""


def main():
    scenes_dir = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else V5 / 'scenes'
    errors = []
    db = load_db()
    byid = {w['id']: w for w in db}
    subs_db = {}
    for w in db:
        subs_db.setdefault(w['theme_sub'], []).append(w)
    G = json.loads((V5 / 'mindmap_groups.json').read_text(encoding='utf-8'))['subs']
    if len(G) != 25:
        errors.append(f'分组表子主题数 {len(G)} != 25')

    total = 0
    expected = {}  # scene -> [{name, leaves:[[head, meaning, word], ...]}]
    for o in G:
        sub, n = o['sub'], o['idx'] + 1
        nodes_expect = [w['id'] for w in subs_db[sub][:18][:16]]
        if o['nodes'] != nodes_expect:
            errors.append(f'M1 {sub}: 分组表 nodes 与 DB 前 16 节点不一致')
        flat = [i for g in o['groups'] for i in g['ids']]
        if sorted(flat) != sorted(o['nodes']) or len(flat) != len(set(flat)):
            errors.append(f'M2 {sub}: 组 ids 展平与 nodes 不闭合（重复/遗漏/表外）')
        if any(i not in byid for i in flat):
            errors.append(f'M2 {sub}: 存在 DB 中无此 id 的叶')
            continue
        total += len(flat)
        expected[f'hd_mindmap_{n}'] = [
            {'name': g['name'],
             'leaves': [[byid[i]['emoji'] + ' ' + byid[i]['word'], byid[i]['meaning'], byid[i]['word']]
                        for i in g['ids']]}
            for g in o['groups']]

    got = json.loads(subprocess.run(['node', '-e', EXTRACT_JS, str(scenes_dir)],
                                     capture_output=True, text=True, check=True).stdout)
    for scene, exp in expected.items():
        act = got.get(scene)
        if act is None:
            errors.append(f'M3 {scene}: 场景文件缺失于 {scenes_dir}')
            continue
        act_norm = [{'name': g['name'], 'leaves': [list(l) for l in g['leaves']]} for g in act]
        if act_norm != exp:
            # 定位第一处不一致，便于定点修复
            detail = '组数/组名/组序不一致'
            for gi, (ga, ge) in enumerate(zip(act_norm, exp)):
                if ga != ge:
                    if ga['name'] != ge['name']:
                        detail = f"第 {gi} 组组名 {ga['name']!r} != {ge['name']!r}"
                    else:
                        for li, (la, le) in enumerate(zip(ga['leaves'], ge['leaves'])):
                            if la != le:
                                detail = f"组 {ge['name']!r} 第 {li} 叶 {la} != 源 {le}"
                                break
                        else:
                            detail = f"组 {ge['name']!r} 叶数 {len(ga['leaves'])} != {len(ge['leaves'])}"
                    break
            errors.append(f'M3 {scene}: 与 DB 现行文本不一致 —— {detail}')
        else:
            print(f'  ✓ {scene}（{sum(len(g["leaves"]) for g in exp)} 叶）')
    if total != 398:
        errors.append(f'M4 叶数总账 {total} != 398')
    print(f'叶数总账: {total}')
    if errors:
        print('不合格 %d 项:' % len(errors))
        for e in errors:
            print('  ✗', e)
        return 1
    print('validate_mindmap: 全部通过（M1–M4，25 幕 / %d 叶与补丁后 DB 逐字对齐）' % total)
    return 0


if __name__ == '__main__':
    sys.exit(main())
