@echo off
echo Restarting React Development Server...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul
npm start