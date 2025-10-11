# 快速启动指南

本指南将帮助您在5分钟内启动并运行植物病虫害识别系统。

## 📋 前置要求

确保您的系统已安装以下软件：

- ✅ **Java 17+** - 后端运行环境
- ✅ **Node.js 16+** - 前端构建工具
- ✅ **MySQL 8.0+** - 数据库
- ✅ **Maven 3.6+** - Java构建工具

## 🚀 快速开始（3步）

### 第1步：配置数据库

```bash
# 1. 启动MySQL
sudo systemctl start mysql

# 2. 创建数据库
mysql -u root -p
```

在MySQL中执行：
```sql
CREATE DATABASE plant_pest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
source backend/src/main/resources/db/schema.sql;
exit;
```

### 第2步：配置并启动后端

```bash
# 1. 进入后端目录
cd backend

# 2. 复制配置文件
cp src/main/resources/application-example.yml src/main/resources/application.yml

# 3. 编辑配置文件（重要！）
vim src/main/resources/application.yml
```

**必须修改的配置：**
```yaml
spring:
  datasource:
    username: root          # 您的MySQL用户名
    password: your_password # 您的MySQL密码

ai:
  qwen3:
    api-key: your-qwen-api-key  # 您的通义千问API Key
```

**获取QWEN API Key：**
1. 访问 [阿里云DashScope](https://dashscope.console.aliyun.com/)
2. 注册/登录账号
3. 创建API Key
4. 复制到配置文件

```bash
# 4. 启动后端服务
mvn spring-boot:run
```

✅ 看到 "植物病虫害识别系统启动成功！" 表示后端启动成功！

### 第3步：启动Web前端

打开**新的终端窗口**：

```bash
# 1. 进入Web目录
cd web

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

✅ 浏览器自动打开 `http://localhost:8081` 即可使用！

---

## 🎯 验证安装

### 1. 测试后端API

```bash
# 健康检查
curl http://localhost:8080/api/analysis/health

# 期望返回：
{
  "code": 200,
  "message": "成功",
  "data": "服务正常运行"
}
```

### 2. 测试Web界面

1. 打开浏览器访问 `http://localhost:8081`
2. 点击顶部导航 "在线识别"
3. 上传一张植物图片
4. 点击 "开始分析"
5. 查看分析结果

---

## 📱 启动微信小程序（可选）

### 方式一：使用HBuilderX（推荐）

1. **下载HBuilderX**
   - 访问 https://www.dcloud.io/hbuilderx.html
   - 下载并安装

2. **导入项目**
   - 打开HBuilderX
   - 文件 -> 导入 -> 选择 `mini-program` 目录

3. **配置**
   - 修改 `manifest.json` 中的 `appid`
   - 修改 `utils/config.js` 中的 `BASE_URL`

4. **运行**
   - 运行 -> 运行到小程序模拟器 -> 微信开发者工具

### 方式二：命令行

```bash
cd mini-program
npm install
npm run dev:mp-weixin
```

---

## 🔧 常见问题解决

### ❌ 后端启动失败

**问题1: 无法连接数据库**
```
Error: Access denied for user 'root'@'localhost'
```
**解决**：检查 `application.yml` 中的数据库用户名和密码

**问题2: 端口被占用**
```
Port 8080 was already in use
```
**解决**：
```bash
# 查找占用端口的进程
lsof -i :8080
# 杀死进程或修改配置文件中的端口号
```

**问题3: Java版本不对**
```
UnsupportedClassVersionError
```
**解决**：确保使用 Java 17+
```bash
java -version  # 应显示 17 或更高版本
```

### ❌ 前端启动失败

**问题1: npm install 失败**
```
npm ERR! network timeout
```
**解决**：使用国内镜像
```bash
npm install --registry=https://registry.npmmirror.com
```

**问题2: 端口被占用**
**解决**：修改 `vite.config.js` 中的端口号

### ❌ API调用失败

**问题: 图片上传后无响应**

1. **检查后端日志**
```bash
# 查看终端输出，寻找错误信息
```

2. **检查API Key**
- 确保 QWEN API Key 正确
- 检查API Key是否有余额

3. **检查网络**
- 确保能访问阿里云服务
- 检查防火墙设置

---

## 📊 功能测试

### 测试流程

1. **准备测试图片**
   - 拍摄或下载一张植物照片
   - 建议：清晰的叶片特写

2. **上传分析**
   - 访问 `http://localhost:8081/analysis`
   - 点击上传区域
   - 选择图片
   - 点击"开始分析"

3. **查看结果**
   - 等待3-10秒
   - 查看识别的植物名称
   - 查看虫蛀风险评估
   - 查看蚜虫检测结果
   - 阅读详细分析和防治建议

---

## 🎨 界面预览

### Web界面功能

✨ **首页**
- 功能介绍
- 使用流程说明
- 功能特点展示

✨ **在线识别页**
- 图片上传（拖拽或点击）
- AI模型选择
- 实时分析进度
- 可视化结果展示

✨ **关于页面**
- 项目介绍
- 技术栈说明
- 联系方式

### 小程序功能

✨ **识别页**
- 拍照或相册选择
- 模型切换
- 一键分析

✨ **结果页**
- 植物信息卡片
- 风险等级进度条
- 详细分析文本
- 防治建议

✨ **历史页**
- 历史记录列表
- 快速查看详情
- 一键清空

---

## 🔐 安全配置

### 生产环境配置

**1. 修改数据库密码**
```yaml
spring:
  datasource:
    password: 使用强密码！
```

**2. API Key安全**
```bash
# 使用环境变量
export QWEN_API_KEY=your-api-key
```

**3. 启用HTTPS**
- 申请SSL证书
- 配置Nginx

---

## 📚 下一步

恭喜！您已经成功启动了系统。接下来可以：

1. 📖 **阅读文档**
   - [API接口文档](docs/API.md)
   - [部署指南](docs/DEPLOYMENT.md)
   - [项目结构](docs/PROJECT_STRUCTURE.md)

2. 🛠️ **自定义开发**
   - 添加新的AI模型
   - 扩展功能模块
   - 优化界面设计

3. 🚀 **部署上线**
   - 购买服务器
   - 配置域名
   - 发布小程序

---

## 💡 使用技巧

### 提高识别准确率

1. **拍摄技巧**
   - 光线充足
   - 对焦清晰
   - 病虫害部位特写

2. **图片要求**
   - 格式：JPG、PNG
   - 大小：1-10MB
   - 分辨率：建议800x600以上

3. **模型选择**
   - QWEN3：速度快，准确度高（推荐）
   - GPT-4：分析详细，需要API Key
   - Claude：多角度分析

---

## 🤝 获取帮助

遇到问题？

1. **查看日志**
```bash
# 后端日志
cd backend
tail -f logs/plant-pest.log

# 前端控制台
打开浏览器开发者工具 (F12)
```

2. **常见问题**
   - 查看 [README.md](README.md)
   - 查看各模块的 README

3. **联系支持**
   - Email: support@plantpest.com
   - GitHub Issues: 提交问题

---

## ✅ 启动检查清单

启动前确认：

- [ ] Java 17+ 已安装
- [ ] Node.js 16+ 已安装
- [ ] MySQL 8.0+ 已安装并运行
- [ ] 数据库已创建并初始化
- [ ] 配置文件已正确设置
- [ ] QWEN API Key 已配置
- [ ] 后端服务启动成功（端口8080）
- [ ] Web前端启动成功（端口8081）
- [ ] 可以访问 http://localhost:8081

全部打勾？恭喜您成功启动系统！🎉

---

**祝您使用愉快！** 🌱
