// 🎬 万能动词 · speak up ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「speak up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvspeakup2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'speak up：发表意见；大胆说'],
  ['w', 'speak up ②'],
  ['w', '发表意见；大胆说'],
  ['s', 'There was a brief silence, then Gerald spoke up.', '短暂的沉默之后，杰拉德开口了。', 'speak up'],
  ['m', 'SPEAK'],
  ['m', '向上'],
  ['w', 'speak：说（某种语言）；发言，讲话'],
  ['m', '+'],
  ['w', 'Could you speak up, please?'],
  ['m', 'speak up：大声点说'],
  ['w', 'There was a brief silence, then Gerald spoke up.'],
  ['m', 'speak up：发表意见；大胆说'],
  ['w', 'He is willing to speak up for the rights of women.'],
  ['m', 'speak up for somebody：为（某人）说话；维护'],
  ['w', '共同点：UP = 向上'],
  ['s', 'Could you speak up, please?', '请你大声一点说，好吗？', 'speak up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · speak up ②', items: ITEMS, acts: ACTS }); }
