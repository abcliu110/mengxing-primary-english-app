// 🧱 五大基本句型 · ① SV 自给自足型 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_1（237 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 1；对照清单 lab/INVENTORY_FIVE_PATTERNS_1_V5.md
// 角色关键帧：sprites/fpat1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat1.js';
const ACTS = {"rises": ["sunny"], "run": ["l_r0", "l_r1", "l_r2"], "fly": ["bird_up", "bird_down"], "look": ["l_point"], "play": ["kick0", "kick1", "kick2"], "sleep": ["baby"]};
const ITEMS = [
  ['n', '铁律：一定要守的规矩：listen to、look at、wait for，钩子不能丢！'],
  ['w', '必考：'],
  ['w', 'listen TO · look AT · wait FOR · arrive IN(AT)'],
  ['w', '黑板'],
  ['s', 'Please look at the blackboard and listen to the teacher.', '请看黑板，听老师讲。', 'Please look at blackboard and teacher'],
  ['s', 'Wait for me! We arrive at school at eight.', '等等我！我们八点到学校。', 'wait FOR arrive'],
  ['n', '这就是句型 ①：主语 + 不及物动词，挂件随便挂。'],
  ['s', 'Subject, verb. Play with me!', '主语，动词。和我一起玩吧！', 'Subject Verb with'],
  ['w', 'S（主语）+ Vi（不及物动词）  [+ 副词 / 介词短语挂件]'],
  ['w', '鸟儿在蓝天上快乐地飞翔。  自己能做，不带宾语！'],
  ['n', '口诀：不及物动词自己就能做；想接对象，先挂介词钩。'],
  ['n', '预测：「看天空！」look 是不及物动词，后面要接 the sky，中间该挂哪个钩子？先想 3 秒！'],
  ['w', '🔮 看天空！'],
  ['w', '→  Look ___ the sky!'],
  ['n', '揭晓：look 后面挂钩子 at，才能接上 the sky：Look at the sky!'],
  ['w', 'Look at the sky!'],
  ['s', 'Look at the sky!', '看天空！', 'look at the sky'],
  ['w', '💡 一句话洞见'],
  ['w', '不及物动词自己就能把事做完，'],
  ['w', '后面不直接接宾语；挂件随便挂'],
  ['w', '🎵 口诀'],
  ['w', '口诀：不及物动词自己就能做；'],
  ['w', '想接对象，先挂介词钩。'],
  ['w', '🦴 五大基本句型 · 句型 ① SV']
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ① SV 自给自足型 · 第 3 节', items: ITEMS, acts: ACTS }); }
