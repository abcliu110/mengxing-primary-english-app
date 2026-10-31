// 🗺️ 运动与爱好 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「运动与爱好」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_24_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: 'go …ing', leaves: [
    ['⛸️ skating', '滑冰(go skating)', 'skating'],
    ['⛷️ skiing', '滑雪(go skiing)', 'skiing'],
    ['🚴 cycling', '骑行(go cycling)', 'cycling'],
    ['⛺ camping', '露营(go camping)', 'camping'],
    ['🎣 fishing', '钓鱼(go fishing)', 'fishing'],
    ['🚣 boating', '划船(go boating)', 'boating']
  ] },
  { name: '球类和比赛', leaves: [
    ['🏆 match', '比赛/火柴(复数matches)', 'match'],
    ['🏓 ping-pong', '乒乓球', 'ping-pong'],
    ['🏓 table tennis', '乒乓球', 'table tennis'],
    ['🎾 tennis', '网球', 'tennis']
  ] },
  { name: '乐器', leaves: [
    ['🎻 violin', '小提琴(play the violin)', 'violin'],
    ['🎸 guitar', '吉他(play the guitar)', 'guitar'],
    ['🥁 drum', '鼓', 'drum'],
    ['🪈 flute', '长笛', 'flute']
  ] },
  { name: '爱好和电影', leaves: [
    ['🎨 hobby', '业余爱好(复数hobbies)', 'hobby'],
    ['🎞️ film', '电影(see a film)', 'film']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 运动与爱好 · 思维导图讲解', center: '🌍 运动与爱好', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: ['Let\'s learn and use "match" in a sentence!'],
    aTitle: '✨ 评价形容词', adjs: ['a match', 'the match', 'my match'],
    intro: '今天用一张思维导图学「运动与爱好」：16 个单词分成 4 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
