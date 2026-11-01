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
