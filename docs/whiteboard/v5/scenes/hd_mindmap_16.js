// 🗺️ 交通与出行 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「交通与出行」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_16_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '交通工具', leaves: [
    ['🚌 bus', '公共汽车，巴士', 'bus'],
    ['🚢 ship', '（大）船，轮船', 'ship'],
    ['🚇 subway', '地铁', 'subway'],
    ['🚲 bicycle', '自行车，脚踏车（= bike）', 'bicycle']
  ] },
  { name: '道路', leaves: [
    ['🛣️ crossing', '十字路口', 'crossing'],
    ['⬆️ straight', '笔直地；直的', 'straight'],
    ['🚦 traffic', '交通（traffic lights 交通信号灯）', 'traffic'],
    ['🛤️ railway', '铁路，铁道', 'railway']
  ] },
  { name: '安全和慢行', leaves: [
    ['⛑️ helmet', '头盔，安全帽', 'helmet'],
    ['🐢 slow', '慢的；放慢速度（slow down）', 'slow'],
    ['🛡️ safe', '安全的，平安的', 'safe'],
    ['🦺 safety', '安全，平安', 'safety']
  ] },
  { name: '出行和超市', leaves: [
    ['👋 away', '离开，向远处', 'away'],
    ['🛒 supermarket', '超级市场，超市', 'supermarket'],
    ['🧳 trip', '旅行，旅程', 'trip'],
    ['🛂 passport', '护照', 'passport']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 交通与出行 · 思维导图讲解', center: '🌍 交通与出行', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「交通与出行」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
