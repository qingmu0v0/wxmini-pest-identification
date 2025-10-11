<template>
  <view class="container">
    <!-- 结果卡片 -->
    <view class="result-card">
      <!-- 植物信息 -->
      <view class="plant-info" v-if="result.plantName">
        <text class="plant-icon">🌿</text>
        <view class="plant-detail">
          <text class="plant-label">识别植物</text>
          <text class="plant-name">{{ result.plantName }}</text>
        </view>
      </view>
      
      <!-- 风险指示器 -->
      <view class="risk-indicators">
        <!-- 虫蛀风险 -->
        <view class="risk-item">
          <view class="risk-header">
            <text class="risk-icon">🐛</text>
            <text class="risk-title">虫蛀风险</text>
          </view>
          <view class="risk-level" :class="'level-' + result.wormRiskLevel">
            <view class="level-bar" :style="{ width: (result.wormRiskLevel * 25) + '%' }"></view>
          </view>
          <text class="risk-text">{{ getRiskText(result.wormRiskLevel) }}</text>
        </view>
        
        <!-- 蚜虫检测 -->
        <view class="risk-item">
          <view class="risk-header">
            <text class="risk-icon">🦗</text>
            <text class="risk-title">蚜虫检测</text>
          </view>
          <view class="aphid-status" :class="result.hasAphid ? 'detected' : 'safe'">
            <text class="status-text">
              {{ result.hasAphid ? '检测到蚜虫' : '未检测到蚜虫' }}
            </text>
          </view>
          <text class="aphid-count" v-if="result.hasAphid">
            数量：{{ result.aphidCount || '未知' }}
          </text>
        </view>
      </view>
    </view>
    
    <!-- 详细分析 -->
    <view class="analysis-section" v-if="result.detailedAnalysis">
      <view class="section-header">
        <text class="section-icon">📋</text>
        <text class="section-title">详细分析</text>
      </view>
      <view class="section-content">
        <text class="analysis-text">{{ result.detailedAnalysis }}</text>
      </view>
    </view>
    
    <!-- 防治建议 -->
    <view class="suggestion-section" v-if="result.suggestion">
      <view class="section-header">
        <text class="section-icon">💊</text>
        <text class="section-title">防治建议</text>
      </view>
      <view class="section-content suggestion-content">
        <text class="suggestion-text">{{ result.suggestion }}</text>
      </view>
    </view>
    
    <!-- 模型信息 -->
    <view class="model-info">
      <text class="model-text">分析模型：{{ result.modelUsed || '未知' }}</text>
    </view>
    
    <!-- 操作按钮 -->
    <view class="actions">
      <button class="btn btn-secondary" @click="goBack">
        <text>返回首页</text>
      </button>
      <button class="btn btn-primary" @click="analyzeAgain">
        <text>再次分析</text>
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      result: {
        success: true,
        plantName: '',
        hasWormDamage: false,
        wormRiskLevel: 0,
        hasAphid: false,
        aphidCount: '',
        detailedAnalysis: '',
        suggestion: '',
        modelUsed: ''
      }
    }
  },
  
  onLoad(options) {
    if (options.data) {
      try {
        this.result = JSON.parse(decodeURIComponent(options.data))
      } catch (error) {
        console.error('解析结果数据失败', error)
        uni.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    }
  },
  
  methods: {
    // 获取风险等级文本
    getRiskText(level) {
      const texts = ['无风险', '低风险', '中风险', '高风险']
      return texts[level] || '未知'
    },
    
    // 返回首页
    goBack() {
      uni.navigateBack()
    },
    
    // 再次分析
    analyzeAgain() {
      uni.navigateBack()
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

.result-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.plant-info {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  border-radius: 15rpx;
  margin-bottom: 30rpx;
}

.plant-icon {
  font-size: 60rpx;
  margin-right: 20rpx;
}

.plant-detail {
  display: flex;
  flex-direction: column;
}

.plant-label {
  font-size: 24rpx;
  color: #66BB6A;
  margin-bottom: 5rpx;
}

.plant-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #2E7D32;
}

.risk-indicators {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.risk-item {
  display: flex;
  flex-direction: column;
}

.risk-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.risk-icon {
  font-size: 40rpx;
  margin-right: 15rpx;
}

.risk-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.risk-level {
  height: 40rpx;
  background: #E0E0E0;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.level-bar {
  height: 100%;
  border-radius: 20rpx;
  transition: width 0.5s ease;
}

.level-0 .level-bar {
  background: linear-gradient(90deg, #66BB6A 0%, #4CAF50 100%);
}

.level-1 .level-bar {
  background: linear-gradient(90deg, #FFF176 0%, #FFEB3B 100%);
}

.level-2 .level-bar {
  background: linear-gradient(90deg, #FFB74D 0%, #FF9800 100%);
}

.level-3 .level-bar {
  background: linear-gradient(90deg, #E57373 0%, #F44336 100%);
}

.risk-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 10rpx;
}

.aphid-status {
  padding: 20rpx;
  border-radius: 10rpx;
  text-align: center;
  margin-bottom: 10rpx;
}

.aphid-status.safe {
  background: #E8F5E9;
}

.aphid-status.detected {
  background: #FFEBEE;
}

.status-text {
  font-size: 28rpx;
  font-weight: bold;
}

.aphid-status.safe .status-text {
  color: #4CAF50;
}

.aphid-status.detected .status-text {
  color: #F44336;
}

.aphid-count {
  font-size: 24rpx;
  color: #666;
  margin-left: 10rpx;
}

.analysis-section,
.suggestion-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-icon {
  font-size: 40rpx;
  margin-right: 15rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.section-content {
  padding: 20rpx;
  background: #F5F5F5;
  border-radius: 10rpx;
}

.suggestion-content {
  background: #FFF3E0;
}

.analysis-text,
.suggestion-text {
  font-size: 28rpx;
  line-height: 1.8;
  color: #666;
}

.model-info {
  text-align: center;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.model-text {
  font-size: 24rpx;
  color: #999;
}

.actions {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
}

.btn {
  flex: 1;
  height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: #fff;
}

.btn-secondary {
  background: linear-gradient(135deg, #90A4AE 0%, #607D8B 100%);
  color: #fff;
}
</style>
