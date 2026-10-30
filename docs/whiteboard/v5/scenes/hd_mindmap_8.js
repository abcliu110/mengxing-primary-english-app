// 🗺️ 服装与穿戴 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「服装与穿戴」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_8_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '外套', leaves: [
    ['🧥 coat', '外衣，大衣', 'coat'],
    ['🧥 jacket', '夹克衫，短上衣', 'jacket'],
    ['🧥 raincoat', '雨衣', 'raincoat'],
    ['🧥 overcoat', '长大衣，防寒外套', 'overcoat']
  ] },
  { name: '上衣', leaves: [
    ['👔 shirt', '衬衫', 'shirt'],
    ['🧶 sweater', '毛衣', 'sweater'],
    ['🎽 uniform', '校服，制服', 'uniform']
  ] },
  { name: '裙裤鞋袜', leaves: [
    ['👟 shoes', '鞋子（常复数）', 'shoes'],
    ['👗 skirt', '半身裙，短裙', 'skirt'],
    ['🧦 socks', '短袜（常复数）', 'socks'],
    ['🩳 shorts', '短裤（常复数）', 'shorts']
  ] },
  { name: '配饰', leaves: [
    ['👜 handbag', '（女式）手提包', 'handbag'],
    ['🕶️ sunglasses', '太阳镜，墨镜（常复数）', 'sunglasses'],
    ['💄 lipstick', '口红，唇膏', 'lipstick'],
    ['👓 eyeglass', '眼镜片（复数 eyeglasses 眼镜）', 'eyeglass']
  ] },
  { name: '更多', leaves: [
    ['🧶 woolen', '羊毛制的，毛线的', 'woolen']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 服装与穿戴 · 思维导图讲解', center: '🌍 服装与穿戴', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Put on your shirt.'],
    aTitle: '✨ 评价形容词', adjs: ['a shirt', 'the shirt', 'my shirt'],
    intro: '今天用一张思维导图学「服装与穿戴」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
