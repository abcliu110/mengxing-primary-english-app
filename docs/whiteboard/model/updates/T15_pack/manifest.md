# T15 回灌载荷包 · 清单（manifest）

- 对象主文件：`萌星小学英语_最终合并版.html`（仓库根目录）
- 载荷文件：`payloads.json`（604668 字节；本目录）
- 配方文档：`recipe.md`（本目录；供本地一键回灌工具实现）
- 条目数：93（必换场景 92 幕 → 93 个载荷槽位；phonology_1 占双槽位，见特别标注 1）
- 构成：原理 T11/P1 重生成 25 槽 · 存量纠错 B1–B5 共 27 槽 · oral B7 同步 38 槽 · mindmap B9 同步 3 槽
- 新载荷合计：366,664 个 base64 字符；像素重映射 153 对（避免随包发送 app 中已有的同图）；真正新图仅 3 个 blob（66,253 字符：metaphor_code_4 ×2、boundedness_1 ×1）
- 引擎钉住：全部条目沿用各自元素现行载荷所钉的引擎 blob（app 内仅两个引擎：`1602f4a36ba4c060` / `2d47bbdc4cb1acd3`）
- 生成：首批条目写入 2026-10-31T22:40Z；末条 boundedness_1 于 VM 重启后补齐；文件最终修改 2026-10-31T23:41:05Z
- 全量校验：逐条可解压、sha256 自洽、oldPayloadSha256 与主文件现行载荷一致、组装后 mustContain 全命中 / mustNotContain 全零命中 —— 93/93 通过；另以当前工作树源码全量重算审计，配方字段（载荷/sha/dataBlobs/引擎/blobRemap/newBlobs/源文件 sha 与 mtime）93/93 一致

## 映射规则

主文件元素 `wb5html-<tab>-<idx>` ← 构建产物 `out/<tab>_<idx+1>.html`（元素 `data-src` 属性佐证）；源码为 `docs/whiteboard/v5/scenes/` 下对应 `gen_*.js`（原理幕）或同名 `.js`（存量/oral/mindmap 幕），逐条记录在 payloads.json 的 `srcFile` / `srcSha256` / `srcMtimeUtc` 中。

## 逐幕销账

| # | 元素 | 场景 | 依据 | 旧载荷 sha256 | 新载荷 sha256 | 引擎 | remap | 新图 | 自检串 mc/mnc |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `wb5html-fp_boundedness-1` | boundedness_2 | T11/P1 原理重生成 | `a89e4c86cef7` | `1a8bc02cc6b7` | 2d47bb | 0 | 0 | 3/3 |
| 2 | `wb5html-fp_boundedness-2` | boundedness_3 | T11/P1 原理重生成 | `0fb5807b14b5` | `74ecf2c222b5` | 2d47bb | 0 | 0 | 3/3 |
| 3 | `wb5html-fp_boundedness-3` | boundedness_4 | T11/P1 原理重生成 | `f95edad6d6a1` | `9bcc50ed5e50` | 2d47bb | 0 | 0 | 3/3 |
| 4 | `wb5html-fp_economy-0` | phonology_1 | T11 原理重生成 | `4bd8958ed8d5` | `a6c9058444b9` | 1602f4 | 0 | 0 | 3/3 |
| 5 | `wb5html-fp_economy_p2-0` | phonology_1 | 双槽位:原第2节槽位同装新版全幕(见 manifest) | `b59bb9d1baeb` | `55e74a6dc774` | 1602f4 | 0 | 0 | 3/3 |
| 6 | `wb5html-fp_economy-1` | phonology_2 | T11 原理重生成 | `ccf6d0735e45` | `4fc4671ca0d6` | 1602f4 | 0 | 0 | 3/3 |
| 7 | `wb5html-fp_economy-2` | phonology_3 | T11 原理重生成 | `4f9667b6d0b0` | `096c24f5e117` | 1602f4 | 2 | 0 | 3/3 |
| 8 | `wb5html-fp_economy-3` | phonology_4 | T11 原理重生成 | `1761a20311a7` | `9d25cd90f6ee` | 1602f4 | 4 | 0 | 3/3 |
| 9 | `wb5html-fp_iconicity-0` | letters_1 | T11 原理重生成 | `62dbaedd381c` | `2bc7a0a631a7` | 1602f4 | 3 | 0 | 3/3 |
| 10 | `wb5html-fp_iconicity-1` | letters_2 | T11 原理重生成 | `ae7778416d4d` | `3cdda2a772f5` | 1602f4 | 4 | 0 | 3/3 |
| 11 | `wb5html-fp_iconicity-2` | letters_3 | T11 原理重生成 | `bdf114ec76f1` | `e3006381549d` | 1602f4 | 2 | 0 | 3/3 |
| 12 | `wb5html-fp_iconicity-3` | letters_4 | T11 原理重生成 | `95e61566d8da` | `cc5005fe6b54` | 1602f4 | 0 | 0 | 3/3 |
| 13 | `wb5html-fp_vectors-0` | spacetime_1 | T11 原理重生成 | `937a5bcfae0a` | `2afaa8a81b68` | 1602f4 | 2 | 0 | 3/3 |
| 14 | `wb5html-fp_vectors-1` | spacetime_2 | T11 原理重生成 | `0b376faca83a` | `e8df15f8c2b8` | 1602f4 | 6 | 0 | 3/3 |
| 15 | `wb5html-fp_vectors-2` | spacetime_3 | T11 原理重生成 | `8b2343cda1eb` | `396a76b247dd` | 1602f4 | 1 | 0 | 3/3 |
| 16 | `wb5html-fp_vectors-3` | spacetime_4 | T11 原理重生成 | `204f16ad0675` | `883f8190900d` | 1602f4 | 3 | 0 | 3/3 |
| 17 | `wb5html-ze_be-0` | sentence_1 | T11 原理重生成;同幕 B4 sf-044 补丁随旧版退场 | `48b90ee0000b` | `dbc712a1ff44` | 1602f4 | 0 | 0 | 3/3 |
| 18 | `wb5html-fp_one_king-1` | sentence_2 | T11 原理重生成 | `124449d77d83` | `161be3a2380f` | 1602f4 | 2 | 0 | 3/3 |
| 19 | `wb5html-fp_one_king-2` | sentence_3 | T11 原理重生成 | `4576cac825ee` | `1729f26356f6` | 1602f4 | 6 | 0 | 3/3 |
| 20 | `wb5html-fp_one_king-3` | sentence_4 | T11 原理重生成 | `9b2b34234905` | `6c666ec0136c` | 1602f4 | 2 | 0 | 3/3 |
| 21 | `wb5html-ze_modifier-0` | viewpoint_1 | T11 原理重生成 | `3093f8760b2c` | `c84aaf0fa15e` | 1602f4 | 0 | 0 | 3/3 |
| 22 | `wb5html-fp_zoom_focus-1` | viewpoint_2 | T11 原理重生成 | `191b746cc150` | `6489e33c9f50` | 1602f4 | 5 | 0 | 3/3 |
| 23 | `wb5html-fp_zoom_focus-2` | viewpoint_3 | T11 原理重生成 | `b3dd3c7ae8bb` | `0502ed932964` | 1602f4 | 0 | 0 | 3/3 |
| 24 | `wb5html-fp_zoom_focus-3` | viewpoint_4 | T11 原理重生成 | `329627a2b411` | `2be676cde837` | 1602f4 | 3 | 0 | 3/3 |
| 25 | `wb5html-hd_phonics-0` | hd_phonics_1 | B1 sf-008 | `4bcdd4d902e3` | `dfd57ae539d7` | 1602f4 | 0 | 0 | 0/1 |
| 26 | `wb5html-hd_poly_g4_157-0` | hd_poly_g4_157_1 | B1b sf-003/004/005 | `1ac777a74a99` | `127a1c2ce39f` | 1602f4 | 0 | 0 | 3/3 |
| 27 | `wb5html-hd_poly_g4_157-1` | hd_poly_g4_157_2 | B1b sf-003/004/005 | `8758efa92158` | `9bc3c95ce1b5` | 1602f4 | 0 | 0 | 3/3 |
| 28 | `wb5html-hd_poly_g4_157-2` | hd_poly_g4_157_3 | B1b sf-003/004/005 | `4b79c121b753` | `7681688fdeaf` | 1602f4 | 0 | 0 | 3/3 |
| 29 | `wb5html-hd_g19-0` | hd_g19_1 | B2 sf-002 | `e8217f671c66` | `38bb473baf8c` | 1602f4 | 0 | 0 | 0/0 |
| 30 | `wb5html-past_clans-3` | past_clans_4 | B2b sf-009 整幕订正包 | `3f3fae526926` | `b2046f3a72e2` | 1602f4 | 0 | 0 | 3/3 |
| 31 | `wb5html-hd_g03-0` | hd_g03_1 | B3 sf-010/029 | `e42ca69d4e3a` | `113f299ddddf` | 1602f4 | 0 | 0 | 0/0 |
| 32 | `wb5html-hd_g40-0` | hd_g40_1 | B3 sf-035/036 | `fe34d33100df` | `87d2a75bc507` | 1602f4 | 0 | 0 | 0/0 |
| 33 | `wb5html-tense_matrix-4` | tense_matrix_5 | B3 sf-037/038 | `714074004002` | `9c68e4f4468b` | 1602f4 | 0 | 0 | 2/3 |
| 34 | `wb5html-wo_rule_assim-0` | wo_rule_assim_1 | B4 sf-026 | `2800634b3938` | `06e366118325` | 1602f4 | 0 | 0 | 0/1 |
| 35 | `wb5html-hd_g06-0` | hd_g06_1 | B4 sf-031 | `4ed5434398db` | `3c71b0b1b282` | 1602f4 | 0 | 0 | 1/0 |
| 36 | `wb5html-hd_g15-0` | hd_g15_1 | B4 sf-032 | `2db0d93477c2` | `38482e48f42b` | 1602f4 | 0 | 0 | 0/1 |
| 37 | `wb5html-hd_g33-0` | hd_g33_1 | B4 sf-033 | `7fd48d309b94` | `beb625076daa` | 1602f4 | 0 | 0 | 0/1 |
| 38 | `wb5html-hd_phonics-2` | hd_phonics_3 | B4 sf-039 | `b90dbb3bf7a0` | `264da2c2eb4e` | 1602f4 | 1 | 0 | 1/1 |
| 39 | `wb5html-five_patterns_p2-1` | five_patterns_p2_2 | B4 sf-043 | `477867355c81` | `dba2ac9b5aa9` | 1602f4 | 0 | 0 | 0/1 |
| 40 | `wb5html-bamboo_tree-0` | bamboo_tree_1 | B4 sf-015 | `e92c775b1e99` | `82cfcd0ec26f` | 1602f4 | 5 | 0 | 0/1 |
| 41 | `wb5html-metaphor_code-3` | metaphor_code_4 | B4 sf-045 | `0b78133c2585` | `1f8e69822770` | 1602f4 | 2 | 2 | 0/1 |
| 42 | `wb5html-writing_alchemist-0` | writing_alchemist_1 | B4 sf-042 | `05b722615f07` | `dec6a6845064` | 1602f4 | 0 | 0 | 1/1 |
| 43 | `wb5html-wo_vowel_a-0` | wo_vowel_a_1 | B4 sf-040 | `ed82d1dd799f` | `6cf23bb663de` | 1602f4 | 0 | 0 | 0/1 |
| 44 | `wb5html-wo_europe-0` | wo_europe_1 | B4 sf-046 | `801d0e35cb31` | `e43573405809` | 1602f4 | 1 | 0 | 2/2 |
| 45 | `wb5html-ze_same-0` | ze_same_1 | B4 sf-041 | `51da4e98cc47` | `56a76c95e02a` | 1602f4 | 1 | 0 | 1/1 |
| 46 | `wb5html-hd_g04-0` | hd_g04_1 | B4b sf-030 整幕对齐 | `b083a10186f9` | `27e486fd3548` | 1602f4 | 0 | 0 | 3/3 |
| 47 | `wb5html-hd_g14-0` | hd_g14_1 | B5 sf-013 | `614f257c9c53` | `f7145811320a` | 1602f4 | 0 | 0 | 0/0 |
| 48 | `wb5html-hd_g39-0` | hd_g39_1 | B5 sf-034 | `840eea4736d6` | `b45563960e13` | 1602f4 | 0 | 0 | 0/1 |
| 49 | `wb5html-wo_grimm-0` | wo_grimm_1 | B5 sf-020 | `84568355fd4b` | `c3bcafe475b8` | 1602f4 | 0 | 0 | 1/2 |
| 50 | `wb5html-wo_grimm_rows-0` | wo_grimm_rows_1 | B5 sf-020 | `fb1ac2d7808d` | `2daddc24957a` | 1602f4 | 0 | 0 | 1/1 |
| 51 | `wb5html-wo_grimm_more-0` | wo_grimm_more_1 | B5 sf-020 | `602ebbf6d619` | `b9c5cb437eeb` | 1602f4 | 0 | 0 | 1/1 |
| 52 | `wb5html-hd_oral_sc02-1` | hd_oral_sc02_2 | B7 oral DB 同步 | `3c776cff8ce2` | `1e9c833995f1` | 1602f4 | 2 | 0 | 2/1 |
| 53 | `wb5html-hd_oral_sc02-2` | hd_oral_sc02_3 | B7 oral DB 同步 | `e50827c61070` | `5a42e51fcbe0` | 1602f4 | 2 | 0 | 1/1 |
| 54 | `wb5html-hd_oral_sc02-3` | hd_oral_sc02_4 | B7 oral DB 同步 | `85ef2b92f1f9` | `f5fafddf08c6` | 1602f4 | 2 | 0 | 1/1 |
| 55 | `wb5html-hd_oral_sc02-4` | hd_oral_sc02_5 | B7 oral DB 同步 | `c4a4c6f0028f` | `56abf9d86613` | 1602f4 | 2 | 0 | 1/1 |
| 56 | `wb5html-hd_oral_sc04-0` | hd_oral_sc04_1 | B7 oral DB 同步 | `1bb6167412db` | `7751187daf2b` | 1602f4 | 3 | 0 | 1/2 |
| 57 | `wb5html-hd_oral_sc04-1` | hd_oral_sc04_2 | B7 oral DB 同步 | `92cdfacd083b` | `671a1b35ad0d` | 1602f4 | 2 | 0 | 3/3 |
| 58 | `wb5html-hd_oral_sc04-2` | hd_oral_sc04_3 | B7 oral DB 同步 | `df622fd81316` | `caca9536cbb5` | 1602f4 | 3 | 0 | 2/2 |
| 59 | `wb5html-hd_oral_sc04-3` | hd_oral_sc04_4 | B7 oral DB 同步 | `01de2cfaae51` | `d438545a1393` | 1602f4 | 2 | 0 | 2/2 |
| 60 | `wb5html-hd_oral_sc04-4` | hd_oral_sc04_5 | B7 oral DB 同步 | `eb0085073acc` | `e8b22672eaad` | 1602f4 | 3 | 0 | 2/2 |
| 61 | `wb5html-hd_oral_sc04-5` | hd_oral_sc04_6 | B7 oral DB 同步 | `33326c32ca7c` | `a9a447ef2df7` | 1602f4 | 2 | 0 | 1/2 |
| 62 | `wb5html-hd_oral_sc04-6` | hd_oral_sc04_7 | B7 oral DB 同步 | `24d831671b2f` | `559c4675b231` | 1602f4 | 3 | 0 | 2/2 |
| 63 | `wb5html-hd_oral_sc04-7` | hd_oral_sc04_8 | B7 oral DB 同步 | `1b459a34ecdd` | `856ede5e93b4` | 1602f4 | 2 | 0 | 2/2 |
| 64 | `wb5html-hd_oral_sc04-8` | hd_oral_sc04_9 | B7 oral DB 同步 | `b21eab186a5e` | `8368fc1d3324` | 1602f4 | 3 | 0 | 1/2 |
| 65 | `wb5html-hd_oral_sc05-0` | hd_oral_sc05_1 | B7 oral DB 同步 | `f70b427131cc` | `b1799a75de2e` | 1602f4 | 3 | 0 | 1/1 |
| 66 | `wb5html-hd_oral_sc06-0` | hd_oral_sc06_1 | B7 oral DB 同步 | `f3bf2e5975d0` | `3ec5e69dc5b7` | 1602f4 | 3 | 0 | 1/2 |
| 67 | `wb5html-hd_oral_sc06-2` | hd_oral_sc06_3 | B7 oral DB 同步 | `38c9e65d4235` | `124e03299e40` | 1602f4 | 3 | 0 | 1/1 |
| 68 | `wb5html-hd_oral_sc06-3` | hd_oral_sc06_4 | B7 oral DB 同步 | `f39876f4fd86` | `c623fa83bd86` | 1602f4 | 3 | 0 | 0/1 |
| 69 | `wb5html-hd_oral_sc06-4` | hd_oral_sc06_5 | B7 oral DB 同步 | `ea93870ad1ca` | `6f248f886287` | 1602f4 | 3 | 0 | 2/1 |
| 70 | `wb5html-hd_oral_sc06-6` | hd_oral_sc06_7 | B7 oral DB 同步 | `b2d50d6e448b` | `be7431ce6361` | 1602f4 | 3 | 0 | 0/1 |
| 71 | `wb5html-hd_oral_sc06-7` | hd_oral_sc06_8 | B7 oral DB 同步 | `ae2e8b7c9b9f` | `6ba02c325784` | 1602f4 | 3 | 0 | 1/1 |
| 72 | `wb5html-hd_oral_sc07-5` | hd_oral_sc07_6 | B7 oral DB 同步 | `ce5f43ada6a3` | `b0a55816cbf9` | 1602f4 | 3 | 0 | 0/1 |
| 73 | `wb5html-hd_oral_sc07-10` | hd_oral_sc07_11 | B7 oral DB 同步 | `1e63ddddc205` | `042cc8465583` | 1602f4 | 2 | 0 | 2/2 |
| 74 | `wb5html-hd_oral_sc08-2` | hd_oral_sc08_3 | B7 oral DB 同步 | `ea1a73d2b391` | `39e2eb933f33` | 1602f4 | 2 | 0 | 3/3 |
| 75 | `wb5html-hd_oral_sc09-0` | hd_oral_sc09_1 | B7 oral DB 同步 | `d61aabe3fdaf` | `b5036438d8d3` | 1602f4 | 2 | 0 | 3/3 |
| 76 | `wb5html-hd_oral_sc10-0` | hd_oral_sc10_1 | B7 oral DB 同步 | `9798daf0f3c8` | `d79d6b0d0c5d` | 1602f4 | 3 | 0 | 2/2 |
| 77 | `wb5html-hd_oral_sc10-1` | hd_oral_sc10_2 | B7 oral DB 同步 | `cfa2c1f4e5d9` | `b9258fa17434` | 1602f4 | 2 | 0 | 0/2 |
| 78 | `wb5html-hd_oral_sc10-2` | hd_oral_sc10_3 | B7 oral DB 同步 | `9528de455841` | `b103aa72d8f7` | 1602f4 | 3 | 0 | 2/2 |
| 79 | `wb5html-hd_oral_sc10-7` | hd_oral_sc10_8 | B7 oral DB 同步 | `ac2489056553` | `0a9b678a0de3` | 1602f4 | 2 | 0 | 0/1 |
| 80 | `wb5html-hd_oral_sc11-0` | hd_oral_sc11_1 | B7 oral DB 同步 | `9f44325100e3` | `11fd1aaf0436` | 1602f4 | 2 | 0 | 2/2 |
| 81 | `wb5html-hd_oral_sc11-1` | hd_oral_sc11_2 | B7 oral DB 同步 | `a85376ef18ec` | `dcafff2ca8e9` | 1602f4 | 2 | 0 | 1/2 |
| 82 | `wb5html-hd_oral_sc11-2` | hd_oral_sc11_3 | B7 oral DB 同步 | `2a8201df554f` | `661ae449bf84` | 1602f4 | 2 | 0 | 1/2 |
| 83 | `wb5html-hd_oral_sc12-0` | hd_oral_sc12_1 | B7 oral DB 同步 | `0d1444cfff53` | `4bf6a249604f` | 1602f4 | 2 | 0 | 2/2 |
| 84 | `wb5html-hd_oral_sc12-1` | hd_oral_sc12_2 | B7 oral DB 同步 | `25d3c433aec9` | `4be01e8f4d52` | 1602f4 | 2 | 0 | 2/2 |
| 85 | `wb5html-hd_oral_sc12-2` | hd_oral_sc12_3 | B7 oral DB 同步 | `a3076099e888` | `3c1861d48322` | 1602f4 | 2 | 0 | 2/2 |
| 86 | `wb5html-hd_oral_sc12-7` | hd_oral_sc12_8 | B7 oral DB 同步 | `363d57523429` | `c556209d5344` | 1602f4 | 2 | 0 | 2/2 |
| 87 | `wb5html-hd_oral_sc12-8` | hd_oral_sc12_9 | B7 oral DB 同步 | `0f6657428946` | `f92b12fe3bd9` | 1602f4 | 2 | 0 | 1/3 |
| 88 | `wb5html-hd_oral_sc14-3` | hd_oral_sc14_4 | B7 oral DB 同步 | `0cb43a909dda` | `8578f511fa99` | 1602f4 | 4 | 0 | 2/2 |
| 89 | `wb5html-hd_oral_sc15-3` | hd_oral_sc15_4 | B7 oral DB 同步 | `a82c5d9410a5` | `ab090ca1d411` | 1602f4 | 3 | 0 | 2/1 |
| 90 | `wb5html-hd_mindmap-0` | hd_mindmap_1 | B9 mindmap DB 同步 | `3d69d8f882e5` | `235b20523359` | 1602f4 | 0 | 0 | 1/0 |
| 91 | `wb5html-hd_mindmap-11` | hd_mindmap_12 | B9 mindmap DB 同步 | `a585a64a1a73` | `deb0fbfde28b` | 1602f4 | 0 | 0 | 1/0 |
| 92 | `wb5html-hd_mindmap-12` | hd_mindmap_13 | B9 mindmap DB 同步 | `cd5a816fed5c` | `efe9458825c1` | 1602f4 | 0 | 0 | 1/1 |
| 93 | `wb5html-fp_boundedness-0` | boundedness_1 | T11/P1 原理重生成 | `2bb190038a85` | `aee2a5833d8f` | 2d47bb | 4 | 1 | 3/3 |

（sha256 仅列前 12 位，全文在 payloads.json；引擎列为引擎 blob 哈希前 6 位。）

## 特别标注

1. **phonology_1 双槽位**：元素 `wb5html-fp_economy-0` 与 `wb5html-fp_economy_p2-0` 同装新版全幕。原嵌入时该幕被拆成两节（第 2 节槽位放的是旧版 -s/-ed 段 `fp_economy_p2_1`）；新版模板 `fp_economy_1_v2.js` 为单幕全版（-ed 演示已并回），只换第 1 节会让旧内容在第 2 节存活，故双槽同换。两条载荷因各自钉住的引擎与标题不同而互不相同。
2. **ze_be_1（sentence_1）**：以 T11 重生成版打包；该幕此前在存量侧打过的 B4 sf-044 补丁随旧载荷一并退场（条目 note 已注明）。
3. **boundedness_1 源码版本**：打包期间其生成源码被 T16-P0 工作更新为元素库版本（`gen_boundedness_1.js`，mtime 2026-10-31T22:45:42Z，srcSha256 `e5a82a051077…`；使用 props 元素库 drawElement/assertPourWindow，无旧版 1.72 rad 参数残留）。本包按「以工作树当前版本为准」打包此新版；任务下达时所指的旧源码（srcSha256 `b1e938909e77…`）已被取代，不在本包内。**连带提示**：其余条目为 T16 全面重做之前的源码版本；T16 模板定型后，如某幕源码变化，本地工具可用条目内 `srcSha256` 与仓库现状比对检出，变化者需重打包。
4. **自检串覆盖缺口**（下列条目 mustContain 与 mustNotContain 双空，本地工具对这些条目只能凭 sha256 校验）：hd_g19_1、hd_g03_1、hd_g40_1、hd_g14_1。仅 mc 空（删除/提示语移除型，靠 mnc + sha 把关）：hd_phonics_1、wo_rule_assim_1、hd_g15_1、hd_g33_1、five_patterns_p2_2、bamboo_tree_1、metaphor_code_4、wo_vowel_a_1、hd_g39_1、hd_oral_sc06_4、hd_oral_sc06_7、hd_oral_sc07_6、hd_oral_sc10_2、hd_oral_sc10_8。仅 mnc 空：hd_g06_1、hd_mindmap_1、hd_mindmap_12。全包合计 mc 160 条 / mnc 179 条。
5. **字体子集提示**：载荷钉住 app 现有引擎（含其字体子集，该子集按旧幕字集切分；549 幕共用 2 个子集为既有架构）。新幕若用罕见字形，回灌后建议抽查相关画面帧。
6. **B10/B11 重叠**：必换集与 B10/B11 在办场景集不相交（计划口径）；打包前预检 93 个源文件在 B10/B11 开工后无一被修改，最终审计亦与当前工作树 100% 一致 —— 无「待 B10/B11 完工后重打」条目。
7. **past_clans_4**：B2b 整幕订正包（sf-009）；其 253.1s 时长超限已经裁定接受，不在本包处理范围。

## 打包过程记录（溯源）

- 原始打包器为仓库内 `docs/whiteboard/v5/embed_app.py`，配方以其 `pack()` 与运行时 `wb5Mount/wb5Blob/wb5Gz` 为准（见 recipe.md）；圆环证明先行通过后才批量打包。
- 打包中途 VM 重启（2026-10-31 ~23:21 UTC），/tmp 内一代打包工具丢失；二代工具重建于 `~/workspace/t15-tools/`（t15_packgen.py / t15_verify.py，随包外保存），并以跨组已存条目做保真测试：配方字段逐字节复现；全量审计（93 条重算比对）配方字段 100% 一致。片段字段（mustContain/mustNotContain 的挑选与顺序、Decoded 渲染）在 22 条上与一代挖串器存在挑选差异，均为校验有效集，未改动已存条目。
- 转写事故 3 起（拼接滑移：hd_oral_sc04_4、hd_oral_sc06_5、hd_mindmap_13）与 boundedness_1 两处单字符丢失，均以「存储 vs 新算」逐字 diff 定位、窗口替换修复，并经全量校验复验通过。
