// 根据环境配置不同的BASE_URL
// 开发环境使用本地地址，生产环境需要配置为实际的服务器地址
const isDev = process.env.NODE_ENV === 'development';
export const BASE_URL = isDev ? 'http://localhost:8080/api' : 'https://qingmu.cloud/api';

// 输出当前配置的BASE_URL，便于调试
console.log('当前BASE_URL:', BASE_URL);
export const DEFAULT_AI_MODEL = 'qwen3';
export const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const STORAGE_KEY = {
  HISTORY: 'history',
  SELECTED_MODEL: 'selectedModel',
};