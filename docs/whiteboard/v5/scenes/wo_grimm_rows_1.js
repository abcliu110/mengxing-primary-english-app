// 📖 单词身世 · 格林定律 ② 一排都挪 —— 决策 38 ⑭ 啊哈重做 · 第 2 节（决策 36-② 从 wo_grimm_1 拆出；概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/14_wo_grimm.md）
// 内容来源：旧版 src/cases/wo_grimm.js 案例 1（清单 lab/INVENTORY_WO_GRIMM_1_V5.md）：全部讲解字幕 / 朗读句原样（SEQ），板书要点进 KNOW。
// 画面：一家人的树（南边老辅音 p t d k / 北边挪一格 f th t h）→ 一台时光机：拉丁词投进去，先猜掉出来的英语小词 → pes→foot；
//       借来的大词 pedal 从机器上面绕过去（没进时光机）；tres / dent / decem / dual / centum / cardiac 一个个过机器；古罗马历月份条；格林是谁；中文对照；再猜 ped / pedestrian。
// 角色：不用人物帧（R4 修订）；sprites/wogr1.js 为空包。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED, FONT } from '../lib/concept.js';
import * as SP from '../sprites/wogr1.js';
const ACTS = {};
const SEQ = [["n", "这一幕：为什么认识 foot（脚），就能猜出 pedal（脚踏板）？秘密叫「格林定律」。"], ["n", "可信度徽章：📜 = 查得到出处；⚠️ = 有例外；💡 = 中文对照，不是词源。"], ["n", "老祖宗：很久很久以前，欧洲很多语言是一家人，有同一个老祖宗（原始印欧语）。"], ["n", "什么时候：大约三千年前（公元前一千年左右），北边这一支的辅音整排换了位置。"], ["n", "借词：后来英语又从拉丁语借了很多「大词」——借来的词还是老辅音！"], ["n", "时光机：把拉丁语的 pes（脚）放进时光机：p 进去，出来变成 f——就是 foot！"], ["s", "Pes means foot.", "pes 的意思是脚。", "pes"], ["s", "We walk on our feet.", "我们用脚走路。", "foot"], ["n", "借来的大词：英语从拉丁语借来 pedal（脚踏板），借来的词没进时光机——还是 p！"], ["s", "My bike has two pedals.", "我的自行车有两个踏板。", "pedal"], ["n", "一排都挪：不止 p→f。t 变 th，d 变 t，k 变 h：一整排辅音都挪了一格！"], ["s", "Tres means three.", "tres 的意思是三。", "tres"], ["s", "My sister is three.", "我妹妹三岁。", "three"], ["s", "Three starts with th.", "three 以 th 开头。", "th"], ["s", "The dentist looks at my tooth.", "牙医检查我的牙。", "dentist tooth"], ["s", "December is the last month.", "十二月是最后一个月。", "December"], ["s", "I have ten fingers.", "我有十根手指。", "ten"], ["s", "Dual means two.", "dual 的意思是「双的」。", "dual"], ["s", "I have two hands.", "我有两只手。", "two"], ["s", "A century is one hundred years.", "一个世纪是一百年。", "century hundred"], ["s", "Cardiac means of the heart.", "cardiac 的意思是「心脏的」。", "cardiac"], ["s", "My heart is strong.", "我的心脏很强壮。", "heart"], ["n", "例外：格林定律不是百分之百整齐，有一些例外（后来别的学者解释了一部分）。"], ["n", "彩蛋：December 里藏着 decem（十）。可它是第十二个月呀？"], ["s", "Decem means ten.", "decem 的意思是十。", "decem"], ["n", "古罗马历：因为古罗马的历法从三月开始数：三月是第一个月，December 正好是第十个月！"], ["n", "格林是谁？格林定律的「格林」，就是编《格林童话》的格林兄弟里的哥哥——雅各布·格林。"], ["s", "Jacob Grimm wrote fairy tales and studied words.", "雅各布·格林写童话，也研究单词。", "Jacob Grimm"], ["n", "中文对照：中文也有「两套字」：说话用「脚」「牙」，书面大词用「足」「齿」（足球、牙齿）。"], ["n", "预测：考考你：p 变 f。ped 在英语小词里是谁？那 pedestrian 是什么人？先想 3 秒！"], ["n", "揭晓：ped = foot（脚）；pedestrian = 用脚走路的人，就是「行人」！"], ["s", "Ped means foot.", "ped 的意思是脚。", "ped"], ["s", "A pedestrian walks on foot.", "行人是走路的人。", "pedestrian"], ["n", "口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大词没变！"]];
export const KNOW = [
"一排都挪：不止 p→f。t 变 th，d 变 t，k 变 h：一整排辅音都挪了一格！",
"Tres means three.",
"tres 的意思是三。",
"My sister is three.",
"我妹妹三岁。",
"Three starts with th.",
"three 以 th 开头。",
"The dentist looks at my tooth.",
"牙医检查我的牙。",
"December is the last month.",
"十二月是最后一个月。",
"I have ten fingers.",
"我有十根手指。",
"Dual means two.",
"dual 的意思是「双的」。",
"I have two hands.",
"我有两只手。",
"A century is one hundred years.",
"一个世纪是一百年。",
"Cardiac means of the heart.",
"cardiac 的意思是「心脏的」。",
"My heart is strong.",
"我的心脏很强壮。",
"例外：格林定律不是百分之百整齐，有一些例外（后来别的学者解释了一部分）。",
"借来的大词（老辅音）",
"英语小词（挪了一格）",
"⚠️ 有例外",
"📖 单词身世 · 格林定律 ②（一排都挪）"
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '时光机又转起来：左边一列借来的拉丁大词（老辅音），右边一列英语小词（挪了一格）；tres 先被投进机器',
    guess: 't 进去，掉出来的英语小词会是什么？',
    reveal: '掉出来 three：t 变 th；接着 dentist→tooth（d→t）、December→ten、dual→two、century→hundred（k→h）、cardiac→heart，一行行在右边排成一列',
    rule: '一整排辅音都挪了一格：p→f、t→th、d→t、k→h（⚠️ 有例外）',
  });
  // 自带 z 的标签 / emoji（分段用板色遮罩清场，后面的东西 z 更高）
  const WIPES = [], hid = (t, z) => WIPES.some(([wt, wz]) => wz > z && t > wt + 0.5);   // 被后一块板盖住的字不再画（板上文字面积按真正画出的字量）
  const L = (str, x, y, { size = 40, col = INK, from = 0, out = null, z = 10, align = 'center', bold = false } = {}) => { C.TEXTS.push(str); K.prop((g, t) => { if (hid(t, z)) return; const a = clamp((t - from) / 0.35) * (out != null ? 1 - clamp((t - out) / 0.4) : 1); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = FONT(size, bold); g.fillStyle = col; g.textAlign = align; g.textBaseline = 'alphabetic'; g.fillText(str, x, y); g.restore(); }, { from, z }); };
  const E = (em, x, y, size, from, z = 10) => K.prop((g, t) => { if (hid(t, z)) return; const a = clamp((t - from) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `${size}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(em, x, y); g.restore(); }, { from, z });
  const wipe = (t, z) => (WIPES.push([t, z]), K.prop((g, tt) => { const a = clamp((tt - t) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(40, 110, 1840, 820); g.restore(); }, { from: t, z }));
  let T = 0.3, i = SEQ.findIndex(x => x[1].startsWith('一排都挪：'));
  const step = () => { const s = SEQ[i++]; if (!s) return T;
    if (s[0] === 'n') { const d = Math.max(2.8, readT(s[1]) + 0.8); K.narr(s[1], T, T + d); T += d; }
    else { const Ls = Math.max(sayLen(s[1]), readT(s[2]) + 0.6); K.say(T, s[1], { zh: s[2], key: s[3] ? s[3].toLowerCase().split(/\s+/) : [], len: Ls }); T += Ls + 0.5; }
    return T; };
  L('📖 单词身世 · 格林定律 ②（一排都挪）', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left', z: 99 });
  const R0 = T; wipe(R0, 30);
  K.prop((g, t) => { const a = clamp((t - R0 - 0.2) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#fff7ed'; g.beginPath(); g.roundRect(780, 340, 360, 300, 36); g.fill(); g.stroke();
    g.translate(960, 490); g.rotate(t * 1.3); g.strokeStyle = OR; g.lineWidth = 9; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.stroke(); for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); g.fillStyle = OR; g.fillRect(66, -11, 26, 22); } g.restore(); }, { from: R0 + 0.2, z: 31 });
  L('借来的大词（老辅音）', 380, 260, { size: 36, col: BLUE, from: R0 + 0.3, z: 31 }); L('英语小词（挪了一格）', 1540, 260, { size: 36, col: OR, from: R0 + 0.3, z: 31 });
  step();                                           // 10 一排都挪
  { const tq = T; C.chip({ text: 'tres', x: 330, y: 470, size: 56, from: tq, col: BLUE, bd: BLUE, z: 34, path: [[tq + 0.6, 840, 470, 0.7]], out: tq + 1.4 });
    T = C.predict(tq + 1.0, { q: 't 进去，掉出来的英语小词会是什么？', sec: 4 }); }
  const PAIRS = [['tres', '（拉丁语：三）', 'three', '三', 't → th', 3], ['dentist', '牙医', 'tooth', '牙', 'd → t', 1], ['December', '（原来是第十个月）', 'ten', '十', 'd → t', 2], ['dual', '双的', 'two', '二', 'd → t', 2], ['century', '一百年', 'hundred', '一百', 'k → h', 1], ['cardiac', '心脏的', 'heart', '心', 'k → h', 2]];
  PAIRS.forEach(([lat, z1, eng, z2, rule, nsay], k) => {
    const t = T, y = 330 + k * 95;
    C.chip({ text: lat, x: 380, y, size: 44, from: t, col: BLUE, bd: BLUE, z: 32 }); L(z1, 380, y + 50, { size: 24, col: GREY, from: t, z: 32 });
    C.chip({ text: eng, x: 1540, y, size: 48, from: t + 0.9, col: OR, bd: OR, bold: true, z: 32 }); L(z2, 1540, y + 50, { size: 24, col: GREY, from: t + 0.9, z: 32 });
    L(rule, 960, y + 14 > 640 ? y + 14 : 690, { size: 34, col: OR, from: t + 0.5, out: t + 0.5 + 2.4, z: 33, bold: true });
    K.prop((g, tt) => { const p = clamp((tt - t - 0.1) / 0.8); if (p <= 0 || p >= 1) return; g.save(); g.font = FONT(36); g.fillStyle = BLUE; g.textAlign = 'center'; g.globalAlpha = 1 - p; g.fillText(lat[0], 520 + (780 - 520) * p, y); g.restore(); }, { from: t, z: 33 });
    for (let q = 0; q < nsay; q++) step();
  });
  C.rule(T);
  step();                                           // 22 例外
  L('⚠️ 有例外', 960, 900 - 10, { size: 36, col: RED, from: T - 2.4, z: 33 });
  C.TEXTS.push('📜 真实词源', '💡 记忆联想');
  K.end(T + 2.0);
  return C.finish();
}
