// 🧱 五大基本句型 · ③ SVO 一箭穿心型 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_3（242 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 3；对照清单 lab/INVENTORY_FIVE_PATTERNS_3_V5.md
// 角色关键帧：sprites/fpat3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat3.js';
const ACTS = {"reading": ["l_read"], "planted": ["plant"], "go": ["l_w0", "l_w1", "l_w2"], "read": ["l_read"]};
const ITEMS = [
  ['n', 'doing：享受、完成、练习常做的事用 doing，比如 enjoy doing。'],
  ['w', '享受常做 → enjoy / finish / practice / mind + doing'],
  ['s', 'Enjoy doing. Finish doing, practice doing. Do you mind waiting?', '喜欢做。做完、练习做。你介意等一下吗？', 'finish practice mind doing'],
  ['w', 'S（主语射箭人）+ Vt（及物动词）+ O（宾语靶心）'],
  ['w', '我们在植树节种了 20 棵小树苗。  动作直接射中宾语！'],
  ['n', '口诀：及物动词是支箭，直接射中宾语，不加介词。'],
  ['n', '预测：「我想读这个故事」：want 后面的动词要穿哪件制服？to read 还是 reading？先想 3 秒！'],
  ['w', '🔮 我想读这个故事。'],
  ['w', '→  I want ___ this story.  ( to read / reading )'],
  ['n', '揭晓：want 盼着将来去做，穿 to do 制服：I want to read this story.'],
  ['w', 'I want to read this story.'],
  ['s', 'I want to read this story.', '我想读这个故事。', 'want to read this story'],
  ['m', '💡 一句话洞见'],
  ['m', '及物动词像一支箭，'],
  ['w', '后面直接射中宾语，中间不加介词'],
  ['w', '🎵 口诀'],
  ['w', '口诀：及物动词是支箭，'],
  ['w', '直接射中宾语，不加介词。'],
  ['w', '🦴 五大基本句型 · 句型 ③ SVO']
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ③ SVO 一箭穿心型 · 第 3 节', items: ITEMS, acts: ACTS }); }
