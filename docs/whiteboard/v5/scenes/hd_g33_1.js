// 📘 G33 底层原理 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g33.js 案例 1；对照清单 lab/INVENTORY_HD_G33_1_V5.md
// 角色关键帧：sprites/hdg33_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg33_1.js';
const ACTS = {"*": ["l_speak", "l_hand0", "l_think"]};
const ITEMS = [
  ['w', 'G33 底层原理'],
  ['w', '祈使句：指令、礼貌请求与禁止标语 (Open... / Don\'t... / Let\'s...) —— 面对面跟“你 (You)”说话，省去主语 You，直接用动词原形开头！'],
  ['w', '【为什么祈使句没有主语，且第一个词永远用动词原形？】'],
  ['w', '因为祈使句直接对眼前的听话人（You）发出指令，省去 You 直接亮出动词原形（Sit down! / Open your book!）！'],
  ['w', '🔬 祈使句四种口气'],
  ['w', '指令：动词原形开头——Stand up! Open the door.'],
  ['w', '礼貌：加 please——Please sit down. / Sit down, please.'],
  ['w', '禁止：Don\'t + 动词原形——Don\'t run!'],
  ['w', '一起做：Let\'s + 动词原形——Let\'s go!'],
  ['s', 'Don\'t run in the classroom. Let\'s go!', '不要在教室里跑。我们走吧！'],
  ['w', '常错：Don\'t to run. ✗；Let\'s goes. ✗；be 也能开头：Be quiet!'],
  ['w', '🗣️ 语境实证：Open the window and clean the blackboard, please.'],
  ['w', '🎵 口诀：祈使句，省主语，动词原形站第一（Stand up!）；若表客气加 please，若表禁止'],
  ['w', 'G33 第1幕'],
  ['s', 'Open the window and clean the blackboard, please.', '请打开窗户、擦黑板。'],
  ['n', '🎵 口诀：祈使句，省主语，动词原形站第一（Stand up!）；若表客气加 please，若表禁止 Don\'t 打底（Don\'t run!）；拉上伙伴一起干，Let\'s 加原形笑眯眯！']
];
export default function build() { return autoBuild(SP, { title: '📘 G33 底层原理', items: ITEMS, acts: ACTS }); }
