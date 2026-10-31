#!/usr/bin/env python3
"""runall.py [--full] —— 决策 29 O9：一条命令跑全套回归，全绿才提交（返回码非 0 = 不通过）。
快速档（默认，约 3–4 分钟）：jscheck（node --check + anchorcheck）→ offlinecheck（有就跑）→ App 回归抽样：
  app_check8（词卡词源）、app_check9（练习闭环 + 总地图）、app_check10（我的学习 + 综合自测）、app_check11（别名词条）、app_check12（模块互链 + 总地图知识点）、app_check13（构词派生词）、app_check14（语法例句库）、app_check15（决策 33 菜单去重）、app_check.py tense_matrix、app_check2.py wo wo_grimm、app_check4.py hd_phonics、app_check4.py oral_func。
完整档 --full 另加：app_check5（单词卡模板 55 词）、app_check6（思维导图 25 幕）、app_check7（第一性原理 24 幕）、leakcheck（有就跑）。
每项判定：返回码 0，且输出里没有 BAD / FAIL / 「不合格 N」(N>0) / 非 none 的 errors。"""
import subprocess, sys, os, re, time
HERE = os.path.dirname(os.path.abspath(__file__)); V5 = os.path.join(HERE, '..', 'v5')
Q = [
    ('jscheck', [sys.executable, 'jscheck.py'], HERE),
    ('offlinecheck', [sys.executable, 'offlinecheck.py'], HERE),
    ('朗读 ttscheck', [sys.executable, 'ttscheck.py'], HERE),
    ('音标 phoncheck', [sys.executable, 'phoncheck.py'], HERE),
    ('手机/平板适配 mobilecheck', [sys.executable, 'mobilecheck.py'], HERE),
    ('词卡词源 app_check8', [sys.executable, 'app_check8.py'], V5),
    ('练习闭环 app_check9', [sys.executable, 'app_check9.py'], V5),
    ('我的学习 + 综合自测 app_check10', [sys.executable, 'app_check10.py'], V5),
    ('别名词条 app_check11', [sys.executable, 'app_check11.py'], V5),
    ('模块互链 app_check12', [sys.executable, 'app_check12.py'], V5),
    ('构词派生词 app_check13', [sys.executable, 'app_check13.py'], V5),
    ('语法例句库 app_check14', [sys.executable, 'app_check14.py'], V5),
    ('菜单去重 app_check15', [sys.executable, 'app_check15.py'], V5),
    ('实验室 tense_matrix', [sys.executable, 'app_check.py', 'tense_matrix', 'tenseIdx', '5'], V5),
    ('单词身世 wo_grimm', [sys.executable, 'app_check2.py', 'wo', 'wo_grimm', '1'], V5),
    ('自然拼读剧场 hd_phonics', [sys.executable, 'app_check4.py', 'hd_phonics', "navigateTo('vocab_phonics', { tab: 'steps', stepIdx: 0 })"], V5),
    ('交际句型地图 oral_func', [sys.executable, 'app_check4.py', 'oral_func', "navigateTo('oral_func_map')"], V5),
]
F = [
    ('单词卡模板 app_check5', [sys.executable, 'app_check5.py'], V5),
    ('思维导图 app_check6', [sys.executable, 'app_check6.py'], V5),
    ('第一性原理 app_check7', [sys.executable, 'app_check7.py'], V5),
    ('泄漏 leakcheck', [sys.executable, 'leakcheck.py'], HERE),
]
def bad(out):
    if re.search(r'\bBAD\b|\bFAIL\b', out): return True
    if any(int(n) > 0 for n in re.findall(r'不合格 (\d+)', out)): return True
    return bool(re.search(r"errors (?!none)\[", out))
todo = Q + (F if '--full' in sys.argv else [])
fails = 0
for name, cmd, cwd in todo:
    if not os.path.exists(os.path.join(cwd, cmd[1])): print(f'⏭  {name}（脚本不存在，跳过）'); continue
    t = time.time(); r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=900)
    out = r.stdout + r.stderr; ok = r.returncode == 0 and not bad(out); fails += not ok
    print(f"{'✅' if ok else '❌'} {name}  {time.time() - t:.0f}s  {out.strip().splitlines()[-1][:120] if out.strip() else ''}")
    if not ok: print(out[-1500:])
print('全部通过' if not fails else f'{fails} 项不通过'); sys.exit(1 if fails else 0)
