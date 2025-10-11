# 项目结构说明

## 整体架构

```
plant-pest-analysis/
├── backend/              # Spring Boot 后端服务
├── mini-program/         # uni-app 微信小程序
├── web/                  # Vue3 Web官网
├── docs/                 # 文档
├── README.md            # 项目说明
└── .gitignore           # Git忽略配置
```

## 后端项目结构

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/plantpest/
│   │   │   ├── config/                    # 配置类
│   │   │   │   ├── AIConfig.java         # AI模型配置
│   │   │   │   ├── CorsConfig.java       # 跨域配置
│   │   │   │   └── FileConfig.java       # 文件上传配置
│   │   │   ├── controller/               # 控制器层
│   │   │   │   └── AnalysisController.java  # 分析接口控制器
│   │   │   ├── service/                  # 服务层
│   │   │   │   ├── AIService.java        # AI模型调用服务
│   │   │   │   └── FileService.java      # 文件处理服务
│   │   │   ├── dto/                      # 数据传输对象
│   │   │   │   ├── AnalysisRequest.java  # 分析请求DTO
│   │   │   │   ├── AnalysisResponse.java # 分析响应DTO
│   │   │   │   └── ApiResult.java        # 统一响应结果
│   │   │   ├── enums/                    # 枚举类
│   │   │   │   └── ModelType.java        # AI模型类型枚举
│   │   │   └── PlantPestApplication.java # 应用启动类
│   │   └── resources/
│   │       ├── db/
│   │       │   └── schema.sql            # 数据库初始化脚本
│   │       ├── application.yml           # 应用配置文件
│   │       └── application-example.yml   # 配置文件示例
│   └── test/                             # 测试代码
├── pom.xml                               # Maven配置
├── .gitignore                            # Git忽略配置
└── README.md                             # 后端说明文档
```

### 技术栈
- **框架**: Spring Boot 3.2.0
- **Java**: JDK 17
- **数据库**: MySQL 8.0 + MyBatis Plus
- **工具**: Hutool, Lombok, Gson, OkHttp

### 核心功能
1. **图片上传**: 支持多种格式，最大10MB
2. **AI分析**: 集成QWEN3、GPT-4、Claude多个模型
3. **结果返回**: 统一JSON格式响应
4. **文件管理**: 本地存储或云存储

---

## 微信小程序结构

```
mini-program/
├── pages/                        # 页面
│   ├── index/                   # 首页
│   │   └── index.vue            # 图片上传和模型选择
│   ├── result/                  # 结果页
│   │   └── result.vue           # 分析结果展示
│   └── history/                 # 历史页
│       └── history.vue          # 历史记录列表
├── utils/                       # 工具类
│   ├── config.js               # 配置文件
│   └── request.js              # 网络请求封装
├── static/                     # 静态资源
│   ├── home.png               # 首页图标
│   ├── home-active.png        # 首页图标(激活)
│   ├── history.png            # 历史图标
│   └── history-active.png     # 历史图标(激活)
├── App.vue                     # 应用入口
├── pages.json                  # 页面配置
├── manifest.json               # 应用配置
├── package.json                # 依赖配置
├── .env.example               # 环境配置示例
└── README.md                   # 小程序说明文档
```

### 技术栈
- **框架**: uni-app
- **语言**: Vue 3
- **平台**: 微信小程序

### 核心功能
1. **图片采集**: 拍照或相册选择
2. **在线识别**: 实时上传分析
3. **结果展示**: 可视化展示风险等级
4. **历史记录**: 本地存储历史数据

---

## Web官网结构

```
web/
├── src/
│   ├── api/                    # API接口
│   │   └── analysis.js        # 分析接口封装
│   ├── assets/                # 静态资源
│   │   └── style.css          # 全局样式
│   ├── components/            # 公共组件
│   ├── router/                # 路由配置
│   │   └── index.js          # 路由定义
│   ├── utils/                # 工具函数
│   ├── views/                # 视图页面
│   │   ├── Home.vue          # 首页
│   │   ├── Analysis.vue      # 在线识别页
│   │   └── About.vue         # 关于页面
│   ├── App.vue               # 根组件
│   └── main.js               # 应用入口
├── index.html                 # HTML模板
├── vite.config.js            # Vite配置
├── package.json              # 依赖配置
├── .env.example             # 环境配置示例
├── .gitignore               # Git忽略配置
└── README.md                 # Web说明文档
```

### 技术栈
- **框架**: Vue 3.3
- **构建**: Vite 5.0
- **UI**: Element Plus
- **路由**: Vue Router 4
- **HTTP**: Axios

### 核心功能
1. **首页**: 功能介绍和使用引导
2. **在线识别**: 上传图片进行分析
3. **结果展示**: 详细的可视化报告
4. **响应式设计**: 支持PC和移动端

---

## 文档目录

```
docs/
├── API.md                    # API接口文档
├── DEPLOYMENT.md            # 部署指南
└── PROJECT_STRUCTURE.md     # 项目结构说明（本文件）
```

---

## 配置文件说明

### 后端配置 (application.yml)
```yaml
server:
  port: 8080                # 服务端口
  
spring:
  datasource:              # 数据库配置
    url: jdbc:mysql://...
    username: root
    password: ***
    
ai:
  default-model: qwen3    # 默认AI模型
  qwen3:
    api-key: ***          # QWEN3 API Key
```

### 小程序配置 (utils/config.js)
```javascript
export const BASE_URL = 'http://localhost:8080/api'  // 后端地址
export const DEFAULT_MODEL = 'qwen3'                  // 默认模型
```

### Web配置 (vite.config.js)
```javascript
export default defineConfig({
  server: {
    port: 8081,           // 开发服务器端口
    proxy: {              // API代理配置
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  }
})
```

---

## 数据库设计

### 主要数据表

#### analysis_record (分析记录表)
- `id`: 主键
- `user_id`: 用户ID
- `image_url`: 图片URL
- `plant_name`: 植物名称
- `has_worm_damage`: 是否有虫蛀
- `worm_risk_level`: 虫蛀风险等级
- `has_aphid`: 是否有蚜虫
- `aphid_count`: 蚜虫数量
- `detailed_analysis`: 详细分析
- `suggestion`: 防治建议
- `model_used`: 使用的模型
- `created_time`: 创建时间

#### user (用户表)
- `id`: 主键
- `username`: 用户名
- `nickname`: 昵称
- `openid`: 微信openid
- `created_time`: 创建时间

#### ai_model_config (AI模型配置表)
- `id`: 主键
- `model_code`: 模型代码
- `model_name`: 模型名称
- `enabled`: 是否启用
- `api_endpoint`: API端点

---

## API接口列表

### 1. 上传图片分析
- **接口**: `POST /api/analysis/upload`
- **参数**: file (文件), modelType (模型类型)
- **返回**: 分析结果

### 2. Base64分析
- **接口**: `POST /api/analysis/analyze`
- **参数**: imageData (Base64), modelType (模型类型)
- **返回**: 分析结果

### 3. 获取模型列表
- **接口**: `GET /api/analysis/models`
- **返回**: 支持的模型列表

### 4. 健康检查
- **接口**: `GET /api/analysis/health`
- **返回**: 服务状态

---

## 开发流程

### 1. 环境搭建
```bash
# 后端
cd backend
mvn clean install
mvn spring-boot:run

# Web
cd web
npm install
npm run dev

# 小程序
使用HBuilderX导入mini-program目录
```

### 2. 开发规范
- **代码风格**: 遵循阿里巴巴Java开发手册
- **命名规范**: 
  - Java: 驼峰命名
  - Vue: kebab-case
  - 数据库: 下划线命名
- **注释**: 关键代码必须添加注释

### 3. Git工作流
```bash
# 创建功能分支
git checkout -b feature/xxx

# 提交代码
git add .
git commit -m "feat: 添加xxx功能"

# 推送分支
git push origin feature/xxx

# 合并到主分支
git checkout main
git merge feature/xxx
```

---

## 测试

### 后端测试
```bash
cd backend
mvn test
```

### 前端测试
```bash
cd web
npm run test
```

---

## 部署

### 快速部署
```bash
# 后端
cd backend
mvn clean package
java -jar target/plant-pest-analysis-1.0.0.jar

# Web
cd web
npm run build
# 将dist目录部署到Nginx

# 小程序
使用HBuilderX发行到微信小程序
```

详细部署步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 常见问题

### 1. 后端无法连接数据库
- 检查MySQL是否启动
- 检查配置文件中的数据库信息

### 2. 小程序无法请求接口
- 检查域名是否配置
- 开发环境关闭域名校验

### 3. Web打包后路由404
- 配置Nginx的try_files
- 使用history模式需要服务器支持

---

## 更新日志

### v1.0.0 (2025-10-11)
- ✨ 初始版本发布
- 🚀 支持QWEN3模型
- 📱 完成小程序和Web端
- 📝 完善文档

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork项目
2. 创建功能分支
3. 提交代码
4. 发起Pull Request

---

## 许可证

MIT License

---

## 联系方式

- **Email**: support@plantpest.com
- **GitHub**: https://github.com/your-repo/plant-pest-analysis
