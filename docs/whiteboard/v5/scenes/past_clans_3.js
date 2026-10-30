// ⚔️ 过去式四大门派 · ③ 长音减肥派（ee / ea → e + t）—— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/past_clans.js 案例 3；对照清单 lab/INVENTORY_PC3_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/pc3.js（人物先行帧库 cast/：Leo 睡觉、Leo 大笑、火车、Mia 扫地、握手见面、Leo 走路 4 帧）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/pc3.js';

export default function build() {
const K = scene({ sprites: SP, stretch: 1.5 });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
// 减肥：一条胖胖的长音条，在 slimAt 时刻缩成短短的瘦条（画面只由 t 决定）
const slim = (x, y, from, slimAt, { w0 = 520, w1 = 160, h0 = 70, h1 = 34 } = {}) => K.prop((g, t) => {
  const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return;
  const p = Math.max(0, Math.min(1, (t - slimAt) / 0.8)), e = p * p * (3 - 2 * p);
  const w = w0 + (w1 - w0) * e, h = h0 + (h1 - h0) * e;
  g.save(); g.globalAlpha = q; g.fillStyle = e > 0.5 ? OR : OR2; g.strokeStyle = INK; g.lineWidth = 5;
  g.beginPath(); g.roundRect(x, y - h / 2, w, h, h / 2); g.fill(); g.stroke(); g.restore();
}, { from });
// 一张单词卡：原形 → 过去式（带音标）
const pair = (ox, oy, t, base, ipa0, past, ipa1) => {
  K.at(t).rect(ox, oy, 330, 150, { w: 5, rough: 1.2 }).text(base, ox + 40, oy + 100, 76);
  K.text(ipa0, ox + 40, oy + 210, 44, { col: GREY });
  K.arrow(ox + 360, oy + 75, ox + 460, oy + 75, { w: 5, col: OR, head: 22 });
  K.rect(ox + 480, oy, 330, 150, { w: 6, col: OR, fill: OR2, rough: 1.4 }).text(past, ox + 520, oy + 100, 76, { col: OR });
  K.text(ipa1, ox + 520, oy + 210, 44, { col: GREY });
};

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  const d0 = N('这一派的动词原来读长长的 /iː/，变过去式时会「减肥」。', 0.1);
  K.at(0.3).text('第三门派：长音减肥派', ox + 160, oy + 330, 96);
  K.text('过去式四大门派', ox + 170, oy + 450, 64, { col: OR });
  K.rect(ox + 160, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 190, oy + 578, 44);
  K.rect(ox + 580, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('✂️ 简化说法', ox + 610, oy + 578, 44);
  const menu = ['① 门派旗', '② 秘诀', '③ 成员', '④ 结论', '🔮 预测'];
  let x = ox + 160; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 700, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 748, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.actor({ keys: [[0, 'l_sleep']], x: ox + 1550, ground: oy + 1100, h: 340, reveal: 1.0 });
  slim(ox + 1300, oy + 300, 1.6, 3.6);
  T = d0 + 1.6;
}

// ───────── 2 门派旗 + 长元音 ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.3).line(ox + 160, oy + 120, ox + 160, oy + 560, { w: 6 }).path([[ox + 160, oy + 130], [ox + 560, oy + 180], [ox + 160, oy + 300]], { w: 5, col: OR });
  K.text('ee → e+t', ox + 200, oy + 245, 60, { col: OR });
  K.text('长音减肥派', ox + 200, oy + 380, 64);
  T += 2.0;
  const d1 = N('长元音：要拉长读的元音，比如 /iː/，读成「衣——」。ee、ea 常读 /iː/。', T);
  const st = T + 0.6;
  T = Math.max(T + d1, st + say(st, 'Ee, ea. Sleep, feel, leave.', { word: 'ee ea sleep feel leave', key: ['ee', 'ea'], zh: 'ee、ea。睡、感觉、离开。' }));
  slim(ox + 900, oy + 700, T - 4, 9999, { w0: 700 });
  K.at(T - 3).text('/iː/ 长', ox + 1640, oy + 720, 60, { col: GREY });
  const d2 = N('短元音：短短读一下的元音，比如 /e/。从长音变成短音，就像减肥变瘦。', T);
  slim(ox + 900, oy + 880, T + 0.6, T + 1.2, { w0: 700 });
  K.at(T + 1.1).text('/e/ 短', ox + 1100, oy + 900, 60, { col: OR });
  K.pop(T + 1.6, '瘦了！', ox + 1500, oy + 860, 64, { out: T + 3.4 });
  T += d2 + 0.2;
}

// ───────── 3 秘诀：加 t 太挤 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.3);
  const d1 = N('音节：单词里一拍一拍的读音单位。词尾加上 t，这一拍变挤了，长音只好缩短。', T);
  K.at(T + 0.1).text('sleep /sliːp/ → slept /slept/', ox + 140, oy + 220, 80);
  K.at(T + 0.8).text('秘诀：词尾加 -t，音节变挤 → 长音 /iː/ 减肥成短音 /e/', ox + 140, oy + 340, 50, { col: OR, rate: 30 });
  // 一拍的小盒子：塞进 t 后，长音被挤扁
  const bx = ox + 400, by = oy + 520;
  K.at(T + 1.6).rect(bx, by, 900, 260, { w: 6, rough: 1.2 }).text('一拍', bx + 20, by - 20, 44, { col: GREY });
  slim(bx + 40, by + 130, T + 1.8, T + 3.4, { w0: 760, w1: 300 });
  K.pop(T + 3.2, 't', bx + 820, by + 150, 110, { out: T + 30 });
  K.pop(T + 3.6, '挤！', bx + 1000, by + 60, 64, { out: T + 5.4 });
  T += Math.max(d1, 5.0) + 0.2;
}

// ───────── 4 成员 sleep ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.3);
  const d1 = N('成员 sleep（睡觉）：ee 缩成一个 e，后面加 t，就是 slept。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'sleep', '/sliːp/ 睡觉', 'slept', '/slept/');
  K.at(T + 2.0).text('ee 缩成 e + t', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('昨晚睡得很好：slept。', T);
  K.at(T + 0.1).text('I slept very well last night.', ox + 140, oy + 600, 60);
  K.actor({ keys: [[0, 'l_sleep']], x: ox + 1350, ground: oy + 1080, h: 380, reveal: T + 0.4 });
  [['Z', 1500, 700, 80], ['z', 1580, 620, 60], ['Z', 1650, 530, 90]].forEach(([s, x, y, z], k) => K.at(T + 1.4 + k * 0.4).text(s, ox + x, oy + y, z, { col: OR }));
  const en = 'I slept very well last night.', w = 'I very well last night', st = T + 1.0, sl = wordT(st, en, w, 'slept');
  K.pop(sl, 'slept', ox + 800, oy + 820, 84, { out: sl + 2.4 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['slept'], zh: '我昨晚睡得很好。' })) + 0.3;
}

// ───────── 5 成员 feel ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.3);
  const d1 = N('成员 feel（感觉）：也是 ee 缩成 e，再加 t，变成 felt。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'feel', '/fiːl/ 感觉', 'felt', '/felt/');
  K.at(T + 2.0).text('ee 缩成 e + t', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('昨天他感觉很开心：felt。', T);
  K.at(T + 0.1).text('He felt very happy yesterday.', ox + 140, oy + 600, 60);
  K.actor({ keys: [[0, 'l_laugh']], x: ox + 1400, ground: oy + 1120, h: 440, reveal: T + 0.4, bob: 5 });
  const en = 'He felt very happy yesterday.', w = 'felt He happy yesterday', st = T + 0.9, ft = wordT(st, en, w, 'felt');
  K.pop(ft, 'felt ☺', ox + 800, oy + 820, 84, { out: ft + 2.4 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['felt'], zh: '他昨天很开心。' })) + 0.2;
  T += say(T, 'I slept well and felt happy.', { word: 'slept', key: ['slept', 'felt'], zh: '我睡得很好，感觉很开心。' }) + 0.3;
}

// ───────── 6 成员 leave：清浊同化 ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.3);
  const d1 = N('清音 / 浊音：清音喉咙不震动，像 f、t；浊音喉咙会震动，像 v、d。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'leave', '/liːv/ 离开', 'left', '/left/');
  // 喉咙：浊音震动（波浪），清音不震
  K.prop((g, t) => { const s = T + 1.2; if (t < s) return; g.save(); g.lineWidth = 5; g.font = '56px Kalam, WK';
    g.strokeStyle = GREY; g.beginPath(); for (let i = 0; i <= 40; i++) { const px = ox + 1150 + i * 8, py = oy + 200 + Math.sin(i / 2 + t * 18) * 14; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.fillStyle = GREY; g.fillText('v 浊', ox + 1500, oy + 220);
    g.strokeStyle = OR; g.beginPath(); g.moveTo(ox + 1150, oy + 330); g.lineTo(ox + 1470, oy + 330); g.stroke(); g.fillStyle = OR; g.fillText('f 清', ox + 1500, oy + 350); g.restore(); }, { from: T + 1.2 });
  T += d1;
  const d2 = N('同化：两个音挨着，一个变得像另一个。v 挨着清音 t，就变成清音 f。', T);
  K.at(T + 0.2).text('ea 缩成 e，浊音 v 变清音 f + t', ox + 140, oy + 470, 54, { col: OR });
  K.at(T + 1.4).text('The train left ten minutes ago.', ox + 140, oy + 600, 60);
  T += d2;
  const en = 'The train left ten minutes ago.', w = 'left The train ten minutes ago', st = T, lt = wordT(st, en, w, 'left');
  K.actor({ keys: [[0, 'train']], walk: { keys: ['train', 'train'], x0: ox + 900, x1: ox + 1650, t0: lt - 0.2, t1: lt + 2.4, step: 9999, ease: 'power2.in' }, x: ox + 900, ground: oy + 1000, h: 260, reveal: T - 1.2, until: lt + 2.5 });
  K.at(T - 0.8).line(ox + 100, oy + 1000, ox + 1820, oy + 1000, { w: 4, col: GREY, min: 0.05 });
  K.pop(lt + 0.3, 'left', ox + 700, oy + 820, 84, { out: lt + 2.6 });
  T = st + say(st, en, { word: w, key: ['left'], zh: '火车十分钟前开走了。' }) + 0.3;
}

// ───────── 7 其余成员：keep / sweep / meet / feed ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.3);
  const d1 = N('还有 keep、sweep；meet、feed 直接减掉一个 e，变成 met、fed。', T);
  K.at(T + 0.1).text('其余成员：', ox + 140, oy + 180, 60, { col: OR });
  K.text('keep→kept · sweep→swept · meet/feed→met/fed', ox + 140, oy + 290, 64, { rate: 26 });
  T += d1;
  const en = 'Keep, kept. Sweep, swept. Meet. Feed, fed.', w = 'keep kept sweep swept meet feed fed', st = T, sw = wordT(st, en, w, 'sweep');
  K.actor({ keys: [[0, 'm_sweep']], x: ox + 500, ground: oy + 1100, h: 440, reveal: sw - 0.6 });
  K.pop(sw + 0.4, 'swept', ox + 800, oy + 560, 76, { out: sw + 2.6 });
  T += say(st, en, { word: w, key: ['kept', 'swept', 'fed'], zh: '保持、扫、见面、喂。' }) + 0.2;
  // 公园：两棵树 + 见面
  K.at(T - 0.4).text('公园', ox + 1500, oy + 520, 50, { col: GREY });
  K.circle(ox + 1180, oy + 640, 70, { w: 4, col: GREY }).line(ox + 1180, oy + 710, ox + 1180, oy + 820, { w: 4, col: GREY });
  const en2 = 'We met at the park.', st2 = T, mt = wordT(st2, en2, 'met', 'met');
  K.actor({ keys: [[0, 'meet']], x: ox + 1450, ground: oy + 1100, h: 440, reveal: T });
  K.pop(mt, 'met', ox + 1100, oy + 900, 84, { out: mt + 2.4 });
  T = st2 + say(st2, en2, { word: 'met', key: ['met'], zh: '我们在公园见面了。' }) + 0.3;
}

// ───────── 8 结论 + 口诀 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.3);
  const d1 = N('结论：ee / ea 缩成一个 e，后面加 t。', T);
  K.at(T + 0.6).text('结论：sleep→slept、feel→felt、leave→left：长音 ee/ea 缩成 e，再加 t', ox + 120, oy + 220, 46, { rate: 30 });
  K.at(T + 1.6).text('口诀：加 t 太挤要减肥，两个 e 变一个 e！', ox + 120, oy + 340, 56, { col: OR, rate: 30 });
  K.at(T + 1.2).text('ee', ox + 500, oy + 700, 150, { col: GREY });
  K.arrow(ox + 760, oy + 650, ox + 1000, oy + 650, { w: 6, col: OR, head: 30 });
  K.text('e', ox + 1060, oy + 700, 150, { col: OR }).text('+ t', ox + 1180, oy + 700, 120, { col: OR });
  T += Math.max(d1, 3.6);
  T += N('口诀：加 t 太挤要减肥，两个 e 变一个 e！', T) + 0.2;
}

// ───────── 9 预测 ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.3);
  const d1 = N('预测：「我把房间打扫得很干净」：sweep 是长音减肥派，过去式怎么写？先想 3 秒！', T);
  K.at(T + 0.4).text('🔮 我把房间打扫得很干净。', ox + 130, oy + 250, 60);
  K.text('→  I ___ the room clean.  ( sweeped / swept )', ox + 130, oy + 360, 56, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：ee 缩成 e，再加 t：I swept the room clean.', T);
  K.at(T + 0.2).text('I swept the room clean.', ox + 130, oy + 490, 66, { col: OR });
  const en = 'I swept the room clean.', w = 'I swept the room clean', st = T + 0.8, sw = wordT(st, en, w, 'swept');
  K.actor({ keys: [[0, 'm_sweep']], x: ox + 1400, ground: oy + 1100, h: 440, reveal: T + 0.4 });
  K.pop(sw, 'swept ✓', ox + 700, oy + 720, 84, { out: sw + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['swept'], zh: '我把房间打扫得很干净。' })) + 0.6;
}

// ───────── 10 减肥全图：长条 → 短条 ─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.3);
  [['sleep', 'slept'], ['feel', 'felt'], ['leave', 'left']].forEach(([a, b], k) => {
    const y = oy + 260 + k * 250;
    K.at(T + k * 0.6).text(a, ox + 160, y, 70, { col: GREY });
    slim(ox + 520, y - 20, T + 0.2 + k * 0.6, T + 1.6 + k * 0.6, { w0: 600, w1: 200 });
    K.text(b, ox + 1300, y, 70, { col: OR });
  });
  T = K.cur + 1.0;
}

// ───────── 11 小剧场：走回家 → 睡觉 ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.3);
  K.at(T).text('I slept well and felt happy.', ox + 160, oy + 220, 62);
  K.actor({ keys: [[0, 'l_w0']], walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 300, x1: ox + 1000, t0: T + 0.4, t1: T + 3.0, step: 55 }, x: ox + 300, ground: oy + 1050, h: 400, reveal: T + 0.2, until: T + 3.1 });
  K.actor({ keys: [[0, 'l_sleep']], x: ox + 1300, ground: oy + 1050, h: 340, reveal: T + 3.0 });
  T += 4.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('长音减肥派：词尾加 t 太挤，', ox + 220, oy + 350, 58);
  K.text('长长的 /iː/ 只好缩成短短的 /e/', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：加 t 太挤要减肥，', ox + 220, oy + 650, 54);
  K.text('两个 e 变一个 e！', ox + 220, oy + 740, 54);
  K.text('⚔️ 过去式四大门派 · ③ 长音减肥派', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
