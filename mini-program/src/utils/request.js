import { BASE_URL, MAX_FILE_SIZE, SUPPORTED_IMAGE_FORMATS } from './config';

const request = (options) => {
  const { url, method, data, hideLoading = false, contentType } = options;
  return new Promise((resolve, reject) => {
    if (!hideLoading) {
      uni.showLoading({
        title: '加载中',
      });
    }
    uni.request({
      url: BASE_URL + url,
      method: method || 'GET',
      data: data,
      header: {
        'Content-Type': contentType || 'application/json;charset=utf-8',
        // 可以根据需要添加其他请求头，例如 token
      },
      success: (res) => {
        if (!hideLoading) {
          uni.hideLoading();
        }
        if (res.statusCode === 200) {
          // 检查后端返回的code字段
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            uni.showToast({
              title: res.data.message || '请求失败',
              icon: 'none',
            });
            reject(res.data.message);
          }
        } else {
          uni.showToast({
            title: `请求错误: ${res.statusCode}`,
            icon: 'none',
          });
          reject(`请求错误: ${res.statusCode}`);
        }
      },
      fail: (err) => {
        if (!hideLoading) {
          uni.hideLoading();
        }
        uni.showToast({
          title: '网络请求失败',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
};

const uploadFile = (filePath, modelType, hideLoading = false) => {
  return new Promise((resolve, reject) => {
    // 检查文件大小和类型
    uni.getFileInfo({
      filePath: filePath,
      success: (res) => {
        if (res.size > MAX_FILE_SIZE) {
          uni.showToast({
            title: `图片大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
            icon: 'none',
            duration: 2000
          });
          return reject('文件过大');
        }

        const fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        if (!SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
          uni.showToast({
            title: `只支持 ${SUPPORTED_IMAGE_FORMATS.join(', ')} 格式的图片`,
            icon: 'none',
            duration: 2000
          });
          return reject('不支持的文件格式');
        }

        if (!hideLoading) {
          uni.showLoading({
            title: '上传中',
          });
        }
        uni.uploadFile({
          url: BASE_URL + '/analysis/upload', // 后端上传接口地址
          filePath: filePath,
          name: 'file',
          formData: {
            modelType: modelType,
          },
          success: (uploadFileRes) => {
            if (!hideLoading) {
              uni.hideLoading();
            }
            if (uploadFileRes.statusCode === 200) {
              try {
                const data = JSON.parse(uploadFileRes.data);
                if (data.code === 200) { // 对应后端ApiResult的code
                  resolve(data.data);
                } else {
                  uni.showToast({
                    title: data.message || '上传失败',
                    icon: 'none',
                  });
                  reject(data.message);
                }
              } catch (e) {
                uni.showToast({
                  title: '数据解析失败',
                  icon: 'none',
                });
                reject(e);
              }
            } else {
              uni.showToast({
                title: `上传错误: ${uploadFileRes.statusCode}`,
                icon: 'none',
              });
              reject(`上传错误: ${uploadFileRes.statusCode}`);
            }
          },
          fail: (err) => {
            if (!hideLoading) {
              uni.hideLoading();
            }
            uni.showToast({
              title: '文件上传失败',
              icon: 'none',
            });
            reject(err);
          },
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

const analyzeImageBase64 = (base64Data, modelType, hideLoading = false) => {
  return request({
    url: '/analysis/analyze',
    method: 'POST',
    contentType: 'application/json',
    hideLoading,
    data: {
      imageData: base64Data,
      modelType: modelType,
    },
  });
};

export const getModels = (hideLoading = false) => {
  return request({
    url: '/analysis/models',
    method: 'GET',
    hideLoading,
  });
};

export {
  request,
  uploadFile,
  analyzeImageBase64,
};