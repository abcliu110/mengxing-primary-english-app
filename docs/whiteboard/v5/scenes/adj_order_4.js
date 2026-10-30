// 🚂 形容词排座次 · ④  那个高个子年轻的英国篮球教练 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/adj_order.js 案例 4；对照清单 lab/INVENTORY_AO4_V5.md。版面引擎：scenes/adj_train.js
import { buildAdj } from './adj_train.js';
import * as SP from '../sprites/ao4.js';

export default function build() {
return buildAdj(SP, {
  n0: '最后一列火车：这次的名词是一个人——篮球教练！', tick: '✔', hero: 'coach', hero2: 'coach', titleSize: 72,
  title: '④  那个高个子年轻的英国篮球教练', sub: '真题专列 · 形容词排座次', badges: ['💡 记忆联想', '✂️ 简化说法'], menu: ['① 中文', '② 原理', '③ 上车', '④ 连读', '🔮 预测'],
  cn: { n: '中文：中文：那个高个子、年轻的英国篮球教练。', text: '中文：那个 + 高个子的(大小) + 年轻的(年龄) + 英国的(国籍) + 篮球(用途) + 教练' },
  prob: { n: '问题：tall、young、British、basketball，形容人也一样要排队！', head: '这些形容词要排队上车：', words: ['British', 'young', 'basketball', 'tall'], ask: '谁先谁后？' },
  prin: { n: '第一性原理：原理不变：一眼看到的在外面，「他是干什么的」最贴近名词。', l: '主观：心里的感觉', mid: '越往右，越贴近东西本身，越紧挨名词', r: '客观：东西本来的样子' },
  trainN: '开车！按车厢号对号入座。',
  cars: [
    { n: '指示词：this（这个）、that（那个），用来指出是哪一个。that 属于限定词，坐车头。', top: '', lab: '① 限定词', w: 'that', zh: '那个' },
    { n: '观点车厢：这里没有夸他，空着。', top: 'O', lab: '② 观点', w: '—' },
    { n: '大小：tall 高个子，一眼就能看到的身高。', top: 'S', lab: '③ 大小', w: 'tall', zh: '高个子的' },
    { n: '年龄：young 年轻的，坐新旧/形状车厢。', top: 'A·S', lab: '④ 新旧/形状', w: 'young', zh: '年轻的' },
    { n: '颜色车厢：空着。', top: 'C', lab: '⑤ 颜色', w: '—' },
    { n: '国籍：British 英国的，他从哪个国家来。', top: 'O', lab: '⑥ 国籍/来源', w: 'British', zh: '英国的' },
    { n: '用途：拿来做什么用。basketball 篮球，说明他是教什么的教练。', top: 'M·P', lab: '⑦ 材质/用途', w: 'basketball', zh: '篮球' },
  ],
  noun: { n: 'coach 教练，终点站。', lab: '名词站', w: 'coach', zh: '教练' },
  close: { n: '紧贴名词：basketball 说明他是「篮球」教练，这是他的身份本质，紧贴 coach。', text: '离本质最近 → 紧贴名词' },
  why: { n: '为什么这样排？大小在年龄前；国籍在用途前。用途最贴名词。', text: '💡 身高(tall)在年龄(young)前，国籍(British)在专业用途(basketball)前！', skip: '空车厢「—」读的时候直接跳过' },
  join: { n: '空车厢跳过，连起来读一遍！', phrase: 'that tall young British basketball coach', zh: '那个高个子年轻的英国篮球教练。  大小→年龄→国籍→用途', actor: 'coach' },
  says: [
    ['That tall young British basketball coach is my uncle.', '那个高个子年轻的英国篮球教练是我叔叔。', 'that tall young British basketball coach', ['tall', 'basketball']],
    ['This is my uncle.', '这是我叔叔。', 'this', ['this']],
  ],
  chant: '口诀：限观大形龄色国材 —— 美小圆旧黄，法国木书房！',
  pred: { n: '预测：「一位友好的年轻中国老师」：Chinese、young、friendly 怎么排？先想 3 秒！', cn: '🔮 一位友好的年轻中国老师', q: '→  a ___ teacher  ( Chinese young friendly / friendly young Chinese )',
    rn: '揭晓：观点 friendly → 年龄 young → 国籍 Chinese：a friendly young Chinese teacher.', ans: 'a friendly young Chinese teacher',
    say: ['She is a friendly young Chinese teacher.', '她是一位友好的年轻中国老师。', 'a friendly young Chinese teacher', ['friendly', 'young', 'chinese']], actor: 'teacher_cn' },
  gold: ['💡 一句话洞见', '形容词排队，从「我觉得」走到「它本来是」：', '越主观越靠外，越接近本质越贴紧名词', '🎵 口诀', '口诀：限观大形龄色国材 ——', '美小圆旧黄，法国木书房！', '🚂 形容词排座次 · ④  那个高个子年轻的英国篮球教练'],
});
}
