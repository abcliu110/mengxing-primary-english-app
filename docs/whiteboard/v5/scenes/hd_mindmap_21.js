// 🗺️ 颜色与形状 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「颜色与形状」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_21_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '颜色', leaves: [
    ['🎨 color', '颜色(美)', 'color'],
    ['🌸 pink', '粉红色的', 'pink'],
    ['🩶 grey', '灰色的', 'grey'],
    ['🩶 gray', '灰色的(美)', 'gray'],
    ['🥈 silver', '银色/银的', 'silver']
  ] },
  { name: '形状和线条', leaves: [
    ['💠 shape', '形状', 'shape'],
    ['📏 line', '线条/排队', 'line'],
    ['👉 point', '点/指着', 'point'],
    ['⚪ round', '圆的', 'round']
  ] },
  { name: '尺寸大小', leaves: [
    ['🤏 narrow', '窄的', 'narrow'],
    ['📕 thick', '厚的/浓的', 'thick'],
    ['📉 low', '低的/矮的', 'low'],
    ['🐳 huge', '巨大的', 'huge'],
    ['🐳 biggest', 'big的最高级(最大的)', 'biggest']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 颜色与形状 · 思维导图讲解', center: '🌍 颜色与形状', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「颜色与形状」：14 个单词分成 3 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
