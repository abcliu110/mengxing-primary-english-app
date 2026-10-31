#!/usr/bin/env python3
"""场景生成器（纵切版）：知识模型 + 场景规格 → wb5 场景文件（产物，禁止手改）。
用法: python3 gen_scene.py specs/boundedness_1.yaml
- know 行: text 直用 / chant 引用模型口诀 / claim_say 引用模型主张的 say 字段
- aha / title / 要点卡: 取自规格; 要点卡口诀行由模型 ch-cut 直供
- 编排（布局/时间轴/动效）来自规格指定的 template 场景文件（模式实现，家族共用）
"""
import sys, re, yaml, pathlib

MODEL = pathlib.Path(__file__).parent

def js_str(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"

def write_factsheet(spec):
    """G3：facts 改可选。缺省时生成「待补」事实表并在验收中标记；
    facts 在场时输出与旧版逐字节一致。"""
    facts = spec.get("facts")
    fs = [f"# 事实表 · {spec['scene']}（生成器导出，逻辑审查对照）\n"]
    if facts:
        for o in facts["objects"]:
            fs.append(f"- **{o['name']}**（{o['kind']}）：{o['states']}")
        fs.append("\n不变量：")
        for inv in facts["invariants"]:
            fs.append(f"- {inv}")
    else:
        fs.append("> ⚠️ **事实表待补**：本 spec 未提供 facts 字段（G3 缺省生成），验收时须标记，逻辑审查前补齐。")
        fs.append("- 对象：（待补）")
        fs.append("\n不变量：")
        fs.append("- （待补）")
    fs.append("\n审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。")
    (MODEL / "factsheets").mkdir(exist_ok=True)
    (MODEL / "factsheets" / f"{spec['scene']}.md").write_text("\n".join(fs), encoding="utf-8")
    print(f"✓ 事实表 factsheets/{spec['scene']}.md" + ("" if facts else "（待补）"))

def fam_hint(spec):
    return f"model/{spec['family']}.yaml" if spec.get("family") else "（spec 自带内容，无家族模型）"

def main(spec_path):
    spec = yaml.safe_load(open(spec_path, encoding="utf-8"))
    if "items" not in spec and "know" not in spec:
        raise SystemExit("spec 既无 items 也无 know 字段：非生成器 spec（存档型），不做生成")
    # G2：家族模型改可选。文件在场才加载；know 模式引用 chant/claim_say 时才真正需要它，
    # items 模式内容由 spec 承载，family 缺失/无对应文件不阻塞（spec-only）。
    claims, chants = {}, {}
    fam = spec.get("family")
    if fam and (MODEL / f"{fam}.yaml").exists():
        model = yaml.safe_load(open(MODEL / f"{fam}.yaml", encoding="utf-8"))
        claims = {c["id"]: c for c in model.get("claims", [])}
        chants = {c["id"]: c for c in model.get("chants", [])}
    v5 = MODEL.parent / "v5"
    tpl = (v5 / "scenes" / spec["template"]).read_text(encoding="utf-8")

    if "items" in spec:
        return gen_items(spec, spec_path, tpl, v5)

    # --- resolve know lines ---
    lines = []
    for i, k in enumerate(spec["know"]):
        if "text" in k:
            lines.append(k["text"])
        elif "chant" in k:
            if k["chant"] not in chants:
                raise SystemExit(f"know[{i}] 口诀 {k['chant']} 不在家族模型中（family={fam!r}，G2：know 模式引用须有模型文件）")
            lines.append(k.get("prefix", "") + chants[k["chant"]]["text"])
        elif "claim_say" in k:
            if k["claim_say"] not in claims:
                raise SystemExit(f"know[{i}] 主张 {k['claim_say']} 不在家族模型中（family={fam!r}，G2：know 模式引用须有模型文件）")
            lines.append(k.get("prefix", "") + claims[k["claim_say"]]["say"])
        else:
            raise SystemExit(f"know[{i}] 无法解析: {k}")
    know_block = "export const KNOW = [\n" + "".join(f"  {js_str(t)},\n" for t in lines) + "];"
    out, n = re.subn(r"export const KNOW = \[.*?\];", know_block, tpl, count=1, flags=re.S)
    assert n == 1, "KNOW 块替换失败"

    # --- aha ---
    for key in ("see", "guess", "reveal", "rule"):
        pat = rf"({key}: )'(?:[^'\\]|\\.)*'"
        out, n = re.subn(pat, lambda m: m.group(1) + js_str(spec["aha"][key]), out, count=1)
        assert n == 1, f"aha.{key} 替换失败"
    # --- title ---
    out, n = re.subn(r"(kit\(K, C, )'(?:[^'\\]|\\.)*'", lambda m: m.group(1) + js_str(spec["title"]), out, count=1)
    assert n == 1 or spec.get("no_kit_title"), "title 替换失败（无 kit 标题时 spec 须声明 no_kit_title 并用 replace 改标题文字）"
    # --- end card（可选）+ 模板专属替换 ---
    if "endcard" in spec:
        if "ch-cut" not in chants:
            raise SystemExit("endcard 需要模型口诀 ch-cut，但家族模型中不存在")
        ec = spec["endcard"]
        pairs = [("套上容器有了边 → -s 加在容器上", ec["line2"].replace("🥛 ", "")),
                 ("给老师看：第一性原理 ③ 物理边界感统摄律", ec["teacher"]),
                 ("口诀：一刀下去还是它，不可数来不加 s", "口诀：" + chants["ch-cut"]["text"])]
        for old_frag, new_text in pairs:
            assert old_frag in out, f"要点卡旧文案未找到: {old_frag}"
            out = out.replace(old_frag, new_text)
    for old_frag, new_text in spec.get("replace", []):
        assert old_frag in out, f"replace 旧文案未找到: {old_frag}"
        out = out.replace(old_frag, new_text)
    # --- generated header ---
    _claims = sorted({e['claim_say'] for e in spec['know'] if 'claim_say' in e} | {e['teaches'] for e in spec['know'] if e.get('teaches')})
    _chants = sorted({e['chant'] for e in spec['know'] if 'chant' in e})
    prov = '、'.join(_claims + _chants) or '—'
    header = (f"// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：{fam_hint(spec)}；"
              f"改本幕台词/结构：model/specs/{pathlib.Path(spec_path).name}；改编排：模板 {spec['template']}（家族共用）。\n"
              f"// 判据/口诀来源：{prov}。生成器 model/gen_scene.py。\n")
    out = header + out
    dest = v5 / "scenes" / f"{spec['scene']}.js"
    dest.write_text(out, encoding="utf-8")
    print(f"✓ 生成 {dest} ({len(out)} bytes, know {len(lines)} 行)")

    # --- fact sheet ---
    write_factsheet(spec)

def gen_items(spec, spec_path, tpl, v5):
    """items 模式：autoBuild 模板（ITEMS 数组 + autoBuild title）。
    台词全部由 spec 的 items 承载（内容只从模型主张/口诀/例证组装）；
    编排（ACTS、版面引擎）留在模板。"""
    rows = []
    for i, it in enumerate(spec["items"]):
        assert isinstance(it, list) and it, f"items[{i}] 不是非空数组: {it}"
        rows.append("  [" + ", ".join(js_str(str(x)) for x in it) + "],")
    items_block = "const ITEMS = [\n" + "\n".join(rows) + "\n];"
    out, n = re.subn(r"const ITEMS = \[.*?\n\];", lambda m: items_block, tpl, count=1, flags=re.S)
    assert n == 1, "ITEMS 块替换失败"
    # G1：title 签名泛化——auto/oral/poly 三引擎同为 (SP, { title: '…'
    out, n = re.subn(r"((?:auto|oral|poly)Build\(SP, \{ title: )'(?:[^'\\]|\\.)*'",
                     lambda m: m.group(1) + js_str(spec["title"]), out, count=1)
    assert n == 1, "Build title 替换失败（模板须含 (auto|oral|poly)Build(SP, { title: '…'）"
    for old_frag, new_text in spec.get("replace", []):
        assert old_frag in out, f"replace 旧文案未找到: {old_frag}"
        out = out.replace(old_frag, new_text)
    prov = '、'.join(spec.get("teaches", [])) or '—'
    header = (f"// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：{fam_hint(spec)}；"
              f"改本幕台词/结构：model/specs/{pathlib.Path(spec_path).name}；改编排：模板 {spec['template']}（家族共用）。\n"
              f"// 判据/口诀来源：{prov}。生成器 model/gen_scene.py（items 模式）。\n")
    out = header + out
    dest = v5 / "scenes" / f"{spec['scene']}.js"
    dest.write_text(out, encoding="utf-8")
    print(f"✓ 生成 {dest} ({len(out)} bytes, items {len(rows)} 条)")
    write_factsheet(spec)


if __name__ == "__main__":
    main(sys.argv[1])
