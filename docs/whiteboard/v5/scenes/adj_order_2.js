// 🚂 形容词排座次 · ②  两只可爱的小白猫 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/adj_order.js 案例 2；对照清单 lab/INVENTORY_AO2_V5.md。版面引擎：scenes/adj_train.js
import { buildAdj } from './adj_train.js';
import * as SP from '../sprites/ao2.js';

export default function build() {
return buildAdj(SP, {
  n0: '第二列火车：两只可爱的小白猫，英语该怎么排？', tick: '✔', hero: 'm_like', hero2: 'm_like',
  title: '②  两只可爱的小白猫', sub: '真题专列 · 形容词排座次', badges: ['💡 记忆联想', '✂️ 简化说法'], menu: ['① 中文', '② 原理', '③ 上车', '④ 连读', '🔮 预测'],
  cn: { n: '中文：中文：两只可爱的小白猫。有 3 个形容词：可爱的、小的、白色的。', text: '中文：两只 + 可爱的(观点) + 小的(大小) + 白色的(颜色) + 猫咪' },
  prob: { n: '问题：white、cute、little 三个词，谁先上车、谁后上车？', head: '这些形容词要排队上车：', words: ['white', 'cute', 'little'], ask: '谁先谁后？' },
  prin: { n: '第一性原理：还是那条原理：「我觉得」的词靠外，东西本来的样子贴紧名词。', l: '主观：心里的感觉', mid: '越往右，越贴近东西本身，越紧挨名词', r: '客观：东西本来的样子' },
  trainN: '同样的 7 节车厢 + 名词站，按车厢号一个个上车。',
  cars: [
    { n: '数词：表示数量的词，比如 two（两）。它属于限定词，坐车头。', top: '', lab: '① 限定词', w: 'two', zh: '两只' },
    { n: '观点：cute 可爱，是心里的感觉，先夸可爱，站最外面。', top: 'O', lab: '② 观点', w: 'cute', zh: '可爱的' },
    { n: '大小：little 小小的，再看个头。', top: 'S', lab: '③ 大小', w: 'little', zh: '小的' },
    { n: '新旧/形状车厢：没说是新是旧，空着。', top: 'A·S', lab: '④ 新旧/形状', w: '—' },
    { n: '颜色：white 白色的，毛的颜色，谁看都一样。', top: 'C', lab: '⑤ 颜色', w: 'white', zh: '白色的' },
    { n: '来源车厢、材质/用途车厢都没有乘客，空着。', top: 'O', lab: '⑥ 国籍/来源', w: '—' },
    { n: '', top: 'M·P', lab: '⑦ 材质/用途', w: '—' },
  ],
  noun: { n: '复数：两只以上要用复数，名词后加 -s：cat 变成 cats。', lab: '名词站', w: 'cats', zh: '猫咪' },
  close: { n: '紧贴名词：后面的车厢都空着，所以 white 就是离 cats 最近的那个。', text: '离本质最近 → 紧贴名词' },
  why: { n: '为什么这样排？从心里的夸奖，到个头，再到毛色，一步步走近猫咪本身。', text: '💡 先夸可爱(cute)，再看个头小(little)，最后看毛色白(white)紧贴 cats！', skip: '空车厢「—」读的时候直接跳过' },
  join: { n: '空车厢跳过，连起来读一遍！', phrase: 'two cute little white cats', zh: '两只可爱的小白猫。  先夸可爱，再看大小，颜色贴名词！', actor: 'm_like' },
  says: [
    ['I have two cute little white cats.', '我有两只可爱的小白猫。', 'two cute little white cats', ['cute', 'little', 'white']],
    ['I have a cat.', '我有一只猫。', 'cat', ['cat']],
  ],
  chant: '口诀：限观大形龄色国材 —— 美小圆旧黄，法国木书房！',
  pred: { n: '预测：「三只可爱的小黄鸭」：yellow、little、cute 怎么排？先想 3 秒！', cn: '🔮 三只可爱的小黄鸭', q: '→  three ___ ducks  ( yellow little cute / cute little yellow )',
    rn: '揭晓：先夸可爱，再看大小，颜色贴名词：three cute little yellow ducks.', ans: 'three cute little yellow ducks',
    say: ['Look at the three cute little yellow ducks.', '看那三只可爱的小黄鸭。', 'three cute little yellow ducks', ['cute', 'little', 'yellow']], actor: 'ducks', h: 300 },
  gold: ['💡 一句话洞见', '形容词排队，从「我觉得」走到「它本来是」：', '越主观越靠外，越接近本质越贴紧名词', '🎵 口诀', '口诀：限观大形龄色国材 ——', '美小圆旧黄，法国木书房！', '🚂 形容词排座次 · ②  两只可爱的小白猫'],
});
}
