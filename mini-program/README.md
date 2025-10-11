# 植物病虫害识别 - 微信小程序

基于uni-app开发的微信小程序，提供便捷的植物病虫害识别功能。

## 功能特性

- 📸 拍照/选择图片
- 🔍 AI智能分析
- 📊 结果可视化展示
- 📝 历史记录保存
- 🤖 多模型支持

## 快速开始

### 方式一：使用HBuilderX（推荐）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 导入项目目录
3. 配置微信小程序appid
4. 运行到微信开发者工具

### 方式二：使用命令行

```bash
# 安装依赖
npm install

# 开发环境
npm run dev:mp-weixin

# 构建
npm run build:mp-weixin
```

## 配置

### 1. 配置appid

编辑 `manifest.json`：
```json
{
  "mp-weixin": {
    "appid": "your-appid"
  }
}
```

### 2. 配置后端地址

编辑 `utils/config.js`：
```javascript
export const BASE_URL = 'https://your-domain.com/api'
```

### 3. 配置合法域名

在微信公众平台配置：
- request合法域名：`https://your-domain.com`
- uploadFile合法域名：`https://your-domain.com`

## 页面说明

### 首页 (pages/index/index)
- 图片选择/拍照
- 模型选择
- 开始分析

### 结果页 (pages/result/result)
- 植物信息展示
- 虫蛀风险评估
- 蚜虫检测结果
- 详细分析
- 防治建议

### 历史页 (pages/history/history)
- 历史记录列表
- 快速查看
- 清空记录

## 目录结构

```
mini-program/
├── pages/              # 页面
│   ├── index/         # 首页
│   ├── result/        # 结果页
│   └── history/       # 历史页
├── utils/             # 工具类
│   ├── config.js      # 配置
│   └── request.js     # 网络请求
├── static/            # 静态资源
├── App.vue            # 应用入口
├── pages.json         # 页面配置
├── manifest.json      # 应用配置
└── package.json
```

## 开发说明

### 网络请求

使用封装的request方法：
```javascript
import { request, uploadFile } from '@/utils/request.js'

// GET请求
const data = await request({
  url: '/analysis/models',
  method: 'GET'
})

// 上传文件
const result = await uploadFile(filePath, 'qwen3')
```

### 本地存储

```javascript
import { STORAGE_KEYS } from '@/utils/config.js'

// 保存数据
uni.setStorageSync(STORAGE_KEYS.HISTORY, data)

// 读取数据
const data = uni.getStorageSync(STORAGE_KEYS.HISTORY)
```

## 发布

### 1. 构建

```bash
npm run build:mp-weixin
```

### 2. 上传

1. 在HBuilderX中打开项目
2. 发行 -> 小程序-微信
3. 上传到微信公众平台

### 3. 提交审核

1. 登录微信公众平台
2. 版本管理 -> 提交审核
3. 填写相关信息

## 注意事项

1. **域名配置**: 必须配置合法的request和uploadFile域名
2. **HTTPS**: 后端接口必须使用HTTPS
3. **文件大小**: 图片大小建议不超过5MB
4. **审核要求**: 需要提供相关资质文件

## 常见问题

### 1. 无法上传图片

- 检查域名是否配置
- 检查网络权限
- 开发环境可关闭域名校验

### 2. 请求失败

- 检查后端地址是否正确
- 检查网络连接
- 查看控制台错误信息

### 3. 图片显示异常

- 检查图片路径
- 检查图片格式
- 使用绝对路径
