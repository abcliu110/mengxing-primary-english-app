// 🤖 构词剧场 ② 前缀改变词义方向 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_formation.js 案例 2；对照清单 lab/INVENTORY_HD_FORMATION_2_V5.md
// 角色关键帧：sprites/hdf2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdf2.js';
const ACTS = {"*": ["l_point"]};
const ITEMS = [
  ['w', '构词法三大原理'],
  ['w', '英语单词像乐高积木：① 合成词(1+1合体) ② 前缀(戴头顶改方向/正反) ③ 后缀(挂词尾换词性)！'],
  ['w', '看中央实验台：理解词根词缀如何让词汇量翻 5 倍！'],
  ['w', '🚀 机制 2：前缀戴头顶 —— 改变词义方向（不改词性）'],
  ['w', '【un- / dis- / im-】🔄 否定反方向：happy ➔ unhappy ｜ like ➔ dislike ｜ polite ➔ impolite'],
  ['w', '【re- (再一次/往回)】🔁 重复/返回：write ➔ rewrite(重写) ｜ view ➔ review(复习) ｜ turn ➔ return'],
  ['w', '【sub-(下) / super-(超)】↕️ 空间上下级：subway(地下铁) ｜ supermarket(超级市场) ｜ superman'],
  ['w', '构词第2幕'],
  ['s', 'sunflower, unhappy, careful, carefully, friendly', '构词法公式：前缀改变词义方向，后缀决定词性角色！']
];
export default function build() { return autoBuild(SP, { title: '🤖 构词剧场 ② 前缀改变词义方向', items: ITEMS, acts: ACTS }); }
