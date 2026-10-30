"""gen_mindmap.py —— 生成主题思维导图讲解幕 scenes/hd_mindmap_<n>.js（n = 1…25，幕序号 = mindmap_groups.json 的 idx + 1）。
数据只来自主文件 VOCAB_DB（词条原文）+ v5/mindmap_groups.json（分组表）；版面由 scenes/auto.js 的 mindmapBuild 现场排。
角色：25 幕共用一个帧库 sprites/mindmap.js（l_speak / l_point / l_think / l_idea0，DESIGN_MINDMAP_WORDCARD.md §1.5）。
用法：python3 v5/gen_mindmap.py   （先跑 gen_mindmap_groups.py；之后 build.mjs / r1v5.py / shots.py / embed_app.py hd_mindmap …）"""
import json, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from gen_mindmap_groups import load_db
q = lambda s: "'" + str(s).replace('\\', '\\\\').replace("'", "\\'") + "'"
FRAMES = {'speak': 'l_speak', 'point': 'l_point', 'think': 'l_think', 'idea': 'l_idea0'}
db = load_db(); byid = {w['id']: w for w in db}
subs = {}
for w in db: subs.setdefault(w['theme_sub'], []).append(w)
G = json.loads((HERE / 'mindmap_groups.json').read_text(encoding='utf-8'))['subs']
for o in G:
    sub, n = o['sub'], o['idx'] + 1
    ws = subs[sub]; assert [w['id'] for w in ws[:18][:16]] == o['nodes'], (sub, '分组表与主文件节点不一致，先重跑 gen_mindmap_groups.py')
    col = ws[0].get('collocations') or {'verbs': ['use (使用)', 'see (看见)'], 'adjs': ['good (好的)', 'nice (不错的)']}
    nn = sum(len(g['ids']) for g in o['groups'])
    title = f'🗺️ {sub} · 思维导图讲解'
    groups = ',\n'.join('  { name: %s, leaves: [\n%s\n  ] }' % (q(g['name']), ',\n'.join(
        f"    [{q(byid[i]['emoji'] + ' ' + byid[i]['word'])}, {q(byid[i]['meaning'])}, {q(byid[i]['word'])}]" for i in g['ids'])) for g in o['groups'])
    src = f"""// {title} —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「{sub}」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_{n}_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import {{ mindmapBuild }} from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {{"*": {json.dumps(list(FRAMES.values()))}}};
const GROUPS = [
{groups}
];
export default function build() {{
  return mindmapBuild(SP, {{ title: {q(title)}, center: {q('🌍 ' + sub)}, hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: [{', '.join(q(v) for v in (col.get('verbs') or [])[:3])}],
    aTitle: '✨ 评价形容词', adjs: [{', '.join(q(a) for a in (col.get('adjs') or [])[:3])}],
    intro: {q(f'今天用一张思维导图学「{sub}」：{nn} 个单词分成 {len(o["groups"])} 组。')},
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {json.dumps(FRAMES)} }});
}}
"""
    (HERE / 'scenes' / f'hd_mindmap_{n}.js').write_text(src, encoding='utf-8')
    print(n, sub, len(o['groups']), '组', nn, '词')
