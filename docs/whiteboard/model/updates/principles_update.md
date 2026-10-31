# T10 更新包 · 原理 ①②④⑤⑥ 建模对照表

> 范围：THEORY_AUDIT 修复清单所涉五原理（③ boundedness 已完成，不碰）。新模型 5 个，全部位于 `docs/whiteboard/model/`，与 `boundedness.yaml` 同级结构（family / title / insight / concepts / claims / examples / exceptions / chants），每条主张带 `explain`（方法 + 载体 + 失效边界）与 `mechanism`（真机制 / 帮记故事）。
> 命名铁律执行情况：全系列「第一性原理…律 / 定律 / 统摄」已降格为「总窍门 / 联想工具箱 / 小机关」级措辞；标题中唯一残留「律」字是 viewpoint 标题逐字采用的 sf-014 否定式「不是一条律」，属拆律声明而非立律（复核确认合规）。
> 文件名说明：runbook 原列 `rules5.yaml`，本次按任务「文件名以内容定」交付为 `spacetime.yaml`（内容为时空介词），T11 取用时以此为准。

## 总览

| 原理 | 模型文件 | 概念 / 主张 / 例证 / 例外 / 口诀 | 纲领挂靠 |
|---|---|---|---|
| ① 口腔省力同化 | phonology.yaml | 5 / 7 / 13 / 6 / 4 | dom-phonetics |
| ② 字母象形与音义同源簇 | letters.yaml | 4 / 6 / 9 / 5 / 5 | dom-vocab-etymology |
| ④ 单核谓语 | sentence.yaml | 4 / 9 / 15 / 1 / 3 | dom-constructions（与 dom-grammar 共管 g40） |
| ⑤ 三维几何向量时空 | spacetime.yaml | 5 / 5 / 11 / 8 / 5 | dom-prepositions |
| ⑥ 焦点先行与镜头缩放 | viewpoint.yaml | 4 / 6 / 12 / 5 / 4 | 分挂 dom-grammar / dom-questions-info / dom-tense-aspect，无单一纲领 |
| 合计 | 5 个文件 | 22 / 33 / 60 / 25 / 21 | — |

## ① 口腔省力同化 → phonology.yaml

| 幕 | 旧说法 | 新说法（模型主张） | 裁定依据 + 来源 |
|---|---|---|---|
| 1-1 | 清浊顺行同化（成立） | 保留。补第三变体：词尾 /t/、/d/ 时 -ed 读 /ɪd/（wanted、needed），与嘶声插音同理；aged / learned 作形容词读 /ɪd/、作动词过去式不套用（ph-cl-voicing） | THEORY_AUDIT 1-1（成立，边角例外）；复核 G1 补变体；Collins / Cambridge 词典形容词读法 |
| 1-2 | 「同位相撞」「吞音」 | 「嘶嘶相撞，插 /ɪ/ 分开站」：词尾 s、z、sh、ch、/dʒ/ 再加 -s 时插 /ɪ/（kisses、watches、judges、garages）；旧名「吞音」方向错误，此处是加音不是减音（ph-cl-sibilant 及其 mnemonic 条） | THEORY_AUDIT 1-2（过度简化）；sf-007；Bauer《English Morphology》、LibreTexts 形态音位节 |
| 1-2 坑 | — | goes / potatoes 拼 -es 读 /z/：词尾非嘶嘶音，-es 只是 o 结尾拼写习惯，作例外登记 | THEORY_AUDIT P2；标准读音 |
| 1-3 | in-→im-（范围未圈） | 只管表示「不」的前缀：碰到唇音 p、b、m 时顺成 im-（impossible、imbalance、immature）；所列三词 inborn / input / inbox 的 in- 不变，作例外；il- / ir- 留待后续（ph-cl-neg-prefix） | THEORY_AUDIT 1-3、P3；sf-025 / sf-026 口径（方向义 in- 同化另条待补，见存疑 Q3） |
| 1-3 | a / an 看字母 | a / an 看第一个音不看字母（ph-cl-a-an），与 boundedness 模型分工：词源本体仍在 boundedness，本模型只登记读音规则 | THEORY_AUDIT 1-3（基本成立）；GRAMMAR_DB G05 口径 |
| 1-4 | 双写绿框缺条件 | 「重读的辅元辅才双写；w、x、y 不双写」（visit→visiting、open→opening、fix→fixing、snow→snowing 作例外）；insight 承认双写属拼写层、不属口腔物理（ph-cl-doubling） | THEORY_AUDIT 1-4、P3 总纲；拼写通则 |

## ② 字母象形与音义同源簇 → letters.yaml

| 幕 | 旧说法 | 新说法（模型主张） | 裁定依据 + 来源 |
|---|---|---|---|
| 家族标题 | 「第一性原理 ② 字母象形与音义同源簇」 | 「联想工具箱 ② 字母看图记词——有的真是它的来历，有的只是长得像」（与 sf-001 定稿标题一致） | THEORY_AUDIT P1；sf-001（U1 改写） |
| 2-1 | 口诀「M 是山，S 是蛇，B 是包，C 来抓」；「本源 / 同源」招牌 | 整幕降格为「字母联想记忆法」：真源只写可查的 7 项——M ← mem「水」、B ← bēt「房屋」（唯一半对的保留）、C ← gīmel「骆驼」、K ← kaph「手掌」（「手」归 K 不归 C）、O ← ʿayin「眼睛」、S ← šin「牙齿」、A ← ʾaleph「牛头」（lt-cl-true-origins，etymology 型）；联想条（lt-cl-memory-pictures，mnemonic 型，链向真源条）明言「钩子≠历史」，自编例改用无真源字母（X 想成剪刀交叉） | THEORY_AUDIT 2-1（错误）；sf-001、sf-006；腓尼基字母名通行表（Sayce 字母名表，ISBE「Alphabet」条） |
| 2-2 | fl- / gl- / sl- 口诀无对冲；含 flu、floor | 保留倾向、删两例：flu（influenza 缩略）、floor 非簇成员，登记为例外；定位为「很多词有此倾向，不是全部」（lt-cl-flglsl，tendency 型） | THEORY_AUDIT 2-2（基本成立）；sf-016 |
| 2-3 | str- 含 street；sp- 选 speak / sport / space / spring | 删 street（← 拉丁 strata「铺过的路」，非绷直）；sp- 换真成员 spray / spill / spit / spread，并标「联想归纳，不是词源考证；是否同源逐词查词典，本条不作同源断言」（lt-cl-strsp，mechanism 已由复核纠为「帮记故事」） | THEORY_AUDIT 2-3（过度简化）；sf-017；复核 E1（string / strong 同源于 PIE *strenk-，故 blanket 否定断言已删除） |
| 2-4 | tw- 家族；twelve「余二」 | 保留作诚实标杆：tw- 真同源 *dwóh₁（two / twelve / twenty 等）；twelve「十之外剩二」注「简化说法勿讲死」；twinkle / twirl 作反例、twig 按勘误排除（lt-cl-tw-etym、lt-cl-tw-tendency） | THEORY_AUDIT 2-4（成立）；sf-018 勘误、sf-024 |
| 数据卫生 | fp_iconicity 的 unifiesList 后三条是 ③ 的内容被复制串入 | 未抄入 letters 模型：全文扫描「可数 / 冠词 / 识解」零命中，文件头已注明（复核确认） | THEORY_AUDIT P1 数据卫生 |

## ④ 单核谓语 → sentence.yaml

| 幕 | 旧说法 | 新说法（模型主张） | 裁定依据 + 来源 |
|---|---|---|---|
| 4-1 | 「一个句子一个王」（计量单位错） | 「一个分句（小句子）一个王，长句是几个小句子拼的」；反例 I know he likes it.（know、likes 各管一个分句）与 He is a student and works hard. 作例证（st-cl-one-finite，rule 型） | THEORY_AUDIT P0、4-1（错误）；sf-015（与同库 G40 正确版对齐） |
| 4-2 | 「想做穿 to，在做穿 -ing」二分口诀；to＝将来箭头断言式；finish doing＝享受过程 | 搭配由动词决定（rule 型 st-cl-verb-decides：want 一家接 to、enjoy 一家接 -ing、like / love 两边都站）；to 箭头降格为联想（mnemonic 型 st-cl-to-arrow，链向动词决定条），明示 used to 反例位（used to 指过去，箭头不向将来）；finish doing＝做完某事、非享受过程（enjoy doing 才是），见 note 与例证 | THEORY_AUDIT 4-2（基本成立）；sf-019、sf-027 / sf-028 口径；Swan《Practical English Usage》动词搭配 |
| 4-2 公式 | 「to / doing / done 三件马甲」并列 | 改两类 + 被动 / 完成另注：to / doing 为动词后接的非限定形式一类；done（过去分词）单独立条，管被动与完成（st-cl-done-separate）；-ing 两件马甲另立条（be 后「正在做」vs 单独作名词「做这件事」，st-cl-ing-two） | THEORY_AUDIT P3 公式小瑕疵；sf-028（U9 改写） |
| 4-3 | 令牌隐喻（成立） | 保留作全系列改造样板：时态 / 一致标记一分句只实现一次、落在首个助动词；情态后原形无例外（st-cl-do-support） | THEORY_AUDIT 4-3（成立） |
| 4-4 | 五大句型 | 保留教材共识骨架；仅在 note 登记「日后补带必备状语的第六种」，不展开新讲法；SVOA、there be 在五骨之外属覆盖提醒（st-cl-five-patterns） | THEORY_AUDIT 4-4（成立）；任务指令（只登记不展开） |

## ⑤ 三维几何向量时空 → spacetime.yaml

| 幕 | 旧说法 | 新说法（模型主张） | 裁定依据 + 来源 |
|---|---|---|---|
| 家族 | 「三维几何向量时空律」 | 「联想工具箱 ⑤ 介词看图猜——大图式管第一猜测，小例外靠约定」；「律」降为「大多数时候的窍门」（sp-cl-space-schema、sp-cl-time-borrow） | THEORY_AUDIT ⑤ 家族判定（启发式被命名为律）；sf-013（Tyler & Evans 2003 原型图式） |
| 5-1 | 维度故事可推全部时间用法 | 原型图只管第一猜测：in 容器 / on 表面 / at 点；幕末主动给出 at night、in the morning 例外（维度故事推不出），作例外条；at noon 等同类习惯说法同理单记 | THEORY_AUDIT 5-1（过度简化）；sf-013；Tyler & Evans 2003《The Semantics of English Prepositions》principled polysemy |
| 5-2 | on＝贴上 / off＝离开主线 | 保留主线，措辞为倾向；明列 go off＝「响起来」（闹钟、火警，与「断开」正相反）须单记，作例外条；put off、on fire、meeting is off 在模型外，见 note | THEORY_AUDIT 5-2（过度简化） |
| 5-3 | 交通工具 on / in 硬标准口吻 | 措辞软化为记法窍门：「不是按车辆大小硬分的标准」；电梯、小船为低频边缘，登记为例外、不硬推、按习惯说法单记（sp-cl-transport） | THEORY_AUDIT 5-3（基本成立）；sf-012 / sf-013 口径 |
| 5-4 | 「to 到终点，from 离起点，for 心里想着它」 | to / from 保留；for 按本次任务口径只写两站（为了谁、奔着哪儿），时长用法登记为后续补位（见存疑 Q1，与 T5 三站口径冲突，未擅自改写任一方） | THEORY_AUDIT 5-4（基本成立）、P3；任务指令；T5 sf-021 / sf-022（冲突方，见存疑） |

## ⑥ 焦点先行与镜头缩放 → viewpoint.yaml

| 幕 | 旧说法 | 新说法（模型主张） | 裁定依据 + 来源 |
|---|---|---|---|
| 家族标题与总纲 | 「第一性原理 ⑥ 焦点先行与镜头缩放律」一条假统一律 | 「联想工具箱 ⑥ 站位与顺序的四个小机关——各讲各的，不是一条律」（与 sf-014 定稿标题一致）；insight 拆分标注四幕真实机制：6-1 重量倾向 / 6-2 移位规则 / 6-3 书写惯例 / 6-4 时态隐喻，不再强行统一；domain 分挂 [dom-grammar, dom-questions-info, dom-tense-aspect] 并注明无单一纲领 | THEORY_AUDIT ⑥ 家族判定、P3；sf-014；Quirk 信息结构（end-focus） |
| 6-1 | 「一律 / 只有 1 个词才能前置」 | 「一般」前置，重的后置（重量倾向）；补「连字符打包形容词可前置」（a five-year-old boy、a two-hour trip，vp-cl-hyphen-pack）；后置单形容词 people present 作例外 | THEORY_AUDIT 6-1（过度简化）；sf-023 口径 |
| 6-2 | DB 总纲汉语疑问词「在最后」 | 改「留在原地」：汉语疑问词留在原地（你买了什么？），英语疑问词移至句首；例外：回声问句、从句居中 Tell me what you want（vp-cl-wh-fronting） | THEORY_AUDIT P3；sf-027（U13 改写） |
| 6-3 | 地址小→大、状语嵌套（外推到日期会翻车） | 保留顺序规则；口诀旁注「日期写法各国不同」，美式 September 9（月→日→年）作例外登记（vp-cl-address-order） | THEORY_AUDIT 6-3（基本成立）、P3 |
| 6-4 | 「结算＝做完了」完成态判据 | 「结果留到现在」→ 总括改为「和现在有关系」：结果支（I have lost my key，钥匙现在还没找到）与持续支（I have lived here for ten years，现在还住在这儿，事情没做完）并置；「做完了」不能概括完成时，见 note；不能单独配 yesterday / last night 这类点名过去时间点的状语，since yesterday 除外（vp-cl-perfect、vp-xc-perfect-yesterday） | THEORY_AUDIT 6-4（基本成立）、P2；sf-037 / sf-038；Comrie 1976 完成体定义（现时相关性） |

## ⑤⑥ 统一判据说明（交叉矛盾消除）

THEORY_AUDIT 跨幕矛盾第 1 条：⑤ 的维度故事与 ⑥ 的 on Tuesday morning 互推不出，真实规则是「有日子锚点从 day 的 on」。

- 统一表述（两模型逐字相同，经脚本比对与复核确认）：
  > 有日子锚点时从 day 的 on：on Tuesday morning（morning 单独用 in，带具体日子改从 day 的 on）
- 落点：spacetime 中为 5-1 时间借用 claim 的例外注记（sp-xc-tuesday-morning 的 note）；viewpoint 中为 6-3 时间锚点 claim（vp-cl-time-anchor）的 note。validate.py 只做单文件校验，互指靠人工核对——本次已人工核对逐字相同。
- 注意：⑤ 的维度故事与 ⑥ 的顺序故事均不得再用各自机制「推导」该判据；该判据在两模型中均为约定登记项。

## 存疑清单（查无实据 / 来源冲突 / 口径冲突，一律隔离、不猜测填充）

| 编号 | 事项 | 现状与依据 | 待裁定 |
|---|---|---|---|
| Q1（口径冲突，阻塞交付后跟进） | ⑤ for 的站数：模型两站 vs T5 三站 | 模型 sp-cl-for 按本次任务口径只写两站（为了谁 / 奔着哪儿），note 登记「时长用法（for two hours）后续补位，本条暂不展开」；T5 sf-021 口诀与 sf-022 讲解句均为三站（含「持续多久 for two hours」），domains.yaml dom-prepositions 已收编三站口径。三方文本经复核逐字核对，冲突属实。双方均未擅自改写。 | 独立复核的裁定建议：以 T5 三站为准、模型方跟进（理由：T5 已交付场景修正且纲领已收编；时长为小学高频核心义；sf-021 boundary 本身把「交换、支持」列为后续再扩，时长不在「后续」之列）。替代路径（废止 sf-021 / sf-022 并同步改 domains.yaml）须由主会话正式裁定。在裁定前，spacetime 不得作为 for 的唯一口径交付。 |
| Q2 | ① il- / ir- 两支 | ph-cl-neg-prefix 只展开 im- 一支；il-、ir- 仅在 note 写「留待后续」，未展开为例证（任务口径）。 | 后续补位时展开，不展开即不入模。 |
| Q3 | ① 方向义 in- 的同化 | ph-xc-inborn-input 已收窄为所列三词不变，note 声明不作方向义一般断言，import 一支（方向义 in- 同化）另条待补；复核注：note 未落「T5 sf-026」编号，实质内容已齐全。 | 后续另立条目时与 sf-026「两个 in- 都同化」口径对齐；本包不补编号外的实质内容。 |
| Q4 | ④ 带必备状语的第六种 | st-cl-five-patterns 的 note 仅登记「日后补」，未展开新讲法；there be 另管（任务指令：只登记不展开）。 | 后续补位时展开。 |
| Q5 | ⑤ 交通工具边缘情形 | 电梯、小船仅在 sp-xc-transport-edge 登记为「低频边缘，不硬推、按习惯说法单记」，未断言具体形式。 | 后续单记时逐项查证。 |
| Q6 | ② twelve「余二」解说精度 | twelve 注「简化说法勿讲死」（twelve = two + 剩余义的通俗解说），未讲死为严格词源推导。 | 如需严格词源表述，后续以 OED / Etymonline 为准重写该注。 |

## 质量纪律执行记录

- 编写与复核分离：编写子代理起草 → 独立复核（错误级 100%、其余全量任务修复点核查）→ 结论不通过（E1 错误级 + G1–G8 一般）→ 编写者返修 → 独立重审通过（阻塞性残留问题：无）。
- 返修内容：E1 删除 str- / sp- blanket 否定断言并改 mechanism 为「帮记故事」；G1 补 -ed /ɪd/ 第三变体；G2 唇音表述；G3 例外收窄；G4 完成体总括改「和现在有关系」；G5 since yesterday 除外；G6 自编例换 X 剪刀；G7 纲领挂靠结构化；G8 标题补前缀。
- 来源基准：词源 Etymonline / OED 及腓尼基字母名通行表（Sayce、ISBE）；语法 CGEL / Swan / Quirk；介词 Tyler & Evans 2003；完成体 Comrie 1976；构式 Goldberg；其余以 THEORY_AUDIT 与 T5 scene_fixes 所引来源为准。查无实据者一律入存疑清单，未猜测填充。
- 未动文件：grammar.yaml、boundedness.yaml、domains.yaml、主 HTML、runbook 均未改动；无 git commit；无推送（按任务要求，交付只写文件）。
