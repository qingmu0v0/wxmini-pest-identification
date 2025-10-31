@echo off
REM 植物病虫害识别系统启动脚本 (Windows)
REM 请先设置您的DashScope API密钥

REM 检查API密钥是否设置
if "%DASHSCOPE_API_KEY%"=="" (
    echo 错误: 请先设置DASHSCOPE_API_KEY环境变量
    echo 示例: set DASHSCOPE_API_KEY=sk-your-api-key-here
    echo 或者编辑此脚本，在下方设置您的API密钥
    pause
    exit /b 1
)

echo 使用API密钥: %DASHSCOPE_API_KEY:~0,8%...

REM 编译项目
echo 正在编译项目...
mvn clean compile -q

if %errorlevel% neq 0 (
    echo 编译失败，请检查代码
    pause
    exit /b 1
)

REM 启动服务
echo 启动服务...
mvn spring-boot:run
