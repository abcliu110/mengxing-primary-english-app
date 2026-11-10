// 🎬 万能动词 · fly out ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fly out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：fly out → plane0/1/2（第八波第 11 项登记；句是离港飞行，配飞机帧是如实配图；actorFitW: 440 第七波已预埋）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvflyout1.js';
const ACTS = {"fly out": ["plane0", "plane1", "plane2"]};
const ITEMS = [
  ['n', 'fly out：乘飞机出发；飞往（外地）'],
  ['w', 'fly out ①'],
  ['w', '乘飞机出发；飞往（外地）'],
  ['s', 'He is scheduled to fly out on Friday.', '他定于周五乘飞机出发。', 'fly out'],
  ['m', 'OUT'],
  ['m', '从里面出来；往外'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fly out ①', items: ITEMS, acts: ACTS, actorFitW: 440 }); }
