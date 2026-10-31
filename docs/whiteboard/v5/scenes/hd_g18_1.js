// 📘 G18 底层原理 · 一般现在时 —— 决策 38 ③ 啊哈重做（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/03_hd_g18.md）
// 内容来源：GRAMMAR_DB G18（旧版 src/cases/hd_g18.js 案例 1，清单 lab/INVENTORY_HD_G18_1_V5.md；旧板截断的 why_explanation 按 GRAMMAR_DB 补全）
// 角色关键帧：sprites/hdg18_1.js（人物先行帧库 cast/：l_bed0–2 起床、kick0–2 踢球）
// 画面：左「一周」日历（每天 7:00 落一个点，Leo 每天起一次床）vs 右「此刻 📸」快照（正在踢球）→ 先猜句子属于哪边 → 点连成跨过去 / 未来的环线；
//       often 只落 4 天 ⚽；地球绕太阳一圈圈转；再猜三张时间词卡各去哪边 → 最后才出用法与动词形式。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED, FONT } from '../lib/concept.js';
import * as SP from '../sprites/hdg18_1.js';
const ACTS = {"*": ["l_bed0", "l_bed1", "l_bed2", "kick0", "kick1", "kick2"]};
// 知识点不丢（R1 修订）：每条都要出现在板上 / 讲解字幕 / 朗读字幕（v5/check_r38.py 核对）
export const KNOW = [
  'G18 底层原理',
  '一般现在时：习惯作息与客观真理 —— 表示经常反复发生的动作、日常习惯或永恒不变的自然规律',
  '🔬 G18 · 一般现在时：习惯作息与客观真理 底层结构拆解与汉英思维对比',
  '【一般现在时是“现在这一秒正在做”吗？】不是！它画的是一个跨越过去、现在、未来的时间圆环——如“每天7点起床”“地球绕太阳转”，是经常发生或永远如此的规律！',
  'I get up at 7:00 every morning.', 'We often play football after school.', 'The earth goes around the sun.',
  '我每天早上7点起床。我们经常放学后踢足球。地球绕着太阳转。',
  '哪些时间标志词提醒我们要用“一般现在时”？',
  'every day/week、always/usually/often/sometimes、on Sundays', 'now / look / listen', 'yesterday / last week',
  '① 三大用法：日常习惯与规律作息；现在的状态与爱好；客观真理与自然事实',
  '② 动词形式：I / you / we / they / 复数 直接用动词原形；三单主语加 -s/-es',
  '一般现在表经常，习惯真理它担当；every day, often 与 usually，看到它们用原形（三单主语加 -s）！',
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左板「一周」周一到周日 7 格，高亮一格格往右走，每格 7:00 落一个橙点、Leo 每天起一次床；右板「此刻 📸」咔嚓定格一张正在踢球的照片',
    guess: '「I get up at 7:00 every morning.」说的是左边（天天这样）还是右边（此刻这一秒）？',
    reveal: '句子卡飞向左板，七个点连成穿过「以前」和「以后」的环线，every morning 变橙，右板打 ✗；often 只在 4 天落 ⚽；地球一圈圈绕太阳转。再猜：every day… 贴左边、now/look/listen 飞去「此刻」、yesterday/last week 退出（过去）',
    rule: '一般现在时 = 经常反复 / 习惯 / 永远如此；I / you / we / they / 复数用动词原形，三单主语加 -s/-es',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };

  // ---- 版面 ----
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], CX = i => 180 + i * 140, LX0 = 90, LX1 = 1110, PY0 = 240, PY1 = 520;
  const RX0 = 1220, RX1 = 1820, RY0 = 240, RY1 = 690, DOTY = 470;
  C.label('📘 G18 底层原理 · 一般现在时', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });

  let T = 0.3;
  T = narr('一般现在时：习惯作息与客观真理 —— 表示经常反复发生的动作、日常习惯或永恒不变的自然规律', T, 3.4);
  const tIntro2 = T; T = narr('🔬 G18 · 一般现在时：习惯作息与客观真理 底层结构拆解与汉英思维对比', T, 3.0);

  // 左板：一周日历
  K.at(0.6).rect(LX0, PY0, LX1 - LX0, PY1 - PY0, { col: BLUE, w: 5, speed: 5200 });
  C.label('一周', (LX0 + LX1) / 2, PY0 - 18, { size: 44, col: BLUE, from: 0.9, bold: true });
  DAYS.forEach((d, i) => {
    C.label(d, CX(i), PY0 + 56, { size: 38, col: INK, from: 1.0 + i * 0.08 });
    C.label('⏰7:00', CX(i), PY0 + 126, { size: 30, col: GREY, from: 1.2 + i * 0.08 });
  });
  // 右板：此刻快照框
  K.at(1.4).rect(RX0, RY0, RX1 - RX0, RY1 - RY0, { col: OR, w: 5, speed: 5200 });
  C.label('此刻 📸', (RX0 + RX1) / 2, RY0 - 18, { size: 44, col: OR, from: 1.7, bold: true });

  // 一周走一遍：高亮格右移，每格落点，Leo 起床一次
  const W0 = Math.max(2.4, tIntro2 - 0.4), DAY = 0.95;
  const leoKeys = [[0, 'l_bed0']];
  DAYS.forEach((d, i) => { const t = W0 + i * DAY; leoKeys.push([t, 'l_bed0'], [t + 0.3, 'l_bed1'], [t + 0.6, 'l_bed2']); });
  const leo = K.actor({ keys: leoKeys, x: 250, ground: 910, h: 300, reveal: W0 - 0.5 });
  K.prop((g, t) => {   // 高亮格
    const p = (t - W0) / DAY; if (p < 0 || p >= 7) return;
    const i = Math.floor(p), a = Math.min(1, (p - i) * 4, (1 - (p - i)) * 4 + 0.3);
    g.save(); g.globalAlpha = 0.5 * clamp(a); g.fillStyle = 'rgba(253,224,71,.7)'; g.beginPath(); g.roundRect(CX(i) - 64, PY0 + 12, 128, PY1 - PY0 - 24, 16); g.fill(); g.restore();
  }, { from: W0, until: W0 + 7 * DAY, z: 0 });
  const dotAt = i => W0 + i * DAY + 0.55;
  K.prop((g, t) => {   // 橙点
    g.save(); g.fillStyle = OR;
    DAYS.forEach((d, i) => { const q = clamp((t - dotAt(i)) / 0.3); if (q <= 0) return; const s = q < 1 ? 1 + 0.4 * Math.sin(q * Math.PI) : 1; g.beginPath(); g.arc(CX(i), DOTY, 20 * s, 0, 7); g.fill(); });
    g.restore();
  }, { from: dotAt(0), z: 3 });
  T = Math.max(T, W0 + 7 * DAY + 0.3);

  // 右板快照：咔嚓一闪，定格踢球
  const SNAP = T;
  const kick = K.actor({ keys: [[0, 'kick1']], x: (RX0 + RX1) / 2, ground: RY1 - 20, h: 380, reveal: SNAP });
  void kick;
  K.prop((g, t) => { const q = clamp((t - SNAP) / 0.35); if (q >= 1) return; g.save(); g.globalAlpha = 1 - q; g.fillStyle = '#fff'; g.fillRect(RX0, RY0, RX1 - RX0, RY1 - RY0); g.restore(); }, { from: SNAP, until: SNAP + 0.4, z: 6 });
  T = narr('左边：一周里每天都发生一次。右边：只是这一秒，咔嚓一下。', SNAP + 0.2, 3.2);

  // 句子卡 + 第一次预测
  const S1 = 'I get up at 7:00 every morning.';
  const sent = C.chip({ text: S1, x: 960, y: 760, size: 54, from: T, z: 5 });
  T = say(T + 0.4, S1, '我每天早上7点起床。', ['every', 'morning.']);
  T = C.predict(T, { q: '这句话说的是左边「一周」（天天这样），还是右边「此刻」（这一秒）？', sec: 4 });
  // 揭晓
  const REV = T + 0.2;
  C.move(sent, REV, 600, 568, 0.8);
  C.swap(sent, REV + 0.9, 'I get up at 7:00 every morning.', INK, '#fff', OR);
  C.label('every morning ✔', 600, 640, { size: 34, col: OR, from: REV + 1.0, out: REV + 6 });
  K.at(REV + 1.0).curve([[70, DOTY + 40], [CX(0), DOTY], [CX(1), DOTY - 6], [CX(2), DOTY + 4], [CX(3), DOTY - 4], [CX(4), DOTY + 6], [CX(5), DOTY - 4], [CX(6), DOTY], [1140, DOTY - 40]], { col: OR, w: 6, speed: 1500 });
  C.label('← 以前', 120, PY1 + 48, { size: 32, col: GREY, from: REV + 1.6 });
  C.label('以后 →', 1060, PY1 + 48, { size: 32, col: GREY, from: REV + 2.4 });
  K.at(REV + 2.6).cross(RX0 + 40, RY0 + 40, RX1 - 40, RY1 - 40, { col: RED, w: 8 });
  T = narr('【一般现在时是“现在这一秒正在做”吗？】不是！它画的是一个跨越过去、现在、未来的时间圆环——如“每天7点起床”“地球绕太阳转”，是经常发生或永远如此的规律！', REV + 1.0, 5);
  K.narr('我每天早上7点起床。我们经常放学后踢足球。地球绕着太阳转。', T, T + 3.6);

  // 第 2 句：often → 4 天落 ⚽
  const S2 = 'We often play football after school.', BALL = [0, 1, 3, 4];
  C.swap(sent, T, S2, INK, '#fff', OR);
  T = say(T + 0.3, S2, '我们经常放学后踢足球。', ['often']);
  BALL.forEach((i, k) => C.pic({ emoji: '⚽', x: CX(i), y: DOTY - 70, size: 56, from: T - 2.4 + k * 0.35 }));
  C.label('often：不是天天，也一次又一次', 600, 650, { size: 32, col: GREY, from: T - 1.0, out: T + 2.6 });
  T += 2.4;

  // 第 3 句：地球绕太阳（永远如此）
  const S3 = 'The earth goes around the sun.', OX = 640, OY = 790, OR_R = 105, ORB0 = T;
  C.swap(sent, T, S3, INK, '#fff', OR);
  C.pic({ emoji: '☀️', x: OX, y: OY, size: 90, from: T, until: 1e9 });
  K.prop((g, t) => {
    const a = clamp((t - ORB0) / 0.4) * (t > ORB_END ? 1 - clamp((t - ORB_END) / 0.4) : 1); if (a <= 0) return;
    g.save(); g.globalAlpha = a; g.setLineDash([10, 10]); g.strokeStyle = GREY; g.lineWidth = 3; g.beginPath(); g.ellipse(OX, OY, OR_R * 1.6, OR_R * 0.75, 0, 0, 7); g.stroke(); g.setLineDash([]);
    const ang = (t - ORB0) * 1.6; g.font = '64px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('🌍', OX + Math.cos(ang) * OR_R * 1.6, OY + Math.sin(ang) * OR_R * 0.75); g.restore();
  }, { from: ORB0, z: 4 });
  T = say(T + 0.3, S3, '地球绕着太阳转。', ['goes']);
  T = narr('昨天转、今天转、明天还转——永远如此，也用一般现在时。', T, 3.4);
  const ORB_END = T;
  // 收起：句子卡、太阳、Leo 淡出（太阳用 until 不好算，盖一层板色）
  K.prop((g, t) => { const a = clamp((t - ORB_END) / 0.4); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(OX - 120, OY - 80, 240, 160); g.restore(); }, { from: ORB_END, z: 4.5 });
  sent.keys.push([ORB_END, [600, 568]]);
  K.prop((g, t) => { const a = clamp((t - ORB_END) / 0.4); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(60, 600, 380, 320); g.restore(); }, { from: ORB_END, z: 4.5 });   // Leo 退场
  void leo;

  // 第二次预测：三张时间词卡各去哪边
  const OPT = ['every day/week、always/usually/often/sometimes、on Sundays', 'now / look / listen', 'yesterday / last week'];
  const P0 = ORB_END + 0.5;
  const oc = OPT.map((s, i) => C.chip({ text: s, x: 1200, y: 720 + i * 82, size: 36, from: P0 + i * 0.25, z: 6 }));
  T = narr('哪些时间标志词提醒我们要用“一般现在时”？', P0, 3.0);
  T = C.predict(T, { q: '三张时间词卡：哪张贴进左边「一周」？哪张飞去右边「此刻」？哪张两边都不是？', sec: 4 });
  const R2 = T + 0.2;
  C.drop(oc[0], R2, 600, 690); C.swap(oc[0], R2 + 0.75, OPT[0], INK, '#ecfdf5', GREEN);
  C.drop(oc[1], R2 + 0.9, (RX0 + RX1) / 2, RY1 + 50); C.swap(oc[1], R2 + 1.65, OPT[1], INK, '#fff', OR);
  C.move(oc[2], R2 + 1.8, 1360, 880, 0.6); C.swap(oc[2], R2 + 2.4, OPT[2], GREY, '#f3f4f6', GREY);
  C.label('→ 已经过去了，别的课', 1360, 950 - 10, { size: 30, col: GREY, from: R2 + 2.5, out: R2 + 6 });
  T = narr('every day、often、on Sundays……说的是一次又一次 → 一般现在时。now / look / listen 说的是此刻这一秒；yesterday / last week 已经过去。', R2 + 0.2, 4.6);

  // 规则（最后才命名）
  C.rule(T);
  T = narr('① 三大用法：日常习惯与规律作息；现在的状态与爱好；客观真理与自然事实', T, 4.2);
  T = narr('② 动词形式：I / you / we / they / 复数 直接用动词原形；三单主语加 -s/-es', T, 4.4);
  const FIN = T;
  C.chip({ text: '经常 · 习惯 · 真理', x: 760, y: 755, size: 40, from: FIN - 8.0, col: BLUE, bd: BLUE, z: 7, bold: true });
  C.chip({ text: 'I / you / we / they → 原形', x: 760, y: 820, size: 34, from: FIN - 4.0, z: 7 });
  C.chip({ text: 'he / she / it → +s / -es', x: 760, y: 882, size: 34, from: FIN - 3.2, col: OR, bd: OR, z: 7 });
  K.say(FIN + 0.2, 'I get up at 7:00 every morning.', { zh: '一般现在表经常，习惯真理它担当；every day, often 与 usually，看到它们用原形（三单主语加 -s）！', key: ['every', 'morning.'], len: 7.5 });
  T = FIN + 0.2 + 7.5 + 1.5;
  K.end(T);
  return C.finish();
}
