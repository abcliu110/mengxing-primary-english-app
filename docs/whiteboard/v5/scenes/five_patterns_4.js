// 🧱 五大基本句型 · ④ SVOO 双手递礼型 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/five_patterns_p2_4.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 4；对照清单 lab/INVENTORY_FIVE_PATTERNS_4_V5.md
// 角色关键帧：sprites/fpat4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat4.js';
const ACTS = {"gave": ["mom_gift"], "give": ["l_pen"], "show": ["l_pen"], "pass": ["m_pass"]};
const ITEMS = [
  ['n', '句型 ④：有些动词天生就是「把东西递给人」，所以要带两个宾语。'],
  ['p', '🖊️'],
  ['p', '🎁'],
  ['w', '句型 ④ SVOO'],
  ['w', '双手递礼型 · to 指向 vs for 心意'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '句型 ④ SVOO'],
  ['w', '双手递礼型 · to 指向 vs for 心意'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 骨架'],
  ['m', '② 人和物'],
  ['m', '③ to 指向'],
  ['m', '④ for 心意'],
  ['m', '⑤ 公式·口诀'],
  ['m', '🔮 预测'],
  ['n', '双宾动词：give、send、buy、make……都是把某物交给某人。'],
  ['w', 'S 主语'],
  ['m', 'Mum'],
  ['m', '+'],
  ['m', 'V 双宾动词'],
  ['w', 'gave / bought'],
  ['n', '间接宾语 IO：收到东西的「人」，比如 me。sb. 是 somebody（某人）的缩写。'],
  ['m', '+'],
  ['m', 'IO 人'],
  ['m', 'sb. 某人'],
  ['m', 'me'],
  ['n', '直接宾语 DO：递出去的「物」：a birthday gift。sth. 是 something（某物）。'],
  ['m', '+'],
  ['m', 'DO 物'],
  ['w', 'sth. 某物'],
  ['w', 'a birthday gift'],
  ['n', '双宾语：一个动词带两个宾语：人在前，物在后。'],
  ['s', 'Mum gave me a birthday gift.', '妈妈送了我一份生日礼物。', 'Mum me a birthday gift a birthday gift'],
  ['s', 'Somebody, something. Somebody gave me something.', '某人，某物。有人给了我一样东西。', 'somebody something'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ④ SVOO 双手递礼型', items: ITEMS, acts: ACTS }); }
