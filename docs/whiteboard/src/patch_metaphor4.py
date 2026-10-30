"""patch_metaphor4.py —— 决策 6 空间隐喻：METAPHOR_CODES_DB 加「密码四」（幂等）。白板幕 = metaphor_code 第 4 幕（content/metaphor_code_4.txt）。
出处：Lakoff & Johnson, Metaphors We Live By (1980)：MORE IS UP、HAPPY IS UP、TIME IS MONEY 等方位 / 结构隐喻。"""
import pathlib
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8'); MARK = 'catTitle: "🧭 密码四'
ENTRY = '''  {
    catTitle: "🧭 密码四：空间方向隐喻（上下 · 前后 · 时间就是钱）",
    desc: "英语把空间方向借来说抽象的东西：上 = 多 / 开心，下 = 少 / 难过；前 = 将来，后 = 过去；时间像钱一样能花、能省、能浪费（出处：Lakoff & Johnson《我们赖以生存的隐喻》，1980）。⚠️ 中文「以前、前天」的「前」指过去，和英语 forward 方向相反：",
    cards: [
      { key: "⬆️ UP / DOWN (上下 ➔ 多少)", literal: "东西堆得越多就越高", metaphors: "prices go up (涨价) · the number goes down (数字变小)", ex: "Prices go up." },
      { key: "😊 UP / DOWN (上下 ➔ 心情好坏)", literal: "开心时抬头挺胸，难过时低头", metaphors: "cheer up (振作起来) · feel down (心情低落)", ex: "Cheer up! I feel down today." },
      { key: "➡️ FORWARD / BACK (前后 ➔ 将来与过去)", literal: "面朝将来往前走，过去在身后", metaphors: "look forward to (盼望) · look back (回顾)", ex: "I look forward to the trip." },
      { key: "⏰ TIME = MONEY (时间就是钱)", literal: "钱能花、能省、能浪费", metaphors: "spend time (花时间) · save time (省时间) · waste time (浪费时间)", ex: "Don't waste time." },
    ]
  },
'''
if MARK not in s:
    i = s.index('const METAPHOR_CODES_DB = ['); j = s.index('\n];', i)
    s = s[:j] + ',\n' + ENTRY.rstrip(',\n') + s[j:] if not s[:j].rstrip().endswith(',') else s[:j] + '\n' + ENTRY.rstrip(',\n') + s[j:]
    APP.write_text(s, encoding='utf-8'); print('patched')
else: print('already')
