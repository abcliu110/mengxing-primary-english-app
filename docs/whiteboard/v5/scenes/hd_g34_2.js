// 📘 G34 底层原理 · 第2幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g34.js 案例 2；对照清单 lab/INVENTORY_HD_G34_2_V5.md
// 角色关键帧：sprites/hdg34_2.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg34_2.js';
const ACTS = {"*": ["l_point", "l_idea2", "m_pass"]};
const ITEMS = [
  ['w', 'G34 底层原理'],
  ['w', '感叹句双雄：What (a/an) vs How 秒判法则 —— 与疑问句原理完全相通：感叹“名词事物”用 What，感叹“形容词/副词程度”用 How！'],
  ['w', '【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！**What 管名词**（`What'],
  ['w', '🔬 感叹句三大公式'],
  ['w', 'What + a / an + 形容词 + 单数可数名词！'],
  ['w', 'What + 形容词 + 复数 / 不可数名词！（绝不加 a）'],
  ['w', 'How + 形容词 / 副词 + 主谓！'],
  ['s', 'What beautiful flowers they are! What fine weather it is!', '多么美丽的花啊！多么好的天气啊！'],
  ['s', 'How fast he runs!', '他跑得多快啊！'],
  ['w', 'G34 第2幕'],
  ['n', '🎵 口诀：感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！']
];
export default function build() { return autoBuild(SP, { title: '📘 G34 底层原理 · 第2幕', items: ITEMS, acts: ACTS }); }
