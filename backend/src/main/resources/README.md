# 配置文件说明

本项目支持多环境配置，通过Spring Profiles实现不同环境的配置切换。

## 配置文件介绍

1. `application.yml` - 主配置文件，包含所有环境共用的配置
2. `application-dev.yml` - 开发环境配置文件
3. `application-master.yml` - 生产环境配置文件

## 环境切换方式

### 1. 通过配置文件指定
在`application.yml`中设置：
```yaml
spring:
  profiles:
    active: dev  # 或 master
```

### 2. 通过命令行参数指定
```bash
java -jar plant-pest-analysis.jar --spring.profiles.active=dev
```

### 3. 通过环境变量指定
```bash
export SPRING_PROFILES_ACTIVE=dev
```

## 各环境配置差异

### 开发环境 (dev)
- 使用本地数据库
- 启用详细的日志输出
- 允许本地开发工具的跨域请求
- MyBatis Plus启用SQL日志输出

### 生产环境 (master)
- 使用远程数据库
- 仅记录警告及以上级别的日志
- 限制跨域请求来源
- MyBatis Plus关闭SQL日志输出

## 配置项说明

### 数据库配置
- 开发环境默认使用本地MySQL数据库
- 生产环境使用远程MySQL数据库

### 日志配置
- 开发环境：DEBUG级别，输出到控制台和文件
- 生产环境：WARN级别，输出到文件

### AI模型配置
- 开发环境：API密钥可以从配置文件中直接指定
- 生产环境：API密钥建议通过环境变量设置

## 注意事项

1. 启动项目前请确保对应的数据库可访问
2. 生产环境请务必通过环境变量设置敏感信息（如API密钥、数据库密码等）
3. 不同环境的文件上传目录均为相对路径`./uploads`，可根据实际部署情况调整