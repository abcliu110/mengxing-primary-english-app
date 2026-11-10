// ✍️ 写作炼金术 · 1 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_1（252 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；独立播放页「第 3 节」跳转（build.mjs 产物模板））
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 1；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_1_V5.md
// 角色关键帧：sprites/wa1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa1.js';
const ACTS = {};
const ITEMS = [
  ['n', '隐喻：打比方：读书 opens a window to the world，给你打开一扇看世界的窗。'],
  ['n', '五感法则：还有一条：眼睛看 look、鼻子闻 smell、耳朵听 singing，把春天写活。'],
  ['s', 'I like English very much.', '我非常喜欢英语。', 'I like English very much'],
  ['s', 'Be crazy about, be fond of, enjoy doing. I enjoy reading in my free time.', '超爱、喜欢、喜欢做。我空闲时喜欢读书。', 'be crazy about fond of enjoy doing reading in my free time be crazy about be fond of'],
  ['s', 'We were very happy yesterday. What a wonderful day! How excited we were!', '我们昨天很开心。多美好的一天！我们多兴奋啊！', 'We were happy What a How wonderful day excited'],
  ['s', 'Reading books is good for us. It opens a window to the world.', '读书对我们有好处。它打开一扇看世界的窗。', 'is good for us opens window to the world'],
  ['s', 'The park is very nice in spring.', '春天的公园很美。', 'The park is very nice in spring'],
  ['s', 'Look, smell. The flowers look beautiful and smell sweet. Birds are singing.', '看、闻。花儿看起来很美，闻起来很香。鸟儿在唱歌。', 'look smell are singing singing ing'],
  ['w', '口诀：换掉老词 like，加上时间状语，用感叹句和 not only… but also…'],
  ['w', '还有一条 · 五感法则：视觉 look + 嗅觉 smell + 听觉 are singing（The park is very nice in spring. 的升级）'],
  ['n', '口诀：换掉老词加状语，感叹句和连接词用得好，作文更出彩！（句式只是评分的一面：内容对题、句子写对更重要。这句是加油口号，不是分数保证。）']
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 1 · 第 3 节', items: ITEMS, acts: ACTS }); }
