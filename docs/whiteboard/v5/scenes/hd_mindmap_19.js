// 🗺️ 居家与生活 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「居家与生活」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_19_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '房间', leaves: [
    ['🛁 bathroom', '浴室，洗手间', 'bathroom'],
    ['🛏️ bedroom', '卧室', 'bedroom'],
    ['🍳 kitchen', '厨房', 'kitchen'],
    ['🛋️ living room', '客厅，起居室', 'living room'],
    ['📚 study', '书房；学习', 'study'],
    ['🏢 apartment', '一套公寓房间', 'apartment']
  ] },
  { name: '家具和摆设', leaves: [
    ['🛋️ sofa', '沙发', 'sofa'],
    ['🍼 bottle', '瓶子（water bottle 水瓶）', 'bottle'],
    ['🪴 plant', '植物；种植', 'plant'],
    ['🍽️ table', '桌子，餐桌；表格', 'table'],
    ['🛏️ bed', '床', 'bed'],
    ['🚪 closet', '衣橱，壁柜', 'closet']
  ] },
  { name: '电器', leaves: [
    ['🧊 fridge', '冰箱', 'fridge'],
    ['📺 television', '电视，电视机 (TV)', 'television'],
    ['☎️ phone', '电话，手机；打电话', 'phone'],
    ['📞 telephone', '电话机', 'telephone']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 居家与生活 · 思维导图讲解', center: '🌍 居家与生活', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Wash your hands in the bathroom.'],
    aTitle: '✨ 评价形容词', adjs: ['a bathroom', 'the bathroom', 'my bathroom'],
    intro: '今天用一张思维导图学「居家与生活」：16 个单词分成 3 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
