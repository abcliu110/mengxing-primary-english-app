// ⏳ 时×体矩阵 · ① 一般现在时 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/tense_matrix.js 案例 1；对照清单 lab/INVENTORY_TM1_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/tm1.js（AI 绿幕帧：踢球、妈妈上课 / 开车、小鸟、牛奶 / 茶 / 果汁、女孩走路）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/tm1.js';

// 场景是工厂函数：播放器先装好字体再调用（K.measure 需要真实字宽）
export default function build() {
const K = scene({ sprites: SP, stretch: 1.5 });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
// 朗读时第 n 个词点亮的时刻（与 wb5 底部字幕同一公式）
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => x.toLowerCase().replace(/[^a-z']/g, '') === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 + en.split(/\s+/).length * 0.36 + 0.9 : en.split(/\s+/).length * 0.36 + 0.9; };
// 踢出去的球：kickT 时刻从脚尖出发，沿抛物线飞到 to
const ball = (actor, kickT, to, flight = 0.9, { stay = true, size = 46 } = {}) => K.prop((g, t) => {
  const foot = K.anchorOf(actor, Math.max(t, kickT), 'foot');
  let x = foot[0] + size * 0.4, y = foot[1];
  if (t >= kickT) { const q = Math.min(1, (t - kickT) / flight); x = x + (to[0] - x) * q; y = y + (to[1] - y) * q - Math.sin(q * Math.PI) * 160; if (q >= 1 && !stay) return; }
  g.save(); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#fff';
  g.beginPath(); g.arc(x, y, size / 2, 0, 7); g.fill(); g.stroke();
  g.fillStyle = INK; const r = size * 0.17; g.beginPath(); for (let i = 0; i < 5; i++) { const a = i * 1.2566 - 1.57 + (t >= kickT ? (t - kickT) * 9 : 0); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.fill();
  g.restore();
}, { from: actor.reveal ?? 0, until: actor.until ?? 1e9, z: 2 });

// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  K.narr('同一个 play，为什么有时写 plays、played，有时写 is playing？', 0.1, 6.4);
  K.at(0.3).text('① 一般现在时', ox + 260, oy + 400, 130);
  K.text('现在 × 一般体', ox + 270, oy + 530, 72, { col: OR });
  K.rect(ox + 1180, oy + 300, 470, 90, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 1215, oy + 362, 48);
  K.rect(ox + 1180, oy + 420, 470, 90, { w: 4, rough: 1.4 }).text('✂️ 简化说法', ox + 1215, oy + 482, 48);
  const menu = ['① 时间轴', '② 时×体格子', '③ 公式', '④ 例句', '⑤ 信号词·陷阱', '🔮 预测'];
  let x = ox + 230; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 680, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 728, 40, { col: GREY, rate: 30 }); x += w + 24; });
}

// ───────── 2 时间轴 + 3 时×体矩阵 ─────────
{
  const [ox, oy] = REG(1); go(1, 6.6);
  K.narr('时态：英语动词会「变身」，告诉你事情是什么时候发生、正处在什么样子。', 7.0, 10.6);
  K.narr('时间轴：一根从左到右的线：左边是过去，中间是现在，右边是将来。这就是「时」。', 10.6, 15.6);
  K.at(7.6).arrow(ox + 180, oy + 300, ox + 1740, oy + 300, { w: 6, speed: 3000, head: 40 });
  [[450, '过去 Past', INK], [960, '现在 Now', OR], [1470, '将来 Future', INK]].forEach(([x, s, c]) => { K.line(ox + x, oy + 278, ox + x, oy + 322, { w: 5, col: c, min: 0.08 }); K.text(s, ox + x - K.measure(s, 52) / 2, oy + 385, 52, { col: c }); });
  say(12.2, 'Past, now, future.', { word: 'Past Now Future', key: ['now'], zh: '过去、现在、将来。' });
  K.narr('体（镜头）：用什么镜头拍这个动作：快照、录像，还是留存成果。这就是「体」。', 15.6, 19.8);
  K.narr('时×体矩阵：横着选时间，竖着选镜头，两条线交叉的格子，就是一种时态。', 19.8, 24.0);
  K.narr('一般体：像拍一张「档案照」：不管这一秒在不在做，只记下每天反复做的规律。', 24.0, 28.4);
  K.cam(15.4, { x: ox + 960, y: oy + 600, z: 1, d: 0.6 });
  const x0 = ox + 330, y0 = oy + 540, cw = 260, rh = 105;
  K.at(15.9).text('体＼时', ox + 150, oy + 515, 40, { col: GREY });
  ['过去', '现在', '将来'].forEach((s, i) => K.text(s, x0 + cw * (i + .5) - 48, oy + 515, 48, { col: i === 1 ? OR : INK }));
  ['一般', '进行', '完成'].forEach((s, j) => K.text(s, ox + 170, y0 + rh * (j + .5) + 16, 48, { col: j === 0 ? OR : INK }));
  K.rect(x0, y0, cw * 3, rh * 3, { w: 4, rough: 1.0 });
  for (let i = 1; i < 3; i++) K.line(x0 + cw * i, y0, x0 + cw * i, y0 + rh * 3, { w: 3, col: GREY, min: 0.1 });
  for (let j = 1; j < 3; j++) K.line(x0, y0 + rh * j, x0 + cw * 3, y0 + rh * j, { w: 3, col: GREY, min: 0.1 });
  K.at(21.6).rect(x0 + cw + 10, y0 + 10, cw - 20, rh - 20, { col: OR, w: 6, fill: OR2, rough: 1.4, speed: 1500 });
  K.text('一般现在时', x0 + cw + 44, y0 + 63, 32, { col: OR });
  // 档案照：相机 + 闪光
  K.at(24.6).rect(ox + 1360, oy + 580, 300, 190, { w: 5, rough: 1.2 }).rect(ox + 1410, oy + 545, 80, 36, { w: 4 }).circle(ox + 1510, oy + 675, 120, { w: 5, col: INK }).circle(ox + 1510, oy + 675, 50, { w: 4, col: OR });
  K.pop(26.4, '咔嚓！', ox + 1700, oy + 540, 64, { out: 27.6 });
  K.prop((g, t) => { const a = Math.max(0, 1 - (t - 26.4) / 0.5); if (t < 26.4 || a <= 0) return; g.save(); g.strokeStyle = OR; g.lineWidth = 6; g.globalAlpha = a; for (let i = 0; i < 8; i++) { const an = i * 0.785; g.beginPath(); g.moveTo(ox + 1510 + Math.cos(an) * 90, oy + 675 + Math.sin(an) * 90); g.lineTo(ox + 1510 + Math.cos(an) * 140, oy + 675 + Math.sin(an) * 140); g.stroke(); } g.restore(); }, { from: 26.4, until: 27.0 });
}

// ───────── 4 习惯（一串小圆点 + 每天踢球）+ 客观真理（地球绕太阳）─────────
{
  const [ox, oy] = REG(2); go(2, 28.4);
  K.narr('习惯：每天都做的事，在时间轴上是一串小圆点：过去有，现在有，将来还有。', 28.8, 34.2);
  K.at(29.0).arrow(ox + 160, oy + 260, ox + 1760, oy + 260, { w: 5, speed: 3400 });
  [[360, '过去'], [960, '现在'], [1560, '将来']].forEach(([x, s]) => K.text(s, ox + x - 40, oy + 330, 40, { col: x === 960 ? OR : GREY, rate: 30 }));
  const boy = K.actor({ keys: [[29.2, 'kick0']], x: ox + 430, ground: oy + 900, h: 420, reveal: 29.2 });
  const kicks = [30.6, 31.4, 32.2, 33.0, 33.8];
  kicks.forEach((kt, i) => { boy.keys.push([kt - 0.4, 'kick0'], [kt - 0.2, 'kick1'], [kt, 'kick2']); ball(boy, kt, [ox + 1000 + i * 40, oy + 820], 0.6, { stay: false }); });
  boy.keys.push([34.4, 'kick0']); boy.until = 35.0;
  const dots = [260, 460, 660, 860, 1060, 1260, 1460, 1660];
  dots.forEach((x, i) => K.prop((g, t) => { const q = Math.min(1, (t - (30.3 + i * 0.42)) / 0.25); if (q <= 0) return; g.save(); g.fillStyle = OR; g.beginPath(); g.arc(ox + x, oy + 260, 13 * MO.backOut(q, 2), 0, 7); g.fill(); g.restore(); }, { from: 30.3 }));
  K.at(32.0).text('一次又一次', ox + 1160, oy + 200, 56, { col: OR });
  // 客观真理
  K.narr('客观真理：永远不变的事实也用它：The earth goes around the sun（地球绕着太阳转）。', 34.2, 40.4);
  K.at(35.0).ellipse(ox + 1250, oy + 700, 760, 330, { w: 3, col: GREY, rough: 0.8, speed: 3600 });
  K.circle(ox + 1250, oy + 700, 150, { w: 5, col: OR, fill: OR2, rough: 1.3 });
  for (let i = 0; i < 8; i++) { const a = i * 0.785; K.line(ox + 1250 + Math.cos(a) * 92, oy + 700 + Math.sin(a) * 92, ox + 1250 + Math.cos(a) * 125, oy + 700 + Math.sin(a) * 125, { w: 4, col: OR, min: 0.04, gap: 0.01 }); }
  K.text('sun', ox + 1215, oy + 900, 44, { col: GREY });
  K.prop((g, t) => {                              // 地球：一直绕（画面只由 t 决定）
    const a = (t - 36.0) * 0.9 - 1.2, x = ox + 1250 + Math.cos(a) * 380, y = oy + 700 + Math.sin(a) * 165;
    g.save(); g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = '#dbe8f5'; g.beginPath(); g.arc(x, y, 34, 0, 7); g.fill(); g.stroke();
    g.strokeStyle = '#6b8f5e'; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 18, y - 10); g.quadraticCurveTo(x - 2, y - 22, x + 8, y - 6); g.quadraticCurveTo(x + 18, y + 8, x + 4, y + 18); g.stroke(); g.restore();
    g.save(); g.font = '36px Kalam'; g.fillStyle = INK; g.fillText('earth', x - 38, y - 48); g.restore();
  }, { from: 36.0 });
  const en = 'Played, playing. The earth goes around the sun.', w = 'played playing earth around sun The earth goes around the sun';
  say(36.4, en, { word: w, key: ['goes'], zh: '玩了、正在玩。地球绕着太阳转。' });
  K.pop(wordT(36.4, en, w, 'goes'), 'goes', ox + 1250, oy + 470, 84, { to: { t: wordT(36.4, en, w, 'goes') + 1.2, x: ox + 1660, y: oy + 470, size: 64 } });
}

// ───────── 5 公式 + I / We / They play ─────────
let T = 46.4;
{
  const [ox, oy] = REG(3); go(3, T - 0.4);
  K.narr('动词原形：动词本来的样子，什么尾巴都没加，比如 play。状态就用 am / is / are。', T, T + 4.4);
  K.at(T + 0.2).text('公式：', ox + 130, oy + 230, 54, { col: OR });
  K.text('主语 + 动词原形 V / 单三 V-s(es)   ｜   状态：am / is / are', ox + 300, oy + 230, 46);
  K.narr('I、We、They 当主语：动词保持原形 play。', T + 4.4, T + 8.4);
  K.at(T + 4.6).text('I / We / They', ox + 130, oy + 370, 66);
  const px = ox + 600; K.text('play football every afternoon.', px, oy + 370, 58);
  K.under(px, px + K.measure('play', 58), oy + 386);
  K.text('原形', px + 10, oy + 450, 44, { col: OR });
  const en = 'I am, she is, we are. They play football every afternoon.', w = 'am is are I We They She play football every afternoon play football every afternoon';
  const st = T + 8.0, kt = wordT(st, en, w, 'play');
  const boy = K.actor({ keys: [[T + 6.6, 'kick0'], [kt - 0.3, 'kick1'], [kt, 'kick2']], x: ox + 560, ground: oy + 900, h: 400, reveal: T + 6.6 });
  K.actor({ keys: [[T + 7.0, 'g_ready']], x: ox + 1420, ground: oy + 900, h: 400, reveal: T + 7.0 });
  ball(boy, kt, [ox + 1300, oy + 900], 1.0);
  K.pop(kt, 'play', ox + 960, oy + 560, 90, { out: kt + 2.2 });
  T = st + say(st, en, { word: w, key: ['play'], zh: '我是，她是，我们是。他们每天下午踢足球。' }) + 0.4;
}

// ───────── 6 单三勋章：He plays ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.4);
  K.narr('单三勋章：单三（第三人称单数）就是另外一个人或东西，比如 Leo，动词要戴 -s 勋章。', T, T + 5.0);
  K.at(T + 0.2).text('He / She / Leo', ox + 130, oy + 300, 66);
  const px = ox + 640, pw = K.measure('play', 58);
  K.text('plays football every afternoon.', px, oy + 300, 58);
  K.at(T + 2.6).circle(px + pw + 14, oy + 282, 70, { col: OR, w: 5, rough: 1.5, speed: 1400 });
  K.pop(T + 3.0, '+s', px + pw + 60, oy + 200, 72);
  // 球门
  K.at(T + 1.0).path([[ox + 1480, oy + 900], [ox + 1480, oy + 580], [ox + 1820, oy + 580], [ox + 1820, oy + 900]], { w: 6 });
  for (let i = 1; i < 6; i++) K.line(ox + 1480 + i * 57, oy + 590, ox + 1480 + i * 57, oy + 895, { w: 2, col: GREY, min: 0.04, gap: 0.005 });
  for (let j = 1; j < 5; j++) K.line(ox + 1485, oy + 580 + j * 64, ox + 1815, oy + 580 + j * 64, { w: 2, col: GREY, min: 0.04, gap: 0.005 });
  const en = 'He plays football every afternoon. Leo plays too.', w = 'He Leo', st = T + 4.6, kt = wordT(st, en, w, 'plays');
  const boy = K.actor({ keys: [[T + 1.2, 'kick0'], [kt - 0.3, 'kick1'], [kt, 'kick2']], x: ox + 560, ground: oy + 900, h: 420, reveal: T + 1.2 });
  ball(boy, kt, [ox + 1650, oy + 860], 0.9);
  K.pop(kt + 0.9, 'GOAL!', ox + 1650, oy + 580, 70, { out: kt + 2.4 });
  T = st + say(st, en, { word: w, key: ['plays'], zh: '他每天下午踢足球。里奥也踢。' }) + 0.4;
}

// ───────── 7 +es：妈妈上课、开车上班 ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.4);
  K.narr('以 ch、sh、s、x、o 结尾的动词，加 -es：teaches、goes。', T, T + 4.2);
  K.at(T + 0.2).text('My mom', ox + 130, oy + 250, 64);
  const px = ox + 400, tw = K.measure('teach', 54);
  K.text('teaches English and goes to work by car.', px, oy + 250, 54);
  K.under(px + tw - 2, px + tw + K.measure('es', 54) + 4, oy + 266);
  K.pop(T + 3.4, '+es', px + tw + 30, oy + 160, 70);
  // 黑板
  K.at(T + 1.0).rect(ox + 160, oy + 400, 720, 380, { w: 6, rough: 1 });
  const en1 = 'My mom teaches English and goes to work by car.';
  const st1 = T + 4.4, tt = wordT(st1, en1, 'teaches', 'teaches');
  K.actor({ keys: [[T + 1.6, 'mom_teach1'], [tt + 0.6, 'mom_teach2']], x: ox + 1030, ground: oy + 940, h: 460, reveal: T + 1.6, until: tt + 4.6 });
  K.at(T + 2.4).text('ABC', ox + 230, oy + 520, 80).text('apple  book', ox + 230, oy + 640, 56);
  K.narr('teach → teaches：动词以 ch 结尾，单三加 -es。', st1 - 0.2, st1 + 4.6);
  let t = st1 + say(st1, en1, { word: 'teaches', key: ['teaches', 'goes'], zh: '我妈妈教英语，开车去上班。' }) + 0.3;
  const en2 = 'Ch, sh, es. Watch, watches. Wash, washes.';
  K.at(t).text('watch → watches     wash → washes', ox + 960, oy + 470, 46);
  t += say(t, en2, { word: 'ch sh es', key: ['watches', 'washes'], zh: 'ch、sh 结尾加 -es。看，（他）看。洗，（他）洗。' }) + 0.3;
  // 开车上班：路 + 车开过去
  K.at(t - 0.6).line(ox - 60, oy + 905, ox + 1980, oy + 905, { w: 5, speed: 4800, rough: 0.6 });
  const w3 = 'My mom English and goes to work by car', gt = wordT(t, en1, w3, 'goes');
  K.actor({ keys: [[0, 'mom_car']], walk: { keys: ['mom_car'], x0: ox - 360, x1: ox + 1500, t0: gt - 0.4, t1: gt + 2.6, ease: 'power1.inOut' }, x: ox - 360, ground: oy + 905, h: 300, anchor: 'center', reveal: gt - 0.4 });
  K.pop(gt, 'goes', ox + 1500, oy + 560, 90, { out: gt + 2.4 });
  T = t + say(t, en1, { word: w3, key: ['goes', 'teaches'], zh: '我妈妈教英语，开车去上班。' }) + 0.4;
}

// ───────── 8 辅音 + y：小鸟飞 ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.4);
  K.narr('辅音 + y：辅音就是 a e i o u 以外的字母。辅音 + y 结尾，变 y 为 i 加 -es。', T, T + 5.4);
  K.at(T + 0.2).text('The little bird', ox + 130, oy + 250, 64);
  K.text('flies high in the sky.', ox + 600, oy + 250, 58);
  K.text('y → i + es', ox + 130, oy + 380, 58, { col: OR });
  const fx = ox + 560; K.text('fly', fx, oy + 380, 58); const fw = K.measure('fl', 58);
  K.cross(fx + fw - 4, oy + 390, fx + fw + K.measure('y', 58) + 6, oy + 336);
  K.arrow(fx + 120, oy + 362, fx + 250, oy + 362, { w: 5, col: OR, head: 24 });
  K.text('flies', fx + 280, oy + 380, 58, { col: OR });
  const en0 = 'A, e, i, o, u. A cat, an egg.', st0 = T + 3.6;
  K.at(st0).text('a  e  i  o  u', ox + 1250, oy + 380, 58, { col: GREY, rate: 10 });
  K.text('元音字母', ox + 1300, oy + 450, 40, { col: GREY });
  let t = st0 + say(st0, en0, { word: 'a', zh: 'a、e、i、o、u（元音字母）。一只猫，一个鸡蛋。' }) + 0.3;
  // 天空：云 + 小鸟飞过
  K.at(T + 1.4).ellipse(ox + 500, oy + 640, 260, 90, { w: 4, col: GREY, rough: 2 }).ellipse(ox + 1400, oy + 600, 300, 100, { w: 4, col: GREY, rough: 2 });
  const en = 'The little bird flies high in the sky.', w = 'The little bird flies high in sky', ft = wordT(t, en, w, 'flies');
  K.actor({ keys: [[0, 'bird_up']], walk: { keys: ['bird_up', 'bird_down'], x0: ox + 120, x1: ox + 1650, t0: ft - 1.0, t1: ft + 3.4, step: 70, ease: 'none' }, x: ox + 120, ground: oy + 900, h: 210, ref: 'bird_up', anchor: 'center', bob: 6, reveal: ft - 1.0 });
  K.pop(ft, 'flies', ox + 960, oy + 540, 96, { to: { t: ft + 1.2, x: ox + 1700, y: oy + 520, size: 70 } });
  T = t + say(t, en, { word: w, key: ['flies'], zh: '小鸟在天上飞得很高。' }) + 0.6;
}

// ───────── 9 信号词 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.4);
  K.narr('信号词：看到 every day、always、usually、often，就知道要用一般现在时。', T, T + 5.0);
  K.at(T + 0.2).text('信号词：', ox + 130, oy + 260, 56, { col: OR });
  const l1 = 'every day (每天) · always (总是) · usually (通常) · often (经常) ·', l2 = 'sometimes (有时) · on Sundays (每逢周日)';
  K.text(l1, ox + 130, oy + 370, 44, { rate: 26 }); K.text(l2, ox + 130, oy + 450, 44, { rate: 26 });
  // 日历：每天打勾（every day）
  const cx = ox + 520, cy = oy + 560; K.rect(cx, cy, 880, 300, { w: 5 }); K.line(cx, cy + 70, cx + 880, cy + 70, { w: 4, min: 0.1 });
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((d, i) => K.text(d, cx + 30 + i * 122, cy + 50, 34, { col: GREY, rate: 30 }));
  const en = 'Every day, always, usually, often, sometimes, on Sundays.', st = T + 5.2;
  const words = ['every', 'always', 'usually', 'often', 'sometimes', 'on'], marks = [l1, l1, l1, l1, l2, l2], subs = ['every day', 'always', 'usually', 'often', 'sometimes', 'on Sundays'];
  const wd = 'every day always usually often sometimes on Sundays';
  words.forEach((wv, i) => { const line = marks[i], x0 = ox + 130 + K.measure(line.slice(0, line.indexOf(subs[i])), 44); K.at(wordT(st, en, wd, wv)).under(x0, x0 + K.measure(subs[i], 44), (line === l1 ? oy + 384 : oy + 464)); });
  for (let i = 0; i < 7; i++) K.at(wordT(st, en, wd, 'every') + 0.1 + i * 0.18).path([[cx + 40 + i * 122, cy + 190], [cx + 70 + i * 122, cy + 225], [cx + 115 + i * 122, cy + 140]], { col: OR, w: 7, min: 0.12, rough: 0.7 });
  T = st + say(st, en, { word: wd, key: ['every', 'day', 'always', 'usually', 'often', 'sometimes', 'sundays'], zh: '每天、总是、通常、经常、有时、每逢周日。' }) + 0.4;
}

// ───────── 10 陷阱：照妖镜 doesn't / Does ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.4);
  K.narr('照妖镜：比喻 doesn\'t / Does：它们把 -s 勋章拿走了，后面的动词被打回原形。', T, T + 5.4);
  K.at(T + 0.2).text('陷阱：', ox + 130, oy + 260, 56, { col: OR });
  const a = ox + 330, s1 = 'He doesn\'t likes'; K.text(s1, a, oy + 260, 60);
  const sx = a + K.measure('He doesn\'t like', 60); K.cross(sx - 4, oy + 272, sx + K.measure('s', 60) + 6, oy + 214);
  K.text('→', a + K.measure(s1, 60) + 40, oy + 260, 60, { col: OR });
  K.text('He doesn\'t like', a + K.measure(s1, 60) + 130, oy + 260, 60, { col: OR });
  const en = 'He likes milk. He doesn\'t like tea. Does he like juice?', w = 'likes like doesn\'t does He doesn\'t like', st = T + 5.0;
  const t1 = wordT(st, en, w, 'likes'), t2 = wordT(st, en, w, "doesn't"), t3 = wordT(st, en, w, 'does');
  K.actor({ keys: [[t1 - 0.8, 'milk']], x: ox + 380, ground: oy + 900, h: 420, reveal: t1 - 0.8 });
  K.actor({ keys: [[t2 - 0.8, 'tea_no']], x: ox + 900, ground: oy + 900, h: 420, reveal: t2 - 0.8 });
  K.actor({ keys: [[t3 - 0.8, 'juice_q']], x: ox + 1480, ground: oy + 900, h: 420, reveal: t3 - 0.8 });
  K.pop(t1, 'likes ✓', ox + 380, oy + 420, 60); K.pop(t2, 'doesn\'t like ✗', ox + 940, oy + 420, 60); K.pop(t3, 'Does … like?', ox + 1480, oy + 420, 60);
  T = st + say(st, en, { word: w, key: ['likes', 'like', "doesn't", 'does'], zh: '他喜欢牛奶。他不喜欢茶。他喜欢果汁吗？' }) + 0.4;
}

// ───────── 11 结论 + 12 预测 ─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.4);
  K.narr('结论：单三主语 He，动词戴上 -s 勋章。', T, T + 4.0);
  const s = 'He plays football every afternoon.', x = ox + 200; K.at(T + 0.3).text(s, x, oy + 300, 76);
  K.under(x + K.measure('He ', 76), x + K.measure('He plays', 76), oy + 320, { w: 8 });
  const en = 'He plays football every afternoon.', st = T + 1.6, kt = wordT(st, en, 'plays', 'plays');
  const boy = K.actor({ keys: [[T + 0.8, 'kick0'], [kt - 0.3, 'kick1'], [kt, 'kick2']], x: ox + 1500, ground: oy + 900, h: 380, reveal: T + 0.8 });
  ball(boy, kt, [ox + 1880, oy + 760], 0.8, { stay: false });
  let t = st + say(st, en, { word: 'plays', key: ['plays'], zh: '他每天下午踢足球。' }) + 0.3;
  K.narr('口诀：习惯真理用一般现在时；单三动词戴勋章，见 does / doesn\'t 就脱掉！', t, t + 4.6);
  K.at(t + 0.2).text('口诀：习惯真理用一般现在时；单三动词戴勋章，见 does 就脱掉！', ox + 200, oy + 470, 46, { rate: 12 });
  T = t + 4.8;
}
{
  const [ox, oy] = REG(10); go(10, T - 0.4);
  K.narr('预测：「她每天去上学」：She 是单三，go 要不要戴 -es 勋章？先想 3 秒！', T, T + 4.6);
  K.at(T + 0.2).text('🔮 她每天去上学。', ox + 130, oy + 250, 60);
  K.text('→  She ___ to school every day.  ( go / goes )', ox + 130, oy + 360, 54);
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  const rt = T + 5.0;
  K.narr('揭晓：单三主语 She，go 戴上 -es 勋章：She goes to school every day.', rt, rt + 5.0);
  K.at(rt).text('She goes to school every day.', ox + 130, oy + 480, 62, { col: OR });
  // 学校
  const sx = ox + 1420; K.at(rt + 0.6).rect(sx, oy + 580, 400, 320, { w: 5 }).path([[sx - 30, oy + 590], [sx + 200, oy + 460], [sx + 430, oy + 590]], { w: 5 });
  K.rect(sx + 160, oy + 760, 80, 140, { w: 4 }).line(sx + 200, oy + 460, sx + 200, oy + 370, { w: 4 }).path([[sx + 200, oy + 370], [sx + 280, oy + 395], [sx + 200, oy + 420]], { col: OR, w: 4, fill: OR2 });
  K.text('school', sx + 130, oy + 550, 40, { col: GREY });
  const en = 'She goes to school every day.', w = 'go goes She to school every day', st = rt + 1.2, gt = wordT(st, en, w, 'goes');
  K.actor({ keys: [[0, 'g_w0']], walk: { keys: ['g_w0', 'g_w1', 'g_w2', 'g_w3'], x0: ox + 300, x1: ox + 1300, t0: gt - 0.6, t1: gt + 2.8, step: 55 }, x: ox + 300, ground: oy + 900, h: 400, reveal: rt + 0.4 });
  K.pop(gt, 'goes', ox + 900, oy + 600, 96, { out: gt + 2.6 });
  T = st + say(st, en, { word: w, key: ['goes'], zh: '她每天去上学。' }) + 0.8;
}

// ───────── 13 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('一般现在时是一张「档案照」：', ox + 220, oy + 350, 58);
  K.text('拍下习惯、规律和永远不变的事实', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：习惯真理用一般现在时；', ox + 220, oy + 650, 54);
  K.text('单三动词戴勋章，见 does 就脱掉！', ox + 220, oy + 740, 54);
  K.text('⏳ 时×体矩阵 · ① 一般现在时', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
