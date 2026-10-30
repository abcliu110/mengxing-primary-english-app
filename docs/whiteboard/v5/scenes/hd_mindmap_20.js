// 🗺️ 自然与地理 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「自然与地理」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_20_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '山和水', leaves: [
    ['⛰️ mountain', '高山，山岳', 'mountain'],
    ['🏞️ river', '河，江', 'river'],
    ['🏞️ waterfall', '瀑布', 'waterfall'],
    ['🏖️ seaside', '海边，海滨', 'seaside']
  ] },
  { name: '森林树木', leaves: [
    ['🌲 forest', '森林，林区', 'forest'],
    ['🪵 wood', '木头，木材（不可数）；小树林（常复数 woods）', 'wood']
  ] },
  { name: '村庄乡下', leaves: [
    ['🏡 village', '村庄，村镇', 'village'],
    ['🌾 countryside', '乡村，农村，郊外', 'countryside']
  ] },
  { name: '大自然', leaves: [
    ['🌍 environment', '自然环境，周围环境', 'environment'],
    ['🏞️ nature', '大自然，自然界', 'nature'],
    ['🌿 natural', '自然的，天然的', 'natural']
  ] },
  { name: '地球', leaves: [
    ['🌍 earth', '地球；泥土，大地', 'earth'],
    ['🌋 earthquake', '地震', 'earthquake']
  ] },
  { name: '更多', leaves: [
    ['🌉 bridge', '桥，桥梁', 'bridge'],
    ['👀 sight', '视力；景象，风景名胜', 'sight'],
    ['👣 footprint', '脚印，足迹', 'footprint']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 自然与地理 · 思维导图讲解', center: '🌍 自然与地理', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['There is a bridge over the river.'],
    aTitle: '✨ 评价形容词', adjs: ['a bridge', 'the bridge', 'my bridge'],
    intro: '今天用一张思维导图学「自然与地理」：16 个单词分成 6 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
