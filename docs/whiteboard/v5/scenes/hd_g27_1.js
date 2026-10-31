// 📘 G27 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g27.js 案例 1；对照清单 lab/INVENTORY_HD_G27_1_V5.md
// 角色关键帧：sprites/hdg27_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg27_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
const ITEMS = [
  ['w', 'G27 底层原理'],
  ['w', '情态动词家族：must / mustn\'t / should / may —— 交通校规用 must/mustn\'t（必须/禁止），暖心建议用 should（应该），礼貌请求用 may！'],
  ['w', '【注意 mustn\'t 的意思陷阱！】'],
  ['w', '英语里 mustn\'t 是口气最严厉的“绝对禁止、千万不准”（如红灯禁止通行 You mustn\'t cross the road）！'],
  ['w', '🔬 口气梯子（从轻到重）'],
  ['w', 'may 可以 → should 应该 → must 必须 → mustn\'t 不准'],
  ['w', 'may 礼貌请求：May I come in?'],
  ['w', 'should 建议：You should drink more water.'],
  ['w', 'mustn\'t 禁止：You mustn\'t swim here.'],
  ['s', 'May I come in? You should drink more water. You mustn\'t swim here.', '我可以进来吗？你应该多喝水。你不准在这里游泳。'],
  ['w', '⚠️ mustn\'t（不准）≠ don\'t have to（不必）'],
  ['w', '公式：情态动词 + 动词原形（不加 s，不加 to）'],
  ['w', '🗣️ 语境实证：You must stop at a red light, and you mustn\'t play on the road!'],
  ['w', '🎵 口诀：情态家族规矩同，后面一律接原形；must 必须，mustn\'t 严禁；should 应该'],
  ['w', 'G27 第1幕'],
  ['s', 'You must stop at a red light, and you mustn\'t play on the road!', '红灯必须停，严禁在马路上玩！'],
  ['n', '🎵 口诀：情态家族规矩同，后面一律接原形；must 必须，mustn\'t 严禁；should 应该提建议，May I 开口最礼貌！']
];
export default function build() { return autoBuild(SP, { title: '📘 G27 底层原理', items: ITEMS, acts: ACTS }); }
