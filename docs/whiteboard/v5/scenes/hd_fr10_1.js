// 🤩 情感触发小剧场 · 视角 1 -ing 形容词 (修饰刺激源事物：令人…的) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr10.js 案例 1；对照清单 lab/INVENTORY_HD_FR10_1_V5.md
// 角色关键帧：sprites/fr10_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr10_1.js';
const ACTS = {"*": ["party_cheer"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🤩 情感触发小剧场 (Emotion: -ed vs -ing) — 同一客观事件，切换主语视角即切换动词 (-ing 形容词 (修饰刺激源事物：令人…的))'],
  ['w', '当前视角流向：事物本身散发魅力，让别人产生情绪 ｜ 句法结构公式：Trigger (物/事) + be + exciting / interesting / tiring'],
  ['w', '🎬 视角 1 动态角色流向图：-ing 形容词 (修饰刺激源事物：令人…的)'],
  ['w', '⚡ -ing 形容词 (修饰刺激源事物：令人…的)'],
  ['w', '-ing 形容词 (修饰刺激源事物：令人…的) ➡️'],
  ['w', '🗣️ The football game is very exciting!'],
  ['w', '这场足球赛太令人兴奋了！ （句型公式：Trigger (物/事) + be + exciting / interesting / tiring）'],
  ['w', '视角 1·第1幕'],
  ['s', 'The football game is very exciting!', '这场足球赛太令人兴奋了！ ｜ Trigger (物/事) + be + exciting / interesting / tiring']
];
export default function build() { return autoBuild(SP, { title: '🤩 情感触发小剧场 · 视角 1 -ing 形容词 (修饰刺激源事物：令人…的)', items: ITEMS, acts: ACTS }); }
