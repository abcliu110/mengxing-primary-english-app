// 🗺️ 情感与性格 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「情感与性格」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_23_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '心情', leaves: [
    ['😊 glad', '高兴的', 'glad'],
    ['🏅 proud', '自豪的(be proud of)', 'proud'],
    ['🥀 lonely', '孤独的', 'lonely'],
    ['🙏 sorry', '抱歉的/难过的', 'sorry']
  ] },
  { name: '感觉怎样', leaves: [
    ['😲 surprised', '惊讶的', 'surprised'],
    ['😰 nervous', '紧张的', 'nervous'],
    ['🥱 boring', '(物)枯燥无聊的', 'boring'],
    ['💓 felt', 'feel的过去式(感觉)', 'felt']
  ] },
  { name: '性格', leaves: [
    ['🦉 wise', '充满智慧的', 'wise'],
    ['🦁 brave', '勇敢的', 'brave'],
    ['😳 shy', '害羞的', 'shy'],
    ['🦥 lazy', '懒惰的', 'lazy'],
    ['🔥 popular', '受欢迎的', 'popular']
  ] },
  { name: '更好和最好', leaves: [
    ['👍 better', 'good/well的比较级(更好的)', 'better'],
    ['🥇 best', 'good/well的最高级(最好的)', 'best'],
    ['📉 worse', 'bad/ill的比较级(更糟的)', 'worse']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 情感与性格 · 思维导图讲解', center: '🌍 情感与性格', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: [],
    aTitle: '✨ 评价形容词', adjs: ['Let\'s learn and use "glad" in a sentence!'],
    intro: '今天用一张思维导图学「情感与性格」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
