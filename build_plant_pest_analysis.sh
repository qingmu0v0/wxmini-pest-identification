#!/bin/bash

# 植物病虫害分析系统打包脚本
# 支持dev和master分支，包含检查终止命令、启动命令和日志存储功能
# 打包文件名: plant-pest-analysis-1.0.0.jar

# 设置变量
PROJECT_DIR=$(dirname "$0")
BACKEND_DIR="${PROJECT_DIR}/backend"
LOG_DIR="${PROJECT_DIR}/logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/build_${TIMESTAMP}.log"
JAR_NAME="plant-pest-analysis-1.0.0.jar"
TARGET_BRANCH=""

# 创建日志目录
mkdir -p "${LOG_DIR}"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

# 错误处理函数
error_exit() {
    log "错误: $1"
    exit 1
}

# 检查Java环境
check_java() {
    log "检查Java环境..."
    if ! command -v java &> /dev/null; then
        error_exit "Java未安装或未配置到PATH中"
    fi
    
    if ! command -v mvn &> /dev/null; then
        error_exit "Maven未安装或未配置到PATH中"
    fi
    
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    log "Java版本: ${JAVA_VERSION}"
    
    MVN_VERSION=$(mvn -version | head -n 1)
    log "Maven版本: ${MVN_VERSION}"
}

# 检查Git环境
check_git() {
    log "检查Git环境..."
    if ! command -v git &> /dev/null; then
        error_exit "Git未安装或未配置到PATH中"
    fi
    
    cd "${PROJECT_DIR}"
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
        error_exit "当前目录不是Git仓库"
    fi
    
    log "Git版本: $(git --version)"
}

# 停止运行中的服务
stop_service() {
    log "检查并停止运行中的服务..."
    
    # 查找可能运行的Java进程
    JAVA_PIDS=$(jps -l | grep -i "plant-pest" | awk '{print $1}')
    
    if [ -n "$JAVA_PIDS" ]; then
        log "发现运行中的植物病虫害分析服务进程: $JAVA_PIDS"
        for PID in $JAVA_PIDS; do
            log "停止进程 $PID..."
            kill "$PID"
            sleep 2
            
            # 检查进程是否仍在运行
            if kill -0 "$PID" 2>/dev/null; then
                log "进程 $PID 未响应，强制终止..."
                kill -9 "$PID"
                sleep 1
            fi
        done
        log "所有相关进程已停止"
    else
        log "未发现运行中的植物病虫害分析服务"
    fi
}

# 切换到指定分支
switch_branch() {
    local branch=$1
    log "切换到分支: $branch"
    
    cd "${PROJECT_DIR}"
    
    # 拉取最新代码
    log "拉取最新代码..."
    git fetch origin || error_exit "无法拉取远程代码"
    
    # 检查分支是否存在
    if ! git rev-parse --verify "origin/$branch" &> /dev/null; then
        error_exit "分支 $branch 不存在"
    fi
    
    # 切换到指定分支
    git checkout "$branch" || error_exit "无法切换到分支 $branch"
    
    # 重置到远程分支最新提交
    git reset --hard "origin/$branch" || error_exit "无法重置到远程分支最新提交"
    
    log "已切换到分支 $branch 并更新到最新版本"
    log "当前提交: $(git rev-parse --short HEAD)"
}

# 构建项目
build_project() {
    log "开始构建项目..."
    
    cd "${BACKEND_DIR}"
    
    # 清理之前的构建
    log "执行Maven清理..."
    mvn clean || error_exit "Maven清理失败"
    
    # 编译和打包
    log "执行Maven编译和打包..."
    mvn package -DskipTests || error_exit "Maven打包失败"
    
    # 检查生成的JAR文件
    if [ ! -f "target/${JAR_NAME}" ]; then
        error_exit "打包失败，未找到生成的JAR文件: target/${JAR_NAME}"
    fi
    
    log "项目构建成功"
    log "生成的JAR文件: target/${JAR_NAME}"
}

# 启动服务
start_service() {
    log "准备启动服务..."
    
    cd "${BACKEND_DIR}"
    
    # 创建启动脚本
    cat > start_service.sh << EOF
#!/bin/bash
# 植物病虫害分析系统启动脚本
# 自动生成于 $(date)

# 设置变量
JAR_FILE="target/${JAR_NAME}"
PID_FILE="plant-pest-analysis.pid"
LOG_FILE="logs/plant-pest-analysis.log"

# 创建日志目录
mkdir -p logs

# 检查JAR文件是否存在
if [ ! -f "\$JAR_FILE" ]; then
    echo "错误: JAR文件不存在: \$JAR_FILE"
    exit 1
fi

# 检查服务是否已经运行
if [ -f "\$PID_FILE" ]; then
    PID=\$(cat "\$PID_FILE")
    if kill -0 "\$PID" 2>/dev/null; then
        echo "服务已在运行中 (PID: \$PID)"
        exit 0
    else
        echo "PID文件存在但进程不存在，删除PID文件"
        rm -f "\$PID_FILE"
    fi
fi

# 启动服务
echo "启动植物病虫害分析系统..."
nohup java -jar "\$JAR_FILE" > "\$LOG_FILE" 2>&1 &
PID=\$!

# 保存PID
echo \$PID > "\$PID_FILE"

echo "服务已启动 (PID: \$PID)"
echo "日志文件: \$LOG_FILE"
echo "PID文件: \$PID_FILE"
EOF
    
    chmod +x start_service.sh
    
    # 创建停止脚本
    cat > stop_service.sh << EOF
#!/bin/bash
# 植物病虫害分析系统停止脚本
# 自动生成于 $(date)

PID_FILE="plant-pest-analysis.pid"

# 检查PID文件是否存在
if [ ! -f "\$PID_FILE" ]; then
    echo "PID文件不存在，服务可能未运行"
    exit 0
fi

# 读取PID
PID=\$(cat "\$PID_FILE")

# 检查进程是否存在
if ! kill -0 "\$PID" 2>/dev/null; then
    echo "进程 \$PID 不存在，删除PID文件"
    rm -f "\$PID_FILE"
    exit 0
fi

# 停止进程
echo "停止服务 (PID: \$PID)..."
kill "\$PID"

# 等待进程停止
for i in {1..10}; do
    if ! kill -0 "\$PID" 2>/dev/null; then
        echo "服务已停止"
        rm -f "\$PID_FILE"
        exit 0
    fi
    sleep 1
done

# 如果进程仍在运行，强制终止
echo "进程未响应，强制终止..."
kill -9 "\$PID"
rm -f "\$PID_FILE"
echo "服务已强制停止"
EOF
    
    chmod +x stop_service.sh
    
    log "启动和停止脚本已创建"
    
    # 询问是否立即启动服务
    read -p "是否立即启动服务? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "启动服务..."
        ./start_service.sh
        
        # 等待服务启动
        sleep 3
        
        # 检查服务是否成功启动
        if [ -f "plant-pest-analysis.pid" ]; then
            PID=$(cat "plant-pest-analysis.pid")
            if kill -0 "$PID" 2>/dev/null; then
                log "服务启动成功 (PID: $PID)"
            else
                log "警告: 服务启动失败，请检查日志"
            fi
        else
            log "警告: 未找到PID文件，服务可能启动失败"
        fi
    else
        log "跳过服务启动，可以使用 ./start_service.sh 手动启动"
    fi
}

# 主函数
main() {
    log "开始植物病虫害分析系统打包流程"
    log "日志文件: ${LOG_FILE}"
    
    # 检查参数
    if [ $# -ne 1 ]; then
        echo "用法: $0 <分支名>"
        echo "支持的分支: dev, master"
        exit 1
    fi
    
    TARGET_BRANCH=$1
    
    # 验证分支参数
    if [ "$TARGET_BRANCH" != "dev" ] && [ "$TARGET_BRANCH" != "master" ]; then
        error_exit "不支持的分支: $TARGET_BRANCH，仅支持 dev 或 master"
    fi
    
    # 执行流程
    check_java
    check_git
    stop_service
    switch_branch "$TARGET_BRANCH"
    build_project
    start_service
    
    log "打包流程完成"
    log "JAR文件位置: ${BACKEND_DIR}/target/${JAR_NAME}"
    log "如需启动服务，请运行: cd ${BACKEND_DIR} && ./start_service.sh"
    log "如需停止服务，请运行: cd ${BACKEND_DIR} && ./stop_service.sh"
    log "完整日志: ${LOG_FILE}"
}

# 执行主函数
main "$@"