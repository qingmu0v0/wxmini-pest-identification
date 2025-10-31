#!/bin/bash

# 测试编码修复的脚本
echo "🧪 测试中文编码修复效果"
echo "================================"

# 检查后端服务是否运行
echo "📡 检查后端服务状态..."
curl -s http://localhost:8080/api/analysis/health > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ 后端服务运行正常"
else
    echo "❌ 后端服务未运行，请先启动后端服务"
    echo "   启动命令: cd backend && mvn spring-boot:run"
    exit 1
fi

echo ""
echo "🔍 测试健康检查接口..."
response=$(curl -s http://localhost:8080/api/analysis/health)
echo "响应内容: $response"

echo ""
echo "📋 修复内容总结:"
echo "1. ✅ 创建了WebConfig配置类，确保HTTP消息转换器使用UTF-8编码"
echo "2. ✅ 更新了application.yml，添加了服务器和Spring的编码配置"
echo "3. ✅ 简化了前端编码处理逻辑，避免过度处理"
echo "4. ✅ 移除了可能引起问题的编码修复代码"

echo ""
echo "🚀 建议测试步骤:"
echo "1. 重启后端服务: cd backend && mvn spring-boot:run"
echo "2. 在小程序中上传一张植物图片"
echo "3. 检查返回的中文内容是否正常显示"
echo "4. 查看浏览器开发者工具的网络请求，确认Content-Type包含charset=utf-8"

echo ""
echo "📝 如果问题仍然存在，请检查:"
echo "- 浏览器/小程序的编码设置"
echo "- 网络代理是否修改了响应头"
echo "- AI模型返回的内容本身是否有编码问题"
