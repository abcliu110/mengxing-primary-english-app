// 🎬 万能动词 · fall down ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fall down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvfalldown2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fall down：站不住脚；失败；（工作）做不好'],
  ['w', 'fall down ②'],
  ['w', '站不住脚；失败；（工作）做不好'],
  ['s', 'That\'s where the whole argument falls down.', '整个论点就是在这里站不住脚的。', 'fall down'],
  ['m', 'FALL'],
  ['m', '向下'],
  ['w', 'fall：秋天(美)/落下'],
  ['m', '+'],
  ['w', 'The bridge is falling down and will need a million dollars to repair it.'],
  ['m', 'be falling down：（建筑）破败不堪；要倒塌'],
  ['w', 'That\'s where the whole argument falls down.'],
  ['m', 'fall down：站不住脚；失败；（工作）做不好'],
  ['w', '共同点：DOWN = 向下'],
  ['s', 'The bridge is falling down and will need a million dollars to repair it.', '这座桥快塌了，修好它要花一百万美元。', 'be falling down'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fall down ②', items: ITEMS, acts: ACTS }); }
