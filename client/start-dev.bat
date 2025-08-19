@echo off
echo Starting Grab Restaurant Frontend Development...
echo.

echo [1/2] Starting JSON Server (Mock API)...
start "JSON Server" cmd /k "npm run json-server"

echo [2/2] Starting Frontend Development Server...
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo  Grab Restaurant Development Started!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo API:      http://localhost:3001
echo.
echo Press any key to continue...
pause >nul
