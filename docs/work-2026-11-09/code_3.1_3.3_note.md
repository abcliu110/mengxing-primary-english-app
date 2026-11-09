# TODO 3.1 + 3.3 设计说明（localStorage 结构隐患 / buildPool 边界）

- 仓库：`~/workspace/mengxing-primary-english-app`，master，HEAD `e97aaec`
- 主文件：`laws-prototype/mengxing-prototype-v1.html`（23 MB，21831 行）
- 补丁脚本：`docs/work-2026-11-09/apply_code_3.1_3.3.py`（只出补丁，**未在真文件上跑过**；验证全部在 `/tmp` 副本上做）
- 本说明：`docs/work-2026-11-09/code_3.1_3.3_note.md`

---

## 一、现状核查（动手前读到的真实代码）

### 1.1 存储：三个互不相干的 helper，全是静默回退

| 位置（行号） | helper | 服务的 key | 原行为 |
|---|---|---|---|
| 12398–12400 | `lsGet` / `lsSet` + `_MEMSTORE` | `mx_vb_srs_v1`、`mx_vb_loop_v1`、`mx_vb_lifeline_v1`、`mx_vb_log_v1` | 读写抛错 → 无声落到内存 `_MEMSTORE`，用户不知道 |
| 14210–14215 | RV IIFE 内联 `localStorage.getItem/setItem`（`LSKEY='mxReviewV1'`）+ `save()` | `mxReviewV1` | 读坏/写坏都 `catch(e){}` 吞掉 |
| 14697–14698 | `lsRead` / `lsWrite` | `mxWrongBookV1`、`mxRushBestV1` | 同上，静默吞掉 |
| 21720 | 首页统计 `ls()`（只读） | `mxReviewV1`、`mx_vb_srs_v1`、`mx_vb_loop_v1`、`mxRushBestV1`、`mxWrongBookV1` | 读坏返回 `null` |

- 全文没有任何 `QuotaExceededError` 处理，也没有任何用户反馈；无版本号、无 migration。
- **没有 toast/notice 基础设施**：全文件搜不到任何提示组件，补丁自带一个最小横条（见 §2.3）。
- **没有“导出备份”功能**：全文件搜不到导出入口，所以配额提示文案**不承诺导出**（见 §2.3）。
- 真正同时写两个 key 的地方只有三处判答出口（见 §2.4），其余 key 都是单 key 写。
- `resetall`（14610）只清 `mxReviewV1`，不碰错题本——是既有行为，本次不动。

### 1.2 buildPool：永久缓存 + 孤儿只计数

- `buildPool()`（14311）：`if(POOL) return POOL;`，首次调用后永久缓存；7 个题源（`LAWDATA` + `RV_TA/RV_SPINE/RV_ZONE/RV_MORPH/RV_PREP/RV_GENQ`）全部是内联 `<script>`，正常情况解析即就绪——“数据未就绪”在现实里只发生在某个数据脚本出错时，但一旦发生，旧代码会把**不完整的池缓存下来**，之后再也进不来迟到的数据。
- 孤儿键（14362–14363）：`deriveMastery()` 里只计数（`orphan++`），不清理；`store.wrong` 里的孤儿 key 在 `wrongHtml()` 里也被静默跳过。`deriveMastery` 自带“只读推导层、不写存储”的层契约，所以清理不能放在它里面。
- 调用点：`render()`（14562）、`deriveMastery`、`buildQueue*`、`poolItems()`（错题本/闯关/学习地图/首页统计经 `RV.buildPool()` 间接调用）。

---

## 二、3.1 设计

### 2.1 版本号方案：信封式 `{v:1, data:<原值>}`

- 共享块 `MXSTORE`（插在 `lsGet/lsSet` 定义处，约 12400 行后）：`SCHEMA_V = 1`，落盘值一律包一层 `{v:1, data:原值}`。
- **读时新旧都认**（`unwrap`）：带 `v:1` 的解包；无 `v` 字段的裸值视为 v0，老数据原样返回；未知高版本（以后有人升了级）也按原样读、不丢数据，只打一条 `console.warn`。
- **写时一律新格式**：所有写入口（`MXSTORE.set`）都包 v1 信封。
- 接线方式：不改调用方，只改四个 helper 的实现——`lsGet/lsSet` 改走 `MXSTORE.get/set`；RV 的加载/`save()` 改走 `MXSTORE.get/set`；`lsRead/lsWrite` 改走 `MXSTORE.get/set`；首页 `ls()` 只读解包。调用方拿到的仍是裸 payload，**正常读写行为一字未变**。
- 序列化失败（循环引用等极端情况）返回 `{ok:false, reason:'stringify'}`，不抛错。

### 2.2 Migration 路径

- **惰性迁移（主路径）**：读认两种格式，写一律 v1——任何一个 key 只要被正常写过一次，就自动完成迁移；从不写、只读的 key 保持 v0 也能一直正常读。
- **显式迁移（首次加载）**：`MXSTORE` 初始化时 `probe()` 通过后，`migrateAll()` 把 7 个 key 逐个检查：已是 v1 的跳过；v0 裸值原样包进 `data` 再写回。单个 key 迁移失败（解析坏了、写坏了）只跳过这一个，不影响其他 key，不丢数据。
- **以后字段新增**：在 `unwrap()` 里按 `v` 分支写迁移（v1 → v2……），先读出来再升级，不直接覆盖。`ORPHAN_REPORT` 等新字段不进存储，不存在版本问题。

### 2.3 配额溢出与存储被阻断：可见提示（不再静默）

- 加载时 `probe()` 用 `mx_store_probe_v1` 做一次 `setItem/removeItem` 试写，区分三种状态：可用 / 配额满（`QuotaExceededError`，含 Safari 无痕模式抛配额错的情况）/ 被阻断（`SecurityError` 等）。
- 提示 UI：页面顶部固定横条 `#mx-store-notice`（暖底 `#fdf6e3` + 金边，与现有护眼色系一致），文案走 `textContent`（不拼 HTML），关闭按钮用 `addEventListener`（**不涉及 onclick 传文本，不用 `attrEscape`**；本次补丁没有任何 onclick 传文本的改动）。
- 提示文案（中文、温和、可操作）：
  - 被阻断：`⚠️ 这台设备现在存不下学习记录（可能是无痕模式或浏览器限制），这次的学习进度只会留在当前页面里，关掉页面就没了。换成普通模式重新打开，就能正常保存。`
  - 配额满：`⚠️ 这台设备的学习记录快存满了，这次的进度可能保存不下来。已经学过的内容不受影响。可以请爸爸妈妈帮忙清理一下这个浏览器的旧数据，或者换一个浏览器再试一次。`
  - 跨键不一致（见 §2.4）：`⚠️ 刚才有两处学习记录没能一起保存下来，已经恢复到刚才的样子。请刷新页面后重试一次；如果一直出现，可以请爸爸妈妈帮忙清理一下浏览器数据。`
- 节流：`blocked` / `quota` 每种每会话只弹一次（避免反复打扰）；`inconsistent` 每次出现都弹（这是必须让用户知道的错误态）。
- 内存回退保留：写失败时数据仍进 `_MEMSTORE`，本会话内读写照常（`get` 优先读 localStorage，读不到/读坏才读内存），关掉页面才丢——这是旧行为，本次保留，只是从“无声”变成“说一声”。

### 2.4 事务性写入：快照 → 执行 → 逐键读回校验 → 失败回滚 + 提示

- **先说清楚**：localStorage 没有真事务，做不到原子提交。本补丁做的是“校验式伪事务”`MXSTORE.txPair(pairs, fn)`：
  1. 写前快照：把涉及的每个 key 的原始字符串（`getItem` 结果，含 `null`）记下来；
  2. 执行 `fn()`（里面是原有的两次保存调用，一字未改）；
  3. 逐键读回校验：重读每个 key 的原始字符串，与“内存值包上 v1 信封再序列化”的期望值逐字比对；
  4. 任一 key 对不上 → 把全部 key 恢复快照（写前没有的 key 就 `removeItem`），标记 `state.inconsistent=true`，弹“不一致”提示。
- 接线的成对写点（三处判答出口，每次同时写 `mxReviewV1` + `mxWrongBookV1`，是全 App 唯一“一次用户动作写两个用户数据 key”的地方）：
  - RV `finalize()`（复习区判答）；
  - MXW `wJudge()`（错题本重练判答）；
  - MXR `rJudge()`（闯关判答）。
  每处都包成 `txPair(...)`，另留 `else` 分支（`MXSTORE` 万一未定义时走老路，行为与原来完全一致）。
- 存储本身不可用时（`probe` 已失败），`txPair` 不校验、直接执行并返回 `{ok:true, memOnly:true}`：内存回退里两份数据本来就是一致的，`blocked` 提示已弹过一次，不再重复打扰。
- **其余 5 个 key 不进 txPair**：动词 SRS / 课环 / 生命线 / 日志 / 闯关最好成绩都是单 key 写，没有成对写的用户动作；它们共享 `MXSTORE.set` 的版本号与配额提示，写失败同样可见、同样进内存回退。——即：机制覆盖 7 个 key，事务接线只做在真实存在的成对写点上，不虚构不存在的事务。
- 回滚是尽力而为（best-effort）：回滚写本身也可能抛错（比如配额已满），此时 `catch` 吞掉、状态位与提示已就位，用户至少知道“没存上、请重试”。这比旧的“静默一半成功”好，但不是原子保证——见 §五。

---

## 三、3.3 设计

### 3.1 数据就绪检查 `mxPoolReady()`（R4/R5）

- 就绪条件：`window.LAWDATA` 是非空对象，且 `RV_TA`、`RV_SPINE`、`RV_ZONE`、`RV_MORPH`、`RV_PREP`、`RV_GENQ` 六个全是数组（`Array.isArray`）。只判“在不在”，不判“空不空”——空数组是合法数据，不应误判为未就绪。
- `buildPool()` 新流程：
  1. `POOL` 已有 → 直接返回（缓存行为不变）；
  2. 未就绪且重试次数 < 10 → 置 `POOL_NOT_READY=true`，300ms 后重试一次（最多 10 次，约 3 秒），**本次返回 `[]`，且 `POOL` 保持 `null`（不建空池、不缓存空池）**；
  3. 重试时数据就绪 → 重建池；若用户已打开复习页（`rv-root` 有内容），重渲染一次；
  4. 重试 10 次仍未就绪 → 置 `POOL_PARTIAL=true`，用已有数据建**部分池**（并 `console.warn`），避免复习页永远卡在“准备中”。——这是有意的兜底，不是“缺失时建空池”：池里有真实题目，只是可能不全。
- `render()`：`POOL_NOT_READY && !POOL` 时显示 `📚 题库正在准备，请稍等片刻再回来……`，而不是空队列文案。
- 导出：`RV.refreshPool()`（清缓存重建）、`RV.poolReady()`、`RV.poolPartial()`，供外部检查与以后延迟加载的数据源调用。
- 正常情况（数据全是内联脚本）下检查一次通过，行为与原来完全一致；重试路径只在某个数据脚本出错时才走。

### 3.2 孤儿键清理 `pruneOrphans()`（R4/R5/R6/R7/R10）

- **清理点**：`buildPool()` 建池完成、`BYKEY` 齐全之后，跑一次（池已缓存，后续调用不再重复跑）。
- **清理口径（保守三条）**：
  1. 只删 `BYKEY` 里**明确没有**的 key——`store.items` 与 `store.wrong` 两个表都清（`wrong` 表的孤儿以前在 `wrongHtml()` 里被静默跳过，同样占地方、同样影响统计）；
  2. **部分池不清理**（`POOL_PARTIAL` 时直接跳过）：题源不全时“查无此题”可能是数据没加载，不是题目已删除，误删会丢真实学习记录；
  3. 只删 key，不改其他字段；不碰错题本模块 `mxWrongBookV1` 里的记录（它在另一个 IIFE 里，没有导出的保存函数，跨模块删改超出本次最小改动范围；其孤儿条目目前是惰性的——渲染时按 key 查不到题就跳过。见 §五遗留）。
- **计数与日志**：清理前先计数；清理后 `save()` 一次；只有落盘成功才记入 `ORPHAN_REPORT={removed, removedWrong, at, keys, persisted:true}` 并打 `console.info('[RV] 孤儿键清理：items N 条，wrong M 条')`。写失败时内存里照样清了（本会话一致），但报告记 `persisted:false`、计数归零——**没落盘就不对外宣称“已清理”**。
- **用户可见提示**：复习统计行（`statsHtml()`）追加 `· 已清理 N 条失效旧记录（对应题目已下架）`（只在清理过且落盘成功时出现）；`deriveMastery()` 返回值加 `pruned` 字段，`orphan` 字段改成语义“清理后残留”（正常为 0）。
- `deriveMastery()` 本身仍只读（层契约不动），只改了那行注释与返回值。

---

## 四、补丁清单（脚本内编号 R1–R15，锚点均断言恰出现一次）

| 编号 | 改动 | 对应任务 |
|---|---|---|
| R1 | 插入 `MXSTORE` 共享块；`lsGet/lsSet` 改走 `MXSTORE.get/set` | 3.1(a)(b)(c) 机制 |
| R2 | RV 账本加载改走 `MXSTORE.get`（解包，v0 照读） | 3.1(a) |
| R3 | RV `save()` 改走 `MXSTORE.set`，并返回写结果 | 3.1(a)(b) |
| R4 | 池声明处加 `mxPoolReady()`、`pruneOrphans()`、`ORPHAN_REPORT`、重试变量 | 3.3(a)(b) |
| R5 | `buildPool()` 加就绪检查 + 延迟重试 + 建池后清理孤儿 | 3.3(a)(b) |
| R6 | `deriveMastery` 孤儿行注释改为“清理后残留” | 3.3(b) |
| R7 | `deriveMastery` 返回值加 `pruned` | 3.3(b) 计数 |
| R8 | `finalize()` 成对写包进 `txPair` | 3.1(c) |
| R9 | `render()` 未就绪时显示“准备中” | 3.3(a) |
| R10 | 复习统计行显示清理计数 | 3.3(b) 提示 |
| R11 | `window.RV` 导出 `refreshPool/orphans/poolReady/poolPartial` | 3.3(a) |
| R12 | `lsRead/lsWrite` 改走 `MXSTORE` | 3.1(a)(b) |
| R13 | `wJudge()` 成对写包进 `txPair` | 3.1(c) |
| R14 | `rJudge()` 成对写包进 `txPair` | 3.1(c) |
| R15 | 首页统计 `ls()` 只读解包 | 3.1(a) |

运行方式（从仓库根目录）：`python3 docs/work-2026-11-09/apply_code_3.1_3.3.py`（可传主文件路径参数，用于 `/tmp` 副本验证）。任一锚点对不上就中止且不写回；检测到 `MXSTORE_V1` 已存在时拒绝重复应用。

---

## 五、验证结果（全部在 /tmp 副本上做，真文件未动）

- `git status`：`laws-prototype/` 无改动；只有新增的 `docs/work-2026-11-09/` 文件。
- 补丁脚本在两份全新副本上各跑一次：15/15 处替换成功；第二次跑触发幂等保护，拒绝应用。
- `python3 docs/whiteboard/src/jscheck.py <副本>`：**`node --check: inline scripts=41 → OK`**。`anchorcheck` 报 116 项 FAIL——但**未打补丁的原始副本同样是 116 项**（`anchorcheck.py` 的登记表针对旧主文件名 `萌星小学英语_最终合并版.html`，与当前主文件已脱节），补丁前后数量一致、无新增项。
- Node 桩环境冒烟测试（harness，/tmp 临时文件，不入库）：
  - MXSTORE：23/23 通过——正常读写带 v1 信封、v0 裸值照读、`migrateAll` 迁移 2 个 key 且数据不变、配额溢出弹提示 + 内存回退可读、`txPair` 成功/失败回滚/不一致提示、存储阻断时 blocked 提示 + 内存回退 + `txPair` 不误报。
  - RV 引擎：16/16 通过——老裸值账本照常读入、建池只含现存题目、孤儿 items 2 条 + wrong 1 条被清理且落盘带版本号、`mastery().orphan=0、pruned=3`、未就绪返回 `[]` 且不缓存、数据就绪后建池成功、重试 10 次耗尽后建部分池且**部分池不清理孤儿**。
- 未做真机验证：横条样式、语音/动效均无；提示文案在真实浏览器里的观感、隐身模式下的实际表现，需真机确认。

## 六、风险点：哪些行为变了、哪些没变

### 变了（有意的）
1. **落盘形状变了**：7 个 key 的新写入都是 `{v:1, data:…}`。旧代码读新值会错（把信封当 payload），所以**应用本身回滚到旧版前必须先处理数据**；补丁内的所有读口径都已兼容两种格式。
2. **写失败从“无声”变“有声”**：配额满/被阻断/成对写不一致时，用户会看到顶部横条（blocked/quota 每会话一次，inconsistent 每次都弹）。正常情况看不到任何东西。
3. **孤儿记录会被删**：只删 `BYKEY` 里没有的 key，且只在完整建池后删；删前计数、删后落盘成功才认。被删的只是“题目已下架”的 SRS 记录，不影响现存题目的盒位、错题本三分状态、闯关成绩。
4. **数据未就绪时复习页短暂显示“准备中”**：正常情况一次通过、看不到；只有数据脚本出错时才出现，最多 3 秒后退为部分池。
5. 首次加载且存储可用时，`migrateAll()` 会把 7 个 key 各重写一次（v0 → v1），是一次性写放大，可忽略。

### 没变
- 正常读写、复习、错题本、SRS、课环、生命线、日志、闯关、首页统计的口径与流程；`answer()` 的升盒/回炉规则、`wRecord` 的三分消错规则、`INT` 间隔表一字未动。
- 去重规则（同 key 先到者胜）、`DUPKEYS` 口径、`deriveMastery` 的只读推导层。
- 内存回退（`_MEMSTORE`）的语义：写失败仍进内存，本会话可用。
- `resetall` 只清 `mxReviewV1` 的既有行为。

### 已知局限 / 遗留（未擅自扩大范围）
- **不是真原子事务**：`txPair` 是“快照 + 读回校验 + 回滚”，两次 `setItem` 之间仍有窗口期；回滚本身也可能失败。能做到的是“失败可发现、可恢复、可提示”，不是“不可能失败”。
- **错题本 `mxWrongBookV1` 里的孤儿记录未清理**：它在另一个 IIFE 里，没有导出的保存函数；其孤儿条目目前惰性无害（渲染时查不到题就跳过），但 `wCounts()` 会把它们计入错题本统计。如需清理，应在 MXW 模块内加导出保存函数后再做——建议另立一项，不宜塞进本次补丁。
- **配额提示没有“导出备份”按钮**：App 里本来就没有导出功能，文案只写了“请爸爸妈妈清理旧数据 / 换浏览器”。如以后做了导出，再把按钮接进横条。
- **部分池的兜底仍可能不完整**：重试 10 次（约 3 秒）后建的部分池缺失的题源题目进不了池；`poolPartial()` 可供外部检查，但目前没有界面提示“题库不全”。
- **提示节流可能掩盖持续失败**：blocked/quota 每会话只弹一次，之后持续的写失败只进内存、不再打扰；`MXSTORE.status()` 可供家长门/诊断页读取状态位。
- 本次补丁不涉及任何 `onclick` 传文本的改动；新增按钮用 `addEventListener` 接线，不拼 HTML、不引入转义问题。
