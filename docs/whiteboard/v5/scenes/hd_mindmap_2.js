// 🗺️ 身体与健康 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「身体与健康」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_2_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '头和脸', leaves: [
    ['👂 ear', '耳朵', 'ear'],
    ['👀 eye', '眼睛', 'eye'],
    ['😊 face', '脸，面孔', 'face'],
    ['👄 mouth', '嘴巴', 'mouth'],
    ['👃 nose', '鼻子', 'nose'],
    ['💇 haircut', '理发；发型', 'haircut']
  ] },
  { name: '身体部位', leaves: [
    ['💪 arm', '胳膊，手臂', 'arm'],
    ['🧍 body', '身体', 'body'],
    ['🦶 foot', '脚（复数feet）', 'foot'],
    ['✋ hand', '手', 'hand'],
    ['🗣️ head', '头，头部', 'head'],
    ['🦵 leg', '腿', 'leg']
  ] },
  { name: '生病不舒服', leaves: [
    ['🤕 headache', '头痛，头疼', 'headache'],
    ['🦷 toothache', '牙痛，牙疼', 'toothache'],
    ['🤒 illness', '疾病，生病', 'illness'],
    ['🛌 ill', '生病的，不舒服的', 'ill']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 身体与健康 · 思维导图讲解', center: '🌍 身体与健康', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「身体与健康」：16 个单词分成 3 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
