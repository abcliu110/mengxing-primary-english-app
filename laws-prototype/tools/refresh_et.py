# -*- coding: utf-8 -*-
"""刷新主文件词源区的内联数据（数据层变更后重跑本脚本即可）。

2026-11-03 由 imported/mengxing-etymology-prototype/（归档区）迁回 tools/：
payload 构造与写回逻辑已收编进 tools/gen_et.py（同规约 --check/--write），
本脚本保留为历史刷新入口，等价于执行 `gen_et.py --write` 并做抽查打印。
路径为仓库相对（以本文件位置定位 laws-prototype/），不再写死工作树绝对路径。
"""
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

if __name__ == "__main__":
    r = subprocess.run([sys.executable, str(HERE / "gen_et.py"), "--write"],
                       capture_output=True, text=True)
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr)
    sys.exit(r.returncode)
