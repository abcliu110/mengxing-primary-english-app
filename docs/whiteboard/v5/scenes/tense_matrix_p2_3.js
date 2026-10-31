// ⏳ 时×体矩阵 · ③ 一般过去时 · 第 2 节 —— 决策 38 ⑬ 啊哈重做 · 第 2 节（决策 36-② 从 tense_matrix_3 拆出，App 里同一幕白板下「第 2 节」按钮；概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/13_tense_matrix_3.md）
// 内容来源：旧版（决策 32 手工幕，src/cases/tense_matrix.js 案例 3；清单 lab/INVENTORY_TM3_V5.md）全部字幕 / 朗读 / 板书要点（KNOW）。
// 改法：开场「昨天 / 今天」两张图找不同 → 先猜两句差在哪 → -ed 盖章 + yesterday；中段拼写细节（y→i、双写）只进字幕，不再单独占板（MASTER_DESIGN 决策 38 表第 13 行）。
// 角色关键帧：sprites/tm3.js（手工帧库：cam 拍照、kick0–2 踢球、l_no 摇头、party 聚会）
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/tm3.js';
export const KNOW = [
  "⏳ 时×体矩阵 · ③ 一般过去时",
  "辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。",
  "Mia studied hard and cried when she lost her pen.",
  "米娅学习很努力，丢了笔时哭了。",
  "stop 是重读闭音节：双写 p 再加 -ed，stopped；plan 也一样变 planned。",
  "The bus stopped at the station five minutes ago.",
  "公交车五分钟前停在了车站。",
  "was / were：be 动词的过去式：I、He、She、It 用 was，We、You、They 用 were。",
  "I was happy. They were happy. He was at home.",
  "我很开心。他们很开心。他在家。",
  "We were very happy at the party last night.",
  "我们昨晚在聚会上很开心。",
  "信号词：yesterday、last night、…ago、just now，一看就是过去的事。",
  "yesterday (昨天) · last night/weekend/year (昨晚/上周末/去年) ·",
  "...ago (…以前) · just now (刚才) · in 2022",
  "Last night, last year. We went there in May. I just got home.",
  "昨晚，去年。我们五月去了那里。我刚到家。",
  "陷阱：有 didn't 或 Did 时，「过去」已经被它们带走，后面的动词变回原形。",
  "Did you went there?",
  "Did you go there?",
  "Did you go there? No, I didn't go. Go, went.",
  "你去那里了吗？不，我没去。去，去了。",
  "口诀：过去的事用过去式，不看主语人人一样；见 did / didn't 变回原形！",
  "Did you play football yesterday? Yes, I played football yesterday.",
  "你昨天踢足球了吗？是的，我昨天踢了足球。",
  "一般过去时是一张老照片：",
  "事情在过去做完了，定格在那里",
];
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '先复习 -ed 邮戳；was / were 两张卡分好主语；然后一句 Did you went there? 被红框圈住，换成 Did you go there?',
    guess: '句首已经有 Did——后面用 play 还是 played？',
    reveal: 'Did 已经把「过去」带走了：Did you play football yesterday? 回答时才说 I played football yesterday.',
    rule: '见 Did / didn\'t，后面的动词变回原形',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('⏳ 时×体矩阵 · ③ 一般过去时 · 第 2 节', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.4;
  const CL = 0;
  const st = C.chip({ text: 'study', x: 560, y: 330, size: 56, from: 0.6, z: 7 });
  C.swap(st, 2.4, 'studied', OR, '#fff', OR);
  const sp = C.chip({ text: 'stop', x: 1360, y: 330, size: 56, from: 0.8, z: 7 });
  T = narr('辅音 + y 结尾：变 y 为 i 再加 -ed，study → studied、cry → cried。', T, 3.4);
  T = say(T, 'Mia studied hard and cried when she lost her pen.', '米娅学习很努力，丢了笔时哭了。', ['studied', 'cried']);
  C.swap(sp, T + 0.8, 'stopped', OR, '#fff', OR);
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
  C.rule(T + 0.2);
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
