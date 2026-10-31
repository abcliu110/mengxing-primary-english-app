// 📘 G03 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g03.js 案例 1；对照清单 lab/INVENTORY_HD_G03_1_V5.md
// 角色关键帧：sprites/hdg03_1.js（人物先行帧库 cast/）
// 决策 36 ①3（fix36_trunc）：截断句补全、按语义拆行、剥 ** / 反引号、字幕给译文
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg03_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G03 底层原理'],
  ['w', '不可数名词与量词容器 (water / bread / a cup of) —— 液体、粉末、整体材料不能直接按个数，要借“容器”来装！'],
  ['w', '【为什么面包、水、新闻在英语里不可数？】'],
  ['w', '水（water）、牛奶（milk）、面包（bread，切分后还是面包）、米饭（rice）、纸（paper）没有固定的单个形状，所以不能直接加 a 或 -s，必须装进杯子/切成片（a glass of water / two pieces of bread）来计数！'],
  ['w', '🔬 G03 · 不可数名词与量词容器 (water / bread / a cup of) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：I\'d like some water and some bread.'],
  ['w', '我想要一些水和一些面包。妈妈买了两瓶牛奶和三块蛋糕。牛奶对我们的健康有益。'],
  ['w', '② 核心结构规律：① 必背不可数名词：液体（water, milk, juice, tea, soup, rain, snow）、食物（bread, rice, meat, beef, chicken鸡肉）、抽象与总称（homework作业, housework家务, news新闻, weather天气, music音乐, hair头发, money钱, paper纸, time时间）'],
  ['w', '③ 进阶要点：② 三大铁律：前面不加 a/an；词尾不加 -s；作主语时谓语动词一律用单数 (is / has / V-s)！'],
  ['w', 'G03 第1幕'],
  ['s', 'I\'d like some water and some bread.', '我想要一些水和一些面包。'],
  ['n', '🎵 口诀：金木水火土，肉面茶奶布；液体材料和消息(news)，前不加 a 后无 s，作主语一律配单数 is！想数数量借容器：a cup of / two pieces of！']
];
export default function build() { return autoBuild(SP, { title: '📘 G03 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
