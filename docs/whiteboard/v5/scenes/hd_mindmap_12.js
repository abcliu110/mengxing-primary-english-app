// 🗺️ 城市与场所 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「城市与场所」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_12_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '场所', leaves: [
    ['🏞️ park', '公园', 'park'],
    ['🏫 school', '学校', 'school'],
    ['🦁 zoo', '动物园', 'zoo'],
    ['🏪 bookstore', '书店', 'bookstore'],
    ['🎬 cinema', '电影院', 'cinema']
  ] },
  { name: '花草树木', leaves: [
    ['🌸 flower', '花，花朵', 'flower'],
    ['🌿 grass', '草，草地', 'grass'],
    ['🌳 tree', '树，树木', 'tree']
  ] },
  { name: '山和湖', leaves: [
    ['🚣 boat', '小船', 'boat'],
    ['⛰️ hill', '小山，山丘', 'hill'],
    ['🏞️ lake', '湖，湖泊', 'lake']
  ] },
  { name: '随身物品', leaves: [
    ['🧤 glove', '（分手指的）手套', 'glove'],
    ['🧣 scarf', '围巾，披巾', 'scarf'],
    ['☂️ umbrella', '雨伞', 'umbrella']
  ] },
  { name: '价钱', leaves: [
    ['🏷️ cheap', '花钱少的，便宜的', 'cheap'],
    ['💎 expensive', '昂贵的，花钱多的', 'expensive']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 城市与场所 · 思维导图讲解', center: '🌍 城市与场所', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Let\'s go boating.'],
    aTitle: '✨ 评价形容词', adjs: ['a boat', 'the boat', 'my boat'],
    intro: '今天用一张思维导图学「城市与场所」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
