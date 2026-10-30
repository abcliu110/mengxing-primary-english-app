// ⏳ 时×体矩阵 · ③ 一般过去时 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/tense_matrix.js 案例 3；对照清单 lab/INVENTORY_TM3_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/tm3.js（人物先行帧库 cast/：Leo 拍照、Mia 学习 / 哭、公交车、聚会、摇头没去、Leo 提礼物走路、踢球）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/tm3.js';

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


// 老照片：发黄的相框（画面只由 t 决定）
const photo = (x, y, w, h, from, label) => { K.prop((g, t) => { const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = q; g.translate(x + w / 2, y + h / 2); g.rotate(-0.05); g.fillStyle = '#f3e3c3'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h); g.strokeStyle = '#b89a6a'; g.lineWidth = 3; g.strokeRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 70); g.restore(); }, { from }); if (label) K.at(from + 0.4).text(label, x + 40, y + h - 22, 40, { col: GREY }); };
let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  K.narr('昨天、上周末发生的事，英语就像翻开一张老照片。', 0.1, 5.6);
  K.at(0.3).text('③ 一般过去时', ox + 260, oy + 400, 130);
  K.text('过去 × 一般体', ox + 270, oy + 530, 72, { col: OR });
  K.rect(ox + 1180, oy + 300, 470, 90, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 1215, oy + 362, 48);
  const menu = ['① 时间轴', '② 时×体格子', '③ 公式', '④ 例句', '⑤ 信号词·陷阱', '🔮 预测'];
  let x = ox + 230; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 680, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 728, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.pop(1.2, '📷', ox + 1700, oy + 520, 110, { out: 5.4 });
  K.actor({ keys: [[0, 'cam']], x: ox + 1550, ground: oy + 1150, h: 300, reveal: 1.0 });
  T = 5.8;
}

// ───────── 2 时间轴：Yesterday ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.4).arrow(ox + 180, oy + 300, ox + 1740, oy + 300, { w: 6, speed: 3000, head: 40 });
  [[450, '过去 Past', OR], [960, '现在 Now', INK], [1470, '将来 Future', INK]].forEach(([x, s, c]) => { K.line(ox + x, oy + 278, ox + x, oy + 322, { w: 5, col: c, min: 0.08 }); K.text(s, ox + x - K.measure(s, 52) / 2, oy + 385, 52, { col: c }); });
  const en = 'Past, now, future. Yesterday.', w = 'Past Now Future yesterday', st = T + 2.6, yt = wordT(st, en, w, 'yesterday');
  photo(ox + 300, oy + 500, 340, 280, yt - 0.3); K.arrow(ox + 450, oy + 490, ox + 450, oy + 330, { col: OR, w: 4, head: 20 });
  K.pop(yt, 'yesterday', ox + 1100, oy + 640, 84, { out: yt + 2.6 });
  T = st + say(st, en, { word: w, key: ['yesterday'], zh: '过去、现在、将来。昨天。' }) + 0.4;
}

// ───────── 3 时×体矩阵 + 历史老照片 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.4);
  const d1 = N('一般过去时：在矩阵里，它是「过去」这一列和「一般」这一行交叉的格子。', T);
  const x0 = ox + 330, y0 = oy + 200, cw = 260, rh = 105;
  K.at(T + 0.1).text('体＼时', ox + 150, oy + 175, 40, { col: GREY });
  ['过去', '现在', '将来'].forEach((s, i) => K.text(s, x0 + cw * (i + .5) - 48, oy + 175, 48, { col: i === 0 ? OR : INK }));
  ['一般', '进行', '完成'].forEach((s, j) => K.text(s, ox + 170, y0 + rh * (j + .5) + 16, 48, { col: j === 0 ? OR : INK }));
  K.rect(x0, y0, cw * 3, rh * 3, { w: 4, rough: 1.0 });
  for (let i = 1; i < 3; i++) K.line(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, { w: 3, col: GREY, min: 0.1 });
  for (let j = 1; j < 3; j++) K.line(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, { w: 3, col: GREY, min: 0.1 });
  K.rect(x0 + 10, y0 + 10, cw - 20, rh - 20, { col: OR, w: 6, fill: OR2, rough: 1.4, speed: 1500 });
  K.text('一般过去时', x0 + 44, y0 + 63, 32, { col: OR });
  T += d1;
  const d2 = N('历史老照片：比喻：咔嚓一下，把昨天的事定格在过去。事情已经做完，结束了。', T);
  K.actor({ keys: [[0, 'cam']], x: ox + 1250, ground: oy + 950, h: 420, reveal: T + 0.2 });
  K.pop(T + 1.4, '咔嚓！', ox + 1450, oy + 420, 64, { out: T + 2.6 });
  photo(ox + 1480, oy + 560, 360, 300, T + 1.6); K.at(T + 1.3).text('yesterday', ox + 1530, oy + 830, 40, { col: GREY });
  T += d2 + 0.3;
}

// ───────── 4 公式 + 博物馆：visited / took ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.4);
  const d1 = N('过去式：动词表示「过去」时变的样子，比如 visit → visited、take → took。', T);
  K.at(T + 0.1).text('公式：', ox + 120, oy + 160, 56, { col: GREY });
  K.text('主语 + 动词过去式 V-ed / 不规则过去式   ｜   状态：was (单) / were (复)', ox + 120, oy + 250, 46, { rate: 30 });
  T += d1;
  const d2 = N('好消息：过去式「不看主语脸色」，I、He、They 全都一样，不用管单三！', T);
  K.at(T + 0.1).text('I / He / They', ox + 120, oy + 380, 58);
  K.text('visited the museum and took many photos yesterday.', ox + 120 + K.measure('I / He / They ', 58), oy + 380, 58, { col: OR, rate: 24 });
  K.text('+ed / 不规则', ox + 1500, oy + 470, 50, { col: OR });
  // 博物馆
  const mx = ox + 1100; K.at(T + 1.4).path([[mx - 30, oy + 640], [mx + 260, oy + 540], [mx + 550, oy + 640]], { w: 5 }).rect(mx, oy + 640, 520, 330, { w: 5 });
  [0, 1, 2, 3].forEach(i => K.line(mx + 70 + i * 125, oy + 670, mx + 70 + i * 125, oy + 960, { w: 4, col: GREY, min: 0.05 }));
  K.text('博物馆', mx + 190, oy + 615, 40, { col: GREY });
  const en = 'I visited the museum and took many photos yesterday.', st = T + 1.0, tt = wordT(st, en, 'visited', 'took');
  K.actor({ keys: [[0, 'cam']], x: ox + 600, ground: oy + 1000, h: 420, reveal: T + 0.8 });
  [tt, tt + 0.7, tt + 1.4].forEach((t, i) => { K.pop(t, '📷', ox + 800, oy + 640 - i * 30, 60, { out: t + 0.6 }); photo(ox + 120 + i * 30, oy + 560 + i * 30, 200, 160, t + 0.1); });
  T = Math.max(T + d2, st + say(st, en, { word: 'visited', key: ['visited', 'took'], zh: '昨天我参观了博物馆，拍了很多照片。' }));
  const d3 = N('规则动词：直接加 -ed 就变成过去式的动词，比如 visit → visited。', T);
  K.at(T + 0.2).text('visit → visited', ox + 120, oy + 510, 50, { col: OR, rate: 30 });
  T += d3;
  const d4 = N('不规则动词：过去式不按 -ed 规律、要单独记的动词，比如 take → took。', T);
  K.at(T + 0.2).text('take → took', ox + 560, oy + 510, 50, { col: OR, rate: 30 });
  const en2 = 'I visited the museum and took many photos. Visit, take.';
  T += Math.max(d4, say(T + 0.2, en2, { word: 'the museum and took many photos visit take', key: ['visit', 'take'], zh: '我参观了博物馆，拍了很多照片。参观、拍。' }) + 0.2) + 0.2;
}

// ───────── 5 Mia studied / cried：y → i + ed ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.4);
  const d1 = N('辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。', T);
  K.at(T + 0.1).text('Mia', ox + 160, oy + 220, 62);
  K.text('studied hard and cried when she lost her pen.', ox + 160 + K.measure('Mia ', 62), oy + 220, 62, { col: OR, rate: 24 });
  K.text('y → i + ed', ox + 1500, oy + 330, 56, { col: OR });
  K.text('study → studied   cry → cried', ox + 160, oy + 330, 46, { col: GREY, rate: 30 });
  const en = 'Mia studied hard and cried when she lost her pen.', w = 'Mia studied hard cried when she lost her pen study cry', st = T + 1.0;
  const sdt = wordT(st, en, w, 'studied'), crt = wordT(st, en, w, 'cried');
  K.actor({ keys: [[0, 'm_study']], x: ox + 700, ground: oy + 1000, h: 440, reveal: T + 0.6, bob: 2, until: crt - 0.2 });
  K.actor({ keys: [[0, 'm_cry']], x: ox + 700, ground: oy + 1000, h: 440, reveal: crt - 0.3, bob: 9 });
  K.pop(sdt, 'studied', ox + 1300, oy + 560, 80, { out: sdt + 2.0 }); K.pop(crt, 'cried', ox + 1300, oy + 700, 80, { out: crt + 2.4 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['studied', 'cried'], zh: '米娅学习很努力，丢了笔时哭了。' })) + 0.3;
}

// ───────── 6 The bus stopped：双写 + ed（后面回到这块写结论）─────────
const BUS = 5;
{
  const [ox, oy] = REG(BUS); go(BUS, T - 0.4);
  const d1 = N('stop 是重读闭音节：双写 p 再加 -ed，stopped；plan 也一样变 planned。', T);
  K.at(T + 0.1).text('The bus', ox + 160, oy + 200, 62);
  K.text('stopped at the station five minutes ago.', ox + 160 + K.measure('The bus ', 62), oy + 200, 62, { col: OR, rate: 24 });
  K.text('双写 + ed', ox + 1500, oy + 300, 56, { col: OR });
  // 车站牌 + 路
  K.at(T + 1.0).line(ox + 100, oy + 1000, ox + 1820, oy + 1000, { w: 4, col: GREY, min: 0.05 });
  K.line(ox + 1500, oy + 1000, ox + 1500, oy + 700, { w: 5 }).rect(ox + 1420, oy + 620, 160, 90, { w: 5, col: OR }).text('车站', ox + 1452, oy + 680, 44, { col: OR });
  const en = 'The bus stopped at the station five minutes ago. Stop, ed.', w = 'bus at station five minutes ago stop ed', st = T + 1.8, sp = wordT(st, en, w, 'stopped');
  K.actor({ keys: [[0, 'bus']], walk: { keys: ['bus', 'bus'], x0: ox + 250, x1: ox + 1220, t0: sp - 2.4, t1: sp, step: 9999, ease: 'power2.out' }, x: ox + 250, ground: oy + 1000, h: 300, reveal: T + 1.2 });
  K.pop(sp, 'stopped', ox + 900, oy + 560, 84, { out: sp + 2.4 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['stopped'], zh: '公交车五分钟前停在了车站。停，加 -ed。' })) + 0.2;
  const en2 = 'Plan, planned. Be, was. It was fun. I study English. Babies cry.';
  K.at(T).text('plan → planned   be → was', ox + 160, oy + 420, 46, { col: GREY, rate: 30 });
  T += say(T, en2, { word: 'plan planned be It study cry', key: ['planned', 'was'], zh: '计划，计划了。是，以前是。很好玩。' }) + 0.3;
}

// ───────── 7 We were happy at the party：was / were ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.4);
  const d1 = N('was / were：be 动词的过去式：I、He、She、It 用 was，We、You、They 用 were。', T);
  K.at(T + 0.1).text('We', ox + 160, oy + 220, 62);
  K.text('were very happy at the party last night.', ox + 160 + K.measure('We ', 62), oy + 220, 62, { col: OR, rate: 24 });
  K.text('过去的状态', ox + 1480, oy + 330, 56, { col: OR });
  K.text('I / He / She / It → was     We / You / They → were', ox + 160, oy + 420, 46, { col: GREY, rate: 30 });
  const en = 'I was happy. They were happy. He was at home.';
  T = Math.max(T + d1, T + 0.8 + say(T + 0.8, en, { word: 'was were I He They', key: ['was', 'were'], zh: '我很开心。他们很开心。他在家。' }));
  const en2 = 'We were very happy at the party last night.', w2 = 'We very happy party last night were very happy at the party last night', wt = wordT(T, en2, w2, 'were');
  K.actor({ keys: [[0, 'party']], x: ox + 960, ground: oy + 1050, h: 460, reveal: wt - 0.8, bob: 7 });
  K.pop(wt, 'were', ox + 1500, oy + 640, 90, { out: wt + 2.4 });
  T += say(T, en2, { word: w2, key: ['were'], zh: '我们昨晚在聚会上很开心。' }) + 0.3;
}

// ───────── 8 信号词：went there / got home ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  const d1 = N('信号词：yesterday、last night、…ago、just now，一看就是过去的事。', T);
  K.at(T + 0.1).text('信号词：', ox + 140, oy + 180, 56, { col: OR });
  K.text('yesterday (昨天) · last night/weekend/year (昨晚/上周末/去年) ·', ox + 140, oy + 280, 46, { rate: 30 });
  K.text('...ago (…以前) · just now (刚才) · in 2022', ox + 140, oy + 360, 46, { rate: 30 });
  T += d1;
  const en = 'Last night, last year. We went there in May. I just got home.', w = 'year just in went there', wt = wordT(T, en, w, 'went');
  K.actor({ keys: [[0, 'l_w0']], walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 300, x1: ox + 1300, t0: wt - 0.4, t1: wt + 3.4, step: 55 }, x: ox + 300, ground: oy + 1000, h: 400, reveal: T + 0.2 });
  // 家
  const hx = ox + 1450; K.at(T + 0.6).rect(hx, oy + 720, 300, 280, { w: 5 }).path([[hx - 30, oy + 730], [hx + 150, oy + 600], [hx + 330, oy + 730]], { w: 5 }).rect(hx + 110, oy + 860, 80, 140, { w: 4, col: OR });
  K.pop(wt, 'went', ox + 900, oy + 600, 84, { out: wt + 2.2 });
  T += say(T, en, { word: w, key: ['went', 'got'], zh: '昨晚，去年。我们五月去了那里。我刚到家。' }) + 0.3;
}

// ───────── 9 陷阱：Did you went there? → Did you go there? ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.4);
  const d1 = N('陷阱：有 didn\'t 或 Did 时，「过去」已经被它们带走，后面的动词变回原形。', T);
  K.at(T + 0.1).text('陷阱：', ox + 140, oy + 200, 56, { col: OR });
  K.text('Did you went there?', ox + 140, oy + 320, 64);
  const ct = K.cur; K.cross(ox + 140 + K.measure('Did you ', 64) - 10, oy + 300, ox + 140 + K.measure('Did you went', 64) + 10, oy + 300);
  K.text('→', ox + 820, oy + 320, 64, { col: OR });
  K.text('Did you go there?', ox + 940, oy + 320, 64, { col: OR });
  // Did 把 -ed 带走：小箭头把 "-ed" 从 went 拉到 Did
  K.pop(ct + 0.4, '过去 → Did', ox + 500, oy + 440, 56, { out: ct + 3.0 });
  T += d1;
  const en = 'Did you go there? No, I didn\'t go. Go, went.', w = 'Did you go didn\'t Did you go there', nt = wordT(T, en, w, 'no');
  K.actor({ keys: [[0, 'l_no']], x: ox + 1400, ground: oy + 1000, h: 420, reveal: nt - 0.6, bob: 4 });
  K.pop(nt + 0.4, "didn't go", ox + 800, oy + 700, 80, { out: nt + 2.6 });
  T += say(T, en, { word: w, key: ['go', "didn't"], zh: '你去那里了吗？不，我没去。去，去了。' }) + 0.3;
}

// ───────── 6′ 回到公交车板：结论 + 口诀 ─────────
{
  const [ox, oy] = REG(BUS); go(BUS, T - 0.4);
  const d1 = N('结论：stop 双写 p，加 -ed，变成过去式 stopped。', T);
  K.at(T + 0.2).text('The bus stopped at the station five minutes ago.', ox + 160, oy + 520, 54);
  { const a0 = ox + 160 + K.measure('The bus ', 54), a1 = a0 + K.measure('stopped', 54); K.rect(a0 - 10, oy + 468, a1 - a0 + 20, 70, { col: OR, w: 5 }); }
  const en = 'The bus stopped at the station five minutes ago.', st = T + 0.8;
  T = Math.max(T + d1, st + say(st, en, { word: 'stopped', key: ['stopped'], zh: '公交车五分钟前停在了车站。' }));
  K.at(T - 1.2).text('口诀：过去的事用过去式，不看主语人人一样；见 did 变回原形！', ox + 160, oy + 600, 46, { col: OR, rate: 14 });
  T += N('口诀：过去的事用过去式，不看主语人人一样；见 did / didn\'t 变回原形！', T) + 0.2;
}

// ───────── 11 预测：Did you play football yesterday? ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.4);
  const d1 = N('预测：「你昨天踢足球了吗？」句首已经有 Did，后面用 play 还是 played？先想 3 秒！', T);
  K.at(T + 0.2).text('🔮 你昨天踢足球了吗？', ox + 130, oy + 250, 60);
  K.text('→  Did you ___ football yesterday?  ( play / played )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：Did 已经带走了「过去」，后面变回原形 play：Did you play football yesterday?', T);
  K.at(T + 0.2).text('Did you play football yesterday?', ox + 130, oy + 480, 62, { col: OR });
  const en = 'Did you play football yesterday? Yes, I played football yesterday.', w = 'Did you play played football yesterday', st = T + 0.8, pt = wordT(st, en, w, 'played');
  const boy = K.actor({ keys: [[0, 'kick0']], x: ox + 1300, ground: oy + 1000, h: 400, reveal: T + 0.5 });
  [pt, pt + 1.0].forEach(kt => boy.keys.push([kt - 0.4, 'kick0'], [kt - 0.2, 'kick1'], [kt, 'kick2'], [kt + 0.5, 'kick0']));
  K.pop(pt, 'played', ox + 800, oy + 640, 84, { out: pt + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['play', 'played'], zh: '你昨天踢足球了吗？是的，我昨天踢了足球。' })) + 0.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('一般过去时是一张老照片：', ox + 220, oy + 350, 58);
  K.text('事情在过去做完了，定格在那里', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：过去的事用过去式，不看主语人人一样；', ox + 220, oy + 650, 54);
  K.text('见 did 变回原形！', ox + 220, oy + 740, 54);
  K.text('⏳ 时×体矩阵 · ③ 一般过去时', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
