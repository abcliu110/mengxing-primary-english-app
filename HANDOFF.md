## 黑白马克笔 + 2D 骨骼 · 倒咖啡试点（2026-11-01，未嵌 App，等用户看片）
- 目的：回答用户「实际效果会不会和第一幅风格图（/workspace/style1_marker.png）一样、能不能用骨骼」。13.2 s 四拍：立场景 → 动词重音 pours → 伸手 / 握起提壶 / 倾倒入杯 / 放回 → 总结 She pours the coffee.
- 新文件（不碰 T16 车道文件）：`docs/whiteboard/v5/lib/rig.js`（自研骨骼：层级 FK、两骨 IK、肘外角叠盖、部件逐笔揭开）、`v5/rig/trace_parts.py` + `v5/rig/barista_marker_sheet.png`（generate_image 部件表）→ 生成 `v5/rig/barista_marker.js`（potrace 矢量 + 骨架中心线，已入库，换线稿后重跑 `python3 rig/trace_parts.py`，依赖 `pip install potracer scipy scikit-image`）、`v5/scenes/pilot_marker_rig_pour.js`；`v5/check_hd.py` 加 `--mono`（彩色只许 #EF7226、橙色不许描线、位图源须为 0）。
- 打包 / 验收：`node build.mjs scenes/pilot_marker_rig_pour.js out/pilot_marker_rig_pour.html "试点 · 黑白马克笔 + 骨骼 · 倒咖啡"`；`python3 check_hd.py --mono pilot_marker_rig_pour`；构建期断言在场景里（出流窗、断流先于回正、满倾壶嘴低于壶身、壶嘴朝下 ≥20°、落点在杯口、液面单调上升、IK 误差 ≤4 px、壶锁手骨偏差 0、关节断缝 0），数字挂在 `globalThis.__RIGSTATS`。
- 产出（工作区，不进仓库）：`/workspace/work/marker_rig_review.png`（14 格审片）、`/workspace/work/vid/marker_rig_pour.mp4`（25 fps，1280×720）、`/workspace/work/marker_vs_ref.png`（与参考图并排）。
- 待用户确认：风格是否够接近；接受后再决定是否把 rig.js 做成通用人物层（要给每个角色出一张部件表）、是否嵌入 App。已知差距见 CHANGELOG 同名条目。

## 有界无界①「全部手绘」样板（2026-11-01，未嵌 App，等用户看审片图）
- 新文件（不碰 T16 车道的 props.js / fp_boundedness_1_v3.js / gen_boundedness_1.js）：`docs/whiteboard/v5/scenes/fp_boundedness_1_hd.js`、`v5/lib/hd.js`（rough 逐笔道具层）、`v5/lib/pour.js`（倒液物理 + 断言）、`v5/check_hd.py`、`v5/shots_hd.py`；人物帧 `v5/sprites/cast/bar_*.webp`（店员 4）、`lin_*.webp`（Linda 7），已登记 `model/cast/registry.yaml`。
- 帧库是 gitignore 生成物，新 clone 先重建：
  `cd docs/whiteboard/v5/sprites && MAXH=640 python3 build_sprites.py bndhd bar_stand bar_reach bar_lift bar_pour && MAXH=2000 MAXW=2000 python3 build_sprites.py lindahd lin_stand lin_think lin_idea lin_point lin_laugh lin_cut0 lin_cut1`
- 打包 / 验收：`node build.mjs scenes/fp_boundedness_1_hd.js out/fp_boundedness_1_hd.html "有界无界 1 · 手绘样板"`；`python3 ../src/insightcheck.py --only=fp_boundedness_1_hd`；`python3 check_r38.py fp_boundedness_1_hd`；`python3 check_hd.py fp_boundedness_1_hd`。
- 待用户确认：审片图（倒咖啡段 10 格 + 全幕 8 格）。确认后再决定：嵌入主 App（替换 `wb5html-fp_boundedness-0`）、是否把 hd 画法下沉成家族模板（与 T16 车道协调）。
- 沙盒没有 openssh：推送用 `git -c core.sshCommand=/workspace/work/bin/ssh push`（paramiko 写的最小 ssh 替身，`pip install paramiko`；不改仓库 config）。


## 远端改为 SSH（2026-11-01）
- origin：`git@github.com:abcliu110/mengxing-primary-english-app.git`
- Hark 沙盒使用专用密钥 `/workspace/.ssh/mengxing_deploy`（ED25519，指纹 `SHA256:He+qn/HFXJ783ya2sI2BvWZaNc8hWPPLVVzOINnKThU`），已写入本地 `core.sshCommand`；私钥不入库。
- 用户自己的机器（如 muse-vm）用各自的 SSH key 即可。

## 检查环境注意（2026-11-01）
- `runall` 依赖：`pip install playwright brotli numpy pillow` + `python3 -m playwright install --with-deps chromium`；缺 brotli 时所有打包会以 WOFF2 编码错误失败。
- `v5/sprites/fb39v2.js` 为 gitignore 的生成物，新 clone 需先重建，否则 fp_boundedness_1_v2/v3、gen_boundedness_1 打包失败：
  `cd docs/whiteboard/v5 && python3 sprites/build_sprites.py fb39v2 l_coff0 l_coff2 l_idea0 l_laugh l_point l_think l_w0 l_w1 l_w2 l_w3 woman`
- app_check15「年级 + 词性」期望值改用 app 自身的 `wlPosMatch`（随 bccab02 词元匹配修复同步，原 `includes('n.')` 会把 pron. 算进名词）。
- app_check15 期望值同时排除 `verb_form_of` 条目（对齐 6df094f 动词只显示原形）。

## 介词动画·调研原样复刻（2026-11-02，Hark）
- 文件：laws-prototype/prep-anim-research-copy-v1.html（单文件离线；源码与构建脚本在沙盒 /workspace/work/prepcopy/，`cat engine.js s12.js s34.js s56.js s78.js main.js > app.js && python3 build.py`）。
- 用途：按调研 02（介词界面）与 05（白板动画）原样复刻 9 节做法，每节标注出处与"细节为推测"，供用户看效果后再改进。未嵌入 App。
- 已知不足：05 报告在 §1.4 中途被截断，§2 缺失；造型均为推测；8b 节与 whiteboard-prototype-v1.html 的 over 课可能重复，未核对。
