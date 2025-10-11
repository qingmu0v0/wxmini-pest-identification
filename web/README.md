# 植物病虫害识别 - Web官网

基于Vue 3 + Vite + Element Plus开发的现代化Web应用。

## 功能特性

- 🎨 美观的界面设计
- 📱 响应式布局
- 🔍 在线图片识别
- 📊 结果可视化
- 🤖 多模型支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

访问 `http://localhost:8081`

### 生产构建

```bash
npm run build
```

构建产物在 `dist` 目录

### 预览构建

```bash
npm run preview
```

## 项目结构

```
web/
├── src/
│   ├── api/           # API接口
│   │   └── analysis.js
│   ├── assets/        # 静态资源
│   │   └── style.css
│   ├── components/    # 组件
│   ├── router/        # 路由配置
│   │   └── index.js
│   ├── views/         # 视图页面
│   │   ├── Home.vue      # 首页
│   │   ├── Analysis.vue  # 分析页
│   │   └── About.vue     # 关于页
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── index.html
├── vite.config.js
└── package.json
```

## 页面说明

### 首页 (/)
- 功能介绍
- 使用流程
- 功能特点

### 在线识别 (/analysis)
- 图片上传
- 模型选择
- 结果展示

### 关于我们 (/about)
- 项目介绍
- 技术栈
- 联系方式

## API配置

### 开发环境

编辑 `vite.config.js`：
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

### 生产环境

编辑 `src/api/analysis.js`：
```javascript
const BASE_URL = 'https://your-domain.com/api'
```

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 新一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Element Plus** - Vue 3 UI组件库
- **Axios** - HTTP请求库

## 开发指南

### 添加新页面

1. 在 `src/views` 创建页面组件
2. 在 `src/router/index.js` 添加路由

```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('../views/NewPage.vue')
}
```

### 添加API

在 `src/api/analysis.js` 中添加：

```javascript
export function newApi(params) {
  return request({
    url: '/new-api',
    method: 'POST',
    data: params
  })
}
```

### 使用Element Plus组件

```vue
<template>
  <el-button type="primary">按钮</el-button>
</template>
```

## 样式规范

### CSS变量

```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #66BB6A;
  --danger-color: #F44336;
  --warning-color: #FF9800;
  --info-color: #2196F3;
}
```

### 使用变量

```css
.button {
  background: var(--primary-color);
}
```

## 部署

### Nginx配置

```nginx
server {
  listen 80;
  server_name your-domain.com;
  
  location / {
    root /path/to/dist;
    try_files $uri $uri/ /index.html;
  }
  
  location /api {
    proxy_pass http://backend:8080;
  }
}
```

### 环境变量

创建 `.env.production`：
```
VITE_API_BASE_URL=https://your-domain.com/api
```

## 性能优化

- 路由懒加载
- 组件按需引入
- 图片压缩
- Gzip压缩
- CDN加速

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 常见问题

### 1. 安装依赖失败

尝试使用淘宝镜像：
```bash
npm install --registry=https://registry.npmmirror.com
```

### 2. 开发服务器启动失败

检查端口是否被占用，修改 `vite.config.js`：
```javascript
server: {
  port: 8082
}
```

### 3. API请求失败

- 检查后端服务是否启动
- 检查代理配置
- 查看浏览器控制台
