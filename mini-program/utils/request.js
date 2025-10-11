/**
 * HTTP请求封装
 */
import { BASE_URL } from './config.js'

/**
 * 发送HTTP请求
 */
export function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': options.contentType || 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data.data)
          } else {
            uni.showToast({
              title: res.data.message || '请求失败',
              icon: 'none'
            })
            reject(res.data)
          }
        } else {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

/**
 * 上传文件
 */
export function uploadFile(filePath, modelType = 'qwen3') {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '分析中...',
      mask: true
    })
    
    uni.uploadFile({
      url: BASE_URL + '/analysis/upload',
      filePath: filePath,
      name: 'file',
      formData: {
        modelType: modelType
      },
      success: (res) => {
        uni.hideLoading()
        const data = JSON.parse(res.data)
        if (data.code === 200) {
          resolve(data.data)
        } else {
          uni.showToast({
            title: data.message || '上传失败',
            icon: 'none'
          })
          reject(data)
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '上传失败',
          icon: 'none'
        })
        reject(err)
      }
    })
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
