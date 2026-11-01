@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo T15 最终回灌：把 payloads.json 中的 149 幕新载荷写回主文件。
echo （执行前会自动备份原文件；任一步校验失败都会中止且不修改主文件。）
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0回灌.ps1"
echo.
pause
