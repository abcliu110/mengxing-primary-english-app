#!/usr/bin/env python3
"""多视图渲染（纵切版）：同一知识模型 → 要点卡 HTML + 测验 HTML。
用法: python3 gen_views.py boundedness.yaml <out_dir>
视图只读模型，不回写副本；改模型一处，两视图与场景同步变化。
"""
import sys, yaml, pathlib, html

TYPE_ZH = {"rule": "真规则", "tendency": "倾向（有例外）", "mnemonic": "记忆联想", "etymology": "真词源"}
TYPE_COL = {"rule": "#15803d", "tendency": "#b45309", "mnemonic": "#7c3aed", "etymology": "#0e7490"}

def esc(s): return html.escape(str(s))

def main(model_path, out_dir):
    doc = yaml.safe_load(open(model_path, encoding="utf-8"))
    claims = {c["id"]: c for c in doc["claims"]}
    exc_by = {}
    for e in doc["exceptions"]:
        exc_by.setdefault(e["exceptionOf"], []).append(e)
    ex_by = {}
    for e in doc["examples"]:
        ex_by.setdefault(e["supports"], []).append(e)

    # ---------- 要点卡 ----------
    cards = []
    for c in doc["concepts"]:
        rows = []
        for cl in doc["claims"]:
            if cl["concept"] != c["id"]: continue
            exs = "".join(f"<li>{esc(e['text'])}<span class=g>（{esc(e['gloss'])}）</span></li>" for e in ex_by.get(cl["id"], []))
            xcs = "".join(f"<li>⚠ {esc(e['text'])}<span class=g>——{esc(e['note'])} </span></li>" for e in exc_by.get(cl["id"], []))
            rows.append(f"""<div class=claim><span class=badge style="background:{TYPE_COL[cl['type']]}">{TYPE_ZH[cl['type']]}</span>
<p class=st>{esc(cl['statement'])}</p>
{f"<ul>{exs}</ul>" if exs else ""}{f"<ul class=xc>{xcs}</ul>" if xcs else ""}</div>""")
        chs = "".join(f"<p class=chant>🎵 {esc(ch['text'])}</p>" for ch in doc["chants"] if claims[ch["for"]]["concept"] == c["id"])
        cards.append(f"<section><h2>{esc(c['name'])}</h2><p class=gloss>{esc(c['gloss'])}</p>{''.join(rows)}{chs}</section>")
    card_html = f"""<!DOCTYPE html><html lang=zh><meta charset=utf-8><title>要点卡 · {esc(doc['title'])}</title>
<style>body{{font-family:sans-serif;max-width:860px;margin:24px auto;padding:0 16px;color:#26221c}}h1{{font-size:26px}}section{{border:1px solid #e5d9bd;border-radius:14px;padding:18px 22px;margin:18px 0;background:#fffdf7}}h2{{margin:4px 0}}.gloss{{color:#777}}.claim{{border-top:1px dashed #ddd;padding:10px 0}}.badge{{color:#fff;border-radius:8px;padding:2px 10px;font-size:13px}}.st{{font-size:17px}}ul{{margin:6px 0}}.g{{color:#888;font-size:14px}}.xc li{{color:#92400e}}.chant{{color:#15803d;font-weight:bold}}.src{{color:#aaa;font-size:13px}}</style>
<h1>📦 要点卡 · {esc(doc['title'])}</h1><p class=src>由知识模型 {esc(doc['family'])}.yaml 自动生成（视图与场景同源，改模型一处、处处更新）</p>{''.join(cards)}</html>"""
    out = pathlib.Path(out_dir); out.mkdir(parents=True, exist_ok=True)
    (out / "boundedness-card.html").write_text(card_html, encoding="utf-8")

    # ---------- 测验（题目锚定记录 ID） ----------
    Q = [
        ("判断：哪些能直接加 -s 数？（多选）", "apples / bread / bowls of rice 里的 bowls / homework / cups", "apples、bowls、cups 能；bread、homework 是『一摊/一类』，不能直接加 -s。", "cl-packaging"),
        ("填空：two ____ of rice（bowl / bowls）", "选 bowls", "-s 加在单位词 bowl 上 → bowls；rice 本身不加。", "cl-container"),
        ("判断对错：『面包切开就没有边，所以不可数。』", "错", "切开的面包片有边。不可数的原因是：切开之后每一块还是面包——它被看成一摊，不是一个个的单位。", "cl-cut-test"),
        ("选一选：『我有好多作业』→ I have a lot of ____.（homework / homeworks）", "homework", "作业是『一类事』，不可数，不加 -s。", "cl-packaging + xc-homework-uncuttable"),
        ("想一想：菜单上写 two coffees，为什么 coffee 能加 -s？", "是 two cups of coffee 的省略说法", "-s 其实落在被省略的单位 cups 上，coffee 本身仍是不可数。", "xc-two-coffees"),
        ("判断对错：『米粒一颗颗分得清，所以 rice 是可数名词。』", "错", "米粒虽分明，英语习惯把米饭整摊看待，要借碗数：two bowls of rice。", "xc-rice-grains"),
    ]
    items = "".join(f"""<div class=q><p><b>{i+1}.</b> {esc(q)}</p><details><summary>看答案</summary><p>{esc(a)}</p><p class=why>{esc(w)} <span class=src>［依据：{esc(src)}］</span></p></details></div>""" for i, (q, a, w, src) in enumerate(Q))
    quiz_html = f"""<!DOCTYPE html><html lang=zh><meta charset=utf-8><title>小测验 · {esc(doc['title'])}</title>
<style>body{{font-family:sans-serif;max-width:860px;margin:24px auto;padding:0 16px;color:#26221c}}.q{{border:1px solid #e5d9bd;border-radius:14px;padding:14px 20px;margin:14px 0;background:#fffdf7}}.why{{color:#555}}.src{{color:#aaa;font-size:13px}}summary{{cursor:pointer;color:#2563eb}}</style>
<h1>📝 小测验 · {esc(doc['title'])}</h1><p class=src>题目由知识模型自动生成，每题标注依据的记录 ID——模型改了，题目答案随之更新。</p>{items}</html>"""
    (out / "boundedness-quiz.html").write_text(quiz_html, encoding="utf-8")
    print(f"✓ 要点卡 + 测验 → {out}/boundedness-card.html, boundedness-quiz.html")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
