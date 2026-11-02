# 自然拼读模式词集 · 全量推导说明（PHONICS_WORDSETS）

> 数据文件：`model/phonics_wordsets.json`（本文件为其评审文档）。重推导日期 2026-11-01（数据收官）。
> 硬要求（用户）：词库中满足某个拼读规律的词，必须**全部**出现在该规律下——本推导即全量判定，不挑例词。
> 本版按最终词库（2,285 条）全量重跑；复合词头按**成员级**推导（§2 第 6 点）；与旧版（1,959 条）的差异逐项说明见 §8。
> **终轮修订（2026-11-01 晚）**：词库扩至 2,287 条并合并英式字段 `phonetic_gb` 后，本词集以 phonetic_gb 为音标源、以独立审计期望集为基底重推（§10）；§1–§9 的计数为上一版（GA 口径）数据，终局计数与逐项处置以 §10 为准。

## 1. 总览

- 词库条目：2285；派生单位：2315（条目 2,285 − 复合词头 14 + 成员 44）；模式总数：167；
- 至少命中 1 个模式的条目：2283；派生单位命中：2313；至少命中 1 个**元音**模式的条目：2214；
- 词次（模式×单位命中合计）：9992；零命中单位：2（§6）；待裁定：184 条（§5）。

| 类别 | 模式数 | 词次（命中合计） |
|---|---|---|
| 辅音 | 48 | 6730 |
| 短元音 | 9 | 1397 |
| 长音菜单 | 65 | 1325 |
| 变脸多读 | 25 | 154 |
| Magic e | 5 | 180 |
| 词尾定律 | 15 | 206 |

与旧版（1,959 条库）对比：模式 167 → 167（不变）；词次 7,923 → 9992（含新库 326 条新词与成员级推导新增）；条目命中 1,943/1,959 → 2283/2,285；零命中 16 → 2；待裁定 190 → 184（构成见 §5）。

## 2. 判定方法（双条件 + 音节对齐）

1. **拼写侧**：把词形按最长优先切成字母块（ough/eigh/igh 及模式表中的多字母组合、双字母组合、单字母）；字母块集合由模式表的字素集生成（无模式的字素组合如 ia/io/eu 不成块）。词尾 VCe 分体组合（a-e 等，V+1~2 辅音+e）合并为一块；-age 词尾、dge、r 居中的 VCe（fire/more 型）不作分体。
2. **读音侧**：把词库 phonetic 切成音素（tʃ/dʒ 整体、二合元音整体、j+uː/ʊ 合并为 juː）；元音单位标记 r 尾（rtail）与 r 作下音节首（rnext）；词库的无长音符写法（ɜ/ɔ/ɑ，如 /stɜr/）按 ɜː/ɔː/ɑː 归一。
3. **对齐**：元音块与音素元音单位做保序 DP 对齐：模式命中 3 分、合理读法 2 分、弱读 ə 1 分、分体短读面 1 分；LOT 双写（ɒ 对 ɑː/ɔː）等非精确类匹配降为 2 分（精确读法优先）；允许单字母元音块零吞（静音 e）、ue/ui 块零吞（tongue/build 型）、一块对两单位（可分读组合与 VCe 的 -re 尾）。r 控块只许对齐 r 相邻的音素单位。a→/e/ 候选仅 any/many 家族有效。
4. **切分回退**：首选切分对齐失败或辅音侧不通时，按层溶解可疑团队重试——all/alk → r 团队（are/ere/air/eer/ear/oor）与 ew/ey → 全部叠加 + eo/aw + 关闭分体；按「辅音对齐通过 → 元音对齐分高 → 层级靠前」择优（ballet 的 all、somewhere 的 ew、police 的 i-e 假分体均由此归正）。
5. **辅音侧**：字母格 DP 对齐（双字母边优先计分）；拼写 r 单位以「r 预算」吸收其 r 音素（parent/foreigner/eraser 的认领次序问题由此解决）；无字母来源的音素按孤儿规则登记跳过（tion/cian→ʃ、sion→ʃ/ʒ、ture→tʃ、sure→ʒ、stion→tʃ、CuV/iu 的 j 滑音、one 家族的 w、ngth 的 k、ough 家族多余的 f/p/k/x、缩略词 Mr/Mrs 的展开音等，均逐词由拼写触发条件限定）。双写/组合边按重叠口径另给单字母模式（ck→k、tch→ch、dge→g、ff→f、ll→l、zz→z、kn/gn→n、mn/mb→m、pt→t、wh→w、gu→g、ps→s、xc 簇→x-ks、-ed 的 d→t、alk 的 k、all 的 l/ll）。
6. **成员级推导（复合词头）**：14 条复合词头按 aliases 拆成 44 个成员，音标按条目 phonetic 分段逐成员对应（a/an 两成员各得弱读/强读变体对），每个成员独立跑双条件；命中以成员键 `条目id#序号` 进词集（如 G3_Q02#0 = who），母条目可溯。原「复合词头」待裁定类已清零（§5）。
7. **定点词尾与交叉引用**：-ce/-ge/-ve/-the/-le/-age/-ic/-ous/-tion/-sion/-cian/-ture 按拼写+音素定点判定（-stion 的 tʃ、eighth 的 t+θ 分记）；ough 的 f/p/x 家族（cough/trough/enough/rough/tough/hiccough/lough）按音标串定点，覆盖对齐给出的元音面；GP-c-k-front / GP-g-g-front 为**词级交叉引用子集**（词内同时有软读面与硬读面时登记，成员与基础模式天然交叠，见 §9 校验）。Floss 类（ff/ss/zz/ll/ck）限词段尾 + 紧前元音为完整元音（非 ə）；ss 双写边不另给 GP-s-s。
8. **命中与待裁定**：对齐成功且模式条件成立即命中；分体短读面（give/live 型）与对齐失败的词进待裁定并逐词给理由，不硬塞。同一词的不同字母块可命中多个模式；同一块只进读音相符的子模式——great 的 ea 读 /eɪ/，只进 ea→/eɪ/，不进 ea→/iː/。

## 3. 音标口径映射（词库 GA 式标音 ↔ 清单 RP 定版）

> 用户裁定（2026-11-01）：模式层保持 RP 不动；词库 phonetic（GA 宽式）本轮冻结不改写。两者差异逐模式计数登记为**已知口径差**（见 closing_validation.md 口径差表），不当作误收/漏收。

| 问题 | 处理 |
|---|---|
| /oʊ/ 与 /əʊ/ | 词库用 /oʊ/，清单用 RP /əʊ/——判定中恒等，模式名按 RP 显示 |
| /ɛ/ 与 /e/、裸 i/u 与 ɪ/ʊ | 恒等处理（词库两种写法并存） |
| r 化标音 | 词库 car /kɑːr/ 式带 r；r 控模式按「元音+r 相邻」核，显示用 RP 口径 |
| 无长音符 r 化写法 | 新词多作 /stɜr/、/kɑrv/（ɜ/ɔ/ɑ 无 ː）——归一为 ɜː/ɔː/ɑː 后判定 |
| LOT 元音双写 | 词库 hot 作 /ɑː/、dog 作 /ɔː/ 两写并存——o/a 短读模式读音集双收，但计分上精确类优先于双写类（watch 的 a 作 /ɑː/ 归 a-w-ɒ 家族、water 的 a 作 /ɔː/ 归 a-w-ɔː） |
| ough 的 /ɒf/ 与 /ɔː/ | 词库音标上不可分，按 S-42 名单定点：cough/trough 归 /ɒf/、-ought 队归 /ɔː/、hiccough 归 /ʌp/、lough（词库作 /ɑːx/）归 /ɒx/ |
| thorough / borough | 词库标 GA /oʊ/——按词库音标归 GP-ough-əʊ；S-42 定版的 RP /ə/ 读法差异登记为口径差，不改词库音标 |
| 重读标记缺失 | 词库约半数条目无 ˈ/ˌ——本版判定不依赖重读标记（Floss 改按「紧前元音为完整元音」判定） |
| 复合词头（14 条） | 已改成员级推导（§2 第 6 点），不再整条待裁定 |

## 4. 模式清单（全量计数）

同（字素，音素）子模式以 `short` 短标签区分（菜单合并与页内分区口径见原型说明）；short 为空表示该（字素，音素）无同名子模式。

| 模式 id | 挂接键 | 字母组合 | 读音 | 短标签 | 类别 | 规律 | 词数 |
|---|---|---|---|---|---|---|---|
| GP-b | b_b | b | /b/ |  | 辅音 | S-30 | 263 |
| GP-c-k | c_k | c | /k/ | a/o/u 前 | 辅音 | S-31/SR-04 | 268 |
| GP-c-k-front | c_k | c | /k/ | 例外小队 | 辅音 | S-31/SR-04 | 24 |
| GP-c-s | c_s | c | /s/ |  | 辅音 | S-31 | 100 |
| GP-ch-k | ch_k | ch | /k/ |  | 辅音 | S-32 | 17 |
| GP-ch-tʃ | ch_ch | ch | /tʃ/ |  | 辅音 | S-32 | 74 |
| GP-ch-ʃ | ch_sh | ch | /ʃ/ |  | 辅音 | S-32 | 7 |
| GP-d | d_d | d | /d/ |  | 辅音 | S-30 | 380 |
| GP-f | f_f | f | /f/ |  | 辅音 | S-30 | 239 |
| GP-g-dʒ | g_j | g | /dʒ/ |  | 辅音 | S-31 | 62 |
| GP-g-g | g_g | g | /g/ | a/o/u 前 | 辅音 | S-31 | 140 |
| GP-g-g-front | g_g | g | /g/ | 倔强老词队 | 辅音 | S-31 | 29 |
| GP-gn | gn_n | gn | /n/ |  | 辅音 | S-33 | 9 |
| GP-gu | gu_g | gu | /g/ |  | 辅音 | S-33 | 9 |
| GP-h | h_h | h | /h/ |  | 辅音 | S-30 | 136 |
| GP-j | j_j | j | /dʒ/ |  | 辅音 | S-30 | 20 |
| GP-k | k_k | k | /k/ |  | 辅音 | S-30 | 185 |
| GP-kn | kn_n | kn | /n/ |  | 辅音 | S-33 | 7 |
| GP-l | l_l | l | /l/ |  | 辅音 | S-30 | 587 |
| GP-m | m_m | m | /m/ |  | 辅音 | S-30 | 350 |
| GP-mb | mb_m | mb | /m/ |  | 辅音 | S-33 | 7 |
| GP-mn | mn_m | mn | /m/ |  | 辅音 | S-33 | 3 |
| GP-n | n_n | n | /n/ |  | 辅音 | S-30 | 650 |
| GP-ng | ng_ng | ng | /ŋ/ |  | 辅音 | S-32 | 63 |
| GP-nk | nk_ŋk | nk | /ŋk/ |  | 辅音 | S-32 | 12 |
| GP-p | p_p | p | /p/ |  | 辅音 | S-30 | 354 |
| GP-ph | ph_f | ph | /f/ |  | 辅音 | S-32 | 19 |
| GP-pn | pn_n | pn | /n/ |  | 辅音 | S-33 | 1 |
| GP-ps | ps_s | ps | /s/ |  | 辅音 | S-33 | 2 |
| GP-pt | pt_t | pt | /t/ |  | 辅音 | S-33 | 1 |
| GP-qu-k | qu_k | qu | /k/ |  | 辅音 | S-32 | 6 |
| GP-qu-kw | qu_kw | qu | /kw/ |  | 辅音 | S-32 | 14 |
| GP-r | r_r | r | /r/ |  | 辅音 | S-30 | 840 |
| GP-s-s | s_s | s | /s/ |  | 辅音 | S-30 | 467 |
| GP-s-z | s_z | s | /z/ |  | 辅音 | S-30 | 114 |
| GP-sh | sh_sh | sh | /ʃ/ |  | 辅音 | S-32 | 63 |
| GP-t | t_t | t | /t/ |  | 辅音 | S-30 | 721 |
| GP-th-ð | th_th | th | /ð/ |  | 辅音 | S-32 | 49 |
| GP-th-θ | th_th | th | /θ/ |  | 辅音 | S-32 | 75 |
| GP-v | v_v | v | /v/ |  | 辅音 | S-30 | 133 |
| GP-w | w_w | w | /w/ |  | 辅音 | S-30 | 142 |
| GP-wh-h | wh_h | wh | /h/ |  | 辅音 | S-32 | 5 |
| GP-wh-w | wh_w | wh | /w/ |  | 辅音 | S-32 | 15 |
| GP-wr | wr_r | wr | /r/ |  | 辅音 | S-33 | 10 |
| GP-x-gz | x_gz | x | /ɡz/ |  | 辅音 | S-30 | 6 |
| GP-x-ks | x_ks | x | /ks/ |  | 辅音 | S-30 | 30 |
| GP-x-z | x_z | x | /z/ |  | 辅音 | S-30 | 1 |
| GP-z | z_z | z | /z/ |  | 辅音 | S-30 | 21 |
| GP-a-æ | a_ae | a | /æ/ |  | 短元音 | S-34 | 258 |
| GP-a-ə | a_uh | a | /ə/ |  | 短元音 | S-08 | 37 |
| GP-e-e | e_e | e | /e/ |  | 短元音 | S-34 | 274 |
| GP-i-ɪ | i_i | i | /ɪ/ |  | 短元音 | S-34 | 390 |
| GP-o-ɒ | o_o | o | /ɒ/ |  | 短元音 | S-34 | 107 |
| GP-u-ʊ | u_u | u | /ʊ/ |  | 短元音 | S-34 | 37 |
| GP-u-ʌ | u_uh | u | /ʌ/ |  | 短元音 | S-34 | 130 |
| GP-y-i | y_i | y | /i/ |  | 短元音 | S-34/SR-05 | 156 |
| GP-y-ɪ | y_i | y | /ɪ/ |  | 短元音 | S-34/SR-05 | 8 |
| GP-a-e | a_e_ei | a-e | /eɪ/ |  | 长音菜单 | S-35/SR-01 | 94 |
| GP-a-eɪ-open | a_ei | a | /eɪ/ |  | 长音菜单 | S-35 | 49 |
| GP-a-ɑː | a_ah | a | /ɑː/ |  | 长音菜单 | S-41/S-42 | 18 |
| GP-ai | ai_ei | ai | /eɪ/ |  | 长音菜单 | S-35/SR-05 | 28 |
| GP-air | air_air | air | /eə/ |  | 长音菜单 | S-40 | 17 |
| GP-all | all_aw | all | /ɔː/ |  | 长音菜单 | S-41 | 23 |
| GP-ar | ar_ah | ar | /ɑː/ |  | 长音菜单 | S-40 | 46 |
| GP-ar-w | ar_aw | ar | /ɔː/ |  | 长音菜单 | S-40 | 7 |
| GP-are | are_air | are | /eə/ |  | 长音菜单 | S-40 | 6 |
| GP-au | au_aw | au | /ɔː/ |  | 长音菜单 | S-41 | 15 |
| GP-aw | aw_aw | aw | /ɔː/ |  | 长音菜单 | S-41 | 10 |
| GP-ay | ay_ei | ay | /eɪ/ |  | 长音菜单 | S-35/SR-05 | 40 |
| GP-e-iː-open | e_ee | e | /iː/ |  | 长音菜单 | S-36 | 21 |
| GP-eCe | e_e_ee | e-e | /iː/ |  | 长音菜单 | S-36 | 7 |
| GP-ea-eɪ | ea_ei | ea | /eɪ/ |  | 长音菜单 | S-35 | 3 |
| GP-ea-iː | ea_ee | ea | /iː/ |  | 长音菜单 | S-36 | 67 |
| GP-ear-eə | ear_air | ear | /eə/ |  | 长音菜单 | S-40 | 4 |
| GP-ear-ɪə | ear_eer | ear | /ɪə/ |  | 长音菜单 | S-40 | 13 |
| GP-ee | ee_ee | ee | /iː/ |  | 长音菜单 | S-36 | 55 |
| GP-eer | eer_eer | eer | /ɪə/ |  | 长音菜单 | S-40 | 5 |
| GP-ei-eɪ | ei_ei | ei | /eɪ/ |  | 长音菜单 | S-35 | 5 |
| GP-ei-iː | ei_ee | ei | /iː/ | seize 一家 | 长音菜单 | SR-07 | 6 |
| GP-ei-iː-c | ei_ee | ei | /iː/ | ceiling 一家 | 长音菜单 | S-36/SR-07 | 8 |
| GP-eigh | eigh_ei | eigh | /eɪ/ |  | 长音菜单 | S-35 | 8 |
| GP-eo | eo_ee | eo | /iː/ |  | 长音菜单 | S-36 | 1 |
| GP-er | er_er | er | /ɜː/ |  | 长音菜单 | S-40 | 18 |
| GP-ere-eə | ere_air | ere | /eə/ |  | 长音菜单 | S-40 | 4 |
| GP-ere-ɪə | ere_eer | ere | /ɪə/ |  | 长音菜单 | S-40 | 2 |
| GP-ew-juː | ew_yoo | ew | /juː/ |  | 长音菜单 | S-39 | 1 |
| GP-ew-uː | ew_oo | ew | /uː/ |  | 长音菜单 | S-39 | 7 |
| GP-ey-eɪ | ey_ei | ey | /eɪ/ |  | 长音菜单 | S-35 | 5 |
| GP-ey-i | ey_i | ey | /i/ |  | 长音菜单 | S-36 | 7 |
| GP-i-aɪ-open | i_igh | i | /aɪ/ | 开音节 | 长音菜单 | S-37 | 64 |
| GP-i-e | i_e_igh | i-e | /aɪ/ |  | 长音菜单 | S-37/SR-01 | 77 |
| GP-i-find | i_igh | i | /aɪ/ | find 一家 | 长音菜单 | S-37 | 11 |
| GP-i-iː | i_ee | i | /iː/ |  | 长音菜单 | S-36 | 14 |
| GP-ie-aɪ | ie_igh | ie | /aɪ/ |  | 长音菜单 | S-37 | 11 |
| GP-ie-iː | ie_ee | ie | /iː/ |  | 长音菜单 | S-36/SR-07 | 5 |
| GP-igh | igh_igh | igh | /aɪ/ |  | 长音菜单 | S-37 | 23 |
| GP-ir | ir_er | ir | /ɜː/ |  | 长音菜单 | S-40 | 19 |
| GP-o-both | o_oh | o | /əʊ/ | both 孤例 | 长音菜单 | S-38 | 2 |
| GP-o-e | o_e_oh | o-e | /əʊ/ |  | 长音菜单 | S-38/SR-01 | 29 |
| GP-o-old | o_oh | o | /əʊ/ | old 一家 | 长音菜单 | S-38 | 19 |
| GP-o-uː | o_oo | o | /uː/ |  | 长音菜单 | S-39 | 15 |
| GP-o-əʊ-open | o_oh | o | /əʊ/ | 开音节 | 长音菜单 | S-38 | 72 |
| GP-oa | oa_oh | oa | /əʊ/ |  | 长音菜单 | S-38 | 15 |
| GP-oe | oe_oh | oe | /əʊ/ |  | 长音菜单 | S-38 | 7 |
| GP-oi | oi_oy | oi | /ɔɪ/ |  | 长音菜单 | S-41/SR-05 | 10 |
| GP-oo-uː | oo_oo | oo | /uː/ |  | 长音菜单 | S-39 | 46 |
| GP-or | or_aw | or | /ɔː/ |  | 长音菜单 | S-40 | 61 |
| GP-or-w | or_er | or | /ɜː/ |  | 长音菜单 | S-40 | 19 |
| GP-ou-aʊ | ou_ow | ou | /aʊ/ |  | 长音菜单 | S-41 | 40 |
| GP-ou-uː | ou_oo | ou | /uː/ |  | 长音菜单 | S-39 | 5 |
| GP-ou-əʊ | ou_oh | ou | /əʊ/ |  | 长音菜单 | S-38 | 3 |
| GP-ow-aʊ | ow_ow | ow | /aʊ/ |  | 长音菜单 | S-41/SR-05 | 29 |
| GP-ow-əʊ | ow_oh | ow | /əʊ/ |  | 长音菜单 | S-38/SR-05 | 27 |
| GP-oy | oy_oy | oy | /ɔɪ/ |  | 长音菜单 | S-41/SR-05 | 13 |
| GP-u-e | u_e_oo | u-e | /uː/ |  | 长音菜单 | S-39/SR-01 | 6 |
| GP-u-e-juː | u_e_yoo | u-e | /juː/ |  | 长音菜单 | S-39 | 5 |
| GP-u-juː | u_yoo | u | /juː/ |  | 长音菜单 | S-39 | 15 |
| GP-ue-juː | ue_yoo | ue | /juː/ |  | 长音菜单 | S-39 | 2 |
| GP-ue-uː | ue_oo | ue | /uː/ |  | 长音菜单 | S-39 | 7 |
| GP-ui | ui_oo | ui | /uː/ |  | 长音菜单 | S-39 | 5 |
| GP-ur | ur_er | ur | /ɜː/ |  | 长音菜单 | S-40 | 14 |
| GP-y-aɪ | y_igh | y | /aɪ/ |  | 长音菜单 | S-37/SR-05 | 35 |
| GP-ai-e | ai_e | ai | /e/ |  | 变脸多读 | S-35 | 3 |
| GP-ie-e | ie_e | ie | /e/ |  | 变脸多读 | S-36 | 4 |
| GP-ce | ce_s | ce | /s/ |  | Magic e | SR-01 | 42 |
| GP-ge | ge_j | ge | /dʒ/ |  | Magic e | SR-01 | 30 |
| GP-le | le_əl | le | /əl/ |  | Magic e | SR-01 | 67 |
| GP-the | the_th | the | /ð/ |  | Magic e | SR-01 | 9 |
| GP-ve | ve_v | ve | /v/ |  | Magic e | SR-01 | 32 |
| GP-age | age_ɪdʒ | age | /ɪdʒ/ |  | 词尾定律 | SR-06 | 12 |
| GP-cian | cian_ʃən | cian | /ʃən/ |  | 词尾定律 | SR-06 | 4 |
| GP-ck | ck_k | ck | /k/ |  | 词尾定律 | S-33/SR-03 | 28 |
| GP-dge | dge_j | dge | /dʒ/ |  | 词尾定律 | S-33/SR-03 | 10 |
| GP-ff | ff_f | ff | /f/ |  | 词尾定律 | SR-02 | 6 |
| GP-ic | ic_ɪk | ic | /ɪk/ |  | 词尾定律 | SR-04 | 17 |
| GP-ll | ll_l | ll | /l/ |  | 词尾定律 | SR-02 | 35 |
| GP-ous | ous_əs | ous | /əs/ |  | 词尾定律 | SR-06 | 12 |
| GP-sion-ʃ | sion_ʃən | sion | /ʃən/ |  | 词尾定律 | SR-06 | 4 |
| GP-sion-ʒ | sion_ʒən | sion | /ʒən/ |  | 词尾定律 | SR-06 | 7 |
| GP-ss | ss_s | ss | /s/ |  | 词尾定律 | SR-02 | 21 |
| GP-tch | tch_ch | tch | /tʃ/ |  | 词尾定律 | S-33/SR-03 | 15 |
| GP-tion | tion_ʃən | tion | /ʃən/ |  | 词尾定律 | SR-06 | 22 |
| GP-ture | ture_tʃə | ture | /tʃə/ |  | 词尾定律 | SR-06 | 9 |
| GP-zz | zz_z | zz | /z/ |  | 词尾定律 | SR-02 | 4 |
| GP-a-e-any | a_e | a | /e/ |  | 变脸多读 | S-42 | 8 |
| GP-a-w-ɒ | a_o | a | /ɒ/ |  | 变脸多读 | S-42 | 8 |
| GP-a-w-ɔː | a_aw | a | /ɔː/ |  | 变脸多读 | S-42 | 5 |
| GP-ea-e | ea_e | ea | /e/ |  | 变脸多读 | S-42 | 23 |
| GP-ea-ɑː | ea_ah | ea | /ɑː/ |  | 变脸多读 | S-42 | 0 |
| GP-ear-ɑː | ear_ah | ear | /ɑː/ |  | 变脸多读 | S-42 | 2 |
| GP-ear-ɜː | ear_er | ear | /ɜː/ |  | 变脸多读 | S-42/S-40 | 7 |
| GP-oo-ʊ | oo_u | oo | /ʊ/ |  | 变脸多读 | S-42 | 26 |
| GP-oo-ʌ | oo_uh | oo | /ʌ/ |  | 变脸多读 | S-42 | 2 |
| GP-oor | oor_aw | oor | /ɔː/ |  | 变脸多读 | S-42 | 2 |
| GP-ou-ɔː | ou_aw | ou | /ɔː/ |  | 变脸多读 | S-42 | 8 |
| GP-ou-ə | ou_uh | ou | /ə/ |  | 变脸多读 | S-42 | 19 |
| GP-ou-ʊ | ou_u | ou | /ʊ/ |  | 变脸多读 | S-42 | 5 |
| GP-ou-ʌ | ou_uh | ou | /ʌ/ |  | 变脸多读 | S-42 | 8 |
| GP-ough-aʊ | ough_ow | ough | /aʊ/ |  | 变脸多读 | S-42 | 4 |
| GP-ough-uː | ough_oo | ough | /uː/ |  | 变脸多读 | S-42 | 1 |
| GP-ough-ɒf | ough_ɒf | ough | /ɒf/ |  | 变脸多读 | S-42 | 2 |
| GP-ough-ɒx | ough_ɒx | ough | /ɒx/ |  | 变脸多读 | S-42 | 1 |
| GP-ough-ɔː | ough_aw | ough | /ɔː/ |  | 变脸多读 | S-42 | 6 |
| GP-ough-ə | ough_uh | ough | /ə/ |  | 变脸多读 | S-42 | 0 |
| GP-ough-əʊ | ough_oh | ough | /əʊ/ |  | 变脸多读 | S-42 | 5 |
| GP-ough-ʌf | ough_ʌf | ough | /ʌf/ |  | 变脸多读 | S-42 | 4 |
| GP-ough-ʌp | ough_ʌp | ough | /ʌp/ |  | 变脸多读 | S-42 | 1 |

## 5. 待裁定清单（逐词 · 理由）

共 184 条。构成：旧版 190 条中 14 条复合词头整条待裁定已由成员级推导消解（其成员分别归位，见词集成员键），其余 176 条逐条保留原登记；本轮新增 8 条（标「新增」：7 条 VCe 短读面 + coexist 对齐失败）。**「复合词头」类为零**：44 个成员全部由条目数据确定读音并归位，无成员待裁定。

| 词 | 条目 id | 理由 | 备注 |
|---|---|---|---|
| one | G1_025 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| flower | G2_075 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| ice cream | G2_0816 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| dance | G2_083 | VCe 短读面：a-e 读短音 /æ/（定版登记的例外型，如 give/live 型） |  |
| favourite | G2_K02 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| buy | G3_0650 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| live | G3_0653 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| zebra | G3_0951 | 元音弱化（schwa）使菜单归属待核 |  |
| orange | G3_113 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| giraffe | G3_123 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| woman | G3_135 | 元音弱化（schwa）使菜单归属待核 |  |
| twelve | G3_151 | VCe 短读面：e-e 读短音 /e/（定版登记的例外型，如 give/live 型） |  |
| shall | G3_K48 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| done | G3_KA05 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| office | G4_0343 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| minute | G4_0382 | VCe 短读面：u-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| baseball | G4_0403 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| sunflower | G4_0409 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| everyone | G4_0425 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| beautiful | G4_0451 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| usually | G4_0464 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| station | G4_0517 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| lovely | G4_0542 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| ninety | G4_0554 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| fireman | G4_0727 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| policeman | G4_0728 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| notebook | G4_162 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| quiet | G4_166 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| noodles | G4_177 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| vegetables | G4_179 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| expensive | G4_200 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| glove | G4_201 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| active | G5_0323 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| action | G5_0325 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| important | G5_0334 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| special | G5_0345 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| safety | G5_0359 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| housework | G5_0391 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| everybody | G5_0426 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| somebody | G5_0428 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| anyone | G5_0429 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| everything | G5_0434 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| everywhere | G5_0436 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| beauty | G5_0450 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| usual | G5_0463 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| quietly | G5_0530 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| quickly | G5_0532 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| once | G5_0587 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| February | G5_0605 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| July | G5_0609 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| national | G5_0658 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| schoolyard | G5_0698 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| timetable | G5_0714 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| hometown | G5_0725 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| spaceman | G5_0729 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| spaceship | G5_0730 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| sidewalk | G5_0744 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| grapefruit | G5_0751 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| firefly | G5_0761 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| housewife | G5_0769 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| politely | G5_0834 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| safely | G5_0835 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| comfortable | G5_0874 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| policewoman | G5_0884 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| fireplace | G5_0916 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| eyebrow | G5_0922 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| eyelash | G5_0923 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| eyeglass | G5_0924 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| eyesight | G5_0925 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| Wednesday | G5_214 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| delicious | G5_217 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| mountain | G5_231 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| village | G5_233 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| island | G5_235 | 元音弱化（schwa）使菜单归属待核 |  |
| vacation | G5_238 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| January | G5_240 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| information | G6_0339 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| service | G6_0356 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| unusual | G6_0459 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| international | G6_0478 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| ourselves | G6_0616 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| yourselves | G6_0617 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| earthquake | G6_0739 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| musician | G6_0780 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| magician | G6_0782 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| librarian | G6_0784 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| widely | G6_0845 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| peaceful | G6_0849 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| invitation | G6_0863 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| education | G6_0865 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| spacecraft | G6_0910 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| hospital | G6_255 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| post office | G6_257 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| dictionary | G6_264 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| factory | G6_275 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| cleaned | G6_289 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| stayed | G6_291 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| washed | G6_292 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| watched | G6_293 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| libraries | V6_MORPH_18 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| dictionaries | V6_MORPH_19 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| leaves | V6_MORPH_7 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| luggage | V6_交通_26 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| animal | V6_动物_0 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| restaurant | V6_城市_20 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| police station | V6_城市_24 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| fire station | V6_城市_25 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| square | V6_城市_28 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| tower | V6_城市_7 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| season | V6_天气_1 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| temperature | V6_天气_37 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| history | V6_学校_36 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| practise | V6_学校_75 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| cousin | V6_家庭_17 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| lonely | V6_情感_16 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| thousand | V6_数字_30 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| some | V6_数字_47 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| every | V6_数字_52 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| come | V6_日常_2 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| have | V6_日常_5 | VCe 短读面：a-e 读短音 /æ/（定版登记的例外型，如 give/live 型） |  |
| love | V6_日常_63 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| give | V6_日常_8 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| above | V6_核心_39 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| businessman | V6_职业_17 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| prince | V6_职业_35 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| ocean | V6_自然_17 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| metal | V6_自然_27 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| quarter | V6_节日_20 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| festival | V6_节日_42 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| Spring Festival | V6_节日_47 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| National Day | V6_节日_51 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| New Year | V6_节日_53 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| Dragon Boat Festival | V6_节日_54 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| stomach | V6_身体_19 | 元音弱化（schwa）使菜单归属待核 |  |
| guitar | V6_运动_23 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| table tennis | V6_运动_7 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| chocolate | V6_食物_21 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| vegetable | V6_食物_47 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| cabbage | V6_食物_52 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| ancient | ADD_0007 | 元音弱化（schwa）使菜单归属待核 |  |
| ballet | ADD_0012 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| become | ADD_0018 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| college | ADD_0049 | VCe 短读面：e-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| electrician | ADD_0089 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| equal | ADD_0097 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| garage | ADD_0115 | VCe 短读面：a-e 读短音 /ɑː/（定版登记的例外型，如 give/live 型） |  |
| giant | ADD_0123 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| gone | ADD_0128 | VCe 短读面：o-e 读短音 /ɔː/（定版登记的例外型，如 give/live 型） |  |
| guard | ADD_0132 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| guava | ADD_0133 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| hinge | ADD_0147 | VCe 短读面：i-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| income | ADD_0156 | VCe 短读面：o-e 读短音 /ʌ/（定版登记的例外型，如 give/live 型） |  |
| karate | ADD_0167 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| league | ADD_0178 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| loyal | ADD_0184 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| machine | ADD_0185 | 元音弱化（schwa）使菜单归属待核 |  |
| manage | ADD_0186 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| message | ADD_0189 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| mirage | ADD_0194 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| nation | ADD_0202 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| occasion | ADD_0206 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| persuade | ADD_0221 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| power | ADD_0233 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| pronounced | ADD_0237 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| quay | ADD_0244 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| royal | ADD_0259 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| sense | ADD_0264 | VCe 短读面：e-e 读短音 /e/（定版登记的例外型，如 give/live 型） |  |
| thorough | ADD_0293 | 词库 GA 标音与清单 RP 定版冲突（S-42 定版 ough 读 /ə/，词库标 /oʊ/） |  |
| voyage | ADD_0317 | VCe 短读面：a-e 读短音 /ɪ/（定版登记的例外型，如 give/live 型） |  |
| borough | ADD_0337 | 词库 GA 标音与清单 RP 定版冲突（S-42 定版 ough 读 /ə/，词库标 /oʊ/） |  |
| camouflage | ADD_0340 | VCe 短读面：a-e 读短音 /ɑː/（定版登记的例外型，如 give/live 型） |  |
| guano | ADD_0354 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| pneumonia | ADD_0376 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| politician | ADD_0377 | 拼写与音标音节对齐失败（音节数不合），需人工核 |  |
| pineapple | G3_0750 | 拼写含变脸组合但未按该组合成块切分（跨音节或被相邻字母块吞并），模式归属待核 |  |
| reread | ADD_0250 | 拼写含变脸组合但未按该组合成块切分（跨音节或被相邻字母块吞并），模式归属待核 |  |
| coexist | ADD_0454 | 拼写与音标音节对齐失败（音节数不合），需人工核 | 新增 |
| fence | ADD_0508 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| nonsense | ADD_0587 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| perspective | ADD_0599 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| promise | ADD_0607 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| restive | ADD_0625 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| since | ADD_0643 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |
| singe | ADD_0644 | VCe 短读面：分体词尾未读长音（定版登记的例外型，如 give/live 型） | 新增 |

## 6. 零命中单位清单（未命中任何模式）

共 2 个单位（旧版 16）：

| 单位 | 条目 id | 说明 |
|---|---|---|
| eye | G1_009 | 整词例外：eye /aɪ/ 无对应模式字素（旧版亦零命中） |
| of | V6_核心_54 | 功能词例外：o→/ʌ/、f→/v/ 均无模式（旧版亦零命中） |

## 7. 与既有数据的对齐（收官已完成）

- 挂接合并（步骤 1）已完成：10 张挂接表实存 9 张，按「given_id 校核 → 词形精确 → aliases → 大小写 → 屈折规范形」五级解析共 1,937 条记录，命中 1,927、未命中 10 条逐条登记（短语 4：apple pie/blue-green/easy-going/icy cold；专名 4：Chicago/Christian/Japanese/Kyle；伪词 1：strom；未入库材料词 1：False——均不硬挂）。
- 回填结果：gpc_patterns = 挂接表阶段 A（558 条）∪ 本词集阶段 B 全量推导（2,283 条）= 2,283/2,285 条有值（99.9%，仅 eye/of 两个零命中条目为空）；morphemes 159 条（7.0%，vocab 挂接表全量）；law_refs 1,236 条（54.1%，全部挂接表并集）。词库既有词条字段零改动（与合并前备份逐字段比对，差异仅限三挂接字段）。

## 8. 与旧版的差异说明（逐类登记）

旧版成员被新版移出的共 28 对（模式×词），全部为旧法伪命中或口径修正，逐类如下；新版新增 488 对（旧库范围内），主要为旧待裁定词在对齐成功后按双条件补入的合格字素（旧流水线整体对齐失败曾连带吞掉这些命中）与旧漏收（pencil/lesson 的 e→/e/、marry/carry 的 a→/æ/、quick 的 i→/ɪ/、guilt 的 i→/ɪ/ 等）。

| 类别 | 涉及 | 说明 |
|---|---|---|
| s 浊化双记 | exercise/cities 的 GP-s-s、decision 的 GP-s-s、size/seize/Mrs 的 GP-s-z | 旧版同一 s 按清浊双记或词级交叉登记；新版按出现级读音单归（s→/z/ 归 GP-s-z、s→/ʒ/ 不入 s 类、z 字母归 GP-z） |
| 静音/异读字母硬记 | soccer/scientist/scissors/special/delicious 的 GP-c-s、quiche 的 GP-ch-k、ginkgo 的 GP-g-g | 对应字母实际读 /k/、静音、/z/、/ʃ/、/k/（词库音标作 /ŋk/）等，非模式读音，不收 |
| 词素界 ss | glasses/businessman 的 GP-s-s | ss 在词素界（glass+es、business+man），非词尾 Floss 亦非单 s 出现级命中 |
| 跨音节 are | parent/parents/grandparent/grandparents 的 GP-are | 按音节对齐 are 跨音节（par-ent），不成 r 控单位 |
| 交叉引用连带 | soccer/electrician/concerto 的 GP-c-k-front | 该子集以 GP-c-s 命中为前提，伪 c-s 消除后连带移出（electrician 的 cian 读 /ʃ/、concerto 第二 c 读 /tʃ/） |
| 跨界 ere | interest/reread 的 GP-ere-ɪə | interest 的 ere 跨音节、reread 的 ere 跨 re- 前缀界，均非 ere 字素 |
| 读音归正 | take off 的 GP-a-eɪ-open → GP-a-e；tour 的 GP-ou-ʊ → ou+r 定点；yourself 的 GP-ou-ʊ | take 按短语段作 VCe、tour 按 /ʊr/ 的 ou 定点处理、yourself 词库音标作 /ɔː/ 与 ou-ʊ 的 /ʊ/ 不符 |
| 规则统一 | useless 的 GP-ss | Floss 统一按「完整元音后词段尾」规则（useless 的 -less 为 /əs/，与 careless 同口径移出；旧版仅收 useless 不收 careless，无一致口径） |

## 9. 完整性审计（无静默缺席）

候选定义：派生单位的词形含模式字素（元音模式按切分单位、辅音模式按子串、分体按 VCe 形）**且**音标含模式目标音素（按 §3 口径映射等值，含 LOT 双写与 r 类归一），却未归入该模式者，逐个列出原因。原因分类：待裁定 / 该字素归 X（同一字素的该次出现已归另一读音面）/ 目标音素归 X（该音素在此词中由另一字素承担）/ 位置·构成条件不满足 / r 控归属不同 / 对齐未落入（弱读·多音节对齐）。

同名组校验：全库（字素，音素）同名组共 5 组，short 标签组内互异且非空（校验通过）；成员交集仅两组有值，均为**交叉引用子集的设计性交叠**（GP-c-k-front ∩ GP-c-k = 16 单位、GP-g-g-front ∩ GP-g-g = 8 单位——front 组按定义登记「词内另有硬读面」的词，与基础模式交叠属设计），其余三组（o/əʊ、ei/iː、i/aɪ）交集为 0。

审计行合计 2153 行，涉及 83 个模式（其余模式候选全数归入，无缺席）。逐模式明细：

- **GP-c-k**（c→/k/，缺席 74）：anchor（该字素归 GP-ch-k）；attack（该字素归 GP-ck）；chorus（该字素归 GP-ch-k）；except（该字素归 GP-c-k-front）；gecko（目标音素归 GP-k）；hammock（目标音素归 GP-k）；haystack（该字素归 GP-ck）；panicky（目标音素归 GP-k）；pickle（目标音素归 GP-k）；unlock（该字素归 GP-ck）；hock（该字素归 GP-ck）；quiche（该字素归 GP-ch-ʃ）；ache（该字素归 GP-ch-k）；chemist（该字素归 GP-ch-k）；chemistry（该字素归 GP-ch-k）；chick（该字素归 GP-ch-tʃ）；echo（该字素归 GP-ch-k）；ketchup（该字素归 GP-ch-tʃ）；kick（该字素归 GP-ck）；mnemonic（对齐未落入（弱读/多音节对齐））；psychology（该字素归 GP-ch-k）；schoolbag（该字素归 GP-ch-k）；duck（该字素归 GP-ck）；black（该字素归 GP-ck）；chicken（该字素归 GP-ch-tʃ）；socks（该字素归 GP-ck）；school（该字素归 GP-ch-k）；pencil box（该字素归 GP-c-k-front）；lucky（目标音素归 GP-k）；quick（目标音素归 GP-k）；blackberry（目标音素归 GP-k）；duckling（目标音素归 GP-k）；chopstick（该字素归 GP-ch-tʃ）；truck（该字素归 GP-ck）；rock（该字素归 GP-ck）；blackboard（目标音素归 GP-k）；kitchen（该字素归 GP-ch-tʃ）；chopsticks（该字素归 GP-ch-tʃ）；jacket（目标音素归 GP-k）；schoolwork（该字素归 GP-ch-k）；headache（该字素归 GP-ch-k）；toothache（该字素归 GP-ch-k）；unlucky（目标音素归 GP-k）；quickly（待裁定）；excited（该字素归 GP-c-k-front）；exciting（该字素归 GP-c-k-front）；schoolyard（待裁定）；blackbird（目标音素归 GP-k）；woodpecker（目标音素归 GP-k）；toothpick（该字素归 GP-ck）；walking stick（该字素归 GP-ck）；exercise（该字素归 GP-c-k-front）；workplace（该字素归 GP-c-k-front）；rocky（目标音素归 GP-k）；luckily（目标音素归 GP-k）；excitement（该字素归 GP-c-k-front）；background（目标音素归 GP-k）；lipstick（该字素归 GP-ck）；ticket（目标音素归 GP-k）；chalk（该字素归 GP-ch-tʃ）；pencil-box（该字素归 GP-c-k-front）；check（该字素归 GP-ch-tʃ）；lock（该字素归 GP-ck）；pick（该字素归 GP-ck）；sock（该字素归 GP-ck）；pocket（目标音素归 GP-k）；Christmas（该字素归 GP-ch-k）；back（该字素归 GP-ck）；stomach（待裁定）；sick（该字素归 GP-ck）；stomachache（该字素归 GP-ch-k）；neck（该字素归 GP-ck）；thick（该字素归 GP-ck）；snack（该字素归 GP-ck）
- **GP-c-k-front**（c→/k/，缺席 318）：acorn（该字素归 GP-c-k）；anchor（该字素归 GP-ch-k）；attack（该字素归 GP-ck）；become（待裁定）；calm（该字素归 GP-c-k）；castles（该字素归 GP-c-k）；chorus（该字素归 GP-ch-k）；clerk（该字素归 GP-c-k）；cloth（该字素归 GP-c-k）；clothe（该字素归 GP-c-k）；clover（该字素归 GP-c-k）；clue（该字素归 GP-c-k）；coin（该字素归 GP-c-k）；college（待裁定）；compete（该字素归 GP-c-k）；complete（该字素归 GP-c-k）；confuse（该字素归 GP-c-k）；confusion（该字素归 GP-c-k）；conquer（该字素归 GP-c-k）；contest（该字素归 GP-c-k）；cot（该字素归 GP-c-k）；creature（该字素归 GP-c-k）；crystal（该字素归 GP-c-k）；cube（该字素归 GP-c-k）；cues（该字素归 GP-c-k）；cuff（该字素归 GP-c-k）；cushion（该字素归 GP-c-k）；electrician（待裁定）；frolic（该字素归 GP-c-k）；garlic（该字素归 GP-c-k）；gecko（目标音素归 GP-k）；hammock（目标音素归 GP-k）；haystack（该字素归 GP-ck）；hiccup（该字素归 GP-c-k）；income（待裁定）；incorrect（该字素归 GP-c-k）；mimic（该字素归 GP-c-k）；occasion（待裁定）；panic（该字素归 GP-c-k）；panicky（目标音素归 GP-k）；pickle（目标音素归 GP-k）；soccer（该字素归 GP-c-k）；unlock（该字素归 GP-ck）；caffeine（该字素归 GP-c-k）；camouflage（待裁定）；clef（该字素归 GP-c-k）；codeine（该字素归 GP-c-k）；combustion（该字素归 GP-c-k）；concerto（该字素归 GP-c-k）；heretic（该字素归 GP-c-k）；hiccough（该字素归 GP-c-k）；hock（该字素归 GP-ck）；lunatic（该字素归 GP-c-k）；quiche（该字素归 GP-ch-ʃ）；ache（该字素归 GP-ch-k）；affect（该字素归 GP-c-k）；aspect（该字素归 GP-c-k）；attract（该字素归 GP-c-k）；calf（该字素归 GP-c-k）；captain（该字素归 GP-c-k）；carve（该字素归 GP-c-k）；cause（该字素归 GP-c-k）；character（该字素归 GP-c-k）；chemist（该字素归 GP-ch-k）；chemistry（该字素归 GP-ch-k）；chick（该字素归 GP-ch-tʃ）；clickable（该字素归 GP-c-k）；coexist（待裁定）；collaborate（该字素归 GP-c-k）；combine（该字素归 GP-c-k）；commercial（该字素归 GP-c-k）；compress（该字素归 GP-c-k）；compulsion（该字素归 GP-c-k）；conspicuous（该字素归 GP-c-k）；contemptible（该字素归 GP-c-k）；cooperate（该字素归 GP-c-k）；correct（该字素归 GP-c-k）；correspond（该字素归 GP-c-k）；courage（该字素归 GP-c-k）；courageous（该字素归 GP-c-k）；course（该字素归 GP-c-k）；crayfish（该字素归 GP-c-k）；credible（该字素归 GP-c-k）；crowd（该字素归 GP-c-k）；crown（该字素归 GP-c-k）；crucial（该字素归 GP-c-k）；culture（该字素归 GP-c-k）；disconnect（该字素归 GP-c-k）；echo（该字素归 GP-ch-k）；economic（该字素归 GP-c-k）；economy（该字素归 GP-c-k）；effect（该字素归 GP-c-k）；include（该字素归 GP-c-k）；incredible（该字素归 GP-c-k）；inspect（该字素归 GP-c-k）；ketchup（该字素归 GP-ch-tʃ）；kick（该字素归 GP-ck）；logic（该字素归 GP-c-k）；mnemonic（位置/构成条件不满足）；occur（该字素归 GP-c-k）；perspective（待裁定）；photographic（该字素归 GP-c-k）；picturesque（该字素归 GP-c-k）；prospect（该字素归 GP-c-k）；psychology（该字素归 GP-ch-k）；reflect（该字素归 GP-c-k）；retrospect（该字素归 GP-c-k）；sceptic（该字素归 GP-c-k）；scope（该字素归 GP-c-k）；scrub（该字素归 GP-c-k）；skeptic（该字素归 GP-c-k）；spectacle（该字素归 GP-c-k）；spectator（该字素归 GP-c-k）；spectrum（该字素归 GP-c-k）；speculate（该字素归 GP-c-k）；succumb（该字素归 GP-c-k）；suspect（该字素归 GP-c-k）；telescope（该字素归 GP-c-k）；tonic（该字素归 GP-c-k）；unconscious（该字素归 GP-c-k）；unsubscribe（该字素归 GP-c-k）；schoolbag（该字素归 GP-ch-k）；cat（该字素归 GP-c-k）；duck（该字素归 GP-ck）；black（该字素归 GP-ck）；car（该字素归 GP-c-k）；cake（该字素归 GP-c-k）；chicken（该字素归 GP-ch-tʃ）；socks（该字素归 GP-ck）；can（该字素归 GP-c-k）；colour（该字素归 GP-c-k）；uncle（该字素归 GP-c-k）；music（该字素归 GP-c-k）；school（该字素归 GP-ch-k）；cloudy（该字素归 GP-c-k）；cup（该字素归 GP-c-k）；cold（该字素归 GP-c-k）；cool（该字素归 GP-c-k）；clock（该字素归 GP-c-k）；count（该字素归 GP-c-k）；close（该字素归 GP-c-k）；carry（该字素归 GP-c-k）；card（该字素归 GP-c-k）；cloud（该字素归 GP-c-k）；cookie（该字素归 GP-c-k）；cupcake（该字素归 GP-c-k）；popcorn（该字素归 GP-c-k）；crayon（该字素归 GP-c-k）；cap（该字素归 GP-c-k）；welcome（该字素归 GP-c-k）；candle（该字素归 GP-c-k）；cream（该字素归 GP-c-k）；could（该字素归 GP-c-k）；act（该字素归 GP-c-k）；closed（该字素归 GP-c-k）；bookcase（该字素归 GP-c-k）；classmate（该字素归 GP-c-k）；raincoat（该字素归 GP-c-k）；care（该字素归 GP-c-k）；careful（该字素归 GP-c-k）；colourful（该字素归 GP-c-k）；cook（该字素归 GP-c-k）；lucky（目标音素归 GP-k）；quick（目标音素归 GP-k）；cross（该字素归 GP-c-k）；camera（该字素归 GP-c-k）；pancake（该字素归 GP-c-k）；blackberry（目标音素归 GP-k）；coconut（该字素归 GP-c-k）；duckling（目标音素归 GP-k）；magic（该字素归 GP-c-k）；climb（该字素归 GP-c-k）；clear（该字素归 GP-c-k）；chopstick（该字素归 GP-ch-tʃ）；coffee（该字素归 GP-c-k）；truck（该字素归 GP-ck）；rock（该字素归 GP-ck）；blackboard（目标音素归 GP-k）；classroom（该字素归 GP-c-k）；computer（该字素归 GP-c-k）；picture（该字素归 GP-c-k）；candy（该字素归 GP-c-k）；kitchen（该字素归 GP-ch-tʃ）；chopsticks（该字素归 GP-ch-tʃ）；doctor（该字素归 GP-c-k）；carrot（该字素归 GP-c-k）；cow（该字素归 GP-c-k）；coat（该字素归 GP-c-k）；jacket（目标音素归 GP-k）；scarf（该字素归 GP-c-k）；cute（该字素归 GP-c-k）；actor（该字素归 GP-c-k）；actress（该字素归 GP-c-k）；active（待裁定）；activity（该字素归 GP-c-k）；action（待裁定）；fact（该字素归 GP-c-k）；difficult（该字素归 GP-c-k）；country（该字素归 GP-c-k）；countryside（该字素归 GP-c-k）；closet（该字素归 GP-c-k）；schoolwork（该字素归 GP-ch-k）；headache（该字素归 GP-ch-k）；toothache（该字素归 GP-ch-k）；haircut（该字素归 GP-c-k）；careless（该字素归 GP-c-k）；unlucky（目标音素归 GP-k）；cover（该字素归 GP-c-k）；cleaner（该字素归 GP-c-k）；collect（该字素归 GP-c-k）；quickly（待裁定）；biscuit（该字素归 GP-c-k）；across（该字素归 GP-c-k）；perfect（该字素归 GP-c-k）；schoolyard（待裁定）；mooncake（该字素归 GP-c-k）；tablecloth（该字素归 GP-c-k）；crosswalk（该字素归 GP-c-k）；blackbird（目标音素归 GP-k）；woodpecker（目标音素归 GP-k）；carefully（该字素归 GP-c-k）；clearly（该字素归 GP-c-k）；protect（该字素归 GP-c-k）；comfortable（待裁定）；candlelight（该字素归 GP-c-k）；overcoat（该字素归 GP-c-k）；handcraft（该字素归 GP-c-k）；campfire（该字素归 GP-c-k）；toothpick（该字素归 GP-ck）；walking stick（该字素归 GP-ck）；club（该字素归 GP-c-k）；clever（该字素归 GP-c-k）；strict（该字素归 GP-c-k）；cartoon（该字素归 GP-c-k）；picnic（该字素归 GP-c-k）；vacation（待裁定）；October（该字素归 GP-c-k）；second（该字素归 GP-c-k）；climbing（该字素归 GP-c-k）；clean（该字素归 GP-c-k）；call（该字素归 GP-c-k）；dictate（该字素归 GP-c-k）；predict（该字素归 GP-c-k）；respect（该字素归 GP-c-k）；expect（该字素归 GP-c-k）；discover（该字素归 GP-c-k）；direction（该字素归 GP-c-k）；collection（该字素归 GP-c-k）；exact（该字素归 GP-c-k）；exactly（该字素归 GP-c-k）；instruction（该字素归 GP-c-k）；campus（该字素归 GP-c-k）；climber（该字素归 GP-c-k）；rocky（目标音素归 GP-k）；luckily（目标音素归 GP-k）；competition（该字素归 GP-c-k）；education（待裁定）；protection（该字素归 GP-c-k）；aircraft（该字素归 GP-c-k）；background（目标音素归 GP-k）；candlestick（该字素归 GP-c-k）；lipstick（该字素归 GP-ck）；crossing（该字素归 GP-c-k）；traffic（该字素归 GP-c-k）；dictionary（待裁定）；postcard（该字素归 GP-c-k）；coach（该字素归 GP-c-k）；factory（待裁定）；cleaned（待裁定）；camp（该字素归 GP-c-k）；dictionaries（待裁定）；caught（该字素归 GP-c-k）；came（该字素归 GP-c-k）；ticket（目标音素归 GP-k）；camel（该字素归 GP-c-k）；insect（该字素归 GP-c-k）；cage（该字素归 GP-c-k）；company（该字素归 GP-c-k）；corner（该字素归 GP-c-k）；class（该字素归 GP-c-k）；subject（该字素归 GP-c-k）；chalk（该字素归 GP-ch-tʃ）；check（该字素归 GP-ch-tʃ）；practise（待裁定）；discuss（该字素归 GP-c-k）；cousin（待裁定）；lock（该字素归 GP-ck）；come（待裁定）；cost（该字素归 GP-c-k）；catch（该字素归 GP-c-k）；cut（该字素归 GP-c-k）；cry（该字素归 GP-c-k）；pick（该字素归 GP-ck）；clothes（该字素归 GP-c-k）；sock（该字素归 GP-ck）；pocket（目标音素归 GP-k）；because（该字素归 GP-c-k）；secretary（该字素归 GP-c-k）；plastic（该字素归 GP-c-k）；o'clock（该字素归 GP-c-k）；Christmas（该字素归 GP-ch-k）；calendar（该字素归 GP-c-k）；back（该字素归 GP-ck）；stomach（待裁定）；sick（该字素归 GP-ck）；stomachache（该字素归 GP-ch-k）；cough（该字素归 GP-c-k）；comb（该字素归 GP-c-k）；neck（该字素归 GP-ck）；camping（该字素归 GP-c-k）；color（该字素归 GP-c-k）；thick（该字素归 GP-ck）；chocolate（待裁定）；snack（该字素归 GP-ck）；cabbage（待裁定）；corn（该字素归 GP-c-k）；cucumber（该字素归 GP-c-k）；cola（该字素归 GP-c-k）
- **GP-c-s**（c→/s/，缺席 97）：castles（该字素归 GP-c-k）；chorus（该字素归 GP-ch-k）；contest（该字素归 GP-c-k）；crystal（该字素归 GP-c-k）；haystack（该字素归 GP-ck）；soccer（该字素归 GP-c-k）；such（该字素归 GP-ch-tʃ）；combustion（该字素归 GP-c-k）；schnitzel（该字素归 GP-ch-ʃ）；ascend（目标音素归 GP-s-s）；aspect（该字素归 GP-c-k）；chase（该字素归 GP-ch-tʃ）；chemist（该字素归 GP-ch-k）；chemistry（该字素归 GP-ch-k）；coexist（待裁定）；compress（该字素归 GP-c-k）；conspicuous（该字素归 GP-c-k）；correspond（该字素归 GP-c-k）；courageous（该字素归 GP-c-k）；course（该字素归 GP-c-k）；disconnect（该字素归 GP-c-k）；especial（目标音素归 GP-s-s）；inspect（该字素归 GP-c-k）；perspective（待裁定）；picturesque（该字素归 GP-c-k）；prospect（该字素归 GP-c-k）；psychology（该字素归 GP-ch-k）；retrospect（该字素归 GP-c-k）；sceptic（该字素归 GP-c-k）；scope（该字素归 GP-c-k）；scrub（该字素归 GP-c-k）；skeptic（该字素归 GP-c-k）；species（目标音素归 GP-s-s）；specious（目标音素归 GP-s-s）；spectacle（该字素归 GP-c-k）；spectator（该字素归 GP-c-k）；spectrum（该字素归 GP-c-k）；speculate（该字素归 GP-c-k）；succumb（该字素归 GP-c-k）；sufficient（目标音素归 GP-s-s）；susceptible（目标音素归 GP-s-s）；suspect（该字素归 GP-c-k）；telescope（该字素归 GP-c-k）；unconscious（该字素归 GP-c-k）；unsubscribe（该字素归 GP-c-k）；schoolbag（该字素归 GP-ch-k）；socks（该字素归 GP-ck）；school（该字素归 GP-ch-k）；close（该字素归 GP-c-k）；bookcase（该字素归 GP-c-k）；classmate（该字素归 GP-c-k）；cross（该字素归 GP-c-k）；chopstick（该字素归 GP-ch-tʃ）；classroom（该字素归 GP-c-k）；chopsticks（该字素归 GP-ch-tʃ）；scarf（该字素归 GP-c-k）；actress（该字素归 GP-c-k）；special（待裁定）；countryside（该字素归 GP-c-k）；schoolwork（该字素归 GP-ch-k）；careless（该字素归 GP-c-k）；biscuit（该字素归 GP-c-k）；across（该字素归 GP-c-k）；schoolyard（待裁定）；crosswalk（该字素归 GP-c-k）；walking stick（该字素归 GP-ck）；strict（该字素归 GP-c-k）；delicious（待裁定）；sandwich（该字素归 GP-ch-tʃ）；second（该字素归 GP-c-k）；respect（该字素归 GP-c-k）；expect（该字素归 GP-c-k）；discover（该字素归 GP-c-k）；speech（该字素归 GP-ch-tʃ）；instruction（该字素归 GP-c-k）；campus（该字素归 GP-c-k）；candlestick（该字素归 GP-c-k）；lipstick（该字素归 GP-ck）；crossing（该字素归 GP-c-k）；postcard（该字素归 GP-c-k）；scientist（目标音素归 GP-s-s）；insect（该字素归 GP-c-k）；class（该字素归 GP-c-k）；subject（该字素归 GP-c-k）；scissors（目标音素归 GP-s-s）；practise（待裁定）；discuss（该字素归 GP-c-k）；cost（该字素归 GP-c-k）；sock（该字素归 GP-ck）；secretary（该字素归 GP-c-k）；plastic（该字素归 GP-c-k）；Christmas（该字素归 GP-ch-k）；stomach（待裁定）；sick（该字素归 GP-ck）；stomachache（该字素归 GP-ch-k）；chess（该字素归 GP-ch-tʃ）；snack（该字素归 GP-ck）
- **GP-ch-k**（ch→/k/，缺席 12）：quiche（该字素归 GP-ch-ʃ）；chick（该字素归 GP-ch-tʃ）；ketchup（该字素归 GP-ch-tʃ）；chicken（该字素归 GP-ch-tʃ）；chopstick（该字素归 GP-ch-tʃ）；kitchen（该字素归 GP-ch-tʃ）；chopsticks（该字素归 GP-ch-tʃ）；coach（该字素归 GP-ch-tʃ）；chalk（该字素归 GP-ch-tʃ）；check（该字素归 GP-ch-tʃ）；catch（该字素归 GP-ch-tʃ）；chocolate（待裁定）
- **GP-g-dʒ**（g→/dʒ/，缺席 1）：graduate（该字素归 GP-g-g）
- **GP-g-g**（g→/g/，缺席 21）：anger（该字素归 GP-g-g-front）；gear（该字素归 GP-g-g-front）；gecko（该字素归 GP-g-g-front）；geyser（该字素归 GP-g-g-front）；girdle（该字素归 GP-g-g-front）；ginkgo（该字素归 GP-g-g-front）；gill（该字素归 GP-g-g-front）；tiger（该字素归 GP-g-g-front）；hamburger（该字素归 GP-g-g-front）；gift（该字素归 GP-g-g-front）；forget（该字素归 GP-g-g-front）；forgetful（该字素归 GP-g-g-front）；stronger（该字素归 GP-g-g-front）；younger（该字素归 GP-g-g-front）；geese（该字素归 GP-g-g-front）；girl（该字素归 GP-g-g-front）；get（该字素归 GP-g-g-front）；begin（该字素归 GP-g-g-front）；give（待裁定）；together（该字素归 GP-g-g-front）；finger（该字素归 GP-g-g-front）
- **GP-g-g-front**（g→/g/，缺席 132）：garlic（该字素归 GP-g-g）；gas（该字素归 GP-g-g）；ghost（该字素归 GP-g-g）；gone（待裁定）；greenhouse（该字素归 GP-g-g）；grew（该字素归 GP-g-g）；grind（该字素归 GP-g-g）；guard（待裁定）；guava（待裁定）；guess（该字素归 GP-g-g）；guilt（该字素归 GP-g-g）；gulf（该字素归 GP-g-g）；guru（该字素归 GP-g-g）；league（待裁定）；log（该字素归 GP-g-g）；cigarette（该字素归 GP-g-g）；gal（该字素归 GP-g-g）；gasoline（该字素归 GP-g-g）；guano（待裁定）；maglev（该字素归 GP-g-g）；ptarmigan（该字素归 GP-g-g）；against（该字素归 GP-g-g）；aggravate（该字素归 GP-g-g）；argument（该字素归 GP-g-g）；bridegroom（该字素归 GP-g-g）；gamify（该字素归 GP-g-g）；golf（该字素归 GP-g-g）；government（该字素归 GP-g-g）；graduate（该字素归 GP-g-g）；guarantee（该字素归 GP-g-g）；guardian（该字素归 GP-g-g）；illegal（该字素归 GP-g-g）；interrogate（该字素归 GP-g-g）；irregular（该字素归 GP-g-g）；irrigate（该字素归 GP-g-g）；paragraph（该字素归 GP-g-g）；photographic（该字素归 GP-g-g）；photography（该字素归 GP-g-g）；piglet（该字素归 GP-g-g）；regal（该字素归 GP-g-g）；signature（该字素归 GP-g-g）；smog（该字素归 GP-g-g）；sparrowgrass（该字素归 GP-g-g）；surrogate（该字素归 GP-g-g）；bag（该字素归 GP-g-g）；schoolbag（该字素归 GP-g-g）；dog（该字素归 GP-g-g）；pig（该字素归 GP-g-g）；green（该字素归 GP-g-g）；egg（该字素归 GP-g-g）；grandfather（该字素归 GP-g-g）；grandmother（该字素归 GP-g-g）；big（该字素归 GP-g-g）；grass（该字素归 GP-g-g）；game（该字素归 GP-g-g）；hungry（该字素归 GP-g-g）；hotdog（该字素归 GP-g-g）；ladybug（该字素归 GP-g-g）；frog（该字素归 GP-g-g）；goodbye（该字素归 GP-g-g）；leg（该字素归 GP-g-g）；grape（该字素归 GP-g-g）；good（该字素归 GP-g-g）；again（该字素归 GP-g-g）；ago（该字素归 GP-g-g）；goes（该字素归 GP-g-g）；going（该字素归 GP-g-g）；got（该字素归 GP-g-g）；handbag（该字素归 GP-g-g）；sunglasses（该字素归 GP-g-g）；grow（该字素归 GP-g-g）；goose（该字素归 GP-g-g）；goldfish（该字素归 GP-g-g）；dragonfly（该字素归 GP-g-g）；grandparents（该字素归 GP-g-g）；mango（该字素归 GP-g-g）；kangaroo（该字素归 GP-g-g）；goat（该字素归 GP-g-g）；flag（该字素归 GP-g-g）；glasses（该字素归 GP-g-g）；garden（该字素归 GP-g-g）；playground（该字素归 GP-g-g）；glove（待裁定）；great（该字素归 GP-g-g）；guest（该字素归 GP-g-g）；underground（该字素归 GP-g-g）；August（该字素归 GP-g-g）；grapefruit（待裁定）；grasshopper（该字素归 GP-g-g）；grandson（该字素归 GP-g-g）；granddaughter（该字素归 GP-g-g）；grown-up（该字素归 GP-g-g）；gardener（该字素归 GP-g-g）；fog（该字素归 GP-g-g）；grassy（该字素归 GP-g-g）；golden（该字素归 GP-g-g）；agree（该字素归 GP-g-g）；goalkeeper（该字素归 GP-g-g）；eyeglass（待裁定）；photograph（该字素归 GP-g-g）；signal（该字素归 GP-g-g）；angrily（该字素归 GP-g-g）；agreement（该字素归 GP-g-g）；disagree（该字素归 GP-g-g）；growth（该字素归 GP-g-g）；fairground（该字素归 GP-g-g）；background（该字素归 GP-g-g）；angry（该字素归 GP-g-g）；gave（该字素归 GP-g-g）；penguin（该字素归 GP-g-g）；eagle（该字素归 GP-g-g）；gate（该字素归 GP-g-g）；degree（该字素归 GP-g-g）；magazine（该字素归 GP-g-g）；English（该字素归 GP-g-g）；grade（该字素归 GP-g-g）；group（该字素归 GP-g-g）；glue（该字素归 GP-g-g）；grandpa（该字素归 GP-g-g）；grandma（该字素归 GP-g-g）；grandparent（该字素归 GP-g-g）；glad（该字素归 GP-g-g）；go（该字素归 GP-g-g）；guide（该字素归 GP-g-g）；gold（该字素归 GP-g-g）；Dragon Boat Festival（待裁定）；guitar（待裁定）；grey（该字素归 GP-g-g）；gray（该字素归 GP-g-g）；sugar（该字素归 GP-g-g）；yogurt（该字素归 GP-g-g）；glass（该字素归 GP-g-g）
- **GP-gn**（gn→/n/，缺席 2）：signature（该字素归 GP-g-g）；signal（该字素归 GP-g-g）
- **GP-gu**（gu→/g/，缺席 9）：guava（待裁定）；gulf（该字素归 GP-g-g）；guru（该字素归 GP-g-g）；guano（待裁定）；argument（该字素归 GP-g-g）；irregular（该字素归 GP-g-g）；August（该字素归 GP-g-g）；penguin（该字素归 GP-g-g）；yogurt（该字素归 GP-g-g）
- **GP-h**（h→/h/，缺席 2）：humour（对齐未落入（弱读/多音节对齐））；she（该字素归 GP-sh）
- **GP-kn**（kn→/n/，缺席 2）：darkness（该字素归 GP-k）；weakness（该字素归 GP-k）
- **GP-m**（m→/m/，缺席 2）：humour（对齐未落入（弱读/多音节对齐））；mnemonic（对齐未落入（弱读/多音节对齐））
- **GP-mb**（mb→/m/，缺席 15）：combustion（该字素归 GP-b）；timber（该字素归 GP-b）；combine（该字素归 GP-b）；imbalance（该字素归 GP-b）；symbol（该字素归 GP-b）；hamburger（该字素归 GP-b）；remember（该字素归 GP-b）；umbrella（该字素归 GP-b）；November（该字素归 GP-b）；December（该字素归 GP-b）；September（该字素归 GP-b）；ambulance（该字素归 GP-b）；bamboo（该字素归 GP-b）；number（该字素归 GP-b）；cucumber（该字素归 GP-b）
- **GP-mn**（mn→/m/，缺席 2）：omnibus（该字素归 GP-m）；mnemonic（对齐未落入（弱读/多音节对齐））
- **GP-n**（n→/n/，缺席 2）：mnemonic（对齐未落入（弱读/多音节对齐））；university（对齐未落入（弱读/多音节对齐））
- **GP-ng**（ng→/ŋ/，缺席 11）：anger（该字素归 GP-g-g-front）；hungry（该字素归 GP-g-g）；mango（该字素归 GP-g-g）；kangaroo（该字素归 GP-g-g）；angrily（该字素归 GP-g-g）；angry（该字素归 GP-g-g）；stronger（该字素归 GP-g-g-front）；younger（该字素归 GP-g-g-front）；penguin（该字素归 GP-g-g）；English（该字素归 GP-g-g）；finger（该字素归 GP-g-g-front）
- **GP-ps**（ps→/s/，缺席 4）：chopstick（该字素归 GP-p）；chopsticks（该字素归 GP-p）；upstairs（该字素归 GP-p）；lipstick（该字素归 GP-p）
- **GP-pt**（pt→/t/，缺席 13）：except（该字素归 GP-p）；receipt（该字素归 GP-p）；accept（该字素归 GP-p）；captain（该字素归 GP-p）；contemptible（该字素归 GP-p）；empty（该字素归 GP-p）；sceptic（该字素归 GP-p）；skeptic（该字素归 GP-p）；susceptible（该字素归 GP-p）；September（该字素归 GP-p）；slept（该字素归 GP-p）；kept（该字素归 GP-p）；swept（该字素归 GP-p）
- **GP-qu-k**（qu→/k/，缺席 14）：equal（待裁定）；quiz（该字素归 GP-qu-kw）；inquire（该字素归 GP-qu-kw）；quilt（该字素归 GP-qu-kw）；queen（该字素归 GP-qu-kw）；question（该字素归 GP-qu-kw）；quick（该字素归 GP-qu-kw）；quiet（待裁定）；quietly（待裁定）；quickly（待裁定）；earthquake（待裁定）；square（待裁定）；quite（该字素归 GP-qu-kw）；quarter（待裁定）
- **GP-r**（r→/r/，缺席 1）：humour（r 控归属不同）
- **GP-s-s**（s→/s/，缺席 58）：decision（该字素归 GP-sion-ʒ）；floss（该字素归 GP-ss）；guess（该字素归 GP-ss）；kiss（该字素归 GP-ss）；mess（该字素归 GP-ss）；message（待裁定）；wilderness（对齐未落入（弱读/多音节对齐））；schnitzel（对齐未落入（弱读/多音节对齐））；access（该字素归 GP-ss）；accessible（目标音素归 GP-c-s）；admissible（对齐未落入（弱读/多音节对齐））；assign（对齐未落入（弱读/多音节对齐））；compress（该字素归 GP-ss）；explosion（该字素归 GP-sion-ʒ）；extension（该字素归 GP-sion-ʃ）；permissible（对齐未落入（弱读/多音节对齐））；residence（该字素归 GP-s-z）；university（对齐未落入（弱读/多音节对齐））；grass（该字素归 GP-ss）；dress（该字素归 GP-ss）；Miss（该字素归 GP-ss）；ours（该字素归 GP-s-z）；these（该字素归 GP-s-z）；those（该字素归 GP-s-z）；classmate（对齐未落入（弱读/多音节对齐））；cross（该字素归 GP-ss）；pass（该字素归 GP-ss）；classroom（对齐未落入（弱读/多音节对齐））；glasses（该字素归 GP-s-z）；actress（对齐未落入（弱读/多音节对齐））；press（该字素归 GP-ss）；careless（对齐未落入（弱读/多音节对齐））；across（该字素归 GP-ss）；password（对齐未落入（弱读/多音节对齐））；crosswalk（对齐未落入（弱读/多音节对齐））；grasshopper（对齐未落入（弱读/多音节对齐））；messy（对齐未落入（弱读/多音节对齐））；grassy（对齐未落入（弱读/多音节对齐））；eyeglass（待裁定）；exercise（该字素归 GP-s-z）；passport（对齐未落入（弱读/多音节对齐））；express（该字素归 GP-ss）；impossible（对齐未落入（弱读/多音节对齐））；possible（对齐未落入（弱读/多音节对齐））；kindness（对齐未落入（弱读/多音节对齐））；illness（对齐未落入（弱读/多音节对齐））；passenger（对齐未落入（弱读/多音节对齐））；happiness（对齐未落入（弱读/多音节对齐））；darkness（对齐未落入（弱读/多音节对齐））；weakness（对齐未落入（弱读/多音节对齐））；crossing（对齐未落入（弱读/多音节对齐））；cities（该字素归 GP-s-z）；class（该字素归 GP-ss）；lesson（对齐未落入（弱读/多音节对齐））；businessman（待裁定）；princess（该字素归 GP-ss）；chess（该字素归 GP-ss）；glass（该字素归 GP-ss）
- **GP-s-z**（s→/z/，缺席 9）：seize（该字素归 GP-s-s）；coexist（待裁定）；exist（该字素归 GP-s-s）；sneeze（该字素归 GP-s-s）；she（该字素归 GP-sh）；Mrs（该字素归 GP-s-s）；us（该字素归 GP-s-s）；this（该字素归 GP-s-s）；size（该字素归 GP-s-s）
- **GP-t**（t→/t/，缺席 4）：university（对齐未落入（弱读/多音节对齐））；this（该字素归 GP-th-ð）；these（该字素归 GP-th-ð）；those（该字素归 GP-th-ð）
- **GP-v**（v→/v/，缺席 1）：university（对齐未落入（弱读/多音节对齐））
- **GP-x-z**（x→/z/，缺席 7）：coexist（待裁定）；exist（该字素归 GP-x-gz）；exercise（该字素归 GP-x-ks）；exact（该字素归 GP-x-gz）；exactly（该字素归 GP-x-gz）；exam（该字素归 GP-x-gz）；example（该字素归 GP-x-gz）
- **GP-a-æ**（a→/æ/，缺席 1）：a（该字素归 GP-a-ə）
- **GP-a-ə**（a→/ə/，缺席 198）：anchor（该字素归 GP-a-æ）；ancient（待裁定）；anger（该字素归 GP-a-æ）；castles（该字素归 GP-a-æ）；crystal（对齐未落入（弱读/多音节对齐））；electrician（待裁定）；equal（待裁定）；garage（待裁定）；giant（待裁定）；guava（待裁定）；hammock（该字素归 GP-a-æ）；instant（对齐未落入（弱读/多音节对齐））；karate（待裁定）；karma（对齐未落入（弱读/多音节对齐））；loyal（待裁定）；machine（待裁定）；nation（待裁定）；occasion（待裁定）；panel（该字素归 GP-a-æ）；patient（该字素归 GP-a-eɪ-open）；pattern（该字素归 GP-a-æ）；pleasant（对齐未落入（弱读/多音节对齐））；royal（待裁定）；separate（对齐未落入（弱读/多音节对齐））；camouflage（待裁定）；gasoline（该字素归 GP-a-æ）；haphazard（该字素归 GP-a-æ）；influenza（对齐未落入（弱读/多音节对齐））；lunatic（对齐未落入（弱读/多音节对齐））；ploughman（对齐未落入（弱读/多音节对齐））；pneumonia（待裁定）；politician（待裁定）；ptarmigan（对齐未落入（弱读/多音节对齐））；weta（对齐未落入（弱读/多音节对齐））；aggravate（该字素归 GP-a-æ）；alphabet（该字素归 GP-a-æ）；amphibious（该字素归 GP-a-æ）；animate（该字素归 GP-a-æ）；arrange（对齐未落入（弱读/多音节对齐））；bachelor（该字素归 GP-a-æ）；brilliant（对齐未落入（弱读/多音节对齐））；changeable（该字素归 GP-a-eɪ-open）；character（该字素归 GP-a-æ）；collaborate（该字素归 GP-a-æ）；commercial（对齐未落入（弱读/多音节对齐））；courageous（该字素归 GP-a-eɪ-open）；crucial（对齐未落入（弱读/多音节对齐））；especial（对齐未落入（弱读/多音节对齐））；flammable（该字素归 GP-a-æ）；graduate（该字素归 GP-a-æ）；guarantee（该字素归 GP-a-æ）；guardian（对齐未落入（弱读/多音节对齐））；happen（该字素归 GP-a-æ）；illegal（对齐未落入（弱读/多音节对齐））；imbalance（该字素归 GP-a-æ）；immature（对齐未落入（弱读/多音节对齐））；inflammable（该字素归 GP-a-æ）；invaluable（该字素归 GP-a-æ）；ladder（该字素归 GP-a-æ）；laser（该字素归 GP-a-eɪ-open）；manageable（该字素归 GP-a-æ）；metaphor（对齐未落入（弱读/多音节对齐））；parachute（该字素归 GP-a-æ）；paragraph（该字素归 GP-a-æ）；photographic（该字素归 GP-a-æ）；photography（对齐未落入（弱读/多音节对齐））；regal（对齐未落入（弱读/多音节对齐））；signature（对齐未落入（弱读/多音节对齐））；spectator（该字素归 GP-a-eɪ-open）；warranty（该字素归 GP-a-w-ɔː）；banana（该字素归 GP-a-æ）；water（该字素归 GP-a-w-ɔː）；can（该字素归 GP-a-æ）；father（该字素归 GP-a-ɑː）；grandfather（该字素归 GP-a-æ）；grandmother（该字素归 GP-a-æ）；handsome（该字素归 GP-a-æ）；afternoon（该字素归 GP-a-æ）；favourite（待裁定）；basketball（该字素归 GP-a-æ）；hamburger（该字素归 GP-a-æ）；zebra（待裁定）；eraser（该字素归 GP-a-eɪ-open）；elephant（对齐未落入（弱读/多音节对齐））；panda（该字素归 GP-a-æ）；family（该字素归 GP-a-æ）；woman（待裁定）；watermelon（该字素归 GP-a-w-ɔː）；candle（该字素归 GP-a-æ）；as（该字素归 GP-a-æ）；around（对齐未落入（弱读/多音节对齐））；unhappy（该字素归 GP-a-æ）；station（待裁定）；travel（该字素归 GP-a-æ）；camera（该字素归 GP-a-æ）；fireman（待裁定）；policeman（待裁定）；dragonfly（该字素归 GP-a-æ）；grandparents（该字素归 GP-a-æ）；kangaroo（该字素归 GP-a-æ）；koala（该字素归 GP-a-ɑː）；sofa（对齐未落入（弱读/多音节对齐））；vegetables（待裁定）；breakfast（对齐未落入（弱读/多音节对齐））；carrot（该字素归 GP-a-æ）；potato（该字素归 GP-a-eɪ-open）；tomato（该字素归 GP-a-eɪ-open）；umbrella（对齐未落入（弱读/多音节对齐））；China（对齐未落入（弱读/多音节对齐））；actor（该字素归 GP-a-æ）；actress（该字素归 GP-a-æ）；activity（该字素归 GP-a-æ）；waterfall（该字素归 GP-a-w-ɔː）；postman（对齐未落入（弱读/多音节对齐））；famous（该字素归 GP-a-eɪ-open）；danger（该字素归 GP-a-eɪ-open）；dangerous（该字素归 GP-a-eɪ-open）；usual（待裁定）；dancer（该字素归 GP-a-æ）；happily（该字素归 GP-a-æ）；April（该字素归 GP-a-eɪ-open）；nature（该字素归 GP-a-eɪ-open）；national（待裁定）；tablecloth（该字素归 GP-a-eɪ-open）；grasshopper（该字素归 GP-a-æ）；granddaughter（该字素归 GP-a-æ）；baker（该字素归 GP-a-eɪ-open）；bakery（该字素归 GP-a-eɪ-open）；thankful（该字素归 GP-a-æ）；policewoman（待裁定）；candlelight（该字素归 GP-a-æ）；campfire（该字素归 GP-a-æ）；Saturday（该字素归 GP-a-æ）；salad（该字素归 GP-a-æ）；island（待裁定）；information（待裁定）；unusual（待裁定）；disappear（对齐未落入（弱读/多音节对齐））；international（待裁定）；pianist（对齐未落入（弱读/多音节对齐））；faster（该字素归 GP-a-æ）；traveller（该字素归 GP-a-æ）；passenger（该字素归 GP-a-æ）；natural（该字素归 GP-a-æ）；photograph（该字素归 GP-a-æ）；geography（对齐未落入（弱读/多音节对齐））；signal（对齐未落入（弱读/多音节对齐））；campus（该字素归 GP-a-æ）；champion（该字素归 GP-a-æ）；headmaster（该字素归 GP-a-æ）；gentleman（对齐未落入（弱读/多音节对齐））；musician（待裁定）；magician（待裁定）；librarian（待裁定）；stranger（该字素归 GP-a-eɪ-open）；villager（对齐未落入（弱读/多音节对齐））；angrily（该字素归 GP-a-æ）；happiness（该字素归 GP-a-æ）；sadness（该字素归 GP-a-æ）；invitation（待裁定）；disagree（对齐未落入（弱读/多音节对齐））；valuable（该字素归 GP-a-æ）；candlestick（该字素归 GP-a-æ）；cinema（对齐未落入（弱读/多音节对齐））；dictionary（待裁定）；fisherman（对齐未落入（弱读/多音节对齐））；badminton（该字素归 GP-a-æ）；tomatoes（该字素归 GP-a-eɪ-open）；potatoes（该字素归 GP-a-eɪ-open）；dictionaries（待裁定）；happier（该字素归 GP-a-æ）；ambulance（该字素归 GP-a-æ）；arrive（对齐未落入（弱读/多音节对齐））；parrot（该字素归 GP-a-æ）；police station（待裁定）；fire station（待裁定）；company（对齐未落入（弱读/多音节对齐））；palace（该字素归 GP-a-æ）；temperature（待裁定）；magazine（该字素归 GP-a-æ）；newspaper（该字素归 GP-a-eɪ-open）；paper（该字素归 GP-a-eɪ-open）；answer（该字素归 GP-a-æ）；understand（该字素归 GP-a-æ）；grandparent（该字素归 GP-a-æ）；after（该字素归 GP-a-æ）；businessman（待裁定）；secretary（对齐未落入（弱读/多音节对齐））；astronaut（该字素归 GP-a-æ）；National Day（待裁定）；Christmas（对齐未落入（弱读/多音节对齐））；Dragon Boat Festival（待裁定）；lantern（该字素归 GP-a-æ）；calendar（该字素归 GP-a-æ）；stomach（待裁定）；stomachache（对齐未落入（弱读/多音节对齐））；cola（对齐未落入（弱读/多音节对齐））；pizza（对齐未落入（弱读/多音节对齐））
- **GP-e-e**（e→/e/，缺席 2）：they're（对齐未落入（弱读/多音节对齐））；careless（对齐未落入（弱读/多音节对齐））
- **GP-i-ɪ**（i→/ɪ/，缺席 29）：biology（该字素归 GP-i-aɪ-open）；coexist（待裁定）；especial（对齐未落入（弱读/多音节对齐））；extension（该字素归 GP-sion-ʃ）；oddity（对齐未落入（弱读/多音节对齐））；reliable（该字素归 GP-i-aɪ-open）；university（对齐未落入（弱读/多音节对齐））；bicycle（该字素归 GP-i-aɪ-open）；family（对齐未落入（弱读/多音节对齐））；tidy（该字素归 GP-i-aɪ-open）；ninety（待裁定）；library（该字素归 GP-i-aɪ-open）；untidy（该字素归 GP-i-aɪ-open）；happily（对齐未落入（弱读/多音节对齐））；easily（对齐未落入（弱读/多音节对齐））；finally（该字素归 GP-i-aɪ-open）；excited（该字素归 GP-i-aɪ-open）；icy（该字素归 GP-i-aɪ-open）；politely（待裁定）；design（该字素归 GP-i-aɪ-open）；environment（该字素归 GP-i-aɪ-open）；angrily（对齐未落入（弱读/多音节对齐））；heavily（对齐未落入（弱读/多音节对齐））；widely（待裁定）；luckily（对齐未落入（弱读/多音节对齐））；excitement（该字素归 GP-i-aɪ-open）；libraries（待裁定）；behind（该字素归 GP-i-find）；medicine（对齐未落入（弱读/多音节对齐））
- **GP-o-ɒ**（o→/ɒ/，缺席 57）：chorus（该字素归 GP-or）；autobus（该字素归 GP-o-əʊ-open）；guano（待裁定）；ore（该字素归 GP-or）；allot（对齐未落入（弱读/多音节对齐））；along（对齐未落入（弱读/多音节对齐））；biology（对齐未落入（弱读/多音节对齐））；commerce（对齐未落入（弱读/多音节对齐））；correspond（该字素归 GP-or）；domicile（对齐未落入（弱读/多音节对齐））；economic（对齐未落入（弱读/多音节对齐））；economy（对齐未落入（弱读/多音节对齐））；espionage（对齐未落入（弱读/多音节对齐））；golf（对齐未落入（弱读/多音节对齐））；irresponsible（对齐未落入（弱读/多音节对齐））；logic（对齐未落入（弱读/多音节对齐））；mnemonic（对齐未落入（弱读/多音节对齐））；model（对齐未落入（弱读/多音节对齐））；moderate（对齐未落入（弱读/多音节对齐））；modernize（对齐未落入（弱读/多音节对齐））；moreover（该字素归 GP-or）；nonsense（待裁定）；oddity（对齐未落入（弱读/多音节对齐））；offer（对齐未落入（弱读/多音节对齐））；phenomenon（对齐未落入（弱读/多音节对齐））；photography（对齐未落入（弱读/多音节对齐））；posh（对齐未落入（弱读/多音节对齐））；promise（待裁定）；prospect（对齐未落入（弱读/多音节对齐））；psychology（对齐未落入（弱读/多音节对齐））；smog（对齐未落入（弱读/多音节对齐））；tonic（对齐未落入（弱读/多音节对齐））；unconscious（对齐未落入（弱读/多音节对齐））；unpopular（对齐未落入（弱读/多音节对齐））；orange（待裁定）；watermelon（对齐未落入（弱读/多音节对齐））；storybook（该字素归 GP-or）；bored（该字素归 GP-or）；forest（该字素归 GP-or）；chore（该字素归 GP-or）；foreigner（该字素归 GP-or）；foreign（该字素归 GP-or）；bookstore（该字素归 GP-or）；postcard（该字素归 GP-o-old）；tomorrow（对齐未落入（弱读/多音节对齐））；how old（该字素归 GP-o-old）；lorry（该字素归 GP-or）；dinosaur（对齐未落入（弱读/多音节对齐））；store（该字素归 GP-or）；story（该字素归 GP-or）；boring（该字素归 GP-or）；sorry（对齐未落入（弱读/多音节对齐））；more（该字素归 GP-or）；borrow（对齐未落入（弱读/多音节对齐））；before（该字素归 GP-or）；also（该字素归 GP-o-əʊ-open）；astronaut（对齐未落入（弱读/多音节对齐））
- **GP-u-ʌ**（u→/ʌ/，缺席 2）：wonderful（对齐未落入（弱读/多音节对齐））；colourful（对齐未落入（弱读/多音节对齐））
- **GP-y-ɪ**（y→/ɪ/，缺席 161）：deny（该字素归 GP-y-aɪ）；derby（该字素归 GP-y-i）；duty（该字素归 GP-y-i）；hardly（该字素归 GP-y-i）；laundry（该字素归 GP-y-i）；marry（该字素归 GP-y-i）；panicky（该字素归 GP-y-i）；biology（该字素归 GP-y-i）；busily（该字素归 GP-y-i）；chemistry（该字素归 GP-y-i）；economy（该字素归 GP-y-i）；empty（该字素归 GP-y-i）；fancy（该字素归 GP-y-i）；gamify（该字素归 GP-y-aɪ）；kingly（该字素归 GP-y-i）；mighty（该字素归 GP-y-i）；oddity（该字素归 GP-y-i）；photography（该字素归 GP-y-i）；psychology（该字素归 GP-y-i）；ready（该字素归 GP-y-i）；shyly（该字素归 GP-y-i）；silly（该字素归 GP-y-i）；simplify（该字素归 GP-y-aɪ）；society（该字素归 GP-y-i）；stupidity（该字素归 GP-y-i）；suddenly（该字素归 GP-y-i）；tummy（该字素归 GP-y-i）；university（该字素归 GP-y-i）；utterly（该字素归 GP-y-i）；warranty（该字素归 GP-y-i）；yummy（该字素归 GP-y-i）；pretty（该字素归 GP-y-i）；cloudy（该字素归 GP-y-i）；rainy（该字素归 GP-y-i）；snowy（该字素归 GP-y-i）；sunny（该字素归 GP-y-i）；windy（该字素归 GP-y-i）；party（该字素归 GP-y-i）；carry（该字素归 GP-y-i）；hungry（该字素归 GP-y-i）；blueberry（该字素归 GP-y-i）；ladybug（该字素归 GP-y-i）；funny（该字素归 GP-y-i）；body（该字素归 GP-y-i）；family（该字素归 GP-y-i）；strawberry（该字素归 GP-y-i）；twenty（该字素归 GP-y-i）；hurry（该字素归 GP-y-i）；how many（该字素归 GP-y-i）；everyone（待裁定）；unhappy（该字素归 GP-y-i）；tidy（该字素归 GP-y-i）；usually（待裁定）；lucky（该字素归 GP-y-i）；dirty（该字素归 GP-y-i）；thirsty（该字素归 GP-y-i）；easy（该字素归 GP-y-i）；really（该字素归 GP-y-i）；lovely（待裁定）；thirty（该字素归 GP-y-i）；forty（该字素归 GP-y-i）；fifty（该字素归 GP-y-i）；sixty（该字素归 GP-y-i）；seventy（该字素归 GP-y-i）；eighty（该字素归 GP-y-i）；ninety（待裁定）；only（该字素归 GP-y-i）；blackberry（该字素归 GP-y-i）；juicy（该字素归 GP-y-i）；tasty（该字素归 GP-y-i）；heavy（该字素归 GP-y-i）；cherry（该字素归 GP-y-i）；city（该字素归 GP-y-i）；candy（该字素归 GP-y-i）；storybook（该字素归 GP-y-i）；friendly（该字素归 GP-y-i）；study（该字素归 GP-y-i）；library（该字素归 GP-y-i）；busy（该字素归 GP-y-i）；any（该字素归 GP-y-i）；activity（该字素归 GP-y-i）；safety（待裁定）；country（该字素归 GP-y-i）；countryside（该字素归 GP-y-i）；everybody（待裁定）；somebody（待裁定）；anyone（待裁定）；anybody（该字素归 GP-y-i）；nobody（该字素归 GP-y-i）；anything（该字素归 GP-y-i）；everything（待裁定）；everywhere（待裁定）；anywhere（该字素归 GP-y-i）；beauty（待裁定）；unlucky（该字素归 GP-y-i）；unhealthy（该字素归 GP-y-i）；untidy（该字素归 GP-y-i）；noisy（该字素归 GP-y-i）；sleepy（该字素归 GP-y-i）；quietly（待裁定）；slowly（该字素归 GP-y-i）；quickly（待裁定）；happily（该字素归 GP-y-i）；easily（该字素归 GP-y-i）；loudly（该字素归 GP-y-i）；finally（该字素归 GP-y-i）；February（待裁定）；bakery（该字素归 GP-y-i）；foggy（该字素归 GP-y-i）；stormy（该字素归 GP-y-i）；icy（该字素归 GP-y-i）；salty（该字素归 GP-y-i）；messy（该字素归 GP-y-i）；sandy（该字素归 GP-y-i）；grassy（该字素归 GP-y-i）；carefully（该字素归 GP-y-i）；politely（待裁定）；safely（待裁定）；sadly（该字素归 GP-y-i）；clearly（该字素归 GP-y-i）；healthy（该字素归 GP-y-i）；January（待裁定）；early（该字素归 GP-y-i）；reply（该字素归 GP-y-aɪ）；daily（该字素归 GP-y-i）；exactly（该字素归 GP-y-i）；geography（该字素归 GP-y-i）；rocky（该字素归 GP-y-i）；woody（该字素归 GP-y-i）；warmly（该字素归 GP-y-i）；angrily（该字素归 GP-y-i）；heavily（该字素归 GP-y-i）；deeply（该字素归 GP-y-i）；widely（待裁定）；truly（该字素归 GP-y-i）；luckily（该字素归 GP-y-i）；dictionary（待裁定）；factory（待裁定）；angry（该字素归 GP-y-i）；happy（该字素归 GP-y-i）；how heavy（该字素归 GP-y-i）；ferry（该字素归 GP-y-i）；lorry（该字素归 GP-y-i）；puppy（该字素归 GP-y-i）；company（该字素归 GP-y-i）；history（待裁定）；story（该字素归 GP-y-i）；baby（该字素归 GP-y-i）；daddy（该字素归 GP-y-i）；lonely（待裁定）；sorry（该字素归 GP-y-i）；lazy（该字素归 GP-y-i）；many（该字素归 GP-y-i）；any（该字素归 GP-y-i）；every（待裁定）；worry（该字素归 GP-y-i）；already（该字素归 GP-y-i）；very（该字素归 GP-y-i）；secretary（该字素归 GP-y-i）；cycling（该字素归 GP-y-aɪ）；hobby（该字素归 GP-y-i）
- **GP-a-eɪ-open**（a→/eɪ/，缺席 17）：haystack（该字素归 GP-a-æ）；separate（目标音素归 GP-a-e）；champagne（该字素归 GP-a-æ）；aggravate（该字素归 GP-a-æ）；animate（该字素归 GP-a-æ）；arrange（目标音素归 GP-a-e）；collaborate（该字素归 GP-a-æ）；mandate（该字素归 GP-a-æ）；an（该字素归 GP-a-æ）；classmate（该字素归 GP-a-æ）；pancake（该字素归 GP-a-æ）；always（目标音素归 GP-ay）；handmade（该字素归 GP-a-æ）；Saturday（该字素归 GP-a-æ）；afraid（该字素归 GP-a-ə）；National Day（待裁定）；stomachache（目标音素归 GP-a-e）
- **GP-a-ɑː**（a→/ɑː/，缺席 19）：karma（目标音素归 GP-ar）；politician（待裁定）；ptarmigan（目标音素归 GP-ar）；guardian（目标音素归 GP-ar）；photography（r 控归属不同）；am（该字素归 GP-a-æ）；washroom（该字素归 GP-a-w-ɒ）；apartment（该字素归 GP-a-ə）；anybody（该字素归 GP-a-e-any）；grasshopper（该字素归 GP-a-æ）；geography（r 控归属不同）；hospital（待裁定）；washed（待裁定）；watched（待裁定）；watch（该字素归 GP-a-w-ɒ）；swan（该字素归 GP-a-w-ɒ）；restaurant（待裁定）；want（该字素归 GP-a-w-ɒ）；wash（该字素归 GP-a-w-ɒ）
- **GP-ar**（ar→/ɑː/，缺席 2）：unpopular（该字素归 GP-r）；popular（该字素归 GP-r）
- **GP-ar-w**（ar→/ɔː/，缺席 1）：quarter（待裁定）
- **GP-e-iː-open**（e→/iː/，缺席 42）：believe（该字素归 GP-ve）；breathe（该字素归 GP-the）；conceive（该字素归 GP-ve）；creature（该字素归 GP-ture）；deceit（目标音素归 GP-ei-iː-c）；deceive（该字素归 GP-ve）；employee（目标音素归 GP-ee）；greenhouse（目标音素归 GP-ee）；league（待裁定）；leisure（目标音素归 GP-ei-iː）；perceive（该字素归 GP-ve）；receipt（目标音素归 GP-ei-iː-c）；receive（该字素归 GP-ve）；seize（目标音素归 GP-ei-iː）；caffeine（目标音素归 GP-ei-iː）；codeine（目标音素归 GP-ei-iː）；teethe（该字素归 GP-the）；seventeen（该字素归 GP-e-e）；nineteen（目标音素归 GP-ee）；repeat（目标音素归 GP-ea-iː）；between（目标音素归 GP-ee）；policeman（待裁定）；please（目标音素归 GP-ea-iː）；seahorse（目标音素归 GP-ea-iː）；weekend（该字素归 GP-e-e）；peaceful（待裁定）；peace（该字素归 GP-ce）；weakness（目标音素归 GP-ea-iː）；agreement（目标音素归 GP-ee）；cleaned（待裁定）；geese（目标音素归 GP-ee）；leaves（待裁定）；seat belt（该字素归 GP-e-e）；leave（该字素归 GP-ve）；eagle（该字素归 GP-le）；theatre（目标音素归 GP-ea-iː）；degree（目标音素归 GP-ee）；PE（对齐未落入（弱读/多音节对齐））；people（该字素归 GP-le）；piece（该字素归 GP-ce）；centimetre（该字素归 GP-e-e）；cheese（目标音素归 GP-ee）
- **GP-eCe**（e-e→/iː/，缺席 4）：believe（该字素归 GP-v）；geese（该字素归 GP-s-s）；piece（该字素归 GP-c-s）；cheese（该字素归 GP-s-z）
- **GP-ea-eɪ**（ea→/eɪ/，缺席 4）：changeable（目标音素归 GP-a-eɪ-open）；headache（该字素归 GP-ea-e）；daydream（该字素归 GP-ea-iː）；Teachers' Day（该字素归 GP-ea-iː）
- **GP-ei-eɪ**（ei→/eɪ/，缺席 2）：their（对齐未落入（弱读/多音节对齐））；theirs（对齐未落入（弱读/多音节对齐））
- **GP-ei-iː**（ei→/iː/，缺席 8）：ceiling（该字素归 GP-ei-iː-c）；conceit（该字素归 GP-ei-iː-c）；conceive（该字素归 GP-ei-iː-c）；deceit（该字素归 GP-ei-iː-c）；deceive（该字素归 GP-ei-iː-c）；perceive（该字素归 GP-ei-iː-c）；receipt（该字素归 GP-ei-iː-c）；receive（该字素归 GP-ei-iː-c）
- **GP-ei-iː-c**（ei→/iː/，缺席 6）：leisure（该字素归 GP-ei-iː）；protein（该字素归 GP-ei-iː）；seize（该字素归 GP-ei-iː）；caffeine（该字素归 GP-ei-iː）；codeine（该字素归 GP-ei-iː）；either（该字素归 GP-ei-iː）
- **GP-er**（er→/ɜː/，缺席 2）：worker（该字素归 GP-r）；learner（该字素归 GP-r）
- **GP-ere-eə**（ere→/eə/，缺席 1）：somewhere（该字素归 GP-r）
- **GP-i-aɪ-open**（i→/aɪ/，缺席 27）：divide（该字素归 GP-i-ɪ）；grind（该字素归 GP-i-find）；mild（该字素归 GP-i-find）；mind（该字素归 GP-i-find）；domicile（该字素归 GP-i-ɪ）；gamify（该字素归 GP-i-ɪ）；inquire（该字素归 GP-i-ɪ）；simplify（该字素归 GP-i-ɪ）；unkind（该字素归 GP-i-find）；kind（该字素归 GP-i-find）；child（该字素归 GP-i-find）；inside（该字素归 GP-i-ɪ）；fireman（待裁定）；firework（对齐未落入（弱读/多音节对齐））；dislike（该字素归 GP-i-ɪ）；impolite（该字素归 GP-i-ɪ）；invite（该字素归 GP-i-ɪ）；firefighter（目标音素归 GP-igh）；midnight（该字素归 GP-i-ɪ）；kindness（该字素归 GP-i-find）；scientist（该字素归 GP-i-ɪ）；wild（该字素归 GP-i-find）；lightning（该字素归 GP-i-ɪ）；find（该字素归 GP-i-find）；behind（该字素归 GP-i-find）；blind（该字素归 GP-i-find）；cycling（该字素归 GP-i-ɪ）
- **GP-i-e**（i-e→/aɪ/，缺席 4）：inquire（该字素归 GP-r）；fire（该字素归 GP-r）；campfire（该字素归 GP-r）；fire station（待裁定）
- **GP-i-find**（i→/aɪ/，缺席 80）：digest（该字素归 GP-i-aɪ-open）；divide（该字素归 GP-i-ɪ）；giant（待裁定）；pint（该字素归 GP-i-aɪ-open）；nitrate（该字素归 GP-i-aɪ-open）；primate（该字素归 GP-i-aɪ-open）；assign（该字素归 GP-i-aɪ-open）；biology（该字素归 GP-i-aɪ-open）；bridegroom（该字素归 GP-i-aɪ-open）；digestion（该字素归 GP-i-aɪ-open）；domicile（该字素归 GP-i-ɪ）；gamify（该字素归 GP-i-ɪ）；inquire（该字素归 GP-i-ɪ）；reliable（该字素归 GP-i-aɪ-open）；simplify（该字素归 GP-i-ɪ）；widen（该字素归 GP-i-aɪ-open）；tiger（该字素归 GP-i-aɪ-open）；I（该字素归 GP-i-aɪ-open）；lion（该字素归 GP-i-aɪ-open）；bicycle（该字素归 GP-i-aɪ-open）；nineteen（该字素归 GP-i-aɪ-open）；pineapple（待裁定）；fire（该字素归 GP-i-aɪ-open）；hi（该字素归 GP-i-aɪ-open）；tidy（该字素归 GP-i-aɪ-open）；ninety（待裁定）；tired（该字素归 GP-i-aɪ-open）；inside（该字素归 GP-i-ɪ）；fireman（待裁定）；climb（该字素归 GP-i-aɪ-open）；firework（对齐未落入（弱读/多音节对齐））；driver（该字素归 GP-i-aɪ-open）；library（该字素归 GP-i-aɪ-open）；China（该字素归 GP-i-aɪ-open）；sign（该字素归 GP-i-aɪ-open）；sometimes（该字素归 GP-i-aɪ-open）；untidy（该字素归 GP-i-aɪ-open）；dislike（该字素归 GP-i-ɪ）；impolite（该字素归 GP-i-ɪ）；writer（该字素归 GP-i-aɪ-open）；finally（该字素归 GP-i-aɪ-open）；ninth（该字素归 GP-i-aɪ-open）；excited（该字素归 GP-i-aɪ-open）；exciting（该字素归 GP-i-ɪ）；handwriting（该字素归 GP-i-ɪ）；timetable（待裁定）；sidewalk（待裁定）；firefly（待裁定）；icy（该字素归 GP-i-aɪ-open）；politely（待裁定）；invite（该字素归 GP-i-ɪ）；firefighter（目标音素归 GP-igh）；midnight（该字素归 GP-i-ɪ）；campfire（该字素归 GP-i-aɪ-open）；fireplace（待裁定）；Friday（该字素归 GP-i-aɪ-open）；island（待裁定）；climbing（该字素归 GP-i-ɪ）；design（该字素归 GP-i-aɪ-open）；environment（该字素归 GP-i-aɪ-open）；librarian（待裁定）；climber（该字素归 GP-i-aɪ-open）；widely（待裁定）；excitement（该字素归 GP-i-aɪ-open）；hiking（该字素归 GP-i-ɪ）；pilot（该字素归 GP-i-aɪ-open）；scientist（该字素归 GP-i-ɪ）；dining hall（该字素归 GP-i-ɪ）；libraries（待裁定）；knives（该字素归 GP-i-aɪ-open）；dinosaur（该字素归 GP-i-aɪ-open）；spider（该字素归 GP-i-aɪ-open）；fire station（待裁定）；lightning（该字素归 GP-i-ɪ）；Chinese（该字素归 GP-i-aɪ-open）；idea（该字素归 GP-i-aɪ-open）；surprised（该字素归 GP-i-aɪ-open）；I（该字素归 GP-i-aɪ-open）；cycling（该字素归 GP-i-ɪ）；violin（该字素归 GP-i-ɪ）
- **GP-i-iː**（i→/iː/，缺席 17）：ceiling（该字素归 GP-i-ɪ）；I（该字素归 GP-i-aɪ-open）；him（该字素归 GP-i-ɪ）；his（该字素归 GP-i-ɪ）；nineteen（该字素归 GP-i-aɪ-open）；evening（该字素归 GP-i-ɪ）；fifteen（该字素归 GP-i-ɪ）；sixteen（该字素归 GP-i-ɪ）；is（该字素归 GP-i-ɪ）；this（该字素归 GP-i-ɪ）；easily（目标音素归 GP-ea-iː）；feeling（该字素归 GP-i-ɪ）；sleeping（该字素归 GP-i-ɪ）；disagree（该字素归 GP-i-ɪ）；Chinese（该字素归 GP-i-aɪ-open）；idea（该字素归 GP-i-aɪ-open）；centimetre（该字素归 GP-i-ɪ）
- **GP-ie-aɪ**（ie→/aɪ/，缺席 1）：libraries（待裁定）
- **GP-ie-iː**（ie→/iː/，缺席 2）：easier（目标音素归 GP-ea-iː）；review（目标音素归 GP-e-iː-open）
- **GP-o-both**（o→/əʊ/，缺席 103）：clover（该字素归 GP-o-əʊ-open）；depot（该字素归 GP-o-əʊ-open）；fold（该字素归 GP-o-old）；folk（该字素归 GP-o-əʊ-open）；gecko（该字素归 GP-o-əʊ-open）；ghost（该字素归 GP-o-old）；obey（该字素归 GP-o-əʊ-open）；post（该字素归 GP-o-old）；protein（该字素归 GP-o-əʊ-open）；thorough（待裁定）；tofu（该字素归 GP-o-əʊ-open）；uphold（该字素归 GP-o-old）；xylophone（目标音素归 GP-o-e）；yolk（该字素归 GP-o-əʊ-open）；autobus（该字素归 GP-o-əʊ-open）；borough（待裁定）；cello（该字素归 GP-o-əʊ-open）；codeine（该字素归 GP-o-əʊ-open）；concerto（该字素归 GP-o-əʊ-open）；ginkgo（该字素归 GP-o-əʊ-open）；guano（待裁定）；pneumonia（待裁定）；brochure（该字素归 GP-o-əʊ-open）；donate（该字素归 GP-o-əʊ-open）；echo（该字素归 GP-o-əʊ-open）；explosion（该字素归 GP-o-əʊ-open）；moment（该字素归 GP-o-əʊ-open）；moreover（该字素归 GP-or）；motion（该字素归 GP-o-əʊ-open）；motivate（该字素归 GP-o-əʊ-open）；noticeable（该字素归 GP-o-əʊ-open）；oppose（目标音素归 GP-o-e）；photographic（该字素归 GP-o-əʊ-open）；propose（目标音素归 GP-o-e）；old（该字素归 GP-o-old）；no（该字素归 GP-o-əʊ-open）；cold（该字素归 GP-o-old）；hello（该字素归 GP-o-əʊ-open）；OK（对齐未落入（弱读/多音节对齐））；ago（该字素归 GP-o-əʊ-open）；don't（该字素归 GP-o-əʊ-open）；photo（该字素归 GP-o-əʊ-open）；closed（该字素归 GP-o-əʊ-open）；piano（该字素归 GP-o-əʊ-open）；only（该字素归 GP-o-əʊ-open）；goldfish（该字素归 GP-o-old）；coconut（该字素归 GP-o-əʊ-open）；polar bear（该字素归 GP-o-əʊ-open）；mango（该字素归 GP-o-əʊ-open）；notebook（待裁定）；sofa（该字素归 GP-o-əʊ-open）；potato（该字素归 GP-o-əʊ-open）；tomato（该字素归 GP-o-əʊ-open）；mobile（该字素归 GP-o-əʊ-open）；hotel（该字素归 GP-o-əʊ-open）；postman（该字素归 GP-o-old）；nobody（该字素归 GP-o-ɒ）；November（该字素归 GP-o-əʊ-open）；hometown（待裁定）；golden（该字素归 GP-o-old）；broken（该字素归 GP-o-əʊ-open）；overcoat（该字素归 GP-o-əʊ-open）；homework（该字素归 GP-o-əʊ-open）；October（该字素归 GP-o-ɒ）；host（该字素归 GP-o-old）；hopeful（该字素归 GP-o-əʊ-open）；older（该字素归 GP-o-old）；photograph（该字素归 GP-o-əʊ-open）；motor（该字素归 GP-o-əʊ-open）；overnight（该字素归 GP-o-əʊ-open）；overweight（该字素归 GP-o-əʊ-open）；post office（待裁定）；postcard（该字素归 GP-o-old）；tomorrow（目标音素归 GP-ow-əʊ）；how old（该字素归 GP-o-old）；tomatoes（目标音素归 GP-oe）；potatoes（目标音素归 GP-oe）；photos（该字素归 GP-o-əʊ-open）；pianos（该字素归 GP-o-əʊ-open）；told（该字素归 GP-o-old）；sold（该字素归 GP-o-old）；motorcycle（该字素归 GP-o-əʊ-open）；metro（该字素归 GP-o-əʊ-open）；lonely（待裁定）；zero（该字素归 GP-o-əʊ-open）；kilo（该字素归 GP-o-əʊ-open）；most（该字素归 GP-o-old）；go（该字素归 GP-o-əʊ-open）；open（该字素归 GP-o-əʊ-open）；borrow（目标音素归 GP-ow-əʊ）；hold（该字素归 GP-o-old）；follow（该字素归 GP-o-ɒ）；over（该字素归 GP-o-əʊ-open）；so（该字素归 GP-o-əʊ-open）；also（该字素归 GP-o-əʊ-open）；hero（该字素归 GP-o-əʊ-open）；robot（该字素归 GP-o-ɒ）；ocean（待裁定）；gold（该字素归 GP-o-old）；Dragon Boat Festival（待裁定）；comb（该字素归 GP-o-əʊ-open）；cola（该字素归 GP-o-əʊ-open）；yogurt（该字素归 GP-o-əʊ-open）
- **GP-o-old**（o→/əʊ/，缺席 86）：clover（该字素归 GP-o-əʊ-open）；depot（该字素归 GP-o-əʊ-open）；folk（该字素归 GP-o-əʊ-open）；gecko（该字素归 GP-o-əʊ-open）；obey（该字素归 GP-o-əʊ-open）；protein（该字素归 GP-o-əʊ-open）；thorough（待裁定）；tofu（该字素归 GP-o-əʊ-open）；xylophone（目标音素归 GP-o-e）；yolk（该字素归 GP-o-əʊ-open）；autobus（该字素归 GP-o-əʊ-open）；borough（待裁定）；cello（该字素归 GP-o-əʊ-open）；codeine（该字素归 GP-o-əʊ-open）；concerto（该字素归 GP-o-əʊ-open）；ginkgo（该字素归 GP-o-əʊ-open）；guano（待裁定）；pneumonia（待裁定）；brochure（该字素归 GP-o-əʊ-open）；donate（该字素归 GP-o-əʊ-open）；echo（该字素归 GP-o-əʊ-open）；explosion（该字素归 GP-o-əʊ-open）；moment（该字素归 GP-o-əʊ-open）；moreover（该字素归 GP-or）；motion（该字素归 GP-o-əʊ-open）；motivate（该字素归 GP-o-əʊ-open）；noticeable（该字素归 GP-o-əʊ-open）；oppose（目标音素归 GP-o-e）；photographic（该字素归 GP-o-əʊ-open）；propose（目标音素归 GP-o-e）；no（该字素归 GP-o-əʊ-open）；hello（该字素归 GP-o-əʊ-open）；OK（对齐未落入（弱读/多音节对齐））；ago（该字素归 GP-o-əʊ-open）；don't（该字素归 GP-o-əʊ-open）；photo（该字素归 GP-o-əʊ-open）；closed（该字素归 GP-o-əʊ-open）；piano（该字素归 GP-o-əʊ-open）；only（该字素归 GP-o-əʊ-open）；coconut（该字素归 GP-o-əʊ-open）；polar bear（该字素归 GP-o-əʊ-open）；mango（该字素归 GP-o-əʊ-open）；notebook（待裁定）；sofa（该字素归 GP-o-əʊ-open）；potato（该字素归 GP-o-əʊ-open）；tomato（该字素归 GP-o-əʊ-open）；mobile（该字素归 GP-o-əʊ-open）；hotel（该字素归 GP-o-əʊ-open）；nobody（该字素归 GP-o-ɒ）；November（该字素归 GP-o-əʊ-open）；hometown（待裁定）；broken（该字素归 GP-o-əʊ-open）；overcoat（该字素归 GP-o-əʊ-open）；homework（该字素归 GP-o-əʊ-open）；October（该字素归 GP-o-ɒ）；hopeful（该字素归 GP-o-əʊ-open）；photograph（该字素归 GP-o-əʊ-open）；motor（该字素归 GP-o-əʊ-open）；overnight（该字素归 GP-o-əʊ-open）；overweight（该字素归 GP-o-əʊ-open）；tomorrow（目标音素归 GP-ow-əʊ）；tomatoes（目标音素归 GP-oe）；potatoes（目标音素归 GP-oe）；photos（该字素归 GP-o-əʊ-open）；pianos（该字素归 GP-o-əʊ-open）；motorcycle（该字素归 GP-o-əʊ-open）；metro（该字素归 GP-o-əʊ-open）；lonely（待裁定）；zero（该字素归 GP-o-əʊ-open）；kilo（该字素归 GP-o-əʊ-open）；both（该字素归 GP-o-both）；go（该字素归 GP-o-əʊ-open）；open（该字素归 GP-o-əʊ-open）；borrow（目标音素归 GP-ow-əʊ）；follow（该字素归 GP-o-ɒ）；clothes（该字素归 GP-o-both）；over（该字素归 GP-o-əʊ-open）；so（该字素归 GP-o-əʊ-open）；also（该字素归 GP-o-əʊ-open）；hero（该字素归 GP-o-əʊ-open）；robot（该字素归 GP-o-ɒ）；ocean（待裁定）；Dragon Boat Festival（待裁定）；comb（该字素归 GP-o-əʊ-open）；cola（该字素归 GP-o-əʊ-open）；yogurt（该字素归 GP-o-əʊ-open）
- **GP-o-uː**（o→/uː/，缺席 1）：tofu（该字素归 GP-o-əʊ-open）
- **GP-o-əʊ-open**（o→/əʊ/，缺席 34）：fold（该字素归 GP-o-old）；ghost（该字素归 GP-o-old）；post（该字素归 GP-o-old）；thorough（待裁定）；uphold（该字素归 GP-o-old）；xylophone（目标音素归 GP-o-e）；borough（待裁定）；oppose（目标音素归 GP-o-e）；propose（目标音素归 GP-o-e）；old（该字素归 GP-o-old）；cold（该字素归 GP-o-old）；OK（对齐未落入（弱读/多音节对齐））；goldfish（该字素归 GP-o-old）；postman（该字素归 GP-o-old）；golden（该字素归 GP-o-old）；host（该字素归 GP-o-old）；older（该字素归 GP-o-old）；post office（待裁定）；postcard（该字素归 GP-o-old）；tomorrow（目标音素归 GP-ow-əʊ）；how old（该字素归 GP-o-old）；tomatoes（目标音素归 GP-oe）；potatoes（目标音素归 GP-oe）；told（该字素归 GP-o-old）；sold（该字素归 GP-o-old）；both（该字素归 GP-o-both）；most（该字素归 GP-o-old）；borrow（目标音素归 GP-ow-əʊ）；hold（该字素归 GP-o-old）；follow（该字素归 GP-o-ɒ）；clothes（该字素归 GP-o-both）；ocean（待裁定）；gold（该字素归 GP-o-old）；Dragon Boat Festival（待裁定）
- **GP-oe**（oe→/əʊ/，缺席 1）：coexist（待裁定）
- **GP-or**（or→/ɔː/，缺席 1）：author（该字素归 GP-r）
- **GP-ou-aʊ**（ou→/aʊ/，缺席 1）：mountain（待裁定）
- **GP-ow-əʊ**（ow→/əʊ/，缺席 4）：hometown（待裁定）；how old（该字素归 GP-ow-aʊ）；how tall（该字素归 GP-ow-aʊ）；how heavy（该字素归 GP-ow-aʊ）
- **GP-u-e-juː**（u-e→/juː/，缺席 1）：future（该字素归 GP-r）
- **GP-u-juː**（u→/juː/，缺席 2）：beautiful（待裁定）；beauty（待裁定）
- **GP-y-aɪ**（y→/aɪ/，缺席 14）：biology（该字素归 GP-y-i）；mighty（该字素归 GP-y-i）；society（该字素归 GP-y-i）；bicycle（该字素归 GP-y-ɪ）；tidy（该字素归 GP-y-i）；ninety（待裁定）；library（该字素归 GP-y-i）；countryside（该字素归 GP-y-i）；untidy（该字素归 GP-y-i）；quietly（待裁定）；finally（该字素归 GP-y-i）；icy（该字素归 GP-y-i）；politely（待裁定）；widely（待裁定）
- **GP-ai-e**（ai→/e/，缺席 2）：entertain（该字素归 GP-ai）；airmail（该字素归 GP-ai）
- **GP-ie-e**（ie→/e/，缺席 4）：twentieth（目标音素归 GP-e-e）；heavier（目标音素归 GP-ea-e）；libraries（待裁定）；dictionaries（待裁定）
- **GP-ce**（ce→/s/，缺席 35）：ceiling（该字素归 GP-c-s）；cent（该字素归 GP-c-s）；conceit（该字素归 GP-c-k-front）；conceive（该字素归 GP-c-k-front）；deceit（该字素归 GP-c-s）；deceive（该字素归 GP-c-s）；except（该字素归 GP-c-k-front）；perceive（该字素归 GP-c-s）；pronounced（待裁定）；receipt（该字素归 GP-c-s）；receive（该字素归 GP-c-s）；soccer（目标音素归 GP-s-s）；accept（该字素归 GP-c-k-front）；access（该字素归 GP-c-k-front）；accessible（该字素归 GP-c-k-front）；ascend（该字素归 GP-e-e）；noticeable（该字素归 GP-c-s）；sceptic（该字素归 GP-c-k）；succeed（该字素归 GP-c-k-front）；susceptible（该字素归 GP-e-e）；uncertain（该字素归 GP-c-s）；policeman（待裁定）；centre（该字素归 GP-c-s）；dancer（该字素归 GP-c-s）；center（该字素归 GP-c-s）；spaceman（待裁定）；spaceship（待裁定）；policewoman（待裁定）；December（该字素归 GP-c-s）；officer（该字素归 GP-c-s）；celebrate（该字素归 GP-c-s）；peaceful（待裁定）；spacecraft（待裁定）；centimetre（该字素归 GP-c-s）；princess（该字素归 GP-c-s）
- **GP-ge**（ge→/dʒ/，缺席 22）：digest（该字素归 GP-g-dʒ）；gem（该字素归 GP-g-dʒ）；judged（该字素归 GP-g-dʒ）；dodger（该字素归 GP-g-dʒ）；changeable（该字素归 GP-g-dʒ）；courageous（该字素归 GP-g-dʒ）；digestion（该字素归 GP-g-dʒ）；gentle（该字素归 GP-g-dʒ）；ingenious（该字素归 GP-g-dʒ）；ingenuous（该字素归 GP-g-dʒ）；manageable（该字素归 GP-g-dʒ）；suggest（该字素归 GP-e-e）；suggestion（该字素归 GP-e-e）；vegetables（待裁定）；danger（该字素归 GP-g-dʒ）；dangerous（该字素归 GP-g-dʒ）；passenger（该字素归 GP-g-dʒ）；geography（该字素归 GP-g-dʒ）；gentleman（该字素归 GP-g-dʒ）；stranger（该字素归 GP-g-dʒ）；villager（该字素归 GP-g-dʒ）；vegetable（待裁定）
- **GP-the**（the→/ð/，缺席 27）：neither（该字素归 GP-th-ð）；another（该字素归 GP-th-ð）；other（该字素归 GP-th-ð）；they're（该字素归 GP-th-ð）；there（该字素归 GP-th-ð）；brother（该字素归 GP-th-ð）；father（该字素归 GP-th-ð）；grandfather（该字素归 GP-th-ð）；grandmother（该字素归 GP-th-ð）；mother（该字素归 GP-th-ð）；they（该字素归 GP-th-ð）；them（该字素归 GP-th-ð）；their（该字素归 GP-th-ð）；theirs（该字素归 GP-th-ð）；these（该字素归 GP-th-ð）；then（该字素归 GP-th-ð）；weather（该字素归 GP-th-ð）；themselves（该字素归 GP-th-ð）；feather（该字素归 GP-th-ð）；clothes（该字素归 GP-th-ð）；they（该字素归 GP-th-ð）；them（该字素归 GP-th-ð）；their（该字素归 GP-th-ð）；theirs（该字素归 GP-th-ð）；these（该字素归 GP-th-ð）；either（该字素归 GP-th-ð）；together（该字素归 GP-th-ð）
- **GP-ve**（ve→/v/，缺席 51）：clover（该字素归 GP-v）；veil（该字素归 GP-v）；vein（该字素归 GP-v）；development（该字素归 GP-v）；eventful（该字素归 GP-v）；government（该字素归 GP-v）；however（该字素归 GP-v）；moreover（该字素归 GP-v）；university（该字素归 GP-er）；veal（该字素归 GP-v）；seven（该字素归 GP-v）；seventeen（该字素归 GP-v）；evening（该字素归 GP-v）；vest（该字素归 GP-v）；eleven（该字素归 GP-v）；everyone（待裁定）；lovely（待裁定）；seventy（该字素归 GP-v）；travel（该字素归 GP-v）；vegetables（待裁定）；driver（该字素归 GP-v）；everybody（待裁定）；everything（待裁定）；everywhere（待裁定）；cover（该字素归 GP-v）；seventh（该字素归 GP-v）；November（该字素归 GP-v）；overcoat（该字素归 GP-v）；clever（该字素归 GP-v）；river（该字素归 GP-v）；discover（该字素归 GP-v）；invent（该字素归 GP-v）；invention（该字素归 GP-v）；ourselves（待裁定）；yourselves（待裁定）；themselves（该字素归 GP-v）；traveller（该字素归 GP-v）；inventor（该字素归 GP-v）；movement（该字素归 GP-v）；overnight（该字素归 GP-v）；overweight（该字素归 GP-v）；leaves（待裁定）；knives（该字素归 GP-v）；wolves（该字素归 GP-v）；every（待裁定）；over（该字素归 GP-v）；never（该字素归 GP-v）；very（该字素归 GP-v）；fever（该字素归 GP-v）；silver（该字素归 GP-v）；vegetable（待裁定）
- **GP-ck**（ck→/k/，缺席 21）：gecko（该字素归 GP-k）；hammock（该字素归 GP-k）；panicky（该字素归 GP-k）；pickle（该字素归 GP-k）；clickable（该字素归 GP-k）；chicken（该字素归 GP-k）；lucky（该字素归 GP-k）；quick（该字素归 GP-k）；blackberry（该字素归 GP-k）；duckling（该字素归 GP-k）；blackboard（该字素归 GP-k）；jacket（该字素归 GP-k）；unlucky（该字素归 GP-k）；quickly（待裁定）；blackbird（该字素归 GP-k）；woodpecker（该字素归 GP-k）；rocky（该字素归 GP-k）；luckily（该字素归 GP-k）；background（该字素归 GP-k）；ticket（该字素归 GP-k）；pocket（该字素归 GP-k）
- **GP-ff**（ff→/f/，缺席 20）：different（该字素归 GP-f）；caffeine（该字素归 GP-f）；affect（该字素归 GP-f）；affix（该字素归 GP-f）；differ（该字素归 GP-f）；differentiate（该字素归 GP-f）；effect（该字素归 GP-f）；efficient（该字素归 GP-f）；offer（该字素归 GP-f）；suffer（该字素归 GP-f）；sufficient（该字素归 GP-f）；suffix（该字素归 GP-f）；giraffe（待裁定）；office（待裁定）；coffee（该字素归 GP-f）；difficult（该字素归 GP-f）；officer（该字素归 GP-f）；post office（待裁定）；traffic（该字素归 GP-f）；police officer（该字素归 GP-f）
- **GP-ll**（ll→/l/，缺席 34）：alloy（该字素归 GP-l）；ballet（待裁定）；college（待裁定）；willow（该字素归 GP-l）；cello（该字素归 GP-l）；allot（该字素归 GP-l）；allow（该字素归 GP-l）；brilliant（该字素归 GP-l）；collaborate（该字素归 GP-l）；dwelling（该字素归 GP-l）；illegal（该字素归 GP-l）；illiterate（该字素归 GP-l）；illusion（该字素归 GP-l）；silly（该字素归 GP-l）；yellow（该字素归 GP-l）；hello（该字素归 GP-l）；balloon（该字素归 GP-l）；usually（待裁定）；really（该字素归 GP-l）；umbrella（该字素归 GP-l）；collect（该字素归 GP-l）；finally（该字素归 GP-l）；carefully（该字素归 GP-l）；village（待裁定）；collection（该字素归 GP-l）；illness（该字素归 GP-l）；smaller（该字素归 GP-l）；traveller（该字素归 GP-l）；villager（该字素归 GP-l）；fallen（该字素归 GP-l）；pollution（该字素归 GP-l）；taller（该字素归 GP-l）；million（该字素归 GP-l）；follow（该字素归 GP-l）
- **GP-ss**（ss→/s/，缺席 33）：message（待裁定）；wilderness（位置/构成条件不满足）；accessible（目标音素归 GP-c-s）；admissible（位置/构成条件不满足）；assign（位置/构成条件不满足）；assist（目标音素归 GP-s-s）；permissible（位置/构成条件不满足）；classmate（位置/构成条件不满足）；sunglasses（目标音素归 GP-s-s）；classroom（位置/构成条件不满足）；glasses（位置/构成条件不满足）；actress（位置/构成条件不满足）；careless（位置/构成条件不满足）；password（位置/构成条件不满足）；crosswalk（位置/构成条件不满足）；grasshopper（位置/构成条件不满足）；messy（位置/构成条件不满足）；grassy（位置/构成条件不满足）；passport（位置/构成条件不满足）；useless（目标音素归 GP-s-s）；impossible（位置/构成条件不满足）；possible（位置/构成条件不满足）；kindness（位置/构成条件不满足）；illness（位置/构成条件不满足）；passenger（位置/构成条件不满足）；happiness（位置/构成条件不满足）；sadness（目标音素归 GP-s-s）；darkness（位置/构成条件不满足）；weakness（位置/构成条件不满足）；crossing（位置/构成条件不满足）；lesson（位置/构成条件不满足）；scissors（该字素归 GP-s-z）；businessman（待裁定）
- **GP-zz**（zz→/z/，缺席 1）：puzzle（该字素归 GP-z）
- **GP-a-e-any**（a→/e/，缺席 48）：electrician（待裁定）；pleasant（目标音素归 GP-ea-e）；separate（目标音素归 GP-e-e）；influenza（对齐未落入（弱读/多音节对齐））；maglev（该字素归 GP-a-æ）；weta（目标音素归 GP-e-e）；accept（该字素归 GP-a-ə）；access（该字素归 GP-a-æ）；accessible（该字素归 GP-a-ə）；affect（该字素归 GP-a-ə）；against（该字素归 GP-a-ə）；alphabet（该字素归 GP-a-æ）；annex（该字素归 GP-a-ə）；ascend（该字素归 GP-a-ə）；aspect（该字素归 GP-a-æ）；attend（该字素归 GP-a-ə）；especial（目标音素归 GP-e-e）；metaphor（目标音素归 GP-e-e）；spectator（该字素归 GP-a-eɪ-open）；elephant（目标音素归 GP-e-e）；watermelon（该字素归 GP-a-w-ɔː）；again（该字素归 GP-a-ə）；blackberry（该字素归 GP-a-æ）；grandparents（该字素归 GP-a-æ）；vegetables（待裁定）；library（对齐未落入（弱读/多音节对齐））；breakfast（目标音素归 GP-ea-e）；umbrella（目标音素归 GP-e-e）；special（待裁定）；February（待裁定）；January（待裁定）；headmaster（该字素归 GP-a-æ）；gentleman（目标音素归 GP-e-e）；pen pal（该字素归 GP-a-æ）；librarian（待裁定）；education（待裁定）；aircraft（该字素归 GP-a-æ）；dictionary（待裁定）；libraries（待裁定）；dictionaries（待裁定）；restaurant（待裁定）；temperature（待裁定）；grandparent（该字素归 GP-a-æ）；already（目标音素归 GP-ea-e）；secretary（目标音素归 GP-e-e）；metal（待裁定）；festival（待裁定）；Spring Festival（待裁定）
- **GP-a-w-ɒ**（a→/ɒ/，缺席 52）：acorn（该字素归 GP-a-eɪ-open）；although（对齐未落入（弱读/多音节对齐））；calm（该字素归 GP-a-ɑː）；garage（待裁定）；guava（待裁定）；karate（待裁定）；karma（对齐未落入（弱读/多音节对齐））；palm（该字素归 GP-a-ɑː）；waltz（该字素归 GP-a-w-ɔː）；camouflage（待裁定）；guano（待裁定）；politician（待裁定）；psalm（该字素归 GP-a-ɑː）；ptarmigan（对齐未落入（弱读/多音节对齐））；along（该字素归 GP-a-ə）；guardian（对齐未落入（弱读/多音节对齐））；metaphor（对齐未落入（弱读/多音节对齐））；photography（对齐未落入（弱读/多音节对齐））；warranty（该字素归 GP-a-w-ɔː）；water（该字素归 GP-a-w-ɔː）；father（该字素归 GP-a-ɑː）；grandfather（该字素归 GP-a-æ）；basketball（该字素归 GP-a-æ）；watermelon（该字素归 GP-a-w-ɔː）；am（该字素归 GP-a-æ）；what（该字素归 GP-a-ɑː）；baseball（待裁定）；salt（对齐未落入（弱读/多音节对齐））；koala（该字素归 GP-a-ɑː）；blackboard（该字素归 GP-a-æ）；important（待裁定）；apartment（该字素归 GP-a-ə）；waterfall（该字素归 GP-a-w-ɔː）；always（对齐未落入（弱读/多音节对齐））；anybody（该字素归 GP-a-e-any）；across（该字素归 GP-a-ə）；tablecloth（该字素归 GP-a-eɪ-open）；grasshopper（该字素归 GP-a-æ）；granddaughter（该字素归 GP-a-æ）；salty（对齐未落入（弱读/多音节对齐））；passport（该字素归 GP-a-æ）；geography（目标音素归 GP-o-ɒ）；transport（该字素归 GP-a-æ）；transform（该字素归 GP-a-æ）；sandstorm（该字素归 GP-a-æ）；hospital（待裁定）；restaurant（待裁定）；grandpa（该字素归 GP-a-æ）；grandma（该字素归 GP-a-æ）；already（对齐未落入（弱读/多音节对齐））；also（对齐未落入（弱读/多音节对齐））；astronaut（该字素归 GP-a-æ）
- **GP-a-w-ɔː**（a→/ɔː/，缺席 21）：acorn（该字素归 GP-a-eɪ-open）；although（r 控归属不同）；along（该字素归 GP-a-ə）；metaphor（目标音素归 GP-or）；basketball（该字素归 GP-a-æ）；baseball（待裁定）；salt（r 控归属不同）；blackboard（该字素归 GP-a-æ）；important（待裁定）；always（r 控归属不同）；across（该字素归 GP-a-ə）；tablecloth（该字素归 GP-a-eɪ-open）；granddaughter（该字素归 GP-a-æ）；salty（r 控归属不同）；passport（该字素归 GP-a-æ）；transport（该字素归 GP-a-æ）；transform（该字素归 GP-a-æ）；sandstorm（该字素归 GP-a-æ）；already（r 控归属不同）；also（r 控归属不同）；astronaut（该字素归 GP-a-æ）
- **GP-ea-e**（ea→/e/，缺席 1）：seat belt（该字素归 GP-ea-iː）
- **GP-oo-ʌ**（oo→/ʌ/，缺席 2）：toothbrush（该字素归 GP-oo-uː）；mushroom（该字素归 GP-oo-uː）
- **GP-ou-ɔː**（ou→/ɔː/，缺席 1）：you（该字素归 GP-ou-uː）
- **GP-ou-ə**（ou→/ə/，缺席 14）：pronounced（待裁定）；announce（该字素归 GP-ou-aʊ）；trouble（该字素归 GP-ou-ʌ）；around（该字素归 GP-ou-aʊ）；our（该字素归 GP-ou-aʊ）；ours（该字素归 GP-ou-aʊ）；trousers（该字素归 GP-ou-aʊ）；underground（该字素归 GP-ou-aʊ）；younger（该字素归 GP-ou-ʌ）；our（该字素归 GP-ou-aʊ）；ours（该字素归 GP-ou-aʊ）；about（该字素归 GP-ou-aʊ）；hour（该字素归 GP-ou-aʊ）；shoulder（该字素归 GP-ou-əʊ）
- **GP-ou-ʊ**（ou→/ʊ/，缺席 4）：conspicuous（该字素归 GP-ous）；humour（该字素归 GP-ou-ə）；ingenuous（该字素归 GP-ous）；neighbourhood（该字素归 GP-ou-ə）
- **GP-ou-ʌ**（ou→/ʌ/，缺席 6）：unconscious（该字素归 GP-ous）；colour（该字素归 GP-ou-ə）；our（该字素归 GP-ou-aʊ）；ours（该字素归 GP-ou-aʊ）；colourful（该字素归 GP-ou-ə）；underground（该字素归 GP-ou-aʊ）
- **GP-ough-ɔː**（ough→/ɔː/，缺席 3）：although（该字素归 GP-ough-əʊ）；trough（该字素归 GP-ough-ɒf）；cough（该字素归 GP-ough-ɒf）
- **GP-ough-ə**（ough→/ə/，缺席 1）：ploughman（该字素归 GP-ough-aʊ）

口径差登记：模式音素为 RP 形而成员词卡音标为 GA 形的词次共 339（涉 26 个模式），逐模式计数见 closing_validation.md——按用户裁定冻结现状，不作误收/漏收处理。**（本登记已由 §10 终轮消解：phonetic_gb 合并后词卡与模式同为 RP 口径。）**

## 10. 终轮重推（英式口径 · 2026-11-01）

### 10.1 基底与方法

- 音标源：词库 `phonetic_gb` 字段（由对照表按 id 合并，2,287/2,287 非空；合并校验：条目数不变、除 phonetic_gb 外逐字段零差异）。
- 成员级展开沿用现行口径：2,287 条 → **2,317 个成员**（14 个复合词头按 GA 字段既有分段位置切分 gb 串，14/14 全部切开，无切分失败登记）。
- 基底 = 独立审计期望集（`docs/PHONICS_AUDIT_2026-11-01.md`；独立 DP 对齐推导，10,055 词次）∪ 审计无法判定成员在现行词集中的 22 行（维持登记）；其上施加英式口径处置（10.4）。原 184 条待裁定中审计已判可定的（C1 38 + C2 16 词次）随基底入集。
- 弱元音/多字母块交界处自动对齐不可判的 61 对，按同族词口径逐词人工放置并逐词核定高亮 span（明细类见 10.4）。

### 10.2 终局计数

| 指标 | 终轮（GB 口径） | 上一版（GA 口径） |
|---|---|---|
| 词库条目 / 成员 | 2,287 / 2,317 | 2,285 / 2,315 |
| 总词次 | **10,117** | 9,992 |
| 成员命中 ≥1 模式 | 2,313 / 2,317 | 2,313 / 2,315 |
| 条目命中 ≥1 模式 | 2,284 / 2,287 | 2,283 / 2,285 |
| 零命中 | 成员 4（eye、you×2、of）；条目 3（eye、you、of） | 成员/条目 2（eye、of） |
| 待裁定 | **146** | 184 |
| 空模式 | 1（GP-ea-ɑː；GP-ough-ə 已由 thorough/borough 入集消解） | 2 |

分类词次：辅音 6,740 / 短元音 1,412 / 长音菜单 1,400 / 变脸多读 165 / Magic e 182 / 词尾定律 218。

### 10.3 审计差异逐类处置（对审计期望集的残差全部有去向）

| 审计项 | 量 | 处置 |
|---|---|---|
| 漏收（期望有、旧词集无） | 177 词次 | **补收 176**（随基底入集：含 GP-ck 词中整类 20、GP-o-ɒ 一般口径 25 中除 GB 分流外者、待裁定可定 54、are∈GP-ar 等）；**剔除 1**：how heavy∈GP-wh-h 系 how+heavy 接缝伪字素（审计报告 §3 定性），不予入集 |
| 误收 X2（音素不在词中） | 42 词次 | **剔除**（随基底退出：含 GP-u-ʊ 整类 25、GP-t 的 -ed 词 pronounced/washed/watched——拼写无 t） |
| 误收 X1（音素由其他字母承担） | 50 词次 | **剔除/改归**（按「字素实际承担音素」复判，随基底退出原模式；其中 GP-age 的 age/page/cage/engage/outrage 5 词退出 GP-age——该模式按读音 /ɪdʒ/ 判定，不按拼写家族收，口径在此明示） |
| 误收中无法判定成员所涉 | 22 行 | **维持登记**（成员本身不可对齐判定，不计误收亦无法证真，随基底保留） |
| 无法判定成员 | 8 个 / 63 词次 | 维持登记（OK、TV、Mr、Mrs、Ms、PE、T-shirt、Dragon Boat Festival——字母名/缩略读法；Dragon Boat Festival 词库音标只覆盖前两词） |
| 真零命中成员 | 4 | 维持登记（eye：ey→/aɪ/ 无模式；you×2：整词认读；of：按任务裁定不以 /ɒv/ 硬塞 GP-o-ɒ） |
| conversion / version（审计后新增条目） | 9 词次 | 按 GB 入集：conversion∈{GP-c-k, GP-v, GP-er, GP-n, GP-sion-ʃ}、version∈{GP-v, GP-er, GP-n, GP-sion-ʃ}（sion 按 GB 读 /ʃən/） |

### 10.4 英式口径处置（终局词集 vs 审计期望集：+154 / −92，逐模式可机对）

| 类 | 处置 | 量（词次） | 说明 |
|---|---|---|---|
| BATH 迁移 | 出 GP-a-æ/GP-a-e-æ、入 GP-a-ɑː | −38 / +41 | dance、class、grass、after 等 41 词 GB 中 a 读 /ɑː/；**math 除外**（gb 表值 /mɑːθ/ 系勘误，事实为 /mæθ/，维持 GP-a-æ 并登记，见 10.7）；入集侧含 aunt、tomato（a→/ɑː/）、sparrowgrass、headmaster 等 |
| or 分流 | 出 GP-or，入 GP-o-ɒ | −7 / +5 | foreign、forest、lorry、orange、correspond 的 or 在 GB 读 /ɒ/；metaphor 的 or 读 /ə/ 无模式可归（10.6 登记） |
| yod 保留 | 入 GP-u-juː / GP-ew-juː / GP-ue-juː | +19 | student、Tuesday、due、tune、new、news 等 GB 保留 /j/；pneumonia 由审计 X2（u-ʊ 误收）在 GB 下改归 u-juː；supermarket 按表值 /sjuː-/ 入集 |
| yod 弱化退出 | 出 GP-u-juː | −5 | argument、January、conspicuous、ingenuous、invaluable 的 u 在 GB 为 /jʊ/ 弱读（无专属模式，登记）；museum、musician 按表「ju 在重音前 = /juː/」记法维持 |
| ou 分流 | 出 GP-ou-ʊ，入 GP-ou-ɔː | −4 / +3 | yourself、yourselves、tour（表值 /tɔː/）；tourist 为 /ʊə/ 无模式可归（登记） |
| oo 分流 | 出 GP-oo-uː，入 GP-oo-ʊ | −2 / +2 | classroom、bathroom 按表值 room=/rʊm/ 变体 |
| -ary 弱读 | 出 GP-a-e-any，入 GP-a-ə | −6 / +5 | dictionary、library、January 等 -ary 的 a 在 GB 读 /ə/ |
| u-ʊ 正读补入 | 入 GP-u-ʊ | +5 | popular、butcher、argument、irregular、awful（-ful 的 u） |
| i-ɪ 补入 | 入 GP-i-ɪ | +10 | giraffe、family、holiday、dolphin、foreign(er)、animate、audible、oddity、university——GB 中 i 实读 /ɪ/，GA 口径曾漏 |
| 其余补入（单项类） | 入集 | +25 | been（GB /biːn/：GP-ee、GP-e-iː-open）、either（→GP-i-aɪ-open）、zebra/leisure/enjoyable/employee（→GP-e-e）、hear（→GP-ear-ɪə）、eraser（→GP-s-z）、sunglasses（→GP-ng）、fallen（→GP-all、GP-a-w-ɔː）、awful/crosswalk（→GP-a-w-ɔː）、was/warranty/what（→GP-a-w-ɒ）、hurry/surrogate（→GP-u-ʌ）、courage（→GP-ou-ʌ）、hamburger（→GP-ur）、herself（→GP-er）、paragraph（→GP-ar）、garage/another（→GP-a-æ，按表值）、hough（→GP-ough-ɒx）、gone/in front of/yogurt（→GP-o-ɒ）等 |
| 其余退出（单项类） | 退出原模式 | −25 | heart/hearth（ear→/ɑː/，已在 GP-ear-ɑː）、hurry/courage/surrogate（出 GP-ur）、butcher/omnibus（出 GP-u-ʌ）、zebra/theatre（出 GP-e-iː-open）、worry/worried（or→/ʌ/ 无模式）、either/leisure（出 GP-ei-iː）、sandwich（ch→/dʒ/ 无模式）、grandparents（GB d 不发音）、animate（表值取形容词 /-mət/，动词 /-meɪt/ 变体登记）、waltz（出 GP-a-w-ɔː 入 GP-a-w-ɒ，按表值 /wɒls/ 变体登记）、heretic、because（au→/ɒ/ 无模式）、warranty（出 GP-ar-w）、what/fallen/restaurant（出 GP-a-ɑː：分别归 a-w-ɒ、all/a-w-ɔː、a-ə+au 登记）、concerto/strawberry（出 GP-e-e）、geyser（出 GP-y-aɪ；ey→/iː/ 词中无模式）、sunglasses（出 GP-n）、eraser（出 GP-s-s）等 |
| 无法判定维持 | 保留 | +22 | 见 10.3（对期望集呈 +22 残差，属登记类） |
| GP-r 口径 | 维持 | — | GP-r 按字母承担口径收录（含词尾非重读 r）；其英式弱读归 10.6 模式空白登记 |

逐模式增减（|Δ|≥3）：GP-a-ɑː +41/−3、GP-a-æ +3/−38、GP-u-juː +12/−5、GP-i-ɪ +10、GP-o-ɒ +8、GP-or −7、GP-a-e-any −6、GP-a-ə +5、GP-u-ʊ +5、GP-e-e +4/−2、GP-a-w-ɒ +4、GP-ew-juː +4、GP-a-w-ɔː +3/−1、GP-ou-ɔː +3、GP-ue-juː +3、GP-er +3、GP-n +3/−1、GP-m +3、GP-r +3、GP-t +3、GP-v +3（以上 +3 类含无法判定维持行与 conversion/version 入集）。其余 40 个模式为 ±1–2 单项，全量机对 = 本文件 vs 审计期望集 JSON。

### 10.5 待裁定终局：184 → 146

- 移除 38 条：审计 C1/C2 已判可定所涉 36 条（ice cream、dance、office、beautiful、fireman、quiet、vegetable(s)、beauty、quietly、quickly、February、mountain、January、service、yourselves、musician、librarian、post office、dictionary、libraries、dictionaries、restaurant、prince、ocean、quarter、table tennis、electrician、hinge、pineapple、coexist、fence、nonsense、promise、since、singe）+ thorough、borough（GA/RP 冲突由英式字段消解，按 S-42 定版入 GP-ough-ə）。
- 保留 146 条：均为真需人工裁定者（VCe 短读面例外型、对齐失败需人工核、变脸组合未成块切分等），逐条理由仍见 §5 原登记（移除者以本节为准）。

### 10.6 模式空白登记（规律层待裁定事项，本轮不新设模式）

承审计 mode_gaps 与本轮英式分流新发现，统一登记（成员数为审计口径约数）：

- 词尾弱读 -er/-or/-ur/-ar → /ə/：约 230 成员无模式可归（er 单类约 178）；
- o → /ʌ/：约 56 个核心词（come、love、mother、other…）无 GP-o-ʌ；本轮 worry/worried（or→/ʌ/）同族；
- ou → /ʊə/（tour、tourist）、au → /ɒ/（because、restaurant 的 au）、ch → /dʒ/（sandwich）、ey → /iː/ 词中（geyser）、or → /ə/（metaphor）、ere → /e/（heretic）、u → /jʊ/ 弱读类（argument、January、conspicuous、ingenuous、invaluable）、a 在 l 前（salt、salty，表值 /ɒ/）；
- 微类：o→/ʊ/、oa→/ɔː/、u/ui→/ɪ/、ei→/aɪ/、-age→/ɑːʒ/、tion→/tʃən/ 等（审计登记）；
- GP-ea-ɑː 仍空（heart 一家在本库拼作 ear，已归 GP-ear-ɑː）。

### 10.7 gb 表勘误与记法变体登记（模式归属按已核事实维持，值待原线修正）

- **勘误**（建议值）：math /mɑːθ/ → /mæθ/；gas /ɡeəs/ → /ɡæs/；heard /hɔːd/ → /hɜːd/；toy /taɪ/ → /tɔɪ/；thorough /ˈθʌrəʊ/ → /ˈθʌrə/；borough /ˈbʌrəʊ/ → /ˈbʌrə/（后两条与 S-42 定版、剑桥 UK 一致）。归属维持：math/gas∈GP-a-æ、heard∈GP-ear-ɜː、toy∈GP-oy、thorough/borough∈GP-ough-ə。
- **记法变体**（归属维持）：square /skwɜː/ 的 ɜː 为 are /eə/ 的宽式异写；gasoline 尾 /lin/ 为弱变体（引用式 /liːn/）；noisy /ˈnɔːɪzɪ/ 的 ɔːɪ 为 ɔɪ 的窄式分写；blackbird /bəːd/ 的 əː 为 ɜː 异写；your 取弱读 /jə/（归属按强读 /jɔː/ 维持 GP-ou-ɔː）；表中 ɛ 与 e 混写（end /ɛnd/ 等），渲染无碍，登记备查。
- **英式例外**：clerk、derby 在 GP-er 登记为例外（GB 中 er 读 /ɑː/，系英式特例；gb 数据正确，不改数据）。
- **happy 元音 /i/ 记法类**：piano、taxi、happiness、champion、librarian、guardian、twentieth、espionage、easier、heavier、happier、pianos——GB 词典以 /i/ 记 happy 元音，与 /ɪ/ 同族，按 ɪ 口径维持 GP-i-ɪ。

### 10.8 +60 词形条目 gpc_patterns 拼读侧复核（2026-11-02 · L1 收官）

- **范围**：动词形式补齐新增 60 条（ADD_0721–0780）的 `gpc_patterns`（动词线按家族类推填入，共 270 个模式著录），按本表推导口径（拼写含字母组合 ∧ 音标含目标音素，GP-r 按字母承担口径）并对照词库既有著录惯例逐条复核。
- **订正 29 条 / 34 处**（删 30、补 4），订正后著录 244 个：
  - 字母缺失（拼写中无此字母组合）删 4：became 的 `u_uh`、understood 的 `a_ae`、stood 的 `n_n`、lent 的 `d_d`。
  - `e_e` 误填删 22：该 e 实为分隔双字母之尾 / 词尾不发音（broke、chose、spoke、woke、rose、showed、shone、wore）、-en 弱读 /ə/（driven、eaten、forgotten、given、ridden、spoken、taken、undertaken、woken、risen）或非重读 /ɪ/（begun、began、became）——原库对三类一律不登记（cf. home、gave、open、listen、written、begin、before）。
  - ng/nk 内 `n_n` 删 4：drunk、rung、sank、sunk（/n/ 音素不在音标中，cf. sing、think 均不登记 n_n）。
  - 补入/替换 4：became 补 `a_e_ei`（cf. gave）、began 补 `a_ae`、meant 以 `ea_e` 替 `e_e`（cf. bread、head）、retold 以 `e_ee` 替 `e_e`（cf. rewrite）。
- **维持 31 条**整条不动；成例维持项：词尾与音节尾 r 的 `r_r`（forgot、forgotten、undertaken、understood，cf. forget、teacher、mother）；oo 双著录并列（undertook、stood、understood 的 `oo_u` + `oo_u_short`，cf. book、look）；knew 的 `ew_oo`（cf. new 同为 /njuː/ 亦著录 ew_oo）；worn/wore 不补 `or_aw`（原库双著录本身不一致：fork 并列 or_aw/or_or、morning 仅 or_aw）。
- **方法注记**：裁定以双条件 + 既有著录惯例为准。自建分区式 GPC 对齐器与审计 DP 口径不完全等价（分隔双字母与辅音音位存在字母重叠、A/B 两代别名双著录），仅作交叉提示，未作增删依据；本轮无「无法判定」条目。

## 11. 三条尾巴裁定（2026-11-02）

拼读 v2 升级留下的三条诚实待办，本轮全部处置：

| 尾巴 | 总量 | 已处置 | 剩余 | 剩余性质 |
|---|---|---|---|---|
| ① 主线 48 站过关组待配 | 48 站 | 补配 16 站 | 32 站 | 结构上凑不出（逐站数字与理由见 §11.1），非数据缺失 |
| ② 心词对位待核 | 38 条 | 全部裁定：可拼读 14 / 真心词 20 / 混合 4 | 0 | — |
| ③ 模式级待裁 | 146 项 | 已裁 132（补入池 43 / 复核已覆盖 64 / 例外注记 25） | 14 | 全部落在两个已登记模式缺口上（缺口 2 o→/ʌ/ 11 项、缺口 1 词尾 -er→/ə/ 3 项），待规律层裁定，本轮按纪律不解决 |

数据落点：过关组补配在侧表 `model/phonics_checkpoints.json`（本账登记第 15 行）；心词裁定位于 `phonics_wordsets.json` 的 `heart_adjudication` 节；模式待裁的逐项裁定记录位于同文件的 `pending_adjudicated` 节（132 条），`pending` 节只剩缺口 14 项。§10.2 的模式计数因本轮补入池 43 词次而变动者，以文件内 `count` 字段（已重算）为准，变动清单见 §11.4。

### 11.1 过关组补配（48 站）

**资格（程序定义，与既有 112 站的生成口径一致）**：词的全部登记模式（定版词池）站位 ≤ 本站、至少一个模式恰在本本站新达标、且包含本站模式——即「只用学到本站为止的模式恰好能拼」。**形制**：单条目（非成员形）、词形无空格/连字符/撇号、同词形去重；第一层（tier 1）只收单音节，按词频排名升序（无排名殿后）、同序 A–Z，上限 8（既有组大小实测 1–8）。**第二层（tier 2）**：仅当第一层为空、且本站模式的典型成员本就多为双音节时（词尾弱读块 / 词尾型模式），放宽到 ≤2 音节——既有先例明确：第 93–97、106 站（/əʊ/ 家族）与第 135 站（-tion）的过关组全为双音节词；既有 509 个过关词音节数实测为单音节 484 / 双音节 25 / 三音节 0，故 ≤2 为口径上限，不再放宽。音节数按 `phonetic_gb` 元音核计数（含成音节 l/m/n）。

**口径自检**：以 tier 1 严格规则对既有 160 站全量重算，与既有过关组逐站比对，142/160 站集合完全重合；资格包含关系（每个既有过关词的模式站位 ≤ 所在站、且在该站新达标）509/509 成立。不重合的 18 站差异来自定版词池在主线生成后增补了成员、/əʊ/ 家族站的选词为教材常用词取向、及个别成员归属在收官复核中调整——均为数据演进，不影响资格口径。

**补配结果：16 站**（每词的证明——模式→站位映射、最大站位、音节数——在侧表内逐词给出）：

| 站 | 模式 | 层 | 过关组 |
|---|---|---|---|
| 14 | k|/k/（GP-k） | 二 | OK、haiku |
| 53 | y|/i/（GP-y-i） | 二 | pretty、sunny、windy、body、twenty、candy、study、factory |
| 56 | a|/eɪ/（GP-a-eɪ-open） | 二 | safety、danger、April、spaceman、spaceship、baker、stranger、tasty |
| 89 | ie|/aɪ/（GP-ie-aɪ） | 二 | quiet、diet |
| 104 | ou|/əʊ/（GP-ou-əʊ） | 一 | mould、soul |
| 120 | le|/əl/（GP-le） | 二 | apple、uncle、purple、noodles、bottle、puzzle、table、circle |
| 123 | age|/ɪdʒ/（GP-age） | 二 | village、cabbage、luggage、manage、message、voyage |
| 128 | ic|/ɪk/（GP-ic） | 二 | picnic、traffic、music、magic、plastic、frolic、garlic、logic |
| 131 | sion|/ʃən/（GP-sion-ʃ） | 二 | pension、tension、version |
| 132 | sion|/ʒən/（GP-sion-ʒ） | 二 | vision |
| 136 | ture|/tʃə/（GP-ture） | 二 | picture、nature、future、creature、culture |
| 138 | a|/e/（GP-a-e-any） | 二 | many、any |
| 140 | a|/ɔː/（GP-a-w-ɔː） | 二 | water、crosswalk、fallen、awful |
| 148 | ou|/ə/（GP-ou-ə） | 二 | colour、famous、neighbour、nervous、humour、jealous、specious |
| 157 | ough|/əʊ/（GP-ough-əʊ） | 一 | dough、though |
| 159 | ough|/ʌp/（GP-ough-ʌp） | 二 | hiccough |

**仍空 32 站**（逐站漏斗：新达标词数 → 含本站模式 → 形制合格 → 一层可选 / 二层可选）：

| 站 | 模式 | 漏斗（新达标/含本站/形制/一层/二层） | 为什么凑不出 |
|---|---|---|---|
| 1 | c|/k/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 17 站才有词（如 become）凑齐全部模式。 |
| 2 | c|/s/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 31 站才有词（如 succeed）凑齐全部模式。 |
| 3 | ch|/k/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 anchor）凑齐全部模式。 |
| 4 | ch|/tʃ/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 34 站才有词（如 chieftain）凑齐全部模式。 |
| 5 | ch|/ʃ/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 48 站才有词（如 chef）凑齐全部模式。 |
| 7 | f|/f/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 16 站才有词（如 flu）凑齐全部模式。 |
| 8 | g|/dʒ/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 passenger）凑齐全部模式。 |
| 9 | g|/g/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 30 站才有词（如 regal）凑齐全部模式。 |
| 10 | gn|/n/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 50 站才有词（如 foreign）凑齐全部模式。 |
| 11 | gu|/g/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 34 站才有词（如 guilt）凑齐全部模式。 |
| 12 | h|/h/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 14 站才有词（如 haiku）凑齐全部模式。 |
| 13 | j|/dʒ/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 jam）凑齐全部模式。 |
| 15 | kn|/n/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 73 站才有词（如 knee）凑齐全部模式。 |
| 18 | mb|/m/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 lamb）凑齐全部模式。 |
| 19 | mn|/m/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 54 站才有词（如 hymn）凑齐全部模式。 |
| 21 | ng|/ŋ/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 34 站才有词（如 tongue）凑齐全部模式。 |
| 22 | nk|/ŋk/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 bank）凑齐全部模式。 |
| 24 | ph|/f/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 48 站才有词（如 alphabet）凑齐全部模式。 |
| 25 | pn|/n/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 110 站才有词（如 pneumonia）凑齐全部模式。 |
| 26 | ps|/s/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 57 站才有词（如 psalm）凑齐全部模式。 |
| 27 | pt|/t/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 61 站才有词（如 ptarmigan）凑齐全部模式。 |
| 29 | qu|/kw/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 48 站才有词（如 question）凑齐全部模式。 |
| 39 | wh|/h/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 94 站才有词（如 whole）凑齐全部模式。 |
| 40 | wh|/w/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 48 站才有词（如 when）凑齐全部模式。 |
| 41 | wr|/r/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 wrap）凑齐全部模式。 |
| 42 | x|/ɡz/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 46 站才有词（如 exact）凑齐全部模式。 |
| 43 | x|/ks/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 48 站才有词（如 annex）凑齐全部模式。 |
| 44 | x|/z/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 115 站才有词（如 xylophone）凑齐全部模式。 |
| 78 | eo|/iː/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 120 站才有词（如 people）凑齐全部模式。 |
| 124 | cian|/ʃən/ | 4/4/4/0/0 | 有 4 个新达标且含本站模式的词，但全部 ≥3 音节，超出既有 509 个过关词的 ≤2 音节口径，不凑数。 |
| 130 | ous|/əs/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 148 站才有词（如 amphibious）凑齐全部模式。 |
| 156 | ough|/ə/ | 0/0/0/0/0 | 累计模式内无词在本本站凑齐：本站模式的成员词均还依赖更晚站位，最早要到第 157 站才有词（如 borough）凑齐全部模式。 |

32 站的成因分三类：① 27 个早期辅音站——主线先教辅音、后教元音，任何实词都还差一个元音模式站（第 45 站起）才能凑齐，故辅音站天然无过关词，上表给出每站成员词最早凑齐的站位；② 第 78 站（eo）唯一成员 people 还依赖第 120 站的 -le，到第 120 站自然达标；第 130 站（ous）全部成员都还依赖更晚模式（最早第 148 站）；第 156 站（ough→/ə/）仅有的成员 thorough/borough 同时登记在第 157 站的 ough→/əʊ/ 池，在第 157 站达标（并已进入该站补配组）；③ 第 124 站（-cian）有 4 个新达标词（electrician/magician/musician/politician），但全部 ≥3 音节，超出 ≤2 音节口径，按纪律不凑数。

### 11.2 心词对位待核 38 条裁定

**方法**：逐条（多成员条目逐成员）做字母—音素对位：每个字母/字母组或由已登记模式覆盖（注明模式号），或裁为心字部分（注明无登记模式的理据与心词屋既有先例，如 mother/brother 的 -er、son/month 的 o→/ʌ/、yes/yellow 的 y→/j/、four 的词尾 r）；单音节条目另以「tiles 音素拼接 == 词库 phonetic_gb」程序校验（成音节辅音的 ə 脱落记法作等价处理），38 条全过、0 条留待。完整 tiles 数据在 `phonics_wordsets.json` 的 `heart_adjudication` 节。

裁定汇总：**可拼读 14 条**（carry、funny、giggle、little、hiccough，及代词/功能词组 a/an、I/me/my/mine、he/him/his、she/her/hers、it/its/itself、don't、this/that/these/those、who/whom、how 组）；**真心词 20 条**；**混合 4 条**（组内部分成员带心字部分）。

| 条目 | 裁定 | 心字部分（或全覆盖说明） |
|---|---|---|
| carry | 可拼读 | 全部字母/字母组均有登记模式 |
| funny | 可拼读 | 全部字母/字母组均有登记模式 |
| giggle | 可拼读 | 全部字母/字母组均有登记模式 |
| little | 可拼读 | 全部字母/字母组均有登记模式 |
| hiccough | 可拼读 | 全部字母/字母组均有登记模式 |
| the | 真心词 | the：e |
| pretty | 真心词 | pretty：e |
| better | 真心词 | better：er |
| open | 真心词 | open：e |
| laugh | 真心词 | laugh：ugh |
| over | 真心词 | over：er |
| never | 真心词 | never：er |
| together | 真心词 | together：o、er |
| ballet | 真心词 | ballet：et |
| garage | 真心词 | garage：ge |
| heir | 真心词 | heir：h、eir |
| honest | 真心词 | honest：h、e |
| leisure | 真心词 | leisure：ei、s、ure |
| mirage | 真心词 | mirage：ge |
| neither | 真心词 | neither：ei、er |
| shepherd | 真心词 | shepherd：ph、er |
| weird | 真心词 | weird：eir |
| camouflage | 真心词 | camouflage：ge |
| schnitzel | 真心词 | schnitzel：sch、tz |
| a / an | 可拼读 | 全部字母/字母组均有登记模式 |
| I / me / my / mine | 可拼读 | 全部字母/字母组均有登记模式 |
| he / him / his | 可拼读 | 全部字母/字母组均有登记模式 |
| she / her / hers | 可拼读 | 全部字母/字母组均有登记模式 |
| it / its / itself | 可拼读 | 全部字母/字母组均有登记模式 |
| don't | 可拼读 | 全部字母/字母组均有登记模式 |
| this / that / these / those | 可拼读 | 全部字母/字母组均有登记模式 |
| who / whom | 可拼读 | 全部字母/字母组均有登记模式 |
| how / how many / how much | 可拼读 | 全部字母/字母组均有登记模式 |
| you / your / yours | 真心词 | you：y、ou；your：y、r；yours：y、r |
| be / am / is / are | 混合 | are：r |
| we / us / our / ours | 混合 | our：r；ours：r |
| they / them / their / theirs | 混合 | their：eir；theirs：eir |
| some / any | 混合 | some：o |

两处与缺口登记的衔接（不冲突、两轨并行）：better/never/over/together/shepherd/neither 的词尾 -er→/ə/ 与 some 的 o→/ʌ/ 本属 §10.6 两个模式缺口的家族读音——心词屋现行口径（63 条既有心词中 mother/son 等先例）即以心字承载这类词，故本轮按心字裁定入屋；模式层将来若裁定设立 GP-er-ə / GP-o-ʌ，这批心字部分可整批迁移为可拼读。neither 的 ei 取词库 gb /ˈnaɪðə/；Cambridge 另标 /ˈniːðə/ 变体，仅登记注记，不改行。

### 11.3 模式级待裁 146 项裁定

**方法**：逐项以定版词池 + 词库（GB 转写、音节结构）复核，分四种处置：**补入池**（该读音有已登记模式而定版词池漏收，补入对应模式池，逐条校验「模式已登记、字母组在词内、音素在 GB 转写内、原非成员」）；**复核已覆盖**（该词在定版词池中已全归属，待裁为旧快照/GA 期遗留，作废）；**例外注记**（该处读音确无登记模式，按既有先例口径裁为例外并留痕，不新设模式）；**留待缺口**（未决处恰为两个已登记缺口的读音，按纪律不在本轮解决）。

**缺口计数口径**：一项计入缺口，当且仅当把它所有「有登记归属」的读音都归位后，剩下未归属的读音全部属缺口家族。据此 **14 项留待**：缺口 2（o→/ʌ/）11 项——one、done、anyone、once、some、come、love、above、become、income、glove；缺口 1（词尾 -er/-or/-ur/-ar→/ə/）3 项——flower、power、tower（三者的 -er 是其唯一未归属处；ow 已登记）。另有 5 项已裁但交叉引用缺口家族（everyone/somebody/lovely 的成员含 one/some/love、sunflower 的成员含 flower、comfortable 的首音节 o→/ʌ/），及 history/information/international/temperature 的词中 r-schwa 注记（缺口 1 登记限于词尾位，词中位不计入 14 项）——均在逐项记录中留痕，缺口计数仍以 14 为准。

| 词 | 处置 | 补入池 | 依据 / 注记 |
|---|---|---|---|
| favourite | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/：按已定版处置先例（since/hinge/office/service 的 i 均归 GP-i-ɪ）归 GP-i-ɪ；ou 弱读已归 GP-ou-ə。 |
| buy | 已裁·补入池 | GP-y-aɪ | y 读 /aɪ/ 归 GP-y-aɪ；u 静音见 note。本词原仅入 GP-b 池为部分覆盖，现补 y 的归属。；注：u 不发音（buy 为整词形例外登记 §10.4），例外注记保留。 |
| live | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）；ve 已归 GP-ve。 |
| zebra | 已裁·补入池 | GP-a-ə | 词尾 a 弱读 /ə/ 归 GP-a-ə（菜单登记覆盖单字母 a 的弱读）。 |
| orange | 已裁·例外注记 |  | a 在 -ange 中弱读 /ɪ/ 无登记模式，裁为该词例外注记；o 已归 GP-o-ɒ、ge 已归 GP-ge，待裁仅此一处。 |
| giraffe | 已裁·复核已覆盖 |  | 复核定版词池：重读 a 已归 GP-a-ɑː（BATH 面），全部归属，待裁为旧快照遗留。 |
| woman | 已裁·补入池 | GP-a-ə | 本项待裁之问为词尾 a 的 schwa 归属：归 GP-a-ə。o→/ʊ/ 另有 §10.6 微类登记，见 note。；注：o→/ʊ/ 为 §10.6 微类空白（o→/ʊ/ 无模式），注记保留待模式层处置，不属本菜单之问。 |
| twelve | 已裁·补入池 | GP-e-e | -elve 中 e 读 /e/ 归 GP-e-e（同 fence 先例）；词尾 e 为 ve 组合的静音部分。 |
| shall | 已裁·复核已覆盖 |  | 强读式 /ʃæl/ 全部归属：a 已归 GP-a-æ、ll 已归 GP-ll；待裁为双式转写对齐遗留。弱读见 note。；注：功能词弱读式 /ʃəl/ 中 a→/ə/ 为弱读变体，随强读式登记，不单独入池。 |
| minute | 已裁·例外注记 |  | u 读 /ɪ/ 无登记模式；心词屋已有先例裁定（minute 的 u→/ɪ/ 为心字部分 tiles），本项与之同口径，裁为例外注记，不另设模式。 |
| baseball | 已裁·复核已覆盖 |  | 复合词逐成员裁定：base（a-e 已登记）、ball（GP-ll）均已归属。 |
| sunflower | 已裁·复核已覆盖 |  | 复合词逐成员裁定：sun 已覆盖；flower 成员见 note。；注：成员 flower 的词尾 -er→/ə/ 属缺口 1（flower 本体在缺口待裁清单），交叉引用；本复合词不计入缺口 14 项。 |
| everyone | 已裁·复核已覆盖 |  | 复合词逐成员裁定：every 已覆盖；one 成员见 note。；注：成员 one 的 o-e→/ʌ/ 属缺口 2（one 本体在缺口待裁清单），交叉引用；本复合词不计入缺口 14 项（口径：缺口计数以独立待裁条目为准）。 |
| usually | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；词尾 y 已归 GP-y-i；s 见 note。；注：s 读 /ʒ/ 无登记模式，例外注记（同 usual）。 |
| station | 已裁·复核已覆盖 |  | 复核定版词池：已在 GP-tion 池；原对齐失败源于 gb 转写作成音节 /ʃn/ 与模式引用形 /ʃən/ 的记法差（§10.7 同类口径），非模式缺位。 |
| lovely | 已裁·复核已覆盖 |  | 复合词逐成员裁定：-ly（y→/i/）已覆盖；love 成员见 note。；注：成员 love 的 o-e→/ʌ/ 属缺口 2（love 本体在缺口待裁清单），交叉引用；本复合词不计入缺口 14 项。 |
| ninety | 已裁·复核已覆盖 |  | 分体 i-e 的 e 为静音伙伴（i 已归 GP-i-aɪ-open 登记，nine+ty 构词），核心已覆盖；待裁为分体对齐遗留。 |
| policeman | 已裁·补入池 | GP-a-ə | 复合词逐成员裁定：man 的 a 弱读 /ə/ 归 GP-a-ə；police 部分 i 已归 GP-i-iː、c 已归 GP-c-s；o 见 note。；注：成员 police 的 o 弱读 /ə/ 无登记模式（o 无 /ə/ 读法登记），例外注记。 |
| notebook | 已裁·复核已覆盖 |  | 复合词逐成员裁定：note（o 已归 GP-o-əʊ-open）、book（GP-oo-ʊ）均已归属。 |
| noodles | 已裁·补入池 | GP-le | 词尾 -le 的成音节 /l/ 归 GP-le：与 little 先例同口径（gb 作 /ˈnuːdlz/ 成音节转写，模式引用形为 /əl/），补入 GP-le 池。 |
| expensive | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）；词中 e 已归 GP-e-e；首 e 见 note。；注：首 e 读 /ɪ/ 无登记模式（GP-e 家族无 /ɪ/ 读法登记），例外注记。 |
| active | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）。 |
| action | 已裁·复核已覆盖 |  | 同 station：GP-tion 已在池，成音节 n 为转写变体。 |
| important | 已裁·复核已覆盖 |  | 复核定版词池：a 已在 GP-a-ə 池、or 已归 GP-or，全部归属，待裁为旧快照遗留。 |
| special | 已裁·例外注记 |  | 字母组 ci 读 /ʃ/ 无独立登记模式（§2.5 孤儿口径：仅 -cian/-tion 家族块登记），裁为例外注记；其余字母均已归属。 |
| safety | 已裁·复核已覆盖 |  | 分体 a-e 的 e 为静音伙伴（a 已归 GP-a-eɪ-open 登记），核心已覆盖；待裁为分体对齐遗留（同 safely 口径）。 |
| housework | 已裁·复核已覆盖 |  | 复合词逐成员裁定：house（GP-ou-aʊ）、work（GP-or-w）均已归属。 |
| everybody | 已裁·复核已覆盖 |  | 复合词逐成员裁定：every、body 均已覆盖。 |
| somebody | 已裁·复核已覆盖 |  | 复合词逐成员裁定：body 已覆盖；some 成员见 note。；注：成员 some 的 o-e→/ʌ/ 属缺口 2，交叉引用（口径同 everyone）。 |
| everything | 已裁·复核已覆盖 |  | 复合词逐成员裁定：every、thing 均已覆盖。 |
| everywhere | 已裁·复核已覆盖 |  | 复合词逐成员裁定：every、where（GP-ere 家族）均已覆盖。 |
| usual | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；u 已归 GP-u-juː；s 见 note。；注：s 读 /ʒ/ 无登记模式（字母 s 无 /ʒ/ 读法登记），例外注记。 |
| July | 已裁·例外注记 |  | u 读 /uː/：单字母 u 无 /uː/ 登记模式（GP-u 家族仅 ʌ/ʊ/uː-分体/juː），裁为例外注记；j、l、y 均已归属。 |
| national | 已裁·补入池 | GP-a-ə | -tion 已在 GP-tion 池（成音节 n 口径同 station）；词尾 -al 的 a 弱读 /ə/ 归 GP-a-ə（此处 -al 读 /əl/，非成音节 l）。 |
| schoolyard | 已裁·复核已覆盖 |  | 复合词逐成员裁定：school（GP-oo-uː 一族登记）、yard（GP-ar）均已归属。 |
| timetable | 已裁·复核已覆盖 |  | 复合词逐成员裁定：time（i-e 已登记）、table（GP-le）均已归属。 |
| hometown | 已裁·复核已覆盖 |  | 复合词逐成员裁定：home、town（GP-ow-aʊ）均已归属。 |
| spaceman | 已裁·复核已覆盖 |  | 复合词逐成员裁定：space（a-e 已登记）、man 均已归属。 |
| spaceship | 已裁·复核已覆盖 |  | 复合词逐成员裁定：space、ship（GP-sh、GP-i-ɪ）均已归属。 |
| sidewalk | 已裁·复核已覆盖 |  | 复合词逐成员裁定：side（i-e 已登记）、walk（GP-a-ɔː）均已归属。 |
| grapefruit | 已裁·复核已覆盖 |  | 复合词逐成员裁定：grape（a-e 已登记）、fruit（GP-ui）均已归属。 |
| firefly | 已裁·复核已覆盖 |  | 复合词逐成员裁定：fire 的 i 已归 GP-i-aɪ-open（-ire 长读同族登记）、fly 已归 GP-y-aɪ，均已归属。 |
| housewife | 已裁·复核已覆盖 |  | 复合词逐成员裁定：house、wife（i-e 已登记）均已归属。 |
| politely | 已裁·复核已覆盖 |  | 分体 i-e 的 e 为静音伙伴（i 已归 GP-i-aɪ-open 登记），核心已覆盖；待裁为分体对齐遗留。 |
| safely | 已裁·复核已覆盖 |  | 分体 a-e 的 e 为静音伙伴（a 已归 GP-a-eɪ-open 登记），核心已覆盖；待裁为分体对齐遗留。 |
| comfortable | 已裁·补入池 | GP-a-ə | -table 的 a 弱读 /ə/ 归 GP-a-ə（le 已归 GP-le）；其余未归属处均为缺口家族读音，见 note——本项主体可裁，缺口部分留痕不解决。；注：首音节 o 读 /ʌ/ 属缺口 2 家族读音（o→/ʌ/），交叉引用 §10.6，不在本项裁定；-or- 词中弱读 /ə/ 同 temperature 注记口径。 |
| policewoman | 已裁·补入池 | GP-a-ə | 复合词逐成员裁定：woman 部分的 a 弱读 /ə/ 归 GP-a-ə（与 woman 本体同口径；o→/ʊ/ 为 §10.6 微类注记，见 woman 项）；police 的 o 见 note。；注：成员 police 的 o 弱读 /ə/ 无登记模式，注记保留（同 policeman）。 |
| fireplace | 已裁·复核已覆盖 |  | 复合词逐成员裁定：fire、place（a-e 已登记）均已归属。 |
| eyebrow | 已裁·复核已覆盖 |  | 复合词逐成员裁定：brow（GP-ow-aʊ）已归属；成员 eye 为登记整词例外（§10.4：eye/y 归 GP-y-aɪ 且 ey 注册），按例外口径成立。 |
| eyelash | 已裁·复核已覆盖 |  | 复合词逐成员裁定：lash 已归属；成员 eye 为登记整词例外（§10.4），按例外口径成立。 |
| eyeglass | 已裁·复核已覆盖 |  | 复合词逐成员裁定：glass（GP-ss）已归属；成员 eye 为登记整词例外（§10.4），按例外口径成立。 |
| eyesight | 已裁·复核已覆盖 |  | 复合词逐成员裁定：sight（GP-igh）已归属；成员 eye 为登记整词例外（§10.4），按例外口径成立。 |
| Wednesday | 已裁·例外注记 |  | 首个 d 不发音（词源静音），无登记模式，裁为例外注记；s 已归 GP-s-z、ay 已归 GP-ay。 |
| delicious | 已裁·例外注记 |  | 字母组 ci 读 /ʃ/ 无独立登记模式，裁为例外注记（同 special 口径）；ou/ous 弱读已在池。 |
| village | 已裁·复核已覆盖 |  | 复核定版词池：已同在 GP-age 与 GP-i-ɪ 池，-age 的 i 短读与词尾块均已归属，待裁为旧快照遗留。 |
| island | 已裁·补入池 | GP-a-ə | 词中 a 弱读 /ə/ 归 GP-a-ə；s 静音见 note。；注：s 不发音（词源静音字母），例外注记。 |
| vacation | 已裁·复核已覆盖 |  | 同 station：GP-tion 已在池。 |
| information | 已裁·复核已覆盖 |  | 复核定版词池：-tion 已在 GP-tion 池；首 a 已归 GP-a-eɪ-open；or 词中弱读见 note。；注：词中 -or- 弱读 /ə/：缺口 1 家族相邻读音（词中位），交叉引用 §10.6。 |
| unusual | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；首 u 已归 GP-u-ʌ、次 u 已归 GP-u-juː；s 见 note。；注：s 读 /ʒ/ 无登记模式，例外注记（同 usual）。 |
| international | 已裁·复核已覆盖 |  | 复核定版词池：-tion 已在 GP-tion 池（成音节 n 转写口径同 station）；er 词中弱读见 note。；注：词中 -er- 弱读 /ə/：缺口 1 家族相邻读音（词中位），交叉引用 §10.6。 |
| ourselves | 已裁·复核已覆盖 |  | 复合词逐成员裁定：selves 部分（e、ve、s）已归属；our 的复合内弱化见 note。；注：成员 our 在复合词中整体读 /ɑː/（弱化形），与单独立词 /ˈaʊə/ 不同，注记保留。 |
| earthquake | 已裁·复核已覆盖 |  | 复合词逐成员裁定：earth（GP-ear-ɜː）、quake（GP-qu-kw + a-e）均已归属。 |
| magician | 已裁·复核已覆盖 |  | 复核定版词池：已在 GP-cian 池；成音节 n 转写变体同 station 口径。 |
| widely | 已裁·复核已覆盖 |  | 分体 i-e 的 e 为静音伙伴（i 已归 GP-i-aɪ-open 登记，wide+ly 构词），核心已覆盖；待裁为分体对齐遗留。 |
| peaceful | 已裁·复核已覆盖 |  | ea 已归 GP-ea-iː、ce 的 c 已归 GP-c-s，核心已覆盖；-ful 弱读见 note。；注：-ful 中 u 弱读 /ə/ 为构词尾弱读，注记保留。 |
| invitation | 已裁·复核已覆盖 |  | 同 station：GP-tion 已在池。 |
| education | 已裁·复核已覆盖 |  | 同 station：GP-tion 已在池。 |
| spacecraft | 已裁·复核已覆盖 |  | 复合词逐成员裁定：space（a-e 已登记）、craft（a 已归 GP-a-ɑː BATH 面）均已归属。 |
| hospital | 已裁·例外注记 |  | 词尾 -al 读成音节 /l/，a 为载体不发音，裁为例外注记（同 metal 口径）。 |
| factory | 已裁·例外注记 |  | o 在 /ˈfæktri/ 中脱落不发音（syncope），无登记模式，裁为例外注记；其余字母已归属（a 已归 GP-a-æ、y 已归 GP-y-i）。 |
| cleaned | 已裁·例外注记 |  | 词尾 -ed 读 /d/：§10.3 X2 定版口径：-ed 变体不单设模式；本项据此裁为例外注记（词干 clean 已全覆盖）；待裁为该定版前的旧登记。 |
| stayed | 已裁·例外注记 |  | 词尾 -ed 读 /d/：同 cleaned 口径（§10.3 X2 定版：-ed 不单设模式），裁为例外注记。 |
| washed | 已裁·例外注记 |  | 词尾 -ed 读 /t/：同 cleaned 口径（§10.3 X2 定版：-ed 不单设模式），裁为例外注记。 |
| watched | 已裁·例外注记 |  | 词尾 -ed 读 /t/：同 cleaned 口径（§10.3 X2 定版：-ed 不单设模式），裁为例外注记。 |
| leaves | 已裁·复核已覆盖 |  | 复核定版词池：ea 已归 GP-ea-iː、v 已归 GP-v、s 已归 GP-s-z，词尾 e 静音，全部归属。 |
| luggage | 已裁·补入池 | GP-i-ɪ | -age 块已在 GP-age 池；其中 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例口径），补入池。 |
| animal | 已裁·复核已覆盖 |  | 复核定版词池：首 a 已归 GP-a-æ、词尾 a 已归 GP-a-ə、i 已归 GP-i-ɪ，全部归属，待裁为旧快照遗留。 |
| police station | 已裁·复核已覆盖 |  | 短语逐词裁定：police（见 policeman note）、station（GP-tion 已归属）成立。 |
| fire station | 已裁·复核已覆盖 |  | 短语逐词裁定：fire、station（GP-tion）均已归属。 |
| square | 已裁·复核已覆盖 |  | 复核定版词池：已在 GP-are 池；gb /skwɜː/ 为 /eə/ 的宽式转写，按 §10.7 定版（SQUARE 词集维持登记不改），待裁作废。 |
| season | 已裁·例外注记 |  | o 为成音节 /n/ 的载体元音字母，不发音，无登记模式，裁为例外注记；ea 已归 GP-ea-iː、s 已归 GP-s-z。 |
| temperature | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；-ture 已在 GP-ture 池；er 词中弱读见 note。；注：词中 -er- 弱读 /ə/：缺口 1 登记限于词尾位，此为词中位，不计入缺口 1 的 14 项；作家族相邻注记，交叉引用 §10.6。 |
| history | 已裁·复核已覆盖 |  | 核心已覆盖（i 已归 GP-i-ɪ、y 已归 GP-y-i）；or 词中弱读见 note。；注：词中 -or- 弱读 /ə/：缺口 1 家族相邻读音（词中位），交叉引用 §10.6，不计入缺口 1 的 14 项。 |
| practise | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）。 |
| cousin | 已裁·例外注记 |  | i 为成音节 /n/ 的载体元音字母，不发音，无登记模式，裁为例外注记；ou 已归 GP-ou-ʌ。 |
| lonely | 已裁·复核已覆盖 |  | 核心拼读已全覆盖（o 已归 GP-o-əʊ-open、y 已归 GP-y-i）；待裁源于构词边界 e 的对齐，见 note。；注：词中 e 为 lone+ly 构词边界上的静音字母（分体 o-e 的 e），注记保留。 |
| thousand | 已裁·例外注记 |  | a 为成音节 /n/ 的载体元音字母，不发音，无登记模式，裁为例外注记；ou 已归 GP-ou-aʊ、s 已归 GP-s-z。 |
| every | 已裁·复核已覆盖 |  | 首 e 已归 GP-e-e、y 已归 GP-y-i；脱落 e 见 note。；注：词中第二个 e 脱落不发音（syncope，/ˈevri/），注记保留。 |
| have | 已裁·补入池 | GP-a-æ | a 读 /æ/ 与单字母短元音模式 GP-a-æ 的（字母，音素）对一致，归 GP-a-æ；原待裁源于分体 a-e 误切，ve 已归 GP-ve。 |
| give | 已裁·补入池 | GP-i-ɪ | 分体 i-e 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）；ve 已归 GP-ve。 |
| businessman | 已裁·例外注记 |  | 成员 business 本体多处未登记（u→/ɪ/、i 静音、e→/ə/、ss→/s/ 未入池），裁为例外注记；man 成员（a-æ、m、n）已覆盖。 |
| metal | 已裁·例外注记 |  | 词尾 -al 读成音节 /l/，a 为载体不发音，无 GP-al 登记模式，裁为例外注记；其余字母已归属。 |
| festival | 已裁·例外注记 |  | 词尾 -al 读成音节 /l/，a 为载体不发音，裁为例外注记（同 metal 口径）。 |
| Spring Festival | 已裁·复核已覆盖 |  | 短语逐词裁定：spring 已覆盖；festival 的 -al 成音节注记见 festival 项。 |
| National Day | 已裁·复核已覆盖 |  | 短语逐词裁定：national（GP-tion 已归属）、day（GP-ay）成立。 |
| New Year | 已裁·复核已覆盖 |  | 短语逐词裁定：new（GP-ew）、year（GP-ear-ɪə）均已归属。 |
| Dragon Boat Festival | 已裁·复核已覆盖 |  | 词库 phonetic_gb 仅注 dragon boat 部分、Festival 未注音（数据注音范围说明，见 §10.3 登记）；已注部分（dr/gon/boat）归属成立，本项非模式问题，裁为已说明。 |
| stomach | 已裁·补入池 | GP-a-ə | 词中 a 弱读 /ə/ 归 GP-a-ə；ch→/k/ 已归 GP-ch-k。 |
| guitar | 已裁·补入池 | GP-i-ɪ | i 读 /ɪ/ 归 GP-i-ɪ，补入池；gu 已归 GP-gu、ar 已归 GP-ar。 |
| chocolate | 已裁·补入池 | GP-a-ə | -late 中的 a 弱读 /ə/ 归 GP-a-ə（词尾 e 静音）；首 o 已归 GP-o-ɒ；第二个 o 见 note。；注：第二个 o 弱读近脱落（/ə/），单字母 o 无 /ə/ 读法登记，例外注记。 |
| cabbage | 已裁·补入池 | GP-i-ɪ | -age 块已在 GP-age 池；其中 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例口径），补入池。 |
| ancient | 已裁·例外注记 |  | 字母组 ien 读 /ʃə/ 无登记模式，裁为例外注记；与心词屋 ancient 例外 tiles（ie→/ʃ/ 心字部分）同口径，交叉引用 §11.2。 |
| ballet | 已裁·例外注记 |  | 词尾 -et 读 /eɪ/ 无登记模式；与心词裁定同口径（§11.2 ballet 心字部分），裁为例外注记，交叉引用。 |
| college | 已裁·例外注记 |  | e 在 -ege 中读 /ɪ/ 无登记模式，裁为该词例外注记；o 已归 GP-o-ɒ、ge 已归 GP-ge。 |
| equal | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；e 已归 GP-e-iː-open、qu 已归 GP-qu-kw。 |
| garage | 已裁·补入池 | GP-a-ɑː | 第二音节 a 读 /ɑː/ 归 GP-a-ɑː；词尾 ge→/ʒ/ 已在心词裁定中裁为心字部分（见 §11.2），交叉引用。 |
| giant | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；i 已在 GP-i-aɪ-open 池（§10.7 i 的 /aɪ/ 开音节口径）。 |
| gone | 已裁·复核已覆盖 |  | 复核定版词池：gone 已在 GP-o-ɒ 池——GB 口径下 o 读 /ɒ/ 有登记归属；原待裁理由为 GA 期（/ɡɔːn/）遗留，作废。 |
| guard | 已裁·复核已覆盖 |  | 复核定版词池：ar 已归 GP-ar、g 已归 GP-g-g；u 为 gu 拼写组合的静音伴随（GP-gu 登记同词），无独立音位待裁。 |
| guava | 已裁·补入池 | GP-a-ə | 词尾 a 弱读 /ə/ 归 GP-a-ə；首 a 已归 GP-a-ɑː；gu 的 u 见 note。；注：字母组 gu 中 u 读 /w/ 滑音，GP-gu 登记读法为 /ɡ/（u 静音），此 glide 无登记模式，例外注记。 |
| karate | 已裁·补入池 | GP-a-ə | 首 a 弱读 /ə/ 归 GP-a-ə；重读 a 已归 GP-a-ɑː；词尾 e 见 note。；注：词尾 e 读 /i/（外来词词尾），无登记模式，例外注记。 |
| league | 已裁·复核已覆盖 |  | 复核定版词池：ea 已归 GP-ea-iː、gu 已归 GP-gu，全部归属，待裁为旧快照遗留。 |
| loyal | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；oy 已归 GP-oy。 |
| machine | 已裁·补入池 | GP-a-ə | 词首 a 弱读 /ə/ 归 GP-a-ə；ch→/ʃ/ 已归 GP-ch-ʃ、i→/iː/ 已归 GP-i-iː。 |
| manage | 已裁·补入池 | GP-i-ɪ | -age 块已在 GP-age 池；其中 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例口径），补入池。 |
| message | 已裁·补入池 | GP-i-ɪ | -age 块已在 GP-age 池；其中 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例口径），补入池。 |
| mirage | 已裁·补入池 | GP-a-ɑː | a 读 /ɑː/ 归 GP-a-ɑː；ge 见 note。；注：词尾 ge 读 /ʒ/ 已在心词裁定中裁为心字部分（§11.2），交叉引用。 |
| nation | 已裁·复核已覆盖 |  | 同 station：GP-tion 已在池。 |
| occasion | 已裁·复核已覆盖 |  | 复核定版词池：已在 GP-sion-ʒ 池，词尾块已归属；首 o 弱读见 note。；注：首音节 o 弱读 /ə/ 无登记模式（o 无 /ə/ 读法登记），例外注记。 |
| persuade | 已裁·例外注记 |  | 分体 a-e 已在 GP-a-e 池；但首 e 弱读 /ə/（e 无 /ə/ 读法登记）与 suade 中 u 的 /w/ 滑音均无登记模式，裁为例外注记。 |
| pronounced | 已裁·例外注记 |  | 词尾 -ed 读 /t/：同 cleaned 口径（§10.3 X2 定版），裁为例外注记；ou、ce 已在池。 |
| quay | 已裁·例外注记 |  | ay 读 /iː/ 无登记模式（GP-ay 仅 /eɪ/）；心词屋 quay tiles 有同口径（ay→/iː/ 为心字部分），裁为例外注记，交叉引用 §11.2。 |
| royal | 已裁·补入池 | GP-a-ə | a 弱读 /ə/ 归 GP-a-ə；oy 已归 GP-oy。 |
| sense | 已裁·补入池 | GP-e-e | e 读 /e/ 归 GP-e-e（同 fence 先例）；ce 已归 GP-ce。 |
| voyage | 已裁·补入池 | GP-i-ɪ | -age 块已在 GP-age 池；其中 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例口径），补入池。 |
| camouflage | 已裁·补入池 | GP-a-ɑː | 第二音节 a 读 /ɑː/ 归 GP-a-ɑː（ou 弱读已归 GP-ou-ə）；ge→/ʒ/ 交叉引用心词裁定（§11.2）。 |
| guano | 已裁·例外注记 |  | 字母组 gu 中 u 读 /w/ 滑音无登记模式，裁为例外注记（同 guava note 口径）；a 已归 GP-a-ɑː、o 已归 GP-o-əʊ-open。 |
| pneumonia | 已裁·补入池 | GP-a-ə | 词尾 a 弱读 /ə/ 归 GP-a-ə；i 已在 GP-i-ɪ 池（§10.7 i 的 /i/ 口径）、u 已归 GP-u-juː；e 见 note。；注：词首 eu 中的 e 不发音（随 eu 组合，心词屋 pneumonia tiles 有同口径处理），例外注记。 |
| politician | 已裁·复核已覆盖 |  | 同 magician：GP-cian 已在池。 |
| reread | 已裁·复核已覆盖 |  | ea 已在 GP-ea-iː 池，读 /iː/ 有登记归属；ere 跨 re- 前缀边界，按 §8 边界样本定版（前缀外字母组不另裁）不构成待裁，待裁为旧登记遗留。 |
| perspective | 已裁·补入池 | GP-i-ɪ | 词尾 -ive 的 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）；词中 e 已归 GP-e-e；首 e 见 note。；注：首 e 弱读 /ə/ 无登记模式（e 无 /ə/ 读法登记），例外注记。 |
| restive | 已裁·补入池 | GP-i-ɪ | 词尾 -ive 的 i 短读 /ɪ/ 归 GP-i-ɪ（同 since 先例）；其余音节已在池。 |
| one | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e 分体读 /ʌ/：§10.6 已登记缺口 2（o→/ʌ/ 无模式，约 56 词），待规律层裁定，不在本轮解决。 |
| flower | 留待缺口裁定（缺口 1 · 词尾 -er→/ə/） | — | ow→/aʊ/ 已登记；唯一未归属处为词尾 -er→/ə/，属 §10.6 缺口 1（非重读 -er/-or/-ur/-ar→/ə/ 无模式，约 230 词），待规律层裁定。 |
| done | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | 同 one：o-e→/ʌ/ 属缺口 2，待规律层裁定。 |
| glove | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e→/ʌ/ 属缺口 2，待规律层裁定（ve 已归 GP-ve）。 |
| anyone | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | 复合 anyone 的未决处即 one 成员的 o-e→/ʌ/，属缺口 2，待规律层裁定。 |
| once | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e→/ʌ/ 属缺口 2，待规律层裁定（ce 已归 GP-ce）。 |
| tower | 留待缺口裁定（缺口 1 · 词尾 -er→/ə/） | — | 同 flower：词尾 -er→/ə/ 属缺口 1，待规律层裁定。 |
| some | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e→/ʌ/ 属缺口 2，待规律层裁定（some 在心词屋另有 o→/ʌ/ 心字裁定，两轨并行不悖）。 |
| come | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e→/ʌ/ 属缺口 2，待规律层裁定。 |
| love | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o-e→/ʌ/ 属缺口 2，待规律层裁定（ve 已归 GP-ve）。 |
| above | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | o→/ʌ/（非分体，闭音节）同属缺口 2 的 o→/ʌ/ 家族，待规律层裁定（a→/ə/ 已归 GP-a-ə）。 |
| become | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | come 成员的 o-e→/ʌ/ 属缺口 2，待规律层裁定。 |
| income | 留待缺口裁定（缺口 2 · o→/ʌ/） | — | come 成员的 o-e→/ʌ/ 属缺口 2，待规律层裁定。 |
| power | 留待缺口裁定（缺口 1 · 词尾 -er→/ə/） | — | 同 flower：词尾 -er→/ə/ 属缺口 1，待规律层裁定。 |

### 11.4 本轮数据变更清单

- `phonics_wordsets.json`：模式池补入 43 词次，涉及 7 个模式——GP-a-ə +21、GP-i-ɪ +14、GP-a-ɑː +3、GP-e-e +2、GP-a-æ +1、GP-le +1、GP-y-aɪ +1；总词次 10,117 → 10,160，各模式 `count` 与 `overview` 已同步重算（pending_total 146 → 14）。§10.2 表中受影响模式的计数以本节为准：GP-a-ə 45 → 66、GP-i-ɪ 408 → 422、GP-a-ɑː 52 → 55、GP-e-e 276 → 278、GP-a-æ 224 → 225、GP-le 66 → 67、GP-y-aɪ 35 → 36。
- `phonics_wordsets.json` 新增两节：`pending_adjudicated`（132 条逐项裁定记录）与 `heart_adjudication`（38 条心词裁定，含逐成员 tiles）。
- 新建 `model/phonics_checkpoints.json`：48 站的漏斗数字、16 站补配过关组（逐词证明）与 32 站留空理由；主线文件 `phonics-prototype-v1.html` 本轮未动，补配组待回灌时取用此侧表。
- 本轮未改任何模式的登记本身（字母—音素对集合不变），未动词库；两个模式缺口（§10.6）的裁定仍待规律层。（2026-11-02 更新：两缺口已裁定——两个模式都建，14 条全部销项入册，见 §12；§11.3 表中 14 条「留待缺口裁定」与本条文字自此以 §12 为终局。）

## 12. 两缺口入册（2026-11-02 用户裁定 · 终局）

用户裁定（2026-11-02）：§10.6 两缺口——o→/ʌ/ 与词尾 -er→/ə/——**两个模式都建**；§11.3 留待的 14 条全部销项。本节为两缺口的终局口径：§10.6 登记与 §11.3「留待缺口裁定」文字自此失效，以本节为准。执行范围：`phonics_wordsets.json`（两池入册、待裁销项、心词注记、残量登记）、`wordbank.json`（成员 gpc_patterns 回填，仅此一类改动，另 §2.3 封存注记见 vocab_MODEL §2.4）、本文件。本轮未动 App 与拼读原型文件——App 拼读菜单站数（160→162）由 App 同步线按本节数据呈现。

### 12.1 两模式登记

| 模式 | alias_key | 字素 | 音素 | 类别 / 组 | 挂法 | 成员（词次） |
|---|---|---|---|---|---|---|
| GP-o-ʌ | `o_uh` | o | /ʌ/ | 短元音 / g-short | S-34（与 u→/ʌ/ 同条：短元音 /ʌ/ 的 o 拼法面） | 57 |
| GP-er-ə | `er_uh` | er（词尾） | /ə/ | 长音菜单 / g-long（r控菜单） | S-40 + S-08（er 拼法的弱读面） | 134 |

**推导基数**：当前词库 2,352 条全量逐词判定（非仅 14 条待裁词）。此与 §10–§11 轮次的 2,287 条基线不同基：既有池与覆盖对账（entries_total 等）本轮不重算，差异已登记于 `overview.addendum_2026_11_02`，基线统一刷新待后续轮次；本节数字均为 2,352 基线的实测。

### 12.2 GP-o-ʌ：方法与全表

**对齐规则**：逐词将拼写切为元音块（双字母/多字母组合整体成块：ou/ow/oo/oa/oe/oi/oy/au/aw/ay/ai/ea/ee/ei/ey/eu/ew/ie/ue/ui/ough 等；其余单字母各自成块；r 不并入元音块，单独作辅音），将 `phonetic_gb` 切为音位（长元音、双元音、集中双元音整体记），两列按序对齐；词尾静音 e（前为辅音块）脱落后再对齐，分体 VCe 的元音字母仍记其本块。短语词按词元逐段对齐，occ 为整串坐标；复合词头按成员级口径（§2 第 6 点）。

**入册判据**：某处字母块恰为单字母 `o`（含分体 o-e 的 o），且其对齐音位为 /ʌ/。多 o 词逐处判，逐处记 occ。o 后接 r 时：若音位列为 /ʌ/ + 独立 /r/（r 作下一音节首音），仍入册（worry、borough 型）；若 o 与 r 化合为 /ɜː//ɔː/（word、sorry 型），音位已非 /ʌ/，不入。

**排除判据**（/ʌ/ 由他块承担者不入本池，各归其池）：ou（country、countryside、courage、double、touch、trouble、young、younger → GP-ou-ʌ）、oo（blood、flood → GP-oo-ʌ）、ough（enough、rough、tough、slough、hiccough → ough 家族池）、oe（does，全库仅此一词，登记备查见 §12.4）、u（/ʌ/ 的主池 GP-u-ʌ，133 词次）。o 本身不承担 /ʌ/ 的候选词逐词核毕：instruction（/ʌ/ 由 u 承担，o 属 -tion 读 /ə/）、cousin（ou 承担，且系 S-42 已登记例外族）、mutton（u 承担，o 在音节尾鼻音前不发音）、combustion / compulsion（u 承担，o 读 /ə/）、unconscious（o 读 /ɒ/）、of（GB /ɒv/——其 GA 标音为 /ʌv/，按 RP 统一裁定以 GB 为准，不入；此条与 worry 的 GA/GB 分歧互为镜像，见复算）。

**手工裁定 10 词**（自动对齐因复合静音 e、音节尾辅音、io 合并、y 元音化失败，逐词按 GB 人工对齐入册）：something（some 段 e 静音，o→/ʌ/）、wonderful（ful 为音节尾 l 无元音，o→/ʌ/）、lovely（love 段 e 静音）、sometimes（some/times 两处 e 均静音，只取 some 的 o）、someone（两处 o 皆 /ʌ/，occ 两落点）、somebody（首 o→/ʌ/，次 o→/ɒ/ 只取首处）、somewhere（some 的 o）、tongue（o→/ʌ/，ue 不发音）、onion（io 合并读 /ə/，首 o→/ʌ/）、anyone（y 在此作元音 /ɪ/，one 段 o→/ʌ/，occ [3,4)）。

**复算（三路独立）**：① 音节配对法（以词库 syllables 切分字段对齐）：可裁 14 词与入册表全等，无溢出、无坐标差。② GA 字段交叉法（以 GA `phonetic` + 独立正则分块器重跑全库）：2,101 条全等；分歧仅 3 条——worry/worried（GA /ˈwɜːri/ 为 r 化记法，GB /ˈwʌri/ 为准，入册）与 of（GA /ʌv/、GB /ɒv/，以 GB 为准，不入），均属 RP 统一裁定下的 GA/GB 体系差，已逐条裁定。③ 该法未决 14 词（静音 e 复合族等）即上列手工裁定 10 词 + cousin/mutton/unconscious/everyone 之属，去向已逐词登记（everyone 由主法对齐入册，余三词排除，理由如上）。

**成员全表（57 词次，含词条与 occ；机读表见 phonics_wordsets.json `GP-o-ʌ`）**：

| 词 | 条目 | phonetic_gb | occ |
|---|---|---|---|
| above | V6_核心_39 | /əˈbʌv/ | [2,3) |
| among | V6_核心_45 | /əˈmʌŋ/ | [2,3) |
| another | ADD_0410 | /ænˈʌðə/ | [2,3) |
| anyone | G5_0429 | /ˈeniwʌn/ | [3,4) |
| become | ADD_0018 | /bɪˈkʌm/ | [3,4) |
| borough | ADD_0337 | /ˈbʌrə/ | [1,2) |
| brother | G2_061 | /ˈbrʌðə/ | [2,3) |
| color | V6_颜色_1 | /ˈkʌlə/ | [1,2) |
| colour | G2_0452 | /ˈkʌlə/ | [1,2) |
| colourful | G4_0453 | /ˈkʌləfəl/ | [1,2) |
| come | V6_日常_2 | /kʌm/ | [1,2) |
| comfortable | G5_0874 | /ˈkʌmfətəbəl/ | [1,2) |
| company | V6_城市_26 | /ˈkʌmpəni/ | [1,2) |
| cover | G5_0474 | /ˈkʌvə/ | [1,2) |
| discover | G6_0473 | /dɪˈskʌvə/ | [4,5) |
| done | G3_KA05 | /dʌn/ | [1,2) |
| everyone | G4_0425 | /ˈevriwʌn/ | [5,6) |
| front | G3_K22 | /frʌnt/ | [2,3) |
| glove | G4_201 | /ɡlʌv/ | [2,3) |
| government | ADD_0517 | /ˈɡʌvənmənt/ | [1,2) |
| grandmother | G2_064 | /ˈɡrænˌmʌðə/ | [6,7) |
| grandson | G5_0772 | /ˈɡrændsʌn/ | [6,7) |
| honey | V6_食物_27 | /ˈhʌni/ | [1,2) |
| honeybee | G3_0765 | /ˈhʌnibiː/ | [1,2) |
| in front of | V6_核心_42 | /ɪn frʌnt ɒv/ | [5,6) |
| income | ADD_0156 | /ˈɪnkʌm/ | [3,4) |
| lovable | ADD_0565 | /ˈlʌvəbəl/ | [1,2) |
| love | V6_日常_63 | /lʌv/ | [1,2) |
| lovely | G4_0542 | /ˈlʌvli/ | [1,2) |
| Monday | G5_210 | /ˈmʌndeɪ/ | [1,2) |
| money | G4_K03 | /ˈmʌni/ | [1,2) |
| monkey | G1_018 | /ˈmʌŋki/ | [1,2) |
| month | V6_节日_2 | /mʌnθ/ | [1,2) |
| mother | G2_065 | /ˈmʌðə/ | [1,2) |
| nothing | G5_0435 | /ˈnʌθɪŋ/ | [1,2) |
| once | G5_0587 | /wʌns/ | [0,1) |
| one | G1_025 | /wʌn/ | [0,1) |
| onion | V6_食物_51 | /ˈʌnjən/ | [0,1) |
| other | ADD_0593 | /ˈʌðə/ | [0,1) |
| some | V6_数字_47 | /sʌm/ | [1,2) |
| some / any（成员 some） | G4_P09#0 | /sʌm/ /ˈeni/ | [1,2) |
| somebody | G5_0428 | /ˈsʌmˌbɒdi/ | [1,2) |
| someone | G5_0427 | /ˈsʌmwʌn/ | [1,2) [5,6) |
| something | G4_0432 | /ˈsʌmθɪŋ/ | [1,2) |
| sometimes | G5_0418 | /ˈsʌmtaɪmz/ | [1,2) |
| somewhere | G5_0438 | /ˈsʌmweə/ | [1,2) |
| son | V6_家庭_18 | /sʌn/ | [1,2) |
| stomach | V6_身体_19 | /ˈstʌmək/ | [2,3) |
| stomachache | V6_身体_32 | /ˈstʌməkeɪk/ | [2,3) |
| thorough | ADD_0293 | /ˈθʌrə/ | [2,3) |
| ton | V6_数字_44 | /tʌn/ | [1,2) |
| tongue | V6_身体_8 | /tʌŋ/ | [1,2) |
| won | V6_MORPH_57 | /wʌn/ | [1,2) |
| wonder | G5_0448 | /ˈwʌndə/ | [1,2) |
| wonderful | G4_0449 | /ˈwʌndəfl/ | [1,2) |
| worried | G6_284 | /ˈwʌrid/ | [1,2) |
| worry | V6_日常_60 | /ˈwʌri/ | [1,2) |

其中 o+r 型 4 词：borough、thorough、worry、worried；双成员并挂（本池与 GP-er-ə 同挂）8 词：another、brother、cover、discover、grandmother、mother、other、wonder；短语条目 1：in front of（front 的 o）；成员级单位 1：some / any 的 some 成员（G4_P09#0）。

### 12.3 GP-er-ə：方法与全表

**入册判据**（三条全合）：① 词尾字母组合为 `er` 且非 `eer`（短语条目以末词元判）；② `phonetic_gb` 词尾音段为 /ə/——含三合/双元音末段（flower /aʊə/、player /eɪə/）与词库的 /əː/ 尾记法（teacher、center、waiter、bigger 四词的 -er 尾在词库记作 əː，按词尾弱读同类入册，记法登记于此）；③ 该词尾元音非重读音节。-ier 比较级条款：easier、happier 在词库记作 i+/ə/、heavier 记作 /ɪə/，三词同属「词干 -i 担一元音、词尾 -er 担 /ə/」的构形，按同一对齐入册，记法差异登记于此（与 -eer 的整块 /ɪə/ 严格区分）。

**排除全表（6 词）**：beer、cheer、deer、engineer（拼法为 -eer 整块，读 /ɪə/，归 GP-eer 等长音菜单）；her /hɜː/、refer /rɪˈfɜː/（er 读重读 /ɜː/，归 GP-er）。

**复算**：以 GA 字段做独立交叉（GA 词尾 -er 读 /ər/ 且 GB 词尾音段为 ə/əː 者入册）：134/134 与入册表全等，零分歧（含 heavier、police officer 均同落）。

**与 §10.6 约数的口径差登记**：§10.6 记「约 230 成员（er 单类约 178）」系 RP 统一裁定前以 GA 标音粗估；本次按 GB 实测：全库词尾 -er/-eer 拼法候选共 140 词，入册 134、排除 6，以实测为准，约数作废。

**成员全表（134 词，A–Z；机读表含条目与 occ 见 phonics_wordsets.json `GP-er-ə`）**：

after、anger、another、answer、baker、better、bigger、brother、butcher、butter、center、character、cleaner、clever、climber、clover、computer、conquer、corner、cover、cucumber、dancer、danger、daughter、December、differ、dinner、discover、dodger、driver、easier、either、eraser、farmer、faster、father、feather、fever、finger、firefighter、flower、foreigner、gardener、geyser、goalkeeper、granddaughter、grandfather、grandmother、grasshopper、hamburger、happier、headmaster、heavier、hotter、however、keeper、ladder、laser、leader、learner、letter、moreover、mother、neither、never、newspaper、November、number、October、offer、officer、older、order、other、over、oyster、painter、paper、partner、passenger、pitcher、player、police officer、power、quarter、reader、remember、reporter、river、rooster、ruler、runner、September、shopkeeper、shorter、shoulder、shower、silver、singer、sister、smaller、soccer、speaker、spider、stranger、stronger、suffer、summer、sunflower、supper、sweater、swimmer、taller、teacher、thinner、thunder、tiger、timber、together、tower、traveller、under、villager、waiter、water、weather、winner、winter、wonder、woodpecker、worker、writer、younger、zookeeper

### 12.4 残量登记与侧发现

- **-or / -ar 词尾弱读残量**：§10.6 缺口 1 原登记含 -or/-ur/-ar，本轮裁定只建 -er 一类。-or 15 词（actor、anchor、author、bachelor、color、doctor、editor、inventor、liquor、metaphor、mirror、motor、spectator、terror、visitor）、-ar 5 词（calendar、irregular、popular、sugar、unpopular）词尾弱读 /ə/ 未裁，已登记入 `registrations` 待裁；-ur 词尾弱读全库无纯例（colour、hour、neighbour 等为 -our 拼法，归 ou 家族，不在此列）。
- **oe→/ʌ/**：全库仅 does 一词，不单独立模式，已登记入 `registrations` 备查。
- **侧发现（既有数据，本轮未改）**：GP-o-ɒ 收录 in front of 的成员归属（由 of 承担 /ɒ/）无误，但其 occ 标为 [5,6)——落在 front 的 o 位；按 gb /ɪn frʌnt ɒv/ 对齐应为 [9,10)（of 的 o 位），坐标疑误，登记待原线复核。本词 front 的 o 已按 GB 入本节 GP-o-ʌ（occ [5,6)），两池著录并存如上。

### 12.5 联动变更清单

- `phonics_wordsets.json`：模式 167 → 169；`pending` 14 条全部移入 `pending_adjudicated`（132 → 146 条，状态 resolved_assign，逐条 basis 指向本节）；`overview`：pending_total 14 → 0、total_appearances 10,160 → 10,351、per_category 短元音 9 模式/1,450 词次 → 10/1,507、长音菜单 65/1,404 → 66/1,538，并加 `addendum_2026_11_02` 基线说明；`registrations` 新增 2 条（-or/-ar 残量、oe-does）。
- **心词注记**（`heart_adjudication` 内，文本更新，心字裁定本身不变）：援引缺口 1 的 -er 部件注记 6 处、援引缺口 2 的 o 部件注记 1 处、some 条注记 1 处，均由「未登记模式」改为「已入册（GP-er-ə / GP-o-ʌ，§12）」。her 条注记中以「弱读 /ə/ 缺口位」作对位语者 1 处经核留置：其语义为重读位与弱读位之别，不因入册改变，不在本轮改动范围。
- `wordbank.json`：成员回填 `gpc_patterns` 共 183 条条目（o_uh 57 条目、er_uh 134 条目、双挂 8 条目），一律追加于原列表之尾，原有标记零改动；另 define、inflammable 两条 morphemes.note 追加封存标记（属 §2.3 裁定，见 vocab_MODEL §2.4 封存拆分小节）。除此之外词库零变化（逐条比对断言通过）。
