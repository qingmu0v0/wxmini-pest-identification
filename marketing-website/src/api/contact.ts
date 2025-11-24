import axios, { AxiosError } from 'axios'

// API基础URL - 在生产环境中应该从环境变量获取
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在这里可以添加认证token等
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// 联系表单提交
export const submitContactForm = async (formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) => {
  try {
    const response = await api.post('/contact', formData)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Contact form submission error:', error)
    const axiosError = error as AxiosError
    return { 
      success: false, 
      error: (axiosError.response?.data as any)?.message || '提交失败，请稍后再试' 
    }
  }
}

// 邮件订阅
export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await api.post('/newsletter/subscribe', { email })
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    const axiosError = error as AxiosError
    return { 
      success: false, 
      error: (axiosError.response?.data as any)?.message || '订阅失败，请稍后再试' 
    }
  }
}

// 获取产品信息
export const getProductInfo = async () => {
  try {
    const response = await api.get('/product/info')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Get product info error:', error)
    const axiosError = error as AxiosError
    return { 
      success: false, 
      error: (axiosError.response?.data as any)?.message || '获取产品信息失败' 
    }
  }
}

export default api