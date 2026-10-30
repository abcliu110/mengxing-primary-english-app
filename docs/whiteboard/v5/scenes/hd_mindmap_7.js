// 🗺️ 玩具与爱好 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「玩具与爱好」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_7_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '车和飞机', leaves: [
    ['🚗 car', '小汽车', 'car'],
    ['✈️ plane', '飞机', 'plane'],
    ['🚂 train', '火车，列车', 'train']
  ] },
  { name: '玩具', leaves: [
    ['⚽ ball', '球', 'ball'],
    ['🪆 doll', '洋娃娃，玩偶', 'doll'],
    ['🪁 kite', '风筝', 'kite'],
    ['🧩 puzzle', '谜；智力游戏；拼图', 'puzzle']
  ] },
  { name: '看的和听的', leaves: [
    ['🎨 cartoon', '漫画，动画片', 'cartoon'],
    ['🎵 song', '歌，歌曲', 'song'],
    ['📹 video', '视频，录像', 'video']
  ] },
  { name: '活动', leaves: [
    ['🥾 hiking', '远足，徒步旅行', 'hiking'],
    ['📖 studies', '学习，研究（study的第三人称单数）', 'studies'],
    ['🎬 act', '表演；行动；扮演', 'act'],
    ['🏀 sport', '体育运动', 'sport']
  ] },
  { name: '更多', leaves: [
    ['🧢 cap', '（有帽檐的）帽子，棒球帽', 'cap'],
    ['🗺️ map', '地图', 'map']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 玩具与爱好 · 思维导图讲解', center: '🌍 玩具与爱好', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Bounce the ball.'],
    aTitle: '✨ 评价形容词', adjs: ['a ball', 'the ball', 'my ball'],
    intro: '今天用一张思维导图学「玩具与爱好」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
