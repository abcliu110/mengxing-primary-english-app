// ⚔️ 过去式四大门派 · ① 金钟罩铁布衫派（AAA）—— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17）
// 内容来源（R1 零丢失）：src/cases/past_clans.js 案例 1；对照清单 lab/INVENTORY_PC1_V5.md
// 版面：12 块白板（4 列 × 3 行），镜头逐块推过去，最后拉远看全图。
// 角色关键帧：sprites/pc1.js（人物先行帧库 cast/：Leo 放书、摔下自行车、读书、提礼物走路、切蛋糕，Leo 踢球）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';
import * as SP from '../sprites/pc1.js';

export default function build() {
const K = scene({ sprites: SP });
const REG = i => [(i % 4) * 2100, Math.floor(i / 4) * 1250];
const go = (i, t, d = 0.9, z = 1) => { const [x, y] = REG(i); K.cam(t, { x: x + 960, y: y + 540, z, d, ease: 'power2.inOut' }); };
const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
const say = (t, en, o = {}) => { K.say(t, en, o); return (o.word ? 0.45 + o.word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9; };
const N = (zh, t) => { const d = Math.max(3.2, zh.length * 0.13 + 0.8); K.narr(zh, t, t + d); return d; };
// 金钟罩：一口大钟扣在单词上（画面只由 t 决定），被打时轻轻晃
const bell = (cx, cy, r, from, hitAt = []) => K.prop((g, t) => {
  const q = Math.min(1, (t - from) / 0.7); if (q <= 0) return;
  let rot = 0; hitAt.forEach(h => { const d = t - h; if (d > 0 && d < 0.8) rot += Math.sin(d * 30) * 0.06 * (1 - d / 0.8); });
  g.save(); g.translate(cx, cy + r * 0.9); g.rotate(rot); g.globalAlpha = q; g.strokeStyle = OR; g.lineWidth = 7; g.fillStyle = 'rgba(239,114,38,.08)';
  g.beginPath(); g.moveTo(-r * 1.1, 0); g.bezierCurveTo(-r * 1.0, -r * 0.3, -r * 0.85, -r * 1.7, 0, -r * 1.75); g.bezierCurveTo(r * 0.85, -r * 1.7, r * 1.0, -r * 0.3, r * 1.1, 0); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.arc(0, -r * 1.8, r * 0.13, 0, 7); g.stroke(); g.restore();
}, { from });
// 小鞭炮爆一下
const bang = (x, y, at) => K.prop((g, t) => { const d = t - at; if (d < 0 || d > 0.7) return; g.save(); g.strokeStyle = OR; g.lineWidth = 5; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283, r0 = 20 + d * 60, r1 = 40 + d * 140; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); g.stroke(); } g.restore(); }, { from: at });
// 一张单词卡：原形 = 过去式
const pair = (ox, oy, t, base, zh, ipa) => {
  K.at(t).rect(ox, oy, 330, 150, { w: 5, rough: 1.2 }).text(base, ox + 40, oy + 100, 76);
  K.text(zh, ox + 40, oy + 210, 46, { col: GREY });
  K.text('=', ox + 380, oy + 105, 80, { col: OR });
  K.rect(ox + 480, oy, 330, 150, { w: 6, col: OR, fill: OR2, rough: 1.4 }).text(base, ox + 520, oy + 100, 76, { col: OR });
  K.text(ipa, ox + 520, oy + 210, 46, { col: GREY });
};

let T;
// ───────── 1 标题板 ─────────
{
  const [ox, oy] = REG(0); K.camSet(ox + 960, oy + 540, 1);
  const d0 = N('这节课：为什么有的动词变过去式，不加 -ed？', 0.1);
  K.at(0.3).text('第一门派：金钟罩铁布衫派', ox + 160, oy + 330, 96);
  K.text('过去式四大门派', ox + 170, oy + 450, 64, { col: OR });
  K.rect(ox + 160, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('💡 记忆联想', ox + 190, oy + 578, 44);
  K.rect(ox + 580, oy + 520, 380, 84, { w: 4, rough: 1.4 }).text('✂️ 简化说法', ox + 610, oy + 578, 44);
  const menu = ['① 门派旗', '② 秘诀', '③ 成员', '④ 结论', '🔮 预测'];
  let x = ox + 160; menu.forEach(s => { const w = K.measure(s, 40) + 40; K.rect(x, oy + 700, w, 70, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(s, x + 20, oy + 748, 40, { col: GREY, rate: 30 }); x += w + 24; });
  K.actor({ keys: [[0, 'l_put']], x: ox + 1550, ground: oy + 1150, h: 420, reveal: 1.0 });
  bell(ox + 1550, oy + 300, 120, 2.0);
  K.pop(2.4, 'put', ox + 1500, oy + 300, 60, { out: d0 + 1.2 });
  T = d0 + 1.4;
}

// ───────── 2 规则 vs 不规则：play → played / put → putted ✗ ─────────
{
  const [ox, oy] = REG(1); go(1, T);
  const d1 = N('过去式：动词表示「以前发生的事」时的样子。比如 play 变成 played。', T);
  K.at(T + 0.1).text('play → played', ox + 160, oy + 260, 90);
  { const a = ox + 160 + K.measure('play → play', 90); K.under(a, a + K.measure('ed', 90), oy + 285, { w: 7 }); }
  K.text('规则动词：直接加 -ed', ox + 160, oy + 380, 56, { col: OR });
  const st = T + 0.9, pt = wordT(st, 'Play, played. Ed.', 'play played ed', 'played');
  const boy = K.actor({ keys: [[0, 'kick0']], x: ox + 1500, ground: oy + 620, h: 380, reveal: T + 0.4 });
  boy.keys.push([pt - 0.4, 'kick1'], [pt, 'kick2'], [pt + 0.6, 'kick0']);
  T = Math.max(T + d1, st + say(st, 'Play, played. Ed.', { word: 'play played ed', key: ['played'], zh: '玩，玩了。加 -ed。' }));
  const d2 = N('不规则动词：不按「加 -ed」规矩变的动词。put 写成 putted 就错了！', T);
  K.at(T + 0.1).text('put → putted', ox + 160, oy + 640, 90);
  const ct = K.cur; { const a = ox + 160 + K.measure('put → ', 90); K.cross(a - 10, oy + 610, a + K.measure('putted', 90) + 10, oy + 610); }
  K.pop(ct + 0.3, '✗', ox + 820, oy + 600, 110, { out: ct + 3.0 });
  K.at(T + 1.0).text('不规则动词：不加 -ed', ox + 160, oy + 770, 56, { col: OR });
  K.actor({ keys: [[0, 'l_put']], x: ox + 1500, ground: oy + 1150, h: 380, reveal: T + 0.8 });
  T += d2 + 0.2;
}

// ───────── 3 四大门派：四面门派旗，第一面 A A A ─────────
{
  const [ox, oy] = REG(2); go(2, T - 0.3);
  const d1 = N('四大门派：把不规则动词按发音规律分成 4 组，像武林 4 个门派，一组一组记。', T);
  const flag = (x, i, on, t) => { K.at(t).line(x, oy + 160, x, oy + 760, { w: 6 }); K.path([[x, oy + 170], [x + 300, oy + 210], [x, oy + 330]], { w: 5, col: on ? OR : GREY, fill: on ? OR2 : null }); K.text(['①', '②', '③', '④'][i], x + 40, oy + 275, 56, { col: on ? OR : GREY }); };
  [0, 1, 2, 3].forEach(i => flag(ox + 180 + i * 420, i, i === 0, T + 0.3 + i * 0.4));
  K.at(T + 1.9).text('A A A', ox + 180, oy + 470, 110, { col: OR });
  K.text('金钟罩铁布衫派', ox + 180, oy + 580, 60);
  T += d1;
  const d2 = N('AAA：原形、过去式、过去分词三个样子完全一样，像穿了金钟罩，怎么打都不变。', T);
  K.at(T + 0.2).text('put - put - put', ox + 180, oy + 900, 70);
  bell(ox + 1400, oy + 560, 170, T + 0.6, [T + 2.0, T + 2.9]);
  K.at(T + 0.8).text('put', ox + 1345, oy + 660, 80, { col: OR });
  K.pop(T + 2.0, '咚！', ox + 1700, oy + 420, 70, { out: T + 2.6 }); K.pop(T + 2.9, '咚！', ox + 1120, oy + 420, 70, { out: T + 3.5 });
  T += d2 + 0.2;
}

// ───────── 4 秘诀：爆破音 /t/ /d/ 小鞭炮 ─────────
{
  const [ox, oy] = REG(3); go(3, T - 0.3);
  const d1 = N('爆破音：/t/ /d/ 这种音，舌尖一顶再一弹，又短又脆，像小鞭炮。', T);
  K.at(T + 0.1).text('秘诀：词尾本来就是爆破音 /t/ /d/，再加 -ed 会撞车被吞掉 → 保持原形', ox + 120, oy + 200, 46, { rate: 30 });
  const bt = T + 1.4;
  K.pop(bt, '💥 /t/ /d/', ox + 520, oy + 480, 110, { out: bt + 3.0 }); bang(ox + 640, oy + 450, bt); bang(ox + 640, oy + 450, bt + 1.2);
  // 撞车：put + ed → 被吞掉
  K.at(T + 1.8).text('put', ox + 1100, oy + 700, 96);
  K.text('+ ed', ox + 1290, oy + 700, 96, { col: GREY });
  const xt = K.cur; K.cross(ox + 1280, oy + 670, ox + 1480, oy + 670);
  K.arrow(ox + 1150, oy + 780, ox + 1150, oy + 900, { col: OR, w: 5, head: 24 });
  K.text('put', ox + 1100, oy + 1000, 96, { col: OR });
  K.pop(xt + 0.3, '吞！', ox + 1580, oy + 640, 70, { out: xt + 2.2 });
  T += Math.max(d1, xt - T + 1.0) + 0.2;
}

// ───────── 5 成员 put ─────────
{
  const [ox, oy] = REG(4); go(4, T - 0.3);
  const d1 = N('原形：动词最原本、没变化的样子，就是词典里查到的样子，比如 put（放）。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'put', '放', '/pʊt/');
  T += d1;
  const d2 = N('闭音节：元音后面被辅音「关上门」，读得又短又快，比如 put 里 u 后面关着 t。', T);
  K.at(T + 0.4).text('短促闭音节 + t 结尾，过去现在一模一样', ox + 140, oy + 470, 50, { col: OR });
  // 小门：u 后面的 t 把门关上
  K.at(T + 1.2).rect(ox + 1180, oy + 140, 120, 200, { w: 5 }).text('t', ox + 1220, oy + 270, 70, { col: OR });
  K.pop(T + 2.0, '关门！', ox + 1420, oy + 220, 56, { out: T + 3.6 });
  T += d2;
  const d3 = N('例句里有 yesterday（昨天），动词还是 put，一个字母都不加。', T);
  K.at(T + 0.1).text('He put his book on the desk yesterday.', ox + 140, oy + 600, 60);
  const en = 'He put his book on the desk yesterday.', w = 'He his book on the desk yesterday', st = T + 1.4, pt = wordT(st, en, w, 'put');
  K.actor({ keys: [[0, 'l_put']], x: ox + 1400, ground: oy + 1150, h: 440, reveal: T + 0.6 });
  K.pop(pt, 'put', ox + 900, oy + 800, 84, { out: pt + 2.4 });
  T = Math.max(T + d3, st + say(st, en, { word: w, key: ['put'], zh: '他昨天把书放在桌上了。' })) + 0.3;
}

// ───────── 6 成员 hurt ─────────
{
  const [ox, oy] = REG(5); go(5, T - 0.3);
  const d1 = N('第二位成员 hurt（弄伤），也是 t 结尾。', T);
  pair(ox + 140, oy + 140, T + 0.1, 'hurt', '弄伤 / 疼', '/hɜːt/');
  K.at(T + 1.8).text('以 t 结尾，千万别写成 hurted！', ox + 140, oy + 470, 50, { col: OR });
  T += Math.max(d1, 2.6);
  const d2 = N('摔下自行车弄伤了脚：hurt my foot，不是 hurted。', T);
  K.at(T + 0.1).text('I fell off my bike and hurt my foot.', ox + 140, oy + 600, 60);
  const en = 'I fell off my bike and hurt my foot.', w = 'I fell off my bike and hurt foot hurt my foot', st = T + 1.0, ht = wordT(st, en, w, 'hurt');
  K.actor({ keys: [[0, 'l_fall']], x: ox + 1400, ground: oy + 1150, h: 440, reveal: T + 0.5, bob: 3 });
  K.pop(ht, '哎哟！', ox + 1650, oy + 640, 64, { out: ht + 1.6 });
  K.pop(ht + 0.3, 'hurt', ox + 900, oy + 800, 84, { out: ht + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['hurt'], zh: '我从自行车上摔下来，弄伤了脚。' })) + 0.3;
}

// ───────── 7 成员 read：拼写不变，读音变 ─────────
{
  const [ox, oy] = REG(6); go(6, T - 0.3);
  const d1 = N('音标：斜线 / / 里的符号，专门记一个词怎么读。read 的拼写不变，读音会变！', T);
  pair(ox + 140, oy + 140, T + 0.1, 'read', '/riːd/ 读', '/red/');
  T += d1;
  const d2 = N('长音和短音：长音 /iː/ 拉长读，短音 /e/ 短短一下。read 的过去式读起来像 red（红色）。', T);
  K.at(T + 0.2).text('拼写不变，读音从长音 /riːd/ 缩成短音 /red/', ox + 140, oy + 470, 50, { col: OR });
  // 长音条 → 短音条
  K.at(T + 1.0).line(ox + 1100, oy + 200, ox + 1700, oy + 200, { w: 14, col: GREY }).text('/iː/', ox + 1720, oy + 215, 46, { col: GREY });
  K.line(ox + 1100, oy + 300, ox + 1260, oy + 300, { w: 14, col: OR }).text('/e/', ox + 1280, oy + 315, 46, { col: OR });
  K.at(T + 1.6).text('I read an interesting book last night.', ox + 140, oy + 600, 60);
  const en = 'I read an interesting book last night. Read sounds like red.', w = 'read an interesting last night red', st = T + 2.2, rt = wordT(st, en, w, 'red');
  K.actor({ keys: [[0, 'l_read']], x: ox + 1400, ground: oy + 1150, h: 440, reveal: T + 1.4 });
  K.pop(rt, 'red', ox + 900, oy + 820, 84, { out: rt + 2.4 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['read', 'red'], zh: '我昨晚读了一本有趣的书。read 的过去式读起来像 red。' })) + 0.3;
}

// ───────── 8 场景：书包放在桌上 ─────────
{
  const [ox, oy] = REG(7); go(7, T - 0.3);
  K.at(T + 0.1).text('Yesterday I put my bag on the desk.', ox + 160, oy + 220, 66);
  K.text('昨天我把书包放在桌上。', ox + 160, oy + 320, 50, { col: GREY });
  // 桌子
  K.at(T + 0.5).line(ox + 900, oy + 760, ox + 1500, oy + 760, { w: 6 }).line(ox + 940, oy + 760, ox + 940, oy + 1000, { w: 5 }).line(ox + 1460, oy + 760, ox + 1460, oy + 1000, { w: 5 });
  K.rect(ox + 1080, oy + 630, 200, 130, { w: 5, col: OR, rough: 1.4 });
  const en = 'Yesterday I put my bag on the desk.', st = T + 0.8, pt = wordT(st, en, 'put', 'put');
  K.actor({ keys: [[0, 'l_w0']], walk: { keys: ['l_w0', 'l_w1', 'l_w2', 'l_w3'], x0: ox + 250, x1: ox + 650, t0: T + 0.6, t1: pt - 0.4, step: 55 }, x: ox + 250, ground: oy + 1000, h: 420, reveal: T + 0.4, until: pt - 0.3 });
  K.actor({ keys: [[0, 'l_put']], x: ox + 700, ground: oy + 1000, h: 420, reveal: pt - 0.3 });
  K.pop(pt, 'put', ox + 1200, oy + 520, 84, { out: pt + 2.6 });
  T = st + say(st, en, { word: 'put', key: ['put'], zh: '昨天我把书包放在桌上。' }) + 0.4;
}

// ───────── 9 其余成员：cut / hit / let / cost ─────────
{
  const [ox, oy] = REG(8); go(8, T - 0.3);
  const d1 = N('这一派还有：cut、hit、let、cost，过去式都和原形一样。', T);
  K.at(T + 0.1).text('其余成员：', ox + 140, oy + 200, 60, { col: OR });
  K.text('cut→cut · hit/let→hit/let · cost→cost', ox + 140, oy + 320, 70, { rate: 26 });
  T += d1;
  const en = 'Hit, let, cost. The book cost ten yuan.', st = T, ct = wordT(st, en, 'hit let cost', 'yuan');
  // 价签
  K.at(T + 0.3).rect(ox + 300, oy + 560, 420, 300, { w: 5 });
  K.at(T + 0.6).rect(ox + 400, oy + 620, 220, 180, { w: 5, col: OR, rough: 1.3 }).line(ox + 510, oy + 620, ox + 510, oy + 800, { w: 4, col: OR }).text('book', ox + 440, oy + 840, 40, { col: GREY });
  K.prop((g, t) => { const q = Math.min(1, (t - (ct - 0.4)) / 0.4); if (q <= 0) return; g.save(); g.globalAlpha = q; g.translate(ox + 880, oy + 650); g.rotate(-0.15); g.strokeStyle = OR; g.lineWidth = 5; g.fillStyle = '#fff'; g.beginPath(); g.moveTo(0, 0); g.lineTo(60, -50); g.lineTo(300, -50); g.lineTo(300, 50); g.lineTo(60, 50); g.closePath(); g.fill(); g.stroke(); g.fillStyle = OR; g.font = '56px Kalam, WK'; g.fillText('¥10', 100, 20); g.restore(); }, { from: ct - 0.4 });
  K.pop(ct + 0.2, 'cost', ox + 1400, oy + 700, 84, { out: ct + 2.4 });
  T += say(st, en, { word: 'hit let cost', key: ['cost'], zh: '打、让、花费。这本书花了十元。' }) + 0.3;
}

// ───────── 10 结论 + 口诀：He cut the cake ─────────
{
  const [ox, oy] = REG(9); go(9, T - 0.3);
  const d1 = N('结论：词尾是短促 /t/ /d/ 的这几个动词，过去式 = 原形。', T);
  K.at(T + 0.6).text('结论：put / cut / hurt / hit / let / cost / read，过去式 = 原形（AAA）', ox + 120, oy + 200, 46, { rate: 30 });
  K.at(T + 1.5).text('口诀：t、d 结尾金钟罩，-ed 进不来，原样不变！read 只变读音 /red/。', ox + 120, oy + 300, 46, { col: OR, rate: 30 });
  T += d1;
  const en = 'He cut the cake and hurt his finger.', st = T + 0.4, ct = wordT(st, en, 'cut', 'cut');
  K.actor({ keys: [[0, 'l_cake0']], x: ox + 700, ground: oy + 1100, h: 460, reveal: T });
  K.pop(ct, 'cut', ox + 1150, oy + 600, 84, { out: ct + 2.2 });
  K.pop(ct + 1.6, 'hurt', ox + 1350, oy + 760, 84, { out: ct + 3.4 });
  bell(ox + 1600, oy + 520, 110, T + 0.6);
  T = st + say(st, en, { word: 'cut', key: ['cut', 'hurt'], zh: '他切蛋糕时弄伤了手指。' });
  T += N('口诀：t、d 结尾金钟罩，-ed 进不来，原样不变！', T) + 0.2;
}

// ───────── 11 预测 ─────────
{
  const [ox, oy] = REG(10); go(10, T - 0.3);
  const d1 = N('预测：「昨天我把书包放在桌上」：put 的过去式要不要加 -ed？先想 3 秒！', T);
  K.at(T + 0.4).text('🔮 昨天我把书包放在桌上。', ox + 130, oy + 250, 60);
  K.text('→  Yesterday I ___ my bag on the desk.  ( put / putted )', ox + 130, oy + 360, 52, { rate: 30 });
  ['3', '2', '1'].forEach((n, i) => K.pop(T + 2.4 + i * 0.8, n, ox + 1700, oy + 330, 110, { out: T + 2.4 + i * 0.8 + 0.7 }));
  T += Math.max(d1, 5.0);
  const d2 = N('揭晓：put 是金钟罩派，过去式还是 put：Yesterday I put my bag on the desk.', T);
  K.at(T + 0.2).text('Yesterday I put my bag on the desk.', ox + 130, oy + 490, 62, { col: OR });
  const en = 'Yesterday I put my bag on the desk.', w = 'Yesterday I put my bag on the desk', st = T + 0.8, pt = wordT(st, en, w, 'put');
  K.actor({ keys: [[0, 'l_put']], x: ox + 1400, ground: oy + 1100, h: 420, reveal: T + 0.4 });
  bell(ox + 1380, oy + 560, 90, pt);
  K.pop(pt, 'put ✓', ox + 800, oy + 700, 84, { out: pt + 2.6 });
  T = Math.max(T + d2, st + say(st, en, { word: w, key: ['put'], zh: '昨天我把书包放在桌上。' })) + 0.6;
}

// ───────── 12 金句卡 → 拉远看全图 ─────────
{
  const [ox, oy] = REG(11); go(11, T - 0.4);
  K.at(T).rect(ox + 140, oy + 150, 1640, 760, { w: 6, rough: 1.2 });
  K.text('💡 一句话洞见', ox + 220, oy + 260, 54, { col: OR });
  K.text('t、d 结尾的短动词穿着「金钟罩」：', ox + 220, oy + 350, 58);
  K.text('过去式 = 原形，一个字母都不加', ox + 220, oy + 440, 58);
  K.text('🎵 口诀', ox + 220, oy + 560, 54, { col: OR });
  K.text('口诀：t、d 结尾金钟罩，', ox + 220, oy + 650, 54);
  K.text('-ed 进不来，原样不变！', ox + 220, oy + 740, 54);
  K.text('⚔️ 过去式四大门派 · ① 金钟罩铁布衫派', ox + 220, oy + 860, 40, { col: GREY, rate: 24 });
  T = K.cur + 1.6;
  K.cam(T, { x: 4150, y: 1790, z: 0.23, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
}

return K.done();
}
