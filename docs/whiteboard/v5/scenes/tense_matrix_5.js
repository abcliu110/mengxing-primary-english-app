// ⏳ 时×体矩阵 · ⑤ 现在完成时 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/tense_matrix.js 案例 5；对照清单 lab/INVENTORY_TM5_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/tm5.js（人物先行帧库 cast/：Leo 摸空口袋找钥匙、Mia 举起写完的作业、王老师拖行李箱、Leo 放风筝 / 走路）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/tm5.js';

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



// 桥：从过去拱到现在（逐渐画出）
const bridge = (x0, x1, y, from, h = 150) => { K.at(from).curve([[x0, y], [(x0 + x1) / 2, y - h], [x1, y]], { w: 6, col: OR, speed: 1600 });
  for (let i = 1; i < 6; i++) { const x = x0 + (x1 - x0) * i / 6, yy = y - h * 4 * (i / 6) * (1 - i / 6) * 0.98; K.line(x, yy, x, y, { w: 3, col: OR2, min: 0.04, gap: 0.01 }); } };
let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  K.narr('「我把钥匙弄丢了」，为什么英语有时说 lost，有时说 have lost？', 0.1, 5.6);
  K.at(0.3).text('⑤ 现在完成时', ox + 260, oy + 400, 130);
  K.text('现在 × 完成体', ox + 270, oy + 530, 72, { col: OR });
  K.rect(ox + 1180, oy + 300, 470, 90, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 1215, oy + 362, 48);
  const menu = ['① 时间轴', '② 时×体格子', '③ 公式', '④ 例句', '⑤ 信号词·陷阱', '🔮 预测'];
  let x = ox + 230; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 680, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 728, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.pop(1.4, '✔', ox + 1550, oy + 900, 110, { out: 5.4 }); K.pop(2.2, '✔', ox + 1720, oy + 900, 110, { out: 5.4 });
  K.actor({ keys: [[0, 'l_key']], x: ox + 1250, ground: oy + 1150, h: 300, reveal: 1.0 });
  T = 5.8;
}

// ───────── 2 时间轴：Have, has, done + 桥 ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  K.at(T + 0.4).arrow(ox + 180, oy + 500, ox + 1740, oy + 500, { w: 6, speed: 3000, head: 40 });
  [[450, '过去 Past', INK], [960, '现在 Now', OR], [1470, '将来 Future', INK]].forEach(([x, s, c]) => { K.line(ox + x, oy + 478, ox + x, oy + 522, { w: 5, col: c, min: 0.08 }); K.text(s, ox + x - K.measure(s, 52) / 2, oy + 585, 52, { col: c }); });
  const en = 'Past, now, future. Have, has, done.', w = 'Past Now Future has done', st = T + 2.6, dt = wordT(st, en, w, 'done');
  bridge(ox + 450, ox + 960, oy + 470, dt - 0.6, 220);
  K.pop(dt, 'have / has + done', ox + 1250, oy + 780, 70, { out: dt + 2.6 });
  T = st + say(st, en, { word: w, key: ['have', 'has', 'done'], zh: '过去、现在、将来。have、has、过去分词。' }) + 0.4;
}

// ───────── 3 时×体矩阵 + 成果留存 + 桥 ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.4);
  const d1 = N('现在完成时：在矩阵里，它是「现在」这一列和「完成」这一行交叉的格子。', T);
  const x0 = ox + 330, y0 = oy + 200, cw = 260, rh = 105;
  K.at(T + 0.1).text('体＼时', ox + 150, oy + 175, 40, { col: GREY });
  ['过去', '现在', '将来'].forEach((s, i) => K.text(s, x0 + cw * (i + .5) - 48, oy + 175, 48, { col: i === 1 ? OR : INK }));
  ['一般', '进行', '完成'].forEach((s, j) => K.text(s, ox + 170, y0 + rh * (j + .5) + 16, 48, { col: j === 2 ? OR : INK }));
  K.rect(x0, y0, cw * 3, rh * 3, { w: 4, rough: 1.0 });
  for (let i = 1; i < 3; i++) K.line(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, { w: 3, col: GREY, min: 0.1 });
  for (let j = 1; j < 3; j++) K.line(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, { w: 3, col: GREY, min: 0.1 });
  K.rect(x0 + cw + 10, y0 + rh * 2 + 10, cw - 20, rh - 20, { col: OR, w: 6, fill: OR2, rough: 1.4, speed: 1500 });
  K.text('现在完成时', x0 + cw + 44, y0 + rh * 2 + 63, 32, { col: OR });
  T += d1;
  const d2 = N('完成体：像一个「成果留存」镜头：动作在过去做完了，但成果一直留着。', T);
  K.at(T + 0.1).arrow(ox + 180, oy + 820, ox + 1750, oy + 820, { w: 5, speed: 3000 });
  [[400, '过去'], [1150, '现在']].forEach(([x, s]) => K.text(s, ox + x - 40, oy + 900, 40, { col: s === '现在' ? OR : GREY, rate: 30 }));
  K.at(T + 0.8).text('✔', ox + 380, oy + 780, 70, { col: OR }).text('动作做完', ox + 300, oy + 700, 44);
  T += d2;
  const d3 = N('过去连通现在的桥：从过去搭一座桥到现在：动作在过去，结果留到现在。', T);
  bridge(ox + 420, ox + 1150, oy + 800, T + 0.4, 200);
  K.at(T + 1.8).text('🏆', ox + 1120, oy + 780, 70).text('结果留在现在', ox + 1230, oy + 700, 44, { col: OR });
  T += d3 + 0.3;
}

// ───────── 4 公式 + I lost my key / I have lost my key ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.4);
  const d1 = N('have / has：本意是「现在手里拥有」；has 给单三主语用。', T);
  K.at(T + 0.1).text('公式：', ox + 120, oy + 160, 56, { col: GREY });
  K.text('have / has（现在拥有） + V-ed / 过去分词（已经做完的动作状态）', ox + 120, oy + 250, 48, { rate: 30 });
  T += d1;
  const d2 = N('过去分词：动词的另一种变身，表示「已经做完」，比如 finish → finished、go → gone。', T);
  K.at(T + 0.2).text('finish → finished    go → gone', ox + 120, oy + 340, 48, { col: OR, rate: 30 });
  T += d2;
  const d3 = N('I lost my key 只说丢了；I have lost my key 是丢了，现在还进不去门！', T);
  K.at(T + 0.1).text('I lost my key.', ox + 120, oy + 470, 54).text('I have lost my key.', ox + 120, oy + 560, 54, { col: OR });
  // 锁着的门
  const dx = ox + 1400; K.at(T + 1.0).rect(dx, oy + 560, 260, 430, { w: 5 }).circle(dx + 210, oy + 790, 30, { w: 4 }).rect(dx + 190, oy + 820, 40, 40, { w: 4, col: OR });
  const en = 'I lost my key. I have lost my key. Finish, go.', w = 'lost my key I lost my key I have lost my key finish go', st = T + 0.6, ht = wordT(st, en, w, 'have');
  K.actor({ keys: [[0, 'l_key']], x: ox + 1000, ground: oy + 1000, h: 420, reveal: T + 0.4, bob: 2 });
  K.pop(ht + 0.8, '进不去门！', ox + 1530, oy + 500, 64, { out: ht + 3.4 });
  K.prop((g, t) => { const k = t - (ht + 0.8); if (k < 0 || k > 2) return; g.save(); g.strokeStyle = OR; g.lineWidth = 6; const s = Math.sin(k * 30) * 6; g.beginPath(); g.moveTo(dx - 30 + s, oy + 700); g.lineTo(dx - 60 + s, oy + 690); g.moveTo(dx - 30 + s, oy + 760); g.lineTo(dx - 65 + s, oy + 760); g.stroke(); g.restore(); }, { from: ht + 0.8 });
  T = Math.max(T + d3, st + say(st, en, { word: w, key: ['lost', 'have'], zh: '我丢了钥匙。我把钥匙弄丢了（现在还没找到）。完成、去。' })) + 0.3;
}

// ───────── 5 have already finished the homework（后面回到这块写结论）─────────
const HW = 4;
{
  const [ox, oy] = REG(HW); go(HW, T - 0.4);
  const d1 = N('作业已经写完了，结果留在现在：现在可以出去玩啦！', T);
  K.at(T + 0.1).text('I / We / They', ox + 160, oy + 200, 60);
  K.text('have already finished the homework.', ox + 160 + K.measure('I / We / They ', 60), oy + 200, 60, { col: OR, rate: 24 });
  K.text('成果：能玩了', ox + 1440, oy + 300, 54, { col: OR });
  const en = 'They have already finished the homework.', w = 'I We They already the homework They have already finished the homework', st = T + 0.8, ft = wordT(st, en, w, 'finished');
  K.actor({ keys: [[0, 'm_hw']], x: ox + 600, ground: oy + 1000, h: 440, reveal: T + 0.6, until: ft + 2.0 });
  K.pop(ft, '✔', ox + 800, oy + 560, 100, { out: ft + 1.8 });
  K.actor({ keys: [[0, 'l_kite']], walk: { keys: ['l_kite', 'l_kite'], x0: ox + 500, x1: ox + 1500, t0: ft + 2.0, t1: ft + 6.0, step: 9999 }, x: ox + 500, ground: oy + 1000, h: 400, reveal: ft + 1.8, bob: 9 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['have', 'finished'], zh: '他们已经写完作业了。' })) + 0.4;
}

// ───────── 6 Mia has lived in Beijing for five years ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.4);
  const d1 = N('for + 时间段：表示持续了多久：从 5 年前一直住到现在。单三主语用 has。', T);
  K.at(T + 0.1).text('He / She / Mia', ox + 160, oy + 200, 60);
  K.text('has lived in Beijing for five years.', ox + 160 + K.measure('He / She / Mia ', 60), oy + 200, 60, { col: OR, rate: 24 });
  K.text('一直到现在', ox + 1480, oy + 300, 54, { col: OR });
  // 时间轴：5 年前 ━━━━ 现在（一年一个点）
  K.at(T + 0.8).arrow(ox + 200, oy + 480, ox + 1700, oy + 480, { w: 5, speed: 3000 });
  const en = 'Mia has lived in Beijing for five years.', w = 'He She Mia lived in Beijing for five years has lived in Beijing for five years', st = T + 1.0, yt = wordT(st, en, w, 'years');
  [0, 1, 2, 3, 4, 5].forEach(i => K.pop(yt - 3 + i * 0.4, i === 5 ? '现在' : String(2021 + i), ox + 300 + i * 240, oy + 440, 40, { col: i === 5 ? OR : GREY }));
  K.prop((g, t) => { const q = Math.min(1, (t - (yt - 3)) / 2.4); if (q <= 0) return; g.save(); g.strokeStyle = OR; g.lineWidth = 12; g.globalAlpha = 0.6; g.beginPath(); g.moveTo(ox + 300, oy + 480); g.lineTo(ox + 300 + 1200 * q, oy + 480); g.stroke(); g.restore(); }, { from: yt - 3 });
  // 北京的家
  const hx = ox + 1300; K.at(T + 1.4).rect(hx, oy + 700, 320, 280, { w: 5 }).path([[hx - 30, oy + 710], [hx + 160, oy + 580], [hx + 350, oy + 710]], { w: 5, col: OR }).rect(hx + 120, oy + 840, 80, 140, { w: 4 }).text('Beijing', hx + 360, oy + 960, 40, { col: GREY });
  K.actor({ keys: [[0, 'm_like']], x: ox + 900, ground: oy + 1000, h: 420, reveal: T + 1.2, bob: 2 });
  T = Math.max(T + d1, st + say(st, en, { word: w, key: ['has', 'lived', 'for'], zh: '米娅在北京住了五年了。' })) + 0.3;
}

// ───────── 7 been to / gone to ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.4);
  const d1 = N('have been to：去过某地，人已经回来了，留下一段人生经历。', T);
  K.at(T + 0.1).text('Have you', ox + 140, oy + 170, 56);
  K.text('ever been to the Great Wall?', ox + 140 + K.measure('Have you ', 56), oy + 170, 56, { col: OR, rate: 24 });
  K.text('去过·已回来', ox + 1500, oy + 170, 50, { col: OR });
  // 地点：这儿（左）—— 长城（右上）—— 上海（右下）
  K.at(T + 0.6).rect(ox + 140, oy + 420, 200, 120, { w: 4 }).text('这儿', ox + 190, oy + 500, 44);
  K.path([[ox + 1250, oy + 400], [ox + 1320, oy + 350], [ox + 1390, oy + 400], [ox + 1460, oy + 340], [ox + 1530, oy + 400], [ox + 1600, oy + 350], [ox + 1670, oy + 400]], { w: 5 }).text('长城', ox + 1400, oy + 460, 44, { col: GREY });
  K.rect(ox + 1400, oy + 760, 260, 160, { w: 4 }).text('上海', ox + 1475, oy + 860, 44, { col: GREY });
  const en = 'Have you ever been to the Great Wall?', st = T + 1.4, bt = wordT(st, en, 'ever been', 'been');
  // Leo：去长城再回来（来回两段走路）
  K.actor({ keys: [[0, 'l_w0']], walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 400, x1: ox + 1150, t0: bt - 1.4, t1: bt + 0.8, step: 55 }, x: ox + 400, ground: oy + 620, h: 260, reveal: T + 1.0, until: bt + 0.9 });
  K.actor({ keys: [[0, 'l_w0']], flip: true, walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 1150, x1: ox + 420, t0: bt + 0.9, t1: bt + 3.2, step: 55 }, x: ox + 1150, ground: oy + 620, h: 260, reveal: bt + 0.9 });
  K.pop(bt + 3.2, '↩ 回来了', ox + 600, oy + 380, 50, { out: bt + 5.5 });
  T = Math.max(T + d1, st + say(st, en, { word: 'ever been', key: ['been'], zh: '你去过长城吗？' }));
  const d2 = N('have gone to：去某地了，人还在上海或在路上，现在不在说话的地方。', T);
  K.at(T + 0.1).text('Mr Wang', ox + 140, oy + 280, 56);
  K.text('has gone to Shanghai.', ox + 140 + K.measure('Mr Wang ', 56), oy + 280, 56, { col: OR, rate: 24 });
  K.text('去了·还没回', ox + 1500, oy + 280, 50, { col: OR });
  const en2 = 'Have you been to the Great Wall? Mr Wang has gone to Shanghai.', w2 = 'you to Great Wall Mr Wang gone Shanghai has gone to Shanghai', st2 = T + 0.6, gt = wordT(st2, en2, w2, 'gone');
  K.actor({ keys: [[0, 'wang']], walk: { keys: ['wang', 'wang'], x0: ox + 300, x1: ox + 1250, t0: gt - 1.0, t1: gt + 3.0, step: 9999 }, x: ox + 300, ground: oy + 1000, h: 360, reveal: T + 0.4, bob: 6, fadeOut: [gt + 3.0, gt + 3.8] });
  K.pop(gt + 3.6, '人不在这儿', ox + 500, oy + 700, 56, { out: gt + 6 });
  T = Math.max(T + d2, st2 + say(st2, en2, { word: w2, key: ['been', 'gone'], zh: '你去过长城吗？王老师去上海了。' })) + 0.2;
  T += say(T, 'Have been to, have gone to. He has gone. She has done it.', { word: 'have been to have gone to He She', key: ['been', 'gone'], zh: '去过（回来了），去了（还没回来）。' }) + 0.3;
}

// ───────── 8 信号词 + 陷阱 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  const d1 = N('信号词：already、yet、just、ever、never、since、for，常和现在完成时一起出现。', T);
  K.at(T + 0.1).text('信号词：', ox + 120, oy + 170, 56, { col: OR });
  K.text('already (已经) · yet (还/尚) · just (刚刚) · ever (曾经) ·', ox + 120, oy + 260, 46, { rate: 30 });
  K.text('never (从不) · since (自从) · for + 时间段 (持续了…)', ox + 120, oy + 340, 46, { rate: 30 });
  T += d1;
  T += say(T, 'Already, yet, just, never, since. I have just done it.', { word: 'already yet just never since', key: ['just', 'done'], zh: '已经、还、刚刚、从未、自从。我刚做完。' });
  const d2 = N('陷阱：出现明确的过去时间点，就只能用一般过去时，不能用现在完成时。', T);
  K.at(T + 0.1).text('陷阱：', ox + 120, oy + 520, 56, { col: OR });
  K.text('句子里有 yesterday, last week, two days ago 这类过去时间点，不能用 have/has done！', ox + 120, oy + 620, 42, { rate: 30 });
  // 时间点钉子：一颗钉在过去的图钉，桥搭不过来
  K.at(T + 1.4).arrow(ox + 200, oy + 850, ox + 1700, oy + 850, { w: 5 }).circle(ox + 500, oy + 850, 40, { w: 5, col: OR, fill: OR2 }).text('yesterday', ox + 420, oy + 930, 40, { col: GREY });
  K.cross(ox + 600, oy + 760, ox + 1100, oy + 800);
  T = T + Math.max(d2, 0) ;
  T += say(T, 'Yesterday, last week, two days ago.', { word: 'yesterday last week two days ago', key: ['yesterday', 'ago'], zh: '昨天、上周、两天前。' }) + 0.3;
}

// ───────── 5′ 回到作业板：结论 + 口诀 ─────────
{
  const [ox, oy] = REG(HW); go(HW, T - 0.4);
  const d1 = N('结论：have + 过去分词 finished，作业写完的成果留到现在。', T);
  K.at(T + 0.2).text('I / We / They have already finished the homework.', ox + 160, oy + 420, 54);
  { const a0 = ox + 160 + K.measure('I / We / They ', 54), a1 = a0 + K.measure('have', 54), f0 = ox + 160 + K.measure('I / We / They have already ', 54), f1 = f0 + K.measure('finished', 54);
    K.rect(a0 - 10, oy + 370, a1 - a0 + 20, 68, { col: OR, w: 5 }).rect(f0 - 10, oy + 370, f1 - f0 + 20, 68, { col: OR, w: 5 }); }
  const en = 'We have already finished the homework.', st = T + 0.8;
  T = Math.max(T + d1, st + say(st, en, { word: 'have finished', key: ['have', 'finished'], zh: '我们已经写完作业了。' }));
  K.at(T - 1.2).text('口诀：过去做完，结果留到现在 → have / has + 过去分词！', ox + 160, oy + 520, 46, { col: OR, rate: 14 });
  T += N('口诀：过去做完，结果留到现在，就用 have / has + 过去分词！', T) + 0.2;
}

// ───────── 11 预测：I have finished my homework. ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.4);
  const d1 = N('预测：「我已经写完作业了」：have 后面用 finish 还是 finished？先想 3 秒！', T);
  K.at(T + 0.2).text('🔮 我已经写完作业了。', ox + 130, oy + 250, 60);
  K.text('→  I have ___ my homework.  ( finish / finished )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：have 后面跟过去分词 finished：I have finished my homework.', T);
  K.at(T + 0.2).text('I have finished my homework.', ox + 130, oy + 480, 62, { col: OR });
  const en = 'I have finished my homework.', w = 'I have finish finished my homework', st = T + 0.8, ft = wordT(st, en, w, 'finished');
  K.actor({ keys: [[0, 'm_hw']], x: ox + 1300, ground: oy + 1000, h: 420, reveal: T + 0.5 });
  K.pop(ft, '✔ finished', ox + 800, oy + 680, 80, { out: ft + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['have', 'finished'], zh: '我已经写完作业了。' })) + 0.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('现在完成时是一座桥：', ox + 220, oy + 350, 58);
  K.text('动作在过去做完，结果一直留到现在', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：过去做完，结果留到现在 →', ox + 220, oy + 650, 54);
  K.text('have / has + 过去分词！', ox + 220, oy + 740, 54);
  K.text('⏳ 时×体矩阵 · ⑤ 现在完成时', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
