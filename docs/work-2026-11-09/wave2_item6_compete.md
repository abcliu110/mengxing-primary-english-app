# 第二波第 6 项工作底稿：compete 只在成人层呈现

日期：2026-11-09 · 实施：第二波实施员（第 6 项）· 仓库 HEAD（实施前）1ff502d

## 结论

- 儿童层同反义词区 5 条（perform、bright、dark×2、heavy），无 compete；成人层 6 条（含 compete）。
- 模型未动：`synonym_antonym.json` 里 compete 的 `adult_only` 标记第一批（fc5a92f）已在，
  内嵌 `SYNANT` 与模型逐字节一致（`gen_synonym.py --check` PASS，16303 字符，4 词 / 17 义项 / 6 条关系）。
  本项只改渲染层过滤，不改数据。

## 改了哪些文件

1. `laws-prototype/mengxing-prototype-v1.html`（仅 3 处手写代码改动）
   - `synAntLineHTML(rec, kind)`（词汇模块 IIFE 内，约 L1876）：按层过滤——
     `var adult = !!(window.mxAdultOn && mxAdultOn());`，
     每条关系 `pr.scope !== 'adult_only'` 时才进儿童层，成人层全量。
     两条渲染路径（旗舰卡 `synAntCellHTML`、动态词页 `synAntCardHTML`）共用本函数，
     调用处未各写一份。另在函数上方注释块补了一行过滤口径说明。
   - `window.VC = {...}`（约 L2148）：对外暴露 `fillFlagshipSynAnt: fillFlagshipSynAnt`
     （该函数在词汇 IIFE 内，全局作用域读不到；`applyAdultZones` 在 IIFE 外，必须经 `window.VC` 调用）。
   - `applyAdultZones(on)`（约 L9062）：开关拨动时 `if (window.VC && VC.fillFlagshipSynAnt) VC.fillFlagshipSynAnt();`
     重填旗舰卡，否则旗舰卡会停留在拨动前的层。动态词页 `openCard` 每次打开时现算，不受影响。
     另：`applyAdultZones(false)` 在加载时也会触发一次重填，与模块加载时的 `fillFlagshipSynAnt()` 输出相同，无副作用。
2. `laws-prototype/model/SYNONYM_ANTONYM.md`（活文档，未改 TODO 文档）
   - 「scope 提醒」行：删「待 Priya 裁定」，记为第二波第 6 项已裁定并落地；
   - 「待裁定」第 6 条改为已裁定；变更日志补一行。

## 关键核查：渲染路径实测发现

- 4 个有已核关系的词（play / light / charge / school）均有专属词页（`vcv-word-*`），
  `openCard` 对它们走 `vcShow(r[13])` 提前返回，不进通用模板；其九栏卡里的同义/反义格
  （`sa-<词>-syn/ant`）就是旗舰卡格，由 `fillFlagshipSynAnt()` 回填。
- 通用模板（`synAntCardHTML`）目前只对无记录词渲染「暂无已核同义 / 反义」——
  jsdom 回归：dance（G2_083）儿童/成人层均为「暂无」，无 compete、无报错。
- 首次实现时 `applyAdultZones` 内直接调 `fillFlagshipSynAnt()` 未生效：
  该函数在 IIFE 内，全局 `typeof` 为 `undefined`，守卫跳过——jsdom 测出成人层旗舰卡仍为 5 条后改走 `window.VC` 暴露调用，复测通过。

## jsdom 逐格核对（/tmp/domtest/item6_compete_test.js，26 项 ALL PASS）

| 层 | 同反义词区 | 结果 |
|---|---|---|
| 儿童层（默认） | 旗舰格共 5 条：perform、bright、dark、dark、heavy；无 compete | PASS |
| 儿童层 | play 同义格仅 [perform]；light 同义 [bright]、反义 [dark,dark,heavy]；charge/school 格「暂无已核同义」 | PASS |
| 儿童层 | 打开 play 专属页（`VC.openByBank('G2_0489')`），同义格仍仅 perform | PASS |
| 儿童层 | 通用词页 dance（G2_083）：「暂无已核同义」「暂无已核反义」，无 compete | PASS |
| 成人层（点 #atgl 后） | 旗舰格共 6 条：compete、perform、bright、dark、dark、heavy；其余 5 条不变 | PASS |
| 成人层 | play 同义格 [compete, perform]；play 专属页同义格同；dance 通用页仍「暂无」、无 compete | PASS |
| 关回儿童层（再点 #atgl） | 旗舰格恢复 5 条、无 compete；play 专属页恢复仅 perform | PASS |

注：jsdom 控制台有与本项无关的既有噪声（canvas `getContext` 未实现致 `gkMeasure` 报错、
`scrollTo` 未实现），不影响核对；`WLIST`/`SYNANT` 在词汇 IIFE 内，测试经 `VC.openByBank` 按 bank_id 开页。

## 验证

- `python3 laws-prototype/tools/gen_synonym.py --check`：PASS（载荷逐字节一致）
- `python3 laws-prototype/tools/check_all.py`：24/24 全部通过
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  `node --check` OK（41 个内联脚本）；`anchorcheck` FAIL 116 项＝基线遗留（与起点一致，本项未引入新失败）
- jsdom：见上表，26 项 ALL PASS

## 未核实项

- 真实浏览器里点成人层开关后旗舰卡的即时刷新（jsdom 已验逻辑，视觉未验）。
- 通用模板 `synAntCardHTML` 对有记录词的过滤分支目前无真实数据可达（4 个有记录词全走专属页）；
  过滤逻辑与旗舰卡共用同一函数，代码层面已覆盖，待后续有记录词扩批到通用模板时再实测。
