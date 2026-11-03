# Wave 4 对账报告：拼读总表（phonics_master.json）

- 日期：2026-11-03
- 产出：`laws-prototype/model/phonics_master.json`（约 3.7MB，唯一新增文件；主文件 HTML 与全部现有数据零改动，未 commit）
- 依据：《数据源规范》（DATA_SOURCE_SPEC.md）登记拼读事实源为 `model/phonics_master.json`；合并规则为并集、按模式 id 对齐、各源分仓保留。词卡内容今后由生成时从 words_master 带出——总表内词卡只存成员关系与现行卡面快照（snapshot 分仓），供切换波次逐卡比对。

## 一、模式对账（与 174 对照）

| 项 | wordsets（源头） | 主文件内嵌 DATA | 结果 |
|---|---|---|---|
| 模式数 | 174 | 174 | id 集合完全一致 |
| 类别分布 | 辅音 48 / 短元音 10 / 长音菜单 70 / 变脸多读 26 / Magic e 5 / 词尾定律 15 | 同左 | 一致 |

总表每条模式含三要素：`wordsets` 分仓（源头原样）、`embedded` 分仓（内嵌原样）、`members`（正本成员表，从 wordsets `word_ids`）。二次独立复验：174 条分仓深比全等、members 与源头逐表全等。

## 二、成员对对账（与 11,375 对照）

- wordsets 成员对（word_ids 合计）：**11,375**
- 内嵌成员对（w 合计）：**11,375**
- **逐模式逐对差异：0**（集合比对 174/174 全等）
- occ（字母位置标注）字典：174/174 全等，差异 0

昨夜 d82fcf0 刷新波的成果在本波复验下成立：内嵌成员已与源头完全对平，本波无一对需要抹平或裁定。

描述字段（grapheme/phoneme/group/cat/name/laws/face/short/count 对应内嵌 g/ph/grp/cat/name/laws/face/short/n）比对：173 条全等，仅 1 处冲突（见 §六）。

## 三、词卡对账（2,499 张）

- 内嵌 bank：**2,499 张卡 / 2,469 个不同词**（30 个词各有 2 张卡，含同形词 # 后缀键）
- 与 words_master 挂接：bank 键与 words_master `phonics_cards` 键 **2,499 ↔ 2,499 一一对应，挂接率 100%**；卡面四元组（词/音标/释义/emoji）逐卡全等，差异 0
- 词库归属：2,469 词中 **2,456 在词库内、13 个在词库外**，与规范 §7 登记的功能词例外**逐个吻合**：a、am、an、are、be、how heavy、how many、how much、how old、how tall、is、itself、whom
- 音标 vs phonetic_gb：全量 2,499 卡比对，差异 **0**
- **四张修正卡现状**（今晨 57a9bb5）：heard /hɜːd/、gas /ɡæs/、toy /tɔɪ/、math /mæθ/——内嵌快照、words_master 卡面、phonetic_gb 三处一致，修正已落盘（注：heard 的词库 phonetic 字段为美式 /hɜːrd/，卡面从 GB 源 phonetic_gb，口径正确）

总表 `cards` 按词键控：每词含 `in_wordbank`、`words_master_ref`（wordbank_id + phonetic_gb 出处指针）、`cards[]`（bank_key + snapshot + phonetic_vs_gb 标记）。

## 四、注册表对账（PHREG ↔ wordsets）

内嵌 PHREG 是 wordsets 注册部分的镜像，逐部分深比：

- overview（含 addendum_2026_11_02）：**全等**
- pending（0 条）、registrations（17 条）、pending_adjudicated（146 条）、heart_adjudication：**全等**
- zero / zero_hit：id 集合一致（V6_核心_4=you、V6_核心_54=of）；PHREG.zero 附 word/gb 注解、wordsets.zero_hit 仅存 id——表示层注解丰富度差异，已登记，**非内容冲突**

## 五、检查点并入与 addendum 基线分叉登记

- 检查点文件 `phonics_checkpoints.json`：48 站（16 已填 / 32 未填），原文整仓并入总表 `checkpoints.file`
- 内嵌主线 X2.spine：**167 站**（135 站有 gate 组、32 站 nogate），整仓并入 `checkpoints.embedded_spine`
- **逐站对齐 48/48**：文件站 index 恰为 spine 的 0 基位（index == spine_pos）；gate 词 id 逐站全等；未填站的 reason 与 spine 的 nogate 文案逐字全等
- 文件 meta.counts 仍是 160 站时代口径（spine_stations=160、previously_filled=112），但 stations 内容已于 2026-11-03 按现行 167 站重算（meta.recalc_2026_11_03 在案）——已登记，不裁定
- **addendum 基线分叉（只登记不裁定）**：overview.addendum_2026_11_02 自承——entries/units 覆盖对账仍为 **2,287 条基线**，而 GP-o-ʌ（57 词次）、GP-er-ə（134 词次）两池按 **2,352 条**词库推导，两基不同；「基线统一刷新待后续轮次」。连同现行词库 2,473 条，三数并存的沿革已原样登记进总表 `checkpoints.addendum` 与 `notes`

## 六、冲突清单

- **已判 1 条**：GP-o-ʌ 的 menu 字段——wordsets 为「短元音」，内嵌为空。判从 wordsets（源头）：该模式 2026-11-02 经用户裁定新建，2026-11-03 内嵌刷新（d82fcf0）补入成员时 menu 漏带；正本以源头菜单归属为准，内嵌空值原样保留在 embedded 分仓备查
- **待裁 0 条**：成员、occ、词卡、注册表、检查点五面均无未决冲突

## 七、抽验（5 个模式逐成员无丢失）

独立复验脚本从总表与四源重新抽取比对：

| 模式 | 类别 | 成员数 | 与 wordsets 逐表全等 | 与内嵌集合全等 | occ 全等 |
|---|---|---|---|---|---|
| GP-b | 辅音 | 283 | ✓ | ✓ | ✓ |
| GP-o-ʌ | 短元音 | 57 | ✓ | ✓ | ✓ |
| GP-ce | Magic e | 43 | ✓ | ✓ | ✓ |
| GP-ai-e | 变脸多读 | 3 | ✓ | ✓ | ✓ |
| GP-age | 词尾定律 | 8 | ✓ | ✓ | ✓ |

另全量复验：174 条模式分仓深比、2,499 张卡快照深比、167 站 spine 深比、48 站检查点深比，全部 0 不一致。

## 八、范围说明

主文件 X2 的 drill / chains / hearts / heartDecodable 为呈现层练习数据，不属本波四源，未并入（已在总表 notes 登记）。DATA 的 groups/gorder（菜单分组）已并入总表 `embedded_groups`。
