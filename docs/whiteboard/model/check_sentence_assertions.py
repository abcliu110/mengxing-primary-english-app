#!/usr/bin/env python3
"""sentence 家族构建期不变量断言（REWRITE_TECH_PLAN §4 语义标签 + §6 第 1 项）。

断言只引用 spec 的 tags（语义标签），不认裸坐标；检查对象是生成产物
v5/scenes/gen_sentence_N.js（即用户实际看到的台词层），不是 spec 文本本身
（spec 的 facts.invariants 里允许出现「屏上不出现 X」这类禁止性声明行）。

另验：spec.teaches 的每条记录 ID 必须在 sentence.yaml 的 claims/chants 里存在。
用法: python3 check_sentence_assertions.py [1 2 3 4]（默认全查 4 幕）
任一断言失败即 exit 1，阻断交付。
"""
import pathlib
import sys

import yaml

HERE = pathlib.Path(__file__).parent
V5 = HERE.parent / "v5"


def check_one(n):
    spec = yaml.safe_load(open(HERE / "specs" / f"sentence_{n}.yaml", encoding="utf-8"))
    model = yaml.safe_load(open(HERE / "sentence.yaml", encoding="utf-8"))
    js = (V5 / "scenes" / f"gen_sentence_{n}.js").read_text(encoding="utf-8")
    fails = []

    # teaches 追溯：记录 ID 必须存在于模型
    known = {c["id"] for c in model["claims"]} | {c["id"] for c in model["chants"]}
    for t in spec.get("teaches", []):
        if t not in known:
            fails.append(f"teaches 记录不存在于模型: {t}")

    tags = spec.get("tags", {})
    for a in spec.get("assertions", []):
        chk = a["check"]
        if chk == "order":
            b = tags[a["before"]][0]
            c = tags[a["after"]][0]
            if not (b in js and c in js and js.index(b) < js.index(c)):
                fails.append(f"order 失败: {a['before']} 必须出现在 {a['after']} 之前")
            continue
        tag = a["tag"]
        strs = tags.get(tag)
        if strs is None:
            fails.append(f"断言引用了未定义的标签: {tag}")
            continue
        if chk == "absent":
            hit = [s for s in strs if s in js]
            if hit:
                fails.append(f"absent 失败 {tag}: 产物中出现 {hit}")
        elif chk == "present":
            miss = [s for s in strs if s not in js]
            if miss:
                fails.append(f"present 失败 {tag}: 产物中缺失 {miss}")
        elif chk in ("count_eq", "count_le"):
            cnt = sum(js.count(s) for s in strs)
            v = a["value"]
            if (chk == "count_eq" and cnt != v) or (chk == "count_le" and cnt > v):
                fails.append(f"{chk} 失败 {tag}: 出现 {cnt} 次，要求 {v}")
        else:
            fails.append(f"未知断言类型: {chk}")
    return fails


def main():
    nums = [int(x) for x in sys.argv[1:]] or [1, 2, 3, 4]
    all_ok = True
    for n in nums:
        fails = check_one(n)
        if fails:
            all_ok = False
            print(f"❌ gen_sentence_{n}:")
            for f in fails:
                print(f"   - {f}")
        else:
            print(f"✅ gen_sentence_{n}: 断言全过")
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
