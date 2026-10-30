// ⏳ 时×体矩阵 · ② 现在进行时 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/tense_matrix.js 案例 2；对照清单 lab/INVENTORY_TM2_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/tm2.js（人物先行帧库 cast/：Leo 跑步 / 跳、Mia 跳舞 / 做蛋糕 / 读书 / 喜欢 / 牵狗、游泳、踢球）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/tm2.js';

export default function build() {
const K = scene({ sprites: SP });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
// 字幕：时长按字数估（每字 0.13 秒，至少 3.2 秒）
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
// 一段还在动的波浪线（画面只由 t 决定）
const wave = (x, y, w, from, { amp = 18, col = OR, lw = 6 } = {}) => K.prop((g, t) => {
  const q = Math.min(1, (t - from) / 0.8); if (q <= 0) return;
  g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= 60 * q; i++) { const px = x + w * i / 60, py = y + Math.sin(i / 60 * Math.PI * 4 + t * 5) * amp; i ? g.lineTo(px, py) : g.moveTo(px, py); }
  g.stroke(); g.restore();
}, { from });
// 录像机红点：闪烁
const recDot = (x, y, from) => K.prop((g, t) => { if (Math.floor((t - from) * 2) % 2) return; g.save(); g.fillStyle = '#d33'; g.beginPath(); g.arc(x, y, 16, 0, 7); g.fill(); g.restore(); }, { from });

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  K.narr('「看！Leo 正在跑！」这一秒正在发生的动作，英语怎么拍下来？', 0.1, 5.6);
  K.at(0.3).text('② 现在进行时', ox + 260, oy + 400, 130);
  K.text('现在 × 进行体', ox + 270, oy + 530, 72, { col: OR });
  K.rect(ox + 1180, oy + 300, 470, 90, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 1215, oy + 362, 48);
  const menu = ['① 时间轴', '② 时×体格子', '③ 公式', '④ 例句', '⑤ 信号词·陷阱', '🔮 预测'];
  let x = ox + 230; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 680, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 728, 40, { col: GREY, rate: 30 }); x += w + 24; });
  // 小 Leo 从右下角跑过：开场就有动作
  K.actor({ keys: [[0, 'l_r0']], walk: { keys: ['l_r0', 'l_r1', 'l_r2', 'l_r3'], x0: ox + 1300, x1: ox + 1800, t0: 2.0, t1: 5.4, step: 60 }, x: ox + 1300, ground: oy + 1150, h: 260, reveal: 1.6 });
  T = 5.8;
}

// ───────── 2 时间轴：Past, now, future + 我正在踢球 ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.4).arrow(ox + 180, oy + 300, ox + 1740, oy + 300, { w: 6, speed: 3000, head: 40 });
  [[450, '过去 Past', INK], [960, '现在 Now', OR], [1470, '将来 Future', INK]].forEach(([x, s, c]) => { K.line(ox + x, oy + 278, ox + x, oy + 322, { w: 5, col: c, min: 0.08 }); K.text(s, ox + x - K.measure(s, 52) / 2, oy + 385, 52, { col: c }); });
  const en = 'Past, now, future. I am playing football now.', w = 'Past Now Future am are I playing football', st = T + 2.6;
  const pt = wordT(st, en, w, 'playing');
  wave(ox + 820, oy + 240, 280, pt - 0.4);
  const boy = K.actor({ keys: [[0, 'kick0']], x: ox + 760, ground: oy + 1000, h: 440, reveal: st });
  [pt, pt + 1.1, pt + 2.2].forEach(kt => boy.keys.push([kt - 0.4, 'kick0'], [kt - 0.2, 'kick1'], [kt, 'kick2'], [kt + 0.5, 'kick0']));
  K.pop(pt, 'am playing', ox + 1250, oy + 640, 84, { out: pt + 2.8 });
  T = st + say(st, en, { word: w, key: ['am', 'playing'], zh: '过去、现在、将来。我现在正在踢足球。' }) + 0.4;
}

// ───────── 3 时×体矩阵 + 录像机（REC）+ 波浪线 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.4);
  const d1 = N('现在进行时：在矩阵里，它是「现在」这一列和「进行」这一行交叉的格子。', T);
  const x0 = ox + 330, y0 = oy + 200, cw = 260, rh = 105;
  K.at(T + 0.1).text('体＼时', ox + 150, oy + 175, 40, { col: GREY });
  ['过去', '现在', '将来'].forEach((s, i) => K.text(s, x0 + cw * (i + .5) - 48, oy + 175, 48, { col: i === 1 ? OR : INK }));
  ['一般', '进行', '完成'].forEach((s, j) => K.text(s, ox + 170, y0 + rh * (j + .5) + 16, 48, { col: j === 1 ? OR : INK }));
  K.rect(x0, y0, cw * 3, rh * 3, { w: 4, rough: 1.0 });
  for (let i = 1; i < 3; i++) K.line(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, { w: 3, col: GREY, min: 0.1 });
  for (let j = 1; j < 3; j++) K.line(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, { w: 3, col: GREY, min: 0.1 });
  K.rect(x0 + cw + 10, y0 + rh + 10, cw - 20, rh - 20, { col: OR, w: 6, fill: OR2, rough: 1.4, speed: 1500 });
  K.text('现在进行时', x0 + cw + 44, y0 + rh + 63, 32, { col: OR });
  T += d1;
  // 录像机
  const d2 = N('进行体：像一台高清录像机，正在直播这一秒的动作，动作还没有停。', T);
  const cx = ox + 1300, cy = oy + 260;
  K.at(T + 0.3).rect(cx, cy, 380, 220, { w: 5, rough: 1.2 }).path([[cx + 380, cy + 60], [cx + 500, cy + 10], [cx + 500, cy + 210], [cx + 380, cy + 160]], { w: 5 }).circle(cx + 190, cy + 110, 120, { w: 4, col: OR });
  K.text('REC', cx + 40, cy + 70, 48, { col: '#d33' }); recDot(cx + 30, cy + 55, K.cur);
  // 镜头里正在跑的 Leo
  K.actor({ keys: [[0, 'l_r0']], walk: { keys: ['l_r0', 'l_r1', 'l_r2', 'l_r3'], x0: ox + 1250, x1: ox + 1750, t0: T + 1.2, t1: T + 6.0, step: 60 }, x: ox + 1250, ground: oy + 980, h: 360, reveal: T + 0.9 });
  T += d2;
  const d3 = N('在时间轴上，它是「现在」附近一段还在动的波浪线。', T);
  K.at(T + 0.1).arrow(ox + 180, oy + 760, ox + 1150, oy + 760, { w: 5, speed: 3000 });
  [[300, '过去'], [665, '现在'], [1030, '将来']].forEach(([x, s]) => K.text(s, ox + x - 40, oy + 840, 40, { col: s === '现在' ? OR : GREY, rate: 30 }));
  wave(ox + 545, oy + 760, 240, T + 0.6, { amp: 22 });
  T += d3 + 0.3;
}

// ───────── 4 公式：发动机 am / is / are + V-ing ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.4);
  const d1 = N('助动词：帮主要动词说清时间的小帮手。这里的 am / is / are 是句子的「发动机」。', T);
  K.at(T + 0.1).text('公式：', ox + 160, oy + 220, 60, { col: GREY });
  K.text('am / is / are（助动词画框） + V-ing（动态分词镜头）', ox + 160, oy + 320, 52);
  K.rect(ox + 140, oy + 255, 440, 90, { col: OR, w: 5, rough: 1.4 });
  // 发动机：齿轮转起来
  const gx = ox + 380, gy = oy + 500, g0 = K.cur;
  K.prop((g, t) => { g.save(); g.translate(gx, gy); g.rotate((t - g0) * 2.2); g.strokeStyle = OR; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 50, 0, 7); g.stroke();
    for (let i = 0; i < 8; i++) { g.rotate(0.785); g.beginPath(); g.moveTo(50, 0); g.lineTo(72, 0); g.stroke(); } g.restore(); }, { from: g0 });
  T += d1;
  const d2 = N('V-ing（现在分词）：动词加 -ing，只是「正在……」的画面，不能自己当谓语。', T);
  K.at(T + 0.1).text('I playing football', ox + 700, oy + 560, 70);
  const crossT = T + 0.6; K.at(crossT).text('✗', ox + 1380, oy + 560, 90, { col: OR });
  T += d2;
  const d3 = N('所以 I playing football 是错的：少了发动机 am，两样缺一不可！', T);
  K.at(T + 0.3).text('am', ox + 760, oy + 450, 70, { col: OR });
  K.arrow(ox + 800, oy + 470, ox + 790, oy + 515, { col: OR, w: 5, head: 20 });
  K.pop(T + 1.2, '缺一不可！', ox + 1300, oy + 800, 80, { out: T + d3 });
  T += d3 + 0.3;
}

// ───────── 5 Look! Leo is running：双写 n ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.4);
  const d1 = N('重读闭音节：run 这类短词是「辅音 + 元音 + 辅音」结尾，而且重读。', T);
  K.at(T + 0.1).text('Look! Leo', ox + 160, oy + 220, 66);
  K.text('is running fast on the playground.', ox + 160 + K.measure('Look! Leo ', 66), oy + 220, 66, { col: OR });
  K.text('双写 n', ox + 1500, oy + 330, 56, { col: OR });
  K.text('r u n  →  run + n + ing', ox + 1100, oy + 420, 46, { col: GREY, rate: 24 });
  // 操场跑道
  K.at(T + 1.0).ellipse(ox + 960, oy + 820, 1500, 300, { w: 4, col: GREY, rough: 0.8, speed: 3600 });
  const en = 'Look! Leo is running fast on the playground.', st = T + 2.0, rt = wordT(st, en, 'is running', 'running');
  K.actor({ keys: [[0, 'l_r0']], walk: { keys: ['l_r0', 'l_r1', 'l_r2', 'l_r3'], x0: ox + 300, x1: ox + 1650, t0: rt - 0.6, t1: rt + 5.6, step: 65 }, x: ox + 300, ground: oy + 960, h: 400, reveal: T + 1.4 });
  K.pop(rt, 'running', ox + 1000, oy + 560, 90, { out: rt + 2.4 });
  T = Math.max(T + d1, st + say(st, en, { word: 'is running', key: ['running'], zh: '看！里奥在操场上飞快地跑。' }));
  const d2 = N('双写：重读闭音节的词，要把最后一个字母写两遍再加 -ing：run → running。', T);
  const en2 = 'Look! Leo is running fast on the playground. Listen!';
  K.at(T + 0.4).text('run → running', ox + 1240, oy + 510, 60, { col: OR });
  K.under(ox + 1395, ox + 1470, oy + 525);
  T += Math.max(d2, say(T, en2, { word: 'Look Leo fast on the playground Listen', key: ['Look', 'Listen'], zh: '看！里奥在操场上飞快地跑。听！' })) + 0.2;
}

// ───────── 6 -ing 变身表：Run, dance, make, swim, read ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.4);
  const en = 'Run, dance, make, swim, read. Ing.', w = 'run dance make swim read ing', st = T + 0.4;
  K.at(T + 0.2).text('+ ing 变身', ox + 160, oy + 180, 66, { col: OR });
  const rows = [['run', 'running', '双写 n'], ['dance', 'dancing', '去 e'], ['make', 'making', '去 e'], ['swim', 'swimming', '双写 m'], ['read', 'reading', '直接 + ing']];
  rows.forEach(([a, b, r], i) => { const y = oy + 300 + i * 130, tt = wordT(st, en, w, a);
    K.at(Math.max(K.cur, tt - 0.2)).text(a, ox + 200, y, 58, { rate: 40 }).arrow(ox + 470, y - 18, ox + 600, y - 18, { w: 4, head: 20, speed: 4000 }).text(b, ox + 650, y, 58, { col: OR, rate: 40 }).text(r, ox + 1050, y, 44, { col: GREY, rate: 40 }); });
  // 右边：小动作缩略（跳舞 / 游泳 / 读书）
  K.actor({ keys: [[0, 'm_d1'], [st + 2.0, 'm_d2'], [st + 2.6, 'm_d1'], [st + 3.2, 'm_d2'], [st + 3.8, 'm_d1']], x: ox + 1500, ground: oy + 720, h: 360, reveal: st + 0.9 });
  K.actor({ keys: [[0, 'sw0'], [st + 3.0, 'sw1'], [st + 3.4, 'sw2'], [st + 3.8, 'sw3'], [st + 4.2, 'sw0'], [st + 4.6, 'sw1']], x: ox + 1450, ground: oy + 900, h: 170, reveal: st + 2.4 });
  T = st + say(st, en, { word: w, key: ['ing'], zh: '跑、跳舞、做、游泳、读。加 -ing。' }) + 0.4;
}

// ───────── 7 Listen! Mia is dancing and making a cake：去 e ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.4);
  const d1 = N('不发音的 e：dance、make 末尾的 e 不读，去掉 e 再加 -ing：dancing、making。', T);
  K.at(T + 0.1).text('Listen! Mia', ox + 160, oy + 220, 66);
  K.text('is dancing and making a cake.', ox + 160 + K.measure('Listen! Mia ', 66), oy + 220, 66, { col: OR });
  K.text('去 e + ing', ox + 1500, oy + 330, 56, { col: OR });
  K.text('danc̶e̶ → dancing   mak̶e̶ → making', ox + 160, oy + 330, 46, { col: GREY, rate: 24 });
  // 音符：Listen!
  K.pop(T + 1.0, '♪', ox + 520, oy + 520, 90, { out: T + 4 }); K.pop(T + 1.6, '♫', ox + 680, oy + 470, 80, { out: T + 4.6 });
  const en = 'Mia is dancing and making a cake.', w = 'Mia dancing and making a cake is dancing and making a cake', st = T + 1.4;
  const dt = wordT(st, en, w, 'dancing'), mt = wordT(st, en, w, 'making');
  const mia = K.actor({ keys: [[0, 'm_d1']], x: ox + 700, ground: oy + 980, h: 440, reveal: T + 0.8 });
  for (let k = 0; k < 6; k++) mia.keys.push([dt - 0.6 + k * 0.4, k % 2 ? 'm_d1' : 'm_d2']);
  mia.until = mt - 0.2;
  K.actor({ keys: [[0, 'm_cake']], x: ox + 1300, ground: oy + 980, h: 440, reveal: mt - 0.3, bob: 6 });
  K.pop(dt, 'dancing', ox + 600, oy + 470, 80, { out: dt + 2.0 }); K.pop(mt, 'making', ox + 1300, oy + 470, 80, { out: mt + 2.0 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['dancing', 'making'], zh: '米娅一边跳舞一边做蛋糕。' })) + 0.3;
}

// ───────── 8 The children are swimming：复数 are + 双写 m ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  const d1 = N('The children 是复数（好多个），所以用 are；swim 也要双写 m。', T);
  K.at(T + 0.1).text('The children', ox + 160, oy + 220, 66);
  K.text('are swimming in the pool now.', ox + 160 + K.measure('The children ', 66), oy + 220, 66, { col: OR });
  K.text('are + 双写 m', ox + 1450, oy + 330, 56, { col: OR });
  // 泳池
  K.at(T + 0.8).rect(ox + 200, oy + 560, 1520, 420, { w: 5, rough: 1.0, fill: '#cfe3f3', fillW: 2 });
  const en = 'The children are swimming in the pool now.', w = 'children swimming in pool are swimming in the pool now', st = T + 1.6;
  const swt = wordT(st, en, w, 'swimming'), seq = ['sw0', 'sw1', 'sw2', 'sw3'];
  [[480, 800, 0], [960, 900, 0.2], [1420, 760, 0.4]].forEach(([x, gy, off]) => {
    const keys = [[0, 'sw0']]; for (let k = 0; k < 16; k++) keys.push([swt - 1.0 + off + k * 0.35, seq[k % 4]]);
    K.actor({ keys, x: ox + x, ground: oy + gy, h: 200, reveal: T + 1.2 + off });
  });
  K.pop(swt, 'are swimming', ox + 1100, oy + 470, 80, { out: swt + 2.4 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['are', 'swimming'], zh: '孩子们现在正在泳池里游泳。' })) + 0.3;
}

// ───────── 9 I am reading：直接 + ing（后面回到这块写结论 + 口诀）─────────
const READ = 8; let readT;
{
  const [ox, oy] = REG(READ); go(READ, T - 0.4);
  const d1 = N('I 配 am；普通动词直接加 -ing：read → reading。', T);
  K.at(T + 0.1).text('I', ox + 160, oy + 200, 62);
  K.text('am reading an English storybook right now.', ox + 160 + K.measure('I ', 62), oy + 200, 62, { col: OR });
  K.text('直接 + ing', ox + 1500, oy + 300, 56, { col: OR });
  const en = 'I am reading an English storybook right now, at the moment.', w = 'an English storybook right at moment at the moment', st = T + 1.2;
  const rt = wordT(st, en, w, 'reading');
  K.actor({ keys: [[0, 'm_read']], x: ox + 1500, ground: oy + 1000, h: 420, reveal: T + 0.8, bob: 1.6 });
  K.pop(rt, 'reading', ox + 1500, oy + 520, 80, { out: rt + 2.4 });
  readT = K.cur;
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['reading'], zh: '我此刻正在读一本英语故事书。' })) + 0.3;
}

// ───────── 10 信号词 + 陷阱（心理状态词）─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.4);
  const d1 = N('信号词：看到 Look!、Listen!、now、right now，说明镜头正在直播！', T);
  K.at(T + 0.1).text('信号词：', ox + 140, oy + 170, 56, { col: OR });
  K.text('Look! (看！) · Listen! (听！) · now (现在) · right now (此时此刻) · at the moment (眼下)', ox + 140, oy + 260, 38);
  K.text('REC', ox + 1700, oy + 170, 48, { col: '#d33' }); recDot(ox + 1680, oy + 155, K.cur);
  T += d1;
  const d2 = N('心理状态词：like、know、want、have 是心里的感觉，不是看得见的动作，拍不成录像。', T);
  K.at(T + 0.1).text('陷阱：', ox + 140, oy + 400, 56, { col: OR });
  K.text('like(喜欢)、know(知道)、want(想要)、have(拥有) 这类心理状态词，通常不用进行时！', ox + 140, oy + 490, 44);
  T += d2;
  const en = 'I like it. I know. I want it. I have a dog.', w = 'like know want have', st = T;
  const lt = wordT(st, en, w, 'like'), kt = wordT(st, en, w, 'know'), ht = wordT(st, en, w, 'have');
  K.actor({ keys: [[0, 'm_like']], x: ox + 450, ground: oy + 1000, h: 380, reveal: lt - 0.6 });
  // 知道 / 想要：头顶灯泡 + 气泡（心里的事）
  K.at(kt - 0.3).circle(ox + 900, oy + 760, 110, { w: 4 }).text('💡', ox + 872, oy + 775, 50);
  K.ellipse(ox + 1150, oy + 760, 220, 130, { w: 4 }).text('🍦?', ox + 1105, oy + 775, 50);
  K.actor({ keys: [[0, 'm_dog']], x: ox + 1550, ground: oy + 1000, h: 380, reveal: ht - 0.6 });
  // 录像机拍不到：画一个打叉的 REC
  K.at(kt + 0.5).text('REC', ox + 1700, oy + 420, 48, { col: GREY }).cross(ox + 1690, oy + 380, ox + 1810, oy + 430);
  T = st + say(st, en, { word: w, key: ['like', 'know', 'want', 'have'], zh: '我喜欢它。我知道。我想要它。我有一只狗。' }) + 0.3;
}

// ───────── 9′ 回到读书板：结论 + 口诀 ─────────
{
  const [ox, oy] = REG(READ); go(READ, T - 0.4);
  const d1 = N('结论：发动机 am + 正在读 reading，一个都不能少。', T);
  K.at(T + 0.2).text('I am reading an English storybook right now.', ox + 160, oy + 480, 56);
  { const a0 = ox + 160 + K.measure('I ', 56), a1 = a0 + K.measure('am', 56), r0 = a0 + K.measure('am ', 56), r1 = r0 + K.measure('reading', 56);
    K.rect(a0 - 10, oy + 425, a1 - a0 + 20, 75, { col: OR, w: 5 }).rect(r0 - 10, oy + 425, r1 - r0 + 20, 75, { col: OR, w: 5 }); }
  const en = 'I am reading an English storybook right now.', st = T + 0.8;
  T = Math.max(T + d1, st + say(st, en, { word: 'am reading', key: ['am', 'reading'], zh: '我此刻正在读一本英语故事书。' }));
  K.at(T - 1.0).text('口诀：此刻正在做，am / is / are 加 V-ing，缺一不可！', ox + 160, oy + 640, 50, { col: OR, rate: 12 });
  T += N('口诀：此刻正在做，am / is / are 加 V-ing，缺一不可！', T) + 0.2;
}

// ───────── 11 预测：Look! The boy is jumping. ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.4);
  const d1 = N('预测：「看！那个男孩正在跳！」这一秒正在发生，发动机该怎么放？先想 3 秒！', T);
  K.at(T + 0.2).text('🔮 看！那个男孩正在跳！', ox + 130, oy + 250, 60);
  K.text('→  Look! The boy ___.  ( is jumping / jumping )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.0 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.0 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 4.6);
  const d2 = N('揭晓：The boy 是单三，发动机用 is，再加 jumping：Look! The boy is jumping.', T);
  K.at(T + 0.2).text('Look! The boy is jumping.', ox + 130, oy + 480, 62, { col: OR });
  const en = 'Look! The boy is jumping.', w = 'Look boy is jumping', st = T + 0.8, jt = wordT(st, en, w, 'jumping');
  const boy = K.actor({ keys: [[0, 'l_jc']], x: ox + 1300, ground: oy + 1000, h: 400, reveal: T + 0.5 });
  for (let k = 0; k < 4; k++) boy.keys.push([jt - 0.3 + k * 0.8, 'l_jc'], [jt + k * 0.8, 'l_ja']);
  boy.dy = t => { const k = (t - jt) / 0.8; return k < 0 || k > 4 ? 0 : -Math.sin((k % 1) * Math.PI) * 120; };
  K.pop(jt, 'is jumping', ox + 800, oy + 640, 84, { out: jt + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['is', 'jumping'], zh: '看！那个男孩正在跳！' })) + 0.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('现在进行时是一台录像机：', ox + 220, oy + 350, 58);
  K.text('拍下这一秒正在做、还没停下的动作', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：此刻正在做，am / is / are 加 V-ing，', ox + 220, oy + 650, 54);
  K.text('缺一不可！', ox + 220, oy + 740, 54);
  K.text('⏳ 时×体矩阵 · ② 现在进行时', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
