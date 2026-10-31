// 💬 日常用语 · 居家与家务 · Did you clean your room? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 10；对照清单 lab/INVENTORY_HD_ORAL_SC15_10_V5.md
// 角色关键帧：sprites/hdo15_10.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo15_10.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Did you clean your room? （你打扫你的房间了吗？（过去时问答））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 一般过去时问答：Did you + 动词原形...? ➔ Yes, I did. / No, I didn\'t.'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Did you clean your room this morning, Sarah?'],
  ['w', '萨拉，你今天早上打扫房间了吗？'],
  ['s', 'Did you clean your room this morning, Sarah?', '萨拉，你今天早上打扫房间了吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Yes, I did! And I also washed my clothes!'],
  ['w', '是的，我打扫了！而且我还洗了我的衣服呢！'],
  ['s', 'Yes, I did! And I also washed my clothes!', '是的，我打扫了！而且我还洗了我的衣服呢！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 居家与家务 · Did you clean your room?', items: ITEMS, acts: ACTS }); }
