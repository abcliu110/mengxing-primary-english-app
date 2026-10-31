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

def main(spec_path):
    spec = yaml.safe_load(open(spec_path, encoding="utf-8"))
    model = yaml.safe_load(open(MODEL / f"{spec['family']}.yaml", encoding="utf-8"))
    claims = {c["id"]: c for c in model["claims"]}
    chants = {c["id"]: c for c in model["chants"]}
    v5 = MODEL.parent / "v5"
    tpl = (v5 / "scenes" / spec["template"]).read_text(encoding="utf-8")

    # --- resolve know lines ---
    lines = []
    for i, k in enumerate(spec["know"]):
        if "text" in k:
            lines.append(k["text"])
        elif "chant" in k:
            lines.append(k.get("prefix", "") + chants[k["chant"]]["text"])
        elif "claim_say" in k:
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
    assert n == 1, "title 替换失败"
    # --- end card（可选）+ 模板专属替换 ---
    if "endcard" in spec:
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
    header = (f"// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：model/{spec['family']}.yaml；"
              f"改本幕台词/结构：model/specs/{pathlib.Path(spec_path).name}；改编排：模板 {spec['template']}（家族共用）。\n"
              f"// 判据/口诀来源：{prov}。生成器 model/gen_scene.py。\n")
    out = header + out
    dest = v5 / "scenes" / f"{spec['scene']}.js"
    dest.write_text(out, encoding="utf-8")
    print(f"✓ 生成 {dest} ({len(out)} bytes, know {len(lines)} 行)")

    # --- fact sheet ---
    fs = [f"# 事实表 · {spec['scene']}（生成器导出，逻辑审查对照）\n"]
    for o in spec["facts"]["objects"]:
        fs.append(f"- **{o['name']}**（{o['kind']}）：{o['states']}")
    fs.append("\n不变量：")
    for inv in spec["facts"]["invariants"]:
        fs.append(f"- {inv}")
    fs.append("\n审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。")
    (MODEL / "factsheets").mkdir(exist_ok=True)
    (MODEL / "factsheets" / f"{spec['scene']}.md").write_text("\n".join(fs), encoding="utf-8")
    print(f"✓ 事实表 factsheets/{spec['scene']}.md")

if __name__ == "__main__":
    main(sys.argv[1])
