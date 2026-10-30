# He takes the dog out. —— 动作系统 v5 样板（huashu-art-motion × Remotion）

> ✅ 2026-10-30 10:54 用户确认 **v5.1（`v51/`）为全 App 标准画法**：规格见 `MASTER_DESIGN.md` §2.9，流程与验收见 `SOP.md` §17。下面 v5.0（Remotion Player）部分仅留档。

**决定（2026-10-30，用户同意）**：废弃手写 SVG 小人 v1–v3 和插画切件骨骼 v4，改用**有限动画 / 关键姿势帧**。

| 层 | 用什么 | 负责 |
|---|---|---|
| 画风 / 白板语法 | `huashu-art-motion` 1.2.0（MIT）`scripts/engine/lib` 的 util/motion/paint/kit/camera/diagram，原样拼进 `src/huashu_libs.js` | RSA 白板：#FBFBFB 底、#0A0503 墨线 6.5px、#EF7226 橙强调；`DG.board` 笔画时间线、`DG.zigzag`+`revealMask` 揭开角色、`B.pop` 重音词、`CAM` 推拉、马克笔 |
| 角色 | AI 生成绿幕关键帧 → `build_assets.py` 抠图 → WebP data URI（`src/assets.js`） | k1 弯腰拿钩 / k2 扣项圈 / k3 起身狗跳；男孩走 w0–w3、狗跑 d0–d3（每走 50 世界像素换一帧）；代码只做位移、换帧、牵绳曲线、镜头、字幕 |
| 时间轴 / 出片 / App 播放 | Remotion 4（`remotion`、`@remotion/cli`、`@remotion/player`） | `drawFrame(ctx, t)` 纯函数，Remotion 每帧调用 → MP4；同一组件用 `@remotion/player` + esbuild 打成单文件 HTML |

**Remotion 授权**：个人、≤3 人公司、非营利免费（含商用）；更大的营利公司需买 Company License。

## 镜头（11.5 s，30 fps）
0–3 s 白板画家、门、狗碗，笔尖之字形揭开 k1 → 3–5.5 快推到项圈，k1→k2→k3，橙圈 + `takes` → 5.5–9 横移跟走，跨门时 `out!` → 9–11.5 手画橙箭头、`take out / 带……出去`，拉远整板、浅灰收尾。字幕逐词点亮，takes / out 用橙。

## 构建
```sh
npm i                      # remotion@4 @remotion/cli @remotion/player @remotion/renderer react@18 react-dom@18 esbuild
npx remotion still src/index.js TakeOut out/s.png --frame=118
npx remotion render src/index.js TakeOut out/take_out_wb.mp4 --codec=h264 --crf=20
npx esbuild src/player.jsx --bundle --minify --loader:.woff=dataurl --define:process.env.NODE_ENV='"production"' --jsx=automatic --outfile=out/player.js   # 再内联进 take_out_wb.html
```

## 产物
- `out/take_out_wb.mp4`：1920×1080，11.5 s，1,580,391 bytes
- `out/take_out_wb.html`：单文件 Player，1,024,738 bytes（角色帧 ≈467 KB + React/Player ≈500 KB + 字体子集 ≈7 KB）
- `out/keyframes_sheet.png`：9 个时间点自审截图

## 已知问题 / 下一步
- k3 → 走路帧在 5.5 s 是硬切（有限动画允许），真机审片看是否需要加 1 帧过渡。
- 单文件 1 MB 偏大：并入主 App 时 React + Player 只打一份，所有句子共用。
- 剪影 / 静音盲测、真机审片未做。

## v5.1（决策 31 定稿组合，2026-10-30）
- 源文件 `v51/`：`scene51.js`（场景 + 时间轴）、`player51.js`（自写播放循环，▶/❚❚、拖动条、点画面暂停）、`build51.mjs`（esbuild 打成单文件）、`shots51.py`（Playwright 关键帧联络表）。
- 分工：rough.js 画房子 / 门 / 画框 / 狗碗 / 橙圈 / 箭头（种子固定，展开成折线后「画到一半」，笔尖跟随，两遍描边同时推进，狗碗 hachure 排线描完淡入）；GSAP `timeline({paused:true})` 只用 `tl.time(t)` 取值：镜头快推 / 拉回 / 跟随权重 / 拉远、takes · out! 弹出（back.out）、takes 让位到墙角、走路进度、狗领先距离、收尾浅灰；huashu 负责笔、逐字手写、之字形揭开角色；角色帧库与 v5.0 相同。
- 构建：`npm i && node v51/build51.mjs && python3 v51/shots51.py`
- 产物：`out/take_out_v51.html` 614 KB（v5.0 1.02 MB，去掉 React + Remotion Player）；`out/v51_keyframes.png` 9 个时间点自审，控制台 0 报错。
- 相对 v5.0 的修正：扣项圈橙圈在走路前淡出（v5.0 留在原地、狗走后变成空圈）；takes 走路前缩小让到墙角，不再压男孩头。
- **英文朗读（2026-10-30 10:5x）**：Web Speech API，en-US、语速 0.85（与 App `wb_app.js` 同规则）。朗读点在 `scene51.js` 的 `CUES`：3.45 He takes（扣项圈）→ 4.45 the dog → 6.70 out!（跨门线）→ 9.35 take out（手写）→ 10.35 整句 He takes the dog out.；上一句没念完就到下一个点时时间轴停住等，最多 4 秒；拖动 / 暂停 / 循环会停止朗读；🔊/🔇 开关存 localStorage `wbVoice`；浏览器要求先点一下才能出声，所以不自动播放。总长改为 12.5 秒（结尾整句念完）。无头浏览器打桩验证：5 个朗读点按时触发、0 报错；真机声音待听。
- 待审：真机播放流畅度、k3 → 走路硬切、静音盲测。
