# 决策 35 A2 第 2 批 · Dolch 视觉高频词对照

- 来源：Dolch, E. W. "A Basic Sight Vocabulary", *The Elementary School Journal* 36(6), 1936；*Problems in Reading*, 1948。按 Wikipedia「Dolch word list」(https://en.wikipedia.org/wiki/Dolch_word_list ，oldid=1362792935) 的非名词 service words 分级转录（该页 2nd Grade 列 47 词，合计 221 个）→ `dolch220.json`。
- 改前词库有 201 / 221，缺 20。改后 221 / 221（`kebiaocheck.py` 起必须全覆盖，别名词条也算）。
- 缺的 20 个：9 个新建完整词条（into、soon、as、around、off、pull、upon、own、shall；音标 CMUdict + Wiktionary，例句补写只用课标词）；11 个是屈折 / 缩写形式，建别名词条并到原形（WORD_ALIAS，主卡显示「过去式：said」类标签，运行时不进单词列表）：said → 过去式、goes → 三单、going → 现在分词、does → 三单、done → 过去分词、don't → 否定缩写、has → 三单、got → 过去式、been → 过去分词、could → 过去式、would → 过去式。
- 顺带：A2 第 1 批补了 be / good / bad 原形后，原来没原形的 6 个 V6_MORPH 变形词并到原形：was / were → be（过去式），better / best → good（比较级 / 最高级），worse / worst → bad（比较级 / 最高级）。WORD_ALIAS 51 → 68 条。
- 打标签：Dolch 词挂到第一个非别名词条（词组词条如 be / am / is / are 取最早一级），首屏字段 `dolch` = pre-primer / primer / grade1 / grade2 / grade3，共 202 个词条（grade3 41、grade2 41、primer 47、pre-primer 38、grade1 35）。界面暂未显示该标签（A5 / 闪认训练再用）。
- 视觉词 ≠ 不规则词：`sight_type = irregular`（闪认训练只练这类）没有改；Dolch 表里大多数词可以按拼读规则读出（Wikipedia 同页也指出），是否把 said / the / of 等扩进闪认训练待定。

| 级别 | 词 | 词库词条 |
|---|---|---|
| pre-primer | a | G1_K01 |
| pre-primer | and | V6_核心_57 |
| pre-primer | away | G4_0420 |
| pre-primer | big | G2_068 |
| pre-primer | blue | G1_032 |
| pre-primer | can | G1_K03 |
| pre-primer | come | V6_日常_2 |
| pre-primer | down | G3_K20 |
| pre-primer | find | V6_日常_19 |
| pre-primer | for | V6_核心_49 |
| pre-primer | funny | G3_0821 |
| pre-primer | go | V6_日常_1 |
| pre-primer | help | G3_0442 |
| pre-primer | here | G2_0595 |
| pre-primer | I | G1_P01, V6_核心_0 |
| pre-primer | in | G3_140 |
| pre-primer | is | G3_K01 |
| pre-primer | it | G2_P05, V6_核心_13 |
| pre-primer | jump | G2_085 |
| pre-primer | little | V6_数字_54 |
| pre-primer | look | V6_日常_16 |
| pre-primer | make | V6_日常_4 |
| pre-primer | me | G1_P01, V6_核心_1 |
| pre-primer | my | G1_P01, V6_核心_2 |
| pre-primer | not | G3_K05 |
| pre-primer | one | G1_025 |
| pre-primer | play | G2_0489 |
| pre-primer | red | G1_034 |
| pre-primer | run | G2_087 |
| pre-primer | said | G3_KA01 |
| pre-primer | see | V6_日常_17 |
| pre-primer | the | G1_K02 |
| pre-primer | three | G1_029 |
| pre-primer | to | V6_核心_48 |
| pre-primer | two | G1_030 |
| pre-primer | up | G3_K19 |
| pre-primer | we | G3_P06, V6_核心_15 |
| pre-primer | where | G3_Q03 |
| pre-primer | yellow | G1_036 |
| pre-primer | you | G1_P02, V6_核心_4 |
| primer | all | V6_数字_49 |
| primer | am | G3_K01 |
| primer | are | G3_K01 |
| primer | at | V6_核心_37 |
| primer | ate | V6_MORPH_22 |
| primer | be | G3_K01 |
| primer | black | G1_031 |
| primer | brown | G3_112 |
| primer | but | V6_核心_58 |
| primer | came | V6_MORPH_35 |
| primer | did | V6_MORPH_24 |
| primer | do | V6_日常_3 |
| primer | eat | V6_日常_15 |
| primer | four | G1_023 |
| primer | get | V6_日常_0 |
| primer | good | G3_K08 |
| primer | have | V6_日常_5 |
| primer | he | G2_P03, V6_核心_7 |
| primer | into | G3_K40 |
| primer | like | V6_日常_64 |
| primer | must | G3_K03 |
| primer | new | V6_服装_39 |
| primer | no | G1_K04 |
| primer | now | G3_K23 |
| primer | on | G3_142 |
| primer | our | G3_P06, V6_核心_17 |
| primer | out | G3_K21 |
| primer | please | G4_K01 |
| primer | pretty | G2_070 |
| primer | ran | V6_MORPH_37 |
| primer | ride | G2_086 |
| primer | saw | V6_MORPH_21 |
| primer | say | G3_0625 |
| primer | she | G2_P04, V6_核心_10 |
| primer | so | V6_核心_61 |
| primer | soon | G3_K41 |
| primer | that | G3_P08, V6_核心_24 |
| primer | there | G2_0596 |
| primer | they | G3_P07, V6_核心_19 |
| primer | this | G3_P08, V6_核心_23 |
| primer | too | V6_核心_74 |
| primer | under | G3_143 |
| primer | want | V6_日常_66 |
| primer | was | V6_MORPH_26 |
| primer | well | G3_K27 |
| primer | went | V6_MORPH_20 |
| primer | what | G3_Q01 |
| primer | white | G1_035 |
| primer | who | G3_Q02, V6_核心_28 |
| primer | will | G3_K02 |
| primer | with | V6_核心_50 |
| primer | yes | G1_K05 |
| grade1 | after | V6_核心_56 |
| grade1 | again | G3_K24 |
| grade1 | an | G1_K01 |
| grade1 | any | G4_P09, V6_数字_48 |
| grade1 | as | G3_K42 |
| grade1 | ask | V6_学校_69 |
| grade1 | by | V6_核心_53 |
| grade1 | could | G3_KA10 |
| grade1 | every | V6_数字_52 |
| grade1 | fly | G2_084 |
| grade1 | from | V6_核心_47 |
| grade1 | give | V6_日常_8 |
| grade1 | going | G3_KA03 |
| grade1 | had | V6_MORPH_25 |
| grade1 | has | G3_KA07 |
| grade1 | her | G2_P04, V6_核心_11 |
| grade1 | him | G2_P03, V6_核心_8 |
| grade1 | his | G2_P03, V6_核心_9 |
| grade1 | how | G3_Q08, V6_核心_34 |
| grade1 | just | V6_核心_71 |
| grade1 | know | G3_0626 |
| grade1 | let | G3_K13 |
| grade1 | live | G3_0653 |
| grade1 | may | G5_0608 |
| grade1 | of | V6_核心_54 |
| grade1 | old | G1_0574 |
| grade1 | once | G5_0587 |
| grade1 | open | V6_日常_10 |
| grade1 | over | V6_核心_40 |
| grade1 | put | V6_日常_9 |
| grade1 | round | V6_颜色_21 |
| grade1 | some | G4_P09, V6_数字_47 |
| grade1 | stop | V6_交通_34 |
| grade1 | take | V6_日常_6 |
| grade1 | thank | G1_0852 |
| grade1 | them | G3_P07, V6_核心_20 |
| grade1 | then | G4_0597 |
| grade1 | think | G3_0631 |
| grade1 | walk | V6_交通_52 |
| grade1 | were | V6_MORPH_27 |
| grade1 | when | G5_Q04 |
| grade2 | always | G5_0419 |
| grade2 | around | G3_K43 |
| grade2 | because | V6_核心_60 |
| grade2 | been | G3_KA09 |
| grade2 | before | V6_核心_55 |
| grade2 | best | V6_MORPH_61 |
| grade2 | both | V6_数字_50 |
| grade2 | buy | G3_0650 |
| grade2 | call | G5_K03 |
| grade2 | cold | G2_096 |
| grade2 | does | G3_KA04 |
| grade2 | don't | G3_KA06 |
| grade2 | fast | G2_0579 |
| grade2 | first | G5_244 |
| grade2 | five | G1_022 |
| grade2 | found | V6_MORPH_54 |
| grade2 | gave | V6_MORPH_36 |
| grade2 | goes | G3_KA02 |
| grade2 | green | G1_033 |
| grade2 | its | G2_P05, V6_核心_14 |
| grade2 | left | V6_交通_42 |
| grade2 | made | V6_MORPH_34 |
| grade2 | many | V6_数字_45 |
| grade2 | off | G3_K44 |
| grade2 | or | V6_核心_59 |
| grade2 | pull | G3_K45 |
| grade2 | read | G2_0492 |
| grade2 | right | G3_0600 |
| grade2 | sing | G2_088 |
| grade2 | sit | G3_K11 |
| grade2 | sleep | G3_0512 |
| grade2 | tell | G3_0623 |
| grade2 | their | G3_P07, V6_核心_21 |
| grade2 | these | G3_P08, V6_核心_25 |
| grade2 | those | G3_P08, V6_核心_26 |
| grade2 | upon | G3_K46 |
| grade2 | us | G3_P06, V6_核心_16 |
| grade2 | use | G4_0443 |
| grade2 | very | V6_核心_76 |
| grade2 | wash | V6_身体_42 |
| grade2 | which | G5_Q06 |
| grade2 | why | G5_Q05 |
| grade2 | wish | V6_日常_62 |
| grade2 | work | V6_职业_1 |
| grade2 | would | G3_KA11 |
| grade2 | write | G3_0487 |
| grade2 | your | G1_P02, V6_核心_5 |
| grade3 | about | V6_核心_52 |
| grade3 | better | V6_MORPH_60 |
| grade3 | bring | V6_日常_7 |
| grade3 | carry | G3_0387 |
| grade3 | clean | G5_250 |
| grade3 | cut | V6_日常_47 |
| grade3 | done | G3_KA05 |
| grade3 | draw | G3_0790 |
| grade3 | drink | V6_食物_57 |
| grade3 | eight | G1_021 |
| grade3 | fall | V6_天气_4 |
| grade3 | far | V6_交通_48 |
| grade3 | full | V6_身体_58 |
| grade3 | got | G3_KA08 |
| grade3 | grow | G4_0581 |
| grade3 | hold | V6_日常_44 |
| grade3 | hot | G2_098 |
| grade3 | hurt | V6_身体_38 |
| grade3 | if | V6_核心_62 |
| grade3 | keep | G4_0802 |
| grade3 | kind | G3_0527 |
| grade3 | laugh | V6_日常_56 |
| grade3 | light | G4_157 |
| grade3 | long | G3_137 |
| grade3 | much | V6_数字_46 |
| grade3 | myself | G5_0612 |
| grade3 | never | V6_核心_69 |
| grade3 | only | G4_0585 |
| grade3 | own | G3_K47 |
| grade3 | pick | V6_日常_75 |
| grade3 | seven | G1_026 |
| grade3 | shall | G3_K48 |
| grade3 | show | V6_日常_38 |
| grade3 | six | G1_027 |
| grade3 | small | G2_072 |
| grade3 | start | V6_日常_24 |
| grade3 | ten | G1_028 |
| grade3 | today | G2_0414 |
| grade3 | together | V6_核心_79 |
| grade3 | try | V6_日常_23 |
| grade3 | warm | G2_101 |
