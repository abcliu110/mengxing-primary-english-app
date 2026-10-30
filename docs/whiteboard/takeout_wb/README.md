# He takes the dog out. —— 动作系统 v5 样板（huashu-art-motion × Remotion）

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
