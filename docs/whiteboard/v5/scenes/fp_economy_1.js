// ⚙️ 第一性原理 · 经济原则 · 1 —— 决策 38 ⑮ 啊哈重做「喉咙剖面」（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/15_fp_economy.md）
// 内容来源（R1 零丢失）：旧版 auto.js 场景（src/cases/fp_economy.js 案例 1；清单 lab/INVENTORY_FP_ECONOMY_1_V5.md）全部文字在 KNOW。
// 画面：左边一个喉咙剖面（脖子 + 两片声带），发浊音时声带抖、冒波纹，发清音时声带静止。
//   6 个读音摆出来「要背 6 种？」→ 只看声带 → /k/ 静、/ɡ/ 抖 → 摸喉咙 → 先猜 book+s 的 -s 抖不抖 → /s/；bag+s 声带一路抖到底 → /z/
//   → -ed 同理（worked /t/、played /d/）→ 孩子说出「前音不震尾不震，前音一震尾也震」→ 再猜 dogs → /z/。角色：不用人物帧。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/fpeco1.js';
const ACTS = {};
void ACTS;
export const KNOW = [
  '这一幕：复数 -s 和过去式 -ed，为什么各有三种读音？', '-s 和 -ed 的三种读音', '① 口腔省力同化律', '💡 记忆联想',
  '① 6 种读音？', '② 声带', '③ 同化', '④ 过去式', '⑤ 口诀', '🔮 预测',
  '看起来要背 6 种读音……', 'books /s/   bags /z/    buses /ɪz/', 'worked /t/  played /d/  wanted /ɪd/', '6 种？！',
  '其实只看一件事：前一个音，声带有没有震动。', '只看一件事：前一个音，声带震不震？',
  '声带：喉咙里的两片小肉，发某些音时会快速震动。', '声带',
  '清辅音：发音时声带不震动的辅音，比如 /k/ /p/ /t/ /s/。', '/k/', '声带不震', '= 清',
  '浊辅音：发音时声带震动的辅音，比如 /ɡ/ /b/ /d/ /v/；元音也都震。', '/ɡ/', '声带震动', '= 浊',
  '💡 摸喉咙试试', '不震 → 尾巴不震', '震 → 尾巴也震',
  '同化：后一个音学前一个音的样子，嘴巴最省力。', 'book+s', '/s/', 'book 最后是 /k/，声带不震，-s 就顺势读不震的 /s/。',
  'bag+s', '/z/', 'bag 最后是 /ɡ/，声带在震，-s 就顺势读会震的 /z/。', 'I have two books and two bags.', '我有两本书和两个包。',
  '过去式：表示以前发生的事，规则动词加 -ed。同一条规律！', 'worked', '/t/', '/k/ 不震', 'played', '/d/', '/eɪ/ 元音会震',
  'I worked hard, and then I played.', '我努力学习，然后去玩。',
  '那 buses /ɪz/、wanted /ɪd/ 呢？下一幕讲。', 'buses  wanted  → ?',
  '口诀：前音不震尾不震，前音一震尾也震。', 'Books, bags, buses.', '书、包、公交车。', 'Worked, played, wanted.', '工作了、玩了、想要了。',
  '预测：dog 最后是 /ɡ/。dogs 的 -s 读 /s/ 还是 /z/？先想 3 秒！', '🔮 dog + s　→　/s/ 还是 /z/', '？',
  '揭晓：/ɡ/ 声带在震，-s 也跟着震：dogs 读 /z/。', 'dogs /dɒɡz/ —— /ɡ/ 震，尾巴也震 → /z/', 'Dogs. I have two dogs.', '狗。我有两只狗。',
  '💡 一句话洞见', '清配清，浊配浊：', '-s / -ed 跟着前一个音的声带走', '🎵 口诀', '口诀：前音不震尾不震，', '前音一震尾也震。', '🧠 第一性原理 ① 口腔省力同化律',
];
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边一个喉咙剖面，两片声带；读 /k/ 时声带一动不动，读 /ɡ/ 时声带抖起来、冒出波纹；孩子把手放在自己喉咙上试',
    guess: 'book 最后是 /k/，声带没抖——后面的 -s 会抖还是不抖？（读 /s/ 还是 /z/）',
    reveal: '声带从 /k/ 到 -s 一直静止 → /s/；bag 的 /ɡ/ 抖起来后一路抖到 -s → /z/；worked / played 的 -ed 一模一样',
    rule: '前音不震尾不震，前音一震尾也震（清配清，浊配浊）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('⚙️ 第一性原理 · 经济原则 · 1', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  C.label('-s 和 -ed 的三种读音', 60, 70, { size: 40, col: INK, from: 0.3, align: 'left', bold: true });
  C.label('① 口腔省力同化律', 520, 70, { size: 34, col: OR, from: 0.5, align: 'left' });
  // 顶部进度条：6 步，走到哪步亮哪步
  const STEPS = ['① 6 种读音？', '② 声带', '③ 同化', '④ 过去式', '⑤ 口诀', '🔮 预测'];
  const stepAt = [];
  const stepBar = () => STEPS.forEach((s, i) => K.prop((g, t) => {
    if (t < 0.6) return; const on = stepAt[i] != null && t >= stepAt[i] && (stepAt[i + 1] == null || t < stepAt[i + 1]);
    const done = stepAt[i] != null && t >= stepAt[i];
    g.save(); g.globalAlpha = clamp((t - 0.6) / 0.4); g.font = `${on ? '700 ' : ''}26px Kalam, WK`; g.fillStyle = on ? OR : done ? INK : '#c4c4c4'; g.textAlign = 'left'; g.fillText(s, 880 + i * 175, 70); g.restore();
  }, { from: 0.6, z: 4 }));
  C.TEXTS.push(...STEPS);

  // ===== 喉咙剖面 =====
  const TX = 400, TY = 560;   // 声带中心
  const BUZZ = [];             // [t0, t1]：声带在抖的时间段
  const SOUND = [];            // [t0, t1, '/k/']：喉咙旁边正在发的音
  let throatFrom = 1e9;
  K.prop((g, t) => {
    const a = clamp((t - throatFrom) / 0.6); if (a <= 0) return;
    g.save(); g.globalAlpha = a; g.lineCap = 'round'; g.lineJoin = 'round';
    // 头和脖子侧影
    g.strokeStyle = INK; g.lineWidth = 7;
    g.beginPath(); g.moveTo(TX - 120, 900); g.bezierCurveTo(TX - 130, 760, TX - 140, 420, TX - 170, 330); g.bezierCurveTo(TX - 200, 230, TX - 100, 170, TX + 10, 190); g.stroke();
    g.beginPath(); g.moveTo(TX + 120, 900); g.bezierCurveTo(TX + 120, 760, TX + 100, 640, TX + 140, 560); g.quadraticCurveTo(TX + 150, 520, TX + 110, 470); g.bezierCurveTo(TX + 180, 430, TX + 200, 330, TX + 130, 300); g.stroke();
    // 气管
    g.strokeStyle = BLUE; g.lineWidth = 5; g.beginPath(); g.moveTo(TX - 50, 900); g.lineTo(TX - 50, 420); g.moveTo(TX + 50, 900); g.lineTo(TX + 50, 420); g.stroke();
    // 声带：两片从两侧伸到中间
    const buzz = BUZZ.some(([b0, b1]) => t >= b0 && t < b1);
    const amp = buzz ? 9 : 0, w = Math.sin(t * 46);
    g.strokeStyle = buzz ? RED : GREEN; g.lineWidth = 12;
    g.beginPath(); g.moveTo(TX - 50, TY); g.quadraticCurveTo(TX - 22, TY + amp * w, TX - 4, TY + amp * w * 0.6); g.stroke();
    g.beginPath(); g.moveTo(TX + 50, TY); g.quadraticCurveTo(TX + 22, TY - amp * w, TX + 4, TY - amp * w * 0.6); g.stroke();
    if (buzz) {   // 波纹往外扩
      g.lineWidth = 4; g.strokeStyle = RED;
      for (let k = 0; k < 3; k++) { const p = ((t * 1.6) + k / 3) % 1; g.globalAlpha = a * (1 - p); g.beginPath(); g.arc(TX + 150, TY, 30 + p * 110, -0.7, 0.7); g.stroke(); }
      g.globalAlpha = a;
    }
    const cur = SOUND.find(([s0, s1]) => t >= s0 && t < s1);
    if (cur) { g.font = '700 60px Kalam, WK'; g.fillStyle = buzz ? RED : GREEN; g.textAlign = 'center'; g.fillText(cur[2], TX + 330, TY + 20); }
    g.restore();
  }, { from: 0, z: 2 });
  const sound = (t0, t1, s, buzz) => { SOUND.push([t0, t1, s]); if (buzz) BUZZ.push([t0, t1]); };

  // ===== ① 6 种读音？ =====
  let T = 0.8; stepBar(); stepAt[0] = T;
  T = narr('这一幕：复数 -s 和过去式 -ed，为什么各有三种读音？', T, 3.6);
  const A0 = T;
  C.label('books /s/   bags /z/    buses /ɪz/', 960, 400, { size: 64, from: A0, out: A0 + 7 });
  C.label('worked /t/  played /d/  wanted /ɪd/', 960, 540, { size: 64, from: A0 + 1.2, out: A0 + 7 });
  C.label('6 种？！', 960, 720, { size: 90, col: RED, from: A0 + 2.6, out: A0 + 7, bold: true });
  T = narr('看起来要背 6 种读音……', A0, 4.2);
  T = Math.max(T, A0 + 7.4);

  // ===== ② 声带 =====
  stepAt[1] = T; throatFrom = T;
  T = narr('其实只看一件事：前一个音，声带有没有震动。', T, 3.4);
  C.label('只看一件事：前一个音，声带震不震？', 1300, 200, { size: 44, col: OR, from: T - 2, out: T + 9 });
  C.arrow(TX + 260, TY - 150, TX + 40, TY - 10, { from: T, until: T + 6, col: GREY, w: 5 });
  C.label('声带', TX + 300, TY - 160, { size: 48, col: INK, from: T, out: T + 6, bold: true });
  T = narr('声带：喉咙里的两片小肉，发某些音时会快速震动。', T, 4.2);
  // /k/ 静止
  sound(T, T + 6, '/k/', false);
  C.label('/k/', 1180, 420, { size: 64, col: GREEN, from: T, out: T + 12, bold: true });
  C.label('声带不震', 1400, 420, { size: 44, col: GREEN, from: T + 0.8, out: T + 12 });
  C.label('= 清', 1640, 420, { size: 52, col: GREEN, from: T + 1.6, out: T + 12, bold: true });
  T = narr('清辅音：发音时声带不震动的辅音，比如 /k/ /p/ /t/ /s/。', T, 5.6);
  // /ɡ/ 抖
  sound(T, T + 6, '/ɡ/', true);
  C.label('/ɡ/', 1180, 560, { size: 64, col: RED, from: T, out: T + 6.4, bold: true });
  C.label('声带震动', 1400, 560, { size: 44, col: RED, from: T + 0.8, out: T + 6.4 });
  C.label('= 浊', 1640, 560, { size: 52, col: RED, from: T + 1.6, out: T + 6.4, bold: true });
  T = narr('浊辅音：发音时声带震动的辅音，比如 /ɡ/ /b/ /d/ /v/；元音也都震。', T, 6);
  // 摸喉咙
  C.pic({ emoji: '🖐️', x: TX + 170, y: TY + 10, size: 120, from: T, until: T + 5 });
  C.label('💡 摸喉咙试试', 1300, 760, { size: 48, col: OR, from: T, out: T + 5, bold: true });
  K.narr('💡 记忆联想', T, T + 1.6);
  sound(T + 1.6, T + 3.0, '/k/', false); sound(T + 3.2, T + 4.8, '/ɡ/', true);
  T += 5.4;

  // ===== ③ 同化 =====
  stepAt[2] = T;
  T = narr('同化：后一个音学前一个音的样子，嘴巴最省力。', T, 4);
  const B0 = T;
  C.chip({ text: 'book+s', x: 1120, y: 360, size: 64, from: B0, out: B0 + 30 });
  sound(B0 + 0.4, B0 + 2.2, '/k/', false);
  const sChip = C.chip({ text: '?', x: 1440, y: 360, size: 64, from: B0 + 0.6, bd: OR, col: OR, out: B0 + 30 });
  T = C.predict(B0 + 2.4, { q: 'book 最后是 /k/，声带没抖——后面的 -s 会抖吗？/s/ 还是 /z/？', sec: 4 });
  sound(T, T + 2.4, '/k/ → /s/', false);
  C.swap(sChip, T + 0.2, '/s/', GREEN, '#fff', GREEN);
  T = narr('book 最后是 /k/，声带不震，-s 就顺势读不震的 /s/。', T + 0.4, 4.4);
  C.chip({ text: 'bag+s', x: 1120, y: 520, size: 64, from: T, out: B0 + 30 });
  sound(T + 0.4, T + 4.4, '/ɡ/ → /z/', true);
  const zChip = C.chip({ text: '?', x: 1440, y: 520, size: 64, from: T + 0.4, bd: OR, col: OR, out: B0 + 30 });
  C.swap(zChip, T + 2.2, '/z/', RED, '#fff', RED);
  T = narr('bag 最后是 /ɡ/，声带在震，-s 就顺势读会震的 /z/。', T + 0.4, 4.4);
  C.label('不震 → 尾巴不震', 1300, 700, { size: 44, col: GREEN, from: T, out: B0 + 30 });
  C.label('震 → 尾巴也震', 1300, 780, { size: 44, col: RED, from: T + 0.8, out: B0 + 30 });
  T = say(T + 1.2, 'I have two books and two bags.', '我有两本书和两个包。', ['books', 'bags']);
  C.label('I have two books and two bags.', 1300, 880, { size: 40, col: INK, from: T - 3, out: B0 + 30 });
  T = Math.max(T + 0.6, B0 + 30.4);

  // ===== ④ 过去式 =====
  stepAt[3] = T;
  T = narr('过去式：表示以前发生的事，规则动词加 -ed。同一条规律！', T, 4.6);
  const D0 = T;
  C.chip({ text: 'worked', x: 1120, y: 380, size: 64, from: D0, out: D0 + 24 });
  sound(D0 + 0.4, D0 + 2.6, '/k/ → /t/', false);
  C.label('/k/ 不震', 1120, 470, { size: 38, col: GREEN, from: D0 + 0.6, out: D0 + 24 });
  C.chip({ text: '/t/', x: 1440, y: 380, size: 64, from: D0 + 1.6, col: GREEN, bd: GREEN, out: D0 + 24 });
  C.chip({ text: 'played', x: 1120, y: 580, size: 64, from: D0 + 3.4, out: D0 + 24 });
  sound(D0 + 3.8, D0 + 6.2, '/eɪ/ → /d/', true);
  C.label('/eɪ/ 元音会震', 1120, 670, { size: 38, col: RED, from: D0 + 4.0, out: D0 + 24 });
  C.chip({ text: '/d/', x: 1440, y: 580, size: 64, from: D0 + 5.0, col: RED, bd: RED, out: D0 + 24 });
  T = say(D0 + 6.6, 'I worked hard, and then I played.', '我努力学习，然后去玩。', ['worked', 'played']);
  C.label('I worked hard, and then I played.', 1300, 800, { size: 40, from: D0 + 6.6, out: D0 + 24 });
  T = narr('那 buses /ɪz/、wanted /ɪd/ 呢？下一幕讲。', T, 3.6);
  C.label('buses  wanted  → ?', 1300, 900, { size: 44, col: GREY, from: T - 3.4, out: D0 + 24 });
  T = Math.max(T + 0.4, D0 + 24.4);

  // ===== ⑤ 口诀（孩子先自己说） =====
  stepAt[4] = T;
  C.rule(T);
  sound(T, T + 2.6, '/k/ → /s/', false); sound(T + 2.8, T + 5.4, '/ɡ/ → /z/', true);
  T = narr('口诀：前音不震尾不震，前音一震尾也震。', T, 5.4);
  T = say(T, 'Books, bags, buses.', '书、包、公交车。', ['books', 'bags', 'buses']);
  T = say(T, 'Worked, played, wanted.', '工作了、玩了、想要了。', ['worked', 'played', 'wanted']);
  C.label('口诀：前音不震尾不震，前音一震尾也震。', 1260, 420, { size: 50, col: OR, from: stepAt[4], out: T, bold: true });
  T += 0.6;

  // ===== 🔮 预测：dogs =====
  stepAt[5] = T;
  T = narr('预测：dog 最后是 /ɡ/。dogs 的 -s 读 /s/ 还是 /z/？先想 3 秒！', T, 4.4);
  const E0 = T;
  C.label('🔮 dog + s　→　/s/ 还是 /z/', 1260, 400, { size: 54, from: E0 - 4, out: E0 + 16 });
  const q = C.chip({ text: '？', x: 1260, y: 540, size: 90, from: E0 - 3.6, col: OR, bd: OR, out: E0 + 16 });
  T = C.predict(E0, { q: 'dog 最后是 /ɡ/——dogs 的 -s 读 /s/ 还是 /z/？', sec: 4 });
  C.swap(q, T + 0.2, '/z/', RED, '#fff', RED);
  sound(T, T + 4, '/ɡ/ → /z/', true);
  T = narr('揭晓：/ɡ/ 声带在震，-s 也跟着震：dogs 读 /z/。', T + 0.2, 4.4);
  C.label('dogs /dɒɡz/ —— /ɡ/ 震，尾巴也震 → /z/', 1260, 700, { size: 44, col: RED, from: T - 3, out: E0 + 16 });
  T = say(T, 'Dogs. I have two dogs.', '狗。我有两只狗。', ['dogs']);
  T = Math.max(T + 0.4, E0 + 16.4);

  // ===== 收尾洞见卡 =====
  const F0 = T;
  C.label('💡 一句话洞见', 1260, 260, { size: 46, col: OR, from: F0, bold: true });
  C.label('清配清，浊配浊：', 1260, 360, { size: 52, col: INK, from: F0 + 0.6, bold: true });
  C.label('-s / -ed 跟着前一个音的声带走', 1260, 450, { size: 48, col: INK, from: F0 + 1.2 });
  C.label('🎵 口诀', 1260, 580, { size: 44, col: OR, from: F0 + 2.0 });
  C.label('口诀：前音不震尾不震，', 1260, 670, { size: 48, col: GREEN, from: F0 + 2.4 });
  C.label('前音一震尾也震。', 1260, 750, { size: 48, col: RED, from: F0 + 3.0 });
  C.label('🧠 第一性原理 ① 口腔省力同化律', 1260, 880, { size: 40, col: GREY, from: F0 + 3.6 });
  sound(F0 + 1.2, F0 + 3.0, '/s/', false); sound(F0 + 3.2, F0 + 5.0, '/z/', true);
  T = narr('清配清，浊配浊：-s / -ed 跟着前一个音的声带走', F0, 5) + 2.4;
  K.end(T);
  return C.finish();
}
