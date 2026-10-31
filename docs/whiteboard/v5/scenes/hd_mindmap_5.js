// 🗺️ 色彩与空间方位 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「色彩与空间方位」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_5_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '黑和白', leaves: [
    ['⚫ black', '黑色的；黑色', 'black'],
    ['⚪ white', '白色的；白色', 'white']
  ] },
  { name: '红、黄、蓝', leaves: [
    ['🔵 blue', '蓝色的；蓝色', 'blue'],
    ['🔴 red', '红色的；红色', 'red'],
    ['🟡 yellow', '黄色的；黄色', 'yellow']
  ] },
  { name: '更多颜色', leaves: [
    ['🟢 green', '绿色的；绿色', 'green'],
    ['🟤 brown', '棕色的；棕色', 'brown'],
    ['🟠 orange', '橙色的；橙子', 'orange'],
    ['🟣 purple', '紫色的；紫色', 'purple']
  ] },
  { name: '在哪里', leaves: [
    ['📦 in', '在……里面', 'in'],
    ['📕 on', '在……上面（有接触）', 'on'],
    ['⬇️ under', '在……下面', 'under'],
    ['↔️ between', '在（两者）之间', 'between']
  ] },
  { name: '这儿、那儿、到处', leaves: [
    ['👇 here', '在这里，向这里', 'here'],
    ['👉 there', '在那里，往那里', 'there'],
    ['🧭 everywhere', '到处，处处，各个地方', 'everywhere']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 色彩与空间方位 · 思维导图讲解', center: '🌍 色彩与空间方位', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「色彩与空间方位」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
