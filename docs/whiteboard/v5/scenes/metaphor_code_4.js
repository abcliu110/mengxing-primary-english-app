// 🔐 三大隐喻密码 · 4 空间方向 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/metaphor_code.js 案例 4；对照清单 lab/INVENTORY_METAPHOR_CODE_4_V5.md
// 角色关键帧：sprites/mc4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/mc4.js';
const ACTS = {"up": ["l_lookup"], "down": ["l_ldown0", "l_ldown1", "l_ldown2"], "look": ["l_point"], "spend": ["l_piggy"], "save": ["l_piggy"]};
const ITEMS = [
  ['n', '这一幕：英语把「上下、前后」这些空间方向，借来说「多少、好坏、时间」。'],
  ['w', '密码四 空间方向隐喻'],
  ['w', '💡 记忆联想'],
  ['w', '出处：Lakoff & Johnson, 1980'],
  ['n', '第一条：上 = 多，下 = 少。东西堆得越多，堆得越高。'],
  ['w', '⬆ 上 = 多 ⬇ 下 = 少'],
  ['s', 'Prices go up.', '价格涨上去了。', 'up'],
  ['s', 'The number goes down.', '数字变小了。', 'down'],
  ['n', '第二条：上 = 开心、好，下 = 难过、糟。人开心时抬头挺胸，难过时低着头。'],
  ['w', '⬆ 上 = 开心 ⬇ 下 = 难过'],
  ['s', 'Cheer up!', '振作起来！', 'up'],
  ['s', 'I feel down today.', '我今天心情低落。', 'down'],
  ['n', '第三条：前面 = 将来，后面 = 过去。我们面朝将来往前走，过去留在身后。'],
  ['w', '➡ 前 = 将来 ⬅ 后 = 过去'],
  ['s', 'I look forward to the trip.', '我盼着这次旅行。', 'forward'],
  ['s', 'Let\'s look back at last year.', '我们回顾一下去年吧。', 'back'],
  ['n', '第四条：时间就是钱。钱能花、能省、能浪费，英语里的时间也一样。'],
  ['w', '⏰ 时间 = 💰 钱'],
  ['s', 'I spend an hour on homework.', '我花一个小时做作业。', 'spend'],
  ['s', 'Taking the bus saves time.', '坐公交车能节省时间。', 'save'],
  ['s', 'Don\'t waste time.', '别浪费时间。', 'waste'],
  ['n', '中文对照：中文也说「情绪高涨」「心情低落」「浪费时间」，这些和英语是同一种比喻。'],
  ['w', '中文也有：情绪高涨 · 心情低落 · 浪费时间'],
  ['n', '要小心：中文的「前」有时指过去，比如「以前」「前天」；英语的 forward 总是朝向将来。'],
  ['w', '⚠️ 中文「以前、前天」的「前」= 过去'],
  ['n', '口诀：上多下少，上好下糟；前是将来，后是过去；时间像钱，能花能省。'],
  ['w', '🎵 上多下少，上好下糟；'],
  ['w', '前是将来，后是过去；'],
  ['w', '时间像钱，能花能省！']
];
export default function build() { return autoBuild(SP, { title: '🔐 三大隐喻密码 · 4 空间方向', items: ITEMS, acts: ACTS }); }
