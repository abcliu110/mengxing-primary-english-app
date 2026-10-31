// 🗺️ 节日与时间 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「节日与时间」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_15_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '星期一到星期四', leaves: [
    ['1️⃣ Monday', '星期一', 'Monday'],
    ['4️⃣ Thursday', '星期四', 'Thursday'],
    ['2️⃣ Tuesday', '星期二', 'Tuesday'],
    ['📅 Wednesday', '星期三', 'Wednesday']
  ] },
  { name: '星期五到周末', leaves: [
    ['☀️ Sunday', '星期日，礼拜天', 'Sunday'],
    ['5️⃣ Friday', '星期五', 'Friday'],
    ['6️⃣ Saturday', '星期六', 'Saturday'],
    ['🏕️ weekend', '周末', 'weekend']
  ] },
  { name: '月份', leaves: [
    ['🌺 May', '五月；可以，可能 (may)', 'May'],
    ['❄️ December', '十二月', 'December'],
    ['🎆 January', '一月', 'January'],
    ['🎈 June', '六月', 'June']
  ] },
  { name: '气球和礼物', leaves: [
    ['🎈 balloon', '气球', 'balloon'],
    ['🎁 gift', '礼物', 'gift']
  ] },
  { name: '今天、然后', leaves: [
    ['📅 today', '今天，今日', 'today'],
    ['⏩ then', '那时；然后，接着', 'then']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 节日与时间 · 思维导图讲解', center: '🌍 节日与时间', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「节日与时间」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
