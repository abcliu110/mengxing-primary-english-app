# 诊断：主 app 内嵌动画整片空白（bag 单词卡为样本）— 只诊断，未修复

- 时间：2026-11-01 ~06:57–07:10 JST（用户报告）／诊断当班完成
- 对象：`萌星小学英语_最终合并版.html`（T9 补丁版，17,253,215 B）vs 补丁前备份 `~/workspace/content-audit/main_html_backup_pre_T9.html`（17,242,516 B）
- 用户现场：Muse 客户端文件查看器（面板标识 `file/workspace/mengxing-work/萌星小学英语_最终合并版.html`）打开主文件 → 单词 bag 卡片：页头、音节滑块、三幕页签、全屏按钮都正常，中间舞台整片米色空白，无画面、无内嵌播放器控件、无任何提示文字。用户称「很多动画打不开」。
- 用户截图存档：`~/workspace/diag-app-anim/user_screenshot_bag_blank.png`

## 结论（先行）

1. **不是 T9 补丁引入的回归**——字节级证明（见证据 1）。备份版与补丁版在播放器代码、全部场景载荷、全部共享块、全部 JSON 存储上一字不差；T9 的 46 处差异全在数据文本串内。备份版在同一环境下必然同样空白。
2. **不是数据缺失/损坏**——按 wb5Mount 的原样管线在 Node 里完整复算：549/549 场景载荷、370/370 共享块全部解压成功；bag 的词条/重字段/注入脚本构造全部正常（见证据 2）。
3. **根因定位：wb5Mount 的异步组装链在客户端查看器环境中失败，且其失败被 `.catch(e => console.warn("wb5", e))` 静默吞掉**——srcdoc 永远不被赋值，iframe 保持空文档，舞台只剩 `.wb5-box` 的米色底（#eceae6）透过按 16:10 定尺寸的空 iframe 显示。与截图逐项吻合（见证据 3 的形态分析）。链上对环境敏感的环节只有两个：`DecompressionStream("gzip")` 解压管线、以及查看器 iframe 内嵌套 `iframe.srcdoc` 导航——二者必居其一（或其组合），需一条真实控制台日志即可定点（见「未闭环项」）。
4. **普遍性成立**：全 app 549 幕内嵌动画（单词卡 wordcard_tpl、多义剧场 hd_poly_*、语法剧场 hd_*、第一性原理、单词身世 wo_*、超级实验室 vv_* 等）共用这一条挂载链，一处环境失败即全灭，与用户「很多动画打不开」吻合。独立导出的 gen-*.html 不走这条链（引擎与场景直接内联），在同一客户端里能正常播放（用户已在 artifact 面板看过 gen-boundedness-1 并能评论倒水细节）——故障被隔离在「内嵌层」（gzip 载荷 + srcdoc + 数据注入），不在动画内容本身。

## 播放机制（复现路径）

打开单词卡 → `renderWordCardModalContent()` 末尾 `setTimeout(30ms)` → `startWordModalCanvasAnim(w, …)`：

- 多义词走 `wb5HDSwap("wordModalCanvas", "hd_poly_" + id.toLowerCase(), act)`；
- 普通词（bag 属此类）走 `wb5TplSwap("wordModalCanvas", "wordcard_tpl", w, act)`；
- 两者都要求 `wb5El(tab, 0)`（即 `<script type="text/plain" id="wb5html-<tab>-0">`）存在，随后 `wb5TplAct/wb5HDAct` 把 `.hd-video-wrapper` 的 innerHTML 换成幕按钮行 + `wb5StageHtml(...)`：一个 `.wb5-box`（背景 #eceae6、2px 边框），内含 `<iframe id="wb5Frame" style="aspect-ratio:16/10">` 与 `⛶ 全屏` 按钮，再调用 `wb5Mount(frame)`；
- `wb5Mount` 异步链：`atob(载荷)` → `new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text()` → 抽取 `@@B:<16位hash>@@` 占位符 → `wb5Blob(hash)` 逐个取共享块（引擎块本身亦为 `gz:` 压缩，同样走 DecompressionStream）→ 替换占位符 → 在 `<script data-wb5-engine>` 前注入 `fr.__wb5Inject`（`__WB5_WORD__` 词条 JSON + `__WB5_ACT__`）→ 注入 WB5_PLAYER_CSS/JS → **`fr.srcdoc = 组装结果`**（wordcard_tpl 组装后 1,035,271 字符）；
- 链上任何一步 reject → `.catch(e => { console.warn("wb5", e) })`——**界面无任何反馈**，且 `data-on="1"` 已在链前置位，不会自动重试；
- 兜底 `wb5MissingStage(canvas)`（在旧 canvas 上写灰字「这一幕的白板动画还没收录」）只在 `wb5El` 找不到载荷时才走，本例不适用（载荷在、且旧 canvas 已被换掉）。

## 证据

### 证据 1：T9 差异全量定位（排除补丁回归）

- 全文件按 `</script>` 切块（930 块）逐块哈希：**只有第 925 块不同**，其余 929 块逐字节相同。
- 925 块内逐行 diff：46 组差异，**全部为数据文本串改动**（VOCAB_DB 词义、DAILY_EXPRESSIONS_DB 台词、语法/原理文案、ROYAL_TRUMPS 文案等，即 T9/T9b 修复包内容）；含 `function`/`=>`/`getElementById` 等代码特征的差异组 = 0。
- 925 个带 id 的 script 块逐个哈希：新旧**零差异**——含全部 549 个 `wb5html-*` 载荷、370 个 `wb5blob-*` 共享块、`VOCAB_HEAVY_JSON`、`ETYM_DB_JSON`、`MORPH_DB_JSON`。
- 关键函数体（各取 2600 字符哈希）新旧相同：`wb5Mount`、`wb5Blob`、`wb5Gz`、`wb5TplSwap`、`startWordModalCanvasAnim`、`wb5MissingStage`。

### 证据 2：数据与组装管线复算（Node，等同浏览器语义的 API）

- `wb5html-wordcard_tpl-0`：gzip 解压成功 → 模板 11,856 字符；引用引擎块 `1602f4a36ba4c060` 解压后 1,023,437 字符；占位符替换后残留 0；组装文档含 `<script data-wb5-engine>`、含 `</head>`/`</body>` 注入点。
- 全量健康度：549/549 场景载荷 gunzip 成功；370/370 共享块 gunzip 成功；引擎块文本含 `</script` 次数 = 0（srcdoc 解析不会被引擎内容截断）。
- `VOCAB_DB`（1,567 条）与 `VOCAB_HEAVY_JSON`（1,567 条）均可正常 JSON.parse；bag = `G1_001`，重字段齐全（senses/affix_root/collocations/etymology/…），senses[0] = {pos: "n.", meaning: "包，书包", ex_en: "Carry your bag.", …}。
- 按 wb5PlainData 逻辑（Object.assign 轻字段 + 原型 getter 拉重字段）+ `JSON.stringify` 构造注入脚本：bag/apple(G1_037)/cat(G1_014)/dog(G1_015)/watch(POLY_WATCH) 全部成功（781–1,521 字符），无抛错。watch 的多义幕 `hd_poly_poly_watch-0/1/2` 三个载荷元素都在（全库 hd_poly 共 51 幕）。

### 证据 3：截图形态分析（定位失败点在 srcdoc 交付之前）

- 截图中三幕按钮位于舞台**上方**、且旧控制条（▶️播放/🔁连播/进度条）消失、全屏按钮在舞台框右上角——这正是 `wb5TplAct` 换装后的 DOM（幕按钮行 + wb5StageHtml）。即：**同步换装已执行，wb5Mount 已被调用**。
- 舞台为均匀米色、比例约 16:10：与空 iframe（CSS `aspect-ratio:16/10` 定形、空文档透明）透出 `.wb5-box` 底色 #eceae6 完全一致。
- 若 srcdoc 已交付但帧内脚本出错，模板自带的静态骨架（近白画布 #FBFBFB + ▶ 按钮 + 进度滑块 + #ctl 控制行）必然可见——截图中完全没有。故失败点在 **srcdoc 被赋值之前**（异步链 reject/挂起），或 **srcdoc 赋值被查看器拦截/忽略**，二者界面表现相同。
- 「需点击才播放」不是元凶：播放器确实不自动播放（`ee` 初值 false，点 ▶ 或画布才 `bo()`），但挂载成功且 `__ready` 后会先静态画出第 0 帧并显示控件；本例连第 0 帧与控件都没有。

### 证据 4：播放器帧内前置条件审查（静态）

- 引擎 boot：`window.__ready` 等 FontFace 加载（`.catch(()=>{})` 吞失败）与 DOMContentLoaded；`localStorage`、`speechSynthesis` 访问均有 try/catch 包裹；字体为 data URI 内嵌。故帧内无「等待外部资源/手势」的硬前置。
- `WB5_PLAYER_JS`（注入帧内的播放器脚本）只做控制条自动隐藏，不拦播放。

## 未闭环项（浏览器实测被 VM 环境阻断）

- 本 VM 的 Chrome for Testing 当前**启动即 SIGTRAP**（裸二进制、`--headless=new`、Xvfb 有头模式、Playwright 通道均同；6 次以上尝试全灭），且另一并发任务（T12-B7 截图子任务）同样在对该故障做 60 秒间隔重试——系本机/运行时层面的浏览器不可用，非本诊断脚本问题。原定的「补丁版 vs 备份版同流程实测 + 控制台报错抓取 + 点击舞台/页签/全屏后复查」未能执行。
- 已备好一键复现脚本：`~/workspace/diag-app-anim/repro.py`（Playwright：双版本对照，openWordCardModal 打开 bag/apple/cat，采集 pageerror/console、srcdoc 长度、帧内 canvas 像素变化判活，并含点击交互段）。Chrome 恢复后运行即可闭环。
- **最短定点路径（用户侧一条日志即可）**：在普通桌面 Chrome 里打开该文件 → F12 控制台 → 打开任意单词卡 → 看是否有 `wb5 …` 的 warn 行：有 → 该 Error 对象即失败环节（DecompressionStream 相关字样 → 解压链；其它 → 按文本定点）；无 warn 且 `document.getElementById('wb5Frame').getAttribute('srcdoc')` 为空 → 链未跑完/被拦截，查 `data-on` 与帧 `contentDocument` 状态。

## 修复方向（建议，未动手）

1. **失败可见化**：`wb5Mount` 的 catch 里在 `.wb5-box` 内渲染可见兜底（「动画加载失败 + 重试按钮」，重试时清除 `data-on` 再 mount——`wb5Part` 已有同款复位写法可参照），不要再只 console.warn。这一条能把今后所有同类故障变成可报告事件。
2. **拆掉 DecompressionStream 依赖**：构建时预解压存明文，或内置一个纯 JS inflate（如 fflate/pako 级别的微型解压）替代原生 DecompressionStream 管线，同时去掉 `Blob.stream()/Response.text()` 组合——这是整条链上最挑环境的环节；体积账需另行权衡（明文会让 17 MB 主文件再长，JS inflate 可保体积）。
3. **双通道挂载兜底**：srcdoc 赋值后加加载看门狗（定时检查 iframe contentDocument 是否出现 #wrap/画布），超时则改用 `URL.createObjectURL(new Blob([html],{type:"text/html"}))` 设 `src` 重试一次（某些查看器只拦其中一种）。
4. **挂载成功后的体验项（与本故障无关但同源投诉）**：播放器默认不自动播放、只画第 0 帧；在单词卡场景建议 `__ready` 后自动点一次播放，避免修好挂载后仍被用户读成「点开没有动画」。
5. 修复后按 `repro.py` 做双版本（patched/backup 不必——两者同码）+ 多词（bag/apple/cat/watch）回归，并把「主 app 内打开单词卡看动画」加入交付门（此前夜班校验只覆盖独立导出页，未覆盖 app 内嵌路径——这是本故障漏网的流程原因）。

## 附：本地诊断产物

- `~/workspace/diag-app-anim/repro.py` — Playwright 复现脚本（因 Chrome 故障未跑通）
- `~/workspace/diag-app-anim/user_screenshot_bag_blank.png` — 用户现场截图
- 本记录未改动主文件、未提交 git。
