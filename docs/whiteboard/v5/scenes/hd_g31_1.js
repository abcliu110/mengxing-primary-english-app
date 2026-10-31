// 📘 G31 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g31.js 案例 1；对照清单 lab/INVENTORY_HD_G31_1_V5.md
// 角色关键帧：sprites/hdg31_1.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg31_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G31 底层原理'],
  ['w', '特殊疑问词全家福 (5W1H 精准分工) —— what / who / whose / where / when / why / which / how —— 缺什么信息就派谁站句首！'],
  ['w', '【为什么英语疑问词几乎都以 wh- 开头，而且必须放在句首第一个词？】'],
  ['w', '英语把疑问词放在句首第一位（焦点前置），就像给听话人大脑发送一条检索指令：“请立刻去搜索【地点 Where / 时间 When / 人物 Who / 原因 Why】！”'],
  ['w', '🔬 Who / Whose / Who\'s 三兄弟'],
  ['w', 'Who 谁：问人是谁'],
  ['w', 'Whose 谁的：问东西归谁，后面常跟名词'],
  ['w', 'Who\'s = Who is（谁是）'],
  ['w', '例：— Who is that girl? — She is my cousin.'],
  ['s', 'Who is that girl? She is my cousin.', '那个女孩是谁？她是我的堂姐。'],
  ['w', '例：— Whose schoolbag is this? — It\'s Mike\'s.'],
  ['s', 'Whose schoolbag is this? It\'s Mike\'s.', '这是谁的书包？是迈克的。'],
  ['w', 'G31 第1幕'],
  ['n', '🎵 口诀：什么 what 谁是 who，谁的东西用 whose；哪里 where 何时 when，哪一个用 which 选；为什么 why 用 because 答，怎样程度全归 how！']
];
export default function build() { return autoBuild(SP, { title: '📘 G31 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
