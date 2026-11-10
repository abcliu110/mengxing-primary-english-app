// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_hd_g35_1.yaml；改编排：模板 hd_g35_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 📘 G35 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g35.js 案例 1；对照清单 lab/INVENTORY_HD_G35_1_V5.md
// 角色关键帧：sprites/hdg35_1.js（人物先行帧库 cast/）
// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg35_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G35 底层原理'],
  ['w', 'There be 存现句与“就近原则” —— 表示“某处存在某物”——be 动词是个近视眼，谁紧挨着它就听谁的！'],
  ['w', '【为什么英语喜欢说 There is a book on the desk？】英语先用引导词 There 打头阵，再引出存在的新事物！'],
  ['w', '而且 be 动词只看紧挨着它的第一个名词是单是复（就近原则）——就近是考试与正式写作的约定，不是英语唯一的说法：日常口语里 There\'s 后跟复数非常常见！'],
  ['s', 'There\'s two books on the desk.', '桌上有两本书。（口语）'],
  ['w', '🔬 be 是近视眼：只看紧挨着它的第一个名词'],
  ['w', 'There is + 单数 / 不可数 ｜ There are + 复数'],
  ['w', '例：There is a computer and two books on the desk.（紧挨 a computer → is）'],
  ['s', 'There is a computer and two books on the desk.', '书桌上有一台电脑和两本书。'],
  ['w', '换个顺序：There are two books and a computer on the desk.（紧挨 two books → are）'],
  ['s', 'There are two books and a computer on the desk.', '书桌上有两本书和一台电脑。'],
  ['w', '不可数也用 is：There is some milk in the glass.'],
  ['s', 'There is some milk in the glass.', '玻璃杯里有一些牛奶。'],
  ['w', '常错：There are an apple and three pears on the plate. ✗ → There is an apple ... ✓'],
  ['s', 'There is an apple and three pears on the plate.', '盘子上有一个苹果和三个梨。'],
  ['w', 'G35 第1幕'],
  ['n', '🎵 口诀：There be 句型表存在，“某地有某物”记心怀；be 动词是个近视眼，只看身后第一个名：单数不可数用 is，复数紧挨就用 are！'],
];
export default function build() { return autoBuild(SP, { title: '📘 G35 底层原理', items: ITEMS, acts: ACTS }); }
