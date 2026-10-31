// 🗺️ 数字与数量 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「数字与数量」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_22_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '数字', leaves: [
    ['🔢 number', '数字/号码', 'number'],
    ['0️⃣ zero', '零(0)', 'zero'],
    ['💯 hundred', '百(100)', 'hundred'],
    ['🔢 thousand', '千(1000)', 'thousand'],
    ['🔢 million', '百万', 'million']
  ] },
  { name: '多少和一些', leaves: [
    ['🔢 many', '许多(修饰可数复数)', 'many'],
    ['💧 much', '许多(修饰不可数)/非常', 'much'],
    ['✨ some', '一些(肯定句/礼貌请求)', 'some'],
    ['❓ any', '任何/一些(否定疑问句)', 'any'],
    ['🌐 all', '所有的(≥3)', 'all']
  ] },
  { name: '一双、一片', leaves: [
    ['👟 pair', '一双/一对(a pair of)', 'pair'],
    ['📄 piece', '一片/一张(a piece of)', 'piece']
  ] },
  { name: '单位', leaves: [
    ['⚖️ kilo', '千克/公斤', 'kilo'],
    ['📏 metre', '米(长度单位)', 'metre'],
    ['📏 centimetre', '厘米', 'centimetre'],
    ['🐘 ton', '吨', 'ton']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 数字与数量 · 思维导图讲解', center: '🌍 数字与数量', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「数字与数量」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
