// ⚔️ 过去式四大门派 · ④ -ought / -aught 护法派 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/past_clans.js 案例 4；对照清单 lab/INVENTORY_PC4_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/pc4.js（人物先行帧库 cast/：妈妈拿裙子、Leo 抱小狗、White 老师讲课、Leo 接球、Leo 想事情、Leo 放风筝）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/pc4.js';

export default function build() {
const K = scene({ sprites: SP, stretch: 1.5 });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
// 「保镖」尾巴：一块橙色名牌跟在单词后面（画面只由 t 决定），gh 两个字母在 muteAt 时刻变灰、打上 🔇 线
const tail = (x, y, s, from, muteAt) => K.prop((g, t) => {
  const q = Math.min(1, (t - from) / 0.5); if (q <= 0) return;
  g.save(); g.globalAlpha = q; g.font = '80px Kalam, WK';
  const w = g.measureText(s).width + 50; g.fillStyle = 'rgba(239,114,38,.12)'; g.strokeStyle = OR; g.lineWidth = 6;
  g.beginPath(); g.roundRect(x, y - 80, w, 110, 22); g.fill(); g.stroke();
  const i = s.indexOf('gh'), pre = s.slice(0, i), a = x + 25 + g.measureText(pre).width, gw = g.measureText('gh').width;
  g.fillStyle = OR; g.fillText(pre, x + 25, y); g.fillText(s.slice(i + 2), a + gw, y);
  const m = Math.max(0, Math.min(1, (t - muteAt) / 0.5));
  g.fillStyle = m > 0 ? GREY : OR; g.globalAlpha = q * (1 - 0.6 * m); g.fillText('gh', a, y);
  if (m > 0) { g.globalAlpha = q; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(a - 6, y - 60); g.lineTo(a - 6 + (gw + 12) * m, y + 10); g.stroke(); }
  g.restore();
}, { from });
// 找字母 a 的放大镜（在 at 时刻扫过单词，有 a 就亮）
const lens = (x, y, from, to, hit) => K.prop((g, t) => { if (t < from || t > to + 1.2) return; const p = Math.min(1, (t - from) / (to - from)); g.save(); g.strokeStyle = hit && p >= 1 ? OR : INK; g.lineWidth = 7; const cx = x + p * 260; g.beginPath(); g.arc(cx, y, 60, 0, 7); g.stroke(); g.beginPath(); g.moveTo(cx + 42, y + 42); g.lineTo(cx + 100, y + 100); g.stroke(); g.restore(); }, { from });
// 一张单词卡：原形 → 过去式（带音标）
const pair = (ox, oy, t, base, zh, past, ipa) => {
  K.at(t).rect(ox, oy, 330, 150, { w: 5, rough: 1.2 }).text(base, ox + 40, oy + 100, 76);
  K.text(zh, ox + 40, oy + 210, 46, { col: GREY });
  K.arrow(ox + 360, oy + 75, ox + 460, oy + 75, { w: 5, col: OR, head: 22 });
  K.rect(ox + 480, oy, 400, 150, { w: 6, col: OR, fill: OR2, rough: 1.4 }).text(past, ox + 520, oy + 100, 76, { col: OR });
  K.text(ipa, ox + 520, oy + 210, 44, { col: GREY });
};

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  const d0 = N('bought、brought、caught、taught 长得太像，到底怎么写？', 0.1);
  K.at(0.3).text('第四门派：-ought / -aught 护法派', ox + 140, oy + 330, 86);
  K.text('过去式四大门派', ox + 150, oy + 450, 64, { col: OR });
  K.rect(ox + 150, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 180, oy + 578, 44);
  K.rect(ox + 570, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('✂️ 简化说法', ox + 600, oy + 578, 44);
  const menu = ['① 门派旗', '② 铁律', '③ 成员', '④ 结论', '🔮 预测'];
  let x = ox + 150; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 700, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 748, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.actor({ keys: [[0, 'l_think']], x: ox + 1600, ground: oy + 1150, h: 420, reveal: 1.0 });
  K.pop(2.2, '-ought', ox + 1680, oy + 560, 64, { out: d0 + 1.4 });
  T = d0 + 1.6;
}

// ───────── 2 门派旗：护法尾巴 + gh 不发音 ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  const d1 = N('护法：比喻：这一派成员都带着同一个「保镖」尾巴 -ought 或 -aught。', T);
  K.at(T + 0.3).line(ox + 160, oy + 120, ox + 160, oy + 560, { w: 6 }).path([[ox + 160, oy + 130], [ox + 620, oy + 180], [ox + 160, oy + 300]], { w: 5, col: OR });
  K.text('-ought/-aught', ox + 200, oy + 245, 58, { col: OR });
  K.text('六大护法派', ox + 200, oy + 380, 64);
  T += d1;
  const d2 = N('不发音字母：写出来但不读的字母。gh 在这里不发音，ought、aught 都读 /ɔːt/。', T);
  K.at(T + 0.2).text('-ought = -aught = /ɔːt/', ox + 900, oy + 260, 72);
  tail(ox + 900, oy + 520, 'ought', T + 0.8, T + 2.0); tail(ox + 1300, oy + 520, 'aught', T + 1.0, T + 2.2);
  K.at(T + 2.4).text('gh 不发音！', ox + 1000, oy + 700, 64, { col: OR });
  T += d2;
  const en = 'Ought, aught, gh. Teach, catch, buy, bring, think, fight.', w = 'ought aught gh a teach catch buy bring think fight';
  T += say(T, en, { word: w, key: ['ought', 'aught'], zh: '-ought、-aught、gh。教、抓、买、带来、想、打架。' }) + 0.3;
}

// ───────── 3 黄金铁律：原形里找字母 a ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.3);
  const d1 = N('黄金铁律：看原形里有没有字母 a：有 a 写 -aught，没有 a 写 -ought。', T);
  K.at(T + 0.1).text('原形有 a → -aught', ox + 160, oy + 220, 70, { col: OR });
  K.text('（teach、catch）', ox + 900, oy + 220, 56, { col: GREY });
  K.text('没有 a → -ought', ox + 160, oy + 360, 70);
  // 放大镜扫过 teach（有 a）和 buy（没 a）
  K.at(T + 1.4).text('teach', ox + 300, oy + 640, 96); K.text('buy', ox + 1100, oy + 640, 96);
  lens(ox + 290, oy + 610, T + 2.0, T + 3.4, true); lens(ox + 1080, oy + 610, T + 3.6, T + 5.0, false);
  K.pop(T + 3.4, 'a ✓ → taught', ox + 330, oy + 820, 64, { out: T + 30 }); K.pop(T + 5.0, '无 a → bought', ox + 1080, oy + 820, 64, { out: T + 30 });
  T += Math.max(d1, 5.6);
  const d2 = N('秘诀：先找原形里的字母 a，再决定写 -aught 还是 -ought', T);
  K.at(T + 0.1).text('秘诀：先找原形里的字母 a，再决定写 -aught 还是 -ought', ox + 160, oy + 980, 52, { col: OR, rate: 30 });
  T += d2 + 0.2;
}

// ───────── 4 成员 buy ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.3);
  const d1 = N('成员 buy（买）：原形里没有 a，所以写 -ought：bought。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'buy', '买', 'bought', '/bɔːt/');
  K.at(T + 2.0).text('无 a 用 -ought（去商店买礼物）', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('妈妈给我买了一条新裙子：bought。', T);
  K.at(T + 0.1).text('Mom bought a new dress for me.', ox + 140, oy + 600, 60);
  const en = 'Mom bought a new dress for me.', w = 'Mom new dress for me', st = T + 0.9, bt = wordT(st, en, w, 'bought');
  K.actor({ keys: [[0, 'mom_dress']], x: ox + 1400, ground: oy + 1150, h: 480, reveal: T + 0.4 });
  K.pop(bt, 'bought', ox + 800, oy + 820, 84, { out: bt + 2.4 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['bought'], zh: '妈妈给我买了一条新裙子。' })) + 0.3;
}

// ───────── 5 成员 bring：br- 别和 bought 混 ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.3);
  const d1 = N('成员 bring（带来）：开头 br- 留着，没有 a，写 brought。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'bring', '带来', 'brought', '/brɔːt/');
  K.at(T + 2.0).text('br- 开头保留，别和 bought 混！', ox + 140, oy + 470, 54, { col: OR });
  T += Math.max(d1, 2.8);
  const d2 = N('注意：bought 是「买了」，brought 多一个 r，是「带来了」。', T);
  K.at(T + 0.1).text('He brought his puppy to the park.', ox + 140, oy + 600, 60);
  K.at(T + 1.0).text('b', ox + 1100, oy + 330, 80).text('r', ox + 1140, oy + 330, 80, { col: OR }).text('ought', ox + 1175, oy + 330, 80);
  K.circle(ox + 1158, oy + 305, 40, { w: 5, col: OR });
  K.text('公园', ox + 1650, oy + 780, 46, { col: GREY });
  T += d2;
  const en = 'Br. He brought his puppy to the park.', w = 'brought br He his puppy to the park', st = T, bt = wordT(st, en, w, 'brought');
  K.actor({ keys: [[0, 'l_puppy']], x: ox + 1400, ground: oy + 1150, h: 460, reveal: T - 2.0 });
  K.pop(bt, 'brought', ox + 800, oy + 820, 84, { out: bt + 2.4 });
  T = st + say(st, en, { word: w, key: ['brought'], zh: 'br-。他把小狗带到了公园。' }) + 0.3;
}

// ───────── 6 成员 teach：有 a 必用 -aught ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.3);
  const d1 = N('成员 teach（教）：原形 teach 里有字母 a，所以必须写 -aught！', T);
  pair(ox + 140, oy + 140, T + 0.1, 'teach', '教课', 'taught', '/tɔːt/');
  K.at(T + 2.0).text('原形 teach 里有字母 a ➔ 必用 -aught！', ox + 140, oy + 470, 54, { col: OR });
  lens(ox + 150, oy + 220, T + 1.0, T + 2.0, true);
  T += Math.max(d1, 2.8);
  const d2 = N('去年怀特老师教我们英语：taught。', T);
  K.at(T + 0.1).text('Miss White taught us English last year.', ox + 140, oy + 600, 60);
  // 小黑板
  K.at(T + 0.8).rect(ox + 900, oy + 720, 380, 240, { w: 6 }).text('ABC', ox + 990, oy + 860, 80, { col: OR });
  const en = 'Miss White taught us English last year.', w = 'taught Miss White us English last year', st = T + 1.0, tt = wordT(st, en, w, 'taught');
  K.actor({ keys: [[0, 'missw']], x: ox + 1550, ground: oy + 1150, h: 480, reveal: T + 0.4 });
  K.pop(tt, 'taught', ox + 700, oy + 820, 84, { out: tt + 2.4 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['taught'], zh: '怀特老师去年教我们英语。' })) + 0.2;
  T += say(T, 'Mom bought me a book. Mr. Li taught us English.', { word: 'bought', key: ['bought', 'taught'], zh: '妈妈给我买了一本书。李老师教我们英语。' }) + 0.3;
}

// ───────── 7 其余成员：think / fight / catch ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.3);
  const d1 = N('还有 think→thought、fight→fought；catch 有 a，所以是 caught。', T);
  K.at(T + 0.1).text('其余成员：', ox + 140, oy + 180, 60, { col: OR });
  K.text('think→thought · fight→fought · catch→caught', ox + 140, oy + 290, 66, { rate: 26 });
  T += d1;
  const en = 'I thought about it. They fought.', st = T, th = wordT(st, en, 'thought fought', 'thought');
  K.actor({ keys: [[0, 'l_think']], x: ox + 450, ground: oy + 1100, h: 440, reveal: T - 0.4 });
  K.pop(th, 'thought', ox + 450, oy + 520, 72, { out: th + 2.4 });
  // 打架：两团乱线
  K.prop((g, t) => { const s = wordT(st, en, 'thought fought', 'fought') - 0.3; if (t < s || t > s + 2.6) return; g.save(); g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); for (let i = 0; i < 40; i++) { const a = i * 2.4 + t * 9, r = 70 + Math.sin(i * 1.7 + t * 11) * 40; i ? g.lineTo(ox + 1050 + Math.cos(a) * r, oy + 760 + Math.sin(a) * r * 0.7) : g.moveTo(ox + 1050 + Math.cos(a) * r, oy + 760 + Math.sin(a) * r * 0.7); } g.stroke(); g.restore(); }, { from: T });
  K.pop(wordT(st, en, 'thought fought', 'fought'), 'fought', ox + 1050, oy + 560, 72, { out: wordT(st, en, 'thought fought', 'fought') + 2.4 });
  T += say(st, en, { word: 'thought fought', key: ['thought', 'fought'], zh: '我想了想。他们打架了。' }) + 0.2;
  const en2 = 'I thought he caught the ball.', st2 = T, ct = wordT(st2, en2, 'caught', 'caught');
  K.actor({ keys: [[0, 'l_catch']], x: ox + 1550, ground: oy + 1100, h: 460, reveal: T - 0.4 });
  K.pop(ct, 'caught', ox + 1500, oy + 500, 76, { out: ct + 2.4 });
  T = st2 + say(st2, en2, { word: 'caught', key: ['caught'], zh: '我以为他接住了球。' }) + 0.3;
}

// ───────── 8 结论 + 口诀 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.3);
  const d1 = N('结论：原形有 a 写 -aught，没有 a 写 -ought，都读 /ɔːt/。', T);
  K.at(T + 0.6).text('结论：有 a → -aught（taught、caught）；没 a → -ought（bought…）', ox + 120, oy + 220, 50, { rate: 30 });
  K.at(T + 1.6).text('口诀：原形有 a 用 aught，其余全用 ought，gh 不出声！', ox + 120, oy + 340, 54, { col: OR, rate: 30 });
  tail(ox + 300, oy + 700, 'aught', T + 1.4, T + 3.0); tail(ox + 1000, oy + 700, 'ought', T + 1.8, T + 3.2);
  K.at(T + 1.6).text('teach / catch', ox + 300, oy + 860, 52, { col: GREY }).text('buy / bring / think / fight', ox + 1000, oy + 860, 52, { col: GREY });
  T += Math.max(d1, 3.6);
  T += N('口诀：原形有 a 用 aught，其余全用 ought，gh 不出声！', T) + 0.2;
}

// ───────── 9 预测 ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.3);
  const d1 = N('预测：「爸爸昨天给我买了一只风筝」：buy 原形里有没有 a？先想 3 秒！', T);
  K.at(T + 0.4).text('🔮 爸爸昨天给我买了一只风筝。', ox + 130, oy + 250, 60);
  K.text('→  Dad ___ me a kite yesterday.  ( baught / bought )', ox + 130, oy + 360, 54, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：buy 里没有字母 a，写 -ought：Dad bought me a kite yesterday.', T);
  K.at(T + 0.2).text('Dad bought me a kite yesterday.', ox + 130, oy + 490, 64, { col: OR });
  const en = 'Dad bought me a kite yesterday.', w = 'Dad bought me kite yesterday', st = T + 0.8, bt = wordT(st, en, w, 'bought');
  K.actor({ keys: [[0, 'l_kite']], x: ox + 1400, ground: oy + 1120, h: 460, reveal: T + 0.4 });
  K.pop(bt, 'bought ✓', ox + 700, oy + 720, 84, { out: bt + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['bought'], zh: '爸爸昨天给我买了一只风筝。' })) + 0.6;
}

// ───────── 10 护法全家福：六个成员排队 ─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.3);
  [['teach', 'taught'], ['catch', 'caught'], ['buy', 'bought'], ['bring', 'brought'], ['think', 'thought'], ['fight', 'fought']].forEach(([a, b], k) => {
    const x = ox + 160 + (k % 3) * 560, y = oy + 300 + Math.floor(k / 3) * 380;
    K.at(T + k * 0.4).text(a, x, y, 60, { col: GREY }); K.text(b, x, y + 110, 70, { col: k < 2 ? OR : INK });
  });
  K.at(T + 2.8).text('有 a', ox + 160, oy + 180, 50, { col: OR });
  T = K.cur + 2.6;
}

// ───────── 11 小剧场：拿着风筝跑 ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.3);
  K.at(T).text('Dad bought me a kite yesterday.', ox + 160, oy + 220, 62);
  K.actor({ keys: [[0, 'l_kite']], walk: { keys: ['l_kite', 'l_kite'], x0: ox + 400, x1: ox + 1400, t0: T + 0.4, t1: T + 3.6, step: 9999 }, x: ox + 400, ground: oy + 1050, h: 460, reveal: T + 0.2, bob: 6 });
  T += 4.4;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('-ought / -aught 读音一样，都读 /ɔːt/：', ox + 220, oy + 350, 58);
  K.text('先找原形里的字母 a，就知道怎么写', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：原形有 a 用 aught，', ox + 220, oy + 650, 54);
  K.text('其余全用 ought，gh 不出声！', ox + 220, oy + 740, 54);
  K.text('⚔️ 过去式四大门派 · ④ 护法派', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
