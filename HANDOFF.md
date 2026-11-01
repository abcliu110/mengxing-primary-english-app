
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
