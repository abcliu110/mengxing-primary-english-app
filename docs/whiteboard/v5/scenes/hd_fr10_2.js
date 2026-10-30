// 🤩 情感触发小剧场 · 视角 2 -ed 形容词 (修饰体验者人：感到…的) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr10.js 案例 2；对照清单 lab/INVENTORY_HD_FR10_2_V5.md
// 角色关键帧：sprites/fr10_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr10_2.js';
const ACTS = {"*": ["l_laugh"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🤩 情感触发小剧场 (Emotion: -ed vs -ing) — 同一客观事件，切换主语视角即切换动词 (-ed 形容词 (修饰体验者人：感到…的))'],
  ['w', '当前视角流向：人接收到刺激后，内心感到某种情绪 ｜ 句法结构公式：Experiencer (人) + be + excited / interested / tired'],
  ['w', '🎬 视角 2 动态角色流向图：-ed 形容词 (修饰体验者人：感到…的)'],
  ['w', '⚡ -ed 形容词 (修饰体验者人：感到…的)'],
  ['w', '-ed 形容词 (修饰体验者人：感到…的) ⬅️'],
  ['w', '🗣️ The children are very excited about the game!'],
  ['w', '孩子们对这场比赛感到非常兴奋！ （句型公式：Experiencer (人) + be + excited / interested / tired）'],
  ['w', '视角 2·第1幕'],
  ['s', 'The children are very excited about the game!', '孩子们对这场比赛感到非常兴奋！ ｜ Experiencer (人) + be + excited / interested / tired']
];
export default function build() { return autoBuild(SP, { title: '🤩 情感触发小剧场 · 视角 2 -ed 形容词 (修饰体验者人：感到…的)', items: ITEMS, acts: ACTS }); }
