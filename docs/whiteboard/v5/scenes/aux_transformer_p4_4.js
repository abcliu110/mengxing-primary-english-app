// 🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 4 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_4（355 s）的第 4 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 4 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 4；对照清单 lab/INVENTORY_AUX_TRANSFORMER_4_V5.md
// 角色关键帧：sprites/at4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at4.js';
const ACTS = {"went": ["l_goout"], "flew": ["plane"], "go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '预测：「她坐公交车去上学了」变成一般疑问句：句首请谁来？went 要变成什么？先想 3 秒！'],
  ['w', '🔮 她坐公交车去上学了。She went to school by bus.'],
  ['w', '→  ___ she ___ to school by bus?  ( go )'],
  ['s', 'She went to school by bus.', '她坐公交车去上学了。', 'she went school bus'],
  ['n', '揭晓：照妖镜 Did 站句首，went 打回原形 go：Did she go to school by bus?'],
  ['w', 'Did she go to school by bus?'],
  ['s', 'Did she go to school by bus?', '她是坐公交车去上学的吗？', 'did go'],
  ['w', '⑥ 操作词总论'],
  ['n', '英语变否定、变疑问，全靠一个「操作词」：be、can、will，或者 do / does / did。'],
  ['w', '英语的否定和疑问都靠「操作词」：be / can / will / do / does / did'],
  ['w', '句子里有操作词：直接加 not、直接提到句首（He can swim. → Can he swim?）'],
  ['w', '句子里没有：就请 do / does / did 出来当操作词，动词回原形'],
  ['w', '🔬 助动词/情态动词『能量吸收器』与动词变形还原实验'],
  ['w', '🧲 强力能量磁铁'],
  ['w', 'did / does / can / will'],
  ['w', '吸走过去时与三单!'],
  ['w', '🌱 动词 100% 回原形'],
  ['w', 'went➔go ｜ likes➔like'],
  ['w', 'Did he go? Doesn\'t like'],
  ['w', '-ed/-s'],
  ['s', 'He likes milk. He doesn\'t like milk. Does he like milk?', '他喜欢牛奶。他不喜欢牛奶。他喜欢牛奶吗？'],
  ['w', '💡 一句话洞见'],
  ['w', '过去的事没有护卫，就请 did 来帮忙；'],
  ['w', '过去时被 did 吸走，动词打回原形'],
  ['w', '🎵 口诀'],
  ['w', '口诀：过去请 did：过去时被照妖镜吸走，'],
  ['w', 'went 打回原形 go！'],
  ['w', '🪞 助动词照妖镜 · 第四类 过去式照妖镜 did']
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 4 节', items: ITEMS, acts: ACTS }); }
