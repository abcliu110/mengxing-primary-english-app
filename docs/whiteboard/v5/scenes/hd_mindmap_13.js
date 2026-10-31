// 🗺️ 日常作息与动作 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「日常作息与动作」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_13_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '唱歌跳舞', leaves: [
    ['💃 dance', '跳舞', 'dance'],
    ['🎤 sing', '唱歌', 'sing']
  ] },
  { name: '动起来', leaves: [
    ['🪁 fly', '飞；放飞（风筝）', 'fly'],
    ['🦘 jump', '跳，跳跃', 'jump'],
    ['🚴 ride', '骑（自行车、马等）', 'ride'],
    ['🏃 run', '跑，奔跑', 'run'],
    ['🔄 turn', '转弯，转动；变成（颜色/天气变化） / （轮到的）顺序，机会（take turns 轮流）', 'turn'],
    ['🏊 swim', '游泳', 'swim']
  ] },
  { name: '读和写', leaves: [
    ['📝 write', '写，写字，写作', 'write'],
    ['📚 read', '读，阅读，看（书/报）', 'read']
  ] },
  { name: '玩、看和帮忙', leaves: [
    ['🔄 watch', '观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上随时“看”时间的工具）', 'watch'],
    ['🤝 help', '帮助，帮忙', 'help'],
    ['🎮 play', '玩耍；打（球）；弹奏（乐器）；戏剧', 'play']
  ] },
  { name: '作息', leaves: [
    ['🛌 sleep', '睡觉，睡眠', 'sleep'],
    ['🌅 morning', '早晨，上午', 'morning'],
    ['🥐 breakfast', '早餐，早饭', 'breakfast']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 日常作息与动作 · 思维导图讲解', center: '🌍 日常作息与动作', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「日常作息与动作」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
