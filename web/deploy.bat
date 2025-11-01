@echo off
echo Building frontend project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed
    pause
    exit /b 1
)

echo.
echo Uploading files to server...
scp -r dist/* root@47.93.147.90:/usr/share/nginx/html/

if %ERRORLEVEL% NEQ 0 (
    echo Upload failed
    pause
    exit /b 1
)

echo.
echo Restarting Nginx service...
ssh root@47.93.147.90 "systemctl reload nginx"

if %ERRORLEVEL% NEQ 0 (
    echo Nginx restart failed
    pause
    exit /b 1
)

echo.
echo Deployment completed!
pause