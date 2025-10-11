-- 植物病虫害识别系统数据库初始化脚本

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS plant_pest 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE plant_pest;

-- 分析记录表
CREATE TABLE IF NOT EXISTS analysis_record (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    user_id BIGINT COMMENT '用户ID',
    image_url VARCHAR(500) NOT NULL COMMENT '图片URL',
    plant_name VARCHAR(100) COMMENT '植物名称',
    has_worm_damage BOOLEAN DEFAULT FALSE COMMENT '是否有虫蛀',
    worm_risk_level INT DEFAULT 0 COMMENT '虫蛀风险等级：0-3',
    has_aphid BOOLEAN DEFAULT FALSE COMMENT '是否有蚜虫',
    aphid_count VARCHAR(50) COMMENT '蚜虫数量',
    detailed_analysis TEXT COMMENT '详细分析',
    suggestion TEXT COMMENT '防治建议',
    model_used VARCHAR(50) COMMENT '使用的模型',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    INDEX idx_user_id (user_id),
    INDEX idx_created_time (created_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分析记录表';

-- 用户表（可选，用于用户管理）
CREATE TABLE IF NOT EXISTS user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    username VARCHAR(50) UNIQUE COMMENT '用户名',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(500) COMMENT '头像URL',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    openid VARCHAR(100) UNIQUE COMMENT '微信openid',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    INDEX idx_openid (openid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- AI模型配置表
CREATE TABLE IF NOT EXISTS ai_model_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    model_code VARCHAR(50) UNIQUE NOT NULL COMMENT '模型代码',
    model_name VARCHAR(100) NOT NULL COMMENT '模型名称',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    api_endpoint VARCHAR(500) COMMENT 'API端点',
    model_version VARCHAR(50) COMMENT '模型版本',
    max_tokens INT COMMENT '最大token数',
    temperature DECIMAL(3,2) COMMENT '温度参数',
    description TEXT COMMENT '描述',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI模型配置表';

-- 插入默认模型配置
INSERT INTO ai_model_config (model_code, model_name, enabled, description) VALUES
('qwen3', 'QWEN3 (通义千问)', TRUE, '阿里云通义千问多模态大模型'),
('gpt4', 'GPT-4 Vision', FALSE, 'OpenAI GPT-4视觉识别模型'),
('claude', 'Claude 3', FALSE, 'Anthropic Claude 3多模态模型');

-- 系统配置表
CREATE TABLE IF NOT EXISTS system_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    config_desc VARCHAR(200) COMMENT '配置描述',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- 插入默认系统配置
INSERT INTO system_config (config_key, config_value, config_desc) VALUES
('default_model', 'qwen3', '默认使用的AI模型'),
('max_file_size', '10485760', '最大上传文件大小（字节）'),
('upload_dir', './uploads', '文件上传目录');
