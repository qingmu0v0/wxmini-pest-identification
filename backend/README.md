# 植物病虫害识别系统 - 后端服务

基于Spring Boot 3的后端服务，提供图片上传、AI分析等API接口。

## 快速启动

### 1. 环境要求
- JDK 17+
- Maven 3.6+
- MySQL 8.0+

### 2. 配置数据库

创建数据库：
```sql
CREATE DATABASE plant_pest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. 配置文件

编辑 `src/main/resources/application.yml`，修改以下配置：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/plant_pest
    username: your_username
    password: your_password

ai:
  qwen3:
    api-key: your-qwen-api-key
```

### 4. 启动服务

```bash
# 编译
mvn clean install

# 运行
mvn spring-boot:run
```

服务将在 `http://localhost:8080` 启动。

## API文档

### 1. 上传图片分析

**请求**
```
POST /api/analysis/upload
Content-Type: multipart/form-data
```

**参数**
- `file`: 图片文件（必填）
- `modelType`: 模型类型（可选，默认qwen3）

**响应**
```json
{
  "code": 200,
  "message": "分析完成",
  "data": {
    "success": true,
    "plantName": "玫瑰",
    "hasWormDamage": false,
    "wormRiskLevel": 0,
    "hasAphid": true,
    "aphidCount": "少量",
    "detailedAnalysis": "检测到少量蚜虫...",
    "suggestion": "建议使用生物防治方法...",
    "modelUsed": "qwen3"
  },
  "timestamp": 1728648000000
}
```

### 2. Base64分析

**请求**
```
POST /api/analysis/analyze
Content-Type: application/json
```

**Body**
```json
{
  "imageData": "base64编码的图片",
  "modelType": "qwen3"
}
```

### 3. 获取模型列表

**请求**
```
GET /api/analysis/models
```

**响应**
```json
{
  "code": 200,
  "data": ["qwen3", "gpt4", "claude"]
}
```

### 4. 健康检查

**请求**
```
GET /api/analysis/health
```

## 配置说明

### AI模型配置

支持配置多个AI模型，可通过环境变量或配置文件设置：

```yaml
ai:
  default-model: qwen3
  
  qwen3:
    enabled: true
    api-key: ${QWEN_API_KEY}
    endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
    model: qwen-vl-plus
```

### 文件上传配置

```yaml
file:
  upload-dir: ./uploads  # 文件上传目录
  
spring:
  servlet:
    multipart:
      max-file-size: 10MB      # 最大文件大小
      max-request-size: 10MB   # 最大请求大小
```

## 部署

### 打包

```bash
mvn clean package -DskipTests
```

生成的jar包位于 `target/plant-pest-analysis-1.0.0.jar`

### 运行

```bash
java -jar target/plant-pest-analysis-1.0.0.jar
```

### 使用环境变量

```bash
export QWEN_API_KEY=your-api-key
java -jar target/plant-pest-analysis-1.0.0.jar
```

## 开发

### 项目结构

```
src/main/java/com/plantpest/
├── config/           # 配置类
│   ├── AIConfig.java
│   ├── CorsConfig.java
│   └── FileConfig.java
├── controller/       # 控制器
│   └── AnalysisController.java
├── service/         # 服务层
│   ├── AIService.java
│   └── FileService.java
├── dto/            # 数据传输对象
│   ├── AnalysisRequest.java
│   ├── AnalysisResponse.java
│   └── ApiResult.java
├── enums/          # 枚举
│   └── ModelType.java
└── PlantPestApplication.java
```

## 常见问题

### 1. 启动失败

检查：
- Java版本是否正确
- MySQL是否启动
- 配置文件是否正确

### 2. AI调用失败

检查：
- API Key是否正确
- 网络是否畅通
- 模型配置是否正确

### 3. 文件上传失败

检查：
- 文件大小是否超限
- 上传目录是否有写权限
