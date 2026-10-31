// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_wo_rule_french_s_1.yaml；改编排：模板 wo_rule_french_s_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🔬 规律 8 · 法语丢了 s，英语还留着 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_french_s.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_FRENCH_S_1_V5.md
// 角色关键帧：sprites/fs1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fs1.js';
const ACTS = {"Look": ["l_point"]};
const ITEMS = [
  ['n', '很多法语词里的 s 后来丢掉了，现代法语里已经看不到这个 s。可英语借词借得早，s 还留着。'],
  ['w', '🔬 规律 8：法语脱落的 s，英语还留着'],
  ['w', '📜 有出处 💡 法语丢了 s，英语替它留着'],
  ['s', 'We walk in the forest.', '我们在森林里散步。', 'forest'],
  ['w', 'forest ↔ 现代法语 forêt'],
  ['s', 'Look at that beast!', '看那只野兽！', 'beast'],
  ['w', 'beast ← 古法语 beste ↔ 现代法语 bête'],
  ['s', 'We stay at a hotel.', '我们住在宾馆。', 'hotel'],
  ['w', 'hotel ← 法语 hôtel ← 古法语 ostel ← hostel'],
  ['w', 'hospital ← 中世纪拉丁语 hospitale（和 hostel 同一家）'],
  ['n', '出处：Etymonline 和 Wiktionary 都写了这些词的法语来路。'],
  ['w', '出处：Etymonline · Wiktionary'],
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 8 · 法语丢了 s，英语还留着', items: ITEMS, acts: ACTS }); }
