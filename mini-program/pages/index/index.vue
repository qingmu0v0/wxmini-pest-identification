<template>
  <view class="container">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">🌱 植物病虫害AI识别</text>
      <text class="subtitle">上传植物照片，智能检测虫蛀和蚜虫风险</text>
    </view>
    
    <!-- 图片预览区 -->
    <view class="image-preview" v-if="imageUrl">
      <image :src="imageUrl" mode="aspectFit" class="preview-image"></image>
      <view class="preview-mask" @click="removeImage">
        <text class="remove-text">重新选择</text>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <text class="empty-icon">📸</text>
      <text class="empty-text">点击下方按钮选择植物图片</text>
    </view>
    
    <!-- 模型选择 -->
    <view class="model-selector">
      <text class="label">AI模型：</text>
      <picker mode="selector" :range="models" :value="selectedModelIndex" @change="onModelChange">
        <view class="picker">
          <text>{{ models[selectedModelIndex] }}</text>
          <text class="arrow">▼</text>
        </view>
      </picker>
    </view>
    
    <!-- 功能按钮 -->
    <view class="buttons">
      <button class="btn btn-primary" @click="chooseImage" v-if="!imageUrl">
        <text class="btn-icon">📷</text>
        <text>选择照片</text>
      </button>
      
      <button class="btn btn-camera" @click="takePhoto" v-if="!imageUrl">
        <text class="btn-icon">📸</text>
        <text>拍摄照片</text>
      </button>
      
      <button class="btn btn-success btn-large" @click="analyzeImage" v-if="imageUrl" :disabled="analyzing">
        <text v-if="!analyzing">🔍 开始分析</text>
        <text v-else>分析中...</text>
      </button>
    </view>
    
    <!-- 功能介绍 -->
    <view class="features">
      <view class="feature-item">
        <text class="feature-icon">🐛</text>
        <text class="feature-title">虫蛀检测</text>
        <text class="feature-desc">智能识别植物虫蛀痕迹</text>
      </view>
      <view class="feature-item">
        <text class="feature-icon">🦗</text>
        <text class="feature-title">蚜虫识别</text>
        <text class="feature-desc">精准检测蚜虫数量</text>
      </view>
      <view class="feature-item">
        <text class="feature-icon">💊</text>
        <text class="feature-title">防治建议</text>
        <text class="feature-desc">提供专业处理方案</text>
      </view>
    </view>
  </view>
</template>

<script>
import { uploadFile, getModels } from '../../utils/request.js'
import { STORAGE_KEYS, DEFAULT_MODEL } from '../../utils/config.js'

export default {
  data() {
    return {
      imageUrl: '',
      analyzing: false,
      models: ['QWEN3(通义千问)', 'GPT-4 Vision', 'Claude 3'],
      modelCodes: ['qwen3', 'gpt4', 'claude'],
      selectedModelIndex: 0
    }
  },
  
  onLoad() {
    // 加载已选择的模型
    const savedModel = uni.getStorageSync(STORAGE_KEYS.SELECTED_MODEL)
    if (savedModel) {
      const index = this.modelCodes.indexOf(savedModel)
      if (index >= 0) {
        this.selectedModelIndex = index
      }
    }
  },
  
  methods: {
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: (res) => {
          this.imageUrl = res.tempFilePaths[0]
        }
      })
    },
    
    // 拍摄照片
    takePhoto() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          this.imageUrl = res.tempFilePaths[0]
        }
      })
    },
    
    // 移除图片
    removeImage() {
      this.imageUrl = ''
    },
    
    // 模型选择改变
    onModelChange(e) {
      this.selectedModelIndex = e.detail.value
      const modelCode = this.modelCodes[this.selectedModelIndex]
      uni.setStorageSync(STORAGE_KEYS.SELECTED_MODEL, modelCode)
    },
    
    // 分析图片
    async analyzeImage() {
      if (!this.imageUrl) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none'
        })
        return
      }
      
      this.analyzing = true
      
      try {
        const modelCode = this.modelCodes[this.selectedModelIndex]
        const result = await uploadFile(this.imageUrl, modelCode)
        
        // 保存到历史记录
        this.saveToHistory(result, this.imageUrl)
        
        // 跳转到结果页面
        uni.navigateTo({
          url: '/pages/result/result?data=' + encodeURIComponent(JSON.stringify(result))
        })
        
      } catch (error) {
        console.error('分析失败', error)
      } finally {
        this.analyzing = false
      }
    },
    
    // 保存到历史记录
    saveToHistory(result, imageUrl) {
      try {
        let history = uni.getStorageSync(STORAGE_KEYS.HISTORY) || []
        history.unshift({
          id: Date.now(),
          imageUrl: imageUrl,
          result: result,
          time: new Date().toLocaleString()
        })
        
        // 只保留最近20条记录
        if (history.length > 20) {
          history = history.slice(0, 20)
        }
        
        uni.setStorageSync(STORAGE_KEYS.HISTORY, history)
      } catch (error) {
        console.error('保存历史记录失败', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
  padding: 20rpx;
}

.header {
  text-align: center;
  padding: 40rpx 20rpx;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #2E7D32;
  margin-bottom: 20rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #66BB6A;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 500rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 30rpx 0;
  background: #fff;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
}

.preview-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  padding: 20rpx;
  text-align: center;
}

.remove-text {
  color: #fff;
  font-size: 28rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500rpx;
  background: #fff;
  border-radius: 20rpx;
  margin: 30rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.model-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin: 20rpx 0;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.label {
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
}

.picker {
  display: flex;
  align-items: center;
  color: #4CAF50;
  font-size: 28rpx;
}

.arrow {
  margin-left: 10rpx;
  font-size: 24rpx;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin: 30rpx 0;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.1);
}

.btn-icon {
  margin-right: 10rpx;
  font-size: 36rpx;
}

.btn-primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: #fff;
}

.btn-camera {
  background: linear-gradient(135deg, #42A5F5 0%, #2196F3 100%);
  color: #fff;
}

.btn-success {
  background: linear-gradient(135deg, #FFA726 0%, #FF9800 100%);
  color: #fff;
}

.btn-large {
  height: 100rpx;
  font-size: 36rpx;
}

.btn[disabled] {
  opacity: 0.6;
}

.features {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
  gap: 20rpx;
}

.feature-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.feature-icon {
  font-size: 60rpx;
  margin-bottom: 15rpx;
}

.feature-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.feature-desc {
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
