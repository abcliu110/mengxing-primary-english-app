# 萌星小学英语 · 内容缺口规格文档

**目标读者**：负责补全规律内容的 AI 或开发者  
**文档版本**：2026-11-10  
**工作目录**：`laws-prototype/`

---

## 背景

本 App 有 456 条规律，每条规律按产品需求（`docs/REQUIREMENTS.md §4.4`）需要具备以下六步闭环要素才能上线：

1. 病句医院入口（`error_cases` / `cases`）
2. 动画讲机制（白板场景）
3. 一屏一总结（`mechanism` + `headline_kid`）
4. 分级例证（`examples` ≥ 2 条，含 level 字段）
5. 检索练习（`quiz`）
6. 间隔复习 + 病因归档（由引擎自动处理，不需要手动补）

**当前完成率**：175 条（38%）六步全齐；281 条（62%）存在缺口。

---

## 数据架构（必读）

### 单一事实源原则

所有内容只在事实源文件里修改，**禁止直接编辑主 HTML**。

| 数据类 | 事实源文件 | 生成命令 |
|---|---|---|
| 规律内容（claim/mechanism/examples/error_cases/quiz/probes） | `model/laws/*.yaml`（8 个分区文件） | `python3 tools/gen_laws.py --write` |
| 规律总表 | `model/laws_master.json`（由 yaml 合并生成） | 同上 |
| 主文件嵌入数据 | `laws-prototype/mengxing-prototype-v1.html` | 由生成器写入 |

### 分区 yaml 文件对应关系

```
model/laws/grammar.yaml      → GR-01 ~ GR-45（基础语法）
model/laws/grammar_ext.yaml  → CO-01~17 / QI-01~15 / TA-01~18（扩展）
model/laws/phonics.yaml      → S-01~44 / SR-01~09（拼读）
model/laws/vocab.yaml        → V-01~45（词汇）
model/laws/small_systems.yaml→ C-01~20 / PR-01~15 / PB-01~13（小系统）
model/laws/expression.yaml   → E-01~15 / W-01~15（表达写作）
model/laws/support.yaml      → NE-01~29 / TM-01~35 等（支撑知识）
model/laws/teaching.yaml     → LS / WA / CB / CG / YL / VB（教师层）
```

### yaml 条目结构示例

```yaml
- id: GR-02
  zone: 语法
  group: GR
  headline_kid: "时态标记像一支向下的箭头，一个句子只落一次"
  claim:
    type: rule              # rule / tendency / etymology
    statement: "..."
    evidence:
      - "Swan 2005 §xxx"
    exceptions:
      - note: "..."
  mechanism:
    - beat: "机制名"
      text_kid: "孩子版说明"
      text_adult: "成人层原文"
  examples:
    - level: 1
      sentence: "She doesn't play games."
      scene_note: "小学生作文场景"
      word_ids: ["G2_xxx"]
      supports: claim
    - level: 2
      sentence: "..."
  error_cases:
    - wrong: "He doesn't plays games."
      right: "He doesn't play games."
      etype: "标记重复"
      diag: "..."
      diag_kid: "孩子版诊断"
  quiz:
    - q: "Did you ___ to school? A. go  B. went"
      answer: "A. go"
      hint: "did 已经扛了时态，后面动词不落箭头"
  probes:
    - id: probe-GR-02-01
      for_law: GR-02
      title: "..."
      task: "..."
      rubric: hit
      source_of_prediction: claim
```

---

## 缺口清单

以下按「补充价值」从高到低排列。

---

### 一、缺 quiz（练习题）的区——**优先级最高**

这些条目已有 mechanism + examples，补 quiz 是最小工作量、最大收益的操作（补完后复习引擎立即可以出题）。

#### TA 组（时态体，18 条，全部缺 quiz）

> 注意：`ta_exercises.json` 已有 87 道题的数据（`model/ta_exercises.json`），但还没有回灌进 `grammar_ext.yaml` 的 `quiz` 字段。这 18 条的 quiz 补充等于从侧表迁移，不需要重新设计题目。

| ID | 标题 | 缺什么 |
|---|---|---|
| TA-01 | 时态 = 时间 × 看法两个开关 | quiz |
| TA-02 | 英语形态上只有两个时态 | quiz |
| TA-03 | 体是「看事情的方式」 | quiz |
| TA-04 | 一般现在时装不下「正在发生」 | quiz |
| TA-05 | 完成体看的是「过去的事和现在的牵连」 | quiz |
| TA-06 | 现在完成时不能点名过去时间 | quiz |
| TA-07 | 动词自带「时间形状」 | quiz |
| TA-08 | 过去形式还管「距离」 | quiz |
| TA-09 | 过去完成时是「锚点搬家」 | quiz |
| TA-10 | will 说将来带着「我预言」的口气 | quiz |
| TA-11 | be going to 是「已经在路上」 | quiz |
| TA-12 | 完成体的来历 | quiz |
| TA-13 | 时刻表上的将来用现在时 | quiz |
| TA-14 | 讲故事可以把过去拉到眼前 | quiz |
| TA-15 | 汉语靠词和语境表时间，英语靠动词变形 | quiz |
| TA-16 | 「了」与英语完成体的对应与错位 | quiz |
| TA-17 | 学时态的顺序 | quiz |
| TA-18 | 「镜头讲法」教时态有实验支持 | quiz |

**操作方法**：读 `model/ta_exercises.json`，按 `for_law` 字段把题目写进对应 yaml 条目的 `quiz` 字段，格式见上方示例。每道题需要 `q`（题干）、`answer`（答案+解析）、`hint`（答错时回机制的提示）三个字段。

---

#### S 拼读组（44 条，全部缺 quiz）

拼读规律已有 `cases`，缺 quiz。题目类型建议：**选择哪个词属于这个模式 / 看图选拼写**。

| ID | 短名 |
|---|---|
| S-01 | 单字母元音短读 |
| S-02 | Magic e 长元音 |
| S-03 | 元音字母组合 ai/ay |
| S-04 | 元音字母组合 ee/ea |
| S-05 | 元音字母组合 oa/ow |
| S-06 | 双辅音收尾 |
| S-07 | 软化规则 c/g |
| ... | （共 44 条，详见 `model/laws/phonics.yaml`） |

**操作方法**：读 `model/laws/phonics.yaml`，每条 quiz 写 1-2 道选择题，从该规律的 `examples` 词表中取词出题。格式同上。

---

#### SR 拼写规则组（9 条，全部缺 quiz）

| ID | 标题 |
|---|---|
| SR-01 | 词尾不出声的 e（九份工）|
| SR-02 | 双写辅音规则 |
| SR-03 | y → i 变化 |
| SR-05 | -ck 结尾规则 |
| SR-06 | -tion/-sion 读法 |
| SR-07 | 前缀同化规则 |
| SR-08 | 复数规则 |
| SR-09 | 比较级规则 |

---

#### WA 写作方法组（9 条，全部缺 quiz）

| ID | 标题 |
|---|---|
| WA-01 | 段落一条主线 |
| WA-02 | 衔接路标词 |
| WA-03 | 范文先行 |
| WA-05 ~ WA-09 | （详见 `model/laws/expression.yaml`） |

---

### 二、缺 error_cases/cases（病例）的区

#### PB 小词组（13 条，全部有练习但无病例）

PB 是介词/小词类（比 P 更细），已有 quiz，缺真实病例。

| ID | 标题 |
|---|---|
| PB-01 ~ PB-13 | （详见 `model/laws/small_systems.yaml`） |

**要求**：病例必须来自已发表的中国学习者语料研究，不许编造。格式：
```yaml
error_cases:
  - wrong: "错误句子（逐字原文）"
    right: "正确形式"
    etype: "错误类型"
    diag: "成人版诊断（引用出处）"
    diag_kid: "孩子版诊断（白话改写）"
```

#### W 写作组（15 条，12 条缺病例）

W-01、W-02、W-07 已有病例，其余 12 条缺。

#### NE 母语/专家组（29 条，22 条缺病例）

NE 条目是关于语言习得规律的，「病例」指「误用这条知识」的典型错误，主要来自教学实践记录。

---

### 三、缺 examples（分级例证）的区

#### TM 教学法组（35 条，全部缺 examples）

TM 是教学法/学习科学条目，面向教师和家长。这些条目的 `examples` 应该是**教学实践例子**（如"某课堂的具体做法"），而非英文例句。

> 注意：TM 条目不出现在孩子菜单，不要加例句练习，只需 `mechanism.text_adult` 层的充分说明即可。

---

### 四、quiz + cases 双缺的区（最需要补全）

| 区 | 条数 | 现状 | 补全建议 |
|---|---|---|---|
| CB 认知 | 14 | 无练习无病例 | 属教师层，建议暂不补 |
| CG 语料库 | 14 | 无练习无病例 | 属教师层，建议暂不补 |
| YL 低龄研究 | 14 | 无练习无病例 | 属教师层，建议暂不补 |
| LS 学习策略 | 15 | 无练习无病例 | 属教师层，策略描述型，建议补 quiz（判断题：这个学法有没有实证支持） |
| VB 词汇行为 | 13 | 无练习无病例 | 属教师层，暂不补 |

---

## 操作 SOP

### 第一步：读懂数据规范

必读文件：
- `laws-prototype/DATA_SOURCE_SPEC.md`（数据纪律，严格遵守）
- `laws-prototype/docs/REQUIREMENTS.md §4.3 / §4.4`（内容质量标准）
- `model/laws/phonics.yaml`（拼读区样例，结构参考）
- `model/laws/grammar.yaml`（语法区样例，结构参考）

### 第二步：补内容

1. 找到目标条目所在的 yaml 文件（见上方分区对应关系）
2. 在对应条目下补 `quiz` / `error_cases` / `examples` 字段
3. **病例必须有出处**（发表文献 + DOI 或页码），不许编造
4. **例句中的英语词必须在词库中**（`model/wordbank.json`），如词不在库先补词

### 第三步：验证

```bash
# 验证数据一致性
python3 laws-prototype/tools/check_all.py

# 单项验证（以规律数据为例）
python3 laws-prototype/tools/gen_laws.py --check

# 重新生成主文件嵌入数据
python3 laws-prototype/tools/gen_laws.py --write
```

验证全通过（27/27 PASS）才可提交。

### 第四步：提交

```bash
git add model/laws/*.yaml
git commit -m "Content: 补全 XXX 区 quiz/cases

- XX 条规律新增练习题
- XX 条规律新增真实病例（来源：XXX）

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## 优先级排序建议

| 优先级 | 任务 | 理由 |
|---|---|---|
| P1 | TA 组 quiz 回灌（18 条） | 数据已在 `ta_exercises.json`，直接迁移，零新内容 |
| P2 | S/SR 组 quiz（53 条） | 拼读区有词卡无练习，补完复习引擎立即可用 |
| P3 | PB 组 cases（13 条） | 有练习无病例，六步闭环最后一块 |
| P4 | W/E 组 cases（12+4 条） | 表达写作区质量提升 |
| P5 | WA 组 quiz（9 条） | 写作方法有说明无练习 |
| 暂缓 | CB/CG/YL/VB/TM | 教师层，不影响孩子学习路径 |

---

## 参考资料

- 现有病例来源（可沿用同出处补同区病例）：
  - 罗宇 2025（GR 语法错误）
  - 胡晓 & 冯姗 2026（动词误用，万州初二）
  - 谢旻洋等（高中作文 300 份，构式错误）
  - Sun 2013 JLTR（写作样本）
  - 秦榛嘉 2026（高一读后续写）
  - 狄伟进 2015（期刊分节例句）

- 词库查询：`model/wordbank.json`（2942 条）
- 生成器文档：`laws-prototype/tools/gen_laws.py` 头部注释（约 100 行说明）
- 数据规范：`laws-prototype/DATA_SOURCE_SPEC.md`

---

*本文档由 Kiro 生成，2026-11-10*
