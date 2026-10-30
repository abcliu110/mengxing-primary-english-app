// 🚂 形容词排座次 · ① 一张漂亮的小圆木桌 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/adj_order.js 案例 1；对照清单 lab/INVENTORY_AO1_V5.md。版面引擎：scenes/adj_train.js
import { buildAdj } from './adj_train.js';
import * as SP from '../sprites/ao1.js';

export default function build() {
return buildAdj(SP, {
  n0: '这节课：好几个形容词一起修饰一个名词时，英语里谁站前面、谁站后面？', tick: '✔', hero: 'mom_gift', hero2: 'mom_gift',
  title: '①  一张漂亮的小圆木桌', sub: '真题专列 · 形容词排座次', badges: ['💡 记忆联想', '✂️ 简化说法'],
  menu: ['① 中文', '② 原理', '③ 上车', '④ 连读', '🔮 预测'],
  cn: { n: '中文：先看中文：一张漂亮的小圆木桌。括号里写的是每个词属于哪一类。', text: '中文：一张 + 漂亮的(观点) + 小的(大小) + 圆的(形状) + 木头的(材质) + 桌子' },
  prob: { n: '问题：形容词：描述样子、大小、颜色、感觉的词。这里有 4 个，英语里不能乱排。', head: '这些形容词要排队上车：', words: ['wooden', 'nice', 'round', 'small'], ask: '谁先谁后？' },
  prin: { n: '第一性原理：越是「我觉得」的词站得越靠外，越是东西本来的样子越贴紧名词。', l: '主观：心里的感觉', mid: '越往右，越贴近东西本身，越紧挨名词', r: '客观：东西本来的样子' },
  trainN: '画一列火车：7 节车厢 + 名词终点站，形容词按车厢号上车。',
  cars: [
    { n: '限定词：a、two、that 这类词，先说「几个、哪一个」，永远坐车头。a 就是「一张」。', top: '', lab: '① 限定词', w: 'a', zh: '一张' },
    { n: 'O = Opinion 观点：nice 漂亮，是心里的感觉，每个人想法可能不一样，所以站最外面。', top: 'O', lab: '② 观点', w: 'nice', zh: '漂亮的' },
    { n: 'S = Size 大小：small 小的，一眼就能看出的个头。', top: 'S', lab: '③ 大小', w: 'small', zh: '小的' },
    { n: 'A·S = Age 新旧 / Shape 形状：round 圆的，走近才看清的形状。这两样合坐一节车厢。', top: 'A·S', lab: '④ 新旧/形状', w: 'round', zh: '圆的' },
    { n: 'C = Colour 颜色：这张桌子没说颜色，车厢空着，画一道「—」。', top: 'C', lab: '⑤ 颜色', w: '—' },
    { n: 'O = Origin 来源：哪个国家、哪里来的？也没说，空着。', top: 'O', lab: '⑥ 国籍/来源', w: '—' },
    { n: 'M·P = Material 材质 / Purpose 用途：wooden 木头做的，是桌子本身是什么做的。', top: 'M·P', lab: '⑦ 材质/用途', w: 'wooden', zh: '木头的' },
  ],
  noun: { n: '名词：表示人或东西名字的词。table 桌子是终点站，所有形容词都为它服务。', lab: '名词站', w: 'table', zh: '桌子' },
  close: { n: '紧贴名词：wooden 是桌子的物理本质，离本质最近，所以必须紧贴 table。', text: '离本质最近 → 紧贴名词' },
  why: { n: '为什么这样排？OSASCOMP 就是车厢顶上字母连起来，从主观的心到客观的东西排好队。', text: '💡 漂亮(nice)是主观感受放最外层；木头做的(wooden)是桌子的物理本质，必须紧贴 table！', skip: '空车厢「—」读的时候直接跳过' },
  join: { n: '空车厢跳过，把乘客连起来，就是地道的英语短语！', phrase: 'a nice small round wooden table', zh: '一张漂亮的小圆木桌。  主观在外，本质贴名词！', actor: 'mom_gift' },
  says: [
    ['Mom bought a nice small round wooden table.', '妈妈买了一张漂亮的小圆木桌。', 'a nice small round wooden table', ['nice', 'wooden']],
    ['Opinion, size, age, shape, colour, origin, material, purpose.', '观点、大小、新旧、形状、颜色、来源、材质、用途。', 'opinion size age shape colour origin material purpose', ['opinion', 'purpose']],
    ['OSASCOMP helps me remember the order.', 'OSASCOMP 帮我记住顺序。', 'OSASCOMP', ['osascomp']],
    ['I have two pens. That pen is red.', '我有两支笔。那支笔是红的。', 'two that', ['two', 'that']],
  ],
  chant: '口诀：限观大形龄色国材 —— 美小圆旧黄，法国木书房！',
  pred: { n: '预测：「一个漂亮的大红气球」：nice、big、red 谁坐前面？先想 3 秒！', cn: '🔮 一个漂亮的大红气球', q: '→  a ___ balloon  ( red big nice / nice big red )',
    rn: '揭晓：观点 nice → 大小 big → 颜色 red：a nice big red balloon.', ans: 'a nice big red balloon',
    say: ['I have a nice big red balloon.', '我有一个漂亮的大红气球。', 'balloon nice big red', ['nice', 'big', 'red']], balloon: true },
  gold: ['💡 一句话洞见', '形容词排队，从「我觉得」走到「它本来是」：', '越主观越靠外，越接近本质越贴紧名词', '🎵 口诀', '口诀：限观大形龄色国材 ——', '美小圆旧黄，法国木书房！', '🚂 形容词排座次 · ①  一张漂亮的小圆木桌'],
});
}
