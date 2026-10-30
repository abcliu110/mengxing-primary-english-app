// 🗺️ 个人特征与情绪 · 思维导图讲解 —— v5.1 标准画法（主题思维导图讲解幕，DESIGN_MINDMAP_WORDCARD.md §1；版式 scenes/auto.js 的 mindmapBuild）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「个人特征与情绪」旧交互导图的全部节点 + 搭配框；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_11_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '好看', leaves: [
    ['🤴 handsome', '英俊的，帅气的', 'handsome'],
    ['👸 pretty', '漂亮的，可爱的', 'pretty']
  ] },
  { name: '大小高矮', leaves: [
    ['🐘 big', '大的', 'big'],
    ['🐕 short', '矮的；短的', 'short'],
    ['🐜 small', '小的', 'small'],
    ['🦒 tall', '高的', 'tall'],
    ['📏 long', '长的', 'long']
  ] },
  { name: '胖瘦强壮', leaves: [
    ['🐷 fat', '胖的，肥的', 'fat'],
    ['🐒 thin', '瘦的；薄的', 'thin'],
    ['🏋️ strong', '强壮的，坚固的', 'strong']
  ] },
  { name: '性格', leaves: [
    ['🤝 friendly', '友好的，亲切的', 'friendly'],
    ['🤫 quiet', '安静的，文静的', 'quiet'],
    ['💡 clever', '聪明的，机灵的', 'clever']
  ] },
  { name: '更多', leaves: [
    ['👓 glasses', '眼镜（常复数）', 'glasses'],
    ['🕰️ old', '老的，年长的；旧的；…岁的', 'old'],
    ['🚄 fast', '快的，迅速的；快地', 'fast']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 个人特征与情绪 · 思维导图讲解', center: '🌍 个人特征与情绪', hint: '点击周围节点开卡学习', groups: GROUPS,
    vTitle: '🔗 常用搭配动词', verbs: [],
    aTitle: '✨ 评价形容词', adjs: ['It has big ears.'],
    intro: '今天用一张思维导图学「个人特征与情绪」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
