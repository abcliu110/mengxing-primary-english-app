// 🎯 重音与弱读 · 3 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/stress_rhythm.js 案例 3；对照清单 lab/INVENTORY_STRESS_RHYTHM_3_V5.md
// 角色关键帧：sprites/sr3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/sr3.js';
const ACTS = {};
const ITEMS = [
  ['n', '为什么老外说话像「吞字」，听不清？秘密在节拍和弱读！'],
  ['w', '重音与弱读'],
  ['w', '法则 C  弱读 /ə/ 与连读'],
  ['n', '节拍：说话的轻重快慢，像音乐里的鼓点。汉语和英语的节拍不一样。'],
  ['w', '汉语：音节计时'],
  ['w', '我'],
  ['w', '会'],
  ['w', '游'],
  ['w', '泳'],
  ['n', '音节计时语言：每个字用力一样，像机关枪：哒、哒、哒、哒。'],
  ['w', '像机关枪：哒哒哒哒，每个字一样用力'],
  ['w', '英语：重音计时'],
  ['w', 'I'],
  ['w', 'kən'],
  ['w', 'ˈSWIM'],
  ['n', '重音计时语言：重要的词读得又响又长，中间的小词飞快带过，像打鼓：咚—嗒—咚。'],
  ['w', '像打鼓：重的拉长，轻的一带而过'],
  ['n', '实词 / 虚词：实词是有实在意思的词（swim、tea）；虚词是小帮手（to、of、can）。'],
  ['w', '/ə/'],
  ['w', '懒元音 Schwa：嘴巴放松，轻轻「呃」一下'],
  ['w', 'to · for · of · and · can 这些虚词，常常压成 /ə/'],
  ['n', '弱读 /ə/：虚词读得又轻又短，元音变成懒洋洋的 /ə/，这就是弱读。'],
  ['n', '肯定句 / 否定句：肯定句说「会、是」；否定句带 not，说「不会、不是」。'],
  ['w', 'can /kən/ vs can\'t /ˈkɑːnt/'],
  ['w', 'I kən ˈSWIM.  vs  I ˈKɑːNT ˈSWIM.'],
  ['n', 'can 弱读：肯定句里 can 轻读成 /kən/，重音给 swim；can\'t 要重读、张大嘴！'],
  ['w', 'can 很轻 = 会游；can\'t 重读张大嘴 = 不会游'],
  ['n', 'of 弱读：a cup of tea 里 of 只剩一个 /ə/，连起来听像 cuppa tea。'],
  ['w', 'of ➔ /ə/'],
  ['w', 'a cup of tea ➔ cuppa tea'],
  ['w', 'lots of ➔ /ˈlɒtsə/ ｜ kind of ➔ /ˈkaɪndə/'],
  ['n', '缩读：口语里几个词缩成一个：want to → wanna，going to → gonna。'],
  ['w', 'to ➔ /tə/ · wanna · gonna'],
  ['w', 'want to ➔ wanna ｜ going to ➔ gonna'],
  ['w', 'I\'m gonna (going to) visit my grandpa tomorrow.'],
  ['n', '连读：前一个词的尾巴是辅音，后一个词以元音开头，就粘成一个音节读。'],
  ['w', '辅音 + 元音  丝滑连读'],
  ['w', 'look at it ➔ /ˈlʊ-kæ-tɪt/'],
  ['w', 'put it on ➔ /ˈpʊ-tɪ-tɒn/ ｜ an apple ➔ /ə-ˈnæ-pl/'],
  ['n', '看橙色小桥：k 粘上 a，t 粘上 i，look at it 读成一口气。'],
  ['n', '最后读一读：每个词都和后面的元音粘在一起！'],
  ['w', 'Look at it (/lʊ-kæ-tɪt/)! Pick it up (/pɪ-kɪ-tʌp/)!'],
  ['w', '看它！把它捡起来！  实词重读拉长，虚词弱读成 /ə/，辅音元音粘一起。'],
  ['s', 'Look at it! Pick it up!', '看它！把它捡起来！', 'look at it'],
  ['n', '口诀：重的拉长像打鼓，轻的变 /ə/ 一带过，辅音元音手拉手。']
];
export default function build() { return autoBuild(SP, { title: '🎯 重音与弱读 · 3', items: ITEMS, acts: ACTS }); }
