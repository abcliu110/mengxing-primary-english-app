// 📦 第一性原理 · 有界无界 · 1 ——「全部手绘」样板（§2.9 v5.1 标准画法，2026-11-01）
// 用户原话：「现在动画实现整体不好，动作不真实，白板动画不是手绘的，我记得以前你可以全部手绘来完成动作」
//         + 硬性要求：倒咖啡用手冲咖啡壶；倒的时候壶嘴低于壶身、朝下对杯口，液流从壶嘴尖出、成抛物线落进杯，液面上升；不倒时壶嘴朝上斜。
// 与 gen_boundedness_1.js（模板 fp_boundedness_1_v3.js，T16 车道在改，本文件不碰它们）相比：
//   · 内容层不变：KNOW 19 条逐字一致、啊哈卡、四幕 Hook / Mechanism / Transfer / Punchline、预测停顿、规则最后命名、朗读句与中文；
//   · 画法全换：所有道具（咖啡壶、马克杯、玻璃杯、刀、苹果、面包、语法书、纸、作业本、碗、桌子、招牌、数字块、要点卡）都是 rough.js
//     线条逐笔画出、笔尖跟随、两遍描边、hachure 描完淡入（lib/hd.js）；会动的道具画完以后整件按 t 移动 / 旋转；
//   · 0 个 emoji（板上、字幕、要点卡都没有）；只用墨色 + 单强调色 #EF7226（浅橙只作辅助排线）；
//   · 人物 = AI 关键姿势帧：店员 bar_*（新生成，绿幕 → build_sprites.py），Linda linda_*（新生成）；不用代码画人，换帧硬切、脚底线不变；
//   · 动作物理：倒咖啡 lib/pour.js（姿势表驱动壶的位姿，倾角过阈值才出流，抛物线液柱，液面随倒出量上升，断流先于回正）；
//     切 = 蓄势抬刀 → 落刀（刀刃朝下、刃口跨过被切物）→ 两半分开（同一个苹果裁成两半，体积不增）。
import { scene, OR, OR2, INK, GREY, BOARD } from '../wb5.js';
import { concept } from '../lib/concept.js';
import { hd, KETTLE, MUG } from '../lib/hd.js';
import { pourRig, assertPour, drawStream, FEET } from '../lib/pour.js';
import * as SP from '../sprites/bndhd.js';

export const KNOW = [
  '书上说 coffee 不加 -s，咖啡馆里却说 Two coffees！谁错了？',
  '咖啡倒出来是一大摊，分不出「一个」来，数不出一、二、三。',
  '装进杯子，就把它看成「一杯」了。看成一个个的，就能数：两杯咖啡。',
  'Two coffees, please.',
  '苹果切一刀，就不是「一个苹果」了：它是一个个的单位 → 可数，an apple、two apples。',
  '面包切一刀，两块还是面包；水倒一半还是水：切开、倒走还是它自己，是一摊 → 不可数，不说 a bread。',
  'I have an apple. You have two apples.',
  'I like bread and water.',
  '想数一摊的东西？借个单位：一杯、一张、一碗。',
  'A glass of milk, please.',
  '两张纸：-s 加在单位 piece 上，paper 不加。',
  'Two pieces of paper. A piece of bread.',
  'homework 是一大类事，不加 -s；试卷 papers 是一份份的，能加。',
  'I have a lot of homework.',
  '一碗米饭切一刀还是米饭——rice 能加 -s 吗？',
  '揭晓：还是米饭 → 不可数：two bowls of rice，-s 在 bowl 上。米粒再分明，也整摊看。',
  'I want two bowls of rice.',
  '口诀：一刀下去还是它，不可数来不加 s',
  '记住：看成一个个的，就能数；看成一摊的，不能直接数。',
];

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = q => (q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2);
const backOut = q => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); };
const readT = s => { const cjk = (String(s).match(/[\u3400-\u9fff]/g) || []).length; const en = (String(s).replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  // 脚底对齐：换帧时以脚底 4% 带质心为水平锚点（不以头为锚 → 换姿势脚不滑）
  for (const [k, fx] of Object.entries(FEET)) if (SP.FI[k]) SP.FI[k].ax = fx;
  const K = scene({ sprites: SP }), C = concept(K), H = hd(K);
  C.aha({
    see: '同一间咖啡馆里：桌上语法书写着 coffee 不加 -s，Linda 却端着咖啡听见 Two coffees；数字块飞去贴咖啡，全滑了下来',
    guess: '咖啡装进杯子以后能数吗？面包切开还数不数？rice 能不能加 -s？',
    reveal: '数字贴得住的，是能看成一个个的地方：杯子里是一杯、数字弹出；苹果切开「一个」没了，面包切开还是面包；-s 被 paper 弹开、落到单位 pieces / bowls 上',
    rule: '可不可数，看英语把它看成一个个还是一摊；一摊的要数就借个单位，-s 加在单位上（这条看法留到最后揭晓）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.4; };

  // ===== 舞台几何 =====
  const GROUND = 900, BXF = 380;                          // 店员脚底中心
  const BAR = { x: BXF, ground: GROUND, h: 620, FI: SP.FI };
  const CS = 0.45;                                        // 马克杯缩放（真实比例：杯高 ≈ 店员身高 1/12，倒的时候镜头推近）

  // ---- 倒咖啡姿势表（Step 2 用；Step 1 店员站着，壶放在桌上）----
  const M0 = 13.2;                                        // Step 2 起点（下面按 Step 1 实际结束时刻校正，见 assert）
  const POSES = [[0, 'rest'],
    [M0 + 0.2, 'reach'], [M0 + 0.55, 'lift'], [M0 + 0.95, 'pour'], [M0 + 5.0, 'lift'],          // 倒在桌上 → 一大摊
    [M0 + 8.6, 'pour'], [M0 + 10.7, 'lift'],                                                     // 第一杯
    [M0 + 12.0, 'pour'], [M0 + 14.1, 'lift'],                                                    // 第二杯
    [M0 + 15.3, 'reach'], [M0 + 15.65, 'rest']];                                                 // 放壶
  const rig = pourRig(BAR, POSES), TY = rig.TY;
  const tilt0 = M0 + 0.95 + 0.85 + 0.6;                   // 第一次满倾时刻（断言用）
  // 杯子放在液柱落点下：落点 = 满倾时液柱到达「半杯液面」的 x
  const cupMid = TY - CS * 60;
  const landMid = (() => { const tt = M0 + 8.6 + 1.2, tip = rig.tipAt(tt), v = rig.vel(tt), u = rig.landU(tip, v, cupMid); return tip[0] + v[0] * u; })();
  const CUPX = Math.round(landMid);
  const SERVE = [1170, 1310];                             // 两杯推到客人（Linda）面前

  // ===== 固定舞台：地面、桌子、招牌（逐笔画出）=====
  K.at(0.15);
  K.line(60, GROUND, 1860, GROUND, { speed: 5200, rough: 0.6, bow: 0.4 });
  K.path([[455, TY], [1500, TY]], { w: 6, rough: 0.7, speed: 4200 });                                    // 桌面
  K.path([[455, TY + 16], [1500, TY + 16]], { w: 3.5, rough: 0.9, speed: 5200, col: GREY });             // 桌沿厚度
  K.line(520, TY + 16, 520, GROUND, { w: 5, rough: 0.8 }); K.line(1440, TY + 16, 1440, GROUND, { w: 5, rough: 0.8 });   // 桌腿
  K.rect(820, 230, 300, 92, { w: 4.5, rough: 1.2, fill: OR2, fillW: 2 });                                // 招牌
  K.line(880, 230, 900, 190, { w: 3, rough: 0.6, min: 0.06 }); K.line(1060, 230, 1040, 190, { w: 3, rough: 0.6, min: 0.06 });
  K.text('萌星咖啡馆', 970, 292, 52, { align: 'center', rate: 10 });

  // ---- 咖啡壶（手冲鹅颈壶）：在桌上逐笔画出，之后随姿势表移动 / 倾倒 ----
  const kettle = H.sketch([
    { d: KETTLE.body, w: 5.5, fill: OR2, fillW: 2.2, gap: 11, solid: BOARD },
    { d: KETTLE.lid, w: 4.5 }, { d: KETTLE.knob, w: 4.5, min: 0.06 },
    { d: KETTLE.handle, w: 6 },
    { d: KETTLE.spoutOut, w: 4.5 }, { d: KETTLE.spoutIn, w: 4.5 }, { d: KETTLE.spoutCap, w: 4, min: 0.05 },
  ], { t0: K.cur, speed: 1500, xf: rig.xf, z: 3 });
  const potDrawn = kettle.t1;

  // ---- 店员（关键姿势帧）：之字形揭开 ----
  K.actor({ keys: rig.frames, x: BXF, ground: GROUND, h: 620, ref: 'bar_stand', reveal: potDrawn + 0.1, z: 1 });

  let T = 0.5;
  // @step1_hook —— 冲突：语法书说 coffee 不加 -s，咖啡馆里却在数（Step 1 内容待补）
  C.step(1, T);
  T = narr(KNOW[0], T + 0.4, 5);
  T = say(T + 0.2, KNOW[3], '请来两杯咖啡。', ['coffees']);
  C.motion(0.15, potDrawn + 1.0);
  T = Math.max(T + 2.6, M0);

  // @step2_mechanism —— 机制：倒出来是一摊（数字贴不住）→ 装进杯子是一杯（数字弹出）
  C.step(2, M0);
  // 断言：满倾时壶嘴尖低于壶身、朝下；第一杯落点在杯口内
  assertPour(rig, tilt0, TY, null, 0);
  assertPour(rig, M0 + 8.6 + 1.2, cupMid, CUPX, CS * 50);
  C.motion(M0, M0 + 15.8);
  // 镜头：推近看倒（快推 power3.inOut）→ 拉回 → 再推近看装杯 → 拉回
  K.cam(M0 + 0.5, { x: 660, y: 540, z: 1.8, d: 0.45, ease: 'power3.inOut' });
  K.cam(M0 + 5.4, { x: 900, y: 560, z: 1.25, d: 0.8 });
  K.cam(M0 + 8.0, { x: 660, y: 530, z: 2.05, d: 0.45, ease: 'power3.inOut' });
  K.cam(M0 + 14.4, { x: 960, y: 560, z: 1.15, d: 0.9 });

  // ---- 液柱 + 桌上一摊 ----
  const PUD = (() => { const s = rig.stream(tilt0, TY); return s.landX; })();
  K.prop((g, t) => {
    const a = rig.amount(t, 0); if (a <= 0) return;
    const fade = 1 - clamp((t - (M0 + 7.0)) / 0.6); if (fade <= 0) return;
    const spread = a + 0.25 * clamp((t - rig.W[0][1]) / 1.5);                 // 断流后还会慢慢摊开一点
    const rx = 18 + 150 * Math.sqrt(Math.min(1.25, spread)), ry = 5 + 7 * Math.sqrt(Math.min(1.25, spread)), cx = PUD + rx * 0.35;
    const p = new Path2D(); for (let i = 0; i <= 48; i++) { const th = i / 48 * Math.PI * 2, rr = 1 + 0.06 * Math.sin(3 * th + 1.3) + 0.04 * Math.sin(5 * th);
      const x = cx + Math.cos(th) * rx * rr, y = TY - 2 + Math.sin(th) * ry * rr; i ? p.lineTo(x, y) : p.moveTo(x, y); } p.closePath();
    H.hatchFill(g, p, { col: INK, gap: 5, w: 2, a: 0.75 * fade, box: [cx - rx - 10, TY - 30, 2 * rx + 20, 60] });
    g.save(); g.globalAlpha = fade; g.strokeStyle = INK; g.lineWidth = 3; g.stroke(p); g.restore();
  }, { from: M0 + 1, until: M0 + 7.7, z: 2 });
  K.prop((g, t) => {
    // 液柱的落点高度：倒在桌上 → 桌面；倒进杯子 → 当前液面
    for (let i = 0; i < rig.W.length; i++) {
      const [on, off] = rig.W[i]; if (t < on || t > off + 0.6) continue;
      const yT = i === 0 ? TY - 3 : TY - CS * (8 + 98 * 0.82 * rig.amount(t, i));
      drawStream(g, rig.stream(t, yT), t, { w: 5 });
    }
  }, { from: M0 + 1, until: M0 + 15, z: 2.5 });

  // ---- 两只马克杯：逐笔画出 → 倒满（液面上升）→ 推给客人 → 数字徽章弹出 ----
  const cupX = (i, t) => { const t0 = i ? M0 + 14.25 : M0 + 10.85, q = io(clamp((t - t0) / 0.7)); return CUPX + (SERVE[i] - CUPX) * q; };
  const mugParts = [{ d: MUG.body, w: 5 }, { d: MUG.rim, w: 4.5 }, { d: MUG.rimBack, w: 3, col: GREY }, { d: MUG.handle, w: 5 }];
  [[M0 + 7.75, 1], [M0 + 11.15, 2]].forEach(([tc, i0], n) => {
    const i = n + 1;
    const inner = new Path2D('M-58 -116 L-50 -8 L50 -8 L58 -116 Z');
    H.sketch(mugParts, { t0: tc, speed: 1100, z: 2.6, xf: t => ({ x: cupX(n, t), y: TY, s: CS }),
      after: (g, t) => {   // 杯里的咖啡：倒出量 → 液面（在杯子局部坐标里画）
        const f = 0.82 * rig.amount(t, i); if (f <= 0) return;
        const y = -8 - 98 * f, tiltS = Math.sin((t - (n ? M0 + 14.25 : M0 + 10.85)) * 9) * Math.exp(-Math.max(0, t - (n ? M0 + 14.95 : M0 + 11.55)) * 4) * (t > (n ? M0 + 14.25 : M0 + 10.85) ? 1 : 0) * 6;
        const p = new Path2D(); p.moveTo(-60, y - tiltS); p.lineTo(60, y + tiltS); p.lineTo(60, 0); p.lineTo(-60, 0); p.closePath();
        g.save(); g.clip(inner); H.hatchFill(g, p, { col: INK, gap: 9, w: 3.2, a: 0.8, box: [-70, -130, 140, 140] });
        g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.moveTo(-60, y - tiltS); g.lineTo(60, y + tiltS); g.stroke(); g.restore();
      } });
  });
  C.motion(M0 + 10.8, M0 + 15.0);
  // 数字徽章：手画橙圈 + 手写数字（推到客人面前之后才弹出：装进杯子 = 一杯）
  K.at(M0 + 11.7); K.circle(SERVE[0], TY - 120, 58, { col: OR, w: 5, speed: 900, rough: 1.4 }); K.text('1', SERVE[0], TY - 102, 46, { col: OR, align: 'center', rate: 6 });
  K.at(M0 + 15.0); K.circle(SERVE[1], TY - 120, 58, { col: OR, w: 5, speed: 900, rough: 1.4 }); K.text('2', SERVE[1], TY - 102, 46, { col: OR, align: 'center', rate: 6 });
  K.at(M0 + 15.6); K.text('coffee', 1150, TY - 200, 64, { rate: 9 }); K.text('s', 1150 + K.measure('coffee', 64), TY - 200, 64, { col: OR, rate: 4 });
  narr(KNOW[1], M0 + 0.4, 4);
  narr(KNOW[2], M0 + 9.2, 3.8);
  T = M0 + 17.4;

  // @step3_transfer —— 迁移（待补）
  C.step(3, T);
  T += 4;
  // @step4_punchline —— 锚点（待补）
  C.step(4, T);
  C.PRED.push({ t: T, sec: 3, q: KNOW[14] }); C.USES.predict = 1;
  K.narr(KNOW[14], T, T + 3);
  C.rule(T + 3.2);
  K.end(T + 5);
  return C.finish();
}
