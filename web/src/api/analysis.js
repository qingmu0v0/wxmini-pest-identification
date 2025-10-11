import axios from 'axios'

const BASE_URL = '/api'

// 创建axios实例
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 60000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res.data
    } else {
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 上传图片并分析
 */
export function uploadAndAnalyze(file, modelType = 'qwen3') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('modelType', modelType)
  
  return request({
    url: '/analysis/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 使用Base64分析
 */
export function analyzeBase64(imageData, modelType = 'qwen3') {
  return request({
    url: '/analysis/analyze',
    method: 'POST',
    data: {
      imageData,
      modelType
    }
  })
}

/**
 * 获取支持的模型列表
 */
export function getModels() {
  return request({
    url: '/analysis/models',
    method: 'GET'
  })
}
