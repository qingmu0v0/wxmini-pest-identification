<template>
  <view class="container">
    <template v-if="resultData && resultData.plantName">
      <view class="result-card">
        <view class="result-title">识别结果</view>
        <view class="result-item">
          <text class="item-label">植物名称:</text>
          <text class="item-value">{{ resultData.plantName }}</text>
        </view>
        <view class="result-item">
          <text class="item-label">识别置信度:</text>
          <text class="item-value">{{ (resultData.probability * 100).toFixed(2) }}%</text>
        </view>
        <view class="result-item">
          <text class="item-label">疾病信息:</text>
          <text class="item-value">{{ resultData.disease || '无明显病害' }}</text>
        </view>
      </view>

      <view class="description-card" v-if="resultData.description">
        <view class="card-title">详情描述</view>
        <text class="card-content">{{ resultData.description }}</text>
      </view>

      <view class="suggestion-card" v-if="resultData.suggestion">
        <view class="card-title">防治建议</view>
        <text class="card-content">{{ resultData.suggestion }}</text>
      </view>
    </template>

    <template v-else>
      <view class="empty-result">
        <text class="empty-text">未获取到识别结果。</text>
      </view>
    </template>

    <view class="button-group">
      <button class="back-button" @click="backToHome">返回首页</button>
      <button class="another-button" @click="identifyAgain">再次识别</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      resultData: null,
    };
  },
  onLoad(options) {
    if (options.resultData) {
      try {
        this.resultData = JSON.parse(decodeURIComponent(options.resultData));
      } catch (e) {
        console.error('解析结果数据失败', e);
        uni.showToast({
          title: '结果数据加载失败',
          icon: 'none'
        });
        this.resultData = null;
      }
    } else {
      uni.showToast({
        title: '未收到识别结果',
        icon: 'none'
      });
    }
  },
  methods: {
    backToHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      });
    },
    identifyAgain() {
      uni.reLaunch({
        url: '/pages/index/index?clearImage=true' // 传递参数清空首页图片
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.result-card,
.description-card,
.suggestion-card {
  width: 95%;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.result-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  text-align: center;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 32rpx;
  color: #666;
  flex-shrink: 0;
  margin-right: 20rpx;
}

.item-value {
  font-size: 32rpx;
  color: #333;
  text-align: right;
  flex-grow: 1;
}

.card-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  border-bottom: 2rpx solid #eee;
  padding-bottom: 15rpx;
}

.card-content {
  font-size: 30rpx;
  color: #555;
  line-height: 1.6;
}

.empty-result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  width: 90%;
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.empty-text {
  font-size: 36rpx;
  color: #999;
}

.button-group {
  width: 95%;
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
}

.back-button,
.another-button {
  width: 48%;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  font-size: 34rpx;
  color: #fff;
  border: none;
  transition: all 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  box-shadow: 0 4rpx 12rpx rgba(108, 117, 125, 0.3);
}

.back-button:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(108, 117, 125, 0.4);
}

.another-button {
  background-color: #28a745;
  box-shadow: 0 4rpx 12rpx rgba(40, 167, 69, 0.3);
}

.another-button:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(40, 167, 69, 0.4);
}
</style>