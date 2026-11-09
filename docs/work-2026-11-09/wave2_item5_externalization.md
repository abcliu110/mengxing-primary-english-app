# 第二波第 5 项工作底稿：图片 + 视频外置（只做 A/B/C，不做 JS/CSS 外置）

- 实施日期：2026-11-09；实施起点：HEAD `7c6aeb4`（已 `git pull --rebase`，与远端同步，工作区干净）
- 方案依据：`docs/work-2026-11-09/externalization_plan.md`（第一波 TODO 3.2 方案，实测基准 HEAD `e97aaec`），只做其中第 1 步（A/B/C：图片+视频）
- 范围外（未碰）：第 3 项白板嵌入（已卡住停手）、全部 JS/CSS 外置（D1/F）、数据文件、TODO 文档、fp 代码；README 未改（见 §7 待定）

## 1. 实测现状（动手前，先核对计划数字）

| 项目 | 计划（e97aaec） | 本次实测（7c6aeb4） | 结论 |
|---|---|---|---|
| 主文件字节 | 23,347,215 | **23,563,219** | 多 216,004 字节（+300 行，22,132 行），为 e97aaec 之后各波改动累积；data URI 数量未变 |
| data URI 总数 | 66 个（65 JPEG + 1 MP4） | **66 个（65 JPEG + 1 MP4）** | 一致 |
| JPEG URI 合计（含 `data:…;base64,` 前缀） | 3,588,951 | **3,588,951**（payload 3,587,456） | 一致 |
| MP4 URI 合计（含前缀） | 1,403,662 | **1,403,662**（payload 1,403,640） | 一致 |
| data URI 合计 | 4,992,613（21.4%） | **4,992,613** | 一致 |
| 帧图 `<img class="frame">` | 57 张，payload 2,480,604 | **57 张，payload 2,480,604，互不重复 57/57** | 一致（计划的 2,481,915 = payload + 57×23 前缀） |
| PK_PH 真照片 | 8 张，payload 1,106,852 | **8 张（at/behind/in/in_front_of/on/over/through/under），payload 1,106,852，互不重复 8/8** | 一致（字典本身 1,107,171 字节，含键名/引号） |
| MP4 | 1 段，解码后 1,052,730 | **1 段，解码后 1,052,730，H.264/AAC，500×350，63.28 秒** | 一致 |
| 其它 data URI（PNG/SVG 等） | 无 | **无** | 一致 |
| 既有 `assets/` 引用 | 0 | **0**（无重名冲突） | 可按计划落点 |

与计划的两处出入（均不影响实施）：
1. 主文件比计划基准大了 216,004 字节——后续各波改动所致，data URI 部分一字节未变。
2. 计划称帧图 `alt=""` 为空；现状 57 张帧图均已有中文 alt 描述（应为第一波 TODO 4.1 补的），外置时原样保留、未改动。
3. `PK_PH` 消费点只有 1 处（`PK_PH[ph.file]`，第 11523 行，`pvPhotoCard` 内模板字符串），与计划一致；`PK_PH` 本身是介词模块 IIFE 内的 `const`（第 10489 行），不是 `window` 全局量——jsdom 里 `typeof PK_PH` 为 undefined 属正常，不影响功能。

## 2. 抽了哪些文件（清单，66 个）

落点与引用方式严格按计划 §4.2：`laws-prototype/assets/img/prep-frames/`、`assets/img/prep-photos/`、`assets/video/`，相对路径引用。编号按文档出现顺序。每个文件均经 base64 往返校验（解码后重编码 == 原 payload）、JPEG 经 SOI/EOI 标记 + PIL 全量 `verify()`、MP4 经 `ffprobe` 核对。

### A. 57 张帧图 → `assets/img/prep-frames/frame-01.jpg` … `frame-57.jpg`

| 文件 | 解码后字节 | MD5 | alt（前 30 字） |
|---|---|---|---|
| assets/img/prep-frames/frame-01.jpg | 41910 | `472550555beb789c71158518847976ad` | 白板上分四行对比 under、below、beneath、u |
| assets/img/prep-frames/frame-02.jpg | 42975 | `65e666d43949532843593e2ae6b1c1a9` | 同一块白板，老师指着 beneath 一行，under 旁边 |
| assets/img/prep-frames/frame-03.jpg | 27574 | `b0f07a7b9a82df600c1fc95d68d32ab4` | 白板上写着四句例句：夹克里面穿了五层衣服、楼下公寓太吵、排名 |
| assets/img/prep-frames/frame-04.jpg | 38725 | `cd73d732943eda10b249001caa9fb265` | 白板上分行对比 over、above、on、on top o |
| assets/img/prep-frames/frame-05.jpg | 39324 | `7fcd5a2b2c62e528363b85243ff9f765` | 同一块白板，老师双手一上一下比出两个高度，讲 over 的移 |
| assets/img/prep-frames/frame-06.jpg | 25150 | `e7d2ec37886380ccdc53c42e47bf541d` | 白板上写着三句例句：把画挂在壁炉上方、把毯子盖到我腿上、除了 |
| assets/img/prep-frames/frame-07.jpg | 30162 | `5c920245292a070aaf264f2366240b93` | 白板上画着方块 a 在方块 b 正上方、长条 a 竖在 b  |
| assets/img/prep-frames/frame-08.jpg | 44564 | `c3621d206af520b6694bb19c1df80dfe` | 同一块白板下方添了例句：他走过砖拱门下方、船从金门大桥下面驶 |
| assets/img/prep-frames/frame-09.jpg | 36210 | `b7d43a066c32c78274d6e05a1c14d0dd` | 同一块白板右侧写着设备在货车下面爆炸、数字画在桌子下面，底下 |
| assets/img/prep-frames/frame-10.jpg | 27836 | `de42da25724048b1e871445a461b5cd7` | 女老师身旁两个气泡写着：请解释 up、on、over 和 u |
| assets/img/prep-frames/frame-11.jpg | 32805 | `0a6abb1028305e44c522918c9e6b779c` | 同一画面，气泡换成 on 和 upon 可以互换、但 upo |
| assets/img/prep-frames/frame-12.jpg | 29050 | `470c92fd571f640687dab3f085397eaa` | 男老师身旁写着三句等义句：他沿着路骑车，等于顺着路骑车、沿路 |
| assets/img/prep-frames/frame-13.jpg | 29215 | `b2d33f36b729e2c76e60ac0ba1a18e73` | 一男一女沿着海边小路走向远处的灯塔，配文是他们正朝着灯塔走去 |
| assets/img/prep-frames/frame-14.jpg | 27109 | `cf4412fe59397f7c5cd6afeeb2a49fa4` | 男老师双手比出上下两层，配文是那对夫妻从桥下面走过。 |
| assets/img/prep-frames/frame-15.jpg | 35848 | `4805966d70d0cb9b28e34cf5dad1b3d0` | 女老师身旁画着从房子到办公楼的虚线路线，配文是从家里走到公司 |
| assets/img/prep-frames/frame-16.jpg | 39902 | `4e3bce3bd470f314a5b89ee56d23f291` | 白板上写着 TO、TOWARD、TOWARDS 三个词，to |
| assets/img/prep-frames/frame-17.jpg | 53116 | `e8cfc7b665159b18c698191fc488dfd8` | 白板左右对照 over 与 across：左边跳过小溪、翻过 |
| assets/img/prep-frames/frame-18.jpg | 32481 | `1eb54fde1c6dd86a858f1f30d907e571` | 闪卡上一个红球在灰盒子左边，一支红色粗箭头绕着盒子转了一圈。 |
| assets/img/prep-frames/frame-19.jpg | 25410 | `c3a4225796f09f24fa31a43c8a28cb69` | 闪卡上一个红球在灰圆筒左边，一支红色粗箭头穿过圆筒指向右边。 |
| assets/img/prep-frames/frame-20.jpg | 29408 | `420fb206dc3fd434a0c4a5b10f1b1098` | 闪卡上一个红球在灰盒子左下方，一支红色粗箭头从球处向上越过盒 |
| assets/img/prep-frames/frame-21.jpg | 17264 | `fd00c5ce379339aee2e016eb73c384e8` | 紫色盒子旁一个红球，黑色虚线椭圆绕着盒子转了一圈，上方写着  |
| assets/img/prep-frames/frame-22.jpg | 35038 | `ecec4302904f396af5d8c5e3466e910d` | 一辆粉色小汽车正开过河上的吊桥，配文是小汽车正穿过桥。 |
| assets/img/prep-frames/frame-23.jpg | 18284 | `3924496b1c9510d60a9e1bfe385e4336` | 一只老鼠叼着奶酪站在大灰管子右端，配文是老鼠正穿过一根管子。 |
| assets/img/prep-frames/frame-24.jpg | 19376 | `8b99623451c64bbecb3c85ee299322a9` | 蝙蝠在最上面、猫在中间、老鼠在最下面叠成一摞，配文是猫在老鼠 |
| assets/img/prep-frames/frame-25.jpg | 31559 | `e5fe957f57de87b578100c8d90bc4b7b` | 一只粉色猫站在写着 S 的积木和写着 G 的积木中间，下方写 |
| assets/img/prep-frames/frame-26.jpg | 16244 | `fea3ca642b4d8a926308b404698ae76f` | 一只白鹅独自站在左边，右边站着一群驼鹿，两边隔着一段距离。 |
| assets/img/prep-frames/frame-27.jpg | 40741 | `ad36b01d04a8e03c834c9e70631dc8a1` | 白板左右对照 among 与 between：左边在加拿大众 |
| assets/img/prep-frames/frame-28.jpg | 32908 | `1c57ce2c50b6f0fa6d7f0d98bfa4533f` | 白板上写着 between 是有确定路径、玻利维亚夹在智利等 |
| assets/img/prep-frames/frame-29.jpg | 34814 | `4b1b45c796576b0c29ef07cef70cb150` | 白板标题是 Among、Amongst、Between，写着 |
| assets/img/prep-frames/frame-30.jpg | 27558 | `bf1c7924e3865ba7007134d1d4bb4a41` | 女老师身旁写着 BESIDE 的意思是 next to，架子 |
| assets/img/prep-frames/frame-31.jpg | 35644 | `47f20d3f16042cd742a3de0fcf1b6634` | 白板对比 BESIDES 的两种意思：除了听力考试还做什么、 |
| assets/img/prep-frames/frame-32.jpg | 26321 | `806ae5ddf19eacbffb9caa46994871e9` | 白板上写着 BESIDES 作副词表示补充原因：不想把卧室刷 |
| assets/img/prep-frames/frame-33.jpg | 90613 | `1ac0f0143acae1b4dfe4af3d486c29ec` | 女老师站在花园里，左手边一把木椅、右手边一个纸箱，她站在两者 |
| assets/img/prep-frames/frame-34.jpg | 28313 | `58d712e232bf2d5797b6f7f358e16952` | 左右分栏对比 IN 与 AT：左边 in 用于大而笼统的地方 |
| assets/img/prep-frames/frame-35.jpg | 89093 | `d149bf08adab766cc5e958a7a3b15ca1` | 女老师站在一个纸箱后面，只露出上半身、双臂举起，画面上写着  |
| assets/img/prep-frames/frame-36.jpg | 55921 | `94aa5b9c8d64d0ac2a0c710fd4802049` | 戴耳机的男主持人身旁写着 for 与 since 的标题，例 |
| assets/img/prep-frames/frame-37.jpg | 53653 | `47af0ef32fc4dd8b61b9221dffeaf20b` | 同一节目画面，文字换成 for 的用法：用现在完成时说情况持 |
| assets/img/prep-frames/frame-38.jpg | 56342 | `8c88fffd6dfc9111bfd6d135f104419e` | 同一节目画面，文字换成 for 与 since 的选择题：我 |
| assets/img/prep-frames/frame-39.jpg | 20020 | `fde103c758c41f6fd9d5e4a94a216b6d` | 男老师在白板时间轴上指着中午 12 点，写着 by、unti |
| assets/img/prep-frames/frame-40.jpg | 19421 | `fc6a5bdd52f2b13f4b267a06b168ed74` | 同一块白板，老师的手指着中午 12 点的时间线，下方写着一次 |
| assets/img/prep-frames/frame-41.jpg | 27389 | `86289ede7aee50f2a8e66363cb2a6731` | 白板上写满 by 与 until 的例句：五点前做完作业、五 |
| assets/img/prep-frames/frame-42.jpg | 11501 | `8fdcf458f00c0e13ad3f48d00314a75f` | 左边写着他去上学，右边一辆黄色校车、车前挂着显示 8:45  |
| assets/img/prep-frames/frame-43.jpg | 13278 | `4d0bd7db782528ac8752e91fa075d2c5` | 左边写着妈妈五月种菜，右边画着一小块菜地、菜苗牌和小铲子。 |
| assets/img/prep-frames/frame-44.jpg | 10624 | `b64e28e0b4f3db8f38086b232422074c` | 左边写着我的课下午三点结束，右边画着一个黄色学校铃铛。 |
| assets/img/prep-frames/frame-45.jpg | 24942 | `9eb4d32bf928c330d809a5d4bbf51760` | 女主持人右侧写着 AT 用于准确时间：比赛下午两点开始，日落 |
| assets/img/prep-frames/frame-46.jpg | 22891 | `1997435c3dd1324308b39641682d2dd8` | 同一女主持人右侧换成 IN 用于较长时段：月份、年份、几十年 |
| assets/img/prep-frames/frame-47.jpg | 27249 | `c4574b2b2fc5f0b98bbc5825ed940b04` | 另一位女主持人右侧写着 ON 用于较短时段：星期几、日期、假 |
| assets/img/prep-frames/frame-48.jpg | 27234 | `b0c3a50d8cb23e1d73e063381a48ccce` | 白板上两个相交的椭圆分别标着 to 和 for，to 的圈里 |
| assets/img/prep-frames/frame-49.jpg | 34777 | `6c0fa007a556b41452d3fda7e22a7175` | 同一张维恩图上 to 的圈和 for 的圈相交在 helpf |
| assets/img/prep-frames/frame-50.jpg | 30658 | `bd073a5a88debcf9036b2bdfd019f649` | 对话卡上 Brian 和 Anna 用 to 和 for 对 |
| assets/img/prep-frames/frame-51.jpg | 27800 | `1132e061607b5064d10b5fbfc5813da7` | 白板标题是 Comparison，写着 like 后接名词、 |
| assets/img/prep-frames/frame-52.jpg | 34658 | `f919db310cf6fd3e6e01f7cc3872c6a0` | 同一块白板写满 like 与 as 的例句：他看起来像火星人 |
| assets/img/prep-frames/frame-53.jpg | 29108 | `d1e7c7cf3f5df4a53ddac2e2a29f8a5e` | 白板标题是 By 或 With，写着 by 回答谁做的动作： |
| assets/img/prep-frames/frame-54.jpg | 26284 | `1b639ade1bfd94ae6b18d3079ebd4792` | 白板上画着你和朋友两个小人并排站着，写着 with 表示陪伴 |
| assets/img/prep-frames/frame-55.jpg | 29978 | `41aeb3c0b54bb1942894234edf17463d` | 同一块白板写着 with 表示工具：他用石头打破了窗户，我用 |
| assets/img/prep-frames/frame-56.jpg | 22797 | `40461d9e95ce595df2c297f0721eba03` | 穿蓝白条纹毛衣的男老师站在白门前，字幕说我把家里一间卧室当办 |
| assets/img/prep-frames/frame-57.jpg | 21320 | `1ef51f3f7d8072f8aebed7b72c6894bd` | 同一位男老师双手张开比划，字幕只写着 AS IF……。 |

帧图小计：解码后 1860389 字节。

### B. 8 张真照片 → `assets/img/prep-photos/<原文件名>.jpg`（沿用原文件名）

| 文件 | 解码后字节 | MD5 |
|---|---|---|
| assets/img/prep-photos/at.jpg | 134046 | `597b45cf95c625ed6f7598dbf9e8ebc9` |
| assets/img/prep-photos/behind.jpg | 117605 | `d827df3b403313e1db6e8a6dcd24e742` |
| assets/img/prep-photos/in.jpg | 150218 | `a9728c3eeaf7a6d09b4400cb2438d9ef` |
| assets/img/prep-photos/in_front_of.jpg | 47763 | `79828000f279ab36f119ed12c99ba30e` |
| assets/img/prep-photos/on.jpg | 69946 | `93b375e80f8fafe819d9b1112ba9e4dc` |
| assets/img/prep-photos/over.jpg | 152651 | `fd23f03e36232ee287be028d6a0696e2` |
| assets/img/prep-photos/through.jpg | 123241 | `60442e918cc60cdd38d70064363377dd` |
| assets/img/prep-photos/under.jpg | 34661 | `eab8de3a466e559029a4627a30c141b7` |

真照片小计：解码后 830131 字节。

### C. 1 段视频 → `assets/video/clip.mp4`

| 文件 | 解码后字节 | MD5 |
|---|---|---|
| assets/video/clip.mp4 | 1052730 | `1d1a5627017b7608720519958d5af5c7` |

视频：H.264 + AAC，500×350，63.28 秒（ffprobe 核对）。

**外部文件合计：66 个，3743250 字节。**

## 3. 引用改法

- 帧图：57 处 `<img class="frame" loading="lazy" decoding="async" src="data:image/jpeg;base64,…" alt="…">`，只把 `src` 的 data URI 换成 `assets/img/prep-frames/frame-NN.jpg`，其余属性（`class`/`loading`/`decoding`/`alt`）一字未动。
- 真照片：`PK_PH` 字典（第 10489 行）的 8 个值由 data URI 换成相对路径，如 `"at.jpg": "assets/img/prep-photos/at.jpg"`；消费点 `PK_PH[ph.file]`（第 11523 行）**未动**，渲染出的 `src` 自然变为相对路径。注意：这是字典的 8 个字符串值替换，不是 JS 代码逻辑改动；JS/CSS 块未搬移、未重排、未改逻辑。
- 视频：`<video id="clip-video" controls preload="metadata" src="data:video/mp4;base64,…">` 的 `src` 换成 `assets/video/clip.mp4`，`controls`/`preload="metadata"` 保留。
- 其余：未抽出的图片/视频——**无**。66 个 data URI 全部抽出，主文件内 `data:image/jpeg` / `data:video/mp4` 残留 0 处；没有因引用方式特殊抽不出来的项。
- 逐字节证明：把同样的 66 处替换重放到 `git show HEAD:` 的原文件上，得到的文件与提交的新文件**逐字节相同**；`git diff` 只涉及 22 行（视频 1 行 + 帧图 20 行 + PK_PH 1 行），行数不变（22,132 行）。

## 4. 体积前后对照

| 项目 | 外置前 | 外置后 | 变化 |
|---|---|---|---|
| 主文件 `mengxing-prototype-v1.html` | 23,563,219 字节 | **18,572,877 字节** | **−4,990,342 字节（−21.18%）** |
| 外部文件（新增 `laws-prototype/assets/`） | 0 | 66 个文件，3743250 字节 | +3743250 字节 |
| 仓库磁盘总量（主文件 + assets） | 23,563,219 | 22,316,127 | −1,247,092 字节（省掉的 base64 膨胀） |

说明：省下的 4,990,342 字节比 data URI 合计 4,992,613 少 2,271 字节——那是 66 条相对路径引用本身占的长度。计划预估省 21.4%（以 e97aaec 基数计）；以本次基数计实得 21.18%，口径一致。

## 5. 验证结果

### 5.1 静态检查

- `python3 laws-prototype/tools/check_all.py`：**24/24 PASS，结论“全部通过”**（生成器 --check 全部逐字节一致——JS/CSS 数据块未被触动）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：退出码 1，`anchorcheck: FAIL（116 项）`，**输出与 HEAD 原文件逐字节相同**（逐项 diff 无差异；`node --check: inline scripts=41 → OK`）。116 项为基线遗留（wbmod 锚点缺失等，第 3 项卡点同源），本次未增未减。
- 残留检查：主文件 `data:image/jpeg` 0 处、`data:video/mp4` 0 处；`assets/img/prep-frames/frame-` 引用 57 处、`assets/img/prep-photos/` 8 处、`assets/video/clip.mp4` 1 处。
- 媒体文件校验：65 张 JPEG 全部通过 PIL `verify()` + 全量解码；MP4 ffprobe 通过（H.264/AAC，500×350，63.28 秒，1,052,730 字节）。

### 5.2 Playwright + 本地 Chromium（`file://` 打开）

Chromium 来自 `~/.cache/ms-playwright/chromium-1248`。三轮实测：

- 页面正常加载：标题“萌星英语 · 规律版原型 v1”，`LAWDATA` 已定义；全程 **0 pageerror、0 console error**。
- 视频（介词区 → 课 2 `lesson-dim`）：`readyState 4`，500×350，时长 63.28 秒；调用 `play()` 后 2.5 秒 `currentTime` 走到 2.27 秒，正常播放。`preload="metadata"` 外置后才真正只读元数据（计划预期行为）。
- 帧图 57 张：分布在 5 个分镜板视图（`board-vertical` 11、`board-path` 12、`board-place` 12、`board-time` 12、`board-abstract` 10），逐个视图打开并滚动触发懒加载后，**57/57 全部 `complete && naturalWidth > 0`，0 张破损、0 张待加载**。注意：帧图在 `loading="lazy"` + 视图默认隐藏的情况下，首页加载时不加载、滚动首页也触发不了——必须进介词区打开对应分镜板才加载，这是懒加载正常生效的表现，不是缺图。
- 真照片 8 张：逐个打开 8 个单词详情（`w-in/w-on/w-at/w-over/w-under/w-behind/w-through/w-in-front-of`），每张都在当前可见视图内渲染出正确的 `src` 与真实尺寸，**8/8 加载成功**（如 `in.jpg` 880×660、`on.jpg` 500×750、`in_front_of.jpg` 600×408）。
- 唯一一次失败请求：每轮加载出现 1 次 `assets/video/clip.mp4 :: net::ERR_ABORTED`。同时该视频另有 **2 次请求均返回 HTTP 200**，且视频可正常播放、进度正常推进——判定为 Chromium 废弃掉一次已超前的元数据/分段请求（`preload="metadata"` 后开始播放时另起请求，旧请求被取消），不是文件缺失（404 是另一回事）。记录在此，供复核。

### 5.3 jsdom 加载与引用检查

- 加载后 DOM：57 个 `<img>`（57 张 frame），58 个外部引用（57 帧图 + 1 视频），**在相对路径上全部存在，缺失 0**；`PK_PH` 8 个值对应文件全部存在；`LAWDATA` 已定义。
- 在 jsdom 内调用 `PK.show('w-in')`，照片卡正常渲染出 `assets/img/prep-photos/in.jpg`，文件存在。
- jsdom 报错 7 条，与 HEAD 原文件**逐条相同**：`HTMLCanvasElement.getContext()` 未实现、`Cannot set properties of null (setting 'font')`（画布上下文为空所致）、`Window.scrollTo()` 未实现 ×5——均为 jsdom 环境限制（无 canvas、无滚动），不是本次改动引入。

## 6. 上线待办（本次不做，记在这里）

1. **完整 JS 外置（D1，18.7 MB，80.3%）+ CSS 合并外置（F，0.8%）**：留到上线前再做。原因按计划 §4.1/§7.5：要改全部生成器输出路径（最大的后续工程点——21 个 GENERATED 块的生成器目前是往主文件里插块的，外置后须改成写 `assets/js/sXX-*.js`），且丢掉“单文件随手转发”；现在还在高频迭代期。做时须守计划 §3.3 三条硬规则：41 个脚本顺序与原块一致、不加 `async`/`defer`、不用 ES module、整块搬运不拆块内结构；并同步改造 `jscheck.py` 使其覆盖 `assets/js/*.js`。
2. **生成器链改造**（与上条同批）：21 个 GENERATED 块的源模型在 `laws-prototype/model/`（37 MB），生成器在 `laws-prototype/tools/gen_*.py`；外置后改数据应改模型后重新生成对应的 `assets/js/sXX-*.js`，不要手改外置文件，否则下次重新生成会与外置结构冲突。
3. **发布打包工具**（计划 §5.3/§4.2）：`tools/build_single_file.py`（把 `assets/` 拼回单文件，用于发布单文件版）本次未做，只留接口位置；回退手段目前是 `git revert` / 从 git 历史取回原文件。

## 7. 未做 / 待定夺 / 未核实

### 未做（计划里有、但属于后续步骤，本次按任务范围未实施）

- README“文件夹完整性”说明（计划 §6.1：整个 `laws-prototype/` 文件夹须完整保留、不要只单独复制 HTML，分享时打包 zip）：**未加**。外置后“单文件随手转发”特性已部分丢失（只发 HTML 会丢全部 66 张图/视频），这句提示是否现在补、还是等 D1/F 全量外置时与自检脚本一起补，待定夺。
- 启动自检脚本（计划 §5.2，<2 KB，报缺失数据文件）与 `<img onerror>` 占位兜底：未加——那是全量外置（D1）配套的步骤 4 内容，本次只做 A/B/C，未擅自加。
- `prepositions-prototype-v1.html`（旧原型文件）里也含有 `data:image/jpeg`：**未碰**，不在主文件范围内。

### 待定夺

- 上条 README 提示的补时点（现在补 vs 全量外置时一起补）。
- 完整 JS 外置（D1/F）的启动时点（上线前，见 §6）。

### 未核实

- **真机双击未核实**：Playwright `file://` 是最接近的验证，不是真人双击；Chrome / Edge / Safari / Firefox 真机双击打开、逐区走查、低端平板首屏耗时均未实测。
- `clip.mp4` 的 `ERR_ABORTED` 仅凭“2 次 200 + 播放正常”判定为良性取消，未在其它浏览器上复核。
- 外置后 `file://` 下的缓存行为、二次打开速度未测（计划已说明 `file://` 缓存不可靠，不作承诺）。

## 8. 提交记录

- `e8a4d00` Content：图片+视频外置（assets + 主文件引用）——主文件 23,563,219 → 18,572,877 字节，67 个文件改动（新增 66 个外部文件 + 主文件 22 行改动）
- （实施员填提交哈希）Docs：第二波第 5 项工作底稿

## 附录：核对命令

```
python3 laws-prototype/tools/check_all.py   # 24/24
python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html  # anchorcheck 116 项，与 HEAD 基线逐项一致
python3 /tmp/pw_verify2.py / /tmp/pw_verify.py  # Playwright file://（脚本在 /tmp，未进仓库）
NODE_PATH=/tmp/domtest/node_modules node /tmp/jsdom_verify.js  # jsdom 引用检查
```

测量与抽取脚本在 `/tmp`（`measure1/2`、`extract_media.py`、`/tmp/wave2_item5_manifest.json`），未进仓库；清单 MD5 见 §2。
