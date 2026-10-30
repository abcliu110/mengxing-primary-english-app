// 🗺️ 学校与学习 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「学校与学习」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_1_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '包和盒', leaves: [
    ['👜 bag', '包，书包', 'bag'],
    ['🎒 schoolbag', '书包', 'schoolbag'],
    ['🧰 pencil box', '铅笔盒，文具盒', 'pencil box']
  ] },
  { name: '各种笔', leaves: [
    ['🖊️ pen', '钢笔，水笔', 'pen'],
    ['✏️ pencil', '铅笔', 'pencil'],
    ['🖍️ crayon', '蜡笔', 'crayon']
  ] },
  { name: '教室里', leaves: [
    ['👩‍🏫 teacher', '教师，老师', 'teacher'],
    ['🧑‍🏫 blackboard', '黑板', 'blackboard'],
    ['🏫 classroom', '教室', 'classroom'],
    ['🖼️ picture', '图画，照片', 'picture']
  ] },
  { name: '电器和灯', leaves: [
    ['💻 computer', '计算机，电脑', 'computer'],
    ['🪭 fan', '风扇，扇子', 'fan'],
    ['💡 light', '电灯，光线；轻的', 'light']
  ] },
  { name: '书、尺子、橡皮', leaves: [
    ['📖 book', '书，书本', 'book'],
    ['📏 ruler', '尺子', 'ruler'],
    ['🧼 eraser', '橡皮擦', 'eraser']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 学校与学习 · 思维导图讲解', center: '🌍 学校与学习', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Carry your bag.'],
    aTitle: '✨ 评价形容词', adjs: ['a bag', 'the bag', 'my bag'],
    intro: '今天用一张思维导图学「学校与学习」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
