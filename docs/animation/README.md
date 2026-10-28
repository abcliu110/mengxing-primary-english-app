# 动词短语动画技术方案（真人感 3D 角色 + SVG 场景）

> 给后续 AI / 开发者参考：按本文步骤即可为任意动词短语（take off、put on、get up、get on…）生成同风格动画。
> 参考实现：`docs/animation/take-off/`（take off 试点，已验证效果）。可直接用浏览器打开 `take-off/take-off-demo.html` 查看效果（图片已内嵌）。

## 1. 总体思路

| 层 | 技术 | 作用 |
|---|---|---|
| 角色 | AI 生成皮克斯风 3D 渲染图，同一角色多个**关键姿势** | 真人感、儿童易懂 |
| 抠图 | 绿幕 #00FF00 → Python(PIL+numpy) 抠图、去溢色、统一裁剪、WebP | 体积小（每张约 17KB） |
| 动画 | 纯 JS 函数 `renderXxx(t, assets)` → 返回 SVG 字符串 | 场景、箭头、字幕、姿势交叉淡化 |
| App 内播放 | `requestAnimationFrame` 每帧 `innerHTML = renderXxx(t, ASSETS)` | 可暂停、跳幕、重播，零依赖 |
| 视频导出 | Remotion 逐帧调用同一函数渲染 MP4 | 课程视频、宣传片 |

同一份场景代码同时用于 App 和视频，不维护两套。

## 2. 角色生成（最关键：保持一致）

1. **先生成定妆图**（base），之后所有姿势都把它作为参考图传入。
2. 提示词模板（每个姿势只改 Pose 一句）：

```
The exact same boy from the reference image (same face, hair, red zip-up hoodie jacket,
yellow T-shirt, jeans, white sneakers, same Pixar-style 3D render, same camera,
same scale and framing, full body front view).
Pose: <这里写这一帧的动作>.
Solid pure chroma green #00FF00 background. No text, no watermark.
```

3. 定妆图提示词：`Full-body 3D animated film character render in the style of a Pixar feature film: a friendly 9-year-old Chinese boy, short black hair, natural child proportions (not chibi), red zip-up jacket over yellow T-shirt, blue jeans, white sneakers, front view, arms relaxed, full body with margin, centered, solid pure chroma green #00FF00 background, no text.`
4. 每个短语 3~5 个关键姿势即可。take off 用了：`hot`（热得扇风）→ `off1`（拉开外套）→ `off2`（外套滑到手腕）→ `done`（拎着外套，开心）。
5. 道具/交通工具（飞机、公交车）单独生成，同样绿幕。
6. 生成后务必拼一张对照图人工检查：脸、发型、衣服、比例是否一致；不一致就重生成那一张。

## 3. 抠图与压缩（Python）

```python
from PIL import Image
import numpy as np
def clean(path):
    a = np.array(Image.open(path).convert('RGBA')).astype(int)
    r, g, b = a[...,0], a[...,1], a[...,2]
    a[...,3][(g > r+25) & (g > b+25)] = 0                 # 去绿幕
    a[...,1] = np.where(g > np.maximum(r,b), np.maximum(r,b), g)  # 去绿边
    return a.astype(np.uint8)
```

- **所有姿势用同一个裁剪框**（取各帧不透明区域的并集），这样切换姿势时人物不会跳位。
- 统一缩放到高 480px，存 WebP（quality 82）。
- 记录人物在图中的水平中心比例（take off 为 0.354）和脚底比例（0.992），用于在场景中对齐地面。

## 4. 场景函数规范

参考 `take-off/takeoffScene.js`：

- 画布 `viewBox="0 0 740 320"`，与 App 现有 Canvas 同比例。
- 导出 `renderXxx(t, A)`：`t` 为秒，`A` 为图片地址表（App 内用 base64 data URI，Remotion 用 `staticFile()`）。
- 必须是**纯函数**：只依赖 `t`，不读写全局状态，这样暂停、跳转、视频逐帧渲染都正确。
- 工具函数：`seg(t,a,b)` 时间段进度、`ease()` 缓动、`clamp()`、`arrow()`、`pill()`、`label()`、`subtitle()`。
- 姿势切换：相邻关键姿势用 0.24 秒交叉淡化；加轻微呼吸 `scaleY = 1 + sin(t*3)*0.006`。
- 中文字体栈：`'PingFang SC','Microsoft YaHei','Noto Sans CJK SC','WenQuanYi Zen Hei',sans-serif`。

### 每个短语的三幕结构

1. **第一幕：本义动作**（人物做动作）+ 虚线高亮"表面/容器/地面" + 红色 `OFF` 箭头 + 中英字幕。
2. **第二幕：第二个常见义**（如飞机起飞），同一个空间向量。
3. **第三幕：合成**：`TAKE`（拿、取）+ `OFF`（离开表面）两枚胶囊合并，两张例句卡，底部一句"共同点"。

总时长约 15~17 秒，每幕之间 0.3 秒白色淡入淡出。

## 5. 接入 App（下一步）

当前 App 的"万能动词 × 空间向量"页（`startSuperLabCanvasLoop` 中 `verb_matrix` 分支）只画两个静态角色。接入方式：

1. 在 `VERB_VECTOR_COMBINATIONS` 条目上加 `anim: 'take_off'`。
2. 把场景函数和 WebP（base64）放进主 HTML；选中有动画的组合时，用一个 `<div>` 覆盖在画布上，按第 4 节方式播放，配"重播/①②③跳幕"按钮。
3. 没有动画的组合保持原画面。
4. 体积预算：每个短语约 100~150KB（5~6 张 WebP）。

同时修复已发现的两个旧 bug：
- `drawHDCharacterActor` 调用传的是 `headBadge`，函数读 `badgeText`，头顶标签不显示。
- 时间 `t` 作为第三个参数传入，函数从配置对象里取 `t`，人物呼吸/眨眼不动（约 24 处调用）。

## 6. 导出视频（Remotion）

```tsx
// TakeOff.tsx（见 take-off/ 目录）
const A = {hot: staticFile('to/to_hot.webp'), /* ... */};
export const TakeOff = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <AbsoluteFill dangerouslySetInnerHTML={{__html: renderTakeOff(f / fps, A)}} />;
};
// Root.tsx: <Composition id="TakeOff" component={TakeOff} durationInFrames={510} fps={30} width={1480} height={640} />
```

`npx remotion render src/index.ts TakeOff out/take-off.mp4`

## 7. 选型结论（为什么这样做）

- 自绘扁平矢量人物：可做连续动作，但"不像真人"，用户不接受。
- 开源人物（Open Peeps 等）：好看但只有静态姿势；Lottie 素材角色风格不统一，缺少带道具的动作。
- 3D 骨骼动画（Mixamo、Quaternius + three.js）：动作最连贯，但模型每个数 MB，没有"脱外套、上车"这类带道具的动作，不适合离线单文件 HTML。
- **AI 关键姿势 + SVG 场景**：真人感、风格统一、体积小、能交互，代价是姿势之间是淡入淡出而非连续动作。需要更连贯时，每个动作多生成 1~2 张中间帧。
