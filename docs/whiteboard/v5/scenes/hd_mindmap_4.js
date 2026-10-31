// 🗺️ 数字与计量 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「数字与计量」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_4_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '数字 1–5', leaves: [
    ['🖐️ five', '五，五个', 'five'],
    ['4️⃣ four', '四，四个', 'four'],
    ['1️⃣ one', '一，一个', 'one'],
    ['3️⃣ three', '三，三个', 'three'],
    ['2️⃣ two', '二，两个', 'two']
  ] },
  { name: '数字 6–10', leaves: [
    ['8️⃣ eight', '八，八个', 'eight'],
    ['9️⃣ nine', '九，九个', 'nine'],
    ['7️⃣ seven', '七，七个', 'seven'],
    ['6️⃣ six', '六，六个', 'six'],
    ['🔟 ten', '十，十个', 'ten']
  ] },
  { name: '数字 11–18 和钟表', leaves: [
    ['🕰️ clock', '时钟，钟表', 'clock'],
    ['1️⃣8️⃣ eighteen', '十八', 'eighteen'],
    ['1️⃣1️⃣ eleven', '十一', 'eleven'],
    ['1️⃣5️⃣ fifteen', '十五', 'fifteen'],
    ['1️⃣6️⃣ sixteen', '十六', 'sixteen'],
    ['🕛 twelve', '十二', 'twelve']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 数字与计量 · 思维导图讲解', center: '🌍 数字与计量', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「数字与计量」：16 个单词分成 3 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
