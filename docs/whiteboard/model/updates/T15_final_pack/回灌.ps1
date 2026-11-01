# T15 最终回灌脚本（与 payloads.json 同目录使用）
# 流程：定位同目录主文件 → 时间戳备份 → 逐条校验现有载荷（不符即中止并指名场景）
# → 插入新引擎 blob → 逐幕替换载荷 → 全量自检 → 全部通过才换入正式文件。
# 本脚本不联网，不修改主文件以外的任何文件（仅在同目录生成备份与临时文件）。
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$appPath = Join-Path $dir '萌星小学英语_最终合并版.html'
$packPath = Join-Path $dir 'payloads.json'

function Fail([string]$msg) {
Write-Host ''
Write-Host "$msg" -ForegroundColor Red
Write-Host '正式文件未被修改。如需恢复，可使用同目录的时间戳备份文件。'
exit 2
}
function Sha256Hex([string]$s) {
$sha = [System.Security.Cryptography.SHA256]::Create()
$bytes = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($s))
return ([System.BitConverter]::ToString($bytes)).Replace('-', '').ToLower()
}
function GunzipText([string]$b64) {
$raw = [System.Convert]::FromBase64String($b64)
$ms = New-Object System.IO.MemoryStream(, $raw)
$gz = New-Object System.IO.Compression.GZipStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
$sr = New-Object System.IO.StreamReader($gz, [System.Text.Encoding]::UTF8)
try { return $sr.ReadToEnd()} finally { $sr.Dispose()}
}
$ELEM = '<script type="text/plain" id="(wb5html-[^"]+)"([^>]*)>(.*?)</script>'
$BLOB = '<script type="text/plain" id="wb5blob-([0-9a-f]{16})">(.*?)</script>'
$opts = [System.Text.RegularExpressions.RegexOptions]::Singleline

function Parse-Tables([string]$s, [ref]$elems, [ref]$blobs) {
$e = @{}; $b = @{}
foreach ($m in [regex]::Matches($s, $ELEM, $opts)) {
$db = [regex]::Match($m.Groups[2].Value, 'data-blobs="([^"]*)"')
$e[$m.Groups[1].Value] = @($m.Groups[3].Value.Trim(), $(if ($db.Success) { $db.Groups[1].Value} else { ''}))
}
foreach ($m in [regex]::Matches($s, $BLOB, $opts)) { $b[$m.Groups[1].Value] = $m.Groups[2].Value}
$elems.Value = $e; $blobs.Value = $b
}
function Blob-Text($blobs, [string]$h) {
$c = $blobs[$h]
if ($c.StartsWith('gz:')) { return GunzipText $c.Substring(3)}
return $c
}
function Assemble([string]$payloadB64, $blobs) {
$t = GunzipText $payloadB64
$t = $t.Replace('</wb5-script', '</script')
return [regex]::Replace($t, '@@B:([0-9a-f]{16})@@', [System.Text.RegularExpressions.MatchEvaluator]{
param($m)
if ($blobs.ContainsKey($m.Groups[1].Value)) { return Blob-Text $blobs $m.Groups[1].Value}
return ''
})
}
function Skeleton([string]$s) {
$s = [regex]::Replace($s, $ELEM, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) '<!--WB5ELEM:' + $m.Groups[1].Value + '-->'}, $opts)
$s = [regex]::Replace($s, $BLOB, '', $opts)
return $s
}

if (-not (Test-Path $appPath)) { Fail "在脚本同目录找不到主文件「萌星小学英语_最终合并版.html」。请把 回灌.bat、回灌.ps1、payloads.json 与主文件放在同一目录。"}
if (-not (Test-Path $packPath)) { Fail '在脚本同目录找不到 payloads.json 回灌包。'}

Write-Host '正在读取主文件与回灌包……'
$text = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)
$pack = Get-Content -Raw -Encoding UTF8 $packPath | ConvertFrom-Json
$entries = @($pack.entries)
$elems = $null; $blobs = $null
Parse-Tables $text ([ref]$elems) ([ref]$blobs)
if ($elems.Count -ne 549) { Fail "主文件内嵌场景数异常：$($elems.Count)（应为 549）。"}

Write-Host "逐条校验现有载荷（共 $($entries.Count) 条）……"
foreach ($e in $entries) {
if (-not $elems.ContainsKey($e.elementId)) { Fail "找不到场景元素 $($e.elementId)（$($e.scene)）。"}
if ((Sha256Hex $elems[$e.elementId][0]) -ne $e.oldPayloadSha256) { Fail "场景 $($e.scene)（$($e.elementId)）的现有载荷校验不一致，文件可能已被修改。"}
if ((Sha256Hex $e.newPayloadBase64) -ne $e.newPayloadSha256) { Fail "回灌包内场景 $($e.scene)（$($e.elementId)）的新载荷自校验失败。"}
}

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupPath = Join-Path $dir "萌星小学英语_最终合并版_备份_$stamp.html"
Copy-Item $appPath $backupPath
Write-Host "已备份原文件：$backupPath"

$byId = @{}
foreach ($e in $entries) { $byId[$e.elementId] = $e}
$work = [regex]::Replace($text, $ELEM, [System.Text.RegularExpressions.MatchEvaluator]{
param($m)
$eid = $m.Groups[1].Value
if (-not $byId.ContainsKey($eid)) { return $m.Value}
$e = $byId[$eid]
$attrs = [regex]::Replace($m.Groups[2].Value, 'data-blobs="[^"]*"', 'data-blobs="' + ($e.dataBlobs -join ' ') + '"')
$inner = $m.Groups[3].Value
$lead = [regex]::Match($inner, '^\s*').Value
$trail = [regex]::Match($inner, '\s*$').Value
return '<script type="text/plain" id="' + $eid + '"' + $attrs + '>' + $lead + $e.newPayloadBase64 + $trail + '</script>'
}, $opts)

$elems2 = $null; $blobs2 = $null
Parse-Tables $work ([ref]$elems2) ([ref]$blobs2)
$toInsert = [ordered]@{}
foreach ($p in $pack.sharedNewBlobs.PSObject.Properties) { if (-not $blobs2.ContainsKey($p.Name)) { $toInsert[$p.Name] = $p.Value}}
foreach ($e in $entries) {
if ($e.newBlobs) { foreach ($p in $e.newBlobs.PSObject.Properties) { if (-not $blobs2.ContainsKey($p.Name)) { $toInsert[$p.Name] = $p.Value}}}
}
if ($toInsert.Count -gt 0) {
$bm = [regex]::Matches($work, $BLOB, $opts)
if ($bm.Count -eq 0) { Fail '主文件中找不到任何 blob 元素，无法插入新引擎。'}
$pos = $bm[$bm.Count - 1].Index + $bm[$bm.Count - 1].Length
$ins = ''
foreach ($kv in $toInsert.GetEnumerator()) { $ins += '<script type="text/plain" id="wb5blob-' + $kv.Key + '">' + $kv.Value + '</script>'}
$work = $work.Substring(0, $pos) + $ins + $work.Substring($pos)
Parse-Tables $work ([ref]$elems2) ([ref]$blobs2)
}

Write-Host '正在全量自检（549 载荷解码 + 标志内容 + DB 区一致性）……'
if ($elems2.Count -ne 549) { Fail "自检失败：替换后场景数 $($elems2.Count)!= 549。"}
foreach ($kv in $elems2.GetEnumerator()) {
try { [void](GunzipText $kv.Value[0])} catch { Fail "自检失败：场景 $($kv.Key) 载荷无法解码。"}
}
foreach ($e in $entries) {
$pay = $elems2[$e.elementId][0]
if ((Sha256Hex $pay) -ne $e.newPayloadSha256) { Fail "自检失败：场景 $($e.scene) 替换后载荷校验不一致。"}
$asm = Assemble $pay $blobs2
foreach ($mc in @($e.mustContain)) { if (-not $asm.Contains($mc)) { Fail "自检失败：场景 $($e.scene) 缺少标志内容。"}}
foreach ($mnc in @($e.mustNotContain)) { if ($asm.Contains($mnc)) { Fail "自检失败：场景 $($e.scene) 仍含不应出现的内容。"}}
}
if ((Skeleton $work) -ne (Skeleton $text)) { Fail '自检失败：动画载荷以外的文件内容（DB 区）发生意外变化。'}
$vfo = [regex]::Matches($work, 'verb_form_of').Count
if ($vfo -ne 58) { Fail "自检失败：verb_form_of 标记计数 $vfo!= 58。"}
if (-not $work.Contains('.split("/").map(s => s.trim())') -or -not $work.Contains('wlPosMatch')) { Fail '自检失败：wlPosMatch 词元口径代码不在位。'}

$staged = Join-Path $dir '萌星小学英语_最终合并版.t15staged'
[System.IO.File]::WriteAllText($staged, $work, (New-Object System.Text.UTF8Encoding($false)))
Move-Item -Force $staged $appPath
Write-Host ''
Write-Host "已回灌 $($entries.Count) 幕（另插入新引擎 blob $($toInsert.Count) 个）。" -ForegroundColor Green
Write-Host "原文件备份：$backupPath"
exit 0
