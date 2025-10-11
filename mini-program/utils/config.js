/**
 * 配置文件
 */

// API基础地址
export const BASE_URL = 'http://localhost:8080/api'

// 默认AI模型
export const DEFAULT_MODEL = 'qwen3'

// 支持的图片格式
export const SUPPORTED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp']

// 最大文件大小（10MB）
export const MAX_FILE_SIZE = 10 * 1024 * 1024

// 存储key
export const STORAGE_KEYS = {
  HISTORY: 'analysis_history',
  SELECTED_MODEL: 'selected_model'
}
