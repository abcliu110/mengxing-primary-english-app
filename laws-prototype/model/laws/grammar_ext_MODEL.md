# 语法区扩展建模文档 · TA + CO + QI（波次 C2）

> 配套文件：`grammar_ext.yaml`（50 条类型化条目）、`../hitching/grammar_ext_hitching.yaml`（挂接表）。入模依据：`docs/DESIGN.md` §3 schema 与 §3.2 分型硬门槛；词库规则见 `../WORDBANK.md`。内容来源唯一：专家规律清单 v6 的 TA / CO / QI 三组全文，逐条按清单口径入模，**不自编**（纪律见 §5）。
> 状态：波次产出 v1（2026-11-01）。50 条 status 均为「入模中」——原因与待补清单见 §6，完成待补后方可转「已入模」并过校验层全闸。

## 1. 范围与编号

| 组 | 条数 | 编号 | 内容 | order 段 |
|---|---|---|---|---|
| TA | 18 | TA-01 – TA-18 | 时态与体（两时两体、完成体、将来借工具、汉英对比、习得顺序与证据边界） | 101–118 |
| CO | 17 | CO-01 – CO-16、CO-17 | 构式（模具义、双宾、致使移动、结果、存现、被动、搭配形式面、空心动词） | 201–217 |
| QI | 15 | QI-01 – QI-15 | 疑问与信息（疑问词分工与词源、倒装、end-focus、语调、答问系统、发展阶段） | 301–315 |

- 区属统一为「语法」，条目内 `group` 与 `id` 保留清单原编号，与图鉴、清单对账。
- CO-17 在清单 v6 中位于 V 簇之后单列（多义波次附带），本波次按任务口径归 CO 组入模，编号不变。
- order 采用组内分段编号，仅定本文件内的默认学习顺序；与 GR 组波次（语法区主体）集成时须统一重排并写入总账。

## 2. 分型口径（claim 四型）

本波次分型结果：**rule 30 / tendency 15 / etymology 5 / mnemonic 0**。全数通过 DESIGN §3.2 硬门槛复验（脚本校验：rule 例证 supports ≥2、tendency scope + exceptions ≥1 且 statement 无绝对化措辞、etymology source 必填）。

判定原则（按条目原文的自我定性走，不升格、不降格之外另行裁决）：

- **rule**：可判定对错的语法事实与机制断言。TA 的形态/定位类（TA-02、04、06、07、09、13、15）、CO 的构式义与门禁类（CO-01–09、13、14、16、17）、QI 的结构与分工类（QI-01、04、07、10、11、12、13）归此型。
- **tendency**：条目原文自带「倾向/常态/部分对应/统计大势」定性的，一律降为 tendency 并把原文的限定语写进 scope、把原文登记的变体/反例写进 exceptions：TA-08（距离通义，种子级呈现）、TA-14（历史现在时）、TA-16（了/过部分对应）、TA-17（习得顺序）、TA-18（证据评议：阳性与持平并存，内建例外即 Bielak & Pawlak 持平结果）、CO-10/11/12（习得与加工倾向）、CO-15（形合/意合大势，清单已裁定降格）、QI-05（end-focus 常态）、QI-06（状语排队，清单已裁定由定律降格）、QI-08（语调统计配对）、QI-09（Why 答语分工，纠「必用」）、QI-14（发展阶段）、QI-15（真缺口机制）。
- **etymology**：叙事主体是来源演变的五条：TA-10（will 意愿→将来）、TA-11（be going to 移动→将来）、TA-12（完成体源于所有格结果结构）、QI-02（*kʷo- / *to- 两词族）、QI-03（hwæs→whose、hwȳ→why 格变化石）。五条均带 source；TA-10/11/12 沿项目既有 etym 登记（g25-etym、g24-etym、纲领裁定），QI-02/03 的词源均有原书/词源学登记。**注意 TA-11 的双面性**：其「与 will 分工」面是倾向，已写入 scope，不另立 tendency。
- **mnemonic = 0 是有意的**：本波次没有一条以口诀为核心断言。唯一相关项是 QI-02 登记的旧「换字母得答词」押韵口诀——清单裁定其为伪规律、口诀只能以 mnemonic 型另行入模并回连真 claim（QI-02）。本波次在 QI-02 的 scope 中登记此纪律，口诀本体待后续波次按 mnemonic 型立条（linked_claim → QI-02），不混进本条 claim。

## 3. 谓词与挂接用法

- 语法区的菜单谓词（DESIGN §5）走 `pos_tags` / 功能词标记：本组条目不直接定义谓词，但其例词集合即语法区「按词性取词」的首批实证面——如 TA 组例词以动词为纲、QI 组以疑问词与功能词为纲。
- 挂接表 `grammar_ext_hitching.yaml` 由本文件全部 `word_ids`（例证 + 例外）与 `anchors`（机制锚点）反向生成：**138 个词 → law_refs**。它是词库 `law_refs` 字段回填的直接输入（回填动作在集成波次统一执行，本波次未动 wordbank.json）。
- 例词解析口径与覆盖审计一致：word 精确命中 → 复合词头拆分与 aliases → verb_form_of 与常规屈折归一（-ing/-ed 脱尾与双写还原、-ied→y 等）。解析未命中的词**不猜 id**，逐条登记在对应条目的 `adult.pending`（待补词）与例证的 `pending_words` 字段，清单汇总见 §6.3。
- CO-17 的 **sb 占位符**：按清单边界纠正后的规范形 give sb a call 入模；例句以 Give me a call. 呈现，sb 在例证上以 `placeholder: sb` 登记——占位符不入词库、不计库外词（与覆盖审计 (d) 类口径一致）。

## 4. CO-17 专项口径

- 五构造与例句按 **Collins 词典 get 条原文级核对**结果入模：① got a letter（清单登记原例）② getting dark ③ got to the station at six ④ got hit by a car / got married ⑤ got him to help me，另加 Collins 登记的 get angry、get home late 两例作第 3 级。空心结构标本 have a look / make a decision / give sb a call 按 COBUILD (1990: 147) 与 British Council 教学页登记口径入模。
- 本条是本波次唯一 probes 齐备的条目：引用探针库 v1 第五组 **PRB-CO17-1 – PRB-CO17-5**（get 通解误读 / get 被动味丢失 / 构造⑤混淆 / 空心可互换误读 / 五构造当全集）。
- 边界与分歧原样保留：五构造非全集、空心动词搭配分工残迹入 scope；词汇法理论地位之争入 adult.disputes，不裁决。

## 5. 不自编纪律的执行

- **病例（error_cases）只收清单登记的错形**，共 12 例、分布在 11 条：TA-06（标题错例）、TA-07（*I am knowing，支撑登记）、TA-16（支撑登记的典型错误）、CO-03（*explain me this，纲领与条目共同登记）、CO-04（边界星号例）、CO-07（*There has a book，支撑登记）、CO-13（儿童版登记）、QI-04（支撑登记）、QI-10（支撑登记的典型偏误）、QI-11（答非所问，支撑登记）、QI-13（两例，支撑登记）。每例 `source_type` 按登记形态填写（教学文献登记错型 / 条目成人层登记的事故例），无一例标「真实语料错型」——三组清单未提供可溯源的语料错句原文，不冒充。
- 其余 39 条清单未登记错句的，`error_cases: []` 并在 adult.pending 标「病例待补」，部分条目注明不设病例的理由（证据评议条、边界条、发展阶段条等——其「病例」形态是误判事故或阶段标本，已分别登记在机制节/例证层，如 QI-06 的旧定律误判、QI-14 的阶段过渡式）。
- **例证优先用清单登记例句**（标题例、儿童版例、机制/支撑中出现的原句）。清单未给例句的条目（TA-09、TA-13 部分例、QI 若干条），用词库词构成**形式例**以满足分级例证规格，并在该条 adult.pending 注明「形式例」来源——形式例只演示形式，不承载任何新断言。
- 分歧（TA-02 Declerck、TA-05 现时相关之争、TA-18 证据层分歧、CO-01 过度生成、CO-03 Groefsema、CO-10 生成语法对立、CO-17 词汇法地位）与待核一律原样入 adult.disputes / pending，未做条目内裁决。

## 6. 待补总表（转「已入模」前必须清零或经裁定豁免）

### 6.1 结构性待补（全波次共性）
| 项 | 数量 | 说明 |
|---|---|---|
| 检索练习 quiz | 50 条全缺 | 本波次未产出；DESIGN §3.1 必填，校验层将拦截 |
| 误解探针 probes | 49 条缺（仅 CO-17 齐） | 探针库 v1 只覆盖 8 个旗舰组；TA/QI 与 CO 其余条目须按 §3.6 schema 另行设计 |
| 病句医院病例 | 39 条缺 | 只许补清单/语料登记的真实错型，不得自编（见 §5） |
| scene_spec | 50 条全缺 | 语法区非 MVP 区，按 DESIGN 口径后置；MVP 区（拼读/词汇旗舰）先行 |

### 6.2 例证单薄条
- TA-18（证据评议型）：仅登记标本句 1 例，分级例证待补至规格（≥2 级 × ≥2 例）——补例时只许用三项实验共同的教学对象句，不新造实验结论。
- CO-11（实验登记型）：2 例达下限，第 2 级例证待补。

### 6.3 待补词清单（走 WORDBANK 补词流程后回填 word_ids）
| 词 | 涉及条目 | 性质 |
|---|---|---|
| donate | CO-03 | 本条核心例词，优先级最高 |
| sneeze、napkin | CO-04 | Goldberg 标志性原例词 |
| wipe | CO-05 | 条目标题例词 |
| shower | CO-17 | 标题例 take a shower（机制 anchor 已登记） |
| kick、fence | CO-04 | 一般例词 |
| promise | CO-06 | 一般例词 |
| ready | QI-08 | 一般例词 |
| rise | TA-04 | rises 归一未命中（The sun rises 例） |
| cloud | TA-11（亦见 TA-02 例） | clouds 归一未命中 |
| written、broken | TA-12、CO-08 | 不规则过去分词的归一口径待裁定（作独立词条补入还是归一到 write/break），裁定后统一回填 |
| beijing、sam | TA-05、TA-16、CO-04 | 专名：是否入词库由词库专名口径裁定，未裁前相关例证 word_ids 缺此词 |

**2026-11-02 补词清零波处置**：上表除 beijing、sam 外全部结案——donate / sneeze / napkin / wipe / kick / fence / promise / ready / rise / cloud 均已在词库且 word_ids 已回填各条目（shower ADD_0638、photo G4_0381 亦已在库，CO-17 说明项已删）；written / broken 按 §6.4 第 1 项口径以 verb_form_of 条目在库（written ADD_0717、broken G5_0831），已回填 TA-12 / CO-08。另：CO-06 成人层 boundary 登记的 refuse、entry 两词经 OALD 核验后补入词库（ADD_0784 / ADD_0785）。beijing、sam 两专名仍待专名口径裁定，保持登记。

### 6.4 口径待裁两件
1. **过去分词归一**（written / broken / married 中 married 已按 -ied→y 归一成功）：不规则分词建议作为词条以 verb_form_of 补入（与 was/went 先例一致），待词库波次裁定。**（2026-11-02 结案：该口径已执行——written 以 ADD_0717、broken 以 G5_0831 的 verb_form_of 条目在库，并已回填 TA-12 / CO-08 的 word_ids。）**
2. **QI-08 的 config_gates**：语调条的呈现与练习要求受裁定 A（弱读/产出档位）影响，本波次 config_gates 置 null 并在 pending 登记，裁定落档后回填——不预设裁定结论。

## 7. 校验记录（本波次自检）

- 条数：50（TA 18 + CO 17 + QI 15），id 无重复，order 无重复。
- YAML 可解析（PyYAML round-trip 两次通过）；挂接表可解析，138 词。
- 分型硬门槛脚本复验全过（见 §2）；tendency statement 绝对化措辞扫描为零（QI-09 原稿「绝对化口径」一词出现在否定语境，已按字面门槛改作「一刀切口径」，语义不变）。
- 例词解析：除 §6.3 登记的未命中词外，全部 word_ids / anchors 均命中词库现行 1,959 条口径。
