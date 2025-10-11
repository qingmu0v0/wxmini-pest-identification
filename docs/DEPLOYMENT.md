# 部署指南

本文档详细说明了如何部署植物病虫害识别系统的各个组件。

## 目录

- [前置准备](#前置准备)
- [后端部署](#后端部署)
- [Web前端部署](#web前端部署)
- [微信小程序部署](#微信小程序部署)
- [Docker部署](#docker部署)
- [生产环境优化](#生产环境优化)

---

## 前置准备

### 1. 服务器要求

- **操作系统**: Linux (Ubuntu 20.04+ / CentOS 7+)
- **CPU**: 2核及以上
- **内存**: 4GB及以上
- **硬盘**: 20GB及以上

### 2. 软件环境

- **Java**: JDK 17
- **Node.js**: 16+
- **MySQL**: 8.0
- **Nginx**: 1.18+
- **Maven**: 3.6+

### 3. 域名和证书

- 准备域名并解析到服务器
- 申请SSL证书（推荐使用Let's Encrypt免费证书）

---

## 后端部署

### 1. 安装Java

```bash
# Ubuntu
sudo apt update
sudo apt install openjdk-17-jdk -y

# CentOS
sudo yum install java-17-openjdk -y

# 验证安装
java -version
```

### 2. 安装MySQL

```bash
# Ubuntu
sudo apt install mysql-server -y

# CentOS
sudo yum install mysql-server -y

# 启动MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置
sudo mysql_secure_installation
```

### 3. 创建数据库

```bash
mysql -u root -p

# 执行SQL
source /path/to/schema.sql
```

### 4. 配置应用

```bash
cd backend
cp src/main/resources/application-example.yml src/main/resources/application.yml

# 编辑配置文件
vim src/main/resources/application.yml
```

修改以下配置：
- 数据库连接信息
- AI模型API Key
- 文件上传路径

### 5. 打包部署

```bash
# 打包
mvn clean package -DskipTests

# 运行
nohup java -jar target/plant-pest-analysis-1.0.0.jar > app.log 2>&1 &

# 查看日志
tail -f app.log
```

### 6. 使用systemd管理

创建服务文件 `/etc/systemd/system/plant-pest.service`：

```ini
[Unit]
Description=Plant Pest Analysis Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/plant-pest-backend
ExecStart=/usr/bin/java -jar /opt/plant-pest-backend/plant-pest-analysis-1.0.0.jar
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl daemon-reload
sudo systemctl start plant-pest
sudo systemctl enable plant-pest
sudo systemctl status plant-pest
```

---

## Web前端部署

### 1. 构建项目

```bash
cd web

# 安装依赖
npm install

# 修改API地址
vim src/api/analysis.js
# 将BASE_URL改为后端地址

# 构建
npm run build
```

### 2. 部署到Nginx

```bash
# 复制构建产物
sudo cp -r dist /var/www/plant-pest-web

# 配置Nginx
sudo vim /etc/nginx/sites-available/plant-pest-web
```

Nginx配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 强制HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL证书配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 静态文件
    location / {
        root /var/www/plant-pest-web;
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/plant-pest-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 微信小程序部署

### 1. 配置小程序

编辑 `manifest.json`：
```json
{
  "mp-weixin": {
    "appid": "your-appid"
  }
}
```

编辑 `utils/config.js`：
```javascript
export const BASE_URL = 'https://your-domain.com/api'
```

### 2. 构建

使用HBuilderX：
1. 打开项目
2. 发行 -> 小程序-微信
3. 填写小程序名称和AppID
4. 点击发行

或使用命令行：
```bash
cd mini-program
npm install
npm run build:mp-weixin
```

### 3. 上传

1. 打开微信开发者工具
2. 导入项目（选择dist/dev/mp-weixin目录）
3. 点击上传
4. 填写版本号和备注

### 4. 提交审核

1. 登录[微信公众平台](https://mp.weixin.qq.com/)
2. 进入版本管理
3. 选择开发版本
4. 提交审核
5. 填写相关信息

### 5. 配置服务器域名

在微信公众平台配置：
- request合法域名：`https://your-domain.com`
- uploadFile合法域名：`https://your-domain.com`
- downloadFile合法域名：`https://your-domain.com`

---

## Docker部署

### 1. 后端Dockerfile

创建 `backend/Dockerfile`：
```dockerfile
FROM openjdk:17-slim

WORKDIR /app

COPY target/plant-pest-analysis-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

### 2. Web前端Dockerfile

创建 `web/Dockerfile`：
```dockerfile
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

### 3. Docker Compose

创建 `docker-compose.yml`：
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: plant_pest
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/src/main/resources/db/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/plant_pest
      QWEN_API_KEY: ${QWEN_API_KEY}
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

启动：
```bash
docker-compose up -d
```

---

## 生产环境优化

### 1. JVM优化

```bash
java -Xms2g -Xmx2g -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -jar plant-pest-analysis-1.0.0.jar
```

### 2. Nginx优化

```nginx
# 启用gzip压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;

# 限流
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;

# 缓存
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g;
```

### 3. 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_created_time ON analysis_record(created_time);

-- 配置优化
SET GLOBAL max_connections = 500;
SET GLOBAL innodb_buffer_pool_size = 2G;
```

### 4. 监控

使用Prometheus + Grafana监控系统状态。

### 5. 日志

配置日志轮转：
```bash
sudo vim /etc/logrotate.d/plant-pest

/opt/plant-pest/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
```

### 6. 备份

```bash
# 数据库备份脚本
#!/bin/bash
mysqldump -u root -p plant_pest > backup_$(date +%Y%m%d).sql
```

---

## 常见问题

### 1. 端口被占用

```bash
# 查看占用端口的进程
sudo lsof -i :8080

# 杀死进程
kill -9 PID
```

### 2. 权限问题

```bash
# 修改文件权限
sudo chown -R ubuntu:ubuntu /opt/plant-pest
sudo chmod -R 755 /opt/plant-pest
```

### 3. 内存不足

增加swap空间：
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## 安全建议

1. **防火墙**: 只开放必要端口（80, 443）
2. **API Key**: 使用环境变量，不要写在代码中
3. **数据库**: 不要暴露到公网
4. **HTTPS**: 强制使用HTTPS
5. **定期更新**: 及时更新系统和依赖
6. **日志审计**: 定期检查日志

---

## 性能测试

使用Apache Bench测试：
```bash
ab -n 1000 -c 10 https://your-domain.com/api/analysis/health
```

---

## 维护

### 更新应用

```bash
# 停止服务
sudo systemctl stop plant-pest

# 备份
cp plant-pest-analysis-1.0.0.jar plant-pest-analysis-1.0.0.jar.bak

# 替换新版本
cp new-version.jar plant-pest-analysis-1.0.0.jar

# 启动服务
sudo systemctl start plant-pest
```

### 查看日志

```bash
# 实时查看
tail -f /opt/plant-pest/logs/app.log

# 搜索错误
grep ERROR /opt/plant-pest/logs/app.log
```
