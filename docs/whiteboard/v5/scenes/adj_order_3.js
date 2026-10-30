// 🚂 形容词排座次 · ③  一件漂亮的崭新红色中国丝绸连衣裙 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/adj_order.js 案例 3；对照清单 lab/INVENTORY_AO3_V5.md。版面引擎：scenes/adj_train.js
import { buildAdj } from './adj_train.js';
import * as SP from '../sprites/ao3.js';

export default function build() {
return buildAdj(SP, {
  n0: '第三列火车最挤：5 个形容词一起上车，看谁坐哪一节！', tick: '✔', hero: 'mom_dress', hero2: 'mom_dress', titleSize: 66,
  title: '③  一件漂亮的崭新红色中国丝绸连衣裙', sub: '真题专列 · 形容词排座次', badges: ['💡 记忆联想', '✂️ 简化说法'], menu: ['① 中文', '② 原理', '③ 上车', '④ 连读', '🔮 预测'],
  cn: { n: '中文：中文：一件漂亮的、崭新的红色中国丝绸连衣裙。', text: '中文：一件 + 漂亮的(观点) + 新的(新旧) + 红色的(颜色) + 中国的(国籍) + 丝绸(材质) + 连衣裙' },
  prob: { n: '问题：beautiful、new、red、Chinese、silk，5 个词怎么排才不乱？', head: '这些形容词要排队上车：', words: ['silk', 'red', 'beautiful', 'Chinese', 'new'], ask: '谁先谁后？' },
  prin: { n: '第一性原理：从主观到客观：先说「我觉得」，最后说「它是什么做的」。', l: '主观：心里的感觉', mid: '越往右，越贴近东西本身，越紧挨名词', r: '客观：东西本来的样子' },
  trainN: '按车厢号，一个个对号入座。',
  cars: [
    { n: 'a 一件，坐车头。', top: '', lab: '① 限定词', w: 'a', zh: '一件' },
    { n: '观点：beautiful 漂亮，是心里的评价，站最外面。', top: 'O', lab: '② 观点', w: 'beautiful', zh: '漂亮的' },
    { n: '大小车厢：没说大小，空着。', top: 'S', lab: '③ 大小', w: '—' },
    { n: '新旧：new 新的，是衣服的「年龄」，坐新旧/形状车厢。', top: 'A·S', lab: '④ 新旧/形状', w: 'new', zh: '新的' },
    { n: '颜色：red 红色的。', top: 'C', lab: '⑤ 颜色', w: 'red', zh: '红色的' },
    { n: '国籍：属于哪个国家。Chinese 中国的，表示裙子从哪里来。', top: 'O', lab: '⑥ 国籍/来源', w: 'Chinese', zh: '中国的' },
    { n: '材质：silk 丝绸，裙子是用什么做的。silk 本来是名词，在这里修饰 dress。', top: 'M·P', lab: '⑦ 材质/用途', w: 'silk', zh: '丝绸' },
  ],
  noun: { n: 'dress 连衣裙，终点站。', lab: '名词站', w: 'dress', zh: '连衣裙' },
  close: { n: '紧贴名词：silk 丝绸就是裙子本身的料子，离本质最近，紧贴 dress。', text: '离本质最近 → 紧贴名词' },
  why: { n: '为什么这样排？观点、新旧、颜色、国籍、材质，一节一节从主观走到客观。', text: '💡 严格遵循「观点 ➔ 新旧 ➔ 颜色 ➔ 国籍 ➔ 材质 ➔ 名词」由主观到客观的顺序！', skip: '空车厢「—」读的时候直接跳过' },
  join: { n: '5 个形容词一个不乱，连起来读！', phrase: 'a beautiful new red Chinese silk dress', zh: '一件漂亮的崭新红色中国丝绸连衣裙。  观点→新旧→颜色→国籍→材质', actor: 'mom_dress' },
  says: [
    ['She wears a beautiful new red Chinese silk dress.', '她穿着一件漂亮的崭新红色中国丝绸连衣裙。', 'a beautiful new red Chinese silk dress', ['beautiful', 'silk']],
  ],
  chant: '口诀：限观大形龄色国材 —— 美小圆旧黄，法国木书房！',
  pred: { n: '预测：「一双崭新的白色运动鞋」：new、white、sports 怎么排？先想 3 秒！', cn: '🔮 一双崭新的白色运动鞋', q: '→  a pair of ___ shoes  ( sports white new / new white sports )',
    rn: '揭晓：新旧 new → 颜色 white → 用途 sports 紧贴名词：a pair of new white sports shoes.', ans: 'a pair of new white sports shoes',
    say: ['I want a pair of new white sports shoes.', '我想要一双崭新的白色运动鞋。', 'pair of new white sports shoes', ['new', 'white', 'sports']], actor: 'l_r0' },
  gold: ['💡 一句话洞见', '形容词排队，从「我觉得」走到「它本来是」：', '越主观越靠外，越接近本质越贴紧名词', '🎵 口诀', '口诀：限观大形龄色国材 ——', '美小圆旧黄，法国木书房！', '🚂 形容词排座次 · ③  一件漂亮的崭新红色中国丝绸连衣裙'],
});
}
