// 🗺️ 城市与场所 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「城市与场所」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_12_V5.md
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
  { name: '公园里的花草树', leaves: [
    ['🌸 flower', '花，花朵', 'flower'],
    ['🌿 grass', '草，草地', 'grass'],
    ['🌳 tree', '树，树木', 'tree']
  ] },
  { name: '山和湖', leaves: [
    ['🚣 boat', '小船', 'boat'],
    ['⛰️ hill', '小山，山丘', 'hill'],
    ['🏞️ lake', '湖，湖泊', 'lake']
  ] },
  { name: '出门带上', leaves: [
    ['🧤 glove', '（分手指的）手套', 'glove'],
    ['🧣 scarf', '围巾，披巾', 'scarf'],
    ['☂️ umbrella', '雨伞', 'umbrella']
  ] },
  { name: '便宜和贵', leaves: [
    ['🏷️ cheap', '花钱少的，便宜的', 'cheap'],
    ['💎 expensive', '昂贵的，花钱多的', 'expensive']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 城市与场所 · 思维导图讲解', center: '🌍 城市与场所', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「城市与场所」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
