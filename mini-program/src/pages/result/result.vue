<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-content">
        <view class="nav-item" @click="goBack">
          <wd-icon name="arrow-left" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
        <text class="navbar-title">识别结果</text>
        <view class="nav-item" @click="shareResult">
          <wd-icon name="share" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 图片展示区域 -->
      <view class="image-section animate-fade-up">
        <view class="image-container">
          <image :src="imagePath" mode="aspectFill" class="result-image"></image>
          <view class="image-overlay">
            <view class="confidence-badge">
              <wd-icon name="check-circle" size="16px" color="white"></wd-icon>
              <text>{{ (analysisResult.confidence * 100).toFixed(1) }}% 置信度</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 识别结果卡片 -->
      <view class="result-card animate-fade-up animation-delay-200">
        <view class="result-header">
          <view class="result-type-badge" :class="analysisResult.identificationType">
            <text>{{ analysisResult.identificationType === 'plant' ? '植物' : '害虫' }}</text>
          </view>
          <text class="result-title">{{ analysisResult.plantName || '未知对象' }}</text>
        </view>

        <view class="result-content">
          <!-- 基本信息 -->
          <view class="info-section">
            <view class="section-title">
              <wd-icon name="info-circle" size="18px" color="var(--primary-600)"></wd-icon>
              <text>基本信息</text>
            </view>
            
            <view class="info-grid">
              <view class="info-item">
                <text class="info-label">置信度</text>
                <text class="info-value">{{ (analysisResult.confidence * 100).toFixed(1) }}%</text>
              </view>
              <view class="info-item" v-if="analysisResult.riskLevel">
                <text class="info-label">风险等级</text>
                <text class="info-value" :class="getRiskLevelClass(analysisResult.riskLevel)">
                  {{ analysisResult.riskLevel }}
                </text>
              </view>
              <view class="info-item" v-if="analysisResult.aphidDetected !== undefined">
                <text class="info-label">蚜虫检测</text>
                <text class="info-value" :class="analysisResult.aphidDetected ? 'text-danger' : 'text-success'">
                  {{ analysisResult.aphidDetected ? '是' : '否' }}
                </text>
              </view>
              <view class="info-item" v-if="analysisResult.diseaseType">
                <text class="info-label">病害类型</text>
                <text class="info-value">{{ analysisResult.diseaseType }}</text>
              </view>
            </view>
          </view>

          <!-- 详细描述 -->
          <view class="description-section" v-if="analysisResult.description">
            <view class="section-title">
              <wd-icon name="file-text" size="18px" color="var(--primary-600)"></wd-icon>
              <text>详细描述</text>
            </view>
            <text class="description-text">{{ analysisResult.description }}</text>
          </view>

          <!-- 处理建议 -->
          <view class="suggestion-section" v-if="analysisResult.treatmentSuggestions">
            <view class="section-title">
              <wd-icon name="lightbulb" size="18px" color="var(--primary-600)"></wd-icon>
              <text>处理建议</text>
            </view>
            <view class="suggestion-list">
              <view 
                class="suggestion-item" 
                v-for="(suggestion, index) in analysisResult.treatmentSuggestions" 
                :key="index"
              >
                <view class="suggestion-number">{{ index + 1 }}</view>
                <text class="suggestion-text">{{ suggestion }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-buttons animate-fade-up animation-delay-400">
        <button class="btn-secondary" @click="retakePhoto">
          <wd-icon name="camera" size="18px" color="var(--primary-600)"></wd-icon>
          <text>重新识别</text>
        </button>
        <button class="btn-primary" @click="saveResult">
          <wd-icon name="bookmark" size="18px" color="white"></wd-icon>
          <text>保存结果</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const imagePath = ref<string | null>(null);
const analysisResult = ref<any>(null);

onLoad((options) => {
  if (options && options.image) {
    imagePath.value = decodeURIComponent(options.image);
  }
  if (options && options.analysisResult) {
    try {
      analysisResult.value = JSON.parse(decodeURIComponent(options.analysisResult));
      console.log('Analysis Result:', analysisResult.value);
    } catch (e) {
      console.error('Failed to parse analysis result', e);
    }
  }
});

// 分享功能
onShareAppMessage(() => {
  return {
    title: `我识别了${analysisResult.value?.plantName || '植物病虫害'}，快来试试吧！`,
    path: '/pages/index/index',
    imageUrl: imagePath.value || '/static/share-image.png'
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: `AI植物虫害识别 - 我识别了${analysisResult.value?.plantName || '植物病虫害'}`,
    query: '',
    imageUrl: imagePath.value || '/static/share-image.png'
  };
});

// 获取风险等级对应的样式类
const getRiskLevelClass = (riskLevel: string) => {
  switch (riskLevel?.toLowerCase()) {
    case '高':
      return 'text-danger'
    case '中':
      return 'text-warning'
    case '低':
      return 'text-success'
    default:
      return ''
  }
}

const goBack = () => {
  uni.navigateBack();
};

// 分享结果
const shareResult = () => {
  if (!analysisResult.value) return
  
  const shareText = `我刚刚识别了${analysisResult.value.identificationType === 'plant' ? '植物' : '害虫'}：${analysisResult.value.plantName}，置信度${(analysisResult.value.confidence * 100).toFixed(1)}%`
  
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    href: '',
    summary: shareText,
    success: () => {
      uni.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },
    fail: () => {
      uni.showToast({
        title: '分享失败',
        icon: 'none'
      })
    }
  })
}

// 重新拍照识别
const retakePhoto = () => {
  uni.navigateTo({
    url: '/pages/index/index'
  });
}

// 保存结果
const saveResult = () => {
  if (!analysisResult.value || !imagePath.value) return
  
  // 获取历史记录
  const historyData = uni.getStorageSync('identificationHistory') || []
  
  // 创建新的历史记录
  const newRecord = {
    id: Date.now(),
    imagePath: imagePath.value,
    plantName: analysisResult.value.plantName || '未知对象',
    identificationType: analysisResult.value.identificationType,
    confidence: analysisResult.value.confidence,
    riskLevel: analysisResult.value.riskLevel,
    aphidDetected: analysisResult.value.aphidDetected,
    diseaseType: analysisResult.value.diseaseType,
    description: analysisResult.value.description,
    treatmentSuggestions: analysisResult.value.treatmentSuggestions,
    createdAt: new Date().toISOString()
  }
  
  // 添加到历史记录
  historyData.unshift(newRecord)
  
  // 保存到本地存储
  uni.setStorageSync('identificationHistory', historyData)
  
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
}

// 复制邮箱地址
const copyEmail = () => {
  uni.setClipboardData({
    data: 'qingmu0v0@outlook.com',
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success',
        duration: 2000
      });
    }
  });
};

// 打开官网
const openWebsite = () => {
  uni.showModal({
    title: '提示',
    content: '即将跳转到青木官网',
    success: (res) => {
      if (res.confirm) {
        // 在小程序中可以使用web-view或者复制链接让用户在浏览器中打开
        uni.setClipboardData({
          data: 'https://qingmu.cloud',
          success: () => {
            uni.showToast({
              title: '网址已复制，请在浏览器中打开',
              icon: 'none',
              duration: 3000
            });
          }
        });
      }
    }
  });
};

// 获取置信度标签类型
const getConfidenceTagType = (confidence) => {
  if (confidence >= 0.8) return 'success'
  if (confidence >= 0.6) return 'warning'
  return 'danger'
};

// 获取虫害风险标签类型
const getWormRiskTagType = (riskLevel) => {
  switch (riskLevel) {
    case 'high': return 'danger'
    case 'medium': return 'warning'
    case 'low': return 'success'
    default: return 'primary'
  }
};

// 获取虫害风险文本
const getWormRiskText = (riskLevel) => {
  switch (riskLevel) {
    case 'high': return '高风险'
    case 'medium': return '中等风险'
    case 'low': return '低风险'
    default: return '未知'
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: var(--secondary-50);
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--secondary-200);
  padding: 0 20rpx;
  height: 88rpx;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: var(--secondary-100);
  transition: all 0.3s ease;
}

.nav-item:active {
  background-color: var(--secondary-200);
  transform: scale(0.95);
}

.navbar-title {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--secondary-800);
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding-top: 88rpx;
  padding-bottom: 40rpx;
  padding-left: 40rpx;
  padding-right: 40rpx;
}

/* 图片展示区域 */
.image-section {
  margin-bottom: 40rpx;
}

.image-container {
  position: relative;
  width: 100%;
  height: 500rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.result-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 30rpx;
}

.confidence-badge {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 10rpx 20rpx;
  border-radius: 50rpx;
  align-self: flex-start;
}

.confidence-badge text {
  color: white;
  font-size: 28rpx;
  font-weight: 600;
  margin-left: 10rpx;
}

/* 结果卡片 */
.result-card {
  background-color: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 40rpx;
}

.result-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.result-type-badge {
  padding: 10rpx 24rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.result-type-badge.plant {
  background-color: var(--success-100);
  color: var(--success-700);
}

.result-type-badge.pest {
  background-color: var(--danger-100);
  color: var(--danger-700);
}

.result-title {
  font-size: 40rpx;
  font-weight: 700;
  color: var(--secondary-800);
  text-align: center;
}

/* 信息部分 */
.result-content {
  margin-top: 30rpx;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title text {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--secondary-800);
  margin-left: 12rpx;
}

.info-section {
  margin-bottom: 40rpx;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.info-item {
  background-color: var(--secondary-50);
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-label {
  font-size: 26rpx;
  color: var(--secondary-500);
  margin-bottom: 8rpx;
}

.info-value {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--secondary-800);
}

.text-danger {
  color: var(--danger-600) !important;
}

.text-warning {
  color: var(--warning-600) !important;
}

.text-success {
  color: var(--success-600) !important;
}

/* 描述部分 */
.description-section {
  margin-bottom: 40rpx;
}

.description-text {
  font-size: 30rpx;
  line-height: 1.6;
  color: var(--secondary-700);
}

/* 建议部分 */
.suggestion-section {
  margin-bottom: 40rpx;
}

.suggestion-list {
  margin-top: 24rpx;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.suggestion-number {
  width: 40rpx;
  height: 40rpx;
  background-color: var(--primary-600);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.suggestion-text {
  font-size: 30rpx;
  line-height: 1.6;
  color: var(--secondary-700);
  flex: 1;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 40rpx;
}

.btn-primary, .btn-secondary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28rpx 0;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background-color: var(--primary-600);
  color: white;
}

.btn-primary:active {
  background-color: var(--primary-700);
  transform: scale(0.98);
}

.btn-secondary {
  background-color: white;
  color: var(--primary-600);
  border: 2px solid var(--primary-200);
}

.btn-secondary:active {
  background-color: var(--primary-50);
  transform: scale(0.98);
}

.btn-primary text, .btn-secondary text {
  margin-left: 12rpx;
}

/* 动画效果 */
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}
</style>
