// 🗺️ 食物与饮品 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「食物与饮品」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_6_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '水果', leaves: [
    ['🍎 apple', '苹果', 'apple'],
    ['🍌 banana', '香蕉', 'banana'],
    ['🍐 pear', '梨', 'pear'],
    ['🍇 grape', '葡萄', 'grape'],
    ['🍓 strawberry', '草莓', 'strawberry'],
    ['🍉 watermelon', '西瓜', 'watermelon']
  ] },
  { name: '饭、点心和筷子', leaves: [
    ['🎂 cake', '蛋糕', 'cake'],
    ['🍚 rice', '米饭，大米', 'rice'],
    ['🍞 bread', '面包', 'bread'],
    ['🥢 chopsticks', '筷子（常复数）', 'chopsticks']
  ] },
  { name: '肉和蛋', leaves: [
    ['🍗 chicken', '鸡肉；小鸡', 'chicken'],
    ['🥚 egg', '鸡蛋，蛋', 'egg'],
    ['🐟 fish', '鱼肉；鱼', 'fish']
  ] },
  { name: '饮品', leaves: [
    ['🧃 juice', '果汁', 'juice'],
    ['🥛 milk', '牛奶', 'milk'],
    ['💧 water', '水', 'water']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 食物与饮品 · 思维导图讲解', center: '🌍 食物与饮品', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「食物与饮品」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
