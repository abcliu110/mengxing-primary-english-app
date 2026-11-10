// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_hd_g22_1.yaml；改编排：模板 hd_g22_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 📘 G22 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g22.js 案例 1；对照清单 lab/INVENTORY_HD_G22_1_V5.md
// 角色关键帧：sprites/hdg22_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg22_1.js';
const ACTS = {"*": ["l_write0", "l_speak", "l_think"]};
// R2SKIP（第六波第 1 项）：板上故意展示的错误形式 eated（常错行），按 SOP §7.3 不读。（goed 同行，但 go 已读到，检查口径下已覆盖，不列。）
const R2SKIP = ['eated'];
const ITEMS = [
  ['w', 'G22 底层原理'],
  ['w', '一般过去时不规则动词高频榜 (go→went / see→saw) —— 小学阶段最常考的 24 个“不加 ed、直接换马甲”的超级动词'],
  ['w', '【为什么越常用的动词越不按规则加 -ed？】'],
  ['w', '这些最高频的老词各有老变法，分组记，没有总规律：有的换元音（swim → swam），有的整个换词（go → went），有的带音变（buy → bought、have → had），还有同形不变的（put、cut）！'],
  ['s', 'Put, put. Cut, cut.', 'put、put。cut、cut。'],
  ['w', '🔬 不规则动词：不加 -ed，整个词换样'],
  ['s', 'No ed.', '不加 -ed。'],
  ['w', '高频榜：go → went, see → saw, eat → ate, have → had, do → did, take → took, make → made, buy → bought'],
  ['s', 'Go, went. See, saw. Eat, ate. Have, had. Do, did. Take, took. Make, made. Buy, bought.', 'go、went。see、saw。eat、ate。have、had。do、did。take、took。make、made。buy、bought。'],
  ['w', '分组记：换元音（sit → sat, swim → swam）；整个换（go → went）；变成 -ought（buy → bought, think → thought）'],
  ['s', 'Sit, sat. Swim, swam. Buy, bought. Think, thought.', 'sit、sat。swim、swam。buy、bought。think、thought。', 'ought'],
  ['w', '对比：I go to school every day. ｜ I went to school yesterday.'],
  ['s', 'I go to school every day.', '我每天去上学。'],
  ['s', 'I went to school yesterday.', '我昨天去上学了。'],
  ['w', '常错：goed ✗ → went ✓；eated ✗ → ate ✓'],
  ['w', '🗣️ 语境实证：Last weekend, we went (go) to the nature park and saw (see) many pandas.'],
  ['w', '🎵 口诀：go变went，see变saw，eat变ate，have变had，do变did；take'],
  ['w', 'G22 第1幕'],
  ['s', 'Last weekend, we went (go) to the nature park and saw (see) many pandas.', '上周末我们去了自然公园，看到了许多熊猫。'],
  ['n', '🎵 口诀：go变went，see变saw，eat变ate，have变had，do变did；take→took，make→made，come→came，give→gave；buy→bought，think→thought，teach→taught；put/cut/hurt/read 过去现在长一样！'],
];
export default function build() { return autoBuild(SP, { title: '📘 G22 底层原理', items: ITEMS, acts: ACTS }); }
