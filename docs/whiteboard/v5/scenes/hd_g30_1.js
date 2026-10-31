// 📘 G30 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g30.js 案例 1；对照清单 lab/INVENTORY_HD_G30_1_V5.md
// 角色关键帧：sprites/hdg30_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg30_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G30 底层原理'],
  ['w', '一般疑问句与“怎问怎答”铁律 —— 用 Yes / No 回答的问句：谁打头提问，就用谁收尾回答！'],
  ['w', '【英语一般疑问句为什么要把助动词/be动词提到最前面？】'],
  ['w', '英语采用“句首信号灯倒装法”——一开口先把 Is / Are / Can / Do / Does / Did 亮在句首第一个词，听话人立刻知道这是一个需要回答 Yes 或 No 的问题！'],
  ['w', '🔬 句首信号灯：把 be / can / do 提到最前面'],
  ['w', '有 be 提 be：You are from China. → Are you from China?'],
  ['w', '有 can 提 can：He can swim. → Can he swim?'],
  ['w', '都没有就请 do / does / did：She likes cats. → Does she like cats?'],
  ['s', 'Does she like cats? Yes, she does.', '她喜欢猫吗？是的，她喜欢。'],
  ['w', '怎问怎答：Can he swim? — Yes, he can. / No, he can\'t.'],
  ['w', '常错：Do you are...? ✗；Does she likes...? ✗'],
  ['w', '🗣️ 语境实证：— Are you from China? — Yes, I am.'],
  ['w', '🎵 口诀：一般疑问不用“吗”，句首信号提前挂：有 be 提 be，有 can 提 can，实义动词'],
  ['w', 'G30 第1幕'],
  ['s', '— Are you from China? — Yes, I am.', '— 你来自中国吗？— 是的。'],
  ['n', '🎵 口诀：一般疑问不用“吗”，句首信号提前挂：有 be 提 be，有 can 提 can，实义动词借 Do/Does/Did 站排头！一二人称要互换，谁问就用谁回答！']
];
export default function build() { return autoBuild(SP, { title: '📘 G30 底层原理', items: ITEMS, acts: ACTS }); }
