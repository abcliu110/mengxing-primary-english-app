// 📘 G21 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g21.js 案例 1；对照清单 lab/INVENTORY_HD_G21_1_V5.md
// 角色关键帧：sprites/hdg21_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg21_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G21 底层原理'],
  ['w', '一般过去时规则变化 (-ed 变形与发音) —— 给过去发生的动作盖上“-ed 历史印章”'],
  ['w', '【为什么英语要把过去动词加上 -ed？】英语把过去时间信息直接编码在谓语动词身上（play ➔ played），让听'],
  ['w', '🔬 -ed 四条加法'],
  ['w', '一般 +ed：play → played'],
  ['w', '不发音的 e 结尾 +d：live → lived'],
  ['w', '辅音字母 + y：变 y 为 i 加 ed：study → studied'],
  ['w', '重读闭音节、末尾只有一个辅音字母：双写再加 ed：stop → stopped'],
  ['w', '读音：清辅音后读 /t/（washed）；浊辅音和元音后读 /d/（played）；t、d 后读 /ɪd/（wanted）'],
  ['s', 'I washed my hands. She played the piano. We wanted a cake.', '我洗了手。她弹了钢琴。我们想要一个蛋糕。'],
  ['w', '💡 为什么这样读？清配清、浊配浊，嘴巴最省力——见「第一性原理 · 经济原则」'],
  ['w', '常错：stoped ✗ → stopped ✓；studyed ✗ → studied ✓'],
  ['w', '🗣️ 语境实证：Yesterday I cleaned my room and washed my clothes.'],
  ['w', '🎵 口诀：一般过去表从前，规则动词加 ed；有 e 直接加个 d（lived），辅音加 y 变 i'],
  ['w', 'G21 第1幕'],
  ['s', 'Yesterday I cleaned my room and washed my clothes.', '一般过去表从前，规则动词加 ed；有 e 直接加个 d（lived），辅音加 y 变 ied（studied），辅元辅要双写加 ed（stopped）！']
];
export default function build() { return autoBuild(SP, { title: '📘 G21 底层原理', items: ITEMS, acts: ACTS }); }
