// 🗺️ 动物大世界 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「动物大世界」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_3_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '天上和水里', leaves: [
    ['🐦 bird', '鸟，小鸟', 'bird'],
    ['🦆 duck', '鸭子', 'duck']
  ] },
  { name: '树上和森林', leaves: [
    ['🐵 monkey', '猴子', 'monkey'],
    ['🐯 tiger', '老虎', 'tiger']
  ] },
  { name: '草地和草原', leaves: [
    ['🦒 giraffe', '长颈鹿', 'giraffe'],
    ['🐼 panda', '大熊猫', 'panda'],
    ['🐰 rabbit', '兔子', 'rabbit'],
    ['🐄 cow', '奶牛，母牛', 'cow'],
    ['🐴 horse', '马', 'horse']
  ] },
  { name: '蔬菜', leaves: [
    ['🥕 carrot', '胡萝卜', 'carrot'],
    ['🥔 potato', '马铃薯，土豆', 'potato']
  ] },
  { name: '更多', leaves: [
    ['🐱 cat', '猫', 'cat'],
    ['🐶 dog', '狗', 'dog'],
    ['🐷 pig', '猪', 'pig'],
    ['🐻 bear', '熊', 'bear'],
    ['🐘 elephant', '大象', 'elephant']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 动物大世界 · 思维导图讲解', center: '🌍 动物大世界', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['The bird can fly.'],
    aTitle: '✨ 评价形容词', adjs: ['a bird', 'the bird', 'my bird'],
    intro: '今天用一张思维导图学「动物大世界」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
