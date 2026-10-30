// 🗺️ 职业与社会 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「职业与社会」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_18_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '看病', leaves: [
    ['🩺 doctor', '医生', 'doctor'],
    ['👩‍⚕️ nurse', '护士', 'nurse']
  ] },
  { name: '驾驶', leaves: [
    ['🚌 driver', '司机，驾驶员', 'driver'],
    ['🎣 fisherman', '渔民，渔夫', 'fisherman'],
    ['🧑‍✈️ pilot', '飞行员', 'pilot']
  ] },
  { name: '表演和报道', leaves: [
    ['🎭 actor', '男演员，演员', 'actor'],
    ['💃 actress', '女演员', 'actress'],
    ['🎙️ reporter', '记者，新闻播报员', 'reporter']
  ] },
  { name: '身边的人', leaves: [
    ['👫 friend', '朋友', 'friend'],
    ['🧑‍🎓 student', '学生', 'student'],
    ['🧳 visitor', '参观者，游客，来访者', 'visitor']
  ] },
  { name: '教练、科学家、警官', leaves: [
    ['⚽ coach', '教练', 'coach'],
    ['🧑‍🔬 scientist', '科学家', 'scientist'],
    ['👮 officer', '警官，军官，官员', 'officer']
  ] },
  { name: '更多', leaves: [
    ['🏭 factory', '工厂', 'factory'],
    ['🗺️ country', '国家；乡村，乡下', 'country']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 职业与社会 · 思维导图讲解', center: '🌍 职业与社会', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Amy is my good friend.'],
    aTitle: '✨ 评价形容词', adjs: ['a friend', 'the friend', 'my friend'],
    intro: '今天用一张思维导图学「职业与社会」：16 个单词分成 6 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
