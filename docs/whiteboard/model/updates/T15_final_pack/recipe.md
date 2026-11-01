# T15 回灌配方（recipe）

供本地一键回灌工具（Windows 批处理）实现。术语：**载荷** = 主文件中一个场景的 gzip+base64 文本；**blob** = 共享块（图片 data-URI 或引擎脚本），以占位符在载荷间复用。

## 1. 主文件中的存储形态

- 场景元素：`<script type="text/plain" id="wb5html-<tab>-<idx>" data-gz="1" data-blobs="<blob 哈希，空格分隔，升序>" data-src="docs/whiteboard/v5/<相对构建路径>">载荷base64</script>`
- blob 元素：`<script type="text/plain" id="wb5blob-<hash16>">内容</script>`；图片 blob 内容为完整 data-URI 字符串（原样存放）；引擎 blob 内容为 `gz:` + base64(gzip(引擎脚本))。
- 运行时组装序（wb5Mount）：元素文本 trim → atob → DecompressionStream("gzip") 解压 → 文中 `</wb5-script` 还原为 `</script` → 以 blob 表替换全部 `@@B:<hash>@@` 占位符 → 注入播放器 CSS/JS → 置 iframe srcdoc。（CSS/JS 注入是运行时外壳，不属于载荷组装，自检时不做。）

## 2. 打包配方（源自仓库 `docs/whiteboard/v5/embed_app.py` 的 pack()）

给定构建产物 HTML（构建器见 §5）：
1. 全文 `</script` 替换为 `</wb5-script`（避免载荷内嵌脚本提前闭合外层元素）。
2. 抽取所有匹配 `data:(image/webp|font/woff);base64,[A-Za-z0-9+/=]{2000,}` 的串：内容**原样**（整条 data-URI）存为 blob，哈希 = `sha1(内容)[:16]`，原文替换为 `@@B:<hash>@@`。
3. 抽取 `<script data-wb5-engine>…</wb5-script>` 的脚本体：存为 blob，内容 = `gz:` + base64(gzip(脚本体))，哈希同上；原文替换为 `<script data-wb5-engine>@@B:<hash>@@</wb5-script>`。
4. 载荷 = base64(gzip(处理后全文))。gzip 参数：压缩等级 9、mtime=0（保证可复现）。
5. 元素 `data-blobs` = 载荷引用的 blob 哈希全集（升序、空格连接）；主文件中未被任何元素引用的 blob 会被回收（GC），缺失的 blob 元素插在第一个 wb5html 元素之前。

## 3. 引擎钉住（本包的关键约定）

app 内现有且仅有两个引擎 blob（内容以 `gz:` 开头）。每个元素现行载荷的 `data-blobs` 中恰有一个引擎哈希 —— 新载荷**沿用同一引擎哈希**（条目字段 `engineBlob`），理由：引擎与其字体子集是全 app 共享件，本包不动引擎本体。实现要点：打包时构建产物自带的引擎段被整体丢弃，替换为所钉引擎的占位符；条目 `dataBlobs` 已是钉住后的最终引用集，本地工具直接采用即可。

## 4. 像素重映射（为何多数“新图”不随包）

存量场景的精灵图库在当初嵌入后被以不同编码器重生成，字节不同但画面相同。打包时对每个 app 中不存在的抽取 blob 做像素级比对：同尺寸 + 48×48 缩略图逐像素一致 + 全尺寸 RMSE < 3.0 → 判为同图，把载荷内引用改写为 app 既有哈希（条目字段 `blobRemap`，已应用到 `newPayloadBase64` 与 `dataBlobs` 中，本地工具**无需再处理**）。只有真正的新图才随包发送（条目字段 `newBlobs`，键为其 sha1[:16]，与内容自洽）。

## 5. 构建（本包载荷的来源，供复现/审计）

- 构建器：`docs/whiteboard/v5/build_pack.mjs`（与正式构建 `build_stdout.mjs` 仅差一处：字体子集化返回占位符且不写文件）。安全依据：构建产物中的引擎段（含字体）在打包时按 §3 整体丢弃，场景段文本不受影响；圆环证明（§8）已验证此路径逐字节复现现行载荷。
- 每幕构建标题取该元素现行载荷的 `<title>`，使播放器外壳与现行一致。

## 6. payloads.json 条目字段

| 字段 | 含义 |
|---|---|
| elementId / tab / idx | 定位键：主文件中要替换文本内容的元素 id |
| scene / srcFile / srcSha256 / srcMtimeUtc | 场景名与打包时源码指纹（陈旧性检查用，见 §9） |
| oldPayloadSha256 | 主文件现行载荷文本的 sha256（动手前比对，不符即停） |
| newPayloadBase64 / newPayloadSha256 | 新载荷全文与其 sha256 |
| dataBlobs | 替换后元素应有的 `data-blobs` 全集（升序） |
| engineBlob | 本条钉住的引擎哈希（必在 dataBlobs 内） |
| blobRemap | 打包时已应用的像素重映射记录（仅溯源，工具不处理） |
| newBlobs | 需新增的 blob 元素（哈希 → 内容）；插入位置：第一个 wb5html 元素之前（与原打包器一致） |
| mustContain / mustNotContain | 自检串（**raw 形态**，见 §7） |
| mustContainDecoded / mustNotContainDecoded | 自检串的人读形态（仅展示，**不得**用于机器比对） |
| selfCheck | 打包侧自检结果（解压 OK、两组串的条数） |

## 7. 自检串语义（本地工具按此实现）

- raw 形态 = 组装后文本中真实出现的字节形态：带引号定界的 JS 字符串字面量，中文以 `\uXXXX` 转义书写、emoji 多为 `\u{…}` 形态。**比对必须在组装后的文本上按 raw 串逐字查找**，不得先解码。
- 组装程序（自检用）：取新载荷 base64 → 解码 → gunzip → `</wb5-script` 还原为 `</script` → 用「主文件现有 blob 表 + 本条 newBlobs」替换全部 `@@B:<hash>@@`。mustContain 每条必须命中 ≥1 次；mustNotContain 每条必须 0 次。任一不符，该条回灌判失败并回滚该条。
- Decoded 字段由 JS 转义解码得到，仅供人读核对；历史数据中 `\u{…}` 的渲染不完全一致（个别条目解为真字符、多数保留转义式），与机器自检无关。
- 覆盖缺口：少数条目一组或两组为空（清单见 manifest 特别标注 4），这些条目以 sha256 为唯一判据。

## 8. 圆环证明（配方成立证据）

- `ze_yesno_1`（元素 wb5html-ze_yesno-0，引擎 1602f4a36ba4c060）与 `hd_phonics_2`（wb5html-hd_phonics-1）：从现行源码按本配方重打包，载荷文本、解压文本、`data-blobs` 与主文件现行值**逐字节一致**。
- `hd_sum_syntax_1`：组装等价（解压文本等长、引用结构一致）；字节差异仅限 esbuild 压缩变量名与 2 个精灵图 blob 的重编码（其图库在嵌入后漂移）——由像素重映射处理，不影响配方成立。
- `hd_mindmap_2` 不可逐字节复现：其源码在嵌入后经 B9 批次重生成（属预期，非配方问题）。

## 9. 陈旧性检查（动手前建议）

本地工具或使用者可将条目 `srcSha256` 与仓库当前对应文件比对：不一致说明该幕源码在打包后又被修改（如 T16 重做），该条应跳过并回报，不得强行回灌。`srcMtimeUtc` 为辅助参考（时区与时钟差异下以 sha 为准）。

## 10. 本地工具执行序（建议）

1. 备份主文件（带时间戳副本）。
2. 逐条：按 elementId 定位元素 → 比对其现行文本 sha256 与 `oldPayloadSha256`（不符即停该条并报告）→ 替换元素文本为 `newPayloadBase64` → 元素 `data-blobs` 改为条目 `dataBlobs` 空格连接 → 若有 `newBlobs` 且主文件中无此 id，插入对应 blob 元素。
3. 每条替换后立即按 §7 组装自检；失败即回滚该条。
4. 全部完成后再做一轮全量复检（93 条组装自检 + 抽样打开若干幕）。
5. 不做 blob GC（原打包器会回收无引用 blob；本地回灌保留旧 blob 无害，避免误删共享件）。
