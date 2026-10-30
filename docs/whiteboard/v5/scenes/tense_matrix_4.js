// ⏳ 时×体矩阵 · ④ 一般将来时 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/tense_matrix.js 案例 4；对照清单 lab/INVENTORY_TM4_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/tm4.js（人物先行帧库 cast/：Leo 放风筝、提礼物走路、爷爷奶奶、野餐、聚会、踢球、游泳）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/tm4.js';

export default function build() {
const K = scene({ sprites: SP, stretch: 1.5 });
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



// 望远镜（站在「现在」看向右边「将来」）
const scope = (x, y, from, s = 1) => { K.at(from).path([[x, y], [x + 170 * s, y - 50 * s], [x + 185 * s, y + 5 * s], [x + 15 * s, y + 55 * s], [x, y]], { w: 5 }).ellipse(x + 182 * s, y - 22 * s, 40 * s, 70 * s, { w: 5, col: OR }).line(x + 60 * s, y + 40 * s, x + 30 * s, y + 160 * s, { w: 4 }).line(x + 60 * s, y + 40 * s, x + 100 * s, y + 160 * s, { w: 4 }); };
let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  K.narr('明天、下周要做的事，英语怎么说？举起望远镜看向未来！', 0.1, 5.8);
  K.at(0.3).text('④ 一般将来时', ox + 260, oy + 400, 130);
  K.text('将来 × 一般', ox + 270, oy + 530, 72, { col: OR });
  K.rect(ox + 1180, oy + 300, 470, 90, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 1215, oy + 362, 48);
  K.rect(ox + 1180, oy + 420, 470, 90, { w: 4, rough: 1.4 }).text('📜 真实词源', ox + 1215, oy + 482, 48);
  const menu = ['① 时间轴', '② 时×体格子', '③ 公式', '④ 例句', '⑤ 信号词·陷阱', '🔮 预测'];
  let x = ox + 230; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 680, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 728, 40, { col: GREY, rate: 30 }); x += w + 24; });
  scope(ox + 1450, oy + 900, 2.6, 0.9);
  T = 6.0;
}

// ───────── 2 时间轴：am / are going to swim ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.4).arrow(ox + 180, oy + 300, ox + 1740, oy + 300, { w: 6, speed: 3000, head: 40 });
  [[450, '过去 Past', INK], [960, '现在 Now', INK], [1470, '将来 Future', OR]].forEach(([x, s, c]) => { K.line(ox + x, oy + 278, ox + x, oy + 322, { w: 5, col: c, min: 0.08 }); K.text(s, ox + x - K.measure(s, 52) / 2, oy + 385, 52, { col: c }); });
  const en = 'Past, now, future. Am, are going to. Be going to. We are going to swim.', w = 'Past Now Future am are I We am are going to are going to be going to', st = T + 2.6, swt = wordT(st, en, w, 'swim');
  K.at(st + 4).text('am / are going to', ox + 1250, oy + 520, 56, { col: OR, rate: 30 });
  // 将来那头：一个泳池（还没下水 → 读到 swim 时游起来）
  K.rect(ox + 1200, oy + 700, 560, 220, { w: 4, fill: '#cfe3f3', fillW: 2 });
  const keys = [[0, 'sw0']]; for (let k = 0; k < 10; k++) keys.push([swt + k * 0.35, ['sw0', 'sw1', 'sw2', 'sw3'][k % 4]]);
  K.actor({ keys, x: ox + 1480, ground: oy + 880, h: 170, reveal: swt - 0.6 });
  T = st + say(st, en, { word: w, key: ['going', 'swim'], zh: '过去、现在、将来。我打算游泳。我们打算游泳。' }) + 0.4;
}

// ───────── 3 时×体矩阵 + 望远镜 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.4);
  const d1 = N('一般将来时：在矩阵里，它是「将来」这一列和「一般」这一行交叉的格子。', T);
  const x0 = ox + 330, y0 = oy + 200, cw = 260, rh = 105;
  K.at(T + 0.1).text('体＼时', ox + 150, oy + 175, 40, { col: GREY });
  ['过去', '现在', '将来'].forEach((s, i) => K.text(s, x0 + cw * (i + .5) - 48, oy + 175, 48, { col: i === 2 ? OR : INK }));
  ['一般', '进行', '完成'].forEach((s, j) => K.text(s, ox + 170, y0 + rh * (j + .5) + 16, 48, { col: j === 0 ? OR : INK }));
  K.rect(x0, y0, cw * 3, rh * 3, { w: 4, rough: 1.0 });
  for (let i = 1; i < 3; i++) K.line(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, { w: 3, col: GREY, min: 0.1 });
  for (let j = 1; j < 3; j++) K.line(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, { w: 3, col: GREY, min: 0.1 });
  K.rect(x0 + cw * 2 + 10, y0 + 10, cw - 20, rh - 20, { col: OR, w: 6, fill: OR2, rough: 1.4, speed: 1500 });
  K.text('一般将来时', x0 + cw * 2 + 44, y0 + 63, 32, { col: OR });
  T += d1;
  const d2 = N('望远镜：比喻：站在「现在」，往右边的「将来」看过去，看到明天要做的事。', T);
  K.at(T + 0.1).arrow(ox + 180, oy + 760, ox + 1750, oy + 760, { w: 5, speed: 3000 });
  [[400, '过去'], [800, '现在'], [1450, '将来']].forEach(([x, s]) => K.text(s, ox + x - 40, oy + 840, 40, { col: s === '将来' ? OR : GREY, rate: 30 }));
  scope(ox + 720, oy + 620, T + 0.8);
  // 视线：虚线扫到将来
  K.prop((g, t) => { const q = Math.min(1, (t - (T + 1.6)) / 0.8); if (q <= 0) return; g.save(); g.strokeStyle = OR; g.lineWidth = 4; g.setLineDash([16, 14]); g.beginPath(); g.moveTo(ox + 920, oy + 595); g.lineTo(ox + 920 + 520 * q, oy + 560); g.stroke(); g.restore(); }, { from: T + 1.6 });
  K.at(T + 2.4).text('tomorrow?', ox + 1400, oy + 560, 48, { col: OR });
  T += d2 + 0.3;
}

// ───────── 4 公式：方案 A will / 方案 B be going to + 放风筝 ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.4);
  const d1 = N('will：将来时有两个方案。方案 A：will 原意是「决心」，表示临时决定或一定会发生。', T);
  K.at(T + 0.1).text('公式：', ox + 120, oy + 150, 54, { col: GREY });
  K.text('方案A：will + 动词原形（意愿/临时决定/客观预测）', ox + 120, oy + 240, 48, { rate: 30 });
  K.text('📜 查证：will 在古英语里原意是「想要、愿意」；「决心」是名词 will 的意思。', ox + 120, oy + 310, 36, { col: GREY, rate: 40 });
  T += d1;
  const d2 = N('be going to：方案 B：「人已经走在路上了」，表示早有计划，或有迹象马上要发生。', T);
  K.at(T + 0.1).text('方案B：am/is/are going to + 动词原形（早有计划/有迹象要发生）', ox + 120, oy + 400, 48, { rate: 30 });
  T += d2;
  const d3 = N('情态助动词：will 这样的帮手词，所有人称都一样，后面永远接动词原形。', T);
  K.at(T + 0.1).text('I / He / We', ox + 120, oy + 530, 58);
  K.text('will fly a kite in the park tomorrow.', ox + 120 + K.measure('I / He / We ', 58), oy + 530, 58, { col: OR, rate: 24 });
  K.text('人人通用', ox + 1560, oy + 620, 50, { col: OR });
  T += d3;
  // 公园：两棵树 + 放风筝跑过去
  K.at(T).circle(ox + 1550, oy + 790, 150, { w: 4, col: GREY }).line(ox + 1550, oy + 865, ox + 1550, oy + 990, { w: 4, col: GREY });
  const en = 'He will fly a kite in the park tomorrow.', w = 'He fly a kite in the park will fly a kite in the park tomorrow', st = T + 0.4, ft = wordT(st, en, w, 'fly');
  K.actor({ keys: [[0, 'l_kite']], walk: { keys: ['l_kite', 'l_kite'], x0: ox + 250, x1: ox + 1250, t0: ft - 0.4, t1: ft + 4.0, step: 9999 }, x: ox + 250, ground: oy + 1000, h: 360, reveal: st, bob: 9 });
  K.pop(ft, 'will fly', ox + 900, oy + 680, 80, { out: ft + 2.6 });
  T = st + say(st, en, { word: w, key: ['will', 'fly'], zh: '他明天会在公园里放风筝。' }) + 0.3;
}

// ───────── 5 Leo is going to visit his grandparents ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.4);
  const d1 = N('be going to 里的 be 要跟着主语变：Leo 是单三，用 is。', T);
  K.at(T + 0.1).text('Leo', ox + 160, oy + 200, 60);
  K.text('is going to visit his grandparents this weekend.', ox + 160 + K.measure('Leo ', 60), oy + 200, 60, { col: OR, rate: 24 });
  K.text('be 随主语变', ox + 1480, oy + 300, 54, { col: OR });
  const en = 'Leo is going to visit his grandparents this weekend.', st = T + 1.0, A0 = T + 0.6;
  T = Math.max(T + d1, st + say(st, en, { word: 'is going to', key: ['is', 'going'], zh: '里奥这个周末打算去看爷爷奶奶。' }));
  const w2 = 'Leo visit his grandparents this weekend', vt = wordT(T, en, w2, 'visit');
  K.actor({ keys: [[0, 'l_w0']], walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 250, x1: ox + 1050, t0: vt - 1.0, t1: vt + 2.8, step: 55 }, x: ox + 250, ground: oy + 1000, h: 400, reveal: A0 });
  K.actor({ keys: [[0, 'grand']], x: ox + 1500, ground: oy + 1000, h: 440, reveal: A0 + 0.4, bob: 3 });
  K.pop(vt + 1.6, 'visit', ox + 1250, oy + 520, 84, { out: vt + 3.6 });
  T += say(T, en, { word: w2, key: ['visit'], zh: '里奥这个周末打算去看爷爷奶奶。' }) + 0.3;
}

// ───────── 6 They are going to have a picnic ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.4);
  const d1 = N('They 是复数，用 are going to，后面接原形 have。', T);
  K.at(T + 0.1).text('They', ox + 160, oy + 200, 62);
  K.text('are going to have a picnic next Sunday.', ox + 160 + K.measure('They ', 62), oy + 200, 62, { col: OR, rate: 24 });
  K.text('复数 are', ox + 1500, oy + 300, 56, { col: OR });
  // 日历：下周日
  K.at(T + 0.8).rect(ox + 1400, oy + 420, 300, 260, { w: 5 }).line(ox + 1400, oy + 490, ox + 1700, oy + 490, { w: 4, col: OR }).text('Sun', ox + 1500, oy + 470, 40, { col: OR }).text('7', ox + 1520, oy + 620, 90);
  const en = 'They are going to have a picnic next Sunday.', w = 'They have picnic next Sunday are going to have a picnic next Sunday', st = T + 1.2, ht = wordT(st, en, w, 'picnic');
  K.actor({ keys: [[0, 'picnic']], x: ox + 750, ground: oy + 1000, h: 440, reveal: T + 1.0 });
  K.pop(ht, 'have a picnic', ox + 1150, oy + 780, 70, { out: ht + 2.6 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['are', 'have'], zh: '他们下周日要去野餐。' })) + 0.3;
}

// ───────── 7 There will be a football match（后面回到这块写结论）─────────
const MATCH = 6;
{
  const [ox, oy] = REG(MATCH); go(MATCH, T - 0.4);
  const d1 = N('There be 句型：表示「某处有某物」。它的将来时是 There will be 或 There is going to be。', T);
  K.at(T + 0.1).text('There', ox + 140, oy + 200, 58);
  K.text('will be (= is going to be) a football match tomorrow.', ox + 140 + K.measure('There ', 58), oy + 200, 58, { col: OR, rate: 24 });
  K.text('黄金考点', ox + 1550, oy + 300, 54, { col: OR });
  // 球场
  K.at(T + 1.4).rect(ox + 250, oy + 600, 1420, 400, { w: 5, col: '#6b8f5e' }).line(ox + 960, oy + 600, ox + 960, oy + 1000, { w: 4, col: '#6b8f5e' }).circle(ox + 960, oy + 800, 160, { w: 4, col: '#6b8f5e' });
  const en = 'There is going to be a football match.', w = 'There football match is going to be There is going to be', st = T + 1.4, mt = wordT(st, en, w, 'match');
  const boy = K.actor({ keys: [[0, 'kick0']], x: ox + 600, ground: oy + 960, h: 360, reveal: mt - 0.6 });
  [mt, mt + 1.0, mt + 2.0].forEach(kt => boy.keys.push([kt - 0.4, 'kick0'], [kt - 0.2, 'kick1'], [kt, 'kick2'], [kt + 0.5, 'kick0']));
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['be'], zh: '将会有一场足球赛。' })) + 0.3;
}

// ───────── 8 信号词 + 陷阱 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  const d1 = N('信号词：tomorrow、next week、this weekend、soon，都在说将来。', T);
  K.at(T + 0.1).text('信号词：', ox + 120, oy + 170, 56, { col: OR });
  K.text('tomorrow (明天) · next week/month/year (下周/下月/明年) · this evening/weekend (今晚/本周末) ·', ox + 120, oy + 260, 36, { rate: 40 });
  K.text('soon (不久) · in the future', ox + 120, oy + 330, 36, { rate: 40 });
  T += d1;
  T += say(T, 'Next week, next year, this evening, soon, in the future.', { word: 'week year evening soon in the future', key: ['soon', 'future'], zh: '下周、明年、今天晚上、很快、将来。' });
  scope(ox + 1550, oy + 430, T - 3.0, 0.7);
  const d2 = N('陷阱：别受中文「将要有」影响写 have！「某处有」永远用 be：There will be。', T);
  K.at(T + 0.1).text('陷阱：', ox + 120, oy + 560, 56, { col: OR });
  K.text('There is going to have', ox + 120, oy + 680, 58);
  K.cross(ox + 120 + K.measure('There is going to ', 58) - 8, oy + 660, ox + 120 + K.measure('There is going to have', 58) + 8, oy + 660);
  K.text('→', ox + 820, oy + 680, 58, { col: OR });
  K.text('There will be / There is going to be', ox + 900, oy + 680, 58, { col: OR, rate: 24 });
  T += d2 + 0.3;
}

// ───────── 7′ 回到球场板：结论 + 口诀 ─────────
{
  const [ox, oy] = REG(MATCH); go(MATCH, T - 0.4);
  const d1 = N('结论：There be 的将来时，就是 There will be。', T);
  K.at(T + 0.2).text('There will be (= is going to be) a football match tomorrow.', ox + 140, oy + 400, 50);
  { const a0 = ox + 140 + K.measure('There ', 50), a1 = a0 + K.measure('will be', 50); K.rect(a0 - 10, oy + 352, a1 - a0 + 20, 66, { col: OR, w: 5 }); }
  const en = 'There will be a football match tomorrow.', st = T + 0.8;
  T = Math.max(T + d1, st + say(st, en, { word: 'will be', key: ['will', 'be'], zh: '明天会有一场足球赛。' }));
  K.at(T - 1.2).text('口诀：临时决定用 will，早有计划用 be going to，后面都跟原形！', ox + 140, oy + 500, 46, { col: OR, rate: 14 });
  T += N('口诀：临时决定用 will，早有计划用 be going to，后面都跟动词原形！', T) + 0.2;
}

// ───────── 11 预测：There will be a party tomorrow. ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.4);
  const d1 = N('预测：「明天会有一个聚会」：某处有，用 will be 还是 will have？先想 3 秒！', T);
  K.at(T + 0.2).text('🔮 明天会有一个聚会。', ox + 130, oy + 250, 60);
  K.text('→  There ___ a party tomorrow.  ( will be / will have )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：「某处有」永远用 be：There will be a party tomorrow.', T);
  K.at(T + 0.2).text('There will be a party tomorrow.', ox + 130, oy + 480, 62, { col: OR });
  const en = 'There will be a party tomorrow.', w = 'There will be party tomorrow', st = T + 0.8, pt = wordT(st, en, w, 'party');
  K.actor({ keys: [[0, 'party']], x: ox + 1300, ground: oy + 1000, h: 420, reveal: pt - 0.6, bob: 7 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['will', 'be'], zh: '明天会有一个聚会。' })) + 0.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('一般将来时是一架望远镜：', ox + 220, oy + 350, 58);
  K.text('站在现在，看向明天要做的事', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：临时决定用 will，早有计划用 be going to，', ox + 220, oy + 650, 54);
  K.text('后面都跟原形！', ox + 220, oy + 740, 54);
  K.text('⏳ 时×体矩阵 · ④ 一般将来时', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
