# 第四波第 8 项工作底稿：jscheck node --check 列为提交门禁（2026-11-09）

> 定夺（主对话 Muse 已定）：把 jscheck 的 node --check 接进 check_all 链；
> 门禁只含 node --check（41 个内联脚本），anchorcheck 的 116 项基线失败不列入。
> 实施分支：`wave4/gates`（从 59844d7，第 7 项提交 e6061ea 之上）；本项单独提交。

---

## 一、接线方式

新脚本 `laws-prototype/tools/check_js_syntax.py`（薄 wrapper，参考
`check_rel_coverage.py` 的写法与退出码约定：0=通过、1=node --check 失败、
2=用法错误 / 无法判定；接受可选 `<html 路径>` 参数，缺省校验主文件），
接进 `laws-prototype/tools/check_all.py` 的 CHECKS 列表末尾
（`"jscheck node --check"`，无参数），并在 check_all.py 模块 docstring
的校验清单里补一行。

为什么是 wrapper、而不是改 jscheck.py 或在 check_all 里直调：

- `docs/whiteboard/src/jscheck.py` 没有只跑语法的开关，且顶层代码无
  `main` 守卫、不可 import；它除了 node --check 还跑 anchorcheck（补丁锚点 /
  插入标记），其 116 项失败是与起点 e97aaec 逐项一致的基线遗留，直调会
  把基线失败带进 check_all。
- wrapper 以子进程调用 jscheck.py（不复制抽取逻辑：内联脚本的抽取、
  拼接、`node --check` 仍由 jscheck.py 自己做），只取其输出里的
  `node --check:` 汇总行定通过与否；`FAIL anchor …` 与 `anchorcheck: …`
  行一律忽略，jscheck 的退出码也不直接沿用（anchorcheck 失败时它返回
  非零，即使 node --check 通过）。node --check 的 FAIL 块原文透传打印，
  便于定位。
- jscheck.py 本身未改动（白板工具归白板线所有，本项不动它）。

## 二、验证结果

### ① 正面：当前 HEAD 上通过

`python3 laws-prototype/tools/check_js_syntax.py`：

```
node --check: inline scripts=41, lazy modules=0 → OK
PASS: jscheck node --check 通过（41 inline + 0 modules；anchorcheck 基线失败不计入本门禁）
```

退出码 0。对照：同一文件上直接跑 jscheck.py 原样输出
`node --check: … → OK` 后跟 116 行 `FAIL anchor …` 与
`anchorcheck: FAIL（116 项）`，退出码 1——wrapper 只取汇总行、忽略
anchorcheck 的做法正在起作用（grep 计数 `^FAIL anchor` = 116，与 e97aaec
基线一致）。

### ② 反面：8c7c133 时期的坏脚本上失败

复现方法（只动 /tmp 副本，仓库文件未动）：取当前主文件复制到
`/tmp/wave4_item8_bad.html`，把 4edcc4f 删掉的那行多余 `}` 原样插回——
第 9057 行 `if(hasAny && onlyAdult) gh.classList.add('adult-row');` 之后、
`});` 之前插入 `  }`（与 4edcc4f 的 diff 逐行对照一致）。

`python3 laws-prototype/tools/check_js_syntax.py /tmp/wave4_item8_bad.html`：

```
FAIL all (41 inline + 0 modules) /tmp/tmpipcpf0k7.js:4285
  }
  ^

SyntaxError: missing ) after argument list
    …
node --check: inline scripts=41, lazy modules=0 → FAIL
FAIL: jscheck node --check 失败（41 inline + 0 modules；anchorcheck 基线失败不计入本门禁）
```

退出码 1。坏副本上 anchorcheck 仍是 116 项（与好文件相同），证明失败
只来自 node --check，不是 anchorcheck 串入。

定位到脚本：对坏副本 41 个内联脚本逐个 `node --check`，仅 1 个失败——
含 `applyAdultZones` 与 `.gh` 折叠块的导航脚本（按 1 起计数为第 14 个，
按 0 起计数为第 13 个；4edcc4f 提交消息说的“第 13 个内联脚本”即 0 起
计数），报错与任务描述一致：`SyntaxError: missing ) after argument list`。
好文件上 41 个脚本逐个检查全部通过；坏副本与好文件该脚本只差插回的
一行 `}`（208 行 vs 207 行）。

### ③ 接进链后 check_all 新总数：26 项（实测确认）

`python3 laws-prototype/tools/check_all.py`：**26 项中 25 项 PASS**，
`jscheck node --check` PASS；唯一 FAIL 是第 7 项的 `check_badge_erridx`
（10 行 E/W 徽标滞后，待第 6 项修复合入后转 PASS，本分支上失败是预期的，
见 `wave4_item7_badge_gate.md`）。check_all 退出码 1 只因此一项。

## 三、前后数字对照

| | 改前（59844d7） | 改后（本分支，两项合入） |
|---|---|---|
| check_all 项数 | 24 | **26**（+check_badge_erridx、+jscheck node --check） |
| check_all 通过 | 24/24 | 25/26（唯 badge 门禁 FAIL，见 §二③） |
| jscheck node --check | 未进链（手工跑） | 进链，HEAD 上 PASS（41 inline + 0 modules） |
| anchorcheck 116 项基线 | 未进链 | 仍不进链（wrapper 忽略，实测好/坏副本均为 116） |

## 四、改动文件与提交

- `laws-prototype/tools/check_js_syntax.py`：新建，薄 wrapper。
- `laws-prototype/tools/check_all.py`：CHECKS 末尾加 `jscheck node --check` 一项 + docstring 清单补一行。
- 本文件 `docs/work-2026-11-09/wave4_item8_jscheck_gate.md`。

提交：`wave4/gates` 分支上单独 commit（消息参考仓库风格），未推送、未合并。

## 五、未核实项

- 真机未核实：node --check 只验语法；8c7c133 回归在真机上“整站 show/
  导航失效”的表现（4edcc4f 提交消息所述）未在本项重验，只复现了
  语法层失败。
- wrapper 对 jscheck 输出格式的依赖：判定只认 `node --check: inline
  scripts=N, lazy modules=M → OK/FAIL` 这一行；若将来 jscheck.py 改了
  汇总行格式，wrapper 会报“无法判定”（退出码 2）而非误判通过。
  该格式是仓库自有工具的输出，未做版本钉死。

## 六、新发现的待定夺

1. **anchorcheck 116 项基线是否另立项**：本门禁刻意排除 anchorcheck，
   但 116 项锚点失败仍在——它们是白板线（已退役模块/页签锚点）与主文件
   现状脱节的遗留。若将来要把 anchorcheck 也列为门禁，需先由白板线
   定夺是补锚点、更新 anchorcheck，还是正式废止 anchorcheck（第 4 波
   第 4 项“修三件套”里已有 r2check 改走现行管线或废止的同类议题），
   请总协调人定夺。
2. **计数口径**：4edcc4f 说的“第 13 个内联脚本”是 0 起计数；按 1 起计数
   为第 14 个。本底稿 §二② 已写清两种计数，避免以后按序号找脚本时错位。
