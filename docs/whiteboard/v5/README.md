# v5 公共引擎（决策 31 / 32）

标准画法规格：`../MASTER_DESIGN.md` §2.9；流程与验收：`../SOP.md` §17；重画进度：`../REDRAW_V5.md`。

| 文件 | 作用 |
|---|---|
| `wb5.js` | 引擎：`scene({sprites})` → `K`。rough 线条（`K.line/path/curve/rect/ellipse/circle/arrow/cross/under`）、手写字 `K.text`、角色 `K.actor`（关键帧 `keys` / 走路帧库 `walk`，按距离换帧、之字形揭开）、道具 `K.prop`、镜头 `K.cam`、橙色弹字 `K.pop`、讲解字幕 `K.narr`、英文朗读 + 底部逐词点亮 `K.say`、收尾 `K.shade` / `K.end` |
| `player.js` | 通用播放器（▶/❚❚、拖动、点画面暂停、🔊/🔇、等朗读最多 4 s、先读重点词再读整句；localStorage / speechSynthesis 全部 try/catch） |
| `build.mjs` | `node v5/build.mjs <scene.js> <out.html> "<标题>"`：按场景用到的字子集化 LXGW WenKai + Kalam（`WB_FONTS` 目录，默认 `/workspace/work/fonts`，两款都是 OFL），打成单文件 HTML |
| `shots.py` | `python3 v5/shots.py <out.html> <sheet.png> t1 t2 …`：联络表 + 确定性（同 t 两次截图一致）+ 控制台报错 + sandbox iframe 报错 |
| `sprites/build_sprites.py` | `python3 build_sprites.py <库名> 帧名[:flip] …`：绿幕 PNG（`sprites/src/`，不进仓库）→ 抠图 / 去溢色 / 裁边 / 锚点（bottom、ax、foot、hand）→ `sprites/<库名>.js`（WebP，`MAXH`/`MAXW`/`Q` 控制体积） |
| `scenes/*.js` | 每幕一个工厂函数 `export default function build(){ const K = scene(...); …; return K.done(); }`（播放器先装字体再建场景，排版能量到真实字宽） |
| `out/` | 单文件 HTML + 联络表 |

装依赖：`cd v5 && npm i`（esbuild、gsap、roughjs）。

## 角色帧库登记
| 库 | 帧 | 用在 |
|---|---|---|
| `tm1` | kick0 / kick1 / kick2（男孩踢球：准备 → 抬腿 → 踢出）、mom_teach1 / mom_teach2（妈妈写板书 → 转身讲）、mom_car（妈妈开车，翻转朝右）、bird_up / bird_down（小鸟扇翅）、milk / tea_no / juice_q（喜欢牛奶 / 不喜欢茶 / 果汁？）、g_w0–g_w3（女孩走路 4 帧）、g_ready（女孩接球，翻转朝左） | tense_matrix ① |
| `takeout_wb/src/assets.js` | k1–k3、w0–w3（男孩牵狗走）、d0–d3（狗跑） | take out ② 样板 |
