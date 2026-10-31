// 🗺️ 交际与礼仪 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「交际与礼仪」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_17_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '打招呼', leaves: [
    ['👋 goodbye', '再见', 'goodbye'],
    ['👋 hello', '你好，喂', 'hello']
  ] },
  { name: '谢谢和尊重', leaves: [
    ['💐 thank', '感谢，谢谢（常复数 thanks）', 'thank'],
    ['🙇 respect', '尊敬，尊重', 'respect']
  ] },
  { name: '做事的样子', leaves: [
    ['🤫 quietly', '安静地，轻声地', 'quietly'],
    ['👌 exactly', '恰好，完全正确，正是如此', 'exactly'],
    ['🙇 politely', '礼貌地，客气地', 'politely'],
    ['🤗 warmly', '热情地，温暖地', 'warmly'],
    ['💌 truly', '真正地，真诚地（注意true去掉了e！）', 'truly']
  ] },
  { name: '好习惯', leaves: [
    ['✨ clean', '打扫；干净的，整洁的', 'clean'],
    ['🔄 turns', '顺序，轮流（take turns）', 'turns'],
    ['♻️ recycle', '回收利用，循环再用', 'recycle'],
    ['🤝 teamwork', '团队合作，配合', 'teamwork']
  ] },
  { name: '更多', leaves: [
    ['🪧 sign', '标志，指示牌；签名', 'sign'],
    ['✉️ reply', '回答，答复，回信', 'reply'],
    ['🔊 noise', '噪音，吵闹声，响声', 'noise']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 交际与礼仪 · 思维导图讲解', center: '🌍 交际与礼仪', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「交际与礼仪」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
