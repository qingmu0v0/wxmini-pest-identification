# API接口文档

## 基础信息

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **响应格式**: JSON

## 通用响应格式

### 成功响应
```json
{
  "code": 200,
  "message": "成功",
  "data": {},
  "timestamp": 1728648000000
}
```

### 错误响应
```json
{
  "code": 500,
  "message": "错误信息",
  "data": null,
  "timestamp": 1728648000000
}
```

## 接口列表

### 1. 上传图片并分析

上传植物图片，使用AI进行病虫害分析。

**接口地址**: `/analysis/upload`

**请求方法**: `POST`

**Content-Type**: `multipart/form-data`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| file | File | 是 | 图片文件，支持jpg/png/webp，最大10MB |
| modelType | String | 否 | AI模型类型，可选值：qwen3/gpt4/claude，默认qwen3 |

**请求示例**:
```bash
curl -X POST http://localhost:8080/api/analysis/upload \
  -F "file=@/path/to/image.jpg" \
  -F "modelType=qwen3"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "分析完成",
  "data": {
    "success": true,
    "plantName": "玫瑰",
    "hasWormDamage": true,
    "wormRiskLevel": 2,
    "hasAphid": false,
    "aphidCount": "无",
    "detailedAnalysis": "检测到植物叶片有虫蛀痕迹，虫蛀面积约占叶片总面积的15%，属于中等风险。建议尽快采取防治措施。",
    "suggestion": "建议使用生物防治方法，如引入瓢虫等天敌；或使用低毒农药，每周喷洒一次，连续3周。同时加强日常巡查，及时发现并处理病虫害。",
    "modelUsed": "qwen3"
  },
  "timestamp": 1728648000000
}
```

---

### 2. Base64图片分析

使用Base64编码的图片数据进行分析。

**接口地址**: `/analysis/analyze`

**请求方法**: `POST`

**Content-Type**: `application/json`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| imageData | String | 是 | Base64编码的图片数据 |
| modelType | String | 否 | AI模型类型，默认qwen3 |

**请求示例**:
```bash
curl -X POST http://localhost:8080/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "modelType": "qwen3"
  }'
```

**响应格式**: 同上传图片接口

---

### 3. 获取支持的模型列表

获取系统支持的所有AI模型。

**接口地址**: `/analysis/models`

**请求方法**: `GET`

**请求参数**: 无

**请求示例**:
```bash
curl -X GET http://localhost:8080/api/analysis/models
```

**响应示例**:
```json
{
  "code": 200,
  "message": "成功",
  "data": ["qwen3", "gpt4", "claude"],
  "timestamp": 1728648000000
}
```

---

### 4. 健康检查

检查服务是否正常运行。

**接口地址**: `/analysis/health`

**请求方法**: `GET`

**请求参数**: 无

**请求示例**:
```bash
curl -X GET http://localhost:8080/api/analysis/health
```

**响应示例**:
```json
{
  "code": 200,
  "message": "成功",
  "data": "服务正常运行",
  "timestamp": 1728648000000
}
```

---

## 数据模型

### AnalysisResponse

分析结果对象

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 分析是否成功 |
| plantName | String | 植物名称 |
| hasWormDamage | Boolean | 是否检测到虫蛀 |
| wormRiskLevel | Integer | 虫蛀风险等级：0-无风险，1-低风险，2-中风险，3-高风险 |
| hasAphid | Boolean | 是否检测到蚜虫 |
| aphidCount | String | 蚜虫数量估计：无/少量/中等/大量 |
| detailedAnalysis | String | 详细分析结果 |
| suggestion | String | 防治建议 |
| modelUsed | String | 使用的AI模型 |
| errorMessage | String | 错误信息（失败时返回） |

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 500 | 服务器内部错误 |
| 503 | AI服务暂时不可用 |

---

## 使用示例

### JavaScript (Axios)

```javascript
import axios from 'axios'

// 上传图片分析
async function analyzeImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('modelType', 'qwen3')
  
  try {
    const response = await axios.post('/api/analysis/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
```

### Python (Requests)

```python
import requests

def analyze_image(file_path):
    url = 'http://localhost:8080/api/analysis/upload'
    
    with open(file_path, 'rb') as f:
        files = {'file': f}
        data = {'modelType': 'qwen3'}
        
        response = requests.post(url, files=files, data=data)
        return response.json()

result = analyze_image('plant.jpg')
print(result)
```

### 微信小程序

```javascript
wx.uploadFile({
  url: 'http://localhost:8080/api/analysis/upload',
  filePath: tempFilePath,
  name: 'file',
  formData: {
    modelType: 'qwen3'
  },
  success: (res) => {
    const data = JSON.parse(res.data)
    console.log(data)
  }
})
```

---

## 注意事项

1. **文件大小限制**: 上传图片不能超过10MB
2. **支持格式**: JPG、PNG、WEBP
3. **API Key**: 使用前需要在配置文件中设置相应的AI模型API Key
4. **频率限制**: 根据AI服务商的限制，建议控制请求频率
5. **HTTPS**: 生产环境建议使用HTTPS协议
6. **跨域**: 已配置CORS，允许跨域请求
