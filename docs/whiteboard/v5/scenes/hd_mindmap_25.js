// 🗺️ 核心语法功能词 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「核心语法功能词」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_25_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '主格', leaves: [
    ['🙋 I', '我(主格·永远大写)', 'I'],
    ['👦 he', '他(主格)', 'he'],
    ['👧 she', '她(主格)', 'she'],
    ['👫 we', '我们(主格)', 'we']
  ] },
  { name: '宾格', leaves: [
    ['👉 me', '我(宾格·放动介后)', 'me'],
    ['👉 him', '他(宾格)', 'him'],
    ['👧 her', '她(宾格)/她的(形物)', 'her']
  ] },
  { name: '主宾同形', leaves: [
    ['👉 you', '你/你们(主宾同形)', 'you'],
    ['🐾 it', '它(主宾同形)', 'it']
  ] },
  { name: '形物', leaves: [
    ['🎒 my', '我的(形物·后必接名词)', 'my'],
    ['🎒 your', '你的/你们的(形物)', 'your'],
    ['👦 his', '他的(形物名物同形)', 'his'],
    ['🐾 its', '它的(注意无撇号!)', 'its']
  ] },
  { name: '名物', leaves: [
    ['💎 mine', '我的东西(名物·后不接名词)', 'mine'],
    ['💎 yours', '你的/你们的(名物)', 'yours'],
    ['💎 hers', '她的东西(名物)', 'hers']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 核心语法功能词 · 思维导图讲解', center: '🌍 核心语法功能词', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Let\'s learn and use "I" in a sentence!'],
    aTitle: '✨ 评价形容词', adjs: [],
    intro: '今天用一张思维导图学「核心语法功能词」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
