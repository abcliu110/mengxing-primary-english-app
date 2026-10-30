// ⚔️ 过去式四大门派 · ② 水流音乐元音换挡派（i → a）—— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/past_clans.js 案例 2；对照清单 lab/INVENTORY_PC2_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/pc2.js（人物先行帧库 cast/：聚会欢呼、游泳 4 帧、Leo 喝水、Mia 坐下、Leo 跑步 4 帧、开门回来）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/pc2.js';

export default function build() {
const K = scene({ sprites: SP });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
// 换挡杆：i / a / u 三个挡位，杆子在 shiftAt 时刻从 i 挡推到 a 挡（再到 u 挡）
const gear = (x, y, from, shifts) => K.prop((g, t) => {
  const q = Math.min(1, (t - from) / 0.6); if (q <= 0) return;
  const P = [[x, y], [x + 160, y], [x + 320, y]];
  let pos = 0, fr = 0; shifts.forEach(([at, to]) => { const d = (t - at) / 0.4; if (d > 0) { if (d >= 1) pos = to; else fr = { from: pos, to, d }; } });
  g.save(); g.globalAlpha = q; g.strokeStyle = INK; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(P[0][0], y + 100); g.lineTo(P[2][0], y + 100); P.forEach(([px]) => { g.moveTo(px, y); g.lineTo(px, y + 100); }); g.stroke();
  g.font = '60px Kalam, WK'; ['i', 'a', 'u'].forEach((s, k) => { g.fillStyle = k === 1 ? OR : GREY; g.fillText(s, P[k][0] - 12, y - 20); });
  let kx = P[pos][0]; if (fr && fr.d < 1) kx = P[fr.from][0] + (P[fr.to][0] - P[fr.from][0]) * fr.d;
  g.fillStyle = OR; g.beginPath(); g.arc(kx, y + 40, 32, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); g.restore();
}, { from });
// 嘴型：张开度（0 扁 … 1 大）
const mouth = (x, y, open, from, col = INK) => K.prop((g, t) => { const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = q; g.strokeStyle = col; g.lineWidth = 6; g.fillStyle = 'rgba(239,114,38,.12)'; g.beginPath(); g.ellipse(x, y, 90, 12 + open * 70, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }, { from });
// 一张单词卡：原形 → 过去式（过去分词）
const pair = (ox, oy, t, base, zh, past, pp) => {
  K.at(t).rect(ox, oy, 330, 150, { w: 5, rough: 1.2 }).text(base, ox + 40, oy + 100, 76);
  K.text(zh, ox + 40, oy + 210, 46, { col: GREY });
  K.arrow(ox + 360, oy + 75, ox + 460, oy + 75, { w: 5, col: OR, head: 22 });
  K.rect(ox + 480, oy, 330, 150, { w: 6, col: OR, fill: OR2, rough: 1.4 }).text(past, ox + 520, oy + 100, 76, { col: OR });
  K.text(pp, ox + 520, oy + 210, 42, { col: GREY });
};
// 音符飘起（唱歌）
const notes = (x, y, from, to) => K.prop((g, t) => { if (t < from || t > to) return; g.save(); g.fillStyle = OR; g.font = '64px Kalam, WK'; for (let i = 0; i < 3; i++) { const p = ((t - from) * 0.6 + i / 3) % 1; g.globalAlpha = 1 - p; g.fillText('♪', x + i * 70 + Math.sin(p * 6) * 20, y - p * 220); } g.restore(); }, { from });
// 铃：摇晃（The bell rang）
const ringBell = (x, y, from, rings) => K.prop((g, t) => { const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return; let rot = 0; rings.forEach(h => { const d = t - h; if (d > 0 && d < 1.2) rot += Math.sin(d * 24) * 0.35 * (1 - d / 1.2); }); g.save(); g.globalAlpha = q; g.translate(x, y); g.rotate(rot); g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = OR2; g.beginPath(); g.moveTo(-70, 120); g.bezierCurveTo(-70, 20, -50, -20, 0, -20); g.bezierCurveTo(50, -20, 70, 20, 70, 120); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(0, 135, 14, 0, 7); g.stroke(); g.beginPath(); g.moveTo(0, -20); g.lineTo(0, -50); g.stroke(); g.restore(); rings.forEach(h => { const d = t - h; if (d > 0 && d < 1.2) { g.save(); g.strokeStyle = OR; g.lineWidth = 5; g.globalAlpha = 1 - d / 1.2; [1, 2].forEach(k => { g.beginPath(); g.arc(x, y + 50, 100 + k * 40 + d * 60, -0.6, 0.6); g.stroke(); g.beginPath(); g.arc(x, y + 50, 100 + k * 40 + d * 60, Math.PI - 0.6, Math.PI + 0.6); g.stroke(); }); g.restore(); } }); }, { from });

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  const d0 = N('这一派的秘密藏在中间的元音字母里：i 一换成 a，就变成过去式。', 0.1);
  K.at(0.3).text('第二门派：水流音乐元音换挡派', ox + 140, oy + 330, 90);
  K.text('过去式四大门派', ox + 150, oy + 450, 64, { col: OR });
  K.rect(ox + 150, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 180, oy + 578, 44);
  K.rect(ox + 570, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('✂️ 简化说法', ox + 600, oy + 578, 44);
  const menu = ['① 门派旗', '② 秘诀', '③ 成员', '④ 结论', '🔮 预测'];
  let x = ox + 150; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 700, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 748, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.actor({ keys: [[0, 'party']], x: ox + 1600, ground: oy + 1150, h: 380, reveal: 1.0, bob: 5 });
  notes(ox + 1450, oy + 700, 2.0, 30);
  T = d0 + 1.6;
}

// ───────── 2 门派旗：i → a 换挡 + sing → sang → sung ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.3).line(ox + 160, oy + 120, ox + 160, oy + 560, { w: 6 }).path([[ox + 160, oy + 130], [ox + 520, oy + 180], [ox + 160, oy + 300]], { w: 5, col: OR });
  K.text('i → a', ox + 200, oy + 245, 60, { col: OR });
  K.text('元音换挡派', ox + 200, oy + 380, 64);
  gear(ox + 1200, oy + 260, T + 1.0, [[T + 2.6, 1]]);
  T += 2.0;
  const d1 = N('元音交替：不加 -ed，只把单词中间的元音换掉来表示时间，就像汽车换挡。', T);
  K.at(T + 0.2).text('sing → sang → sung', ox + 160, oy + 680, 96);
  T += d1;
  const d2 = N('现在 sing 用 i，过去式 sang 用 a，过去分词 sung 用 u。', T);
  [['现在', 160], ['过去式', 520], ['过去分词', 920]].forEach(([s, x], k) => K.at(T + 0.3 + k * 0.4).text(s, ox + x, oy + 790, 48, { col: k === 1 ? OR : GREY }));
  T += d2 + 0.2;
}

// ───────── 3 口腔张开度：i 扁嘴 → a 张大嘴 → u 半张嘴 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.3);
  const d1 = N('口腔张开度：嘴巴张多大。i 嘴扁扁，a 嘴张得最大，u 嘴巴半张收一点。', T);
  K.at(T + 0.2).text('i 扁嘴 → a 张大嘴 → u 半张嘴', ox + 160, oy + 200, 64, { rate: 30 });
  mouth(ox + 400, oy + 450, 0, T + 1.4); mouth(ox + 900, oy + 450, 1, T + 2.2, OR); mouth(ox + 1400, oy + 450, 0.45, T + 3.0);
  ['i', 'a', 'u'].forEach((s, k) => K.at(T + 1.6 + k * 0.8).text(s, ox + 385 + k * 500, oy + 640, 70, { col: k === 1 ? OR : GREY }));
  T += d1;
  K.at(T).text('例：We sang English songs at the party.', ox + 160, oy + 800, 58);
  const en = 'Sing, sang, sung. We sang English songs at the party.', w = 'a sing sung We English songs at the party', st = T + 0.8, sg = wordT(st, en, w, 'we');
  K.actor({ keys: [[0, 'party']], x: ox + 1550, ground: oy + 1180, h: 340, reveal: st, bob: 6 });
  notes(ox + 1400, oy + 880, sg, sg + 6);
  T = st + say(st, en, { word: w, key: ['sang'], zh: '唱，唱了，唱过。我们在聚会上唱了英文歌。' }) + 0.3;
}

// ───────── 4 秘诀：鼻音 -ng / -nk / -m / -n ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.3);
  const d1 = N('鼻音：气从鼻子出来的音，比如 -ng、-nk、-m、-n。带这些音的动词常在这一派。', T);
  K.at(T + 0.1).text('秘诀：带鼻音 -ng / -nk / -m / -n 的常用动词，多数在这一派', ox + 120, oy + 200, 50, { rate: 30 });
  // 鼻子 + 气流
  K.at(T + 1.4).curve([[ox + 760, oy + 380], [ox + 700, oy + 560], [ox + 680, oy + 640], [ox + 760, oy + 660]], { w: 6 }).text('鼻子', ox + 560, oy + 470, 46, { col: GREY });
  K.prop((g, t) => { const s = T + 2.0; if (t < s) return; g.save(); g.strokeStyle = OR; g.lineWidth = 5; for (let k = 0; k < 3; k++) { const p = ((t - s) * 0.8 + k / 3) % 1; g.globalAlpha = 1 - p; g.beginPath(); g.arc(ox + 640 - p * 200, oy + 680 + p * 60, 20 + p * 30, 0, 7); g.stroke(); } g.restore(); }, { from: T + 2.0 });
  ['-ng', '-nk', '-m', '-n'].forEach((s, k) => K.pop(T + 2.4 + k * 0.4, s, ox + 1100 + (k % 2) * 300, oy + 520 + Math.floor(k / 2) * 180, 80, { out: T + 30 }));
  T += d1;
  T += say(T, 'Ng, nk. Sing, drink.', { word: 'ng nk', key: ['sing', 'drink'], zh: '-ng、-nk 结尾。唱、喝。' }) + 0.3;
}

// ───────── 5 成员 swim ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.3);
  const d1 = N('成员 swim（游泳）：结尾 m 是鼻音，中间 i 换成 a。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'swim', '游泳', 'swam', '过去分词 swum');
  K.at(T + 2.0).text('i ➔ a 元音换挡', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('去年夏天在大海里游泳：swam。', T);
  K.at(T + 0.1).text('I swam in the blue sea last summer.', ox + 140, oy + 600, 60);
  K.prop((g, t) => { if (t < T + 0.6) return; g.save(); g.strokeStyle = OR2; g.lineWidth = 6; for (let r = 0; r < 3; r++) { g.beginPath(); for (let i = 0; i <= 80; i++) { const px = ox + 900 + i * 12, py = oy + 980 + r * 40 + Math.sin(i / 6 + t * 3 + r) * 12; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); } g.restore(); }, { from: T + 0.6 });
  const en = 'Swim, swam, swum. I swam in the blue sea last summer.', w = 'swim swam swum I in blue sea last summer', st = T + 1.0, sw = wordT(st, en, w, 'swam');
  K.actor({ keys: [[0, 'sw0']], walk: { keys: ['sw0', 'sw1', 'sw2', 'sw3'], x0: ox + 1000, x1: ox + 1650, t0: T + 0.8, t1: st + 9, step: 60 }, x: ox + 1000, ground: oy + 1000, h: 220, reveal: T + 0.6 });
  K.pop(sw, 'swam', ox + 700, oy + 820, 84, { out: sw + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['swam'], zh: '游，游了，游过。去年夏天我在蓝色的大海里游泳。' })) + 0.3;
}

// ───────── 6 成员 drink ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.3);
  const d1 = N('成员 drink（喝）：结尾 -nk 是鼻音，i 换成 a 就是 drank。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'drink', '喝水', 'drank', '过去分词 drunk');
  K.at(T + 2.0).text('i ➔ a 元音换挡', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('他喝了一大杯牛奶：drank。', T);
  K.at(T + 0.1).text('He drank a big glass of milk.', ox + 140, oy + 600, 60);
  // 大杯牛奶
  K.at(T + 1.2).path([[ox + 900, oy + 720], [ox + 930, oy + 1000], [ox + 1090, oy + 1000], [ox + 1120, oy + 720]], { w: 5 }).line(ox + 908, oy + 790, ox + 1112, oy + 790, { w: 4, col: GREY }).text('milk', ox + 950, oy + 920, 46, { col: OR });
  const en = 'Drink, drank, drunk. He drank a big glass of milk.', w = 'drink drunk He big glass of milk', st = T + 1.6, dt = wordT(st, en, w, 'drank');
  K.actor({ keys: [[0, 'l_drink']], x: ox + 1450, ground: oy + 1150, h: 460, reveal: T + 0.6 });
  K.pop(dt, 'drank', ox + 1450, oy + 640, 84, { out: dt + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['drank'], zh: '喝，喝了，喝过。他喝了一大杯牛奶。' })) + 0.2;
  T += say(T, 'We sang and swam last summer.', { word: 'sang', key: ['sang', 'swam'], zh: '去年夏天我们唱歌、游泳。' }) + 0.3;
}

// ───────── 7 成员 sit / give ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.3);
  const d1 = N('sit（坐）和 give（给）：短 i 变 a 是 sat，长 i_e 变 a_e 是 gave。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'sit/give', '坐 / 给', 'sat/gave', '');
  T += d1;
  const d2 = N('i_e：i 后面隔一个辅音再跟个不发音的 e，像 give、bike。', T);
  K.at(T + 0.2).text('短 i 变 a (sat)，长 i_e 变 a_e (gave)', ox + 140, oy + 470, 54, { col: OR });
  K.at(T + 1.4).text('She sat down and gave me a smile.', ox + 140, oy + 600, 60);
  T += d2;
  const en = 'Sit, sat. Give, gave. She sat down and gave me a smile.', w = 'sit sat give gave She down and me smile', st = T, sa = wordT(st, en, w, 'she');
  K.actor({ keys: [[0, 'm_sit']], x: ox + 1450, ground: oy + 1150, h: 460, reveal: T - 1.0 });
  K.pop(sa + 0.4, 'sat', ox + 900, oy + 800, 84, { out: sa + 2.4 }); K.pop(sa + 1.6, 'gave ☺', ox + 1150, oy + 900, 70, { out: sa + 3.6 });
  T = st + say(st, en, { word: w, key: ['sat', 'gave'], zh: '坐，坐了。给，给了。她坐下来，对我笑了笑。' }) + 0.2;
  T += say(T, 'She drank some milk and sat down.', { word: 'drank', key: ['drank', 'sat'], zh: '她喝了点牛奶，然后坐下了。' }) + 0.3;
}

// ───────── 8 其余成员：begin / ring；run / come 单独记 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.3);
  const d1 = N('begin、ring 也是 i 变 a。run、come 变 ran、came，不是 i 变 a，单独记！', T);
  K.at(T + 0.1).text('其余成员：', ox + 140, oy + 180, 60, { col: OR });
  K.text('begin/ring→began/rang · run/come→ran/came', ox + 140, oy + 290, 64, { rate: 26 });
  K.text('（不是 i 变 a）', ox + 1240, oy + 380, 50, { col: GREY });
  T += d1;
  const en = 'Begin, ring, rang. The bell rang.', st = T, rt = wordT(st, en, 'begin ring rang', 'bell') + 0.36;
  ringBell(ox + 400, oy + 560, T, [rt, rt + 1.0]);
  K.pop(rt, 'rang', ox + 650, oy + 600, 84, { out: rt + 2.4 });
  T += say(st, en, { word: 'begin ring rang', key: ['rang'], zh: '开始、响、响了。铃响了。' }) + 0.2;
  const en2 = 'Run, ran. Come, came. I ran home and came back. Ride a bike. Ed.', w2 = 'run ran come came bike ed', st2 = T, rn = wordT(st2, en2, w2, 'i'), cm = wordT(st2, en2, w2, 'back');
  K.actor({ keys: [[0, 'l_r0']], walk: { keys: ['l_r0', 'l_r1', 'l_r2', 'l_r3'], x0: ox + 900, x1: ox + 1450, t0: rn, t1: cm - 0.6, step: 70 }, x: ox + 900, ground: oy + 1150, h: 400, reveal: T - 0.6, until: cm - 0.5 });
  K.actor({ keys: [[0, 'l_back']], x: ox + 1550, ground: oy + 1150, h: 420, reveal: cm - 0.6 });
  K.pop(rn + 0.4, 'ran', ox + 1000, oy + 620, 76, { out: rn + 2.4 }); K.pop(cm, 'came', ox + 1300, oy + 560, 76, { out: cm + 2.4 });
  T = st2 + say(st2, en2, { word: w2, key: ['ran', 'came'], zh: '跑，跑了。来，来了。我跑回家又回来了。骑自行车。-ed。' }) + 0.3;
}

// ───────── 9 结论 + 口诀 ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.3);
  const d1 = N('结论：i 换成 a，就是过去式。', T);
  K.at(T + 0.6).text('结论：sing→sang、swim→swam、drink→drank：中间的 i 换成 a = 过去式', ox + 120, oy + 220, 48, { rate: 30 });
  K.at(T + 1.6).text('口诀：现在 i 扁嘴，过去 a 张嘴，换个元音就过去！', ox + 120, oy + 340, 52, { col: OR, rate: 30 });
  gear(ox + 700, oy + 620, T + 1.0, [[T + 3.0, 1]]);
  mouth(ox + 400, oy + 900, 0, T + 2.0); mouth(ox + 1300, oy + 900, 1, T + 3.2, OR);
  T += Math.max(d1, 3.6);
  T += N('口诀：现在 i 扁嘴，过去 a 张嘴，换个元音就过去！', T) + 0.2;
}

// ───────── 10 预测 ─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.3);
  const d1 = N('预测：「她在聚会上唱了一首歌」：sing 是元音换挡派，过去式怎么写？先想 3 秒！', T);
  K.at(T + 0.4).text('🔮 她在聚会上唱了一首歌。', ox + 130, oy + 250, 60);
  K.text('→  She ___ a song at the party.  ( singed / sang )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：i 换成 a：She sang a song at the party.', T);
  K.at(T + 0.2).text('She sang a song at the party.', ox + 130, oy + 490, 64, { col: OR });
  const en = 'She sang a song at the party.', w = 'She sang song at the party', st = T + 0.8, sg = wordT(st, en, w, 'sang');
  K.actor({ keys: [[0, 'party']], x: ox + 1350, ground: oy + 1120, h: 400, reveal: T + 0.4, bob: 6 });
  notes(ox + 1200, oy + 700, sg, sg + 5);
  K.pop(sg, 'sang ✓', ox + 700, oy + 720, 84, { out: sg + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['sang'], zh: '她在聚会上唱了一首歌。' })) + 0.6;
}

// ───────── 11 换挡全图（三个挡位 + 三位成员）─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.3);
  K.at(T).text('sing   swim   drink', ox + 200, oy + 300, 80, { col: GREY });
  K.arrow(ox + 900, oy + 360, ox + 900, oy + 520, { w: 6, col: OR, head: 30 });
  K.text('sang   swam   drank', ox + 200, oy + 680, 80, { col: OR });
  gear(ox + 1300, oy + 420, T + 0.4, [[T + 1.6, 1]]);
  T = K.cur + 0.8;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('元音换挡派不加 -ed：', ox + 220, oy + 350, 58);
  K.text('只把中间的 i 换成 a，动词就开到了过去', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：现在 i 扁嘴，过去 a 张嘴，', ox + 220, oy + 650, 54);
  K.text('换个元音就过去！', ox + 220, oy + 740, 54);
  K.text('⚔️ 过去式四大门派 · ② 元音换挡派', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
