# 交接文档：万能动词×向量 动画（VV）

> 每做完一组（一行动词，6 格）提交一次，并更新本文档的「进度」和「变更记录」。
> 技术方案见同目录 `README.md`（take off 试点）。本文只记录**现在的状态、约定和下一步**。

## 1. 范围与约束

- 只改主文件 `萌星小学英语_最终合并版.html`，其他 HTML 不动。
- 页面：十二大王炸实验室 → ① 万能动词×向量转盘（`labTab: 'verb_matrix'`）。
- 共 6 动词 × 6 小品词 = 36 格。有动画的组合播放 VV 动画；没有的保持原来的 Canvas 双人画面。
- 不限制文件体积（用户确认）。
- 直接提交到 `master`，不新建分支（用户 2026-10-29 要求），每组一个提交。

## 2. 代码位置（主文件内，行号会漂移，按关键字搜索）

| 关键字 | 作用 |
|---|---|
| `const VV_ASSETS_B64` | 所有姿势和道具 WebP 的 base64，键名就是素材名 |
| `const VV = (function` | 动画引擎：工具函数、背景/道具绘制、合成幕 `synth`、`SCENES` 表、`render/has/timing` |
| `const SCENES = {` | 每个短语一条：`a1` 本义幕、`a2` 第二义幕、`syn` 合成幕配置；可选 `t1/t2/dur` |
| `vvBlobUrls` / `vvPlayer` | App 内播放器：base64 → Blob URL，rAF 驱动，暂停、跳幕 |
| `VV.has(comboKey)` | 转盘页判断这一格有没有动画 |
| `VERB_VECTOR_COMBINATIONS` | 36 格的文字数据（短语、本义、释义、例句） |

## 3. 约定

- 写新场景时以主文件 `VV` 里的 TAKE 和 GET 场景为模板，不要参考已删除的矢量小男孩写法。

- **场景函数**：`xxx1(t, A)` 和 `xxx2(lt, A)` 返回 SVG 片段，画布 740×320，必须是纯函数（只依赖时间）。
- **默认时长**：本义幕 0–7.0s，第二义幕 7.0–12.0s，合成幕 12.0–16.4s，幕间 0.3s 白场。
- **姿势**：`poses(t, A, [[素材名, 开始秒], ...], 中心x, 脚底y, 高度, spec)`，相邻姿势交叉淡化 0.24s，带呼吸。
- **男孩姿势画框（三种）**：
  - `TO`：329×480，take off 试点旧素材。
  - `BOY`：433×480，人物中心 0.483、脚底 0.989，TAKE 行素材。
  - `G`：600×700，人物包围盒水平居中、脚底 y=690、**站立身高 470px**，GET 行起所有新素材都用它。场景里用 `gp(t, A, keys, cx, footY, h, flip)`，`h` 是“站立时人物有多高”，蹲、坐、躺会按同一比例自动变矮。`flip=true` 时水平镜像。
- **GET 行新增工具**：`gp`、`fadeG`（整体淡入淡出）、`win(t,a,b)`（时间窗口）、`gimg`（合成幕卡片里放 G 画框人物）、`inWindow`（车窗里只露出人物上半身）；道具 `street/bus/car/tree/bed/clock/train/station/egg/chick`。
- **向量配色**：`VCOL = { on 绿, off 橙红, up 蓝, down 橙, in 紫, out 天蓝 }`；字幕 `subtitle(en, zh, op)`；左上标签 `tag(短语, ①/②, 中文)`；向量胶囊 `vecTag(...)`。
- **道具**：能用 SVG 画的就画（桌子、窗、房子、海报、本子……），人物和动物用 AI 姿势图。
- **素材命名**：`vv_<小品词>_<动作>`（TAKE 行已用）；新的一行用 `vv_<动词>_<动作>`，例如 `vv_get_stepup`。

## 4. 出图流程

1. 用 `to_base.webp` 和一张现有 `vv_*` 姿势当参考图，提示词模板见 README 第 2 节，每个姿势只改 Pose 一句，绿幕或透明背景。
2. 生成时直接要透明背景（或绿幕），然后规范到 `G` 画框：取不透明包围盒，按“包围盒高度 = 站立身高 470px × 系数”缩放（躺姿按宽度），贴到 600×700 画布，水平居中，底边对齐 y=690。系数参考：站立 0.97~1.0，举一只手 1.1，双手上举 1.22，蹲 0.68，坐地 0.62，坐着伸懒腰 0.9，弯腰 0.86，站在椅子上 1.42，骑车 0.98。
3. 去掉残留绿边（g > max(r,b)+8 时把 g 压到 max(r,b)+8），存成 WebP（quality 82, method 6），写进 `VV_ASSETS_B64`。动物、道具图不用 G 画框，直接裁包围盒、高 300px。
4. 拼一张对照图，人工检查脸、发型、衣服是否一致。

## 5. 进度

| 动词行 | on | off | up | down | in | out | 状态 |
|---|---|---|---|---|---|---|---|
| TAKE | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 已完成（PR #1 feat/vv-take-anim） |
| GET | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 已完成 |
| PUT | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 已完成 |
| TURN | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 已完成 |
| LOOK | ⬜ | ⬜（look away） | ⬜ | ⬜ | ⬜（look in/into） | ⬜ | |
| GIVE | ⬜（give on，最后做） | ⬜ | ⬜ | ⬜（give back） | ⬜ | ⬜ | |

执行顺序：GET → PUT → TURN → LOOK → GIVE。

每一行的场景代码是 `VV` 里一段独立区块（`// ═════════ XXX 行`），末尾导出 `XXX_SCENES`，再在 `Object.assign(SCENES, ...)` 里合并。

## 6. 剩余分镜（① 本义幕 ｜ ② 第二义幕 ｜ ③ 共同点）

**GET**
- get on：踏上公交车台阶 ｜ 跨上自行车 ｜ ON = 站上能走动的车板
- get off：走下公交车 ｜ 从自行车上下来 ｜ OFF = 脚离开车板
- get up：醒来、坐起、伸懒腰 ｜ 摔倒后自己站起来 ｜ UP = 身体升起来
- get down：小猫从树上下来 ｜ 从椅子上下来、蹲下 ｜ DOWN = 从高处到低处
- get in：弯腰钻进小汽车 ｜ 火车进站 ｜ IN = 进盒子；小车用 in，大车用 on
- get out：从出租车里出来 ｜ 小鸡破壳 ｜ OUT = 从盒子里出来

**PUT**
- put on：戴帽子和手套 ｜ 舞台上演出 ｜ ON = 放到表面上
- put off：日历上作业卡片从今天推到明天 ｜ 下雨，运动会推迟 ｜ OFF = 推离原来那天
- put up：举手 ｜ 搭帐篷 ｜ UP = 往上立起来
- put down：把铅笔放到桌上 ｜ 写下名字 ｜ DOWN = 落到桌面或纸面
- put in：玩具放进箱子 ｜ 时间投进“练琴罐” ｜ IN = 放进容器
- put out：吹灭蜡烛 ｜ 消防员灭火 ｜ OUT = 让火出局

**TURN**
- turn on：按开关，触点贴合，灯亮 ｜ 开电视、开水龙头 ｜ ON = 电路接通
- turn off：关灯 ｜ 睡前关电视 ｜ OFF = 电路断开
- turn up：音量旋钮往上拧 ｜ 朋友突然出现在门口 ｜ UP = 往上调；冒出来
- turn down：宝宝睡了，调小音量 ｜ 摇头推回第二块蛋糕 ｜ DOWN = 往下调；压回去
- turn in：作业交到老师手里 ｜ 书投进还书箱 ｜ IN = 交进去
- turn out：打开礼盒，结果是小狗 ｜ 乌云散开出太阳 ｜ OUT = 翻过来，结果露出来

**LOOK**
- look on：在场边看人踢球 ｜ 把老师看作朋友 ｜ ON = 目光落在……上
- look away：看黑板时转头看窗外 ｜ 看到吓人的画面移开视线 ｜ 目光离开
- look up：抬头看星星 ｜ 查词典 ｜ UP = 视线向上；信息浮出来
- look down：在山顶往下看 ｜ 低头看见水坑 ｜ DOWN = 视线向下
- look in/into：往盒子里看 ｜ 拿放大镜调查 ｜ IN = 视线进到里面
- look out：趴在窗边往外看 ｜ “当心！”自行车冲过来 ｜ OUT = 警惕外面

**GIVE**
- give off：花飘出香气 ｜ 灯泡和太阳发光发热 ｜ OFF = 从表面散发出去
- give up：双手举起松开 ｜ 跑累了想放弃 → Never give up! ｜ UP = 手举起来不再抓着
- give back：尺子还给女同学 ｜ 书还给图书馆 ｜ BACK = 回到原主手里
- give in：试卷交给老师 ｜ 拔河时一方松手让步 ｜ IN = 交进去；让步
- give out：本子分发给全班 ｜ 收音机放出音乐 ｜ OUT = 从手里向外发出
- give on：窗户正对公园 ｜ 门通向花园 ｜ ON = 正面朝着（少见，放最后）

## 7. 验收清单（每格）

- [ ] 人物前后一致，姿势切换不跳位
- [ ] 箭头方向、胶囊颜色和小品词一致
- [ ] 字幕、例句和 `VERB_VECTOR_COMBINATIONS` 意思一致
- [ ] 画面里没有生成出来的乱码文字
- [ ] 抽出内联脚本跑 `node --check` 通过；打开页面控制台无报错
- [ ] ①②③ 跳幕、暂停、切换组合都正常

## 8. 变更记录

- 2026-10-29 `fix(super-lab)`：`drawHDCharacterActor` 兼容 `headBadge`/`badgeColor` 和第三个参数 `t`。24 处带 headBadge 的调用原来头顶徽章不显示，现在按动词/向量颜色显示；呼吸和眨眼恢复。
- 2026-10-29 新建本交接文档。
- 2026-10-29 `feat(vv)`：TURN 行 6 格动画完成。新增 9 张姿势 `vv_turn_switch/tap/remote/dance/shh/no/give/yawn/wow`；turn up 第二幕用「露面」义，turn in 第二幕用「上床睡觉」义；turn out 第一幕复用 `vv_put_umbrella`、`vv_put_sing`。
- 工具：`/workspace/work/vv/tools/insert_row.py`（把一行区块和素材插进主文件，可重复执行）、`frames.py`（无头 Chrome 按时间点截帧）、`grid.py`（拼预览图）。
- 2026-10-29 `feat(vv)`：PUT 行 6 格动画完成。新增 9 张姿势：`vv_put_hat`、`hatdone`、`sing`、`push`、`umbrella`、`raise`、`place`、`blow`、`hose`；新增道具 `snowWindow/stage/calCard/hwCard/rain/tent/blackboard/pencil/toyBox/ball/block/teddy/jar/timeToken/piano/cake/fire/waterJet`。put down 第二幕复用 TAKE 行的 `vv_down_write`（BOY 画框）。
- 2026-10-29 `fix(anim)`：`takeoffScene.js` 删除未调用的矢量小男孩代码（drawBoy/armPts/drawArm/jacketBundle/hungJacket）和空 if，从 271 行减到 151 行；`TakeOff.tsx` 用 `delayRender` 预加载图片，避免 Remotion 开头空帧；demo 和主文件播放器都改用 Blob URL，开播前预解码，画面不变时不重建 DOM，按渲染耗时在 30fps 和 20fps 之间自适应。`to_base.webp` 只作出图参考，没有打进主文件。
- 2026-10-29 `feat(vv)`：GET 行 6 格动画完成（get on/off/up/down/in/out）。新增 15 张素材：`vv_walk`、`vv_get_*`（stepup、stepdown、bike、bikeoff、sleep、sitstretch、stretch、fallen、chair、crouch、carin、wave）、`vv_cat_climb`、`vv_cat_sit`；`poses()` 的影子加了 `spec.shadow` 系数；新增 `G` 画框和 GET 道具。已在无头 Chrome 里逐幕截图检查，控制台无报错。
  - 已知小问题：get on 第二幕“站在车旁 → 骑上车”是交叉淡化，有约 0.3 秒重影；骑车 / 车旁两张图里的自行车细节略有差别。
