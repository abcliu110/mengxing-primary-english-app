// 🧱 五大基本句型 · ④ SVOO 双手递礼型 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_4（226 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 4；对照清单 lab/INVENTORY_FIVE_PATTERNS_4_V5.md
// 角色关键帧：sprites/fpat4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat4.js';
const ACTS = {"gave": ["mom_gift"], "give": ["l_pen"], "show": ["l_pen"], "pass": ["m_pass"]};
const ITEMS = [
  ['n', '也可以把物放前面、人放后面，但人前面要加 to 或 for。'],
  ['w', '人在前：V + sb. + sth.     或     物在前：V + sth. + to / for + sb.'],
  ['w', 'Leo gave me a nice pen. = Leo gave a nice pen TO me.'],
  ['s', 'Leo gave me a nice pen. Leo gave a nice pen to me.', '里奥给了我一支好看的笔。', 'gave'],
  ['w', 'IO'],
  ['w', 'DO'],
  ['w', 'DO'],
  ['w', 'to + 人'],
  ['n', 'to 指向：把现成的东西单向递过去，像一支箭头，就用 to。'],
  ['s', 'Leo gave me a nice pen. Give it to me.', '里奥给了我一支好看的笔。把它给我。', 'Leo nice pen give to'],
  ['w', 'to 派：give / show / send / pass / lend / teach / tell'],
  ['s', 'Give, show, send, pass, lend, teach, tell. Please tell me a story.', '给、展示、寄、递、借给、教、讲。请给我讲个故事。', 'show send pass lend teach tell'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ④ SVOO 双手递礼型 · 第 2 节', items: ITEMS, acts: ACTS }); }
