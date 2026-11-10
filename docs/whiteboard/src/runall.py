#!/usr/bin/env python3
"""runall.py [--full] —— 决策 29 O9：一条命令跑全套回归，全绿才提交（返回码非 0 = 不通过）。
快速档（默认，约 3–4 分钟）：jscheck（node --check；anchorcheck 已废止，见 `src/anchorcheck.RETIRED.md`）→ wbdupcheck（语法白板跨课串板，决策 36 ①1）→ wbtextcheck（截断句 / ** / 字幕口诀，决策 36 ①3）→ offlinecheck（有就跑）→ App 回归抽样（2026-11-11 left4/appcheck 线后均为静态检查，不再读已删老 App）：
  app_check8（词卡词源）、app_check11（别名词条）、app_check13（构词派生词）、app_check14（语法例句库）、app_check_parts（决策 36-② 长幕分节）、app_check_vocab_add（新增词条 35-A2）。
  已退役、不再调用（各见 `v5/app_check*.RETIRED.md`）：app_check9（练习闭环 + 总地图）、app_check10（我的学习 + 综合自测）、app_check12（模块互链）、app_check15（决策 33 菜单去重）、app_check.py（实验室 tense_matrix）、app_check2.py（单词身世 wo_grimm）、app_check4.py（自然拼读剧场 hd_phonics、交际句型地图 oral_func）。
完整档 --full 另加：app_check6（思维导图 25 幕）、app_check7（第一性原理 24 幕）、leakcheck（有就跑）；app_check5（单词卡模板）已退役，见 `v5/app_check5.RETIRED.md`。
每项判定：返回码 0，且输出里没有 BAD / FAIL / 「不合格 N」(N>0) / 非 none 的 errors。"""
import subprocess, sys, os, re, time
HERE = os.path.dirname(os.path.abspath(__file__)); V5 = os.path.join(HERE, '..', 'v5')
Q = [
    ('jscheck', [sys.executable, 'jscheck.py'], HERE),
    ('offlinecheck', [sys.executable, 'offlinecheck.py'], HERE),
    ('朗读 ttscheck', [sys.executable, 'ttscheck.py'], HERE),
    ('音标 phoncheck', [sys.executable, 'phoncheck.py'], HERE),
    ('课标词覆盖 kebiaocheck（35-A2）', [sys.executable, 'kebiaocheck.py'], HERE),
    ('手机/平板适配 mobilecheck', [sys.executable, 'mobilecheck.py'], HERE),
    ('语法白板串板 wbdupcheck', [sys.executable, 'wbdupcheck.py'], HERE),
    ('白板截断句 / Markdown / 字幕口诀 wbtextcheck（决策 36 ①3）', [sys.executable, 'wbtextcheck.py'], HERE),
    ('数据占位 datacheck（35-A3）', [sys.executable, 'datacheck.py'], HERE),
    ('语法硬伤 grammarcheck（35-B2）', [sys.executable, 'grammarcheck.py'], HERE),
    ('白板手机播放框 playercheck（R37-01）', [sys.executable, 'playercheck.py'], HERE),
    ('家长门按钮 gatecheck（R37-13）', [sys.executable, 'gatecheck.py'], HERE),
    ('Markdown 残留 mdcheck（R37-04）', [sys.executable, 'mdcheck.py'], HERE),
    ('手机顶栏 topbarcheck（R37-09）', [sys.executable, 'topbarcheck.py'], HERE),
    ('单词表分页 wordlistcheck（R37-10）', [sys.executable, 'wordlistcheck.py'], HERE),
    ('按钮对比度 contrastcheck（R37-14）', [sys.executable, 'contrastcheck.py'], HERE),
    ('儿童页术语 / 重复入口 jargoncheck（R37-12）', [sys.executable, 'jargoncheck.py'], HERE),
    ('自造象形词源 etymcheck（R37-02）', [sys.executable, 'etymcheck.py'], HERE),
    ('白板启发性 insightcheck（R38）', [sys.executable, 'insightcheck.py'], HERE),
    ('词卡词源 app_check8', [sys.executable, 'app_check8.py'], V5),
    ('别名词条 app_check11', [sys.executable, 'app_check11.py'], V5),
    ('构词派生词 app_check13', [sys.executable, 'app_check13.py'], V5),
    ('语法例句库 app_check14', [sys.executable, 'app_check14.py'], V5),
    ('长幕分节 app_check_parts（决策 36-②）', [sys.executable, 'app_check_parts.py'], V5),
    ('新增词条 app_check_vocab_add（35-A2）', [sys.executable, 'app_check_vocab_add.py'], V5),
]
F = [
    ('思维导图 app_check6', [sys.executable, 'app_check6.py'], V5),
    ('第一性原理 app_check7', [sys.executable, 'app_check7.py'], V5),
    ('泄漏 leakcheck', [sys.executable, 'leakcheck.py'], HERE),
]
WARN = {'长幕时长 durcheck（决策 36-②，仅提示）', '专题纵深 depthcheck（决策 39，仅提示）', '死代码 deadcode（第八波第 23 项，仅提示）'}   # 只报不判：36-② 长幕还没拆完，拆完后从这里删掉即转为必过
Q.insert(8, ('长幕时长 durcheck（决策 36-②，仅提示）', [sys.executable, 'durcheck.py'], HERE))
Q.insert(9, ('专题纵深 depthcheck（决策 39，仅提示）', [sys.executable, 'depthcheck.py'], HERE))   # 推广完后去掉 WARN 并加 --strict
Q.insert(10, ('死代码 deadcode（第八波第 23 项，仅提示）', [sys.executable, 'deadcode.py'], HERE))   # 只报不判：动态拼名调用可能误报，且函数覆盖只含顶层声明
def bad(out):
    if re.search(r'\bBAD\b|\bFAIL\b', out): return True
    if any(int(n) > 0 for n in re.findall(r'不合格 (\d+)', out)): return True
    return bool(re.search(r"errors (?!none)\[", out))
todo = Q + (F if '--full' in sys.argv else [])
fails = 0
for name, cmd, cwd in todo:
    if not os.path.exists(os.path.join(cwd, cmd[1])): print(f'⏭  {name}（脚本不存在，跳过）'); continue
    t = time.time(); r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=900)
    out = r.stdout + r.stderr; ok = r.returncode == 0 and not bad(out); fails += not ok and name not in WARN
    print(f"{'✅' if ok else ('⚠️' if name in WARN else '❌')} {name}  {time.time() - t:.0f}s  {out.strip().splitlines()[-1][:120] if out.strip() else ''}")
    if not ok: print(out[-1500:] if name not in WARN else '\n'.join(l for l in out.splitlines() if l.startswith('❌'))[:1500])
print('全部通过' if not fails else f'{fails} 项不通过'); sys.exit(1 if fails else 0)
