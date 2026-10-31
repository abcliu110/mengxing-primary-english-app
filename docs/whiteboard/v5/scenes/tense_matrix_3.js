// ⏳ 时×体矩阵 · ③ 一般过去时 —— 决策 38 ⑬ 啊哈重做（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/13_tense_matrix_3.md）
// 内容来源：旧版（决策 32 手工幕，src/cases/tense_matrix.js 案例 3；清单 lab/INVENTORY_TM3_V5.md）全部字幕 / 朗读 / 板书要点（KNOW）。
// 改法：开场「昨天 / 今天」两张图找不同 → 先猜两句差在哪 → -ed 盖章 + yesterday；中段拼写细节（y→i、双写）只进字幕，不再单独占板（MASTER_DESIGN 决策 38 表第 13 行）。
// 角色关键帧：sprites/tm3.js（手工帧库：cam 拍照、kick0–2 踢球、l_no 摇头、party 聚会）
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/tm3.js';
export const KNOW = [
  '⏳ 时×体矩阵 · ③ 一般过去时', '昨天、上周末发生的事，英语就像翻开一张老照片。', '过去 × 一般体',
  '一般过去时：在矩阵里，它是「过去」这一列和「一般」这一行交叉的格子。',
  '历史老照片：比喻：咔嚓一下，把昨天的事定格在过去。事情已经做完，结束了。',
  '过去式：动词表示「过去」时变的样子，比如 visit → visited、take → took。',
  '主语 + 动词过去式 V-ed / 不规则过去式   ｜   状态：was (单) / were (复)',
  '好消息：过去式「不看主语脸色」，I、He、They 全都一样，不用管单三！',
  'I visited the museum and took many photos yesterday.', '昨天我参观了博物馆，拍了很多照片。',
  '规则动词：直接加 -ed 就变成过去式的动词，比如 visit → visited。',
  '不规则动词：过去式不按 -ed 规律、要单独记的动词，比如 take → took。',
  '辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。',
  'Mia studied hard and cried when she lost her pen.', '米娅学习很努力，丢了笔时哭了。',
  'stop 是重读闭音节：双写 p 再加 -ed，stopped；plan 也一样变 planned。',
  'The bus stopped at the station five minutes ago.', '公交车五分钟前停在了车站。',
  'was / were：be 动词的过去式：I、He、She、It 用 was，We、You、They 用 were。',
  'I was happy. They were happy. He was at home.', '我很开心。他们很开心。他在家。',
  'We were very happy at the party last night.', '我们昨晚在聚会上很开心。',
  '信号词：yesterday、last night、…ago、just now，一看就是过去的事。',
  'yesterday (昨天) · last night/weekend/year (昨晚/上周末/去年) ·', '...ago (…以前) · just now (刚才) · in 2022',
  'Last night, last year. We went there in May. I just got home.', '昨晚，去年。我们五月去了那里。我刚到家。',
  '陷阱：有 didn\'t 或 Did 时，「过去」已经被它们带走，后面的动词变回原形。',
  'Did you went there?', 'Did you go there?', 'Did you go there? No, I didn\'t go. Go, went.', '你去那里了吗？不，我没去。去，去了。',
  '口诀：过去的事用过去式，不看主语人人一样；见 did / didn\'t 变回原形！',
  'Did you play football yesterday? Yes, I played football yesterday.', '你昨天踢足球了吗？是的，我昨天踢了足球。',
  '一般过去时是一张老照片：', '事情在过去做完了，定格在那里',
];
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左右两张图：左边一张发黄的老照片「昨天」，Leo 在博物馆拍照；右边「今天」Leo 又去了博物馆。下面两句只差一点点：I visit the museum. / I visited the museum yesterday.',
    guess: '两句差在哪？为什么左边要多出那一点？',
    reveal: 'visited 尾巴上的 -ed 和 yesterday 一起亮橙——-ed 就是「过去」的邮戳；take 盖不上邮戳，直接换成 took（不规则）',
    rule: '一般过去时 = 主语 + 动词过去式（V-ed / 不规则）；不看主语；见 Did / didn\'t 变回原形',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('⏳ 时×体矩阵 · ③ 一般过去时', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('昨天、上周末发生的事，英语就像翻开一张老照片。', T, 3.4);
  // ---- 昨天 / 今天 分屏 ----
  C.split({ x: 120, y: 200, w: 1680, h: 470, from: 0.8, labels: ['昨天 yesterday', '今天 today'], cols: [OR, BLUE] });
  const photo = (cx, cy, w, h, from) => K.prop((g, t) => { const q = clamp((t - from) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = q; g.translate(cx, cy); g.rotate(-0.05); g.fillStyle = '#f3e3c3'; g.strokeStyle = INK; g.lineWidth = 5; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h); g.restore(); }, { from, z: -0.5 });
  photo(540, 440, 700, 420, 1.0);
  K.actor({ keys: [[0, 'cam']], x: 440, ground: 640, h: 380, reveal: 1.2 });
  C.pic({ emoji: '🏛️', x: 740, y: 470, size: 150, from: 1.3 });
  K.actor({ keys: [[0, 'cam']], x: 1240, ground: 640, h: 380, reveal: 1.5 });
  C.pic({ emoji: '🏛️', x: 1560, y: 470, size: 150, from: 1.6 });
  const L1 = C.chip({ text: 'I visited the museum yesterday.', x: 540, y: 760, size: 46, from: T });
  const R1 = C.chip({ text: 'I visit the museum.', x: 1380, y: 760, size: 46, from: T + 0.3 });
  void R1;
  T += 1.0;
  T = C.predict(T, { q: '左右两句只差一点点——差在哪？为什么左边要多出那一点？', sec: 4 });
  const R = T + 0.2;
  C.swap(L1, R, 'I visited the museum yesterday.', INK, '#fff', OR);
  C.chip({ text: '-ed', x: 300, y: 860, size: 50, from: R + 0.2, col: '#fff', bg: OR, bd: OR, bold: true, path: [[R + 0.6, 395, 760, 0.5, 'back']], out: R + 2.2 });
  T = say(R + 1.2, 'I visited the museum and took many photos yesterday.', '昨天我参观了博物馆，拍了很多照片。', ['visited', 'took', 'yesterday']);
  T = narr('历史老照片：比喻：咔嚓一下，把昨天的事定格在过去。事情已经做完，结束了。', T, 3.6);
  C.rule(T);
  T = narr('过去式：动词表示「过去」时变的样子，比如 visit → visited、take → took。', T, 3.6);
  T = narr('主语 + 动词过去式 V-ed / 不规则过去式   ｜   状态：was (单) / were (复)', T, 3.6);
  // ---- 收起分屏，换成过去式变化区 ----
  const CL = T;
  K.prop((g, t) => { const a = clamp((t - CL) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(80, 110, 1760, 820); g.restore(); }, { from: CL, z: 3.5 });
  C.label('-ed = 过去的邮戳 📮', 540, 870, { size: 38, col: OR, from: R + 1.0, out: CL });
  C.label('yesterday ✔', 830, 700, { size: 32, col: OR, from: R + 1.2, out: CL });
  T = narr('一般过去时：在矩阵里，它是「过去」这一列和「一般」这一行交叉的格子。', CL + 0.3, 3.4);
  // 时×体小格子
  const gx = 300, gy = 260, cw = 170, rh = 80;
  K.prop((g, t) => { const q = clamp((t - CL - 0.4) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = q; g.strokeStyle = GREY; g.lineWidth = 3;
    for (let i = 0; i <= 3; i++) { g.beginPath(); g.moveTo(gx + i * cw, gy); g.lineTo(gx + i * cw, gy + 3 * rh); g.stroke(); g.beginPath(); g.moveTo(gx, gy + i * rh); g.lineTo(gx + 3 * cw, gy + i * rh); g.stroke(); }
    g.fillStyle = 'rgba(239,114,38,.35)'; g.fillRect(gx + 3, gy + 3, cw - 6, rh - 6);
    g.font = '30px Kalam, WK'; g.fillStyle = INK; g.textAlign = 'center'; ['过去', '现在', '将来'].forEach((s, i) => g.fillText(s, gx + cw * (i + 0.5), gy - 14)); g.textAlign = 'right'; ['一般', '进行', '完成'].forEach((s, j) => g.fillText(s, gx - 14, gy + rh * (j + 0.6))); g.restore(); }, { from: CL + 0.4, z: 6 });
  C.label('过去 × 一般体', gx + 1.5 * cw, gy + 3 * rh + 60, { size: 40, col: OR, from: CL + 0.8 });
  // 不看主语：I / He / They 三张卡同一个 visited
  const SUBJ = ['I', 'He', 'They'];
  SUBJ.forEach((s, i) => { C.chip({ text: s, x: 1050, y: 280 + i * 100, size: 50, from: T + i * 0.3, z: 7 }); C.chip({ text: 'visited', x: 1300, y: 280 + i * 100, size: 50, from: T + i * 0.3 + 0.2, col: OR, bd: OR, z: 7 }); });
  T = narr('好消息：过去式「不看主语脸色」，I、He、They 全都一样，不用管单三！', T, 3.6);
  T = narr('规则动词：直接加 -ed 就变成过去式的动词，比如 visit → visited。', T, 3.2);
  const tk = C.chip({ text: 'take', x: 1560, y: 600, size: 56, from: T, z: 7 });
  C.chip({ text: '-ed', x: 1760, y: 600, size: 46, from: T + 0.2, col: '#fff', bg: OR, bd: OR, bold: true, z: 7, path: [[T + 0.6, 1660, 600, 0.4], [T + 1.0, 1900, 720, 0.5]], out: T + 1.6 });
  C.swap(tk, T + 1.4, 'took', OR, '#fff', OR);
  C.label('盖不上邮戳 → 直接换', 1560, 690, { size: 30, col: GREY, from: T + 1.5 });
  T = narr('不规则动词：过去式不按 -ed 规律、要单独记的动词，比如 take → took。', T, 3.6);
  // 拼写细节：只进字幕
  T = narr('辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。', T, 3.4);
  T = say(T, 'Mia studied hard and cried when she lost her pen.', '米娅学习很努力，丢了笔时哭了。', ['studied', 'cried']);
  T = narr('stop 是重读闭音节：双写 p 再加 -ed，stopped；plan 也一样变 planned。', T, 3.6);
  T = say(T, 'The bus stopped at the station five minutes ago.', '公交车五分钟前停在了车站。', ['stopped']);
  // was / were
  const wy = 760;
  ['I / He / She / It → was', 'We / You / They → were'].forEach((s, i) => C.chip({ text: s, x: 560 + i * 760, y: wy, size: 42, from: T + i * 0.4, z: 7, bd: i ? BLUE : OR }));
  T = narr('was / were：be 动词的过去式：I、He、She、It 用 was，We、You、They 用 were。', T, 4);
  T = say(T, 'I was happy. They were happy. He was at home.', '我很开心。他们很开心。他在家。', ['was', 'were']);
  T = say(T, 'We were very happy at the party last night.', '我们昨晚在聚会上很开心。', ['were']);
  // 信号词
  T = narr('信号词：yesterday、last night、…ago、just now，一看就是过去的事。', T, 3.6);
  K.narr('yesterday (昨天) · last night/weekend/year (昨晚/上周末/去年) ·', T, T + 3.2); K.narr('...ago (…以前) · just now (刚才) · in 2022', T + 3.2, T + 6.0);
  T = say(T + 0.2, 'Last night, last year. We went there in May. I just got home.', '昨晚，去年。我们五月去了那里。我刚到家。', ['went', 'got']);
  T = Math.max(T, CL + 0) + 0.2;
  // ---- 陷阱 + 第二次预测 ----
  const CL2 = T;
  K.prop((g, t) => { const a = clamp((t - CL2) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(80, 110, 1760, 820); g.restore(); }, { from: CL2, z: 8 });
  const bad = C.chip({ text: 'Did you went there?', x: 960, y: 330, size: 60, from: CL2 + 0.4, bd: RED, z: 9 });
  T = narr('陷阱：有 didn\'t 或 Did 时，「过去」已经被它们带走，后面的动词变回原形。', CL2 + 0.3, 4);
  C.swap(bad, T - 1.2, 'Did you go there?', INK, '#ecfdf5', GREEN);
  K.actor({ keys: [[0, 'l_no']], x: 1600, ground: 900, h: 380, reveal: T - 0.5, until: T + 6, z: 9 });
  T = say(T, 'Did you go there? No, I didn\'t go. Go, went.', '你去那里了吗？不，我没去。去，去了。', ['go', 'didn\'t']);
  const q2 = C.chip({ text: 'Did you ___ football yesterday?', x: 900, y: 520, size: 56, from: T, z: 9 });
  C.chip({ text: 'play', x: 700, y: 640, size: 50, from: T + 0.3, z: 9 }); C.chip({ text: 'played', x: 1100, y: 640, size: 50, from: T + 0.4, z: 9 });
  T = C.predict(T + 0.6, { q: '句首已经有 Did——后面用 play 还是 played？', sec: 4 });
  C.swap(q2, T + 0.2, 'Did you play football yesterday?', INK, '#fff', OR);
  const boy = K.actor({ keys: [[0, 'kick0']], x: 1550, ground: 900, h: 360, reveal: T + 0.4, z: 9 });
  [T + 1.4, T + 3.0].forEach(kt => boy.keys.push([kt - 0.4, 'kick0'], [kt - 0.2, 'kick1'], [kt, 'kick2'], [kt + 0.5, 'kick0']));
  T = say(T + 0.6, 'Did you play football yesterday? Yes, I played football yesterday.', '你昨天踢足球了吗？是的，我昨天踢了足球。', ['play', 'played']);
  T = narr('口诀：过去的事用过去式，不看主语人人一样；见 did / didn\'t 变回原形！', T, 4.4);
  // 金句
  C.chip({ text: '一般过去时是一张老照片：', x: 960, y: 760, size: 46, from: T, z: 9, bd: OR });
  C.chip({ text: '事情在过去做完了，定格在那里', x: 960, y: 850, size: 46, from: T + 0.4, z: 9, bd: OR });
  T += 4.0;
  K.end(T);
  return C.finish();
}
