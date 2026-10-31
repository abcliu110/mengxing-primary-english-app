// 🗺️ 天气与四季 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「天气与四季」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_14_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '天气', leaves: [
    ['☁️ cloudy', '多云的，阴天的', 'cloudy'],
    ['🌧️ rainy', '下雨的，多雨的', 'rainy'],
    ['❄️ snowy', '下雪的，多雪的', 'snowy'],
    ['☀️ sunny', '晴朗的，阳光充足的', 'sunny'],
    ['🌬️ windy', '刮风的，多风的', 'windy']
  ] },
  { name: '四季', leaves: [
    ['🍂 autumn', '秋天，秋季', 'autumn'],
    ['🌱 spring', '春天，春季', 'spring'],
    ['🍉 summer', '夏天，夏季', 'summer'],
    ['⛄ winter', '冬天，冬季', 'winter']
  ] },
  { name: '冷和热', leaves: [
    ['🥶 cold', '寒冷的，冷的', 'cold'],
    ['🍃 cool', '凉爽的；酷的', 'cool'],
    ['🥵 hot', '热的，炎热的', 'hot'],
    ['🌤️ warm', '温暖的，暖和的', 'warm']
  ] },
  { name: '太阳、风、雨', leaves: [
    ['☀️ sun', '太阳，阳光', 'sun'],
    ['🌧️ rain', '雨；下雨', 'rain'],
    ['🌬️ wind', '风', 'wind']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 天气与四季 · 思维导图讲解', center: '🌍 天气与四季', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「天气与四季」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
