# 自然拼读模式词集 · 全量推导说明（PHONICS_WORDSETS）

> 数据文件：`model/phonics_wordsets.json`（本文件为其评审文档）。重推导日期 2026-11-01（数据收官）。
> 硬要求（用户）：词库中满足某个拼读规律的词，必须**全部**出现在该规律下——本推导即全量判定，不挑例词。
> 本版按最终词库（2,285 条）全量重跑；复合词头按**成员级**推导（§2 第 6 点）；与旧版（1,959 条）的差异逐项说明见 §8。

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

口径差登记：模式音素为 RP 形而成员词卡音标为 GA 形的词次共 339（涉 26 个模式），逐模式计数见 closing_validation.md——按用户裁定冻结现状，不作误收/漏收处理。
