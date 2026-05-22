@echo off
setlocal
title Life Mall OS
cd /d "%~dp0"

echo.
echo  Life Mall OS - Dev Server
echo  ==========================
echo.

where node >nul 2>&1
if errorlevel 1 goto :no_node

if not exist "node_modules\" (
    echo  Installing dependencies...
    call npm install
    if errorlevel 1 goto :fail
)

echo  Open in browser: http://localhost:5173
echo  Stop server: Ctrl+C
echo.

start /min open-browser.bat

call npm run dev
goto :end

:no_node
echo.
echo  ERROR: Node.js is not installed.
echo  Download LTS: https://nodejs.org
goto :end

:fail
echo.
echo  ERROR: npm command failed.
goto :end

:end
echo.
pause
endlocal
