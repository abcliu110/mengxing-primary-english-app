// 📘 G11 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g11.js 案例 1；对照清单 lab/INVENTORY_HD_G11_1_V5.md
// 角色关键帧：sprites/hdg11_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg11_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G11 底层原理'],
  ['w', '形容词的位置与系表搭桥铁律 —— 形容词修饰名词放前面；单独作谓语必须请 be/感官系动词搭桥！'],
  ['w', '【为什么汉语能说“我开心”，英语说 I happy 却是大错句？】汉语形容词自带“动词光环”；但英语的形容词（hap'],
  ['w', '🔬 G11 · 形容词的位置与系表搭桥铁律 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：She is a kind girl with big eyes.'],
  ['w', '她是个长着大眼睛的善良女孩。我哥哥又高又壮。这块蛋糕闻起来很香，尝起来很甜！'],
  ['w', '② 核心结构规律：① 定语位置：修饰普通名词放在前面（a red apple）；修饰 `something'],
  ['w', '③ 进阶要点：② 表语搭桥：主语 + be 或 五大感官系动词 (`look / sound / sm'],
  ['w', 'G11 第1幕'],
  ['s', 'She is a kind girl with big eyes.', '形容词，真奇妙，名词前面戴花帽（a cute cat）；若放主语后，系动词（am/is/are/look/feel/sound）必须来搭桥，千万不能把 be 抛（I am happy）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G11 底层原理', items: ITEMS, acts: ACTS }); }
