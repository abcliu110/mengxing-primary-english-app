// 📘 G40 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g40.js 案例 1；对照清单 lab/INVENTORY_HD_G40_1_V5.md
// 角色关键帧：sprites/hdg40_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg40_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G40 底层原理'],
  ['w', '动词核心搭配黄金句型 (like doing / want to do / It\'s time...) —— 一句话里出现两个动词怎么办？第二个动词必须变形为 to do 或 doing！'],
  ['w', '【为什么不能写 I like swim 或 I want go？】一个简单句只能有一位真正的谓语动词国王！'],
  ['w', '后面的第二个动词必须穿上 to do（指向未来目标） 或 doing（表示习惯体验） 的礼服！'],
  ['w', '🔬 G40 · 动词核心搭配黄金句型 (like doing / want to do / It\'s time...) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I like reading stories and enjoy swimming in summer.'],
  ['w', '我喜欢读故事，享受夏天游泳。她想买明信片，想吃面条。七点了，该去上学了！'],
  ['w', '② 核心结构规律：① 后接 V-ing：like / love / enjoy / finish + doing、go + doing (swimming/shopping)、所有介词后 (be good at doing / thank you for helping)'],
  ['w', '③ 进阶要点：② 后接 to + 原形：want / would like / plan / try + to do、ask / tell / teach sb to do'],
  ['w', 'G40 第1幕'],
  ['s', 'I like reading stories and enjoy swimming in summer.', '我喜欢读故事，享受夏天游泳。'],
  ['n', '🎵 口诀：一山不容二虎，一句不站两原形！想要计划去未来，want / would like / plan 后接 to do；享受爱好常态事，like / enjoy / finish 后接 doing；Let 和 make 最豪爽，宾语后面接原形；It\'s time to do 接动作，It\'s time for 后接名词！']
];
export default function build() { return autoBuild(SP, { title: '📘 G40 底层原理', items: ITEMS, acts: ACTS }); }
