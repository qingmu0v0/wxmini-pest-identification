# 前端部署命令记录

## 本地构建命令
```bash
npm run build
```

## 服务器部署命令
```bash
scp -r dist/* root@47.93.147.90:/usr/share/nginx/html/
```

## 部署流程
1. 在本地项目根目录执行构建命令
2. 构建完成后，使用scp命令将dist目录下的所有文件上传到服务器
3. 上传完成后，可能需要重启Nginx服务：
   ```bash
   ssh root@47.93.147.90 "systemctl reload nginx"
   ```

## 注意事项
- 确保已连接到服务器网络
- 确保有服务器的SSH访问权限
- 确保服务器上的Nginx配置正确，特别是client_max_body_size设置已修改为100M
- 如果遇到权限问题，可能需要使用sudo或检查目录权限

## 常见问题解决
1. 如果提示"主机真实性无法验证"，首次连接需要输入"yes"确认
2. 如果提示目录不存在，可以先创建目录：
   ```bash
   ssh root@47.93.147.90 "mkdir -p /usr/share/nginx/html"
   ```
3. 如果上传后页面未更新，尝试清除浏览器缓存或重启Nginx服务