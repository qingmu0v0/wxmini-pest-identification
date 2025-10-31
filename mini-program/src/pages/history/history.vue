<template>
  <view class="container">
    <view class="header">
      <text class="title">识别历史</text>
      <button @click="clearHistory" class="clear-button" :disabled="historyList.length === 0">清空</button>
    </view>

    <view v-if="historyList.length > 0" class="history-list">
      <view v-for="(item, index) in historyList" :key="index" class="history-item">
        <image :src="item.image" mode="aspectFill" class="item-image"></image>
        <view class="item-details">
          <text class="item-result">结果: {{ item.result }}</text>
          <text class="item-model">模型: {{ item.model }}</text>
          <text class="item-date">时间: {{ formatTime(item.date) }}</text>
        </view>
      </view>
    </view>
    <view v-else class="empty-history">
      <text class="empty-text">暂无识别历史</text>
    </view>
  </view>
</template>

<script>
import { STORAGE_KEY } from '@/utils/config';

export default {
  data() {
    return {
      historyList: [],
    };
  },
  onShow() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      this.historyList = uni.getStorageSync(STORAGE_KEY.HISTORY) || [];
    },
    clearHistory() {
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有历史记录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync(STORAGE_KEY.HISTORY);
            this.historyList = [];
            uni.showToast({
              title: '历史记录已清空',
              icon: 'success'
            });
          }
        },
      });
    },
    formatTime(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
}

.clear-button {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 28rpx;
  padding: 10rpx 25rpx;
  border-radius: 40rpx;
  line-height: 1;
  height: auto;
}

.clear-button[disabled] {
  background-color: #cccccc;
  color: #999;
}

.history-list {
  width: 100%;
}

.history-item {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  align-items: center;
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 25rpx;
  flex-shrink: 0;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.item-result {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.item-model,
.item-date {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.item-date {
  font-size: 26rpx;
  color: #999;
}

.empty-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  margin-top: 50rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.empty-text {
  font-size: 36rpx;
  color: #999;
}
</style>