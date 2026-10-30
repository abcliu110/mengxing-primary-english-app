// 🧨 易混词剧场 ① 四个「看」look at / see / watch / read —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_relations.js 案例 1；对照清单 lab/INVENTORY_HD_RELATIONS_1_V5.md
// 角色关键帧：sprites/hdr1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdr1.js';
const ACTS = {"*": ["l_lookup", "m_tv", "l_read"]};
const ITEMS = [
  ['w', '母语负迁移排雷'],
  ['w', '汉语一个词（看/借/穿/说/花费），英语按『动作过程 vs 结果』『方向』『瞬时动作 vs 状态』严密拆分！'],
  ['w', '看中央实验台：用矢量方向图彻底分清易混词家族！'],
  ['w', '👀 排雷 1：四个『看』(look at / see / watch / read) 机制对比'],
  ['w', 'look at (目光投过去的过程)'],
  ['w', 'Look at the sky! (未必看见)'],
  ['w', 'see (画面进眼睛的结果)'],
  ['w', 'I can see a bird! (看见了)'],
  ['w', 'watch (专注盯移动屏幕/比赛)'],
  ['w', 'watch TV / watch a game'],
  ['w', 'read (看文字书报地图)'],
  ['w', 'read a book / read a map'],
  ['w', '辨析第1幕'],
  ['s', 'Look at the tree, I can see a bird! Borrow from vs Lend to!', '搞清动作过程与结果、方向与状态，彻底告别汉语负迁移丢分！']
];
export default function build() { return autoBuild(SP, { title: '🧨 易混词剧场 ① 四个「看」look at / see / watch / read', items: ITEMS, acts: ACTS }); }
