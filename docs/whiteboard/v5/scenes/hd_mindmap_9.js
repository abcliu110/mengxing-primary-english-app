// 🗺️ 语法功能与指代 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「语法功能与指代」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_9_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '我、你、他、她、它', leaves: [
    ['🙋 I / me / my / mine', '我(主格) / 我(宾格) / 我的(形物) / 我的(名物)', 'I / me / my / mine'],
    ['👉 you / your / yours', '你，你们(主/宾格) / 你的，你们的(形物/名物)', 'you / your / yours'],
    ['👦 he / him / his', '他(主格) / 他(宾格) / 他的(形物与名物同形)', 'he / him / his'],
    ['👧 she / her / hers', '她(主格) / 她(宾格) & 她的(形物) / 她的(名物)', 'she / her / hers'],
    ['🐱 it / its / itself', '它(主/宾格) / 它的(形物/名物) / 它自己', 'it / its / itself']
  ] },
  { name: '我们、他们、这那', leaves: [
    ['👫 we / us / our / ours', '我们(主格) / 我们(宾格) / 我们的(形物/名物)', 'we / us / our / ours'],
    ['👨‍👩‍👧‍👦 they / them / their / theirs', '他们/她们/它们(主格/宾格) / 他们的(形物/名物)', 'they / them / their / theirs'],
    ['👆 this / that / these / those', '这，这个 / 那，那个 / 这些 / 那些（指示代词）', 'this / that / these / those']
  ] },
  { name: '问什么、哪个、谁', leaves: [
    ['❓ what', '什么（询问事物、姓名、动作、职业、颜色、时间）', 'what'],
    ['🔀 which', '哪一个，哪一些（在已知的特定范围内做选择）', 'which'],
    ['🏷️ whose', '谁的（询问物品归属与主人，注意区别于 who\'s = who is）', 'whose'],
    ['🕵️ who / whom', '谁（询问人物身份与关系：who主格 / whom宾格）', 'who / whom']
  ] },
  { name: '问哪里、何时、为什么、怎样', leaves: [
    ['🧭 where', '在哪里，到哪里（询问地点、位置与方向）', 'where'],
    ['⏰ when', '什么时候，何时（询问时间、日期、星期或季节）', 'when'],
    ['🤔 why', '为什么（询问原因与理由，常与 because 配对）', 'why'],
    ['🔢 how / how many / how much', '怎样，如何 / 多少(问可数复数) / 多少，多少钱(问不可数或价格)', 'how / how many / how much']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 语法功能与指代 · 思维导图讲解', center: '🌍 语法功能与指代', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['I love my book. Please give it to me. It is mine.'],
    aTitle: '✨ 评价形容词', adjs: [],
    intro: '今天用一张思维导图学「语法功能与指代」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
